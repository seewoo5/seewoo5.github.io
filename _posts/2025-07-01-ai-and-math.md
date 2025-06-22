---
layout: posts
title:  "Do mathematicians need AI"
date:   2025-07-01
categories: jekyll update
tags: math machine-learning
---

I'm going to share some of my recent experiences on using AI (which is an extremely vague word these days) in mathematics, including `o4-mini-high` and decision trees.


## FrontierMath Tier 4

I was at the [FrontierMath Symposium](https://frontiermath-symposium.epoch.ai/) which held in Berkeley few weeks ago.
There were about 30 to 40 people, and probably 2 or 3 graduate students among them (including me).
The goal of the symposium is to make a "Tier 4" FrontierMath benchmark, where "Tier $\le 3$" was [already made](https://epoch.ai/frontiermath) few months ago by several people including some graduate students (I was not one of them, since I have misread Epoch AI's email and forgot to reply my problem idea even if I had few).
From morning to evening, participants were at a secure place and tried to discuss about their own problems and improve them.
Especially, one guy from OpenAI thankfully gave us access to use ChatGPT pro for an year, so that we can test our problems with the smart models (I used `04-mini-high` for the most of the time), but also in a [temporary mode](https://help.openai.com/en/articles/8914046-temporary-chat-faq) to make sure OpenAI don't cheat.

While using the advanced models that I never used before (since I don't want to pay for these), I definitely learned something:

### They are pretty good

These non-free models are definitely good, way better than the free ChatGPT.
Although I don't know the actual difference between free one and non-free one (I haven't read much about these language modeling papers after RLHF came out), the probability that they are saying something make sense was definitely higher for non-free ones.
Especially, they were able to solve some of the proposed problems during symposium, so that we had to write new ones (we simply discarded the problems that are solved or having high risks to be solved).
Basically, the models' strength is literature search - they are extremely good at finding relevant papers to solve a proposed problem, which sometimes let them to generate correct answers. I'll discuss more about this aspect later.

### They are not super good

Obviously, many of the proposed problems are survived.
Although I don't know much about other problems, most of the participants agreed that the models were not able to solve problems that requires genuine ideas that do not exist in literature.

### Are they thinking?

I think this is a philosophical problem, so I don't think there's a definite answer.
But if you ask my opinion, then I'd say 

- No (80%), since they are more like generating sentences that "looks like" thinking. Especially, the UI/UX of ChatGPT (or any other famous ones with same UIs) is very well-made and it makes people think ChatGPT is actually thinking.

- Yes (20%), since I think sometimes humans are not that different from these LLMs; When I was young, I'd like to write some fancy formulas that I read from famous public math books like Fermat's Last Theorem (by Simon Singh), and at that time I didn't know what I was writing but I just felt good.
I was a poor language model at that time.

## `o4-mini-high` for literature search

So I said that they are good at finding relevant papers for a given problem.


## Learning Galois group of number fields

## What should I do in present and future as a mathematician