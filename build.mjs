// Build: node build.mjs  ->  writes the static site to /dist
// No dependencies. Text lives in src/content/<lang>.json, layout in src/sections/*.mjs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import page from './src/page.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const config = readJson('src/config.json');
const pathFor = (lang) => (lang === config.defaultLanguage ? '/' : `/${lang}/`);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });

for (const lang of config.languages) {
  const c = readJson(`src/content/${lang}.json`);
  const isDefault = lang === config.defaultLanguage;
  const otherLang = config.languages.find((l) => l !== lang);
  const base = isDefault ? '' : '../'; // relative asset paths: works on any host or sub-folder
  const ctx = {
    config,
    c,
    lang,
    base,
    path: pathFor(lang),
    pathFor,
    otherLang,
    homeHref: './',
    otherLangHref: isDefault ? `${otherLang}/` : '../',
  };
  const outDir = isDefault ? dist : join(dist, lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page(ctx));
}

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${config.languages.map((l) => `  <url><loc>${config.siteUrl}${pathFor(l)}</loc></url>`).join('\n')}
</urlset>
`
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

console.log(`Built ${config.languages.length} pages to dist/`);
