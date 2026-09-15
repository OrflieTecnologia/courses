/* ============================================================
   Orflie — comportamentos da landing page
   ============================================================ */
(function () {
  'use strict';

  /* ---- Sombra na navbar ao rolar a página ---- */
  var nav = document.getElementById('mainNav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Fallback das logos (mostra o texto se o PNG não existir) ---- */
  function applyLogoFallback(img) {
    var isDark = img.getAttribute('data-variant') === 'dark';
    var span = document.createElement('span');
    span.className = 'fw-bold ' + (isDark ? 'fs-5 text-white' : 'fs-4');
    span.style.color = isDark ? '#fff' : '#383E42';
    span.innerHTML = 'orf<span style="color:#F85916">lie</span>';
    if (img.parentNode) { img.replaceWith(span); }
  }

  var logos = document.querySelectorAll('.js-logo');
  logos.forEach(function (img) {
    // Se já falhou antes do script carregar
    if (img.complete && img.naturalWidth === 0) {
      applyLogoFallback(img);
    } else {
      img.addEventListener('error', function () { applyLogoFallback(img); });
    }
  });
})();
