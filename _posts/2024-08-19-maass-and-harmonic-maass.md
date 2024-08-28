---
layout: posts
title:  "Maass wave forms and Harmonic Maass forms"
date:   2024-08-18
categories: jekyll update
tags: math
---

In this note, we explain the common confusion between Maass wave forms and *Harmonic* Maass forms.
Both are analytic functions defined on the complex upper half plane with certain $\mathrm{SL}\_2(\mathbb{Z})$-invariance properties (or more generally, under certain congruence subgroups $\Gamma \subseteq \mathrm{SL}\_2(\mathbb{Z})$) and eigenfunctions under certain Laplacian operator**s**.
However, you will find that the definitions of Laplacian operators are different for each object, which yield completely different objects.
In fact, I asked [a question](https://math.stackexchange.com/questions/3077741/definition-of-weight-k-laplacian) on it few years ago, and it randomly poped up again in my head, so I decided to record the answer to my own question here.
In short, they are *very* different object; especially, Maass wave forms of eigenvalue 0 are *not* harmonic Maass forms.


## Maass wave forms

Maass wave forms are defined as follows:

> **Definition.** (Maass wave form) A function $f: \mathfrak{H} \to \mathbb{C}$ is a *Maass wave form* of weight $k$ and level $\Gamma \subseteq \mathrm{SL}\_2(\mathbb{Z})$ if
> 1. $f$ is real-analytic,
> 2. $(f\|_k \gamma)(z) = f(z)$,
where $$(f\|_k \gamma)(z) := \left(\frac{cz + d}{|cz + d|}\right)^{-k} f(\gamma z)$$
 for $\gamma = \left(\begin{smallmatrix}a&b \\\ c&d\end{smallmatrix}\right) \in \Gamma$,
> 3. $\Delta_k^w f = \lambda f$ for some $\lambda \in \mathbb{C}$, where $$\Delta_k^w := -y^2 \left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + iky \frac{\partial}{\partial x}\right),$$
> 4. $f$ has a moderate growth at cusps of $\Gamma$.

The definition is similar to that of holomorphic modular forms, but now $f$ is not holomorphic, rather an eigenfunction of a Laplacian operator $\Delta_k^w$.

The easiest example to construct is "real-analytic" Eisenstein series, which is analogous to the "holomorphic" Eisenstein series.
Recall that (level 1) holomorphic Eisenstein series are defined as a Poisson series for a constant (holomorphic!) function $1$

$$
\sum_{\gamma \in \Gamma_\infty \backslash \mathrm{SL}_{2}(\mathbb{Z}) } (1|_k \gamma)(z) = C \cdot \sum_{(0, 0) \ne (m, n) \in \mathbb{Z}^{2}} \frac{1}{(mz + n)^k}
$$

for some constant $C \ne 0$, where $\Gamma\_\infty = \\{ \pm \left(\begin{smallmatrix} 1 & n \\\ 0 & 1 \end{smallmatrix}\right): n \in \mathbb{Z}\\} = \mathrm{Stab}\_\Gamma(1)$, which converges absolutely for $k > 2$.
Simiarly, real-analytic Eisenstein series can be constructed as a Poisson series associated to the function $z \mapsto \Im(z)^s = y^s$, which is an eigenfunction of $\Delta_k^w$ with $\lambda = s (1 - s)$:

$$
E_k(z, s) := \sum_{\gamma \in \Gamma_\infty \backslash \mathrm{SL}_{2}(\mathbb{Z})} (y^s \|_k \gamma) = \sum_{(c, d) = 1} \left(\frac{cz + d}{|cz + d|}\right)^{-k} \frac{y^s}{|cz + d|^{2s}}.
$$


Unfortunately, we don't know much about Maass wave forms that are *cusp forms*.
Contrary to holomorphic modular forms, we cannot *multiply* Maass wave forms, since the result is not an eigenfunction under the Laplacian anymore.
(Note that the discriminant modular form $\Delta(z)$ can be defined in terms of polynomials in $E_4$ and $E_6$.)
It is known that there are infinitely many Maass wave forms of given level and weight (with distinct eigenvalues) by Weyl's law, but it is very hard to construct them explicitly.
For example, we don't even know any explicit example of weight $0$ and level $\mathrm{SL}\_2(\mathbb{Z})$ Maass wave forms, although we know the smallest eigenvalue upto 100 decimal places (see [Booker et al.](https://www.math.ias.edu/~akshay/research/bsv.pdf)).
For higher levels, Hecke construct cusp forms which are associated with Hecke characters of *real* quadratic fields.
More precisely, we have a following theorem.

> **Theorem.** (Hecke)


## Harmonic Maass forms

> **Definition.** (Harmonic Maass form) 




## Holomorphic modular forms as Maass wave forms or harmonic Maass forms

It is possible to consider holomorphic modular forms as both Maass wave forms or harmonic Maass forms.

### Modular forms as Maass wave forms

Let $f(z)$ be a holomorphic modular form of weight $k$ and level $\Gamma$.
Then we can embed it into a space of Maass wave forms as follows:

> **Proposition.** The function $z \mapsto F(z) := y^{k/2} f(z)$ is a Maass form of weight $k$, for $z = x + iy$.

Proof is straightforward calculation from

$$
\frac{\partial}{\partial \bar{z}} f(z) = \frac{1}{2} \left(\frac{\partial}{\partial x} + i \frac{\partial}{\partial y}\right) f(z) = 0
$$

by Cauchy-Riemann equation, which gives

$$
\Delta_{k}^{w} F = \frac{k}{2} \left(1 - \frac{k}{2}\right) F.
$$


### Modular forms as harmonic Maass forms

The space of modular forms naturally embed into the space of harmonic Maass forms - we don't even need any extra factors like $y^{k/2}$ in the case of Maass wave forms.

> **Proposition.** Any holomorphic modular forms are harmonic Maass forms.




