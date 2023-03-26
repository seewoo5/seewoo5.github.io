---
layout: posts
title:  "Inner forms"
date:   2023-03-01
categories: jekyll update
tags: math
---

This post is about inner forms of algebraic groups, with *many* explicit examples.

**Forms** of an algebraic group $G$ over a field $k$ are algebraic groups $G'$ over $k$ that are isomorphic over a separable closure $K = k^{\mathrm{sep}}$ (but not necessarily over $k$). Equivalently, $G'$ is isomorphic to $G$ over some finite separable extension $L$ over $k$.

The following theorem by [REF] is one of the most central theorem that characterizes (inner) forms in terms of a Galois cohomology.

> **Theorem.** There is a canonical bijection between the set of forms of $G$ over $k$ and the cohomology set
> 
> $$
> \mathrm{H}^1(\mathrm{Gal}(K / k), \mathrm{Aut}(G_K))
> $$
>
> where $\mathrm{Aut}(G)$ is the group of automorphisms of $G$.
> On can obtain a similar bijection for the set of *inner* forms of $G$ by replacing $\mathrm{Aut}(G)$ with $\mathrm{Inn}(G)$, the group of *inner* automorphisms of $G$.

*Proof.* 
We follow the proof from [Buzzard]. 
First, note that $\Gamma := \mathrm{Gal}(K / k)$ acts on $G_K$ natually.
It also acts on $\mathrm{Aut}(G_K)$ via conjugation: for $\gamma \in \Gamma$, $\sigma \in \mathrm{Aut}(G_K(R))$ and $g \in G_K(R)$ (for a $K$-algebra $R$), define a $\Gamma$-action on $\mathrm{Aut}(G_K(R))$ as $(\gamma. \sigma)(g) := \gamma(\sigma(\gamma^{-1}(g)))$.

Now, let's construct a map from the set of forms of $G$ over $k$ to the above cohomology set as follows.
For a $k$-form $H$ of $G$, let $i : G(K) \to H(K)$ be a corresponding isomorphism.
Then we construct a 1-cocycle $c: \Gamma \to \mathrm{Aut}(G_K)$ as

$$
c_{i}(t) = i^{-1} t i t^{-1}
$$

This is indeed a 1-cocycle by direct computation:

$$
\begin{align*}
c_{i}(st) = i^{-1}(st)i(st)^{-1} &= i^{-1}stit^{-1}s^{-1} \\
&= (i^{-1}sis^{-1})s(i^{-1}tit^{-1})s^{-1} \\
&= c_{i}(s) (s.c_{i}(t))
\end{align*}
$$

and we take the corresponding class $[c_i]$ in $\mathrm{H}^{1}(\mathrm{Gal}(K / k), \mathrm{Aut}(G_K))$.

Conversely, for given cohomology class $[c]$, one can construct a form $H = H_c$ by defining $H(k)$ as a fixed set of the map $c(t)t \in \mathrm{Aut}(G_K)$ for all $t \in \Gamma$. (Recall that $\Gamma$ naturally acts on $G_K$ and any element of $\Gamma$ can be regarded as an element of $\mathrm{Aut}(G_K)$.)
First of all, this map does not depend on the choice of the representative of the cohomology class.
In fact, if $[c'] = [c]$, then there exists $\sigma \in \mathrm{Aut}(G_K)$ such that $c'(t) = \sigma^{-1} c(t)t\sigma$ for all $t \in \Gamma$.
Then the $k$-points of the corresponding inner form $H' = H_{c'}$ is defined as a fixed points of $c'(t)t = \sigma^{-1}c(t)t \sigma$
$\square$

**Example. (Two simplest tori)** One of the most simplest example is the following *tori* over $\mathbb{R}$. Let $\mathbb{G}\_{m, \mathbb{R}}$ be a multiplicative group over $\mathbb{R}$ and $\mathrm{SO}(2)$ be an algebraic group over $\mathbb{R}$ defined as

$$
\mathrm{SO}(2, R) = \left\{\begin{pmatrix} a & b \\ -b & a \end{pmatrix} : a, b \in R, a^2 + b^2 = 1\right\}
$$

for any $\mathbb{R}$-algebra $R$.
Both are affine and can be viewed as

$$
\mathbb{G}_{m, \mathbb{R}} = \mathrm{Spec}(\mathbb{R}[t, t^{-1}]), \quad \mathrm{SO}(2) = \mathrm{Spec}(\mathbb{R}[x, y] / (x^2 +y^2 - 1)).
$$

They are *not* isomorphic over $\mathbb{R}$. 
In fact, if we consider their $\mathbb{R}$-points and the associated Lie groups, then 

$$
\mathbb{G}_{m, \mathbb{R}}(\mathbb{R}) = \mathbb{R}^\times
$$

and 

$$
\mathrm{SO}(2, \mathbb{R}) = \left\{\begin{pmatrix} a &b \\ -b & a \end{pmatrix}: a, b \in \mathbb{R}: a^2 +b^2 = 1\right\}\simeq \mathbb{S}^1,
$$

and they can't be isomorphic since the first one is not compact and the other one is.
However, they are isomorphic over $\mathbb{C}$, where the isomorphism is given by 

$$
\mathrm{SO}(2)_{\mathbb{C}} \to \mathbb{G}_{m, \mathbb{C}}, \quad \begin{pmatrix} a & b \\ -b & a\end{pmatrix} \mapsto a + b\sqrt{-1}
$$

whose inverse map is

$$
z \mapsto \begin{pmatrix} \frac{1}{2}\left(z + \frac{1}{z}\right) & \frac{1}{2\sqrt{-1}}\left(z -  \frac{1}{z}\right) \\  - \frac{1}{2\sqrt{-1}}\left(z -  \frac{1}{z}\right)  &  \frac{1}{2}\left(z + \frac{1}{z}\right) \end{pmatrix}.
$$

(It may seems not trivial at first glance that the map actually gives the inverse. Once you have $z \in \mathbb{G}\_{m, \mathbb{C}}(\mathbb{C}) = \mathbb{C}^\times$ that corresponds to $(\begin{smallmatrix} a & b \\\ -b & a \end{smallmatrix})$, then $z = a + b\sqrt{-1}$ and $a^2 + b^2 = 1 = (a + b\sqrt{-1})(a - b\sqrt{-1})$. Hence $a - b\sqrt{-1} = 1/z$ and we can solve the equation in $a$ and $b$ to get the above map.)

In terms of the Galois cohomology, the set of (isomorphic classes of) $\mathbb{R}$-forms of $\mathbb{G}\_{m,\mathbb{R}}$ is in bijection with the (pointed) cohomology set $\mathrm{H}^{1}(\mathrm{Gal}(\mathbb{C}/\mathbb{R}), \mathrm{Aut}(\mathbb{G}\_{m,\mathbb{C}}))$.
There exists only one nontrivial element $t_c \in \mathrm{Gal}(\mathbb{C}/\mathbb{R})$ that corresponds to the complex conjugation, and the automorphism group of $\mathbb{G}\_{m,\mathbb{C}}$ is an order 2 group generated by the automorphism $z \mapsto z^{-1}$.
Then 1-cocycles $c : \mathrm{Gal}(\mathbb{C}/\mathbb{R}) \to \mathrm{Aut}(\mathbb{G}\_{m, \mathbb{C}}) \simeq \{\pm 1\}$ is completely determined by $c(t_c)$, and we have only two choices which are different (not cohomologous).
If we choose $G = \mathbb{G}\_{m\mathbb{R}}$ and $H = \mathrm{SO}(2)$, then one can check that the 1-cocycle $c_i$ corresponds to the above $i : \mathbb{G}_{m \mathbb{C}} \to \mathrm{SO}(2, \mathbb{C})$ sends $t_c$ to the inverse map $z \mapsto z^{-1}$.

In fact, we can observe that the above result can be generalized to arbitrary field as follows: two algebraic groups $\mathbb{G}\_{m, k}$ and  $\mathrm{SO}(2)_{k}$ over a field $k$ is not necessarily isomorphic, but it is isomorphic over $k$ if $k$ has a square root of $-1$, and in general they are isomorphic over a (at most) quadratic extension $L = k(\sqrt{-1})$ of $k$.




**Example. (Quaternion algebra)** Another important examples are forms of $\mathrm{GL}(2)$. 

In general, 

**References.**

[Buzzard] K. Buzzard, *Forms of reductive algebraic groups*, [Online note](https://www.ma.imperial.ac.uk/~buzzard/maths/research/notes/forms_of_reductive_algebraic_groups.pdf)

[Conrad] K. Conrad, *Quaternion algebra*, [Online note](https://kconrad.math.uconn.edu/blurbs/ringtheory/quaternionalg.pdf)