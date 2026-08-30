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
2. Spend months reading it and write down the important parts.
3. Use AI.

I chose option 3 and used ChatGPT and Claude, relying somewhat more on ChatGPT because the Lean code was itself produced by an OpenAI model.
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

An `AntiFourierWitness` is the main object in the formal lower-bound argument. It consists of a nonzero real-valued radial Schwartz function $g$ satisfying $\widehat g=-g$, $g(0)=0$, and $g(x)\ge0$ for $\lVert x\rVert\ge R$. There is no analogous `SelfFourierWitness` for $\widehat g=g$ in the Lean file.


### Lower bound

The main goal of the lower bound argument is to prove the following statement:

```lean
def criticalRadius : ℝ := (Real.pi)⁻¹

def UniformAntiFourierSignRadius : Prop :=
  ∀ c : ℝ, 0 < c → c < criticalRadius →
    ∀ᶠ d : ℕ in atTop,
      IsEmpty (AntiFourierWitness d (c * Real.sqrt (d : ℝ)))
```

Thus the formalization gives the sharp constant $1/\pi$ a dedicated name.
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

Where is this statement in the Lean code? There is no single named theorem with this quantitative ball-mass conclusion. Most of its analytic ingredients are present, but they are specialized to the anti-self-Fourier witness needed for the eventual contradiction. The file also does not export the restricted ball/profile change-of-variables identity or cover the $+1$ eigenvalue case.

Here is a summarized version of the actual argument in the Lean code.

> *Proof (Lean).* One checks that $\lVert \varphi\rVert\_1=1$, $\int\varphi=0$, and $\varphi(v)\ge0$ for $v\ge0$. Therefore
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \ge \frac{1}{2}.
> $$
>
> There exists $D\_0\in\mathbb R$ such that, for every $D\ge D\_0$, the normalized Mellin transform satisfies, at every interior point $\lvert \Im t\rvert<\lambda$ of the strip,
>
> $$
> |Z(s + i\sigma\lambda)| \le e^{H_{\sigma, D}(s)}
> $$
>
> where $-1 < \sigma < 1$ and
>
> $$
> H_{\sigma,D}(s)=\int_{\mathbb R}P_\sigma(T)\min\{h_\lambda(s-\lambda T),D\}\,\mathrm dT\le H_\sigma(s).
> $$
>
> At the singular point $s-\lambda T=0$, the capped boundary function is defined to have value $D$.
>
> Lean combines a uniform negative bound with a logarithmic tail bound to obtain
>
> $$
> e^{H_\sigma(\lambda S)} \le C \frac{e^{-\gamma\lambda}}{(1 + |S|)^2}
> $$
>
> for a selected $0<\sigma<1$, constants $C,\gamma>0$, all sufficiently large $d$, and every $S\in\mathbb R$. After the change of variables $s=\lambda S$, integration gives
>
> $$
> \frac{1}{2\pi(1-\sigma)\lambda}\int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds
> \le K e^{-\gamma\lambda},
> $$
>
> where
>
> $$
> K=\frac{C}{2\pi(1-\sigma)}\int_{\mathbb R}\frac{\mathrm dS}{(1+|S|)^2}.
> $$
>
> Shifted Mellin/Fourier inversion gives
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s
> $$
>
> and hence
>
> $$
> \frac12\le\int_{-\infty}^{0}|\varphi(v)|\,\mathrm dv\le K e^{-\gamma\lambda},
> $$
>
> which is a contradiction for sufficiently large $\lambda = d/2$.

The details differ slightly from those in the report, although the main analytic mechanism is the same:

- Lean specializes to the eigenvalue $-1$ and bundles exterior nonnegativity into `AntiFourierWitness`.
- It does not export Proposition 3.1 or the restricted ball/profile identity; instead it uses the negative-half-line estimate immediately in a $<1/2$ contradiction.
- The Poisson step is implemented using capped boundary data, a holomorphic outer function, and Phragmén-Lindelöf, rather than directly invoking subharmonic Poisson theory for $\log\lvert Z\rvert$.
- The report integrates a central region and a dimension-dependent power tail. Lean packages the same information into the fixed integrable profile $(1+\lvert S\rvert)^{-2}$.

Here is how these steps are formalized.

#### $\frac12\le\int\_{-\infty}^{0}\lvert \varphi(v)\rvert\,\mathrm dv$

This is an easy step that almost directly follows from the definition of $\varphi$ and the properties of $g$.
The formal statement is as follows:

```lean
theorem normalizedProfile_negativeHalfline_mass_ge_half {φ : ℝ → ℝ}
    (hφ : Integrable φ)
    (hmean : (∫ v : ℝ, φ v) = 0)
    (hmass : (∫ v : ℝ, |φ v|) = 1)
    (hsign : ∀ v : ℝ, 0 ≤ v → 0 ≤ φ v) :
    (1 / 2 : ℝ) ≤ ∫ v in Iic (0 : ℝ), |φ v| := by ...
```

#### $\lvert Z(s+i\sigma\lambda)\rvert\le e^{H\_{\sigma,D}(s)}$

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

The truncation argument is explained in the last bit of the proof of Lemma 3.2.
The exponent on the right-hand side is the capped Poisson majorant

$$
\int_{\mathbb{R}} P_\sigma(T) \min\{h_\lambda(s - \lambda T), D\} \mathrm{d}T
$$

Taking $D\to\infty$ gives the uncapped bound from Lemma 3.2. This passage *is* formalized: `lowerStripCappedPoisson_tendsto_radius` proves convergence of the capped Poisson integrals, and `antiFourierWitness_norm_le_poisson_of_eventually_capped_radius` transfers the norm bound to the limit.

The informal proof applies the upper-half-plane Poisson principle to $\log\lvert Z\circ\Phi^{-1}\rvert$. Lean encodes the same Poisson extension through a holomorphic outer function, then uses a Phragmén-Lindelöf principle as its maximum-principle step:

> **Phragmén–Lindelöf principle for a horizontal strip.** Let $f:\mathbb C\to\mathbb C$ be holomorphic on $\lbrace z:a<\Im z<b\rbrace$ and continuous on its closure. Suppose that $\lvert f(z)\rvert=O(\exp(B\exp(c\lvert \Re z\rvert)))$ for constants $B$ and $c<\pi/(b-a)$ as $\lvert \Re z\rvert\to\infty$. If $\lvert f(z)\rvert\le C$ on the two boundary lines, then $\lvert f(z)\rvert\le C$ throughout the strip.

This is a version of the maximum-modulus principle for a horizontal strip. The file proves a custom theorem, `horizontalStrip_norm_extension_majorization`. Mathlib already contains the related theorem [`PhragmenLindelof.horizontal_strip`](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Analysis/Complex/PhragmenLindelof.html#PhragmenLindelof.horizontal_strip), but it is not quite a drop-in replacement: the custom theorem permits a separate continuous extension of the norm to the closed strip.

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
> \widetilde K_\lambda(z,y)=K_\lambda(z,y)-
> \begin{cases}
> -\dfrac{i}{4\lambda},&y\ge0,\\[2mm]
> \dfrac{i}{4\lambda},&y<0.
> \end{cases}
> $$
>
> Here $K\_\lambda$ is a holomorphic version of the Poisson kernel, while $\widetilde K\_\lambda$ is regularized so that it tends to zero as $\lvert y\rvert\to\infty$. Define
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
> In the open strip, for $-1<\sigma<1$, its real part is
>
> $$
> \Re W_D(s+i\sigma\lambda)
> =\int_{\mathbb R}P_\sigma(T)h_{\lambda,D}(s-\lambda T)\,\mathrm dT.
> $$
>
> Formally, Lean constructs a separate continuous function $E$ on the closed strip. It agrees with $\Re W\_D$ in the interior and has edge values $E=h\_{\lambda,D}$ on the bottom and $E=0$ on the top. Set $F\_D(z)=e^{-W\_D(z)}Z(z)$ in the open strip and define the closed-strip norm extension $N(z)=e^{-E(z)}\lvert Z(z)\rvert$. In the interior, $N=\lvert F\_D\rvert$. The two boundary estimates give $N\le1$ on both edges, and the growth estimate and Phragmén-Lindelöf then give $\lvert F\_D\rvert\le1$ inside. Therefore
>
> $$
> |Z(z)|\le e^{\Re W_D(z)}.
> $$

```lean
theorem antiFourierWitness_capped_poisson_majorization_of_real_extension
    {d : ℕ} (hd : 0 < d) {R : ℝ}
    (w : AntiFourierWitness d R) (D : ℝ)
    (E : ℂ → ℝ)
    (hE : ContinuousOn E
      (Complex.im ⁻¹'
        Icc (-((d : ℝ) / 2)) ((d : ℝ) / 2)))
    (hEinterior : ∀ z : ℂ,
      z.im ∈ Ioo (-((d : ℝ) / 2)) ((d : ℝ) / 2) →
        E z = (lowerStripCappedGammaOuter
          ((d : ℝ) / 2) R D z).re)
    (hEbottom : ∀ z : ℂ,
      z.im = -((d : ℝ) / 2) →
        E z = lowerGammaBoundaryCapped
          ((d : ℝ) / 2) R D z.re)
    (hEtop : ∀ z : ℂ,
      z.im = (d : ℝ) / 2 → E z = 0)
    (hcap : ∀ y : ℝ,
      ‖normalizedRadialMellinStrip hd w.function R
        ((y : ℂ) -
          Complex.I * (((d : ℝ) / 2 : ℝ) : ℂ))‖ ≤
        Real.exp (lowerGammaBoundaryCapped
          ((d : ℝ) / 2) R D y))
    {σ : ℝ} (hbelow : -1 < σ) (habove : σ < 1)
    (s : ℝ) :
    ‖normalizedRadialMellinStrip hd w.function R
      ((s : ℂ) + Complex.I *
        ((σ * ((d : ℝ) / 2) : ℝ) : ℂ))‖ ≤
      Real.exp
        (∫ T : ℝ, stripPoissonKernel σ T *
          lowerGammaBoundaryCapped
            ((d : ℝ) / 2) R D
            (s - ((d : ℝ) / 2) * T)) := by ...
```




`normalizedRadialMellinStrip_top_norm_le_one` and `normalizedRadialMellinStrip_bottom_norm_le_gamma` provide the top- and bottom-edge bounds from Lemma 3.2. The declaration `antiFourierWitness_normalizedMellinStrip_bottom_norm_le_gamma` is a convenience wrapper specializing the latter to an `AntiFourierWitness`.

The eventual capped bottom-edge estimate is packaged as follows:

```lean
theorem exists_antiFourierWitness_eventually_capped_bottom_majorant
    {d : ℕ} (hd : 0 < d) {R : ℝ} (hR : 0 < R)
    (w : AntiFourierWitness d R) :
    ∃ D₀ : ℝ, ∀ D : ℝ, D₀ ≤ D → ∀ y : ℝ,
      ‖normalizedRadialMellinStrip hd w.function R
        ((y : ℂ) -
          Complex.I * (((d : ℝ) / 2 : ℝ) : ℂ))‖ ≤
        Real.exp (lowerGammaBoundaryCapped
          ((d : ℝ) / 2) R D y) := by ...
```

#### $e^{H\_\sigma(\lambda S)}\le C\dfrac{e^{-\gamma\lambda}}{(1+\lvert S\rvert)^2}$

The report's uniform negativity and logarithmic tail are packaged into a fixed inverse-quadratic majorant:

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

Its uniform-negative input is a separate theorem:

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

The other input is `exists_lowerStripPoissonMajorant_logarithmic_tail`. Thus the inverse-quadratic estimate is a convenient corollary of the two estimates already present in Lemma 3.5, not a substantively stronger theorem than the report. The declaration `antiFourierWitness_interiorMellinL1_le_of_integrable_majorant` then integrates this profile and obtains

$$
\int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds
\le C I\lambda e^{-\gamma\lambda},
\qquad
I=\int_{\mathbb R}\frac{\mathrm dS}{(1+|S|)^2}.
$$





#### $\int\_{-\infty}^{0} \lvert \varphi(v)\rvert \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int\_{\mathbb{R}} \lvert Z(s + i\sigma\lambda)\rvert \mathrm{d}s$

This is the first inequality in Equation (27) of the report, formalized abstractly as follows:

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
\varphi(v) = \frac{e^{(1-\sigma)\lambda v}}{2\pi} \int_{\mathbb{R}} Z(s + i\sigma\lambda) e^{i s v} \mathrm{d}s
$$

In the eventual application, the abstract parameter is

$$
a=(1-\sigma)\frac d2=(1-\sigma)\lambda.
$$

This becomes visible only after following four small wrapper theorems to `no_antiFourierWitness_of_interiorMellinL1_lt_half`:

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

The local hypothesis `ha` proves that this value of $a$ is positive. After specialization, `negativeHalfline_le_of_fourierInversion` gives

$$
\int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s
$$

The proof takes absolute values in the inversion identity and integrates over $v\in(-\infty,0]$, using

$$
\int_{-\infty}^{0}e^{(1-\sigma)\lambda v}\,\mathrm dv
=\frac{1}{(1-\sigma)\lambda}.
$$

---

#### Putting the lower-bound pieces together

The theorem `no_antiFourierWitness_of_interiorMellinL1_lt_half` is written contrapositively. In ordinary mathematical language, it says that, for $d>0$, $R>0$, and $-1<\sigma<1$, every `AntiFourierWitness d R` must satisfy

$$
\frac{1}{2\pi(1-\sigma)\lambda}
\int_{\mathbb R}|Z(s+i\sigma\lambda)|\,\mathrm ds\ge\frac12.
$$

The proof has two parallel analytic inputs, so its dependency shape is

```text
capped Poisson majorization + capped-to-uncapped limit
    └──→ uncapped pointwise bound ──────────────────────┐
                                                        │
uniform negativity + logarithmic tail                   │
    └──→ integrable inverse-quadratic majorant ──────────┤
                                                        ↓
                                  interior Mellin L¹ bound
                                                        ↓
                                      < 1/2 contradiction
                                                        ↓
                                         uniform sign radius
```

`uniformAntiFourierSignRadius_of_poisson_majorization` performs most of the assembly from the uncapped pointwise bound onward. The wrapper `uniformAntiFourierSignRadius_of_capped_poisson_majorization` first uses `lowerStripCappedPoisson_tendsto_radius` to remove the cap, and `uniformAntiFourierSignRadius` supplies the capped majorization theorem. This final result is logically closer to the anti-self-Fourier case of Proposition 3.7 than to Proposition 3.1 itself. The Mellin $L^1$ estimate is present inside the proof, but the ball-mass conclusion of Proposition 3.1 is not exported as a theorem.

#### Where $1/\pi$ appears in Lean

The report writes the decisive central coefficient as

$$
\log(2\pi c^2)+J_\sigma,
\qquad J_\sigma\longrightarrow\log(\pi/2).
$$

Lean uses an alternative sufficient one-sided endpoint estimate in `lowerStripPoissonMajorant_dimension_central_bound`. Its coefficient is

$$
\log(2\pi e c^2)+\operatorname{lowerPoissonEndpointExpectation}(\sigma).
$$

The theorems `tendsto_lowerPoissonEndpointExpectation` and `limitingPoissonEndpointExpectation_eq_log_pi_div_two_sub_one` show that the second term tends to $\log(\pi/2)-1$. Therefore the whole coefficient tends to

$$
\log(2\pi e c^2)+\log(\pi/2)-1=\log(\pi^2c^2),
$$

which is negative exactly when $c<1/\pi$. Thus this portion of Lean is an alternative sufficient formulation of Lemmas 3.3 and 3.4, rather than a line-by-line transcription of them.

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
