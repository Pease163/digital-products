'use strict';
(() => {
  const product = document.body.dataset.page;
  let activated = false;
  function labels() {
    const english = document.documentElement.lang === 'en';
    const home = document.querySelector('[data-kt-home]');
    const privacy = document.querySelector('[data-kt-privacy]');
    const local = document.querySelector('[data-kt-local]');
    if (home) home.href = english ? '../../en/index.html' : '../../index.html';
    if (privacy) { privacy.href = english ? '../../en/privacy.html' : '../../privacy.html'; privacy.textContent = english ? 'Data and privacy' : 'Данные и конфиденциальность'; }
    if (local) local.textContent = english ? 'Files and calculations are processed in your browser.' : 'Файлы и расчёты обрабатываются в вашем браузере.';
  }
  labels();
  new MutationObserver(labels).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  function markResult() {
    if (activated) return;
    const ready = product === 'extra-work'
      ? !document.getElementById('error')?.textContent && Boolean(document.getElementById('result')?.textContent)
      : document.getElementById('report-section')?.hidden === false && !document.getElementById('export')?.disabled;
    if (ready) {activated=true;window.KornilovAnalytics?.track('result_ready',{product,placement:'tool'});}
  }
  document.addEventListener('change', () => setTimeout(markResult, 0));
  document.addEventListener('click', event => {
    const target = event.target;
    if (target.closest?.('#demo,#example')) setTimeout(markResult,0);
    if (target.closest?.('#share-card button,#result > button')) window.KornilovAnalytics?.track('share_click',{product,placement:'result'});
    if (target.closest?.('#export')) window.KornilovAnalytics?.track('download_click',{product,placement:'result'});
    const link=target.closest?.('a[href]');
    if (link && /\/products\/(scope-change|csv-reconcile)\.html/.test(link.href)) {
      const destination=link.href.includes('scope-change')?'scope-change':'csv-reconcile';
      window.KornilovAnalytics?.track('product_open',{product:destination,placement:'tool'});
    }
  });
})();
