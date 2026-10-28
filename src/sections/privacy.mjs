import { esc, join } from '../lib.mjs';

// Privacy statement page. Text lives in content/<lang>.json under "privacyPage".
// "{phone}" in the text is replaced by the phone number from config.json.
export default (ctx) => {
  const p = ctx.c.privacyPage;
  const fill = (t) => esc(t).replace('{phone}', esc(ctx.config.phoneDisplay));
  return `
<section class="section legal">
  <div class="wrap legal__inner">
    <p><a class="link" href="${ctx.homeHref}">${esc(p.back)}</a></p>
    <h1>${esc(p.title)}</h1>
    <p class="muted">${esc(p.updated)}</p>
    ${join(
      p.sections,
      (s) => `
    <h2>${esc(s.h)}</h2>
    ${s.p ? join(s.p, (t) => `<p>${fill(t)}</p>`) : ''}
    ${s.list ? `<ul class="legal__list">${join(s.list, (t) => `<li>${fill(t)}</li>`)}</ul>` : ''}`
    )}
  </div>
</section>`;
};
