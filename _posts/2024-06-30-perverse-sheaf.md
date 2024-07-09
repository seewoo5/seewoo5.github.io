---
layout: posts
title:  "Kazhdan-Lusztig Polynomials and perverse sheaves"
date:   2024-07-08
categories: jekyll update
tags: math
---

The goal of this post is to introduce [Kazhdan-Lusztig polynomials](https://en.wikipedia.org/wiki/Kazhdan%E2%80%93Lusztig_polynomial) and its connection to perverse sheaves.
Especially, I'll try to explain as easy as possible, so that the readers who are not familiar with perverse sheaves (including myself) can understand the history.
There are many good references on the topic, including ...


### Representation of semisimple Lie algebra

Let $\mathfrak{g}$ be a complex *semisimple* Lie algebra[^1].
Our goal is to understand representations of $\mathfrak{g}$.
By [Weyl's complete reducibility theorem](https://seewoo5.github.io/jekyll/update/2024/07/05/weyl-reducibility.html), we know that any finite dimensional representation of $\mathfrak{g}$ decomposes into irreducibles.
Hence it is enough to study irreducible representations.
These can be understood by *highest weight* as follows:

> **Definition.** Let $\mathfrak{h} \subset \mathfrak{g}$ be the Cartan subalgebra and $\Phi \subset \mathfrak{h}^\ast$ be a root system of $\mathfrak{g}$ (i.e. "eigenvalues" of adjoint representation $\mathrm{ad}: \mathfrak{g} \to \mathfrak{gl}(\mathfrak{g})$). Choose a subset $\Phi^+ \subset \Phi$ of positive roots. There exists a nondegenerate bilinear form $\langle -, -\rangle: \mathfrak{h}^\ast \times \mathfrak{h}^\ast \to \mathbb{C}$ (dual of Killing form).
> An element $\lambda \in \mathfrak{h}^\ast$ is called
> - **integral** if $$ 2 \frac{\langle \lambda, \alpha\rangle}{\langle \alpha, \alpha \rangle} $$ is integer for all $\alpha \in R$
> - **dominant** if $\langle \lambda, \alpha\rangle \geq 0$ for all $\alpha \in R^+$.
> 
> We also give a partial order $\lambda \geq \mu$ on $\mathfrak{h}^\ast$ when $\lambda - \mu$ can be written as a nonnegative integer combination of positive roots.


> **Definition.** A weight $\lambda$ of a representation $V$ of $\mathfrak{g}$ is called the **highest weight** if $\lambda \geq \mu$ for any other weights $\mu$ of $V$.


> **Theorem.** 
> 1. Any finite dimensional irreducible reprsentation $V$ of $\mathfrak{g}$ has a unique highest weight that is integral and dominant.
> 2. Two finite dimensional irreducible representations are isomorphic if their highest weights are the same.
> 3. For each integral dominant $\lambda \in \mathfrak{h}^\ast$, there exists a finite dimensional representation of highest weight $\lambda$.
>
> In other words, we have a bijection between the set of integral dominant elements in $\mathfrak{h}^\ast$ and the finite dimensional irreducible representations of $\mathfrak{g}$ (up to isomorphism).


The most basic but also the most important example is $\mathfrak{g} = \mathfrak{sl}\_{2}$.
It has dimension $3$ and we have a famous basis called $\mathfrak{sl}\_{2}$-triples:

$$
e = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad f = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \quad h = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
$$

which satisfy the famous relations

$$
[h, e] = 2e, \quad [h, f] = -2f, \quad [e, f] = h.
$$




### Kazhdan-Lusztig polynomials


### Perverse sheaves


[^1]: I believe everything mentioned works well over any algebraically closed field of characteristic zero, at least for the representations of semisimple Lie algebras.

