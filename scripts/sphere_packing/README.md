# Magic-function comparisons

Everything is in [`plot_comparison.py`](plot_comparison.py). It requires only
NumPy, SciPy, Matplotlib, and mpmath; there are no local Python dependencies.

From the repository root:

```sh
python -m pip install -r scripts/sphere_packing/requirements.txt
OPENBLAS_NUM_THREADS=1 python scripts/sphere_packing/plot_comparison.py
```

To change titles, labels, colors, or line styles, edit `render()` and redraw
the cached data:

```sh
python scripts/sphere_packing/plot_comparison.py --replot
```

The three figures cover `0 <= r <= 4`:

- `dimension_8` and `dimension_24`: magic function versus `f_minus`, and its
  Fourier transform versus `f_plus`.
- `dimension_12`: Cohn–Gonçalves' A_+(12) magic function versus `f_zero`.

Each curve is multiplied by `r**((d-1)/2)*exp(2*pi*r)` and independently
peak-normalized. The default is `--epsilon 0.1`; `--replot` keeps the cached
parameters. The multiplier introduces a displayed zero at the origin for
functions that do not vanish there.

PNG images, cached data, and numerical checks are saved in
`assets/images/sphere-packing-comparison/`. Use `--output DIRECTORY`
to change the destination, or `--help` for numerical options.

The script evaluates the modular-form and inverse Mellin integrals, with
quadrature and contour checks. These are numerical checks, not rigorous
error certificates; the low-dimensional Astra functions are not asserted
to satisfy the asymptotic sign theorem.

## Sources

- [OpenAI report, Chapter 1](https://cdn.openai.com/pdf/ten-proofs-oai.pdf).
- [Viazovska: dimension 8](https://arxiv.org/abs/1603.04246).
- [Cohn–Gonçalves: A_+(12)](https://arxiv.org/abs/1712.04438).
- [Cohn–Kumar–Miller–Radchenko–Viazovska: dimension 24](https://arxiv.org/abs/1603.06518).
