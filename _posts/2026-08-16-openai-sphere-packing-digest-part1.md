---
layout: posts
title:  "Digestion of Astra's result on the high-dimensional sphere packing problem - Part 1, Non-formal"
date:   2026-08-27
categories: jekyll update
tags: math ai
---

The goal of this post is to *digest* the proof of the optimal Cohn-Elkies linear programming bound and the sign uncertainty principle by OpenAI's new model Astra.
It can be found in Chapter 1 of [their report](https://cdn.openai.com/pdf/ten-proofs-oai.pdf).
The main results are the following:

> **Theorem 1.1.**
>
> $$
> \lim_{d \to \infty} \mathrm{LP}_{d}^{1/d} = \sqrt{\frac{e}{2\pi}}.
> $$
>
> In particular,
>
> $$
> \Delta_d \le 2^{-(\frac{1}{2}\log_2(2\pi/e) + o(1))d} = 2^{-(0.6044... + o(1)) d}.
> $$

> **Theorem 1.2.**
>
> $$
> \lim_{d \to \infty} \frac{\mathrm{A}_{+}(d)}{\sqrt{d}} = \lim_{d \to \infty} \frac{\mathrm{A}_{-}(d)}{\sqrt{d}} = \frac{1}{\pi}.
> $$


## Problem setting and background

Sphere packing problem is a well-studied problem in discrete geometry, and it asks for the densest packing of unit spheres in $\mathbb{R}^d$.
We denote the optimal packing density by $\Delta_d$.
$d = 1$ case is trivial ($\Delta_1 = 1$), and $d = 2$ case was solved by L. Fejes Tóth in 1940s, where the hexagonal packing ($\mathsf{A}_2$-lattice packing) is optimal.
The $d = 3$ case is the famous Kepler conjecture, which was solved by T. Hales in 1998 (and also formally verified later using Isabelle/HOL Light).
Viazovska solved the $d = 8$ case in 2016, and Cohn-Kumar-Miller-Radchenko-Viazovska solved the $d = 24$ case one week later, using Cohn-Elkies linear programming (LP) bound which we will see soon.
The other dimensions are still open.

One may ask bounds for *large* dimensions.
Kabatiansky and Levenshtein (1978) proved the following upper bound:

$$
\Delta_d \le 2^{-(0.5990 + o(1)) d}
$$

as $d \to \infty$.

(Add more results on KL bound and constant factor improvements.)

Now, we will consider an optimization problem that is closely related to the sphere packing problem.
We consider "nice" $\mathbb{R}$-valued functions $f$ on $\mathbb{R}^d$, mostly Schwartz functions (denoted as $\mathcal{S}(\mathbb{R}^d;\mathbb{R})$), where Fourier transform is defined as

$$
\widehat{f}(\xi) = \int_{\mathbb{R}^d} f(x) e^{-2\pi i x \cdot \xi} dx.
$$

Let

$$
v_d = \frac{\pi^{d/2}}{\Gamma(d/2 + 1)}
$$

be the volume of the unit ball in $\mathbb{R}^d$.
Consider the set of functions

$$
\mathcal{A}_d := \{f \in \mathcal{S}(\mathbb{R}^d;\mathbb{R}) : \widehat{f}(0) > 0, \quad \widehat{f} \ge 0 \,\,\text{on}\,\,\mathbb{R}^d, \quad f(x) \le 0 \,\,\text{on}\,\, |x| \ge 1\}
$$

and the associated linear programming bound

$$
\mathrm{LP}_d := \frac{v_d}{2^d} \inf_{f \in \mathcal{A}_d} \frac{f(0)}{\widehat{f}(0)}.
$$

The Cohn-Elkies theorem states that the optimal sphere packing density $\Delta_d$ in $\mathbb{R}^d$ is bounded by

$$
\Delta_d \le \mathrm{LP}_d.
$$

The proof is based on Poisson summation formula and pretty simple, but it turns out to be quite powerful.
The theorem was used to prove the optimality of the $E_8$ and Leech lattices in dimensions 8 and 24, where Viazovska and Cohn-Kumar-Miller-Radchenko-Viazovska constructed "magic" functions $f$ in $\mathcal{A}_d$ using modular forms that match the density of the $E_8$ and Leech lattice packings.
It is also known that LP bound is *sub*optimal in dimensions $3, 4, 5, 6, 7$ (see [[Li25]](https://www.sciencedirect.com/science/article/pii/S0001870824005590)).

It was known by [Cohn and Zhao](https://projecteuclid.org/journals/duke-mathematical-journal/volume-163/issue-10/Sphere-packing-bounds-via-spherical-codes/10.1215/00127094-2738857.pdf) that LP bound is at least strong as KL bound.
Later, [Afkhami-Jeddi, Cohn, Hartman, de Laat, and Tajdini](https://link.springer.com/article/10.1007/JHEP12(2020)066) conjectured that the optimal asympototic exponent that can be obtained by LP bound is better than KL bound, and conjectured that (Conjecture 3.2 in their paper)

$$
\lim_{d \to \infty} \mathrm{LP}_d^{1/d} = \sqrt{\frac{e}{2\pi}},
$$

which will imply

$$
\Delta_d \le 2^{-(\frac{1}{2}\log_2(2\pi/e) + o(1))d} = 2^{-(0.6044... + o(1)) d}.
$$

Note that they conjectured the constant based on numerical experiments, observing that the exponent $0.6044...$ they obtained numerically is close to $\log_2 (\sqrt{2\pi/e})$ (it is amazing that one can made a precise conjecture based on only 4 digits).

(Add lower bound of sphere packing)

The LP bound is also closely related to the Bourgain-Clozel-Kahane sign uncertainty principle.

(Add more explanation on the sign uncertainty principle.)


## Initial thoughts before reading the report thoroughly

- The proof is heavily complex analytic.
- The result is **asymptotic**, i.e. it says about what happes as $d \to \infty$. In particular, it does not construct optimal (or "magic") functions for any specific dimension $d$. The latter is a much harder problem. Note that the only known exact value of $\mathrm{LP}_d$ is for $d=1,8,24$.
- No modular forms.
- One of the core idea, in my opinion, is to work with the Mellin transform of the function. This idea is originally due to the 2016 paper of [Cohn and Miller](https://arxiv.org/abs/1603.04759) (see Section 5). But the report do not mention about this (it cites CM16 but for radial formulation part, which is standard and less important). This was also mentioned in the [recent article](https://www.scientificamerican.com/article/openais-latest-math-breakthroughs-commit-research-misconduct-experts-say/) in Scientific American, and the report is still not mentioning about the point.
- OpenAI also shared [reasoning walkthroughs](https://cdn.openai.com/pdf/reasoning-walkthroughs.pdf) for the proofs. In case of sphere packing problem, this is nothing but a sketch/summary of the proof; in particular, it is NOT CoT of Astra. I cannot say if this separate document is helpful - I actually tried to read this first, but it was similarly complicated as the original proof.


## Radial and Schwartz reductions

There are some standard reductions that can be made to the problem.

First of all, you can always assume that the functions are radial, i.e. only depend on the norm $|x|$ of the input $x \in \mathbb{R}^d$, since the linear constrains are invariant under the rotations.
You can take the average of the function over $\mathrm{O}(d)$ (or $\mathrm{SO}(d)$)

$$
\mathcal{R}f(x) = \int_{\mathrm{O}(d)} f(Ux) \mathrm{d} U
$$

which satisfies

$$
\widehat{\mathcal{R}f} = \mathcal{R}\widehat{f}, \quad \mathcal{R}f(0) = f(0), \quad r(\mathcal{R}f) \le r(f).
$$

This is a standard argument which is also used in the construction of magic functions for $E_8$ and Leech lattices.

Secondly, you can approximate $L^1$ radial functions by Schwartz functions, so it is enough to consider Schwartz functions.
This can be done by standard mollification argument.
More precisely, if $g \in L^1\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ satisfies $\widehat{g} = \varsigma g$ and $g(0) = 0$ for some $\varsigma \in \\{-1, 1\\}$, then consider the sequence

$$
g_n = p_n - \frac{p_n(0)}{\psi_{\varsigma}(0)} \psi_{\varsigma}
$$

where

$$
\begin{align*}
    &\kappa_n(x) := n^d e^{-\pi n^2|x|^2}, \quad \eta_n(x) = e^{-\pi|x|^2/n^2}, \quad p_n := \eta_n (g * \kappa_n) \\
    &p_n = \frac{q_n + \varsigma \widehat{q_n}}{2}, \quad \psi_+(x) = e^{-\pi|x|^2}, \quad \psi_-(x) = \left(|x|^2 - \frac{d}{4\pi}\right) e^{-\pi|x|^2}
\end{align*}
$$

Then $g_n \in \mathcal{S}\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$, $\widehat{g}_n = \varsigma g_n$, $g_n(0) = 0$, and $g_n \to g$ in $L^1$ as $n \to \infty$.

## Mellin transform

One of important ideas in the proof is to work with the Mellin transform of the function $f$ instead of $f$ itself.
Note that the idea of using Mellin transform is not new; it was used in the 2016 paper of [Cohn and Miller](https://arxiv.org/abs/1603.04759) (see Section 5).
Unfortunately, the report does not mention this point, which was also criticized in the [recent article](https://www.scientificamerican.com/article/openais-latest-math-breakthroughs-commit-research-misconduct-experts-say/) in Scientific American.

We define

$$
\lambda = \frac{d}{2}, \quad S_d = \frac{2\pi^{d/2}}{\Gamma(d/2)}
$$

where $S_d$ is the surface area of the unit sphere in $\mathbb{R}^d$.
For $z$ with $\Re z > 0$, $t \in \mathbb{R}$, and $r > 0$, the Mellin transform of $g$ is defined by

$$
M_g(z) = \int_0^{\infty} g(r) r^{z - 1} \mathrm{d}r
$$

where the inverse Mellin transform is given by

$$
g(r) = \frac{r^{-\lambda}}{2\pi} \int_{\mathbb{R}} X_g(t) r^{it} dt, \quad X_g(t) = M_g(\lambda - it).
$$

The important property of the Mellin transform is that it converts the Fourier transform into a simple functional equations:

$$
M_{\widehat{g}}(z) = \pi^{\lambda - z} \frac{\Gamma(\frac{z}{2})}{\Gamma(\frac{d - z}{2})} M_g(d - z), \quad X_{\widehat{g}}(t) = m_\lambda(t) X_g(-t), \quad m_\lambda(t) = \pi^{it} \frac{\Gamma(\frac{\lambda - it}{2})}{\Gamma(\frac{\lambda + it}{2})}.
$$

## Lower bound

To prove the lower bound of $\mathrm{LP}\_{d}$ or $\mathsf{A}\_{\pm}(d)$, one need bound the radius of first sign change of *any* function from below.
This is mainly obtained by the following proposition.

> **Proposition 3.1.** For every $0 < c < 1/\pi$, there exists $C_c, \gamma_c > 0$ and $d_0(c) \in \mathbb{N}$ such that, for every $d \ge d_0(c)$, every $\varsigma \in \\{-1, +1\\}$, and eveyr nonzero $g \in \mathcal{S}_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ satisfying $\widehat{g} = \varsigma g$ and $g(0) = 0$, one has
>
> $$
> \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1.
> $$


The following proposition is a direct corollary of Proposition 3.1.

> **Proposition 3.7.** For every $0 < c < 1/\pi$, there exists $d_0(c) \in \mathbb{N}$ such that, for every $d \ge d_0(c)$ and $\varsigma \in \\{-1, +1\\}$, no nonzero $g \in L^1(\mathbb{R}^d;\mathbb{R})$ satisfies $\widehat{g} = \varsigma g$, $g(0) = 0$, and $g(x) \le 0$ for $\|x\| \ge c \sqrt{d}$. Here $g$ denotes its continuous Fourier-inversion representative.

> *Proof.* If $g$ is a radial Schwartz function, then $\int g = \widehat{g}(0) = \varsigma g(0) = 0$, and hence its negative part $g\_{-} = \max\\{-g,0\\}$ has integral $\|\|g\|\|_{1}/2$. If $g(x) \ge 0$ for $\|x\| \ge c \sqrt{d}$, then $g\_{-}$ vanishes outside of the ball of radius $c \sqrt{d}$ and we get
>
> $$
> \frac{\|g\|_{1}}{2} = \int_{\mathbb{R}^d} g_{-}(x) \mathrm{d}x = \int_{|x| < c \sqrt{d}} g_{-}(x) \mathrm{d}x \le \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1
> $$
>
> which is a contradiction for large $d$. The general $g \in L^1$ case follows by approximation by radial Schwartz functions.

From this, it is not hard to see that

$$
\liminf_{d \to \infty} \frac{1}{\sqrt{d}} \inf_{F \in \mathcal{A}_d} \left(\frac{F(0)}{\widehat{F}(0)}\right)^{1/d} \ge c
$$

for any $0 < c < 1/\pi$, which implies

$$
\min\left\{\inf_{F \in \mathcal{A}_d} \left(\frac{F(0)}{\widehat{F}(0)}\right)^{1/d}, \mathsf{A}_{-}(d), \mathsf{A}_{+}(d) \right\} \ge \left(\frac{1}{\pi} + o(1)\right) \sqrt{d}.
$$

Then the mysterious constant $\sqrt{e/2\pi}$ comes from

$$
v_d^{1/d} = \left(\frac{\pi^{d/2}}{\Gamma(d/2 + 1)}\right)^{1/d} = \sqrt{\frac{2\pi e}{d}} (1 + o(1))
$$

and $\sqrt{e/2\pi} = 1/2 \cdot \sqrt{2\pi e} \cdot 1/\pi$, where the limit of $v_d^{1/d}$ is obtained by Stirling's formula.

Before we move on to the proof of Proposition 3.1, there are some points to focus on:

- Where the constant $1/\pi$ really comes from?
- We don't need exponential mass concentration for the lower bound, just $o(1)$ is enough.

I'll try to explain the proof focusing on these points.

### Proof of Proposition 3.1

We will estimate the integral of $g$ by estimating the following normalized Mellin transform:

$$
\begin{equation}
Z(t) = \frac{S_d}{\|g\|_1} R^{\lambda + it} X_g(t)
\end{equation}
$$

Also, consider a normalized version of $g$ with logarithmic coordinate $r = Re^v$ for $R = c\sqrt{d}$:

$$
\begin{equation}
\varphi(v) = \frac{S_d}{\|g\|_1} (Re^v)^d g(Re^v).
\end{equation}
$$

This satisfies the following properties:

$$
\|\varphi\|_1 = 1, \quad \int_{\mathbb{R}} \varphi = 0, \quad \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v = \frac{1}{\|g\|_1} \int_{|x| < R} |g(x)| \mathrm{d}x.
$$

It is easy to check that these two functions are related by

$$
Z(t) = \int_{\mathbb{R}} \varphi(v) e^{-(\lambda + it)v} \mathrm{d}v.
$$

The proof of Proposition 3.1 can be divided into the following steps:

1. Bound $Z$ on the strip $\|\Im z\| \le \lambda$ in terms of trigonometric functions and Gamma functions (Lemma 3.2).
2. 
3.
4.
5.


> **Lemma 3.2.** For every $-1 < \sigma < 1$, the function $Z$ is bounded an holomorphic on a neighborhood of the strip $\|\Im t\| \le \lambda$. Its boundary values satisfy $\|Z(y + i\lambda)\| \le 1$ and $\log\|Z(y - i\lambda)\| \le h_\lambda(y)$ for $y \ne 0$, where the lower-boundary majorant is
>
> $$
> h_\lambda(y) = \lambda \log(\pi R^2) + \log |\Gamma(-iy/2)| - \log |\Gamma(\lambda + iy/2)|.
> $$
>
> Writing $\theta = \pi(1+\sigma)/2$, define
>
> $$
> P_\sigma(T) = \frac{\sin\theta}{4(\cosh(\pi T/2) - \cos\theta)}, \quad M_\sigma = \int_{\mathbb{R}} P_\sigma(T) \mathrm{d}T = \frac{1-\sigma}{2}.
> $$
>
> Then
>
> $$
> |Z(s + i\sigma\lambda)| \le \exp(H_\sigma(s)), \quad H_\sigma(s) = \int_{\mathbb{R}} P_\sigma(T) h_\lambda(s - T) \mathrm{d}T \quad (s \in \mathbb{R}).
> $$

> *Proof.*

> **Lemma 3.3.** For every $-1 < \sigma < 1$, there exists $C_\sigma > 0$, independent of $d$, $c$, and $g$, such that
>
> $$
> \int_{\mathbb{R}} P_\sigma(T) \left|h_\lambda(\lambda T) - \lambda \left(\log(2\pi c^2) - \int_0^1 \log \sqrt{x^2 + T^2/4} \mathrm{d}x\right)\right| \mathrm{d}T \le C_\sigma \log(2 + \lambda).
> $$
>
> Define
>
> $$
> J_\sigma := -\frac{1}{M_\sigma} \int_{\mathbb{R}} P_\sigma(T) \int_0^1 \log \sqrt{x^2 + T^2/4} \mathrm{d}x \mathrm{d}T.
> $$
>
> Then, for every $s \in \mathbb{R}$
>
> $$
> H_\sigma(s) \le H_\sigma(0) = \lambda M_\sigma (\log(2\pi c^2) + J_\sigma) + O_\sigma(\log(2 + \lambda)).
> $$

> **Lemma 3.4.** For $J_\sigma$ defined in Lemma 3.3,
>
> $$
> \lim_{\sigma \to 1^{-}} J_\sigma = \log\frac{\pi}{2}.
> $$
>
> Consequently, for every $0 < c < 1/\pi$, there exists $\sigma_c \in (-1, 1)$ such that $\log(2\pi c^2) + J_\sigma < 0$.

In some sense, this lemma is the point where the constant $1/\pi$ comes from.

> *Proof.*

> **Lemma 3.5.** There exists $\gamma_c, C_c', B_c > 0$, depending only on $c$, such that, for every sufficiently large $d$,
>
> $$
> H_\sigma(s) \le -\gamma_c \lambda \quad(s \in \mathbb{R}), \quad \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le C_c' \lambda e^{-\gamma_c \lambda}.
> $$
>
> Moreover, after increasing $B_c$ if necessary,
>
> $$
> H_\sigma(\lambda s) \le - \frac{M_\sigma \lambda}{2} \log \frac{|s|}{C_c'} \quad (|s| \ge B_c).
> $$

> *Proof.*

Using Lemma 3.5, we can bound the integral of $\|\varphi\|$ over $(-\infty, 0)$.

> **Lemma 3.6.** For every $0 < c < 1/\pi$, there exists $C_c, \gamma_c > 0$ and $d_0(c) \in \mathbb{N}$, independent of $g$ and $\varsigma$, such that
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le C_c e^{-\gamma_c d}.
> $$

> *Proof.* From the Fourier inversion formula, we have
>
> $$
> \varphi(v) = \frac{e^{(1 - \sigma)\lambda v}}{2\pi} \int_{\mathbb{R}} Z(s + i\sigma\lambda) e^{isv} \mathrm{d}s.
> $$
>
> Taking absolute values and integrating over $v \in (-\infty, 0)$, we get
>
> $$
> \begin{align*}
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v &\le \frac{1}{2\pi} \int_{-\infty}^{0} e^{(1 - \sigma)\lambda v} \mathrm{d}v \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \\
> &= \frac{1}{2\pi (1 - \sigma)\lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le C_c e^{-\gamma_c d}
> \end{align*}
> $$
>
> where $C_c = \frac{1}{2\pi(1 - \sigma)} C_c'$. $\square$

Now Proposition 3.1 follows from $\int_{-\infty}^{0} \|\varphi(v)\|\mathrm{d}v = \|\|g\|\|\_1^{-1} \int_{\|x\| < c\sqrt{d}} \|g(x)\| \mathrm{d}x$.


## Upper bound

To prove upper bounds, one need to construct *asymptotically optimal* functions.
Note that the didn't construct *exact* optimal functions for all $d$, which would be much harder.
In particular, they construct radial Schwartz functions $f\_{-}$, $f\_{+}$, and $f\_{0}$, satisfying

$$
\widehat{f}_{-} = f_+ > 0, \quad f_{-}(0) = f_{+}(0) = 0, \quad f_{-}(x) < 0 \,\,(|x| > R)
$$

where $R = (\frac{1}{\pi} + o(1)) \sqrt{d}$.
Then the upper bounds of $\mathrm{LP}\_{d}$ and $\mathrm{A}\_{-}(d)$ are obtained by $g = f\_{+} - f\_{-}$ which satisfies $\widehat{g} = -g$ and $g(0) = 0$, while the upper bound of $\mathrm{A}\_{+}(d)$ is obtained by $f\_{0}$.
As mentioned above, they first construct Mellin transforms of the functions.

$$
\begin{align*}
E_\lambda(t) &= \pi^{it/2} \Gamma\left(\frac{\lambda - it}{2}\right) e^{\lambda h_\varsigma(t/\lambda)} \\
P_{\pm}(\zeta) &= 1 + \zeta^2 + \beta \pm i\zeta(1 + \zeta^2), \quad P_0(\zeta) = - (1 + \zeta^2) \\
X_{f_j}(t) &= E_\lambda(t) P_j(t/\lambda), \\
\quad f_j(r) &= \frac{r^{-\lambda}}{2\pi} \int_{\mathbb{R}} X_{f_j}(t) r^{it} dt, \quad (j \in \{-, +, 0\})
\end{align*}
$$

what are the parameters?



## Sign uncertainty principle

## Formalization

There's also an accompanying formalization of the proof in Lean.
The question is, how faithful is the formalization to the report?
See Part 2!



## Extra comments

- The paper defines same term multiple times. It is not a big problem, but slightly annoying. It feels like different sections are written by different people (agents?).

Cohn-Miller

## Conclusion

> Q. Does this proof give any further insight on the problems?
>
> A. `¯\_(ツ)_/¯`
