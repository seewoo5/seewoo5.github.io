---
layout: posts
title:  "Fabling: Puzzles beyond Rubik's Cube with TeX"
date:   2026-07-09
categories: jekyll update
tags: ai programming
---


Anthropic's Fable 5 released (and got banned, and re-released). I wanted to do something interesting with it.

Here's the outcome: [`TeX-puzzles`](https://github.com/seewoo5/TeX-puzzles)

## What is this?

There's a TeX package [`rubikcube`](https://ctan.org/pkg/rubikcube) that allows you to draw a Rubik's cube in TeX.
The most interesting point of this package is that you can *rotate* the cube with usual Rubik's cube notations (like `R`, `U'`, etc.), and it will draw the cube after the rotation.
I used the package once when I was translating Colmez's note on Rubik's cube (see [here](https://seewoo5.github.io/math-notes/reTeXed/colmez_rubiks-cube/main.pdf)).

The above GitHub repository is a collection of LaTeX packages where you can draw and rotate twelve more permutation puzzles beyond Rubik's cube, including:

- Pocket cube (2 x 2 x 2)
- Pyraminx
- Master Pyraminx (4 x 4 version of Pyraminx)
- Professor Pyraminx (5 x 5 version of Pyraminx)
- Face-turning octahedron
- Baby Face-turning octahedron (2 x 2 version of Face-turning octahedron)
- Corner-turning octahedron
- Megaminx
- Gigaminx
- Skewb
- Square-1
- Dogic (both 1 and 2)

## Who made this?

Fable 5 with Claude Code CLI. Instruction was minimal: look at the `rubikcube` package and make a similar package for other puzzles. I didn't ask it to work on all the puzzles at once, but one by one.
I didn't write any single line of code.

The most surprising puzzles were Square-1 and Dogic. [Square-1](https://en.wikipedia.org/wiki/Square-1_(puzzle)) is a puzzle where there are invalid moves depending on the state of the puzzle. Also, its shape is not fixed. Fable decided to draw it by drawing top, middle, and bottom layers separately. 

Here's a sample image from the example pdf:

<p align="center">
<img src="/assets/images/tex-puzzles-square-1.png">
</p>

The corresponding code is:

```latex
\begin{center}
\SquareOneSolved
\SquareOneRotation{(1,1)/}%
\SqPair%
\SquareOneRotation{(3,0)/}%
\SqPair%
\SquareOneRotation{(3,0)/}%
\SqPair%
\SquareOneRotation{(1,0)/}%
\SqPair

\medskip

\SquareOneRotation{(0,2)/}%
\SqPair%
\SquareOneRotation{(4,0)/}%
\SqPair%
\SquareOneRotation{(2,0)/}%
\SqPair
\end{center}
```

[Dogic](https://en.wikipedia.org/wiki/Dogic) is an icosahedron puzzle, and there are two versions depending on how the colors (stickers) are arranged.
This is a puzzle that was discontinued in 2010, and now it is very hard to find.[^1]
In particular, there's no standard notation for Dogic, so I asked Fable to make up a notation.
I'm quite surprised that it decided to draw it as two "stars" (front and back), where I didn't give any guidance on how to draw it.

Here's a sample image from the example pdf:

<p align="center">
<img src="/assets/images/tex-puzzles-dogic.png">
</p>

The corresponding code is:

```latex
\begin{center}
\DogicSolved
\ShowDogic{4.4cm}{0.36}{\DrawDogicFront}%
\DogicRotation{U,up}%
\ShowDogic{4.4cm}{0.36}{\DrawDogicFront}%
\DogicRotation{Up,u}%
\ShowDogic{4.4cm}{0.36}{\DrawDogicFront}

\makebox[4.4cm]{\small solved}%
\makebox[4.4cm]{\small after $U\,u'$}%
\makebox[4.4cm]{\small after $U\,u'\,U'\,u$}
\end{center}

\begin{center}
\def\DogicLineWidth{0.35pt}%
\DogicSolved
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}%
\DogicRotation{R,U,Rp,Up}%
\ShowDogic{2.15cm}{0.21}{\DrawDogicFront}

\makebox[2.15cm]{\scriptsize $e$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^1$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^2$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^3$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^4$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^5$}%
\makebox[2.15cm]{\scriptsize $(RUR'U')^6$}
\end{center}
```

Do I *really* need Fable 5 to do this? I don't know, since I haven't tried with Claude Opus 4.8 or Codex 5.5. The only thing I know is that Fable 5 did the job.

## How?

Each puzzle has auxiliary python scripts that are used to generate the "Views" of `.sty` files.
The scripts also do some tests and verifications, including computation of the number of possible states of each puzzle.
Although I didn't fully understand the code, it seems that verification of large puzzles uses the [Schreier-Sims algorithm](https://en.wikipedia.org/wiki/Schreier%E2%80%93Sims_algorithm).

## Why?

Mostly for fun. But there's another reason.
To be continued...

[^1]: You can find this on eBay probably once a year. I have one, which I bought about 10 years ago.