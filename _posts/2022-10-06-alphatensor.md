---
layout: posts
title:  "AlphaTensor: Discovering faster matrix multiplication algorithms with reinforcement learning"
date:   2022-10-06
categories: jekyll update
tags: math machine-learning
---

In 2017, Deepmind released (preprint of) AlphaZero [1], which is an upgraded version of AlphaGo Zero (which is an AI playes Go) and can play Go, Chess, and Shogi.
Two years later, they released MuZero [2], which is a more generalized version of AlphaZero and can play both Atari and board games without knowledge of the rules or
representations of the game.

In this post, I'll review a very recent work of Deepmind, *AlphaTensor*, which is a variant of AlphaZero that solves tensor decomposition problems. 
As an application, it succeed to find matrix multiplication algorithms which is more efficient that previously known algorithms, even for 4 by 4 matrix multiplications.
You can find the original post from Deepmind [here](https://www.deepmind.com/blog/discovering-novel-algorithms-with-alphatensor).

## Matrix multiplication and tensor decomposition

## AlphaTensor - how to find a tensor decomposition with reinforcement learning

## Non-standard matrix multiplication

## Hardware-aware search

Another interesting point of the AlphaTensor is that it is possible to find hardware-specific tensor decomposition algorithms by modifying a reward function.
The authors set a new reward function as

$$
r_t' = r_t + \lambda b_t,
$$

where $r_t$ is the privous reward for algorithmic discovery, and $b_t$ is a *benchmarking reward*, the negative of the runtime of the algorithm at the terminal state ($\lambda$ is a hyperparameter). 
The following graphs show the speed-ups of the algorithms found by AlphaTensor compared to the standard matrix multiplication algorithms (for example, cuBLAS for the GPU) and Strassen-square algorithm for $8192 \times 8192$ matrix multiplications.
The figure (c) shows that the algorithm optimized in one hardware do not perform as well on the other hardware, which shows the importance of hardware-aware search.


<p align="center">
<img src="/assets/images/alphatensor-device.png">
</p>
<figcaption align = "center"><b>Performances of device-aware algorithms, Fawzi et al.</b></figcaption>

### Conclusion


*References*:

[1] AlphaZero

[2] MuZero

