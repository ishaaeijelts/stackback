import { esc, join, icon } from '../lib.mjs';

const tones = ['tangerine', 'mint', 'lilac', 'butter'];

export default (ctx) => {
  const p = ctx.c.pricing;
  return `
<section class="section" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="wrap pricing">
    <div class="pricing__intro">
      <h2 id="${p.id}-title">${esc(p.title)}</h2>
      <p class="lead">${esc(p.intro)}</p>
      <p class="pricing__promise">${esc(p.promise)}</p>
    </div>
    <dl class="factors">
      ${join(
        p.factors,
        (f, i) => `
      <div class="factor factor--${tones[i % tones.length]}">
        <dt>${esc(f.title)}</dt>
        <dd>${esc(f.text)}</dd>
      </div>`
      )}
    </dl>
    <div class="boost">
      <h3>${esc(p.boostTitle)}</h3>
      <ul class="checks">
        ${join(p.boost, (t) => `<li>${icon.check}<span>${esc(t)}</span></li>`)}
      </ul>
    </div>
  </div>
</section>`;
};
