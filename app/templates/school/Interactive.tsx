"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { school } from "./data";

const GOLD = "#f5c542";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setSolid(window.scrollY > 60); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const links = ["About", "Programmes", "Life", "News", "Admissions"];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${solid ? "bg-[#06080f]/85 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 text-white sm:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full font-display text-lg italic text-[#06080f]" style={{ background: GOLD }}>K</span>
          <span className="font-display text-2xl">{school.short}<span className="italic" style={{ color: GOLD }}>.</span></span>
        </a>
        <nav className="hidden gap-10 text-sm text-white/65 lg:flex">{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="transition hover:text-white">{l}</a>)}</nav>
        <a href="#admissions" className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm transition hover:border-transparent hover:text-[#06080f] sm:flex" onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
          <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full opacity-75" style={{ background: GOLD }} /><span className="relative h-2 w-2 rounded-full" style={{ background: GOLD }} /></span>Apply 2027
        </a>
        <button onClick={() => setOpen(!open)} className="text-2xl lg:hidden" aria-label="Menu">{open ? "✕" : "☰"}</button>
      </div>
      {open && <div className="bg-[#06080f] px-5 pb-6 lg:hidden">{links.map((l) => <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block border-b border-white/10 py-4 font-display text-3xl text-white">{l}</a>)}</div>}
    </header>
  );
}

export function HeroTitle() {
  const lines = [["We", "raise"], ["thinkers,", "makers"], ["&", "leaders."]];
  let n = 0;
  return (
    <h1 className="font-display text-[15vw] font-light leading-[0.88] tracking-[-0.03em] text-white sm:text-[11vw] xl:text-[10.5rem]">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w) => { const i = n++; const accent = w === "leaders." || w === "makers"; return (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className={`inline-block animate-[rise_1.1s_cubic-bezier(.16,1,.3,1)_both] ${accent ? "italic" : ""}`} style={{ animationDelay: `${200 + i * 110}ms`, color: accent ? GOLD : undefined }}>{w}&nbsp;</span>
            </span>); })}
        </span>
      ))}
    </h1>
  );
}

export function SpinBadge() {
  const text = "ADMISSIONS OPEN · 2027 INTAKE · ";
  return (
    <a href="#admissions" className="group relative grid h-36 w-36 place-items-center" aria-label="Admissions open">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_14s_linear_infinite]">
        <defs><path id="circ" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" /></defs>
        <text fontSize="8.4" letterSpacing="2.2" fill="white"><textPath href="#circ">{text}{text}</textPath></text>
      </svg>
      <span className="grid h-16 w-16 place-items-center rounded-full text-2xl text-[#06080f] transition duration-500 group-hover:rotate-[-45deg] group-hover:scale-110" style={{ background: GOLD }}>→</span>
    </a>
  );
}

export function Programmes() {
  const [a, setA] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
      <div className="border-t border-white/10">
        {school.programs.map((p, i) => (
          <button key={p.key} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className="group block w-full border-b border-white/10 py-7 text-left">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-xs text-white/35">0{i + 1}</span>
              <span className={`flex-1 font-display text-4xl transition duration-500 sm:text-6xl ${a === i ? "translate-x-3 italic text-white" : "text-white/30"}`}>{p.name}</span>
              <span className="hidden text-sm text-white/45 sm:block">{p.ages}</span>
            </div>
            <div className={`grid transition-all duration-500 ${a === i ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden pl-12">
                <p className="max-w-lg text-white/60">{p.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.points.map((pt) => <span key={pt} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{pt}</span>)}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2px] lg:block">
        {school.programs.map((p, i) => <Image key={p.key} src={p.img} alt={p.name} fill sizes="40vw" className={`object-cover transition-all duration-[900ms] ${a === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />)}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-6"><p className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD }}>{school.programs[a].ages}</p></div>
      </div>
    </div>
  );
}

export function DayStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 420, behavior: "smooth" });
  return (
    <div>
      <div className="mb-8 flex justify-end gap-2 px-5 sm:px-10">
        {[-1, 1].map((d) => <button key={d} onClick={() => scroll(d)} aria-label={d < 0 ? "Previous" : "Next"} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition hover:border-transparent hover:bg-white hover:text-black">{d < 0 ? "←" : "→"}</button>)}
      </div>
      <div ref={ref} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden">
        {school.day.map((d, i) => (
          <figure key={d.time} className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[380px]">
            <Image src={d.img} alt={d.title} fill sizes="380px" className="object-cover transition duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
            <span className="absolute left-5 top-5 font-mono text-xs text-white/70">{String(i + 1).padStart(2, "0")} / {String(school.day.length).padStart(2, "0")}</span>
            <figcaption className="absolute inset-x-5 bottom-5">
              <p className="font-display text-6xl italic" style={{ color: GOLD }}>{d.time}</p>
              <p className="mt-1 text-xl text-white">{d.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="font-display text-5xl text-white">Thank you. <em style={{ color: GOLD }}>We&apos;ll call you within a day.</em></p>;
  const f = "w-full border-b border-white/20 bg-transparent py-4 text-lg text-white outline-none transition placeholder:text-white/35 focus:border-[#f5c542]";
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-6 sm:grid-cols-2">
      <input required placeholder="Parent / guardian name" className={f} />
      <input required type="tel" placeholder="Phone" className={f} />
      <input type="email" placeholder="Email" className={f} />
      <select className={`${f} [&>option]:text-black`} defaultValue=""><option value="" disabled>Programme</option>{school.programs.map((p) => <option key={p.key}>{p.name}</option>)}</select>
      <button className="group mt-4 flex items-center gap-4 justify-self-start rounded-full px-8 py-4 font-semibold text-[#06080f] transition hover:gap-6" style={{ background: GOLD }}>Request a callback <span>→</span></button>
    </form>
  );
}
