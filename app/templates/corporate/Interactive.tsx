"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { co } from "./data";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setSolid(window.scrollY > 60); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const links = ["About", "Services", "Projects", "Leadership", "Insights"];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${solid ? "bg-[#0c0c0c]/90 backdrop-blur-lg" : ""}`}>
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 text-white sm:px-10">
        <a href="#" className="flex items-baseline gap-2"><span className="font-display text-3xl">{co.name}</span><span className="h-2 w-2 rounded-full bg-[#c8f169]" /></a>
        <nav className="hidden gap-10 text-sm text-white/70 lg:flex">{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="transition hover:text-white">{l}</a>)}</nav>
        <a href="#contact" className="hidden rounded-full border border-white/25 px-5 py-2.5 text-sm transition hover:bg-white hover:text-black sm:block">Contact us</a>
        <button onClick={() => setOpen(!open)} className="text-2xl lg:hidden" aria-label="Menu">{open ? "✕" : "☰"}</button>
      </div>
      {open && <div className="bg-[#0c0c0c] px-5 pb-6 lg:hidden">{[...links, "Contact"].map((l) => <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block border-b border-white/10 py-4 font-display text-3xl text-white">{l}</a>)}</div>}
    </header>
  );
}

export function HeroTitle() {
  const words = ["Building", "the", "foundations", "of", "Africa's", "next", "century."];
  return (
    <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight text-white sm:text-[9vw] xl:text-[8.5rem]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
          <span className={`inline-block animate-[rise_1s_cubic-bezier(.16,1,.3,1)_both] ${i >= 4 ? "italic text-[#c8f169]" : ""}`} style={{ animationDelay: `${150 + i * 90}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </h1>
  );
}

export function Services() {
  const [a, setA] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div className="divide-y divide-black/10 border-y border-black/10">
        {co.services.map((s, i) => (
          <button key={s.n} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className="group flex w-full items-start gap-6 py-8 text-left">
            <span className={`mt-3 font-mono text-sm transition ${a === i ? "text-black" : "text-black/30"}`}>{s.n}</span>
            <span className="flex-1">
              <span className={`block font-display text-4xl transition duration-500 sm:text-6xl ${a === i ? "translate-x-3 text-black" : "text-black/35"}`}>{s.title}</span>
              <span className={`grid transition-all duration-500 ${a === i ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><span className="overflow-hidden pl-3 text-lg text-black/60">{s.text}</span></span>
            </span>
            <span className={`mt-4 text-2xl transition duration-500 ${a === i ? "rotate-0 text-black" : "-rotate-45 text-black/25"}`}>→</span>
          </button>
        ))}
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
        {co.services.map((s, i) => (
          <Image key={s.n} src={s.img} alt={s.title} fill sizes="40vw" className={`object-cover transition-all duration-700 ${a === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="font-display text-5xl text-white">Thank you. <em className="text-[#c8f169]">We&apos;ll be in touch.</em></p>;
  const field = "w-full border-b border-white/25 bg-transparent py-4 text-lg text-white outline-none transition placeholder:text-white/35 focus:border-[#c8f169]";
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-6 sm:grid-cols-2">
      <input required placeholder="Full name" className={field} />
      <input required type="email" placeholder="Work email" className={field} />
      <input placeholder="Organisation" className={field} />
      <select className={`${field} [&>option]:text-black`} defaultValue=""><option value="" disabled>Area of interest</option>{co.services.map((s) => <option key={s.n}>{s.title}</option>)}</select>
      <textarea placeholder="Tell us about your project" rows={3} className={`${field} sm:col-span-2`} />
      <button className="group flex items-center gap-4 justify-self-start rounded-full bg-[#c8f169] px-8 py-4 font-medium text-black transition hover:gap-6">Send enquiry <span>→</span></button>
    </form>
  );
}
