import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { MailIcon, SocialIcon, ArrowIcon } from "@/components/Icons";

export default function Home() {
  const s = siteConfig;
  const featured = getFeaturedProjects(3);
  const total = getAllProjects().length;
  const allSkills = s.skills.flatMap((g) => g.items);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[400px] animate-float rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="container-x relative flex min-h-[92vh] flex-col justify-center pb-16 pt-36">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.avatar} alt={s.name} className="h-14 w-14 rounded-full border border-white/15 object-cover" />
              {s.available && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-emerald-400" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
                  Available for new projects
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
              Hi, I&apos;m {s.name}. <br />
              <span className="gradient-text">{s.title}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">{s.tagline}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary">See my work <ArrowIcon /></Link>
              <a href="#contact" className="btn-ghost">Let&apos;s talk</a>
              {s.resume && <a href={s.resume} target="_blank" className="btn-ghost">Résumé</a>}
              <div className="ml-2 flex gap-1">
                {s.socials.map((x) => (
                  <a key={x.href} href={x.href} target="_blank" rel="noreferrer" aria-label={x.label} className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition hover:bg-white/5 hover:text-white"><SocialIcon label={x.label} /></a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {s.stats.map((st) => (
                <div key={st.label}>
                  <dt className="text-3xl font-semibold text-white sm:text-4xl">{st.value}</dt>
                  <dd className="mt-1 text-xs text-zinc-500 sm:text-sm">{st.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-white/5 py-5 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 font-mono text-sm text-zinc-500">
          {[...allSkills, ...allSkills].map((sk, i) => <span key={i} className="flex items-center gap-12">{sk}<span className="text-accent">✦</span></span>)}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="container-x scroll-mt-24 py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="01 — About" title="Code with care, design with intent." />
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-zinc-400">
            {s.bio.map((p, i) => <p key={i}>{p}</p>)}
            <p className="font-mono text-sm text-zinc-500">📍 {s.location}</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x pb-28">
        <div className="grid gap-6 md:grid-cols-3">
          {s.services.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 100}>
              <div className="card h-full p-7">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{sv.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{sv.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="container-x scroll-mt-24 py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="02 — Selected work" title="Things I've built." sub="A few projects I'm proud of. Each one has a full case study." />
          <Reveal><Link href="/projects" className="btn-ghost mb-12">All {total} projects <ArrowIcon /></Link></Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className={i === 0 && featured.length !== 2 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} large={i === 0 && featured.length !== 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="container-x scroll-mt-24 py-28">
        <SectionHeading eyebrow="03 — Toolkit" title="Technologies I use." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 80}>
              <div className="card h-full p-6">
                <h3 className="mb-4 text-sm font-medium text-white">{g.group}</h3>
                <ul className="space-y-2.5">
                  {g.items.map((it) => <li key={it} className="flex items-center gap-2 text-sm text-zinc-400"><span className="h-1 w-1 rounded-full bg-accent" />{it}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="container-x scroll-mt-24 py-28">
        <SectionHeading eyebrow="04 — Experience" title="Where I've worked." />
        <div className="divide-y divide-white/5 border-y border-white/5">
          {s.experience.map((e, i) => (
            <Reveal key={e.role + e.period} delay={i * 80}>
              <div className="grid gap-2 py-8 transition hover:bg-white/[0.015] md:grid-cols-[200px_1fr] md:gap-10 md:px-4">
                <p className="font-mono text-sm text-zinc-500">{e.period}</p>
                <div>
                  <h3 className="text-lg font-medium text-white">{e.role} <span className="text-zinc-500">at</span> <span className="gradient-text">{e.company}</span></h3>
                  <p className="mt-2 text-zinc-400">{e.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container-x scroll-mt-24 py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-cyan-500/10 px-6 py-20 text-center sm:px-16">
            <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">05 — Contact</p>
            <h2 className="relative mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Have a project in mind?</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-zinc-400">I&apos;m open to freelance work, full-time roles and interesting collaborations. Let&apos;s build something great.</p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${s.email}`} className="btn-primary"><MailIcon /> {s.email}</a>
              {s.socials.slice(0, 2).map((x) => (
                <a key={x.href} href={x.href} target="_blank" rel="noreferrer" className="btn-ghost"><SocialIcon label={x.label} /> {x.label}</a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
