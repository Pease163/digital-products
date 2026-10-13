'use strict';
(() => {
  const language = document.documentElement.lang === 'en' ? 'en' : 'ru';
  const slider = document.getElementById('extra-hours');
  if (slider) {
    const hours = document.getElementById('hours-value');
    const result = document.getElementById('hourly-result');
    const render = () => {
      const extra = Number(slider.value);
      const rate = Math.round(12000 / (12 + extra));
      hours.textContent = String(extra);
      result.replaceChildren(document.createTextNode(new Intl.NumberFormat(language).format(rate) + ' '));
      const unit = document.createElement('small');
      unit.textContent = language === 'ru' ? '₽/ч' : 'RUB/h';
      result.append(unit);
      slider.setAttribute('aria-valuetext', extra + (language === 'ru' ? ' дополнительных часов' : ' extra hours'));
    };
    slider.addEventListener('input', render);
    slider.addEventListener('change', () => window.KornilovAnalytics?.track('demo_calculate', {product: 'extra-work', placement: 'hero'}));
    render();
  }
  document.querySelectorAll('[data-screenshot]').forEach(figure => {
    const img = figure.querySelector('img');
    img.addEventListener('load', () => { figure.hidden = false; });
    img.src = figure.dataset.screenshot;
  });
})();
