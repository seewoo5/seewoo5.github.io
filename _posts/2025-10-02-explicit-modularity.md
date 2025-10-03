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
In fact, Newman[^1] gave a criteria for eta products being a modular form: the product

$$
\prod_{d \mid N} \eta(dz)^{r_d}
$$

with $r_d \in \mathbb{Z}$ satisfying

$$
\sum_{d \mid N} d r_d \equiv 0 \pmod{24}, \quad \sum_{d \mid N} \frac{N}{d} r_d \equiv 0 \pmod{24}, \quad s:=\prod_{d \mid N} d^{r_d} \in (\mathbb{Q}^\times)^2
$$

becomes a weight $k = \frac{1}{2} \sum_{d \mid N} r_d$ modular form of Nebentypus

$$
\chi(d) = \left(\frac{(-1)^k s}{d}\right).
$$

For our $f(z)$, $r_4 = r_8 = 2$ and $4 r_4 + 8 r_8 = 24$, $8 r_4 + 4 r_8 = 24$, and $s = 4^{r_4} 8^{r_8} = (32)^2$, so it is a modular form of level $\Gamma_0(32)$ with trivial character.

It is also possible to express $f(z)$ as theta series.
In Martin-Ono[^2], they proved that the $p$-th cofficient of $f(z)$ is given by

$$
a_p(f) = \begin{cases} 0 & p \equiv 3 \pmod{4} \\ (-1)^{n+m} (4n+2) & p = (2n+1)^2 + 4m^2, \,n, m \ge 0\end{cases}
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

and noting that there exists unique $m, n \ge 0$ satisfying $p = (2n+1)^2 + (2m)^2$ for given $p \equiv 1 \pmod{4}$.

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
Here we sketch the computation of Berndt and Evans[^3], specalized to $a = 4$.

For a Dirichlet character $\chi$ modulo $p$, let $G(\chi) = \sum_{x \in \mathbb{F}\_p} \chi(x) e^{2 \pi i x / p}$ be the Gauss sum of $\chi$.
If $\psi$ is another Dirichlet character of same modulus, Jacobi sum $J(\chi, \psi)$ is given by

$$
J(\chi, \psi) = \sum_{x \in \mathbb{F}_p} \chi(x) \psi(1 - x).
$$

When $\chi, \psi, \chi\psi$ are all nontrivial characters, one can show that

$$
J(\chi, \psi) = \frac{G(\chi)G(\psi)}{G(\chi\psi)}, \quad |J(\chi, \psi)| = p^{1/2}.
$$

Now, fix a quartic character $\chi$ with $\chi^2 = \left(\frac{\cdot}{p}\right)$.
Then we can rewrite $\varphi_{p, 2}(4)$ as

$$
\begin{align*}
\varphi_{p, 2}(4) = \sum_{x \in \mathbb{F}_p} \chi^2(x) \chi^2(x^2 + 4)
= \sum_{x \in \mathbb{F}_p} \chi(x^2) \chi^2(x^2 + 4)
\end{align*}
$$

since $y \in \mathbb{F}\_p^2$ if and only if $\chi^2(y) = 1$, one can rewrite the last sum as

$$
\begin{align*}
&\sum_{x \in \mathbb{F}_p} \chi(x) \chi^2(x + 4) (1 + \chi^2(x)) \\
&= \sum_{x \in \mathbb{F}_p} \chi(-4x) \chi^2(-4x + 4) (1 + \chi^2(-4x)) \qquad(x \leftarrow -4x) \\
&=\chi(-4) \left(\sum_{x \in \mathbb{F}_p} \chi(x)\chi^2(1-x) + \sum_{x \in \mathbb{F}_p} \chi^3(x) \chi^2(1-x)\right) \\
&= 2 \chi(-4) \Re[J(\chi, \chi^2)]
\end{align*}
$$

(Note that $\chi^2(4) = \chi^2(-4) = 1$.) So it reduces to the computation of $J(\chi, \chi^2)$.
Since $J(\chi, \chi^2) \in \mathbb{Z}[i]$ and $|J(\chi, \chi^2)| = p$, one can write it as $J(\chi, \chi^2) = a + ib$ for $a, b \in \mathbb{Z}$ and $a^2 + b^2 = p$.
Then

$$
J(\chi, \chi^2) = \sum_{m=2}^{p-1} \chi(1 - m) \left(\frac{m}{p}\right) = \sum_{m=2}^{p-1} \chi(1-m) \left[\left(\frac{m}{p}\right) - 1\right] - 1,
$$

and from $\chi(1-m) \equiv 1 \pmod{(1-i)\mathbb{Z}[i]}$ and $\left(\frac{m}{p}\right) - 1 \equiv 0 \pmod{2}$,

$$
a + ib = J(\chi, \chi^2) \equiv \sum_{m=2}^{p-1} \left[\left(\frac{m}{p}\right) - 1\right] - 1 \equiv -p \pmod{2(1-i)\mathbb{Z}[i]}
$$

so $|(a + p) + ib|^2 = p(p+1+2a)$ is divisible by $|2(1-i)| = 8$, thus $a \equiv -\frac{p+1}{2} \equiv -\left(\frac{2}{p}\right) \pmod{4}$, i.e. $a$ is odd.
For such $a$, we have

$$
a_p(E) = - 2 \chi(-4) \Re[J(\chi, \chi^2)] = -2\chi(-4)a.
$$

Comparing with the formula of $a_p(f)$, one only needs to determine the sign of $\chi(-4)$ and $a$.
From

$$
\begin{align*}
\chi(-1) &= (-1)^{\frac{p-1}{4}} = \begin{cases} 1 & p \equiv 1 \pmod{8} \\ -1 & p \equiv 5 \pmod{8} \end{cases} \\
\chi(4) &= \left(\frac{2}{p}\right) = \begin{cases} 1 & p \equiv 1 \pmod{8} \\ -1 & p \equiv 5 \pmod{8} \end{cases}
\end{align*}
$$

we have $\chi(-4) = 1$ for any $p \equiv 1 \pmod{4}$, so $a_p(E) = -2a$.
Now, we further divide into two cases:


- $p \equiv 1 \pmod{8}$. We have $a \equiv -1 \pmod{4}$. If one write $p = (2n + 1)^2 + (2m)^2$, then $m$ has to be even. Also, $(-1)^n (2n+1) \equiv 1 \pmod{4}$ for any $n$, hence $a^2 + b^2 = (2n+1)^2 + (2m)^2$ gives $a = -(-1)^n (2n+1)$. Then

    $$a_p(E) = -2a = 2(-1)^{n}(2n+1) = 2(-1)^{n+m}(2n+1) = a_p(f).$$

- $p \equiv 5 \pmod{8}$. We have $a \equiv 1 \pmod{4}$. Then similar argument shows $a = (-1)^n (2n+1)$ and $m$ odd, which again implies $a_p(E) = a_p(f)$.

This concludes the proof.

**Exercise.** Do the similar computation with other CM elliptic curves / modular forms in Martin-Ono [^2]. For the elliptic curves with CM by $\mathbb{Z}[\zeta_3]$, one may need Jacobsthal sum $\varphi_{p, 3}$ instead of $\varphi_{p, 2}$.


[^1]: M. Newman, "Construction and application of a class of modular functions", PLMS 1957

[^2]: Y. Martin, K. Ono, "Eta-quotients and elliptic curves", PAMS 1997

[^3]: B. Berndt, R. Evans, "Sums of Gauss, Jacobi, and Jacobsthal", JNT 1979