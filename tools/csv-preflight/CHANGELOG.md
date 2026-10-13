# Version 1.1.0 — 2026-10-13

In “Share the result”, choose “Copy text”, “Download PNG” or “Download HTML”. One “Include counts in all formats” checkbox adds counts of records, duplicate/empty IDs and formula-like cells. All counts are hidden by default in all three formats. File names, headers, IDs, cell values and record coordinates are never included. The full JSON ID checkbox does not affect these formats. Demos are explicitly marked fictional. Updating the report or changing the language turns count disclosure off again; counts are unavailable if the structure is invalid. PNG is created locally by the browser and downloaded as an image, not copied to the clipboard. If text copying is unavailable, a selectable text field appears: copy manually using the menu or Ctrl/Cmd+C. Text and HTML include the free CSV Preflight URL so the recipient can check their own file; the address drawn in the PNG is not clickable. The URL contains only the language and generic UTM tags, without your data. Downloads start only when requested; check the file in your downloads. The app never sends anything automatically. The paid next step is available inside the tool.

Brand: Kornilov Tools. Existing data schemas and storage keys remain compatible.

# Changelog

## 1.1.0 — 2026-10-13

- Initial free local CSV/TSV validation tool, RU/EN.
- Shared tested strict parser; explicit encoding and delimiter selection.
- Exact duplicate/empty-ID analysis and formula-like-cell coordinates.
- 5/10/20-record local preview; metadata-only JSON by default.
- Optional duplicate-ID values in JSON; strict errors without partial-success claims.
- Demo, expected report, guides and redistribution license with Kornilov Tools attribution.
