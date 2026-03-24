---
layout: posts
title:  "Berkeley Math REU - Number Theory over Function Fields"
date:   2026-03-22
categories: jekyll update
tags: math
---

There was a first-ever Berkeley Mathematics REU last summer (in 2025), and I was a mentor for a group of four junior mathematicians: Hyewon, Jane, Graeme, and Ryan.
Each mentor was supposed to choose their own topic, and I chose *Function Field Arithmetic* (more or less number theory for polynomials over finite fields), since I wanted to study the topic myself at some point (eventually Drinfeld module stuff, though we did not have enough time to get that far). I could also think of several REU-level research problems that were nontrivial but still feasible within two months.
Although it took more than six months to *complete* all the projects, all the papers are now on arXiv, and this blog post briefly introduces this work.
Thanks to our awesome coauthors and Tony Feng for organizing the REU.

## Integers and polynomials

I have a [lecture note](https://seewoo5.github.io/math-notes/number-theory/function_field_arithmetic/main.pdf) that I wrote for the REU (which is basically a summary of Rosen's book), and it includes all the basics of function field arithmetic, but it does not include any advanced topics such as Drinfeld modules and the class number formula for function fields.
Roughly speaking, there is a surprising similarity between integers and polynomials over finite fields, and we can often translate number-theoretic problems over integers into problems over polynomials over finite fields (and vice versa).
Moreover, it turns out that problems in function fields are often more tractable than the original problems over integers, and we can often make progress on a function field analogue even if the original problem is still open.
I gave some examples of such problems in the lecture note, and my favorite is the Mason-Stothers theorem, which is a function field analogue of the famous ABC *conjecture*.
Note that the proof of the Mason-Stothers theorem is just a few pages long and very easy to understand, but it cannot be directly translated into a "proof" of the original ABC conjecture, since we do not have a nice analogue of the derivative for integers.

I will give a summary of the two projects that we did in the REU.
Before that, I want to briefly explain *how* I found the problems.
For our topic (function field arithmetic), I chose the most naive approach: go over interesting (possibly open) problems in number theory and see whether they have natural function field analogues.
I found that some Diophantine problems have natural function field analogues and might be tractable, especially if the original version can be solved by assuming the ABC conjecture (since ABC is a theorem in the function field setting, as I mentioned above).
Unfortunately, many interesting problems of this kind are already solved in function fields (so there were no free problems left), so I had to look for other problems.
Then I widened the scope of the search to areas like analytic number theory, and I found the two problems below: one about Fibonacci polynomials, and the other about prime races and Chebyshev bias.

## REU Project 1: Powerful Fibonacci polynomials

Paper: [Powerful Fibonacci polynomials over finite fields](https://arxiv.org/abs/2601.02664)

The first project originated from the following result by Cohn and Bugeaud-Mignotte-Siksek:

> **Theorem (Cohn, Bugeaud-Mignotte-Siksek)** The only Fibonacci numbers that are perfect powers are $1$, $8$ and $144$.

(Cohn proved the result for perfect squares, where the proof is fairly elementary, and Bugeaud-Mignotte-Siksek proved the result for perfect powers.)
This is a very hard result, which uses modularity methods (which are used in the proof of Fermat's last theorem) and also some deep results of Baker on linear forms.

Thankfully, there is a polynomial analogue of Fibonacci numbers, called Fibonacci polynomials, which are defined by the following recurrence relation:

$$
F_n(T) = T F_{n-1}(T) + F_{n-2}(T), \quad F_0(T) = 0, F_1(T) = 1.
$$

Then we can ask the same question for Fibonacci polynomials: which Fibonacci polynomials are perfect powers?

The factorization of $F_n(T)$ over $\mathbb{Z}$ is well studied, and it is known that $F_n(T)$ is irreducible if and only if $n$ is a prime number (Webb-Parberry).
But over finite fields, we found that the factorization of $F_n(T)$ is quite different, and we proved that, over $\mathbb{F}\_p$, $F_n(T)$ is a perfect $j$-th power if and only if $n$ is a certain power of $p$ depending on $j$.
In particular, there are infinitely many perfect powers in the sequence of Fibonacci polynomials over finite fields, which is in contrast to the integer case.
We also studied similar families of other polynomials (e.g. Lucas polynomials), and proved similar results.
The proof is simple and is mostly based on the explicit formula for the discriminant of $F_n(T)$ (Florez-Higuita-Ramirez).

## REU Project 2: Ties in prime race

Paper: [Ties in function field prime race](https://arxiv.org/abs/2603.21005)

The second project is about Chebyshev bias.
Over integers, it is known that there are "much more" primes of the form $4k + 3$ than of the form $4k + 1$, observed by Chebyshev in 1853.
Although it is not true that almost all primes are of the form $4k + 3$, Rubinstein and Sarnak proved that the *logarithmic density* of the set of $x$ such that $\pi(x; 4, 3) > \pi(x; 4, 1)$ is about $0.9959$, where $\pi(x; q, a)$ is the number of primes less than $x$ that are congruent to $a$ modulo $q$, under the *Linear Independence* hypothesis (LI) on zeros of Dirichlet $L$-functions (i.e. all ordinates of zeros are linearly independent over $\mathbb{Q}$, assuming GRH).

Cha studied the function field analogue of Chebyshev bias and proved a similar result, i.e. there is a bias in the distribution of irreducible monic polynomials toward non-quadratic residues, and he also computed the *natural density* of the set of degrees $n$, *assuming GSH* (the function field analogue of LI).
Interestingly, there are examples of $L$-functions that do *not* satisfy GSH, and in such cases he proved that there can be bias in an unexpected direction, or even no bias at all.

My initial suggestion for the project was to extend Cha's result to characteristic 2, but it turned out that the problem is quite hard (it is not even clear how to define quadratic and non-quadratic residues, since every polynomial in characteristic 2 is a square. See [this note by K. Conrad](https://kconrad.math.uconn.edu/blurbs/ugradnumthy/QRchar2.pdf) on quadratic residues in characteristic 2).
Instead, while we were doing some experiments with Sage, we found a very interesting phenomenon in the counts of irreducible monic polynomials $f$ in each congruence class modulo $T^3 + T + 1 \in \mathbb{F}\_2[T]$.
We observed the following: when $N \equiv 1 \pmod{7}$, the numbers of irreducible polynomials congruent to $1, T, T + 1$ (resp. $T^2, T^2 + T, T^2 + T + 1$) modulo $T^3 + T + 1$ are all the same, and the pattern changes when we consider other values of $N$ modulo 7.
We could find more examples with different congruence classes, and eventually we proved our observations by two different methods:

- Using the explicit formula for the number of irreducible monic polynomials in each congruence class, which can be expressed in terms of the zeros of $L$-functions and a matrix version of the Mobius inversion formula. Then the ties come from exceptional Galois-conjugate pairs of zeros of different $L$-functions.
- Constructing explicit bijections between the sets of irreducible monic polynomials in each congruence class, using the $\mathrm{GL}\_2(\mathbb{F}\_q)$ action on polynomials.

Here I said "different methods," but honestly we do not know how the two methods are related, and it is also not true that one method is more powerful than the other.

## Shanks' bias in function fields

Paper: [Shanks' bias in function fields](https://arxiv.org/abs/2509.16142)

This one was not part of the REU, but kind of was.
More precisely, after I set up our group's topic as arithmetic of function fields, I tried to find problems that were interesting enough and also allowed progress in two months.
The things I eventually found were the two problems above (which went very well), but I also checked some collections of "open" problems ("open" does not imply "hard" in general) in number theory and looked for natural function field analogues.
One such collection of problems I found is [Comparative Prime Number Theory Problem List](https://arxiv.org/abs/2407.03530) by Hamieh, Kadiri, Martin, and Ng.
As the name suggests, it is a collection of problems in analytic number theory, focusing on zeros of L-functions and the distribution of primes.
Among the 23 problems listed in the paper, the 22nd problem is on Shanks' bias.

Define the Liouville function as $\lambda(n) = (-1)^{e_1 + \cdots + e_k}$ where $n = p_1^{e_1} \cdots p_k^{e_k}$ is the prime factorization of $n$.
Let $\chi_{-4}$ be the nontrivial Dirichlet character modulo 4.
Then Shanks observed that the product $\lambda(n) \chi_{-4}(n)$ is biased towards $+1$, and the problem asks to compute the logarithmic density of the set $\{n : \lambda(n) \chi_{-4}(n) = 1\}$ and $\{n : \lambda(n) \chi_{-4}(n) = -1\}$ (under the usual hypothesis like GRH or LI), or with more general quadratic characters.

Although I have not tried the original problem, it has a very natural function field analogue; we can define the Liouville function for polynomials over finite fields essentially in the same way, and we also have a unique quadratic character $\chi_m$ for each monic square-free polynomial $m$.
Define $A_{\pm}^{\lambda}(n;m)$ to be the number of non-constant monic polynomials $f$ of degree at most $n$ such that $\lambda(f) \chi_m(f) = \pm 1$.
Then we can say that there is a bias if the natural density of the set of degrees $n$ such that $A_{+}^{\lambda}(n;m) > A_{-}^{\lambda}(n;m)$ is larger than $1/2$.

Honestly, when I first saw the problem and wrote down the function field analogue, I was not sure if this was a good problem for my students.
So I tried to do the problem myself, and I accidentally found that it is quite doable, essentially because the $L$-function of $\lambda \chi_m$ has the following nice expression:

$$
\sum_{f} \frac{\lambda(f) \chi_m(f)}{|f|^s} = \frac{\prod_{i=1}^{r}(1 - q^{2M_i s})}{1 - q^{1 - 2s}} \frac{1}{L(s, \chi_m)}
$$

where $m = m_1 \cdots m_r$ and $M_i = \deg m_i$.
This easily follows from the Euler product expansion, and the rest of the paper is devoted to computing the above limit under GSH for $L(s, \chi_m)$ by using the Kronecker-Weyl equidistribution theorem.
Note that, in the function field setting, there are some examples where $L(s, \chi_m)$ does not satisfy GSH, and we also provided examples in such cases.

This was one of the papers that took me the least time to start and finish (i.e. upload to arXiv): three weeks. Luckily, I submitted it to [JTNB](https://jtnb.centre-mersenne.org/journals/JTNB/), and it was accepted in three months, which was also fast.
It was my first time writing an abstract in both English and French, and I thank Gemini for helping me with the French version and Duolingo for giving me some basic French skills to check that the translation was correct.

## What I learned from REU

This was my first time mentoring an REU, and I learned a lot from the experience.
In particular, the hardest part for me was finding good problems for the students that were not only interesting but also allowed progress in a short period.
I think the best way to find such problems is to look for problems that the mentor actually knows how to approach (not necessarily solve); otherwise, it is likely that we all end up with no progress.
Of course, the main point of REU is not publishing papers; it is to provide research experience for undergraduate students, and I think we achieved that goal.
