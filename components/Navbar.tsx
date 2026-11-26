"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className={`mx-auto flex max-w-3xl items-center justify-between rounded-full border px-5 py-2.5 transition duration-300 ${scrolled ? "border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/40 backdrop-blur-xl" : "border-transparent"}`}>
        <Link href="/" className="font-mono text-sm font-semibold text-white">
          {siteConfig.handle}<span className="text-accent">.dev</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">{n.label}</Link>
          ))}
        </div>
        <a href="/#contact" className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 md:block">Hire me</a>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-white md:hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 flex max-w-3xl flex-col rounded-2xl border border-white/10 bg-zinc-950/95 p-3 backdrop-blur-xl md:hidden">
          {siteConfig.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-zinc-300 hover:bg-white/5">{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
