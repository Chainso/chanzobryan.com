---
layout: project
title: Terra Mystica RL
tagline: High-performance board game AI environment
tech:
  - Rust
  - Python
  - PyO3
  - PettingZoo
  - PyTorch
github: https://github.com/Chainso/terramystica-rl
status: active
---

## Overview

A rules-complete implementation of the complex board game *Terra Mystica* in Rust, exposed as a PettingZoo/PyTorch RL environment via PyO3. This project enables training of multi-agent systems capable of long-term strategic planning in one of the most complex board games ever created.

<div class="video-showcase">
  <video controls loop muted autoplay>
    <source src="/assets/videos/terra-mystica-sample-game.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Sample AI game playthrough</p>
</div>

## Why Terra Mystica?

Terra Mystica is an ideal testbed for multi-agent reinforcement learning:

- **Strategic Depth**: Hundreds of possible actions each turn
- **Long-term Planning**: Games last 6 rounds with compounding decisions
- **Multi-Agent Dynamics**: 2-5 players with asymmetric factions
- **Hidden Information**: Resource management and opponent modeling
- **Combinatorial Complexity**: Exponential action space

## Architecture

<div class="features-grid">
  <div class="feature-item">
    <h4>Rust Core Engine</h4>
    <p>Zero-cost abstractions for maximum performance - 100k+ steps/second</p>
  </div>
  <div class="feature-item">
    <h4>PyO3 Bridge</h4>
    <p>Seamless Python bindings for ML frameworks</p>
  </div>
  <div class="feature-item">
    <h4>PettingZoo API</h4>
    <p>Compatible with all major RL libraries</p>
  </div>
  <div class="feature-item">
    <h4>Pygame Visualization</h4>
    <p>Debug and analyze games with rich graphics</p>
  </div>
</div>

## Technical Implementation

### State Representation

The game board is represented as a multi-channel tensor suitable for CNNs:

```python
from terra_mystica_rl import TerraMysticaEnv

env = TerraMysticaEnv(num_players=4)
observation = env.reset()

# Observation shape: (num_features, board_height, board_width)
# Features include: terrain types, buildings, power bowls, resources
```

### Action Space

Actions are encoded as categorical distributions over:
- Building placement (location + building type)
- Terrain transformation
- Special abilities
- Power actions
- Favor tiles and bonuses

### Reward Shaping

The environment supports multiple reward modes:
- **Sparse**: Victory points at game end only
- **Incremental**: VP gains throughout the game
- **Potential-Based**: Shaped rewards for intermediate progress

## Performance Metrics

<div class="tech-stack">
  <span class="tech-item">120,000 steps/second (CPU)</span>
  <span class="tech-item">60+ unit tests</span>
  <span class="tech-item">95%+ code coverage</span>
  <span class="tech-item">Zero unsafe Rust</span>
</div>

## Example: Training an Agent

```python
from terra_mystica_rl import TerraMysticaEnv
from hlrl import PPOAgent
import torch

# Create environment
env = TerraMysticaEnv(num_players=2)

# Initialize agent
agent = PPOAgent(
    observation_space=env.observation_space,
    action_space=env.action_space,
    hidden_dims=[256, 256]
)

# Train
for episode in range(1000):
    obs = env.reset()
    done = False

    while not done:
        action = agent.act(obs)
        obs, reward, done, info = env.step(action)
        agent.learn(obs, action, reward, done)
```

## Challenges Solved

1. **Memory Efficiency**: Rust's ownership model enables zero-copy data sharing
2. **Parallelization**: Thread-safe environment for distributed training
3. **Correctness**: Comprehensive test suite validates game rules
4. **Speed**: Compiled Rust is 50-100x faster than Python implementations

## Technology Stack

<div class="tech-stack">
  <span class="tech-item">Rust 1.70+</span>
  <span class="tech-item">PyO3 0.19</span>
  <span class="tech-item">Python 3.8+</span>
  <span class="tech-item">PettingZoo</span>
  <span class="tech-item">Pygame (visualization)</span>
  <span class="tech-item">NumPy</span>
</div>

## Current Results

Early experiments show promising results:
- Agents learn basic building strategies within 100k games
- Faction selection strategies emerge around 500k games
- Advanced resource optimization appears after 1M+ games

## Future Directions

- **Self-Play Training**: Iterative policy improvement
- **Transfer Learning**: Pre-train on simpler variants
- **AlphaZero-style Search**: Combine RL with MCTS
- **Multi-Task Learning**: Train on multiple board game environments simultaneously
