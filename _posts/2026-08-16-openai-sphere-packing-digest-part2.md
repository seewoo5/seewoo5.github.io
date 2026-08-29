---
layout: posts
title:  "Digestion of Astra's result on the high-dimensional sphere packing problem - Part 2, Formal"
date:   2026-08-27
categories: jekyll update
tags: math ai
---

In the [previous post](), I explained the idea of the proof of the optimal Cohn-Elkies LP bound exponent and the sign uncertainty principle constant by OpenAI's new model Astra.
They have Lean formalizations of all 10 results in their report, including the sphere packing problem.
Here we will dig into the formalization and see how faithful it is to the report, in particular, what is the same, what is the different, and what is missing.
In particular, I'm trying to explain how the non-formal statements and proofs in the report correspond to the formal statements and proofs in the Lean code.
Note that some comments are added for the sake of explanation, and they are not part of the original Lean code.

(also reformat?)

## Overview of the formalization

The Lean code can be found [here](https://github.com/openai/ten-proofs/blob/main/SpherePacking.lean).
It is a single Lean file of 55616 lines.

- It does [Comparator]() check and also have [`formalization.yaml`]() file, which are now standard for autoformalized proofs. However, `formalization.yaml` file do not contain any useful information. Note that you can record many things here; see [the official template]().
(You can even let your AI write your `formalization.yaml` file for you. Just make it informative.)
- THERE ARE TOO MANY DEFINITIONS, which make it extremely hard to read.
- On the first day when they announced the result, I remember that the repository were keep updated with force-push, so you won't be able to find any previous git history.
- Some parts of the code are borrowed from the [sphere packing project](https://github.com/thefundamentaltheor3m/Sphere-Packing-Lean).
- There's no blueprint!

So how can I read 55K lines of Lean code? There are several choices:
1. Don't read, 
2. Read for months and keep important stuffs behind,
3. Use AI.

I choose 3), and I used ChatGPT and Claude, probably expect more to ChatGPT since the Lean code is also written by (some version of) ChatGPT.
I asked it to give a table of mappings between theorems and lemmas in the report and the Lean code.

The conclusion is that the Lean code *almost* reflect the report, but there are some missing results in the Lean code.
Notably,

- The reduction to radial and Schwartz functions is not formalized.
- The definition of sign uncertainty principle constants $\mathrm{A}\_+(d)$ and $\mathrm{A}\_-(d)$ are not formalized. Likewise, the inequailty $\mathrm{A}\_+(d) < \mathrm{A}\_-(d)$ in the Appendix (Proposition A.1) is not formalized.
- For upper bound, the function $f_0$ is not formalized, while the Fourier pairs $(f_+, f_-)$ are formalized. The former proves the upper bound of $\mathrm{A}\_+(d)$.

In other words, the formalization is really about the Cohn-Elkies LP bound exponent and $\mathrm{A}\_-(d)$, but not about $\mathrm{A}\_+(d)$.
Of course, the argument is almost identical, but the formalization is not complete anyway.

## Basic definitions

Some of the basic definitions including Schwartz space, radial function, etc., are formalized as follows:

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

`AntiFourierWitness` is the main object of study in the lower bound argument, which is a radial Schwartz function $g$ satisfying $\widehat{g} = -g$, $g(0) = 0$, and $g(x) \ge 0$ for $\|x\| \ge R$.
As mentioned above, there's no e.g. `SelfFourierWitness` for the functions $\widehat{g} = g$ in the Lean code.


### Lower bound

The main goal of the lower bound argument is to prove the following statement:

```lean
def criticalRadius : ℝ := (Real.pi)⁻¹

def UniformAntiFourierSignRadius : Prop :=
  ∀ c : ℝ, 0 < c → c < criticalRadius →
    ∀ᶠ d : ℕ in atTop,
      IsEmpty (AntiFourierWitness d (c * Real.sqrt (d : ℝ)))
```

So they have a dedicated name for the constant $1/\pi$ (which makes sense, but...).
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

The main result for the lower bound was the following Proposition 3.1:

> **Proposition 3.1.** For every $0 < c < 1/\pi$, there exists $C_c, \gamma_c > 0$ and $d_0(c) \in \mathbb{N}$ such that, for every $d \ge d_0(c)$, every $\varsigma \in \\{-1, +1\\}$, and eveyr nonzero $g \in \mathcal{S}_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ satisfying $\widehat{g} = \varsigma g$ and $g(0) = 0$, one has
>
> $$
> \int_{|x| < c \sqrt{d}} |g(x)| \mathrm{d}x \le C_c e^{-\gamma_c d} \|g\|_1.
> $$

So where can you find this statement in the Lean code?
The answer is, **nowhere!** I couldn't find formal statement correspond to this, neither ChatGPT-5.6 Sol nor Claude Fable 5.
Is this a big issue? **Not really!** The formal proof *almost* corresponds to the non-formal argument, but there are some differences.

Here is a summarized version of the actual argument in the Lean code.

> *Proof (Lean).* One can check that $\|\|\varphi\|\|_1 = 1$, $\int \varphi = 0$, and $\varphi(v) \ge 0$ for $v \ge 0$. From this, we have
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \ge \frac{1}{2}.
> $$
>
> Let $D \in \mathbb{R}$. For sufficiently large $D$, we can also bound the normalized Mellin transform $Z$ on the strip $\|\Im t\| \le \lambda$ as
>
> $$
> |Z(s + i\sigma\lambda)| \le e^{H_{\sigma, D}(s)}
> $$
>
> where $-1 < \sigma < 1$ and
>
> $$
> H_{\sigma, D}(s) = \int_{\mathbb{R}} P_\sigma(T) \min\{h_\lambda(s - T), D\} \mathrm{d}T \le H_\sigma(s).
> $$
>
> By the way, $H\_\sigma(s)$ is bounded as
>
> $$
> e^{H_\sigma(\lambda s)} \le C \frac{e^{-\gamma\lambda}}{(1 + |s|)^2}
> $$
>
> for some constant $C > 0$. Combining with the above bound and integrating over $s$ gives
>
> $$
> \frac{1}{\pi(1-\sigma)\lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le K e^{-\gamma\lambda}
> $$
>
> where $K = \frac{C}{2\pi(1-\sigma)} \int\_{\mathbb{R}} \frac{\mathrm{d}s}{(1 + \|s\|)^2}$. The integral of the left-hand side can be bounded below using
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s
> $$
>
> and we get 
>
> $$
> \frac{1}{2} \le \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{Ke^{-\gamma\lambda}}{2},
> $$
>
> which is a contradiction for sufficiently large $\lambda = d/2$.

Details of the argument are slightly different from the report, but the main idea is the same.
Here are the differences:

- 

Now we will see how these steps are formalized.

#### $\frac{1}{2} \le \int\_{-\infty}^{0} \|\varphi\|$

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

#### $\|Z(s + i\sigma\lambda)\| \le e^{H\_{\sigma,D}(s)}$

This is the bound in Lemma 3.2 of the report.
There's no formalization of it. Instead, we have a *truncated* (capped) version of this:

```lean
-- |Z(s + iσλ)| \le exp(∫ P_σ(T) \min{h_λ(s - T), D} dT) for sufficiently large D
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
The above truncated bound translates as

$$
\int_{\mathbb{R}} P_\sigma(T) \min\{h_\lambda(s - T), D\} \mathrm{d}T
$$

and taking $D \to \infty$ gives the original bound in Lemma 3.2 (by dominated convergence theorem), which is not formalized.

One gets the original inequality by taking $D \to \infty$, which is not done in the Lean code, although we don't need it.

`normalizedRadialMellinStrip_top_norm_le_one` and `normalizedRadialMellinStrip_bottom_norm_le_gamma` are also part of Lemma 3.2, which give the bounds on the top and bottom boundaries of the strip.
There's also `antiFourierWitness_normalizedMellinStrip_bottom_norm_le_gamma`, which is nothing but just stating `normalizedRadialMellinStrip_bottom_norm_le_gamma` again.

truncated (capped) version
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

#### $H\_\sigma(\lambda s) \le C \frac{e^{-\gamma\lambda}}{(1 + |s|)^2}$



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




```lean
theorem exists_lowerStripPoissonMajorant_uniform_negative
    {c : ℝ} (hc : 0 < c)
    (hsharp : c < Real.pi⁻¹) :
    ∃ σ γ : ℝ, 0 < σ ∧ σ < 1 ∧ 0 < γ ∧
      ∀ᶠ d : ℕ in atTop,
        ∀ s : ℝ,
          lowerStripPoissonMajorant ((d : ℝ) / 2)
            (c * Real.sqrt d) σ s ≤
              -γ * ((d : ℝ) / 2) := by
```





#### $\int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s$

This is (half of) the equation (27) of the report, which is almost formalized as follows:

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

Wait, what is `a` here? To figure it out, you need to follow chain of (almost same) 4 theorems until you reach

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

where you can finally figure out that actual application is $a = (1-\sigma)d/2 = (1 - \sigma)\lambda$ from `ha`. Phew! I don't think this one-variable generalization is a good idea.
From this, you can see that `negativeHalfline_le_of_fourierInversion` eventually proves (after specialization)

$$
\int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s
$$

which is exactly what we want.
The proof is nothing but taking the absolute value of the identity above and integrate over $v \in (-\infty, 0]$, where $\int\_{-\infty}^{0} e^{(1-\sigma)\lambda v} \mathrm{d}v = 1 / ((1-\sigma)\lambda)$ is used.




---


There *is* a formalization that *almost* corresponds to this statement, which is the following theorem:

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
        (1 / 2 : ℝ)) : False := by ...
```

In a natural language, this can be translated as follows:

> Let $R > 0$ and $-1 < \sigma < 1$. Let $g \in \mathcal{S}\_{\mathrm{rad}}(\mathbb{R}^d;\mathbb{R})$ be a nonzero function satisfying $\widehat{g} = -g$, $g(0) = 0$, $g(x) \ge 0$ for $\|x\| \ge R$. Then
>
> $$
> \frac{1}{2\pi (1 - \sigma) \lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \ge \frac{1}{2}
> $$

These are written in a contrapositive way, but I translated as above since this is better to understand.
How this statement related to the Proposition 3.1?




This theorem can be translated as follows:

> Let $0 < c < 1/\pi$. Then there exists $0 < \sigma < 1$, $\gamma > 0$, and $C > 0$ such that, for every sufficiently large $d$ and every $S \in \mathbb{R}$, we have
>
> $$
> e^{H_\sigma(\lambda S)} \le C \frac{e^{-\gamma\lambda}}{(1 + |S|)^2}.
> $$

Well, this seems to be a new statement that is not in the report. In fact, it is slightly stronger than what is written in the report - you have an extra $1 / (1 + \|S\|)^2$ factor.
Since $|Z|$ is bounded by $e^{H\_\sigma}$, this would give an upper bound on the integral of $|Z|$, which is exactly the following:

```lean
theorem uniformAntiFourierSignRadius_of_poisson_majorization
    (hpoisson :
      ∀ {d : ℕ} (hd : 0 < d) {R : ℝ} (_hR : 0 < R)
        (w : AntiFourierWitness d R)
        {σ : ℝ} (_hσbelow : -1 < σ) (_hσabove : σ < 1)
        (s : ℝ),
        ‖normalizedRadialMellinStrip hd w.function R
          ((s : ℂ) + Complex.I *
            (((σ * ((d : ℝ) / 2) : ℝ) : ℂ)))‖ ≤
          Real.exp
            (lowerStripPoissonMajorant ((d : ℝ) / 2) R σ s)) :
    UniformAntiFourierSignRadius := by ...
```


> **Lemma 3.2.** For every $-1 < \sigma < 1$, the function $Z$ is bounded an holomorphic on a neighborhood of the strip $\|\Im t\| \le \lambda$. Its boundary values satisfy $\|Z(y + i\lambda)\| \le 1$ and $\log\|Z(y - i\lambda)\| \le h_\lambda(y)$ for $y \ne 0$, where the lower-boundary majorant is
>
> $$
> h_\lambda(y) = \lambda \log(\pi R^2) + \log |\Gamma(-iy/2)| - \log |\Gamma(\lambda + iy/2)|.
> $$
>
> Writing $\theta = \pi(1+\sigma)/2$, define
>
> $$
> P_\sigma(T) = \frac{\sin\theta}{4(\cosh(\pi T/2) - \cos\theta)}, \quad M_\sigma = \int_{\mathbb{R}} P_\sigma(T) \mathrm{d}T = \frac{1-\sigma}{2}.
> $$
>
> Then
>
> $$
> |Z(s + i\sigma\lambda)| \le \exp(H_\sigma(s)), \quad H_\sigma(s) = \int_{\mathbb{R}} P_\sigma(T) h_\lambda(s - T) \mathrm{d}T \quad (s \in \mathbb{R}).
> $$

This lemma is formalized in Lean as follows. There are three bounds on $Z$ in the lemma, which correspond to the last three theorems in the Lean code below.

```lean
-- |Z(y + iλ)| \le 1
theorem normalizedRadialMellinStrip_top_norm_le_one {d : ℕ}
    (hd : 0 < d) (f : TestFunction d)
    (hf : IsRadial f) (hnonzero : f ≠ 0)
    (R : ℝ) (y : ℝ) :
    ‖normalizedRadialMellinStrip hd f R
        ((y : ℂ) +
          Complex.I * (((d : ℝ) / 2 : ℝ) : ℂ))‖ ≤ 1 := by ...

-- |Z(y - iλ)| \le exp(h_λ(y))
theorem normalizedRadialMellinStrip_bottom_norm_le_gamma {d : ℕ}
    (hd : 0 < d) (f : TestFunction d) (hf : IsRadial f)
    (hzero : f (0 : Euclidean d) = 0)
    (hanti : (𝓕 f : TestFunction d) = -f)
    (hnonzero : f ≠ 0)
    (R : ℝ) (hR : 0 < R) (y : ℝ) (hy : y ≠ 0) :
    ‖normalizedRadialMellinStrip hd f R
        ((y : ℂ) -
          Complex.I * (((d : ℝ) / 2 : ℝ) : ℂ))‖ ≤
      Real.exp
        (((d : ℝ) / 2) * Real.log (Real.pi * R ^ 2) +
          Real.log
            ‖Complex.Gamma (-Complex.I * (y : ℂ) / 2)‖ -
          Real.log
            ‖Complex.Gamma
              (((d : ℝ) / 2 : ℝ) +
                Complex.I * (y : ℂ) / 2)‖) := by ...

-- |Z(s + iσλ)| \le exp(∫ P_σ(T) h_λ(s - T) dT)
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

> **Lemma 3.3.** For every $-1 < \sigma < 1$, there exists $C_\sigma > 0$, independent of $d$, $c$, and $g$, such that
>
> $$
> \int_{\mathbb{R}} P_\sigma(T) \left|h_\lambda(\lambda T) - \lambda \left(\log(2\pi c^2) - \int_0^1 \log \sqrt{x^2 + T^2/4} \mathrm{d}x\right)\right| \mathrm{d}T \le C_\sigma \log(2 + \lambda).
> $$
>
> Define
>
> $$
> J_\sigma := -\frac{1}{M_\sigma} \int_{\mathbb{R}} P_\sigma(T) \int_0^1 \log \sqrt{x^2 + T^2/4} \mathrm{d}x \mathrm{d}T.
> $$
>
> Then, for every $s \in \mathbb{R}$
>
> $$
> H_\sigma(s) \le H_\sigma(0) = \lambda M_\sigma (\log(2\pi c^2) + J_\sigma) + O_\sigma(\log(2 + \lambda)).
> $$

```lean
def lowerCoth (x : ℝ) : ℝ :=
  Real.cosh x / Real.sinh x

def lowerRiemannLog (T x : ℝ) : ℝ :=
  Real.log (Real.sqrt (x ^ 2 + T ^ 2 / 4))

def lowerRiemannErrorMajorant (T : ℝ) : ℝ :=
  3 * |lowerRiemannLog T 0| +
    2 * |lowerRiemannLog T 1| +
      (1 / 2 : ℝ) *
        Real.log (lowerCoth (Real.pi * |T| / 2))

def lowerRiemannPoissonError (σ : ℝ) : ℝ :=
  ∫ T : ℝ,
    stripPoissonKernel σ T * lowerRiemannErrorMajorant T

def lowerGammaBoundaryLog (ℓ R y : ℝ) : ℝ :=
  ℓ * Real.log (Real.pi * R ^ 2) +
    Real.log ‖Complex.Gamma (-Complex.I * (y : ℂ) / 2)‖ -
    Real.log ‖Complex.Gamma ((ℓ : ℂ) + Complex.I * (y : ℂ) / 2)‖

def lowerGammaBoundaryCapped (ℓ R D y : ℝ) : ℝ :=
  if y = 0 then D else min (lowerGammaBoundaryLog ℓ R y) D

def lowerEndpointPhase (T : ℝ) : ℝ :=
  -Real.pi * |T| / 4 - (1 / 2 : ℝ) * Real.log (1 + T ^ 2 / 4) +
    |T| / 2 * Real.arctan (|T| / 2)

-- H_σ(s)
def lowerStripPoissonMajorant (ℓ R σ s : ℝ) : ℝ :=
  ∫ T : ℝ,
    stripPoissonKernel σ T *
      lowerGammaBoundaryLog ℓ R (s - ℓ * T)

-- H_σ(s) \le H_σ(0)
theorem lowerStripPoissonMajorant_dimension_centered_max
    {d : ℕ} (hd : 2 ≤ d) {c σ : ℝ}
    (hc : 0 < c)
    (hbelow : -1 < σ) (habove : σ < 1) (s : ℝ) :
    lowerStripPoissonMajorant ((d : ℝ) / 2)
      (c * Real.sqrt d) σ s ≤
      lowerStripPoissonMajorant ((d : ℝ) / 2)
        (c * Real.sqrt d) σ 0 := by ...

theorem lowerGammaBoundaryLog_dimension_scaled_riemann_le
    {d : ℕ} (hd : 2 ≤ d) {c T : ℝ}
    (hc : 0 < c) (hT : T ≠ 0) :
    lowerGammaBoundaryLog ((d : ℝ) / 2)
        (c * Real.sqrt d) (((d : ℝ) / 2) * T) ≤
      ((d : ℝ) / 2) *
        (Real.log (2 * Real.pi * Real.exp 1 * c ^ 2) +
          lowerEndpointPhase T) +
        lowerRiemannErrorMajorant T := by ...

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

> **Lemma 3.4.** For $J_\sigma$ defined in Lemma 3.3,
>
> $$
> \lim_{\sigma \to 1^{-}} J_\sigma = \log\frac{\pi}{2}.
> $$
>
> Consequently, for every $0 < c < 1/\pi$, there exists $\sigma_c \in (-1, 1)$ such that $\log(2\pi c^2) + J_\sigma < 0$.

In some sense, this lemma is the point where the constant $1/\pi$ comes from.

> *Proof.*

> **Lemma 3.5.** There exists $\gamma_c, C_c', B_c > 0$, depending only on $c$, such that, for every sufficiently large $d$,
>
> $$
> H_\sigma(s) \le -\gamma_c \lambda \quad(s \in \mathbb{R}), \quad \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le C_c' \lambda e^{-\gamma_c \lambda}.
> $$
>
> Moreover, after increasing $B_c$ if necessary,
>
> $$
> H_\sigma(\lambda s) \le - \frac{M_\sigma \lambda}{2} \log \frac{|s|}{C_c'} \quad (|s| \ge B_c).
> $$

> *Proof.*

Using Lemma 3.5, we can bound the integral of $\|\varphi\|$ over $(-\infty, 0)$.

> **Lemma 3.6.** For every $0 < c < 1/\pi$, there exists $C_c, \gamma_c > 0$ and $d_0(c) \in \mathbb{N}$, independent of $g$ and $\varsigma$, such that
>
> $$
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v \le C_c e^{-\gamma_c d}.
> $$

> *Proof.* From the Fourier inversion formula, we have
>
> $$
> \varphi(v) = \frac{e^{(1 - \sigma)\lambda v}}{2\pi} \int_{\mathbb{R}} Z(s + i\sigma\lambda) e^{isv} \mathrm{d}s.
> $$
>
> Taking absolute values and integrating over $v \in (-\infty, 0)$, we get
>
> $$
> \begin{align*}
> \int_{-\infty}^{0} |\varphi(v)| \mathrm{d}v &\le \frac{1}{2\pi} \int_{-\infty}^{0} e^{(1 - \sigma)\lambda v} \mathrm{d}v \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \\
> &= \frac{1}{2\pi (1 - \sigma)\lambda} \int_{\mathbb{R}} |Z(s + i\sigma\lambda)| \mathrm{d}s \le C_c e^{-\gamma_c d}
> \end{align*}
> $$
>
> where $C_c = \frac{1}{2\pi(1 - \sigma)} C_c'$. $\square$


Lemma 3.2



### Upper bound


### Alternative formalization