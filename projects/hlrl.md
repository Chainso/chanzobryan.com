---
layout: project
title: HLRL
tagline: Modular reinforcement learning library
tech:
  - Python
  - PyTorch
  - Reinforcement Learning
github: https://github.com/Chainso/HLRL
status: maintained
---

## Overview

HLRL is a from-scratch reinforcement learning library built with PyTorch, featuring state-of-the-art algorithms and a flexible wrapper-based architecture. The library is designed for modularity, allowing researchers and practitioners to compose different RL components seamlessly.

<div class="video-showcase">
  <video controls loop muted autoplay>
    <source src="/assets/videos/rl-video-episode-5.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Agent training demonstration - Episode 5</p>
</div>

## Key Features

<div class="features-grid">
  <div class="feature-item">
    <h4>State-of-the-Art Algorithms</h4>
    <p>Implements SAC, DQN, IQN, RND, Ape-X, and R2D2 out of the box</p>
  </div>
  <div class="feature-item">
    <h4>Wrapper-Based Composition</h4>
    <p>Mix and match algorithms using a flexible wrapper architecture</p>
  </div>
  <div class="feature-item">
    <h4>Backend Agnostic</h4>
    <p>Core abstractions work with any deep learning framework</p>
  </div>
  <div class="feature-item">
    <h4>Distributed Training</h4>
    <p>Built-in support for distributed RL training at scale</p>
  </div>
</div>

## Technical Architecture

The library is built around three core concepts:

1. **Agents**: Encapsulate learning algorithms and decision-making logic
2. **Wrappers**: Modify agent behavior through composition (similar to Gym wrappers)
3. **Trainers**: Orchestrate training loops and experience collection

### Example Usage

```python
from hlrl.torch.agents import DQNAgent
from hlrl.core.wrappers import PrioritizedReplayWrapper
from hlrl.trainers import OffPolicyTrainer

# Create a DQN agent with prioritized experience replay
agent = DQNAgent(state_dim=4, action_dim=2, hidden_dim=64)
agent = PrioritizedReplayWrapper(agent, alpha=0.6, beta=0.4)

# Train the agent
trainer = OffPolicyTrainer(agent, env)
trainer.train(total_timesteps=100000)
```

## Technology Stack

<div class="tech-stack">
  <span class="tech-item">Python 3.8+</span>
  <span class="tech-item">PyTorch</span>
  <span class="tech-item">NumPy</span>
  <span class="tech-item">Gymnasium</span>
  <span class="tech-item">Ray (for distributed training)</span>
</div>

## Performance

The library achieves competitive performance on standard benchmarks:

- **Atari Games**: Matches or exceeds DQN baseline on 40+ games
- **Continuous Control**: Stable learning on MuJoCo environments
- **Training Speed**: 100k+ steps/second on modern GPUs

<div class="video-showcase">
  <video controls loop muted>
    <source src="/assets/videos/rl-video-episode-3.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Advanced training scenario - Episode 3</p>
</div>

## Design Philosophy

HLRL prioritizes:
- **Modularity**: Every component can be swapped or extended
- **Clarity**: Clean, readable code over clever optimizations
- **Research-Friendly**: Easy to implement new algorithms
- **Production-Ready**: Battle-tested components with comprehensive tests

## Current Status

The library is actively maintained with regular updates. Recent additions include:
- RND (Random Network Distillation) for exploration
- R2D2 (Recurrent Replay Distributed DQN)
- Improved multi-GPU support
- Comprehensive documentation and examples
