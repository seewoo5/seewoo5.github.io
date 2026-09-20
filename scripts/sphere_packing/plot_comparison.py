#!/usr/bin/env python3
"""Plot magic/Astra comparisons for d = 8, 12, 24 on 0 <= r <= 4.

Each curve is multiplied by r**((d-1)/2)*exp(2*pi*r), then peak-normalized.
Edit render() for labels and styles; --replot redraws the saved samples.

Formulas:
  Astra, Chapter 1, (33)--(38): https://cdn.openai.com/pdf/ten-proofs-oai.pdf
  Viazovska (d=8): https://arxiv.org/html/1603.04246
  Cohn et al. (d=24): https://arxiv.org/html/1603.06518
  Cohn--Goncalves (d=12): https://arxiv.org/html/1712.04438#S2.SS2

The numerical checks are not interval certificates, and low-dimensional
Astra admissibility is not asserted.
"""

import argparse
from dataclasses import dataclass
from functools import lru_cache
import json
import os
from pathlib import Path
import tempfile

import mpmath as mp
import numpy as np
from numpy.polynomial.legendre import leggauss
from scipy.special import loggamma, roots_legendre

os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "sphere-matplotlib"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

CONTACT_RADII = {8: np.sqrt(2.0), 24: 2.0}


# ---- Plot formatting ---------------------------------------------------------

def normalize_peak(values):
    """Divide each column by its own sampled maximum absolute value."""
    values = np.asarray(values, dtype=float)
    if values.ndim != 2 or not np.all(np.isfinite(values)):
        raise ValueError("Expected a finite matrix of function values")
    peaks = np.max(np.abs(values), axis=0)
    if np.any(peaks == 0):
        raise ValueError("Cannot normalize a curve with zero sampled peak")
    return values/peaks


def style_axis(ax):
    ax.axhline(0, color=".55", lw=.6)
    ax.grid(alpha=.12)
    ax.spines[["top", "right"]].set_visible(False)


def save_figure(fig, output, stem):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    fig.savefig(output/f"{stem}.png", dpi=180)
    plt.close(fig)

def display_multiplier(r, dimension):
    """The requested positive weight; its zero at the origin is artificial."""
    r = np.asarray(r, dtype=float)
    if dimension not in (8, 12, 24) or np.any(r < 0) or not np.all(np.isfinite(r)):
        raise ValueError("Use finite nonnegative radii and dimension 8, 12, or 24")
    return r**((dimension-1)/2)*np.exp(2*np.pi*r)


def display_values(r, values, dimension):
    """Apply the same radial weight, then a separate constant peak per curve."""
    values = np.asarray(values, dtype=float)
    if values.ndim != 2 or len(values) != len(r):
        raise ValueError("Expected one row per radius and one column per curve")
    return normalize_peak(display_multiplier(r, dimension)[:, None]*values)


def render(arrays, metadata, output):
    for d in (8, 24, 12):
        r, auxiliary, reference = (arrays[f"d{d}_{name}"] for name in ("r", "auxiliary", "magic"))
        pairs = [(2, 0, r"$f_0$", "Cohn–Gonçalves")] if d == 12 else [
            (0, 0, r"$f_-$", r"Magic $F$"), (1, 1, r"$f_+$", r"Magic $\widehat F$")]
        fig, axes = plt.subplots(1, len(pairs), figsize=(6.2*len(pairs), 4.1), squeeze=False)
        for ax, (a, m, symbol, magic_label) in zip(axes[0], pairs):
            values = display_values(r, np.column_stack((auxiliary[:, a], reference[:, m])), d)
            ax.plot(r, values[:, 0], color="#49328c", lw=.8, label="Astra "+symbol)
            ax.plot(r, values[:, 1], color="#b03b31", lw=.75, ls=":",
                    dash_capstyle="round", label=magic_label)
            style_axis(ax)
            ax.axvline(np.sqrt(2.) if d != 24 else 2., color=".7", lw=.6, ls=":")
            ax.set(xlim=(0., 4.), ylim=(-1.05, 1.05), xlabel=r"Radius $r$", ylabel="Scaled value")
            if d != 12:
                ax.set_title("Packing function" if a == 0 else "Fourier transform", fontsize=11)
            ax.legend(fontsize=9)
        title = r"$A_+(12)$" if d == 12 else fr"$d={d}$"
        fig.suptitle(title+fr", $\varepsilon={metadata['epsilon']:g}$", fontsize=14)
        fig.text(.5, .02, fr"Weight: $r^{{{d-1}/2}}e^{{2\pi r}}$. Each curve has unit peak magnitude.",
                 ha="center", fontsize=9)
        fig.tight_layout(rect=(0., .055, 1., .96))
        save_figure(fig, output, f"dimension_{d}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--epsilon", type=float, default=.1)
    parser.add_argument("--points", type=int, default=601)
    parser.add_argument("--step", type=float, default=.025)
    parser.add_argument("--weight-nodes", type=int, default=768)
    parser.add_argument("--output", type=Path,
                        default=Path("assets/images/sphere-packing-comparison"))
    parser.add_argument("--replot", action="store_true", help="Redraw cached data without recomputing")
    args = parser.parse_args()
    if args.points < 3 or not np.isfinite(args.step) or args.step <= 0 or args.weight_nodes < 16:
        parser.error("Require points >= 3, step > 0, and weight-nodes >= 16")
    args.output.mkdir(parents=True, exist_ok=True)
    cache = args.output/"comparison_data.npz"
    if args.replot:
        with np.load(cache, allow_pickle=False) as stored:
            metadata = json.loads(str(stored["metadata_json"]))
            arrays = {key: stored[key] for key in stored.files if key != "metadata_json"}
    else:
        arrays, metadata = compute(args)
        np.savez_compressed(cache, metadata_json=json.dumps(metadata), **arrays)
        (args.output/"comparison_checks.json").write_text(json.dumps(metadata, indent=2)+"\n")
    render(arrays, metadata, args.output)
    print(f"Saved dimension_8, dimension_24, and dimension_12 to {args.output.resolve()}")



# ---- Evaluation and convergence checks --------------------------------------

def evaluate_for_display(witness, r, step, alternate=False, tail_tolerance=1e-30):
    """Use a negative contour near zero and a positive contour in the tail."""
    values = np.empty((len(r), 3))
    inner = r < 1.5
    u_inner = -1+min(1., 1/witness.lam)*(.8 if alternate else 1.)
    for mask, height in ((inner, u_inner), (~inner, .8 if alternate else 1.)):
        if np.any(mask):
            values[mask] = witness.evaluate(r[mask], step=step, contour=height,
                                            tail_tolerance=tail_tolerance)
    return values


def mixed_error(first, second):
    return float(np.max(np.abs(first-second)/(1+np.abs(second))))


def checked_witness(d, epsilon, r, args):
    """Check the raw and displayed integrals under mesh and contour changes."""
    print(f"d={d}, epsilon={epsilon:g}: inverse Mellin integrals", flush=True)
    factor = display_multiplier(r, d)
    tail_tolerance = min(1e-30, 1e-12/max(1., float(factor.max())))
    nodes = args.weight_nodes
    for attempt in range(3):
        witness = UpperBound(d, epsilon, nodes)
        values = evaluate_for_display(witness, r, args.step, tail_tolerance=tail_tolerance)
        indices = np.unique(np.r_[np.arange(min(3, len(r))),
                                 np.linspace(0, len(r)-1, 35).astype(int),
                                 np.argmax(np.abs(values), axis=0),
                                 np.argmax(factor[:, None]*np.abs(values), axis=0)])
        refined = UpperBound(d, epsilon, 2*nodes)
        better = evaluate_for_display(refined, r[indices], args.step/2,
                                      tail_tolerance=tail_tolerance/100)
        shifted = evaluate_for_display(refined, r[indices], args.step/2, alternate=True,
                                       tail_tolerance=tail_tolerance/100)
        if not all(np.all(np.isfinite(v)) for v in (values, better, shifted)):
            raise RuntimeError("Nonfinite inverse Mellin evaluation")
        weight = factor[indices, None]
        checks = {"raw_mesh_error": mixed_error(values[indices], better),
                  "raw_contour_error": mixed_error(shifted, better),
                  "weighted_mesh_error": mixed_error(weight*values[indices], weight*better),
                  "weighted_contour_error": mixed_error(weight*shifted, weight*better)}
        if max(checks.values()) <= 2e-7:
            return values, {**checks, "checked_radii": len(indices), "weight_nodes": nodes}
        if attempt < 2:
            nodes *= 2
            print(f"  retrying with {nodes} weight nodes", flush=True)
    raise RuntimeError(f"d={d}: inverse Mellin checks failed: {checks}")


def checked_magic(d, r):
    """Check every magic sample before and after the potentially large weight."""
    if d == 12:
        first = magic_a12(r)[:, None]
        refined = magic_a12(r, order=96, cutoff=14.)[:, None]
    else:
        first = np.column_stack(magic_pair(d, r))
        refined = np.column_stack(magic_pair(d, r, order=96, cutoff=14.))
    weight = display_multiplier(r, d)[:, None]
    checks = {"raw_mesh_error": mixed_error(first, refined),
              "weighted_mesh_error": mixed_error(weight*first, weight*refined)}
    if not all(np.all(np.isfinite(v)) for v in (first, refined)) or max(checks.values()) > 2e-7:
        raise RuntimeError(f"d={d}: magic-function quadrature checks failed: {checks}")
    return refined, checks


def compute(args):
    arrays = {}
    metadata = {"epsilon": args.epsilon, "range": [0., 4.],
                "multiplier": "r**((d-1)/2)*exp(2*pi*r)",
                "normalization": "each displayed curve divided by its own sampled peak absolute value",
                "qualification": "Numerical convergence checks; low-dimensional Astra admissibility is not asserted.",
                "checks": {}}
    for d in (8, 24, 12):
        contact = CONTACT_RADII[d] if d != 12 else np.sqrt(2.)
        roots = np.sqrt(2*np.arange(2 if d == 24 else 1, 9))
        r = np.unique(np.r_[np.linspace(0., 4., args.points), roots, contact])
        reference, magic_checks = checked_magic(d, r)
        auxiliary, auxiliary_checks = checked_witness(d, args.epsilon, r, args)
        arrays.update({f"d{d}_r": r, f"d{d}_magic": reference,
                       f"d{d}_auxiliary": auxiliary})
        metadata["checks"][str(d)] = {"magic": magic_checks, "auxiliary": auxiliary_checks}
    return arrays, metadata



# ---- Astra auxiliary functions: inverse Mellin transform --------------------

# Parameters are the report's choices, not the replacement choices in Lean.

@dataclass(frozen=True)
class Parameters:
    epsilon: float = 0.1

    def __post_init__(self):
        if not 0 < self.epsilon < 1:
            raise ValueError("epsilon must lie in (0, 1)")
        if self.a0 >= self.A or 1 - 2 * self.epsilon * (1 + self.A) <= 0:
            raise ValueError("epsilon is too large: the negative weight has the wrong sign")

    @property
    def a0(self):
        return self.epsilon**2

    @property
    def A(self):
        return np.log(1 / self.epsilon)

    @property
    def B(self):
        return self.epsilon**-3

    @property
    def log_Q(self):
        return -3 / (8 * self.epsilon**2)

    @property
    def beta(self):
        return self.epsilon / 4


class UpperBound:
    """Return (f_minus, f_plus, f_zero), all divided by f_plus(0).

    A single *constant* normalization is used, never a radius-dependent envelope.
    Thus the first two functions and the corresponding magic pair equal 1 at 0.
    f_zero(0)=0; it is not a packing magic function.
    """

    def __init__(self, dimension, epsilon=0.1, weight_nodes=384):
        if dimension <= 0:
            raise ValueError("dimension must be positive")
        self.d = dimension
        self.lam = dimension / 2
        self.params = Parameters(epsilon)
        x, q = roots_legendre(weight_nodes)
        # Log coordinates resolve the 1/a² singularity at a small positive cutoff.
        lo, hi = np.log(self.params.a0), np.log(self.params.A)
        self.a = np.exp((hi + lo) / 2 + (hi - lo) * x / 2)
        b = 1 - 2 * epsilon * (1 + self.a)
        self.wa = (-b * np.exp(-2 * self.a) / (2 * self.a**2 * np.cosh(self.a))
                   * self.a * q * (hi - lo) / 2)
        self.h_i = float(self.h(np.array([1j]))[0].real)

    def _bump(self, z):
        """Integrate the remote positive bump analytically, without exp(-B) loss.

        Expand sech(a)=2 sum_{k>=0} (-1)^k exp(-(2k+1)a).
        For the permitted epsilon, B>150, so terms k>=1 are far below binary64
        accuracy on |Im z|<=1. We retain three terms, including their log scale.
        This does NOT delete the bump or replace its parameter choices.
        """
        p = self.params

        def integral(s):
            s = np.asarray(s, dtype=complex)
            ratio = np.ones_like(s)
            np.divide(-np.expm1(-s), s, out=ratio, where=np.abs(s) > 1e-14)
            return np.exp(p.log_Q - s * p.B) * ratio

        result = np.zeros_like(z, dtype=complex)
        for k in range(3):
            rate = 2 * k + 1
            result += (-1)**k * (integral(rate - 1j*z) + integral(rate + 1j*z)
                                 - 2*integral(rate))
        return result

    def h(self, z):
        z = np.atleast_1d(np.asarray(z, dtype=complex))
        if np.max(np.abs(z.imag)) > 1 + 1e-12:
            raise ValueError("This evaluator deliberately uses only |Im z| <= 1")
        result = np.empty_like(z)
        for start in range(0, len(z), 1024):
            zz = z[start:start+1024]
            # cos(z)-1 = -2 sin(z/2)^2 avoids cancellation near zero.
            result[start:start+1024] = (-2*np.sin(zz[:, None]*self.a/2)**2) @ self.wa
        return result + self._bump(z)

    def tail_bound(self, cutoff, r_min, contour):
        """Bound the continuous omitted normalized Mellin tail for all j.

        For |u|<=1, the report's density estimate gives decay at least
        λε I(t/λ), where I(T)=T atan(T/2)-log(1+T²/4). Convexity gives an
        exponential majorant past cutoff. Integrate it against the cubic
        bound q(T)=T³+4T²+6T+4+β for all three polynomials.
        This does not bound discretization errors. h(iu) is numerical,
        so the result is not an interval-arithmetic certificate.
        """
        lam, eps, beta = self.lam, self.params.epsilon, self.params.beta
        T = cutoff/lam
        phi = lam*eps*(T*np.arctan(T/2)-np.log1p(T*T/4))
        k = eps*np.arctan(T/2)
        q = T**3+4*T*T+6*T+4+beta
        integral = (q/k + (3*T*T+8*T+6)/(lam*k*k)
                    + (6*T+8)/(lam*lam*k**3) + 6/(lam**3*k**4))
        log_prefactor = (loggamma(lam*(1+contour)/2)
                         - lam*(1+contour)/2*np.log(np.pi)
                         + lam*(self.h(np.array([1j*contour]))[0].real-self.h_i)
                         - np.log(2*beta*np.pi)-lam*(1+contour)*np.log(r_min))
        return float(np.exp(log_prefactor-phi+np.log(integral)))

    def evaluate(self, r, step=0.025, cutoff=None, contour=None, tail_tolerance=1e-12):
        r = np.atleast_1d(np.asarray(r, dtype=float))
        if np.any(r < 0) or not np.all(np.isfinite(r)):
            raise ValueError("r must be finite and nonnegative")
        if step <= 0:
            raise ValueError("step must be positive")
        if not np.isfinite(tail_tolerance) or tail_tolerance <= 0:
            raise ValueError("tail_tolerance must be finite and positive")
        lam, beta = self.lam, self.params.beta
        # Keep lambda(1+u)<=1, so the near-zero prefactor is at most r^-1.
        # No poles are crossed: -1 < u <= 0. This is exact contour deformation,
        # not the large-lambda saddle approximation used in the proof.
        u = -1 + min(1., 1/lam) if contour is None else contour
        if not -1 < u <= 1:
            raise ValueError("contour must satisfy -1 < u <= 1")
        if cutoff is None:
            positive_r = r[r > 0]
            r_min = float(positive_r.min()) if len(positive_r) else 1.
            cutoff = 80.
            while self.tail_bound(cutoff, r_min, u) > tail_tolerance:
                cutoff *= 1.2
        count = int(np.ceil(cutoff/step))
        t = np.linspace(0, count*step, count+1)
        z = t/lam + 1j*u
        # Incorporate the normalizing constant into the logarithm for stability.
        log_base = (loggamma((lam*(1+u) - 1j*t)/2)
                    + (1j*t/2 - lam*u/2)*np.log(np.pi)
                    + lam*(self.h(z)-self.h_i)
                    - lam/2*np.log(np.pi) - np.log(2*beta*np.pi))
        base = np.exp(log_base)
        even = 1 + z*z
        polynomials = np.stack((even+beta-1j*z*even,
                                even+beta+1j*z*even, -even), axis=1)
        quadrature = np.full(len(t), step)
        quadrature[[0, -1]] *= .5
        kernels = base[:, None]*polynomials*quadrature[:, None]
        result = np.zeros((len(r), 3))
        result[r == 0] = (1, 1, 0)
        positive = np.flatnonzero(r > 0)
        for start in range(0, len(positive), 32):
            indices = positive[start:start+32]
            logs = np.log(r[indices])
            integral = np.real(np.exp(1j*logs[:, None]*t) @ kernels)
            result[indices] = np.exp(-lam*(1+u)*logs[:, None])*integral
        return result


# ---- Packing magic functions in dimensions 8 and 24 -------------------------

# Subtract the modular kernels' growing cusp terms, integrate the remainder,
# then add the rational integrals back. In the tail use the original integral
# to avoid cancellation. Modular kernels are evaluated at high precision.

def _eisenstein_and_delta(t: mp.mpf):
    """E2(it), E4(it), E6(it), Delta(it), for t >= 1.

    The Lambert series use n**(k-1) q**n/(1-q**n).  Computing Delta
    by its product avoids subtracting E4**3 and E6**2 near the cusp.
    """
    q = mp.exp(-2 * mp.pi * t)
    e2 = e4 = e6 = mp.mpf(1)
    product = mp.mpf(1)
    qn = q
    n = 1
    while True:
        term = qn / (1 - qn)
        e2 -= 24 * n * term
        e4 += 240 * n**3 * term
        e6 -= 504 * n**5 * term
        product *= (1 - qn)**24
        if n**5 * qn < mp.eps * mp.mpf('0.001'):
            break
        n += 1
        qn *= q
    return e2, e4, e6, q * product, q


def _phi(d: int, t: mp.mpf):
    """The exponentially decaying quasimodular form at it, t >= 1."""
    # Far in the cusp these three terms are far more accurate than needed
    # for plotting, and avoid cancellation in the defining polynomial.
    if t > 6:
        q = mp.exp(-2 * mp.pi * t)
        if d == 8:
            return q * (518400 + q * (31104000 + q * 870912000))
        return q * (-3657830400 + q * (-314573414400 - q * 13716864000000))
    e2, e4, e6, delta, _ = _eisenstein_and_delta(t)
    if d == 8:
        return (e2 * e4 - e6)**2 / delta
    c = -49 * e4**3 + 25 * e6**2
    return (25 * e4**4 - 49 * e6**2 * e4 + 48 * e6 * e4**2 * e2 + c * e2**2) / delta**2


def _psi_s(d: int, t: mp.mpf):
    """The decaying S-transform, evaluated only for t >= 1."""
    nome = mp.exp(-mp.pi * t)
    if t > 6:
        if d == 8:
            return -10240 * nome - 1253376 * nome**3 - 48328704 * nome**5
        return -7340032 * nome - 918552576 * nome**3
    theta2 = mp.jtheta(2, 0, nome)
    theta3 = mp.jtheta(3, 0, nome)
    theta4 = mp.jtheta(4, 0, nome)
    if d == 8:
        return -128 * (theta3**4 + theta2**4) / theta4**8 - 128 * (theta2**4 - theta4**4) / theta3**8
    delta = (theta2 * theta3 * theta4)**8 / 256
    return -(7 * theta2**20 * theta4**8 + 7 * theta2**24 * theta4**4 + 2 * theta2**28) / delta**2


def _regularized_kernels(d: int, t: mp.mpf):
    """Return the two decaying, real Laplace integrands after subtraction."""
    pi = mp.pi
    if t < 1:
        power = 2 if d == 8 else 10
        raw_a = t**power * _phi(d, 1 / t)
        raw_b = -t**power * _psi_s(d, 1 / t)
        p_a, p_b = _cusp_terms(d, t)
        return raw_a - p_a, raw_b - p_b

    e2, e4, e6, delta, q = _eisenstein_and_delta(t)
    nome = mp.sqrt(q)
    theta2 = mp.jtheta(2, 0, nome)
    theta3 = mp.jtheta(3, 0, nome)
    theta4 = mp.jtheta(4, 0, nome)
    if d == 8:
        phi_minus4 = e4**2 / delta
        phi_minus2 = e4 * (e2 * e4 - e6) / delta
        phi0 = (e2 * e4 - e6)**2 / delta
        remainder_a = (t**2 * phi0 - 12 * t / pi * (phi_minus2 - 720)
                       + 36 / pi**2 * (phi_minus4 - 1 / q - 504))
        psi = 128 * (theta3**4 + theta4**4) / theta2**8 + 128 * (theta4**4 - theta2**4) / theta3**8
        remainder_b = psi - 1 / q - 144
    else:
        c = -49 * e4**3 + 25 * e6**2
        phi = (25 * e4**4 - 49 * e6**2 * e4 + 48 * e6 * e4**2 * e2 + c * e2**2) / delta**2
        phi1_real = (-288 * e6 * e4**2 - 12 * e2 * c) / delta**2
        remainder_a = (t**2 * phi
                       + t / pi * (phi1_real - 725760 / q - 113218560)
                       + 36 / pi**2 * (c / delta**2 + 24 / q**2 + 61632 / q + 6198336))
        psi = (7 * theta4**20 * theta2**8 + 7 * theta4**24 * theta2**4 + 2 * theta4**28) / delta**2
        remainder_b = psi - 2 / q**2 + 464 / q - 172128
    return remainder_a, remainder_b


def _cusp_terms(d: int, t: mp.mpf):
    """The nondecaying terms subtracted in the regularized formula."""
    pi = mp.pi
    exponential = mp.exp(2 * pi * t)
    if d == 8:
        return (36 / pi**2 * exponential - 8640 / pi * t + 18144 / pi**2,
                exponential + 144)
    return (-864 / pi**2 * exponential**2
            + 725760 / pi * t * exponential - 2218752 / pi**2 * exponential
            + 113218560 / pi * t - 223140096 / pi**2,
            2 * exponential**2 - 464 * exponential + 172128)


def _cusp_tail(d: int, s: np.ndarray, cutoff: float):
    """Exact cusp integrals on t >= cutoff, for s > CONTACT_RADII[d]**2."""
    def tail(k, linear=False):
        rate = np.pi * (s - k)
        value = np.exp(-rate * cutoff) / rate
        return value * (cutoff + 1 / rate) if linear else value

    if d == 8:
        a = 36 / np.pi**2 * tail(2) - 8640 / np.pi * tail(0, True) + 18144 / np.pi**2 * tail(0)
        b = tail(2) + 144 * tail(0)
    else:
        a = (-864 / np.pi**2 * tail(4) + 725760 / np.pi * tail(2, True)
             - 2218752 / np.pi**2 * tail(2) + 113218560 / np.pi * tail(0, True)
             - 223140096 / np.pi**2 * tail(0))
        b = 2 * tail(4) - 464 * tail(2) + 172128 * tail(0)
    return np.column_stack((a, b))


@lru_cache(maxsize=8)
def _packing_quadrature(d: int, order: int, cutoff: float):
    nodes, weights = leggauss(order)
    edges = [0, 0.125, 0.25, 0.5, 1, 2, 4, 8, cutoff]
    if cutoff <= 8:
        raise ValueError('The modular-integral cutoff must exceed 8.')
    t = np.concatenate([(lo + hi) / 2 + (hi - lo) / 2 * nodes for lo, hi in zip(edges, edges[1:])])
    w = np.concatenate([(hi - lo) / 2 * weights for lo, hi in zip(edges, edges[1:])])
    # With cutoff=14, the largest cusp terms have about 77 decimal
    # digits.  The 120-digit working precision still resolves their
    # exponentially small remainders.  Scale precision for larger cutoffs.
    precision = max(120, int(6 * cutoff + 50))
    with mp.workdps(precision):
        regularized, raw = [], []
        for x in t:
            x = mp.mpf(float(x))
            remainder = _regularized_kernels(d, x)
            regularized.append(tuple(float(v) for v in remainder))
            if x < 1:
                # Compute directly: adding back the cusp terms would
                # erase this exponentially small value near t=0.
                power = 2 if d == 8 else 10
                values = x**power * _phi(d, 1 / x), -x**power * _psi_s(d, 1 / x)
            else:
                values = tuple(v + p for v, p in zip(remainder, _cusp_terms(d, x)))
            raw.append(tuple(float(v) for v in values))
    return t, w[:, None] * np.array(regularized), w[:, None] * np.array(raw)


def magic_pair(d: int, r, *, order: int = 64, cutoff: float = 12.0):
    """Return exact-magic-function numerical values (F, Fhat) on r >= 0.

    The shape of ``r`` is preserved.  Increasing order/cutoff is an
    independent quadrature convergence check, not a proof of error bounds.
    """
    radii = np.asarray(r, dtype=float)
    if np.any(~np.isfinite(radii)) or np.any(radii < 0):
        raise ValueError('Radii must be finite and nonnegative.')
    if d not in CONTACT_RADII:
        raise ValueError('Magic functions are implemented only for d = 8, 24.')
    if not isinstance(order, int) or order < 16:
        raise ValueError('Quadrature order must be an integer at least 16.')
    if not np.isfinite(cutoff) or cutoff <= 8:
        raise ValueError('The modular-integral cutoff must be finite and exceed 8.')
    t, kernels, raw_kernels = _packing_quadrature(d, order, float(cutoff))
    s = radii.ravel()**2
    integrals = np.exp(-np.pi * s[:, None] * t[None, :]) @ kernels
    sin2 = np.sin(np.pi * s / 2)**2
    # Multiplication by sin^2 removes every rational pole.  These sinc
    # identities evaluate the continuous extensions without patching the
    # origin or lattice radii to arbitrary limits.
    def pole(k: float, power: int = 1):
        delta = s - k
        return (np.pi**2 / 4) * delta**(2 - power) * np.sinc(delta / 2)**2

    if d == 8:
        a = (36 * pole(2) - 8640 * pole(0, 2) + 18144 * pole(0)) / np.pi**3 + sin2 * integrals[:, 0]
        b = (pole(2) + 144 * pole(0)) / np.pi + sin2 * integrals[:, 1]
        self_part = -np.pi / 2160 * a
        anti_part = -b / (60 * np.pi)
    else:
        a = (-864 * pole(4) + 725760 * pole(2, 2) - 2218752 * pole(2)
             + 113218560 * pole(0, 2) - 223140096 * pole(0)) / np.pi**3 + sin2 * integrals[:, 0]
        b = (2 * pole(4) - 464 * pole(2) + 172128 * pole(0)) / np.pi + sin2 * integrals[:, 1]
        self_part = np.pi / 28304640 * a
        anti_part = -b / (65520 * np.pi)
    # The regularized formula subtracts O(1) quantities to obtain tiny
    # tail values.  Once the original integral converges comfortably,
    # use its raw modular kernels instead, including the cusp tails
    # analytically.  This remains accurate after multiplication by
    # r**((d-1)/2) * exp(2*pi*r).
    outer = s >= CONTACT_RADII[d]**2 + 0.25
    outer_integrals = (np.exp(-np.pi * s[outer, None] * t) @ raw_kernels
                       + _cusp_tail(d, s[outer], float(cutoff)))
    if d == 8:
        self_part[outer] = -np.pi / 2160 * sin2[outer] * outer_integrals[:, 0]
        anti_part[outer] = -sin2[outer] * outer_integrals[:, 1] / (60 * np.pi)
    else:
        self_part[outer] = np.pi / 28304640 * sin2[outer] * outer_integrals[:, 0]
        anti_part[outer] = -sin2[outer] * outer_integrals[:, 1] / (65520 * np.pi)
    return (self_part + anti_part).reshape(radii.shape), (self_part - anti_part).reshape(radii.shape)

# ---- Cohn--Goncalves magic function for A_+(12) -------------------------------

# The paper's function is divided by 66*pi, giving -r**2 + O(r**4) at zero.
# This is a Fourier +1 eigenfunction, not a sphere-packing LP function.

def _a12_theta_kernel(t: mp.mpf, *, transformed: bool = False) -> mp.mpf:
    """psi(it), or t**4*psi(i/t), evaluated only at t >= 1."""
    nome = mp.exp(-mp.pi * t)
    theta2 = mp.jtheta(2, 0, nome)
    theta3 = mp.jtheta(3, 0, nome)
    theta4 = mp.jtheta(4, 0, nome)
    delta = (theta2 * theta3 * theta4)**8 / 256
    if transformed:
        return (theta3**4 + theta4**4) * theta2**12 / delta
    return (theta3**4 + theta2**4) * theta4**12 / delta


def _a12_psi(t: mp.mpf) -> mp.mpf:
    if t < 1:
        # S transformation avoids slowly converging theta series as t -> 0.
        return t**4 * _a12_theta_kernel(1 / t, transformed=True)
    return _a12_theta_kernel(t)


@lru_cache(maxsize=8)
def _a12_quadrature(order: int, cutoff: float):
    nodes, weights = leggauss(order)
    edges = [0, 0.125, 0.25, 0.5, 1, 2, 4, 8, cutoff]
    t = np.concatenate([(lo + hi) / 2 + (hi - lo) / 2 * nodes
                        for lo, hi in zip(edges, edges[1:])])
    w = np.concatenate([(hi - lo) / 2 * weights
                        for lo, hi in zip(edges, edges[1:])])
    # The growing cusp term must be subtracted before casting to float.
    with mp.workdps(max(100, int(6 * cutoff + 40))):
        psi = [_a12_psi(mp.mpf(float(x))) for x in t]
        kernel = np.array([float(value - mp.exp(2 * mp.pi * float(x)) + 264)
                           for x, value in zip(t, psi)])
        log_psi = np.array([float(mp.log(value)) for value in psi])
    return t, w * kernel, log_psi, w


def magic_a12(r, *, order: int = 64, cutoff: float = 12.0):
    """Evaluate the normalized exact A_+(12) magic function on r >= 0.

    Input shape is preserved.  The function has a double zero at 0, a
    simple zero at sqrt(2), and double zeros at sqrt(2*j), j >= 2.  It is
    positive beyond sqrt(2) except at those double zeros.  Increase order
    and cutoff to check quadrature convergence.
    """
    radii = np.asarray(r, dtype=float)
    if np.any(~np.isfinite(radii)) or np.any(radii < 0):
        raise ValueError('Radii must be finite and nonnegative.')
    if not isinstance(order, int) or order < 16:
        raise ValueError('Quadrature order must be an integer at least 16.')
    if not np.isfinite(cutoff) or cutoff <= 8:
        raise ValueError('The modular-integral cutoff must be finite and exceed 8.')
    t, kernel, log_psi, weights = _a12_quadrature(order, float(cutoff))
    s = radii.ravel()**2
    integral = np.exp(-np.pi * s[:, None] * t[None, :]) @ kernel
    sin2 = np.sin(np.pi * s / 2)**2
    pole0 = (np.pi**2 / 4) * s * np.sinc(s / 2)**2
    pole2 = (np.pi**2 / 4) * (s - 2) * np.sinc((s - 2) / 2)**2
    value = ((pole2 - 264 * pole0) / np.pi + sin2 * integral) / (66 * np.pi)
    # Away from the first zero the original positive Laplace integral
    # converges rapidly.  Use it to avoid catastrophic cancellation of
    # the rational terms and regularized integral in the tiny tail.
    outer = s >= 3
    positive_integral = np.exp(log_psi[None, :] - np.pi*s[outer, None]*t) @ weights
    # Analytically integrate the two nondecaying cusp terms past cutoff;
    # the remaining omitted tail is O(exp(-pi*(s+1)*cutoff)).
    positive_integral += (np.exp(-np.pi*(s[outer]-2)*cutoff) / (np.pi*(s[outer]-2))
                          - 264*np.exp(-np.pi*s[outer]*cutoff) / (np.pi*s[outer]))
    value[outer] = sin2[outer] * positive_integral / (66*np.pi)
    # Eliminate sin(pi)'s floating-point residue at this exact known zero.
    value[s == 0] = 0.0
    return value.reshape(radii.shape)


if __name__ == "__main__":
    main()
