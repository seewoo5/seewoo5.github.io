---
layout: posts
title:  "Image of a congruence subgroup is not always congruence"
date:   2023-02-16
categories: jekyll update
tags: math
---

Let $G$ be a reductive algebraic group over $\mathbb{Q}$.
Choose an embedding $G \hookrightarrow \mathrm{GL}_n$, and define

$$
\Gamma_G(N) := G(\mathbb{Q}) \cap \{g \in \mathrm{GL}_n(\mathbb{Z}):g \equiv I_n \,\mathrm{mod}\,N\}.
$$

*Congruence subgroup* of $G(\mathbb{Q})$ is any subgroup containing some $\Gamma(N)$ as a subgroup of finite index.
Although $\Gamma_G(N)$ depends on embedding $G \hookrightarrow \mathrm{GL}_n$, being a congruence subgroup is not.
In this post, we will show that the image of congruence subgroup need not to be congruence.
More precisely, we give a solution for the Exercise 4.3 of Milne's *Introduction to Shimura Varieties*:

> The image in $\mathrm{PGL}\_2(\mathbb{Q})$ of a congruence subgroup in $\mathrm{SL}\_2(\mathbb{Q})$ need not to be congruence.
In fact, the image of $\Gamma\_{\mathrm{SL}\_2}(8)$ in $\mathrm{PGL}\_2(\mathbb{Q})$ is not congruence.


*Proof.* First, we embed $\mathrm{PGL}\_2$ into $\mathrm{GL}\_3$ using adjoint representation.
$\mathrm{GL}\_2$ acts on its Lie algebra $\mathfrak{gl}\_2$ via conjugation, and the action preserves the subspace $\mathfrak{sl}\_2$ (the set of traceless matrices), which has dimension 3.
Choose a basis of $\mathfrak{sl}\_2$ as

$$
X = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad 
Y = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}, \quad
Z = \begin{pmatrix} 0 & 0 \\ -1 & 0 \end{pmatrix},
$$

then $g = \left(\begin{smallmatrix} a & b \\\ c & d \end{smallmatrix}\right)$ acts as

$$
\begin{align*}
gXg^{-1} &= \frac{1}{D} (a^2 X + ac Y + c^2 Z) \\
gYg^{-1} &= \frac{1}{D} (2ab X + (ad + bc) Y + 2cd Z) \\
gZg^{-1} &= \frac{1}{D} (b^2 X + bd Y + d^2 Z)
\end{align*}
$$

where $D = \det(g) = ad - bc$. Hence we obtain a map $\mathrm{GL}\_2 \rightarrow \mathrm{GL}\_3$ as

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix} \mapsto \frac{1}{ad - bc} \begin{pmatrix} a^2 & 2ab & b^2 \\ ac & ad + bc & bd \\ c^2 & 2cd & d^2 \end{pmatrix},
$$

and this induces an embedding $\iota: \mathrm{PGL}\_2 \hookrightarrow \mathrm{GL}\_3$. 
and we can define $\Gamma\_{\mathrm{PGL}\_2}(M)$ using this map.
From now on, we will always consider representatives with integer entries.
In fact, for $\bar{g} = \overline{\left(\begin{smallmatrix}a&b \\\ c&d \end{smallmatrix}\right)}$ in $\mathrm{PGL}\_2(\mathbb{Q})$, there is a unique representative $g$ with coprime integer entries (up to multiplication by $-I_2$), and $\iota(g) \in \mathrm{GL}\_3(\mathbb{Z})$ implies $\det(g) = \pm 1$.

Now, we will show that $\alpha(\Gamma\_{\mathrm{SL}\_2}(8))$ is not a congruence subgroup, where $\alpha: \mathrm{SL}\_2 \to \mathrm{PGL}\_2$.
In other words, we will show that for any $M \geq 1$, $\Gamma\_{\mathrm{PGL}\_2}(M) \not\subseteq \alpha(\Gamma\_{\mathrm{SL}\_2}(8))$.

First, assume that $8\nmid M$.
We can easily check that $\overline{\left(\begin{smallmatrix} 1 & M \\\ 0 & 1\end{smallmatrix}\right)}$ is in $\Gamma\_{\mathrm{PGL}\_2}(M)$, but not in the image of $\Gamma\_{\mathrm{SL}\_2}(8)$.

When $M$ is a multiple of 8, we will use the following lemma.

> **Lemma.** Let $M$ be a positive integer divisible by $8$. Then $x^2 \equiv 1\,(\mathrm{mod}\,M)$ has a solution other than $\pm 1$ and not $1$ modulo $8$.

Let's assume lemma for a moment and let $x$ as above.
Then

$$
g = \begin{pmatrix} 2x - x^3 & - \frac{(x^2 - 1)^2}{M} \\ M & x\end{pmatrix}
$$

satisfies $\iota(\bar{g}) \equiv I_3 \,(\mathrm{mod}\,M)$, so $\bar{g} \in \Gamma\_{\mathrm{PGL}\_2}(M)$ but $\bar{g}$ is not in the image of $\Gamma\_{\mathrm{SL}\_2}(8)$ by Lemma.[^1]

Finally, let's prove the Lemma.
Write $M = 2^k \cdot M_0$ where $k \geq 3$ and $2 \nmid M_0$.
It is known that $5$ is an order $2^{k-2}$ element in $(\mathbb{Z}/2^k \mathbb{Z})^\times$ (one can check this by applying binomial theorem to $5 = 1 + 4$).
Now let $x_0 = \pm 5^{2^{k-3}}$ where the sign is choosen as $x_0 \not \equiv 1 \,(\mathrm{mod}\,8)$.
By Chinese remainder theorem, there exists $x$ such that

$$
\begin{cases} x\equiv x_0 \,(\mathrm{mod}\, 2^k) \\ 
x \equiv 1 \, (\mathrm{mod}\, M_0)
\end{cases}
$$

and such $x$ satisfies the condition of lemma. $\square$


[^1]: We can find such an element by setting $g = \left(\begin{smallmatrix} x + \alpha M & \beta M \\\ \gamma M & x + \delta M\end{smallmatrix}\right)$ and finding appropriate $\alpha, \beta, \gamma, \delta \in \mathbb{Z}$.