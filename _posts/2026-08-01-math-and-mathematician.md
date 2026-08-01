---
layout: posts
title:  "Mathematics and Mathematicians"
date:   2026-08-01
categories: jekyll update
tags: math ai
---

Several things happened recently:

- A few weeks ago, a Spanish journalist emailed me saying that he had read [my previous blog post](https://seewoo5.github.io/jekyll/update/2026/03/05/early-mathematician-ai.html) and wanted to ask me some related questions for [this article](https://elpais.com/tecnologia/2026-06-17/estan-obsoletas-las-matematicas-los-investigadores-replantean-para-que-sirven-en-la-era-de-la-ia.html).
- [The unit distance conjecture is disproved](https://openai.com/index/model-disproves-discrete-geometry-conjecture/), [Grothendieck's conjecture is disproved](https://github.com/j2d9w5xtjn-png/GrothendieckRankP2), and [the Jacobian conjecture is disproved](https://x.com/__alpoge__/status/2079028340955197566), all by AI.
- [OpenAI solved 10 significant math problems](https://openai.com/index/ten-advances-in-mathematics/) using an internal version of Astra, a model that will be released in the future.

I'm using AI more and more for my research. But I am getting more confused about whether I want to use AI in my research or not. I know that it is definitely helpful in my research in many ways, but I also don't feel comfortable using it, for a reason that was not clear to me.

Here I'm trying to give an answer to my own confusion, by distinguishing between "mathematics" and "mathematicians."
Most of the answers below are based on my responses to the Spanish journalist's questions, some of which are not included in the article.


## Definitions

So we start with the definitions of these two terms. I have two suggestions for (meta-)definitions:

1. Define mathematics. Then define mathematicians as people who do mathematics.
2. Define mathematicians. Then define mathematics as what mathematicians do.

Of course, you may think otherwise. My take is the second one. The reasoning behind this is that I always think humans are the ones who define what they do.

Then I need to define mathematicians, and to be honest, I don't have a good definition that everyone can agree on.
But I found that it is often easy to seek non-definitions first, then rule them out until we reach a good (or at least acceptable) definition.
Here are my *non*-definitions of mathematicians:

- A mathematician is a person whose only goal is to solve Erdős problems and tweet about it.
- A mathematician is a person whose only goal is to resolve famous conjectures that have been open for at least 50 years (and 49 years does not count, sorry for that).
- A mathematician is a person who has a Pro subscription to ChatGPT and a Max subscription to Claude, whose only goal is to ask LLMs to find counterexamples to famous conjectures and to post them on social media.

If you don't like the above non-definitions, read them again; I said *only* goal, not just *a* goal.
Also, I tried to fit myself into these non-definitions of mathematicians but I failed; I tried one or two Erdős problems, I tried to resolve some famous conjectures, and I have a Pro subscription to ChatGPT and a Max subscription to Claude, but had no success in finding a fancy counterexample to famous conjectures.
If any of the above non-definitions is actually a definition of mathematicians, I am not a mathematician.

Obviously I'm being sarcastic here, but you can also see that I don't like certain kinds of public views toward mathematicians.
Some people think that the definition of a mathematician is "a person who proves famous conjectures" and I know most mathematicians will disagree with that.

But here's a more likely definition: *mathematicians are people who solve math problems (or prove theorems)*.
This might be related to the usual classification of mathematicians into "problem-solvers" and "theory-builders".
First of all, in my opinion, many "theory-builders" are driven by "solving problems". In my case, if I have to choose one of them, I am (or want to be) a theory-builder, but there are problems that I want to solve by building theory.
So I think the classification is not super clear.
But the above definition itself, I think, is not perfect but makes sense.
It is definitely true that problem solving and theorem proving are the main activities of mathematicians, and other activities like writing papers, giving talks, and meeting other mathematicians are all secondary activities, ultimately for the purpose of solving problems and proving theorems.

But then, I think we may further ask *why* mathematicians want to solve problems and prove theorems.
This is the point where each mathematician has their own answer.
I also have multiple reasons, e.g. to get a job (seriously), but the main reason is that I like to solve problems and prove theorems.
Mathematical thinking is genuinely fun for me.
Also, sometimes I treat mathematics as a form of art, and finding "proofs from the Book" is kind of a holy grail for me.

Also, solving a problem is usually not the end of the story, contrary to the public view (prove a conjecture, get attention on social media, and then stop).
If a significant problem is solved, it usually means that the solution contains new ideas (it is also possible that people may have missed a simple solution for a long time, but it is rare), and those new ideas can be used to solve other problems.
One of my favorite examples is the solution of Fermat's Last Theorem - all the intermediate results and ideas (not only Wiles, but also Frey, Serre, Ribet, Taylor, ...) had a huge influence on the development of number theory, especially on the Langlands program (Taylor--Wiles' modularity theorem is *roughly* the global Langlands correspondence for $\mathrm{GL}\_2$ over $\mathbb{Q}$, and people are working hard on extending it to other groups and other fields).

Non-mathematicians (or even mathematicians!) also ask the following question: "mathematics is not useful in real life, then why should we care about it?" I don't think this is true at all, but somehow it is not always easy to explain the usefulness of mathematics to non-mathematicians.
I do think that studying mathematics itself is useful for making people "think" and "be smart", which is why I think some form of mathematics education is necessary for everyone.
Also, mathematicians often say that the mathematics that they study *will be* useful in the future, which I also believe is true, but it usually takes a *very* long time to see.
For example, I don't believe my Ph.D. thesis will be used to save the earth or human lives, but *maybe* unexpectedly it will be useful for *something* in *some* future (like 1000 years later).
But those directions will eventually contribute to humanity.

So my proposed definition of mathematicians is: mathematicians are people who solve math problems and prove theorems, and who will eventually contribute to humanity in some way.
I'm trying to be vague here because any concrete definition will be wrong.


## AI for mathematics

So is AI helpful for mathematics? My answer is (strongly) yes.
As I said, mathematics is what mathematicians do, such as solving problems and proving theorems, and we are already seeing a vast number of examples where AI is helpful in this way.
Also, not all such advances are made by LLMs; some are made by "other AI" such as task-specific models or even classical machine learning models.
You can see a list of works using AI for mathematics [here](https://seewoo5.github.io/awesome-ai-for-math/), where almost half of them are not done by LLMs (although, sadly, this ratio will decrease in the future).

AI was merely helpful for proving small "lemmas" in the past, but now it is producing significant results, as you can see from the news I mentioned above.
What I definitely think is that AI is extremely good at the following:

1. Finding rare (counter)examples, such as clever combinatorial constructions
2. Filling in convex hulls of known results, i.e. combining known results to find new results

For 1, many mathematicians who use "computers" for mathematics were already doing this for a long time without AI, but clever use of AI or simply prompting LLMs can make this process much faster and more efficient.
For 2, I think most mathematical results (probably 90%, or even 99%) are about "taking convex combinations of known results," and AI is extremely good at this. In particular, most human mathematicians take *local* convex combinations of known results, but AI can take *global* convex combinations, since AI *knows* almost all the mathematics in the world (do not ask me what the definition of "knowing" is, since I don't know).
I thought that 2 was easier than 1, since combining existing results seems easier than finding a needle in a haystack, but it seems that many earlier results using AI for mathematics are about 1 (such as Wagner's work on RL for graph theory, PatternBoost, AlphaEvolve, and all similar sorts of things), and now we are seeing more results about 2.

People often talk about "accelerating mathematics" with the help of AI, and this is what I think is happening nowadays.
A really good example is the Unit Distance Conjecture, but more interestingly, the follow-up works that came from it.
Although OpenAI's internal ChatGPT stopped at disproving the 80-year-old conjecture, other mathematicians used the idea on other problems, such as the [disproof of the sum-product conjecture for $\mathbb{R}$](https://arxiv.org/abs/2605.28781), a [counterexample to the Elekes-Rónyai problem](https://arxiv.org/abs/2606.13619), a [quadratic lower bound for the Furthest Pair problem](https://arxiv.org/abs/2606.25887), etc.
AI is not only helpful for proving more theorems, but also for opening more directions in mathematics; if one solves a problem, mathematicians may ask 10 follow-up questions.
Of course, AI might be able to answer all the follow-up questions, but then there will be more, and so on.


## AI for mathematicians

But then what is the problem? If AI is helpful for mathematics, then it should be helpful for mathematicians, right?
The answer is, as you may guess, "it depends," and there are many subtle issues here.


### AI + mathematician > AI

Before I go into my concerns, let me start with a positive note.
What I think is that the combination of AI and mathematicians is much more powerful than AI alone, even if AI itself is superhuman in mathematics (in some cases).
If a mathematician knows possible strategies to solve a problem, then they can use AI to try those strategies and see if they work.
If they don't work, AI might be able to suggest new strategies, and the mathematician can tell which strategies are more likely to work, and repeat.
In other words, mathematicians can use AI to accelerate their research (and AI never gets tired! It just asks you for more money).
You might object: if AI is really superhuman, wouldn't it also choose strategies better than us? Maybe. But mathematicians still decide which problems are worth solving and which questions are worth asking; as I said above, a solved problem opens up 10 follow-up questions, and it is mathematicians who choose which of them to pursue.

In particular, AI is very helpful for mathematicians like me who write code and do experiments with computers a lot. In the past, I spent a lot of time writing code, which is not the most important part of my research, but now I can use AI to write code for me, and I can spend more time thinking about more ideas (of course, you may need to verify the code yourself).
Relatedly, you can find that quite a lot of recent advances in mathematics using AI are from combinatorics, number theory, algebra, and TCS, where you can often turn problems into code and run experiments.


### Early-career mathematicians

The first issue is about early-career mathematicians, such as Ph.D. students.
Although there are many different advising styles, one of the most common styles is that advisors give students problems to solve, and students try to solve them, and if they succeed, they get a paper and maybe a postdoc position.
Since graduate students don't do a Ph.D. forever (mostly 5 years), advisors usually give problems that are in a reasonable range of difficulty, so that students can solve them in a reasonable time. In particular, it is common that advisors give problems that they already know how to solve, but give them as training material for students to become good mathematicians.

Now, frontier AI models can definitely solve most REU-level problems, and now even some Ph.D.-level problems, where students may get a degree if they solve them. (N.B. I really don't want to use the terms "REU-level" or "Ph.D.-level", but unfortunately I don't have a better term for this.)
It opens up two possibilities that didn't exist before:

1. A student may prompt their problem to AI and get a solution in 15 minutes.
2. A random person may prompt a student's problem to AI, get a solution in 15 minutes, and post it on social media.

If 1 happens, then I don't think it is always a win for students.
As I said, the major point of the problems given to early-career mathematicians is to train them, not to solve the problem itself.
If AI solves it instead, then I think students *lose* their chance to solve the problem themselves, even if they still get a paper.
I have a private list of problems that I want to do at some point, but I don't try AI on them, even though I know that AI can solve some of them (definitely), because I want to do them myself and do not want to let AI take my fun away.

I think 2 is even worse than 1, since it is done by someone else.
Of course, 2 can only happen when the problem is publicly known, but this is common in mathematics: problems are often announced before being solved, in seminar talks, in the introductions of papers, or in lists of open problems.
One unspoken rule of mathematics is that, if a Ph.D. student is working on a problem, then other "experts" do not try to solve it, even if they can do it easily.
This is related to point 1.
But now, people (even non-mathematicians) who do not care about this unspoken rule at all will just run AI and announce the solution.
Even worse, if Ph.D. students fear this, they will also try to use AI to solve their problems, which brings us back to point 1.
I think what is happening now is that AI is changing the culture of mathematics by making it more competitive (it was already competitive in some sense, but it is *more* competitive now).

This also raises a question about how professors should advise their students, but I'm not qualified to answer this question, since I'm not a professor yet.
But based on my limited experience mentoring undergraduate students for REU, I would recommend that my students use AI as little as possible: try to solve the problems themselves first, and use AI only if they are stuck for a long time.


### Funding

Ideally, mathematicians do mathematics because they like it. But in practice, mathematics is not a hobby for mathematicians; it is their job. Mathematicians are paid to do mathematics, and they have to do mathematics to get a job.
It means that mathematicians should persuade funding agencies to fund their research, explaining why their research is important and useful, and how they will do it.
Now, people are saying that "our AI can solve this hard problem, *only using XXX dollars*," and it is obvious why they are advertising in this way: to show that their AI's intelligence is "cheap."
But then, funding agencies will ask the following question: "If AI can solve this problem for under 2,000 dollars, then why should we give you 200,000 dollars to work on it for years?" This is a very reasonable but also hard question.
Although there are many other reasons why mathematics is important, these reasons may not be convincing enough for them to give us money.


## Conclusion

Back to my original question: the reason for my confusion is that I think AI is helpful for mathematics, but not always helpful for mathematicians.
I think AI will eventually be superhuman in mathematics, probably pretty soon (again, I'm being vague by not defining "superhuman", but whatever the definition is, I'd roughly estimate that it would happen in 5 years at most).
But I also think that the reason behind the rapid progress of AI in mathematics is that the frontier labs are hiring very talented mathematicians to make their AI models better at mathematics, and I'm 100% sure that these mathematicians play a huge role in making their companies' AI models smarter (otherwise, why would they hire them?).
I take this as further evidence for what I said above: the combination of AI and mathematicians is much more powerful than AI alone, and I think this is the future of mathematics.

(A draft of this post was written by me, and polished & completed with Claude Fable 5.)
