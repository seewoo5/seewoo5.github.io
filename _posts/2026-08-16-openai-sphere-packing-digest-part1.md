---
layout: posts
title:  "Understanding Astra's result on the high-dimensional sphere-packing problem — Part 1: Digestion"
date:   2026-08-27
categories: jekyll update
tags: math ai
---

The goal of this post is to *digest* Astra's proof of the exact asymptotic rate of the optimal Cohn-Elkies linear program and the sharp sign-uncertainty constant.
The proof appears in Chapter 1 of [OpenAI's report](https://cdn.openai.com/pdf/ten-proofs-oai.pdf).
The main results are the following:

> **Theorem 1.1.**
>
> $$ \lim_{d \to \infty} \mathrm{LP}_{d}^{1/d} = \sqrt{\frac{e}{2\pi}}.$$
>
> In particular,
>
> $$ \Delta_d \le 2^{-(\frac{1}{2}\log_2(2\pi/e) + o(1))d} = 2^{-(0.6044\ldots + o(1)) d}. $$

> **Theorem 1.2.**
>
> $$ \lim_{d \to \infty} \frac{\mathsf{A}_{+}(d)}{\sqrt{d}} = \lim_{d \to \infty} \frac{\mathsf{A}_{-}(d)}{\sqrt{d}} = \frac{1}{\pi}. $$

Note that this blog post is also written with help of AI.

## Problem setting and background

The sphere-packing problem is a well-studied problem in discrete geometry. It asks for the densest packing of congruent spheres in $\mathbb{R}^d$.
We denote the optimal packing density by $\Delta\_d$.
$d = 1$ is trivial ($\Delta\_1 = 1$), while the $d = 2$ case was solved by L. Fejes Tóth in the 1940s: the hexagonal ($A\_2$-lattice) packing is optimal.
The $d = 3$ case is the famous Kepler conjecture, which T. Hales proved in 1998 and the Flyspeck project later formally verified using HOL Light and Isabelle.
Viazovska solved the $d = 8$ case in 2016, and Cohn, Kumar, Miller, Radchenko, and Viazovska solved the $d = 24$ case one week later, using the Cohn-Elkies linear-programming (LP) bound introduced below.
The other dimensions are still open.

One may ask for bounds in *high* dimensions.
Kabatiansky and Levenshtein (1978) proved the following upper bound:

$$
\Delta_d \le 2^{-(0.5990\ldots + o(1)) d}
$$

as $d \to \infty$.

The exponent $0.5990\ldots$ remained unchanged, but the multiplicative constant was sharpened: [Cohn and Zhao (2014)](https://projecteuclid.org/journals/duke-mathematical-journal/volume-163/issue-10/Sphere-packing-bounds-via-spherical-codes/10.1215/00127094-2738857.full) obtained an average multiplier $1/1.2635\ldots$, [Sardari and Zargar (2024)](https://link.springer.com/article/10.1007/s00208-023-02738-z) obtained $0.4325+51/d$ for $d\ge2000$, and [Zargar (2024)](https://arxiv.org/abs/2407.10697) later obtained $(1+o(1))/e$. These refinements improve the prefactor, not the exponential rate $2^{-(0.5990\ldots+o(1))d}$.

The sphere packing problem is closely related to the following optimization problem.
We work with "nice" $\mathbb{R}$-valued functions $f$ on $\mathbb{R}^d$, mostly Schwartz functions (denoted by $\mathcal{S}(\mathbb{R}^d;\mathbb{R})$), with Fourier transform

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

The Cohn-Elkies theorem states that the optimal sphere packing density $\Delta\_d$ in $\mathbb{R}^d$ is bounded by

$$
\Delta_d \le \mathrm{LP}_d.
$$

The proof is based on the Poisson summation formula and is conceptually simple, but the resulting bound is remarkably powerful.
It was used to prove the optimality of the $E\_8$ and Leech lattices in dimensions 8 and 24: Viazovska and then Cohn, Kumar, Miller, Radchenko, and Viazovska constructed "magic" functions $f$ in $\mathcal{A}\_d$ using modular forms that match the densities of those lattice packings.
It is also known that the LP bound is *suboptimal* in dimensions $3,4,5,6,7$ (see [Li25](https://www.sciencedirect.com/science/article/pii/S0001870824005590)).

[Cohn and Zhao](https://projecteuclid.org/journals/duke-mathematical-journal/volume-163/issue-10/Sphere-packing-bounds-via-spherical-codes/10.1215/00127094-2738857.pdf) showed that the LP bound is at least as strong as the KL bound.
Later, [Afkhami-Jeddi, Cohn, Hartman, de Laat, and Tajdini](https://link.springer.com/article/10.1007/JHEP12(2020)066) conjectured that the optimal asymptotic exponent obtainable from the LP bound is better than the KL exponent. More precisely, Conjecture 3.2 in their paper predicts that

$$
\lim_{d \to \infty} \mathrm{LP}_d^{1/d} = \sqrt{\frac{e}{2\pi}},
$$

which implies

$$
\Delta_d \le 2^{-(\frac{1}{2}\log_2(2\pi/e) + o(1))d} = 2^{-(0.6044\ldots + o(1)) d}.
$$

They conjectured the constant from numerical experiments, observing that their numerical exponent $0.6044\ldots$ is close to $\log\_2(\sqrt{2\pi/e})$. It is remarkable that four decimal digits were enough to suggest the exact expression.

Note that the upper bound is quite far from the best known lower bound.
[Rogers](https://doi.org/10.2307/1969390) proved $\Delta\_d\ge cd\,2^{-d}$ for sufficiently large $d$, and [Venkatesh (2013)](https://math.stanford.edu/~akshay/research/sp.pdf) improved this by a factor $\log\log d$ along an infinite sequence of dimensions, proving $\Delta\_d\ge(1/2-o(1))d\log\log d\,2^{-d}$ there. [Campos, Jenssen, Michelen, and Sahasrabudhe (2023)](https://arxiv.org/abs/2312.10026) later established the general bound $\Delta\_d\ge(1/2-o(1))d\log d\,2^{-d}$ in every sufficiently large dimension. [Klartag (2026)](https://link.springer.com/article/10.1007/s00222-026-01412-w) then proved the uniform bound $\Delta\_d\ge cd^2 2^{-d}$, even for lattice packings; combining Klartag's method with Venkatesh's cyclotomic symmetries, [Abuya, Gargava, and Zhao (2026)](https://arxiv.org/abs/2606.05105) obtained $\Delta\_d\ge cd^2\log\log d\,2^{-d}$ along an infinite sequence of dimensions.

The LP bound is also closely related to the Bourgain-Clozel-Kahane sign uncertainty principle.
For a Fourier eigenfunction $\widehat g=\varsigma g$, with $\varsigma\in\lbrace-1,+1\rbrace$, define its eventual-nonnegativity radius by

$$
r(g):=\inf\{R\ge 0:g(x)\ge0\text{ whenever }|x|\ge R\},
$$

and define

$$
\mathsf A_{\varsigma}(d):=\inf\{r(g):0\ne g\in L^1(\mathbb R^d;\mathbb R),\ \widehat g=\varsigma g,\ g(0)=0\}.
$$

It was known that $\mathsf A\_+(d)$ and $\mathsf A\_-(d)$ are both finite, and has a growth rate of $c\sqrt{d}$.
Prior to Astra's work, the best uniform lower and upper bounds were

$$
\sqrt{\frac{d}{4\pi}} \le \mathrm{A}_+(d) \le \sqrt{\frac{d+2}{2\pi}}.
$$

The upper bound is by Bourgain-Clozel-Kahane, and the lower bound (for $d \ge 5$) is by [Edwin](https://arxiv.org/abs/2505.15994).
Recently, I proved [new upper bound](https://arxiv.org/abs/2608.15415)

$$
\mathrm{A}_+(d) \le \sqrt{2\left\lfloor \frac{d}{16}\right\rfloor + 2}
$$

for all $d \equiv 0 \pmod{4}$ (prompted by OpenAI's announcement; see [the blog post](https://seewoo5.github.io/jekyll/update/2026/08/16/sign-uncertainty-principle.html)).


## Initial thoughts before reading the report thoroughly

I guess the above introduction is enough to understand the main results (Theorem 1.1 and Theorem 1.2). Here are some initial thoughts after reading the report superficially:

- Overall proof is not very long.
- The proof relies heavily on complex analysis.
- The result is **asymptotic**: it describes what happens as $d \to \infty$. In particular, it does not construct an optimal (or "magic") function in any specific dimension $d$, which is a much harder problem. The only dimensions in which the exact value of $\mathrm{LP}\_d$ is known are $d=1,8,24$. Moreover, knowing $\mathrm{LP}\_d$ exactly does not by itself solve sphere packing in dimension $d$, because the LP bound need not be tight; it is known to be suboptimal in several small dimensions (including 3, 4, 5, 6, 7 by [de Courcy-Ireland, Dostert, Viazovska](https://www.google.com/goto?url=CAEShQEB6zswFQBTboPFHBueMxcPsQ8ubiC_du8x_DPlTiUeYGRD3fxU3gzNLjoMrza4OjPSXwhZJhXqI1aEH-wU_nKdYE4i0p4qoODkcG6ICrlXiz9Ea3piatxDsQyKLuuRnzfTBi2Irq_eihZ7Gvd99HVyRDnK3nuN9Y3H2krMlNMVjMZXTAuI) and [Li](https://www.sciencedirect.com/science/article/abs/pii/S0001870824005590)) and is conjectured to be suboptimal in high dimensions as well.
- No modular forms.
- The choices of variables and notation are quite inconsistent. This may sound minor, but minimizing the number of symbols and using them consistently matters a great deal for readability. Of course, many humans are also not good at this.
- One of the core ideas, in my opinion, is to work with the Mellin transform. Such an idea first appears in Section 5 of the 2016 paper by [Cohn and Miller](https://arxiv.org/abs/1603.04759). The report cites CM16 for the radial formulation but does not discuss this particular precedent, which is also mentioned in the [recent *Scientific American* article](https://www.scientificamerican.com/article/openais-latest-math-breakthroughs-commit-research-misconduct-experts-say/).
- OpenAI also shared [reasoning walkthroughs](https://cdn.openai.com/pdf/reasoning-walkthroughs.pdf) for the proofs. For the sphere-packing problem, the walkthrough is a sketch or summary rather than Astra's chain of thought. I first tried reading it before the report, but it wasn't helpful. It would be more helpful if it was a detailed Chain of Thought.


## Radial and Schwartz reductions

There are some standard reductions that can be made to the problem.

First, one can assume that the functions are radial, i.e., depend only on the norm $\lvert x\rvert$ of $x \in \mathbb{R}^d$, because the linear constraints are rotation-invariant.
One can take the average over $\mathrm{O}(d)$ using normalized Haar measure:

$$
\mathcal{R}f(x) = \int_{\mathrm{O}(d)} f(Ux) \mathrm{d} U
$$

which satisfies

$$
\widehat{\mathcal{R}f} = \mathcal{R}\widehat{f}, \quad \mathcal{R}f(0) = f(0), \quad \widehat{\mathcal Rf}(0)=\widehat f(0).
$$

This standard argument is also used in constructing magic functions for the $E\_8$ and Leech lattices.
Radialization also satisfies $r(\mathcal Rg)\le r(g)$, so we may assume that $g$ is radial in the sign uncertainty problem as well.

Second, radial $L^1$ eigenfunctions can be approximated by Schwartz eigenfunctions, which follows from a standard mollification argument.
More precisely, suppose that $g \in L^1\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ satisfies $\widehat{g} = \varsigma g$ and $g(0) = 0$ for some $\varsigma \in \lbrace-1,1\rbrace$. Define

$$
g_n = p_n - \frac{p_n(0)}{\psi_{\varsigma}(0)} \psi_{\varsigma}
$$

where

$$
\begin{align*}
    &\kappa_n(x) := n^d e^{-\pi n^2|x|^2}, \quad \eta_n(x) := e^{-\pi|x|^2/n^2}, \quad q_n := \eta_n (g * \kappa_n), \\
    &p_n := \frac{q_n + \varsigma \widehat{q_n}}{2}, \quad \psi_+(x) := e^{-\pi|x|^2}, \quad \psi_-(x) := \left(|x|^2 - \frac{d}{4\pi}\right) e^{-\pi|x|^2}.
\end{align*}
$$

Then $g\_n \in \mathcal{S}\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$, $\widehat{g}\_n = \varsigma g\_n$, $g\_n(0) = 0$, and $g\_n \to g$ in $L^1$ as $n \to \infty$.

## Mellin transform

The key analytic move is to work with the Mellin transform of the radial profile $g$ rather than directly with $g$.
As noted above, the idea first appears in CM16.

We define

$$
\lambda = \frac{d}{2}, \quad S_d = \frac{2\pi^{d/2}}{\Gamma(d/2)}
$$

where $S\_d$ is the surface area of the unit sphere in $\mathbb{R}^d$. Write $g(r)$ for the one-variable radial profile. For $\Re z>0$, define

$$
M_g(z) = \int_0^{\infty} g(r) r^{z - 1} \mathrm{d}r
$$

On the critical line, set $X\_g(t)=M\_g(\lambda-it)$. Mellin inversion then gives, for $r>0$,

$$
g(r) = \frac{r^{-\lambda}}{2\pi} \int_{\mathbb{R}} X_g(t) r^{it} \,\mathrm dt.
$$

The important property of the Mellin transform is that it converts the Fourier transform into simple functional equations:

$$
M_{\widehat{g}}(z) = \pi^{\lambda - z} \frac{\Gamma(\frac{z}{2})}{\Gamma(\frac{d - z}{2})} M_g(d - z), \quad X_{\widehat{g}}(t) = m_\lambda(t) X_g(-t), \quad m_\lambda(t) = \pi^{it} \frac{\Gamma(\frac{\lambda - it}{2})}{\Gamma(\frac{\lambda + it}{2})}.
$$

## Lower bound

To prove lower bounds for $\mathrm{LP}\_d$ and $\mathsf A\_{\pm}(d)$, one needs a lower bound for the eventual-nonnegativity radius of *every* relevant function.
This is mainly obtained by the following proposition.

> **Proposition 3.1.** For every $0 < c < 1/\pi$, there exist $C\_c, \gamma\_c > 0$ and $d\_0(c) \in \mathbb{N}$ such that, for every $d \ge d\_0(c)$, every $\varsigma \in \lbrace-1,+1\rbrace$, and every nonzero $g \in \mathcal{S}\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ satisfying $\widehat{g} = \varsigma g$ and $g(0) = 0$, one has
>
> $$
> \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1.
> $$


The following proposition is a direct corollary of Proposition 3.1.

> **Proposition 3.7.** For every $0 < c < 1/\pi$, there exists $d\_0(c) \in \mathbb{N}$ such that, for every $d \ge d\_0(c)$ and $\varsigma \in \lbrace-1,+1\rbrace$, no nonzero $g \in L^1(\mathbb{R}^d;\mathbb{R})$ satisfies $\widehat{g} = \varsigma g$, $g(0) = 0$, and $g(x) \ge 0$ for $\lVert x\rVert \ge c \sqrt{d}$. Here $g$ denotes its continuous Fourier-inversion representative.

> *Proof of Proposition 3.7.* If $g$ is a radial Schwartz function, then $\int g = \widehat{g}(0) = \varsigma g(0) = 0$, and hence its negative part $g\_- = \max\lbrace-g,0\rbrace$ has integral $\lVert g\rVert\_1/2$. If $g(x) \ge 0$ for $\lVert x\rVert \ge c \sqrt{d}$, then $g\_-$ vanishes outside the ball of radius $c \sqrt{d}$ and
>
> $$
> \frac{\|g\|_{1}}{2} = \int_{\mathbb{R}^d} g_{-}(x) \mathrm{d}x = \int_{|x| < c \sqrt{d}} g_{-}(x) \mathrm{d}x \le \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1
> $$
>
> which is a contradiction for large $d$.
>
> For a general $g\in L^1$, first replace it by its radialization $h=\mathcal Rg$. Let $h\_n$ be the radial Schwartz eigenfunctions constructed above. They need not remain nonnegative outside the ball, but their negative parts satisfy, with $R=c\sqrt d$,
>
> $$
> \frac12\|h_n\|_1=\int_{\mathbb R^d}(h_n(x))_-\,\mathrm dx
> \le \int_{|x|<R}|h_n(x)|\,\mathrm dx+\|h_n-h\|_1.
> $$
>
> Proposition 3.1 bounds the first term. Letting $n\to\infty$ gives $\lVert h\rVert\_1/2\le C\_ce^{-\gamma\_cd}\lVert h\rVert\_1$, again a contradiction for large $d$. $\square$


How this is used to prove the lower bound for $\mathrm{LP}\_d$ and $\mathsf A\_{\pm}(d)$?
Let $F\in\mathcal{A}\_d$ be a nonzero function.
After rotational averaging, assume that $F$ is radial and hence even. Set

$$
a=\left(\frac{\widehat F(0)}{F(0)}\right)^{1/d},\qquad h(x)=F(ax),\qquad g=\widehat h-h.
$$

Then $\widehat g=-g$, $g(0)=0$, and the admissibility conditions imply $g(x)\ge0$ for $\lvert x\rvert\ge1/a$. Moreover, $g\ne0$: otherwise $h$ would be a nonzero compactly supported self-Fourier function, contradicting Fourier analyticity. Proposition 3.7 therefore forces $1/a>c\sqrt d$ for every fixed $c<1/\pi$ and all sufficiently large $d$, and hence

$$
\liminf_{d \to \infty} \frac{1}{\sqrt{d}} \inf_{F \in \mathcal{A}_d} \left(\frac{F(0)}{\widehat{F}(0)}\right)^{1/d} \ge c
$$

for every $0 < c < 1/\pi$. Proposition 3.7 directly gives the same lower bound for each sign-uncertainty radius, namely $\mathsf A\_\varsigma(d)>c\sqrt d$.
Hence

$$
\min\left\{\inf_{F \in \mathcal{A}_d} \left(\frac{F(0)}{\widehat{F}(0)}\right)^{1/d}, \mathsf{A}_{-}(d), \mathsf{A}_{+}(d) \right\} \ge \left(\frac{1}{\pi} - o(1)\right) \sqrt{d}.
$$

The mysterious constant $\sqrt{e/(2\pi)}$ then comes from

$$
v_d^{1/d} = \left(\frac{\pi^{d/2}}{\Gamma(d/2 + 1)}\right)^{1/d} = \sqrt{\frac{2\pi e}{d}} (1 + o(1))
$$

and $\sqrt{\frac{e}{2\pi}} = \frac12\sqrt{2\pi e}\cdot\frac1\pi$. The asymptotic formula for $v\_d^{1/d}$ follows from Stirling's formula.
Now, let's prove Proposition 3.1.

### Proof of Proposition 3.1

We estimate the mass of $g$ inside the ball using the following normalized Mellin transform:

$$
Z(t) = \frac{S_d}{\|g\|_1} R^{\lambda + it} X_g(t)
$$

Also, consider a normalized version of $g$ with logarithmic coordinate $r = Re^v$ for $R = c\sqrt{d}$:

$$
\varphi(v) = \frac{S_d}{\|g\|_1} (Re^v)^d g(Re^v).
$$

This satisfies the following properties:

$$
\|\varphi\|_1 = 1, \quad \int_{\mathbb{R}} \varphi(v) \mathrm{d}v = 0, \quad \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v = \frac{1}{\|g\|_1} \int_{|x| < R} |g(x)| \mathrm{d}x.
$$

It is easy to check that these two functions are related by

$$
Z(t) = \int_{\mathbb{R}} \varphi(v) e^{-(\lambda + it)v} \mathrm{d}v.
$$

The proof of Proposition 3.1 can be divided into the following steps:

1. Bound $Z$ on the strip $\lvert \Im t\rvert\le\lambda$ as $\lvert Z(s + i\sigma\lambda) \rvert \le \exp(H\_\sigma(s))$, where $H\_\sigma(s)$ is a function can be express in terms of Gamma function and Poisson kernel (Lemma 3.2).
2. Prove that $H\_\sigma(s)$ maximizes at $s=0$, and estimate $H\_\sigma(0)$ in terms of an integral $J\_\sigma$ (Lemma 3.3).
3. Evaluate the limit of $J\_\sigma$ as $\sigma \to 1^{-}$; this is where the threshold $c<1/\pi$ appears (Lemma 3.4).
4. Combine uniform negativity with a logarithmic frequency tail to obtain an exponentially small $L^1$ bound for $Z$ (Lemma 3.5).
5. Apply shifted Mellin/Fourier inversion to transfer the $L^1$ bound for $Z$ to the negative-half-line mass of $\varphi$ (Lemma 3.6).

Let's start with the first step.

> **Lemma 3.2.** For every $-1 < \sigma < 1$, the function $Z$ is bounded and holomorphic on a neighborhood of the strip $\lvert \Im t\rvert\le\lambda$. Its boundary values satisfy $\lvert Z(y+i\lambda)\rvert\le1$ and $\log\lvert Z(y-i\lambda)\rvert\le h\_\lambda(y)$ for $y\ne0$, where the lower-boundary majorant is
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
> |Z(s + i\sigma\lambda)| \le \exp(H_\sigma(s)), \quad H_\sigma(s) = \int_{\mathbb{R}} P_\sigma(T) h_\lambda(s - \lambda T) \mathrm{d}T \quad (s \in \mathbb{R}).
> $$

The bounds on the upper and lower boundaries of the strip are just intermediate steps, and the main goal is to bound $Z$ inside the strip.
This follows by applying an upper-half-plane Poisson principle to $\log\lvert Z\rvert$.

> **Informal upper-half-plane Poisson principle.** Let $b : \mathbb{R} \to \mathbb{R}$ satisfy the weighted integrability needed below, and define $P[b] : \mathbb{H} \to \mathbb{R}$ by
>
> $$
> P[b](x + iy) = \frac{1}{\pi} \int_{\mathbb{R}} \frac{y}{(t - x)^2 + y^2} b(t) \mathrm{d}t.
> $$
>
> If $u$ is subharmonic and bounded above on $\mathbb H$, and bounded above on the boundary $\mathbb R = \partial\mathbb H$ by $b$, then $u\le P[b]$ on $\mathbb H$.
>


> *Proof of Lemma 3.2.* We first prove the bounds on the upper and lower boundaries of the strip. The upper-boundary estimate $\lvert Z(y+i\lambda)\rvert\le1$ follows almost immediately from the normalization, while the lower-boundary estimate follows from the Mellin functional equation:
>
> $$
> Z(y-i\lambda) = \varsigma (\pi R^2)^{\lambda + iy} \frac{\Gamma(-iy/2)}{\Gamma(\lambda + iy/2)} Z(-y + i\lambda).
> $$
>
> To prove the interior bound, map the strip to the upper half-plane and invoke the Poisson formula there. The conformal map is
>
> $$
> \Phi(z) = \exp\left(\frac{\pi(z + i\lambda)}{2\lambda}\right)
> $$
>
> which maps the lower boundary $\Im z=-\lambda$ to $(0,\infty)$ and the upper boundary $\Im z=\lambda$ to $(-\infty,0)$. It maps $z=s+i\sigma\lambda$ to
>
> $$
> \Phi(s + i\sigma\lambda) = \rho e^{i\theta}, \quad \rho = \exp\left(\frac{\pi s}{2\lambda}\right), \quad \theta = \frac{\pi(1+\sigma)}{2}.
> $$
>
> The map is a biholomorphism from the strip $\lvert \Im z\rvert<\lambda$ to the upper half-plane $\mathbb{H}$. We apply the Poisson principle to $u(z)=\log\lvert Z(\Phi^{-1}(z))\rvert$, which is subharmonic because both $Z$ and $\Phi^{-1}$ are holomorphic.
> One technical difficulty is that $h\_\lambda(y)$, which bounds the lower-edge data carried to the positive real axis, has a singularity at $y=0$:
>
> $$h_\lambda(y) = -\log|y| + O_\lambda(1),\quad y \to 0.$$
>
> To deal with this, truncate $h\_\lambda$. Fortunately, $Z$ is bounded on the lower boundary:
>
> $$ \sup_{y \in \mathbb{R}} |Z(y - i\lambda)| \le \frac{S_d R^d}{\|g\|_1} \int_{0}^{\infty} \frac{|g(r)|}{r} \mathrm{d}r < \infty. $$
>
> ($g(r) = O(r^2)$ as $r \to 0$, and $g$ is Schwartz, so the integral converges.)
> Let
>
> $$
> h_{\lambda,D}(y)=
> \begin{cases}
> \min\{h_\lambda(y),D\},&y\ne0,\\
> D,&y=0.
> \end{cases}
> $$
>
> and choose $D>\max\lbrace0,\sup\_{y \in \mathbb{R}}\log\lvert Z(y-i\lambda)\rvert\rbrace$. Since $\log\lvert Z\rvert\le0$ on the upper boundary, which maps to the negative real axis under $\Phi$, we may majorize its boundary data there by zero and only integrate the nontrivial data over the positive real axis:
>
> $$
> \begin{align*}
> \log |Z(s + i\sigma \lambda)| &= u(\Phi(s + i\sigma\lambda)) \\
> &\le \int_{0}^{\infty} \frac{1}{\pi} \cdot \frac{\rho\sin\theta}{(t - \rho\cos\theta)^2 + (\rho\sin\theta)^2} h_{\lambda, D}\!\left(\frac{2\lambda}{\pi}\log t\right) \mathrm{d}t
> \end{align*}
> $$
>
> where $\Phi(s+i\sigma\lambda)=\rho\cos\theta+i\rho\sin\theta$. Now substitute $t=e^{\pi y/(2\lambda)}$, corresponding to the lower-boundary point $y-i\lambda$. Since
>
> $$
> \mathrm{d}t=\frac{\pi t}{2\lambda}\,\mathrm{d}y,
> \qquad
> (t-\rho\cos\theta)^2+(\rho\sin\theta)^2
> =t^2-2\rho t\cos\theta+\rho^2,
> $$
>
> the usual upper-half-plane Poisson measure becomes
>
> $$
> \begin{aligned}
> \frac{1}{\pi}
> \frac{\rho\sin\theta}
> {(t-\rho\cos\theta)^2+(\rho\sin\theta)^2}\,\mathrm{d}t &=
> \frac{\sin\theta}{2\lambda} \frac{\rho t}{t^2-2\rho t\cos\theta+\rho^2}\,\mathrm{d}y\\
> &= \frac{\sin\theta}{2\lambda\left(t/\rho+\rho/t-2\cos\theta\right)}\,\mathrm{d}y \\
> &= \frac{\sin\theta}
> {4\lambda\left(\cosh\left(\frac{\pi(s-y)}{2\lambda}\right)-\cos\theta\right)}\,\mathrm{d}y \\
> &= \frac{1}{\lambda} P_\sigma\left(\frac{s-y}{\lambda}\right)\,\mathrm{d}y.
> \end{aligned}
> $$
>
> Substituting this identity in the Poisson integral gives
>
> $$
> \begin{align*}
> \int_{0}^{\infty} \frac{1}{\pi} \cdot \frac{\rho\sin\theta}{(t - \rho\cos\theta)^2 + (\rho\sin\theta)^2} h_{\lambda, D}\!\left(\frac{2\lambda}{\pi}\log t\right) \mathrm{d}t 
> &= \int_{\mathbb{R}} \frac{1}{\lambda} P_\sigma\left(\frac{s-y}{\lambda}\right) h_{\lambda, D}(y) \mathrm{d}y \\
> &= \int_{\mathbb{R}} P_\sigma(T) h_{\lambda, D}(s - \lambda T) \mathrm{d}T.
> \end{align*}
> $$
>
> The exponential decay of $P\_\sigma$ dominates both the locally integrable logarithmic singularity and the logarithmic growth at infinity. Dominated convergence therefore permits $D\to\infty$, proving the upper bound in $H\_\sigma(s)$. $\square$

Next, we bound $H\_\sigma$.
Lemma 3.3 and Lemma 3.4 are intermediate steps toward Lemma 3.5.

> **Lemma 3.3.** For every $-1 < \sigma < 1$, there exists $C\_\sigma > 0$, independent of $d$, $c$, and $g$, such that
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

We have

$$
H_\sigma(0) = \int_{\mathbb{R}} P_\sigma(T) h_\lambda(-\lambda T) \mathrm{d}T = \int_{\mathbb{R}} P_\sigma(T) h_\lambda(\lambda T) \mathrm{d}T
$$

since $P\_\sigma$ and $h\_\lambda$ are even functions. So the first inequality implies

$$
\lvert H_\sigma(0) - \lambda M_\sigma (\log(2\pi c^2) + J_\sigma)\rvert \le C_\sigma \log(2 + \lambda)
$$

which is the last estimate in the lemma.
We will focus on proving the first inequality and $H\_\sigma(s) \le H\_\sigma(0)$.
The following lemma is also used in the last step of the proof, which I think worth mentioning.

> **Lemma (Convolution of even nonnegative monotone functions).** Let $f$ and $g$ be two nonnegative even functions on $\mathbb{R}$ decreasing on $[0,\infty)$. Then their convolution $f * g$ is maximized at $0$.

> *Proof.* We have
>
> $$f(x) = \int_0^\infty \mathbf{1}_{\{f(x) > a\}} \mathrm{d}a, \quad g(x) \int_0^\infty \mathbf{1}_{\{g(x) > b\}} \mathrm{d}b$$
>
> Let
>
> $$(-r_a, r_a) = \{f(x) > a\}, \quad (-R_b, R_b) = \{g(x) > b\} $$
>
> Then Tonelli's theorem gives
>
> $$(f * g)(x) = \int_{0}^{\infty} \int_{0}^{\infty} |(-R_b, R_b) \cap (x - r_a, x + r_a)| \mathrm{d} a \mathrm{d}b$$
>
> and the intersection is maximized at $x=0$. $\square$

> *Proof of Lemma 3.3.* The difference between $h\_\lambda(\lambda T)$ and
>
> $$\lambda\left(\log(2\pi c^2) - \int_0^1 \log \sqrt{x^2 + T^2/4} \mathrm{d}x\right)$$
>
> is bounded by expressing $h\_\lambda(\lambda T)$ in terms of Riemann sums of $f\_T(x)=\log\sqrt{x^2+T^2/4}$ and controlling the error. For example, if $d=2n$ is even, then $n=\lambda$. For $T\ne0$, the identities $\Gamma(z+1)=z\Gamma(z)$ and $\lvert \Gamma(ib)\rvert=\lvert \Gamma(-ib)\rvert$ for $b \in \mathbb{R}$ give
>
> $$ h_n(nT) = n\log(2\pi c^2) - \sum_{k=0}^{n-1} f_T\left(\frac{k}{n}\right) $$
>
> and monotonicity of $f\_T$ gives
>
> $$ 0 \le h_n(nT) - n \left(\log(2\pi c^2) - \int_0^1 f_T(x) \mathrm{d}x \right) \le f_T(1) - f_T(0) = \frac{1}{2} \log \left(1 + \frac{4}{T^2}\right).$$
>
> The product of the above bound with Poisson kernel $P\_\sigma(T)$ over $\mathbb{R}$ is integrable (by splitting the integral into $\lvert T\rvert\le1$ and $\lvert T\rvert>1$), which can be bounded by a constant only depending on $\sigma$, but not in $n$, $c$, or $g$.
>
> When $d=2n+1$ is odd, so that $\lambda=n+\tfrac12$, use
>
> $$
>\frac{\lvert\Gamma(-ib)\rvert^2}
> {\lvert\Gamma(\frac12+ib)\rvert^2}
> =\frac{\coth(\pi\lvert b\rvert)}{\lvert b\rvert}
> $$
>
> to have
>
> $$
> h_\lambda(\lambda T)
> =\lambda\log(2\pi c^2)
> -\sum_{k=0}^{n-1}f_T\left(\frac{k+1/2}{\lambda}\right)
> +\frac12\log\lambda
> +\frac12\log\frac{\coth(\pi \lambda \lvert T\rvert /2)}{\lambda\lvert T\rvert/2}.
> $$
>
> In this case, we consider the error between the integral $\int\_0^1 = \int\_0^{\frac{n}{\lambda}} + \int\_{\frac{n}{\lambda}}^{1}$ and the midpoint sum:
>
> $$
> \begin{aligned}
> &h_\lambda(\lambda T) -\lambda\left(\log(2\pi c^2)-\int_0^1f_T(x)\,\mathrm{d}x\right)\\
> &=\lambda \left(\int_0^{\frac{n}{\lambda}} f_T(x)\,\mathrm{d}x -\frac{1}{\lambda}\sum_{k=0}^{n-1}f_T\left(\frac{k+1/2}{\lambda}\right) \right)
> +\lambda\int_{\frac{n}{\lambda}}^1f_T(x)\,\mathrm{d}x \\
> &\quad +\frac12\log\lambda + \frac12\log\frac{\coth(\pi \lambda \lvert T\rvert /2)}{\lambda\lvert T\rvert/2}.
> \end{aligned}
> $$
>
> The difference between the integral and the midpoint sum is bounded by $\lambda (f\_T(\frac{n}{\lambda}) - f\_T(0)) \le \lambda(f\_T(1) - f\_T(0)) = \frac12 \log (1 + \frac{4}{T^2})$, and the second integral is bounded by $\lambda \cdot (1 - \frac{n}{\lambda}) f\_T(1) = \frac14 \log(1 + \frac{T^2}{4})$. Including the last two logarithmic terms, the total error is bounded by
>
> $$ C_\sigma\left(1 + \log(2 + \lvert T \rvert) + \log (2 + \lvert T \rvert^{-1}) + \log(2 + \lambda)\right) $$
>
> and integrating over $P\_\sigma(T)$ gives the desired bound.
>
> It remains to prove that $H\_\sigma(s)$ is maximized at $s=0$. Since $P\_\sigma$ and $h\_\lambda$ are even, $H\_\sigma$ is even. It is clear that $P\_\sigma(T)$ is decreasing on $(0, \infty)$, and the same is true for $h\_\lambda(T)$ since
>
> $$h_\lambda'(y) = \frac{\Im\psi(\lambda + iy/2) - \Im\psi(iy/2)}{2} < 0$$
>
> for $y > 0$, where $\psi = \Gamma'/\Gamma$ is the digamma function and $\Im\psi(a + bi) = \sum\_{k \ge 0} \frac{b}{(k+a)^2 + b^2}$.
> Consider $q\_{\lambda, N}(T) := \max\lbrace h\_\lambda(\lambda T) + N, 0\rbrace$, which is nonnegative, even, and decreasing on $(0,\infty)$.
> Then convolution of two such functions is largest at zero, so $(P\_\sigma * q\_{\lambda, N})(s) \le (P\_\sigma * q\_{\lambda, N})(0)$ for all $s \in \mathbb{R}$. Subtracting the constant $NM\_\sigma$ and $q\_{\lambda, N} - N = \max\lbrace h\_\lambda, -N\rbrace$ gives
>
> $$ \int_{\mathbb{R}} P_\sigma(T) \max\lbrace h_\lambda(-\lambda T), -N \rbrace \mathrm{d}T \le \int_{\mathbb{R}} P_\sigma(T) \max\lbrace h_\lambda(s - \lambda T), -N\rbrace \mathrm{d}{T} $$
>
> and passing to the limit $N \to \infty$ gives $H\_\sigma(s) \le H\_\sigma(0)$. $\square$


> **Lemma 3.4.** For $J\_\sigma$ defined in Lemma 3.3,
>
> $$
> \lim_{\sigma \to 1^{-}} J_\sigma = \log\frac{\pi}{2}.
> $$
>
> Consequently, for every $0<c<1/\pi$, there exists $\sigma(c)\in(-1,1)$ such that $\log(2\pi c^2)+J\_{\sigma(c)}<0$.

This is precisely where the constant $1/\pi$ enters, since

$$
\log(2\pi c^2)+\log(\pi/2)=\log(\pi^2c^2)<0
\quad\Longleftrightarrow\quad c<1/\pi.
$$

> *Proof of Lemma 3.4.* After writing $T=2u$ and normalizing by the mass $M\_\sigma$, the lower-edge harmonic measure becomes a probability density $p\_\sigma(u)$. As $\sigma\uparrow1$, these densities converge in $L^1$ to
>
> $$
> p(u)=\frac\pi4\operatorname{sech}^2\left(\frac{\pi u}{2}\right).
> $$
>
> Its characteristic function is $t/\sinh t$. A Laplace-transform calculation then gives
>
> $$
> \int_{\mathbb R}p(u)\log\sqrt{x^2+u^2}\,\mathrm du
> =\psi\left(\frac{x+1}{2}\right)+\log2,
> $$
>
> where $\psi=\Gamma'/\Gamma$. Integrating over $0\le x\le1$ and using $\int\_0^1\psi((x+1)/2)\,\mathrm dx=-\log\pi$ yields $\lim\_{\sigma\uparrow1}J\_\sigma=\log(\pi/2)$.

Fix from now on a value $\sigma=\sigma(c)$ for which the preceding expression is negative.

> **Lemma 3.5.** There exist $\gamma\_c, C\_c', B\_c > 0$, depending only on $c$, such that, for every sufficiently large $d$,
>
> $$
> H_\sigma(s) \le -\gamma_c \lambda \quad(s \in \mathbb{R}), \quad \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le C_c' \lambda e^{-\gamma_c \lambda}.
> $$
>
> Moreover, after increasing $B\_c$ if necessary,
>
> $$
> H_\sigma(\lambda s) \le - \frac{M_\sigma \lambda}{2} \log \frac{|s|}{C_c'} \quad (|s| \ge B_c).
> $$

> *Proof sketch.* Lemma 3.3 and the choice of $\sigma$ give the uniform bound $H\_\sigma(s)\le-\gamma\_c\lambda$. Uniform negativity alone is not integrable over the frequency line, so one also uses the Gamma recurrence in $h\_\lambda$ to obtain the logarithmic tail
>
> $$
> H_\sigma(\lambda s)\le-\frac{M_\sigma\lambda}{2}\log\frac{|s|}{C_c'}.
> $$
>
> Integrating separately over a bounded central interval and its complement gives $\int\_{\mathbb R}e^{H\_\sigma(s)}\,\mathrm ds\le C\_c''\lambda e^{-\gamma\_c\lambda}$ after decreasing $\gamma\_c$ if necessary. Lemma 3.2 then gives the stated $L^1$ estimate for $Z$.

Using Lemma 3.5, we can bound the integral of $\lvert \varphi\rvert$ over $(-\infty,0)$.

> **Lemma 3.6.** For every $0 < c < 1/\pi$, there exist $C\_c, \gamma\_c > 0$ and $d\_0(c) \in \mathbb{N}$, independent of $g$ and $\varsigma$, such that
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le C_c e^{-\gamma_c d}.
> $$

> *Proof.* Set $G(v)=e^{(\sigma-1)\lambda v}\varphi(v)$. One checks that $G\in L^1(\mathbb R)$ and that its angular-frequency Fourier transform is $Z(s+i\sigma\lambda)$. Lemma 3.5 makes this transform integrable, so Fourier inversion gives
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
> &= \frac{1}{2\pi (1 - \sigma)\lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s
> \le \frac{C_c'}{2\pi(1-\sigma)}e^{-\gamma_c d/2}
> \end{align*}
> $$
>
> where $\lambda=d/2$. Renaming $C\_c'/(2\pi(1-\sigma))$ and $\gamma\_c/2$ gives the asserted form $C\_ce^{-\gamma\_cd}$. $\square$

Proposition 3.1 now follows from

$$
\int_{-\infty}^{0}|\varphi(v)|\,\mathrm dv
=\frac1{\|g\|_1}\int_{|x|<c\sqrt d}|g(x)|\,\mathrm dx.
$$


## Upper bound

To prove the upper bounds, one needs to construct *asymptotically optimal* functions. The report does not construct exact optimizers in every dimension, which would be much harder.

For each sufficiently small fixed $\varepsilon>0$ and all sufficiently large $d$, Theorem 4.1 constructs radial Schwartz functions $f\_-$, $f\_+$, and $f\_0$, together with a radius $R\_{\varepsilon,d}$, such that

$$
\widehat f_-=f_+>0,\qquad \widehat f_0=f_0,\qquad
f_-(0)=f_+(0)>0,\qquad f_0(0)=0,
$$

and

$$
f_-(x)<0<f_0(x)\qquad(|x|\ge R_{\varepsilon,d}).
$$

Moreover,

$$
\lim_{\varepsilon\downarrow0}\lim_{d\to\infty}\frac{R_{\varepsilon,d}}{\sqrt d}=\frac1\pi.
$$

A diagonal choice $\varepsilon=\varepsilon\_d\downarrow0$ gives a single radius sequence $R\_d=(1/\pi+o(1))\sqrt d$. The three upper bounds use the construction in different ways:

- For the LP bound, set $F(x)=f\_-(R\_{\varepsilon,d}x)$. Then $F\in\mathcal A\_d$ and $F(0)/\widehat F(0)=R\_{\varepsilon,d}^d$.
- For $\mathsf A\_-(d)$, use $g\_-=f\_+-f\_-$, which satisfies $\widehat g\_-=-g\_-$ and $g\_-(0)=0$.
- For $\mathsf A\_+(d)$, use the self-Fourier function $f\_0$.

The first bullet closes the LP upper bound, because

$$
\mathrm{LP}_d^{1/d}
\le \frac{v_d^{1/d}}{2}R_d
\longrightarrow \sqrt{\frac{e}{2\pi}}.
$$

The construction begins by prescribing the Mellin transforms of the functions:

$$
\begin{align*}
E_\lambda(t) &= \pi^{it/2} \Gamma\left(\frac{\lambda - it}{2}\right) e^{\lambda h_\varepsilon(t/\lambda)} \\
P_{\pm}(\zeta) &= 1 + \zeta^2 + \beta \pm i\zeta(1 + \zeta^2), \quad P_0(\zeta) = - (1 + \zeta^2) \\
X_{f_j}(t) &= E_\lambda(t) P_j(t/\lambda), \\
\quad f_j(r) &= \frac{r^{-\lambda}}{2\pi} \int_{\mathbb{R}} X_{f_j}(t) r^{it} dt, \quad (j \in \{-, +, 0\})
\end{align*}
$$

The substantial missing piece in this draft is the proof behind this ansatz: the signed density defining $h\_\varepsilon$, the choices of $\beta$ and the shell parameters, the damping estimates, the saddle-point analysis establishing the exterior signs, and the contour-shift argument proving that $f\_+$ is positive even at small radii.



## Sign uncertainty principle

Proposition 3.7 supplies the common lower bound for both sign-uncertainty constants, while the functions $g\_-$ and $f\_0$ above supply the matching upper bounds. Thus

$$
\frac{\mathsf A_+(d)}{\sqrt d}\longrightarrow\frac1\pi,
\qquad
\frac{\mathsf A_-(d)}{\sqrt d}\longrightarrow\frac1\pi.
$$

The common asymptotic does not mean the constants are equal in each dimension: Appendix A proves the strict inequality $\mathsf A\_+(d)<\mathsf A\_-(d)$.

## Formalization

There's also an accompanying formalization of the proof in Lean.
How faithfully does it reflect the report?
See [Part 2]({% post_url 2026-08-16-openai-sphere-packing-digest-part2 %}).



## Extra comments

- The paper defines the same term more than once. This is not a serious issue, but it makes an already notation-heavy argument harder to follow.

## Conclusion

The lower-bound mechanism is now reasonably complete: Mellin transform, strip Poisson estimate, the $1/\pi$ threshold, and Fourier inversion. A full digestion of the upper construction remains future work.

> Q. Does this proof give any further insight into these problems?
>
> A. `¯\_(ツ)_/¯`
