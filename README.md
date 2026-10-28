# Stackback website

De website van Stackback (stackback.nl). Eén pagina, Nederlands op `/` en Engels op `/en/`. Statisch, snel, geen cookies, geen dependencies.

## Lokaal bekijken

```bash
node build.mjs            # bouwt de site naar dist/
cd dist && python3 -m http.server 8080
# open http://localhost:8080
```

## Iets aanpassen

| Wat | Waar |
|---|---|
| Teksten | `src/content/nl.json` en `src/content/en.json` |
| WhatsApp-nummer, KvK-nummer, domein | `src/config.json` |
| Kleuren en lettertypes | bovenaan `public/assets/css/site.css` |
| Opbouw van een sectie | `src/sections/<naam>.mjs` |
| Volgorde van secties | `src/page.mjs` |

Werk je met een AI? Laat hem eerst `AGENTS.md` lezen. Daar staat precies welk bestand waarvoor is, zodat hij niet de hele code hoeft te lezen.

Zodra jullie een KvK-nummer hebben: zet het in `src/config.json` bij `"kvk"`. Dan verschijnt het automatisch in de footer.

## Live zetten (GitHub Pages)

De site wordt automatisch gebouwd en gepubliceerd bij elke wijziging op `main` (zie `.github/workflows/deploy.yml`).

Eenmalig instellen:
1. Repository → **Settings** → **Pages** → bij "Source" kies **GitHub Actions**.
2. Eigen domein: vul bij **Custom domain** `stackback.nl` in. Zet bij je registrar deze DNS-records:
   - `A`-records voor `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` voor `www`: `ishaaeijelts.github.io`
   Vink daarna **Enforce HTTPS** aan.

## Flyers meten zonder cookies

Zet op elke flyer een QR-code naar `https://stackback.nl/?ref=CODE`, met per wijk of per batch een andere code (bijv. `A1`, `A2`, `OOST`).
Als iemand via die QR op de WhatsApp-knop drukt, staat de code automatisch onder het bericht: *"... (code: A1)"*. Zo zie je in WhatsApp welke flyer werkt.

## Huisstijl (ook voor de flyer)

**Kleuren**

| Naam | Hex | Gebruik |
|---|---|---|
| Ink | `#13213A` | tekst, donkere vlakken |
| Tangerine | `#FF8A3D` | steen, accent |
| Mint | `#4FCB9B` | steen |
| Lilac | `#B59BFF` | steen |
| Butter | `#FFD25A` | steen, klein accent |
| Fog | `#EEF1F6` | lichte achtergrond |
| Go-groen | `#157A45` | WhatsApp-knop (witte tekst) |

**Lettertypes** (gratis, Google Fonts)
- Koppen: *Bricolage Grotesque*, ExtraBold (800)
- Tekst: *Atkinson Hyperlegible*, Regular en Bold

**Logo's** in `public/assets/brand/`:
- `logo.svg`: logo voor lichte achtergrond
- `logo-white.svg`: logo voor donkere achtergrond
- `logo-mark.svg`: alleen het beeldmerk
- `avatar-1024.png`: profielfoto voor WhatsApp Business en Instagram
- `og-image.png`: plaatje dat verschijnt als iemand de link deelt

**Typische kop:** elke regel op een eigen gekleurd "steentje" (lilac, mint, tangerine van boven naar beneden), schuin op elkaar gestapeld, zoals bovenaan de website.

**Niet doen:** het LEGO-logo gebruiken, LEGO-achtige rode/gele letters, of minifiguren tekenen. "LEGO®" als woord mag wel.

## Structuur

```
build.mjs              bouwscript (geen dependencies)
src/config.json        nummer, domein, KvK
src/content/*.json     alle teksten per taal
src/page.mjs           <head> + volgorde van secties
src/sections/*.mjs     één bestand per sectie
src/lib.mjs            helpers, iconen, logo
public/assets/         css, js, fonts, logo's (wordt 1-op-1 gekopieerd)
dist/                  gebouwde site (niet handmatig aanpassen)
```
