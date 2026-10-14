'use strict';
(() => {
  const allowedEvents = new Set(['page_view','product_open','demo_open','demo_calculate','free_tool_open','checkout_click','download_click','share_click','result_ready']);
  const allowedProducts = new Set(['catalog','extra-work','scope-change','csv-preflight','csv-reconcile','interview-proof','portfolio-case','launch-control','support','privacy']);
  const allowedPlacements = new Set(['page','hero','hero_demo','catalog','home_examples','closing','product_hero','product_details','purchase_panel','example','tool','result','footer','unknown']);
  const config = window.KORNILOV_ANALYTICS_CONFIG || {};
  const diagnostics = new URLSearchParams(location.search).get('diagnostics') === '1';
  const production = location.origin === 'https://pease163.github.io' && location.pathname.startsWith('/digital-products/');
  let endpoint = '';
  if (production && !diagnostics && config.enabled === true && typeof config.endpoint === 'string' && config.endpoint) {
    try {
      const url = new URL(config.endpoint);
      if (url.origin === 'https://kornilov-tools-analytics.sasilinesas.chatgpt.site' && url.pathname === '/api/events' && !url.username && !url.password && !url.search && !url.hash) endpoint = url.href;
    } catch { /* Leave collection disabled. */ }
  }
  // No cookie, persistent browser identifier, localStorage, full URL, referrer,
  // UTM passthrough, text, file name, calculation values or file contents.
  const events = [];
  function track(name, metadata = {}) {
    if (!allowedEvents.has(name)) return false;
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) metadata = {};
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
  if (diagnostics) {
    const panel = document.createElement('aside');
    panel.className = 'diagnostics-panel';
    const explanation = document.createElement('p');
    explanation.textContent = document.documentElement.lang === 'en'
      ? 'Owner diagnostics: network collection is disabled. Events stay in this tab; internal storefront links preserve diagnostics mode. These are not visitor totals or sales. Reloading clears this log.'
      : 'Диагностика владельца: отправка событий отключена. Журнал остаётся в этой вкладке; внутренние ссылки витрины сохраняют режим диагностики. Это не общая посещаемость и не продажи. Перезагрузка очищает журнал.';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button secondary';
    button.textContent = document.documentElement.lang === 'en' ? 'Export local events' : 'Скачать локальные события';
    button.addEventListener('click', exportEvents);
    panel.append(explanation, button);
    document.body.append(panel);
  }
  document.addEventListener('click', event => {
    if (diagnostics) {
      const navigation = event.target.closest?.('a[href]');
      if (navigation && !navigation.getAttribute('href').startsWith('#')) {
        try {
          const url = new URL(navigation.href);
          if (url.origin === 'https://pease163.github.io' && url.pathname.startsWith('/digital-products/')) {
            url.searchParams.set('diagnostics', '1');
            navigation.href = url.href;
          }
        } catch { /* Leave non-navigation links unchanged. */ }
      }
    }
    const link = event.target.closest?.('[data-kt-event]');
    if (link) track(link.dataset.ktEvent, {product:link.dataset.ktProduct, placement:link.dataset.ktPlacement});
  }, true);
  const page = (document.body.dataset.page || 'catalog').replace(/-example$/, '');
  track('page_view', {product:page, placement:'page'});
  const notice = document.getElementById('analytics-disclosure');
  if (notice) notice.textContent = document.documentElement.lang === 'en'
    ? (endpoint
      ? 'The storefront and its online Extra Work and CSV Preflight tools send only a schema version, action name, product name, button placement and language to the event receiver. The service stores aggregate counts by UTC day. The analytics code does not create cookies or persistent browser identifiers and sends no URLs, referrers, UTM parameters, case text, file names, file contents or calculation values. Network infrastructure may process connection metadata.'
      : 'Network collection is disabled on this page in diagnostics mode or outside the production storefront. Action names remain only in this tab’s memory; reloading clears the log. Case text, file names, file contents and calculation values are not included.')
    : (endpoint
      ? 'Витрина и её онлайн-инструменты Extra Work и CSV Preflight отправляют приёмнику только версию схемы, имя действия, инструмент, место кнопки и язык. Сервис хранит суммарные счётчики по дням UTC. Код аналитики не создаёт cookies и постоянные идентификаторы браузера; не отправляет URL, referrer, UTM, тексты кейсов, имена и содержимое файлов, значения расчётов. Сетевая инфраструктура может обрабатывать данные соединения.'
      : 'В режиме диагностики или вне публичной витрины отправка событий на этой странице отключена. Имена действий остаются только в памяти текущей вкладки; перезагрузка очищает журнал. Тексты кейсов, имена и содержимое файлов, значения расчётов в события не включаются.');
})();
