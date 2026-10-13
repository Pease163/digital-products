/* Kornilov Tools CSV Preflight 1.1.0 — metadata-only quality report. */
(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./parser.js') : root.CSVParser);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CSVPreflight = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (parser) {
  'use strict';
  const VERSION = '1.1.0', FORMULA_MARKER_LIMIT = 200;
  function isFormulaLike(value) {
    return /^[\u0000-\u0020]*[=+\-@]/u.test(value) || /^[\t\r\n]/u.test(value);
  }
  function inputMetadata(input = {}) {
    const result = {};
    if (Number.isInteger(input.bytes)) result.bytes = input.bytes;
    if (['utf-8','windows-1251'].includes(input.encoding)) result.encoding = input.encoding;
    if ([',',';','\t','auto'].includes(input.delimiter)) result.delimiter = input.delimiter;
    return result;
  }
  function errorReport(error, input = {}) {
    const details = {};
    for (const key of ['record','line','expected','actual','limit','encoding']) {
      if (typeof error.details?.[key] === 'number' || key === 'encoding' && typeof error.details?.encoding === 'string') details[key] = error.details[key];
    }
    return { version:VERSION, structureValid:false, input:inputMetadata(input), limits:parser.LIMITS,
      summary:{ records:null, columns:null, duplicateKeys:null, duplicateRecords:null, emptyIDs:null, formulaLikeCells:null },
      error:{ code:error.code || 'read_error', details }, containsIDValues:false };
  }
  function analyzeTable(table, { keyColumn = 0, includeValues = false, input = {} } = {}) {
    if (!Number.isInteger(keyColumn) || keyColumn < 0 || keyColumn >= table.headers.length) throw new parser.DataError('key_required');
    const groups = new Map(), emptyIDRecords = [];
    table.rows.forEach(row => {
      const id = row.cells[keyColumn];
      if (!id.trim()) { emptyIDRecords.push(row.record); return; }
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(row.record);
    });
    const duplicates = [];
    for (const [id, records] of groups) if (records.length > 1) duplicates.push(includeValues ? { records, id } : { records });
    let formulaLikeCells = 0; const formulaMarkers = [];
    function scan(cells, record) {
      cells.forEach((cell, index) => {
        if (isFormulaLike(cell)) {
          formulaLikeCells++;
          if (formulaMarkers.length < FORMULA_MARKER_LIMIT) formulaMarkers.push({ record, column:index + 1 });
        }
      });
    }
    scan(table.headers, 1); table.rows.forEach(row => scan(row.cells, row.record));
    return { version:VERSION, structureValid:true, input:inputMetadata({ ...input, delimiter:table.delimiter }), limits:parser.LIMITS,
      keyColumn:keyColumn + 1, containsIDValues:!!includeValues,
      summary:{ records:table.rows.length, columns:table.headers.length, duplicateKeys:duplicates.length,
        duplicateRecords:duplicates.reduce((count, group) => count + group.records.length, 0), emptyIDs:emptyIDRecords.length, formulaLikeCells },
      duplicateGroups:duplicates, emptyIDRecords, formulaMarkers,
      formulaMarkersOmitted:Math.max(0, formulaLikeCells - FORMULA_MARKER_LIMIT), formulaMarkerLimit:FORMULA_MARKER_LIMIT };
  }
  function inspectCSV(text, { delimiter = ',', keyColumn = 0, includeValues = false, input = {} } = {}) {
    try { const selected = delimiter === 'auto' ? parser.detectDelimiter(text) : delimiter;
      return analyzeTable(parser.parseCSV(text, selected), { keyColumn, includeValues, input:{ ...input, delimiter:selected } });
    } catch (error) { if (!(error instanceof parser.DataError)) throw error; return errorReport(error, { ...input, delimiter }); }
  }
  function exportJSON(report) { return JSON.stringify(report, null, 2) + '\n'; }
  return Object.freeze({ VERSION, FORMULA_MARKER_LIMIT, isFormulaLike, errorReport, analyzeTable, inspectCSV, exportJSON });
});
