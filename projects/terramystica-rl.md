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

For an AI researcher, Terra Mystica is fascinating because it breaks traditional molds. It combines the deterministic purity of Go with the heterogeneous asymmetry of a modern video game.

- **Deep Asymmetry**: The agent can't just learn "how to play"; it must learn how to play *as* 14 distinct factions, each with unique abilities, costs, and starting positions.
- **Tight Resource Coupling**: Resources in Terra Mystica are deeply interdependent. You aren't just optimizing one metric; you're balancing a complex equation where spending a "Priest" now might cost you a "Spade" three turns later.
- **The "Power" Mechanic**: The game features a unique resource called "Power" that is gained when opponents build next to you. This creates a fascinating spatial tension: you *want* to be near opponents to leach off their actions, but being too close chokes your physical expansion.

### Beyond Chess: The N-Player Challenge

Game theory is often thought of through the lens of the [Minimax](https://en.wikipedia.org/wiki/Minimax) algorithm, where if one player wins, another loses. This holds true for 2-player [zero-sum games](https://en.wikipedia.org/wiki/Zero-sum_game) like Chess. But Terra Mystica is usually played with 3 to 5 players, and that changes the theoretical landscape entirely.

In an N-player setting, the standard "your loss is my gain" assumption breaks down. A move that hurts the leader might benefit a third party more than the actor. This introduces complex dynamics:

*   **The Multiplayer Zero-Sum Problem**: Traditional algorithms like AlphaZero are optimized for binary outcomes. Adapting them to handle the relative value of actions in a group setting is a significant open challenge.
*   **[Kingmaking](https://en.wikipedia.org/wiki/Kingmaker_scenario)**: Agents must learn to navigate scenarios where a losing player's actions effectively decide the winner among the remaining contenders. This is a common phenomenon in multiplayer board games that is theoretically distinct from optimal play in 2-player settings.
*   **Unstable [Nash Equilibria](https://en.wikipedia.org/wiki/Nash_equilibrium)**: Unlike 2-player equilibria which are generally stable, N-player equilibria can be cyclical or highly sensitive to opponent policy variations.

## Learn More

To dive deeper into the code, architecture, and implementation details, check out the project on GitHub:

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://github.com/Chainso/terramystica-rl" target="_blank" class="btn btn-primary">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    View Source on GitHub
  </a>
</div>