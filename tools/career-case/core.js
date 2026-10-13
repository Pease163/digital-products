(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.KornilovOneCase = api;
})(typeof globalThis === 'undefined' ? this : globalThis, function () {
  'use strict';
  const FORMAT = 'kornilov-one-technical-case';
  const VERSION = 1;
  const STORAGE_KEY = 'kornilov-tools:one-case:work:v1';
  // Covers the maximum JSON-escaped size of every bounded text field.
  const MAX_BYTES = 256 * 1024;
  const FIELDS = {
    title: 160, summary: 350, stack: 250, context: 4000,
    contribution: 4000, decision: 4000, tradeoff: 4000,
    result: 4000, evidence: 4000, limits: 4000, lesson: 1500, evidenceUrl: 2048
  };
  const REQUIRED = ['title', 'context', 'contribution', 'decision', 'tradeoff', 'result', 'evidence', 'limits'];
  const SECTIONS = ['context', 'contribution', 'decision', 'tradeoff', 'result', 'evidence', 'limits', 'lesson'];
  const LABELS = {
    ru: {
      case: 'Технический кейс', context: 'Проблема и контекст', contribution: 'Мой личный вклад',
      decision: 'Техническое решение', tradeoff: 'Альтернатива и компромисс', result: 'Наблюдаемый результат',
      evidence: 'Чем подтверждён результат', limits: 'Границы результата', lesson: 'Что изменю в следующий раз',
      title: 'Название кейса', summary: 'Короткое описание', stack: 'Технологии и инструменты',
      evidenceUrl: 'Публичное подтверждение', emptyTitle: 'Ваш технический кейс', empty: 'Раздел ещё не заполнен.',
      fictional: 'Вымышленный пример: проект, действия и результат придуманы для демонстрации структуры. Это не личный опыт пользователя.',
      credit: 'Подготовлено с Kornilov Tools', skip: 'К содержимому', backup: 'Резервная копия одного кейса'
    },
    en: {
      case: 'Technical case study', context: 'Problem and context', contribution: 'My personal contribution',
      decision: 'Technical decision', tradeoff: 'Alternative and trade-off', result: 'Observed result',
      evidence: 'Evidence behind the result', limits: 'Limits of the result', lesson: 'What I would change next time',
      title: 'Case title', summary: 'Short summary', stack: 'Tools and technologies',
      evidenceUrl: 'Public evidence', emptyTitle: 'Your technical case study', empty: 'This section is not filled yet.',
      fictional: 'Fictional example: the project, actions and result are invented to show the structure. This is not the user’s personal experience.',
      credit: 'Prepared with Kornilov Tools', skip: 'Skip to content', backup: 'One-case backup'
    }
  };

  function createID() {
    let token;
    try {
      const bytes = new Uint8Array(12);
      globalThis.crypto.getRandomValues(bytes);
      token = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (_) {
      // Identity for local merging, not a security token.
      token = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 14);
    }
    return 'kt-one-case-' + token;
  }

  function createEmpty(language = 'ru', id = createID()) {
    return { format: FORMAT, version: VERSION, id, language: language === 'en' ? 'en' : 'ru', branding: false,
      fictional: false, fields: Object.fromEntries(Object.keys(FIELDS).map(key => [key, ''])) };
  }

  function createExample(language = 'ru') {
    const state = createEmpty(language, 'kt-one-case-example-upload');
    state.fictional = true;
    state.fields = language === 'en' ? {
      title: 'Fictional example · A recoverable upload form',
      summary: 'A small training project about keeping user input after an interrupted upload.',
      stack: 'JavaScript, HTML, CSS',
      context: 'In a fictional training project, an interrupted upload cleared the form. A user had to type the description again before retrying.',
      contribution: 'I owned the form state and error message in this fictional example. A teammate owned the upload service. I did not implement the server or the whole product.',
      decision: 'I separated editing, pending, success and error states. While a request was pending, the submit button was disabled. On failure, the description stayed in the form and a retry became available.',
      tradeoff: 'I considered retrying automatically but chose an explicit retry so the user could decide when to submit again. This needs an extra click and does not provide server-side deduplication.',
      result: 'In the fictional local exercise, the interrupted-request scenario preserved the description and allowed a retry. No production usage or business result was measured.',
      evidence: 'Illustrative evidence would be a small code diff and a recording of the error/retry scenario. This fictional example has no real repository, test report or recording.',
      limits: 'The exercise covers one interface scenario. It does not establish reliable uploads on every device or network, lower support costs, or better conversion.',
      lesson: 'Agree the boundary between interface recovery and server protection before starting the next implementation.',
      evidenceUrl: ''
    } : {
      title: 'Вымышленный пример · Форма с восстановлением',
      summary: 'Небольшой учебный проект: сохранение ввода после прерванной загрузки.',
      stack: 'JavaScript, HTML, CSS',
      context: 'В вымышленном учебном проекте прерванная загрузка очищала форму. Перед повторной попыткой пользователь заново вводил описание.',
      contribution: 'В этом вымышленном примере я отвечал за состояние формы и сообщение об ошибке. Сервис загрузки делал другой участник. Я не разрабатывал сервер или весь продукт.',
      decision: 'Разделил состояния на редактирование, ожидание, успех и ошибку. Во время запроса отключил повторную отправку. При ошибке описание оставалось в форме, а повторная попытка становилась доступной.',
      tradeoff: 'Рассмотрел автоматический повтор, но выбрал явную кнопку: пользователь сам решает, когда отправить данные снова. Это требует дополнительного клика и не обеспечивает защиту сервера от дубликатов.',
      result: 'В вымышленном локальном упражнении сценарий прерванного запроса сохранял описание и разрешал повторную попытку. Реальное использование и бизнес-результат не измерялись.',
      evidence: 'Примером подтверждения могли бы стать небольшой diff кода и запись сценария ошибки/повтора. У этого вымышленного примера нет настоящего репозитория, отчёта проверки или видеозаписи.',
      limits: 'Упражнение охватывает один сценарий интерфейса. Оно не доказывает надёжность загрузки на любых устройствах и сетях, снижение нагрузки поддержки или рост конверсии.',
      lesson: 'До следующей реализации согласовать границу между восстановлением интерфейса и защитой сервера.',
      evidenceUrl: ''
    };
    return state;
  }

  function validate(value, { allowFictional = false } = {}) {
    const fail = () => { throw new Error('INVALID_CASE'); };
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        Object.getPrototypeOf(value) !== Object.prototype) fail();
    const keys = ['format', 'version', 'id', 'language', 'branding', 'fictional', 'fields'];
    if (Object.keys(value).some(key => !keys.includes(key)) || keys.some(key => !(key in value))) fail();
    if (value.format !== FORMAT || value.version !== VERSION || typeof value.id !== 'string' ||
        !/^[A-Za-z0-9_-]{1,80}$/.test(value.id) || !['ru', 'en'].includes(value.language) ||
        typeof value.branding !== 'boolean' || typeof value.fictional !== 'boolean' ||
        (!allowFictional && value.fictional)) fail();
    if (!value.fields || typeof value.fields !== 'object' || Array.isArray(value.fields) ||
        Object.getPrototypeOf(value.fields) !== Object.prototype ||
        Object.keys(value.fields).some(key => !Object.prototype.hasOwnProperty.call(FIELDS, key))) fail();
    const state = createEmpty(value.language, value.id);
    state.branding = value.branding;
    state.fictional = value.fictional;
    for (const [key, limit] of Object.entries(FIELDS)) {
      if (typeof value.fields[key] !== 'string' || value.fields[key].length > limit) fail();
      state.fields[key] = value.fields[key];
    }
    if (new TextEncoder().encode(JSON.stringify(state, null, 2) + '\n').length > MAX_BYTES) throw new Error('CASE_TOO_LARGE');
    return state;
  }

  function serialize(state) {
    return JSON.stringify(validate(state), null, 2) + '\n';
  }

  function parse(raw) {
    if (typeof raw !== 'string' || new TextEncoder().encode(raw).length > MAX_BYTES) throw new Error('CASE_TOO_LARGE');
    return validate(JSON.parse(raw.replace(/^\uFEFF/, '')));
  }

  function safeHttps(value) {
    const text = typeof value === 'string' ? value.trim() : '';
    if (!text || /[\u0000-\u0020\u007f<>]/.test(text)) return '';
    try {
      const url = new URL(text);
      return url.protocol === 'https:' && url.hostname && !url.username && !url.password ? url.href : '';
    } catch (_) { return ''; }
  }

  function problems(state) {
    const issues = REQUIRED.filter(key => !state.fields[key].trim()).map(key => ({ key, type: 'required' }));
    if (state.fields.evidenceUrl.trim() && !safeHttps(state.fields.evidenceUrl)) issues.push({ key: 'evidenceUrl', type: 'url' });
    return issues;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function escapeMarkdown(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/[\\`*_\[\]#|]/g, '\\$&');
  }

  function renderCase(state, { preview = false } = {}) {
    const data = validate(state, { allowFictional: true });
    const t = LABELS[data.language];
    const f = data.fields;
    const titleTag = preview ? 'h3' : 'h1', sectionTag = preview ? 'h4' : 'h2';
    const section = key => f[key].trim() || preview ?
      '<section class="case-section' + (!f[key].trim() ? ' is-empty' : '') + '"><' + sectionTag + '>' + t[key] +
      '</' + sectionTag + '><p>' + escapeHTML(f[key].trim() || t.empty) + '</p></section>' : '';
    const url = safeHttps(f.evidenceUrl);
    return '<article class="case-document"><header class="case-head"><p class="case-kind">' + t.case +
      '</p><' + titleTag + '>' + escapeHTML(f.title.trim() || t.emptyTitle) + '</' + titleTag + '>' +
      (data.fictional ? '<p class="fictional-note">' + t.fictional + '</p>' : '') +
      (f.summary.trim() ? '<p class="case-summary">' + escapeHTML(f.summary.trim()) + '</p>' : '') +
      (f.stack.trim() ? '<p class="case-stack"><span>' + t.stack + '</span> ' + escapeHTML(f.stack.trim()) + '</p>' : '') +
      '</header><div class="case-content">' + SECTIONS.map(section).join('') +
      (url ? '<p class="case-link"><a href="' + escapeHTML(url) + '" target="_blank" rel="noopener noreferrer">' + t.evidenceUrl + '</a></p>' : '') +
      '</div>' + (data.branding ? '<footer class="case-credit"><a href="https://pease163.github.io/digital-products/' +
        (data.language === 'en' ? 'en/' : '') + '" target="_blank" rel="noopener noreferrer">' + t.credit + '</a></footer>' : '') + '</article>';
  }

  function assertReady(state) {
    const data = validate(state, { allowFictional: true });
    if (problems(data).length) throw new Error('CASE_INCOMPLETE');
    return data;
  }

  function exportMarkdown(state) {
    const data = assertReady(state);
    const t = LABELS[data.language];
    const f = data.fields;
    const lines = ['# ' + escapeMarkdown(f.title.trim()), ''];
    if (data.fictional) lines.push('> ' + t.fictional, '');
    if (f.summary.trim()) lines.push(escapeMarkdown(f.summary.trim()), '');
    if (f.stack.trim()) lines.push('**' + t.stack + ':** ' + escapeMarkdown(f.stack.trim()), '');
    for (const key of SECTIONS) if (f[key].trim()) lines.push('## ' + t[key], '', escapeMarkdown(f[key].trim()), '');
    const url = safeHttps(f.evidenceUrl);
    if (url) lines.push('[' + t.evidenceUrl + '](' + url.replace(/[()]/g, c => c === '(' ? '%28' : '%29') + ')', '');
    if (data.branding) lines.push('---', '', '[' + t.credit + '](https://pease163.github.io/digital-products/' +
      (data.language === 'en' ? 'en/' : '') + ')', '');
    return lines.join('\n');
  }

  function exportCareerLibrary(state) {
    const data = assertReady(state);
    // The shared paid-product schema is data-only. No paid runtime is copied.
    const fields = ['title', 'summary', 'context', 'contribution', 'decision', 'tradeoff',
      'result', 'evidence', 'limits', 'lesson', 'stack', 'repoUrl', 'demoUrl', 'evidenceUrl'];
    const entry = { id: data.id, fictional: data.fictional };
    for (const key of fields) entry[key] = data.fields[key] || '';
    return JSON.stringify({ format: 'kornilov-career-library', version: 1, entries: [entry] }, null, 2) + '\n';
  }

  const DOCUMENT_CSS = `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f4f7fb;color:#344c60;font:17px/1.75 "Avenir Next","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}a{color:#245bd8;text-underline-offset:4px;overflow-wrap:anywhere}a:focus-visible{outline:3px solid #245bd8;outline-offset:5px}.skip{position:absolute;left:16px;top:-80px;background:white;padding:12px}.skip:focus{top:12px}.case-document{max-width:880px;margin:48px auto;background:white;border:1px solid #dce4ed;border-radius:18px;overflow:hidden}.case-head{padding:42px 48px;border-bottom:1px solid #dce4ed}.case-kind{color:#245bd8;font-size:13px;margin:0 0 18px}.case-head :is(h1,h3){font-size:clamp(33px,5.5vw,54px);font-weight:600;line-height:1.15;letter-spacing:-.04em;color:#183044;margin:0;overflow-wrap:anywhere}.case-summary{font-size:20px;margin:22px 0 0;white-space:pre-wrap;overflow-wrap:anywhere}.case-stack{font-size:13px;margin:24px 0 0;overflow-wrap:anywhere}.case-stack span{color:#63778a;display:block;margin-bottom:4px}.fictional-note{background:#fff8e8;border:1px solid #e7d6b6;border-radius:8px;padding:12px 15px;font-size:13px;color:#715519;margin:22px 0}.case-content{padding:14px 48px 40px}.case-section{margin-top:29px}.case-section :is(h2,h4){font-size:17px;font-weight:600;color:#183044;margin:0 0 8px}.case-section p{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}.case-section.is-empty p{color:#63778a;font-size:14px}.case-link{margin:28px 0 0;font-size:14px}.case-credit{font-size:12px;padding:18px 48px;border-top:1px solid #dce4ed}main{padding:0 22px}@media(max-width:600px){body{font-size:16px}main{padding:0 16px}.case-document{margin:22px auto;border-radius:12px}.case-head{padding:28px 24px}.case-summary{font-size:18px}.case-content{padding:0 24px 29px}.case-credit{padding:17px 24px}.case-section{margin-top:25px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}@media print{body{background:white;font-size:11pt}.skip{display:none}main{padding:0}.case-document{max-width:none;margin:0;border:0}.case-head,.case-content,.case-credit{padding-inline:0}.case-head{padding-top:0}.case-head :is(h1,h3){font-size:28pt}.case-section :is(h2,h4){break-after:avoid}.case-section p{orphans:3;widows:3}a{color:#183044}}`;

  function exportHTML(state) {
    const data = assertReady(state);
    const t = LABELS[data.language];
    return '<!doctype html>\n<html lang="' + data.language + '"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="no-referrer">' +
      '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; script-src \'none\'; connect-src \'none\'; img-src \'none\'; object-src \'none\'; base-uri \'none\'; form-action \'none\'">' +
      '<title>' + escapeHTML(data.fields.title.trim()) + '</title><meta name="description" content="' +
      escapeHTML(data.fields.summary.trim().slice(0,250)) + '"><style>' + DOCUMENT_CSS + '</style></head><body>' +
      '<a class="skip" href="#case-main">' + t.skip + '</a><main id="case-main">' + renderCase(data) + '</main></body></html>\n';
  }

  return { FORMAT, VERSION, STORAGE_KEY, MAX_BYTES, FIELDS, REQUIRED, SECTIONS, LABELS,
    createEmpty, createExample, validate, serialize, parse, safeHttps, problems, escapeHTML,
    renderCase, exportMarkdown, exportHTML, exportCareerLibrary, DOCUMENT_CSS };
});
