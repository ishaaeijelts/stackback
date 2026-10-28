import { esc, waAttrs, icon, logoMark } from '../lib.mjs';

export default (ctx) => {
  const f = ctx.c.footer;
  const kvk = ctx.config.kvk ? `<p>${esc(f.kvkLabel)} ${esc(ctx.config.kvk)}</p>` : '';
  return `
<footer class="footer">
  <div class="wrap footer__inner">
    <div>
      <a class="logo" href="${ctx.homeHref}" aria-label="${esc(ctx.config.brand)}">${logoMark}<span class="logo__word">stackback</span></a>
      <p>${esc(f.tagline)}</p>
      <p>${esc(f.contact)}: <a ${waAttrs(ctx)}>${esc(ctx.config.phoneDisplay)}</a></p>
      ${kvk}
      <p><a class="lang" href="${ctx.otherLangHref}" hreflang="${ctx.otherLang}" lang="${ctx.otherLang}">${esc(ctx.c.meta.switchLabel)}</a></p>
    </div>
    <div class="footer__legal">
      <p>${esc(f.trademark)}</p>
      <p>${esc(f.privacy)}</p>
      <p>&copy; ${new Date().getFullYear()} ${esc(ctx.config.brand)}</p>
    </div>
  </div>
</footer>

<div class="sticky" id="sticky" hidden>
  <a class="btn btn--go btn--block" ${waAttrs(ctx)}>${icon.chat}<span>${esc(ctx.c.sticky.button)}</span></a>
</div>`;
};
