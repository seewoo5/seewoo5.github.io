---
layout: posts
title:  "Curve with constant acceleration is planar"
date:   2022-10-25
categories: jekyll update
tags: math
---

I'm doing TA for multivariable calculus this semester.
I gave the following exercise in discussion sections:

> **Exercise.** Show that the curve with parametric equation $x(t) = t^2 - 1$, $y(t) = -t + 1$, $z(t) = -t^2 + t + 1$ lies on a plane. Find an equation of the plane.

When I saw this exercise, I realized that the parametrizations are all quadratic functions in $t$ so that the acceration should be a constant vector.
Based on the observation I come up with the following problem:

> **Problem.** Let $\mathbf{r}: \mathbb{R} \to \mathbb{R}^3$ be a space curve with constant acceleration, i.e. $\mathbf{r}^{\prime\prime}(t) =: \mathbf{a}$ is a constant vector. Prove that $\mathbf{r}(t)$ is a plane curve, i.e. it lies on some fixed plane in $\mathbb{R}^3$.

(I found that this is essentially the *Problem Plus* 9 in Chapter 13 of the Thomas' Calculus, although the description is slightly different.)
I gave this as a challenge problem with a cup of coffee as a reward, and one student gave a correct answer to this.
In this post, I'm going to introduce to solutions for this question.
(Take some time to try this problem before you scroll down.)

### Solution 1 (with linear algebra)

Since the acceleration is a constant vector, $\mathbf{r}'(t)$ is a linear function in $t$, so that $\mathbf{r}(t)$ is a quadratic function in $t$. In other words, we have

$$
\mathbf{r}(t) = (x(t), y(t), z(t)) =  (a_1 t^2 + b_1 t + c_1, a_2 t^2 + b_2 t + c_2, a_3 t^2 + b_3 t + c_3)
$$

for some $a_i, b_i, c_i \in \mathbb{R}$ ($i =1, 2, 3$).
Now, if we can find $\alpha, \beta, \gamma, \delta \in \mathbb{R}$ where at least one of them is nonzero and $\alpha x(t) + \beta y(t) + \gamma z(t) + \delta = 0$ for all $t$, it means that the curve is on the plane with equation $\alpha x + \beta y + \gamma z + \delta = 0$.
In terms of the coefficients $a_i, b_i, c_i$, we can write it as a matrix equation

$$
\begin{bmatrix}
a_1 & a_2 & a_3 & 1 \\
b_1 & b_2 & b_3 & 1 \\
c_1 & c_2 & c_3 & 1 \\
\end{bmatrix} \begin{bmatrix} \alpha \\ \beta \\ \gamma \\ \delta \end{bmatrix} = \begin{bmatrix}
0 \\ 0 \\ 0\end{bmatrix}
$$

and this should have a non-zero solution since the matrix has rectangular shape with 4 columns and 3 rows.
This shows the existence of a plane that contains the curve.

### Solution 2 (without linear algebra)

This is my solution that does not require any linear algebra and more differential-geometric.
Here's an idea - if we already know that the curve is planar, how can we represent the normal vector for the plane in terms of $\mathbf{r}(t)$?
If the curve is planar, then the tangent vectors $\mathbf{r}'(t)$ would be in the plane, and so is the acceleration vector $\mathbf{a} = \mathbf{r}^{\prime\prime}(t)$.
Hence if two vectors $\mathbf{r}'(t)$ and $\mathbf{a}$ are not parallel, a normal vector of the plane could be

$$
\mathbf{n} = \frac{\mathbf{r}'(t) \times \mathbf{a}}{|\mathbf{r}'(t) \times \mathbf{a}|}
$$

Also, if we know a normal vector, than we can write an equation of the plane as $(\mathbf{x} - \mathbf{r}(t_0)) \cdot \mathbf{n} = 0$ for a fixed $t_0$.

Based on the observation, we'll prove the following lemma. Also, we'll assume that $\mathbf{a} = \mathbf{0}$, otherwise it would be a line or a single point (if a particle is moving with zero acceleration, it is moving with a constant velocity) and the statement follows easilly.

> **Lemma 1** Assume that $\mathbf{r}^{\prime\prime}(t)=:\mathbf{a} \neq \mathbf{0}$ is a constant vector. If $\mathbf{r}'(t_1) \times \mathbf{a} = \mathbf{0}$ for some $t_1$, then $\mathbf{r}'(t) \times \mathbf{a} = \mathbf{0}$ for all $t$, and $\mathbf{r}(t)$ is a half-line in $\mathbb{R}^3$.

*Proof.* Since $\mathbf{r}^{\prime\prime}(t) = \mathbf{a}$, $\mathbf{r}'(t) = t\mathbf{a} + \mathbf{b}_1$ for some $\mathbf{b}_1 \in \mathbb{R}^3$.
Since $\mathbf{r}'(t) \times \mathbf{a} = (t\mathbf{a} + \mathbf{b}_1) \times \mathbf{a} = \mathbf{b}_1 \times \mathbf{a}$, we have $\mathbf{b}_1 \times \mathbf{a} = \mathbf{0}$ and so $\mathbf{b}_1 = c\mathbf{a}$ for some $c \in \mathbb{R}$.
This gives $\mathbf{r}'(t) = (t + c) \mathbf{a}$, so $\mathbf{r}(t) = \frac{1}{2}(t+c)^2 \mathbf{a} + \mathbf{b}_2$ for some $\mathbf{b}_2 \in \mathbb{R}^3$.
This represents a half-line with an end-point $\mathbf{b}_2$.

> **Lemma 2** Assume that $\mathbf{r}'(t) \times \mathbf{a} \neq \mathbf{0}$ for all $t$.
> Then $\mathbf{n}(t):= \frac{\mathbf{r}'(t) \times \mathbf{a}}{|\mathbf{r}'(t) \times \mathbf{a}|}$ is a constant vector.

*Proof.*
The derivative of $\mathbf{n}(t)$ is

$$
\begin{align*}
\mathbf{n}'(t) = \frac{(\mathbf{r}''(t) \times \mathbf{a})|\mathbf{r}'(t) \times \mathbf{a}| - (\mathbf{r}'(t) \times \mathbf{a}) \frac{(\mathbf{r}'(t) \times \mathbf{a})\cdot (\mathbf{r}''(t) \times \mathbf{a})}{|\mathbf{r}'(t) \times \mathbf{a}|}}{|\mathbf{r}'(t) \times \mathbf{a}|^2}
\end{align*}
$$

and this is identically zero since $\mathbf{r}^{\prime\prime}(t) =\mathbf{a} \Rightarrow \mathbf{r}^{\prime\prime}(t) \times \mathbf{a} = \mathbf{0}$.
Hence $\mathbf{n}(t)$ is a constant vector.

> **Lemma 3** Let $f(t):= (\mathbf{r}(t) - \mathbf{r}(t_0)) \cdot \mathbf{n}$ for some fixed $t_0$ and $\mathbf{n}$ is the contant vector in Lemma 1. Then $f(t) \equiv 0$.

*Proof.*
We have $f(t_0) = 0$. Also, 

$$
f'(t) = \mathbf{r}'(t) \cdot \mathbf{n} = \frac{\mathbf{r}'(t) \cdot (\mathbf{r}'(t) \times \mathbf{a})}{|\mathbf{r}'(t) \times \mathbf{a}|} = \mathbf{0},
$$

so $f(t)$ is a constant function.

From the above lemmas, we can conclude as follows.
We can assume $\mathbf{a} \neq 0$. If $\mathbf{r}'(t) \times \mathbf{a} =\mathbf{0}$ for some $t$, then by the Lemma 1 $\mathbf{r}(t)$ represents a half-line which is planar.
If $\mathbf{r}'(t) \times \mathbf{a} \neq \mathbf{0}$ for all $t$, then the Lemma 2 and 3 shows that the curve $\mathbf{r}(t)$ lies in the plane $(\mathbf{x} - \mathbf{r}(t_0)) \cdot \mathbf{n} = \mathbf{0}$.
