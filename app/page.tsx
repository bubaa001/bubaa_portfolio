import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  const featured = getFeaturedProjects();
  const s = siteConfig;
  return (
    <>
      <section className="container-x py-24 sm:py-32">
        {s.available && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available for work
          </span>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Hi, I&apos;m {s.name}.<br /><span className="text-accent">{s.title}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{s.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn-primary">View my work →</Link>
          <a href="#contact" className="btn-ghost">Get in touch</a>
          {s.resume && <a href={s.resume} className="btn-ghost" target="_blank">Résumé</a>}
        </div>
      </section>

      <section id="about" className="container-x scroll-mt-20 py-16">
        <SectionHeading eyebrow="About" title="A little about me" />
        <div className="max-w-3xl space-y-4 text-slate-600 dark:text-slate-400">
          {s.bio.map((p, i) => <p key={i}>{p}</p>)}
          <p>📍 {s.location}</p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Work" title="Featured projects" />
          <Link href="/projects" className="mb-8 text-sm text-accent hover:underline">All projects →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section id="skills" className="container-x scroll-mt-20 py-16">
        <SectionHeading eyebrow="Skills" title="What I work with" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.skills.map((g) => (
            <div key={g.group} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="mb-3 font-semibold">{g.group}</h3>
              <div className="flex flex-wrap gap-1.5">{g.items.map((i) => <span key={i} className="chip">{i}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="container-x scroll-mt-20 py-16">
        <SectionHeading eyebrow="Experience" title="Where I've been" />
        <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-slate-800">
          {s.experience.map((e) => (
            <li key={e.role + e.period}>
              <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent" />
              <p className="text-sm text-slate-500">{e.period}</p>
              <h3 className="font-semibold">{e.role} · <span className="text-accent">{e.company}</span></h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="container-x scroll-mt-20 py-24 text-center">
        <SectionHeading eyebrow="Contact" title="Let's build something together" />
        <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">Have a project in mind or just want to say hi? My inbox is always open.</p>
        <a href={`mailto:${s.email}`} className="btn-primary mt-8">✉️ {s.email}</a>
        <div className="mt-6 flex justify-center gap-4 text-sm">
          {s.socials.map((x) => <a key={x.href} href={x.href} target="_blank" rel="noreferrer" className="hover:text-accent">{x.label}</a>)}
        </div>
      </section>
    </>
  );
}
