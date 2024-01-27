---
layout: posts
title:  "Icosahedral Galois Representations"
date:   2024-01-25
categories: jekyll update
tags: math
---

### Galois representations and Artin's $L$-functions

Let $\rho : \Gamma_K \to \mathrm{GL}_{2}(\mathbb{C})$ be a (continuous) irreducible complex 2-dimensional Galois representation of the absolute Galois group $\Gamma_K = \mathrm{Gal}(\overline{K} / K)$ of a number field $K$.
One can associate the Artin's $L$-function as

$$
L(s, \rho) = \prod_{\mathfrak{p}} \det(1 - \rho^{I_\mathfrak{p}}(\mathrm{Frob}_\mathfrak{p})(N\mathfrak{p})^{-s})^{-1},
$$

where

* $\mathfrak{p} \subset \mathcal{O}_K \subset K$ is a prime ideal,
* $G_\mathfrak{p} \subset G_K$ is the decomposition group at $\mathfrak{p}$,
* $I_\mathfrak{p} \subset G_\mathfrak{p}$ is the inertia group at $\mathfrak{p}$,
* $\mathrm{Frob}\_\mathfrak{p} \in G_\mathfrak{p} / I_\mathfrak{p}$ is the (arithmetic) Frobenius (only defined up to conjugation),
* $N\mathfrak{p}$ is the norm of $\mathfrak{p}$, which is the cardinality of the residue field $\mathcal{O}_K / \mathfrak{p}$.

For example, 1-dimensional Galois representations are in bijection with Hecke characters via class field theory, and the corresponding $L$-functions are Hecke $L$-functions, which is known to satisfy all the desired properties (admits analytic continuation, functional equations, ...).
Artin conjectured that the same is true for general $n$-dimensional Galois representations, and the only other known cases follow from stronger result - they are all automorphic.
In other words, the Artin $L$-functions that are proven to have nice properties are actually coincide with some automorphic $L$-functions $L(s, \pi)$.
Note that Brauer already proved that Artin $L$-functions admit *meromorphic* continuations via the famous [Brauer Induction Theorem](https://en.wikipedia.org/wiki/Brauer%27s_theorem_on_induced_characters), which implies that any Artin $L$-functions can be written as quotients of products of Hecke $L$-functions.

Due to Klein, we have a complete classification of *projective* image of $\overline{\rho}: \Gamma_K \to \mathrm{PGL}_2(\mathbb{C})$: which are

* (dihedral) $D_{2n}, n \geq 2$,
* (tetrahedral) $A_4$,
* (octahedral) $S_4$,
* (icosahedral) $A_5$.

Note that they are all solvable **except for icosahedral case ($A_5$)**.
Langlands and Tunnell proved that, when $K = \mathbb{Q}$, if the projective image $\mathrm{Im}(\overline{\rho}) \subset \mathrm{PGL}_{2}(\mathbb{C})$ is solvable (i.e. it is not icosahedral) and *odd* (i.e. $\det(\rho(c)) = -1$ for the complex conjugation $c \in \Gamma\_\mathbb{Q}$), then it is modular - there exists a Hecke eigenform $f(z) = \sum\_{n\geq 1} a_n e^{2 \pi i n z}$ of weight $1$ and certian levels & Nebentypus, such that 

$$
b_p = \mathrm{Tr}(\rho(\mathrm{Frob}_p))
$$

for almost all $p$. Then the Artin conjecture in this case automatically follows from nice properties of $L(s, f)$.
Proof is based on Langlands' result on cyclic base change and the ancient results by Hecke and Maass for dihedral cases (see [this](https://math.berkeley.edu/~fernando/exposition/seminar_talks/Langlands-Tunnell%20theorem.pdf) nice note by Ravi for sketch of the proof).
But since $A_5$ is simple, we don't have any proper subgroup that allow us to use inductive arguments, which explains why the icosahedral case is harder and remains open in general.

But still, there *exists* icosahedral Galois representations and even the corresponding modular forms are known - which are conjectured to exist by Langlands' dream.
In this post, instead of *heavy theory*, I'll introduce the *examples* of such Galois representations and modular forms found by several people.

Before we proceed further, note that constructing icosahedral Galois representations of $\Gamma\_\mathbb{Q}$ is essentially the same thing as finding $A_5$-extensions of $\mathbb{Q}$, by considering the fixed field of the kernel $\overline{\rho}: \Gamma_\mathbb{Q} \to A_5 \hookrightarrow \mathrm{PGL}_2(\mathbb{C})$.


### *Odd* icosahedral representations and modular forms



### *Even* icosahedral representations (and Maass forms?)