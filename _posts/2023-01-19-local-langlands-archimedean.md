---
layout: posts
title:  "Local Langlands Correspondence over Archimedean Fields"
date:   2023-01-19
categories: jekyll update
tags: math
---

In this post, we present the statement of Local Langlands Correspondence (LLC) over archimedean fields ($\mathbb{R}$ and $\mathbb{C}$) and sketch a proof.
The main reference is Knapp [ref], Borel [ref], and Jacquet [ref].


## Statement of Local Langlands Correspondence


Langlands correspondence relates *certain* representations of reductive groups and representations of *Galois groups*.
More precisely, for a given local field $F$ and a reductive group $G$ over $F$, *local* Langlands correspondence relates

$$
\text{admissible representations of }  G(F)
$$

and

$$
\text{admissible and continuous homomorphisms } \varphi: W_F \to {}^{L}G
$$

where $W_F$ is a Weil(-Deligne) group and ${}^{L}G$ is a Langlands dual group of $G$.
($W_F$ is not exactly the Galois group $\mathrm{Gal}(\overline{F}/F)$, but an extension or a semi-direct product with some other group. We'll see the precise definition soon.)
We want the correspondences preserve some invariants such as $L$-functions.
We will first see the case of $G = \mathrm{GL}_n$, and move on to the general reductive groups $G$ over $\mathbb{R}$ or $\mathbb{C}$.


## Representations of $\mathrm{GL}_n(\mathbb{R})$

We first study and classify representations of $G = \mathrm{GL}_n(\mathbb{R})$. Our goal is to understand Langlands' classification.
In short, we will see that *admissible* representations of $\mathrm{GL}_n(\mathbb{R})$ are obtained by parabolic induction of irreducible admissible representations of $\mathrm{GL}_1(\mathbb{R)}$ and $\mathrm{GL}_2(\mathbb{R})$, where the latter representations (building blocks for the represenetations of $\mathrm{GL}_n(\mathbb{R})$) are easy to be classified.


Let $K=O(n)$ be the maximal compact subgroup of $\mathrm{GL}\_n(\mathbb{R})$ ($n\times n$ orthogonal matrices).
The right category of representations to study is the *admissible* representations, which are the representations $(\rho, V)$ of $\mathrm{GL}\_n(\mathbb{R})$ whose restrictions $\rho|_{K}$ on $K$ decompose as irreducibles with finite multiplicities.
For such representations, let $V_K$ be the space of $K$-finite vectors, that transforms in a finite-dimensional space under $K$.
The nice thing about admissible representations is that, classifying them is equivalent to classify associated $(\mathfrak{g}, K)$-modules [ref], which is a space $V_K$ with compatible actions of the Lie algebra $\mathfrak{g} = \mathfrak{gl}\_n(\mathbb{R})$ and $K$.
In other words, two admissible representations are equivalent if and only if the corresponding $(\mathfrak{g}, K)$-modules are isomorphic (*infinitesimally equivalent*).
Also, irreduciblity is preserved under the association.
Now our goal is to study admissible representations of $\mathrm{GL}\_n(\mathbb{R})$ and classify them.

Let's consider the subgroup $\mathrm{SL}\_{n}^{\pm}(\mathbb{R})$ of elements $g \in \mathrm{GL}\_n(\mathbb{R})$ with $|\det g| = 1$ and representations of them.
Then $\mathrm{SL}\_n(\mathbb{R})$ has index 2 in it.
When $n=1$, $\mathrm{SL}\_{1}^{\pm}(\mathbb{R}) = \{\pm 1\}$ and there are only two (irreducible) representations of it: $1$ (trivial) and $\mathrm{sgn}$ (sign).
Then all the irreducible admissible representations can be obtained by tensoring it with the power of norm characters $a \mapsto |a|^{t}\_{\mathbb{R}}$ for $t \in\mathbb{C}$.
Hence we have two types of irreducible admissible representations of $\mathrm{GL}\_1(\mathbb{R})$: 
$1 \otimes |\cdot |\_{\mathbb{R}}^{t}$ and $\mathrm{sgn} \otimes |\cdot |\_{\mathbb{R}}^{t}$.

When $n =2$, there's essentially 

## Representations of $W_\mathbb{R}$

## LLC for $\mathrm{GL}_n(\mathbb{R})$

> **Theorem (Local Langlands Correspondence for $\mathrm{GL}_n(\mathbb{R})$)** 

## LLC for $\mathrm{GL}_n(\mathbb{C})$

## LLC for general reductive groups over $\mathbb{R}$ or $\mathbb{C}$


*References*:

[1] D. Whitehouse, *An introduction to the trace formula*, Lecture note, 2010