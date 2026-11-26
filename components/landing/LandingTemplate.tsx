import type { LandingConfig } from "@/lib/landing/types";
import LeadForm from "./LeadForm";
import FaqList from "./FaqList";

const id = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function LandingTemplate({ c }: { c: LandingConfig }) {
  const t = c.theme;
  const H = t.heading === "serif" ? "font-serif font-medium" : "font-bold tracking-tight";
  const vars = { "--bg": t.bg, "--surface": t.surface, "--text": t.text, "--muted": t.muted, "--accent": t.accent, "--accent-text": t.accentText, "--border": t.border } as React.CSSProperties;
  const sec = (name: string) => id(name);
  const leadId = id(c.nav[c.nav.length - 1]);

  return (
    <div style={vars} className="min-h-screen bg-[var(--bg)] font-sans text-[var(--muted)] [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="flex items-center gap-2 text-lg font-bold text-[var(--text)]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--accent)] text-sm text-[var(--accent-text)]">{c.logo}</span>{c.brand}</span>
          <nav className="hidden gap-8 text-sm md:flex">{c.nav.slice(0, -1).map((n) => <a key={n} href={`#${sec(n)}`} className="hover:text-[var(--text)]">{n}</a>)}</nav>
          <a href={`#${leadId}`} className="rounded-lg bg-[var(--text)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90">{c.nav[c.nav.length - 1]}</a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-3xl" />
        <div className={`relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 ${c.hero.image ? "grid items-center gap-12 md:grid-cols-2" : "text-center"}`}>
          <div>
            {c.hero.badge && <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--accent)]">{c.hero.badge}</span>}
            <h1 className={`mt-6 text-5xl leading-[1.05] text-[var(--text)] sm:text-6xl ${H} ${c.hero.image ? "" : "mx-auto max-w-4xl sm:text-7xl"}`}>{c.hero.title} <span className="text-[var(--accent)]">{c.hero.highlight}</span></h1>
            <p className={`mt-6 max-w-xl text-lg ${c.hero.image ? "" : "mx-auto"}`}>{c.hero.sub}</p>
            <div className={`mt-10 flex flex-wrap gap-3 ${c.hero.image ? "" : "justify-center"}`}>
              <a href={`#${leadId}`} className="rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-text)] shadow-lg transition hover:-translate-y-0.5">{c.hero.cta}</a>
              {c.hero.cta2 && <a href={`#${sec(c.nav[0])}`} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 font-semibold text-[var(--text)]">{c.hero.cta2}</a>}
            </div>
            {c.hero.proof && <p className="mt-5 text-sm">{c.hero.proof}</p>}
          </div>
          {c.hero.image && <div className="aspect-[4/5] rounded-[2rem] shadow-2xl" style={{ background: c.hero.image }} />}
        </div>
      </section>

      {c.logos && (
        <section className="border-y border-[var(--border)] bg-[var(--surface)] py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-xl font-bold opacity-40">{c.logos.map((l) => <span key={l}>{l}</span>)}</div>
        </section>
      )}

      <section id={sec(c.nav[0])} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <h2 className={`text-center text-4xl text-[var(--text)] ${H}`}>{c.featuresTitle}</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--bg)] text-2xl">{f.icon}</span>
              <h3 className="mt-5 text-lg font-semibold text-[var(--text)]">{f.title}</h3>
              <p className="mt-2">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {c.stats && (
        <section className="bg-[var(--text)] py-20 text-[var(--bg)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 text-center sm:px-6 md:grid-cols-3">
            {c.stats.map(([v, l]) => <div key={l}><p className={`text-5xl ${H}`}>{v}</p><p className="mt-2 opacity-60">{l}</p></div>)}
          </div>
        </section>
      )}

      {c.steps && (
        <section id={sec(c.nav[1])} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <h2 className={`text-center text-4xl text-[var(--text)] ${H}`}>How it works</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {c.steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-xl font-bold text-[var(--accent-text)]">{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-[var(--text)]">{s.title}</h3>
                <p className="mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {c.testimonials && (
        <section id={sec(c.nav[2])} className="scroll-mt-20 bg-[var(--surface)] py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={`text-center text-4xl text-[var(--text)] ${H}`}>What people say</h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {c.testimonials.map((q) => (
                <figure key={q.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-7">
                  <p className="text-[var(--accent)]">★★★★★</p>
                  <blockquote className="mt-4 text-[var(--text)]">&ldquo;{q.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-sm"><b className="text-[var(--text)]">{q.name}</b> · {q.role}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.pricing && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className={`text-center text-4xl text-[var(--text)] ${H}`}>{c.pricing.title}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {c.pricing.plans.map((p) => (
              <div key={p.name} className={`relative rounded-3xl border p-8 ${p.hot ? "border-[var(--accent)] bg-[var(--text)] text-[var(--bg)] shadow-2xl" : "border-[var(--border)] bg-[var(--surface)]"}`}>
                {p.hot && <span className="absolute -top-3 left-8 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-text)]">Most popular</span>}
                <h3 className={`text-lg font-semibold ${p.hot ? "" : "text-[var(--text)]"}`}>{p.name}</h3>
                <p className="text-sm opacity-70">{p.desc}</p>
                <p className={`mt-6 text-4xl font-bold ${p.hot ? "" : "text-[var(--text)]"}`}>{p.price}<span className="text-base font-normal opacity-60">{p.per}</span></p>
                <ul className="mt-6 space-y-3 text-sm">{p.feats.map((f) => <li key={f} className="flex gap-3"><span className="text-[var(--accent)]">✓</span>{f}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className={`mb-10 text-center text-4xl text-[var(--text)] ${H}`}>Questions? Answers.</h2>
        <FaqList items={c.faq} />
      </section>

      <section id={leadId} className="scroll-mt-20 px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl bg-[var(--accent)] p-6 text-[var(--accent-text)] sm:p-12 md:grid-cols-2">
          <div>
            <h2 className={`text-4xl ${H}`}>{c.lead.title}</h2>
            <p className="mt-4 opacity-80">{c.lead.sub}</p>
          </div>
          <LeadForm lead={c.lead} source={c.brand} />
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-10 pb-28 text-center text-sm">{c.footer}</footer>
    </div>
  );
}
