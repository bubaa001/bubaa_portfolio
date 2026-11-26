import type { Metadata } from "next";
import DemoBar from "@/components/demo/DemoBar";
import Pricing from "./Pricing";
import Faq from "./Faq";

export const metadata: Metadata = { title: "Pulse — SaaS landing page demo" };

const features = [
  { icon: "⚡", t: "Real-time dashboards", d: "See every visitor, signup and sale the second it happens." },
  { icon: "🎯", t: "Funnels that explain why", d: "Find exactly where users drop off, and what to fix first." },
  { icon: "🔒", t: "Privacy-first", d: "No cookies, no banners, fully GDPR and CCPA compliant." },
  { icon: "🧩", t: "40+ integrations", d: "Stripe, Shopify, Webflow, Slack and more in two clicks." },
  { icon: "🤖", t: "AI insights", d: "Weekly plain-English reports on what changed and why." },
  { icon: "📱", t: "Works everywhere", d: "Web, iOS and Android with one 1KB script." },
];

export default function SaasLanding() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans text-slate-700 [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="flex items-center gap-2 text-lg font-bold text-slate-900"><span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">◆</span>Pulse</span>
          <nav className="hidden gap-8 text-sm md:flex">{["Features", "Pricing", "FAQ"].map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-slate-900">{n}</a>)}</nav>
          <a href="#pricing" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Get started</a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-sky-200 to-pink-200 opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">✨ New: AI weekly reports</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">Analytics your whole team <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">actually understands</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">Pulse turns raw traffic into clear answers. Set up in 2 minutes, no cookies, no data science degree.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className="rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500">Start free — no card</a>
            <a href="#features" className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-900 hover:border-slate-400">See how it works</a>
          </div>
          <p className="mt-4 text-sm text-slate-500">★★★★★ Loved by 12,000+ teams</p>

          <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/50">
            <div className="rounded-xl bg-slate-50 p-6">
              <div className="grid gap-4 sm:grid-cols-4">
                {[["Visitors", "48.2k", "+12%"], ["Signups", "1,894", "+8%"], ["Revenue", "$32.4k", "+23%"], ["Bounce", "31%", "−4%"]].map(([k, v, c]) => (
                  <div key={k} className="rounded-lg bg-white p-4 text-left shadow-sm"><p className="text-xs text-slate-500">{k}</p><p className="mt-1 text-2xl font-bold text-slate-900">{v}</p><p className="text-xs text-emerald-600">{c}</p></div>
                ))}
              </div>
              <svg viewBox="0 0 800 200" className="mt-4 w-full rounded-lg bg-white p-4 shadow-sm">
                <defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6366f1" stopOpacity=".3" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs>
                <path d="M0 150 C80 140 120 90 200 100 S320 60 400 70 S520 30 600 45 S720 20 800 10 V200 H0Z" fill="url(#a)" />
                <path d="M0 150 C80 140 120 90 200 100 S320 60 400 70 S520 30 600 45 S720 20 800 10" fill="none" stroke="#6366f1" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10">
        <p className="text-center text-sm text-slate-500">Trusted by fast-moving teams</p>
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-xl font-bold text-slate-300">
          {["Northwind", "Acme", "Globex", "Umbrella", "Initech", "Hooli"].map((l) => <span key={l}>{l}</span>)}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <p className="text-center text-sm font-semibold text-indigo-600">FEATURES</p>
        <h2 className="mt-2 text-center text-4xl font-bold tracking-tight text-slate-900">Everything you need, nothing you don&apos;t</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-2xl">{f.icon}</span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.t}</h3>
              <p className="mt-2 text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
          {[["2 min", "average setup time"], ["99.99%", "uptime last 12 months"], ["1 KB", "script, zero slowdown"]].map(([v, l]) => (
            <div key={l} className="text-center"><p className="text-5xl font-bold">{v}</p><p className="mt-2 text-slate-400">{l}</p></div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <p className="text-center text-sm font-semibold text-indigo-600">PRICING</p>
        <h2 className="mb-10 mt-2 text-center text-4xl font-bold tracking-tight text-slate-900">Simple, honest pricing</h2>
        <Pricing />
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-24 sm:px-6">
        <h2 className="mb-10 text-center text-4xl font-bold tracking-tight text-slate-900">Questions? Answers.</h2>
        <Faq />
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-500 px-6 py-16 text-center text-white">
          <h2 className="text-4xl font-bold tracking-tight">Know your numbers by tonight.</h2>
          <p className="mt-4 text-indigo-100">Free forever plan. Upgrade when you grow.</p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="you@company.com" className="flex-1 rounded-xl px-4 py-3 text-slate-900 outline-none" />
            <button type="button" className="rounded-xl bg-slate-900 px-6 py-3 font-semibold hover:bg-slate-800">Get started</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 pb-24 text-center text-sm text-slate-500">© 2026 Pulse Analytics (fictional brand)</footer>
      <DemoBar gig="Landing page" />
    </div>
  );
}
