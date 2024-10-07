---
layout: posts
title:  "Fermat's cubic and Ramanujan's tau function modulo 3"
date:   2024-10-05
categories: jekyll update
tags: math
---

The goal of this post is to prove the following congruence: for primes $p \ne 3$,

$$
\tau(p) \equiv \begin{cases} 2 & p \equiv 1\pmod{3} \\ 0 & p \equiv 2\pmod{3} \end{cases}
$$

where Ramanujan's tau function $\tau(n)$ for $n \ge 1$ is given by the following generating function,

$$
\Delta(z) = q \prod_{n \ge 1} (1 - q^n)^{24} = \sum_{n \ge 1} \tau(n) q^n,\quad q = e^{2 \pi i z}
$$

which is the discriminant modular form (i.e. the unique normalized cusp form of level 1 and weight 12).

The second part of the congruence is easy to prove: in fact, we have

$$
\tau(3k) \equiv \tau(3k + 2) \equiv 0 \pmod{3}
$$

for any $k$, since

$$
q \prod_{n \ge 1} (1 - q^n)^{24} \equiv q \prod_{n \ge 1} ((1 - q^{n})^{3})^{8} \equiv q \prod_{n \ge 1} (1 - q^{3n})^{8} \pmod{3}
$$

and all the powers of the last expression are 1 modulo 3.
However, first congruence is less trivial, and I'll give a proof that uses a special elliptic curve and Wiles' modularity theorem.


### Fermat's cubic

For $n \ge 3$, *Fermat's curve* is simply defined as a projective curve with "Fermat's equation": $X^n + Y^n + Z^n = 0$ in $\mathbb{P}^{2}$ over $\mathbb{Q}$.
It is a nonsingular curve of degree $n$, and has a genus $g = (n-1)(n-2) / 2$.
Especially, when $n = 3$, the curve has genus 1, so it becomes an elliptic curve.
In fact, we have a change of variable

$$
x = -\frac{12Z}{X + Y}, \quad y = \frac{36(X-Y)}{X + Y}
$$

which gives a Weierstrass form of the Fermat's curve:

$$
\begin{align*}
y^2 &= \frac{36^{2}(X-Y)^{2}}{(X+Y)^{2}} \\
&= \frac{36^{2} (X^3 - X^2 Y - XY^2 + Y^3)}{(X+Y)^{3}} \\
&= \frac{12^{3}(X^3 + Y^3 + Z^3) - 12 Z^3 - 432 (X+Y)^3}{(X+Y)^{3}} \\
&= x^3 - 432.
\end{align*}
$$

This is the elliptic curve `27.a3` in [LMFDB](https://www.lmfdb.org/EllipticCurve/Q/27/a/3) and also has a [Cremona label](https://johncremona.github.io/ecdata/) `27a1`.
It's conductor is $N = 27$ and $j$-invariant is $0$.
The most intersting feature is the natural 3-fold symmetry of the curve, given by

$$
[X:Y:Z] \leftrightarrow [Y:Z:X] \leftrightarrow [Z:X:Y].
$$

(Exercise: write the symmetry in terms of the Weierstrass equation $y^2 = x^3 - 432$.)
Especially, for $p \ne 3$, the curve has a good reduction and $\\#E(\mathbb{F}\_p)$ is a multiple of 3: the above 3-fold symmetry does not have a fixed point, otherwise we should have $3 X^3 = 0 \Leftrightarrow X = 0 = Y = Z$.
Using Sage, one can actually compute the number of $\mathbb{F}\_p$-points and see all of them are multiples of 3: the following code check up to 300 primes ($p \le 1987$)

```python
Ps = Primes()[:300]
for p in Ps:
    if p != 3:
        Ep_card = EllipticCurve(GF(p), [0, 0, 1, 0, -7]).cardinality()
        print(p, Ep_card, Ep_card % 3)
```

<details>
<summary>Outputs (it's long!)</summary>
<pre><code>
2 3 0
5 6 0
7 9 0
11 12 0
13 9 0
17 18 0
19 27 0
23 24 0
29 30 0
31 36 0
37 27 0
41 42 0
43 36 0
47 48 0
53 54 0
59 60 0
61 63 0
67 63 0
71 72 0
73 81 0
79 63 0
83 84 0
89 90 0
97 117 0
101 102 0
103 117 0
107 108 0
109 108 0
113 114 0
127 108 0
131 132 0
137 138 0
139 117 0
149 150 0
151 171 0
157 144 0
163 189 0
167 168 0
173 174 0
179 180 0
181 189 0
191 192 0
193 171 0
197 198 0
199 189 0
211 225 0
223 252 0
227 228 0
229 252 0
233 234 0
239 240 0
241 225 0
251 252 0
257 258 0
263 264 0
269 270 0
271 243 0
277 252 0
281 282 0
283 252 0
293 294 0
307 324 0
311 312 0
313 279 0
317 318 0
331 333 0
337 333 0
347 348 0
349 387 0
353 354 0
359 360 0
367 333 0
373 387 0
379 351 0
383 384 0
389 390 0
397 432 0
401 402 0
409 441 0
419 420 0
421 441 0
431 432 0
433 432 0
439 468 0
443 444 0
449 450 0
457 468 0
461 462 0
463 441 0
467 468 0
479 480 0
487 513 0
491 492 0
499 468 0
503 504 0
509 510 0
521 522 0
523 567 0
541 513 0
547 549 0
557 558 0
563 564 0
569 570 0
571 603 0
577 567 0
587 588 0
593 594 0
599 600 0
601 576 0
607 657 0
613 567 0
617 618 0
619 603 0
631 675 0
641 642 0
643 684 0
647 648 0
653 654 0
659 660 0
661 711 0
673 711 0
677 678 0
683 684 0
691 684 0
701 702 0
709 657 0
719 720 0
727 684 0
733 684 0
739 756 0
743 744 0
751 711 0
757 729 0
761 762 0
769 819 0
773 774 0
787 819 0
797 798 0
809 810 0
811 756 0
821 822 0
823 819 0
827 828 0
829 837 0
839 840 0
853 819 0
857 858 0
859 873 0
863 864 0
877 819 0
881 882 0
883 837 0
887 888 0
907 927 0
911 912 0
919 972 0
929 930 0
937 999 0
941 942 0
947 948 0
953 954 0
967 927 0
971 972 0
977 978 0
983 984 0
991 1053 0
997 1008 0
1009 1053 0
1013 1014 0
1019 1020 0
1021 1008 0
1031 1032 0
1033 981 0
1039 981 0
1049 1050 0
1051 1116 0
1061 1062 0
1063 999 0
1069 1008 0
1087 1143 0
1091 1092 0
1093 1116 0
1097 1098 0
1103 1104 0
1109 1110 0
1117 1053 0
1123 1089 0
1129 1197 0
1151 1152 0
1153 1161 0
1163 1164 0
1171 1161 0
1181 1182 0
1187 1188 0
1193 1194 0
1201 1143 0
1213 1197 0
1217 1218 0
1223 1224 0
1229 1230 0
1231 1251 0
1237 1197 0
1249 1197 0
1259 1260 0
1277 1278 0
1279 1323 0
1283 1284 0
1289 1290 0
1291 1359 0
1297 1323 0
1301 1302 0
1303 1359 0
1307 1308 0
1319 1320 0
1321 1251 0
1327 1332 0
1361 1362 0
1367 1368 0
1373 1374 0
1381 1413 0
1399 1332 0
1409 1410 0
1423 1404 0
1427 1428 0
1429 1359 0
1433 1434 0
1439 1440 0
1447 1413 0
1451 1452 0
1453 1521 0
1459 1404 0
1471 1548 0
1481 1482 0
1483 1521 0
1487 1488 0
1489 1413 0
1493 1494 0
1499 1500 0
1511 1512 0
1523 1524 0
1531 1539 0
1543 1467 0
1549 1539 0
1553 1554 0
1559 1560 0
1567 1647 0
1571 1572 0
1579 1548 0
1583 1584 0
1597 1548 0
1601 1602 0
1607 1608 0
1609 1629 0
1613 1614 0
1619 1620 0
1621 1701 0
1627 1548 0
1637 1638 0
1657 1728 0
1663 1737 0
1667 1668 0
1669 1737 0
1693 1647 0
1697 1698 0
1699 1764 0
1709 1710 0
1721 1722 0
1723 1764 0
1733 1734 0
1741 1791 0
1747 1809 0
1753 1764 0
1759 1791 0
1777 1764 0
1783 1701 0
1787 1788 0
1789 1872 0
1801 1728 0
1811 1812 0
1823 1824 0
1831 1764 0
1847 1848 0
1861 1899 0
1867 1953 0
1871 1872 0
1873 1809 0
1877 1878 0
1879 1953 0
1889 1890 0
1901 1902 0
1907 1908 0
1913 1914 0
1931 1932 0
1933 1872 0
1949 1950 0
1951 1953 0
1973 1974 0
1979 1980 0
1987 1899 0
</code></pre>
</details>

Note that `[0, 0, 1, 0, -7]` corresponds to the *minimal* Weierstrass equation

$$
y^2 + y = x^3 - 7
$$

of the Fermat's cubic (Exercise: find the change of coordinate between the two Weierstrass equations).

Also, one might ask why there's no 6-fold symmetry instead of 3 by allowing arbitrary permutation (not necessarily even) of the coordinates such as $[X:Y:Z] \leftrightarrow [Y:X:Z]$, and the reason is that it could have fixed points.
In fact, when $p \equiv 2 \pmod{3}$, any number is a cubic residue modulo $p$, since

$$
(a^{\frac{2p-1}{3}})^{3} = a^{2p-1} = (a^{p-1})^{2} a \equiv a \pmod{p}.
$$

Especially, choose $a$ with $a^{3} \equiv 2 \pmod{p}$, then $[1:1:a]$ is a $\mathbb{F}\_p$-point of the Fermat's curve, fixed under the involution above.
It might be an interesting question to figure out when $\\#E(\mathbb{F}_{p})$ is even, possibly using the [cubic reciprocity](https://en.wikipedia.org/wiki/Cubic_reciprocity).
(Disclaimer: I don't know the answer.)

### Modularity theorem

The notorious Fermat's last theorem is proved by the combination of the works of several people, including Frey, Serre, Ribet, Wiles, and Taylor.
Especially, Andrew Wiles (and Richard Taylor) proved the Taniyama-Shimura conjecture, which is now called as *modularity theorem*:[^1]

> **Theorem (Wiles, Taylor-Wiles, Breuil-Conrad-Diamond-Taylor).** Every elliptic curve $E$ over $\mathbb{Q}$ is modular. More precisely, if $N = N_E$ is the conductor of $E$, there exists a modular form $f = f_E$ of weight $2$ and level $\Gamma\_0(N)$ such that they have the same $L$-functions:
>
> $$L(s, E) = L(s, f),$$
>
> where $L(s, E)$ is the Hasse-Weil $L$-function of $E$, and $L(s, f)$ is the Hecke L-function of $f$. In other words, for prime $p \nmid N$, we have
>
> $$a_p(E) = p + 1 - \# E(\mathbb{F}_p) = a_p(f)$$
>
> where $f = \sum_{n \ge 1} a_n(f) q^n$.

One of the best reference for the history and the proof of the modularity theorem is the collaborative book "Modular forms and Fermat's Last Theorem" edited by Cornell, Silverman, and Stevens.
Diamond and Shurman's book "A First Course in Modular Forms" also include few sections on the modularity theorem.

There are several equivalent form of the modularity theorem.
For example, it is equivalent to say that there's a "modular parametrization" of the elliptic curve $E$, i.e. a finite non-constant rational map $X_0(N) \to E$ defined over $\mathbb{Q}$.
This is equivalent to say that $E$ can be parametrized as *modular functions*: meromorphic functions on the complex upper half plane that are invariant under the $\Gamma\_0(N)$-action.


### The congruence

We are ready to prove our main theorem using the above results.
By modularity theorem, there exists a weigth $2$, level $\Gamma\_0(27)$ modular form $f \in S_{2}(\Gamma\_0(27))$ whose Fourier coefficients $a_n(f)$ satisfies

$$
a_p(f) = a_p(E) = p + 1 - \# E(\mathbb{F}_{p})
$$

for primes $p \ne 3$.
Fortunately, the space $S_2(\Gamma\_0(27))$ has dimension 1: it equals to the genus of the modular curve $X_0(27)$, which can be computed using the [genus formula](https://wstein.org/books/modform/modform/dimension_formulas.html)

$$
g_0(N) = \mathrm{genus}(X_0(N)) = 1 + \frac{\mu_0(N)}{12} - \frac{\mu_{0, 2}(N)}{12} - \frac{\mu_{0, 3}(N)}{3} - \frac{c_0(N)}{2}
$$

where

$$
\begin{align*}
    \mu_0(N) &= \prod_{p|N} (p^{v_p(N)} + p^{v_p(N) - 1}), \\
    \mu_{0, 2}(N) &= \begin{cases} 0 & 4 |N \\ \prod_{p |N} \left(1 + \left(\frac{-4}{p} \right)\right) & \text{otherwise} \end{cases}, \\
    \mu_{0, 3}(N) &= \begin{cases} 0 & 2 |N \text{ or } 9 | N \\ \prod_{p|N} \left(1 + \left(\frac{-3}{p}\right)\right) & \text{otherwise} \end{cases}, \\
    c_0(N) &= \sum_{d|N} \varphi(\mathrm{gcd}(d, N/d)).
\end{align*}
$$

We get $g_0(27) = 1$, so there is a unique cusp form up to a multiplicative constant.
In fact, the modular curve $X_0(27)$ itself *is* the Fermat's curve.
You can also compute this in Sage with a single line of a code:

```python
dimension_cusp_forms(Gamma0(27), 2)
```

Luckily, we have a nice expression of the unique cusp form as Dedekind's eta function:

$$
f(z) = \eta(3z)^{2} \eta(9z)^{2} = q \prod_{n \ge 1} (1 - q^{3n})^{2} (1 - q^{9n})^{2}.
$$

This is the modular form `27.2.a.a` in [LMFDB](https://www.lmfdb.org/ModularForm/GL2/Q/holomorphic/27/2/a/a/).
One can prove that $f(z)$ is indeed a modular form of weight $2$ and level $\Gamma\_0(27)$, by showing that $f(z)$ is invariant under the generators of $\Gamma\_0(27)$.
This is not easy to do by hand, but it can be done efficiently by using Farey symbol implemented in Sage.
First of all, the transformation law of Dedekind's eta function is given by

$$
\eta\left(\frac{az + b}{cz + d}\right) = \epsilon(a, b, c, d) (cz + d)^{\frac{1}{2}} \eta(z)
$$

with

$$
\epsilon(a, b, c, d) = \begin{cases} e^{\frac{bi\pi}{12}} & (c, d) = (0, 1) \\ e^{i\pi \left(\frac{a+d}{12c} - s(d, c) - \frac{1}{4}\right)} & c > 0\end{cases},
$$

where $s(h, k)$ is the [Dedekind sum](https://en.wikipedia.org/wiki/Dedekind_sum)

$$
s(h, k) = \sum_{n-1}^{k-1} \frac{n}{k} \left(\frac{hn}{k} - \left\lfloor \frac{hn}{k} \right\rfloor  - \frac{1}{2}\right).
$$

For $\gamma = \left(\begin{smallmatrix} a & b \\\ c & d \end{smallmatrix} \right) \in \Gamma\_0(27)$, we have

$$
\begin{align*}
\eta(3 (\gamma z)) &= \eta\left(\frac{3az + 3b}{cz + d}\right) \\
&= \eta \left(\frac{a(3z) + 3b}{\frac{c}{3}(3z) + d}\right) \\
&= \eta \left(\begin{pmatrix} a & 3b \\ \frac{c}{3} & d \end{pmatrix}(3z)\right) \\
&= \epsilon\left(a, 3b, \frac{c}{3}, d\right)^{2} (cz + d) \eta(3z)
\end{align*}
$$

and similar identity holds for $\eta(9z)$.
Therefore, it is enough to show

$$
\epsilon \left(a, 3b, \frac{c}{3}, d\right)^{2} \epsilon \left(a, 9b, \frac{c}{9} d\right)^{2} = 1\qquad (\ast)
$$

for all $\gamma = \left(\begin{smallmatrix} a & b \\\ c & d \end{smallmatrix} \right) \in \Gamma\_0(27)$.
The congruence subgroup $\Gamma\_0(27)$ is generated by 8 matrices:

```python
Gamma0(27).generators()
```

gives

```
[
[1 1]  [20 -3]  [16 -3]  [ 19  -4]  [23 -6]  [ 22  -9]  [ 64 -49]
[0 1], [27 -4], [27 -5], [ 81 -17], [27 -7], [ 27 -11], [ 81 -62],

[-1  0]
[ 0 -1]
]
```

and it is enough to check $(\ast)$ for these matrices:

```python
UCF = UniversalCyclotomicField()

def eta_multiplier(a, b, c, d):
    if c == 0:
        if d == 1:
            return UCF.gen(24, b)
        else:
            assert d == -1
            return UCF.gen(24, -b)
    else:
        if c < 0:
            a, b, c, d = -a, -b, -c, -d
        t = (a + d) / (12 * c) - dedekind_sum(d, c) - 1 / 4
        nn, dd = t.as_integer_ratio()
        return UCF.gen(2 * dd, nn)

for g in Gamma0(27).generators():
    a, b, c, d = g[0][0], g[0][1], g[1][0], g[1][1]
    print(eta_multiplier(a, 3*b, c/3, d)^2 * eta_multiplier(a, 9*b, c/9, d)^2)
```

(Total eight $1$'s will be printed.)
Now, from its product expansion, $f(z)$ is related to the discriminant form; we have

$$
\begin{align*}
\sum_{n \ge 1} a_n(f) q^n &= q \prod_{n \ge 1} (1 - q^{3n})^{2} (1 - q^{9n})^{2} \\
&\equiv q \prod_{n \ge 1} (1 - q^n)^{6} (1 - q^n)^{18} \\
&\equiv q \prod_{n \ge 1} (1 - q^n)^{24} \\
&\equiv \sum_{n \ge 1} \tau(n) q^n \pmod{3}.
\end{align*}
$$

In other words, we have $a_n(f) \equiv \tau(n) \pmod{3}$ for all $n \ge 1$.
Now, for a prime $p \equiv 1 \pmod{3}$, we have

$$
a_p(f) = a_p(E) = p + 1 - \#E(\mathbb{F}_p) \equiv 2 \pmod{3}
$$

since $\\#E(\mathbb{F}_{p})$ is a multiple of $3$, and we finally prove the congruence

$$
\tau(p) \equiv a_p(f) \equiv 2 \pmod{3}.
$$

[^1]: To be precise, Wiles and Taylor proved the conjecture for semistable elliptic curves (which is enough to prove FLT), and Breuil-Conrad-Diamond-Taylor generalized to any elliptic curves over rationals.