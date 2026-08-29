# Notes on Chapter 1 of *Ten Advances in Mathematics and Theoretical Computer Science* and `SpherePacking.lean`

## Purpose

These notes summarize a discussion about the proof of the optimal exponent for the Cohn–Elkies linear-programming bound in Chapter 1 of

- Paper: <https://cdn.openai.com/pdf/ten-proofs-oai.pdf>
- Lean source: <https://github.com/openai/ten-proofs/blob/main/SpherePacking.lean>

The main focus is the lower-bound/uncertainty-principle part of the proof, especially Proposition 3.1, Lemmas 3.2–3.6, and the way the corresponding argument is organized in Lean.

The most important correction is:

> Proposition 3.1 is **not** formalized as a single named theorem in `SpherePacking.lean`.  
> The Lean file formalizes many analytic ingredients, specializes them to the anti-self-Fourier case needed for Cohn–Elkies, and then proceeds directly to a sign-radius contradiction. It does not export the quantitative ball-mass estimate in the form stated in Proposition 3.1.

Exact line numbers may change with the repository, so theorem names are more reliable than line numbers. On a local checkout, use commands such as

```bash
rg -n "exists_lowerStripPoissonMajorant_integrable_majorant" SpherePacking.lean
rg -n "negativeHalfline_le_of_fourierInversion" SpherePacking.lean
rg -n "uniformAntiFourierSignRadius_of_poisson_majorization" SpherePacking.lean
```

to locate the relevant code.

---

# 1. Proposition 3.1 and the first incorrect identification

## 1.1 Informal statement

Proposition 3.1 states, in essence, that for every

$$
0<c<\frac{1}{\pi},
$$

there exist constants $C_c,\gamma_c>0$ and $d_0(c)$ such that, whenever $d\ge d_0(c)$ and $g$ is a nonzero real-valued radial Schwartz function satisfying

$$
\widehat{g}=\varsigma g,
\qquad
\varsigma\in\{-1,+1\},
\qquad
g(0)=0,
$$

one has

$$
\int_{\lVert x\rVert<c\sqrt d}|g(x)|\,dx
\le
C_c e^{-\gamma_c d}\lVert g\rVert_{L^1(\mathbb{R}^d)}.
\tag{1.1}
$$

This is a quantitative concentration estimate: an exponentially small proportion of the $L^1$-mass lies inside the ball of radius $c\sqrt d$.

## 1.2 Why the initially suggested Lean theorems were not correct counterparts

The following theorems were initially suggested:

```lean
antiFourierWitness_normalizedRadialLogProfile
no_normalizedProfile_of_fourierInversion_lt_half
no_antiFourierWitness_of_interiorMellinL1_lt_half
```

They do not state Proposition 3.1.

- `antiFourierWitness_normalizedRadialLogProfile` packages normalization, zero mean, total absolute mass $1$, and exterior nonnegativity of a logarithmic radial profile.
- `no_normalizedProfile_of_fourierInversion_lt_half` is an abstract contradiction lemma: a lower bound $\ge 1/2$ for negative-half-line mass conflicts with a Fourier-inversion upper bound $<1/2$.
- `no_antiFourierWitness_of_interiorMellinL1_lt_half` specializes this contradiction to an anti-self-Fourier witness.

All three belong more naturally to the later sign-radius contradiction. None concludes an exponentially decaying $L^1$-mass estimate in a Euclidean ball.

## 1.3 Correct assessment

There is no direct named Lean theorem matching Proposition 3.1. The quantitative ingredients are spread among:

```lean
normalizedRadialLogProfile
integral_abs_normalizedRadialLogProfile
normalizedRadialMellinStrip
normalizedRadialMellinStrip_shifted_fourier_inversion
negativeHalfline_le_of_fourierInversion
exists_lowerStripPoissonMajorant_integrable_majorant
antiFourierWitness_interiorMellinL1_le_of_integrable_majorant
uniformAntiFourierSignRadius_of_poisson_majorization
```

The last theorem contains a local quantitative calculation but immediately uses it only to prove that a certain quantity is $<1/2$, after which a contradiction theorem is applied.

---

# 2. Notation dictionary

Let

$$
\lambda=\frac d2,
\qquad
R=c\sqrt d.
$$

The main informal/Lean correspondences are:

| Informal notation | Lean object | Meaning |
|---|---|---|
| $\mathbb{R}^d$ | `Euclidean d` | Euclidean space |
| radial Schwartz function $g$ | `TestFunction d` plus `IsRadial g` | Complex-valued Schwartz function with radiality hypothesis |
| $L^1$-mass $\lVert g\rVert_1$ | `radialL1Mass g` | Ambient $L^1$-mass |
| radial value $g(r)$ | `radialProfile hd g r` | Evaluation in a fixed radial direction |
| logarithmic radial profile $\phi(v)$ | `normalizedRadialLogProfile hd g R v` | Normalized profile under $r=Re^v$ |
| Mellin transform $X_g$ | `radialMellinStrip hd g` | Mellin transform on the central strip |
| normalized Mellin transform $Z$ | `normalizedRadialMellinStrip hd g R` | Normalized strip-holomorphic function |
| lower boundary gamma estimate $h_\lambda(R,t)$ | `lowerGammaBoundaryLog λ R t` | Logarithm of the lower-edge bound |
| strip Poisson kernel $P_\sigma$ | `stripPoissonKernel σ` | Harmonic-measure density for the lower strip edge |
| $H_\sigma(s)$ | `lowerStripPoissonMajorant λ R σ s` | Poisson convolution of the lower boundary estimate |
| anti-self-Fourier witness | `AntiFourierWitness d R` | Real radial nonzero $g$, with $\widehat g=-g$, $g(0)=0$, and $g\ge0$ outside radius $R$ |

The structure `AntiFourierWitness` is more restrictive than Proposition 3.1:

1. it fixes the Fourier eigenvalue to $-1$;
2. it assumes exterior nonnegativity;
3. exterior nonnegativity is not needed for the analytic estimate in Proposition 3.1, but only for the subsequent sign-radius contradiction.

---

# 3. The logarithmic radial profile

## 3.1 Definition

The paper defines a normalized logarithmic radial profile of the form

$$
\phi(v)
=
\frac{|S^{d-1}|}{\lVert g\rVert_1}
(Re^v)^d g(Re^v).
\tag{3.1}
$$

Lean defines

```lean
normalizedRadialLogProfile hd g R v
```

using the same expression, with the real part of the complex-valued radial profile.

## 3.2 Total absolute mass

By polar coordinates and the substitution $r=Re^v$,

$$
\int_{\mathbb{R}}|\phi(v)|\,dv=1.
\tag{3.2}
$$

Lean splits this into pointwise and integral statements, principally:

```lean
abs_normalizedRadialLogProfile
integral_abs_normalizedRadialLogProfile
```

## 3.3 Zero mean

Since

$$
\int_{\mathbb{R}^d}g(x)\,dx
=
\widehat g(0)
=
\varsigma g(0)
=
0,
$$

one has

$$
\int_{\mathbb{R}}\phi(v)\,dv=0.
\tag{3.3}
$$

The Lean anti-self-Fourier specialization is distributed among:

```lean
integral_normalizedRadialLogProfile
integral_re_eq_zero_of_antiFourier
integral_normalizedRadialLogProfile_eq_zero_of_antiFourier
```

## 3.4 Missing restricted-ball identity

The crucial identity relating Proposition 3.1 to the logarithmic profile is

$$
\int_{-\infty}^{0}|\phi(v)|\,dv
=
\frac{1}{\lVert g\rVert_1}
\int_{\lVert x\rVert<R}|g(x)|\,dx.
\tag{3.4}
$$

Indeed,

$$
v<0
\quad\Longleftrightarrow\quad
Re^v<R.
$$

The global change-of-variables machinery is present in Lean, but no named theorem was found that packages the restricted identity (3.4). This missing bridge is one reason Proposition 3.1 is not literally stated in the formalization.

A natural theorem to add would say that the integral of the absolute normalized profile over `Set.Iic 0` equals the normalized $L^1$-mass in the closed ball of radius $R$; open versus closed ball is harmless because the sphere has measure zero.

---

# 4. The normalized Mellin transform

The normalized Mellin transform is schematically

$$
Z(z)
=
\frac{|S^{d-1}|}{\lVert g\rVert_1}
R^{\lambda+iz}X_g(z),
\qquad
\lambda=\frac d2.
\tag{4.1}
$$

Lean uses:

```lean
radialMellinStrip
normalizedRadialMellinStrip
```

The factor $R^{\lambda+iz}$ is represented through a complex exponential involving $\log R$.

The strip is

$$
-\lambda<\operatorname{Im}z<\lambda.
$$

The relevant boundary estimates are:

$$
|Z(t+i\lambda)|\le1,
\tag{4.2}
$$

and

$$
|Z(t-i\lambda)|
\le
\exp\bigl(h_\lambda(R,t)\bigr)
\qquad (t\ne0).
\tag{4.3}
$$

Lean counterparts include:

```lean
normalizedRadialMellinStrip_diffContOnCl
normalizedRadialMellinStrip_top_norm_le_one
normalizedRadialMellinStrip_bottom_norm_le_gamma
```

with specialized wrappers for `AntiFourierWitness`.

---

# 5. Lemma 3.2 and the Poisson principle

## 5.1 What the “upper-half-plane Poisson principle” means

If $u$ is subharmonic on the upper half-plane and bounded above on the boundary by suitable data $B$, then at $w_0=x_0+iy_0$,

$$
u(w_0)
\le
\frac{1}{\pi}
\int_{\mathbb{R}}
\frac{y_0}{(x-x_0)^2+y_0^2}
B(x)\,dx.
\tag{5.1}
$$

For a holomorphic function $Z$,

$$
u(z)=\log|Z(z)|
$$

is subharmonic.

The paper applies this after conformally mapping the strip to the upper half-plane.

## 5.2 Conformal map

For

$$
S_\lambda
=
\{t\in\mathbb{C}:-\lambda<\operatorname{Im}t<\lambda\},
$$

use

$$
\Phi(t)
=
\exp\left(
\frac{\pi(t+i\lambda)}{2\lambda}
\right).
\tag{5.2}
$$

Then:

- the lower boundary $t=y-i\lambda$ maps to $x>0$;
- the upper boundary $t=y+i\lambda$ maps to $x<0$.

For

$$
t_0=s+i\sigma\lambda,
\qquad
-1<\sigma<1,
$$

write

$$
\Phi(t_0)=\rho e^{i\theta},
\qquad
\rho=e^{\pi s/(2\lambda)},
\qquad
\theta=\frac{\pi(1+\sigma)}2.
\tag{5.3}
$$

## 5.3 Positive and negative real axes must be treated separately

Yes: under the conformal map, the Poisson integral over the whole real axis naturally splits into:

- $x>0$, corresponding to the lower strip boundary;
- $x<0$, corresponding to the upper strip boundary.

For $x>0$, put

$$
x=e^{\pi y/(2\lambda)}.
$$

The resulting lower-edge density is

$$
\frac1\lambda
P_\sigma\left(\frac{s-y}{\lambda}\right)\,dy,
\tag{5.4}
$$

where

$$
P_\sigma(T)
=
\frac{\sin\theta}
{4\left(\cosh(\pi T/2)-\cos\theta\right)}.
\tag{5.5}
$$

For $x<0$, write

$$
x=-e^{\pi y/(2\lambda)}.
$$

The denominator now has a plus sign in front of $\cos\theta$, and the resulting density is

$$
\frac1\lambda
P_{-\sigma}\left(\frac{s-y}{\lambda}\right)\,dy.
\tag{5.6}
$$

Thus the full strip Poisson inequality is

$$
\begin{aligned}
\log|Z(s+i\sigma\lambda)|
\le {}&
\int_{\mathbb{R}}
\frac1\lambda
P_\sigma\left(\frac{s-y}{\lambda}\right)b_-(y)\,dy\\
&+
\int_{\mathbb{R}}
\frac1\lambda
P_{-\sigma}\left(\frac{s-y}{\lambda}\right)b_+(y)\,dy.
\end{aligned}
\tag{5.7}
$$

Here $b_-$ and $b_+$ are upper bounds for the lower- and upper-edge boundary values of $\log|Z|$.

In the paper,

$$
b_-(y)=\min\{h_\lambda(R,y),D\},
\qquad
b_+(y)=0,
\tag{5.8}
$$

because

$$
|Z(y+i\lambda)|\le1
\quad\Longrightarrow\quad
\log|Z(y+i\lambda)|\le0.
$$

Therefore the upper-edge term in (5.7) is exactly zero when one uses the majorant $b_+=0$.

Important logical distinction:

- the actual upper-edge contribution need not be zero;
- it is nonpositive because the actual boundary value satisfies $\log|Z|\le0$;
- replacing it by the larger majorant $0$ makes the displayed upper-edge contribution exactly zero.

The total harmonic masses are

$$
\int_{\mathbb{R}}P_\sigma(T)\,dT
=
\frac{1-\sigma}{2},
\qquad
\int_{\mathbb{R}}P_{-\sigma}(T)\,dT
=
\frac{1+\sigma}{2}.
\tag{5.9}
$$

They add to $1$.

## 5.4 Uniform formulation

There are two uniform ways to write the argument.

### Whole real axis in the upper half-plane

Define a piecewise boundary function

$$
B(x)=
\begin{cases}
\displaystyle
b_-\left(\frac{2\lambda}{\pi}\log x\right),
&x>0,\\[3mm]
\displaystyle
b_+\left(\frac{2\lambda}{\pi}\log(-x)\right),
&x<0.
\end{cases}
$$

Then apply the ordinary upper-half-plane Poisson integral over all $x\in\mathbb{R}$.

### Boundary of the strip

Treat the strip boundary as a disjoint union of two copies of $\mathbb{R}$ and write the harmonic-measure integral directly. Parameterizing each component produces (5.7).

One cannot generally use the same kernel on both edges: the lower edge uses $P_\sigma$, while the upper edge uses $P_{-\sigma}$. They coincide only at $\sigma=0$.

---

# 6. How Lemma 3.2 is formalized conceptually

The Lean development does not directly formalize extended-real-valued subharmonic functions and apply a theorem to $\log|Z|$. Instead it uses a holomorphic outer-function argument.

The conceptual replacement is:

1. choose the capped lower boundary function
   $$
   b_D(y)=
   \begin{cases}
   D,&y=0,\\
   \min\{h_\lambda(R,y),D\},&y\ne0;
   \end{cases}
   $$
2. construct a holomorphic function $W_D$ whose real part is the Poisson extension of $b_D$, with upper boundary trace $0$;
3. consider
   $$
   F_D(z)=e^{-W_D(z)}Z(z);
   $$
4. prove $|F_D|\le1$ on both horizontal boundaries;
5. apply a Phragmén–Lindelöf maximum principle on the unbounded strip;
6. conclude
   $$
   |Z(z)|\le e^{\operatorname{Re}W_D(z)};
   $$
7. let $D\to\infty$.

Relevant names include:

```lean
stripPoissonKernel
stripSchwarzExponential
stripHolomorphicPoissonKernel
stripRegularizedHolomorphicPoissonKernel
stripRegularizedOuter
lowerGammaBoundaryCapped
lowerStripCappedGammaOuter
horizontalStrip_norm_extension_majorization
antiFourierWitness_capped_poisson_majorization_of_real_extension
exists_antiFourierWitness_capped_poisson_majorization
lowerStripCappedPoisson_tendsto_radius
antiFourierWitness_norm_le_poisson_of_eventually_capped_radius
```

The holomorphic kernel has real part equal to the strip Poisson kernel. A purely imaginary regularization term is added so that the complex kernel decays sufficiently well for integration; this does not change its real part.

The general strip maximum theorem is a Phragmén–Lindelöf principle proved by multiplying the holomorphic function by an auxiliary damping factor, applying maximum modulus on large finite rectangles, and letting the rectangle expand.

---

# 7. Lemma 3.5: from uniform negativity to an integrable majorant

## 7.1 Uniform negativity alone is insufficient

The theorem

```lean
exists_lowerStripPoissonMajorant_uniform_negative
```

gives, for suitable fixed $\sigma\in(0,1)$ and $\gamma_0>0$,

$$
H_d(s)\le-\gamma_0\lambda
\qquad
\text{for every }s\in\mathbb{R},
\tag{7.1}
$$

for sufficiently large $d$, where

$$
H_d(s)
=
\operatorname{lowerStripPoissonMajorant}
\bigl(\lambda,c\sqrt d,\sigma,s\bigr).
$$

Exponentiating yields

$$
e^{H_d(s)}\le e^{-\gamma_0\lambda},
$$

but a constant in $s$ is not integrable over $\mathbb{R}$. Therefore uniform negativity does not by itself imply an $L^1$-bound.

## 7.2 Logarithmic tail estimate

A second theorem gives constants $A,B,\kappa>0$ such that

$$
H_d(\lambda S)
\le
-\kappa\lambda\log\frac{|S|}{A}
\qquad
(|S|\ge B).
\tag{7.2}
$$

This is the large-frequency part of Lemma 3.5.

## 7.3 Combining the two estimates

The theorem

```lean
exists_lowerStripPoissonMajorant_integrable_majorant
```

combines (7.1) and (7.2).

Choose

$$
T=\max\{B,A,1\},
\qquad
C=\max\{(1+T)^2,4A^2\},
\qquad
\gamma=\frac{\gamma_0}{2},
$$

and restrict to dimensions for which

$$
\kappa\lambda\ge4.
\tag{7.3}
$$

### Far-frequency region: $|S|\ge T$

Both estimates hold. Averaging them,

$$
\begin{aligned}
H_d(\lambda S)
&\le
-\frac{\gamma_0}{2}\lambda
-\frac{\kappa\lambda}{2}\log\frac{|S|}{A}\\
&\le
-\gamma\lambda
-2\log\frac{|S|}{A}.
\end{aligned}
\tag{7.4}
$$

Exponentiating,

$$
e^{H_d(\lambda S)}
\le
e^{-\gamma\lambda}
\left(\frac{A}{|S|}\right)^2.
\tag{7.5}
$$

Since $|S|\ge1$,

$$
1+|S|\le2|S|,
$$

so

$$
\left(\frac{A}{|S|}\right)^2
\le
\frac{4A^2}{(1+|S|)^2}
\le
\frac{C}{(1+|S|)^2}.
$$

Hence

$$
e^{H_d(\lambda S)}
\le
\frac{C e^{-\gamma\lambda}}{(1+|S|)^2}.
\tag{7.6}
$$

### Bounded-frequency region: $|S|<T$

Use only uniform negativity:

$$
e^{H_d(\lambda S)}
\le
e^{-\gamma_0\lambda}
\le
e^{-\gamma\lambda}.
$$

Also,

$$
(1+|S|)^2\le(1+T)^2\le C,
$$

and hence again

$$
e^{H_d(\lambda S)}
\le
\frac{C e^{-\gamma\lambda}}{(1+|S|)^2}.
\tag{7.7}
$$

Combining both regions,

$$
\boxed{
e^{H_d(\lambda S)}
\le
\frac{C e^{-\gamma\lambda}}{(1+|S|)^2}
\quad
\text{for every }S\in\mathbb{R}.
}
\tag{7.8}
$$

The role of `exists_lowerStripPoissonMajorant_uniform_negative` is therefore only half of the implication:

$$
\boxed{
\text{uniform negativity}
+
\text{logarithmic tail decay}
\Longrightarrow
\text{exponentially small integrable majorant}.
}
$$

## 7.4 Difference from the paper’s presentation

The paper integrates a bounded central region and a dimension-dependent power tail separately. Lean instead combines half of the uniform negative bound with half of the logarithmic tail bound to obtain the fixed integrable profile

$$
(1+|S|)^{-2}.
$$

This is formally convenient because the integrability of one fixed function can be reused.

---

# 8. From the Poisson majorant to the $L^1$-norm of $Z$

The theorem

```lean
antiFourierWitness_interiorMellinL1_le_of_integrable_majorant
```

uses:

$$
|Z_\sigma(s)|\le e^{H_d(s)}
\tag{8.1}
$$

and (7.8), where

$$
Z_\sigma(s)=Z(s+i\sigma\lambda).
$$

After substituting $s=\lambda S$,

$$
|Z_\sigma(\lambda S)|
\le
\frac{C e^{-\gamma\lambda}}{(1+|S|)^2}.
$$

Let

$$
J=\int_{\mathbb{R}}\frac{dS}{(1+|S|)^2}.
$$

Then

$$
\int_{\mathbb{R}}|Z_\sigma(\lambda S)|\,dS
\le
CJ e^{-\gamma\lambda}.
\tag{8.2}
$$

Undoing the scaling $s=\lambda S$,

$$
\boxed{
\int_{\mathbb{R}}|Z_\sigma(s)|\,ds
\le
CJ\lambda e^{-\gamma\lambda}.
}
\tag{8.3}
$$

This is the Mellin-side $L^1$-estimate used in Lemma 3.6.

---

# 9. Relating the integral of $|Z|$ to the integral of $|\phi|$

The key named theorem is:

```lean
negativeHalfline_le_of_fourierInversion
```

## 9.1 Shifted Mellin/Fourier identity

Let

$$
a=(1-\sigma)\lambda>0.
\tag{9.1}
$$

Then

$$
\lambda-a=\sigma\lambda.
$$

The shifted transform identity says, in the paper’s angular-frequency convention,

$$
Z(t+i\sigma\lambda)
=
\int_{\mathbb{R}}
e^{-av}\phi(v)e^{-itv}\,dv.
\tag{9.2}
$$

The Lean theorem using mathlib’s $2\pi$-normalized Fourier transform is:

```lean
normalizedRadialMellinStrip_shifted_eq_fourier
```

The frequency is scaled by $t/(2\pi)$.

## 9.2 Fourier inversion

The corresponding inversion theorem is:

```lean
normalizedRadialMellinStrip_shifted_fourier_inversion
```

In angular-frequency notation,

$$
\phi(v)
=
\frac{e^{av}}{2\pi}
\int_{\mathbb{R}}
Z(s+i\sigma\lambda)e^{isv}\,ds.
\tag{9.3}
$$

Therefore,

$$
|\phi(v)|
\le
\frac{e^{av}}{2\pi}
\int_{\mathbb{R}}|Z(s+i\sigma\lambda)|\,ds.
\tag{9.4}
$$

## 9.3 Integrate over $v\le0$

Since $a>0$,

$$
\int_{-\infty}^{0}e^{av}\,dv=\frac1a.
$$

Integrating (9.4),

$$
\boxed{
\int_{-\infty}^{0}|\phi(v)|\,dv
\le
\frac{1}{2\pi a}
\int_{\mathbb{R}}|Z(s+i\sigma\lambda)|\,ds.
}
\tag{9.5}
$$

Substituting $a=(1-\sigma)\lambda$,

$$
\boxed{
\int_{-\infty}^{0}|\phi(v)|\,dv
\le
\frac{1}{2\pi(1-\sigma)\lambda}
\int_{\mathbb{R}}|Z(s+i\sigma\lambda)|\,ds.
}
\tag{9.6}
$$

This is precisely the step relating the integral of $|Z|$ to the integral of $|\phi|$.

## 9.4 Combine with the Mellin $L^1$-bound

Using (8.3),

$$
\begin{aligned}
\int_{-\infty}^{0}|\phi(v)|\,dv
&\le
\frac{1}{2\pi(1-\sigma)\lambda}
CJ\lambda e^{-\gamma\lambda}\\
&=
\frac{CJ}{2\pi(1-\sigma)}
e^{-\gamma\lambda}.
\end{aligned}
\tag{9.7}
$$

Since $\lambda=d/2$,

$$
\int_{-\infty}^{0}|\phi(v)|\,dv
\le
C' e^{-\gamma d/2}.
\tag{9.8}
$$

Renaming the exponent constant gives the paper’s $C_c e^{-\gamma_c d}$ form.

Finally, if the missing identity (3.4) is inserted, this becomes Proposition 3.1.

---

# 10. How Lean bypasses Proposition 3.1

The Lean development does not stop after proving the exponential upper bound for negative-half-line mass.

For an `AntiFourierWitness`, exterior nonnegativity gives

$$
\phi(v)\ge0
\qquad(v\ge0).
\tag{10.1}
$$

Together with

$$
\int_{\mathbb{R}}\phi(v)\,dv=0
$$

and

$$
\int_{\mathbb{R}}|\phi(v)|\,dv=1,
$$

this implies

$$
\int_{-\infty}^{0}|\phi(v)|\,dv\ge\frac12.
\tag{10.2}
$$

For sufficiently large $d$, the quantitative upper bound gives

$$
\int_{-\infty}^{0}|\phi(v)|\,dv<\frac12.
\tag{10.3}
$$

This contradiction is packaged through the call chain

```text
uniformAntiFourierSignRadius_of_poisson_majorization
    ↓
no_antiFourierWitness_of_interiorMellinL1_lt_half
    ↓
no_antiFourierWitness_of_shiftedMellinL1_lt_half
    ↓
no_antiFourierWitness_of_fourierInversion_lt_half
    ↓
no_normalizedProfile_of_fourierInversion_lt_half
    ↓
negativeHalfline_le_of_fourierInversion
```

Thus the formalization merges:

- the $-1$-eigenvalue case of the analytic estimate in Proposition 3.1;
- the exterior sign argument used in the later sign-radius application.

The final exported result is closer to the anti-self-Fourier part of Proposition 3.7 than to Proposition 3.1 itself.

---

# 11. Informal reading of `uniformAntiFourierSignRadius_of_poisson_majorization`

The proof can be read as follows.

1. Fix $c$ with
   $$
   0<c<\frac1\pi.
   $$

2. Obtain constants
   $$
   0<\sigma<1,\qquad
   \gamma>0,\qquad
   C>0
   $$
   from `exists_lowerStripPoissonMajorant_integrable_majorant`.

3. Define
   $$
   J=\int_{\mathbb{R}}(1+|S|)^{-2}\,dS,
   $$
   and
   $$
   K=\frac{CJ}{2\pi(1-\sigma)}.
   $$

4. Observe
   $$
   K e^{-\gamma d/2}\longrightarrow0.
   $$

5. Hence, for sufficiently large $d$,
   $$
   K e^{-\gamma d/2}<\frac12.
   $$

6. Suppose an anti-Fourier witness exists at radius $c\sqrt d$.

7. Apply capped Poisson majorization and the integrable majorant to obtain
   $$
   \int_{\mathbb{R}}
   |Z(s+i\sigma d/2)|\,ds
   \le
   CJ\frac d2 e^{-\gamma d/2}.
   $$

8. Divide by
   $$
   2\pi(1-\sigma)d/2
   $$
   and deduce
   $$
   \frac{1}{2\pi(1-\sigma)d/2}
   \int_{\mathbb{R}}
   |Z(s+i\sigma d/2)|\,ds
   \le
   K e^{-\gamma d/2}
   <
   \frac12.
   $$

9. Use shifted Mellin/Fourier inversion to conclude that the negative-half-line mass of $\phi$ is $<1/2$.

10. Exterior nonnegativity, zero mean, and total absolute mass $1$ imply that the same mass is $\ge1/2$.

11. Contradiction.

The quantitative inequality in step 8 is local to the proof and is not exported as a Proposition-3.1-style theorem.

---

# 12. Suggested exact theorem that is missing

A direct formal counterpart of Proposition 3.1 would ideally be separated into two results.

## 12.1 Analytic half-line estimate

For $0<c<1/\pi$, there exist $C,\gamma>0$ such that, eventually in $d$, every real radial nonzero Fourier eigenfunction $g$ with $g(0)=0$ satisfies

$$
\int_{-\infty}^{0}
\left|
\operatorname{normalizedRadialLogProfile}
\left(g,c\sqrt d,v\right)
\right|\,dv
\le
C e^{-\gamma d}.
\tag{12.1}
$$

This should not assume exterior nonnegativity.

## 12.2 Ball/profile identity

For $R>0$,

$$
\int_{-\infty}^{0}|\phi(v)|\,dv
=
\frac{1}{\lVert g\rVert_1}
\int_{\lVert x\rVert<R}|g(x)|\,dx.
\tag{12.2}
$$

Combining these would give Proposition 3.1.

To match the paper exactly, the Fourier-eigenvalue hypothesis should allow both $\varsigma=+1$ and $\varsigma=-1$.

---

# 13. Questions and directions for further investigation

The following are natural next questions for a local Codex session.

1. **Locate the exact missing restricted change-of-variables statement.**  
   Search whether a theorem equivalent to (3.4) exists under another name, perhaps in imported Mathlib files or in a generic radial integration section.

2. **Extract the local quantitative estimate.**  
   Refactor `uniformAntiFourierSignRadius_of_poisson_majorization` so that the exponential half-line-mass upper bound is an exported theorem rather than a local calculation ending in `< 1 / 2`.

3. **Remove exterior nonnegativity from the analytic estimate.**  
   Determine which lower-bound/Mellin lemmas genuinely need `AntiFourierWitness` and which use only:
   - radiality,
   - real-valuedness,
   - nonzeroness,
   - $g(0)=0$,
   - $\widehat g=-g$.

4. **Generalize from eigenvalue $-1$ to $\pm1$.**
   The norm estimates should largely be insensitive to the sign. Identify the exact points where the formal proof hardcodes `anti_fourier`.

5. **Compare the Lean tail argument with the report.**  
   The report integrates a dimension-dependent power tail, while Lean produces a fixed $(1+|S|)^{-2}$ majorant. Verify each constant choice and document why the latter is formally preferable.

6. **Check the precise use of the cap $D$.**
   Track how the singular behavior of `lowerGammaBoundaryLog` at $0$ is replaced by `lowerGammaBoundaryCapped`, how the lower boundary majorization at $0$ is proved, and how dominated convergence removes the cap.

7. **Write a direct strip Poisson lemma.**  
   It may be pedagogically useful to state the full two-boundary formula
   $$
   P_\sigma*b_-+P_{-\sigma}*b_+
   $$
   before specializing $b_+=0$, even though the current outer-function implementation hides this symmetry.

---

# 14. Compact dependency map

```text
Radial normalization
  normalizedRadialLogProfile
  integral_abs_normalizedRadialLogProfile
  integral_normalizedRadialLogProfile_eq_zero_of_antiFourier
       |
       v
Normalized Mellin transform
  normalizedRadialMellinStrip
  top/bottom boundary estimates
       |
       v
Capped Poisson majorization
  lowerGammaBoundaryCapped
  lowerStripCappedGammaOuter
  horizontalStrip_norm_extension_majorization
  exists_antiFourierWitness_capped_poisson_majorization
       |
       v
Uncapped Poisson bound
  antiFourierWitness_norm_le_poisson_of_eventually_capped_radius
       |
       v
Dimension/frequency estimates
  exists_lowerStripPoissonMajorant_uniform_negative
  logarithmic-tail theorem
       |
       v
Fixed integrable majorant
  exists_lowerStripPoissonMajorant_integrable_majorant
       |
       v
Mellin L1 estimate
  antiFourierWitness_interiorMellinL1_le_of_integrable_majorant
       |
       v
Shifted Mellin/Fourier inversion
  normalizedRadialMellinStrip_shifted_fourier_inversion
  negativeHalfline_le_of_fourierInversion
       |
       v
Exponential upper bound for negative-half-line mass
  present only as a local calculation
       |
       +----------------------+
       |                      |
       | missing identity     | exterior nonnegativity
       | with ball mass       | + zero mean + total mass 1
       v                      v
Proposition 3.1          lower bound >= 1/2
(not exported)                 |
                               v
                        contradiction and
                        uniformAntiFourierSignRadius
```

---

# 15. Bottom line

The informal proof of Proposition 3.1 follows the chain

$$
\text{Poisson majorization}
\Longrightarrow
\int |Z|
\ll
\lambda e^{-\gamma\lambda}
\Longrightarrow
\int_{v\le0}|\phi(v)|\,dv
\ll
e^{-\gamma\lambda}
\Longrightarrow
\int_{\lVert x\rVert<c\sqrt d}|g(x)|\,dx
\ll
e^{-\gamma d}\lVert g\rVert_1.
$$

The Lean file formalizes almost all analytic ingredients of the first two implications, but:

- specializes to the anti-self-Fourier case;
- packages the function as an `AntiFourierWitness`;
- does not export the restricted ball/profile identity;
- does not export the resulting quantitative Proposition-3.1-style theorem;
- immediately combines the small negative-half-line mass with an exterior-sign lower bound of $1/2$ to obtain the sign-radius contradiction needed for the Cohn–Elkies bound.
