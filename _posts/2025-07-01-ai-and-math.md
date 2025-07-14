---
layout: posts
title:  "Do mathematicians need AI?"
date:   2025-07-01
categories: jekyll update
tags: math machine-learning
---

In this post, I’m going to share some of my recent experiences using AI (which is an extremely vague word these days) in mathematics.
Specifically, I’ll describe my experiences with two events on AI and mathematics - the FrontierMath symposium and the ML in Mathematics workshop - and introduce my recent work with Kyu-Hwan Lee on classifying Galois groups using ML.

## FrontierMath Tier 4

I attended the [FrontierMath Symposium](https://frontiermath-symposium.epoch.ai/), which was held in Berkeley a few weeks ago. There were about 30-40 participants, of whom probably one or two were graduate students (including me). The goal of the symposium was to create a Tier 4 FrontierMath benchmark. A “Tier $\le$ 3” benchmark [had already been created](https://arxiv.org/abs/2411.04872) a few months earlier by several people, including some graduate students at Berkeley (I wasn’t one of them, as I misread Epoch AI’s email and forgot to submit my problem idea, even though I had several in mind).

From morning until evening, participants gathered at a secure location to discuss their own problems and refine them with feedback from others. Notably, an engineer from OpenAI generously provided us with a year’s access to ChatGPT Pro so that we could test our problems with the advanced models (I used `o4-mini-high` most of the time). We used them in [temporary mode](https://help.openai.com/en/articles/8914046-temporary-chat-faq) to ensure that OpenAI do not cheat on it.

While using these advanced models for the first time (since I didn’t want to pay $200 per month), I definitely learned a few things:

### They are pretty good

These paid models are significantly better than the free versions of ChatGPT. One major difference is that Pro models can access the internet and search, whereas the free ones cannot. In other words, the knowledge of the free ChatGPT is limited to its training data, while Pro models can, in principle, access the most recent information by querying external sources. This explains why free models are already quite adept at literature searches and can "solve" some of the proposed problems by finding relevant papers.

### They are not super good

Obviously, many of the proposed problems remained unsolved. Although I don’t know much about all of the problems, most participants agreed that the models could not tackle problems requiring genuinely new ideas not yet present in the literature. For example, ChatGPT did not even know where to start with one of the Number Theory group’s problems and even *congrats* to the author of the problem (See [this video](https://youtu.be/ALH54xxDOAA?si=9_7bPX8OGQV2jlxm) to find the author of the problem.).

### Are they thinking?

I think this is a philosophical question that isn’t well-defined, so there’s no definite answer. But if you ask me, I’d say:

- No (80%), since they're essentially generating sentences that "look like thinking". The UI/UX of ChatGPT (and similar interfaces) is so well designed that it makes people believe ChatGPT is actually thinking.

- Yes (20%), because sometimes humans aren’t much different from these LLMs. When I was young, I liked to copy fancy formulas from popular math books - like Fermat’s Last Theorem by Simon Singh - even though I didn’t really understand them; I just enjoyed writing them. Maybe I was a poor, tiny language model back then.


### More on FrontierMath

Check out [Epoch AI's website](https://epoch.ai/frontiermath) to learn more and see the current leaderboard; you’ll find that some of the problems have already been solved.


## Machine Learning and Mathematics at KIAS

While visiting Korea, I attended the [ML and Mathematics workshop at KIAS](http://events.kias.re.kr/h/MLM2025/?pageNo=5840).
There were many great speakers working on ML-guided mathematics and formalizations (in Lean, mostly), and all the talk videos are available on the workshop website.
My favorite talk was the first one by [Geordie Williamson](https://www.maths.usyd.edu.au/u/geordie/), which was about isoceles-free sets (from [PatternBoost](https://arxiv.org/abs/2411.00566)) and the Hirsch conjecture (from [this paper](https://arxiv.org/abs/2502.05199))[^1].
I'm pretty much convinced that ML can be used to find nice "examples" in mathematics from the lectures, and I plan to explore similar approaches (especially reinforcement learning) for my own problems.

I also met a lot of new (and old, not in the sense of their age) people during the workshop and discussed interesting research ideas.
There were problems that I never considered, and they seem very promising ML-based investigation which definitely worth trying.


<p align="center">
<img src="/assets/images/KIAS-MLM.jpg">
</p>


## Using ML in my own research (Learning Galois group of number fields)


After returning from the workshop, I finally finished the paper I had been working on with Professor [Kyu-Hwan Lee](https://khlee-math.github.io/). A previous paper by He, Lee, and Oliver used logistic regression and decision tree models to classify Galois groups (and other invariants such as degree or class numbers), finding that the models could predict with high accuracy. Our paper explains *why* they work well by interpreting the trained models.

The most interesting case involved degree-9 extensions. If we restrict our attention to Galois extensions, there are two possible Galois groups: $\mathbb{Z}/9\mathbb{Z}$ or $(\mathbb{Z}/3\mathbb{Z})^2$.
By using the first 1000 Dedekind zeta coefficients (for each $n \ge 1$, $a_n$ is the number of integral ideals $\mathfrak{a} \subseteq \mathcal{O}\_K$ of index $n$), the decision tree model achieved 100%(!) accuracy on a test set for distinguishing between two groups.
Especially, it is very easy to guess what the model is actually doing:


<p align="center">
<img src="/assets/images/nonic-dt.png">
<figcaption align="center">Trained decision tree model on degree 9 Galois number fields. Here $C_n$ denotes the cyclic group of order $n$.</figcaption>
</p>

We found that the model only uses *three* coefficients out of 1000 - 1000, 343, and 27 - all of which are perfect cubes!
More precisely, it predicts a Galois group to be $\mathbb{Z} / 9\mathbb{Z}$ if $a_{m^3} = 0$ for some $m \ge 1$.
It turns out that this criteria holds for any degree 9 Galois extension, which is previously unknown (similar result holds for any Galois extensions of degree $\ell^2$ for prime $\ell$).
We also studied Galois extensions of degree 4, 6, 8, and 10, observing and proving additional interesting results by interpreting the ML models.


### Using `o4-mini-high`

There are at least two ways in which ChatGPT (`o4-mini-high`) proved useful while writing the paper.

1. **Literature search.** It’s very good at locating papers and references. I asked for the statements of theorems that were likely known but that I hadn’t seen before, and it correctly provided the references.

2. **Code generation.** I needed LaTeX figures for the decision tree models and initially spent a lot of time drawing them one by one using the forest package. I realized I could ask ChatGPT to write Python code that generates the appropriate LaTeX code for the decision trees, which worked almost perfectly. Although I had to make a few follow-up requests to fix minor issues (such as escaping backslashes in the generated text), it handled them easily. You can view the chat history [here](https://chatgpt.com/share/684b17ac-47dc-800b-b737-504123fb6ca6).


## What should I (we?) do in present and future as a mathematician

I hope my experiences have convinced you that AI can assist mathematical research in several ways: finding new (counter)examples, locating relevant papers, writing supplementary code, and more. As a concluding remark, I share my thoughts on how I plan to use AI in my future research.

- LLMs can serve as powerful, flexible search engines far beyond simple web searches. I will continue to use them to locate the papers I need so that I don’t waste time reproving known results. However, LLMs still suffer from hallucinations, which are nearly impossible to eliminate completely. Therefore, it’s crucial to carefully check any answers or cited references and verify the information before trusting it.

-  One might ask an LLM to prove new theorems. This is clearly more difficult than searching for references, and LLMs struggle to produce proofs requiring genuinely novel ideas not present in the literature[^2]. However, I found them useful even when they produced incorrect jargon, because they often pointed me toward the right references. Moreover, completely wrong ideas can sometimes inspire new insights; it’s common to get fresh ideas from discussions with mathematicians in other fields.

- Not all AI tools are LLMs. There are many examples where (non-LLM) AI has helped mathematicians find new (extremal) examples or discover relations among mathematical objects previously unknown. For the former, reinforcement learning has shown success; for the latter, interpretability is key. Ideally, humans identify new patterns in the examples and relations generated by AI models, leading to the development of new theory.


[^1]: There was one more problem about knot theory, which seems to be an in-progress work and not published yet.

[^2]: Again, this is not a well-defined claim, since it is hard to say what is a "new idea". Almost all - probably all - ideas of mathematics are build upon the ideas from past, so one can claim that all the mathematics can be interpolated from the known results. However, some of the pioneering works definitely 
