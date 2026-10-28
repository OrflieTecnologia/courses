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

  /* ---- Formulário → Orflie CRM (orflia.ai) ---- */
  var CRM_WEBHOOK = 'https://orflia.ai/api/webhooks/formulario/54ffa9ff-a1be-44f1-b8dd-b3821b63b561';
  var form = document.getElementById('form-inscricao');
  if (form) {
    var feedback = document.getElementById('form-feedback');
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn.innerHTML;

    var showFeedback = function (type, msg) {
      feedback.innerHTML = '';
      var div = document.createElement('div');
      div.className = 'alert alert-' + type + ' mb-0';
      div.textContent = msg;
      feedback.appendChild(div);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando...';
      feedback.innerHTML = '';

      fetch(CRM_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          if (!r.ok) { throw new Error('HTTP ' + r.status); }
          return r.json();
        })
        .then(function (res) {
          if (res && res.ok) {
            showFeedback('success', 'Obrigado! Recebemos sua inscrição e entraremos em contato em breve.');
            form.reset();
            form.classList.remove('was-validated');
          } else {
            throw new Error('Resposta inesperada do CRM');
          }
        })
        .catch(function (err) {
          console.error(err);
          showFeedback('danger', 'Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.');
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = btnLabel;
        });
    });
  }

  /* ---- Carrossel de depoimentos: duplica os cards p/ loop contínuo ---- */
  var track = document.querySelector('.testimonials-track');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (track && !reduceMotion) {
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
})();
