---
layout: posts
title:  "Weyl' complete reducibility theorem for semisimple Lie algebra - homological algebra proof"
date:   2024-07-03
categories: jekyll update
tags: math
---

In this article, we reproduce the proof of Weyl's complete reducibility theorem:

> Every finite-dimensional representation of a semisimple Lie algebra is completely reducible.

using homological algebra, which can be found [here](https://www.math.stonybrook.edu/~cschnell/mat552/lecture-april-6.pdf).
I recently learned this proof from the SLMath summer school on [Koszul duality in the local Langlands program](https://www.slmath.org/summer-schools/1072#overview_summer_graduate_school).
The proof in Humphrey's book uses ...


### Universal enveloping algebra and Casimir element




### Ext groups



### Step 1: $\mathrm{Ext}^{1}(\mathbb{C}, V) = 0$ for irreducible $V$


### Step 2: $\mathrm{Ext}^{1}(\mathbb{C}, V) = 0$ for any $V$


### Step 3: $\mathrm{Ext}^{1}(W, V) = 0$ for any $W, V$.

For a representation $V$, define $V^{\mathfrak{g}}$ as a $\mathfrak{g}$-trivial part of $V$, i.e. 

$$
V^{\mathfrak{g}} := \{v \in V: x.v = 0, \,\forall x \in \mathfrak{g}\}.
$$

One can check that this is naturally isomorphic to

$$
\mathrm{Hom}(\mathbb{C}, V)
$$

where $\mathbb{C}$ is the trivial representation (observe where $1 \in \mathbb{C}$ goes).
Also, by definition of $\mathfrak{g}$-action on $\mathrm{Hom}\_{\mathbb{C}}(V, V')$, one can check that

$$
\mathrm{Hom}_{\mathbb{C}}(V, V')^{\mathfrak{g}} = \mathrm{Hom}(V, V')
$$

(the later Hom is $\mathfrak{g}$-linear homomorphisms as before).

Recall that our final goal is equivalent to proving all $\mathrm{Ext}^{1}$ group vanishes.
Let

$$
0 \to V \to E \to W \to 0
$$

be an arbitrary short exact sequence (of $\mathfrak{g}$-representations).
We first apply the functor $\mathrm{Hom}\_{\mathbb{C}}(W, -)$, $\mathbb{C}$-linear hom (*not* $\mathfrak{g}$-linear hom), which is *exact* (any short exact sequence of vector spaces splits):

$$
0 \to \mathrm{Hom}_{\mathbb{C}}(W, W) \to \mathrm{Hom}_{\mathbb{C}}(W, E) \to \mathrm{Hom}_{\mathbb{C}}(W, V) \to 0
$$


