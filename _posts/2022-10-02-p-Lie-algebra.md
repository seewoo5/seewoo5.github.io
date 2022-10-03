---
layout: posts
title:  "p-Lie algebra from an associative algebra"
date:   2022-09-21
categories: jekyll update
tags: math
---

In this semester, there's a learning seminar on Katz's paper on arithmetic differential equations [1] at UC Berkeley.
On the latest lecture by Tony Feng, we learned about the concept of $p$-Lie algebra (or restricted Lie algebra)
which is a Lie algebra with additional structures that reflects Frobenius action on it.
Formally, it is defined as follows.

> **<ins>Definition ($p$-Lie algebra)</ins>** A Lie algebra $(L, [-,-])$ is a $p$-Lie algebra if it is $k$-algebra for some field $k$ of characteristic $p$ and there an opration $[-]^{[p]}: L \to L$ such that
> 
> 1. $\mathrm{ad}(X^{[p]}) = \mathrm{ad}(X)^{[p]}$ for $X \in L$,
> 2. $(tX)^{[p]} = t^{p}X^{[p]}$ for $t \in k$ and $X \in L$,
> 3. $(X+Y)^{[p]} = X^{[p]} + Y^{[p]} + \sum_{i=1}^{p-1} \frac{s_{i}(X, Y)}{i}$ for $X, Y \in L$, where $s_i(X,Y)$ is the coefficient of $t^{i-1}$ in the formal expansion of $\mathrm{ad}(tX +Y)^{p-1}(X)$.

Here $\mathrm{ad}(x)(y):=[x,y]$. As a motivating example, a $p$-Lie algebra attached to a given associative algebra $R$ of characteristic $p$, equipped with

* ($p$-operation) $a \mapsto a^{[p]}:= a^p$
* (Lie bracket) $[a, b] := ab - ba$.

was given. However, it is not clear why it becomes a $p$-Lie algebra. Especially, the condition 3 implies that there exists some universal "Lie polynomials" (linear combination of iterated Lie brackets, see Lemma 2 below) $s_i(a,b)$ that gives the expansion of $(a+b)^p - a^p - b^p$, which is quite surprising for me.
If we play with some small $p$'s, we can see that this is indeed true. For $p=2$,

$$
(a+b)^2 = (a+b)(a+b) = a^2 + b^2 + ab + ba = a^2 + b^2 + [a,b]
$$

and for $p=3$,

$$\begin{align*}
(a+b)^3 &= a^3 + b^3 + (a^2 b + aba + ba^2) + (ab^2 + bab + b^2a) \\
&= a^3 + b^3 + [a,[a,b]] + [[a,b],b].
\end{align*}$$

The goal of this post is to prove that our associated Lie algebra indeed becomes a $p$-Lie algebra.
Before we start, we need some lemma.

> **<ins>Lemma 1</ins>** For all $k \geq 0$,
> 
> $$
> \mathrm{ad}(x)^{k}(y)= \sum_{j=0}^{k} \binom{k}{j}(-1)^{k-j} x^{j}yx^{k-j}
> $$

*Proof.*
Use induction on $k$. It is trivial for $k = 0$. If it holds for some $k$, then

$$
\begin{align*}
\mathrm{ad}(x)^{k+1}(y) &= \mathrm{ad}(x)(\mathrm{ad}(x)^k(y)) \\
&= \sum_{j=0}^{k} \binom{k}{j} (-1)^{k-j} x^{j+1}yx^{k-j} - \sum_{j=0}^{k}\binom{k}{j}(-1)^{k-j}x^{j}yx^{k-j+1} \\
&= \sum_{j=0}^{k} \binom{k}{j} (-1)^{k-j} x^{j+1}yx^{k-j} - \sum_{j=1}^{k}\binom{k}{j}(-1)^{k-j}x^{j}yx^{k-j+1}-(-1)^{k}yx^{k+1} \\
&= \sum_{j=1}^{k+1} \binom{k}{j-1} (-1)^{k-j+1} x^{j}yx^{k-j+1} - \sum_{j=1}^{k}\binom{k}{j}(-1)^{k-j}x^{j}yx^{k-j+1}-(-1)^{k}yx^{k+1} \\
&= x^{k+1}y - (-1)^{k}yx^{k+1} + \sum_{j=1}^{k} \binom{k+1}{j}(-1)^{k+1-j}x^{j}yx^{k+1-j} \\
&= \sum_{j=0}^{k+1} \binom{k+1}{j} (-1)^{k+1-j} x^{j}yx^{k+1-j}.
\end{align*} 
$$

and this proves the Lemma. $\square$

In particular, when $k=p$, $\binom{p}{j} \equiv 0\,(\mathrm{mod}\,p)$ for $1\leq j \leq p-1$ and

$$
\mathrm{ad}(x)^{p}(y) = x^{p}y - yx^{p} = \mathrm{ad}(x^p)(y)
$$

which proves the first condition.

> **<ins>Lemma 2</ins>** $\mathrm{ad}(at+b)^k(a) = \sum_{i=1}^k s_i(a,b)t^{i-1}$, where $s_i(X,Y)$ are Lie polynomials in $X,Y$.

*Proof.* Again induction on $k$. If $k = 1$, we have 

$$
\mathrm{ad}(at+b)(a) = (at+b)a - a(at+b) = [b,a].
$$

Also, if we assume for $k$, we have

$$
\begin{align*}
\mathrm{ad}(at+b)^{k+1}(a) &= \mathrm{ad}(at+b)(\mathrm{ad}(at+b)^{k}(a)) \\
&= (at+b)\left(\sum_{i=1}^k s_i(a,b)t^{i-1}\right) - \left(\sum_{i=1}^{k}s_i(a,b)t^{i-1}\right)(at+b) \\
&= \sum_{i=1}^{k-1} ([a, s_i(a,b)]t + [b,s_i(a,b)])t^{i-1} \\
&= [a,s_{k-1}(a,b)]t^{k-1} + \sum_{i=2}^{k} ([a, s_{i-1}(a,b)]  + [b, s_i(a,b)])t^{i-1} + [b, s_1(a,b)]
\end{align*}
$$
and this gives expansion of $\mathrm{ad}(at+b)^{k+1}(a)$ with Lie polynomial coefficients. $\square$

> **<ins>Lemma 3</ins>**
> 
> $$
> \frac{d}{dt}(at+b)^p = \mathrm{ad}(at+b)^{p-1}(a).
> $$

*Proof.* By Leibniz rule, we have

$$
\frac{d}{dt}(at+b)^{p} = \sum_{j=0}^{p-1} (at+b)^{j}a(at+b)^{p-1-j}
$$

(note that $R$ is not commutative in general.)
Also, Lemma 1 gives 

$$
\mathrm{ad}(at+b)^{p-1}(a) = \sum_{j=0}^{p-1} \binom{p-1}{j}(-1)^{p-1-j}(at+b)^{j}a(at+b)^{p-1-j}
$$

so it is enough to show the congruence $\binom{p-1}{j}(-1)^{p-1-j} \equiv 1\,(\mathrm{mod}\,p)$ for $0\leq j \leq p-1$.
This follows from the observation

$$
\begin{align*}
t^{p-1} + t^{p-2} + \cdots + 1 &\equiv \frac{t^p - 1}{t-1} \equiv \frac{(t-1)^p}{t-1} = (t-1)^{p-1} \\
&= \sum_{j=0}^{p-1} \binom{p-1}{j} (-1)^{p-1-j} t^{j}
\end{align*}
$$

in $\mathbb{F}_p[t]$. $\square$

Now, we can finally give the proof.
By Lemma 2 and 3, we have

$$
\frac{d}{dt}(at+b)^{p} = \mathrm{ad}(at+b)^{p-1}(a) = \sum_{i=1}^{p-1} s_i(a,b)t^{i-1}
$$

for some Lie polynomials $s_i(X,Y)$.
If we "integrate" the equation with respect to $t$, we get

$$
(at+b)^p = a^p t^p + b^p + \sum_{i=1}^{p-1} \frac{s_i(a,b)}{i}t^{i}.
$$

(Note that $(at+b)^p$ has degree $p$ in $t$. Hence we don't need to worry about terms like $t^{2p}$ whose derivative vanishes.) Here $a^p t^p$ and $b^p$ are leading term and constant term, respectively.
Now plug $t = 1$ and we get the result.

*References*:

[1] E. Katz, *Nilpotent connections and the monodromy theorem: Applications of a result of Turrittin*, Inst. Hautes Études Sci. Publ. Math (1970)