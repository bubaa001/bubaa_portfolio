"use client";
import Image from "next/image";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { categories, fmt, hero, products, reviews, store, type Product } from "./data";

/* ------------------------------ cart ------------------------------ */
type Line = { id: string; size: number; qty: number };
type Cart = { lines: Line[]; add: (id: string, size: number) => void; setQty: (i: number, q: number) => void; open: boolean; setOpen: (o: boolean) => void };
const CartCtx = createContext<Cart | null>(null);
const useCart = () => useContext(CartCtx)!;
const byId = (id: string) => products.find((p) => p.id === id)!;

function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { try { const s = localStorage.getItem("stryde-cart"); if (s) setLines(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("stryde-cart", JSON.stringify(lines)); } catch {} }, [lines]);
  const add = (id: string, size: number) => {
    setLines((ls) => { const i = ls.findIndex((l) => l.id === id && l.size === size); if (i >= 0) { const c = [...ls]; c[i] = { ...c[i], qty: c[i].qty + 1 }; return c; } return [...ls, { id, size, qty: 1 }]; });
    setOpen(true);
  };
  const setQty = (i: number, q: number) => setLines((ls) => (q <= 0 ? ls.filter((_, n) => n !== i) : ls.map((l, n) => (n === i ? { ...l, qty: q } : l))));
  return <CartCtx.Provider value={{ lines, add, setQty, open, setOpen }}>{children}</CartCtx.Provider>;
}

function CartDrawer() {
  const { lines, setQty, open, setOpen } = useCart();
  const total = lines.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
  const msg = encodeURIComponent(`Hello ${store.name}! I'd like to order:\n${lines.map((l) => `• ${byId(l.id).name}, size ${l.size} × ${l.qty} = ${fmt(byId(l.id).price * l.qty)}`).join("\n")}\nTotal: ${fmt(total)}\nDelivery to: `);
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm transition duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed bottom-0 right-0 top-0 z-[71] flex w-full max-w-md flex-col bg-[#f4f1ec] text-[#0d0d0d] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-black/10 p-6"><p className="font-display text-3xl uppercase">Your bag <span className="text-black/35">({lines.reduce((a, l) => a + l.qty, 0)})</span></p><button onClick={() => setOpen(false)} className="text-2xl" aria-label="Close bag">✕</button></div>
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {!lines.length && <div className="pt-20 text-center"><p className="font-display text-5xl uppercase text-black/15">Empty</p><p className="mt-3 text-black/50">Your next favourite pair is one click away.</p></div>}
          {lines.map((l, i) => { const p = byId(l.id); return (
            <div key={l.id + l.size} className="flex gap-4 rounded-2xl bg-white p-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl" style={{ background: p.bg ?? "#e8e5e1" }}><Image src={p.img} alt={p.name} fill sizes="96px" className="object-cover" /></div>
              <div className="flex flex-1 flex-col"><p className="font-semibold leading-tight">{p.name}</p><p className="text-sm text-black/50">Size {l.size}</p>
                <div className="mt-auto flex items-center justify-between"><div className="flex items-center rounded-full border border-black/15"><button onClick={() => setQty(i, l.qty - 1)} className="h-8 w-8" aria-label="Decrease">−</button><span className="w-6 text-center text-sm">{l.qty}</span><button onClick={() => setQty(i, l.qty + 1)} className="h-8 w-8" aria-label="Increase">+</button></div><p className="font-semibold">{fmt(p.price * l.qty)}</p></div>
              </div>
            </div>); })}
        </div>
        {!!lines.length && (
          <div className="space-y-3 border-t border-black/10 p-6">
            <div className="flex justify-between text-sm text-black/60"><span>Delivery ({store.city})</span><span>Free</span></div>
            <div className="flex justify-between text-xl font-semibold"><span>Total</span><span>{fmt(total)}</span></div>
            <a href={`https://wa.me/${store.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] py-4 font-semibold text-black transition hover:brightness-95">Order on WhatsApp</a>
            <button className="w-full rounded-full bg-[#0d0d0d] py-4 font-semibold text-white transition hover:bg-black/80">Pay with M-Pesa · Card</button>
            <p className="text-center text-xs text-black/40">Secure checkout · 30-day exchanges</p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ------------------------------ nav ------------------------------ */
function Nav({ ink }: { ink: "light" | "dark" }) {
  const { lines, setOpen } = useCart();
  const [solid, setSolid] = useState(false);
  useEffect(() => { const f = () => setSolid(window.scrollY > 80); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const c = solid ? "text-white" : ink === "light" ? "text-white" : "text-[#0d0d0d]";
  const n = lines.reduce((a, l) => a + l.qty, 0);
  return (
    <header className={`fixed inset-x-0 top-9 z-50 transition-all duration-500 ${solid ? "!top-0 bg-[#0d0d0d]/90 backdrop-blur-xl" : ""}`}>
      <div className={`mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 transition-colors duration-700 sm:px-10 ${c}`}>
        <a href="#" className="font-display text-3xl tracking-wide">{store.name}</a>
        <nav className="hidden gap-8 text-sm font-medium lg:flex">{["New drops", "Men", "Women", "Running", "Sale"].map((l) => <a key={l} href="#shop" className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full">{l}</a>)}</nav>
        <div className="flex items-center gap-4">
          <a href="#shop" aria-label="Search" className="hidden sm:block"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></a>
          <button onClick={() => setOpen(true)} className="relative flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm font-semibold" aria-label="Open bag">
            Bag <span key={n} className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${n ? "animate-[pop_.4s] bg-[#ff4d1f] text-white" : "border border-current"}`}>{n}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */
function Hero({ idx, setIdx }: { idx: number; setIdx: (i: number) => void }) {
  const { add } = useCart();
  const cw = hero.colorways[idx];
  const [size, setSize] = useState(42);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const dark = cw.ink === "dark";
  useEffect(() => { const t = setInterval(() => setIdx((idx + 1) % hero.colorways.length), 6500); return () => clearInterval(t); }, [idx, setIdx]);
  return (
    <section
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }}
      className={`relative flex min-h-[calc(100svh-36px)] flex-col overflow-hidden pt-20 transition-colors duration-700 ${dark ? "text-[#0d0d0d]" : "text-white"}`}
      style={{ background: cw.bg }}
    >
      {/* giant wordmark behind the shoe */}
      {/* the shoe (same background colour → looks cut out) */}
      <div className="relative mx-auto my-auto h-[min(46svh,62vw)] w-[min(1100px,96vw)]" style={{ transform: `translate(${tilt.x * 30}px, ${tilt.y * 20}px) rotate(${tilt.x * 4}deg)`, transition: "transform .4s cubic-bezier(.16,1,.3,1)" }}>
        {hero.colorways.map((c, i) => (
          <Image key={c.key} src={c.img} alt={`${hero.name} ${c.name}`} fill priority={i === 0} sizes="(min-width:1100px) 1100px, 96vw"
            className={`object-contain transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${i === idx ? "translate-x-0 rotate-0 opacity-100" : i < idx ? "-translate-x-[30%] -rotate-12 opacity-0" : "translate-x-[30%] rotate-12 opacity-0"}`}
            style={{ animation: i === idx ? "floaty 5s ease-in-out infinite" : undefined }} />
        ))}
      </div>
      <p aria-hidden className={`pointer-events-none absolute inset-x-0 top-1/2 hidden sm:block z-10 -translate-y-[62%] select-none text-center font-display text-[27vw] leading-none tracking-tight transition-[transform,color] duration-700 ${dark ? "text-black/[0.09] mix-blend-multiply" : "text-white/35 mix-blend-overlay"}`} style={{ translate: `${tilt.x * -50}px 0` }}>{store.name}</p>
      {/* info bar */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1500px] gap-6 px-5 pb-8 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div key={cw.key} className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] opacity-70">New drop · {cw.name}</p>
          <h1 className="mt-2 font-display text-6xl uppercase leading-[0.9] sm:text-7xl">{hero.name}</h1>
          <p className="mt-3 text-2xl font-semibold">{fmt(hero.price)}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            {hero.colorways.map((c, i) => (
              <button key={c.key} onClick={() => setIdx(i)} aria-label={c.name} className={`h-11 w-11 rounded-full border-2 p-0.5 transition duration-300 ${i === idx ? "scale-110 border-current" : "border-transparent hover:scale-105"}`}>
                <span className="block h-full w-full rounded-full border-2" style={{ background: c.bg, borderColor: dark ? "#0d0d0d22" : "#ffffff55" }} />
              </button>
            ))}
          </div>
          <p className="font-mono text-xs opacity-60">0{idx + 1} / 0{hero.colorways.length}</p>
        </div>
        <div className="lg:justify-self-end">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {hero.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`h-10 w-11 rounded-lg border text-sm font-semibold transition ${size === s ? (dark ? "border-[#0d0d0d] bg-[#0d0d0d] text-white" : "border-white bg-white text-[#0d0d0d]") : "border-current/30 hover:border-current"}`} style={{ borderColor: size === s ? undefined : dark ? "#0d0d0d40" : "#ffffff55" }}>{s}</button>)}
          </div>
          <button onClick={() => add(`aero-${cw.key}`, size)} className={`group flex w-full items-center justify-between gap-6 rounded-full px-7 py-4 font-semibold transition hover:scale-[1.02] ${dark ? "bg-[#0d0d0d] text-white" : "bg-white text-[#0d0d0d]"}`}>
            Add to bag · size {size}<span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- categories --------------------------- */
function Categories() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <section className="relative bg-[#0d0d0d] px-5 py-28 text-white sm:px-10" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-white/40">(01) Shop by category</p>
        <div className="border-t border-white/10">
          {categories.map((c, i) => (
            <a key={c.name} href="#shop" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group flex items-baseline justify-between border-b border-white/10 py-5">
              <span className={`font-display text-6xl uppercase leading-none transition duration-500 sm:text-[9rem] ${hover === null || hover === i ? "text-white" : "text-white/15"} group-hover:translate-x-4 group-hover:text-[#ff4d1f]`}>{c.name}</span>
              <span className="font-mono text-sm text-white/40">{c.count} styles ↗</span>
            </a>
          ))}
        </div>
      </div>
      {/* cursor-following preview */}
      <div className="pointer-events-none fixed left-0 top-0 z-40 hidden h-64 w-80 overflow-hidden rounded-2xl shadow-2xl transition-[opacity,transform] duration-300 lg:block" style={{ transform: `translate(${pos.x + 24}px, ${pos.y - 128}px) rotate(${hover !== null ? -4 : 0}deg) scale(${hover !== null ? 1 : 0.6})`, opacity: hover !== null ? 1 : 0 }}>
        {categories.map((c, i) => <Image key={c.name} src={c.img} alt="" fill sizes="320px" className={`object-cover transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`} />)}
      </div>
    </section>
  );
}

/* ------------------------------ shop ------------------------------ */
function ProductCard({ p, i }: { p: Product; i: number }) {
  const { add } = useCart();
  const [pick, setPick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 }); io.observe(el); return () => io.disconnect(); }, []);
  return (
    <div ref={ref} className={`group transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${vis ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
      <div className="relative aspect-square overflow-hidden rounded-3xl" style={{ background: p.bg ?? "#e8e5e1" }}>
        <Image src={p.img} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-6 group-hover:scale-110" />
        {p.badge && <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase ${p.badge.startsWith("-") ? "bg-[#ff4d1f] text-white" : "bg-[#0d0d0d] text-white"}`}>{p.badge}</span>}
        <div className={`absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 text-[#0d0d0d] backdrop-blur transition duration-500 ${pick ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
          {pick ? (
            <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/50">Select size</p><div className="flex flex-wrap gap-1.5">{p.sizes.map((s) => <button key={s} onClick={() => { add(p.id, s); setPick(false); }} className="h-9 w-10 rounded-lg border border-black/15 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white">{s}</button>)}</div></div>
          ) : (
            <button onClick={() => setPick(true)} className="w-full rounded-xl bg-[#0d0d0d] py-3 text-sm font-semibold text-white">Quick add +</button>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div><p className="font-semibold">{p.name}</p><p className="text-sm text-black/45">{p.cat}</p></div>
        <div className="text-right"><p className="font-semibold">{fmt(p.price)}</p>{p.was && <p className="text-sm text-black/40 line-through">{fmt(p.was)}</p>}</div>
      </div>
    </div>
  );
}

function Shop() {
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.cat)))];
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");
  const list = useMemo(() => {
    const l = products.filter((p) => cat === "All" || p.cat === cat);
    return sort === "low" ? [...l].sort((a, b) => a.price - b.price) : sort === "high" ? [...l].sort((a, b) => b.price - a.price) : l;
  }, [cat, sort]);
  return (
    <section id="shop" className="scroll-mt-16 bg-[#f4f1ec] px-5 py-28 text-[#0d0d0d] sm:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-black/40">(02) The collection</p><h2 className="font-display text-7xl uppercase leading-[0.9] sm:text-9xl">New<br />drops</h2></div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap justify-end gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-[#0d0d0d] text-white" : "bg-black/5 hover:bg-black/10"}`}>{c}</button>)}</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-black/15 bg-transparent px-4 py-2 text-sm font-semibold outline-none"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}</div>
      </div>
    </section>
  );
}

/* ---------------------------- countdown ---------------------------- */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = Math.max(0, new Date(store.nextDrop).getTime() - (now ?? 0));
  const parts = [["Days", Math.floor(left / 864e5)], ["Hours", Math.floor(left / 36e5) % 24], ["Mins", Math.floor(left / 6e4) % 60], ["Secs", Math.floor(left / 1e3) % 60]] as const;
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
      <Image src="/templates/shoes/campaign.jpg" alt="Campaign" fill sizes="100vw" className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
      <div className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">(03) Next drop</p>
        <h2 className="mt-4 max-w-2xl font-display text-7xl uppercase leading-[0.9] sm:text-9xl">The street<br />is <span className="text-[#ff4d1f]">calling.</span></h2>
        <div className="mt-12 flex gap-3 sm:gap-5">
          {parts.map(([l, v]) => <div key={l} className="w-20 rounded-2xl border border-white/15 bg-white/5 py-4 text-center backdrop-blur-md sm:w-28"><p className="font-display text-4xl tabular-nums sm:text-6xl">{now === null ? "--" : String(v).padStart(2, "0")}</p><p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{l}</p></div>)}
        </div>
        {done ? <p className="mt-10 text-lg">You&apos;re on the list. We&apos;ll text you 1 hour before the drop.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }} className="mt-10 flex max-w-md overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Phone or email" className="flex-1 bg-transparent px-6 py-4 outline-none placeholder:text-white/40" />
            <button className="m-1 rounded-full bg-[#ff4d1f] px-6 font-semibold">Notify me</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ page ------------------------------ */
export default function Store() {
  const [idx, setIdx] = useState(0);
  const ink = hero.colorways[idx].ink;
  return (
    <CartProvider>
      <div className="bg-[#0d0d0d] font-[family-name:var(--font-body)] text-white [color-scheme:light] [&_.font-display]:font-[family-name:var(--font-display)]">
        <style>{`@keyframes marquee{to{transform:translateX(-50%)}}@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes pop{0%{transform:scale(.5)}60%{transform:scale(1.35)}100%{transform:scale(1)}}`}</style>
        <div className="relative z-[60] h-9 overflow-hidden bg-[#0d0d0d] text-xs font-semibold uppercase tracking-widest text-white">
          <div className="flex h-full w-max animate-[marquee_25s_linear_infinite] items-center gap-10">{[...store.announcements, ...store.announcements, ...store.announcements, ...store.announcements].map((a, i) => <span key={i} className="flex items-center gap-10">{a}<span className="text-[#ff4d1f]">✦</span></span>)}</div>
        </div>
        <Nav ink={ink} />
        <Hero idx={idx} setIdx={setIdx} />
        <div className="overflow-hidden border-y border-white/10 bg-[#ff4d1f] py-5"><div className="flex w-max animate-[marquee_18s_linear_infinite] gap-12 font-display text-5xl uppercase text-[#0d0d0d]">{Array.from({ length: 8 }).map((_, i) => <span key={i} className="flex items-center gap-12">{store.tagline}<span className="text-white">●</span>Walk different<span className="text-white">●</span></span>)}</div></div>
        <Categories />
        <Shop />
        <Countdown />
        <section className="bg-[#f4f1ec] px-5 py-28 text-[#0d0d0d] sm:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><h2 className="font-display text-7xl uppercase leading-[0.9] sm:text-9xl">4.9<span className="text-[#ff4d1f]">★</span></h2><p className="max-w-sm text-black/55">From 2,300+ reviews by people who walk {store.city} every day.</p></div>
            <div className="grid gap-5 md:grid-cols-4">{reviews.map((r) => <figure key={r.name} className="flex flex-col justify-between rounded-3xl bg-white p-7 transition duration-500 hover:-translate-y-2 hover:shadow-xl"><p className="text-[#ff4d1f]">★★★★★</p><blockquote className="mt-4 text-lg leading-snug">&ldquo;{r.text}&rdquo;</blockquote><figcaption className="mt-6 text-sm"><b>{r.name}</b> <span className="text-black/45">· {r.city}</span></figcaption></figure>)}</div>
          </div>
        </section>
        <footer className="bg-[#0d0d0d] px-5 pb-28 pt-20 sm:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-4">
              <div className="md:col-span-2"><p className="text-2xl font-semibold">Get first access to every drop.</p><form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-md border-b border-white/30"><input placeholder="Email address" className="flex-1 bg-transparent py-3 outline-none placeholder:text-white/40" /><button className="font-semibold">Join →</button></form></div>
              <div className="text-sm text-white/55"><p className="mb-3 font-semibold text-white">Help</p><p>Delivery</p><p>Exchanges</p><p>Size guide</p><p>Contact us</p></div>
              <div className="text-sm text-white/55"><p className="mb-3 font-semibold text-white">We accept</p><div className="flex flex-wrap gap-2">{["M-Pesa", "Tigo Pesa", "Airtel Money", "Visa", "Mastercard"].map((m) => <span key={m} className="rounded-md border border-white/15 px-2 py-1 text-xs">{m}</span>)}</div></div>
            </div>
            <p className="mt-10 font-display text-[26vw] uppercase leading-[0.8] tracking-tight text-white sm:text-[22vw]">{store.name}</p>
            <div className="mt-8 flex flex-wrap justify-between gap-4 text-xs text-white/40"><span>© {new Date().getFullYear()} {store.name}. {store.city}.</span><span>Privacy · Terms</span></div>
          </div>
        </footer>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
