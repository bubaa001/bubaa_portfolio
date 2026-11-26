"use client";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { categories, fmt, hero, products, reviews, store, type Product } from "./data";

/* ----------------------------- helpers ----------------------------- */
const byId = (id: string) => products.find((p) => p.id === id)!;
const buzz = (ms = 25) => { try { navigator.vibrate?.(ms); } catch {} };
function useIsTouch() {
  const [t, setT] = useState(false);
  useEffect(() => { const m = window.matchMedia("(hover: none)"); setT(m.matches); const f = () => setT(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return t;
}

/* ------------------------------- cart ------------------------------- */
type Line = { id: string; size: number; qty: number };
type Cart = {
  lines: Line[]; add: (id: string, size: number) => void; setQty: (i: number, q: number) => void;
  open: boolean; setOpen: (o: boolean) => void; pick: Product | null; setPick: (p: Product | null) => void; toast: string; bump: number;
};
const CartCtx = createContext<Cart | null>(null);
const useCart = () => useContext(CartCtx)!;

function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [bump, setBump] = useState(0);
  useEffect(() => { try { const s = localStorage.getItem("stryde-cart"); if (s) setLines(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("stryde-cart", JSON.stringify(lines)); } catch {} }, [lines]);
  const add = useCallback((id: string, size: number) => {
    setLines((ls) => { const i = ls.findIndex((l) => l.id === id && l.size === size); if (i >= 0) { const c = [...ls]; c[i] = { ...c[i], qty: c[i].qty + 1 }; return c; } return [...ls, { id, size, qty: 1 }]; });
    setBump((b) => b + 1); buzz(30);
    if (window.matchMedia("(hover: none)").matches) { setToast(`${byId(id).name} · size ${size}`); setTimeout(() => setToast(""), 2200); } else setOpen(true);
  }, []);
  const setQty = (i: number, q: number) => setLines((ls) => (q <= 0 ? ls.filter((_, n) => n !== i) : ls.map((l, n) => (n === i ? { ...l, qty: q } : l))));
  return <CartCtx.Provider value={{ lines, add, setQty, open, setOpen, pick, setPick, toast, bump }}>{children}</CartCtx.Provider>;
}

/* bag: right drawer on desktop, swipe-to-close bottom sheet on phones */
function CartDrawer() {
  const { lines, setQty, open, setOpen } = useCart();
  const [drag, setDrag] = useState(0);
  const y0 = useRef<number | null>(null);
  const total = lines.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
  const msg = encodeURIComponent(`Hello ${store.name}! I'd like to order:\n${lines.map((l) => `• ${byId(l.id).name}, size ${l.size} × ${l.qty} = ${fmt(byId(l.id).price * l.qty)}`).join("\n")}\nTotal: ${fmt(total)}\nDelivery to: `);
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm transition duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside
        onTouchStart={(e) => { y0.current = e.touches[0].clientY; }}
        onTouchMove={(e) => { if (y0.current !== null) setDrag(Math.max(0, e.touches[0].clientY - y0.current)); }}
        onTouchEnd={() => { if (drag > 110) setOpen(false); setDrag(0); y0.current = null; }}
        style={{ transform: drag ? `translateY(${drag}px)` : undefined }}
        className={`fixed inset-x-0 bottom-0 z-[71] flex max-h-[88svh] flex-col rounded-t-[28px] bg-[#f4f1ec] text-[#0d0d0d] shadow-2xl ${drag ? "" : "transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"} sm:inset-x-auto sm:right-0 sm:top-0 sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-0"}`}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-black/15 sm:hidden" />
        <div className="flex items-center justify-between border-b border-black/10 p-6"><p className="font-display text-3xl uppercase">Your bag <span className="text-black/35">({lines.reduce((a, l) => a + l.qty, 0)})</span></p><button onClick={() => setOpen(false)} className="text-2xl" aria-label="Close bag">✕</button></div>
        <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-6">
          {!lines.length && <div className="py-16 text-center"><p className="font-display text-5xl uppercase text-black/15">Empty</p><p className="mt-3 text-black/50">Your next favourite pair is one tap away.</p></div>}
          {lines.map((l, i) => { const p = byId(l.id); return (
            <div key={l.id + l.size} className="flex animate-[fadeUp_.4s_both] gap-4 rounded-2xl bg-white p-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl" style={{ background: p.bg ?? "#e8e5e1" }}><Image src={p.img} alt={p.name} fill sizes="96px" className="object-cover" /></div>
              <div className="flex flex-1 flex-col"><p className="font-semibold leading-tight">{p.name}</p><p className="text-sm text-black/50">Size {l.size}</p>
                <div className="mt-auto flex items-center justify-between"><div className="flex items-center rounded-full border border-black/15"><button onClick={() => { setQty(i, l.qty - 1); buzz(); }} className="h-9 w-9" aria-label="Decrease">−</button><span className="w-6 text-center text-sm">{l.qty}</span><button onClick={() => { setQty(i, l.qty + 1); buzz(); }} className="h-9 w-9" aria-label="Increase">+</button></div><p className="font-semibold">{fmt(p.price * l.qty)}</p></div>
              </div>
            </div>); })}
        </div>
        {!!lines.length && (
          <div className="space-y-3 border-t border-black/10 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="flex justify-between text-sm text-black/60"><span>Delivery ({store.city})</span><span>Free</span></div>
            <div className="flex justify-between text-xl font-semibold"><span>Total</span><span>{fmt(total)}</span></div>
            <a href={`https://wa.me/${store.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] py-4 font-semibold text-black transition active:scale-[.98]">Order on WhatsApp</a>
            <button className="w-full rounded-full bg-[#0d0d0d] py-4 font-semibold text-white transition active:scale-[.98]">Pay with M-Pesa · Card</button>
          </div>
        )}
      </aside>
    </>
  );
}

/* size picker bottom sheet (phones) */
function SizeSheet() {
  const { pick, setPick, add } = useCart();
  return (
    <>
      <div onClick={() => setPick(null)} className={`fixed inset-0 z-[72] bg-black/40 transition duration-300 ${pick ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <div className={`fixed inset-x-0 bottom-0 z-[73] rounded-t-[28px] bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-[#0d0d0d] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${pick ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/15" />
        {pick && (
          <>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl" style={{ background: pick.bg ?? "#e8e5e1" }}><Image src={pick.img} alt="" fill sizes="80px" className="object-cover" /></div>
              <div><p className="font-semibold">{pick.name}</p><p className="text-black/50">{fmt(pick.price)}</p></div>
            </div>
            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-black/45">Choose your size (EU)</p>
            <div className="grid grid-cols-4 gap-2">{pick.sizes.map((s, i) => <button key={s} onClick={() => { add(pick.id, s); setPick(null); }} className="h-14 animate-[fadeUp_.35s_both] rounded-2xl border border-black/15 text-lg font-semibold transition active:scale-90 active:bg-black active:text-white" style={{ animationDelay: `${i * 30}ms` }}>{s}</button>)}</div>
          </>
        )}
      </div>
    </>
  );
}

/* "added" toast + floating bag pill (phones) */
function MobileBagBar() {
  const { lines, setOpen, toast, bump } = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > window.innerHeight * 0.7); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const n = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
  return (
    <>
      <div className={`fixed inset-x-4 top-4 z-[80] flex items-center gap-3 rounded-2xl bg-[#0d0d0d] p-3 pr-4 text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:hidden ${toast ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff4d1f] text-lg">✓</span>
        <div className="min-w-0 flex-1"><p className="text-xs text-white/55">Added to bag</p><p className="truncate text-sm font-semibold">{toast}</p></div>
        <button onClick={() => setOpen(true)} className="text-sm font-semibold underline underline-offset-4">View</button>
      </div>
      <button onClick={() => setOpen(true)} className={`fixed bottom-[4.6rem] left-4 right-4 z-[65] flex items-center justify-between rounded-full bg-[#ff4d1f] px-6 py-4 font-semibold text-white shadow-2xl shadow-[#ff4d1f]/30 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[.98] sm:hidden ${show && n ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
        <span className="flex items-center gap-3"><span key={bump} className="grid h-7 min-w-7 animate-[pop_.45s] place-items-center rounded-full bg-white px-1.5 text-sm text-[#ff4d1f]">{n}</span>View bag</span><span>{fmt(total)}</span>
      </button>
    </>
  );
}

/* -------------------------------- nav -------------------------------- */
function Nav({ ink }: { ink: "light" | "dark" }) {
  const { lines, setOpen, bump } = useCart();
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
          <button key={bump} onClick={() => setOpen(true)} className={`relative flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm font-semibold ${bump ? "animate-[wiggle_.5s]" : ""}`} aria-label="Open bag">
            Bag <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${n ? "bg-[#ff4d1f] text-white" : "border border-current"}`}>{n}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- hero -------------------------------- */
const ROTATE_MS = 6500;
function Hero({ idx, setIdx }: { idx: number; setIdx: (i: number) => void }) {
  const { add } = useCart();
  const cw = hero.colorways[idx];
  const N = hero.colorways.length;
  const [size, setSize] = useState(42);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spin, setSpin] = useState(0);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const dark = cw.ink === "dark";
  const go = useCallback((d: number) => { setIdx((idx + d + N) % N); buzz(15); }, [idx, N, setIdx]);

  // autoplay (pauses while the user touches the hero)
  useEffect(() => { if (paused) return; const t = setTimeout(() => setIdx((idx + 1) % N), ROTATE_MS); return () => clearTimeout(t); }, [idx, paused, N, setIdx]);
  // phone tilt → parallax (Android immediately; iOS after first tap grants permission)
  useEffect(() => {
    const f = (e: DeviceOrientationEvent) => { if (e.gamma == null || e.beta == null) return; setTilt({ x: Math.max(-0.5, Math.min(0.5, e.gamma / 50)), y: Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 70)) }); };
    window.addEventListener("deviceorientation", f);
    return () => window.removeEventListener("deviceorientation", f);
  }, []);
  const askMotion = () => {
    const D = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
    D?.requestPermission?.().catch(() => {});
  };

  return (
    <section
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() }; setPaused(true); askMotion(); }}
      onTouchMove={(e) => { const s = touch.current; if (!s) return; const dx = e.touches[0].clientX - s.x; if (Math.abs(dx) > Math.abs(e.touches[0].clientY - s.y)) setDrag(dx); }}
      onTouchEnd={() => { if (Math.abs(drag) > 60) go(drag < 0 ? 1 : -1); setDrag(0); touch.current = null; setPaused(false); }}
      className={`relative flex min-h-[calc(100svh-36px)] touch-pan-y flex-col overflow-hidden pt-[4.5rem] sm:pt-20 transition-colors duration-700 ${dark ? "text-[#0d0d0d]" : "text-white"}`}
      style={{ background: cw.bg }}
    >
      {/* story-style progress bars (phones) */}
      <div className="absolute inset-x-5 top-[4.6rem] z-20 flex gap-1.5 sm:hidden">
        {hero.colorways.map((c, i) => (
          <div key={c.key} className="h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: dark ? "#0d0d0d26" : "#ffffff40" }}>
            <div key={i === idx ? `${idx}-${paused}` : i} className="h-full rounded-full" style={{ background: dark ? "#0d0d0d" : "#fff", width: i < idx ? "100%" : i > idx ? "0%" : undefined, animation: i === idx ? `fill ${ROTATE_MS}ms linear forwards` : undefined, animationPlayState: paused ? "paused" : "running" }} />
          </div>
        ))}
      </div>

      {/* the shoe */}
      <button
        onClick={() => { setSpin((s) => s + 1); buzz(20); }}
        aria-label="Spin the shoe"
        className="relative mx-auto my-auto block h-[min(32svh,70vw)] w-full [@media(max-height:700px)]:h-[26svh] sm:h-[min(46svh,62vw)] sm:w-[min(1100px,96vw)]"
        style={{ transform: `translate(${tilt.x * 30 + drag * 0.6}px, ${tilt.y * 20}px) rotate(${tilt.x * 4 + drag / 25}deg)`, transition: drag ? "none" : "transform .45s cubic-bezier(.16,1,.3,1)" }}
      >
        <span key={spin} className={`absolute inset-0 block ${spin ? "animate-[hop_.8s_cubic-bezier(.16,1,.3,1)]" : ""}`}>
          {hero.colorways.map((c, i) => (
            <Image key={c.key} src={c.img} alt={`${hero.name} ${c.name}`} fill priority={i === 0} sizes="(min-width:1100px) 1100px, 100vw"
              className={`object-contain transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${i === idx ? "translate-x-0 rotate-0 opacity-100" : i < idx ? "-translate-x-[30%] -rotate-12 opacity-0" : "translate-x-[30%] rotate-12 opacity-0"}`}
              style={{ animation: i === idx ? "floaty 5s ease-in-out infinite" : undefined }} />
          ))}
        </span>
      </button>
      <p className="pointer-events-none -mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] opacity-55 sm:hidden [@media(max-height:700px)]:hidden">← Swipe colours · tap to spin →</p>

      <p aria-hidden className={`pointer-events-none absolute inset-x-0 top-[38%] z-10 select-none [@media(max-height:700px)]:hidden text-center font-display text-[34vw] leading-none tracking-tight transition-[color] duration-700 sm:top-1/2 sm:-translate-y-[62%] sm:text-[27vw] ${dark ? "text-black/[0.09] mix-blend-multiply" : "text-white/35 mix-blend-overlay"}`} style={{ translate: `${tilt.x * -50 - drag * 0.25}px 0` }}>{store.name}</p>

      {/* info bar */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1500px] grid-cols-[minmax(0,1fr)] gap-4 px-5 pb-5 pt-3 lg:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:px-10 sm:pb-8 lg:items-end">
        <div key={cw.key} className="flex min-w-0 items-end justify-between gap-4 lg:block">
          <div className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70 sm:text-sm">New drop · {cw.name}</p>
            <h1 className="mt-1 font-display text-5xl uppercase leading-[0.9] sm:mt-2 sm:text-7xl">{hero.name}</h1>
          </div>
          <p className="shrink-0 animate-[fadeUp_.7s_.1s_both] text-lg font-semibold sm:text-2xl lg:mt-3">{fmt(hero.price)}</p>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3 lg:flex-col">
          <div className="flex gap-3">
            {hero.colorways.map((c, i) => (
              <button key={c.key} onClick={() => { setIdx(i); buzz(15); }} aria-label={c.name} className={`h-11 w-11 rounded-full border-2 p-0.5 transition duration-300 active:scale-90 ${i === idx ? "scale-110 border-current" : "border-transparent hover:scale-105"}`}>
                <span className="block h-full w-full rounded-full border-2" style={{ background: c.bg, borderColor: dark ? "#0d0d0d22" : "#ffffff55" }} />
              </button>
            ))}
          </div>
          <p className="font-mono text-xs opacity-60">0{idx + 1} / 0{N}</p>
        </div>
        <div className="min-w-0 lg:justify-self-end">
          <div className="-mx-5 mb-3 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {hero.sizes.map((s) => <button key={s} onClick={() => { setSize(s); buzz(10); }} className={`h-11 w-12 shrink-0 rounded-xl border text-sm font-semibold transition active:scale-90 sm:h-10 sm:w-11 sm:rounded-lg ${size === s ? (dark ? "border-[#0d0d0d] bg-[#0d0d0d] text-white" : "border-white bg-white text-[#0d0d0d]") : ""}`} style={{ borderColor: size === s ? undefined : dark ? "#0d0d0d40" : "#ffffff55" }}>{s}</button>)}
          </div>
          <button onClick={() => add(`aero-${cw.key}`, size)} className={`group flex w-full items-center justify-between gap-6 rounded-full px-7 py-4 font-semibold transition hover:scale-[1.02] active:scale-[.97] ${dark ? "bg-[#0d0d0d] text-white" : "bg-white text-[#0d0d0d]"}`}>
            Add to bag · size {size}<span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- categories ----------------------------- */
function Categories() {
  const touchDev = useIsTouch();
  const [hover, setHover] = useState<number | null>(null);
  const [spy, setSpy] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  // phones: the row in the middle of the screen becomes "active" as you scroll
  useEffect(() => {
    if (!touchDev) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setSpy(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-42% 0px -42% 0px" });
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [touchDev]);
  const active = touchDev ? spy : hover;
  return (
    <section className="relative bg-[#0d0d0d] px-5 py-24 text-white sm:px-10 sm:py-28" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-white/40">(01) Shop by category</p>
        <div className="border-t border-white/10">
          {categories.map((c, i) => (
            <a key={c.name} ref={(el) => { rows.current[i] = el; }} data-i={i} href="#shop" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 sm:items-baseline sm:py-5">
              <span className={`font-display text-[15vw] uppercase leading-none transition duration-500 sm:text-[9rem] ${active === null || active === i ? "text-white" : "text-white/15"} ${active === i ? "translate-x-2 !text-[#ff4d1f] sm:translate-x-4" : ""}`}>{c.name}</span>
              {/* phones: inline thumbnail slides in for the active row */}
              <span className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:hidden ${active === i ? "translate-x-0 rotate-[-4deg] opacity-100" : "translate-x-6 opacity-0"}`}>
                <Image src={c.img} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="hidden font-mono text-sm text-white/40 sm:inline">{c.count} styles ↗</span>
            </a>
          ))}
        </div>
      </div>
      {/* desktop: cursor-following preview */}
      <div className="pointer-events-none fixed left-0 top-0 z-40 hidden h-64 w-80 overflow-hidden rounded-2xl shadow-2xl transition-[opacity,transform] duration-300 lg:block" style={{ transform: `translate(${pos.x + 24}px, ${pos.y - 128}px) rotate(${hover !== null ? -4 : 0}deg) scale(${hover !== null ? 1 : 0.6})`, opacity: hover !== null && !touchDev ? 1 : 0 }}>
        {categories.map((c, i) => <Image key={c.name} src={c.img} alt="" fill sizes="320px" className={`object-cover transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`} />)}
      </div>
    </section>
  );
}

/* -------------------------------- shop -------------------------------- */
function ProductCard({ p, i }: { p: Product; i: number }) {
  const { add, setPick } = useCart();
  const [pick, setLocalPick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [press, setPress] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 }); io.observe(el); return () => io.disconnect(); }, []);
  return (
    <div ref={ref} className={`group transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${vis ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
      <div onTouchStart={() => setPress(true)} onTouchEnd={() => setPress(false)} className={`relative aspect-square overflow-hidden rounded-3xl transition-transform duration-300 ${press ? "scale-[.97]" : ""}`} style={{ background: p.bg ?? "#e8e5e1" }}>
        <Image src={p.img} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className={`object-cover transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-6 group-hover:scale-110 ${press ? "-rotate-3 scale-105" : ""}`} />
        {p.badge && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase sm:left-4 sm:top-4 sm:px-3 sm:text-xs ${p.badge.startsWith("-") ? "bg-[#ff4d1f] text-white" : "bg-[#0d0d0d] text-white"}`}>{p.badge}</span>}
        {/* phones: always-visible add button → size sheet */}
        <button onClick={() => { setPick(p); buzz(15); }} aria-label={`Add ${p.name}`} className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[#0d0d0d] text-2xl text-white shadow-lg transition active:scale-90 [@media(hover:hover)]:hidden">+</button>
        {/* desktop: hover quick add */}
        <div className={`absolute inset-x-3 bottom-3 hidden rounded-2xl bg-white/95 p-3 text-[#0d0d0d] backdrop-blur transition duration-500 [@media(hover:hover)]:block ${pick ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
          {pick ? (
            <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/50">Select size</p><div className="flex flex-wrap gap-1.5">{p.sizes.map((s) => <button key={s} onClick={() => { add(p.id, s); setLocalPick(false); }} className="h-9 w-10 rounded-lg border border-black/15 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white">{s}</button>)}</div></div>
          ) : (
            <button onClick={() => setLocalPick(true)} className="w-full rounded-xl bg-[#0d0d0d] py-3 text-sm font-semibold text-white">Quick add +</button>
          )}
        </div>
      </div>
      <div className="mt-3 sm:mt-4 sm:flex sm:items-start sm:justify-between sm:gap-3">
        <div><p className="text-sm font-semibold leading-snug sm:text-base">{p.name}</p><p className="text-xs text-black/45 sm:text-sm">{p.cat}</p></div>
        <div className="mt-1 flex items-baseline gap-2 sm:mt-0 sm:block sm:text-right"><p className="text-sm font-semibold sm:text-base">{fmt(p.price)}</p>{p.was && <p className="text-xs text-black/40 line-through sm:text-sm">{fmt(p.was)}</p>}</div>
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
    <section id="shop" className="scroll-mt-16 bg-[#f4f1ec] px-5 py-24 text-[#0d0d0d] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
          <div><p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-black/40">(02) The collection</p><h2 className="font-display text-7xl uppercase leading-[0.9] sm:text-9xl">New<br />drops</h2></div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
            {/* phones: swipeable filter chips */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-end sm:px-0 [&::-webkit-scrollbar]:hidden">{cats.map((c) => <button key={c} onClick={() => { setCat(c); buzz(10); }} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${cat === c ? "bg-[#0d0d0d] text-white" : "bg-black/5 hover:bg-black/10"}`}>{c}</button>)}</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="self-start rounded-full border border-black/15 bg-transparent px-4 py-2 text-sm font-semibold outline-none sm:self-end"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          </div>
        </div>
        <div key={cat + sort} className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">{list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}</div>
      </div>
    </section>
  );
}

/* ----------------------------- countdown ----------------------------- */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = Math.max(0, new Date(store.nextDrop).getTime() - (now ?? 0));
  const parts = [["Days", Math.floor(left / 864e5)], ["Hours", Math.floor(left / 36e5) % 24], ["Mins", Math.floor(left / 6e4) % 60], ["Secs", Math.floor(left / 1e3) % 60]] as const;
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
      <Image src="/templates/shoes/campaign.jpg" alt="Campaign" fill sizes="100vw" className="object-cover object-[70%_center] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-[#0d0d0d]/20 sm:bg-gradient-to-r sm:via-[#0d0d0d]/60 sm:to-transparent" />
      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-10 sm:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">(03) Next drop</p>
        <h2 className="mt-4 max-w-2xl font-display text-6xl uppercase leading-[0.9] sm:text-9xl">The street<br />is <span className="text-[#ff4d1f]">calling.</span></h2>
        <div className="mt-10 grid max-w-lg grid-cols-4 gap-2 sm:mt-12 sm:flex sm:gap-5">
          {parts.map(([l, v]) => <div key={l} className="rounded-2xl border border-white/15 bg-white/5 py-4 text-center backdrop-blur-md sm:w-28"><p key={String(v)} className="font-display text-4xl tabular-nums sm:text-6xl [animation:tick_.35s_ease-out]">{now === null ? "--" : String(v).padStart(2, "0")}</p><p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{l}</p></div>)}
        </div>
        {done ? <p className="mt-10 animate-[fadeUp_.5s_both] text-lg">You&apos;re on the list. We&apos;ll text you 1 hour before the drop.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) { setDone(true); buzz(40); } }} className="mt-8 flex max-w-md flex-col gap-2 sm:mt-10 sm:flex-row sm:gap-0 sm:overflow-hidden sm:rounded-full sm:border sm:border-white/20 sm:bg-white/5 sm:backdrop-blur-md">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Phone or email" className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 outline-none backdrop-blur-md placeholder:text-white/40 sm:rounded-none sm:border-0 sm:bg-transparent" />
            <button className="rounded-full bg-[#ff4d1f] px-6 py-4 font-semibold transition active:scale-[.98] sm:m-1 sm:py-0">Notify me</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- page -------------------------------- */
export default function Store() {
  const [idx, setIdx] = useState(0);
  const ink = hero.colorways[idx].ink;
  return (
    <CartProvider>
      <div className="bg-[#0d0d0d] font-[family-name:var(--font-body)] text-white [color-scheme:light] [-webkit-tap-highlight-color:transparent] [&_.font-display]:font-[family-name:var(--font-display)]">
        <style>{`@keyframes marquee{to{transform:translateX(-50%)}}@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes pop{0%{transform:scale(.5)}60%{transform:scale(1.35)}100%{transform:scale(1)}}@keyframes fill{from{width:0}to{width:100%}}@keyframes hop{0%{transform:none}30%{transform:translateY(-12%) rotate(-14deg) scale(1.06)}60%{transform:translateY(2%) rotate(6deg)}100%{transform:none}}@keyframes wiggle{0%,100%{transform:none}25%{transform:rotate(-8deg) scale(1.08)}75%{transform:rotate(6deg)}}@keyframes tick{from{transform:translateY(-30%);opacity:.3}to{transform:none;opacity:1}}@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`}</style>
        <div className="relative z-[60] h-9 overflow-hidden bg-[#0d0d0d] text-xs font-semibold uppercase tracking-widest text-white">
          <div className="flex h-full w-max animate-[marquee_25s_linear_infinite] items-center gap-10">{[...store.announcements, ...store.announcements, ...store.announcements, ...store.announcements].map((a, i) => <span key={i} className="flex items-center gap-10">{a}<span className="text-[#ff4d1f]">✦</span></span>)}</div>
        </div>
        <Nav ink={ink} />
        <Hero idx={idx} setIdx={setIdx} />
        <div className="overflow-hidden border-y border-white/10 bg-[#ff4d1f] py-4 sm:py-5"><div className="flex w-max animate-[marquee_18s_linear_infinite] gap-10 font-display text-4xl uppercase text-[#0d0d0d] sm:gap-12 sm:text-5xl">{Array.from({ length: 8 }).map((_, i) => <span key={i} className="flex items-center gap-10 sm:gap-12">{store.tagline}<span className="text-white">●</span>Walk different<span className="text-white">●</span></span>)}</div></div>
        <Categories />
        <Shop />
        <Countdown />
        <section className="bg-[#f4f1ec] py-24 text-[#0d0d0d] sm:px-10 sm:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6 px-5 sm:mb-12 sm:px-0"><h2 className="font-display text-7xl uppercase leading-[0.9] sm:text-9xl">4.9<span className="text-[#ff4d1f]">★</span></h2><p className="max-w-sm text-black/55">From 2,300+ reviews by people who walk {store.city} every day.</p></div>
            {/* phones: swipeable review cards */}
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 md:grid-cols-4 [&::-webkit-scrollbar]:hidden">
              {reviews.map((r) => <figure key={r.name} className="flex w-[82%] shrink-0 snap-center flex-col justify-between rounded-3xl bg-white p-7 transition duration-500 hover:-translate-y-2 hover:shadow-xl sm:w-auto"><p className="text-[#ff4d1f]">★★★★★</p><blockquote className="mt-4 text-lg leading-snug">&ldquo;{r.text}&rdquo;</blockquote><figcaption className="mt-6 text-sm"><b>{r.name}</b> <span className="text-black/45">· {r.city}</span></figcaption></figure>)}
            </div>
          </div>
        </section>
        <footer className="bg-[#0d0d0d] px-5 pb-40 pt-20 sm:px-10 sm:pb-28">
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
        <MobileBagBar />
        <SizeSheet />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
