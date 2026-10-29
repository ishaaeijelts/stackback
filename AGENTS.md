# Stackback site: map for AI assistants

Static site: homepage + privacy page, NL at `/` and `/privacy/`, EN at `/en/` and `/en/privacy/`. No dependencies. Build with `node build.mjs`, output in `dist/` (never edit `dist/`).

## Where to change what (read only the file you need)
| Want to change | File |
|---|---|
| Any visible text (NL / EN) | `src/content/nl.json`, `src/content/en.json` (same keys in both; change both) |
| Phone/WhatsApp number, email, Instagram/TikTok handles, address, KvK, GoatCounter code, domain | `src/config.json` (empty fields are hidden on the site) |
| Colours, fonts, spacing | `:root` tokens at the top of `public/assets/css/site.css` |
| Layout/markup of one section | `src/sections/<section>.mjs` (header, hero, steps, buy, pricing, photos, faq, cta, privacy, footer) |
| Privacy statement text | `privacyPage` in both content JSON files |
| Section order, `<head>`, SEO meta, visit counter | `src/page.mjs` |
| Which pages exist, URLs | `PAGES` in `build.mjs` |
| Shared helpers, icons, logo mark | `src/lib.mjs` |
| Flyer ref code, sticky button, header border | `public/assets/js/site.js` |
| Logo files | `public/assets/brand/` |

## Rules
- All text goes through `esc()`; never put HTML in the JSON content.
- Add a list item (FAQ, step, etc.): add an object to the array in both JSON files; no code change needed.
- CSS is grouped by section with comments; selectors are flat class names (BEM-ish), no IDs for styling.
- Every WhatsApp link uses `waAttrs(ctx)` so `?ref=CODE` from flyers is appended to the message.
- Do not use the LEGO logo, LEGO-style lettering or minifigure drawings (trademarks). "LEGO®" as a word is fine.
- Deploy: pushing to `main` builds and publishes via `.github/workflows/deploy.yml` (GitHub Pages).
- After changes: `node build.mjs` and check `dist/index.html` and `dist/en/index.html`.
