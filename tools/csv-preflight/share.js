/* All share formats use this allowlisted view. Raw inputs never reach a renderer. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KornilovShare = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const site = 'https://pease163.github.io/digital-products/tools/';

  function baseCard(slug, lang, demo) {
    const ru = lang !== 'en';
    return {
      lang: ru ? 'ru' : 'en', slug, rows: [],
      badge: demo === true ? (ru ? 'Вымышленный пример' : 'Fictional example') :
        (ru ? 'Пользовательский сценарий' : 'User-entered scenario'),
      cta: ru ? 'Открыть бесплатный инструмент' : 'Try the free tool',
      url: site + slug + '/index.html?lang=' + (ru ? 'ru' : 'en') +
        '&utm_source=share_card&utm_medium=referral&utm_campaign=kornilov_tools'
    };
  }

  function extraCard(result, { includeNumbers = false, currency = 'RUB', lang = 'ru', demo = false } = {}) {
    if (!['RUB', 'USD', 'EUR'].includes(currency)) throw Error('Invalid currency');
    const card = baseCard('extra-work', lang, demo), ru = card.lang === 'ru';
    card.title = ru ? 'Ещё одна правка имеет цену' : 'One more revision has a cost';
    card.summary = ru ? 'Числа скрыты владельцем. Оцените допработу перед разговором с клиентом.' :
      'Figures are hidden by the owner. Estimate extra work before discussing it with your client.';
    if (includeNumbers === true) {
      for (const key of ['hours', 'extra', 'current', 'quote']) {
        if (!Number.isFinite(result?.[key]) || result[key] < 0) throw Error('Invalid calculation');
      }
      const number = value => new Intl.NumberFormat(ru ? 'ru-RU' : 'en-US', { maximumFractionDigits: 2 }).format(value);
      card.summary = ru ? 'Оценка на числах сценария.' : 'An estimate based on the scenario figures.';
      card.rows = [
        [ru ? 'Базовые часы' : 'Base hours', number(result.hours)],
        [ru ? 'Дополнительные часы' : 'Extra hours', number(result.extra)],
        [ru ? 'Ставка с допработой' : 'Hourly return with extra work', number(result.current) + ' ' + currency],
        [ru ? 'Предложенная доплата' : 'Proposed additional fee', number(result.quote) + ' ' + currency]
      ];
    }
    card.note = ru ? 'Расчёт не означает согласование, оплату или прибыль.' :
      'A calculation is not approval, payment or profit.';
    return card;
  }

  function preflightCard(report, { includeNumbers = false, lang = 'ru', demo = false } = {}) {
    if (!report || typeof report.structureValid !== 'boolean') throw Error('A report is required');
    const card = baseCard('csv-preflight', lang, demo), ru = card.lang === 'ru';
    const keys = ['records', 'duplicateKeys', 'emptyIDs', 'formulaLikeCells'];
    if (report.structureValid && keys.some(key => !Number.isInteger(report.summary?.[key]) || report.summary[key] < 0)) {
      throw Error('Invalid count');
    }
    const issues = report.structureValid && keys.slice(1).some(key => report.summary[key] > 0);
    card.title = ru ? 'CSV: проверка перед импортом' : 'CSV: pre-import check';
    card.summary = !report.structureValid ? (ru ? 'Структура требует проверки.' : 'Structure needs review.') :
      issues ? (ru ? 'Структура корректна, найдены предупреждения.' : 'Structure is valid; warnings were found.') :
        (ru ? 'По выбранным проверкам предупреждений не найдено.' : 'No warnings found in the selected checks.');
    if (includeNumbers === true && report.structureValid) {
      const labels = ru ? ['Записей', 'Повторяющихся ID', 'Пустых ID', 'Ячеек, похожих на формулы'] :
        ['Records', 'Duplicate IDs', 'Empty IDs', 'Formula-like cells'];
      card.rows = keys.map((key, index) => [labels[index], String(report.summary[key])]);
    } else {
      card.summary += ' ' + (ru ? 'Количество записей и находок скрыто.' : 'Record and finding counts are hidden.');
    }
    card.note = ru ? 'Без имён файлов, заголовков, ID, значений ячеек и координат. Файл не исправлялся.' :
      'No file names, headers, IDs, cell values or coordinates. The file was not modified.';
    return card;
  }

  function html(card) {
    const esc = escapeHTML;
    return '<!doctype html><html lang="' + card.lang + '"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer">' +
      '<meta http-equiv="Content-Security-Policy" content="default-src &apos;none&apos;; style-src &apos;unsafe-inline&apos;; base-uri &apos;none&apos;">' +
      '<title>' + esc(card.title) + '</title><style>body{margin:0;background:#f4f4ef;color:#18212f;font:18px/1.6 system-ui,sans-serif}' +
      'main{max-width:660px;margin:40px auto;padding:32px;background:white;border:1px solid #dce1e7;border-radius:20px}' +
      'h1{line-height:1.15;font-size:34px}a{color:#af3427}li{margin:8px 0}small{color:#566272}' +
      '@media(max-width:700px){main{margin:16px;padding:24px}}@media print{main{border:0}}</style></head><body><main>' +
      '<small>Kornilov Tools · ' + esc(card.badge) + '</small><h1>' + esc(card.title) + '</h1><p>' + esc(card.summary) + '</p>' +
      (card.rows.length ? '<ul>' + card.rows.map(([label, value]) => '<li>' + esc(label) + ': <strong>' + esc(value) + '</strong></li>').join('') + '</ul>' : '') +
      '<p>' + esc(card.note) + '</p><p><a href="' + esc(card.url) + '">' + esc(card.cta) + '</a></p></main></body></html>';
  }

  function plainText(card) {
    return ['Kornilov Tools · ' + card.badge, card.title, '', card.summary,
      ...card.rows.map(([label, value]) => label + ': ' + value), '', card.note, '', card.cta + ':', card.url].join('\n');
  }

  // Uses system fonts and local canvas primitives only; there is no image or font fetch.
  function png(card) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    const context = canvas.getContext('2d');
    if (!context || typeof canvas.toBlob !== 'function') return Promise.reject(Error('Canvas PNG is unavailable'));
    const blocks = [], left = 84, width = 912;
    let cursor = 82;
    const font = (size, weight) => weight + ' ' + size + 'px system-ui, -apple-system, "Segoe UI", sans-serif';
    function wrap(value, available) {
      const lines = [];
      let line = '';
      for (const word of String(value).split(/\s+/)) {
        const candidate = line ? line + ' ' + word : word;
        if (context.measureText(candidate).width <= available) { line = candidate; continue; }
        if (line) { lines.push(line); line = ''; }
        for (const letter of word) {
          if (line && context.measureText(line + letter).width > available) { lines.push(line); line = ''; }
          line += letter;
        }
      }
      if (line) lines.push(line);
      return lines;
    }
    function text(value, size, weight, color, gap = 22) {
      context.font = font(size, weight);
      const lines = wrap(value, width), lineHeight = Math.ceil(size * 1.32);
      blocks.push({ type: 'text', lines, y: cursor, size, weight, color, lineHeight });
      cursor += lines.length * lineHeight + gap;
    }
    text('KORNILOV TOOLS', 23, 700, '#af3427', 28);
    text(card.badge, 25, 500, '#566272', 22);
    text(card.title, 56, 750, '#18212f', 28);
    text(card.summary, 30, 400, '#566272', 30);
    for (const [label, value] of card.rows) {
      blocks.push({ type: 'line', y: cursor }); cursor += 18;
      text(label, 25, 500, '#566272', 4);
      text(value, 36, 700, '#18212f', 22);
    }
    text(card.note, 25, 400, '#566272', 28);
    blocks.push({ type: 'line', y: cursor }); cursor += 26;
    text(card.cta, 28, 700, '#af3427', 12);
    text(card.url, 22, 400, '#18212f', 18);
    text(card.lang === 'ru' ? 'Адрес на изображении: откройте его в браузере.' : 'This is an image: open the address in your browser.', 21, 400, '#566272', 0);
    canvas.height = Math.ceil(cursor + 82);
    context.fillStyle = '#f4f4ef'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff'; context.fillRect(36, 36, canvas.width - 72, canvas.height - 72);
    context.fillStyle = '#af3427'; context.fillRect(36, 36, canvas.width - 72, 7);
    context.textBaseline = 'top';
    for (const block of blocks) {
      if (block.type === 'line') {
        context.fillStyle = '#dce1e7'; context.fillRect(left, block.y, width, 1); continue;
      }
      context.font = font(block.size, block.weight); context.fillStyle = block.color;
      block.lines.forEach((line, index) => context.fillText(line, left, block.y + index * block.lineHeight));
    }
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob && blob.type === 'image/png' ? resolve(blob) : reject(Error('PNG encoding failed')), 'image/png');
    });
  }

  function download(blob, filename) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = filename; document.body.append(link);
    try { link.click(); } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000); }
  }

  // All three buttons read the same checkbox at the moment the user requests a share.
  function mountControls(container, { kind, lang = 'ru', getData, getOptions = () => ({}) }) {
    if (!['extra-work', 'csv-preflight'].includes(kind)) throw Error('Unknown share tool');
    const ru = lang !== 'en', csv = kind === 'csv-preflight';
    const words = ru ? {
      title: 'Поделиться результатом', choice: csv ? 'Включить счётчики во все форматы' : 'Включить числа во все форматы',
      privacy: csv ? 'По умолчанию счётчики скрыты. Имена файлов, заголовки, ID, значения и координаты никогда не включаются.' :
        'По умолчанию числа скрыты. Имена клиентов и проектов не включаются.',
      formats: 'PNG скачивается как изображение. Для пересылки ссылки на бесплатный инструмент используйте текст или HTML.',
      text: 'Копировать текст', png: 'Скачать PNG', html: 'Скачать HTML',
      busy: 'Готовим результат…', copied: 'Текст скопирован. Вставьте его в нужное сообщение.',
      manual: 'Буфер обмена недоступен. Текст ниже выделен: скопируйте его вручную через меню или Ctrl/Cmd+C.',
      field: 'Текст для ручного копирования', error: 'Не удалось подготовить результат. Повторите действие или выберите другой формат.',
      downloaded: format => 'Скачивание ' + format + ' начато. Проверьте файл в загрузках.',
      unavailable: 'При ошибке структуры счётчики недоступны.'
    } : {
      title: 'Share the result', choice: csv ? 'Include counts in all formats' : 'Include figures in all formats',
      privacy: csv ? 'Counts are hidden by default. File names, headers, IDs, values and coordinates are never included.' :
        'Figures are hidden by default. Client and project names are not included.',
      formats: 'PNG downloads an image. Use text or HTML to share the link to the free tool.',
      text: 'Copy text', png: 'Download PNG', html: 'Download HTML',
      busy: 'Preparing the result…', copied: 'Text copied. Paste it into your message.',
      manual: 'Clipboard is unavailable. The text below is selected: copy it using the menu or Ctrl/Cmd+C.',
      field: 'Text for manual copying', error: 'Could not prepare the result. Try again or choose another format.',
      downloaded: format => format + ' download started. Check your downloads.',
      unavailable: 'Counts are unavailable when the structure is invalid.'
    };
    const make = (tag, text, className) => {
      const element = document.createElement(tag);
      if (text) element.textContent = text;
      if (className) element.className = className;
      return element;
    };
    container.replaceChildren(); container.className = 'share-panel';
    const fieldset = make('fieldset'), legend = make('legend', words.title);
    const label = make('label', null, 'share-choice'), choice = make('input');
    choice.type = 'checkbox'; choice.id = csv ? 'share-counts' : 'share-numbers'; choice.checked = false;
    label.append(choice, make('span', words.choice));
    const privacy = make('p', words.privacy, 'share-help'); privacy.id = 'share-privacy';
    choice.setAttribute('aria-describedby', privacy.id);
    if (csv && !getData()?.structureValid) { choice.disabled = true; privacy.textContent += ' ' + words.unavailable; }
    const actions = make('div', null, 'share-actions'), buttons = {};
    for (const format of ['text', 'png', 'html']) {
      const button = make('button', words[format], 'secondary');
      button.type = 'button'; button.id = 'share-' + format;
      button.addEventListener('click', () => perform(format)); actions.append(button); buttons[format] = button;
    }
    const status = make('p', '', 'share-status'); status.id = 'share-status';
    status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.tabIndex = -1;
    const fallback = make('div', null, 'share-fallback'); fallback.hidden = true;
    const fallbackLabel = make('label', words.field), output = make('textarea');
    fallbackLabel.htmlFor = 'share-copy-text'; output.id = 'share-copy-text'; output.readOnly = true;
    output.rows = 9; output.spellcheck = false; output.setAttribute('aria-describedby', status.id);
    fallback.append(fallbackLabel, output);
    fieldset.append(legend, label, privacy, actions, make('p', words.formats, 'share-help'), status, fallback);
    container.append(fieldset);
    let request = 0;
    function busy(value) { Object.values(buttons).forEach(button => { button.disabled = value; }); }
    function clearOutput() { fallback.hidden = true; output.value = ''; status.textContent = ''; status.classList.remove('share-error'); }
    choice.addEventListener('change', () => { request++; clearOutput(); busy(false); });
    async function perform(format) {
      const current = ++request, live = () => current === request && status.isConnected;
      clearOutput(); busy(true); status.textContent = words.busy;
      try {
        const options = { ...getOptions(), lang, includeNumbers: choice.checked };
        const card = csv ? preflightCard(getData(), options) : extraCard(getData(), options);
        if (format === 'text') {
          const value = plainText(card);
          try {
            if (!globalThis.navigator?.clipboard?.writeText) throw Error('Clipboard is unavailable');
            await globalThis.navigator.clipboard.writeText(value);
            if (live()) status.textContent = words.copied;
          } catch {
            if (live()) {
              output.value = value; fallback.hidden = false; status.textContent = words.manual;
              output.focus(); output.select();
            }
          }
        } else {
          const blob = format === 'png' ? await png(card) : new Blob([html(card)], { type: 'text/html;charset=utf-8' });
          if (live()) {
            download(blob, kind + '-share.' + format);
            status.textContent = words.downloaded(format.toUpperCase());
          }
        }
      } catch {
        if (live()) { status.textContent = words.error; status.classList.add('share-error'); status.focus(); }
      } finally { if (live()) busy(false); }
    }
  }

  return {
    extra: (result, options) => html(extraCard(result, options)),
    preflight: (report, options) => html(preflightCard(report, options)),
    extraText: (result, options) => plainText(extraCard(result, options)),
    preflightText: (report, options) => plainText(preflightCard(report, options)),
    extraPNG: (result, options) => png(extraCard(result, options)),
    preflightPNG: (report, options) => png(preflightCard(report, options)),
    mountControls
  };
});
