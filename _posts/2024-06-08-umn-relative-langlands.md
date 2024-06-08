---
layout: posts
title:  "Relative Langlands Duality summer school & workshop at UMN"
date:   2024-06-03
categories: jekyll update
tags: math
---

There was [Relative Langlands Duality summer school & workshop at University of Minnesota](https://cse.umn.edu/math/events/summer-school-and-workshop-relative-langlands-duality), which introduces the recent work by Ben-Zvi, Sakellaridis, and Venkatesh ([the huge paper](https://www.math.ias.edu/~akshay/research/BZSVpaperV1.pdf) called BZSV) and related works.
I got interest in the topic after I study Gan-Gross-Prasad problems and related topics.
In my understanding, **relative** Langlands duality can be summarized as

> Study Langlands functoriality and relate it to periods and special L-values

as a number theorist, not as a mathematical physicist.
As far as I know, we don't have nice arithmetic theory yet (we have arithmetic QFT by Minhyong Kim, but they are not fully developed as much as geometric analogues).

## Summer school

There were four mini lecture series covering four different (but strongly connected) topics in relative Langlands duality.

### 1. Relative Langlands Duality - A-side by Yiannis Sakellaridis

Yiannis Sakellaridis introduced the **A-side**, i.e. **Automorphic Side** of relative Langlands duality.

### 2. Relative Langlands Duality - B-side by David Ben-Zvi

David Ben-Zvi introduced the other side of relative Langlands duality, which is **B-side** or **Spectral side** (or "B"alois side).

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
The first talk is to explain the meaning of the following equation, which is the equation (3.13) from Gaiotto and Witten's paper [$S$-Duality of Boundary Conditions in $\mathcal{N}=4$ Super Yang-Mills Theory](https://www.arxiv.org/abs/0807.3720)[^2]

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
Again, if there are anything wrong written below, it is due to myself.

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
* Rankin-Selberg case, $G = \mathrm{GL}\_{2} \times \mathrm{GL}\_{2} \curvearrowright X = \mathrm{Ind}_{\mathrm{GL}\_{2}}^{\mathrm{GL}\_{2} \times \mathrm{GL}\_{2}} (\mathbb{A}^{2} \backslash \{0\})$ $\leftrightarrow$ $\check{G} = \mathrm{GL}\_{2} \times \mathrm{GL}\_{2} \curvearrowright \check{X} = (\mathbb{A}^{2} \otimes \mathbb{A}^{2})^{\mathrm{rk} \leq 1}$.

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

1. $L(s, \pi, \wedge^2)$ has a pole at $s = 1$ (which corresponds to the A-parameter condition in BZSV conjecture stated in Wan and Zhang's talk)
2. $L(1/2, \pi) \neq 0$.

The main case of interest in Leslie's ongoing work (joint with Jingwei Xiao and Wei Zhang) is the unitary version of Friedberg-Jacquet pair:

$$
(G, H) = (\mathrm{U}_{2n}, \mathrm{U}_{n} \times \mathrm{U}_{n}).
$$

(The periods would be related to the base change $L$-function $L(1/2, \mathrm{BC}(\pi))$ in this case.)
The main obstacle for studying this case compared to Friedberg-Jacquet is that one needs a Galois action to distinguish this case with other twists.
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
\Delta = (\mathrm{SO}_{2n+1} \times \mathrm{SO}_{2n}, \mathrm{SO}_{2n}, 0, 1) \leftrightarrow \check{\Delta} = (\mathrm{Sp}_{2n} \times \mathrm{SO}_{2n}, \mathrm{Sp}_{2n}, \times \mathrm{SO}_{2n}, \mathrm{std} \otimes \mathrm{std}, 1)
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



### Charlotte Chan - Generic character sheaves on parahoric subgroups

The talk covers several papers by Chan and coauthors (possibly all the papers in [Chan's webpage](https://websites.umich.edu/~charchan/papers/) with "Deligne-Lusztig" in the abstract).

Deligne-Lusztig theory gives a way to build irreducible representations of reductive groups over finite fields via cohomology of *Deligne-Lusztig varieties*.
Once we have a representation $\pi$ of such groups $G(\mathbb{F}_{p})$, the easiest(?) way to produce a representation of $p$-adic groups $G(\mathbb{Q}_{p})$ is 1) to take pullback along the natural map $G(\mathbb{Z}_{p}) \twoheadrightarrow G(\mathbb{F}_{p})$ and 2) take a compact induction to $G(\mathbb{Q}_{p})$.
However, we can only obtain *depth 0* representations of $G(\mathbb{Q}_{p})$ in this way.

To get representations of positive depths, [Adler](https://msp.org/pjm/1998/185-1/pjm-v185-n1-p01-p.pdf) and [Yu](https://www.ams.org/journals/jams/2001-14-03/S0894-0347-01-00363-0/S0894-0347-01-00363-0.pdf) boost up the step 1) of the above construction, which is "algebraic" in nature.
Instead, one may consider to use representations of "thickened" groups $G(\mathbb{Z} / p^{r}\mathbb{Z})$ using "geometry".
These are called **jet schemes**: more precisely, for a connective reductive group $G$ over $\mathbb{F}_{p}$, we define the $r$-th jet scheme $G_{r}$ as a group scheme $A \mapsto G(A[t] / t^{r+1})$.
Then there's an analogous jet-version of Deligene-Lusztig variety whose cohomology gives a representation of $G_{r}(\mathbb{F}_{p})$, and following the remaining step gives irreducible cuspidal representations of $G(\mathbb{Q}_{p})$ of *positive depth*.
In fact, there is a categorical (sheaf) version of parabolic induction for the derived category of $\ell$-adic sheaves.
[Bezrukanikov and Chan](https://arxiv.org/abs/2401.07189) proved that jetification is also possible for categorical version.


[^1]: Here I use $\check{\Delta}$ instead of $\hat{\Delta}$ for duals, but the original notation in the paper is latter one.

[^2]: I found that the original equation in the paper is different from what I saw from the lecture, but I believe the two equations have the same meanings.

[^3]: During the talk, Sakellaridis mentioned that there's already a notion of Whittaker induction in the BZSV paper, which is different from Mao-Wan-Zhang's definition. Hence the name might change in future.