import { esc, join } from '../lib.mjs';

export default (ctx) => {
  const f = ctx.c.faq;
  return `
<section class="section" id="${f.id}" aria-labelledby="${f.id}-title">
  <div class="wrap faq">
    <h2 id="${f.id}-title">${esc(f.title)}</h2>
    <div class="faq__list">
      ${join(
        f.items,
        (it) => `
      <details class="qa">
        <summary>${esc(it.q)}</summary>
        <p>${esc(it.a)}</p>
      </details>`
      )}
    </div>
  </div>
</section>`;
};
