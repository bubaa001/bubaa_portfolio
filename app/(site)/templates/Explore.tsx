"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, type Template } from "@/lib/templates";

const sorts = { popular: "Most popular", newest: "Newest", price: "Price ↑", az: "A–Z" } as const;
type Sort = keyof typeof sorts;

function Card({ t, i }: { t: Template; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [press, setPress] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12 }); io.observe(el); return () => io.disconnect(); }, []);
  return (
    <article ref={ref} className={`group transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${vis ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${i * 90}ms` }}>
      <Link href={t.href} onTouchStart={() => setPress(true)} onTouchEnd={() => setPress(false)} onTouchCancel={() => setPress(false)}
        className={`relative block overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 transition-transform duration-300 sm:aspect-[16/10] sm:rounded-2xl ${t.coverMobile ? "aspect-[4/5]" : "aspect-[16/10]"} ${press ? "scale-[.98]" : ""}`}>
        {/* phones see the phone version of the template, desktops the desktop version */}
        {t.coverMobile && <Image src={t.coverMobile} alt={`${t.name} on mobile`} fill sizes="100vw" className="object-cover object-top transition duration-[1.2s] ease-out sm:hidden" />}
        <Image src={t.cover} alt={`${t.name} ${t.kind}`} fill sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw" className={`object-cover object-top transition duration-[1.2s] ease-out group-hover:scale-[1.04] ${t.coverMobile ? "hidden sm:block" : ""}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent sm:from-black/70 sm:via-transparent sm:opacity-0 sm:transition sm:duration-500 sm:group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          {t.premium && <span className="rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 px-2.5 py-1 text-[11px] font-semibold text-zinc-950 shadow">★ Premium</span>}
          {t.isNew && <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-950 backdrop-blur">New</span>}
        </div>
        {/* phones: always-visible preview button */}
        <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-xl sm:hidden">Live preview ↗</span>
        {/* desktop: hover preview button */}
        <span className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 translate-y-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 opacity-0 shadow-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:block">Live preview ↗</span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4 px-1 sm:px-0">
        <div><h2 className="text-lg font-semibold text-white sm:text-base">{t.name} <span className="block text-sm font-normal text-zinc-400 sm:inline sm:text-base"><span className="hidden sm:inline">· </span>{t.kind}</span></h2><p className="mt-1 text-xs text-zinc-500">bubaa · {t.category}</p></div>
        <p className="shrink-0 text-sm text-zinc-400">from <span className="font-semibold text-white">${t.price}</span></p>
      </div>
      <p className="mt-3 line-clamp-2 px-1 text-sm text-zinc-400 sm:mt-2 sm:px-0">{t.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-1.5 px-1 sm:hidden">{t.features.slice(0, 3).map((f) => <span key={f} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">{f}</span>)}</div>
    </article>
  );
}

export default function Explore({ items }: { items: Template[] }) {
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("popular");
  const [q, setQ] = useState("");
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, items.filter((t) => t.category === c).length])), [items]);
  const shown = useMemo(() => items
    .filter((t) => (cat === "All" || t.category === cat) && `${t.name} ${t.kind} ${t.category}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "popular" ? b.popularity - a.popularity : sort === "newest" ? b.added.localeCompare(a.added) || b.popularity - a.popularity : sort === "price" ? a.price - b.price : a.name.localeCompare(b.name)),
  [items, cat, sort, q]);
  const chip = (on: boolean) => `shrink-0 rounded-full px-4 py-2 text-sm transition active:scale-95 ${on ? "bg-white font-medium text-zinc-950" : "border border-white/10 text-zinc-400"}`;

  const setup = (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-cyan-500/5 p-5">
      <p className="text-sm font-semibold text-white">Done-for-you setup</p>
      <p className="mt-2 text-sm text-zinc-400">Your logo, colours, photos and text added, then deployed on your domain.</p>
      <ul className="mt-4 grid grid-cols-2 gap-1.5 text-xs text-zinc-300 lg:grid-cols-1">{["Custom branding", "Mobile-ready", "Figma file included", "Source code included"].map((f) => <li key={f}>✓ {f}</li>)}</ul>
    </div>
  );

  return (
    <div className="container-x mt-10 sm:mt-14">
      {/* phones: compact sticky filter bar */}
      <div className="mb-6 space-y-3 lg:hidden">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["All", ...categories].map((c) => <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c} <span className="opacity-50">{c === "All" ? items.length : counts[c]}</span></button>)}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500"><span className="text-white">{shown.length}</span> templates</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-zinc-300 outline-none">{(Object.keys(sorts) as Sort[]).map((s) => <option key={s} value={s} className="text-black">{sorts[s]}</option>)}</select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden space-y-8 lg:sticky lg:top-28 lg:block lg:self-start">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates…" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-accent" />
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">Categories</p>
            <ul className="space-y-1">
              {["All", ...categories].map((c) => (
                <li key={c}><button onClick={() => setCat(c)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${cat === c ? "bg-white text-zinc-950" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>{c}<span className={`text-xs ${cat === c ? "text-zinc-500" : "text-zinc-600"}`}>{c === "All" ? items.length : counts[c]}</span></button></li>
              ))}
            </ul>
          </div>
          {setup}
        </aside>

        <div>
          <div className="mb-6 hidden flex-wrap items-center justify-between gap-3 lg:flex">
            <p className="text-sm text-zinc-500"><span className="text-white">{shown.length}</span> results</p>
            <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 text-sm">
              {(Object.keys(sorts) as Sort[]).map((s) => <button key={s} onClick={() => setSort(s)} className={`rounded-full px-3 py-1.5 transition ${sort === s ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"}`}>{sorts[s]}</button>)}
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">{shown.map((t, i) => <Card key={t.slug} t={t} i={i} />)}</div>
          {!shown.length && <p className="py-20 text-center text-zinc-500">No templates match your search.</p>}
          <div className="mt-12 lg:hidden">{setup}</div>
        </div>
      </div>
    </div>
  );
}
