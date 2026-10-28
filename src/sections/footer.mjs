import { esc, waAttrs, telHref, icon, logoMark } from '../lib.mjs';

export default (ctx) => {
  const f = ctx.c.footer;
  const { config } = ctx;
  // Optional lines: only shown once filled in src/config.json
  const kvk = config.kvk ? `<p>${esc(f.kvkLabel)} ${esc(config.kvk)}</p>` : '';
  const email = config.email ? `<p>${esc(f.emailLabel)}: <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></p>` : '';
  const address = config.address ? `<p>${esc(config.address)}</p>` : '';
  return `
<footer class="footer">
  <div class="wrap footer__inner">
    <div>
      <a class="logo" href="${ctx.homeHref}" aria-label="${esc(ctx.config.brand)}">${logoMark}<span class="logo__word">stackback</span></a>
      <p>${esc(f.tagline)}</p>
      <p>${esc(f.contact)}: <a href="${telHref(ctx)}">${esc(config.phoneDisplay)}</a></p>
      ${email}
      ${address}
      ${kvk}
      <p><a class="lang" href="${ctx.otherLangHref}" hreflang="${ctx.otherLang}" lang="${ctx.otherLang}">${esc(ctx.c.meta.switchLabel)}</a></p>
    </div>
    <div class="footer__legal">
      <p>${esc(f.trademark)}</p>
      <p>${esc(f.privacy)} <a href="${ctx.privacyHref}">${esc(f.privacyLink)}</a></p>
      <p>&copy; ${new Date().getFullYear()} ${esc(ctx.config.brand)}</p>
    </div>
  </div>
</footer>

<div class="sticky" id="sticky" hidden>
  <a class="btn btn--go btn--block" ${waAttrs(ctx)}>${icon.chat}<span>${esc(ctx.c.sticky.button)}</span></a>
</div>`;
};
