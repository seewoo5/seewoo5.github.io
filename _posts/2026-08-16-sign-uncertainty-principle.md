---
layout: posts
title:  "Positive quasimodular forms and the sign uncertainty principle"
date:   2026-08-16
categories: jekyll update
tags: math ai
---

I uploaded a [new paper on arXiv](link) on quasimodular forms and the sign uncertainty principle.
This is something I really wanted to prove during my Ph.D., and I could finally achieve my goal with some help from ChatGPT and Claude.
It is also closely related to the first of the [ten problems](https://openai.com/index/ten-advances-in-mathematics/) recently solved by OpenAI's internal model, Astra.

## A hidden goal of my thesis (which I couldn't achieve at the time)

[My thesis](https://seewoo5.github.io/assets/thesis.pdf) studies *positive quasimodular forms*, i.e. quasimodular forms whose restriction to the positive imaginary axis is real and positive (a term I made up).
Although this may seem like an arbitrary object at first glance, it is related to Viazovska's work on 8-dimensional sphere packing.
In short, Viazovska's proof requires inequalities between certain quasimodular forms, which are unnatural in the sense that one has to compare quasimodular forms of different weights.
Her original proof uses several tools: approximate Fourier expansions, Fourier coefficient bounds of meromorphic modular forms, and interval arithmetic.
In a [previous paper](https://arxiv.org/abs/2406.14659), I found an *algebraic* proof that uses no numerical analysis, only a handful of quasimodular form identities and modular linear differential equations.
See also the [blog post](https://seewoo5.github.io/jekyll/update/2024/06/23/modular-form-ineq.html) on that paper.

However, my goal was not only to give alternative proofs of these specific inequalities, but to develop a general theory of positive quasimodular forms.
Following Grothendieck's philosophy of rising sea, I believed that developing the right theory would make it natural to prove inequalities of quasimodular forms (and it did — for the dimension 8 inequalities, one can cram the whole proof into half a page).
In particular, I hoped that the *algebraic* nature of the theory would be useful for proving a *family of inequalities*.

One day, I found [a paper by Feigenbaum-Grabner-Hardin](https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/abs/eigenfunctions-of-the-fourier-transform-with-specified-zeros/07B2FD0D1812E5A81AC39CC7ABA08AB5) generalizing Viazovska's and Cohn-Kumar-Miller-Radchenko-Viazovska's construction of "magic functions" to all dimensions divisible by 4.
They constructed $(-1)^{d/4}$- and $(-1)^{d/4+1}$-eigenfunctions as integral transforms of certain families of "(quasi)modular forms", namely $\\{F\_w\\}\_w$ and $\\{G\_w\\}\_w$.
To be precise, except in dimensions 8 and 24 (and 12 — I will come back to this dimension soon), these functions are not magical, in the sense that they give no new optimality results for sphere packing in other dimensions.
For technical reasons[^1], we cannot immediately construct a candidate magic function in other dimensions.

## Sign uncertainty principle

In dimension 12, their construction recovers another magic function, but for a different problem: the *sign uncertainty principle*.
It is a version of the uncertainty principle — quantifying the tension between a function and its Fourier transform — first suggested and studied by [Bourgain, Clozel, and Kahane in 2010](https://eudml.org/doc/116301) (the paper is in French, but I have an [English translation](https://seewoo5.github.io/math-notes/reTeXed/bck_uncertainty-principle/main.pdf)).

Here is the problem.
Let $f : \mathbb{R}^d \to \mathbb{R}$ be a radial Schwartz function and let $\widehat{f}$ be its Fourier transform, defined by

$$
\widehat{f}(\mathbf{y}) = \int_{\mathbb{R}^d} f(\mathbf{x}) e^{-2\pi i \mathbf{x} \cdot \mathbf{y}} d\mathbf{x}.
$$

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
The natural question, then, is to determine the exact value of $\mathrm{A}_{+}(d)$.

We don't even know the exact value of $\mathrm{A}_{+}(1)$.
The best known bounds are currently

$$
0.45 \le \mathrm{A}_+(1) \le 0.5671.
$$

Note that the upper bound is obtained by constructing an admissible function, and one usually considers functions of the form $p(2\pi x^2) e^{-\pi x^2}$, where $p$ is a polynomial written in the Laguerre basis.
The lower bound is harder, since one needs to show that *every* admissible function satisfies the inequality.

Surprisingly, we do know the exact value of $\mathrm{A}_+(d)$ for $d = 12$: it is $\sqrt{2}$.
This is due to [Cohn and Gonçalves](https://link.springer.com/article/10.1007/s00222-019-00875-4), and the upper bound is obtained by constructing a function similar to Viazovska's and Cohn-Kumar-Miller-Radchenko-Viazovska's magic functions.
The lower bound follows from a Poisson-like summation formula coming from the modularity of the Eisenstein series $E_6$.

For general $d$, it is known that $\mathrm{A}_+(d)$ grows like $\sqrt{d}$, and the best known bounds are

$$
\sqrt{\frac{d}{4\pi}} \le \mathrm{A}_+(d) \le \sqrt{\frac{d+2}{2\pi}}.
$$

The upper bound is by Bourgain-Clozel-Kahane, and the lower bound (for $d \ge 5$) is by [Edwin](https://arxiv.org/abs/2505.15994).
The upper bound is again obtained by constructing a family of functions of the form $p(2\pi \|\mathbf{x}\|^2) e^{-\pi \|\mathbf{x}\|^2}$.
It is also known that the constant $\frac{1}{\sqrt{2\pi}}$ is a fundamental limitation of the upper bounds one can obtain from such a class of functions when $\deg p$ is small (more precisely, sublinear in $d$; see [Cohn-Dong-Gonçalves](https://www.ams.org/journals/bproc/2024-11-21/S2330-1511-2024-00219-1/S2330-1511-2024-00219-1.pdf)).

Recall that Feigenbaum, Grabner, and Hardin generalized the construction of these three magic functions to all dimensions divisible by 4.
In particular, they constructed $(-1)^{d/4}$- and $(-1)^{d/4+1}$-eigenfunctions for all $d \equiv 0 \pmod{4}$, as integral transforms of certain families of quasimodular forms.
These functions have (double) zeros at radii of the form $\sqrt{2n}$ for all $n \ge n_0$, where $n_0 = \lfloor \frac{d}{16} \rfloor + 1$ for the $(+1)$-eigenfunctions.
**If we assume that these functions are nonnegative for $\|\mathbf{x}\| \ge \sqrt{2n_0}$ and nonpositive at the origin**, then we get an upper bound

$$
\mathrm{A}_+(d) \le \sqrt{2n_0} = \sqrt{2 \left\lfloor \frac{d}{16}\right\rfloor + 2},
$$

which is better than Bourgain-Clozel-Kahane's upper bound for multiples of 4 with $d \ge 52$.
Nonnegativity of the function reduces to nonnegativity of the quasimodular forms $F_w$ and $G_w$, and this was one of my main motivations.
Nonpositivity at the origin is more subtle, and I will come back to it later.

## First hurdle, and proof by reading papers carefully

Once I noticed that the families $F_w$ and $G_w$ satisfy almost identical recurrence relations, I strongly believed that knowing how to prove positivity for one family would also tell me how to prove it for the other.
After some Sage experiments, I found that the $F_w$ are closely related to the *depth 2 extremal quasimodular forms* $X\_{w,2}$ of [Kaneko and Koike](https://www2.math.kyushu-u.ac.jp/~mkaneko/papers/36extermal_quasimodular_forms.pdf), and eventually reduced positivity of $F_w$ to positivity of $X\_{w,2}$.
Although the $X\_{w,2}$ are conjectured to have positive Fourier coefficients (*complete* positivity, which immediately implies positivity), I didn't know how to prove the conjecture (and I still don't!).
But I only needed positivity, which is weaker and so hopefully easier.
I found more recurrence relations for $X\_{w,2}$ and proved positivity of $X\_{w,2}(it)$ for $0 < t \le 1$, but I also needed the range $t \ge 1$.
And this is where I got stuck for a while.

When I do research, I first look for a relevant paper on Google Scholar, then find the papers citing it and try to read all of them.
Obviously I don't read every detail — that would take too much time — and I often end up reading only abstracts and introductions.
[Nakaya's paper](https://www.worldscientific.com/doi/abs/10.1142/S1793042124500337?srsltid=AfmBOoqY0okRsxUko55BkUDWCxxpAUqUwFVqjEZfyyWdgP-DTM2mVRqC) was one of them; it characterizes, using hypergeometric series, all extremal quasimodular forms of depth 1 with integral coefficients.
While thinking about other problems related to extremal quasimodular forms, I had to read Nakaya's paper more carefully.
And I realized that the hypergeometric series expression for $X\_{w,2}$ in the *appendix* of the paper immediately proves positivity of $X\_{w,2}(it)$ for $t > 1$!
So I learned that it is important to read papers *carefully*.
As expected, a similar argument also proves positivity of $G\_{w}$ (here I defined a new family of "modular forms" whose relation to $G\_{w}$ mirrors the relation between $X\_{w,2}$ and $F\_{w}$).


## Second hurdle, Astra, and proof by ChatGPT-5.6 Sol, formalization by Claude Opus 5 / Fable 5

However, positivity of $F\_{w}$ and $G\_{w}$ is not enough.
We also need to check that the Fourier eigenfunctions take a nonpositive value at the origin.
Unfortunately, the integral does not converge at the origin, so one has to use analytic continuation.
The value at the origin can then be expressed in terms of the Fourier coefficients of other families of (quasi)modular forms closely related to $F\_{w}$ and $G\_{w}$.
For example, if we write

$$
F_w = A_w + E_2 B_{w-2} + E_2^2 C_{w-4}
$$

where $A\_w, B\_{w-2}, C\_{w-4}$ are modular forms of weight $w,w-2,w-4$, then nonpositivity at the origin of the corresponding $(-1)^{d/4}$-eigenfunction is related to the Fourier coefficients of

$$
\widetilde{F}_{w-2} = \frac{\partial F_w}{\partial E_2} = B_{w-2} + 2E_2 C_{w-4} = \sum_{n \ge 1} \tilde{a}_{n,+}^{(w-2)} q^n
$$

More precisely, we only need positivity of $\tilde{a}\_{n,+}^{(w-2)}$ for $1 \le n \le \frac{w}{4} - 2$.
Sage experiments suggest that *every* Fourier coefficient of $\widetilde{F}_{w-2}$ is positive; I spent some time trying to prove this stronger claim, and failed.
However, for a *fixed* $w$, one can check positivity of the coefficients in a finite amount of time.
This is exactly what I did in my thesis: I ran a Python script on a department server for more than a month to prove the new upper bound

$$
\mathrm{A}_+(d) \le \sqrt{2 \left\lfloor \frac{d}{16}\right\rfloor + 2}
$$

for all $4 \mid d$ *and $d \le 36000$*.
The number 36000 is not special, and could probably have been pushed to $d \le 40000$ if the department server hadn't shut down for a random maintenance.
Although this improves BCK's upper bound for many dimensions, I wanted to prove it for *all* $d \equiv 0 \pmod{4}$ (36000 is still a finite number).
After several failed attempts, I set this aside.

On August 1st, OpenAI [announced progress on ten problems](https://openai.com/index/ten-advances-in-mathematics) with its new internal model called "Astra", and the first problem obviously caught my eye.
After reading the abstract more carefully, my first reaction was: "oh shit, am I cooked?"

Their first result is on the sphere packing problem.
There is a famous Kabatianskii-Levenshtein (KL) bound on the density $\Delta_d$ of the optimal sphere packing in dimension $d$:

$$
\Delta_d \le 2^{-(0.599 + o(1))d}
$$

*as $d \to \infty$*.
The actual bound is described in terms of zeros of Gegenbauer polynomials, but the asymptotic bound is more convenient to write.
This was [proved in 1978](https://www.mathnet.ru/eng/ppi1518) and remained the state-of-the-art uniform upper bound until August 1st, 2026.
Proving an upper bound is conceptually harder than proving a lower bound, since one has to show that the densities of all possible packings (of which there are obviously uncountably many) are bounded by a certain number, while a lower bound only requires constructing a single dense packing (of course, this is also a highly nontrivial problem, and the constructions conjectured to be optimal are often very delicate).
It was proven in 2014 by [Cohn and Zhao](https://projecteuclid.org/journals/duke-mathematical-journal/volume-163/issue-10/Sphere-packing-bounds-via-spherical-codes/10.1215/00127094-2738857.short) that Cohn-Elkies' linear programming (LP) bound is at least as powerful as the KL bound, i.e. one can find a function for the LP bound that gives an upper bound equal to the KL bound.
However, it is not known whether the LP bound can beat the KL bound *exponentially*.

What Astra proved is the precise exponent that the LP bound can give, namely that

$$
\lim_{d \to \infty} \mathrm{LP}_{d}^{1/d} = \sqrt{\frac{e}{2\pi}}
$$

which implies

$$
\Delta_d \le 2^{-\log_2 (\sqrt{2\pi/e}) d + o(1)} = 2^{-(0.6044... + o(1))d}
$$

Hence it improves the KL bound *for sufficiently large $d$*.
However, the proof is not effective: it gives no explicit bound on the $o(1)$ term (I don't know how hard that would be; for the KL bound, one needs a more precise explicit bound on the zeros of Gegenbauer polynomials, which seems a bit annoying).
This was the result I was most interested in among the ten problems, although everyone was talking about the other one on non-sofic groups (I had never heard the word "sofic" in my life until OpenAI made the announcement).

In the same chapter, they also studied the limiting behaviour of the sign uncertainty principle.
In particular, they proved [the following conjecture by Afkhami-Jeddi, Cohn, Hartman, de Laat, and Tajdini](https://link.springer.com/article/10.1007/JHEP12(2020)066):

$$
\lim_{d \to \infty} \frac{\mathrm{A}_{+}(d)}{\sqrt{d}} = \lim_{d \to \infty} \frac{\mathrm{A}_{-}(d)}{\sqrt{d}} = \frac{1}{\pi}.
$$

(Here $\mathrm{A}\_{-}(d)$ is the constant for a similar optimization problem, considering the infimum of $\sqrt{r(f)r(-\widehat{f})}$. It is more directly related to the LP bound - if you have an admissible function $g$ for the Cohn-Elkies LP bound, then $f = \widehat{g} - g$ gives an admissible function for the sign uncertainty principle.)
It is actually very satisfying to have such a clean limit, especially since the authors of that paper made the conjecture based only on the first four digits from numerical experiments, i.e. $0.3184$.
As with the LP bound, this gives a new upper bound on $\mathrm{A}_{+}(d)$:

$$
\mathrm{A}_{+}(d) \le \left(\frac{1}{\pi} + o(1)\right) \sqrt{d}
$$

for *sufficiently large $d$*. Again, we have no explicit bound on the $o(1)$ term.
Since $1/\pi$ is the exact limit, one cannot improve the constant further.
Hence my upper bound is eventually weaker than Astra's for *large* $d$ — but we don't know *how large* "large" has to be.

When I saw the news, as I said, I was quite worried: my main goal had been to complete the proof of the nonpositivity result and get a "new" upper bound on $\mathrm{A}\_{+}(d)$, which would give the first improvement of BCK's upper bound for infinitely many dimensions, and now Astra's result threatened to make mine obsolete.
But I realized that Astra's result is really about $d \to \infty$, whereas my *claimed* bound holds for *all* $d \equiv 0 \pmod{4}$ (although I think one might be able to make the $o(1)$ term explicit, and get better bounds for all but finitely many $d$).
After talking with some people, I decided to try my best to complete the proof of positivity of the coefficients of $\widetilde{F}\_{w-2}$ and $\widetilde{G}\_{w}$.

And I thought: "why not throw AI at this problem?"
I had actually tried older ChatGPT Pro models on this positivity problem before, but they failed to give a proof.
Then I realized that I had only asked for the stronger claim that *all* coefficients are positive, which is not what I need.
So I tried ChatGPT-5.6 Sol and Claude Fable 5, and ChatGPT gave a clean proof of positivity of the coefficients of $\widetilde{F}\_{w-2}$.
The argument is quite simple but satisfying, since it is strong enough to prove positivity exactly up to the threshold I need ($n \le \frac{w}{4} - 2$), and no further.
It applies almost directly to the other family $\widetilde{G}\_{w}$, though it needs some extra (nontrivial) work — which ChatGPT also carried out successfully.

The high-level idea is that the $\widetilde{F}\_{w-2}$ satisfy recurrence relations given by second-order Kaneko-Zagier operators, and one can show by induction that these operators preserve positivity of the first $\approx w/4$ coefficients.
To be honest, I think I should have been able to come up with the same argument myself, but I couldn't.
Maybe I could have with a few more weeks, but I was too lazy for that.
For $\widetilde{G}\_{w}$, the only difference is that one needs extra care at the "boundary indices", which can be handled by showing that $\widetilde{G}\_{w}$ is a solution of a third-order Kaneko-Zagier operator.
That proof, though specific to $\widetilde{G}\_{w}$, also told me that there is a general intertwining relation between second- and third-order Kaneko-Zagier operators, which is Lemma 2.4 of the paper.

The proofs are quite elementary (only involving polynomials and divisor-sum functions), but the computations are tedious and a bit complicated, so I decided to quadruple-check them: by myself, by AI, by Sage, and by Lean.
I'm the least reliable of the four since I'm not good at computations (and I never believe my own computations), so I tried to trust the other three.
It is not easy to formalize everything in the paper in Lean, so I focused on the proof generated by ChatGPT-5.6 Sol, and most of the computations are formalized in Lean with the help of Claude Opus 5 / Fable 5.
Most of the proofs are handled by tactics like `simp`, `ring`, `ring_nf`, `linarith`, `nlinarith`, and `module`.
I also implemented quasimodular forms in Sage, and further checked the identities appearing in the paper.
All the code is available in the [GitHub repository](https://github.com/seewoo5/posqmf): see `posqmf/lean/QuasiModularForms` and `posqmf/lean/UncertaintyPrinciple` for Lean, and `posqmf/sage` and `uncertainty_principle.ipynb` for Sage.

By the way, none of the Lean formalization will be upstreamed to mathlib, since it is not formalized the way things are done in mathlib (whenever I formalize something, one of my primary goals is to figure out whether any part of it can be generalized further so that it can be upstreamed to mathlib).
We already have a general theory of modular forms and the weight 2 Eisenstein series $E_2$ in mathlib.
In our formalization, we formalized quasimodular forms *twice*: once as power series, and once as a polynomial ring in three variables whose generators correspond to $E_2, E_4, E_6$ (which are known to be algebraically independent over $\mathbb{C}$).
Then I took Ramanujan's identities *as axioms*, and also proved that the two formalizations are equivalent under the $q$-expansion map.
Note that Ramanujan's identities are already formalized in the [Sphere-Packing-Lean project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean), and will be upstreamed to mathlib *in the right way* (see [this draft PR](https://github.com/leanprover-community/mathlib4/pull/42211)).
But after working on this project, I realized that it would be good to have Kaneko-Zagier operators in mathlib.
We certainly need a general theory of quasimodular forms in mathlib, which I'll try to work on in the future.

I haven't read Astra's proof in full detail, but as far as I can tell its method is completely different from mine (and I hope my method of proof is interesting enough).
Mine is more limited in scope — it only works for dimensions divisible by 4 — but it does give explicit (and simple) bounds.


## What's next?

Although I have mixed feelings about the paper, I'm happy that I finally completed the goal (even if an unavoidable event forced me to wrap up the last steps in a single week).
This is the best I can do at the moment (with Feigenbaum-Grabner-Hardin's construction).
But I'm interested in related problems, especially figuring out the exact value of $\mathrm{A}_+(1)$, which may or may not need quasimodular forms.
We'll see.


[^1]: To construct a function for Cohn-Elkies' LP bound, the $(-1)$-eigencomponent of a function needs to vanish at the origin, which only happens when $d = 8$ or $d = 24$.
For other $d$, one needs to subtract another function to make it vanish at the origin, but then it might be hard to verify the nonpositivity and nonnegativity of the function and its Fourier transform, respectively.
