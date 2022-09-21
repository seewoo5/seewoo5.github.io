---
layout: posts
title:  "Infinitude of primes with ABC conjecture"
date:   2022-09-21
categories: jekyll update
---

As a first post of my (new) blog, I'm going to introduce a proof of infinitude of primes that I found few years ago, assuming ABC conjecture.

So here's a theorem that we want to prove, which is quite well-known:

**<ins>Theorem</ins>** (Euclid, ...) There are infinitely many primes.

And here is an ABC conjecture[^1], which is one of the most important problems in number theory.

**<ins>ABC Conjecture</ins>** (Osterlé-Masser) For every $\epsilon > 0$, there exists $K_\epsilon > 0$ such that for all triples $(a, b, c)$ of coprime positive integers with $a +b = c$, we have

\begin{equation}
c \leq K_{\epsilon} \mathrm{rad}(abc)^{1+\epsilon}.
\end{equation}

Here $\mathrm{rad}(n)$ is a product of prime divisors of $n$.

Now, here I present a simple proof of infinitude of primes assuming ABC conjecture.

*Proof.* Assume that there are only finitely many primes: $p_1, p_2, \dots, p_k$. Consider an abc-pair $(n -1, 1, n)$.
Factorizing $n - 1$ and $n$ into primes gives 

\begin{equation}
p_1^{e_1}\cdots p_k^{e_k} + 1 = p_{1}^{f_1} \cdots p_{k}^{f_{k}}
\end{equation}

and applying ABC conjecture (with $\epsilon = 1$) gives

\begin{equation}
p_{1}^{f_1} \cdots p_{k}^{f_{k}} \leq K_{2} \cdot (p_{1} \cdots p_{k})^{2}
\end{equation}

for any $n = p_{1}^{f_1} \cdots p_{k}^{f_{k}}$, which is clearly impossible for large $n$.



[^1]: I know that this could be controversial in some sense, but for now, I'll assume that ABC conjecture is still a conjecture.