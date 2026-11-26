import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/tpl/CountUp";
import TemplateBar from "@/components/tpl/TemplateBar";
import { co } from "./data";
import { Nav, HeroTitle, Services, Contact } from "./Interactive";

const Label = ({ n, children, dark = false }: { n: string; children: React.ReactNode; dark?: boolean }) => (
  <p className={`mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-black/45"}`}><span>({n})</span><span className={`h-px w-16 ${dark ? "bg-white/25" : "bg-black/20"}`} />{children}</p>
);

export default function CorporateTemplate() {
  return (
    <div className="bg-[#f4f2ee] font-[family-name:var(--font-body)] text-[#0c0c0c] [color-scheme:light] [&_.font-display]:font-[family-name:var(--font-display)]">
      <style>{`@keyframes rise{from{transform:translateY(110%)}to{transform:none}}@keyframes marquee{to{transform:translateX(-50%)}}@keyframes zoom{from{transform:scale(1.15)}to{transform:scale(1)}}`}</style>
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0c0c0c]">
        <Image src="/templates/img/towers.jpg" alt="" fill priority sizes="100vw" className="animate-[zoom_2.4s_cubic-bezier(.16,1,.3,1)_both] object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]/40" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 pt-36 sm:px-10">
          <HeroTitle />
          <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-white/15 pt-8 text-white/70">
            <p className="max-w-md text-lg">We plan, finance and deliver the infrastructure, energy and digital systems that growing economies run on.</p>
            <div className="flex gap-10 font-mono text-xs uppercase tracking-widest"><span>{co.tagline}</span><span className="hidden sm:inline">Scroll ↓</span></div>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <div className="overflow-hidden border-b border-black/10 bg-[#f4f2ee] py-8">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-16 font-display text-3xl text-black/35">
          {[...co.clients, ...co.clients].map((c, i) => <span key={i} className="flex items-center gap-16">{c}<span className="text-[#9bc53d]">✦</span></span>)}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-32 sm:px-10">
        <Label n="01">About the group</Label>
        <Reveal><p className="max-w-5xl font-display text-4xl leading-[1.15] sm:text-6xl">For nearly three decades, {co.full} has partnered with governments, development banks and investors to turn ambitious plans into <em className="text-[#5f8a1e]">working infrastructure</em>, on time and on budget.</p></Reveal>
        <div className="mt-24 grid grid-cols-2 gap-y-12 border-t border-black/10 pt-12 lg:grid-cols-4">
          {co.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-6xl sm:text-7xl">{s.prefix}<CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} /></p>
              <p className="mt-2 text-sm text-black/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 border-t border-black/10 bg-white py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="02">What we do</Label>
          <Services />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-20 bg-[#0c0c0c] py-32 text-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="03" dark>Selected projects</Label>
          <div className="space-y-24">
            {co.projects.map((p, i) => (
              <Reveal key={p.title}>
                <article className={`group grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image src={p.img} alt={p.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/45">{p.place} · {p.year}</p>
                    <h3 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">{p.title}</h3>
                    <div className="mt-8 flex items-center gap-8 border-t border-white/15 pt-6">
                      <div><p className="text-sm text-white/45">Project value</p><p className="font-display text-4xl text-[#c8f169]">{p.value}</p></div>
                      <a href="#contact" className="ml-auto grid h-14 w-14 place-items-center rounded-full border border-white/25 text-xl transition group-hover:rotate-[-45deg] group-hover:border-[#c8f169] group-hover:bg-[#c8f169] group-hover:text-black">→</a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-32 sm:px-10">
        <Label n="04">Leadership</Label>
        <div className="grid gap-8 md:grid-cols-3">
          {co.team.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-black/5"><Image src={t.img} alt={t.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /></div>
                <figcaption className="mt-5 flex items-end justify-between border-b border-black/10 pb-5">
                  <div><p className="font-display text-3xl">{t.name}</p><p className="text-sm text-black/55">{t.role}</p></div>
                  <span className="text-black/30 transition group-hover:text-black">in ↗</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="scroll-mt-20 border-t border-black/10 bg-white py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="05">Insights</Label>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {co.insights.map((n) => (
              <a key={n.title} href="#" className="group grid items-center gap-4 py-8 sm:grid-cols-[140px_1fr_120px]">
                <span className="w-fit rounded-full border border-black/15 px-3 py-1 font-mono text-xs uppercase">{n.cat}</span>
                <span className="font-display text-3xl transition group-hover:translate-x-2 sm:text-4xl">{n.title}</span>
                <span className="text-sm text-black/45 sm:text-right">{n.date} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 bg-[#0c0c0c] py-32 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Label n="06" dark>Contact</Label>
            <h2 className="font-display text-6xl leading-none sm:text-8xl">Let&apos;s build <em className="text-[#c8f169]">together.</em></h2>
            <div className="mt-12 space-y-2 text-white/60"><p>{co.email}</p><p>{co.phone}</p></div>
          </div>
          <Contact />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0c0c0c] px-5 pb-28 pt-16 text-white/50 sm:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4">
          <p className="font-display text-5xl text-white">{co.name}<span className="text-[#c8f169]">.</span></p>
          {co.offices.map(([c, a]) => <div key={c}><p className="text-white">{c}</p><p className="text-sm">{a}</p></div>)}
        </div>
        <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap justify-between gap-4 border-t border-white/10 pt-8 text-xs"><span>© {new Date().getFullYear()} {co.full}. All rights reserved.</span><span>Privacy · Terms · Procurement</span></div>
      </footer>
      <TemplateBar name="Corporate website" />
    </div>
  );
}
