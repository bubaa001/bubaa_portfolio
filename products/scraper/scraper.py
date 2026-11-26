#!/usr/bin/env python3
"""Config-driven web scraper → CSV / Excel / JSON.

A new client job = a new JSON config (start URL + CSS selectors), not new code.

Usage:
    python scraper.py configs/books.json --max-pages 5 --out output/books
    python scraper.py configs/books.json --details     # also open each item's page

Features: pagination, optional detail pages, retries with backoff, polite delay,
robots.txt check, de-duplication, type cleaning, CSV + XLSX + JSON export.
"""
import argparse
import csv
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser

import requests
from bs4 import BeautifulSoup

UA = "Mozilla/5.0 (compatible; DataCollector/1.0; +https://example.com/bot)"


def fetch(session, url, retries=3, delay=1.0):
    for attempt in range(retries):
        try:
            r = session.get(url, timeout=20)
            if r.status_code == 200:
                r.encoding = r.apparent_encoding or r.encoding
                return r.text
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep(delay * (2 ** attempt))
                continue
            print(f"  ! {r.status_code} {url}", file=sys.stderr)
            return None
        except requests.RequestException as e:
            print(f"  ! {e.__class__.__name__} {url}", file=sys.stderr)
            time.sleep(delay * (2 ** attempt))
    return None


def extract(node, spec, base):
    """spec: {"css": "...", "attr": "href"|"text"|..., "regex": "...", "type": "float|int|str", "map": {...}}"""
    el = node.select_one(spec["css"]) if spec.get("css") else node
    if el is None:
        return None
    attr = spec.get("attr", "text")
    if attr == "text":
        val = el.get_text(" ", strip=True)
    else:
        val = el.get(attr)
        if isinstance(val, list):
            val = " ".join(val)
        if attr in ("href", "src") and val:
            val = urljoin(base, val)
    if val is None:
        return None
    if spec.get("regex"):
        m = re.search(spec["regex"], val)
        val = m.group(1) if m and m.groups() else (m.group(0) if m else None)
    if val is not None and spec.get("map"):
        val = spec["map"].get(val, val)
    t = spec.get("type")
    try:
        if t == "float" and val is not None:
            val = float(re.sub(r"[^0-9.\-]", "", str(val)))
        elif t == "int" and val is not None:
            val = int(re.sub(r"[^0-9\-]", "", str(val)))
    except ValueError:
        val = None
    return val


def robots_ok(url):
    p = urlparse(url)
    rp = RobotFileParser(f"{p.scheme}://{p.netloc}/robots.txt")
    try:
        rp.read()
    except Exception:
        return True
    return rp.can_fetch(UA, url)


def run(cfg, max_pages, details, delay):
    s = requests.Session()
    s.headers["User-Agent"] = UA
    url, page, rows, seen = cfg["start_url"], 0, [], set()
    if not robots_ok(url):
        sys.exit(f"robots.txt disallows {url} — stopping.")
    while url and page < max_pages:
        page += 1
        print(f"page {page}: {url}")
        html = fetch(s, url, delay=delay)
        if not html:
            break
        soup = BeautifulSoup(html, "html.parser")
        for item in soup.select(cfg["item"]):
            row = {k: extract(item, spec, url) for k, spec in cfg["fields"].items()}
            key = row.get(cfg.get("unique", "url")) or json.dumps(row, sort_keys=True)
            if key in seen:
                continue
            seen.add(key)
            if details and cfg.get("detail") and row.get(cfg["detail"]["link_field"]):
                dhtml = fetch(s, row[cfg["detail"]["link_field"]], delay=delay)
                if dhtml:
                    dsoup = BeautifulSoup(dhtml, "html.parser")
                    for k, spec in cfg["detail"]["fields"].items():
                        row[k] = extract(dsoup, spec, row[cfg["detail"]["link_field"]])
                time.sleep(delay)
            rows.append(row)
        nxt = soup.select_one(cfg["next"]) if cfg.get("next") else None
        url = urljoin(url, nxt["href"]) if nxt and nxt.get("href") else None
        time.sleep(delay)
    return rows


def save(rows, out):
    out.parent.mkdir(parents=True, exist_ok=True)
    cols = list(dict.fromkeys(k for r in rows for k in r))
    with open(out.with_suffix(".csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)
    out.with_suffix(".json").write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Font, PatternFill
        wb = Workbook()
        ws = wb.active
        ws.title = "Data"
        ws.append(cols)
        for c in ws[1]:
            c.font = Font(bold=True, color="FFFFFF")
            c.fill = PatternFill("solid", fgColor="4F46E5")
        for r in rows:
            ws.append([r.get(c) for c in cols])
        for i, c in enumerate(cols, 1):
            width = max(len(str(c)), *(len(str(r.get(c) or "")) for r in rows[:200])) if rows else len(c)
            ws.column_dimensions[ws.cell(1, i).column_letter].width = min(60, width + 2)
        ws.freeze_panes = "A2"
        ws.auto_filter.ref = ws.dimensions
        wb.save(out.with_suffix(".xlsx"))
    except ImportError:
        print("openpyxl not installed — skipped .xlsx", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("config")
    ap.add_argument("--max-pages", type=int, default=3)
    ap.add_argument("--details", action="store_true")
    ap.add_argument("--delay", type=float, default=1.0)
    ap.add_argument("--out", default=None)
    a = ap.parse_args()
    cfg = json.loads(Path(a.config).read_text())
    rows = run(cfg, a.max_pages, a.details, a.delay)
    out = Path(a.out or f"output/{Path(a.config).stem}")
    save(rows, out)
    print(f"✓ {len(rows)} rows → {out}.csv / .xlsx / .json")


if __name__ == "__main__":
    main()
