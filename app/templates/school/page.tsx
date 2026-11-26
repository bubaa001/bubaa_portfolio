import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/tpl/CountUp";
import TemplateBar from "@/components/tpl/TemplateBar";
import { school } from "./data";
import { Nav, Programmes, Testimonials, EnquiryForm } from "./Interactive";

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-[#e8c75a]" : "text-[#a8851a]"}`}><span className="h-px w-10 bg-current" />{children}</p>
);

export default function SchoolTemplate() {
  return (
    <div className="bg-[#faf7f0] font-[family-name:var(--font-body)] text-[#0f1f3d] [color-scheme:light] [&_.font-display]:font-[family-name:var(--font-display)]">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes kenburns{from{transform:scale(1.12)}to{transform:scale(1)}}@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>

      <div className="relative z-[60] bg-[#c9a227] px-4 py-2 text-center text-xs font-medium text-[#0f1f3d] sm:text-sm">🎓 {school.announcement} <a href="#admissions" className="font-bold underline underline-offset-2">Apply →</a></div>
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image src="/templates/img/campus.jpg" alt="Campus" fill priority sizes="100vw" className="animate-[kenburns_14s_ease-out_forwards] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d] via-[#0f1f3d]/60 to-[#0f1f3d]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
          <div className="max-w-3xl animate-[fadeUp_1s_cubic-bezier(.16,1,.3,1)]">
            <Eyebrow light>Est. {school.founded} · Dar es Salaam</Eyebrow>
            <h1 className="font-display text-5xl leading-[1.02] text-white sm:text-7xl lg:text-8xl">Where curious minds <em className="text-[#e8c75a]">become leaders.</em></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">A world-class education rooted in African values, from Early Years to A-Level, on a 20-acre campus by the ocean.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#admissions" className="rounded-full bg-[#c9a227] px-8 py-4 font-semibold text-[#0f1f3d] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#e8c75a]">Start your application</a>
              <a href="#campus" className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10">▶ Take a virtual tour</a>
            </div>
          </div>
          <div className="absolute bottom-28 right-8 hidden animate-[floaty_6s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-xl xl:block">
            <p className="text-xs uppercase tracking-widest text-white/60">Next Open Day</p>
            <p className="mt-1 font-display text-3xl">6 December</p>
            <p className="text-sm text-white/70">9:00 AM · Main Campus</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[#0f1f3d]/10 shadow-2xl shadow-[#0f1f3d]/10 lg:grid-cols-4">
          {school.stats.map((s) => (
            <div key={s.label} className="bg-white p-8 text-center">
              <p className="font-display text-5xl text-[#0f1f3d]"><CountUp to={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm text-[#0f1f3d]/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"><Image src="/templates/img/teacher.jpg" alt="Teacher" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
          <div className="absolute -bottom-8 -right-4 w-56 rounded-2xl bg-[#0f1f3d] p-6 text-white shadow-2xl sm:-right-8">
            <p className="font-display text-5xl text-[#e8c75a]">{new Date().getFullYear() - school.founded}</p>
            <p className="mt-1 text-sm text-white/70">years shaping the leaders of tomorrow</p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Eyebrow>Welcome from the Head</Eyebrow>
          <h2 className="font-display text-4xl leading-tight sm:text-6xl">Education that shapes <em className="text-[#a8851a]">character</em>, not just grades.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#0f1f3d]/70">At {school.name}, we believe every child carries a gift. Our teachers combine academic excellence with care, discipline and creativity so that students leave us ready for university, for work, and for life.</p>
          <p className="mt-4 text-lg leading-relaxed text-[#0f1f3d]/70">We would love to welcome your family to our community.</p>
          <div className="mt-10 flex items-center gap-4 border-t border-[#0f1f3d]/10 pt-8">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0f1f3d] font-display text-xl text-[#e8c75a]">GM</span>
            <div><p className="font-display text-2xl italic">Grace Mwakyusa</p><p className="text-sm text-[#0f1f3d]/60">Head of School, M.Ed (Leadership)</p></div>
          </div>
        </Reveal>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="scroll-mt-24 bg-white py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal><Eyebrow>Academic programmes</Eyebrow><h2 className="mb-12 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">A clear path from first steps to university.</h2></Reveal>
          <Programmes />
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal><Eyebrow>Why families choose us</Eyebrow><h2 className="mb-14 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">More than a school. A second home.</h2></Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {school.why.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-[#0f1f3d]/10 bg-white p-8 transition duration-500 hover:-translate-y-2 hover:border-[#c9a227]/50 hover:shadow-2xl hover:shadow-[#0f1f3d]/10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#faf7f0] text-2xl transition group-hover:scale-110 group-hover:bg-[#c9a227]/15">{w.icon}</span>
                <h3 className="mt-6 font-display text-2xl">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-[#0f1f3d]/65">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAMPUS GALLERY */}
      <section id="campus" className="scroll-mt-24 bg-[#0f1f3d] py-28 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow light>Campus life</Eyebrow><h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-6xl">Twenty acres of learning, play and discovery.</h2></div>
            <p className="max-w-sm text-white/60">Science labs, a digital library, sports fields, a swimming pool, music rooms and boarding houses, all in one safe, green campus.</p>
          </Reveal>
          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
            {school.gallery.map((g, i) => (
              <Reveal key={g.src + i} delay={i * 80} className={["col-span-2 row-span-2", "", "", "row-span-2", "md:col-span-2", "md:col-span-2"][i] ?? ""}>
                <figure className="group relative h-full overflow-hidden rounded-3xl">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 p-5 text-sm transition duration-500 group-hover:translate-y-0">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8">
        <Reveal><Eyebrow>News & events</Eyebrow><h2 className="mb-14 font-display text-4xl sm:text-6xl">Life at {school.short}.</h2></Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {school.news.map((n, i) => (
            <Reveal key={n.title} delay={i * 120}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image src={n.img} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold">{n.tag}</span>
                </div>
                <p className="mt-5 text-sm text-[#0f1f3d]/50">{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug transition group-hover:text-[#a8851a]">{n.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-[#0f1f3d] px-5 py-28">
        <Image src="/templates/img/graduation.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="relative"><Testimonials /></div>
      </section>

      {/* ADMISSIONS */}
      <section id="admissions" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Admissions 2027</Eyebrow>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">Join our family in four simple steps.</h2>
            <ol className="mt-12 space-y-8">
              {school.steps.map((s, i) => (
                <li key={s.title} className="flex gap-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a227] font-display text-xl text-[#a8851a]">{i + 1}</span>
                  <div><h3 className="font-display text-2xl">{s.title}</h3><p className="mt-1 text-[#0f1f3d]/65">{s.text}</p></div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={150} className="rounded-[2rem] bg-[#0f1f3d] p-6 sm:p-10">
            <h3 className="font-display text-3xl text-white">Request a callback</h3>
            <p className="mb-8 mt-2 text-white/60">Leave your details and our admissions team will contact you.</p>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1630] px-5 pb-28 pt-20 text-white/70 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl text-white">{school.name}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#e8c75a]">{school.motto}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{school.address}</p>
          </div>
          <div><p className="mb-4 font-semibold text-white">Contact</p><p className="text-sm">{school.phone}</p><p className="text-sm">{school.email}</p><p className="mt-3 text-sm">Mon–Fri · 7:30 – 16:30</p></div>
          <div><p className="mb-4 font-semibold text-white">Quick links</p>{["Admissions", "Fees", "Calendar", "Careers", "Parent portal"].map((l) => <a key={l} href="#" className="block py-1 text-sm hover:text-[#e8c75a]">{l}</a>)}</div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8 text-xs text-white/40">© {new Date().getFullYear()} {school.name}. All rights reserved.</div>
      </footer>
      <TemplateBar name="School website" />
    </div>
  );
}
