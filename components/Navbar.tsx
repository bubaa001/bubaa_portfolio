"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/site.config";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">{siteConfig.name}<span className="text-accent">.</span></Link>
        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm hover:text-accent">{n.label}</Link>
          ))}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="p-2 text-xl">{open ? "✕" : "☰"}</button>
        </div>
      </nav>
      {open && (
        <div className="container-x flex flex-col gap-3 pb-4 md:hidden">
          {siteConfig.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="hover:text-accent">{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
