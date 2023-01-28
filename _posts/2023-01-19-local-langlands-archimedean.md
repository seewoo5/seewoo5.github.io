---
layout: posts
title:  "Local Langlands Correspondence over Archimedean Fields"
date:   2023-01-19
categories: jekyll update
tags: math
---

In this post, we present the statement of Local Langlands Correspondence (LLC) over archimedean fields ($\mathbb{R}$ and $\mathbb{C}$) and sketch a proof.
We first start with the group $G = \mathrm{GL}_{n}$, and then discuss about general reductive groups.
The main references are Knapp [ref], Buzzard [ref], Borel [ref], and Jacquet [ref].


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

### Admissibility and $(\mathfrak{g}, K)$-modules

We first study and classify representations of $G = \mathrm{GL}_n(\mathbb{R})$. Our goal is to understand Langlands' classification.
In short, we will see that *admissible* representations of $\mathrm{GL}_n(\mathbb{R})$ are obtained by parabolic induction of irreducible admissible representations of $\mathrm{GL}_1(\mathbb{R)}$ and $\mathrm{GL}_2(\mathbb{R})$, where the latter representations (building blocks for the represenetations of $\mathrm{GL}_n(\mathbb{R})$) are easy to be classified.


### Irreducible admissible representations of $\mathrm{GL}\_n(\mathbb{R})$
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

> **Proposition** Irreducible admissible representations of $\mathrm{GL}\_1(\mathbb{R})$ are either
> 
> $$
> 1\otimes |\cdot|_\mathbb{R}^t, \quad t \in \mathbb{C}
> $$
> 
> or
> 
> $$
> \mathrm{sgn} \otimes |\cdot|_\mathbb{R}^t, \quad t \in \mathbb{C}.
> $$

When $n=2$, there's essentially one type of 


### Local $L$-factors and $\epsilon$-factors

## Representations of the Weil group $W_\mathbb{R}$ and $L$-functions

### Representations of $W_\mathbb{R}$


Now we are going to define and classify representations of the Weil group $W_\mathbb{R}$.
These will correspond to the representations of $\mathrm{GL}\_n(\mathbb{R})$ in LLC.
First, the Weil group $W_\mathbb{R}$ is a non-trivial extension of $\{\pm 1\}$ by $\mathbb{C}^\times$ given by 

$$
W_\mathbb{R} = \mathbb{C}^\times \cup j\mathbb{C}^\times,
$$

where $j^2 = -1$ and $jzj^{-1} = \bar{z}$ where bar denotes complex conjugation. 
In other words, it is a semi-direct product $\mathbb{C}^{\times} \rtimes \mathrm{Gal}(\mathbb{C}/\mathbb{R})$ with natural action of $\mathrm{Gal}(\mathbb{C}/\mathbb{R})$ on $\mathbb{C}$.
Then we are going to classify $n$-dimensional irreducible representations of $W_\mathbb{R}$ with semisimple image (for general reductive group, such a representations will be called *admissible*).

When $n =1$, the one-dimensional (complex) representations of $\mathbb{C}^\times$ are of the form

$$
\chi_{\mu, \nu}:z \mapsto z^{\mu} \bar{z}^{\nu}
$$

for some $\mu, \nu \in \mathbb{C}$ with $\mu -\nu \in \mathbb{Z}$.
(When $z = re^{i\theta}$, then $(re^{i\theta})^{\mu}(re^{-i\theta})^{\nu} = r^{\mu + \nu}e^{i\theta(\nu - \nu)}$, which gives the restriction $\mu- \nu \in \mathbb{Z}$.)
Now let $\varphi: W_\mathbb{R} \to \mathbb{C}^\times$ be a 1-dimensional representation.
As above, $\varphi|_{\mathbb{C}^\times}(z) = z^\mu \bar{z}^{\nu}$ for some $\mu, \nu \in\mathbb{C}$.
If we set $\varphi(j) = w$, then $\bar{z} = jzj^{-1}$ implies

$$
\varphi(\bar{z}) = \varphi(jzj^{-1}) = w\varphi(z)w^{-1} = \varphi(z)
$$

and this gives $\mu = \nu$, $\varphi(z) = |z|_{\mathbb{R}}^{2\mu}$.
Now

$$
1 = \varphi(-1) = \varphi(j^2) = w^2
$$

gives $w = \pm 1$. Thus 1-dimensional representations are parametrized by a sign and a complex parameter $t = 2\mu$ as follows:

$$
\begin{align*}
(+, t):& \quad \varphi(z) = |z|_{\mathbb{R}}^{t},\,\, \varphi(j) = +1, \\
(-, t):& \quad \varphi(z) = |z|_{\mathbb{R}}^{t},\,\,\varphi(j) = -1.
\end{align*}
$$

Now consider $n=2$.

> **Lemma.** Every finite dimensional semisimple representation $\varphi$ of $W_{\mathbb{R}}$ is reducible and each irreducible representation has dimension 1 or 2.

*Proof.* Let $(\varphi, V)$ be a finite dimensional representation of $W_{\mathbb{R}}$.
Then $\varphi|\_{\mathbb{C}^{\times}}$ decomposes as a sum of characters $\chi_{\mu, \nu}$, with an eigenspace $V_{\mu, \nu}$ (so $V = \oplus V_{\mu, \nu}$).
As above, $\varphi(j)V_{\mu, \nu} = V_{\nu, \mu}$. 
If $\mu = \nu$ then choosing a basis of eigenvectors of $\varphi(j)$ gives a decomposition of the space $V_{\mu, \mu}$ into 1-dimensional eigenspaces.
If $\mu \neq \nu$, choose a basis $u_{1}, \dots, u_{r}$ of $V_{\mu, \nu}$ and put $u_{i}' = \varphi(j)u_{i}$.
Then $\mathbb{C}u_{i} \oplus \mathbb{C}u_{i}'$ is a 2-dimensional inratiant subspace and we get a decomposition of $V_{\mu, \nu} \oplus V_{\nu, \mu}$ into 2-dimensional subspaces $\oplus_{i=1}^{r} (\mathbb{C}u_{i} \oplus \mathbb{C} u_{i}')$.
$\square$

### local $L$-factors and $\epsilon$-factors

For each irreducible representations $\varphi$, the corresponding local $L$-factors $L(s, \varphi)$ are defined as

$$
\begin{align*}
L(s, \varphi) =\begin{cases} 
\pi^{-(s+t)/2} \Gamma(\frac{s+t}{2}) & \varphi\text{ has a type of }(+, t), \\
\pi^{-(s+t+1)/2} \Gamma(\frac{s+t+1}{2}) & \varphi\text{ has a type of }(-, t), \\
2(2\pi)^{-(s+t + \frac{l}{2})} \Gamma(s+t + \frac{l}{2}) & \varphi\text{ has a type of }(l, t). \\
\end{cases}
\end{align*}
$$

Fix an additive character $\psi$ of $\mathbb{R}$.
Then $\epsilon$-factors of each irreducible representation $\varphi$ are defined as

$$
\begin{align*}
\epsilon(s, \varphi, \psi) = \begin{cases}
1 & \varphi \text{ has a type of }(+, t), \\
i & \varphi \text{ has a type of }(-, t), \\
i^{l+1} & \varphi \text{ has a type of }(l, t).
\end{cases}
\end{align*}
$$

Note that these are constant in $s$.
When $\varphi = \oplus \varphi_j$ is reducible, then the corresponding local $L$-factor and $\epsilon$-factor are defined as a product $L(s, \varphi) = \prod_j L(s, \varphi_j)$ and $\epsilon(s, \varphi, \psi) = \prod_j \epsilon(s, \varphi_j, \psi)$.

## LLC for $\mathrm{GL}_n(\mathbb{R})$

> **Theorem (Local Langlands Correspondence for $\mathrm{GL}_n(\mathbb{R})$).** 
> The above association $\varphi \mapsto \rho\_{\mathbb{R}}(\varphi)$ is a well-defined byjection between the set of all equivalence classes of $n$-dimensional semisimple complex representations of $W\_{\mathbb{R}}$ and the set of all equivalence classes of irreducible admissible representations of $\mathrm{GL}\_{n}(\mathbb{R})$.
> Also, the association preserves $L$-factors and $\epsilon$-factors.


## LLC for $\mathrm{GL}_n(\mathbb{C})$

When our ground field is $\mathbb{C}$, the situation becomes much more simpler.
In short, every representations (of $\mathrm{GL}\_n(\mathbb{C})$ or $W_\mathbb{C}$) are built upon 1-dimensional representations (i.e. characters), and the LLC for $\mathrm{GL}\_n(\mathbb{C})$ essentially follows from $W_\mathbb{C} = \mathbb{C}^\times = \mathrm{GL}\_1(\mathbb{C})$.

### Representations of $\mathrm{GL}_n(\mathbb{C})$

First of all, $K = U(n)$ (the group of $n\times n$ unitary matrices) form a maximal compact subgroup of $\mathrm{GL}\_n(\mathbb{C})$, and we can define admissibility, $K$-finiteness, infinitesimal equivalence, ... as before. 
For each admissible representations of $\mathrm{GL}\_n(\mathbb{C})$, we can attach a $(\mathfrak{gl}\_n(\mathbb{C}, U(n))$-module and study representations of them too.

When $n = 1$, since $\mathrm{GL}_{1}(\mathbb{C})$ is abelian, the only irreducible representations of it are charcters and has a form of 

$$z \mapsto [z]^{l}|z|_{\mathbb{C}}^{t}, \quad l \in \mathbb{Z}, t \in \mathbb{C}$$

where $[z] = z / |z|\_{\mathbb{R}}$ and $|z|\_{\mathbb{C}} = |z\bar{z}|\_{\mathbb{R}}$.
For general $n$, we have a Langlands's classification again, and now 1-dimensional representations (characters) are the only building blocks that we need.

> **Theorem (Langlands' classification for $\mathrm{GL}\_{n}(\mathbb{C})$).**
> Let $G = \mathrm{GL}\_{n}(\mathbb{C})$ and $B$ be the subgroup of upper triangular matrices in $G$.
> For $1 \leq j \leq n$, let $\sigma_{j}$ be the character $[\cdot]^{l_{j}} |\cdot|\_{\mathbb{C}}^{t_{j}}$ for $l_{j} \in \mathbb{Z}$ and $t_{j} \in \mathbb{C}$.
> Let $I(\sigma_{1}, \dots, \sigma_{n}) = \mathrm{Ind}\_{B}^{G}(\sigma_{1}, \dots, \sigma_{n})$.
> 
> (a) If the parameters $t_{j}$ of $(\sigma_{1}, \dots, \sigma_{n})$ satisfy
> 
> $$
> \Re t_{1} \geq \Re t_{2} \geq \cdots \geq \Re t_{n},
> $$
> 
> then $I(\sigma_{1}, \dots, \sigma_{n})$ has a unique irreducible quotient, denoted as $\sigma_{1} \boxplus \cdots \boxplus \sigma_{n}$.
> 
> (b) Any irreducible admissible representations of $G$ is infinitesimally equivalent to a representation of the form $\sigma_{1} \boxplus \sigma_{n}$.
> In other words, such representations exhaust all the irreducible admissible representations of $G$ (up to infinitesimal equivalence).
> 
> (c) $\boxplus_{i=1}^{n} \sigma_{i} \simeq \boxplus_{i=1}^{n} \sigma_{i}'$ iff $(\sigma_{1}, \dots, \sigma_{n})$ and $(\sigma_{1}', \dots,\sigma_{n}')$ are the same up to permutation.

This was first proven by Zelobenko and Naimark [ref, ref].

### Representations of $W_{\mathbb{C}}$

The Weil group of $\mathbb{C}$ is just $W_{\mathbb{C}} = \mathbb{C}^\times$.
In this case, any finite-dimensional representation of it decomposes as a sum of characters, and we already have seen how the characters of $\mathbb{C}^\times$ parametrized.
The only thing left is to match irreducible admissible representations of $\mathrm{GL}\_{n}(\mathbb{C})$ with $n$-dimensional representations of $W\_{\mathbb{C}}$, and you may already find how to do this.
For a given $n$-dimensional representation $\varphi$ of $W_{\mathbb{C}}$, we have $\varphi = \oplus_{j=1}^{n} \varphi_{j}$ for some characters $\varphi_{j}(z) = [z]^{l_{j}}|z|\_{\mathbb{C}}^{t_{j}}$.
Then we associate characters $\sigma_{j} = [\cdot]^{l_{j}}|\cdot|\_{\mathbb{C}}^{t_{j}}$ of $\mathrm{GL}\_{1}(\mathbb{C})$ to each $\varphi_{j}$ (which are the same!) and then produce an irreducible admissible representation of $\mathrm{GL}\_{n}(\mathbb{C})$

$$
\rho_{\mathbb{C}}(\varphi) = \sigma_{1} \boxplus \cdots \boxplus \sigma_{n}.
$$

Such an association gives LLC for $\mathrm{GL}_{n}(\mathbb{C})$.

> **Theorem (Local Langlands Correspondence for $\mathrm{GL}_n(\mathbb{C})$)** 
> The above association $\varphi \mapsto \rho\_{\mathbb{C}}(\varphi)$ is a well-defined byjection between the set of all equivalence classes of $n$-dimensional semisimple complex representations of $W\_{\mathbb{C}}$ and the set of all equivalence classes of irreducible admissible representations of $\mathrm{GL}\_{n}(\mathbb{C})$.
> Also, the association preserves $L$-factors and $\epsilon$-factors.

## LLC for general reductive groups over $\mathbb{R}$ or $\mathbb{C}$


*References*:

[1] K. Buzzard, Local Langlands for $\mathrm{GL}\_2(\mathbb{R})$, [Online note](https://www.ma.imperial.ac.uk/~buzzard/maths/research/notes/local_langlands_for_gl2R.pdf), 2012

[2] A. W. Knapp, Local Langlands Correspondence: The Archimedean Case, Motives, p393-410, 1994.