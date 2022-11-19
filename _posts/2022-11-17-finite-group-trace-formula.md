---
layout: posts
title:  "Trace formula for finite groups"
date:   2022-11-18
categories: jekyll update
tags: math
---

Trace formula expresss the *trace* of the right regular representation of certain
reductive algebraic group in two ways, *spectral* and *geometric* way.
The formula has the following form:

$$
\sum_\pi m_\pi \mathrm{tr} \pi(f) = \sum_{[\gamma]} \mathrm{vol}(\Gamma_\gamma \backslash G_\gamma) \int_{G_\gamma \backslash G} f(x^{-1}\gamma x)dx
$$

where the LHS (spectral side) is a sum of traces (with multiplicities) over all irreducible representations, and the RHS (geometric side) is a sum of volumn $\times$ orbital integrals over all conjugacy classes.
The classical trace formula was first developed by Selberg in 1956 for cocompact subgroups of real Lie groups, and generalized to non-cocompact subgroups of general reductive groups (over adeles) by Langlands and Arthur, based on the theory of Eisenstein series.
It is one of the most important tool for proving some  cases of Langlands functoriality.
Typical strategy is to compare geometric side of trace formula for two different reductive groups and match orbital integrals, which often provide functoriality between them.

The goal of this post is to introduce toy version of the trace formula, i.e. **trace formula for finite groups**.
The formula itself almost looks the same as original Arthur-Selberg trace formula, but we don't have to care about any technical issues like choice of measures and convergence of orbital integrals.

The main reference is the Whitehouse's lecture note on trace formula [1]. Especially, this post describes the solution for the Exercise 2.3 of [1].

### Trace formula for finite groups

Let $G$ be a finite group and $\Gamma$ be its subgroup.
Let $(\rho, V_\rho)$ be an irreducible representation of $\Gamma$ and $R_\rho = \mathrm{Ind}_\Gamma^G(\rho)$ be the induced representation.
It can be described as a space of functions

$$
V_{\rho, \Gamma} = \{\varphi: G \to V_\rho\,|\,\varphi(\gamma x) = \rho(\gamma)\varphi(x)\}
$$

where $G$ acts as a right translation.
We can decompose $R_\rho$ into the sum of irreducible representations as

$$
R_\rho = \bigoplus_{\pi \in \hat{G}} m_{\pi}^{\rho} \pi
$$

where $\hat{G}$ is the set of irreducible representations of $G$ and $m_{\pi}^{\rho} \in \mathbb{Z}_{\geq 0}$ are their multiplicities.

For any function $f: G \to \mathbb{C}$ and a representation $(\pi, V)$, we can *linearlize* $\pi$ as follows: define $\pi(f): V \to V$ as

$$
\pi(f)v = \sum_{g \in G} f(g) \pi(g)v
$$

for all $v \in V$. 
In case of $R_\rho$, it can be written as 

$$
(R_\rho(f)\varphi)(x) = \sum_{y\in G} f(y) \varphi(xy).
$$

Now, we are interested in the trace of $R_\rho(f)$.
Since $\mathrm{tr}(\pi(f))$ only depends on the isomorphism class of $\pi$, we can express the trace of $R_\rho(f)$ as

$$
\mathrm{tr}(R_\rho(f)) = \sum_{\pi \in \hat{G}} m_{\pi}^{\rho}\mathrm{tr}(\pi(f))
$$

and we call this expansion as a *spectral expansion* of $\mathrm{tr}(R_\rho(f))$.

Now we will express $\mathrm{tr}(R_\rho(f))$ in a different way to get the desired trace formula. 
After making the change of variable $y \mapsto x^{-1}y$, we have

$$
(R_\rho(f) \varphi)(x) = \sum_{y \in G} f(x^{-1}y) \varphi(y)
$$

and the latter sum can be expressed as a following double sum

$$
\begin{align*}
\sum_{y \in G} f(x^{-1}y) \varphi(y) &= \sum_{y \in \Gamma \backslash G} \sum_{\gamma \in \Gamma} f(x^{-1}\gamma y) \varphi(\gamma y) \\
&=\sum_{y \in \Gamma \backslash G} \sum_{\gamma \in \Gamma} f(x^{-1}\gamma y) \rho(\gamma) \varphi(y) 
\end{align*}
$$

where the second equality comes from $\varphi \in V_{\rho, \Gamma}$.
When $\rho = 1$ is a trivial representation, then this implies that the linearized right regular representation $R_1(f)$ has a kernel expression

$$
(R_1(f)\varphi)(x) = \sum_{y \in \Gamma \backslash G} K_f(x, y) \varphi(y)
$$

for

$$
K_f(x,y) = \sum_{\gamma \in \Gamma} f(x^{-1} \gamma y),
$$

and the trace of it can be expressed as a summation of $K_f$ over *diagonals*:

$$
\mathrm{tr}(R_1(f)) = \sum_{x\in \Gamma\backslash G} K_f(x, x).
$$

For general $\rho$, we can't simply write it as a kernel expression because of the presence of $\rho(\gamma)$.
But we still have a nice formula for the trace:

> **Lemma.** The trace of $R_\rho(f)$ is
>
> $$
> \mathrm{tr}(R_\rho(f)) = \sum_{x\in \Gamma \backslash G}\sum_{\gamma \in \Gamma} f(x^{-1}\gamma x)  \mathrm{tr}(\rho(\gamma)).
> $$

*Proof.* We will first construct a basis for $V_{\rho, \Gamma}$. 
Let $\{v_1, \dots, v_m\}$ be a basis of $V_\rho$, and $\{z_1, \dots, z_k\}$ be a set of right coset representatives of $\Gamma \backslash G$.
Define $\delta_{i, j}: G \to V_\rho$ as

$$
\delta_{i, j}(x) = \begin{cases} \rho(x)^{-1}\rho(z_i)v_j & x \in \Gamma z_j \\ 0 & \text{otherwise}.\end{cases}
$$

One can check that these functions are in $V_{\rho, \Gamma}$, i.e. $\delta_{i, j}(\gamma x) = \rho(\gamma)\delta_{i, j}(x)$ for all $\gamma \in \Gamma$ and $x \in G$.
Also, these functions are linearly independent.
Since $\dim V_{\rho, \Gamma} = \dim R_\rho = [G:\Gamma]\dim \rho = mk$, they form a basis of $V_{\rho, \Gamma}$.
By direct computation,

$$
\begin{align*}
(R_\rho(f)\delta_{i, j})(x) &= \sum_{\gamma \in \Gamma} \sum_{y \in \Gamma \backslash G} f(x^{-1} \gamma y) \rho(\gamma) \delta_{i, j}(y) \\
&= \sum_{\gamma \in \Gamma} f(x^{-1} \gamma z_i) \rho(\gamma) \delta_{i, j} (z_i) \\
&= \sum_{\gamma \in \Gamma} f(x^{-1} \gamma z_i) \rho(\gamma) v_j \\
&= \sum_{\gamma \in \Gamma} \sum_{1\leq \ell \leq m} f(x^{-1} \gamma z_i) c_{j, \ell}^{\gamma} v_\ell
\end{align*}
$$

where $(c_{j, \ell}^{\gamma})\_{1 \leq j, \ell \leq m}$ is a matrix representation of $\rho(\gamma): V_\rho \to V_\rho$ with respect to the basis $\{v_1, \dots, v_m\}$.
If we write $R_\rho(f)\delta_{i, j}$ as a linear combination of $\delta_{i, j}$

$$
R_\rho(f)\delta_{i, j} = \sum_{\substack{1 \leq s \leq k \\ 1 \leq t \leq m}} a_{s, t} \delta_{s, t},
$$

then the trace becomes $\mathrm{tr}(R_\rho(f)) = \sum_{s, t}a_{s, t}$.
By the way, plugging in $x = z_i$ gives 

$$
\sum_{\gamma \in \Gamma}\sum_{1\leq \ell \leq m} f(z_{i}^{-1} \gamma z_{i}) c_{j, \ell}^{\gamma} v_{\ell} = (R_\rho(f)\delta_{i, j}) (z_i) = \sum_{\substack{1 \leq s \leq k \\ 1 \leq t \leq m}} a_{s, t} \delta_{s, t}(z_i) = \sum_{1 \leq t \leq m} a_{i t} v_t
$$

so comparing the coefficients gives

$$
a_{i, j} = \sum_{\gamma \in \Gamma} f(z_{i}^{-1} \gamma z_i) c_{j, j}^{\gamma} 
$$

and the trace is

$$
\begin{align*}
\mathrm{tr}(R_\rho(f)) &= \sum_{\substack{1 \leq i \leq k \\ 1 \leq j \leq m}} a_{i, j} \\
&= \sum_{\substack{1 \leq i \leq k \\ 1 \leq j \leq m}} \sum_{\gamma \in \Gamma} f(z_i^{-1} \gamma z_i) c_{j, j}^{\gamma} \\
&= \sum_{1 \leq i \leq k} \sum_{\gamma \in \Gamma} f(z_i^{-1} \gamma z_i) \mathrm{tr}(\rho(\gamma)) \\
&= \sum_{x \in \Gamma \backslash G} \sum_{\gamma \in \Gamma} f(x^{-1} \gamma x) \mathrm{tr}(\rho(\gamma)).
\end{align*}
$$

This completes the proof. $\square$

Our goal is to express this as a sum of *orbital sums* over the conjugacy classes of $\Gamma$, using unfolding and folding tricks.
Once we decompose the sum over $\Gamma$ into conjugacy classes of $\Gamma$, we get

$$
\sum_{\gamma \in \Gamma} f(x^{-1}\gamma x)\mathrm{tr}(\rho(\gamma)) = \sum_{[\gamma] \in \{\Gamma\}} \sum_{\delta \in \Gamma_{\gamma} \backslash \Gamma} f(x^{-1}\delta^{-1}\gamma \delta x) \mathrm{tr}(\rho(\gamma))
$$

where $\{\Gamma\}$ is the set of conjugacy classes of $\Gamma$, and $\Gamma_\gamma$ is the centralizer of $\gamma$ in $\Gamma$ (i.e. stabilizer of the conjugation action for $\gamma$).
Using this, we can change the order of summation and combine them as follows:

$$
\begin{align*}
\mathrm{tr}(R_\rho(f)) &= \sum_{x \in \Gamma \backslash G} \sum_{[\gamma] \in \{\Gamma\}} \sum_{\delta \in \Gamma_\gamma \backslash \Gamma} f(x^{-1}\delta^{-1} \gamma \delta x) \mathrm{tr}(\rho(\gamma)) \\
&=\sum_{[\gamma] \in \{\Gamma\}} \mathrm{tr}(\rho(\gamma)) \sum_{\delta \in \Gamma_\gamma \backslash \Gamma} \sum_{x\in \Gamma \backslash G} f(x^{-1} \delta^{-1} \gamma \delta x) \\
&= \sum_{[\gamma] \in \{\Gamma\}} \mathrm{tr}(\rho(\gamma)) \sum_{x \in \Gamma_\gamma \backslash G} f(x^{-1}\gamma x).
\end{align*}
$$

Since $f(x^{-1}\gamma x)$ does not change if we replace $x$ with $yx$ for $y \in G_\gamma$, the last sum becomes

$$
\sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma)) \sum_{x \in G_\gamma \backslash G} f(x^{-1} \gamma x).
$$

This gives the desired trace formula for finite groups.


> **Theorem (Trace formula for finite groups).** Let $G$ be a finite group and $\Gamma \leq G$ be a subgroup. Let $R_\rho = \oplus_{\pi \in \hat{G}} m_\pi^{\rho}\pi$ be the decomposition of the induced representation $R_\rho := \mathrm{Ind}_\Gamma^G(\rho)$ of an irreducible representation $\rho$ of $\Gamma$.
> For any $f : G \to \mathbb{C}$, we have
> 
> $$
> \sum_{\pi \in \hat{G}} m_{\pi}^{\rho} \mathrm{tr}(\pi(f)) = \sum_{[\gamma] \in \{\Gamma\}}\frac{|G_\gamma|}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma)) \sum_{x \in G_\gamma \backslash G} f(x^{-1} \gamma x) 
> $$

*Remark*. In the adelic setting, $G = G(\mathbb{A}\_F)$ is a group of $\mathbb{A}\_F$-points of a reductive group $G$ (here we are abusing a notation) and $\Gamma = G(F)$ is a group of $F$-points, which is a discrete subgroup of $G(\mathbb{A}\_F)$.
In the geometric expansion (RHS of the trace formula), $| G\_\gamma| / | \Gamma\_\gamma|$ corresponds to the *volumn* of $\Gamma_\gamma \backslash G_\gamma$ and the *orbital sum* becomes *orbital integral*.


### Application: Frobenius reciperocity

By using the trace formula, we can compute the multiplicities $m_{\pi}^{\rho}$ of each $\pi$ occuring in the decomposition of $R_\rho$.

> **Corollary (Frobenius reciprocity).** $m_\pi^\rho = \langle \chi_\rho, \mathrm{Res}\_\Gamma^G(\chi\_\pi) \rangle_\Gamma$, where $\mathrm{Res}\_\Gamma^G(\chi_\pi)$ denotes the restriction of $\chi_\pi$ on $\Gamma$, which equals to the character of the restricted representation $\mathrm{Res}\_\Gamma^G(\pi)$.

Note that orthogonality of characters of irreducible representations imply $m_\pi^\rho = \langle \mathrm{Ind}\_\Gamma^G(\chi_\rho), \chi_\pi \rangle$, so it can be also written as 

$$
\langle \mathrm{Ind}_\Gamma^G(\chi_\rho), \chi_\pi \rangle_G = \langle \chi_\rho, \mathrm{Res}_\Gamma^G(\chi_\pi) \rangle_\Gamma.
$$

<!-- We need a following lemma. 

> **Lemma.** For any finite-dimensional representation $(\pi, V)$ of $G$,
> 
> $$
> \sum_{g\in G} \mathrm{tr}(\pi(g)) = | G| \dim \pi^{G}.
> $$

*Proof.*  Consider the averaging map

$$
\frac{1}{|G|} \sum_{g\in G} g : V \to V^G
$$

which projects onto the space of fixed vectors $V^G$.
Since it restricts as an identity map on $V^G$, we get the equation by taking the trace of this map. $\square$

*Proof of corollary.* -->

*Proof.*
Choose an irreducible representation $\rho$ and let $f = f_\sigma = \overline{\chi_\sigma}$, the complex conjugation of the character of $\sigma$. Then

$$
\mathrm{tr}(\pi(f_\sigma)) = \sum_{g \in G} \mathrm{tr}(\pi(g)) \overline{\mathrm{tr}(\sigma(g))} = \begin{cases} |G| & \pi \simeq \sigma \\ 0 & \text{otherwise} \end{cases} 
$$

by orthogonality of characters. Hence

$$
\sum_{\pi} m_{\pi}^{\rho} \mathrm{tr}(\pi(f_\sigma)) = m_{\sigma}^{\rho} \cdot |G|.
$$

On the other hand we have, by trace formula, 

$$
\begin{align*}
\mathrm{tr}(\pi(f_\sigma)) &= \sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma)) \sum_{x \in G_\gamma \backslash G} f_{\sigma}(x^{-1}\gamma x) \\
&=  \sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma)) \frac{|G|}{|G_\gamma|} \overline{\mathrm{tr}(\sigma(\gamma))} \\
&= |G|  \sum_{[\gamma] \in \{\Gamma\}} \frac{1}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma)) \overline{\mathrm{tr}(\sigma(\gamma))} \\
&= \frac{|G|}{|\Gamma|} \sum_{[\gamma] \in \{\Gamma\}} \frac{|\Gamma|}{|\Gamma_\gamma|} \mathrm{tr}(\rho(\gamma))\overline{\mathrm{tr}(\sigma(\gamma))} \\
&= \frac{|G|}{|\Gamma|} \sum_{\gamma \in \Gamma} \mathrm{tr}(\rho(\gamma))\overline{\mathrm{tr}(\sigma(\gamma))} \\
&= |G| \langle  \chi_\rho, \mathrm{Res}_\Gamma^G(\chi_\sigma) \rangle _{\Gamma}
\end{align*}
$$

hence we get $m_\sigma^\rho = \langle \chi_\rho, \mathrm{Res}\_\Gamma^G(\chi_\sigma) \rangle$. $\square$


*References*:

[1] D. Whitehouse, *An introduction to the trace formula*, Lecture note, 2010