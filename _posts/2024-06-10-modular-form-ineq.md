---
layout: posts
title:  "Algebraic proof of modular form inequalities for optimal sphere packings"
date:   2024-06-03
categories: jekyll update
tags: math
---

I uploaded a new paper on arXiv about modular form inequalities appear in the proof of optimality of $E_{8}$ and Leech lattice sphere packings by Viazovska and Cohn-Kumar-Miller-Radchenko-Viazovska.
The paper summarizes as: now we have "algebraic" proofs that does not require any numerical analysis.

The history of the problem itself can be found in the introduction/preliminary of my paper or in the first few slides of this file.
Instead, I share my own history and thought process on this project.
I knew about the problem when Viazovska announced the proof, and give a presentation on it when I was a senior undergraduate student.
Of course, I didn't fully understand the proof, but I knew that the proof uses modular forms and one need to prove some inequalities between modular forms, where the original proofs use approximations based on bounds of Fourier coefficients and numerical analysis (interval arithmetic).
Then I forgot about the problem for a while, until 2023 Fall when Dan Romik introduced his new proof of Viazovska's inequalities in $8$ dimension at UC Berkeley's RTG seminar.
After the talk, I asked him the most obvious question one can ask: what about $d = 24$?
He said that it would be a good project for graduate students, and I decided to work on it as a "side project", since I already had a problem that I working on.

After reading the CKMRV paper carefully, I found that the first "easy" inequality I have to prove is already not easy.
One has to prove that the following modular form is positive on the (positive) imaginary axis:

$$
F = 49 E_2^2 E_4^3 - 25 E_2^2 E_6^2 - 48 E_2 E_4^2 E_6 - 25 E_4^4 + 49 E_4 E_6^2.
$$

I first tried to express as a sum of squares, but failed (and now I believe it is not possible). Then I stuck.
Luckily, I found that [someone](https://davidayotte.github.io/) implemented quasimodular forms in Sage, so I decided to play with it first.
Then I found that $F$ have positive Fourier coefficients upto $q^{10000}$, and conjectured that this is true for all coefficients (which directly implies positivity of $t \mapsto F(it)$).
Of coures, this is a stronger than what I need to prove, and I didn't know how to prove it.

After that, I did some literature search and *learned* what are quasimodular forms. In my opinion, the correct way to think them are *modular forms with differentiations*.
In a computational viewpoint, differentiations of level 1 quasimodular forms can be computed using Ramanujan's formula

$$
E_{2}' = \frac{E_{2}^{2} - E_{4}}{12}, \quad E_{4}' = \frac{E_{2}E_{4} - E_{6}}{3}, \quad E_{6}' = \frac{E_{2}E_{6} - E_{4}^{2}}{2}
$$

and product rule.
I differentiate $F$ using Sage, and I got the following:

$$
F' = 
$$

(you only need to call `F.derivative()`). As you can see, differentiating quasimodular form increases weight by 2 and depth by 1. The original $F$ has weight $16$ and depth $2$, so $F'$ has weight $18$ and depth $3$. However, I found that we can cancel out $E_{2}^{3}$ terms, and moreover, it even factors into a product of two forms:

$$
F' - \frac{7}{6} E_{2} F = 
$$

Surprisingly, each factor are essentially derivatives of $E_{4}$ and $-E_{10} = - E_{4} E_{6}$, hence they should have positive Fourier coefficients.
After I observe this, I wonder if this would imply positivity of $F$.
It turned out to be true, and the idea is to solve the differential equation.
I also found that the cancellation phenomena is quite general, and the operator $D - \frac{7}{6} E_{2}$ actually has a name - Serre derivative of weight $14$.
This proved the "easy" inequality

For a while again, I had no progress on the "hard" inequality.
Of course, I tried to mimic Romik's proof, but his proof is quite delicate and it was not clear for me how to apply it in $d = 24$ case.
Especially, we need to prove that $F$ has nonnegative Fourier coefficients, which does not follow from the previous argument (using Serre derivative).
Hence I decided to understand $d = 8$ case more carefully, especially trying myself to re-prove the (hard) inequality.
Then I observed the monotonicity of quotient, and how nicely its derivative factors, which yield Proof 1.
Luckily, the same strategy seems to work for 24-dimensional case (2nd inequality), but proving the positivity of $F'G - FG'$ seems much harder than 8-dimensional case.
The biggest difference is that it does not factors as nicely as 8-dimensional case - it factors as

$$
F'G - FG' = H_{2}^{5} (H_2 + H_4)^{2} H_{4}^{2} \cdot K
$$

where $K$ is a weight 14, *depth 2*, level 2 quasimodular form (it does not factor as a product of depth 1 quasimodular forms).
But one interesting observation was that the actual level $K$ was $\Gamma_{0}(2)$, not $\Gamma(2)$.

Then the next question is - how to cook up positive quasimodular forms of level $1$ or $\Gamma_{0}(2)$.
I tried a lot of things, but what actually worked is using extermal quasimodular forms and old forms from it.
Especially, it is possible to express $K$ as a positive linear combination of

$$
\begin{align*}
H_{2}(z) X_{12, 2}(z), &\quad H_{2}(z) (X_{12, 2}(z) - 2^{10} X_{12, 2}(2z)), \\
(H_{2}(z) + 2 H_{4}(z)) X_{10, 2}(z), &\quad (H_{2}(z) + 2H_{4}(z)) (X_{10, 2}(z) - 2^{8} X_{10, 2}(2z)) \\
H_{2}^{2}(z) X_{8, 2}(z), &\quad H_{2}^{2}(z) (X_{8, 2}(z) - 2^{6} X_{8, 2}(2z))
\end{align*}
$$

where all the forms above are positive (in fact, completely positive).
