import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import DemoBar from "@/components/demo/DemoBar";
import DataTable, { type Row } from "./DataTable";

export const metadata: Metadata = { title: "Web scraping demo" };

export default function ScraperDemo() {
  const rows: Row[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/demos/scraper/books.json"), "utf8"));
  const cats = new Map<string, number[]>();
  rows.forEach((r) => { if (r.category) cats.set(r.category, [...(cats.get(r.category) ?? []), r.price_gbp ?? 0]); });
  const top = [...cats.entries()].map(([c, p]) => ({ c, n: p.length, avg: p.reduce((a, b) => a + b, 0) / p.length })).sort((a, b) => b.n - a.n).slice(0, 8);
  const max = Math.max(...top.map((t) => t.n));
  const stock = rows.reduce((a, r) => a + (r.stock_count ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#07070b] pb-28 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">Web scraping · live output</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Website → clean spreadsheet.</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          This data was scraped by my scraper kit from <a className="text-cyan-400 underline" href="https://books.toscrape.com" target="_blank" rel="noreferrer">books.toscrape.com</a> (a practice site): {rows.length} products across 3 listing pages, plus each product&apos;s detail page, cleaned and typed. Every field below came from the real run.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/demos/scraper/books.xlsx" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200">⬇ Excel (.xlsx)</a>
          <a href="/demos/scraper/books.csv" className="rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5">⬇ CSV</a>
          <a href="/demos/scraper/books.json" className="rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5">⬇ JSON</a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {[["Rows", rows.length], ["Fields per row", Object.keys(rows[0] ?? {}).length], ["Categories", cats.size], ["Units in stock", stock]].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><p className="text-sm text-zinc-500">{k}</p><p className="mt-1 text-3xl font-semibold text-white">{v}</p></div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h2 className="mb-4 font-medium text-white">Products by category</h2>
            <ul className="space-y-2.5 text-sm">
              {top.map((t) => (
                <li key={t.c} className="grid grid-cols-[120px_1fr_70px] items-center gap-3">
                  <span className="truncate text-zinc-400">{t.c}</span>
                  <span className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${(t.n / max) * 100}%` }} />
                  <span className="text-right text-zinc-500">£{t.avg.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h2 className="mb-3 font-medium text-white">The whole job is one config file</h2>
            <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 font-mono text-xs leading-relaxed text-cyan-200">{`{
  "start_url": "https://books.toscrape.com/...",
  "item": "article.product_pod",
  "next": "li.next > a",
  "fields": {
    "title":  { "css": "h3 a", "attr": "title" },
    "price":  { "css": "p.price_color", "type": "float" },
    "rating": { "css": "p.star-rating", "attr": "class", ... }
  },
  "detail": { "fields": { "category": ..., "stock": ... } }
}`}</pre>
            <p className="mt-3 text-xs text-zinc-500">Pagination, detail pages, retries, polite delays, robots.txt check, de-duplication, CSV + Excel + JSON export.</p>
          </div>
        </div>

        <div className="mt-6"><DataTable rows={rows} /></div>
      </div>
      <DemoBar gig="Web scraping to Excel / Sheets" />
    </div>
  );
}
