---
layout: posts
title:  "Offline translator using huggingface"
date:   2023-01-13
categories: jekyll update
tags: machine-learning development
---

I'm reading a French paper by Jacquet on the proof of Waldspurger's formula using Relative Trace Formula.
Since I'm completely new to the French, I'm reading a paper with help of Google translator.
However, an issue with it is that I can't use it without internet connection.
Hence I write (actually not me, but ChatGPT does) a simple python script that translates a French sentence into an English sentence using a language model.
The method is simple: download the SOTA machine translation for French to English translation, and use it.

First, you need to install the following python packages using pip:
```sh
pip install transformers torch sentencepiece sacremoses
```
Then make a file named `translate.py` and put the following script in it:
```python
from transformers import pipeline


def load_tranlator():
    translator = pipeline('translation_fr_to_en', model='Helsinki-NLP/opus-mt-fr-en')
    return translator

def translate(text: str) -> str:
    translated_text = translator(text, max_length=4096)[0]["translation_text"]
    return translated_text


if __name__ == "__main__":
    translator = load_tranlator()
    while True:
        print("Enter a French sentence to translate: ")
        french_sentence = input()
        translated_sentence = translate(french_sentence)
        print("Translated:")
        print(translated_sentence)
        print("-" * 40)
```
This is a simple modification of a script written by ChatGPT. You can see that this code downloads a French-to-English machine translation model made by Helsinki NLP.
You only need to download the model once for the first time, whose size is about 300MB.

After that, simply enter `python translate.py` on a command line and you will see the following words.
```
> python translate.py
Enter a French sentence to translate:

```
As it says, just enter a sentence that you want to translate! Then it will be translated in a few seconds.
```
Enter a French sentence to translate: 
Un chat et un garcon
Translated:
A cat and a boy
----------------------------------------
Enter a French sentence to translate: 

```
You can do this as many time as you want.
Enter `CTRL + C` to exit.

Unfortulately, it does not work well for some sentences from the paper.
```
Enter a French sentence to translate: 
Soit F un corps local et E une extension quadratique de E 
Translated:
Be F a local body and E a quadratic extension of E
----------------------------------------
Enter a French sentence to translate: 

```
But it is okay since we know that *corps local* means *local field* in mathematics.
