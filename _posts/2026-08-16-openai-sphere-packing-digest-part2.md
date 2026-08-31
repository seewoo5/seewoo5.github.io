---
layout: posts
title:  "Understanding Astra's result on the high-dimensional sphere-packing problem — Part 2: Formalization"
date:   2026-08-27
categories: jekyll update
tags: math ai
---

In the [previous post]({% post_url 2026-08-16-openai-sphere-packing-digest-part1 %}), I explained the main ideas behind Astra's proof of the optimal Cohn-Elkies LP exponent and the sharp sign-uncertainty constant.
OpenAI released Lean formalizations accompanying all ten results in the report, including the sphere-packing result.
Here I dig into the sphere-packing formalization and ask how faithfully it follows the report: what is the same, what is different, and what is missing?
My aim is to match the informal statements and proofs with their Lean counterparts. Comments inside the displayed Lean snippets are sometimes added for explanation and are not part of the original source.

## Overview of the formalization

The Lean code can be found in [`SpherePacking.lean`](https://github.com/openai/ten-proofs/blob/main/SpherePacking.lean). I checked [commit `94bc0fe`](https://github.com/openai/ten-proofs/blob/94bc0feb6a9ff12c7d31d6de640a725c9d43d2b6/SpherePacking.lean), in which it is a single file of 55,616 lines.

- The repository includes [Comparator configurations](https://github.com/openai/ten-proofs/tree/main/ComparatorChallenges) and an informative [`formalization.yaml`](https://github.com/openai/ten-proofs/blob/main/formalization.yaml). The latter identifies `PackingBounds.sharpFullCohnElkiesManuscriptConclusions` as the main sphere-packing result and records its axiom and `sorry` status.
- There are *many* definitions, which makes the file difficult to navigate linearly.
- On the first day of the announcement, I remember the repository being repeatedly force-pushed, so earlier versions may not be recoverable from its public Git history.
- Some parts of the code are borrowed from the [sphere packing project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean).
- There is no blueprint explaining the dependency structure.

So how can I read 55K lines of Lean code? There are several choices:

1. Do not read it.
2. Spend months reading it manually and put other important work aside.
3. Use AI.

I chose option 3 and used ChatGPT and Claude, relying somewhat more on ChatGPT for reading the code because the Lean code was itself produced by an OpenAI model.
I asked the models to build a table matching the theorems and lemmas in the report with declarations in the Lean file, and then checked the suggested declarations against the source.

The current file fully formalizes the Cohn-Elkies LP asymptotic in Theorem 1.1, including the passage from unrestricted admissible functions to radial ones and the bridge to the packing-density bound. Its coverage of the sign-uncertainty theorem is more limited:

| Paper item | Status in the current Lean file |
|---|---|
| LP definitions and exact limit in Theorem 1.1 | Formalized |
| Equality of the full and radial LP problems | Formalized |
| Cohn-Elkies packing bound and its sharp asymptotic consequence | Formalized |
| $L^1$ sign-eigenfunction radialization and Schwartz approximation | Not formalized in the paper's form |
| Mellin/Fourier identities | Formalized |
| Quantitative Proposition 3.1 for both eigenvalues | No named counterpart; only specialized ingredients |
| Proposition 3.7 for general $L^1$ eigenfunctions of both signs | Not formalized; Lean proves an anti-self-Fourier Schwartz obstruction |
| LP lower-bound scaling argument in Theorem 3.8 | Formalized |
| Upper Fourier pair $(f\_-,f\_+)$ | Formalized, with modified safety margins |
| Self-Fourier function $f\_0$ | Not formalized |
| Definitions and limits of $\mathsf A\_\pm(d)$ in Theorem 1.2 | Not formalized |
| Appendix A: $\mathsf A\_+(d)<\mathsf A\_-(d)$ | Not formalized |

Thus the formalization proves the main Cohn-Elkies result and an anti-self-Fourier lower sign-radius obstruction, but it does not package the full sign-uncertainty Theorem 1.2.

## Basic definitions

Some basic definitions, including the Schwartz space and radiality, are formalized as follows:

```lean
abbrev Euclidean (d : ℕ) := EuclideanSpace ℝ (Fin d)

abbrev TestFunction (d : ℕ) := 𝓢(Euclidean d, ℂ)

def IsRealValued {d : ℕ} (f : TestFunction d) : Prop :=
  ∀ x : Euclidean d, (f x).im = 0

def IsRadial {d : ℕ} (f : TestFunction d) : Prop :=
  ∀ x y : Euclidean d, ‖x‖ = ‖y‖ → f x = f y

structure AntiFourierWitness (d : ℕ) (R : ℝ) where
  function : TestFunction d
  real : IsRealValued function
  radial : IsRadial function
  nonzero : function ≠ 0
  anti_fourier : (𝓕 function : TestFunction d) = -function
  zero_value : function (0 : Euclidean d) = 0
  eventually_nonneg :
    ∀ x : Euclidean d, R ≤ ‖x‖ → 0 ≤ (function x).re
```

An `AntiFourierWitness` is the main object in the formal lower-bound argument. It consists of a nonzero real-valued radial Schwartz function $g$ satisfying $\widehat g=-g$, $g(0)=0$, and $g(x)\ge0$ for $\lVert x\rVert\ge R$. There is no analogous "`SelfFourierWitness`" for $\widehat g=g$ in the Lean file.


### Lower bound

The main goal of the lower bound argument is to prove the following statement:

```lean
def criticalRadius : ℝ := (Real.pi)⁻¹

def UniformAntiFourierSignRadius : Prop :=
  ∀ c : ℝ, 0 < c → c < criticalRadius →
    ∀ᶠ d : ℕ in atTop,
      IsEmpty (AntiFourierWitness d (c * Real.sqrt (d : ℝ)))
```

Note that it has a dedicated name for the constant $1/\pi$, `criticalRadius`!
`UniformAntiFourierSignRadius` asserts that for every $0<c<1/\pi$, there exists a dimension threshold $d_0(c)$ such that, for all $d\ge d_0(c)$, there is no nonzero radial Schwartz function $g$ satisfying $\widehat g=-g$, $g(0)=0$, and $g(x)\ge0$ for $\lvert x\rvert\ge c\sqrt d$.
The final theorem supplies a proof of this proposition:

```lean
theorem uniformAntiFourierSignRadius :
    UniformAntiFourierSignRadius := by ...
```

To prove this, recall that we worked with the normalization $\varphi$ of $g$ and its (normalized) Mellin transform $Z$.
These definitions are formalized as follows:

```lean
-- theta
def stripAngle (σ : ℝ) : ℝ :=
  Real.pi * (1 + σ) / 2

-- P_σ
def stripPoissonKernel (σ T : ℝ) : ℝ :=
  Real.sin (stripAngle σ) /
    (4 * (Real.cosh (Real.pi * T / 2) - Real.cos (stripAngle σ)))

-- M_σ
def stripBottomMass (σ : ℝ) : ℝ :=
  (1 - σ) / 2

-- |S_d|
def radialSurfaceArea (d : ℕ) : ℝ :=
  (d : ℝ) * unitBallVolume d

-- ||g||_1
def radialL1Mass {d : ℕ} (g : TestFunction d) : ℝ :=
  ∫ x : Euclidean d, ‖g x‖

def radialUnitDirection {d : ℕ} (hd : 0 < d) : Euclidean d :=
  (EuclideanSpace.basisFun (Fin d) ℝ) ⟨0, hd⟩

def radialProfile {d : ℕ} (hd : 0 < d)
    (f : TestFunction d) (r : ℝ) : ℂ :=
  f (r • radialUnitDirection hd)

-- M
def radialMellinStrip {d : ℕ}
    (hd : 0 < d) (f : TestFunction d) (z : ℂ) : ℂ :=
  mellin (radialProfile hd f)
    ((d : ℂ) / 2 - Complex.I * z)

-- Z
def normalizedRadialMellinStrip {d : ℕ}
    (hd : 0 < d) (f : TestFunction d) (R : ℝ) (z : ℂ) : ℂ :=
  (radialSurfaceArea d / radialL1Mass f : ℝ) *
    Complex.exp
      (((d : ℂ) / 2 + Complex.I * z) *
        (Real.log R : ℂ)) *
      radialMellinStrip hd f z

-- φ
def normalizedRadialLogProfile {d : ℕ} (hd : 0 < d)
    (g : TestFunction d) (R v : ℝ) : ℝ :=
  radialSurfaceArea d / radialL1Mass g *
    (R * Real.exp v) ^ d *
    (radialProfile hd g (R * Real.exp v)).re
```

The paper's main analytic estimate for the lower bound is Proposition 3.1:

> **Proposition 3.1.** For every $0<c<1/\pi$, there exist $C\_c,\gamma\_c>0$ and $d\_0(c)\in\mathbb N$ such that, for every $d\ge d\_0(c)$, every $\varsigma\in\lbrace-1,+1\rbrace$, and every nonzero $g\in\mathcal S\_{\mathrm{rad}}(\mathbb R^d;\mathbb R)$ satisfying $\widehat g=\varsigma g$ and $g(0)=0$, one has
>
> $$
> \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1.
> $$

Where is this statement in the Lean code?
The answer is: *nowhere*!
There is no single named theorem proving the above inequality.
Is that a problem? *Not really*: Lean instead formalizes an *equivalent* statement in terms of $\varphi$, which is sufficient (and will appear later).
However, this covers only $\varsigma=-1$; as mentioned above, there is no formalized statement for self-Fourier functions ($\varsigma=+1$), which is a genuine omission.

Here is a summary of the actual argument in the Lean code.
Unlike the report, the formalization expresses everything in terms of $\varphi$ and $Z$, rather than directly in terms of $g$.

> *Proof (Lean).* One checks that $\lVert \varphi\rVert\_1=1$, $\int\varphi=0$, and $\varphi(v)\ge0$ for $v\ge0$. Therefore
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \ge \frac{1}{2}.
> $$
>
> There exists $D\_0\in\mathbb R$ such that, for every $D\ge D\_0$, every $-1<\sigma<1$, and every $s\in\mathbb R$, the normalized Mellin transform satisfies
>
> $$
> |Z(s + i\sigma\lambda)| \le e^{H_{\sigma, D}(s)}
> $$
>
> where
>
> $$
> H_{\sigma,D}(s)=\int_{\mathbb R}P_\sigma(T)\min\{h_\lambda(s-\lambda T),D\}\,\mathrm dT\le H_\sigma(s).
> $$
>
> We can show that $H\_\sigma(s)$ is maximized at $s=0$, and $H\_\sigma(0)$ is bounded above by
>
> $$
> \begin{align*}
> H_\sigma(0) &\le \lambda M_\sigma \underbrace{\left(\log(2\pi e c^2) + \int_{\mathbb{R}} \frac{P_\sigma(T)}{M_\sigma} \left(-\frac{\pi|T|}{4} - \frac{1}{2} \log \left(1 + \frac{T^2}{4}\right) + \frac{|T|}{2} \arctan \left(\frac{|T|}{2}\right)\right)\mathrm{d}T\right)}_{A_\sigma} \\
> &\quad + \int_{\mathbb{R}} P_\sigma(T) \left(3 \left|\log \frac{|T|}{2}\right| + \log\left(1 + \frac{T^2}{4} \right) + \frac12 \log\coth\frac{\pi|T|}{2}\right) \mathrm{d}T
> \end{align*}
> $$
>
> Taking $\sigma \to 1^{-}$ on the right-hand side gives
>
> $$ \lim_{\sigma \to 1^{-}} \frac{P_\sigma(T)}{M_\sigma} = \frac{\pi}{4\left(\cosh\frac{\pi T}{2} + 1\right)}, \qquad \lim_{\sigma \to 1^{-}} A_\sigma = \log(\pi^2 c^2) $$
>
> where the latter limit is negative when $c<1/\pi$. Hence, for any given $0<c<1/\pi$, we can choose $\sigma=\sigma(c)<1$ and $\gamma=\gamma(c)>0$ such that
>
> $$H_\sigma(s) \le -\gamma \lambda$$
>
> for sufficiently large $\lambda = d/2$ and all $s \in \mathbb{R}$.
> We also have a separate logarithmic tail estimate: for suitable $A,B,\kappa>0$,
>
> $$ H_\sigma(\lambda S)\le-\kappa\lambda\log\frac{|S|}{A} \qquad (|S|\ge B). $$
>
> By averaging these two estimates, we obtain
>
> $$ e^{H_\sigma(\lambda S)} \le C \frac{e^{-\gamma\lambda}}{(1 + |S|)^2} $$
>
> for some constants $C,\gamma>0$, all sufficiently large $d$, and every $S\in\mathbb R$. Combining this with the pointwise estimate $\lvert Z(s+i\sigma\lambda)\rvert\le e^{H_\sigma(s)}$ above and then making the change of variables $s=\lambda S$, we obtain
>
> $$ \int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds \le CJ\lambda e^{-\gamma\lambda}, $$
>
> where $J=\int\_{\mathbb R}(1+\lvert S\rvert)^{-2}\,\mathrm dS$.
> Mellin inversion gives
>
> $$ \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s $$
>
> and hence
>
> $$ \frac12\le\int_{-\infty}^{0}|\varphi(v)|\,\mathrm dv\le K e^{-\gamma\lambda}, $$
>
> which is a contradiction for sufficiently large $\lambda = d/2$.

Here is how these steps are formalized.

#### The lower bound $\frac12\le\int\_{-\infty}^{0}\lvert \varphi(v)\rvert\,\mathrm dv$

This straightforward step follows almost directly from the definition of $\varphi$ and the properties of $g$.
The formal statement is as follows:

```lean
theorem normalizedProfile_negativeHalfline_mass_ge_half {φ : ℝ → ℝ}
    (hφ : Integrable φ)
    (hmean : (∫ v : ℝ, φ v) = 0)
    (hmass : (∫ v : ℝ, |φ v|) = 1)
    (hsign : ∀ v : ℝ, 0 ≤ v → 0 ≤ φ v) :
    (1 / 2 : ℝ) ≤ ∫ v in Iic (0 : ℝ), |φ v| := by ...
```

#### The upper bound $\lvert Z(s+i\sigma\lambda)\rvert\le e^{H\_{\sigma,D}(s)}$

This is a capped version of Lemma 3.2, formalized as follows:

```lean
-- |Z(s + iσλ)| ≤ exp(∫ P_σ(T) h_{λ,D}(s - λT) dT) for sufficiently large D
theorem exists_antiFourierWitness_capped_poisson_majorization
    {d : ℕ} (hd : 0 < d) {R : ℝ} (hR : 0 < R)
    (w : AntiFourierWitness d R) :
    ∃ D₀ : ℝ,
      ∀ D : ℝ, D₀ ≤ D →
        ∀ {σ : ℝ}, -1 < σ → σ < 1 →
          ∀ s : ℝ,
            ‖normalizedRadialMellinStrip hd w.function R
              ((s : ℂ) + Complex.I *
                (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖ ≤
              Real.exp
                (∫ T : ℝ,
                  stripPoissonKernel σ T *
                    lowerGammaBoundaryCapped
                      ((d : ℝ) / 2) R D
                      (s - ((d : ℝ) / 2) * T)) := by ...
```

The truncation argument is explained in the final part of the proof of Lemma 3.2.
The exponent on the right-hand side is the capped Poisson majorant

$$
\int_{\mathbb{R}} P_\sigma(T) \min\{h_\lambda(s - \lambda T), D\} \mathrm{d}T
$$

Taking $D\to\infty$ gives the uncapped bound from Lemma 3.2. This is formalized as follows: `lowerStripCappedPoisson_tendsto_radius` proves convergence of the capped Poisson integrals, and `antiFourierWitness_norm_le_poisson_of_eventually_capped_radius` transfers the norm bound to the limit.

```lean
theorem lowerStripCappedPoisson_tendsto_radius
    {d : ℕ} (hd : 0 < d) {R σ : ℝ}
    (hσbelow : -1 < σ) (hσabove : σ < 1) (s : ℝ) :
    Tendsto
      (fun n : ℕ =>
        ∫ T : ℝ,
          stripPoissonKernel σ T *
            lowerGammaBoundaryCapped ((d : ℝ) / 2)
              R (n : ℝ)
              (s - ((d : ℝ) / 2) * T))
      atTop
      (𝓝 (lowerStripPoissonMajorant ((d : ℝ) / 2)
        R σ s)) := by ...

theorem antiFourierWitness_norm_le_poisson_of_eventually_capped_radius
    {d : ℕ} (hd : 0 < d) {R σ : ℝ}
    (w : AntiFourierWitness d R)
    (hσbelow : -1 < σ) (hσabove : σ < 1) (s : ℝ)
    (hcapped : ∀ᶠ n : ℕ in atTop,
      ‖normalizedRadialMellinStrip hd w.function R
        ((s : ℂ) + Complex.I *
          (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖ ≤
        Real.exp
          (∫ T : ℝ,
            stripPoissonKernel σ T *
              lowerGammaBoundaryCapped ((d : ℝ) / 2)
                R (n : ℝ)
                  (s - ((d : ℝ) / 2) * T))) :
      ‖normalizedRadialMellinStrip hd w.function R
        ((s : ℂ) + Complex.I *
          (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖ ≤
        Real.exp
          (lowerStripPoissonMajorant ((d : ℝ) / 2)
            R σ s) := by ...
```

The Lean argument proceeds as follows.

> *Proof (Lean).* For $z\in\mathbb C$ and $y\in\mathbb R$, define
>
> $$
> K_\lambda(z,y)=\frac{i}{4\lambda}
> \frac{\exp\left(\frac{\pi(z-y+i\lambda)}{2\lambda}\right)+1}
> {\exp\left(\frac{\pi(z-y+i\lambda)}{2\lambda}\right)-1},
> $$
>
> and
>
> $$
> \widetilde K_\lambda(z,y)=K_\lambda(z,y)+
> \begin{cases}
> \dfrac{i}{4\lambda},&y\ge0,\\
> -\dfrac{i}{4\lambda},&y<0.
> \end{cases}
> $$
>
> Here $K\_\lambda$ is a holomorphic version of the Poisson kernel, while $\widetilde K\_\lambda$ is regularized so that $\widetilde K\_\lambda(z,y)\to0$ as $\lvert y\rvert\to\infty$. Define
>
> $$
> h_{\lambda,D}(y)=
> \begin{cases}
> \min\{h_\lambda(y),D\},&y\ne0,\\
> D,&y=0,
> \end{cases}
> $$
>
> and
>
> $$W_D(z) = \int_{\mathbb{R}} \widetilde{K}_\lambda(z, y) h_{\lambda, D}(y) \mathrm{d}y.$$
>
> At $z=s+i\sigma\lambda$ in the open strip, with $-1<\sigma<1$, the real part of $W_D$ is
>
> $$
> \Re W_D(s+i\sigma\lambda)
> =\int_{\mathbb R}P_\sigma(T)h_{\lambda,D}(s-\lambda T)\,\mathrm dT.
> $$
>
> The function $\Re W\_D$ extends continuously to the boundary of the strip, where $\Re W\_D(s-i\lambda)=h\_{\lambda,D}(s)$ and $\Re W\_D(s+i\lambda)=0$ for all $s\in\mathbb R$.
> The function $F\_D(z)=e^{-W\_D(z)}Z(z)$ is then holomorphic in the open strip and continuous on its closure, with $\lvert F\_D(z)\rvert\le1$ on both boundary lines.
> Thus the Phragmén-Lindelöf principle gives $\lvert F\_D(z)\rvert\le1$ in the interior, and hence $\lvert Z(z)\rvert\le e^{\Re W\_D(z)}$.

Thus, the proof starts with the complex Poisson kernel and takes its real part to recover the Poisson kernel itself; this is another difference from the report.
Note that the code uses the variable `ℓ`, which is the same as $\lambda$.
There is also a definition named `stripComplexPoissonKernel`, which is the same as $K\_\lambda(s+i\sigma\lambda,y)$, but I do not think it is necessary or useful here.

```lean
-- K_λ(z,y) = i/(4λ) * (exp(π(z-y+iλ)/(2λ)) + 1)/(exp(π(z-y+iλ)/(2λ)) - 1)
-- ℓ = λ
def stripHolomorphicPoissonKernel (ℓ : ℝ) (z : ℂ) (y : ℝ) : ℂ :=
  (Complex.I *
      ((Complex.exp
          (((Real.pi : ℂ) *
            (z - (y : ℂ) + Complex.I * (ℓ : ℂ))) /
              (2 * (ℓ : ℂ))) + 1) /
        (Complex.exp
          (((Real.pi : ℂ) *
            (z - (y : ℂ) + Complex.I * (ℓ : ℂ))) /
              (2 * (ℓ : ℂ))) - 1)) /
    4) / (ℓ : ℂ)

-- K̃_λ(z,y) = K_λ(z,y) + (if 0 ≤ y then i/(4λ) else -i/(4λ))
def stripRegularizedHolomorphicPoissonKernel
    (ℓ : ℝ) (z : ℂ) (y : ℝ) : ℂ :=
  stripHolomorphicPoissonKernel ℓ z y +
    (if 0 ≤ y then Complex.I else -Complex.I) /
      ((4 * ℓ : ℝ) : ℂ)

-- W[b](z) = ∫ K̃_λ(z,y) b(y) dy
def stripRegularizedOuter (ℓ : ℝ) (b : ℝ → ℝ) (z : ℂ) : ℂ :=
  ∫ y : ℝ,
    stripRegularizedHolomorphicPoissonKernel ℓ z y *
      (b y : ℂ)

-- W_D(z) = W[h_{λ,D}](z) = ∫ K̃_λ(z,y) h_{λ,D}(y) dy
def lowerStripCappedGammaOuter
    (ℓ R D : ℝ) (z : ℂ) : ℂ :=
  stripRegularizedOuter ℓ
    (lowerGammaBoundaryCapped ℓ R D) z

-- Re K_λ(s + iσλ, y) = P_σ((s - y)/λ)/λ
theorem stripHolomorphicPoissonKernel_re
    {ℓ σ : ℝ} (hℓ : 0 < ℓ)
    (hbelow : -1 < σ) (habove : σ < 1) (s y : ℝ) :
    (stripHolomorphicPoissonKernel ℓ
      ((s : ℂ) + Complex.I * ((σ * ℓ : ℝ) : ℂ)) y).re =
      stripPoissonKernel σ ((s - y) / ℓ) / ℓ := by ...

-- Re W_D(s + iσλ) = ∫ P_σ(T) h_{λ,D}(s - λT) dT
theorem lowerStripCappedGammaOuter_re_dimension
    {d : ℕ} (hd : 0 < d) {σ R D : ℝ}
    (hσbelow : -1 < σ) (hσabove : σ < 1) (s : ℝ) :
    (lowerStripCappedGammaOuter ((d : ℝ) / 2) R D
      ((s : ℂ) + Complex.I *
        ((σ * ((d : ℝ) / 2) : ℝ) : ℂ))).re =
      ∫ T : ℝ, stripPoissonKernel σ T *
        lowerGammaBoundaryCapped
          ((d : ℝ) / 2) R D
          (s - ((d : ℝ) / 2) * T) := by ...
```

The informal proof in the report applies the upper-half-plane Poisson principle to the subharmonic function $\log\lvert Z\circ\Phi^{-1}\rvert$.
The formalized proof is slightly different: it uses a horizontal-strip version of the Phragmén-Lindelöf principle, which is a maximum-principle argument for holomorphic functions on a horizontal strip, although the underlying argument is essentially the same.

> **Phragmén–Lindelöf principle for a horizontal strip.** Let $f:\mathbb C\to\mathbb C$ be holomorphic on $\lbrace z:a<\Im z<b\rbrace$ and continuous on its closure. Suppose that $\lvert f(z)\rvert=O(\exp(B\exp(c\lvert \Re z\rvert)))$ for some constants $B$ and $c$ with $c<\pi/(b-a)$ as $\lvert \Re z\rvert\to\infty$. If $\lvert f(z)\rvert\le C$ on the two boundary lines, then $\lvert f(z)\rvert\le C$ throughout the strip.

This is a version of the maximum-modulus principle for a horizontal strip. The file proves a custom theorem, `horizontalStrip_norm_extension_majorization`. Mathlib already contains the related theorem [`PhragmenLindelof.horizontal_strip`](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Analysis/Complex/PhragmenLindelof.html#PhragmenLindelof.horizontal_strip), and I think the custom theorem could be replaced with the Mathlib version instead of reproducing the standard proof.

```lean
theorem horizontalStrip_norm_extension_majorization
    {a b C : ℝ} (hab : a < b) (hC : 0 < C)
    (f : ℂ → ℂ) (N : ℂ → ℝ)
    (hf : DifferentiableOn ℂ f
      (Complex.im ⁻¹' Ioo a b))
    (hN : ContinuousOn N
      (Complex.im ⁻¹' Icc a b))
    (hNnonneg : ∀ w : ℂ,
      w.im ∈ Icc a b → 0 ≤ N w)
    (hinterior : ∀ w : ℂ,
      w.im ∈ Ioo a b → N w = ‖f w‖)
    (hbottom : ∀ w : ℂ, w.im = a → N w ≤ C)
    (htop : ∀ w : ℂ, w.im = b → N w ≤ C)
    (hgrowth :
      ∃ c < Real.pi / (b - a), ∃ B : ℝ,
        Asymptotics.IsBigO
          (Filter.comap (fun w : ℂ => |w.re|)
              Filter.atTop ⊓
            Filter.principal
              (Complex.im ⁻¹' Ioo a b))
          f
          (fun w : ℂ =>
            Real.exp (B * Real.exp (c * |w.re|))))
    {z : ℂ} (hza : a ≤ z.im) (hzb : z.im ≤ b) :
    N z ≤ C := by ...
```

#### $H\_\sigma(s)\le H\_\sigma(0)$

Here is the formalization of the inequality:

```lean
theorem lowerStripPoissonMajorant_dimension_centered_max
    {d : ℕ} (hd : 2 ≤ d) {c σ : ℝ}
    (hc : 0 < c)
    (hbelow : -1 < σ) (habove : σ < 1) (s : ℝ) :
    lowerStripPoissonMajorant ((d : ℝ) / 2)
      (c * Real.sqrt d) σ s ≤
      lowerStripPoissonMajorant ((d : ℝ) / 2)
        (c * Real.sqrt d) σ 0 := by ...
```

As mentioned in part 1, the convolution of two even, nonnegative functions that are nonincreasing on $(0,\infty)$ is maximized at the origin.
The Lean code includes a formalization of this fact, specialized to the Poisson kernel:

```lean
theorem even_antitone_poisson_convolution_max
    {σ : ℝ} (hbelow : -1 < σ) (habove : σ < 1)
    {f : ℝ → ℝ} {B : ℝ}
    (hf : Integrable f)
    (hfmeas : Measurable f)
    (hfnonneg : ∀ x : ℝ, 0 ≤ f x)
    (heven : ∀ x : ℝ, f (-x) = f x)
    (hanti : AntitoneOn f (Ici (0 : ℝ)))
    (hsupport : Function.support f ⊆ Icc (-B) B)
    (s : ℝ) :
    (∫ x : ℝ, stripPoissonKernel σ (s - x) * f x) ≤
      ∫ x : ℝ, stripPoissonKernel σ (0 - x) * f x := by ...
```

#### $H\_\sigma(0) \le \lambda M\_\sigma (\log(2\pi c^2) + J\_\sigma) + O\_\sigma(\log(2 + \lambda))$

Recall that Lemma 3.3 proves the upper bound for $H\_\sigma(0)$, treating the even- and odd-dimensional cases separately in order to estimate the difference

$$
h_\lambda(\lambda T) - \lambda\left(\log(2\pi c^2) - \int_0^1 f_T(x) \mathrm{d}x\right).
$$

The Lean proof follows almost the same structure, but combines the two estimates into one.
`lowerStripPoissonMajorant_dimension_central_bound` formalizes the upper bound for $H_\sigma(0)$.

```lean
-- f_T
def lowerRiemannLog (T x : ℝ) : ℝ :=
  Real.log (Real.sqrt (x ^ 2 + T ^ 2 / 4))

-- Combined error term
def lowerRiemannErrorMajorant (T : ℝ) : ℝ :=
  3 * |lowerRiemannLog T 0| +
    2 * |lowerRiemannLog T 1| +
      (1 / 2 : ℝ) *
        Real.log (lowerCoth (Real.pi * |T| / 2))

def lowerRiemannPoissonError (σ : ℝ) : ℝ :=
  ∫ T : ℝ,
    stripPoissonKernel σ T * lowerRiemannErrorMajorant T

-- P_σ(T)/M_σ
def stripNormalizedPoissonKernel (σ T : ℝ) : ℝ :=
  stripPoissonKernel σ T / stripBottomMass σ

def lowerEndpointPhase (T : ℝ) : ℝ :=
  -Real.pi * |T| / 4 - (1 / 2 : ℝ) * Real.log (1 + T ^ 2 / 4) +
    |T| / 2 * Real.arctan (|T| / 2)

def lowerPoissonEndpointExpectation (σ : ℝ) : ℝ :=
  ∫ T : ℝ,
    stripNormalizedPoissonKernel σ T * lowerEndpointPhase T

-- H_σ(0) ≤ λ M_σ (log(2πc^2)+J_σ) + error
theorem lowerStripPoissonMajorant_dimension_central_bound
    {d : ℕ} (hd : 2 ≤ d) {c σ : ℝ}
    (hc : 0 < c) (hzero : 0 ≤ σ) (habove : σ < 1) :
    lowerStripPoissonMajorant ((d : ℝ) / 2)
        (c * Real.sqrt d) σ 0 ≤
      ((d : ℝ) / 2) * stripBottomMass σ *
        (Real.log (2 * Real.pi * Real.exp 1 * c ^ 2) +
          lowerPoissonEndpointExpectation σ) +
        lowerRiemannPoissonError σ := by ...
```

There are some differences between the formalization and the report.
For example, the main estimate reads

$$
\begin{align*}
H_\sigma(0) &\le \lambda M_\sigma \left(\log(2\pi e c^2) + \int_{\mathbb{R}} \frac{P_\sigma(T)}{M_\sigma} \left(-\frac{\pi|T|}{4} - \frac{1}{2} \log \left(1 + \frac{T^2}{4}\right) + \frac{|T|}{2} \arctan \left(\frac{|T|}{2}\right)\right)\mathrm{d}T\right) \\
&\quad + \int_{\mathbb{R}} P_\sigma(T) \left(3 |f_T(0)| + 2 |f_T(1)| + \frac12 \log\coth\frac{\pi|T|}{2}\right) \mathrm{d}T
\end{align*}
$$

which looks different from the one in the report.
In fact, we have

$$
-\int_{0}^{1} f_T(x)\mathrm{d}x = 1 + \left(-\frac{\pi|T|}{4} - \frac{1}{2} \log \left(1 + \frac{T^2}{4}\right) + \frac{|T|}{2} \arctan \left(\frac{|T|}{2}\right)\right)
$$

Therefore, we have

$$
\log(2\pi e c^2) + \int_{\mathbb{R}} \frac{P_\sigma(T)}{M_\sigma} \left(-\frac{\pi|T|}{4} - \frac{1}{2} \log \left(1 + \frac{T^2}{4}\right) + \frac{|T|}{2} \arctan \left(\frac{|T|}{2}\right)\right)\mathrm{d}T = \log(2\pi c^2) + J_\sigma.
$$

```lean
theorem integral_lowerRiemannLog
    {T : ℝ} (hT : T ≠ 0) :
    -(∫ x in (0 : ℝ)..1, lowerRiemannLog T x) =
      1 + lowerEndpointPhase T := by ...
```

The expression for $h\_\lambda(\lambda T)$ in terms of a Riemann sum for $f\_T$, together with an error estimate for that Riemann sum, is formalized by:

- for even $d$: `lowerGammaBoundaryLog_integer_scaled` and `lower_integer_leftRiemann_error`;
- for odd $d$: `lowerGammaBoundaryLog_halfInteger_scaled`, `lower_halfInteger_midpointRiemann_error`, and `lowerRiemannLog_halfInteger_tail_integral_le`.

The error term is slightly different: it uses the unified bound `lowerRiemannErrorMajorant` for both even and odd dimensions:

$$
3 |f_T(0)| + 2 |f_T(1)| + \frac12 \log\coth\frac{\pi|T|}{2}
$$

(`lowerCoth` is just $\coth$, but with a fancier name!)
The even- and odd-dimensional cases are then combined in the proof of `lowerGammaBoundaryLog_dimension_riemann_le` (the proof begins with `rcases d.even_or_odd ...`).
This proves the upper bound for $h\_\lambda(\lambda T)$, which is then used to prove the upper bound for $H\_\sigma(0)$.

```lean
-- h_λ(λT) ≤ λ(log(2πe c^2) + lowerEndpointPhase T) + error
theorem lowerGammaBoundaryLog_dimension_scaled_riemann_le
    {d : ℕ} (hd : 2 ≤ d) {c T : ℝ}
    (hc : 0 < c) (hT : T ≠ 0) :
    lowerGammaBoundaryLog ((d : ℝ) / 2)
        (c * Real.sqrt d) (((d : ℝ) / 2) * T) ≤
      ((d : ℝ) / 2) *
        (Real.log (2 * Real.pi * Real.exp 1 * c ^ 2) +
          lowerEndpointPhase T) +
        lowerRiemannErrorMajorant T := by ...
```

#### The limit $A\_\sigma \to \log(\pi^2 c^2)$ as $\sigma\to1^{-}$

This is essentially Lemma 3.4 of the report. More precisely, it proves

$$
\lim_{\sigma\to1^{-}} \int_{\mathbb{R}} \frac{P_\sigma(T)}{M_\sigma} \left(-\frac{\pi|T|}{4} - \frac{1}{2} \log \left(1 + \frac{T^2}{4}\right) + \frac{|T|}{2} \arctan \left(\frac{|T|}{2}\right)\right)\mathrm{d}T = \log\left(\frac{\pi}{2}\right) - 1.
$$

The argument uses the pointwise limit

$$
\lim_{\sigma\to1^{-}} \frac{P_\sigma(T)}{M_\sigma} = \frac{\pi}{4\left(\cosh\frac{\pi T}{2} + 1\right)}
$$

and the dominated convergence theorem. In Lean, this appears as `apply tendsto_integral_filter_of_dominated_convergence` in the proof of `tendsto_integral_stripNormalizedPoissonKernel_mul`.

```lean
def limitingStripPoissonDensity (T : ℝ) : ℝ :=
  Real.pi /
    (4 * (Real.cosh (Real.pi * T / 2) + 1))

theorem tendsto_stripNormalizedPoissonKernel (T : ℝ) :
    Tendsto (fun σ : ℝ => stripNormalizedPoissonKernel σ T)
      (𝓝[<] 1) (𝓝 (limitingStripPoissonDensity T)) := by ...

def limitingPoissonEndpointExpectation : ℝ :=
  ∫ T : ℝ,
    limitingStripPoissonDensity T * lowerEndpointPhase T

theorem tendsto_lowerPoissonEndpointExpectation :
    Tendsto lowerPoissonEndpointExpectation (𝓝[<] 1)
      (𝓝 limitingPoissonEndpointExpectation) := by ...

theorem limitingPoissonEndpointExpectation_eq_log_pi_div_two_sub_one :
    limitingPoissonEndpointExpectation =
      Real.log (Real.pi / 2) - 1 := by ...
```

#### $H\_\sigma(s) \le -\gamma \lambda$ for some $0 < \sigma < 1$ and $\gamma>0$, and for all sufficiently large $\lambda=d/2$

By combining the previous estimates, we obtain the first half of Lemma 3.5: $H\_\sigma(s)$ is uniformly negative, with a bound linear in $\lambda=d/2$.

```lean
theorem exists_lowerStripPoissonMajorant_uniform_negative
    {c : ℝ} (hc : 0 < c)
    (hsharp : c < Real.pi⁻¹) :
    ∃ σ γ : ℝ, 0 < σ ∧ σ < 1 ∧ 0 < γ ∧
      ∀ᶠ d : ℕ in atTop,
        ∀ s : ℝ,
          lowerStripPoissonMajorant ((d : ℝ) / 2)
            (c * Real.sqrt d) σ s ≤
              -γ * ((d : ℝ) / 2) := by ...
```

#### $e^{H\_\sigma(\lambda S)}\le C\dfrac{e^{-\gamma\lambda}}{(1+\lvert S\rvert)^2}$

The estimate is formalized as follows:

```lean
theorem exists_lowerStripPoissonMajorant_integrable_majorant
    {c : ℝ} (hc : 0 < c) (hsharp : c < Real.pi⁻¹) :
    ∃ σ γ C : ℝ, 0 < σ ∧ σ < 1 ∧ 0 < γ ∧ 0 < C ∧
      ∀ᶠ d : ℕ in atTop,
        ∀ S : ℝ,
          Real.exp
            (lowerStripPoissonMajorant ((d : ℝ) / 2)
              (c * Real.sqrt d) σ (((d : ℝ) / 2) * S)) ≤
            C * Real.exp (-γ * ((d : ℝ) / 2)) /
              (1 + |S|) ^ 2 := by ...
```

To prove this, we combine the uniform-negativity estimate (`exists_lowerStripPoissonMajorant_uniform_negative`) with the separate logarithmic-tail estimate (`exists_lowerStripPoissonMajorant_logarithmic_tail`):

```lean
theorem exists_lowerStripPoissonMajorant_logarithmic_tail
    {c σ : ℝ} (hc : 0 < c)
    (hσ : 0 ≤ σ) (hσone : σ < 1) :
    ∃ A B κ : ℝ, 0 < A ∧ 0 < B ∧ 0 < κ ∧
      ∀ d : ℕ, 2 ≤ d →
        ∀ S : ℝ, B ≤ |S| →
          lowerStripPoissonMajorant ((d : ℝ) / 2)
            (c * Real.sqrt d) σ (((d : ℝ) / 2) * S) ≤
              -κ * ((d : ℝ) / 2) * Real.log (|S| / A) := by ...
```

This says that there exist constants $A,B,\kappa>0$ such that, for all $d\ge2$ and $\lvert S\rvert\ge B$,

$$
H_\sigma(\lambda S) \le -\kappa \lambda \log\left(\frac{\lvert S\rvert}{A}\right).
$$

Here $\kappa$ is chosen as

$$
\kappa = \frac{1}{2} \int_{-1}^{1} P_\sigma(T) \mathrm{d}T.
$$

#### $\int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds \le CJ\lambda e^{-\gamma\lambda}$

```lean
theorem antiFourierWitness_interiorMellinL1_le_of_integrable_majorant
    {d : ℕ} (hd : 0 < d) {R σ γ C : ℝ}
    (hR : 0 < R) (hσbelow : -1 < σ) (hσabove : σ < 1)
    (w : AntiFourierWitness d R)
    (hpoint : ∀ s : ℝ,
      ‖normalizedRadialMellinStrip hd w.function R
        ((s : ℂ) + Complex.I *
          (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖ ≤
        Real.exp
          (lowerStripPoissonMajorant ((d : ℝ) / 2) R σ s))
    (hmajor : ∀ S : ℝ,
      Real.exp
        (lowerStripPoissonMajorant ((d : ℝ) / 2)
          R σ (((d : ℝ) / 2) * S)) ≤
        C * Real.exp (-γ * ((d : ℝ) / 2)) /
          (1 + |S|) ^ 2) :
    (∫ s : ℝ,
      ‖normalizedRadialMellinStrip hd w.function R
        ((s : ℂ) + Complex.I *
          (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖) ≤
      (C * lowerInverseQuadraticMass) *
        ((d : ℝ) / 2) * Real.exp (-γ * ((d : ℝ) / 2)) := by ...
```

The inverse-quadratic estimate is therefore a convenient corollary of the uniform-negativity and logarithmic-tail estimates already present in Lemma 3.5; it is not substantively stronger than the result in the report. The declaration `antiFourierWitness_interiorMellinL1_le_of_integrable_majorant` then integrates this and obtains

$$
\int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds
\le C J\lambda e^{-\gamma\lambda},
\qquad
J=\int_{\mathbb R}\frac{\mathrm dS}{(1+|S|)^2}.
$$

#### $\int\_{-\infty}^{0} \lvert \varphi(v)\rvert \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int\_{\mathbb{R}} \lvert Z(s + i\sigma\lambda)\rvert \mathrm{d}s$

This is the first inequality in equation (27) of the report, formalized abstractly as follows:

```lean
theorem negativeHalfline_le_of_fourierInversion
    {φ : ℝ → ℝ} (hφ : Integrable φ)
    {a : ℝ} (ha : 0 < a) (Z : ℝ → ℂ)
    (hinversion : ∀ v : ℝ,
      (φ v : ℂ) = (Real.exp (a * v) : ℂ) *
        ((𝓕⁻ (fun ξ : ℝ => Z (2 * Real.pi * ξ)) : ℝ → ℂ) v)) :
    (∫ v in Iic (0 : ℝ), |φ v|) ≤
      ((2 * Real.pi)⁻¹ * ∫ s : ℝ, ‖Z s‖) / a := by ...
```

`𝓕⁻` is the [inverse Fourier transform](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Analysis/Fourier/Notation.html#FourierTransformInv), and the `hinversion` hypothesis is the identity

$$
\varphi(v) = \frac{e^{(1-\sigma)\lambda v}}{2\pi} \int_{\mathbb{R}} Z(s + i\sigma\lambda) e^{i s v} \mathrm{d}s.
$$

But what is $a$?
In the final application, it is

$$
a=(1-\sigma)\frac d2=(1-\sigma)\lambda.
$$

This choice becomes visible only after tracing a chain of four small wrapper theorems down to `no_antiFourierWitness_of_interiorMellinL1_lt_half`:

```lean
theorem no_antiFourierWitness_of_interiorMellinL1_lt_half
    {d : ℕ} (hd : 0 < d) {R σ : ℝ} (hR : 0 < R)
    (hσbelow : -1 < σ) (hσabove : σ < 1)
    (w : AntiFourierWitness d R)
    (hsmall :
      ((2 * Real.pi)⁻¹ *
        ∫ s : ℝ,
          ‖normalizedRadialMellinStrip hd w.function R
            ((s : ℂ) + Complex.I *
              (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖) /
          ((1 - σ) * ((d : ℝ) / 2)) <
        (1 / 2 : ℝ)) : False := by
  have hℓ : 0 < (d : ℝ) / 2 :=
    half_pos (Nat.cast_pos.mpr hd)
  have ha : 0 < (1 - σ) * ((d : ℝ) / 2) :=
    mul_pos (sub_pos.mpr hσabove) hℓ
  have haless :
      (1 - σ) * ((d : ℝ) / 2) < (d : ℝ) := by
    nlinarith [mul_pos (by linarith : 0 < 1 + σ) hℓ]
  have hheight :
      (d : ℝ) / 2 - (1 - σ) * ((d : ℝ) / 2) =
        σ * ((d : ℝ) / 2) := by
    ring
  apply no_antiFourierWitness_of_shiftedMellinL1_lt_half
    hd hR w ha haless
  simpa [hheight] using! hsmall
```

The local hypothesis `ha` proves that this choice of $a$ is positive. After this specialization, `negativeHalfline_le_of_fourierInversion` gives

$$
\int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s.
$$

The proof takes absolute values in the inversion formula and integrates over $v\in(-\infty,0]$, using

$$
\int_{-\infty}^{0}e^{(1-\sigma)\lambda v}\,\mathrm dv
=\frac{1}{(1-\sigma)\lambda}.
$$

### Upper bound

Most of `SpherePacking.lean` is devoted to the upper construction. It formalizes the Fourier pair $f\_-,f\_+$ needed for the LP bound, including its Mellin realization, saddle-point estimates, global nonnegativity of $f\_+$, and eventual nonpositivity of $f\_-$. The main assembly declarations are:

- `saddleSourceSchwartzRealization`, which realizes the explicit minus and plus source functions as radial Schwartz maps;
- `saddleSource_fourier_minus_eq_plus`, which proves their Fourier-pair relation;
- `saddleSourceEventualSigns`, which proves the required signs;
- `saddleOrderedUpperConstruction_of_sourceSigns`, which turns those facts into an admissible asymptotic upper construction;
- `sharpAsymptotics`, which combines that upper construction with `uniformAntiFourierSignRadius`.

The parameter choices are slightly more conservative than those in the report. In Equation (34), the report uses

$$
a_0=\varepsilon^2,\qquad A=\log(1/\varepsilon),\qquad
1-2\varepsilon(1+a)
$$

for the short-shell cutoff, endpoint, and taper. Lean instead defines

```text
shortCutoff ε   = ε ^ 3
shortEndpoint ε = 10 * log (1 / ε)
shortMargin ε a = 1 - 10 * ε * (1 + a)
```

These strengthened margins change neither limiting constant nor proof strategy; they provide extra room in the formal inequalities. Lean also proves weak sign inequalities, which are all that LP admissibility requires, rather than retaining every strict inequality in Theorem 4.1.

The exported conclusion is substantially more complete than the lower-bound section alone suggests:

- `PackingBounds.RadialMain.exact_limit` proves the exact radial LP limit;
- `PackingBounds.fullLinearProgram_eq_radial` identifies the unrestricted and radial programs;
- `PackingBounds.FullMain.exact_limit` proves the unrestricted LP limit;
- `PackingBounds.PackingBridge.sphere_packing_le_radial_linear_program` formalizes the Cohn-Elkies packing bridge;
- `PackingBounds.PackingBridge.sphere_packing_sharp_asymptotic_upper` derives the asymptotic packing-density bound;
- `PackingBounds.sharpFullCohnElkiesManuscriptConclusions` collects the manuscript-level LP conclusions.

What is absent is the other half of Theorem 4.1: Lean does not construct the self-Fourier function $f\_0$, so the $\mathsf A\_+(d)$ upper construction is missing. Although the pair $(f\_-,f\_+)$ could also yield the $\mathsf A\_-(d)$ upper bound, the file never defines $\mathsf A\_\pm(d)$ or packages either asymptotic. It also does not formalize Appendix A's strict inequality $\mathsf A\_+(d)<\mathsf A\_-(d)$.

## Reformalization

<!-- (add later) -->

## Conclusion

I'd say that the proof is *almost* formalized, but definitely not *all*.
Someone may say that I'm to picky, since all the *essence* of the proof are formalized, which is true.
There are a lot of autoformalized results (and there will be more in the future) where the formalized statement $A'$ is not exactly the same as the natural language statement $A$, but $A'$ is just a few *trivial* steps away from $A$ so that you can think it is fine.
But if that is really the case, why don't you just formalize $A$ directly?
The reason is because most of the time people don't read the AI's autoformalized proof and just believe them.
This belief will makes more sense as AI gets better and better, but then it will generate longer slop formalizations, and similar issue will keep persists.
If you want to autoformalize a natural language proof, the best thing you can to is to make every formal statement and argument as close to the natural language proof as possible - using the same notations, no more or less lemmas, and more importantly, make a blueprint.
If your AI is good enough to autoformalize a natural language proof, then it should be good enough to automatically write *a* blueprint that is *not too bad* for a human to read and understand (just push the button few more times), which is way better than having no blueprint at all.
