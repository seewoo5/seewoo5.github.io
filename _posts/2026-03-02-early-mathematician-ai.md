---
layout: posts
title:  "Early-stage mathematicians in the age of AI"
date:   2026-03-02
categories: jekyll update
tags: math machine-learning
---

This is an essay about the role of **early-stage** mathematicians in the age of AI. It is motivated by several articles, including [Daniel Litt's blog](https://www.daniellitt.com/blog/2026/2/20/mathematics-in-the-library-of-babel), [Jeremy Avigad's essay](https://www.andrew.cmu.edu/user/avigad/Papers/mathematicians.pdf), and [Leo de Moura's blog](https://leodemoura.github.io/blog/2026/02/18/proof-assistants-in-the-age-of-ai.html).
In particular, I think professional mathematicians may use AI differently from early-stage mathematicians, and that difference is the main motivation for this post.

TL;DR: Do not worry too much (if you are reading this in March 2026; if you are reading this later, the answer may already be outdated).

Disclaimer: I am a random PhD student (graduating in May 2026). I do some number theory, some AI, and some formalization. I am not claiming to be an expert in any of these, or especially qualified to write this. If you are not an early-stage mathematician, or if you need advice from actual experts, read the great posts linked above; this post probably will not tell you many new things. But I have been overthinking this topic recently and wanted to share some of those thoughts. If you are a graduate student and want stories and opinions from a random person on the internet, this is for you. There is also an [old blog post](https://seewoo5.github.io/jekyll/update/2025/08/11/ai-and-math.html) on a similar topic, but this one is more about recent thoughts and experiences.

## Informal mathematics

Maybe you have seen a lot of news about "AI for mathematics," even if you do not work in this area. There are works using ChatGPT to prove new theorems or improve known theorems, and there are works using Gemini (or Aletheia, a stronger version in a rough sense). If you are interested, check out [this list of related works](https://seewoo5.github.io/awesome-ai-for-math/) maintained by me (especially the ones with `LLM` tags).

The point is that these LLMs are getting smarter, and the current "Pro" or "Deep Thinking" versions are smart enough to contribute to publishable research. They can definitely do REU-level work, and even some work at the level of first- or second-year graduate students. My naive expectation is that by 2030 they may be able to produce work at the level of many PhD theses.
If you are working on a problem that interests you, and you type it into one of these $200/month LLMs and get a complete proof in one hour, that does not sound good. But this is already happening in some cases, or will happen in the near future.

Last year, I participated in the FrontierMath Symposium, which was held in Berkeley, and I was probably the only graduate student there (I think the main reason I got in is that I am at Berkeley). That was when I first used expensive versions of ChatGPT, namely `o3` and `o4-mini`. Like others, I did not use ChatGPT for research at the time, mostly just for grammar in papers. During the symposium, about 35 mathematicians (mostly professors and postdocs) each brought one or two "research-level" problems with concrete answers (that can be checked automatically), to design the hardest math benchmark at the time. We found that many of them could be solved with these stronger versions of ChatGPT in 15 minutes, which was beyond our expectations. Since we wanted a total of 50 problems, we had to make new, harder problems, and eventually we reached 50. Now, the [dashboard](https://epoch.ai/frontiermath/tiers-1-4) shows that `GPT5.2-Pro` achieved 31.3\% accuracy on the dataset, roughly 14 problems. Since I did not believe the announcement of `o3`'s performance over 20% accuracy on the Tier 1-3 benchmark (in May 2025, if I remember correctly), getting even a single problem correct was surprising to me in 2025. Now it is March 2026, and this 31.3% accuracy does not surprise me that much.

Although this is a research-level benchmark, it is still a benchmark. You might think these AIs are not smart enough to do "actual research." Although I do not know how to define "actual research," I can definitely say that frontier models are now smart enough to prove new theorems that can be published in papers. There are too many examples, and I do not have enough space to list them all, so again I recommend checking the `awesome-ai-for-math` repository yourself.

Now you may ask: I am also using ChatGPT, and *my* ChatGPT cannot figure out which is bigger, 9.9 or 9.11, or cannot count the number of `r`s in `strawberry`. Then how is it possible for it to do research math? First, there is a fairly large gap between free versions and $200/month versions of these LLMs (which is, in my opinion, quite unfortunate). In particular, most recent works on using LLMs for research math use ChatGPT **Pro** or Gemini **Deep Think** (or other frontier AI with fancier adjectives). Some models are not even publicly available; they are internal models that only employees can use. I am definitely not recommending that you pay $200 per month, but at least I suggest asking people around you who have access to these models to run your questions. For example, one of my friends asked me to query a question about constructing a real-valued function on a finite group, and one of these frontier LLMs gave a nice construction, and he was happy with it (I guess). Another thing to mention is that these models seem to get better as you ask more questions on similar topics, probably because previous interactions are saved and reused.

Another possible question is *how* these models can be smarter than us. Here is my own way of understanding it. Roughly, assume these LLMs are trained on almost every text on the internet, including arXiv papers and published papers up to some date. The original GPT (Generative Pretrained Transformer) uses autoregressive language modeling, which learns distributions of natural language by predicting the next token from a given context. Current LLMs are trained with much more sophisticated algorithms (something like RL, but probably more than that; I have not followed NLP research trends for a while and do not know exactly how frontier models are pre- or post-trained these days), and they are very good at retrieving information. Roughly, you may assume that they "know" most mathematical knowledge available online. Considering that average graduate students are specialized in certain areas, these LLMs can outperform students on broad coverage because they "know" first-year graduate-level material across many subjects in mathematics. However, this does not directly imply that they can do research, or more generally "reason" (or "think"), because one still needs to understand how to apply known theorems to get new results. This is where past LLMs were weak, but current models are getting better and better. In particular, if you imagine a graduate student who studied *all* areas of mathematics up to graduate level (say, read all of Springer GTM), then there is a chance they could prove a theorem in area A using methods from area B that seem unrelated. Such amusing proofs do happen in mathematics, and well-reasoning LLMs may have that potential because they know so much mathematics. Of course, making them "think" is a nontrivial problem. Big tech companies are pouring money into this and trying to build so-called *AGI* (whatever it is). But if you think of them as smart, hard-working graduate students who have read all the GTM books, it may be less surprising that ChatGPT5.2-Pro achieved over 30\% accuracy on FrontierMath Tier 4, or that Aletheia could write a paper in hardcore representation theory with almost no human intervention.

But as of March 2026, I have not seen any AI solve a *major open problem that most mathematicians have heard of and that a significant number of people have tried to solve*. There are many works where AI autonomously generates proofs of novel theorems (and even formalizes them) that are definitely publishable, but most of those problems are either ones experts can solve fairly easily (probably not in 15 minutes) or ones that only a small number of people in the area currently care about. To be precise, I am **NOT** claiming these are unimportant; most mathematicians naturally focus on their own area, and solving an important problem in a specific area is a big deal. Epoch AI recently announced [FrontierMath Open Problems](https://epoch.ai/frontiermath/open-problems). As the name suggests, it is a list of open problems with answers that can be checked easily (if one has a candidate answer). For example, one asks for a degree-23 monic integer-coefficient polynomial whose Galois group is the Mathieu group $M_{23}$. This problem, or the *Effective Inverse Galois Problem* in general, has been studied by many people, and the $M_{23}$ case is still open. This suggests that if AI solves this problem, it is highly likely to come up with a genuinely new idea.

It does not need to be a major open problem. If you are a graduate student like me, you may be working on a thesis problem that you will solve at some point. In that case, you are the person who knows the problem better than anyone else. Maybe AI can solve it. If that happens, let us learn something from it and move on to a harder problem. Keep doing this until AI cannot solve it. Then you solve that one, since you are an expert on the problem.


The last thing I want to mention is that LLMs are not the only way to do interesting things in mathematics. Good examples include AlphaEvolve, PatternBoost, and variants of them, which are deep-learning models for "mathematical discoveries." Although some of them (for example, AlphaEvolve) are backed by LLMs (for example, Gemini), many can work without LLMs and still be useful for finding nice or rare examples in mathematics. In particular, these examples may give you new mathematical insights and lead you to prove novel theorems (or at least make new conjectures). Sometimes, you do not even need neural networks or transformers. There are many works that use only classical machine-learning algorithms to discover new mathematical phenomena. Such experiments can be done in seconds on your laptop, and I believe there are many directions you can pursue to find something interesting with these classical but powerful tools (oldies are goodies).

## Formal mathematics

Now let us talk about formalization, in particular Lean (I do not know much about Isabelle/HOL/Rocq/other languages). Many people have started getting interested in Lean, which is a great language for verifying proofs. I will not discuss why it is important (there are nice resources for that, e.g. [Kevin's lecture](https://youtu.be/K5w7VS2sxD0?si=lq3qjvYjsl-YPuFV) or [Kevin's other lecture](https://www.youtube.com/live/SEID4XYFN7o?si=FrdfpQ-MlyBwt_8K)), but rather *how* things might change, especially for people who have not used it much.

Formalizing a famous, hard, or interesting theorem is important. A few years ago, before Claude, Codex, Cursor, or Copilot (wait, why all of these start with C?), people did it manually, and it was very time-consuming. You had to find all the definitions and theorems manually in `mathlib`, and figure out how to apply them in your project.
But in 2026, you have fancy AI coding agents that write code *very* well, and some of them are also good at writing Lean code. It is even possible to finish a whole (small) formalization project using only these *general* coding agents, which are not Lean-specific at all. In 2026, this scales even further if you develop Lean-specific coding agents. For example, [Math Inc.](https://www.math.inc/) and maintainers of the [Sphere Packing in Lean project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean) recently announced that Gauss, a specialized AI for Lean, was able to write `sorry`-free proofs for both 8- and 24-dimensional sphere packing (which were informally proved by Viazovska and Cohn-Kumar-Radchenko-Miller-Viazovska, and contributed to Maryna Viazovska's Fields Medal in 2022). This is the largest-scale autoformalization so far.

If you just started learning Lean (possibly with the [Natural Number Game](https://adam.math.hhu.de/#/g/leanprover-community/nng4)), you will quickly find that coding agents (general or Lean-specific) are much better than you at writing proofs. For example, the following Lean code was written by Claude Opus 4.5 from a single query (I stated the theorem myself but without proofs):

```
theorem DihedralGroup.odd_ge_three_center_eq_bot (hodd : Odd n) (h3 : 3 ≤ n) :
    Subgroup.center (DihedralGroup n) = ⊥ := by
  haveI : NeZero n := ⟨hodd.pos.ne'⟩
  have hunit : IsUnit (2 : ZMod n) :=
    ZMod.isUnit_prime_of_not_dvd Nat.prime_two hodd.not_two_dvd_nat
  ext x
  simp only [Subgroup.mem_center_iff, Subgroup.mem_bot]
  refine ⟨fun hx => ?_, fun hx => by simp [hx]⟩
  rcases x with i | i
  · -- x = r i: commuting with sr 0 forces i = -i, so 2i = 0, so i = 0
    have heq := sr.inj (hx (sr 0))
    simp only [zero_add, zero_sub] at heq  -- heq : i = -i
    have hi : (2 : ZMod n) * i = 0 := by
      calc 2 * i = i + i := two_mul i
        _ = i + (-i) := by rw [← heq]
        _ = 0 := add_neg_cancel i
    simp [hunit.mul_right_eq_zero.mp hi]
  · -- x = sr i: commuting with r 1 forces i - 1 = i + 1, so 2 = 0, contradiction
    have heq := sr.inj (hx (r 1))  -- heq : i - 1 = i + 1
    have h2 : (2 : ZMod n) = 0 := by
      calc (2 : ZMod n) = (i + 1) - (i - 1) := by ring
        _ = (i - 1) - (i - 1) := by rw [heq]
        _ = 0 := by simp only [sub_self]
    have h2' : (2 : ZMod n) = ((2 : ℕ) : ZMod n) := by norm_cast
    rw [h2', CharP.cast_eq_zero_iff (ZMod n) n] at h2
    exact absurd (Nat.le_of_dvd (by norm_num) h2) (by omega)
```

As you might expect, it proves $Z(D_{2n}) = 1$ for odd $n \ge 3$. I did not provide any natural-language proof.
Then you may ask: if AI can do all this, what is the point of learning Lean in 2026?
In particular, if you are only interested in formalizing your own informal proof in Lean and verifying that you did nothing wrong (or finding something wrong in your proof, which may be an even more valuable outcome), you may feel that you do not need to care about the actual Lean code. And I think many mathematicians are in this case.

First, this is not only about writing Lean code that compiles. Another important part of building `mathlib` is literally as a "library," and we want results to be reusable for other purposes (we are not writing a book that no one will read). For that goal, we need general-purpose and maintainable Lean code, not just specialized and hard-to-read code. Much of this can be done with coding agents and a small amount of effort; they can golf proofs easily. But it is still the role of humans to give AI the right tasks so the code improves in the right direction. Note that the above theorem is actually upstreamed to `mathlib`, where the final golfed code is as follows (see [PR#33971](https://github.com/leanprover-community/mathlib4/pull/33971)):

```
theorem center_eq_bot_of_odd_ne_one (hodd : Odd n) (hne1 : n ≠ 1) :
    Subgroup.center (DihedralGroup n) = ⊥ := by
  simp only [Subgroup.eq_bot_iff_forall, Subgroup.mem_center_iff]
  rintro (i | i) h
  · have heq := sr.inj (h (sr i))
    simp_all
  · have heq := sr.inj (h (r 1))
    have : Fact (1 < n) := ⟨by grind⟩
    simp [sub_eq_iff_eq_add, add_assoc, ZMod.add_self_eq_zero_iff_eq_zero hodd] at heq
```

Maybe you are not interested in contributing to `mathlib`, and `sorry`-free proofs are enough. Still, I think you need to learn Lean, or at least learn how to *read* Lean code and how to *write definitions and statements*. If a proof compiles, then you have a working formalization. But for *statements* and *definitions*, there is no verified way to check that they are correct or equivalent to what you intended. Humans still need to stay in the loop to verify formalized definitions and statements. Quite often, we miss small edge cases that can make a Lean statement unprovable, or not equivalent to the informal statement (for example, this happened a lot while I was contributing to the [Formal Conjectures Project](https://github.com/google-deepmind/formal-conjectures)). In particular, there is a high chance of going wrong if you autoformalize proofs without understanding what is happening. There are cases where people claimed they proved novel things (or even Millennium Prize problems) *and* formalized them, but the actual formalization did not correspond to what they claimed (and they did not realize this).
Also, for "proofs," there is no direct way to check whether a formalized proof aligns with an informal proof. AI may find a worse *or better* way to formalize and produce a `sorry`-free proof of your theorem, but it may still differ from your intended argument. (I think asking whether two proofs are the same is itself a nontrivial question.) But you can definitely use AI for help here, for example by asking Claude to summarize key ideas from millions of lines of Lean code, identify key theorems and implication graphs, and compare that with your informal proof.

## Conclusion

Recently, I read a book called *먼저 온 미래 (the future arrived early)* by 장강명 (in Korean). The book explains the current state of AI using Go (AlphaGo and the post-AlphaGo era) as an example. In particular, I learned that most Go players now use AI for training, and that it has become almost impossible to compete at the highest level without it. Also, the current best player in the world, Jinseo Shin, is very well adapted to AI use.

I think this story also applies to mathematics **partially**, especially for early-career mathematicians. It is hard to expect this AI trend in mathematics to reverse or disappear; more and more people will use AI (but in many different ways, not just typing "hey prove this for me and get me PhD, thanks"). One slightly unfortunate part is that expensive models are noticeably better than free models, and people using the former may have better performance than those using the latter. But anyway, we need to figure out the best ways to use these systems as tools or research assistants, rather than as competitors to humans.
I use ChatGPT (Pro) almost every day for literature search, mainly to make sure I am not trying to re-prove something that was already proved in the past (even if the paper is in Russian or Chinese, which I cannot read directly, ChatGPT can often help). I also ask some work-related questions, mostly for lemmas that I know how to prove but do not want to spend much time on. But so far, I have not used these models much for the questions I am most interested in and want to answer myself, because I still need more training to become a stronger and more solid mathematician.

Also, there is a big difference between Go players and mathematicians: for mathematicians, competition is not the main interest (at least for me). Our goal is mathematics itself.[^1] We want to understand more of it, and to achieve that goal, we need collaboration. Interesting mathematics arises when people with different backgrounds work together. For this purpose, we should figure out the best ways to use these AIs in collaborative research and "accelerate" mathematics with these tools.

Things are changing extremely fast, and I cannot track every update. Maybe I will change my mind next month, or even tomorrow. At least, I expect to have more to say next year. *I will write a second version of this post in 2027 (as a postdoc), and a third version when I get another job (I have no idea if that will happen soon; maybe never).* Let me set a Google Calendar reminder for this.

(Thank you to Jeremy Avigad, Jineon Baek, Kevin Buzzard, Hyukpyo Hong, and Paata Ivanisvili for reading earlier drafts and giving helpful comments.)

[^1]: Of course, for many Go players, Go itself is an end in itself. I have also read that many players viewed Go as an art form (similar to how I view mathematics), though this perspective seems to have shifted after AlphaGo appeared.
