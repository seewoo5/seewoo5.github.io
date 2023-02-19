---
layout: posts
title:  "Interesting applications of p-adic numbers"
date:   2023-02-18
categories: jekyll update
tags: math
---

In this post, we will see some *interesting* applications of $p$-adic numbers.
We will assume that readers are familiar with $p$-adic numbers and their basic properties.

## Monsky's theorem

> **Theorem (Monsky).** Assume that a unit square is partitioned by triangles of equal area.
> Then the number of triangles is even.

## Skolem-Mahler-Lech theorem

> **Theorem (Skolem-Mahler-Lech).** The zero set of a linear recurrence sequence is eventually periodic.

In this post, we will only consider *integer* sequences, which was the scope of the original result by Skolem (it is generalized further by Mahler and Lech for algebraic numbers and characteristic 0 fields).
Surprisingly, all the known proofs uses $p$-adic integers.
Here we will provide a proof by Hansel, which is stolen from [Terrence Tao's blog post](https://terrytao.wordpress.com/2007/05/25/open-question-effective-skolem-mahler-lech-theorem/).


## $\pi$ and $e$ are transcendental

(This follows [Matt Baker's blog post](https://mattbaker.blog/2015/03/20/a-p-adic-proof-that-pi-is-transcendental/).)
Another striking application of $p$-adic numbers is that $\pi$ and $e$ (and many more) are trancendental.
More generally, [Bezvin and Robba](https://www.jstor.org/stable/1971488) proposed an alternative proof of the following Lindemann-Weierstrass theorem:

> **Theorem (Lindemann-Weierstras).** Let $\alpha_1, \dots, \alpha_n$ be distinct algebraic numbers. Then $e^{\alpha_1}, \dots, e^{\alpha_n}$ are linearly independent over $\overline{\mathbb{Q}}$.

As a corollary, if $\alpha$ is an algebraic number, then $e^\alpha$ is trancendental.
From this, trancendentality of $\pi$ and $e$ directly follows ($e^{\pi i} = -1$ and $e^1 = e$).
Bezvin and Robba's first show that the theorem is equivalent to the following statement:[^1]

> **Theorem (Bezvin-Robba).** Let $\mathcal{F}\_{\mathbb{Q}} = \frac{1}{x} \mathbb{Q}[[\frac{1}{x}]]$ be a ring of formal power series vanish at infinity. Define $\mathcal{D}: \mathcal{F}\_{\mathbb{Q}} \to \mathcal{F}\_{\mathbb{Q}}$ be a differential operator defined as $\mathcal{D}(v):= v + v'$. If $v \in \mathcal{F}\_{\mathbb{Q}}$ is analytic at infinity and $\mathcal{D}(v)$ is a rational function, then $v$ is also rational.

Although Bezvin and Robba showed that two statements (theorems) are equivalent, I will only introduce the proof of (B-R $\Rightarrow$ L-W), which is enough for our purpose.
See the above blog post for the proof of the other direction.

*Proof (B-R $\Rightarrow$ L-W).* 
Assume that L-W theorem is false, so that there exists distinct algebraic numbers $\alpha_1, \dots, \alpha_n$ and nonzero algebraic numbers $\beta_1, \dots, \beta_n$ such that $\beta_1 e^{\alpha_1} + \cdots + \beta_{n} e^{\alpha_{n}} = 0$.
Let $f(z) = \sum_{i=1}^{n} \beta_{n} e^{\alpha_{n} z}$, so that $f(1) = 0$ by assumption.
By replacing $f(z)$ with the product of its Galois conjugates $\sum_{i=1}^{n} \sigma(\beta_i) e^{\sigma(\alpha_i)z}$, we can assume that the power series expansion of $f(z)$ has $\mathbb{Q}$-coefficients.
Now, consider the [Laplace transform](https://mathworld.wolfram.com/LaplaceTransform.html) of $f$, which is $\mathcal{L}(f) = \sum_{i=1}^{n} \frac{\beta_i}{1 - \alpha_i z}$.
Since $f(1) = 0$ and $\alpha_i$ are distinct, we have $n\geq 2$ and at least one $\alpha_i$ should be nonzero, so $f(z)$ has at least one simple pole.
Now we need a following lemma, which we will use without proof:

> **Lemma.** $f(z) \in \mathbb{C}[[z]]$ defines an entire function of exponential growth (i.e. $|f(z)| \leq C_1 e^{C_2|z|}$ for some constants $C_1, C_2$) if and only if $\mathcal{L}(f)$ is analytic at infinity.

Let $g(z) := \frac{f(z)}{z-1}$, which is analytic by the assumption $f(1) = 0$.
Hence, by the above Lemma, $v:=\mathcal{L}(g) \in \frac{1}{x} \mathbb{C}[[\frac{1}{x}]]$ is analytic at infinity.
By the way, direct computation shows that $\mathcal{L}(f) = \mathcal{D}(v)$, hence it has a simple pole.
On the other hand, one can show that $\mathcal{D}(v)$ cannot have a simple pole if $v$ is a rational function, which leads to a contradiction. $\square$

Now our goal is reduced to the above rationality statement.
There are many related theorems, starting from the following observation by Borel: if $f(z) = \sum_{n\geq 0} a_n z^n \in \mathbb{Z}[[x]]$ defines an analytic function on a closed disc of radius $R > 1$ centered at $0$ in $\mathbb{C}$, then $f(z)$ is a polynomial.
This easily follows from Cauchy's integral formula: $|a_n| \leq \frac{M}{2\pi R^{n+1}}$ for $M = \sup_{|z| \leq R} |f(z)|$, and taking $n\to\infty$ shows that $a_n =0$ for sufficiently large $n$.
Borel generalized this to the following theorem:

> **Theorem (Borel)** If $f(z) = \sum_{n\geq 0} a_n z^n \in \mathbb{Z}[[x]]$ defines a meromorphic function on a closed disc of radius $R > 1$ centered at $0$ in $\mathbb{C}$, then $f(z)$ is a rational function.

The proof of Borel's theorem uses Kronecker's characterization of rational functions via Kronecker-Hankel determinant (see Lemma 10 of [this](https://terrytao.wordpress.com/2014/05/13/dworks-proof-of-rationality-of-the-zeta-function-over-finite-fields/)).
Borel's theorem is generalized in several directions, including Dwork's $p$-adic analogue (which is used for the proof of rationality of zeta functions for curves over finite fields: see [this](https://terrytao.wordpress.com/2014/05/13/dworks-proof-of-rationality-of-the-zeta-function-over-finite-fields/) again).
For our purpose, we will use the following criterion by Bertrandias:

> **Theorem (Bertrandias).** Let $g(z) = \sum_{n\geq 0} \frac{a_n}{z^{n+1}} \in \mathcal{F}_{\mathbb{Q}}$.
Let $S$ be a finite set of places, containing the infinite places, such that
>
> (B1) For $p \not \in S$, $|a_n|_p \leq 1$ for all $n\geq 0$.
> 
> (B2) For $p \in S$, $g(z)$ extends to a meromorphic function on the complement of a bounded set $K_v \subset \mathbb{C}_v$ (which is assumed to be a finite union of discs if $v$ is non-archimedean) and $\prod_{v\in S} \delta_{\infty}(K_v) < 1$.
>
> Then $g(z)$ is a rational function.

Here $\delta_\infty$ is a *transfinite diameter* defined as

$$
\delta_{\infty}(A) := \lim_{N\to\infty} \delta_{N}(A), \quad \delta_{N}(A):= \sup_{z_1, \dots, z_N \in A} \left(\prod_{i \neq j} |z_i - z_j|\right)^{\frac{1}{N(N-1)}}
$$

for any bounded set $A$ of a normed space.
The proof of Bertrandias' criterion is similar to that of Borel's and Dwork's theorem.

Now let's prove Bezvin-Robba's theorem using Bertrandias' rationality criterion.

*Proof (Bezvin-Robba).*
Let $\omega(x) = \mathcal{D}(v)(x) = v(x) + v'(x)$, which is a rational function by assumption.
Expand $\omega(x)$ a partial fraction as follows:

$$
\omega(x) = \sum_{i, j} \frac{c_{i, j}}{(x - \gamma_i)^j}
$$

where $\gamma_1, \dots, \gamma_m$ are distinct algebraic numbers.
By using the formal inverse $\mathcal{D}^{-1} = (1 + \frac{d}{dx})^{-1} = \sum_{k \geq 0} (-1)^{k} \frac{d^k}{dx^k}$, $v$ has the following partial fraction expansion

$$
v(x) = \sum_{i, j} c_{i, j}\sum_{k \geq 0} \binom{k+j-1}{j-1} \frac{k}{(x - \gamma_j)^{k+j}}.
$$

Now let $S_1$ be a set of places of $\mathbb{Q}$ containing archimedean place such that for $p \not \in S_1$, 

* (1) all nonzero $c_{i, j}$ and $\gamma_j$ have absolute value 1,
* (2) $|\gamma_i - \gamma_j|_p = 1$ for all $i\neq j$.

Then one can show that the coefficients of the expansion $v(x) = \sum_{n \geq 0} \frac{a_n}{x^{n+1}}$ are $p$-adic integers for all $p \not \in S_1$.
Hence the condition (B1) is satisfied for any $S$ containing $S_1$.

For (B2), note that $v(x)$ converges outside a disc $K_p \subset \mathbb{C}_p$ of some positive radius $R_p$ for all $p \not \in S_1$.
For $p \not \in S_1$, $v(x)$ converges in the complement of $K_p$ that is a union of discs $D_i$ centered at $\gamma_i$'s, and we can take radii of discs as $p^{-1/(p-1)}$ since the radius of convergence of $\sum_{k\geq 0} k! x^k$ is $p^{1/(p-1)}$.
Since the radius of convergence is smaller than 1, the discs are disjoint by second assumption on $S_1$.
Now, the transfinite diameter of $K_p$ becomes:

> *Lemma.* We have
> 
> $$
> \delta_{\infty}(K_p) = \delta_{\infty}\left(\bigcup_{i=1}^{m} D_i\right) = p^{-\frac{1}{m(p-1)}}.
> $$

Let's postpone the proof of the lemma for a moment.
Since $\sum_{p} \frac{\log p}{p}$ diverges, the infinite product $\prod_{p\not \in S_{1}} \delta_{\infty}(K_p)$ diverges to zero, hence there exists a finite set $S$ containing $S_1$ such that $\prod_{p \not \in S} \delta_{\infty}(K_p) < 1$, and such a choice of $S$ satisfies both (B1) and (B2).
Thus $v(x)$ is a rational function. $\square$


*Proof of Lemma.* 
First, note that if $z_i$ and $z_j$ are not in the same disk, then the triangle inequality gives $|z_i - z_j| \leq \max\{|z_i - \gamma_i|, |\gamma_i - \gamma_j|, |\gamma_j - z_j|\}$, and this implies $|z_i - z_j| = 1$ since $|\gamma_i - \gamma_j| = 1$ and $|z_i - \gamma_i|, |z_j - \gamma_j| \leq p^{-1/(p-1)} < 1$.
If $z_i$ and $z_j$ lies in the same disk, then $|z_i - z_j| \leq \max\{|z_i - \gamma_i|, |\gamma_i - z_j|\} \leq p^{-1/(p-1)}$.
Now, let $z_1, \dots, z_N$ be points in $K_p$, and each $D_i$ contains $k_i$ points of them with $k_1 + \cdots + k_m = N$.
Then

$$
\begin{align*}
\delta_N(K_p) &\leq (p^{-\frac{1}{p-1}})^{\left(\frac{k_1(k_1 -1)}{2} + \cdots + \frac{k_m(k_m -1)}{2}\right) \frac{2}{N(N-1)}} \\
&= (p^{-\frac{1}{p-1}})^{(k_1^2 + \cdots + k_m^2 - N)\cdot \frac{1}{N(N-1)}} \\
&\leq (p^{-\frac{1}{p-1}})^{\left(\frac{N^2}{m} - N\right)\frac{1}{N(N-1)}} 
\end{align*}
$$

where the second inequality follows from $k_1^2 +\cdots + k_m^2 \geq \frac{N^2}{m}$ (Cauchy-Schwartz).
Taking the limit $N\to\infty$ gives $\delta\_{\infty}(K_p) \leq p^{-\frac{1}{m(p-1)}}$.

For the other direction, assume that $N = mk$ is a multiple of $m$.
Now we choose $k$ points $z_{i, 1}, \dots, z_{i, k}$ in each disk $D_i$ as $z_{i, j} = \gamma_i + p^{-1/(p-1)} \zeta_M^j$, where $M$ is an integer coprime to $p$ and $\zeta_M \in \mathbb{C}_p$ is $M$-th root of unity.
Then one can show that $|z_{i, j} - z_{i, j'}| = p^{-1/(p-1)}$ for any $j \neq j'$, and this gives a lower bound

$$
\delta_{mk}(K_p) \geq (p^{-\frac{1}{p-1}})^{\frac{mk(k-1)}{2} \frac{2}{N(N-1)}} = (p^{-\frac{1}{p-1}})^{\frac{N/m - 1}{N-1}}
$$

where the RHS converges to $p^{-1/(m(p-1))}$ as $N\to\infty$.
This gives $\delta_\infty(K_p) \geq p^{-1/(m(p-1))}$ and completes the proof. $\square$




[^1] As it mentioned in Matt Baker's blog post, this statement is slightly different from the original one from Bezvin-Robba, which are essentially the same via simple transformation.