// Stackback — small progressive enhancements. The site works without this file.
(function () {
  // 1. Flyer tracking without cookies: stackback.nl/?ref=A1 adds "(code: A1)" to the WhatsApp message,
  //    so you can see in WhatsApp which flyer or neighbourhood a lead came from.
  var ref = null;
  try {
    var fromUrl = new URLSearchParams(location.search).get('ref');
    if (fromUrl && /^[A-Za-z0-9_-]{1,24}$/.test(fromUrl)) {
      ref = fromUrl;
      sessionStorage.setItem('stackback-ref', ref);
    } else {
      ref = sessionStorage.getItem('stackback-ref');
    }
  } catch (e) {}

  if (ref) {
    document.querySelectorAll('a[data-wa]').forEach(function (a) {
      var msg = a.getAttribute('data-wa-message') + ' (' + a.getAttribute('data-wa-ref-label') + ': ' + ref + ')';
      a.href = a.href.split('?')[0] + '?text=' + encodeURIComponent(msg);
    });
  }

  // 2. Header gets a bottom border once you scroll.
  var header = document.querySelector('.header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Sticky WhatsApp button on phones: visible when neither the hero nor the final button is on screen.
  var sticky = document.getElementById('sticky');
  var targets = ['hero-cta', 'final-cta']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (sticky && targets.length && 'IntersectionObserver' in window) {
    sticky.hidden = false;
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      });
      sticky.classList.toggle('is-visible', visible.size === 0);
    });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
