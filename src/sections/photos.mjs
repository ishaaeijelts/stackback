import { esc, join, icon } from '../lib.mjs';

export default (ctx) => {
  const p = ctx.c.photos;
  const a = ctx.c.about;
  return `
<section class="section section--fog" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="wrap duo">
    <div class="panel">
      <span class="panel__icon">${icon.camera}</span>
      <h2 id="${p.id}-title">${esc(p.title)}</h2>
      <p>${esc(p.intro)}</p>
      <ul class="checks">
        ${join(p.items, (t) => `<li>${icon.check}<span>${esc(t)}</span></li>`)}
      </ul>
      <p class="muted">${esc(p.note)}</p>
    </div>
    <div class="about">
      <h2>${esc(a.title)}</h2>
      ${join(a.text, (t) => `<p>${esc(t)}</p>`)}
    </div>
  </div>
</section>`;
};
