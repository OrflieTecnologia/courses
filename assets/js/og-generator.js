/* ============================================================
   Gerador da og:image (1200x630) da Orflie.
   Abra og-generator.html, clique em "Baixar PNG" e salve como
   og-image.png dentro de assets/images/.
   ============================================================ */
(function () {
  'use strict';

  function roundRect(x, rx, ry, w, h, r) {
    x.beginPath();
    x.moveTo(rx + r, ry);
    x.arcTo(rx + w, ry, rx + w, ry + h, r);
    x.arcTo(rx + w, ry + h, rx, ry + h, r);
    x.arcTo(rx, ry + h, rx, ry, r);
    x.arcTo(rx, ry, rx + w, ry, r);
    x.closePath();
  }

  async function draw() {
    var canvas = document.getElementById('og');
    var x = canvas.getContext('2d');

    // fundo grafite
    var g = x.createLinearGradient(0, 0, 1200, 630);
    g.addColorStop(0, '#383E42');
    g.addColorStop(1, '#2a2f33');
    x.fillStyle = g;
    x.fillRect(0, 0, 1200, 630);

    // brilho laranja
    var rg = x.createRadialGradient(1060, 60, 40, 1060, 60, 700);
    rg.addColorStop(0, 'rgba(248,89,22,0.38)');
    rg.addColorStop(1, 'rgba(248,89,22,0)');
    x.fillStyle = rg;
    x.fillRect(0, 0, 1200, 630);

    // garante fontes carregadas
    try {
      await document.fonts.load('800 64px Poppins');
      await document.fonts.load('500 30px Inter');
      await document.fonts.load('700 22px Poppins');
      await document.fonts.ready;
    } catch (e) {}

    // logo (versao branca)
    var logo = new Image();
    logo.src = 'assets/images/orflie-dark.png';
    try { await logo.decode(); } catch (e) {}
    var lh = 66, lw = logo.width * (lh / logo.height);
    x.drawImage(logo, 80, 66, lw, lh);

    // badge
    x.font = '700 22px Poppins, sans-serif';
    var bt = 'SALES OUTSOURCING';
    var bw = x.measureText(bt).width;
    x.fillStyle = '#F85916';
    roundRect(x, 80, 188, bw + 48, 46, 23);
    x.fill();
    x.fillStyle = '#fff';
    x.textBaseline = 'middle';
    x.fillText(bt, 104, 212);

    // headline
    x.textBaseline = 'alphabetic';
    x.font = '800 64px Poppins, sans-serif';
    x.fillStyle = '#fff';
    x.fillText('Torne-se um profissional', 80, 340);
    x.fillText('de vendas ', 80, 418);
    var w1 = x.measureText('de vendas ').width;
    x.fillStyle = '#F85916';
    x.fillText('imparável', 80 + w1, 418);

    // barra de destaque
    x.fillStyle = '#F85916';
    x.fillRect(80, 452, 96, 6);

    // subtitulo
    x.font = '500 30px Inter, sans-serif';
    x.fillStyle = '#B0B0B0';
    x.fillText('Cursos de SDR e Closer  •  Metodologia prática de vendas', 80, 520);
  }

  function download() {
    var canvas = document.getElementById('og');
    var a = document.createElement('a');
    a.download = 'og-image.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }

  document.addEventListener('DOMContentLoaded', function () {
    draw();
    document.getElementById('baixar').addEventListener('click', download);
  });
})();
