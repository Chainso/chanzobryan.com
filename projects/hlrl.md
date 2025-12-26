---
layout: project
title: HLRL
hero_image: /assets/images/projects/hlrl.jpg
tagline: Modular reinforcement learning library
tech:
  - Python
  - PyTorch
  - Reinforcement Learning
github: https://github.com/Chainso/HLRL
---

## Overview

Most [reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning) libraries are either too simple for real research or so complex that they're impossible to modify. HLRL was built to solve this. It's a modular, from-scratch reinforcement learning library designed to make high-performance algorithms accessible and easy to experiment with. Whether you're training a simple agent to balance a pole or training a complex agent to solve a board game on your local machine, HLRL provides the building blocks to get it done.

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
- **Single-Machine Performance**: Rather than relying on expensive clusters, HLRL is optimized to extract every bit of performance from a single workstation. It uses efficient data structures and asynchronous sampling to keep the GPU saturated.
- **From Scratch implementation**: Every algorithm in the library was implemented from the ground up. This ensured a deep understanding of the math and allowed for optimizations that are often missed in generic frameworks.
- **Research-Grade Exploration**: It includes advanced techniques like [Random Network Distillation](https://openai.com/index/reinforcement-learning-with-prediction-errors-for-intrinsic-motivation/) (RND), which allows agents to develop a "sense of curiosity" and explore environments without explicit rewards.

## Learn More

To dive deeper into the code, architecture, and implementation details, check out the project on GitHub:

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://github.com/Chainso/HLRL" target="_blank" class="btn btn-primary">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    View Source on GitHub
  </a>
</div>