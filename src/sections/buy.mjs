import { esc, join, brick, icon } from '../lib.mjs';

export default (ctx) => {
  const b = ctx.c.buy;
  return `
<section class="section section--fog" id="${b.id}" aria-labelledby="${b.id}-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="${b.id}-title">${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
    </div>
    <ul class="buy">
      ${join(
        b.items,
        (it) => `
      <li class="buy__item">
        ${brick(it.tone)}
        <div>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
        </div>
      </li>`
      )}
      <li class="buy__item buy__item--not">
        <span class="not__icon">${icon.cross}</span>
        <div>
          <h3>${esc(b.notTitle)}</h3>
          <p>${esc(b.not)}</p>
        </div>
      </li>
    </ul>
  </div>
</section>`;
};
