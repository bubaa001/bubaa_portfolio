"use client";
import { useMemo, useState } from "react";

export type Row = { title: string; price_gbp: number | null; rating: number | null; in_stock: string | null; url: string; image: string; category: string | null; upc: string | null; stock_count: number | null; description: string | null };
type Key = "title" | "price_gbp" | "rating" | "category" | "stock_count";

export default function DataTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ k: Key; d: 1 | -1 }>({ k: "price_gbp", d: -1 });
  const shown = useMemo(() => rows
    .filter((r) => (r.title + " " + (r.category ?? "")).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => ((a[sort.k] ?? "") > (b[sort.k] ?? "") ? 1 : -1) * sort.d), [rows, q, sort]);
  const th = (k: Key, label: string, right = false) => (
    <th onClick={() => setSort((s) => ({ k, d: s.k === k ? (s.d === 1 ? -1 : 1) : -1 }))} className={`cursor-pointer px-4 py-3 font-medium hover:text-white ${right ? "text-right" : ""}`}>
      {label} {sort.k === k && (sort.d === 1 ? "↑" : "↓")}
    </th>
  );
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-medium text-white">Scraped data <span className="text-zinc-500">({shown.length})</span></h2>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter title or category…" className="w-64 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm outline-none focus:border-cyan-400" />
      </div>
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="sticky top-0 bg-[#0d0d14] text-left text-xs uppercase tracking-wider text-zinc-500">
            <tr>{th("title", "Title")}{th("category", "Category")}{th("price_gbp", "Price", true)}{th("rating", "Rating")}{th("stock_count", "Stock", true)}</tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {shown.map((r) => (
              <tr key={r.url} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5"><a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white hover:text-cyan-300">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={r.image} alt="" className="h-10 w-7 rounded object-cover" loading="lazy" /><span className="line-clamp-1">{r.title}</span></a></td>
                <td className="px-4 py-2.5 text-zinc-400">{r.category}</td>
                <td className="px-4 py-2.5 text-right text-white">£{r.price_gbp?.toFixed(2)}</td>
                <td className="px-4 py-2.5 text-amber-300">{"★".repeat(r.rating ?? 0)}<span className="text-zinc-700">{"★".repeat(5 - (r.rating ?? 0))}</span></td>
                <td className="px-4 py-2.5 text-right">{r.stock_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
