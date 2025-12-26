---
layout: project
title: SpeedRunners RL
hero_image: /assets/images/projects/speedrunners.png
tagline: Deep RL agents playing SpeedRunners via direct game injection
tech:
  - Python
  - C++
  - PyTorch
  - Gymnasium
  - HLRL
github: https://github.com/Chainso/speedrunners-rl
---

## Overview

Most reinforcement learning research happens in sanitized sandboxes, simulators built specifically for AI. Real-world software isn't so accommodating. This project bridges that gap by injecting a custom AI interface directly into *SpeedRunners*, a fast-paced multiplayer platformer. It uses C++ [DLL injection](https://en.wikipedia.org/wiki/DLL_injection) and shared memory to turn a closed-source commercial game into a high-performance Gym environment, enabling agents to train using state-of-the-art algorithms like Rainbow IQN.

## What is SpeedRunners?

[*SpeedRunners*](https://store.steampowered.com/app/207140/SpeedRunners/) is a competitive side-scrolling platformer where 4 players race to outrun each other. The core mechanic is unique: the camera follows the leader, and anyone who falls off-screen is eliminated.

To survive, players must master a complex physics system involving grappling hooks, wall jumps, and boost management. It's not just a race; it's a battle. You can use items like missiles and crates to trip up opponents, and the screen shrinks over time to force a confrontation.

- **Elimination Mechanics**: Falling behind the camera means instant death.
- **Physics-Based Movement**: Momentum is key. Grappling hooks allow for high-speed swings and shortcuts.

## Why This Matters for AI

SpeedRunners presents a "perfect storm" of challenges for an AI agent:

- **Adversarial Real-Time Physics**: Unlike turn-based games, decisions must be made in milliseconds (16ms per frame at 60 FPS).
- **Continuous Action Space**: While inputs are digital, the timing and duration of button presses create a effectively continuous control problem.
- **Partially Observable**: You can't see the whole map. You only see what's on screen, requiring the agent to memorize level layouts and anticipate opponent moves.
- **No API**: The game has no built-in AI interface. I had to build one from scratch by reverse-engineering the game's memory.

## The Engineering Challenge

Because *SpeedRunners* is a compiled commercial game, it doesn't have a Python API. To train an agent, I had to build a bridge:

1.  **[Reverse Engineering](https://en.wikipedia.org/wiki/Reverse_engineering#Reverse_engineering_of_software)**: I used tools like Cheat Engine and IDA Pro to find the memory addresses for player position, velocity, and game state.
2.  **[DLL Injection](https://en.wikipedia.org/wiki/DLL_injection)**: I wrote a custom C++ library that gets "injected" into the running game process. This allows me to read memory directly and overwrite input commands.
3.  **High-Speed Inter-Process Communication (IPC)**: The C++ hook talks to my Python training script via named pipes, streaming state data at 60Hz with less than 10ms of latency.

## Learn More

To dive deeper into the code, architecture, and implementation details, check out the project on GitHub:

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://github.com/Chainso/speedrunners-rl" target="_blank" class="btn btn-primary">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    View Source on GitHub
  </a>
</div>