---
layout: posts
title:  "Relative Langlands Duality summer school & workshop at UMN"
date:   2024-06-03
categories: jekyll update
tags: math
---

There was [Relative Langlands Duality summer school & workshop at University of Minnesota](https://cse.umn.edu/math/events/summer-school-and-workshop-relative-langlands-duality), which introduces the recent work by Ben-Zvi, Sakellaridis, and Venkatesh ([the huge paper](https://www.math.ias.edu/~akshay/research/BZSVpaperV1.pdf) called BZSV) and related works.
I got interest in the topic after I study Gan-Gross-Prasad and Ichino-Ikeda type problems and related topics.
In my understanding, **relative** Langlands duality can be summarized as

> Study Langlands functoriality and relate it to periods and special L-values

as a number theorist, not as a mathematical physicist.
As far as I know, we don't have nice arithmetic theory yet (we have arithmetic TQFT by Minhyong Kim, but they are not fully developed as much as geometric analogues).

I wrote summary of each summer school and (subset of) workshop talks, based on my own notes and [other's notes](https://sites.google.com/site/tsaohsienchen/home/summer-schools-and-workshops?authuser=0).
If there are anything wrong written below, it is due to my lack of understanding.

## Summer school

There were four mini lecture series covering four different (but strongly connected) topics in relative Langlands duality.

### 1. Relative Langlands Duality - A-side by Yiannis Sakellaridis

Yiannis Sakellaridis introduced the **A-side**, i.e. **Automorphic Side** of relative Langlands duality. He started his (and the summer school's) first lecture with drawing a turntable with A-side of an LP.

One of the main feature of relative Langlands program is that automorphic periods can be related to $L$-functions (or special $L$-values) on dual side.
More precisely, let $G$ be a reductive group and $H$ be a spherical subgroup.
Then $M = T^{\ast}(X) = T^{\ast}(H \backslash G)$ is a symplectic $G$-variety, and one can associate a *dual* symplectic variety $\check{M}$ with $\check{G}$-action on it.
The following well-known examples fit into this phenomena:

*Rankin-Selberg.* $H = \mathrm{GL}\_{n}$ is diagonally embedded into $G = \mathrm{GL}\_{n} \times \mathrm{GL}\_{n+1}$, and the dual space is $\check{M} = T^{\ast} (\mathrm{std}\_{n} \otimes \mathrm{std}\_{n+1})$. In this case, we have integral representation of $L$-function by Godment-Jacquet.

*Gan-Gross-Prasad.* $H = \mathrm{SO}\_{n}$ is diagonally embedded into $G = \mathrm{SO}\_{n} \times \mathrm{SO}\_{n+1}$, and the corresponding dual is the tensor product of two standard representation, $\check{M} = \mathrm{std}\_{n} \otimes \mathrm{std}\_{n}$.
In this case, we have Ichino-Ikeda conjecture of the form

$$
\left|\int_{[\Delta \mathrm{SO}_{n}]} \varphi(h) \mathrm{d}h\right|^{2} = L\left(\pi, \mathrm{std} \otimes \mathrm{std}, \frac{1}{2}\right)
$$

up to global constants and adjoint $L$-functions.

*Whittaker.* We have a unipotent group $N \subset G$ and a generic character $\psi: N \to \mathbb{C}^{\times}$, and $X = (N, \psi) \backslash G$. The dual is simply a point $\check{M} = \mathrm{pt}$ and the corresponding identity reduces to Lapid-Mao conjecture.

*Group case.* For $G = H \times H \supset H$ embeded diagonally, we have $X = H \backslash G \simeq H$. Then $\check{M} = T^{*}\check{H}$ and the corresponding $\check{G} = \check{H} \times \check{H}$ is not the naive action, but twisted by Chevalley involution.
In thia case, one expect equation of the form

$$
\int_{[H]} \varphi(h) \mathrm{d}h = \sum_{x} \sqrt{L(\pi, T_{x}\check{M})}
$$

where the sum is over certain fixed points on $\check{M}$, and the square root of L-function can be make sense using adjoint $L$-functions.

Under the duality, one expect *dual theorem* by swapping $M = T^{*}(H \backslash G)$ with its dual. In GGP case, the dual theorem of Ichino-Ikeda conjecture becomes Rallis inner product formula for theta correspondence.


### 2. Relative Langlands Duality - B-side by David Ben-Zvi

David Ben-Zvi introduced the other side of relative Langlands duality, which is **B-side** or **Spectral side** (or "B"alois side) - but actually he covered both sides later.

He stated relative Langlands as "studying the functoriality of Langlands correspondence".For a reductive group $G$ over some field $F$, one can consider the *automorphic theory* or *A-side* of $G$, namely $\mathcal{A}\_{G}$.
Langlands functoriality is essentially about studying relations of $\mathcal{A}\_{H}$ and $\mathcal{A}\_{G}$ for different groups $H$ and $G$. More precisely, we want to upgrade the assignment $G \leadsto \mathcal{A}\_{G}$ as a functor

$$
H \xrightarrow{M} G \quad \leadsto \quad \mathcal{A}_{H} \xrightarrow{\mathcal{A}_{M}} \mathcal{A}_{G}.
$$

Langlands program expect that automorphic theory for $G$ corresponds to a *spectral theory* for the dual group $\check{G}$ (over a coefficient field $k$), can be thought as algebraic geometry of Langlands parameters.. We denote this as $\mathcal{B}\_{\check{G}}$ for $B$-side.
One should also have a functoriality on spectral as well, and what we want is that the Langlands duality and funtorialities are compatible, i.e. roughly we have a commutative diagram

Now, what *are* $\mathcal{A}$ and $\mathcal{B}$? The model for this (in relative Langlands / BZSV) is 4-d TQFT.
Ben-Zvi didn't give any definitions of 4-d TQFT, but what he told us (which was enough for me) is the following: it assigns

* 3-manifold $\leadsto$ vector space,
* 2-manifold $\leadsto$ ($k$-linear) category,
* 1-manifold $\leadsto$ 2-category.

(He also mentioned that 4-manifold goes to a number in a base field, and I guess 0-manifold (point) maps to 3-category).

### 3. Relative Langlands Duality - Examples by Lei Zhang and Chen Wan

Lei Zhang and Chen Wan gave *a ton of examples* for relative Langlands duality.
In relative Langlands, we have a notion of **BZSV quadruple** 

$$
\Delta = (G, H, \iota, \rho_H)
$$

where $G$ is a (split) reductive group, $H$ is a (split) subgroup of $G$, $\rho_H$ is a symplectic representation of $H$, and $\iota: \mathrm{SL}_2 \to G$ is a homomorphism whose image commutes with $H$, so that it induces a map $\iota: H \times \mathrm{SL}_2 \to G$.

As we can associate Langlands dual group $\check{G}$ to a reductive group $G$, there exists a **dual quadruple**[^1]

$$
\check{\Delta} = (\check{G}, \check{H}', \check{\iota}', \rho_{\check{H}'})
$$

associated to $\Delta$.
Some of the important points are:

* $\check{H}'$ is *not* equal to $\check{H}$ in general, and it is a group associated to whole $\Delta$, not just $H$.
* Unlike Langlands dual group (defined as swappring root datum), we don't have a general systematic/algorithmic/combinatorial way to get $\check{\Delta}$ out of $\Delta$.

Now, the conjecture is that we have identities relating automorphic period of $\Delta$ (resp. $\check{\Delta}$) and certain $L$-values of $\check{\Delta}$ (resp. $\Delta$).


### 4. Mathematical definition of Coulomb branches and Ring objects in the derived Satake category by Hiraku Nakajima

This talk is also inclined to mathematical physics that I could not understand most of the things.
The first talk is to understand the meaning of the following equation, which is the equation (3.13) from Gaiotto and Witten's paper [$S$-Duality of Boundary Conditions in $\mathcal{N}=4$ Super Yang-Mills Theory](https://www.arxiv.org/abs/0807.3720)[^2]

$$
\mathcal{T}^\vee = (\mathcal{T} \times \mathcal{T}[G] \, \backslash\mkern-11mu /\!\!/\!\!/ G)^*
$$

where
* $G$ is a reductive group
* $\mathcal{T}$ is a 3D $\mathcal{N} = 4$ SQFT with $G$-symmetry ($\mathcal{T}$ for "T"heory)
* $\mathcal{T}[G]$ is a "kernel" 3D $\mathcal{N} = 4$ SQFT
* $\backslash\mkern-11mu /\mkern-6mu/ \mkern-6mu/$ is SUSY gauging
* $*$ is 3D mirror

## Workshop

There was a workshop followed by the summer school, introducing recent works related to relative Langlands duality and BZSV framework.
Here I record summary of some of the talks that I was interested in.

### Tony Feng - Rankin-Selberg unfolding for geometric periods

This talk is based on the work by Tony Feng and Jonathan Wang ([paper](https://math.berkeley.edu/~fengt/GLPeriods.pdf)).
The duality conjecture in BZSV is rougly following: under the geometric Langlands duality (which is still conjectural, although [it is claimed to be proven very recently](https://people.mpim-bonn.mpg.de/gaitsgde/GLC/))

$$
D(\mathrm{Bun}_{G}) \simeq \mathrm{Coh}(\mathrm{Loc}_{\check{G}})
$$

a period sheaf $\mathcal{P}\_{X} \in D(\mathrm{Bun}\_{G})$ of $X$ corresponds to an $L$-sheaf $\mathcal{L}\_{\check{X}} \in \mathrm{Coh}(\mathrm{Loc}\_{\check{G}})$ of the dual $\check{X}$.
Especially, they verified the conjecture for

* Iwasawa-Tate case, $G = \mathrm{GL}\_{1} \curvearrowright \mathbb{A}^{1}$ (self-dual),
* Hecke case, $G = \mathrm{GL}\_{2} \curvearrowright X = \mathrm{GL}\_{2} / \mathrm{GL}\_{1} \leftrightarrow \check{G} = \mathrm{GL}\_{2} \curvearrowright \mathbb{A}^{2}$,
* Rankin-Selberg case, $G = \mathrm{GL}\_{2} \times \mathrm{GL}\_{2} \curvearrowright X = \mathrm{Ind}_{\Delta \mathrm{GL}\_{2}}^{\mathrm{GL}\_{2} \times \mathrm{GL}\_{2}} (\mathbb{A}^{2} \backslash \{0\})$ $\leftrightarrow$ $\check{G} = \mathrm{GL}\_{2} \times \mathrm{GL}\_{2} \curvearrowright \check{X} = (\mathbb{A}^{2} \otimes \mathbb{A}^{2})^{\mathrm{rk} \leq 1}$.

Note that $\check{X}$ in the Rankin-Selberg case is singular and non-affine, so it is not covered in the original BZSV conjecture.
The main idea is to use Eisenstein case

$$
G \times T \curvearrowright X = G / N \leftrightarrow \check{G} \times \check{T} \curvearrowright \check{X} = \check{G} / \check{N}
$$

and the Whittaker case

$$
G \curvearrowright X = G / (N, \psi) \leftrightarrow \check{G} \curvearrowright \check{X} = \mathrm{pt}
$$

as building blocks, and mimic the standard unfolding process categorically.
One needs to understand how $\mathcal{P}\_{X_{1} \cup X_{2}}$ and $\mathcal{L}\_{X_{1} \cup X_{2}}$ are related to $\mathcal{P}\_{X_{1}}, \mathcal{P}\_{X_{2}}$ and $\mathcal{L}\_{X_{2}}, \mathcal{L}\_{X_{2}}$, and the point is that one needs some "correction terms" or "thickenings" for these.
The main tool is the derived Fourier transform developed by [Feng-Yun-Zhang](https://math.berkeley.edu/~fengt/FYZ-ModularityI.pdf).

### Spencer Leslie - Rationality and Stabilization for Symmetric Varieties

Friedberg and Jacquet proved the following BZSV-like result for the pair of groups

$$
(G, H) = (\mathrm{GL}_{2n}, \mathrm{GL}_{n} \times \mathrm{GL}_{n})
$$

where $H$ is embedded in $G$ block-diagonally. They proved that the following: let $\pi$ be a cuspidal automorphic representation of $G$.
The automorphic period $\mathcal{P}_H(\phi) = \int_{[H]} \phi(h) \mathrm{d} h$  is nonvanishing for some $\phi \in \pi$ if and only if

1. $L(s, \pi, \wedge^2)$ has a pole at $s = 1$ (which corresponds to the factor-through-A-parameter condition in BZSV conjecture stated in Wan and Zhang's talk)
2. $L(1/2, \pi) \neq 0$.

The main case of interest in Leslie's ongoing work (joint with Jingwei Xiao and Wei Zhang) is the unitary version of Friedberg-Jacquet pair:

$$
(G, H) = (\mathrm{U}_{2n}, \mathrm{U}_{n} \times \mathrm{U}_{n}).
$$

(The periods would be related to the base change $L$-function $L(1/2, \mathrm{BC}(\pi))$ in this case.)
The main obstacle for studying this case compared to Friedberg-Jacquet is that one needs a Galois action to distinguish this case with other twists.
For example, for a quadratic extension $E /F$, the following two varieties

$$
X_{1} = \mathrm{GL}_{2n} / (\mathrm{GL}_{n} \times \mathrm{GL}_{n}), \quad X_{2} = \mathrm{GL}_{2n} / \mathrm{Res}_{E/F} \mathrm{GL}_{n}
$$

are isomorphic over $E$, but not over $F$.
The action of $\mathrm{Gal}(E/F)$ on the first three components of their dual datum ($\check{G}, \check{G}_{\Delta}, \check{\iota}$) cannot distinguish those two, hence one needs Galois action on $\check{\rho}$.

To do this, they defined inner and outer forms for $G$-varieties (as in a way that we may expect), and propose the following theorem to distinguish *outer* forms.


> **Theorem (Leslie).** Let $G$ be a quasi-splic group over $F$, fix Borel $B \subset G$, and $X = G / H$ a spherical variety ($H$ is a spherical subgroup of $G$). Let $\mathrm{Aut}^{\mathrm{dist}}(X)$ be the *distinguished automorphism group* defined by Losev. $\Gamma = \mathrm{Gal}_F$.
> 1. There exists a canonical 1-cocycle $c_X: \Gamma \to \mathrm{Aut}^{\mathrm{dist}}(X)(\overline{F})$ such that for two $G$-varieties $X_1$ and $X_2$ that are $G$-forms each other, they are $G$-inner if and only if $[c_{X_1}] = [c_{X_2}]$.
> 2. Let $X = G / G^\eta$ be a symmetric variety, associated to an involution $\eta: G \to G$. Then $\mathrm{Aut}^{\mathrm{dist}}(X)$ determines a symplectic representation $\check{G}\_{X} \curvearrowright S_{X}$ and the data of $c_{X}$ uniquely determines further $\Gamma$-action, hence ${}^{L} \check{G}\_{X} \curvearrowright S_{X}$.




### Chen Wan - Strongly tempered BZSV quadruples

This talk is based on the work by Zhengyu Mao, Chen Wan, and Lei Zhang ([paper](https://arxiv.org/abs/2405.17699v1)).
They focus on **strongly tempered** BZSV quadruples, which are $\Delta = (G, H, \iota, \rho_H)$ where their duals have a form

$$
\check{\Delta} = (\check{G}, \check{G}, \check{\iota}, \check{\rho})
$$

(up to center - to be precise, it should be $\check{H}$ with $\check{G} = \check{H} Z_{\check{G}}$.)
Also, we call $\Delta$ **reductive** if $\iota = 1$.
In this case, the $L$-factors correspond to $\mathrm{SL}\_{2}$-part in the dual side vanishes and the period-L-function conjecture becomes

$$
\frac{|\mathcal{P}_{\Delta}(\phi)|^{2}}{\langle \phi, \phi \rangle} = \frac{L(1/2, \pi, \check{\rho})}{L(1, \pi, \mathrm{Ad})}
$$

(of coures, up to a global and ramified factors).
The most famous example of strongly tempered case is the GGP case, where we have

$$
\begin{align*}
\Delta &= (\mathrm{SO}_{2n+1} \times \mathrm{SO}_{2n}, \mathrm{SO}_{2n}, 0, 1) \\
\leftrightarrow \check{\Delta} &= (\mathrm{Sp}_{2n} \times \mathrm{SO}_{2n}, \mathrm{Sp}_{2n}, \times \mathrm{SO}_{2n}, \mathrm{std} \otimes \mathrm{std}, 1)
\end{align*}
$$

Now, we know that $(\check{G}, \check{G}, \check{\rho}, 1)$ is a BZSV quadruple if

1. $\check{\rho}$ is anomaly-free,
2. $\check{\rho}$ is multiplicity-free,
3. the generic stabilizer of $\check{\rho}$ of $\check{G}$ is connected.

Luckily, we have a classification of multiplicity-free symplectic representations by Knop.
Hence this gives "tables" of the dual quadruples $\Delta$, and our question is to find the corresponding $\Delta$ (as I mentioned before, there's no algorithmic or combinatorial way to find dual quadruple of a given BZSV quadruple yet.)
Mao, Wan, and Zhang give many tables of conjectural correspondances, and provide three tyles of evidences:

1. local character formula for the dual pairs
2. prove the P=L conjecture *assuming (refined) GGP and Rallis inner product formula*
2. behaves well under "Whittaker induction"[^3]

For 3, their Whittaker induction is defined as follows.
The map $\iota : \mathrm{SL}_{2} \to G$ defines a parabolic subgroup $P = MN$ where $M$ is a centralizer of the image of $\mathrm{diag}(t, t^{-1})$ and 

$$
N = \{ g \in G : \lim_{t \to 0} \iota(\mathrm{diag}(t, t^{-1})) g \iota(\mathrm{diag}(t, t^{-1}))^{-1} = 1\}.
$$

As before, $\iota: H \times \mathrm{SL}\_{2} \to G$ defines an adjoint action of $H \times \mathrm{SL}\_{2}$ on $\mathfrak{g}$ and decompose it as

$$
\mathfrak{g} = \bigoplus_{k \geq 0} \rho_{k} \otimes \mathrm{Sym}^{k}.
$$

Then we define $\Delta = (G, H, \iota, \rho_H)$ to be the Whittaker induction of $\Delta_{0} = (M, H, 1, \rho')$ where

$$
\rho' = \rho \oplus \left(\bigoplus_{k \,\mathrm{odd}} \rho_k \right)
$$

Then the third evidence reads as follows.
Assume that the dual quadruple of $\Delta_0$ is $\check{\Delta}_0 = (\check M, \check M, 1, \rho\_{\check M})$, i.e. strongly tempered.
If $\rho\_{\check M}$ is an irreducible representation of $\check M$ with highest weight $\varpi\_{\check M}$, then we define $\rho\_{\check M}^{\check G}$ to be the irreducible representation of $\check G$ with highest weight $\varpi\_{\check G} = w \varpi\_{\check M}$ for some $w \in W_G$.
If $\rho\_{\check M}$ is not irreducible, do this for all the irreducible factors.
Then they conjectured that $\check \Delta = (\check G, \check G, 1, \rho\_{\check M}^{\check G})$.
They checked that, all the quadruples $\Delta$ in Table 3-6 are Whittaker inductions of some other quadruples $\Delta\_{0}$, and if we assume the conjectural duality for $\Delta\_{0}$ and $\check{\Delta}\_{0}$, then the above conjecture is also true.

### Charlotte Chan - Generic character sheaves on parahoric subgroups

The talk covered several papers by Chan and coauthors (possibly all the papers in [Chan's webpage](https://websites.umich.edu/~charchan/papers/) with "Deligne-Lusztig" in  abstracts).

Deligne-Lusztig theory gives a way to build irreducible representations of reductive groups over finite fields via cohomology of *Deligne-Lusztig varieties*.
Once we have a representation $\pi$ of such groups $G(\mathbb{F}\_{p})$, the easiest(?) way to produce a representation of $p$-adic groups $G(\mathbb{Q}\_{p})$ is 1) to take pullback along the natural map $G(\mathbb{Z}\_{p}) \twoheadrightarrow G(\mathbb{F}\_{p})$ and 2) take a compact induction to $G(\mathbb{Q}\_{p})$.
However, we can only obtain *depth 0* representations of $G(\mathbb{Q}\_{p})$ in this way.

To get representations of positive depths, [Adler](https://msp.org/pjm/1998/185-1/pjm-v185-n1-p01-p.pdf) and [Yu](https://www.ams.org/journals/jams/2001-14-03/S0894-0347-01-00363-0/S0894-0347-01-00363-0.pdf) boost up the step 1) of the above construction, which is "algebraic" in nature.
Instead, one may consider to use representations of "thickened" groups $G(\mathbb{Z} / p^{r}\mathbb{Z})$ using "geometry".
These are called **jet schemes**: more precisely, for a connective reductive group $G$ over $\mathbb{F}\_{p}$, we define the $r$-th jet scheme $G_{r}$ as a group scheme $A \mapsto G(A[t] / t^{r+1})$.
Then there's an analogous jet-version of Deligene-Lusztig variety whose cohomology gives a representation of $G_{r}(\mathbb{F}\_{p})$, and following the remaining step gives irreducible cuspidal representations of $G(\mathbb{Q}\_{p})$ of *positive depth*.

Now, the main slogan is: Yu's algebraic construction is, on geometric side, given by parabolic induction.
For a charater $\theta : T \to \mathbb{F}\_p^\times$, we have a *parabolic induction* $\mathrm{pInd}\_T^G(\theta)$ and a class function associated to it:

$$
g \mapsto \sum_{\substack{hB \in G / B \\ hgh^{-1} \in B}} \theta(\mathrm{pr}(hgh^{-1}))
$$

where $\mathrm{pr}: B \to T$ is the projection.
One can categorify this as follows: let 

$$
X = \{(g, hB) \in G \times G/B: hgh^{-1} \in B\}
$$

with two projections $\pi : X \to G$ (the natural projection) and $f: X \to T, (g, hB) \mapsto \mathrm{pr}(hgh^{-1})$. Then the sheafification of the above class function is simply $\mathrm{pInd}\_T^G(\mathcal{L}\_\theta) := \pi\_{!} f^{\ast} \mathcal{L}\_\theta$, where $\mathcal{L}\_\theta$ is a local system on $T$ associated to $\theta$.
Lusztig proved that this is a simple perverse sheaf, and taking trace of Frobeinus recovers the class function associated to $R_T^G(\theta)$.
Lusztig conjectured that the same is true for jetified version, and this is what Chan and other collegues proved (e.g. see [Bezrukanikov and Chan](https://arxiv.org/abs/2401.07189)).
One interesting point is that, when we match up the geometric construction with Yu's algebraic construction, it requires some correction that arises in local Langlands.
Chan also mentioned that, one can take limit of (cohomology of) jetified Deligne-Lusztig varieties, and the result is related to $p$-adic Deligne-Lusztig variety.



### Zhiwei Yun - Character sheaves in the setting of theta correspondence

Theta correspondence (over finite fields) is roughly given by the following way.
Let $(V_{1}, w_{1})$ and $(V_{2}, q_{2})$ be symplectic and orthogonal spaces.
Taking a tensor product gives a bigger symplectic space $(V, w) = (V_{1} \otimes V_{2}, \omega_{1} \otimes B_{q_{2}})$, with a represenetation of $G_{1} \times G_{2} = \mathrm{Sp}(V_{1}, w_{1}) \times \mathrm{O}(V_{2}, q_{2})$.
Now, choose a nontrivial character $\psi: \mathbb{F}\_{q} \to \mathbb{C}^{\times}$ and a Lagrangian $L \subset V$, and consider a *Weil representation* $\omega = \omega(\psi, L)$ of $\mathrm{Sp}(V, w)$ attached to $(\psi, L)$ (following Shrödinger model).
Now, Waldspurger proved that the restriction  $\omega|\_{G_{1} \times G_{2}}$ decomposes as multiplicity one factors, and this gives so-called *theta correspondence* between irreducible repsentations of $G_{1}$ and $G_{2}$ by

$$
\omega|_{G_{1} \times G_{2}} = \bigoplus \pi \boxtimes \Theta(\pi), \quad \pi \in \mathrm{Irr}(G_{1}),\,\, \Theta(\pi) \in \mathrm{Irr}(G_{2}).
$$

(Note that Weil representations for other fields may require metaplectic covers, but we don't need this over finite fields.)
Now, in my understanding, the goal of this talk (based on a joint work with Shamgar Gurevich) is about geometrization of theta corresspondence - the irreducible projectors above correspond to perverse sheaves on $(V_{1} \otimes V_{2}) / (G_{1} \times G_{2})$.
Especially, one can construct *$\Theta$-sheaves* analogous to $\Theta$-correspondence.
There's a notion of parabolic induction for $\Theta$-sheaves, and the building blocks for $\Theta$-sheaves are *Cayley sheaves* that live on $\mathbb{A}^{2} / \mathbb{G}\_{m}$ (the action is hyperbolic).
Finally, one can construct character sheaves from $\Theta$-sheaves by taking pullback along $G_{1} \times G_{2} \times V \twoheadrightarrow V$, take a tensor product with Gurevich-Hadani's kernel sheaf, and than pushforward along $G_{1} \times G_{2} \times V \to G_{1} \times G_{2}$.


## Concluding remarks

While staying at Minnesota, I learned that relative Langlands is an extremly active area and a lot of people are working on it.
The workshop hugely motivated myself, and I decided to study meterials including

* perverse sheaves (it seems that perverse sheaves are "linear algebra" of geometric Langlands, and I can't say anything without knowing about it)
* dual of spherical variety ([Knop-Schalke](https://arxiv.org/abs/1702.08264))
* the original GGP paper and SV (not BZSV) paper
* Mao-Wan-Zhang's paper (see if there's any example that is more interesting than other examples)

which are more than enough for remaining years.

<p align="center">
<img src="/assets/images/umn-nametag.png">
<figcaption align="center">My nametag</figcaption>
</p>

Also, there's a Korean restaurant called "Korea Restaurant", and it was great (I ate 도가니탕). Also, "Hongkong noodle" was a good choice.

[^1]: Here I use $\check{\Delta}$ instead of $\hat{\Delta}$ for duals, but the original notation in the paper is latter one.

[^2]: I found that the original equation in the paper is different from what I saw from the lecture, but I believe the two equations have the same meanings.

[^3]: During the talk, Sakellaridis mentioned that there's already a notion of Whittaker induction in the BZSV paper, which is different from Mao-Wan-Zhang's definition. Hence the name might change in future.