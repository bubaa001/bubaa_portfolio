"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Mark, Wordmark } from "./Logo";

const colors = [
  { name: "Sunrise", hex: "#FF6A2B", rgb: "255 106 43", cmyk: "0 58 83 0", role: "Primary · CTAs, highlights", text: "#141018" },
  { name: "Ink", hex: "#141018", rgb: "20 16 24", cmyk: "17 33 0 91", role: "Text, dark backgrounds", text: "#FFF6EC" },
  { name: "Dune", hex: "#FFF6EC", rgb: "255 246 236", cmyk: "0 4 7 0", role: "Light backgrounds", text: "#141018" },
  { name: "Savanna", hex: "#F6B73C", rgb: "246 183 60", cmyk: "0 26 76 4", role: "Secondary accent", text: "#141018" },
  { name: "Lagoon", hex: "#1F8A8A", rgb: "31 138 138", cmyk: "78 0 0 46", role: "Support, success, links", text: "#FFF6EC" },
];
const sections = ["Overview", "Logo", "Colour", "Typography", "Imagery", "Components", "Social", "Downloads"];

function lum(hex: string) { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
function contrast(a: string, b: string) { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); }

export default function Kit() {
  const [active, setActive] = useState("Overview");
  const [copied, setCopied] = useState("");
  const [bg, setBg] = useState<"light" | "dark" | "sun">("light");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => { const el = document.getElementById(s); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const copy = (v: string) => { navigator.clipboard?.writeText(v).catch(() => {}); setCopied(v); setTimeout(() => setCopied(""), 1400); };
  const H = ({ n, t, sub }: { n: string; t: string; sub: string }) => (
    <div className="mb-12 grid gap-4 border-t border-[#141018]/15 pt-8 md:grid-cols-[120px_1fr]">
      <span className="font-[family-name:var(--font-mono2)] text-sm text-[#141018]/45">{n}</span>
      <div><h2 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight sm:text-7xl">{t}</h2><p className="mt-4 max-w-2xl text-lg text-[#141018]/60">{sub}</p></div>
    </div>
  );
  const logoBg = { light: ["#FFF6EC", "#141018", "#FF6A2B"], dark: ["#141018", "#FFF6EC", "#FF6A2B"], sun: ["#FF6A2B", "#141018", "#FFF6EC"] }[bg];

  return (
    <div className="flex bg-[#FFF6EC] font-[family-name:var(--font-display)] text-[#141018] [color-scheme:light]">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[#141018]/10 p-6 lg:flex">
        <Wordmark h={30} />
        <p className="mt-2 font-[family-name:var(--font-mono2)] text-[11px] uppercase tracking-widest text-[#141018]/45">Brand guidelines · v2.0</p>
        <nav className="mt-10 space-y-1">
          {sections.map((s, i) => <a key={s} href={`#${s}`} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active === s ? "bg-[#141018] text-[#FFF6EC]" : "text-[#141018]/60 hover:bg-[#141018]/5"}`}><span className="font-[family-name:var(--font-mono2)] text-[10px] opacity-60">0{i + 1}</span>{s}</a>)}
        </nav>
        <a href="#Downloads" className="mt-auto rounded-xl bg-[#FF6A2B] px-4 py-3 text-center text-sm font-semibold">Download assets ↓</a>
      </aside>

      <main className="min-w-0 flex-1">
        {/* COVER */}
        <section id="Overview" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#141018] p-6 text-[#FFF6EC] sm:p-12">
          <div className="pointer-events-none absolute -bottom-[40vw] left-1/2 h-[80vw] w-[80vw] -translate-x-1/2 animate-[sunrise_2.6s_cubic-bezier(.16,1,.3,1)_both] rounded-full bg-[radial-gradient(circle,#FF6A2B_0%,#F6B73C_35%,transparent_68%)] opacity-90" />
          <div className="relative flex justify-between font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#FFF6EC]/55"><span>Brand book</span><span>2026 edition</span></div>
          <div className="relative">
            <div className="animate-[fadeUp_1s_.3s_both]"><Wordmark fg="#FFF6EC" h={64} /></div>
            <h1 className="mt-10 max-w-4xl animate-[fadeUp_1s_.5s_both] text-5xl font-bold leading-[0.95] tracking-tight sm:text-8xl">Light for every<br />morning.</h1>
            <p className="mt-8 max-w-xl animate-[fadeUp_1s_.7s_both] text-lg text-[#FFF6EC]/65">Nuru (Swahili: <em>light</em>) is a solar energy company bringing clean, affordable power to homes and small businesses. These guidelines keep the brand clear, warm and consistent everywhere it appears.</p>
          </div>
          <div className="relative grid grid-cols-2 gap-6 border-t border-[#FFF6EC]/15 pt-6 text-sm sm:grid-cols-4">
            {[["Mission", "Power every home with clean light."], ["Personality", "Warm · Optimistic · Reliable"], ["Voice", "Plain words, short sentences."], ["Audience", "Families & small businesses"]].map(([k, v]) => <div key={k}><p className="font-[family-name:var(--font-mono2)] text-[11px] uppercase tracking-widest text-[#F6B73C]">{k}</p><p className="mt-2 text-[#FFF6EC]/80">{v}</p></div>)}
          </div>
        </section>

        <div className="space-y-32 px-6 py-24 sm:px-12">
          {/* LOGO */}
          <section id="Logo" className="scroll-mt-10">
            <H n="02" t="Logo" sub="A sun rising over the horizon: the moment Nuru exists for. Use the full lockup wherever space allows; the mark alone for small or square spaces." />
            <div className="mb-4 flex gap-2">{(["light", "dark", "sun"] as const).map((b) => <button key={b} onClick={() => setBg(b)} className={`rounded-full border px-4 py-1.5 text-sm capitalize ${bg === b ? "border-[#141018] bg-[#141018] text-[#FFF6EC]" : "border-[#141018]/20"}`}>{b} background</button>)}</div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid aspect-[16/9] place-items-center rounded-3xl transition-colors duration-500 md:col-span-2" style={{ background: logoBg[0] }}><Wordmark fg={logoBg[1]} accent={logoBg[2]} h={84} /></div>
              <div className="grid aspect-square place-items-center rounded-3xl transition-colors duration-500 md:aspect-auto" style={{ background: logoBg[0] }}><Mark fg={logoBg[1]} accent={logoBg[2]} size={120} /></div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#141018]/10 bg-white p-8">
                <p className="mb-6 font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#141018]/50">Clear space = height of the sun</p>
                <div className="relative mx-auto w-fit p-10 outline-dashed outline-1 outline-[#FF6A2B]/60"><Wordmark h={56} /><span className="absolute left-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-mono2)] text-[10px] text-[#FF6A2B]">x</span></div>
                <p className="mt-6 text-sm text-[#141018]/60">Minimum size: 24 px (digital) · 10 mm (print).</p>
              </div>
              <div className="rounded-3xl border border-[#141018]/10 bg-white p-8">
                <p className="mb-6 font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#141018]/50">Don&apos;t</p>
                <div className="grid grid-cols-2 gap-3">
                  {[["Stretch", "scale-x-150"], ["Rotate", "rotate-12"], ["Recolour", "hue-rotate-180"], ["Add effects", "drop-shadow-[4px_4px_0_#1F8A8A]"]].map(([l, c]) => (
                    <div key={l} className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-[#FFF6EC]"><span className={`${c} inline-block`}><Mark size={44} /></span><span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-[#141018]/5 py-1 text-[11px] text-red-600">✕ {l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* COLOUR */}
          <section id="Colour" className="scroll-mt-10">
            <H n="03" t="Colour" sub="Sunrise leads; Ink and Dune do the quiet work. Click any value to copy it." />
            <div className="grid gap-3 md:grid-cols-5">
              {colors.map((c, i) => (
                <div key={c.hex} className={`group flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition duration-500 hover:-translate-y-2 ${i < 2 ? "md:row-span-2 md:min-h-[420px]" : "min-h-[200px]"}`} style={{ background: c.hex, color: c.text, boxShadow: c.hex === "#FFF6EC" ? "inset 0 0 0 1px rgba(20,16,24,.12)" : undefined }}>
                  <div><p className="text-2xl font-bold">{c.name}</p><p className="mt-1 text-sm opacity-70">{c.role}</p></div>
                  <div className="mt-6 space-y-1 font-[family-name:var(--font-mono2)] text-xs">
                    {[["HEX", c.hex], ["RGB", c.rgb], ["CMYK", c.cmyk]].map(([k, v]) => <button key={k} onClick={() => copy(v)} className="flex w-full justify-between rounded-md px-1 py-0.5 text-left hover:bg-black/10"><span className="opacity-60">{k}</span><span>{copied === v ? "Copied ✓" : v}</span></button>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 overflow-x-auto rounded-3xl border border-[#141018]/10 bg-white p-6">
              <p className="mb-4 font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#141018]/50">Accessible pairings (WCAG contrast)</p>
              <div className="flex gap-3">
                {[["#141018", "#FFF6EC"], ["#FF6A2B", "#141018"], ["#141018", "#F6B73C"], ["#1F8A8A", "#FFF6EC"], ["#FF6A2B", "#FFF6EC"]].map(([f, b]) => { const r = contrast(f, b); return (
                  <div key={f + b} className="min-w-[150px] flex-1 rounded-2xl p-4" style={{ background: b, color: f, boxShadow: "inset 0 0 0 1px rgba(20,16,24,.08)" }}><p className="text-3xl font-bold">Aa</p><p className="mt-2 text-xs">{r.toFixed(1)}:1 · {r >= 4.5 ? "AA ✓" : r >= 3 ? "Large text only" : "Avoid"}</p></div>); })}
              </div>
            </div>
          </section>

          {/* TYPE */}
          <section id="Typography" className="scroll-mt-10">
            <H n="04" t="Typography" sub="Space Grotesk for everything people read; JetBrains Mono for numbers, labels and data." />
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl bg-[#141018] p-8 text-[#FFF6EC] sm:p-12">
                <p className="font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#F6B73C]">Primary · Space Grotesk</p>
                <p className="mt-6 text-[120px] font-bold leading-none tracking-tighter sm:text-[180px]">Aa</p>
                <p className="mt-6 break-words text-xl text-[#FFF6EC]/70">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 !?&amp;@</p>
              </div>
              <div className="divide-y divide-[#141018]/10 rounded-3xl border border-[#141018]/10 bg-white p-6">
                {[["Display", "64/68 · Bold", "text-6xl font-bold tracking-tight"], ["Heading", "36/40 · Bold", "text-4xl font-bold"], ["Title", "22/28 · Medium", "text-2xl font-medium"], ["Body", "17/27 · Regular", "text-[17px]"], ["Label", "12/16 · Mono", "font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest"]].map(([n, spec, cls]) => (
                  <div key={n} className="flex items-baseline justify-between gap-4 py-4"><span className={cls}>{n}</span><span className="shrink-0 font-[family-name:var(--font-mono2)] text-[11px] text-[#141018]/45">{spec}</span></div>
                ))}
              </div>
            </div>
          </section>

          {/* IMAGERY */}
          <section id="Imagery" className="scroll-mt-10">
            <H n="05" t="Imagery" sub="Real people, warm natural light, honest moments. A Sunrise overlay at 20% ties photography to the brand." />
            <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
              {["/templates/img/team.jpg", "/templates/img/building.jpg", "/templates/img/handshake.jpg", "/templates/img/office.jpg", "/templates/img/meeting.jpg"].map((src, i) => (
                <figure key={src} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <Image src={src} alt="" fill sizes="(min-width:768px) 40vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-[#FF6A2B] opacity-20 mix-blend-multiply transition group-hover:opacity-0" />
                </figure>
              ))}
            </div>
          </section>

          {/* UI */}
          <section id="Components" className="scroll-mt-10">
            <H n="06" t="Components" sub="Rounded, generous and friendly. Every component uses the palette and type scale above." />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-3 rounded-3xl border border-[#141018]/10 bg-white p-8">
                <p className="mb-4 font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#141018]/50">Buttons</p>
                <button className="w-full rounded-full bg-[#FF6A2B] py-3.5 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF6A2B]/30">Get solar today</button>
                <button className="w-full rounded-full bg-[#141018] py-3.5 font-semibold text-[#FFF6EC] transition hover:-translate-y-0.5">See plans</button>
                <button className="w-full rounded-full border-2 border-[#141018] py-3 font-semibold transition hover:bg-[#141018] hover:text-[#FFF6EC]">Talk to us</button>
              </div>
              <div className="rounded-3xl border border-[#141018]/10 bg-white p-8">
                <p className="mb-4 font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest text-[#141018]/50">Form</p>
                <label className="text-sm font-medium">Phone number<input placeholder="+255 7xx xxx xxx" className="mt-1.5 w-full rounded-2xl border-2 border-[#141018]/10 bg-[#FFF6EC] px-4 py-3 outline-none focus:border-[#FF6A2B]" /></label>
                <label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked className="h-5 w-5 accent-[#FF6A2B]" />Send me offers by SMS</label>
                <div className="mt-6 flex gap-2"><span className="rounded-full bg-[#1F8A8A]/15 px-3 py-1 text-xs font-semibold text-[#1F8A8A]">● Installed</span><span className="rounded-full bg-[#F6B73C]/25 px-3 py-1 text-xs font-semibold text-[#8a5a00]">● Pending</span></div>
              </div>
              <div className="flex flex-col justify-between rounded-3xl bg-[#FF6A2B] p-8">
                <p className="font-[family-name:var(--font-mono2)] text-xs uppercase tracking-widest">Card</p>
                <div><p className="text-5xl font-bold">TZS 35,000<span className="text-lg font-medium">/mo</span></p><p className="mt-2">Home kit: 4 lights, phone charging, radio. Pay as you go.</p></div>
                <button className="mt-6 rounded-full bg-[#141018] py-3 font-semibold text-[#FFF6EC]">Choose plan</button>
              </div>
            </div>
          </section>

          {/* SOCIAL */}
          <section id="Social" className="scroll-mt-10">
            <H n="07" t="Social templates" sub="Three post layouts for Instagram, Facebook and WhatsApp Status. Swap the headline, keep the system." />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl bg-[#141018] p-6 text-[#FFF6EC]"><div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,#FF6A2B,transparent_70%)]" /><Mark fg="#FFF6EC" size={36} /><p className="relative text-3xl font-bold leading-tight">No more<br />blackouts<br />at dinner.</p><p className="relative font-[family-name:var(--font-mono2)] text-xs">nuru.example</p></div>
              <div className="flex aspect-square flex-col justify-between rounded-3xl bg-[#F6B73C] p-6"><p className="font-[family-name:var(--font-mono2)] text-xs uppercase">Customer story</p><p className="text-2xl font-bold leading-snug">&ldquo;My shop stays open two extra hours every night.&rdquo;</p><p className="text-sm">Mama Neema, Morogoro</p></div>
              <div className="relative aspect-square overflow-hidden rounded-3xl"><Image src="/templates/img/team.jpg" alt="" fill sizes="33vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#141018]/90 via-transparent" /><div className="absolute bottom-6 left-6 right-6 text-[#FFF6EC]"><span className="rounded-full bg-[#FF6A2B] px-3 py-1 text-xs font-bold text-[#141018]">OFFER</span><p className="mt-3 text-2xl font-bold">First month free in December</p></div></div>
            </div>
          </section>

          {/* DOWNLOADS */}
          <section id="Downloads" className="scroll-mt-10">
            <H n="08" t="Downloads" sub="Everything a designer, printer or agency needs." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[["Logo pack", "SVG · PNG · PDF", "12 files"], ["Colour swatches", "ASE · Figma · CSS", "5 colours"], ["Fonts", "Google Fonts links", "2 families"], ["Social templates", "Canva · Figma", "9 layouts"]].map(([t, f, n]) => (
                <button key={t} className="group flex items-center justify-between rounded-3xl border border-[#141018]/10 bg-white p-6 text-left transition hover:border-[#FF6A2B] hover:shadow-xl">
                  <div><p className="text-lg font-bold">{t}</p><p className="font-[family-name:var(--font-mono2)] text-xs text-[#141018]/50">{f} · {n}</p></div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF6EC] transition group-hover:bg-[#FF6A2B]">↓</span>
                </button>
              ))}
            </div>
            <p className="mt-16 pb-16 text-center font-[family-name:var(--font-mono2)] text-xs text-[#141018]/40">Nuru Brand Guidelines v2.0 · Questions: brand@nuru.example</p>
          </section>
        </div>
      </main>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes sunrise{from{transform:translate(-50%,30%);opacity:0}to{transform:translate(-50%,0);opacity:.9}}`}</style>
    </div>
  );
}
