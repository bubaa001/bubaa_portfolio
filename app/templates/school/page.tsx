import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/tpl/CountUp";
import TemplateBar from "@/components/tpl/TemplateBar";
import { school } from "./data";
import { Nav, HeroTitle, SpinBadge, Programmes, DayStrip, EnquiryForm } from "./Interactive";

const GOLD = "#f5c542";
const Label = ({ n, children, dark = true }: { n: string; children: React.ReactNode; dark?: boolean }) => (
  <p className={`mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-white/45" : "text-black/45"}`}><span>({n})</span><span className={`h-px w-16 ${dark ? "bg-white/20" : "bg-black/20"}`} />{children}</p>
);

export default function SchoolTemplate() {
  return (
    <div className="bg-[#06080f] font-[family-name:var(--font-body)] text-white [color-scheme:dark] [&_.font-display]:font-[family-name:var(--font-display)]">
      <style>{`@keyframes rise{from{transform:translateY(110%)}to{transform:none}}@keyframes marquee{to{transform:translateX(-50%)}}@keyframes zoom{from{transform:scale(1.2)}to{transform:scale(1.02)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <Image src="/templates/img/graduation.jpg" alt="Graduation day" fill priority sizes="100vw" className="animate-[zoom_3s_cubic-bezier(.16,1,.3,1)_both] object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/30 to-[#06080f]/60" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-12 pt-32 sm:px-10">
          <div className="flex items-end justify-between gap-6">
            <HeroTitle />
            <div className="mb-4 hidden shrink-0 animate-[fadeIn_1s_1.2s_both] md:block"><SpinBadge /></div>
          </div>
          <div className="mt-12 grid animate-[fadeIn_1s_1.4s_both] gap-6 border-t border-white/15 pt-6 text-white/65 sm:grid-cols-3">
            <p className="max-w-sm">A world-class day and boarding school in Dar es Salaam, from Early Years to A-Level.</p>
            <p className="font-mono text-xs uppercase tracking-widest sm:text-center">Est. {school.founded} · {school.motto}</p>
            <p className="font-mono text-xs uppercase tracking-widest sm:text-right">Scroll ↓</p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS MARQUEE */}
      <div className="overflow-hidden border-y border-white/10 py-7" style={{ background: GOLD }}>
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-14 font-display text-3xl italic text-[#06080f]">
          {[...school.achievements, ...school.achievements].map((a, i) => <span key={i} className="flex items-center gap-14">{a}<span className="not-italic">✦</span></span>)}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-32 sm:px-10">
        <Label n="01">Who we are</Label>
        <Reveal><p className="max-w-5xl font-display text-4xl font-light leading-[1.12] sm:text-6xl">For nearly forty years, {school.name} has given children the <em style={{ color: GOLD }}>knowledge</em>, the <em style={{ color: GOLD }}>character</em> and the <em style={{ color: GOLD }}>confidence</em> to lead, in Tanzania and anywhere in the world.</p></Reveal>
        <div className="mt-24 grid grid-cols-2 gap-y-12 border-t border-white/10 pt-12 lg:grid-cols-4">
          {school.stats.map((s) => (
            <div key={s.label}><p className="font-display text-6xl font-light sm:text-8xl"><CountUp to={s.value} suffix={s.suffix} /></p><p className="mt-2 text-sm text-white/50">{s.label}</p></div>
          ))}
        </div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="scroll-mt-20 border-t border-white/10 py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="02">Programmes</Label>
          <Programmes />
        </div>
      </section>

      {/* A DAY AT KILELE */}
      <section id="life" className="scroll-mt-20 border-t border-white/10 py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="03">A day at {school.short}</Label>
          <Reveal><h2 className="max-w-4xl font-display text-5xl font-light leading-[1] sm:text-8xl">Every hour, <em style={{ color: GOLD }}>something to love.</em></h2></Reveal>
        </div>
        <div className="mt-6"><DayStrip /></div>
      </section>

      {/* HEAD OF SCHOOL */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="mx-auto grid max-w-[1400px] items-stretch lg:grid-cols-2">
          <div className="group relative min-h-[520px] overflow-hidden"><Image src="/templates/img/teacher.jpg" alt="Head of School" fill sizes="50vw" className="object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0" /></div>
          <div className="flex flex-col justify-center px-5 py-20 sm:px-16">
            <Label n="04">From the Head</Label>
            <Reveal><blockquote className="font-display text-3xl font-light leading-snug sm:text-5xl">&ldquo;Grades open doors. <em style={{ color: GOLD }}>Character</em> decides what you do once you walk through them.&rdquo;</blockquote></Reveal>
            <p className="mt-10 font-display text-2xl italic">Grace Mwakyusa</p><p className="text-sm text-white/50">Head of School · M.Ed Leadership</p>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="scroll-mt-20 border-t border-white/10 py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="05">News & events</Label>
          <div className="border-t border-white/10">
            {school.news.map((n) => (
              <a key={n.title} href="#" className="group relative grid items-center gap-4 border-b border-white/10 py-8 sm:grid-cols-[160px_1fr_140px]">
                <span className="w-fit rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase text-white/60">{n.tag}</span>
                <span className="font-display text-3xl font-light transition duration-500 group-hover:translate-x-3 group-hover:italic sm:text-5xl">{n.title}</span>
                <span className="text-sm text-white/45 sm:text-right">{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} ↗</span>
                <span className="pointer-events-none absolute right-40 top-1/2 hidden h-40 w-56 -translate-y-1/2 rotate-3 scale-90 overflow-hidden opacity-0 shadow-2xl transition duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 xl:block"><Image src={n.img} alt="" fill sizes="224px" className="object-cover" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="border-t border-white/10 py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Label n="06">Voices</Label>
          <div className="grid gap-6 md:grid-cols-3">
            {school.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="flex h-full flex-col justify-between border border-white/10 p-8 transition duration-500 hover:border-[#f5c542]/60 hover:bg-white/[0.02]">
                  <blockquote className="font-display text-2xl font-light leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-10"><p className="font-semibold">{t.name}</p><p className="text-sm text-white/45">{t.role}</p></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section id="admissions" className="relative scroll-mt-20 overflow-hidden border-t border-white/10 py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-20 blur-[120px]" style={{ background: GOLD }} />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Label n="07">Admissions 2027</Label>
            <h2 className="font-display text-6xl font-light leading-[0.95] sm:text-8xl">Their story <em style={{ color: GOLD }}>starts here.</em></h2>
            <ol className="mt-14 grid gap-6 sm:grid-cols-2">
              {school.steps.map((s, i) => <li key={s.title} className="border-t border-white/15 pt-4"><p className="font-mono text-xs" style={{ color: GOLD }}>STEP 0{i + 1}</p><p className="mt-2 text-xl">{s.title}</p><p className="mt-1 text-sm text-white/50">{s.text}</p></li>)}
            </ol>
          </div>
          <div className="self-end"><EnquiryForm /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 pb-28 pt-16 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-display text-[22vw] font-light leading-none tracking-tight text-white/90 sm:text-[16vw]">{school.short}<em style={{ color: GOLD }}>.</em></p>
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 text-sm text-white/50 sm:grid-cols-4">
            <p>{school.address}</p><p>{school.phone}<br />{school.email}</p><p>Mon–Fri · 7:30 – 16:30</p><p className="sm:text-right">© {new Date().getFullYear()} {school.name}</p>
          </div>
        </div>
      </footer>
      <TemplateBar name="School website" />
    </div>
  );
}
