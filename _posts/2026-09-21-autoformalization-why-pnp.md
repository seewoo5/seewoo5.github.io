---
layout: posts
title:  "(auto)formalization, but why?"
date:   2026-09-21
categories: jekyll update
tags: math ai formalization
---

*This post can be also found in the Proof and Prompts community blog: see [here](https://proofsandprompts.com/2026/09/08/autoformalization-but-why/).*

---

I want to share some thoughts on (auto)formalization based on personal experience, and propose some possible positive and negative usages of it.

Disclaimer: I mostly focus on formalizations in Lean, due to my limited experience and knowledge. But most of the discussion can be applied to formalizations using other proof assistants as well.


## Why formalize

I'll assume that the reader is familiar with the concept of formalization. Let me try to list more than one reason why formalization is important.


### Correctness of proof

One of the obvious reasons is to guarantee the correctness of the proofs. When a proof assistant verifies a formal proof, it establishes the formal statement relative to the axioms and assumptions used. In particular, if you have your own natural language proof that you are not sure is correct, you can formalize it and see if the argument breaks at some point.

One nice example is the [Liquid Tensor Experiment](https://xenaproject.wordpress.com/2020/12/05/liquid-tensor-experiment/), where the actual goal is to validate the correctness of the proof. The project was initially suggested by Peter Scholze on December 5, 2020, and [completed](https://leanprover-community.github.io/blog/posts/lte-final/) on July 14, 2022. The project was led by Johan Commelin, with many inputs from Adam Topaz and Peter Scholze, and also with many contributors including Reid Barton, Alex J. Best, Riccardo Brasca, Kevin Buzzard, Yaël Dillies, Floris van Doorn, Fabian Glöckle, Markus Himmel, Heather Macbeth, Patrick Massot, Bhavik Mehta, Scott Morrison, Filippo A. E. Nuccio, Joël Riou, Damiano Testa, Andrew Yang, Mario Carneiro, Bryan Gin-ge Chen, Rob Lewis, Yakov Pechersky, Ben Toner, Eric Wieser (copy-pasted from the above Lean community blog post).

Another example is [Thomas Hales's proof of Kepler's conjecture](https://annals.math.princeton.edu/2005/162-3/p01), which is [formalized in Isabelle and HOL Light](https://github.com/flyspeck/flyspeck) (under the name of the Flyspeck project). At the early stage of the announcement and review of the proof, there were some concerns about the correctness of the proof, which was heavily based on computer calculations that are hard to verify by hand. It took 10 years of effort with many contributors including Thomas Hales, Mark Adams, Gertrud Bauer, Tat Dat Dang, John Harrison, Le Truong Hoang, Cezary Kaliszyk, Victor Magron, Sean McLaughlin, Tat Thang Nguyen, Quang Truong Nguyen, Tobias Nipkow, Steven Obua, Joseph Pleso, Jason Rute, Alexey Solovyev, Thi Hoai An Ta, Nam Trung Tran, Thi Diep Trieu, Josef Urban, Ky Vu and Roland Zumkeller (authors of [the paper](https://www.cambridge.org/core/journals/forum-of-mathematics-pi/article/formal-proof-of-the-kepler-conjecture/78FBD5E1A3D1BCCB8E0D5B0C463C9FBC) published in Forum of Mathematics, Pi (2017)).


### Generalization for (almost) free

Proof assistants can help you to generalize your theorem very easily. After you formalize a theorem, you can try to tweak some parameters in the theorem and see if the proof still works. Proof assistants will tell you where the proof breaks, and you can check out if it is possible to fix the proof. If you are lucky, then the proof will still work, and you have a stronger theorem for free. For example, you have a theorem where a certain function $f(x)$ is always bounded above by $38$. Now you replace the number $38$ by $37$, and maybe you can still see that the proof compiles with no error. Then you just improved your result.

Something close to this happened in Tao's [Polynomial Freiman-Ruzsa project](https://github.com/teorth/pfr). The project formalized [the result by Gowers-Green-Manners-Tao](https://arxiv.org/abs/2311.05762) on the size of certain subsets of vector spaces over $\mathbb{F}_2$. The result includes some upper bound given by an explicit constant $2K^{12}$, where smaller is better. Later, Liao improved the exponent $12$ to $11$ (see [the comment on Tao's blog](https://terrytao.wordpress.com/2023/11/13/on-a-conjecture-of-marton/#comment-682353)), changing a relevant constant $\eta$ from $1/9$ to $1/8$, and it seems that one could formalize the improvement quite easily, thanks to their formalization project (see [Zulip chat history](https://leanprover-community.github.io/archive/stream/412902-Polynomial-Freiman-Ruzsa-conjecture/topic/PFR.20extensions.html)).


### Understanding theorems and proofs thoroughly

Formalization can help you to understand the proof better. It actually happens a lot that you may find a new *non-formal* argument of a theorem while you are formalizing a proof. Sometimes this is forced to happen since hand-formalization requires a lot of effort, or the original proof depends on hard theorems that are harder to formalize than the main results. Then probably you start to re-think about the proof and make it more "efficient" in whatever sense.

For example, in the case of the ongoing [sphere packing project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean), we *almost* follow Viazovska's proof in her [2017 Annals paper](https://annals.math.princeton.edu/2017/185-3/p07). However, there is a part of the proof based on quite technical results, which could take a lot of time to formalize. Instead, we found a more direct proof of the result and could formalize the same claim but with a different argument.[^1] There are some "formalization-friendly" proofs in the world.

It also helps you to think about what the "right" definition and the "right" theorem are. What is "the" definition of a group? We need associativity, identity, and inverse. Well, you only need a *left* inverse, since you can prove that a right inverse exists and is the same as the left inverse. In Lean, `inv_mul_cancel` is a part of [the definition](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Algebra/Group/Defs.html#Group) of a group, while `mul_inv_cancel` is a [theorem](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Algebra/Group/Defs.html#mul_inv_cancel) that can be proved from the definition. It means that, if you want to show that some object is a group, you only need to show that a left inverse exists, and you will get the right inverse, thanks to the theorem `mul_inv_cancel`. The same is true for theorems, where finding the "right" generalization of a theorem can significantly reduce duplicated effort in formalization. There are some proof arguments that are repeatedly used, which means that such an argument has to be extracted as a single theorem, so that it can be used in other proofs as well.


## Why (not) autoformalize


Now, I want to discuss *auto*formalization.

### AI but not LLM based formalization

In this post, I will focus on "LLM-based" approaches that translate a natural language statement and proof to a formal one. However, I want to mention some AI-assisted formalization works that do not rely on LLMs, which are also very interesting.

- [DeepMath (2016)](https://arxiv.org/abs/1606.04442) by Alex A. Alemi, Francois Chollet, Niklas Een, Geoffrey Irving, Christian Szegedy, Josef Urban. They used sequence models (combination of CNN and RNN) for premise selection, evaluated with [Mizar](https://en.wikipedia.org/wiki/Mizar_system).
- [TacticToe (2021)](https://link.springer.com/article/10.1007/s10817-020-09580-x) by Thibault Gauthier, Cezary Kaliszyk, Josef Urban, Ramana Kumar, Michael Norrish. They used Monte Carlo Tree Search (MCTS) to suggest tactics, evaluated with [HOL4](https://en.wikipedia.org/wiki/HOL_(proof_assistant)).
- [Random forests for Lean (2023)](https://link.springer.com/chapter/10.1007/978-3-031-43513-3_10) by Bartosz Piotrowski, Ramon Fernández Mir, Edward Ayers. They used random forests for premise selection, evaluated with Lean.
- [LeanHammer (2026)](https://openreview.net/forum?id=m04JJNeRK6) by Thomas Zhu, Joshua Clune, Jeremy Avigad, Albert Q. Jiang, Sean Welleck. They used encoder-only transformer for premise selection, and evaluated with Lean.


### Formalize your own proof

The main advantage of autoformalization that I can think of is when someone who does not know much about formal language wants to validate their *own* proof with the help of computers. This becomes more capable with LLMs (and probably with enough tokens), and it is likely that it will be possible to formalize a proof of a new theorem on the fly, so that you can be more convinced about the correctness of your (or your AI's) proof. This will also help the reviewing process of journals, where the authors formalize technical parts so that reviewers can put more weight on the overall idea of the paper.


### Do you want to (auto)formalize a *theorem* or a *proof*?

But do you need *auto*formalization? Not at all; you can always formalize something by hand. The only disadvantage is that it takes more time and effort, but in my opinion, there are more advantages than disadvantages (for educational purposes - to be honest, I'm not even sure if taking more effort and time is really a disadvantage).

There is a more important issue with autoformalization. Assume that you have a natural language statement and a natural language proof, and put them into your favorite LLM and push a button (probably with encouraging messages), and it gives you a formal proof that compiles without issues.
What does it mean? It actually means less than you think:

> The formalized statement is correct, up to the axioms the proof uses.

In particular, it does not guarantee that

> the formalized statement is mathematically equivalent to the original statement,

or

> the formalized proof argument faithfully follows the same argument as your original proof.

Which of the two matters depends on what you want. If you only care about the *theorem* - whether the statement is true - then the first one is all that matters, and the formal proof is merely a certificate. For example, there could be statements where the proof is easy but boring, while formalization can convince you that the statement is indeed true. More interestingly, there are mathematical conjectures where we don't have a consensus on whether the statement is true or false; for example, I think the boundedness of rank of elliptic curves over $\mathbb{Q}$ is such an example, where the truth value of the statement is already interesting. If you care about *your proof* - because the argument itself is the contribution, or because you want to know whether your own reasoning was right - then the second one matters just as much.

There are cases where some people claimed that their AI produced a proof of a novel conjecture and also formalized it in Lean, while it turned out that the formalized statements were not mathematically equivalent to the natural language statements, the Lean code just stated the main theorems as `axiom`s, etc. Sometimes, the formalized proof is slightly different from the original proof, although the formalized proof is still *essentially* the same as the original proof (for example, choosing different parameters).
The worst case is when the original proof is wrong, but the LLM is able to fix it *quietly* without telling you about it, so that you still believe that your original proof is correct, while it is not.
If you think that this is not the case with frontier LLMs, then you are mistaken.
<!-- There are (mostly minor) issues with a famous formalization project where the formalization is incomplete or follows a slightly different argument from the original proof. -->

An essential part of checking this correspondence is reading the code! Really, just read it. I'll give you some examples of Lean code below, and you can see that it is somewhat possible to read the code without knowing about the language at all (because humans are good at pattern matching). In particular, if you are the one who wrote the natural language proof, then you know the proof better than anyone else, so you can check if the formalized proof is indeed the same as your original proof.

But this is not always an easy job. A formalized proof is almost always longer than the natural language proof (except for some cases where great tactics like `grind` can one-shot some tedious computational proofs), and it is quite time-consuming. And that's exactly why it is very important to make the code readable. If you keep asking your LLM to generate code and not actually reading it, then the risk increases. Even if you use an LLM to generate code, you can push your button a few more times to make it way better (from extremely slop to somewhat slop), but I found that the best practice is to actually understand (or "digest") the proof so that *you* know what the problem is and how to fix it.


Let me just give one explicit example, with two formalized proofs of the same theorem. Here's a proof of the irrationality of $\sqrt{2}$ in Lean 4:

```lean
theorem coprime_ne {p q : ℕ} (hcop : Nat.Coprime p q) : p ^ 2 ≠ 2 * q ^ 2 := by
  intro h
  have hp : 2 ∣ p := Nat.prime_two.dvd_of_dvd_pow ⟨q ^ 2, h⟩
  obtain ⟨r, rfl⟩ := hp
  have h' : q ^ 2 = 2 * r ^ 2 := by linarith
  have hq : 2 ∣ q := Nat.prime_two.dvd_of_dvd_pow ⟨r ^ 2, h'⟩
  have := Nat.dvd_gcd (dvd_mul_right 2 r) hq
  rw [Nat.Coprime] at hcop
  lia

example : Irrational (Real.sqrt 2) := by
  rintro ⟨q, hq⟩
  have h1 : q ^ 2 = 2 := by
    have : (q : ℝ) ^ 2 = 2 := by rw [hq]; exact Real.sq_sqrt (by norm_num)
    exact_mod_cast this
  have h2 : q.num ^ 2 = 2 * (q.den : ℤ) ^ 2 := by
    have hd : (q.den : ℚ) ≠ 0 := by exact_mod_cast q.den_ne_zero
    rw [← Rat.num_div_den q, div_pow, div_eq_iff (pow_ne_zero 2 hd)] at h1
    exact_mod_cast h1
  have h3 : q.num.natAbs ^ 2 = 2 * q.den ^ 2 := by
    simpa [Int.natAbs_mul, Int.natAbs_pow] using congrArg Int.natAbs h2
  exact coprime_ne q.reduced h3
```

You can play with it on [live.lean-lang.org](https://live.lean-lang.org/#codez=JYWwDg9gTgLgBAWQIYwBYBtgCMBQO0Cm0BIcAxhGFKAQPoB2BcA3mHAI5wBccgqIQC%2BcABSoKbHgDkUAOgDClaiCZt2ASm5w2APTgAmOIAMiPXABUHODv1cAvHCwBPHHDjB6MKBDionXpADcmVHFjQGIiTW5bKRhpKhpaGAB3CGkAEz8U2ggAM1o0jMgEuEAL8k5LABovQEvyHwgsGCRXYqgKqCz0SoivMB9Uf0CAcg1S41t9MygLYxs7ezhMeiRqNB6%2Br04efTD1yJlYpXik1PTMnLzaAqbJ3QrUfurnXoDOqKOMgHMyFOEzkABXdFo1DeqHg%2Big6lQ7B8UEKAG0XvI9gQALpwFBeMQ%2BTBIPAEAAeSHA6CYPAAklAoChgBAFuhhAAlAhIdDSADO7FgenU0wc0Nc7k8JRu7HuvieqAAjEMrnBRp1ec4HqseEJ1nBALiE6kssqmtgccBhcFhkORAG44PikGR4IzmWz2LR2ZyhPr6NAQAxfiBVD5nJbrbQQBAMmQkKz4GhgKyVuKrBxpPQvTK5WZVakCPQNIASQi1upmvrFgS%2BKvY6czPEAWITqIwABnls39MEDwdoofD8ZSGYYdAAXgQPAXDbDAAmEcHpMkTHpSwD8uQzHAq09nBUXM9oBAdwCyWWEBW7tD7HmMqBSqlR6MlBcbzZDYfgl6V4oAzEME16EygAIJYVnJ4xmUtO0zbUeUcRU4FZUAwCQI1STcD8YG%2FVlA3%2BCo4OiBZEJ%2Fc4IASVFfkg%2Bg3nIGk3igT8oGI9CEKQrxdB8RsSKRbt4ygAgUl%2BMh2K8J8gA). Even if you don't know Lean, you can guess that it follows the classical proof by contradiction. `coprime_ne` says that if $p$ and $q$ are coprime, then $p^2 \neq 2q^2$, where `2 ∣ p` and `2 ∣ q` in the code suggest that it is trying to derive a contradiction by showing that both $p$ and $q$ are even, which is impossible if they are coprime.

Now, here is another proof of the same theorem in Lean 4.

```lean
example : Irrational (Real.sqrt 2) := by
  rintro ⟨r, hr⟩
  have hr2 : r ^ 2 = 2 := by
    exact_mod_cast show (r : ℝ) ^ 2 = 2 by rw [hr, Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 2)]
  have hx : (18 : ℚ) + 17 * r ≠ 0 := fun h ↦ by
    rw [show r = -(18 / 17) by linear_combination h / 17] at hr2
    norm_num at hr2
  have hy : (18 : ℚ) - 17 * r ≠ 0 := fun h ↦ by
    rw [show r = 18 / 17 by linear_combination -h / 17] at hr2
    norm_num at hr2
  exact fermatLastTheoremFor_iff_rat.mp fermatLastTheoremThree _ _ _ hx hy
    (by norm_num : (42 : ℚ) ≠ 0) (by linear_combination (31212 : ℚ) * hr2)
```

Again, you can try it yourself [here](https://live.lean-lang.org/#codez=JYWwDg9gTgLgBAWQIYwBYBtgCMBQOCmAHkuOvnAFxwCSUUKwEAdkunABQBK%2BrAdAM4BHWHABMASkoBeOFgCeOOHCjAmMKBDiAL8igAaOKiiBL8kUGkAN3KHRlZXAB6YuDJsUZ800qJIAxjAD6IBAAJv4%2BSPzw%2FKgQAO4cULaAuISSjjYusnLK8QDahvrcfEL%2BQiLs8nBM0CD%2BTACuILbsAAzJkoAmRGLiALqmqBZWhE0AjAActoBYhJIA1HDDAOxwAFR2gAZEcK1ucABmdUwGcIBlhJme2XA50XF2MgC07GNwAPRz85IVmEw8UGEQIFiqDGYB2eC26cBQBigolOVSgNXqjQh1j6AwMWSo93GVCmcBuL2Waw20h2ewOxw8SiUUFyl3iiRkDxBi3eqi%2BPz%2BAJgjH2N1QTxeYKRUJh1VqDXB8GRXmIfh2%2BDhKAAMhEYAAVVD4aD4EAAMWg%2FmA222%2FnoMF44DlCpgysi6s1UG16od5H8cFdrtQQ1QCkpHAqsPh4oxABZXHAcetmpJylkPmyfL9%2FiwuUD2ABmYaiTOTSQraziIA). This also compiles, without `sorry`, only with standard axioms, etc. But you can see that the proof seems quite different from the first one. In particular, you can spot `fermatLastTheoremThree` in the proof, which is, as you expected, FLT(3) (which *is* [in Mathlib](https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/FLT/Three.html#fermatLastTheoremThree)). The proof follows [this MSE answer](https://math.stackexchange.com/questions/4438180/does-fermats-last-theorem-imply-sqrt2-not-in-mathbbq/4438248#4438248), which is based on the identity $(18 + 17 \sqrt{2})^3 + (18 - 17 \sqrt{2})^3 = 42^3$.


I think it is safe to say that these two proofs are quite different, in terms of the mathematical argument behind them. Both are written by an LLM. How did you know that the two proofs are different? You just read the code.


### Crowdsourced projects

There are some formalization projects where many people contributed. The Flyspeck project and the Liquid Tensor Experiment were such examples. There are a lot of community-driven projects, such as [Carleson's Theorem (completed)](https://github.com/fpvandoorn/carleson), [Equational Theories Project (completed)](https://github.com/teorth/equational_theories), [FLT](https://github.com/ImperialCollegeLondon/FLT), [Sphere Packing](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean), [Infinite Cosmos](https://github.com/emilyriehl/infinity-cosmos), and of course, [Mathlib](https://github.com/leanprover-community/mathlib4). Although each project has its own goal, they can always serve as a valuable educational resource for training new generations of formalizers. If you make a PR, then the project maintainers will review your code and give you feedback, and you update your code and learn something. Some of the projects were finished before/without LLMs, while some of the active projects are quite LLM-friendly. But even in the latter case, maintainers try hard to make the code better (with or without LLMs).

I also contributed to Mathlib a few times (and am still contributing). Whenever I made a PR, I always got so much constructive feedback from the reviewers and learned a lot from the process (for free, which is insane - you should keep in mind what valuable experiences they are). Even if I use LLMs to generate code, I try my best to optimize the code with *or without* LLMs, to actually contribute to Mathlib.

You may also ask what is the value of formalizing a theorem which is already known to be true. Beyond educational purposes (learning about the proof and formalization), the process can produce reusable lemmas that we can upstream to Mathlib for other projects. We can also think about possible generalizations of the intermediate results, which also can be used in other projects. For example, you can find a list of upstreamable results from the Sphere Packing project [here](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean/issues/368) where many of them are already upstreamed. These benefits are not guaranteed by generating a `sorry`-free proof alone, especially if the generated code is a mess.

Now, think about a parallel universe where Mathlib has a clear "goal" - e.g. formalizing an ultimate theorem for humanity - and one day it is just "finished" by "some" AI with massive computational power. What would happen to the people who have been contributing to it? Fortunately, this cannot happen to the actual Mathlib, and the reason is almost ironic: Mathlib does not have a fixed goal. Mathematics is infinite and there will always be new mathematics that you are going to see, so there is no single ultimate theorem to be proved, and nothing to be "finished".


## Conclusion

I strongly believe that formalization will be more and more important in the future (not just for mathematics, but for other purposes). LLM-based autoformalization will also grow, which will help people to formalize their own results. But you can do a lot more than that, which requires responsibility.


## Acknowledgement

I learned a lot of different perspectives from several discussions in the Lean Zulip Chat, which implicitly helped me to write this post.  I also thank Jeremy Avigad and Sidharth Hariharan for their comments on the draft of this post.
All views are my own.


## Disclosure of LLM usage

LLMs were used for fixing grammatical errors, cross-referencing literature, suggesting improvements, and generating the Lean proofs above.

[^1]: The proof uses certain bounds on Fourier coefficients of meromorphic modular forms, whose proof uses Maass-Poincaré series and Kloosterman sum bounds. It was needed to prove that the magic function is Schwartz, but we found a more direct proof for the modular forms used in the proof, which is easier to formalize (and actually formalized).