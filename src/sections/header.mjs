import { esc, join, waAttrs, icon, logoMark } from '../lib.mjs';

export default (ctx) => {
  const { c } = ctx;
  return `
<a class="skip" href="#main">${esc(c.meta.skipLink)}</a>
<header class="header">
  <div class="wrap header__inner">
    <a class="logo" href="${ctx.homeHref}" aria-label="${esc(ctx.config.brand)}">${logoMark}<span class="logo__word">stackback</span></a>
    <nav class="header__nav" aria-label="Menu">
      ${join(c.nav.items, (i) => `<a href="${ctx.anchorBase}${i.href}">${esc(i.label)}</a>`)}
    </nav>
    <div class="header__actions">
      <a class="lang" href="${ctx.otherLangHref}" hreflang="${ctx.otherLang}" lang="${ctx.otherLang}">${esc(c.meta.switchLabel)}</a>
      <a class="btn btn--go btn--small" ${waAttrs(ctx)}>${icon.chat}<span>${esc(c.nav.cta)}</span></a>
    </div>
  </div>
</header>`;
};
