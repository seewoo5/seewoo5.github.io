---
layout: posts
title:  "Tate's Thesis and Riemann-Roch Theorem"
date:   2024-02-04
categories: jekyll update
tags: math
---

In this article, I explain the meaning of the following statement:

>  "Tate's thesis over function field is Riemann-Roch theorem."

which I've heard many times but never tried to understand it throughly.
I closely followed the book "Fourier Analysis on Number Fields" by Ramakrishnan and Valenza, Chapter 7. Also, [Ponnen's note](https://math.mit.edu/~poonen/786/notes.pdf) was helpful, too.

In my own words, I may re-state the above as follows:

> "Poisson summation formula on an adele ring $\mathbb{A}_{\mathbb{F}_q(X)}$ implies Riemann-Roch theorem for a (smooth projective) curve $X$ over a finite field $\mathbb{F}_q$."

Note that there's a version of Riemann-Roch theorem for arbitrary ground fields - see [this](https://mathoverflow.net/questions/55454/is-there-a-riemann-roch-for-smooth-projective-curves-over-an-arbitrary-field) MO question and answers there.

### Tate's thesis

I may assume that the readers are familiar with Tate's thesis, or at least heard about it at least once.
Tate's celebrated thesis in 1950 can be summarized as follows: understand (Dirichlet) $L$-functions using Fourier analysis on adeles (or more generally, locally compact Hausdorff groups). Especially, one of the main result of the thesis is that the nice properties of Dirichlet $L$-functions follow from local computations at archimedean and non-archimedean places.
Compared to the original proof of Riemann (for his zeta function $\zeta(s)$) and Hecke (for Dirichlet zeta function) using Mellin transforms of (generalized) theta series, Tate's approach is more clean and also better for generalizations to other $L$-functions (e.g. automorphic $L$-functions).

### Poisson summation formula

In his thesis, one of the main result is the following version of Poisson summation formula for functions on adeles $\mathbb{A}_K$.

> **Theorem (Poisson summation formula, additive version).** For a Bruhat-Schwartz function $f \in \mathcal{S}(\mathbb{A}_K)$, we have
>
> $$
> \sum_{a \in K} f(a) = \sum_{a \in K} \widehat{f}(a).
> $$

<details>

<summary>Proof.</summary>

Let $F(x)$ be the function on the left hand side. By definition, $F(x)$ is invariant under $K$-translation, i.e. it descends to a function on $K \backslash \mathbb{A}_K$.
Hence it admits a Fourier expansion

$$
F(x) = \sum_{a \in K}\widehat{F}(a) \overline{\psi}(ax)
$$

where

$$
\begin{align*}
\widehat{F}(z) &= \int_{K \backslash \mathbb{A}_K} F(x) \psi(xz) \overline{\mathrm{d}x} \\
&= \int_{K \backslash \mathbb{A}_K} \sum_{a \in K} f(x + a) \psi(xz) \overline{\mathrm{d}x} \\
&= \int_{K \backslash \mathbb{A}_K} \sum_{a \in K} f(x + a) \psi((x+a)z) \overline{\mathrm{d}x} \\
&= \int_{\mathbb{A}_K} f(x) \psi(xz) \mathrm{d}x = \widehat{f}(z)
\end{align*}
$$

for $z \in K$. Here $\overline{\mathrm{d}x}$ is the quotient measure on $K \backslash \mathbb{A}_K$ induced by $\mathrm{d}x$. Hence

$$
\sum_{a \in K} f(x + a) = \sum_{a \in K} \widehat{f}(a) \overline{\psi}(ax)
$$

and putting $x = 0$ gives a proof. $\square$
</details>

As a corollary, we can prove the following *multiplicative* version of the Poisson summation formula[^1].

> **Corollary (Poisson summation formula, multiplicative version).** For an idele $x \in \mathbf{I}_K$ and a Bruhat-Schwartz function $h \in \mathcal{S}(\mathbb{A}_K)$, we have
>
> $$
> \sum_{a \in K} f(ax) = \frac{1}{|x|} \sum_{a \in K} \widehat{f}\left(\frac{a}{x}\right).
> $$

<details>

<summary>Proof.</summary>

Apply the (additive) Poisson summation formula to the function $h(y) := f(yx)$, which is clearly a Bruhat-Schwartz function. We have
$$
\begin{align*}
\widehat{h}(a) &= \int_{\mathbb{A}_K} f(yx) \psi(ay) \mathrm{d}y \\
&= \frac{1}{|x|} \int_{\mathbb{A}_K} f(y) \psi(ayx^{-1}) \mathrm{d}y \\
&= \frac{1}{|x|} \widehat{f}(ax^{-1})
\end{align*}
$$
and the theorem follows immediately.
</details>

### Riemann-Roch Theorem

Now here's an upshot: when $K = \mathbb{F}_q(X)$ is a function field of a smooth projective curve $X$ over $\mathbb{F}_q$, then the multiplicative Poisson summation formula yields the usual Riemann-Roch Theorem for $X$.

Recall that a divisor $D = \sum_v n_v v$ on $K$ is a formal linear combination over all places of $v$ with $n_v = 0$ for all but finitely many $v$'s.
Then the *degree* of $D$ is defined as $\deg(D) := \sum_v n_v \deg(v)$ where $\deg(v) = [\mathbb{F}\_{q_v}: \mathbb{F}\_q]$ is the degree of the residue field $\mathbb{F}_{q_v}$ at $v$.
The divisors on $K$ form an additive group $\mathrm{Div}(X)$, and the degree map defines a homomorphism $\deg : \mathrm{Div}(X) \to \mathbb{Z}$. We denote the kernel by $\ker(f) =: \mathrm{Div}^0(K)$.
For $f \in K^\times$, we can associate a *principal divisor*
$$
\mathrm{div}(f) := \sum_{v} v(f) v
$$
which has degree $0$ by the product formula.
The quotient groups $\mathrm{Div}(K) / \mathrm{div}(K^\times)$ and $\mathrm{Div}^0(K) / \mathrm{div}(K^\times)$ are denoted as $\mathrm{Pic}(K)$ and $\mathrm{Pic}^0(K)$, called the *Picard group* (of degree zero) of $K$, respectively.
Then we have an exact sequence

$$
1 \to \mathbb{F}_q^\times \to K^\times \xrightarrow{\mathrm{div}} \mathrm{Div}^0(K) \to \mathrm{Pic}^0(K) \to 0.
$$

We have a natural partial ordering on $\mathrm{Div}(K)$ from the ordering of $n_v$'s, and for a given $D \in \mathrm{Div}(K)$, define the *linear system* of $D$ as

$$
L(D) = \{0\} \cup \{ f\in K^\times : \mathrm{div}(f) \geq -D\}
$$

which is naturally a vector space over $\mathbb{F}_q$.
In fact, it becomes a *finite dimensional* vector space, which is not *a priori* clear (proof is included in the proof of the following theorem).
Denote $l(D)$ for its dimension.
Then the Riemann-Roch theorem reads as follows.

> **Theorem (Riemann-Roch).** Let $K = \mathbb{F}_q(X)$ be a function field of a curve $X$ over $\mathbb{F}_q$. There exists an integer $g \geq 0$ (*genus* of $X$) and a divisor $\mathcal{K}$ of degree $2g - 2$ (*canonical divisor* of $K$), such that
> $$
> l(D) - l(\mathcal{K} - D) = \deg(D) - g + 1 
> $$
> for every divisor $D$.

<details>
<summary>Proof.</summary>

First, the <i>canonical divisor</i> $\mathcal{K}$ is given as follows. 
For any nontrivial character $\psi: K \backslash \mathbb{A}_K \to \mathbb{S}^1$, the conductor of the local character $\psi_v$ is $\mathfrak{p}_v^{m_v}$ for some $m_v \geq 0$, which is zero for all but finitely many $v$.
This defines a divisor

$$
\mathcal{K} = - \sum_v m_v v.
$$

If we consider another nontrivial character $\psi'$, then there exists $a \in K^\times$ with $\psi'(x) = \psi(ax)$, and the corresponding divisor $\mathcal{K}'$ becomes

$$
\mathcal{K}' = \mathcal{K} + \mathrm{div}(a).
$$

In other words, the <i>divisor class</i> of $\mathcal{K}$ in $\mathrm{Pic}(K)$ is well-defined.

Now, for a given divisor $D = \sum_v n_v v$, we can associate $x(D) \in \mathbb{I}_K$ with $v(x(D)_v) = n_v$.
Let $f = \otimes_v \mathbf{1}_{\mathcal{O}_v} \in \mathcal{S}(\mathbb{A}_K)$ be the Schwartz function which is the product of characteristic functions of $\mathcal{O}_v \subset K_v$ at each place of $K$.
Then for all $a \in K^\times$,

$$
f(a x(D)) = \begin{cases} 1 & \text{if } v(ax(D)_v) \geq 0 \,\,\forall v \\ 0 & \text{otherwise}. \end{cases}
$$

Equivalently, $f(ax(D))$ is nonzero if and only if $a \in \mathcal{L}(D)$. In other words, $f(ax(D)) = \mathbf{1}_{\mathcal{L}(D)}$, so the summation

$$
\sum_{a \in K} f(ax(D)),
$$

which converges since $f \in \mathcal{S}(\mathbb{A}_K)$, equals $\# \mathcal{L}(D) = q^{l(D)}$ (this also prove finiteness of the dimension of $\mathcal{L}(D)$).
However, by Poisson summation formula, we get

$$
q^{l(D)} = \sum_{a \in K} f(ax(D)) = \frac{1}{|x(D)|} \sum_{a \in K} \widehat{f}\left(\frac{a}{x(D)}\right)
$$

and by definition of $x(D)$, we have

$$
|x(D)|^{-1} = \prod_v q_v^{n_v} = q^{\sum_v n_v \deg(v)} = q^{\deg(D)}.
$$

Hence, it suffices to show that the summation on the right hand side equals $q^{l(\mathcal{K} - D) - g + 1}$.
First, we compute local Fourier transforms $\widehat{\mathbf{1}_{\mathcal{O}_v}}$ of $\mathbf{1}_{\mathcal{O}_v}$. Recall that the conductor of $\psi_v$ is $\mathfrak{p}_v^{m_v}$. Then

$$
\begin{align*}
\widehat{\mathbf{1}_{\mathcal{O}_v}}(y) &= \int_{K_v} \mathbf{1}_v(x) \psi_v(xy) \mathrm{d}x \\
&= \int_{\mathcal{O}_v} \psi_v(xy) \mathrm{d}x \\
&= \mathrm{d}x(\mathcal{O}_v) \mathbf{1}_{\mathfrak{p}_v^{m_v}}(y)
\end{align*}
$$

and

$$
\begin{align*}
\widehat{\widehat{\mathbf{1}_{\mathcal{O}_v}}}(z) &= \mathrm{d}x(\mathcal{O}_v) \int_{K_v} \mathbf{1}_{\mathfrak{p}_v^{m_v}}(y) \psi_v(yz) \mathrm{d}y \\
&= \mathrm{d}x(\mathcal{O}_v) \int_{\mathfrak{p}_v^{m_v}} \psi_v(yz) \mathrm{d}y \\
&= \mathrm{d}x(\mathcal{O}_v) \mathrm{d}x(\mathfrak{p}_v^{m_v}) \mathbf{1}_{\mathcal{O}_v}(z) \\
&= \mathrm{d}x(\mathcal{O}_v)^{2} q_v^{-m_v}  \mathbf{1}_{\mathcal{O}_v}(z).
\end{align*}
$$

Since $\mathrm{d}x$ is self-dual with respect to $\psi_v$, we get $\mathrm{d}x(\mathcal{O}_v)^{2} q^{-m_v} = 1 \Leftrightarrow \mathrm{d}x(\mathcal{O}_v) = q^{m_v / 2}$ and $\widehat{\mathbf{1}_{\mathcal{O}_{v}}}(y) = q^{m_v / 2} \mathbf{1}_{\mathfrak{p}_v^{m_v}}(y)$.

Hence

$$
\widehat{f}(a x(D)^{-1}) = \prod_v q_v^{m_v / 2} \mathbf{1}_{\mathfrak{p}_v^{m_v}}(a x(D)^{-1}) = \begin{cases} q^{1 - g} & v(a) \geq n_v + m_v\,\,\forall v \\ 0 &\text{otherwise}\end{cases}
$$

where the second equality for the first case follows from

$$
\prod_v q_v^{m_v / 2} = q^{(\sum_v m_v \deg(v)) / 2} = q^{-\deg(\mathcal{K}) / 2} = q^{1 - g}.
$$

By definition, $\widehat{f}(ax(D)^{-1}) = q^{1-g}$ if and only if $a \in \mathcal{L}(\mathcal{K} - D)$, so the summation becomes

$$
\sum_{a \in K} \widehat{f}\left(\frac{a}{x(D)}\right) = q^{l(\mathcal{K} - D)} \cdot q^{1 - g} = q^{l(\mathcal{K} - D) + 1 - g}
$$

which completes a proof. Note that taking $D = 0$ gives $l(\mathcal{K}) = g$ (we have $\mathcal{L}(0) = \mathbb{F}_q$ and $l(0) = 1$), which proves that $g = 1 + \deg(\mathcal{K}) / 2$ must be a nonnegative integer. $\square$

</details>



[^1]: I know that this is not widely used terminology, but I want to distinguish this corollary with the original (additive) form of Poisson summation formula.