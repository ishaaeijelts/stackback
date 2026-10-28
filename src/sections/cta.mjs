import { esc, waAttrs, telHref, icon } from '../lib.mjs';

export default (ctx) => {
  const c = ctx.c.cta;
  return `
<section class="cta" id="contact" aria-labelledby="cta-title">
  <div class="wrap cta__inner">
    <div>
      <h2 id="cta-title">${esc(c.title)}</h2>
      <p>${esc(c.text)}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--go btn--large" id="final-cta" ${waAttrs(ctx)}>${icon.chat}<span>${esc(c.button)}</span></a>
      <p class="cta__phone">${esc(c.phoneLabel)} <a href="${telHref(ctx)}">${esc(ctx.config.phoneDisplay)}</a></p>
    </div>
  </div>
</section>`;
};
