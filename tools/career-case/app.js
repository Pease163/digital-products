(function () {
  'use strict';
  const C = window.KornilovOneCase;
  const $ = id => document.getElementById(id);
  const TEXT = {
    ru: {
      ...C.LABELS.ru,
      skip: 'К рабочей форме', languageGroup: 'Язык интерфейса',
      eyebrow: 'Бесплатно · один проект · без аккаунта',
      pageTitle: 'Превратите одну задачу в понятный технический кейс.',
      lede: 'Опишите проблему, свой вклад и решение. Отделите наблюдаемый результат от предположений. Получите Markdown для README и готовую HTML-страницу.',
      start: 'Заполнить свой кейс', openExample: 'Посмотреть вымышленный пример', closeExample: 'Вернуться к своему кейсу',
      privacy: 'Текст хранится только в этом браузере. Инструмент не отправляет кейс в сеть. Экспорт и резервная копия остаются у вас.',
      recoveryTitle: 'Сохранённый черновик не удалось прочитать.',
      recoveryText: 'Он не перезаписан. Сначала сохраните исходные данные. Затем можно открыть резервную копию или начать новый кейс.',
      rescueDownload: 'Скачать исходный черновик', rescueReset: 'Сохранить исходник и начать заново',
      yourDraft: 'Ваш локальный черновик', formTitle: 'Один проект. Ваш опыт.',
      formNote: 'Не нужны имя, контакты или данные работодателя. Уберите секреты и чужие персональные данные. Звёздочкой отмечены обязательные поля.',
      helpTitle: 'Назовите конкретную задачу, которую вы решали.',
      helpSummary: 'Необязательно: одна фраза о проекте и вашей части работы.',
      helpStack: 'Необязательно: только то, что вы действительно использовали.',
      chapterContext: 'Задача и ответственность', chapterDecision: 'Решение и выбор', chapterResult: 'Результат и подтверждение',
      helpContext: 'Что не работало, для кого и при каких ограничениях? Учебный или личный проект тоже подходит.',
      helpContribution: 'Что сделали именно вы? Назовите границу своей роли и работу других участников.',
      helpDecision: 'Что изменили и почему это решает исходную проблему? Опишите механизм, а не только название технологии.',
      helpTradeoff: 'Какую альтернативу рассматривали? Что потеряли или усложнили выбранным решением?',
      helpResult: 'Что вы проверили или наблюдали после изменения? Если метрик нет, опишите проверенное поведение без выдуманных процентов.',
      helpEvidence: 'Назовите реальный артефакт и что он показывает: diff, сценарий проверки, запись, обезличенная обратная связь. Если артефакт закрыт, обозначьте это.',
      evidenceUrl: 'Ссылка на публичное подтверждение',
      helpEvidenceUrl: 'Необязательно. Только HTTPS, без логина и пароля в адресе. Проверьте доступ без авторизации и разрешение на публикацию.',
      helpLimits: 'Что не проверяли? На какие устройства, объём данных или условия результат пока нельзя переносить?',
      helpLesson: 'Необязательно: одно конкретное улучшение подхода.',
      urlError: 'Укажите корректную HTTPS-ссылку без логина и пароля.',
      brandCredit: 'Добавить добровольную ссылку Kornilov Tools в экспорт',
      backupDownload: 'Скачать резервную копию', restoreOpen: 'Открыть резервную копию', resetOpen: 'Очистить форму',
      backupNote: 'Автосохранение зависит от браузера и может исчезнуть при очистке данных. JSON-копия нужна для продолжения работы, а не для публикации.',
      fictionalLabel: 'Отдельный вымышленный пример', exampleTitle: 'Посмотрите структуру на одном сценарии.',
      exampleInfo: 'Все действия, подтверждения и результаты здесь придуманы. Ваш черновик сохранён отдельно и не заменяется примером.',
      backToWork: 'Вернуться к своему кейсу',
      exampleNote: 'Можно скачать пример как образец структуры. В каждом экспорте останется явная пометка о вымышленном содержании.',
      livePreview: 'Предпросмотр результата', resultTitle: 'Готовый кейс',
      exportMarkdown: 'Скачать Markdown', exportHtml: 'Скачать HTML-страницу',
      exportCareer: 'Скачать опыт для Portfolio / Interview',
      exportNote: 'HTML — самостоятельный файл без скриптов и внешних ресурсов. Перед отправкой проверьте текст, доказательства и доступ к ссылке.',
      previewRegion: 'Предпросмотр кейса', publishGuide: 'Как опубликовать HTML',
      nextLabel: 'Когда одного кейса мало', nextTitle: 'Продолжите с тем, что уже описали.',
      portfolioNext: 'Соберите несколько кейсов в личный сайт: черновики, изображения, выбор опубликованных работ и темы оформления.',
      portfolioLink: 'Посмотреть Portfolio Case Kit',
      interviewNext: 'Используйте библиотеку своего опыта для нескольких вакансий: отдельные доказательства, ответы и планы подготовки.',
      interviewLink: 'Посмотреть Interview Proof Kit',
      paidNote: 'Это отдельные платные продукты. Бесплатный кейс можно использовать и публиковать без покупки.',
      guideLink: 'Использование и приватность', cancel: 'Отмена', replaceConfirm: 'Сохранить копию и продолжить',
      modalBackup: 'При продолжении сначала скачается резервная копия текущего черновика. Новый черновик будет сохранён локально.',
      saved: 'Сохранено локально', noStorage: 'Без автосохранения', locked: 'Черновик защищён',
      storageWarning: 'Браузер не разрешает локальное сохранение. Работа остаётся на этой странице до её закрытия. Скачивайте JSON-копию, чтобы продолжить позже.',
      readiness: 'Для экспорта заполните:', ready: 'Обязательные разделы заполнены. Проверьте достоверность текста перед отправкой.',
      fixUrl: 'Исправить HTTPS-ссылку', corrupted: 'Исходный черновик не перезаписан. Восстановите JSON-копию или сохраните исходник перед новым кейсом.',
      restoreTitle: 'Открыть другой черновик?', restoreDescription: 'Выбранная JSON-копия заменит один текущий кейс. Импортируются только данные этого бесплатного редактора.',
      resetTitle: 'Начать пустой кейс?', resetDescription: 'Текущая форма будет очищена. Сначала сохранится её резервная копия.',
      parseError: 'Не удалось открыть файл. Нужна JSON-копия этого редактора размером до 256 КиБ. Файлы Portfolio/Interview и вымышленные примеры не импортируются. Текущий черновик не изменён.',
      restored: 'Резервная копия открыта. Предыдущий черновик скачан отдельно.', resetDone: 'Пустой кейс открыт. Предыдущий черновик скачан отдельно.',
      downloaded: 'Файл подготовлен для скачивания.', exportBlocked: 'Сначала заполните обязательные разделы и исправьте ссылку.',
      error: 'Не удалось выполнить действие. Текущий черновик сохранён на странице; попробуйте скачать резервную копию.',
      sizeError: 'Эта правка превышает лимит поля или JSON-копии (256 КиБ). Она отменена; предыдущий черновик сохранён. Сократите текст или ссылку.',
      titleTag: 'Один технический кейс — Kornilov Tools',
      description: 'Бесплатно соберите один технический кейс из собственного опыта. Локальный черновик, Markdown и самостоятельная HTML-страница без аккаунта.'
    },
    en: {
      ...C.LABELS.en,
      skip: 'Skip to the worksheet', languageGroup: 'Interface language',
      eyebrow: 'Free · one project · no account',
      pageTitle: 'Turn one task into a clear technical case study.',
      lede: 'Describe the problem, your contribution and your decision. Separate observed results from assumptions. Get Markdown for a README and a standalone HTML page.',
      start: 'Write my case study', openExample: 'View a fictional example', closeExample: 'Return to my case study',
      privacy: 'Your text stays in this browser. The tool does not send the case study to the network. Exports and backups remain with you.',
      recoveryTitle: 'The saved draft could not be read.',
      recoveryText: 'It has not been overwritten. Save the original data first, then open a backup or start a new case study.',
      rescueDownload: 'Download the original draft', rescueReset: 'Save the original and start again',
      yourDraft: 'Your local draft', formTitle: 'One project. Your experience.',
      formNote: 'No name, contact details or employer data are needed. Remove secrets and other people’s personal information. Asterisks mark required fields.',
      helpTitle: 'Name the specific task you worked on.',
      helpSummary: 'Optional: one sentence about the project and your part of the work.',
      helpStack: 'Optional: include only tools you actually used.',
      chapterContext: 'Task and responsibility', chapterDecision: 'Decision and choice', chapterResult: 'Result and evidence',
      helpContext: 'What did not work, for whom and under which constraints? Course and personal projects count too.',
      helpContribution: 'What did you do yourself? State your role’s boundaries and the work owned by others.',
      helpDecision: 'What did you change and how does it solve the original problem? Explain the mechanism, not just the technology name.',
      helpTradeoff: 'What alternative did you consider? What became harder or less effective with your chosen approach?',
      helpResult: 'What did you check or observe after the change? If you have no metrics, describe verified behaviour without inventing percentages.',
      helpEvidence: 'Name a real artifact and what it shows: a diff, a check scenario, a recording or anonymised feedback. State when an artifact is private.',
      evidenceUrl: 'Link to public evidence',
      helpEvidenceUrl: 'Optional. HTTPS only, without credentials in the address. Check access while signed out and your permission to publish.',
      helpLimits: 'What did you not check? Which devices, data volumes or conditions are not covered by the result yet?',
      helpLesson: 'Optional: one specific improvement to your approach.',
      urlError: 'Enter a valid HTTPS link without a username or password.',
      brandCredit: 'Include an optional Kornilov Tools link in the export',
      backupDownload: 'Download a backup', restoreOpen: 'Open a backup', resetOpen: 'Clear the worksheet',
      backupNote: 'Autosave depends on your browser and may disappear when browser data is cleared. JSON is for continuing your work, not for publishing.',
      fictionalLabel: 'Separate fictional example', exampleTitle: 'See the structure in one scenario.',
      exampleInfo: 'All actions, evidence and results here are invented. Your draft is kept separately and is not replaced by the example.',
      backToWork: 'Return to my case study',
      exampleNote: 'You can download the example as a structural reference. Every export keeps an explicit fictional-content notice.',
      livePreview: 'Live result preview', resultTitle: 'Your case study',
      exportMarkdown: 'Download Markdown', exportHtml: 'Download HTML page',
      exportCareer: 'Download experience for Portfolio / Interview',
      exportNote: 'HTML is a standalone file without scripts or remote assets. Check the text, evidence and link access before sharing.',
      previewRegion: 'Case study preview', publishGuide: 'How to publish the HTML',
      nextLabel: 'When one case study is not enough', nextTitle: 'Continue with the experience you have described.',
      portfolioNext: 'Build a personal website with several cases: drafts, images, selected published work and visual themes.',
      portfolioLink: 'Explore Portfolio Case Kit',
      interviewNext: 'Reuse your experience library for several vacancies, each with separate evidence, answers and a preparation plan.',
      interviewLink: 'Explore Interview Proof Kit',
      paidNote: 'These are separate paid products. You can use and publish your free case study without buying anything.',
      guideLink: 'Use and privacy', cancel: 'Cancel', replaceConfirm: 'Save a copy and continue',
      modalBackup: 'Continuing downloads a backup of the current draft first. The replacement draft will be saved locally.',
      saved: 'Saved locally', noStorage: 'Autosave unavailable', locked: 'Original protected',
      storageWarning: 'This browser does not allow local saving. Your work stays on this page until it is closed. Download a JSON backup to continue later.',
      readiness: 'Fill these fields to export:', ready: 'Required sections are filled. Check the accuracy of your text before sharing.',
      fixUrl: 'Fix the HTTPS link', corrupted: 'The original draft has not been overwritten. Restore a JSON backup, or save the original before starting again.',
      restoreTitle: 'Open another draft?', restoreDescription: 'The selected JSON backup will replace your one current case study. Only backups from this free editor are accepted.',
      resetTitle: 'Start a blank case study?', resetDescription: 'The current worksheet will be cleared. Its backup will be downloaded first.',
      parseError: 'The file could not be opened. Choose this editor’s JSON backup, up to 256 KiB. Portfolio/Interview files and fictional examples cannot be imported. Your current draft was not changed.',
      restored: 'The backup is open. Your previous draft was downloaded separately.', resetDone: 'A blank case study is open. Your previous draft was downloaded separately.',
      downloaded: 'The file is ready to download.', exportBlocked: 'Fill the required sections and fix the link first.',
      error: 'The action could not be completed. Your draft is still on this page; try downloading a backup.',
      sizeError: 'This edit exceeds the field or JSON-backup limit (256 KiB). It was reverted; your previous draft is preserved. Shorten the text or link.',
      titleTag: 'One technical case study — Kornilov Tools',
      description: 'Build one technical case study from your own experience for free. A local draft, Markdown and standalone HTML without an account.'
    }
  };

  let work = C.createEmpty();
  let language = 'ru';
  let mode = 'work';
  let corruptRaw = null;
  let storageUnavailable = false;
  let pendingReplacement = null;
  let modalReturnFocus = null;
  const siteRoot = 'https://pease163.github.io/digital-products/';
  const t = () => TEXT[language];

  try {
    const saved = localStorage.getItem(C.STORAGE_KEY);
    if (saved !== null) {
      try { work = C.parse(saved); }
      catch (_) { corruptRaw = saved; }
    }
  } catch (_) { storageUnavailable = true; }
  try {
    const parameters = new URL(location.href).searchParams;
    const requested = parameters.get('lang');
    language = ['ru', 'en'].includes(requested) ? requested : work.language;
    // A navigable example never imports or replaces the saved working draft.
    if (parameters.get('example') === '1') mode = 'example';
  } catch (_) { language = work.language; }
  work.language = language;

  function current() { return mode === 'example' ? C.createExample(language) : work; }

  function announce(message, visible = false) {
    $('action-status').textContent = message;
    if (visible) { $('action-feedback').textContent = message; $('action-feedback').hidden = false; }
  }

  function save() {
    if (corruptRaw !== null) return;
    try { localStorage.setItem(C.STORAGE_KEY, C.serialize(work)); storageUnavailable = false; }
    catch (_) { storageUnavailable = true; }
    renderStorage();
  }

  function renderStorage() {
    $('recovery-panel').hidden = corruptRaw === null;
    $('storage-warning').hidden = !storageUnavailable;
    $('storage-warning').textContent = t().storageWarning;
    $('save-status').textContent = corruptRaw !== null ? t().locked : storageUnavailable ? t().noStorage : t().saved;
    for (const element of $('case-form').elements) {
      element.disabled = corruptRaw !== null && !['restore-open', 'restore-file'].includes(element.id);
    }
  }

  function renderLabels() {
    document.documentElement.lang = language;
    document.title = t().titleTag;
    document.querySelector('meta[name=description]').setAttribute('content', t().description);
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t()[element.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', t()[element.dataset.i18nAria]); });
    document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
    const localizedRoot = siteRoot + (language === 'en' ? 'en/' : '');
    $('brand-home').href = localizedRoot;
    $('portfolio-link').href = localizedRoot + 'products/portfolio-case.html?utm_source=career_case&utm_medium=free_tool&utm_campaign=one_case';
    $('interview-link').href = localizedRoot + 'products/interview-proof.html?utm_source=career_case&utm_medium=free_tool&utm_campaign=one_case';
    $('publish-guide').href = 'guide.html#publish-' + language;
    $('guide-link').href = 'guide.html#use-' + language;
    $('restore-file').setAttribute('aria-label', language === 'ru' ? 'Резервная копия JSON' : 'JSON backup');
    $('action-feedback').hidden = true;
    renderStorage();
  }

  function fillForm() {
    for (const key of Object.keys(C.FIELDS)) $('field-' + key).value = work.fields[key];
    $('brand-credit').checked = work.branding;
  }

  function render() {
    const state = current();
    const issues = C.problems(state);
    const missingRequired = issues.filter(issue => issue.type === 'required').length;
    const ready = issues.length === 0 && (mode === 'example' || corruptRaw === null);
    $('editor-panel').hidden = mode === 'example';
    $('example-info').hidden = mode !== 'example';
    $('example-toggle').textContent = mode === 'example' ? t().closeExample : t().openExample;
    $('example-toggle').setAttribute('aria-pressed', String(mode === 'example'));
    $('progress-count').textContent = (C.REQUIRED.length - missingRequired) + ' / ' + C.REQUIRED.length;
    $('progress-count').classList.toggle('is-ready', ready);
    $('progress-count').setAttribute('aria-label', language === 'ru' ?
      'Заполнено обязательных полей: ' + (C.REQUIRED.length - missingRequired) + ' из ' + C.REQUIRED.length :
      'Required fields filled: ' + (C.REQUIRED.length - missingRequired) + ' of ' + C.REQUIRED.length);
    $('export-markdown').disabled = !ready;
    $('export-html').disabled = !ready;
    $('export-career').disabled = !ready;
    if (corruptRaw !== null && mode === 'work') $('readiness').textContent = t().corrupted;
    else if (ready) $('readiness').innerHTML = '<p class="ready-message">' + C.escapeHTML(t().ready) + '</p>';
    else $('readiness').innerHTML = '<p class="readiness-title">' + C.escapeHTML(t().readiness) + '</p><ul class="missing-list">' +
      issues.map(issue => '<li><button type="button" data-focus-field="' + issue.key + '">' +
        C.escapeHTML(issue.type === 'url' ? t().fixUrl : t()[issue.key]) + '</button></li>').join('') + '</ul>';
    const badUrl = work.fields.evidenceUrl.trim() && !C.safeHttps(work.fields.evidenceUrl);
    $('url-error').hidden = !badUrl;
    $('field-evidenceUrl').setAttribute('aria-invalid', String(Boolean(badUrl)));
    $('case-preview').innerHTML = C.renderCase(state, { preview: true });
  }

  function switchMode(next) {
    mode = next;
    render();
    if (next === 'work') $('field-title').focus();
    else $('back-to-work').focus();
  }

  function download(raw, filename, type) {
    const url = URL.createObjectURL(new Blob([raw], { type }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = filename; anchor.hidden = true;
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function backupCurrent() {
    const raw = corruptRaw === null ? C.serialize(work) : corruptRaw;
    download(raw, corruptRaw === null ? 'my-case-backup.json' : 'one-case-original-draft.txt',
      corruptRaw === null ? 'application/json;charset=utf-8' : 'text/plain;charset=utf-8');
    // Preserve one rescue copy as well. Downloads depend on the browser;
    // if local storage is unavailable, the already-started download is the copy.
    try { localStorage.setItem(C.STORAGE_KEY + ':before-replace', raw); } catch (_) { /* best effort */ }
  }

  function closeModal() {
    $('replace-modal').hidden = true;
    document.body.classList.remove('has-modal');
    document.querySelector('main').inert = false;
    document.querySelector('.site-header').inert = false;
    document.querySelector('.site-footer').inert = false;
    pendingReplacement = null;
    if (modalReturnFocus && modalReturnFocus.isConnected) modalReturnFocus.focus();
    modalReturnFocus = null;
  }

  function openModal(action, replacement) {
    pendingReplacement = { action, replacement };
    modalReturnFocus = document.activeElement;
    $('modal-title').textContent = action === 'restore' ? t().restoreTitle : t().resetTitle;
    $('modal-description').textContent = action === 'restore' ? t().restoreDescription : t().resetDescription;
    $('replace-modal').hidden = false;
    document.body.classList.add('has-modal');
    document.querySelector('main').inert = true;
    document.querySelector('.site-header').inert = true;
    document.querySelector('.site-footer').inert = true;
    $('modal-cancel').focus();
  }

  $('case-form').addEventListener('submit', event => event.preventDefault());
  $('case-form').addEventListener('input', event => {
    const key = event.target.name;
    if (Object.prototype.hasOwnProperty.call(C.FIELDS, key) && corruptRaw === null) {
      const previous = work.fields[key];
      work.fields[key] = event.target.value;
      try { C.validate(work); }
      catch (_) {
        work.fields[key] = previous;
        event.target.value = previous;
        announce(t().sizeError, true);
        render();
        return;
      }
      save(); render();
    }
  });
  $('brand-credit').addEventListener('change', () => { work.branding = $('brand-credit').checked; save(); render(); });
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.language; work.language = language;
    renderLabels(); save(); render();
  }));
  $('example-toggle').addEventListener('click', () => switchMode(mode === 'work' ? 'example' : 'work'));
  $('back-to-work').addEventListener('click', () => switchMode('work'));
  $('readiness').addEventListener('click', event => {
    const button = event.target.closest('[data-focus-field]');
    if (!button) return;
    const field = $('field-' + button.dataset.focusField);
    if (field) { field.scrollIntoView({ block: 'center' }); field.focus({ preventScroll: true }); }
  });
  $('backup-download').addEventListener('click', () => {
    try { download(C.serialize(work), 'my-case-backup.json', 'application/json;charset=utf-8'); announce(t().downloaded); }
    catch (_) { announce(t().error, true); }
  });
  $('rescue-download').addEventListener('click', () => {
    if (corruptRaw !== null) download(corruptRaw, 'one-case-original-draft.txt', 'text/plain;charset=utf-8');
  });
  $('reset-open').addEventListener('click', () => openModal('reset', C.createEmpty(language)));
  $('rescue-reset').addEventListener('click', () => openModal('reset', C.createEmpty(language)));
  $('restore-open').addEventListener('click', () => $('restore-file').click());
  $('restore-file').addEventListener('change', async () => {
    const file = $('restore-file').files[0];
    $('restore-file').value = '';
    if (!file) return;
    try {
      if (file.size > C.MAX_BYTES) throw new Error('CASE_TOO_LARGE');
      openModal('restore', C.parse(await file.text()));
    } catch (_) { announce(t().parseError, true); }
  });
  $('modal-cancel').addEventListener('click', closeModal);
  $('modal-apply').addEventListener('click', () => {
    if (!pendingReplacement) return;
    try {
      const { action, replacement } = pendingReplacement;
      backupCurrent(); work = C.validate(replacement); language = work.language;
      corruptRaw = null; mode = 'work'; closeModal();
      fillForm(); renderLabels(); save(); render();
      announce(action === 'restore' ? t().restored : t().resetDone, true);
      $('field-title').focus();
    } catch (_) { announce(t().error, true); }
  });
  document.addEventListener('keydown', event => {
    if ($('replace-modal').hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === $('modal-cancel')) { event.preventDefault(); $('modal-apply').focus(); }
      else if (!event.shiftKey && document.activeElement === $('modal-apply')) { event.preventDefault(); $('modal-cancel').focus(); }
    }
  });
  for (const [id, exporter, filename, type] of [
    ['export-markdown', C.exportMarkdown, 'technical-case.md', 'text/markdown;charset=utf-8'],
    ['export-html', C.exportHTML, 'index.html', 'text/html;charset=utf-8'],
    ['export-career', C.exportCareerLibrary, 'one-case-career-library.json', 'application/json;charset=utf-8']
  ]) $(id).addEventListener('click', () => {
    try {
      if (mode === 'work' && corruptRaw !== null) throw new Error('CASE_INCOMPLETE');
      download(exporter(current()), mode === 'example' ? 'fictional-example-' + filename : filename, type);
      announce(t().downloaded);
    } catch (_) { announce(t().exportBlocked, true); }
  });

  fillForm(); renderLabels(); render();
})();
