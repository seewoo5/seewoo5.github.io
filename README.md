# seewoo5.github.io

Personal website built with [Jekyll](https://jekyllrb.com/) and the
[minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) theme,
hosted on GitHub Pages.

## Local development

Install dependencies once:

```sh
bundle install
```

Then serve the site locally:

```sh
bundle exec jekyll serve --incremental --livereload --limit_posts 5 --config _config.yml,_config_dev.yml
```

Open <http://localhost:4000>. The server watches files and rebuilds on save
(`--livereload` auto-refreshes the browser).

### Why the extra flags?

Production builds (GitHub Pages) use only `_config.yml`, which pulls the theme
from GitHub via `remote_theme` on every build — slow (~3 min). For local work,
`_config_dev.yml` overrides this for a ~6s startup by:

- using the locally-installed `minimal-mistakes-jekyll` gem instead of the
  remote theme download,
- skipping the slow `jekyll-spaceship` plugin,
- excluding heavy asset folders (`assets/images`, `assets/presentations`, ...).

Flag reference:

- `--config _config.yml,_config_dev.yml` — layer the dev overrides on top.
- `--incremental` — only rebuild changed pages after the initial build.
- `--livereload` — auto-refresh the browser on changes.
- `--limit_posts 5` — build only the 5 newest posts. Drop this if you need the
  full blog archive.

To build without serving (output to `_site/`), replace `serve` with `build`.

> Note: the local gem may be a slightly newer minor version than the pinned
> `remote_theme`, so treat tiny styling differences as expected. For a
> production-faithful build, omit `--config _config.yml,_config_dev.yml`.

## Editing content

- **Pages**: top-level `.md` files (`research.md`, `programming.md`, `travel.md`,
  `misc.md`, ...).
- **Navigation bar**: `_data/navigation.yml`.
- **Blog posts**: `_posts/`.
- **Travel map data**: `_data/travel_locations.yml`.
