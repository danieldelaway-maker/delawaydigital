# delawaydigital.com

Static site: plain HTML, one stylesheet, no JavaScript, no build step. Hosted on Netlify.

## Layout

| Path | Page |
| --- | --- |
| `index.html` | Home (contact form lives here, `#contact`) |
| `about/index.html` | About |
| `privacy-policy/`, `terms-of-use/`, `cookie-policy/` | Legal pages |
| `thanks/index.html` | Shown after the contact form is submitted |
| `styles.css` | All styles. Colours and fonts are variables at the top |
| `assets/` | Images |

The header and footer are copied into every page. If you change one, change them all.

## Conventions

- One `<h1>` per page, plus a unique `<title>` and `<meta name="description">`.
- Every `<img>` needs `alt` text. Use `alt=""` for decorative icons.
- Use root-relative paths (`/assets/...`, `/about/`).

## Contact form

Uses Netlify Forms (`data-netlify="true"`, form name `contact`). Submissions show up in the Netlify dashboard under **Forms**. Set up email notifications there.

## Local preview

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.
