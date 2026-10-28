import { esc, join } from '../lib.mjs';

export default (ctx) => {
  const s = ctx.c.steps;
  return `
<section class="section" id="${s.id}" aria-labelledby="${s.id}-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="${s.id}-title">${esc(s.title)}</h2>
      <p class="lead">${esc(s.intro)}</p>
    </div>
    <ol class="steps">
      ${join(
        s.items,
        (it, i) => `
      <li class="step">
        <span class="step__num" aria-hidden="true">${i + 1}</span>
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.text)}</p>
      </li>`
      )}
    </ol>
    <p class="steps__more"><a class="link" href="#${ctx.c.photos.id}">${esc(s.photoLink)}</a></p>
  </div>
</section>`;
};
