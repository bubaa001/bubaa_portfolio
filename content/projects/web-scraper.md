---
title: "Website → Excel: Config-Driven Web Scraper"
summary: "A Python scraper that turns any listing site into a clean Excel/CSV: pagination, detail pages, retries, de-duplication and typed fields. New site = one config file."
date: "2026-11-26"
tags: ["Data", "Scraping", "Python"]
tech: ["Python", "Requests", "BeautifulSoup", "openpyxl"]
cover: "/projects/web-scraper.png"
demo: "/demos/scraper"
featured: true
status: "completed"
---

## Live result
60 products scraped from a practice site, including each product's detail page (category, UPC, stock count, description), cleaned and exported to **Excel, CSV and JSON**. Browse and download the real output on the demo page.

## How it works
- Pagination and optional detail pages
- Retries with backoff, polite delays and a robots.txt check
- De-duplication and type cleaning (prices → numbers, ratings → 1–5)
- Styled Excel output: header row, filters, frozen top row

## Delivery
Every job is a JSON config of CSS selectors, so turnaround is fast. Buyers get the data, and on bigger packages the script and a scheduled run.
