"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, type Template } from "@/lib/templates";

const sorts = { popular: "Most popular", newest: "Newest", price: "Price: low to high", az: "A to Z" } as const;
type Sort = keyof typeof sorts;

export default function Explore({ items }: { items: Template[] }) {
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("popular");
  const [q, setQ] = useState("");
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, items.filter((t) => t.category === c).length])), [items]);
  const shown = useMemo(() => items
    .filter((t) => (cat === "All" || t.category === cat) && `${t.name} ${t.kind} ${t.category}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "popular" ? b.popularity - a.popularity : sort === "newest" ? b.added.localeCompare(a.added) || b.popularity - a.popularity : sort === "price" ? a.price - b.price : a.name.localeCompare(b.name)),
  [items, cat, sort, q]);

  return (
    <div className="container-x mt-14 grid gap-10 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates…" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-accent" />
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">Categories</p>
          <ul className="space-y-1">
            {["All", ...categories].map((c) => (
              <li key={c}>
                <button onClick={() => setCat(c)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${cat === c ? "bg-white text-zinc-950" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                  {c}<span className={`text-xs ${cat === c ? "text-zinc-500" : "text-zinc-600"}`}>{c === "All" ? items.length : counts[c]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-cyan-500/5 p-5">
          <p className="text-sm font-semibold text-white">Done-for-you setup</p>
          <p className="mt-2 text-sm text-zinc-400">Your logo, colours, photos and text added, then deployed on your domain.</p>
          <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">{["Custom branding", "Mobile-ready", "Free hosting setup", "Source code included"].map((f) => <li key={f}>✓ {f}</li>)}</ul>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-500"><span className="text-white">{shown.length}</span> results</p>
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 text-sm">
            {(Object.keys(sorts) as Sort[]).map((s) => <button key={s} onClick={() => setSort(s)} className={`rounded-full px-3 py-1.5 transition ${sort === s ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"}`}>{sorts[s]}</button>)}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {shown.map((t) => (
            <article key={t.slug} className="group">
              <Link href={t.href} className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                <Image src={t.cover} alt={`${t.name} ${t.kind}`} fill sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw" className="object-cover object-top transition duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute left-3 top-3 flex gap-2">
                  {t.premium && <span className="rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 px-2.5 py-1 text-[11px] font-semibold text-zinc-950 shadow">★ Premium</span>}
                  {t.isNew && <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-950 backdrop-blur">New</span>}
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 opacity-0 shadow-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">Live preview ↗</span>
              </Link>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-white">{t.name} <span className="font-normal text-zinc-400">· {t.kind}</span></h2>
                  <p className="mt-1 text-xs text-zinc-500">bubaa · {t.category}</p>
                </div>
                <p className="shrink-0 text-sm text-zinc-400">from <span className="font-semibold text-white">${t.price}</span></p>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{t.blurb}</p>
            </article>
          ))}
        </div>
        {!shown.length && <p className="py-20 text-center text-zinc-500">No templates match your search.</p>}
      </div>
    </div>
  );
}
