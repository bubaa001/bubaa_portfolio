"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { school } from "./data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = ["About", "Programmes", "Campus", "News", "Admissions"];
  return (
    <header className={`fixed inset-x-0 z-50 transition-all duration-500 ${scrolled ? "top-0 bg-[#0f1f3d]/95 shadow-xl backdrop-blur" : "top-9"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a227]/60 font-display text-xl text-[#e8c75a]">K</span>
          <span className="leading-tight"><span className="block font-display text-xl">{school.name}</span><span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">{school.motto}</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
          {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="relative py-2 transition hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#e8c75a] after:transition-all hover:after:w-full">{l}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#admissions" className="hidden rounded-full bg-[#c9a227] px-5 py-2.5 text-sm font-semibold text-[#0f1f3d] transition hover:bg-[#e8c75a] sm:block">Apply now</a>
          <button onClick={() => setOpen(!open)} className="text-2xl text-white lg:hidden" aria-label="Menu">{open ? "✕" : "☰"}</button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0f1f3d] px-5 pb-6 lg:hidden">
          {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-white/90">{l}</a>)}
          <a href="#admissions" onClick={() => setOpen(false)} className="mt-5 block rounded-full bg-[#c9a227] py-3 text-center font-semibold text-[#0f1f3d]">Apply now</a>
        </div>
      )}
    </header>
  );
}

export function Programmes() {
  const [k, setK] = useState(school.programs[0].key);
  const p = school.programs.find((x) => x.key === k)!;
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {school.programs.map((x) => (
          <button key={x.key} onClick={() => setK(x.key)} className={`rounded-full border px-5 py-2.5 text-sm transition ${k === x.key ? "border-[#0f1f3d] bg-[#0f1f3d] text-white" : "border-[#0f1f3d]/15 text-[#0f1f3d]/70 hover:border-[#0f1f3d]/40"}`}>{x.name}</button>
        ))}
      </div>
      <div key={p.key} className="grid animate-[fadeUp_.6s_cubic-bezier(.16,1,.3,1)] items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image src={p.img} alt={p.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0f1f3d] backdrop-blur">{p.ages}</span>
        </div>
        <div>
          <h3 className="font-display text-4xl text-[#0f1f3d] sm:text-5xl">{p.name}</h3>
          <p className="mt-5 text-lg leading-relaxed text-[#0f1f3d]/70">{p.text}</p>
          <ul className="mt-8 space-y-4">
            {p.points.map((pt) => <li key={pt} className="flex items-center gap-4 text-[#0f1f3d]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c9a227]/15 text-[#a8851a]">✓</span>{pt}</li>)}
          </ul>
          <a href="#admissions" className="mt-10 inline-flex items-center gap-2 font-semibold text-[#0f1f3d] underline decoration-[#c9a227] decoration-2 underline-offset-8 hover:decoration-4">Apply for {p.name} →</a>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % school.testimonials.length), 6000); return () => clearInterval(t); }, []);
  const t = school.testimonials[i];
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="font-display text-7xl leading-none text-[#c9a227]">&ldquo;</p>
      <blockquote key={i} className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)] font-display text-2xl leading-snug text-white sm:text-4xl">{t.quote}</blockquote>
      <p className="mt-8 font-semibold text-white">{t.name}</p>
      <p className="text-sm text-white/50">{t.role}</p>
      <div className="mt-8 flex justify-center gap-2">
        {school.testimonials.map((_, n) => <button key={n} aria-label={`Testimonial ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-10 bg-[#c9a227]" : "w-4 bg-white/25"}`} />)}
      </div>
    </div>
  );
}

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="rounded-3xl bg-white p-10 text-center text-[#0f1f3d]"><p className="font-display text-4xl">Thank you!</p><p className="mt-3 text-[#0f1f3d]/60">Our admissions team will call you within one working day.</p></div>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 rounded-3xl bg-white p-6 text-[#0f1f3d] shadow-2xl sm:grid-cols-2 sm:p-8">
      {[["Parent / guardian name", "text"], ["Phone", "tel"], ["Email", "email"], ["Child's age", "number"]].map(([l, t]) => (
        <label key={l} className="text-sm font-medium">{l}<input required={l !== "Email"} type={t} className="mt-1.5 w-full rounded-xl border border-[#0f1f3d]/15 bg-[#faf7f0] px-4 py-3 outline-none transition focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/30" /></label>
      ))}
      <label className="text-sm font-medium sm:col-span-2">Programme
        <select className="mt-1.5 w-full rounded-xl border border-[#0f1f3d]/15 bg-[#faf7f0] px-4 py-3 outline-none focus:border-[#c9a227]">{school.programs.map((p) => <option key={p.key}>{p.name}</option>)}</select>
      </label>
      <button className="rounded-xl bg-[#0f1f3d] py-4 font-semibold text-white transition hover:bg-[#1b3366] sm:col-span-2">Request a callback</button>
    </form>
  );
}
