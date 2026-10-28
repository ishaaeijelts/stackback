// Assembles full pages. To add, remove or reorder homepage sections, edit HOME.
import { esc } from './lib.mjs';
import header from './sections/header.mjs';
import hero from './sections/hero.mjs';
import steps from './sections/steps.mjs';
import buy from './sections/buy.mjs';
import pricing from './sections/pricing.mjs';
import photos from './sections/photos.mjs';
import faq from './sections/faq.mjs';
import cta from './sections/cta.mjs';
import privacy from './sections/privacy.mjs';
import footer from './sections/footer.mjs';

const HOME = [hero, steps, buy, pricing, photos, faq, cta];

// Anonymous, cookieless visit counter. Only added when config.goatcounter is filled in.
// The path includes ?ref=CODE so flyer scans per code show up separately.
const goatcounter = (code) =>
  code
    ? `<script>window.goatcounter = { path: function () { return location.pathname + location.search } }</script>
  <script data-goatcounter="https://${esc(code)}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`
    : '';

const head = (ctx, { title, description }) => {
  const { c, config, base } = ctx;
  const url = config.siteUrl + ctx.path;
  const alternates = config.languages
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${config.siteUrl}${ctx.pathFor(l)}">`)
    .join('\n  ');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.brand,
    url: config.siteUrl,
    telephone: '+' + config.whatsappNumber,
    areaServed: config.city,
    description: c.meta.description,
  };
  return `<!doctype html>
<html lang="${c.meta.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(c.meta.ogTitle)}">
  <meta property="og:description" content="${esc(c.meta.description)}">
  <meta property="og:image" content="${config.siteUrl}/assets/brand/og-image.png">
  <meta name="theme-color" content="#13213A">
  <link rel="icon" href="${base}assets/brand/logo-mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${base}assets/brand/apple-touch-icon.png">
  <link rel="preload" href="${base}assets/fonts/bricolage-grotesque-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${base}assets/fonts/atkinson-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}assets/css/site.css">
  <script>document.documentElement.classList.add('js')</script>
  ${ctx.kind === 'home' ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  ${goatcounter(config.goatcounter)}
</head>
<body>`;
};

const shell = (ctx, meta, sections) =>
  `${head(ctx, meta)}
${header(ctx)}
<main id="main">
${sections.map((s) => s(ctx)).join('\n')}
</main>
${footer(ctx)}
<script src="${ctx.base}assets/js/site.js" defer></script>
</body>
</html>
`;

export const homePage = (ctx) => shell(ctx, { title: ctx.c.meta.title, description: ctx.c.meta.description }, HOME);

export const privacyPage = (ctx) =>
  shell(ctx, { title: ctx.c.privacyPage.metaTitle, description: ctx.c.meta.description }, [privacy]);
