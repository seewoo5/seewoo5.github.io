---
layout: posts
title:  "Positive quasimodular forms and sign uncertainty principle"
date:   2026-08-10
categories: jekyll update
tags: math ai
---

I uploaded a [new paper on arXiv](link) on quasimodular forms and sign uncertainty principle.
This is something that I really wanted to prove during my Ph.D., and I can finally achieve my goal with some help of ChatGPT.
Also, it is closely related to the first problem among [ten problems](link) recently solved by OpenAI's internal model named Astra.

## A hidden goal of my thesis

[My thesis](link) studies positive quasimodular forms, i.e. quasimodular forms whose restriction to the positive imaginary axis is real and positive.
Although this may seems to be an arbitrary object at first glance, it is related to Viazovska's work on 8-dimensional sphere packing.
In short, Viazovska need to prove inequalities on certain quasimodular forms, which are unnatural in the sense that one need to compare quasimodular forms of different weights.
Her original proof uses several tools: approximate Fourier expansion, Fourier coefficient bounds of meromorphic modular forms, and interval arithmetic.
In a [previous paper](link), I found an *algebraic* proof that does not use numerical analysis, but only uses several quasimodular form identities and modular linear differential equations.
See also the [blog post](link) on the paper.

Although I wrote the paper, my goal was not only giving alternative proofs of these specific inequalitie, but develop general theory of positive quasimodular forms, where people didn't study much about such objects (instead, there are many works on "signs" of Fourier coefficients of modular forms, which is also related).
I wanted to show that the theory I developed have more applications, and also have other merit.
In particular, I hoped that *algebraic* nature of the theory might be useful to prove a *family of inequalities*.

One day, I found [a paper by Feigenbaum-Grabner-Hardin](link) on generalization of construction of Viazovska and Cohn-Kumar-Miller-Radchenko-Viazovska's "magic functions" to all dimensions of multiples of 4.
They constructed $(-1)^{d/4}$ and $(-1)^{d/4+1}$-eigenfunctions as integral transforms of certain families of "(quasi)modular forms", namely $\\{F\_w\\}\_w$ and $\\{G\_w\\}\_w$.
To be precise, they are not magical, except for the dimensions 8 and 24 (and 12 - I will get back to this dimension soon), in the sense that they do not provide new optimality results of sphere packing in other dimensions.

## Sign uncertainty principle

In dimension 12, their construction recovers another magic function, but for a different problem: *sign uncertainty printiple*.
It is a version of uncertainty principle - quantifying tension between a function and its Fourier transform - which first suggested and studied by [Bourgain, Clozel, and Kahane in 2003](link) (the paper is in French, but I have an [English translation](link)).

Here is a problem.
Let $f : \mathbb{R}^d \to \mathbb{R}$ be a radial Schwartz function

## First hurdle, and proof by reading papers carefully

To show that FGH's Fourier eigenfunctions indeed give new upper bounds, one had to show that the functions are nonnegative outside a ball of certain radius.
By the integral transform formula, it is enough to show that $F_w$ and $G_w$ are positive on the imaginary axis.[^1]
After figuring out that these families satisfy almost identical recurrence relations, I strongly believed that knowing how to prove positivity of one of the family will tell the proof for the other family, too.

After doing some experiments with Sage, I found that $F_w$ are closely related to the *depth 2 extremal quasimodular forms* $X\_{w,2}$ by [Kaneko and Koike](link), and eventually reduced the positivity of $F_w$ to that of $X\_{w,2}$.
Although it is conjectured that $X\_{w,2}$ have positive Fourier coefficients (completely positive, which immediately implies positivity), I didn't know how to prove the conjecture (and I still don't!).
But I only need positivity, which is weaker, so might be easier.
I found more recurrence relations of $X\_{w,2}$ and proved positivity of $X\_{w,2}(it)$ for $0 < t \le 1$, but I also need for $t \ge 1$.
And I got stuck at this point for a while.

When I do research, I first search a relevant paper on Google Scholar, find papers that cite the paper, and try to read all of them.
But obviously I do not read all the details, since that would take too much time, and I often end up with reading only abstracts and introductions.
[Nakaya's paper](link) was one of the papers, which characterize all the extremal quasimodular forms of depth 2 with integral coefficients, using hypergeometric series.
While I was thinking about another problem related to extremal quasimodular forms, I had to read Nakaya's paper more carefully.
And I realized that the hypergeometric series expression of $X\_{w,2}$ in the *Appendix* of the paper immediately proves positivity of $X\_{w,2}(it)$ for $t > 1$!
So I learned that it is important to read papers *carefully*.
As expected, similar argument also worked and one can also prove the positivity of $G\_{w}$ (in this case, I defined a new family of "modular forms" whose relation with $G\_{w}$ is similar as the relation between $X\_{w,2}$ and $F\_{w}$).


## Second hurdle, Astra, and proof by ChatGPT

However, positivity of $F\_{w}$ and $G\_{w}$ are not enough.
We also need to check that the Fourier eigenfunctions have nonpositive value at the origin.
However, the integral does not converge at the origin, and one need to do analytic continuation.
Then the value at the origin can be expressed in terms of Fourier coefficients of another families of (quasi)modular forms that are closely related to $F\_{w}$ and $G\_{w}$.
For example, if we write

$$
F_w = A_w + E_2 B_{w-2} + E_2^2 C_{w-4}
$$

where $A\_w, B\_{w-2}, C\_{w-4}$ are modular forms of weight $w,w-2,w-4$, then nonpositivity of the value at the origin of the corresponding $(-1)^{d/4}$-eigenfunction is related to the Fourier coefficients of

$$
\widetilde{F}_{w-2} = B_{w-2} + 2E_2 C_{w-4} = \sum_{n \ge 1} \tilde{a}_{n,+}^{(w-2)} q^n
$$

More precisely, we only need positivity of $\tilde{a}\_{n,+}^{(w-2)}$ for $1 \le n \le \frac{w}{4} - 2$.
Sage experiments suggest that *every* Fourier coefficient of $\widetilde{F}_{w-2}$ is positive, and I spent some time to prove this stronger claim and failed.
However, for a *fixed* $w$, one can check positivity of the coefficients in a finite amount of time.
This is what I exactly did in my thesis, by running python script on a department server more than a month, to obtain a new upper bound

$$
\mathrm{A}_+(d) \le \sqrt{2 \left\lfloor \frac{d}{16}\right\rfloor + 2}
$$

for all $4 \mid d$ *and $d \le 36000$* (it might be possible to check it up to $d \le 40000$, if department server didn't get shut down due to maintanence).
Although the upper bound improves BCK's upper bound for many dimensions, I wanted to prove it for *all* $d \equiv 0 \pmod{4}$. 
After making several failed attempts, I put this as an aside.

Then on XXX, OpenAI [announced progress in ten problems](link) with its internal new model called "Astra", where the first problem obviously caught my eye.
After reading the abstract, my first reaction was: "oh shit am I cooked?"

<!-- If you've read that 200 pages report from OpenAI, you may have already saw that they proved something related to sphere packing. -->
It is on the sphere packing problem, improved the famous Kabatianskii-Levenshtein (KL) bound on the density of optimal sphere packing $\Delta_d$ in dimension $d$, which is
$$
\Delta_d \le 2^{-(0.599 + o(1))d}
$$
*as $d \to \infty$*.
This was [proved in XXX](link) and was the state-of-the-art uniform upper bound.
Proving upper bound is conceptually harder than lower bound, since one need to show that the density of all possible packings (where there are obviously uncountably many) are bounded by a certain number, while lower bound requires constructing one dense packing (of course, this is also a hightly nontrivial problem, and often the constructions that are conjectured to be optimal are very delicate).
It was known from XXX by [Cohn and Zhao](link) that Cohn-Elkies' linear programming (LP) bound is at least as powerful as KL bound, i.e. one can find a function for the LP bound that gives an upper bound equal to the KL bound.
However, it is not known if LP bound can do better.

What Astra proved is that it computed the precise exponent that LP bound can give, i.e. it proved that

$$
\lim_{d \to \infty} \mathrm{LP}_{d}^{1/d} = \sqrt{\frac{e}{2\pi}}
$$

which implies

$$
\Delta_d \le 2^{-\log_2 (\sqrt{2\pi/e}) d + o(1)} = 2^{-(0.6044... + o(1))d}
$$

Hence it improves KL bound *for sufficiently large $d$*.
However, the proof is not effective and it does not give explicit bound for the $o(1)$ term.
This was the result that I'm mostly interested in among ten problems, although everyone was talking about the other problem on non-sofic group (I never heard about the word "sofic" in my life until OpenAI made the announcement).

In the same chapter, they also studied limiting behaviour of the sign uncertainty principle.
In particular, they proved [the following conjecture by XXX](link):

$$
\lim_{d \to \infty} \frac{\mathrm{A}_{+}(d)}{\sqrt{d}} = \lim_{d \to \infty} \frac{\mathrm{A}_{-}(d)}{\sqrt{d}} = \frac{1}{\pi}.
$$

It is actually very satisfying to have such a clean limit, where the authors of the paper made a conjecture only based on the first four digits from numerical experiments, i.e. $0.3184$.
As in the LP bound case, it gives a new upper bound of $\mathrm{A}_{+}(d)$, which is

$$
\mathrm{A}_{+}(d) \le \left(\frac{1}{\pi} + o(1)\right) \sqrt{d}
$$

for *sufficiently large $d$*. Again, we don't have an explicit bound of $o(1)$.
Since $1/\pi$ is the exact limit, on cannot improve the constant further.
Hence my upper bound would be eventually waaker than Astra's bound for *large* $d$, but we don't know how *large* it should be.

[^1]: Note that I had to slighly modify the definitions of these families.