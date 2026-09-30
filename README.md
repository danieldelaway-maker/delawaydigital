# delawaydigital.com

Static site: plain HTML, one stylesheet, one tiny script for the contact form, no build step. Hosted on GitHub Pages: pushing to `main` publishes the site.

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

Uses Formspree. The form `action` in `index.html` is `https://formspree.io/f/<FORM_ID>`, and submissions are emailed to the Formspree account owner. `contact-form.js` sends the form in the background and redirects to `/thanks/`. Without JavaScript it falls back to Formspree’s own thank-you page.

`.nojekyll` tells GitHub Pages to serve the files as-is. The custom domain is set in the repo's **Settings → Pages**, which adds a `CNAME` file.

## Local preview

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.
