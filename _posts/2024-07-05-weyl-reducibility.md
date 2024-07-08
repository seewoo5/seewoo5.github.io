---
layout: posts
title:  "Weyl' complete reducibility theorem for semisimple Lie algebra: homological algebra proof"
date:   2024-07-05
categories: jekyll update
tags: math
---

In this article, we reproduce the proof of Weyl's complete reducibility theorem:

> Every finite-dimensional representation of a semisimple Lie algebra is completely reducible.

that uses homological algebra, which can be found [here](https://www.math.stonybrook.edu/~cschnell/mat552/lecture-april-6.pdf).
I recently learned this from one of the exercises comes from the [Koszul duality in the local Langlands program](https://www.slmath.org/summer-schools/1072#overview_summer_graduate_school), and I liked it because it is very clean and easy to remember.


### Universal enveloping algebra and Casimir element

For a Lie algebra $\mathfrak{g}$, *universal enveloping algebra* $\mathcal{U}(\mathfrak{g})$ is defined as

$$
\mathcal{U}(\mathfrak{g}) := T(\mathfrak{g}) / \langle x \otimes y - y \otimes x - [x, y] : x, y \in \mathfrak{g} \rangle
$$

where $T(\mathfrak{g})$ is the tensor algebra

$$
T(\mathfrak{g}) := \bigoplus_{k \geq 0} \mathfrak{g}^{\otimes k} = \mathbb{C} \oplus \mathfrak{g} \oplus (\mathfrak{g} \otimes \mathfrak{g}) \oplus \cdots.
$$

It has the following universal property: for any associative unital algebra $A$ and a Lie algebra homomorphism $\mathfrak{g} \to A$ (where the Lie bracket on $A$ is defined via commutator $[a, b] := ab - ba$) lifts to $\mathcal{U}(\mathfrak{g}) \to A$.

It is often important to understand the center $\mathcal{Z} = \mathcal{Z}(\mathcal{U}(\mathfrak{g}))$ of the univesal enveloping algebra for many reasons - the one reason is it help us to classify irreducible representations of $\mathfrak{g}$.
More precisely, the action of center commutes with other elements' action, and by Schur's lemma they should act as scalars, i.e. a $\mathfrak{g}$-representation admits a central character $\chi : \mathcal{Z}(\mathcal{U}(\mathfrak{g})) \to \mathbb{C}^{\times}$.
One may try to classify representation by fixing a central character first.

For a given representation $\rho : \mathfrak{g} \to \mathrm{End}(V)$, we have a special elemtn $C_V \in \mathcal{Z}$ that satisfy the following lemma:

> **Lemma.** Let $(\rho, V)$ be a nontrivial irreducible representation of a semisimple Lie algebra $\mathfrak{g}$. Then there exists a central element $C_V \in \mathcal{Z}(\mathcal{U}(\mathfrak{g}))$ that acts
> 
> * by a nonzero constant on $V$
> * and by zero on the trivial representation.

We will use this Lemma later, and not going to prove.
The element $C_V$ can be choosen as follows: define a symemtric bilinear form $B_V : \mathfrak{g} \times \mathfrak{g} \to \mathbb{C}$ as $B_V(x, y) := \mathrm{Tr}(\rho(x)\rho(y))$.
When $B_V$ is nondegenerate, choose a basis $x_1, \dots, x_n$ and a dual basis (with respect to $B_V$) $x^1, \dots, x^n$, then

$$
C_V := \sum_{i=1}^{n} x_i x^i
$$

works ($C_V$ does not depend on the choice of basis). When $B_V$ is not non-degenerate, we define $C_V$ by restring it to a semisimple $\mathfrak{g}' \subset \mathfrak{g}$ which $B_V$ is non-degenerate
In fact, when $\mathfrak{g}$ is semisimple, we can just choose the Killing form $B(x, y) := \mathrm{Tr}(\mathrm{ad}(x)\mathrm{ad}(y))$, and the corresponding central element is called the *Casimir element*.



### $\mathrm{Ext}$ groups

There are many ways to define $\mathrm{Ext}$ groups, but possible the right way is to define it as a right derived functor of the functor $\mathrm{Hom}(X, -)$ (which is left exact).
One can compute it via projective or injective resolutions (if exists), but we may not compute it: the only property we are going to use is that it produces long exact sequence from a short exact sequence: from

$$
0 \to A \to B \to C \to 0
$$

we get

$$
\begin{align*}
0 &\to \mathrm{Hom}(X, A) \to \mathrm{Hom}(X, B) \to \mathrm{Hom}(X, C) \\
&\to \mathrm{Ext}^{1}(X, A) \to \mathrm{Ext}^{1}(X, B) \to \mathrm{Ext}^{1}(X, C) \\
&\to \mathrm{Ext}^{2}(X, A) \to \mathrm{Ext}^{2}(X, B) \to \mathrm{Ext}^{2}(X, C) \\
&\to \cdots
\end{align*}
$$

Note that $\mathrm{Ext}$ can be defined for any abelian category, not necessarily $\mathbb{Z}$-modules.

### Weyl's theorem as vanishing $\mathrm{Ext}^{1}$

Now we are ready to give a proof of Weyl's theorem
Let $\mathfrak{g}$ be a semisimple Lie algebra over $\mathbb{C}$, and let $V$ be a representation.
If $V$ is irreducible, there's nothing to prove.
If not, there exist a proper nonzero subrepresentation $V' \subset V$ and so an exact sequence of $\mathfrak{g}$-representations

$$
0 \to V' \to V \to V'' \to 0
$$

with $V'' = V / V'$.
*If we can prove that all the short exact sequences split*, then we get a decomposition $V \simeq V' \oplus V''$, and continue this until we get a complete decomposition as irreducibles.
Hence it is enough to show that $\mathrm{Ext}^{1}(W, V) = 0$ for any $\mathfrak{g}$-representations $V, W$.


### Step 0: $\mathrm{Ext}^{1}(\mathbb{C}, \mathbb{C}) = 0$

We start with trivial representations: showing that all the extensions of $\mathbb{C}$ by $\mathbb{C}$ splits (i.e. $\mathrm{Ext}^{1}(\mathbb{C}, \mathbb{C}) = 0$).
Let 

$$
0 \to \mathbb{C} \to E \to \mathbb{C} \to 0
$$

be a such extension.
Then $E$ is a 2-dimensional representation and can be written as a strictly upper triangular matrix, i.e.

$$
\mathfrak{g} \to \mathrm{End}(E) \simeq \mathfrak{gl}_{2}(\mathbb{C}), \quad x \mapsto \left(\begin{matrix} 0 & \rho'(x) \\ 0 & 0\end{matrix}\right)
$$

by choosing an appropriate basis.
Especially, $[\rho(\mathfrak{g}), \rho(\mathfrak{g})] = 0$ ($\rho(\mathfrak{g})$ is nilpotent).
Since $\mathfrak{g}$ is semisimple, we have $\mathfrak{g} = [\mathfrak{g}, \mathfrak{g}]$ ($\mathfrak{g}' := \mathfrak{g}/[\mathfrak{g}, \mathfrak{g}]$ is semisimple and abelian, so $\mathfrak{g}' = 0$) and get

$$
\rho(\mathfrak{g}) = \rho([\mathfrak{g}, \mathfrak{g}]) = [\rho(\mathfrak{g}), \rho(\mathfrak{g})] = 0,
$$

i.e. $\mathfrak{g}$ acts trivially on $E$. Hence $\rho' = 0$ and the above sequence splits. 


### Step 1: $\mathrm{Ext}^{1}(\mathbb{C}, V) = 0$ for irreducible $V$

In other words, we need to prove that any extension

$$
0 \to V \to E \to \mathbb{C} \to 0
$$

splits.
Recall that the Casimir element $C_V \in \mathcal{U}(\mathfrak{g})$ of $V$ acts on $V$ as a nonzero scalar $\lambda$ and trivially on $\mathbb{C}$.
If we consider eigenspace decomposition of $C_V$ on $E$, $V \subset E$ becomes $\lambda$-eigenspace of multiplicity $\dim V$, and 0-eigenspace $W$ of multiplicity 1, with $E = V \oplus W$.
This gives a splitting with $W \simeq \mathbb{C}$.

### Step 2: $\mathrm{Ext}^{1}(\mathbb{C}, V) = 0$ for any $V$

We can prove the same statement for any $V$ via induction on dimension of $V$.
If $V$ is not irreducible, we can find a nonzero proper subrepresentation $V' \subset V$ that gives a short exact sequence

$$
0 \to V' \to V \to V'' \to 0
$$

Here both $V', V''$ are nonzero and have smaller dimensions.
Now take $\mathrm{Hom}(\mathbb{C}, -)$ and we get a long exact sequence

$$
\cdots \to \mathrm{Hom}(\mathbb{C}, V'') \to \mathrm{Ext}^{1}(\mathbb{C}, V') \to \mathrm{Ext}^{1}(\mathbb{C}, V) \to \mathrm{Ext}^{1}(\mathbb{C}, V'') \to \cdots
$$

and by inductive hypothesis, $\mathrm{Ext}^{1}(\mathbb{C}, V') = 0 = \mathrm{Ext}^{1}(\mathbb{C}, V'')$, so we get $\mathrm{Ext}^{1}(\mathbb{C}, V) = 0$.

### Step 3: $\mathrm{Ext}^{1}(W, V) = 0$ for any $W, V$

For a representation $V$, define $V^{\mathfrak{g}}$ as a $\mathfrak{g}$-trivial part of $V$, i.e. 

$$
V^{\mathfrak{g}} := \{v \in V: x.v = 0, \,\forall x \in \mathfrak{g}\}.
$$

One can check that this is naturally isomorphic to

$$
\mathrm{Hom}(\mathbb{C}, V)
$$

where $\mathbb{C}$ is the trivial representation (observe where $1 \in \mathbb{C}$ goes).
Also, by the definition of $\mathfrak{g}$-action on $\mathrm{Hom}\_{\mathbb{C}}(V, V')$, one can check that

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
0 \to \mathrm{Hom}_{\mathbb{C}}(W, V) \to \mathrm{Hom}_{\mathbb{C}}(W, E) \to \mathrm{Hom}_{\mathbb{C}}(W, W) \to 0
$$

Now apply $(-)^{\mathfrak{g}} = \mathrm{Hom}(\mathbb{C}, -)$ to this exact sequence.
By Step 2, $\mathrm{Ext}^{1}(\mathbb{C}, \mathrm{Hom}\_{\mathbb{C}}(V, W)) = 0$ and get an another short exact sequence:

$$
0 \to \mathrm{Hom}(W, V) \to \mathrm{Hom}(W, E) \to \mathrm{Hom}(W, W) \to 0
$$

Especially, we have $\mathrm{id}\_{W} \in \mathrm{Hom}(W, W)$ and there exists $s \in \mathrm{Hom}(W, E)$ that maps to $\mathrm{id}\_{W}$.
In particular, we get a section $W \to E$ of $E \to W$, which shows that the original exact sequence splits.
This completes the proof. $\square$

