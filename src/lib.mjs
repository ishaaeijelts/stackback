// Shared helpers for all sections. Keep this file small.

/** Escape text for safe use in HTML. Content in /content is always passed through this. */
export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Join an array of HTML strings. */
export const join = (arr, fn) => arr.map(fn).join('');

/** WhatsApp link with a prefilled message. site.js appends the flyer ref code (?ref=) at runtime. */
export const waHref = (ctx) =>
  `https://wa.me/${ctx.config.whatsappNumber}?text=${encodeURIComponent(ctx.c.whatsapp.message)}`;

/** Attributes every WhatsApp link gets, so site.js can add the ref code. */
export const waAttrs = (ctx) =>
  `href="${waHref(ctx)}" data-wa data-wa-message="${esc(ctx.c.whatsapp.message)}" data-wa-ref-label="${esc(
    ctx.c.whatsapp.refLabel
  )}" data-goatcounter-click="whatsapp" target="_blank" rel="noopener"`;

/** Phone link for calling. Same number as WhatsApp (config.whatsappNumber). */
export const telHref = (ctx) => `tel:+${ctx.config.whatsappNumber}`;

/** Inline SVG icons (stroke = currentColor). */
export const icon = {
  chat: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z"/><path d="M8.5 8.5h7M8.5 11.5h4.5"/></svg>`,
  check: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  cross: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  camera: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7H8l1.5-2.5h5L16 7h2.5A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
};

/** A small brick glyph (with two studs) in one of the brand tones. */
export const brick = (tone = 'tangerine') =>
  `<svg class="brick brick--${tone}" viewBox="0 0 40 30" aria-hidden="true"><rect x="7" y="0" width="9" height="7" rx="2"/><rect x="24" y="0" width="9" height="7" rx="2"/><rect x="0" y="6" width="40" height="24" rx="5"/></svg>`;

/** The logo mark (three stacked bricks), same geometry as /assets/brand/logo-mark.svg. */
export const logoMark = `<svg class="logo__mark" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="3" width="9" height="6" rx="2" fill="#B59BFF"/><rect x="24" y="3" width="9" height="6" rx="2" fill="#B59BFF"/><rect x="6" y="8" width="32" height="17" rx="4" fill="#B59BFF"/><rect x="14" y="25" width="44" height="18" rx="4" fill="#4FCB9B"/><rect x="2" y="43" width="60" height="19" rx="4" fill="#FF8A3D"/></svg>`;
