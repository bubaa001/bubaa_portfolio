# Scraper kit

Config-driven scraper used for the "web scraping" gig. Each client job = one JSON file in `configs/`.

```bash
pip install -r requirements.txt
python scraper.py configs/books.json --max-pages 5 --details
```

Output: `output/<name>.csv`, `.xlsx` (styled header, filters, frozen row) and `.json`.

Delivery checklist for an order:
1. Confirm the site, fields, and volume with the buyer; check the site's terms and robots.txt (the script stops if robots.txt disallows the page).
2. Write `configs/<client>.json` with CSS selectors (inspect the page in Chrome DevTools).
3. Run a 1-page test, send the buyer a sample, then the full run.
4. Deliver CSV + Excel (+ the script and config on Standard/Premium).

Don't scrape personal data, logins/paywalls, or sites whose terms forbid it.
