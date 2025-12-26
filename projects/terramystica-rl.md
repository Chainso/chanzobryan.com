---
layout: project
title: Terra Mystica RL
hero_image: /assets/images/projects/terramystica.png
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

Board games have long been the proving ground for Artificial Intelligence. While Chess and Go have fallen to superhuman algorithms, modern "Euro-style" board games present a new frontier. This project brings [*Terra Mystica*](https://boardgamegeek.com/boardgame/120677/terra-mystica), a masterpiece of zero luck and perfect information, into the realm of deep reinforcement learning. It is a rules-complete, high-performance environment written in Rust, designed to push the boundaries of multi-agent planning.

<div class="video-showcase">
  <video controls loop muted autoplay>
    <source src="/assets/videos/terra-mystica-sample-game.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Sample AI game playthrough</p>
</div>

## What is Terra Mystica?

At its heart, *Terra Mystica* is an economic engine-building game played on a shared hex map. 2 to 5 players each control a unique fantasy faction (like Witches, Giants, or Nomads) and attempt to terraform the landscape to suit their needs.

The goal is deceptively simple: score the most Victory Points (VP) by the end of Round 6. However, getting there requires navigating a tight economy. You must upgrade buildings to generate income (workers, money, priests), but expanding your territory requires spending those same resources. The game is famous for having **zero luck**. There are no dice and no card draws. Every outcome is the direct result of player decisions.

## Why This Matters for AI

For an AI researcher, Terra Mystica is fascinating because it breaks the molds we're used to. It combines the deterministic purity of Go with the heterogeneous asymmetry of a modern video game.

- **Deep Asymmetry**: The agent can't just learn "how to play"; it must learn how to play *as* 14 distinct factions, each with unique abilities, costs, and starting positions.
- **Tight Resource Coupling**: Resources in Terra Mystica are deeply interdependent. You aren't just optimizing one metric; you're balancing a complex equation where spending a "Priest" now might cost you a "Spade" three turns later.
- **The "Power" Mechanic**: The game features a unique resource called "Power" that is gained when opponents build next to you. This creates a fascinating spatial tension: you *want* to be near opponents to leach off their actions, but being too close chokes your physical expansion.

### Beyond Chess: The N-Player Challenge

We often think of game theory through the lens of the [Minimax](https://en.wikipedia.org/wiki/Minimax) algorithm, where if I win, you lose. This holds true for 2-player zero-sum games like Chess. But Terra Mystica is usually played with 3 to 5 players, and that changes the theoretical landscape entirely.

In an N-player setting, the standard "my gain is your loss" assumption breaks down. A move that hurts the leader might benefit a third party more than the actor. This introduces complex dynamics:

*   **The Multiplayer Zero-Sum Problem**: Traditional algorithms like AlphaZero are optimized for binary outcomes. Adapting them to handle the relative value of actions in a group setting is a significant open challenge.
*   **[Kingmaking](https://en.wikipedia.org/wiki/Kingmaker_scenario)**: Agents must learn to navigate scenarios where a losing player's actions effectively decide the winner among the remaining contenders. This is a common phenomenon in multiplayer board games that is theoretically distinct from optimal play in 2-player settings.
*   **Unstable [Nash Equilibria](https://en.wikipedia.org/wiki/Nash_equilibrium)**: Unlike 2-player equilibria which are generally stable, N-player equilibria can be cyclical or highly sensitive to opponent policy variations.

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
