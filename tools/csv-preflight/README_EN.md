# CSV Preflight — free Kornilov Tools tool

Check a CSV before importing: structure, duplicate/empty IDs and formula-like cells. The tool **does not modify files**. No account, server or installation.

## Start

Extract the whole folder and double-click **index.html** in a modern browser. Select “Check the example”. Expect 6 records, 4 columns, 1 duplicate ID involving 2 records, 1 empty ID and 1 formula-like cell.

Choose your own CSV/TSV, encoding and delimiter. Select the ID column for the entity you care about — order, product or customer. Inspect issue coordinates and the first 5/10/20 records. Walkthrough: [GUIDE_EN.md](GUIDE_EN.md). Русский: [README_RU.md](README_RU.md).

## Interpret the report

- **Valid structure**: headers are non-empty and unique, quotes close properly and field counts match. It does not validate business facts.
- **Duplicate IDs**: distinct values occurring more than once. Records with duplicates counts all records in those groups.
- **Empty IDs**: empty strings or whitespace-only values. Nothing is repaired.
- **Formula-like cells**: `=`, `+`, `-`, `@` after leading whitespace, or certain leading control characters. `-1` is flagged too: this is a review heuristic, not a malware verdict.
- CSV record 1 is the header. A quoted newline does not start another record.

## Privacy

Files stay in page memory. No network calls, analytics, external libraries, localStorage or saved sessions. The Boosty button navigates only when pressed and does not attach data or reports. “Clear” removes current references and the preview; physical memory is managed by the browser.

Default JSON includes **counts and coordinates** only, without cell values, IDs, headers or file names. “Include ID values in JSON” adds duplicate-group IDs only. The full source CSV is never included. Check the checkbox before sharing. The local raw-data preview is not exported.

Invalid structures produce unknown counts, hide the preview and export `structureValid: false` with an error code. JSON includes up to 200 formula coordinates with an explicit omitted count; the total cell count is exact. All duplicate groups and empty-ID record indexes are included.

## Limits

**2 MiB (2,097,152 bytes), 10,000 data records and 100 columns** per file. UTF-8/BOM or explicitly selected Windows-1251; comma, semicolon or Tab. No XLSX, repairs, normalization, fuzzy matching or two-file comparison. `001`, `1`, `A` and ` a ` are different IDs. Choose the delimiter manually for single-column or ambiguous files. Blank multi-column records and spaces after closing quotes are strict errors.

Free redistribution with Kornilov Tools attribution is allowed; resale is not. [LICENSE.txt](LICENSE.txt). Catalog: [Kornilov Tools](https://pease163.github.io/digital-products/).


## Share card

In “Share the result”, choose “Copy text”, “Download PNG” or “Download HTML”. One “Include counts in all formats” checkbox adds counts of records, duplicate/empty IDs and formula-like cells. All counts are hidden by default in all three formats. File names, headers, IDs, cell values and record coordinates are never included. The full JSON ID checkbox does not affect these formats. Demos are explicitly marked fictional. Updating the report or changing the language turns count disclosure off again; counts are unavailable if the structure is invalid. PNG is created locally by the browser and downloaded as an image, not copied to the clipboard. If text copying is unavailable, a selectable text field appears: copy manually using the menu or Ctrl/Cmd+C. Text and HTML include the free CSV Preflight URL so the recipient can check their own file; the address drawn in the PNG is not clickable. The URL contains only the language and generic UTM tags, without your data. Downloads start only when requested; check the file in your downloads. The app never sends anything automatically. The paid next step is available inside the tool.

## Support

Kornilov Tools, version 1.1.0. Contact: [support on the website](https://pease163.github.io/digital-products/#support). Include the product, version, browser, steps and an anonymized example. Never include passwords, keys or client data.
