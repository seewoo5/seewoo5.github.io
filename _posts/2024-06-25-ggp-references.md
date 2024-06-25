---
layout: posts
title:  "Gan-Gross-Prasad conjecture: References"
date:   2024-06-25
categories: jekyll update
tags: math
---

Here I give a comprehensive list of existing works on [Gan-Gross-Prasad conjectures](https://en.wikipedia.org/wiki/Gan%E2%80%93Gross%E2%80%93Prasad_conjecture), for

* local GGP,
* global GGP,
* _refined_ global GGP (i.e. Ichino-Ikeda type formulas).

I'll try to include as many as works, not just restricted to classical groups (e.g. some works on metaplectic groups).
The project is inspired from [this table](https://www.jonathanpwang.com/notes/RelativeDualitydb.html) for relative Langlands duality by Jonathan Wang.
Here are some notes on how-to-read the table:

* references without years are the papers on arXiv or author's website that are not published yet.
* some of published references are given arXiv link instead, if the former link is not freely available.
* references with `°` are results that formulated the conjecture for the first time. 
* references with `*` are results with certain assumptions: local assumptions, theta lifts, only covers one direction, etc. 
* references with `**` _remove_ certain technical assumptions of previous works.
* if one proved refined global result that implies unrefined version, then I only include it in the last column.
* for local results, I put ${p}$ (resp. ${\infty}$) for non-archimedean (resp. archimedean) results.
* for local results, higher codimension cases follows from "basic" cases (i.e. codimension 0 or 1), by [Gan--Gross--Prasad, Theorem 19.1](http://www.numdam.org/book-part/AST_2012__346__1_0/).


| Type | Case | Local | Global | Refined |
|---|---|---|---|---|
| $$\mathrm{SO}_{n} \times \mathrm{SO}_{n+1}$$ | all $$n$$ | [Gross--Prasad (1992)$${}^{\circ}$$](https://www.cambridge.org/core/journals/canadian-journal-of-mathematics/article/on-the-decomposition-of-a-representation-of-son-when-restricted-to-son1/480B5AAB9A6EF06AC35B0E2E5C92CF8F), [Waldspurger (2012)$${}^{p}\text{*}$$](http://www.numdam.org/item/AST_2012__346__171_0/), [Mœglin--Waldspurger (2012)$${}^{p}$$](http://www.numdam.org/item/AST_2012__347__167_0/) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Ginzburg--Rallis--Soudry (2011)$$\text{*}$$](https://www.worldscientific.com/worldscibooks/10.1142/7742#t=aboutBook) | [Ichino--Ikeda (2010)$${}^{\circ}\text{*}$$](https://link.springer.com/article/10.1007/s00039-009-0040-4) |
|  | $$n=2$$ |  | [Jacquet (1986)](http://www.numdam.org/item/?id=ASENS_1986_4_19_2_185_0) | [Waldspurger (1985)](http://www.numdam.org/item/CM_1985__54_2_173_0/), [Krishna (2016)](https://msp.org/ant/2019/13-3/p02.xhtml) |
|  | $$n=3$$ |  |  | [Ichino (2008)](https://projecteuclid.org/journals/duke-mathematical-journal/volume-145/issue-2/Trilinear-forms-and-the-central-values-of-triple-product-L/10.1215/00127094-2008-052.short) |
|  | $$n=4$$ |  |  | [Gan--Ichino (2010)$$\text{*}$$](https://www.cambridge.org/core/journals/journal-of-the-institute-of-mathematics-of-jussieu/article/abs/on-endoscopy-and-the-refined-grossprasad-conjecture-for-so5-so4/4EFEC6A07CFE8AC39346036647277EA9) |
|  | $$n=5$$ |  |  | [Ichino--Ikeda (2010)$${}^{\circ}\text{*}$$](https://link.springer.com/article/10.1007/s00039-009-0040-4) |
| $$\mathrm{SO}_{n} \times \mathrm{SO}_{n+2r+1}$$ | all $$(n,r)$$ | [Gross--Prasad (1994)$${}^{\circ}$$](https://www.cambridge.org/core/journals/canadian-journal-of-mathematics/article/on-irreducible-representations-of-so2n1-so2m/69FED7D8B441FADC56ACC07DA2CBD7BA), [Mœglin--Waldspurger (2012)$${}^{p}$$](http://www.numdam.org/item/AST_2012__347__167_0/) + [Gan--Gross--Prasad (2012)](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Luo$${}^{p\infty}$$](https://arxiv.org/pdf/2009.13947) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Jiang--Zhang (2020)$$\text{*}$$](https://projecteuclid.org/journals/annals-of-mathematics/volume-191/issue-3/Arthur-parameters-and-cuspidal-automorphic-modules-of-classical-groups/10.4007/annals.2020.191.3.2.full) | [Liu (2014)$${}^{\circ}\text{*}$$](https://www.degruyter.com/document/doi/10.1515/crelle-2014-0016/html?lang=en) |
|  | $$n=2,r=1$$ |  | [Furusawa--Martin (2014)$$\text{*}$$](https://link.springer.com/article/10.1007/s00209-013-1248-4) | [Liu (2014)$${}^{\circ}\text{*}$$](https://www.degruyter.com/document/doi/10.1515/crelle-2014-0016/html?lang=en), [Corbett (2016)$$\text{*}$$](https://www.degruyter.com/document/doi/10.1515/forum-2015-0164/html?lang=de), [Qiu (2013)$$\text{*}$$](https://arxiv.org/abs/1312.5793), [Murase--Narita (2016)$$\text{*}$$](https://www.worldscientific.com/doi/abs/10.1142/s0129167x16500014?casa_token=r4wPGjMmMbAAAAAA%3A8iOMdTsOqIqsO_O1AMPqbkyk9MhuukZPW787KQwAV_y-xzG7W6y9SIRUtwqVVuwUhqsgbopJAVw) |
|  | $$n=3,r=1$$ |  |  | [Liu (2014)$${}^{\circ}\text{*}$$](https://www.degruyter.com/document/doi/10.1515/crelle-2014-0016/html?lang=en) |
|  | $$n=2$$, all $$r$$ |  | [Furusawa--Morimoto (2017)$$\text{*}$$](https://link.springer.com/article/10.1007/s00208-016-1440-z) | [Furusawa--Morimoto (2018)$$\text{*}$$](https://ems.press/content/serial-article-files/32541) |
| $$\mathrm{U}_{n} \times \mathrm{U}_{n+1}$$ | all $$n$$ | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Beauzart--Plessis (2016)$${}^{p}$$](https://www.arxiv.org/abs/1205.2987), [Beauzart--Plessis (2020)$${}^{\infty}$$](https://arxiv.org/abs/1506.01452) | [Ginzburg--Rallis--Soudry (2011)$$\text{*}$$](https://www.worldscientific.com/worldscibooks/10.1142/7742#t=aboutBook), [Zhang (2014)$$\text{*}$$](https://annals.math.princeton.edu/2014/180-3/p04) | [Harris (2014)$${}^{\circ}\text{*}$$](https://academic.oup.com/imrn/article-abstract/2014/2/303/662467), [Zhang (2014)$$\text{*}$$](https://www.ams.org/journals/jams/2014-27-02/S0894-0347-2014-00784-0/home.html), [Xue (2017)$$\text{**}$$](https://www.degruyter.com/document/doi/10.1515/crelle-2017-0016/html), [Beauzart-Plessis--Liu--Zhang--Zhu (2021)$$\text{**}$$](https://annals.math.princeton.edu/2021/194-2/p05) [Beauzart-Plessis--Chaudouard--Zydor (2022)$$\text{**}$$](https://link.springer.com/article/10.1007/s10240-021-00129-1) |
|  | $$n=1, 2$$ |  |  | [Harris (2014)$${}^{\circ}\text{*}$$](https://academic.oup.com/imrn/article-abstract/2014/2/303/662467) |
| $$\mathrm{U}_{n} \times \mathrm{U}_{n+2r+1}$$ | all $$(n,r)$$ | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Beauzart--Plessis (2016)$${}^{p}$$](https://www.arxiv.org/abs/1205.2987) + [Gan--Gross--Prasad (2012)](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Xue (2023)$${}^{\infty}\text{*}$$](https://projecteuclid.org/journals/duke-mathematical-journal/volume-172/issue-5/Bessel-models-for-real-unitary-groups-The-tempered-case/10.1215/00127094-2022-0018.short), [Xue$${}^{\infty}$$](https://math.arizona.edu/%7Exuehang/lggp_generic_v1.pdf) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Jiang--Zhang (2020)$$\text{*}$$](https://projecteuclid.org/journals/annals-of-mathematics/volume-191/issue-3/Arthur-parameters-and-cuspidal-automorphic-modules-of-classical-groups/10.4007/annals.2020.191.3.2.full ) | [Beuzart-Plessis--Chaudouard$${}^{\circ}$$](https://arxiv.org/abs/2302.12331) |
|  | $$n=0$$ |  | [Ginzburg--Rallis--Soudry (2011)$$\text{*}$$](https://www.worldscientific.com/worldscibooks/10.1142/7742#t=aboutBook) |  |
|  | $$n=1$$ |  |  | [Furusawa--Morimoto](https://arxiv.org/abs/2205.09471) |
| $$\mathrm{U}_{n} \times \mathrm{U}_{n}$$ | all $$n$$ | [Gan--Ichino (2016)$${}^{p}$$](https://link.springer.com/article/10.1007/s00222-016-0662-8) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Xue (2014)](https://www.sciencedirect.com/science/article/pii/S0001870814002163) | [Xue (2016)$$\text{*}$$](https://link.springer.com/article/10.1007/s11856-016-1300-2) |
| $$\mathrm{U}_{n} \times \mathrm{U}_{n + 2r}$$ | all $$(n,r)$$ | [Gan--Ichino (2016)$${}^{p}$$](https://link.springer.com/article/10.1007/s00222-016-0662-8) + [Gan--Gross--Prasad (2012)](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Xue$${}^{\infty}$$](https://math.arizona.edu/%7Exuehang/local_FJ_u.pdf) |  | [Boisseau--Lu--Xue](https://arxiv.org/abs/2404.07342) |
| $$\mathrm{Mp}_{2n} \times \mathrm{Sp}_{2n}$$ | all $$n$$ | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/), [Atobe (2018)$${}^{p}\text{*}$$](https://link.springer.com/article/10.1007/s00208-017-1620-5) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/) | [Xue (2017)$${}^{\circ}\text{*}$$](https://www.cambridge.org/core/journals/compositio-mathematica/article/refined-global-gangrossprasad-conjecture-for-fourierjacobi-periods-on-symplectic-groups/9D5AA8CD2E557CF84D135107EE436F37) |
| $$\mathrm{Mp}_{2n} \times \mathrm{Sp}_{2n + 2r}$$ | all $$(n, r)$$ | [Atobe (2018)$${}^{p}\text{*}$$](https://link.springer.com/article/10.1007/s00208-017-1620-5) + [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/) | [Gan--Gross--Prasad (2012)$${}^{\circ}$$](http://www.numdam.org/book-part/AST_2012__346__1_0/) | [Xue (2017)$${}^{\circ}\text{*}$$](https://www.cambridge.org/core/journals/compositio-mathematica/article/refined-global-gangrossprasad-conjecture-for-fourierjacobi-periods-on-symplectic-groups/9D5AA8CD2E557CF84D135107EE436F37) |
|  | $$(n,r)=(1,1)$$ |  |  | [Xue (2017)$${}^{\circ}\text{*}$$](https://www.cambridge.org/core/journals/compositio-mathematica/article/refined-global-gangrossprasad-conjecture-for-fourierjacobi-periods-on-symplectic-groups/9D5AA8CD2E557CF84D135107EE436F37) |
| $$\mathrm{GSpin}_{n} \times \mathrm{GSpin}_{n+1}$$ | all $$n$$ | [Emory--Takeda (2023)$${}^{p}\text{*}$$](https://link.springer.com/article/10.1007/s00209-023-03228-3) |  | [Emory (2020)$${}^{\circ}\text{*}$$](https://msp.org/pjm/2020/306-1/pjm-v306-n1-p05-s.pdf) |
|  | $$n \leq 4$$ |  |  | [Emory (2020)$${}^{\circ}\text{*}$$](https://msp.org/pjm/2020/306-1/pjm-v306-n1-p05-s.pdf) |

I may finish with introducing [one more great article by Gross](https://people.math.harvard.edu/~gross/preprints/gan-epilogue.pdf) that covers the history of the conjecture.
Please let me know if there are any errors or possible updates - this table is supposed to be continuously updated.
