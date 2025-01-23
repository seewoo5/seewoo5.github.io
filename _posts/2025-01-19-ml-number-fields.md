---
layout: posts
title:  "ML in Number Theory I - Number fields"
date:   2025-01-19
categories: jekyll update
tags: math machine-learning
---

Recently, many people started to study arithmetic or number-theoretic object via machine learning.
Especially, the famous paper on [murmurations of elliptic curves](https://www.tandfonline.com/doi/full/10.1080/10586458.2024.2382361) by He, Lee, Oliver, and Pozdnyakov (HLOP24 in short) discovered that

1. There is a striking oscillation pattern on the average of the "local informations" $a\_{p} = p + 1 - \\# E(\mathbb{F}\_{p})$ as $p$ increases, which is called *murmuration*. The pattern highly depends on the rank of elliptic curves.

2. We can predict rank of an elliptic curve with $a_{p}$'s with simple machine learning models (no fancy deep learning, just linear models) with >90% accuracies (definitly much better than random guesses), where murmuration give one possible explanation for the performances.

This is very interesting for me, since I never believed that ML can give a meaningful prediction of these numbers with high accuracy, because of its nature.
(Most of the ML algorithms performs well on data with continuous features, while it is much harder to learn discrete distributions, especially when a small perturbation changes data completely - for example, think about prime factorization of $n$ and $n + 1$.)
There are other papers that learn other things ([finite groups and rings](https://arxiv.org/abs/1905.02263), [number fields](https://archive.intlpress.com/site/pub/pages/journals/items/mcgd/content/vols/0002/0001/a002/index.php?mode=ns), [Fricke sign of Maass forms](https://arxiv.org/abs/2501.02105), etc).

I wanted to do something similar, but I quickly found that the codes are not available publicly (at least there's no GitHub repository).
So I started to reproduce the results myself, and I realized that I don't have a data in my laptop.
Now, all the data can be found on [LMFDB](https://www.lmfdb.org/), but another issue is, I don't know how to crawl web data at all.
For each thing in LMFDB, you can download the associated data, but it took a while to do this.

Luckily, I found that [David Roe](https://math.mit.edu/~roed/) developed [`lmfdb-lite`](https://github.com/roed314/lmfdb-lite), where anyone knows python can use it (so that I don't need to learn all the PostgreSQL things myself).
In this post, I'll record my footprints to use `lmfdb-lite` and reproduce the results on number fields and elliptic curves (in the next post).
I assume that you already installed both SAGE and `lmfdb-lite`.


# Make a database of number fields

First, import `lmfdb-lite`. We will only use `db`.

```python
from lmf import db
```

Number field database can be loaded as

```python
nf_db = db.nf_fields
```

Our first goal is to predict the rank of the unit group $\mathcal{O}\_{K}^\times$, where we are going to use two different types of "features".
One of them is the coefficients of the defining polynomials of $K$, which is monic, integer coefficients, and the sum $\sum_i |\alpha\_{i}|^{2}$ of complex zeros is minimized (denoted as $v_{P}(K) = (c_0, \dots, c_{n-1})$ where $P(x) = c_0 + c_1 x + \cdots + c_{n-1} x^{n-1} + x^{n}$).

Another feature is the coefficients of the Dedekind zeta function

$$
    \zeta_{K}(s) = \sum_{0 \ne I \subseteq \mathcal{O}_{K}} \frac{1}{N(I)^{s}} = \prod_{\mathfrak{p}} \left(1 - N(\mathfrak{p})^{-s}\right)^{-1} = \sum_{n \ge 1} \frac{a_{n}}{n^{s}}
$$

where

$$
    a_{n} = \#\{I \subseteq \mathcal{O}_{K} : N(I) = n\}.
$$

Now, let's try to load all the available number fields of degree 2. We need to filter the whole `nf_db` based on the degree - how?
You can use `search` to make a query, if you know the key.
The available names of the keys (or columns) can be found in `nf_db.search_cols`. For example,

```python
print(nf_db.search_cols)
```

gives

```
['class_group', 'class_number', 'cm', 'coeffs', 'conductor', 'degree', 'disc_abs', 'disc_rad', 'disc_sign', 'embeddings_gen_imag', 'embeddings_gen_real', 'gal_is_abelian', 'gal_is_cyclic', 'gal_is_solvable', 'galois_disc_exponents', 'galois_label', 'galt', 'grd', 'index', 'inessentialp', 'is_galois', 'is_minimal_sibling', 'iso_number', 'label', 'local_algs', 'minimal_sibling', 'monogenic', 'num_ram', 'r2', 'ramps', 'rd', 'regulator', 'relative_class_number', 'subfield_mults', 'subfields', 'torsion_order', 'used_grh']
```

The `coeffs` column is exactly $v_{P}(K)$, but there are a lot of other informations, and some of them *look missing*.
For example, there's no `rank`.
However, there *is* `r2`, and using $n = r_1 + 2 r_2$, we can compute $r_1$, so the rank of $\mathcal{O}\_{K}$ as $r = r_1 + r_2 - 1$ by [Dirichlet's unit theorem](https://en.wikipedia.org/wiki/Dirichlet%27s_unit_theorem).

Coefficients of Dedekind zeta functions are not shown in LMFDB directly (please correct me if I'm wrong), but you can use SAGE to compute these with `zeta_coefficients` method of the `NumberField` class:

```python
def zc(poly, N=1000):
    F.<a> = NumberField(poly)
    return F.zeta_coefficients(N)
```

As in [HLO22](https://archive.intlpress.com/site/pub/pages/journals/items/mcgd/content/vols/0002/0001/a002/index.php?mode=ns), we use the first 1000 of them $(a_1, a_2, \dots, a_{1000})$.

Combining these, we can make our own table of the quadratic fields.
Columns of the table would be `label`, `r`, `c_0`, `c_1`, `a_1`, `a_2`, ..., `a_1000`.
But here's an another issue: a priori, you cannot use python packages and SAGE at once.
For example, `import pandas as pd` does not work in SAGE (or `.sage` file, because there's no `pandas` installed there!), while SAGE-specific grammars does not work in native python (you can use `preparse` though).
Following [this answer](https://ask.sagemath.org/question/35457/importing-python-packages-into-sage-or-vice-versa/?answer=35459#post-id-35459), I was able to install `pandas`, `lmfdb-lite` or other packages (e.g. `tqdm`) to the directory where SAGE is installed.
In fact, I ended up with using [Polars](https://pola.rs/) instead, which is an alternative of Pandas but with better performances.
Also, if you are using Mac OS, you probably need to install [`polars-lts-cpu`](https://pypi.org/project/polars-lts-cpu/) instead of `polars`, i.e. do `pip install polars-lts-cpu` (See [here](https://github.com/pola-rs/polars/issues/12292)).

First, start SAGE shell as

```
sage --sh
```

then you will see something like

```
(sage-sh) seewoolee@LSW-mac:~/Documents/development/playground$
```

Now, you can use `pip` or `pip3` to install packages, then enter

```
exit
```

to exit the shell. Now you can do something like this:

```
$ sage
┌────────────────────────────────────────────────────────────────────┐
│ SageMath version 10.3, Release Date: 2024-03-19                    │
│ Using Python 3.11.8. Type "help()" for help.                       │
└────────────────────────────────────────────────────────────────────┘
sage: import polars as pl
sage: df = pl.DataFrame()
sage: df
shape: (0, 0)
┌┐
╞╡
└┘
```

So we are essentially working with `.sage` or `.ipynb` files.
The following SAGE code let you load a database of number fields of a given degree in LMFDB, where you can certainly modify it to query in a different way (e.g. number fields with Galois group `C3`).
Note that each number field has its own [label](https://www.lmfdb.org/knowledge/show/nf.label) of the form of `degree.r1.discriminant.number` (so you can actually extract $r_1$ from the label).

```python
from sage.all import *

import pathlib

import pandas as pd
import polars as pl
from lmf import db
from tqdm import tqdm


current_path = pathlib.Path(__file__).resolve().parent
nf_db = db.nf_fields


def zc(poly, N):
    R = PolynomialRing(ZZ, "x")
    F.<a> = NumberField(R(poly))
    return F.zeta_coefficients(N)


def load_nf(degree=None, N=1000, limit=None, save=False):
    """Make a pandas datafram of number fields of given degree.
    Columns are `label`, `rank`, `c_0`, ..., `c_{degree-1}`, `a_1`, `a_2`, ..., `a_N`.
    """
    filter = {}
    if degree is not None:
        filter["degree"] = degree
    qfs = nf_db.search(filter, ["label", "coeffs", "r2"], limit=limit)
    qfs = list(qfs)

    columns = ["rank"]
    for i in range(degree):
        columns.append(f"c_{i}")
    for i in range(1, N+1):
        columns.append(f"a_{i}")

    df = None
    df_label = None
    
    chunk_size = 10000
    for i in tqdm(range(0, len(qfs), chunk_size), desc="loading data"):
        labels = []
        data = []
        for F in qfs[i:i+chunk_size]:
            label = F["label"]
            r2 = F["r2"]
            r1 = degree - 2 * r2
            r = r1 + r2 - 1
            labels.append(label)
            F_data = [r] + list(float(x) for x in F["coeffs"][:-1]) + list(zc(F["coeffs"], N))
            data.append(F_data)
        if df is None:
            df_label = pl.DataFrame(labels, schema=["label"])
            df = pl.DataFrame(data, schema=columns)
        else:
            df_label.extend(pl.DataFrame(labels, schema=["label"]))
            df.extend(pl.DataFrame(data, schema=columns))

    print(f"Total number of degree {degree} fields in LMFDB:", len(df))
    if save:
        filename = f"nf_{degree}.csv"
        filepath = current_path / "data_nf" / filename
        df.write_csv(filepath)
    return df


df_quadratic = load_nf(degree=2, save=True)
print(df_quadratic.head())
```

Note that we change the coefficients from integer to floats, because they are huge in general (this is not an issue for the quadratic fields, but there were overflows for the cubic fields).
Also, for the performance issue, we divide whole table into few chuncks with size 10000.
With `save=True`, table will be saved as a `csv` file under the directory `data_nf`.
You can run these with Jupyter Notebook (with SAGE kernel), or save it as `nf.sage` and run

```
$ sage nf.sage
```

and you will get

```
$ sage lmfdb/numberfield_query.sage
loading data: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 138/138 [19:42<00:00,  8.57s/it]
Total number of degree 2 fields in LMFDB: 1371548
shape: (5, 1_004)
┌─────────┬──────┬──────┬──────┬───┬───────┬───────┬───────┬────────┐
│ label   ┆ rank ┆ c_0  ┆ c_1  ┆ … ┆ a_997 ┆ a_998 ┆ a_999 ┆ a_1000 │
│ ---     ┆ ---  ┆ ---  ┆ ---  ┆   ┆ ---   ┆ ---   ┆ ---   ┆ ---    │
│ str     ┆ i64  ┆ f64  ┆ f64  ┆   ┆ i64   ┆ i64   ┆ i64   ┆ i64    │
╞═════════╪══════╪══════╪══════╪═══╪═══════╪═══════╪═══════╪════════╡
│ 2.0.3.1 ┆ 0    ┆ 1.0  ┆ -1.0 ┆ … ┆ 2     ┆ 0     ┆ 2     ┆ 0      │
│ 2.0.4.1 ┆ 0    ┆ 1.0  ┆ 0.0  ┆ … ┆ 2     ┆ 0     ┆ 0     ┆ 4      │
│ 2.2.5.1 ┆ 1    ┆ -1.0 ┆ -1.0 ┆ … ┆ 0     ┆ 0     ┆ 0     ┆ 0      │
│ 2.0.7.1 ┆ 0    ┆ 2.0  ┆ -1.0 ┆ … ┆ 0     ┆ 4     ┆ 0     ┆ 0      │
│ 2.0.8.1 ┆ 0    ┆ 2.0  ┆ 0.0  ┆ … ┆ 0     ┆ 2     ┆ 0     ┆ 0      │
└─────────┴──────┴──────┴──────┴───┴───────┴───────┴───────┴────────┘
```

This takes about 20~30 minutes, and the whole table has `1371548` rows.

# Predict the rank of the unit group

Now we can start to work with our data.
We will try reproduce the first row of the Table 1 in HLO22, i.e. predict rank of $\mathcal{O}\_{K}^\times$ using $c_0, c_1$ or $a_1, \dots, a_{1000}$.
Note that this is a very easy problem to humans: the rank is 0 (resp. 1) if and only if $K$ is real (resp. imaginary) quadratic field, so

$$
r = \begin{cases} 0 & c_1^2 - 4 c_0 < 0 \\ 1 & c_1^2 - 4 c_0 > 0\end{cases}
$$

Especially, one only needs to learn the sign of the discriminant of $K$.
But how about using zeta coefficients? I think this is more interesting, and HLO22 tell us that learning $r$ from $a_i$'s are much harder (for machines).
Let's try decision tree and logistic regression, using [scikit-learn](https://scikit-learn.org/stable/).
Although the authors used random forest, decision tree is easier to interpret since there's only one tree.
The following is a *python* code, not *SAGE* - we don't need SAGE anymore at this momement.
I cannot found the exact split ratio of train, test set used in HLO22, so I choose it to be 80:20.

```python
def X_y(df, degree=2, feature_type="c", N=1000):
    if feature_type == "c":
        columns_ = [f"c_{i}" for i in range(degree)]
    else:
        assert feature_type == "a"
        columns_ = [f"a_{i}" for i in range(1, N+1)]
    X = df.select(columns_)
    y = df.select("rank")
    return X, y


def run_experiment(
    df,
    name,
    test_size=0.2,
    feature_type="c",
    model_type="dt",
    num_coeffs=1000,
):
    X, y = X_y(df, feature_type=feature_type, N=num_coeffs)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)

    print(f"Data: {name}, {feature_type}")
    print(f"Train: {X_train.shape}")
    print(f"Test: {X_test.shape}")

    # Train the model
    if model_type == "dt":
        model = DecisionTreeClassifier(random_state=42)
    elif model_type == "rf":
        model = RandomForestClassifier(random_state=42)
    elif model_type == "lr":
        model = LogisticRegression(random_state=42, solver="sag")
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.3f}")

    return model, acc
```

Note that it takes about 30 minutes to train on the zeta coefficients for each model, since the dataset is huge (1M x 1K).
The following table shows the results:

| Model               | Feature | Accuracy |
|---------------------|---------|----------|
| Decision Tree       | $c_i$   | 100%     |
| Decision Tree       | $a_i$   | 48.9%    |
| Logistic Regression | $c_i$   | 100%     |
| Logistic Regression | $a_i$   | 48.2%    |

This shows using $c_0, c_1$ gives **100%** accuracies, while using $a_1, \dots, a_{1000}$ works poorly, which is consistent with HLO22.
But 100% might be too high (compared to >0.999 in HLO22) - how could this happen?
For the decision tree models, it is possible to plot the tree:

```python
from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

model_dt, _ = run_experiment(df_quadratic, "dt_c", feature_type="c", model_type="dt")

plt.figure(figsize=(18, 15))
plot_tree(
    model_dt,
    filled=True,
    feature_names=["c_0", "c_1"],
    class_names=["0", "1"],
)
plt.show()
```

...and this is what you'll see:

<p align="center">
<img src="/assets/images/ml_nt-quad_dt.png">
<figcaption align="center">Decision Tree, trained on LMFDB dataset</figcaption>
</p>

It tells you that you only need to see the sign of $c_0$, and we actually have

$$
r = \begin{cases} 0 & c_{0} > 0 \\ 1 & c_{0} < 0 \end{cases}
$$

Where's $c_1$? Recall that LMFDB choose a defining polynomial to be monic, integral, and have minimal sum of squares of roots.
Now, look at the `Polynomial` column of [quadratic fields in LMFDB](https://www.lmfdb.org/NumberField/?start=50&degree=2), especially the coefficients of $x$.
You'll find a pattern of it, which you can actually prove:

> **Proposition.** Let $p(x) = x^{2} + c_{1}x + c_{0} \in \mathbb{Z}[x]$ be a polynomial with $c_{1}^{2} - 4 c_{0} = d \ne 0$. Let $\alpha_1, \alpha_2$ be the roots of $p(x)$. For given $d$, assume that $(c_0, c_1)$ minimizes $\|\alpha_1\|^2 + \|\alpha_2\|^2$ among all such polynomials. Then
>
> $$
c_1 = \begin{cases} 0 & d \equiv 0 \pmod{4} \\ \pm 1 & d \equiv 1 \pmod{4} \\ \end{cases}, \quad \mathrm{sgn}(d) = -\mathrm{sgn}(c_0)
> $$

*Proof.* When $d > 0$, $p(x)$ has two real roots and

$$
\alpha_1^2 + \alpha_2^2 = (\alpha_1 + \alpha_2)^{2} - 2\alpha_1 \alpha_2 = c_1^2 - 2c_0 = c_1^2 - \frac{c_1^2 - d}{2} = \frac{c_1^2 + d}{2}
$$

and we want to minimize this, i.e. minimize $c_1^2$.
If $d$ is a multiple of 4, we can choose $c_1 = 0$ and $c_0 = -\frac{d}{4}$.
If $d$ is 1 modulo 4, we can choose $c_1 = \pm 1$ and $c_0 = \frac{1-d}{4}$.

When $d < 0$, $p(x)$ has two complex roots that are conjugate each other. Then $\|\alpha_1\| = \|\alpha_2\|$ and

$$
|\alpha_1|^2 + |\alpha_2|^2 = 2 \alpha_1 \alpha_2 = 2c_0 = \frac{c_1^2 - d}{2},
$$

where the same argument applies. $\square$

In fact, it seems that LMFDB choose $c_1 \in \\{0, -1\\}$; by considering $p(x)$ and $p(-x)$, one can always take $c_1$ as above without changing the value of $\|\alpha_1\|^2 + \|\alpha_2\|^2$. Anyway, $c_1$ doesn't matter at all, and we only need to look at the sign of $c_0$.
In case of the logistic regression model, the model parameters are

```
model.coef_: [[-2.14643357e-09  3.23737023e-19]]
model.intercept_: [4.49174543e-18]
```

Especially, the model parameter corresponds to $c_0$ (`model.coef_[0]`) is much higher than $c_1$ (`model.coef_[1]`) or bias (`model.intercept_`), and the sign of `coef_[0]` is negative. This also shows that the model learned the same criterion as decision tree.

What if we make our own database, without referring to LMFDB?
Especially, we will choose a polynomial first, and look at the corresponding number field.
For a given monic polynomial $p(x) = x^2 + c_1 x + c_0 \in \mathbb{Z}[x]$, the associated quadratic field only depends on the class of the discriminant $d \in \mathbb{Q}^{\times} / (\mathbb{Q}^{\times})^{2}$, and the rank of the unit group depends on the sign of $d$.
Hence, we can make a dataset of $(c_0, c_1, r)$ with varying $(c_0, c_1)$ (so there could be the same fields with different polynomials).
Instead of considering all the possible pairs, here we simply sample $(c_0, c_1)$ with $|c_1| \le M$ and $|c_0| \le \frac{M^2}{4}$ (if we sample both $c_0$ and $c_1$ from the same range $[-M, M]$, then the distribution of the ranks become highly unbalanced.)
Let's sample 1M tuples with $|c_i| \le 10^{4}$.

```python
from math import isqrt
import numpy as np

def data_custom(N=10 ** 6, M=10 ** 4):
    data = []
    is_sampled = {}
    while len(data) < N:
        c1 = np.random.randint(-M, M+1)
        c0 = np.random.randint(-M ** 2 // 4, M ** 2 // 4 + 1)
        d = c1 ** 2 - 4 * c0
        if d >= 0 and isqrt(d) ** 2 == d:
            continue
        r = 1 if d > 0 else 0
        if (c0, c1) not in is_sampled:
            data.append([c0, c1, r])
            is_sampled[(c0, c1)] = True

    df = pl.DataFrame(data, schema=["c_0", "c_1", "rank"])
    return df
```

Now, decision tree classifier gives 99.9% accuracy. Can we interpret the model again?

<p align="center">
<img src="/assets/images/ml_nt-quad_dt2.png">
<figcaption align="center">Decision Tree, trained on a custom dataset</figcaption>
</p>

We cannot even read the texts! This is not helpful at all.
Fortunately, we can try to draw the decision boundary using sklearn's `DecisionBoundaryDisplay`, which is much helpful.

```python
X, y = X_y(df_custom, feature_type="c", N=1000000)
DecisionBoundaryDisplay.from_estimator(model_dt, X, feature_names=["c_0", "c_1"])
```

<p align="center">
<img src="/assets/images/ml_nt-quad_dt_boundary.png">
<figcaption align="center">Decision boundary of the above decision tree</figcaption>
</p>

It is clear that the tree is learning the correct boundary of $c_1^2 - 4c_0 = 0$. Smart tree.

You may guess that logistic regression (or any linear models) is not good enough to give such an accuracy, and this is true - the accuracy is only 83.2%. Wait, isn't this much higher that you thought? In fact, the decision boundary tells you why:

<p align="center">
<img src="/assets/images/ml_nt-quad_lr_boundary.png">
<figcaption align="center">Decision boundary of the logistic regression model on a custom dataset</figcaption>
</p>

It simply predicts based on how large $c_0$ is, which gives over 80% accuracy but still not enough and not interesting.
If you want to learn the boundary correctly, we can include the *powers* of $c_0, c_1$ as features, too.
In other words, let's use *polynomial regression* (to be precise, it is classification, not regression).
You can use [`PolynomialFeature`](https://scikit-learn.org/dev/modules/generated/sklearn.preprocessing.PolynomialFeatures.html) to transform $c_0, c_1$ into $1, c_0, c_1, c_0^2, c_0 c_1, c_1^2$, and train a logistic regression model on these features.

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_poly, y, test_size=0.2, random_state=42)

model_lr = LogisticRegression(random_state=42, max_iter=5000)

model_lr.fit(X_train, y_train)

y_pred = model_lr.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc:.3f}")

print(model_lr.coef_)
print(model_lr.intercept_)
```

This yields a much better model:

```
Accuracy: 0.998
[[ 1.71975833e-12 -4.56918722e-05 -5.07112007e-11 -3.07102666e-13
   2.31300198e-12  1.17883502e-05]]
[1.71975833e-12]
```

Also, 1st and 5th coefficients are much larger than the others.
These correspond to $c_0$ and $c_1^2$, and the value of `model_lr.coef_[0][1] / model_lr.coef_[0][5]` is close to -4 (it is about -3.88), which means that logistic regression with polynomial features can learn the correct decision boundary, too.

How about cubic fields? Like as quadratic fields, there are only two possibilities, depending on the discriminant of the field:

$$
    r = \begin{cases} 1 & \Delta_K < 0 \\ 3 & \Delta_K > 0\\ \end{cases}
$$

(where the second cubic fields are *totally real fields*), and in terms of the polynomial coefficients, it is equivalent to

$$
    r = \begin{cases} 1 & c_1^2 c_2^2 - 4 c_1^3 - 27 c_0^2 + 18 c_0 c_1 c_2 < 0 \\ 3 & c_1^2 c_2^2 - 4 c_1^3 - 27 c_0^2 + 18 c_0 c_1 c_2 > 0 \\ \end{cases}
$$

So again, we wonder whether the ML models can learn this polynomial boundary.
As you expected, decision tree worked pretty well but logistic regression worked poorly (without using polynomial features).
But we also found that $c_2$ is not necessary for the prediction - both gives almost same accuracy of 98.7%.
Where's $c_2$?
Again, this is something hidden in LMFDB's table:

> **Proposition.** Let $p(x) = x^3 + c_2 x^{2} + c_{1}x + c_{0} \in \mathbb{Z}[x]$ be a polynomial with $\mathrm{disc}(p) = c_1^2 c_2^2 - 4 c_1^3 - 27 c_0^2 + 18 c_0 c_1 c_2 \ne 0$. Let $\alpha_1, \alpha_2, \alpha_3$ be the roots of $p(x)$. For given $d$, assume that $(c_0, c_1, c_2)$ minimizes $\|\alpha_1\|^2 + \|\alpha_2\|^2 + \|\alpha_3\|^2$ among all such polynomials. Then $c_2 \in \\{0, \pm 1\\}$.

*Proof.* Replacing $p(x)$ with $q(x) = p(x - a) = x^3 + (c_2 - 3a)x^2 + \cdots$ for $a \in \mathbb{Z}$ does not change the discriminant, while the sum $\sum_{i} \|\alpha_i\|^2$ changes to

$$
\sum_i |\alpha_i + a|^2 = \sum_i |\alpha_i|^2 + (3a^2 - 2 c_2 a).
$$

If $c_2 \not \in \\{0, \pm 1\\}$, then choose $a$ to be the nearest integer to $\frac{c_2}{3}$, so that the sum $\sum_i \|\alpha_i\|^2$ becomes smaller.
Hence, we can always take $c_2$ as $0$ or $\pm 1$. $\square$

You can check that all the $c_2$'s in LMFDB cubic fields table are 0 or -1, and the discriminant reduces to

$$
\mathrm{disc}(p) = \begin{cases} -4c_1^3 - 27c_0^2 & c_2 = 0 \\ c_1^2 - 4c_1^3 - 27 c_0^2 - 18 c_0 c_1 & c_2 = -1 \end{cases}
$$

And one see that the decision boundary of the tree is close to the curve $-4c_1^3 - 27c_0^2 = 0$. Here we restricted to $\|c_0\| \le 10000$ and $\|c_1\| \le 1000$, use [`filter`](https://docs.pola.rs/api/python/stable/reference/dataframe/api/polars.DataFrame.filter.html).

<p align="center">
<img src="/assets/images/ml_nt-cubic_dt.png">
<figcaption align="center">Decision boundary of the decision tree, trained on cubic fields</figcaption>
</p>
