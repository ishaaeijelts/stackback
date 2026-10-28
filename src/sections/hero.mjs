import { esc, join, waAttrs, icon } from '../lib.mjs';

// The headline is drawn as a stack of bricks: one coloured slab per line.
const tones = ['lilac', 'mint', 'tangerine'];

export default (ctx) => {
  const h = ctx.c.hero;
  return `
<section class="hero">
  <div class="wrap hero__inner">
    <h1 class="stack" aria-label="${esc(h.lines.join(' '))}">
      ${join(h.lines, (line, i) => `<span class="stack__slab stack__slab--${tones[i % tones.length]}" aria-hidden="true">${esc(line).replace('®', '<sup class="reg">®</sup>')}</span>`)}
    </h1>
    <div class="hero__side">
      <p class="hero__intro">${esc(h.intro)}</p>
      <div class="hero__actions">
        <a class="btn btn--go btn--large" id="hero-cta" ${waAttrs(ctx)}>${icon.chat}<span>${esc(h.cta)}</span></a>
        <a class="link" href="#${ctx.c.steps.id}">${esc(h.secondary)}</a>
      </div>
      <ul class="facts">
        ${join(h.facts, (f) => `<li>${icon.check}<span>${esc(f)}</span></li>`)}
      </ul>
    </div>
  </div>
</section>`;
};
