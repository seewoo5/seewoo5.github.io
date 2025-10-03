---
layout: posts
title:  "Explicit modularity for a CM elliptic curve"
date:   2025-10-02
categories: jekyll update
tags: math
---

The goal of this post is to give a direct proof of one instance of modularity theorem.

> **Theorem.** Let $E$ be an elliptic curve over $\mathbb{Q}$ with Weierstrass equation
>
> $$
> y^2 = x^3 + 4x
> $$
>
> and $f(z)$ be a modular form of weight 2 and level $\Gamma_0(32)$
>
> $$
> f(z) = \eta(4z)^2 \eta(8z)^2 = q \prod_{n \ge 1} (1 - q^{4n})^2 (1 - q^{8n})^2 = \sum_{n \ge 1} a_n(f) q^n.
> $$
>
> Then
>
> $$
> a_p(E) := p + 1 - \# E(\mathbb{F}_p) = a_p(f)
> $$
>
> for any odd prime $p$.

The main idea is to express $f(z)$ as theta series, and use Jacobsthal's sum.

## Elliptic curve

The elliptic curve $E$ is a very special elliptic curve.
It has CM by $\mathbb{Z}[\sqrt{-1}]$, where an extra endomorphism is given by $(x, y) \mapsto (-x, iy)$.
The conductor of $E$ is 32, so it has good reduction at every odd prime.
You can use Sage to check these facts:

```python
E = EllipticCurve([0,0,0,4,0])
print(E.cm_discriminant())  # -4
print(E.conductor())  # 32
```

In fact, it is a model for the modular curve $X_0(32)$.

To count the number of $\mathbb{F}\_p$-points, observe that we have *two* points for each $x \in \mathbb{F}\_p$ where $x^3 + 4x$ is a nonzero square mod $p$.
If $x^3 + 4x = 0$, then we get a point, and no point otherwise.
Thus the number of $\mathbb{F}\_p$-points can be written as

$$
\#E(\mathbb{F}_p) = 1 + \sum_{x \in \mathbb{F}_p} \left(1 + \left(\frac{x^3 + 4x}{p}\right)\right) = p + 1 + \sum_{x \in \mathbb{F}_p} \left(\frac{x^3 + 4x}{p}\right).
$$

(Don't forget the point at infinity!) Then the formula shows

$$
a_p(E) = - \sum_{x \in \mathbb{F}_p} \left(\frac{x^3 + 4x}{p}\right).
$$

## Modular form

To check that $f(z)$ is indeed a modular form of weight 2 and level $\Gamma\_0(32)$, one can use explicit formula for the $\eta$-multiplier system, and check the desired equation

$$
f\left(\frac{az + b}{cz + d}\right) = (cz + d)^2 f(z)
$$

for a set generators of $\Gamma\_0(32)$.
This can be done by using Sage, as in the [previous blog post](https://seewoo5.github.io/jekyll/update/2024/10/05/ramanujan-tau-mod3.html).
It is also possible to express $f(z)$ as theta series.
In Martin-Ono[^1], they proved that the $p$-th cofficient of $f(z)$ is given by

$$
a_p(f) = \begin{cases} 0 & p \equiv 3 \pmod{4} \\ (-1)^{n+m} (4n+2) & p = (2n+1)^2 + 4m^2, \,n, m \ge 1\end{cases}
$$

This follows from two identities due to Jacobi:

$$
\begin{align*}
\eta(8z)^3 &= q \prod_{n \ge 1} (1 - q^{8n})^3 = \sum_{n \ge 0} (-1)^n (2n+1) q^{(2n+1)^2} \\
\frac{\eta(z)^2}{\eta(2z)} &= \prod_{n \ge 1} \frac{(1 - q^n)^2}{(1 - q^{2n})} = 1 + 2\sum_{n \ge 1} (-1)^n q^{n^2}
\end{align*}
$$

replacing $z$ with $4z$ in the second identity and multiplying together gives

$$
f(z) = \eta(8z)^3 \cdot \frac{\eta(4z)^2}{\eta(8z)} = \left(\sum_{n \ge 0} (-1)^n (2n+1) q^{(2n+1)^2}\right) \left(1 + 2 \sum_{m \ge 1}(-1)^m q^{4m^2}\right)
$$

and noting that there exists unique $m, n$ satisfying $p = (2n+1)^2 + (2m)^2$ for given $p \equiv 1 \pmod{4}$.

## Relation

Now, let's prove $a_p(E) = a_p(f)$.
We divide into two cases, where $p \equiv 1 \pmod{4}$ and $p \equiv 3 \pmod{4}$.

When $p \equiv 3 \pmod{4}$, we have $a_p(f) = 0$.
Since $\left(\frac{-1}{p}\right)= -1$, we can write the character sum as

$$
\sum_{x \in \mathbb{F}_p} \left(\frac{x^3 + 4x}{p}\right) = \sum_{x \in \mathbb{F}_p} \left(\frac{(-x)^3 + 4(-x)}{p}\right) = \left(\frac{-1}{p}\right) \sum_{x \in \mathbb{F}_p} \left(\frac{x^3 + 4x}{p}\right) = -\sum_{x \in \mathbb{F}_p} \left(\frac{x^3 + 4x}{p}\right),
$$

and this shows $a_p(E) = 0$.

Now assume $p \equiv 1 \pmod{4}$.
The above character sum actually has a name and called as *Jacobsthal sum*.
More generally, Jacobsthal sum is defined as

$$
\varphi_{p,n}(a) = \sum_{x \in \mathbb{F}_p} \left(\frac{x(x^n + a)}{p}\right)
$$

and is computed for several valus of $n$.
In particular, $a_p(E) = - \varphi_{p,2}(4)$ and the case of $n = 2$ is studied by Jacobsthal.
Here we sketch the computation of Berndt and Evans[^2], specalized to $a = 4$.

For a Dirichlet character $\chi$ modulo $p$, let $G(\chi) = \sum_{x \in \mathbb{F}\_p} \chi(x) e^{2 \pi i x / p}$ be the Gauss sum of $\chi$.
If $\psi$ is another Dirichlet character of same modulus, Jacobi sum $J(\chi, \psi)$ is given by

$$
J(\chi, \psi) = \sum_{x \in \mathbb{F}_p} \chi(x) \psi(1 - x).
$$

When $\chi, \psi, \chi\psi$ are all nontrivial characters, one can show that

$$
J(\chi, \psi) = \frac{G(\chi)G(\psi)}{G(\chi\psi)}, \quad |J(\chi, \psi)| = p^{1/2}.
$$

Now we define

$$
K(\chi) := \chi(4) J(\chi, \chi) = J\left(\chi, \left(\frac{\cdot}{p}\right)\right)
$$

(the second equation requires justification; see Theorem 2.3 of [^2].)

Now, fix a quartic character $\chi$ with $\chi^2 = \left(\frac{\cdot}{p}\right)$.
Then we can rewrite $\varphi_{p, 2}(4)$ as

$$
\begin{align*}
\varphi_{p, 2}(4) &= \sum_{x \in \mathbb{F}_p} \chi^2(x) \chi^2(x^2 + 4) \\
&= \dots \\
&= \chi(-1) \left(\frac{2}{p}\right) (K(\chi) + K(\chi^3))
\end{align*}
$$

so it reduces to the computation of $K(\chi)$ (and $K(\chi^3)$).



[^1]: Y. Martin, K. Ono, "Eta-quotients and elliptic curves", PAMS 1997

[^2]: B. Berndt, R. Evans, "Sums of Gauss, Jacobi, and Jacobsthal", Journal of Number Theory 1979