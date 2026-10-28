// Build: node build.mjs  ->  writes the static site to /dist
// No dependencies. Text lives in src/content/<lang>.json, layout in src/sections/*.mjs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage, privacyPage } from './src/page.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const config = readJson('src/config.json');
const langDir = (lang) => (lang === config.defaultLanguage ? '' : `${lang}/`);

// Every page: its folder (relative to the language root) and its renderer.
const PAGES = [
  { kind: 'home', dir: '', render: homePage },
  { kind: 'privacy', dir: 'privacy/', render: privacyPage },
];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });

const urls = [];
for (const lang of config.languages) {
  const c = readJson(`src/content/${lang}.json`);
  const otherLang = config.languages.find((l) => l !== lang);
  for (const page of PAGES) {
    const rel = langDir(lang) + page.dir; // e.g. "", "privacy/", "en/", "en/privacy/"
    const depth = rel.split('/').filter(Boolean).length;
    const up = '../'.repeat(depth); // relative paths work on any host or sub-folder
    const toLangRoot = '../'.repeat(page.dir.split('/').filter(Boolean).length);
    const ctx = {
      config,
      c,
      lang,
      kind: page.kind,
      base: up,
      path: '/' + rel,
      pathFor: (l) => '/' + langDir(l) + page.dir,
      otherLang,
      homeHref: toLangRoot || './',
      anchorBase: page.kind === 'home' ? '' : toLangRoot || './',
      privacyHref: (toLangRoot || '') + 'privacy/',
      otherLangHref: up + langDir(otherLang) + page.dir || './',
    };
    const outDir = join(dist, rel);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), page.render(ctx));
    urls.push(config.siteUrl + '/' + rel);
  }
}

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

console.log(`Built ${urls.length} pages to dist/`);
