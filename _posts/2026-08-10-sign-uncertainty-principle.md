---
layout: posts
title:  "Positive quasimodular forms and sign uncertainty principle"
date:   2026-08-10
categories: jekyll update
tags: math ai
---

I uploaded a [new paper on arXiv](link) on quasimodular forms and sign uncertainty principle.
This is something that I really wanted to prove during my Ph.D., and I can finally achieve my goal with some help of ChatGPT and Claude.
Also, it is closely related to the first problem among [ten problems](link) recently solved by OpenAI's internal model named Astra.

## A hidden goal of my thesis (which I couldn't achieve at the moment)

[My thesis](https://seewoo5.github.io/assets/thesis.pdf) studies *positive quasimodular forms*, i.e. quasimodular forms whose restriction to the positive imaginary axis is real and positive (this is a term I made up with).
Although this may seems to be an arbitrary object at first glance, it is related to Viazovska's work on 8-dimensional sphere packing.
In short, Viazovska's proof requires inequalities of certain quasimodular forms, which are unnatural in the sense that one need to compare quasimodular forms of different weights.
Her original proof uses several tools: approximate Fourier expansion, Fourier coefficient bounds of meromorphic modular forms, and interval arithmetic.
In a [previous paper](https://arxiv.org/abs/2406.14659), I found an *algebraic* proof that does not use numerical analysis, but only uses several quasimodular form identities and modular linear differential equations.
See also the [blog post](https://seewoo5.github.io/jekyll/update/2024/06/23/modular-form-ineq.html) on the paper.

However, my goal was not only giving alternative proofs of these specific inequalities, but developing general theory of positive quasimodular forms.
Following Grothendieck's philosophy, I believed that developing right theory would make it natural to prove inequalities of quasimodular forms (and it did - in the case of inequalities for dimension 8, one can cram whole proof into a half page).
In particular, I hoped that *algebraic* nature of the theory might be useful to prove a *family of inequalities*.

One day, I found [a paper by Feigenbaum-Grabner-Hardin](link) on generalization of construction of Viazovska and Cohn-Kumar-Miller-Radchenko-Viazovska's "magic functions" to all dimensions of multiples of 4.
They constructed $(-1)^{d/4}$ and $(-1)^{d/4+1}$-eigenfunctions as integral transforms of certain families of "(quasi)modular forms", namely $\\{F\_w\\}\_w$ and $\\{G\_w\\}\_w$.
To be precise, they are not magical, except for the dimensions 8 and 24 (and 12 - I will get back to this dimension soon), in the sense that they do not provide new optimality results of sphere packing in other dimensions.
For technical reasons[^1], we cannot immediately construct a candidate magic function for other dimensions.

## Sign uncertainty principle

In dimension 12, their construction recovers another magic function, but for a different problem: *sign uncertainty printiple*.
It is a version of uncertainty principle - quantifying tension between a function and its Fourier transform - which first suggested and studied by [Bourgain, Clozel, and Kahane in 2010](https://eudml.org/doc/116301) (the paper is in French, but I have an [English translation](https://seewoo5.github.io/math-notes/reTeXed/bck_uncertainty-principle/main.pdf)).

Here is a problem.
Let $f : \mathbb{R}^d \to \mathbb{R}$ be a radial Schwartz function and let $\widehat{f}$ be its Fourier transform, defined by

$$
\widehat{f}(\mathbf{y}) = \int_{\mathbb{R}^d} f(\mathbf{x}) e^{-2\pi i \mathbf{x} \cdot \mathbf{y}} d\mathbf{x}.
$$

Consider a 

We consider the class $\mathcal{A}_+(d)$ of functions satisfying the following conditions:
- $f \in L^1(\mathbb{R}^d)$, $\widehat{f} \in L^1(\mathbb{R}^d)$, and $\widehat{f}$ is real-valued,
- $f$ is eventually nonnegative while $\widehat{f}(\mathbf{0}) \le 0$, and
- $\widehat{f}$ is eventually nonnegative while $f(\mathbf{0}) \le 0$.

Let $r(f)$ be the last-sign-change radius of $f$:

$$
r(f) := \inf \{ r \ge 0 : f(\mathbf{x}) \ge 0 \text{ whenever } \|\mathbf{x}\| \ge r \},
$$

and define $r(\widehat{f})$ similarly.
The uncertainty principle of Bourgain--Clozel--Kahane says that

$$
\mathrm{A}_{+}(d) := \inf_{f \in \mathcal{A}_+(d) \setminus \{0\}} \sqrt{r(f) r(\widehat{f})} > 0.
$$

In other words, it is impossible to make both $f$ and $\widehat{f}$ nonnegative outside an arbitrarily small ball, unless $f$ is identically zero.
Then the natural question is to determine the exact value of $\mathrm{A}_{+}(d)$.

We don't even know the exact value of $\mathrm{A}_{+}(1)$.
The current best known bounds are

$$
0.45 \le \mathrm{A}_+(1) \le 0.5671.
$$

Note that upper bound is obtained by constructing an admissible function, and one usually consider the functions of the form $p(2\pi x^2) e^{-\pi x^2}$, where $p$ is a polynomial written in Laguerre basis.
Lower bound is harder, since you need to show that *every* admissible function satisfies the inequality.

Suprisingly, we know the exact value of $\mathrm{A}_+(d)$ for $d = 12$, which is $\sqrt{2}$.
This is a work of [Cohn and Gonçalves](https://link.springer.com/article/10.1007/s00222-019-00875-4), and the upper bound is obtained by constructing a function similar to Viazovska and Cohn-Kumar-Miller-Radchenko-Viazovska's magic functions.
Lower bound follows from a Poisson-like summation formula comes from the modularity of the Eisenstein series $E_6$.

For general $d$, it is known that $\mathrm{A}_+(d)$ grows like $\sqrt{d}$, and the best known bounds are

$$
\sqrt{\frac{d}{4\pi}} \le \mathrm{A}_+(d) \le \sqrt{\frac{d+2}{2\pi}}.
$$

The upper bound is by Bourgain--Clozel--Kahane, and the lower bound (for $d \ge 5$) is by [Edwin](https://arxiv.org/abs/2505.15994).
Upper bound is again obtained by constructing a function of the form $p(2\pi \|\mathbf{x}\|^2) e^{-\pi \|\mathbf{x}\|^2}$.
It is also known that the constant $\frac{1}{\sqrt{2\pi}}$ is the fundamental limitation of upper bounds can be obtained from such class of functions, when $\deg p = o(d)$ (see [Cohn-Dong-Gonçalves](https://www.ams.org/journals/bproc/2024-11-21/S2330-1511-2024-00219-1/S2330-1511-2024-00219-1.pdf)).

Feigenbaum, Grabner, and Hardin generalized construction of these three magic functions to all dimensions of multiples of 4.
In particular, they constructed $(-1)^{d/4}$- and $(-1)^{d/4+1}$-eigenfunctions for all $d \equiv 0 \pmod{4}$, as integral transforms of certain families of quasimodular forms.
These functions have (double) zeros at the radius of the form $\sqrt{2n}$ for $n \ge n_0$ for some $n_0$, which is $\lfloor \frac{d}{16} \rfloor + 1$ for $(+1)$-eigenfunctions.
**If we assume that these functions are nonnegative for $\|\mathbf{x}\| \ge \sqrt{2n_0}$ and nonpositive at the origin**, then it gives an upper bound

$$
\mathrm{A}_+(d) \le \sqrt{2n_0} = \sqrt{2 \left\lfloor \frac{d}{16}\right\rfloor + 2},
$$

which is better than Bourgain-Clozel-Kahane's upper bound for $d \ge 52$ multiples of 4.
Nonnegativity of function reduces to that of the quasimodular forms $F_w$ and $G_w$, and this was one of my main motivation.
Nonpositivity at the origin is more subtle, and I will explain it later.

## First hurdle, and proof by reading papers carefully

After figuring out that these families $F_w$ and $G_w$ satisfy almost identical recurrence relations, I strongly believed that knowing how to prove positivity of one of the family will tell the proof for the other family, too.
With some Sage experiments, I found that $F_w$ are closely related to the *depth 2 extremal quasimodular forms* $X\_{w,2}$ by [Kaneko and Koike](https://www2.math.kyushu-u.ac.jp/~mkaneko/papers/36extermal_quasimodular_forms.pdf), and eventually reduced the positivity of $F_w$ to that of $X\_{w,2}$.
Although it is conjectured that $X\_{w,2}$ have positive Fourier coefficients (*completely* positive, which immediately implies positivity), I didn't know how to prove the conjecture (and I still don't!).
But I only need positivity, which is weaker, so might be easier.
I found more recurrence relations of $X\_{w,2}$ and proved positivity of $X\_{w,2}(it)$ for $0 < t \le 1$, but I also need for $t \ge 1$.
And I got stuck at this point for a while.

When I do research, I first search a relevant paper on Google Scholar, find papers that cite the paper, and try to read all of them.
But obviously I do not read all the details, since that would take too much time, and I often end up with reading only abstracts and introductions.
[Nakaya's paper](https://www.worldscientific.com/doi/abs/10.1142/S1793042124500337?srsltid=AfmBOoqY0okRsxUko55BkUDWCxxpAUqUwFVqjEZfyyWdgP-DTM2mVRqC) was one of the papers, which characterize all the extremal quasimodular forms of depth 1 with integral coefficients, using hypergeometric series.
While I was thinking about other problems related to extremal quasimodular forms, I had to read Nakaya's paper more carefully.
And I realized that the hypergeometric series expression of $X\_{w,2}$ in the *Appendix* of the paper immediately proves positivity of $X\_{w,2}(it)$ for $t > 1$!
So I learned that it is important to read papers *carefully*.
As expected, similar argument also worked and one can also prove the positivity of $G\_{w}$ (in this case, I defined a new family of "modular forms" whose relation with $G\_{w}$ is similar as the relation between $X\_{w,2}$ and $F\_{w}$).


## Second hurdle, Astra, and proof by ChatGPT-5.6 Sol, formalization by Claude Opus 5 / Fable 5

However, positivity of $F\_{w}$ and $G\_{w}$ are not enough.
We also need to check that the Fourier eigenfunctions have nonpositive value at the origin.
Unfortunately, the integral does not converge at the origin, and one need to do analytic continuation.
Then the value at the origin can be expressed in terms of Fourier coefficients of another families of (quasi)modular forms that are closely related to $F\_{w}$ and $G\_{w}$.
For example, if we write

$$
F_w = A_w + E_2 B_{w-2} + E_2^2 C_{w-4}
$$

where $A\_w, B\_{w-2}, C\_{w-4}$ are modular forms of weight $w,w-2,w-4$, then nonpositivity of the value at the origin of the corresponding $(-1)^{d/4}$-eigenfunction is related to the Fourier coefficients of

$$
\widetilde{F}_{w-2} = \frac{\partial F_w}{\partial E_2} = B_{w-2} + 2E_2 C_{w-4} = \sum_{n \ge 1} \tilde{a}_{n,+}^{(w-2)} q^n
$$

More precisely, we only need positivity of $\tilde{a}\_{n,+}^{(w-2)}$ for $1 \le n \le \frac{w}{4} - 2$.
Sage experiments suggest that *every* Fourier coefficient of $\widetilde{F}_{w-2}$ is positive, and I spent some time to prove this stronger claim and failed.
However, for a *fixed* $w$, one can check positivity of the coefficients in a finite amount of time.
This is what I exactly did in my thesis, by running python script on a department server more than a month, to prove the new upper bound

$$
\mathrm{A}_+(d) \le \sqrt{2 \left\lfloor \frac{d}{16}\right\rfloor + 2}
$$

for all $4 \mid d$ *and $d \le 36000$*.
The number 36000 is not special and might be able to be increased to $d \le 40000$, if department server didn't shut down due to a random maintanence.
Although the upper bound improves BCK's upper bound for many dimensions, I wanted to prove it for *all* $d \equiv 0 \pmod{4}$ (36000 is still a finite number). 
After making several failed attempts, I put this as an aside.

On August 1st, OpenAI [announced progress in ten problems](https://openai.com/index/ten-advances-in-mathematics) with its internal new model called "Astra", where the first problem obviously caught my eye.
After reading the abstract more carefully, my first reaction was: "oh shit am I cooked?"

Their first result is on the sphere packing problem.
We have a famous Kabatianskii-Levenshtein (KL) bound on the density of optimal sphere packing $\Delta_d$ in dimension $d$, which is
$$
\Delta_d \le 2^{-(0.599 + o(1))d}
$$
*as $d \to \infty$*.
The actual bound is described in terms of zeros of Gegenbauer polynomials, but the asymptotic bound is more convenient to write.
This was [proved in 1878](https://www.mathnet.ru/eng/ppi1518) and was the state-of-the-art uniform upper bound, until August 1st, 2026.
Proving upper bound is conceptually harder than lower bound, since one need to show that the density of all possible packings (where there are obviously uncountably many) are bounded by a certain number, while lower bound requires constructing one dense packing (of course, this is also a hightly nontrivial problem, and often the constructions that are conjectured to be optimal are very delicate).
It was proven in 2014 by [Cohn and Zhao](https://projecteuclid.org/journals/duke-mathematical-journal/volume-163/issue-10/Sphere-packing-bounds-via-spherical-codes/10.1215/00127094-2738857.short) that Cohn-Elkies' linear programming (LP) bound is at least as powerful as KL bound, i.e. one can find a function for the LP bound that gives an upper bound equal to the KL bound.
However, it is not known if LP bound can do better *exponentially* than KL bound.

What Astra proved is that it computed the precise exponent that LP bound can give, i.e. it proved that

$$
\lim_{d \to \infty} \mathrm{LP}_{d}^{1/d} = \sqrt{\frac{e}{2\pi}}
$$

which implies

$$
\Delta_d \le 2^{-\log_2 (\sqrt{2\pi/e}) d + o(1)} = 2^{-(0.6044... + o(1))d}
$$

Hence it improves KL bound *for sufficiently large $d$*.
However, the proof is not effective and it does not give explicit bound for the $o(1)$ term (I don't know how hard would it be; in case of KL bound, one need more precise explicit bound on the zeros of Gegenbauer polynomials, which seems a bit annoying).
This was the result that I'm mostly interested in among ten problems, although everyone was talking about the other problem on non-sofic group (I never heard about the word "sofic" in my life until OpenAI made the announcement).

In the same chapter, they also studied limiting behaviour of the sign uncertainty principle.
In particular, they proved [the following conjecture by Afkhami-Jeddi, Cohn, Hartman, de Laat, and Tajdini](https://link.springer.com/article/10.1007/JHEP12(2020)066):

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
Hence my upper bound would be eventually waaker than Astra's bound for *large* $d$, but we don't know *how large* it should be.

When I saw the news, as I said, I was quite worried since my main goal was to complete the proof of nonpositivity result and get the "new" upper bound on $\mathrm{A}_{+}(d)$ which may give first improvement of BCK's upper bound for infinitely many dimensions, and now Astra's result would make my result obsolete.
But I found that Astra's result is really about $d \to \infty$, where my *claimed* bound is for *all* $d \equiv 0 \pmod{4}$.
After talking with some people, I decided to try my best to complete the proof of positivity of coefficients of $\widetilde{F}_{w-2}$ and $\widetilde{G}_{w}$.

And I thought: "Why not try AI to this problem?"
I actually tried older ChatGPT pro models to prove this positivity of the coefficients, but it failed to give a proof.
But I realized that I only asked it to prove the stronger claim that *all* coefficients are positive, which is not necessary.
So I tried ChatGPT-5.6 Sol and Claude Fable 5, and ChatGPT give a clean proof of the positivity of the coefficients of $\widetilde{F}_{w-2}$.
The argument is quite simple but satisfying, since it is strong enough to prove positivity up to the threshold that I exactly need ($n \le \frac{w}{4} - 2$), but not more than that.
This argument almost directly applies to the case of the other family $\widetilde{G}_{w}$, but with some extra (nontrivial) works, which was also successfully done by ChatGPT.

The high-level idea is that $\widetilde{F}\_{w-2}$ satisfy recurrence relations defined by second-order Kaneko-Zagier operators, and one can prove that it preserves positivity of first $\approx w/4$ coefficients by induction.
To be honest, I think that I should be able to think of the same argument myself, but I couldn't.
Maybe I could if I spend more weeks myself, but I was too lazy to do that.
For $\widetilde{G}\_{w}$ the only difference is that one need to make an extra care for the "boundary indices", which can be done by showing that $\widetilde{G}\_{w}$ becomes a solution of a third-order Kaneko-Zagier operator.
The proof, which was specific to $\widetilde{G}\_{w}$, also told me that one have a general intertwining relation between second- and third-order Kaneko-Zagier operators, which is Lemma 2.4 of the paper.

The proofs are quite elementary (only involving polynomials and divisor-sum functions), but computations are tedious and a bit complicated, so I decided to do quadruple check: by myself, by AI, by Sage, and by Lean.
I'm the most unreliable among the four since I'm not good at computations (and I never believe my own computations), so I tried to believe other three.
Although it is not easy to formalize everything in the paper in Lean, I focused on the proof generated by ChatGPT-5.6 Sol, and most of computations are formalized in Lean with help of Claude Opus 5 / Fable 5.
Most of the proofs are handled by the tactics like `ring`, `field_simp`, `nlinarith`, and `module`.
I also implemented the quasimodular forms in Sage, and do further checks of the identities appear in the paper.
All the code are available in the [GitHub repository](https://github.com/seewoo5/posqmf), especially `posqmf/lean/QuasiModularForms` and `posqmf/lean/UncertaintyPrinciple` for Lean, and `posqmf/sage` and `uncertainty_principle.ipynb` for Sage.

Note that none of the Lean formalization will be upstreamed to mathlib, since they are not formalized in the way that is done in mathlib.
In particular, the quasimodular forms here are formalized *twice*: once as power series, and other as a polynomial ring in three variables with generators correspond to $E_2, E_4, E_6$ (which are known to be algebraically independent over $\mathbb{C}$).
Then I took Ramanujan's identities **as axioms*, and also proved that the two formalizations are equivalent under the $q$-expansion map.
Note that Ramanujan's identities are already formalized in the [Sphere-Packing-Lean project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean), and will be upstreamed to mathlib *in the right way* (see [this draft PR](https://github.com/leanprover-community/mathlib4/pull/42211)).
But I realized that it would be good to have Kaneko-Zagier operators in mathlib, after working on this project.
We certainly need to have a general theory of quasimodular forms in mathlib, which I'll try to work on in the future.

## What's next?

Although I have a mixed feeling about the paper, I'm happy that I finally completed the goal.
This is something the best I can do at the moment (with Feigenbaum-Grabner-Hardin's construction).
But I'm interested in related problems, especially figuring out the exact value of $\mathrm{A}_+(1)$, which may or may not need quasimodular forms.
We'll see.


[^1]: To construct a function for Cohn-Elkies' LP bound, the $(-1)$-eigencomponent of a function need to vanish at the origin, which only happens when $d = 8$ or $d = 24$.
For other $d$, one needs to subtract another function to make it vanish at the origin, but then it might be hard to verify the nonpositivity and nonnegativity of the function and its Fourier transform, respectively.
