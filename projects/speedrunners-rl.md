---
layout: project
title: SpeedRunners RL
tagline: Deep RL agents playing SpeedRunners via direct game injection
tech:
  - Python
  - C++
  - PyTorch
  - Gymnasium
  - HLRL
github: https://github.com/Chainso/speedrunners-rl
status: active
---

## Overview

Most reinforcement learning research happens in sanitized sandboxes, simulators built specifically for AI. Real-world software isn't so accommodating. This project bridges that gap by injecting a custom AI interface directly into *SpeedRunners*, a fast-paced multiplayer platformer. It uses C++ DLL injection and shared memory to turn a closed-source commercial game into a high-performance Gym environment, enabling agents to train using state-of-the-art algorithms like Rainbow IQN.

## What is SpeedRunners?

[*SpeedRunners*](https://store.steampowered.com/app/207140/SpeedRunners/) is a competitive side-scrolling platformer where 4 players race to outrun each other. The core mechanic is unique: the camera follows the leader, and anyone who falls off-screen is eliminated.

To survive, players must master a complex physics system involving grappling hooks, wall jumps, and boost management. It's not just a race; it's a battle. You can use items like missiles and crates to trip up opponents, and the screen shrinks over time to force a confrontation.

- **Elimination Mechanics**: Falling behind the camera means instant death.
- **Physics-Based Movement**: Momentum is key. Grappling hooks allow for high-speed swings and shortcuts.
- **Round-Based**: Matches are best-of-3 (or best-of-4 for teams).
- **RPG Elements**: Players earn experience to unlock new items and skins, adding a layer of progression.

## Why This Matters for AI

SpeedRunners presents a "perfect storm" of challenges for an AI agent:

- **Adversarial Real-Time Physics**: Unlike turn-based games, decisions must be made in milliseconds (16ms per frame at 60 FPS).
- **Continuous Action Space**: While inputs are digital, the timing and duration of button presses create a effectively continuous control problem.
- **Partially Observable**: You can't see the whole map. You only see what's on screen, requiring the agent to memorize level layouts and anticipate opponent moves.
- **No API**: The game has no built-in AI interface. We had to build one from scratch by reverse-engineering the game's memory.

## The Engineering Challenge

Because *SpeedRunners* is a compiled commercial game, it doesn't have a Python API. To train an agent, we had to build a bridge:

1.  **Reverse Engineering**: We used tools like Cheat Engine and IDA Pro to find the memory addresses for player position, velocity, and game state.
2.  **DLL Injection**: We wrote a custom C++ library that gets "injected" into the running game process. This allows us to read memory directly and overwrite input commands.
3.  **High-Speed Inter-Process Communication (IPC)**: The C++ hook talks to our Python training script via named pipes, streaming state data at 60Hz with less than 10ms of latency.

## Architecture Overview

<div class="features-grid">
  <div class="feature-item">
    <h4>C++ DLL Injection</h4>
    <p>Direct memory access for position, velocity, and game state</p>
  </div>
  <div class="feature-item">
    <h4>Gymnasium Environment</h4>
    <p>Standard RL interface via custom wrapper</p>
  </div>
  <div class="feature-item">
    <h4>Rainbow IQN Agent</h4>
    <p>State-of-the-art value-based RL with distributional Q-learning</p>
  </div>
  <div class="feature-item">
    <h4>Modular Design</h4>
    <p>Three separate packages: sr-lib, sr-gym, sr-ai</p>
  </div>
</div>

## Technical Deep Dive

### 1. Game Hooking (C++ DLL)

```cpp
// Example: Reading player position from game memory
struct PlayerState {
    float x;
    float y;
    float velocity_x;
    float velocity_y;
    bool is_grounded;
    int health;
};

class GameHook {
    HANDLE pipe;
    DWORD player_base_addr;

public:
    PlayerState read_player_state() {
        // Read from fixed memory offset
        uintptr_t player_ptr = *(uintptr_t*)(player_base_addr + 0x48);
        PlayerState state;

        // Copy struct from game memory
        ReadProcessMemory(GetCurrentProcess(),
                          (LPCVOID)(player_ptr + 0x10),
                          &state,
                          sizeof(PlayerState),
                          nullptr);

        return state;
    }

    void send_to_python(const PlayerState& state) {
        DWORD bytes_written;
        WriteFile(pipe, &state, sizeof(state), &bytes_written, nullptr);
    }
};
```

### 2. Gymnasium Wrapper (Python)

```python
import gymnasium as gym
from sr_lib import GameConnection

class SpeedRunnersEnv(gym.Env):
    def __init__(self):
        self.connection = GameConnection()

        self.action_space = gym.spaces.Discrete(9)  # 8 directions + idle
        self.observation_space = gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(12,),  # x, y, vx, vy, etc.
            dtype=np.float32
        )

    def step(self, action):
        # Send action to game via IPC
        self.connection.send_action(action)

        # Read new state (blocks until game updates)
        state = self.connection.read_state()

        # Calculate reward
        reward = self._calculate_reward(state)

        return state, reward, state.done, {}

    def _calculate_reward(self, state):
        # Dense reward shaping
        velocity_reward = np.sqrt(state.vx**2 + state.vy**2) * 0.01
        progress_reward = state.x * 0.1
        death_penalty = -10.0 if state.health == 0 else 0.0

        return velocity_reward + progress_reward + death_penalty
```

### 3. Rainbow IQN Training

The agent uses:
- **Rainbow DQN**: Double DQN + Dueling + Prioritized Replay + Multi-step + Noisy Nets
- **IQN**: Implicit Quantile Networks for distributional RL
- **RND**: Random Network Distillation for exploration bonuses

```python
from hlrl.torch.agents import RainbowIQNAgent
from sr_gym import SpeedRunnersEnv

# Create environment
env = SpeedRunnersEnv()

# Initialize agent
agent = RainbowIQNAgent(
    state_dim=12,
    action_dim=9,
    hidden_dims=[256, 256],
    num_quantiles=64,  # For distributional RL
    learning_rate=1e-4,
)

# Train with Ape-X (distributed)
from hlrl.trainers import ApexTrainer

trainer = ApexTrainer(
    agent=agent,
    env=env,
    num_actors=8,  # 8 parallel game instances
    num_learners=1,
    replay_size=100000,
)

trainer.train(total_timesteps=10_000_000)
```

## State Representation

The 12-dimensional state vector includes:

| Index | Feature | Description |
|-------|---------|-------------|
| 0-1 | Player X/Y | Absolute position |
| 2-3 | Velocity X/Y | Current movement vector |
| 4 | Ground Contact | Boolean (touching floor) |
| 5-6 | Camera X/Y | Viewport position |
| 7-10 | Opponent Positions | Relative to player |
| 11 | Health | Current HP |

## Action Space

9 discrete actions mapping to keyboard inputs:
- 0: Idle
- 1-8: 8-directional movement + jump combinations

## Reward Engineering

Reward function combines multiple signals:

```python
def compute_reward(state, next_state, action, done):
    # Speed reward: encourage fast movement
    speed = np.linalg.norm([next_state.vx, next_state.vy])
    speed_reward = speed * 0.01

    # Progress reward: move right (race direction)
    progress_reward = (next_state.x - state.x) * 0.1

    # Survival bonus: stay alive
    survival_reward = 0.01 if not done else -10.0

    # Exploration bonus: visit new areas (RND)
    novelty_reward = rnd_network.predict(next_state)

    return speed_reward + progress_reward + survival_reward + novelty_reward
```

## Technology Stack

<div class="tech-stack">
  <span class="tech-item">C++ 17</span>
  <span class="tech-item">Python 3.9+</span>
  <span class="tech-item">PyTorch 2.0</span>
  <span class="tech-item">Gymnasium</span>
  <span class="tech-item">Named Pipes (IPC)</span>
  <span class="tech-item">HLRL</span>
</div>

## Performance Metrics

- **Frame Rate**: 60 Hz state updates
- **Latency**: < 10ms action → state response
- **Throughput**: 3,600 steps/second per actor
- **Distributed**: 8 actors = 28,800 steps/second

## Training Results

After 10M timesteps (~77 hours of gameplay):
- ✅ Agent consistently reaches end of tutorial level
- ✅ Learns grappling hook usage for shortcuts
- ✅ Avoids common death traps (spikes, pits)
- 🔄 Working on multi-opponent competitive play

## Challenges Overcome

1. **Memory Stability**: Game updates can change memory offsets
   - Solution: Pattern scanning and dynamic address resolution

2. **Anti-Cheat**: Some games block DLL injection
   - Solution: Whitelist development builds, signed DLLs

3. **Frame Synchronization**: Game runs at variable FPS
   - Solution: Frame-skip detection and interpolation

4. **Exploration**: Sparse rewards in long levels
   - Solution: RND for intrinsic motivation + curriculum learning

## Future Work

- [ ] Multi-agent competitive scenarios
- [ ] Imitation learning from human replays
- [ ] Hierarchical RL for macro-strategy
- [ ] Transfer learning to similar platformers
- [ ] Tournament mode with self-play ladder
