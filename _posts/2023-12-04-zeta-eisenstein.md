---
layout: posts
title:  "New(?) proof of Bassel problem"
date:   2023-12-04
categories: jekyll update
tags: math
---

In this post, we give a new short proof of the Bassel problem $\zeta(2) = \pi^2 / 6$ using Eisenstein series.

For even $k \geq 2$, the Eisenstein series of weight $k$ and level $1$ is defined as

$$
G_k(z) = \frac{1}{2} \sum_{(m, n) \in \mathbb{Z}^2 \backslash \{(0, 0)\}} \frac{1}{(mz + n)^k}.
$$

There's a well known formula for the Fourier coefficients of $G_k(z)$:

$$
G_k(z) = \zeta(k) + \frac{(2\pi i )^{k}}{(k-1)!} \sum_{n\geq 1} \sigma_{k-1}(n) q^n.
$$

For example, see Zagier's famous expository article *Elliptic modular forms and applications*, Proposition 5 on page 16.
Note that the series defining $G_k(z)$ absolutely converges only if $k > 2$, and we need some additional efforts for $k = 2$.
For example, we can define the $G_2(z)$ as

$$
G_2(z) = \frac{1}{2} \sum_{n \neq 0} \frac{1}{n^2} + \frac{1}{2} \sum_{m \neq 0} \sum_{n \in \mathbb{Z}} \frac{1}{(mz + n)^2}
$$

and it admits the same form of the Fourier series.
One can normalize these forms as

$$
E_k(z) = 1 + \frac{(2 \pi i )^k}{\zeta(k)(k-1)!} \sum_{n\geq 1} \sigma_{k-1}(n) q^n = 1 + \alpha_{k} \sum_{n\geq 1} \sigma_{k-1}(n) q^n
$$

for $\alpha_k = \frac{(2 \pi i)^k}{\zeta(k) (k-1)!}$.
Then our goal is reduced to compute $\alpha_2$ and $\alpha_4$ (and maybe other $\alpha_k$'s, too).

The key idea is to use the Ramanujan's identity:

$$
E_2' = \frac{E_2^2 - E_4}{12}, \quad E_4' = \frac{E_2 E_4 - E_6}{3}, \quad E_6' = \frac{E_2 E_6 - E_4^2}{2}.
$$

Here the derivatives are $F' := q \frac{dF}{dq} = \frac{1}{2 \pi i} \frac{dF}{dz}$.
Especially, we'll use the first identity.
Comparing their coefficients of $q$ and $q^2$ in $q$-expansions gives two equations

$$
\begin{align*}
\alpha_2 &= \frac{2 \alpha_2 - \alpha_4}{12} \\
6 \alpha_2 &= \frac{6\alpha_2 + \alpha_2^2 - 9 \alpha_4}{12}
\end{align*}
$$

and solving these equations gives $\alpha_2 = -24$ and $\alpha_4 = 240$ (note that $\alpha_2$ and $\alpha_4$ are nonzero by definition).
Unwinding the definition of these numbers give

$$
\begin{align*}
\alpha_2 = -24 = \frac{(2\pi i)^2}{\zeta(2) \cdot 1} &\Leftrightarrow \zeta(2) = \frac{\pi^2}{6}, \\
\alpha_4 = 240 = \frac{(2 \pi i)^4}{\zeta(4)\cdot 6} &\Leftrightarrow \zeta(4) = \frac{\pi^4}{90}.
\end{align*}
$$

Other identities on Eisenstein series may give values of other $\zeta(k)$ for even $k \geq 6$.
For example, one can compute $\zeta(6)$ using the second or third Ramanujan's identity.
The value of $\zeta(8)$ can be obtained via $E_4^2 = E_8$.
