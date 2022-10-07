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

As you may know, the multiplication of two 2 by 2 matrices $A = \left(\begin{smallmatrix} a_1 & a_2 \\\ a_3 & a_4\end{smallmatrix} \right)$ and $B = \left(\begin{smallmatrix} b_1 & b_2 \\\ b_3 & b_4\end{smallmatrix} \right)$ are given by $C = AB = \left(\begin{smallmatrix} c_1 & c_2 \\\ c_3 & c_4\end{smallmatrix} \right)$, where

$$
\begin{pmatrix} c_1 & c_2 \\ c_3 & c_4 \end{pmatrix} = \begin{pmatrix} a_1 b_1 + a_2 b_3 & a_1 b_2 + a_2 b_4 \\  a_3 b_1 + a_4 b_3 & a_3 b_2 + a_4 b_4 \end{pmatrix}.
$$

If you compute a matrix multiplication in this way, then it requires 8 multiplications.
However, there's a *faster* way that uses only 7 multiplications by Strassen [3]:[^1]

$$
\begin{align*} 
m_{1} &= (a_{1} + a_{4})(b_{1} + b_{4}) \\
m_{2} &= (a_{3} + a_{4})b_{1} \\
m_{3} &= a_{1}(b_{2} - b_{4}) \\
m_{4} &= a_{4}(b_{3} - b_{1}) \\
m_{5} &= (a_{1} + a_{2})b_{4} \\
m_{6} &= (a_{3} - a_{1})(b_{1} + b_{2}) \\
m_{7} &= (a_{2} - a_{4})(b_{3} + b_{4}) \\
c_{11} &= m_1 + m_4 - m_5 + m_7 \\
c_{12} &= m_3 + m_5 \\
c_{21} &= m_2 + m_4 \\
c_{22} &= m_1 - m_2 + m_3 + m_6
\end{align*}
$$

Our goal is to find matrix multiplication algorithms that minimizes the number of multiplications (of numbers) needed, and we are going to solve this by reformulating the problem as a tensor decomposition problem.
Since the multiplication map $(A, B) \mapsto AB$ is a bilinear map, we can express the map as a single tensor of shape $4 \times 4 \times 4$.
In general, multiplication of $n \times m$ and $m \times p$ matrices corresponds to a 3D-tensor of shape $nm \times mp \times pn$.
Then each matrix multiplication algorithms correspond to *the decomposition of the tensor as a sum of rank 1 tensors*.
If we denote $\mathcal{T}_n$ for the $n^2 \times n^2 \times n^2$ tensor corresponding the multiplication of two $n \times n$ matrices, then the decomposition is

$$
\mathcal{T}_n = \sum_{r=1}^{R} \mathbf{u}^{(r)} \otimes \mathbf{v}^{(r)} \otimes \mathbf{w}^{(r)}
$$

where $\mathbf{u}^{(r)}, \mathbf{v}^{(r)}, \mathbf{w}^{(r)}$ are $n$-dimensional vectors for $1 \leq r \leq R$.
For example, the following figures show the $4 \times 4 \times 4$ tensor corresponding to the multiplication of two 2 by 2 matrices, and (c) represents the rank 7 decomposition of it.

<p align="center">
<img src="/assets/images/alphatensor-decompose.png">
</p>
<figcaption align = "center"><b>Multiplication of 2 by 2 matrices as a tensor decomposition, Fawzi et al.</b></figcaption>

Hence, the optimal matrix multiplication algorithm uses $R = \mathrm{rank}(\mathcal{T}_n)$ multiplications, and decomposition of $\mathcal{T}_n$ into $R$ tensors would give an algorithm.
Unfortunately, it is an NP-hard problem to find the rank of a given tensor [4], so it is not easy to find the optimal algorithm.
For example, if we try to find a decomposition of $\mathcal{T}_n$ into $R$ vectors of dimension $n$ whose entries are in $\\{-1, 0, 1 \\}$ (so that the corresponding algorithm does not require additional constant multiplication) in a brute force way, there are $3^{3nR}$ possibilities, which is about $10^{20}$ even for $n =2$ and $R = 7$.

## AlphaTensor - how to find a tensor decomposition with reinforcement learning

## Non-standard matrix multiplication

We can also consider a matrix multiplication of *structured* matrices.
For example, the authors tried to decompose a tensor that corresponds to multiplying a $n \times n$ *skew-symmetric* matrix, i.e. a matrix $A$ satisfying $A^{\intercal} = -A$, with $n$-dimensional vector $v$.
Since the space of $n \times n$ skew-symmetric matrices has dimension $\frac{n(n-1)}{2}$ (the matrix is determined by upper diagonal elements), and the bilinear map $(A, v) \mapsto Av$ corresponds to $\frac{n(n-1)}{2} \times n \times n$ tensor.
AlphaTensor found the following decompositions of rank $\frac{(n-1)(n+2)}{2}$, and the authors find a pattern and generalize it as an algorithm for any $n$.
This uses about $\frac{1}{2}n^2$ multiplications, which is asymptotically twice faster than the known $n^2$ algorithm [5].

<p align="center">
<img src="/assets/images/alphatensor-skewsym.png">
</p>
<figcaption align = "center"><b>Algorithm for multiplying a skew-symmetric matrix with a vector found by AlphaTensor, Fawzi et al.</b></figcaption>

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

[3] Strassen, *Gaussian elimination is not optimal*, Numerische Mathematik (1969)

[4] Hastad, *Tensor Rank is NP-Complete*, Journal of Algorithms (1990)

[5] K. Ye, L. Lim, *Fast structured matrix computations: tensor rank and Cohn–Umans method*, Foundations of Computational Mathematics (2018)

[^1]: It is much faster to compute addition of two numbers rather than multiplication with computer (and also with hand), so it is important to reduce the number of multiplications.

