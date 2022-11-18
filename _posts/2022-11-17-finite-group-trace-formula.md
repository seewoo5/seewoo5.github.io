---
layout: posts
title:  "Trace formula for finite groups"
date:   2022-11-17
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

The main reference is the Whitehouse's lecture note on trace formula [1].

### Trace formula for finite groups

Let $G$ be a finite group and $\Gamma$ be its subgroup.
Consider $V_\Gamma = \mathbb{C}[\Gamma \backslash G]$, the space of complex valued functions on $G$ that is left $\Gamma$-invariant.
Then $G$ acts on $V_\Gamma$ by right translation: $(R(g)\varphi) = \varphi(xg)$.
We can decompose $R$ into the sum of irreducible representations as

$$
R = \bigoplus_{\pi \in \hat{G}} m_{\pi}^{\Gamma} \pi
$$

where $\hat{G}$ is the set of irreducible representations of $G$ and $m_{\pi}^{\Gamma} \in \mathbb{Z}_{\geq 0}$ are their multiplicities.

For any function $f: G \to \mathbb{C}$ and a representation $(\pi, V)$, we can *linearlize* $\pi$ as follows: define $\pi(f): V \to V$ as

$$
\pi(f)v = \sum_{g \in G} f(g) \pi(g)v
$$

for all $v \in V$. 
Since $\mathrm{tr}(\pi(f))$ only depends on the isomorphism class of $\pi$, we can express the trace of $R(f)$ as

$$
\mathrm{tr}(R(f)) = \sum_{\pi \in \hat{G}} m_{\pi}^{\Gamma}\mathrm{tr}(\pi(f)).
$$

Now we will express $\mathrm{tr}R(f)$ in a different way to get the desired formula. By definition, $R(f): V_\Gamma \to V_\Gamma$ becomes

$$
(R(f)\varphi)(x) = \sum_{y \in G} f(y) \varphi(xy).
$$

After making the change of variable $y \mapsto x^{-1}y$, we have

$$
(R(f) \varphi)(x) = \sum_{y \in G} f(x^{-1}y) \varphi(y)
$$

and the latter sum can be expressed as a following double sum

$$
\begin{align*}
\sum_{y \in G} f(x^{-1}y) \varphi(y) &= \sum_{y \in \Gamma \backslash G} \sum_{\gamma \in \Gamma} f(x^{-1}\gamma y) \varphi(\gamma y) \\
&=\sum_{y \in \Gamma \backslash G} \sum_{\gamma \in \Gamma} f(x^{-1}\gamma y) \varphi(y) 
\end{align*}
$$

where the second equality comes from the left $\Gamma$-invariance of $\varphi$.
This means that the linearized right regular representation $R(f)$ has a kernel expression

$$
(R(f)\varphi)(x) = \sum_{y \in \Gamma \backslash G} K_f(x, y) \varphi(y)
$$

for

$$
K_f(x,y) = \sum_{\gamma \in \Gamma} f(x^{-1} \gamma y),
$$

and the trace of it can be expressed as a summation of $K_f$ over *diagonals*:

$$
\mathrm{tr}(R(f)) = \sum_{x\in \Gamma\backslash G} K_f(x, x).
$$

Our goal is to express this as a sum of *orbital integrals* over the conjugacy classes of $\Gamma$, using unfolding and folding tricks.
Once we decompose the sum over $\Gamma$ in $K_f(x, x)$ into conjugacy classes of $\Gamma$, we get

$$
\sum_{\gamma \in \Gamma} f(x^{-1}\gamma x) = \sum_{[\gamma] \in \{\Gamma\}} \sum_{\delta \in \Gamma_{\gamma} \backslash \Gamma} f(x^{-1}\delta^{-1}\gamma \delta x)
$$

where $\{\Gamma\}$ is the set of conjugacy classes of $\Gamma$, and $\Gamma_\gamma$ is the centralizer of $\gamma$ in $\Gamma$ (i.e. stabilizer of the conjugation action for $\gamma$).
Using this, we can change the order of summation and combine them as follows:

$$
\begin{align*}
\sum_{x\in \Gamma \backslash G} K_f(x, x) &= \sum_{x \in \Gamma \backslash G} \sum_{[\gamma] \in \{\Gamma\}} \sum_{\delta \in \Gamma_\gamma \backslash \Gamma} f(x^{-1}\delta^{-1} \gamma \delta x) \\
&=\sum_{[\gamma] \in \{\Gamma\}}  \sum_{\delta \in \Gamma_\gamma \backslash \Gamma} \sum_{x\in \Gamma \backslash G} f(x^{-1} \delta^{-1} \gamma \delta x) \\
&= \sum_{[\gamma] \in \{\Gamma\}} \sum_{x \in \Gamma_\gamma \backslash G} f(x^{-1}\gamma x).
\end{align*}
$$

Since $f(x^{-1}\gamma x)$ does not change if we replace $x$ with $yx$ for $y \in G_\gamma$, the last sum becomes

$$
\sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \sum_{x \in G_\gamma \backslash G} f(x^{-1} \gamma x).
$$

This gives the desired trace formula for finite groups.


> **Theorem (Trace formula for finite groups).** Let $G$ be a finite group and $\Gamma \leq G$ be a subgroup. Let $R = \oplus_{\pi \in \hat{G}} m_\pi^{\Gamma}\pi$ be the decomposition of right regular representation $R$ on $\mathbb{C}[\Gamma \backslash G]$ as irreducible representations.
> For any $f : G \to \mathbb{C}$, we have
> 
> $$
> \sum_{\pi \in \hat{G}} m_{\pi}^{\Gamma} \mathrm{tr}(\pi(f)) = \sum_{[\gamma] \in \{\Gamma\}}\frac{|G_\gamma|}{|\Gamma_\gamma|} \sum_{x \in G_\gamma \backslash G} f(x^{-1} \gamma x) 
> $$

*Remark*. In the adelic setting, $G = G(\mathbb{A}\_F)$ is a group of $\mathbb{A}\_F$-points of a reductive group $G$ (here we are abusing a notation) and $\Gamma = G(F)$ is a group of $F$-points, which is a discrete subgroup of $G(\mathbb{A}\_F)$.
In the geometric expansion (RHS of the trace formula), $| G\_\gamma| / | \Gamma\_\gamma|$ corresponds to the *volumn* of $\Gamma_\gamma \backslash G_\gamma$ and the *orbital sum* becomes *orbital integral*.


### Application: Frobenius reciperocity

By using the trace formula, we can compute the multiplicities $m_{\pi}^{\Gamma}$ of each $\pi$ occuring in the expansion of $R$.

> **Corollary (Frobenius reciprocity).** $m_{\pi}^{\Gamma} = \dim \pi^{\Gamma}$, where $\pi^\Gamma$ denotes the subspace of $\pi$ fixed by $\Gamma$.

We need a lemma. 

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

*Proof of corollary.*
We have

$$
\sum_{g\in G} \mathrm{tr}(\pi(g)) = \sum_{[g] \in \{G\}} \frac{|G|}{|G_g|} \mathrm{tr}(\pi(g))
$$

and combining with Lemma, we get

$$
\sum_{[g] \in \{G\}} \frac{1}{|G_g|} \mathrm{tr}(\pi(g)) = \dim \pi^G.
$$

Now, fix an irreducible representation $\sigma \in \hat{G}$ and let $f_\sigma := \overline{\mathrm{tr}(\sigma(g))}$, i.e. complex conjugate of the character of $\sigma$.
Then

$$
\mathrm{tr} (\pi(f_\sigma)) = \sum_{g \in G} \overline{\mathrm{tr}(\sigma(g))} \mathrm{tr}(\pi(g))
$$

and by orthogonality of characters, we get

$$
\mathrm{tr}(\pi(f_\sigma)) = \begin{cases} |G| & \pi\simeq \sigma \\ 0 & \text{otherwise}.\end{cases}
$$

and this gives

$$
\mathrm{tr}(R(f_\sigma)) = \sum_{\pi \in \hat{G}} \mathrm m_{\pi}^{\Gamma} \mathrm{tr}(\pi(f_\sigma)) = m_{\sigma}^{\Gamma} \cdot |G|.
$$
On the other hand we have, by trace formula, 

$$
\begin{align*}
\mathrm{tr}(\pi(f_\sigma)) &= \sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \sum_{x \in G_\gamma \backslash G} f_{\sigma}(x^{-1}\gamma x) \\
&=  \sum_{[\gamma] \in \{\Gamma\}} \frac{|G_\gamma|}{|\Gamma_\gamma|} \frac{|G|}{|G_\gamma|} \overline{\mathrm{tr}(\sigma(\gamma))} \\
&= |G| \overline{ \sum_{[\gamma] \in \{\Gamma\}} \frac{1}{|G_\gamma|} \mathrm{tr}(\sigma(\gamma))} \\
&= |G| \dim \sigma^\Gamma
\end{align*}
$$

hence we get $m_{\sigma}^\Gamma = \dim \sigma^\Gamma$. $\square$


*References*:

[1] D. Whitehouse, *An introduction to the trace formula*, Lecture note, 2010