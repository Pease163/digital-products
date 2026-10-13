# Get useful results in 5 minutes

## Minute 1: inspect the example

Open `index.html` and select “Check the example”. This is `demo.csv`: a small inventory export where ID 002 repeats, one record lacks an ID, and a note contains `=1+1`. Its quoting and multiline description are structurally valid.

Expect 6 records, 4 columns; 1 duplicate group involving 2 records; 1 empty ID; 1 formula-like cell. Structurally valid CSV can still have quality problems.

## Minute 2: load your own export

Choose a CSV/TSV. Select UTF-8 or Windows-1251 according to the exporting system. Choose auto, comma, semicolon or Tab. Auto does not guess when uncertain: select explicitly.

A structural error shows a message, unknown counts “—” and no preview. Check quoting, blank lines and field counts. An error report is not a successful validation.

## Minute 3: choose the right ID

Use SKU for products or Order ID for orders. Customer names may legitimately repeat and usually are not order keys. Inspect how choosing a different column changes duplicate groups.

In the example, duplicate 002 is in records **3 and 4**, the empty ID is record **5**, and the formula-like note is record **6**, column **4**. The header is record 1. A 5/10/20-row preview helps locate them.

## Minute 4: decide what to fix in the source

A duplicate could be an export error or a legitimate repeated record: the tool does not decide. Confirm whether the chosen column should be unique. Fill missing IDs in the source system. Review formula-like notes before opening in Excel; negative numbers are flagged too.

No rows are deleted, no first duplicate is chosen, and IDs/numbers are not normalized. Correct the source, export again and recheck.

## Minute 5: save a report without raw data

Leave “Include ID values in JSON” off and press JSON ↓. Get counts, duplicate record groups, empty-ID indexes and formula coordinates — without source values or file names. Share the report with a colleague as instructions for checking the source.

If the colleague may see IDs, the checkbox adds duplicate-group IDs. Other cells still are not exported. With the checkbox off, the demo's counts and coordinates match `expected-report.json`; the interface also records the input file's settings.

Limits: 2 MiB / 10,000 records / 100 columns. This tool does not verify prices, statuses or personal facts and is not antivirus software. Select “Clear” when done. Other Kornilov Tools solutions are available through the optional Boosty button; file data is not sent with the link.


## Share card

In “Share the result”, choose “Copy text”, “Download PNG” or “Download HTML”. One “Include counts in all formats” checkbox adds counts of records, duplicate/empty IDs and formula-like cells. All counts are hidden by default in all three formats. File names, headers, IDs, cell values and record coordinates are never included. The full JSON ID checkbox does not affect these formats. Demos are explicitly marked fictional. Updating the report or changing the language turns count disclosure off again; counts are unavailable if the structure is invalid. PNG is created locally by the browser and downloaded as an image, not copied to the clipboard. If text copying is unavailable, a selectable text field appears: copy manually using the menu or Ctrl/Cmd+C. Text and HTML include the free CSV Preflight URL so the recipient can check their own file; the address drawn in the PNG is not clickable. The URL contains only the language and generic UTM tags, without your data. Downloads start only when requested; check the file in your downloads. The app never sends anything automatically. The paid next step is available inside the tool.

## Support

Kornilov Tools, version 1.1.0. Contact: [support on the website](https://pease163.github.io/digital-products/#support). Include the product, version, browser, steps and an anonymized example. Never include passwords, keys or client data.
