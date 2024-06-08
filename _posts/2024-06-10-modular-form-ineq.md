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