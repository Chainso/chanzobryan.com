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

Most reinforcement learning libraries are either too simple for real research or so complex that they're impossible to modify. HLRL was built to solve this. It's a modular, from-scratch reinforcement learning library designed to make high-performance algorithms accessible and easy to experiment with. Whether you're training a simple agent to balance a pole or orchestrating a distributed swarm of agents to solve a complex board game, HLRL provides the building blocks to get it done.

<div class="video-showcase">
  <video controls loop muted autoplay>
    <source src="/assets/videos/rl-video-episode-5.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Agent training demonstration in a simulated environment</p>
</div>

## What is HLRL?

HLRL, short for High-Level Reinforcement Learning, is a framework for building and training AI agents. It handles the "heavy lifting" of reinforcement learning, like managing neural networks, experience replay buffers, and complex optimization loops.

Unlike many libraries that treat algorithms as black boxes, HLRL uses a unique wrapper-based architecture. This means you can take a standard algorithm and "wrap" it with new features, like prioritized memory or curiosity-driven exploration, without rewriting the core code. It's a system built for composition and flexibility.

## Why This Matters for AI

In the world of AI research, the ability to iterate quickly is everything. HLRL is designed with a few key principles in mind:

- **Algorithm Composition**: Instead of monolithic classes, HLRL uses small, reusable components. You can mix a [DQN](https://deepmind.google/discover/blog/dqn-and-the-future-of-ai/) agent with a recurrent memory wrapper and an [IQN](https://arxiv.org/abs/1806.06923) distributional head as easily as putting together LEGO bricks.
- **Distributed by Default**: Scaling up training often requires complex infrastructure. HLRL integrates with [Ray](https://www.ray.io/) to provide out-of-the-box support for distributed training, allowing you to run hundreds of parallel actors across a cluster.
- **From Scratch implementation**: Every algorithm in the library was implemented from the ground up. This ensured a deep understanding of the math and allowed for optimizations that are often missed in generic frameworks.
- **Research-Grade Exploration**: It includes advanced techniques like [Random Network Distillation](https://openai.com/index/reinforcement-learning-with-prediction-errors-for-intrinsic-motivation/) (RND), which allows agents to develop a "sense of curiosity" and explore environments without explicit rewards.

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

Speed is a feature in reinforcement learning. The faster an environment runs, the more "experience" an agent can gather in a given hour. HLRL is built for efficiency:

- **Atari Games**: It matches or exceeds the standard DQN baseline on over 40 games.
- **Continuous Control**: It provides stable learning on MuJoCo and other physics-based environments.
- **High Throughput**: By using optimized PyTorch kernels, it can reach over 100k steps per second on modern hardware.

<div class="video-showcase">
  <video controls loop muted>
    <source src="/assets/videos/rl-video-episode-3.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p class="video-caption">Testing an agent on a variety of classic control tasks</p>
</div>

## Design Philosophy

The core of HLRL is a commitment to clarity. I believe that research code should be readable first and optimized second. Every component is designed to be swapped or extended. If you want to try a new type of replay buffer or a custom loss function, you shouldn't have to fight the framework to do it.

## Current Status

HLRL is an active project and is regularly updated with new research. Recent additions include RND for exploration and R2D2 for recurrent distributed training. It's battle-tested across several of my other projects, including the Terra Mystica and SpeedRunners AI environments.
