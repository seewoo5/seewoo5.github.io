---
layout: posts
title:  "Kazhdan-Lusztig Polynomials"
date:   2024-07-14
categories: jekyll update
tags: math
---

The goal of this post is to introduce [Kazhdan-Lusztig polynomials](https://en.wikipedia.org/wiki/Kazhdan%E2%80%93Lusztig_polynomial) and its connection to perverse sheaves.
It can be one of the pioneering example of geometric representation theory, which I learned very recently.
I'm very beginner of the subject and will try to explain as easy as possible, so that the readers who are not familiar with perverse sheaves (including myself) can understand the history.
This post is based on the several references including

* Jim Humphrey's book "Representation of Semisimple Lie Algebra in the BGG category $\mathcal{O}$" (and also his other Lie algebra book)
* Peng Shan's [presentation file](http://www.math.ac.cn/xshd/sxsjz/201902/W020190312493255635326.pdf) on Hecke algebra (and the talk at the [SLMath summer school](https://www.slmath.org/summer-schools/1072) too!)
* Yi Sun's [note](https://yisun.io/notes/klconj.pdf) on perverse sheaves and Kazhdan-Lusztig conjectures
* Mark Andrea de Cataldo and Luca Migliorini's AMS article "What is... a perverse sheaf?" and their [survey article](https://arxiv.org/abs/0712.0349)
* Paul Garrett's [note](https://www-users.cse.umn.edu/~garrett/m/lie/hc_isomorphism.pdf) on Verma modules and Harish-Chandra morphism for $\mathfrak{sl}\_{2}$ and $\mathfrak{sl}\_{3}$
* Yiannis Sakellaridis' [note](https://math.jhu.edu/~sakellar/automorphic-files/vermamodules.pdf) on Verma module


### Finite dimensional epresentations of semisimple Lie algebra

Let $\mathfrak{g}$ be a complex *semisimple* Lie algebra[^1].
Our goal is to understand representations of $\mathfrak{g}$.
By [Weyl's complete reducibility theorem](https://seewoo5.github.io/jekyll/update/2024/07/05/weyl-reducibility.html), we know that any finite dimensional representation of $\mathfrak{g}$ decomposes into irreducibles.
Hence it is enough to study irreducible representations.
These can be understood by *highest weight* as follows:

> **Definition.** Let $\mathfrak{h} \subset \mathfrak{g}$ be the Cartan subalgebra and $\Phi \subset \mathfrak{h}^\ast$ be a root system of $\mathfrak{g}$ (i.e. "eigenvalues" of adjoint representation $\mathrm{ad}: \mathfrak{g} \to \mathfrak{gl}(\mathfrak{g})$). Choose a subset $\Phi^+ \subset \Phi$ of positive roots. There exists a nondegenerate bilinear form $\langle -, -\rangle: \mathfrak{h}^\ast \times \mathfrak{h}^\ast \to \mathbb{C}$ (dual of Killing form).
> An element $\lambda \in \mathfrak{h}^\ast$ is called
> - **integral** if $$ 2 \frac{\langle \lambda, \alpha\rangle}{\langle \alpha, \alpha \rangle} $$ is integer for all $\alpha \in R$
> - **dominant** if $\langle \lambda, \alpha\rangle \geq 0$ for all $\alpha \in R^+$.
> 
> We also give a partial order $\lambda \geq \mu$ on $\mathfrak{h}^\ast$ when $\lambda - \mu$ can be written as a nonnegative integer combination of positive roots.


> **Definition.** A weight $\lambda$ of a representation $V$ of $\mathfrak{g}$ is called the **highest weight** if $\lambda \geq \mu$ for any other weights $\mu$ of $V$.


> **Theorem.** 
> 1. Any finite dimensional irreducible reprsentation $V$ of $\mathfrak{g}$ has a unique highest weight that is integral and dominant.
> 2. Two finite dimensional irreducible representations are isomorphic if their highest weights are the same.
> 3. For each integral dominant $\lambda \in \mathfrak{h}^\ast$, there exists a finite dimensional representation of highest weight $\lambda$.
>
> In other words, we have a bijection between the set of integral dominant elements in $\mathfrak{h}^\ast$ and the finite dimensional irreducible representations of $\mathfrak{g}$ (up to isomorphism).


The most basic but also the most important example is $\mathfrak{g} = \mathfrak{sl}\_{2}$.
It has dimension $3$ (traceless 2 by 2 matrices) and we have a famous basis called $\mathfrak{sl}\_{2}$-triples:

$$
e = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad f = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \quad h = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
$$

which satisfy the famous relations

$$
[h, e] = 2e, \quad [h, f] = -2f, \quad [e, f] = h.
$$

From this and $\mathfrak{h}^\ast \simeq \mathbb{C}$, one can show that highest weights of finite dimensional representations are nonnegative integers, and for each $\lambda \in \mathbb{Z}\_{\geq 0}$, there exists a unique irreducible representation $L(\lambda)$ of highest weight $\lambda$ (from the theorem above).
First few of them are

$$
\begin{align*}
    L(0) &= \mathbb{C}\quad (\text{trivial}) \\
    L(1) &= \mathrm{std}\quad (\text{standard}) \\
    L(2) &= \mathrm{ad}\quad (\text{adjoint}) \\
\end{align*}
$$

and more generally, one can construct $L(\lambda)$ as a symmetric power of standard representation $\mathrm{Sym}^{\lambda} (\mathrm{std})$.
You can check that there are no other finite dimensional irreducible representations - any such a representation should have an integer highest weight.

For general $\mathfrak{g}$ and $\lambda$, how can we *understand* $L(\lambda)$?
One might ask multiplicities of its weight spaces, $\dim L(\lambda)\_{\mu}$, where

$$
L(\lambda)_{\mu} = \{v \in L(\lambda): hv = \mu(h)v\,\forall h \in \mathfrak{h}\}.
$$

It is often convenient to define the *formal character* of a representation $M$ as

$$
\mathrm{ch}(M) := \sum_{\mu \in \Lambda } (\dim M_{\mu}) e(\mu)
$$

as a $\mathbb{Z}$-valued function on $\Lambda$, where $e(\mu)$ is a symbol associated to each $\mu \in \Lambda$ (delta function) and $\Lambda \subset \mathfrak{h}^{\ast}$ is the root lattice of $\mathfrak{g}$.
It has a natural convolution product with $e(\mu) \ast e(\mu') = e(\mu + \mu')$.
Define 

$$
\begin{align*}
p(\mu) &:= \# \{(c_{\alpha})_{\alpha > 0} \in \mathbb{Z}_{>0}^{\Lambda^{+}}: -\sum_{\alpha > 0} c_{\alpha} \alpha = \mu\} \\
q &:= \prod_{\alpha > 0} (e(\alpha / 2) - e(-\alpha / 2)) = e(\rho) \ast \prod_{\alpha > 0} (e(0) - e(-\alpha)).
\end{align*}
$$

The first function $p$ is called as *Kostant function*.
Then we have the following neat formulas for $\mathrm{ch}(L(\lambda))$.

> **Theorem.**
> Weyl's character formula gives
>
> $$
> q \ast \mathrm{ch}(L(\lambda)) = \sum_{w \in W} (-1)^{\ell(w)} e(w(\lambda + \rho)).
> $$
> 
> As a corollary, we have  a Kostant's formula
>
> $$
> \dim L(\lambda)_{\mu} = \sum_{w\in W}(-1)^{\ell(w)} p(\rho - w \bullet \lambda).
> $$

Note that this is for *finite dimensional* representations. Also, the above formula is not suitable for computations because the size of $W$ is often big: for example, the order of the Weyl group of $E_{8}$ is $2^{14} 3^{5} 5^{2} 7 = 696729600$.


### Verma modules and category $\mathcal{O}$


Now we have two natural questions to ask.
The first one is how to *construct* $L(\lambda)$ for given integral dominant $\lambda$, and the second is how to compute the character of *infinite* dimensional representations.
To do this, we will define *Verma module* and use it to construct (finite dimensional) irreducible representations $L(\lambda)$, and compute is character even when $\dim L(\lambda) = \infty$.

*Verma module* is a *universal object* for a given highest weight $\lambda$, which we will denote as $M(\lambda)$.
It satisfies the following universal property: for a Borel subalgebra $\mathfrak{b} \subset \mathfrak{g}$ and view Cartan algebra $\mathfrak{h}$ as a quotient of $\mathfrak{b}$, $M(\lambda)$ is a $\mathfrak{g}$-module satisfying

$$
\mathrm{Hom}_{\mathfrak{g}}(M(\lambda), V) \simeq \mathrm{Hom}_{\mathfrak{b}}(\mathbb{C}_{\lambda}, V|_{\mathfrak{b}})
$$

where $\mathbb{C}\_{\lambda}$ is the one-dimensional representation where $\mathfrak{b}$ acts by $\lambda$. By hom-tensor adjunction, we can take

$$
M(\lambda) = \mathcal{U}(\mathfrak{g}) \otimes_{\mathcal{U}(\mathfrak{b})} \mathbb{C}_{\lambda} = \mathcal{U}(\mathfrak{n}_{-}) \otimes_{\mathbb{C}} \mathbb{C}_{\lambda}
$$

where $\mathfrak{n}\_{-}$ is the nilpotent radical of the opposite Borel $\mathfrak{b}\_{-}$ of $\mathfrak{b}$ (second equality follows from Poincaré-Birkhoff-Witt theorem).
Especially, Verma modules are certainly *infinite* dimensional representations.
From these, we can obtain the finite irreducible representations $L(\lambda)$ as follows.

> **Definition.** *Weyl vector* is the half-sum of positive roots $\rho := \frac{1}{2} \sum_{\alpha \in \Phi^{+}} \alpha$. Define *dot action* of Weyl group $W$ on $\mathfrak{h}^{\ast}$ as $w \bullet \lambda := w(\lambda + \rho) - \rho$.

> **Theorem.** Let $\lambda \in \mathfrak{h}^{\ast}$ be an integral dominant weight. Then the following is the unique finite dimensional quotient of the Verma module $M(\lambda)$ (which is $L(\lambda)$):
>
> $$
> M(\lambda) \Bigg/ \left( \sum_{\alpha \in \Delta^+} M(s_{\alpha} \bullet \lambda)\right)
> $$
>
> where the sum is over simple positive roots $\Delta^+ \subset \Phi^+$.

In case of $\mathfrak{sl}\_{2}$, the Weyl group is $\\{1, w\\} \simeq S_{2}$ and the unique nontrivial element is the reflection associated to $\alpha = 2$, which is simply $\lambda \mapsto -\lambda$.
Hence the corresponding dot action is $w \bullet \lambda = -(\lambda + 1) - 1 = - \lambda - 2$, and we have

$$
L(\lambda) = M(\lambda) / M(-\lambda - 2)
$$

for $\lambda \in \mathbb{Z}\_{\geq 0}$. Especially, it has weights $\lambda, \lambda - 2, \cdots, - \lambda + 2, -\lambda$ with multiplicity 1 for each.

One can ask what is the "nice" category of $\mathfrak{g}$-modules that contains all Verma modules and have some finiteness properties / well-suited to do some homological algebra.
*The* answer is Bernstein-Gelfand-Gelfand's category $\mathcal{O}$, which is defined as follows:

> **Definition.** Category $\mathcal{O}$ of a semisimple Lie algebra $\mathfrak{g}$ is a category of $\mathfrak{g}$-modules whose objects $M$ are 
> 
> 1. Finitely generated $\mathcal{U}(\mathfrak{g})$-modules,
> 2. $\mathfrak{h}$-semisimple, i.e. admits a weight space decomposition, $M = \oplus\_{\lambda \in \mathfrak{h}^{\ast}} M_{\lambda}$,
> 3. Locally $\mathfrak{n}$-finite, i.e. for each $v \in M$, $\mathcal{U}(\mathfrak{n})v$ is finite dimensional.

This category containes all the finite dimensional representations and Verma modules.
Also, it satisfy nice properties such as:

* $\mathcal{O}$ is an abelian cateogory.
* $\mathcal{O}$ is Noetherian and Artinian. Especially, any $M \in \mathcal{O}$ admits a composition series of finite length (but $\mathcal{O}$ is not semisimple).
* For $M \in \mathcal{O}$ and a finite dimensional representation $N$, $M \otimes N$ is again in $\mathcal{O}$, and it defines an exact functor $- \otimes N$.
* Has enough projectives and injectives.


You can also check [this](https://mathoverflow.net/questions/64931/why-the-bgg-category-o) MO question and the answers explaining *why* the BGG category $\mathcal{O}$ is the right thing to study.

Now consider the action of the center $\mathcal{Z}(\mathfrak{g}) := \mathcal{Z}(\mathcal{U}(\mathfrak{g}))$ of the universal enveloping algebra. For any highest weight module with highest weight $\lambda \in \mathfrak{h}^{\ast}$, the center acts as a scalar on $M_{\lambda}$ and we get a corresponding character $\chi\_{\lambda}: \mathcal{Z}(\mathfrak{g}) \to \mathbb{C}^{\times}$ which we call as a *central character* associated with $\lambda$.
It is known that two central character $\chi\_{\lambda}$ and $\chi\_{\mu}$ are equal if $\lambda$ and $\mu$ are in a same $W$-orbit *under the dot action*, and any central character can be obtained in this way.
In other words, there's a bijection between the set of central characters and the complex points of the "quotient" $\mathfrak{h}^{\ast} / W\_{\bullet}$ (in an appropriate sense - so-called GIT quotient).
Now, define $\mathcal{O}\_{\chi} \subset \mathcal{O}$ to be the subcategory of $\mathfrak{g}$-modules which are generalized eigenspaces of $\mathcal{Z}(\mathfrak{g})$ with (generalized) eigencharacter $\chi$, i.e. $M \in \mathcal{O}\_{\chi}$ if and only if

$$
\forall v \in M, \exists n \gg 0\text{ such that }(z - \chi(z))^{n}v = 0.
$$

Then $\mathcal{O}$ decomposes into these subcategories: any $M \in \mathcal{O}$ decomposes as $M \simeq \oplus\_{\chi} M^{\chi}$ for $M^{\chi} \in \mathcal{O}\_{\chi}$.
Hence each indecomposable module should lie in a unique $\mathcal{O}\_{\chi}$, and especially a highest weight module $M$ for $\lambda \in \mathfrak{h}^{\ast}$ lies in $\mathcal{O}\_{\chi\_{\lambda}}$.
These $\mathcal{O}\_{\chi}$ are called *blocks*, and the special one $\mathcal{O}\_{0} := \mathcal{O}\_{\chi_{0}}$ corresponds to $0 \in \mathfrak{h}^{\ast}$ is called the *principal block*.


Let's get back to our second question.
To compute character of $L(\lambda)$, we can

1. Compute character of Verma modules $\mathrm{ch} (M(\mu))$,
2. Express $\mathrm{ch}(L(\lambda))$ as a combination of $\mathrm{ch}(M(\mu))$, which is equivalent to compute multiplicities $[M(\mu): L(\lambda)]$ (by "inverting" the formula).

Luckily, it is quite easy to compute characters of Verma modules.

> **Theorem.** For $\lambda \in \mathfrak{h}^{\ast}$, $\mathrm{ch} (M(\lambda)) = p \ast e(\lambda)$. Especially, $\mathrm{ch}(M(0)) = p$.

See [Humphreys, 1.16] for the proof. Hence we only need to know how to compute multiplicities of simples in Verma modules.

### (Iwahori-)Hecke algebra and Kazhdan-Lusztig polynomials

In case of $\mathfrak{sl}\_{2}$, we already know the answer: we have

$$
M(-\lambda - 2) = L(-\lambda - 2)
$$

(it is irreducible) and 

$$
L(\lambda) = M(\lambda) / M(-\lambda - 2) = M(\lambda) / L(-\lambda - 2)
$$

for $\lambda \geq 0$. Hence each $L(\lambda)$ and $L(-\lambda - 2)$ appear with multiplicity one, i.e.

$$
[M(\lambda): L(\lambda)] = [M(\lambda): L(-\lambda-2)] = 1.
$$

But this is not easy to answer for general $\mathfrak{g}$ and weights.
To make a problem more accessible, we will concentrate on the principal block $\mathcal{O}\_{0}$.
Note that such reduction can be done via *translation functors* $T\_{\lambda}^{\mu} : \mathcal{O}\_{\chi_{\lambda}} \to \mathcal{O}\_{\chi_{\mu}}$ which relates two different blocks (see Chapter 7 of Humphrey's BGG book for details).
In this case, Verma modules and simple modules are parametrized by elements of $W$ as $M_{w} = M(w \bullet 0)$ and $L_{w} = L(w \bullet 0)$.
Then our goal is to compute $[M\_{w}: L\_{y}]$ for $y, w \in W$, which is nonzero if and only if $y \leq w$ under the *Bruhat order*.

To give an answer proposed by Kazhdan-Lusztig (and proved later by others), one needs to define (Iwahori-)Hecke algebra first.
Although it can be defined for arbitrary [Coxeter system](https://en.wikipedia.org/wiki/Coxeter_group), we will focus on the Weyl group case.
Hecke algebra $\mathcal{H} = \mathcal{H}(W, S)$ is an (noncommutative) algebra over a polynomial ring $\mathbb{Z}[v^{\pm 1}]$ generated by variables $H_{s}$ for each simple reflection $s = s_{\alpha} \in S$ with relations

$$
\begin{align*}
H_{s}H_{t}H_{s} \cdots &= H_{t}H_{s}H_{t} \cdots (\text{for }sts\cdots = tst \cdots) \\
(H_{s} + v)(H_{s} - v^{-1}) &= 0 \Leftrightarrow H_{s}^{2} + (v - v^{-1})H_{s} - 1 = 0
\end{align*}
$$

where the first relations corresponds to the relation defining $W$ as a Coxeter system - for all simple reflections $s, t \in S$, there exists $m_{s, t}\geq 1$ such that $(st)^{m_{st}} = 1 \Leftrightarrow sts \cdots = tst \cdots$ ($m_{st}$ terms on both sides).
By definition, it is a *deformation* of the group algebra $\mathbb{Z}[W]$, where we recover it from $\mathcal{H}(W, S)$ by taking $v = 1$.
Also, for each $x \in W$, choose a reduced expression $x = s_1 s_2 \cdots s_r$ and define

$$
H_{x} = H_{s_1} H_{s_2} \cdots H_{s_r} \in \mathcal{H}
$$

then $H_{x}$ is independent of the choices of reduced expression, and $\mathcal{H}$ becomes a free $\mathbb{Z}[v^{\pm 1}]$-module with basis $\\{H\_{x}\\}\_{x \in W}$. 
Also, from exchange relation, we have

$$
H_{x} H_{s} = \begin{cases} H_{xs} & x < xs \\ H_{xs} + (v^{-1} - v)H_{x} & x > xs\end{cases}
$$

for $x \in W$ and $s \in S$.

One might ask why we should define $\mathcal{H}$ in this way - weird deformation of $\mathbb{Z}[W]$ - and one answer is that, after tensoring with $\mathbb{C}$, the algebra becomes isomorphic to the another Hecke algebra

$$\mathcal{H}(G, B) := k[B(\mathbb{F}_{q}) \backslash G(\mathbb{F}_{q}) / B(\mathbb{F}_{q})]$$

of $k$-valued $B(\mathbb{F}\_{q})$-bi-invariant functions on $G(\mathbb{F}\_{q})$, where $G$ is a reductive group and $B$ is a Borel subgroup, and the multiplication is given by the convolution product

$$
(f \ast g)(z) := \frac{1}{\# B(\mathbb{F}_{q})} \sum_{xy = z} f(x)g(y).
$$

More precisely, consider the Bruhat decomposition

$$
G = \coprod_{w \in W} BwB
$$

where $w \in W$ is regarded as an element of $G$. The *Bruhat cell* $BwB$ is independent of the choice of the representative of $w$ in $G$.
If we define $T_{w} := \mathbf{1}\_{BwB}$ to be the characteristic function, then we have an isomorphism

$$
\mathcal{H}(G, B) \simeq \mathcal{H}(W, S) \otimes_{\mathbb{Z}} k_{v = q^{-1/2}}, \quad T_{w} \mapsto v^{-\ell(w)} H_{w}.
$$


Define *bar involution* on $\mathcal{H}(W, S)$ as

$$
\overline{v} = v^{-1}, \quad \overline{H}_{s} = H_{s}^{-1},\, s \in S \Rightarrow \overline{H}_{x} = H_{x^{-1}}^{-1}
$$

which is a well-defined ring homomorphism on $\mathcal{H}$.
Then Kazhdan-Lusztig proved that there exists a very special basis of $\mathcal{H}$.

> **Theorem.** (Kazhdan-Lusztig) There exists a unique $\mathbb{Z}[v^{\pm 1}]$-basis $\\{C_{w}\\}_{w \in W}$ such that
>
> 1. (Self-duality) $\overline{C_{w}} = C_{w}$
> 2. (Bruhat upper triangularity) $C_{w} = H_{w} + \sum_{y < w} P_{y, w} H_{y}$ for $P_{y, w} \in v \mathbb{Z}[v]$.

The proof is constructive and gives an algorithm to define $C_{w}$ inductively.
Now we are ready to state Kazhdan-Lusztig conjectures:

> **Theorem.** (Kazhdan-Lusztig, Beilinson-Bernstein, Brylinski-Kashiwara, Elias-Williamson) Let $y, w \in W$ with $y \leq w$ and $w_{0} \in W$ be the longest element.
>
> 1. (Positivity) Coefficients of the Kazhdan-Lusztig polynomials $P_{y, w}(v)$ are positive.
> 2. (Multiplicity) Multiplicity of $L_{y}$ in $M_{w}$ is given by
>
> $$
    [M_{w}: L_{y}] = P_{yw_{0}, ww_{0}}(1).
> $$


### Perverse sheaves


This conjecture looks quite random.
We defined an algebra that is a certain deformation of a group ring $\mathbb{Z}[W]$, and construct a special basis of it.
Now it suddenly gives an answer to our question. How is it possible?
How can we *prove* the Kazhdan-Lusztig conjecture(s)?

Positivity conjecture is resolved by themselves in 1980, and the multiplicity conjecture (or character formula) is resolved independently by Beilinson-Bernstein and Brylinski-Kashiwara in 1981.
The proposed solutions are *geometric* in nature, and this is often regarded as a one of the most important result in *geometric representation theory*.

The positivity conjecture follows from the formula:

$$
P_{y, w}(q) = \sum_{i} \dim \mathrm{IH}^{2i}_{X_{y}} (\overline{X_{w}}) q^i
$$

where $\mathrm{IH}^{\bullet}$ is the cohomology of *intersection complex* (which is a perverse sheaf), $X_{w} = BwB / B \subset G / B$ is a locally closed subvariety of the flag variety $G / B$, where $BwB \subset G$ is a Bruhat cell of $w \in W$.
Then the nonnegativity conjecture follows directly - dimensions are nonnegative quantities.

Let me try to explain perverse sheaves and intersection complexes as easy as possible (I don't fully understand all the details too!).
For a complex algebraic variety $X$, we have a *category of sheaves* of $k$-vector spaces $\mathrm{Sh}(X) = \mathrm{Sh}(X, k)$, which is an abelian category.
Now, "better" category to do homological algebra is *derived* category of sheaves, which is roughly

$$
D_{c}^{b}(X) := \{\mathcal{F} = (\cdots  \to \mathcal{F}^{i}  \to \cdots)\text{ such that ...}\} / (\mathcal{F} \sim \mathcal{G}\text{ if }\mathcal{H}^{\bullet} \mathcal{F} \simeq \mathcal{H}^{\bullet}\mathcal{G}).
$$

More precisely,

1. Consider the category of *(cochain) complexes* of sheaves (not just each sheaf itself).
2. Two complexes are considered to be isomorphic if their cohomologies are. In other words, we *inverte quasi-isomorphisms* in the category of complexes.
3. We only consider complexes with certain assumptions: *constructible* ($X$ can be written as a finite union of locally closed pieces where $\mathcal{H}^{i}\mathcal{F}$ is locally constant) and *bounded* ($\mathcal{H}^{i}\mathcal{F} = 0$ for $\|i\| \gg 0$).

For a morphism $f : X \to Y$, we have four *derived* functors between $D_{c}^{b}(X)$ and $D_{c}^{b}(Y)$ associated with it: pushforward ($f_{\ast}$), proper pushforward ($f_{!}$), pullback ($f^{\ast}$), and proper pullback ($f^{!}$):

$$
f_{\ast}, f_{!}: D_{c}^{b}(X) \longleftrightarrow D_{c}^{b}(Y) : f^{\ast}, f^{!}
$$

and along with *derived* hom and tensors $\mathrm{RHom}$ and $\otimes^{\mathbb{L}}$, they form a special family of functors, fitting into the *six-functor formalism*.
We also have a *(Verdier) duality functor* $\mathbb{D}: D_{c}^{b}(X) \to D_{c}^{b}(X)$ which is an involution ($\mathbb{D}^{2} = \mathrm{id}$) and exchanges "star" and "shriek" ($\mathbb{D}f_{!} = f_{\ast} \mathbb{D}$ and $\mathbb{D}f^{!} = f^{\ast}\mathbb{D}$).

The slogan for *perverse sheaves* (brought from de Cataldo and Migliorini's article) is the following: *perverse sheaves are singular version of the local systems*.
Especially, they are useful object for studying *singular* varieties.
Formal definition of them is the following: we first define *perverse $t$-structure* on $D_{c}^{b}(X)$ ($t$ means truncation)




The positivity conjecture is proved for general Coxeter systems by Elias and Williamson in [their paper](https://annals.math.princeton.edu/2014/180-3/p06) on Hodge theory of Soergel bimodules. 
Note that we don't have any geometric playground like flag varieties and Bruhat cells anymore.
It worths to note that there's no known purely combinatorial proof of the positivity conjecture yet.

Multiplicity conjecture essentially follows from the following theorem: we have an isomorphism

$$
K_{0}(\mathcal{O}_{0}) \simeq \mathcal{H}(W, S)|_{v = 1}
$$

### Kazhdan-Lusztig polynomials for matroids

I may end with introducing another version of Kazhdan-Lusztig polynomials that appear in combinatories.
Elias, Proudfoot, and Wakefield [defined KL polynomials for *matroids*](https://arxiv.org/pdf/1412.7408), recursively using characteristic polynomials.
They conjectured that, like as the original KL polynomials, these new KL polynomials for matroids also have nonnegative coefficients.
They proved the conjecture for realizable matroids (over finite fields) by proving that the polynomials equal to the $\ell$-adic étale intersection cohomology Poincaré polynomial of the reciprocal plane.
This conjecture is recently proved by [Braden-Huh-Matherne-Proudfoot-Wang](https://web.math.princeton.edu/~huh/SingularHodge.pdf) via introducing intersection cohomology theory for matroids.
Moreover, they proved that their cohomology satisfies the Kähler package, i.e. Poincaré duality, hard Lefschetz, and Hodge-Riemann relations.
As a corollary, not only proving the conjecture of Elias-Proudfoot-Wakefield, they prove *unimodularity* of coefficients of "Z-polynomials".
You can find more detailed explanations in [this lecture video by June Huh](https://www.youtube.com/live/kQYTp0Y9wFU?si=gccC1GdjFvI1Ez2C).


[^1]: I believe everything mentioned works well over any algebraically closed field of characteristic zero, at least for the representations of semisimple Lie algebras.

