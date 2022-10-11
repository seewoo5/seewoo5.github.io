---
layout: posts
title:  "Weil-Deligne group and Weil-Deligne group"
date:   2022-10-10
categories: jekyll update
tags: math
---

(Yes, you read it correctly.)

Yesterday, I encountered *two* different definitions of Weil-Deligne groups.
Although both definitions are extensions of a Weil group, one is a non-split extension by $\mathbb{C}$ and the other is just a direct product with $\mathrm{SL}_{2}(\mathbb{C})$.

> **<ins>Definition 1 (Weil-Deligne group)</ins>**
>Let $F$ be a non-archimedean local field and $W_F$ be the Weil group of $F$.
> The Weil-Deligne group of $F$ is defined as a semi-direct product 
> 
> $$
> W_{F}' := W_{F} \ltimes \mathbb{C}
> $$
> 
> with the action of $W_F$ on $\mathbb{C}$ given by 
>
> $$
> gxg^{-1} = ||g||x, \quad g \in W_F, x \in \mathbb{C}
> $$
>
>where $g$ acts on the residue field of $F$ via $a \mapsto a^{\|\|g\|\|}$. The group structure of $W_F'$ is given by 
> 
> $$(g_1, x_1)(g_2, x_2) := \left(g_1 g_2, x_1 + ||g_1||x_2 \right).$$
> 

> **<ins>Definition 2 (Weil-Deligne group)</ins>**
> Let $F$ be a non-archimedean local field and $W_F$ be the Weil group of $F$.
> The Weil-Deligne group of $F$ is defined as a direct product
> 
> $$
> W_F' := W_F \times \mathrm{SL}_{2}(\mathbb{C}).
> $$

These two definitions come from slightly different context. 
The first definition is more Galois-theoretic than the second definition, and it is also known that the category of $\ell$-adic representations of $\mathrm{Gal}(\overline{F}/F)$ embeds fully faithfully into the category of representations of Weil-Deligne group $W_F'$ (see Tate's article [2]).
The second definition is used to define $L$-parameters and their $L$-functions (see 12.2 of [3]).
The goal of this post is to explain how the representations of Weil-Deligne groups with the above definitions become equivalent.
Before we start, we'll explain the representations of each group first.

### Representations of $W_F'= W_F \ltimes \mathbb{C}$

Finite dimensional complex representations of $W_F'$ are continuous homomorphisms from $W_F'$ to $\mathrm{GL}_n(\mathbb{C})$.
One can check that giving such representation $\sigma' :W_F' \to \mathrm{GL}_n(\mathbb{C})$ is equivalent to give a pair $(\sigma, N)$ where $\sigma :W_F \to \mathrm{GL}_n(\mathbb{C})$ is $n$-dimensional representation of $W_F$ and $N \in \mathrm{GL}_n(\mathbb{C})$ is a nilpotent element satisfying

$$
\sigma(g) N \sigma(g)^{-1} = ||g||N
$$

for $g \in W_F$.
We can recover $\sigma'$ from $(\sigma, N)$ by[^1]

$$
\sigma'((g, x)) = \exp(xN)\sigma(g),
$$

which becomes a homomorphism from $W_F'$ to $\mathrm{GL}_n(\mathbb{C})$:

$$
\begin{align*}
\sigma'((g_1, x_1)(g_2, x_2)) &=  \sigma'\left(g_1 g_2, x_1 + ||g_1||x_2\right) \\
&= \exp \left(\left(x_1 + ||g_1||x_2\right)N\right) \sigma(g_1 g_2) \\
&=  \exp \left(x_1 N\right) \exp(||g_1||x_2 N) \sigma(g_1) \sigma(g_2)\\
&= \exp(x_1N) \sigma(g_1) \exp(x_2 N) \sigma(g_2) \\
&= \sigma'((g_1, x_1)) \sigma'((g_2, x_2)).
\end{align*}
$$

Here we use the equation $\sigma(g) \exp(xN) \sigma(g)^{-1} =  \exp(\|\|g\|\| x N)$ that follows from $\sigma(g) N \sigma(g)^{-1} = \|\|g\|\|N$ by exponentiating both sides.
Conversely, we can find $\sigma, N$ corresponding to $\sigma' : W_F' \to \mathrm{GL}_n(\mathbb{C})$ via

$$
\sigma = \sigma'|_{W_F}, \quad N = \frac{\log \sigma'(x)}{x}.
$$

(One need to check that the log function is well-defined and $N$ is independent of the choice of $x \in \mathbb{C}$ considered as an element $(1, x)$ of $W_F'$. See section 3 of [1] for the details.)

We define the direct sum and tensor product of such representations as

$$
\begin{align*}
(\sigma_1, N_1) \oplus (\sigma_2, N_2) &:= (\sigma_1 \oplus \sigma_2, N_1 \oplus N_2)\\
(\sigma_1, N_1) \otimes (\sigma_2, N_2) &:= (\sigma_1 \otimes \sigma_2, N_1 \otimes 1+ 1 \otimes N_2)
\end{align*}
$$

We call that $\sigma' =(\sigma, N)$ is *admissible* if $\sigma$ is semisimple, and *indecomposable* if the space of $\sigma'$ cannot be written as a direct sum of proper subspaces invariant under $W_F'$.
For each $n$, we can define a *special representation of dimension $n$, $\mathrm{sp}(n)$, as follows. 
Let $e_0, e_1, \dots, e\_{n-1} \in \mathbb{C}^{n}$ be the standard basis, and define $\mathrm{sp}(n)$ via

$$ 
\begin{align*}
\sigma(g) e_j &= ||g||^{j} e_j, \quad 0 \leq j \leq n-1 \\
Ne_j &= e_{j+1}, \quad 0 \leq j \leq n-2 \\
Ne_{n-1} &= 0.
\end{align*}
$$

(You may found that $N$ corresponds to the *standard* nilpotent matrix with one's on the off-diagonal. Also, it is not hard to check that this indeed a representation of Weil-Deligne group.)
For $n> 1$, $\mathrm{sp}(n)$ is not irreducible since $\ker(N) = \mathbb{C}e\_{n-1}$ is a 1-dimensional invariant subspace.
However, it is indecomposable: if $\mathbb{C}^{n} = U \oplus W$ for some proper invariant subspaces $U$ and $W$, both $U \cap \ker N$ and $V \cap \ker N$ should be non-trivial, which is impossible since $\ker N$ has dimension 1.
In fact, all the admissible indecomposable representations of $W_F'$ are tensor products of irreducible representations of $W_F$ and special representations.

> **<ins>Proposition 1</ins>**
> Every admissible indecomposable representation of $W_F'$ is isomorphic to $\pi \otimes \mathrm{sp}(n)$ for some irreducible representation of $W_F$ and $n \geq 1$.

*Proof.* See Proposition 3.1.3 of [4]. $\square$

Also, any admissible (finite-dimensional) representation has a unique decomposition with factors of the above form.

> **<ins>Proposition 2</ins>**
> Every admissible representation $\sigma'$ of $W_F'$ has a decomposition of the form
>
> $$
> \sigma' = \bigoplus_{i=1}^{s} \pi_i \otimes \mathrm{sp}(n_i)
> $$
> which is unique up to permuting the factors.

*Proof.* Decomposability follows from the induction on the dimension of $\sigma'$.
For uniqueness, see Corollary 2 of [1]. $\square$

### Representations of $W_F'= W_F \times \mathrm{SL}_2(\mathbb{C})$

Representation of $W_F \times \mathrm{SL}_2(\mathbb{C})$ is more simpler than that of above: it is just a combination of representation of $W_F$ and $\mathrm{SL}_2(\mathbb{C})$.
Finite dimensional (irreducible) representations are given by the symmetric product representations $\mathrm{Sym}^{n-1}$ for $n \geq 2$, which are $n$-dimensional representations of $\mathrm{SL}_2(\mathbb{C})$ where it acts on the space of homogeneous polynomials of degree $n-1$ in two variables $x$ and $y$, via

$$
(\mathrm{Sym}^{n-1}(g)f)(x, y) = f(ax + cy, bx + dy).
$$

for $g = (\begin{smallmatrix} a & b \\\ c & d \end{smallmatrix})$.
With the standard basis $x^{n-1}, x^{n-2}y, \dots, y^{n-1}$, we can also write it as a matrix form. For example, we have

$$
\mathrm{Sym}^{2}\left(\begin{pmatrix} a & b \\ c & d \end{pmatrix}\right) = \begin{pmatrix} a^2 & ab & b^2 \\ 2ac & ad + bc & 2bd \\ c^2 & cd & d^2 \end{pmatrix}.
$$

It is known that symmetric power representations exhaust the irreducible representations of $\mathrm{SL}_2(\mathbb{C})$.

> **<ins>Proposition 3</ins>** Irreducible representations of $\mathrm{SL}_2(\mathbb{C})$ are $\mathrm{Sym}^{k}$ for $k \geq 0$, where $\mathrm{Sym}^{0}$ is the trivial representation and $\mathrm{Sym}^{1}$ is the standard representation given by the inclusion $\mathrm{SL}_2(\mathbb{C}) \hookrightarrow \mathrm{GL}_2(\mathbb{C})$.

*Proof.* This is a pretty standard fact in Lie group & Lie algebra representation theory, and you may find the proof in any Lie group & Lie algebra representation textbook. For example, see this note from Ivan Losev [5]. $\square$

Hence any irreducible representation of $W_F \times \mathrm{SL}_2(\mathbb{C})$ has a form of $\sigma \boxtimes \mathrm{Sym}^{k}$, where $\sigma$ is an irreducible representation of $W_F$. 

### Equivalence between representations of $W_F'$ and $W_F'$

The following proposition in [1] explains the equivalence between representations of two different groups.
More precisely, we have a bijection between (indecomposable) *admissible* representations of $W_F'$ and (irreducible) semisimple representations of $W_F \times \mathrm{SL}_2(\mathbb{C})$.

> **<ins>Proposition 4</ins>**
> There is a bijection $\sigma' \leftrightarrow \eta$ between isomorphism classes of indecomposable admissible representations  $\sigma' = (\sigma, N)$ of $W_F'$[^2] and isomorphism classes of irreducible semisimple representations of $W_F \times \mathrm{SL}_{2}(\mathbb{C})$ given as follows:
> 
> $$\sigma' = \sigma \otimes \mathrm{sp}(n) \leftrightarrow \eta = \sigma \boxtimes \mathrm{Sym}^{n-1}$$
>
> In general case, a representation $\sigma'= \sigma_1' \oplus \cdots \oplus \sigma_k'$ with each $\sigma_i'$ indecomposable corresponds to $\eta = \eta_1 \oplus \cdots \oplus \eta_k$ where each $\eta_i$ corresponds to $\sigma_i$ as above.

*Proof.* Here we reproduce the proof in [1].
It is enough to check for indecomposable $\sigma'$'s and irreducible $\eta$'s.
For given $\eta = \pi \boxtimes \mathrm{Sym}^{n-1}$, we can recover $\pi$ and $n$ from $\eta|_{W_F}$: $\pi$ is the only irreducible representation occuring in $\eta$ and it occurs with multiplicty $n$, and this proves injectivity.
For surjectivity, any representations of $W_F \times \mathrm{SL}_2(\mathbb{C})$ are external tensor products of irreducible representations of $W_F$ and $\mathrm{SL}_2(\mathbb{C})$, and now we apply the Proposition 3.
$\square$

*References*:

[1] D. Rolich, *Elliptic Curves and the Weil-Deligne Group*, Centre de Recherches Mathèmatiques (1994)

[2] J. Tate, *Number theoretic background.* Automorphic forms, representations and L-functions (Proc. Sympos. Pure Math., Oregon State Univ., Corvallis, Ore., 1977)

[3] J. Getz and H. Hahn, *An Introduction to Automorphic Representations*, 2022

[4] P. Deligne, *Formes modulaires et representations de $\mathrm{GL}(2)$*, Modular Functions of One Variable, Springer (1973)

[5] I. Losev, *Lecture 3: Representation Theory of $\mathrm{SL}_2(\mathbb{C})$ and $\mathfrak{sl}_2(\mathbb{C})$*, [online note](https://gauss.math.yale.edu/~il282/RT/RT3.pdf)

[^1]: This is slightly different from the equation in [1] - the order is changed. I changed this to make it work with the group operation defined on $W_F'$ as in Definition 1.

[^2]: Here $W_F'$ is the Weil-Deligne group of $F$ following the Definition 1.