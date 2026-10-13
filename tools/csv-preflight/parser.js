/* Kornilov Tools strict CSV parser 1.1.0 — dependency-free browser / Node. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CSVParser = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LIMITS = Object.freeze({ bytes: 2 * 1024 * 1024, rows: 10000, columns: 100 });
  class DataError extends Error {
    constructor(code, details = {}) { super(code); this.name = 'DataError'; this.code = code; this.details = details; }
  }
  function fail(code, details) { throw new DataError(code, details); }
  function decodeBytes(buffer, encoding = 'utf-8') {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (bytes.byteLength > LIMITS.bytes) fail('file_too_large', { limit: LIMITS.bytes });
    if (!['utf-8', 'windows-1251'].includes(encoding)) fail('encoding');
    try { return new TextDecoder(encoding, { fatal: true }).decode(bytes); }
    catch { fail('decode', { encoding }); }
  }
  function parseCSV(text, delimiter = ',', limits = LIMITS) {
    if (typeof text !== 'string') fail('text_required');
    if (![',', ';', '\t'].includes(delimiter)) fail('delimiter');
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    if (!text.length) fail('empty_file');
    const records = []; let cells = [], field = '', state = 'start';
    let line = 1, startLine = 1, recordTouched = false;
    function endField() { cells.push(field); field = ''; state = 'start'; }
    function endRecord() {
      endField();
      if (cells.length > limits.columns) fail('too_many_columns', { line: startLine, limit: limits.columns });
      records.push({ cells, line: startLine }); cells = []; recordTouched = false;
      if (records.length > limits.rows + 1) fail('too_many_rows', { limit: limits.rows });
    }
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (state === 'quoted') {
        if (char === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else state = 'closed';
        } else {
          field += char;
          if (char === '\n') line++;
          else if (char === '\r' && text[i + 1] !== '\n') line++;
        }
        continue;
      }
      if (char === delimiter) { endField(); recordTouched = true; continue; }
      if (char === '\n' || char === '\r') {
        endRecord();
        if (char === '\r' && text[i + 1] === '\n') i++;
        line++; startLine = line; continue;
      }
      if (state === 'closed') fail('after_quote', { line });
      if (char === '"') {
        if (state !== 'start') fail('quote_in_unquoted', { line });
        state = 'quoted'; recordTouched = true;
      } else { field += char; state = 'unquoted'; recordTouched = true; }
    }
    if (state === 'quoted') fail('unclosed_quote', { line: startLine });
    if (recordTouched || cells.length || field.length || state === 'closed') endRecord();
    if (!records.length) fail('empty_file');
    const headers = records.shift().cells;
    const headerKeys = headers.map(value => value.trim());
    if (headerKeys.some(value => !value)) fail('empty_header');
    if (new Set(headerKeys).size !== headerKeys.length) fail('duplicate_header');
    const rows = records.map((record, index) => {
      if (record.cells.length !== headers.length) fail('row_width', {
        record: index + 2, line: record.line, expected: headers.length, actual: record.cells.length
      });
      return { cells: record.cells, record: index + 2, line: record.line };
    });
    return { headers, rows, delimiter };
  }
  function detectDelimiter(text) {
    const candidates = [',', ';', '\t'].map(delimiter => {
      try { const table = parseCSV(text, delimiter); return { delimiter, columns: table.headers.length }; }
      catch { return null; }
    }).filter(Boolean);
    if (!candidates.length) fail('auto_delimiter');
    const max = Math.max(...candidates.map(item => item.columns));
    const winners = candidates.filter(item => item.columns === max);
    if (winners.length !== 1 || max === 1) fail('ambiguous_delimiter');
    return winners[0].delimiter;
  }
  return Object.freeze({ LIMITS, DataError, decodeBytes, parseCSV, detectDelimiter });
});
