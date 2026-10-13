'use strict';
(() => {
  const allowedEvents = new Set(['page_view','product_open','demo_open','demo_calculate','free_tool_open','checkout_click','download_click','share_click','result_ready']);
  const allowedProducts = new Set(['catalog','extra-work','scope-change','csv-preflight','csv-reconcile','interview-proof','portfolio-case','launch-control','support','privacy']);
  const allowedPlacements = new Set(['page','hero','hero_demo','catalog','home_examples','closing','product_hero','product_details','purchase_panel','example','tool','result','footer','unknown']);
  const config = window.KORNILOV_ANALYTICS_CONFIG || {};
  let endpoint = '';
  if (config.enabled === true && typeof config.endpoint === 'string' && config.endpoint) {
    try { const url = new URL(config.endpoint, window.location.href); if (url.protocol === 'https:') endpoint = url.href; } catch { /* Leave collection disabled. */ }
  }
  // No cookie, persistent browser identifier, localStorage, full URL, referrer,
  // UTM passthrough, text, file name, calculation values or file contents.
  const events = [];
  function track(name, metadata = {}) {
    if (!allowedEvents.has(name)) return false;
    const product = allowedProducts.has(metadata.product) ? metadata.product : 'catalog';
    const placement = allowedPlacements.has(metadata.placement) ? metadata.placement : 'unknown';
    const payload = Object.freeze({ schema: 1, event: name, product, placement, language: document.documentElement.lang === 'en' ? 'en' : 'ru', timestamp: new Date().toISOString() });
    events.push(payload);
    if (events.length > 100) events.shift();
    if (endpoint) {
      const networkPayload = { schema:payload.schema, event:payload.event, product:payload.product, placement:payload.placement, language:payload.language };
      fetch(endpoint, { method:'POST', mode:'cors', credentials:'omit', referrerPolicy:'no-referrer', headers:{'Content-Type':'application/json'}, body:JSON.stringify(networkPayload), keepalive:true }).catch(() => {});
    }
    return true;
  }
  function exportEvents() {
    const report = { scope: 'current page in this tab only; not central analytics or sales', collectionEnabled: Boolean(endpoint), events: events.slice() };
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], {type: 'application/json;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kornilov-tools-local-events.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return report;
  }
  window.KornilovAnalytics = Object.freeze({ track, getEvents: () => events.slice(), exportEvents, collectionEnabled: Boolean(endpoint) });
  if (new URLSearchParams(location.search).get('diagnostics') === '1') {
    const panel = document.createElement('aside');
    panel.className = 'diagnostics-panel';
    const explanation = document.createElement('p');
    explanation.textContent = document.documentElement.lang === 'en'
      ? 'Owner diagnostics: events from this page in this tab only. Not visitor totals or sales. Reloading clears this log.'
      : 'Диагностика владельца: события этого экрана в текущей вкладке. Это не общая посещаемость и не продажи. Перезагрузка очищает журнал.';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button secondary';
    button.textContent = document.documentElement.lang === 'en' ? 'Export local events' : 'Скачать локальные события';
    button.addEventListener('click', exportEvents);
    panel.append(explanation, button);
    document.body.append(panel);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('[data-kt-event]');
    if (link) track(link.dataset.ktEvent, {product:link.dataset.ktProduct, placement:link.dataset.ktPlacement});
  });
  const page = (document.body.dataset.page || 'catalog').replace(/-example$/, '');
  track('page_view', {product:page, placement:'page'});
  if (endpoint) {
    const notice = document.getElementById('analytics-disclosure');
    if (notice) notice.textContent = document.documentElement.lang === 'en'
      ? 'This site sends only action names, product names, link placement, language and time to the configured event service. No persistent browser identifier, file names, file contents or calculation values are included. Network infrastructure may process connection metadata.'
      : 'Сайт отправляет в настроенный сервис только имена действий, инструментов, мест перехода, язык и время. Постоянный идентификатор браузера, имена и содержимое файлов, значения расчётов не включаются. Сетевая инфраструктура может обрабатывать данные соединения.';
  }
})();
