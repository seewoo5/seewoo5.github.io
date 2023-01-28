---
layout: posts
title:  "ChatGPT and Watermarking"
date:   2023-01-27
categories: jekyll update
tags: machine-learning
---

In November 30, 2022, OpenAI released [ChatGPT](https://chat.openai.com/chat), and (at least in my opinion) it changed the world a lot, because of its standout performance.
It can do a lot of things, including writing a code, poem, movie script, solve some math problems, and searching.
We can literally (try) to ask any questions to ChatGPT, and it give us answers which are *likely* to be true.
Of course it gives wrong answer sometime, and actually quite often when we ask hard questions (like research-level mathematics).
But it works well for a lot of tasks - see [here](https://github.com/f/awesome-chatgpt-prompts) for example prompts that you can try.

I also tried and enjoyed it a lot, and an obvious question arose in my mind - why it works well? Why **Chat**GPT is better than the vanilla GPT, which was published in 2018? I'm going to give an answer based on [the paper](https://arxiv.org/abs/2203.02155) and [OpenAI's blog post](https://openai.com/blog/chatgpt/).

Also, I found [a recent paper](https://arxiv.org/abs/2301.10226v1) uploaded on arXiv on *watermarking* large language models.
Such a watermarking is somewhat essential due to the *bad* use of ChatGPT or ChatGPT-like models - e.g. using it for writing homeworks or generating fake news.
This is another thing that I'm going to explain here.

**DISCLAIMER: ChatGPT helped me A LOT to write this post.**

## ChatGPT vs GPT - what's the differences?

Obviously, to understand how ChatGPT works, we need to understand how GPT works first.
GPT is an abbreviation of **G**enerative **P**retrained **T**ransformer.
If you never heard about these concepts, then here are some brief explanations for you.
You can find a ton of great resources that explain way better than me on Google or YouTube, and I'd recommend those for you who want to know more in detail.


### Pre-training and fine-tuning

At some point, *pre-training and fine-tuning* paradigm become a *de facto* method for obtaining a deep learning model with high performance. 
It is also called *transfer learning* (some people distinguish these two, but in this post I'll consider them as a same thing), and let's explain it with the image classification problem. 

In general, we need a lot of data to successfully train a deep learning model and get a model with high performance. However, in the real world, it is very often to have only a small amount of (labeled) data.
For example, assume that we want to classify medical images labeled with diseases. We certainly may not have a lot of such images, and it is even hard to get such images due to privacy concerns. To address this issue, we first train a model (neural network, e.g. a ResNet) on a large dataset such as ImageNet (which contains 1 million images). This is the pre-training step. Then, our belief is that, if the model is trained well on ImageNet, it may learn how to classify images well, and such knowledge might be able to be transferred to other images. For this, we take off the classification layer of the pre-trained model and replace it with a new classification layer for our own classification (medical image classification). Then, we fine-tune the replaced layer, fixing the remaining parameters of the pre-trained model. In other words, we use the pre-trained model as a feature extractor (encoding an image into meaningful vectors) and use the extracted features for classification. Surprisingly, it is known that models obtained in this way perform significantly better than models trained from scratch (i.e. trained only with the given medical images).


### Transformer


[Transformer](https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) is a neural network architecture that is commonly used for tasks such as natural language processing. It differs from previous architectures like recurrent neural networks (RNNs) in the way they process sequences of input. RNNs process sequences by recursively applying the same set of weights to the current input and the previous hidden state, while the transformer uses self-attention mechanisms to weigh the importance of different parts of the input sequence when making predictions. Additionally, transformers can process the entire input sequence in parallel, which makes them more efficient in terms of training and inference time. 
After the birth of [Vision Transformer](https://arxiv.org/abs/2010.11929), they are even used in computer vision tasks like image classification.

### Generative Pretrained Transformer, aka GPT

So, what is GPT?
As it says, it is a transformer-based model which is pre-trained in a certain *generative* way.
In fact, it is trained to predict *the next word*. 
Here *generative* means the following: it is pre-trained to predict the next word based on a given sequence of previous words.
For example, if we have a sentence like "I like mathematics. My hobby is to solve math problems.", then the model is trained to 

* predict "I" from an empty sentence,
* predict "like" from "I",
* predict "mathematics" from "I like",
* ...
* predict "problems" from "I like mathematics. My hobby is to solve math". 

Such a generative pre-training is a type of *language modeling*, and its goal is to learn a distribution of natural language sentences in a generative way.
Ther are other types of language modeling like N-grams or Masked Language Modeling (BERT), but generative language modeling might be the best choice for generatling human-like sentences in a sequential way, simply because of how it is modeled.

After GPT is first published and released in 2018 by OpenAI, GPT-2 and GPT-3 are released, with more and more parameters (GPT-3 has 175B parameters) with better performances, trained on larger and larger text corpus.


### InstructGPT, the backbone of ChatGPT

I believe you understand what GPT is. Let's move on to [InstructGPT](https://arxiv.org/abs/2203.02155), the backbone of ChatGPT.
You may also read [the OpenAI's blog post](https://openai.com/blog/instruction-following/) on it.

GPT-3 works well, but not perfectly.
It produces wrong/harmful/hate sentences sometimes, and we need to reduce such bad generations (it is impossible to eliminate them perfectly).
Toward this, they combined GPT-3 with [*Reinforcement Learning with Human Feedback (RLHF)*](https://openai.com/blog/deep-reinforcement-learning-from-human-preferences/), which use a reward model trained with human preferences.
They first fine-tune GPT-3 using human-written demonstrations on prompts.
Then collect human-labeled comparisons two model outputs on a larger set of API prompts, and use the labels to train a reward model (RM) that predicts human's preference.
Lastly, they fine-tune the GPT-3 again with RM using [Proximal Policy Optimization (PPO)](https://openai.com/blog/openai-baselines-ppo/), which is a reinforcement learning algorithm also designed by OpenAI.
For the readers who don't know the concept of reinforcement learning, training GPT-3 with PPO make it to generate sentences with higher and higher rewards.

By combining the existing GPT-3 with RLHF, they could obtain much better GPT with less harmful outputs (see the above blog post on InstructGPT for the details of the metrics they use for the evalutation). This is how ChatGPT really works, especially why it is better than GPT-3.

FYI, see [this](https://time.com/6247678/openai-chatgpt-kenya-workers/) NYT article on the training of InstructGPT.


## Watermarking ChatGPT - don't use it for your homeworks


So ChatGPT works well, actually very well.
Hence it is essential to *detect* whether a given sentence is generated by ChatGPT or other (large) language models or not, since there are so many misuses of it like doing essays or making false news.
But it looks like a really difficult problem, to decide whether a human-like sentence is really written by a human or a human-level AI (note that I don't think ChatGPT is perfect at all - just it works very well on certain tasks).

In [this paper](https://arxiv.org/abs/2301.10226v1), the authors suggest a way to *watermark* large language models.
In other words, they suggested an algorithm to embed hidden messages in a generated text that is not visible to humans but algorithmically detectable from a short span of words.
