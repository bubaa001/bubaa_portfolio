import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/projects";
import { ArrowIcon, GitHubIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const p = await getProject((await params).slug);
  if (!p) notFound();
  const all = getAllProjects();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length];
  const meta = [
    { k: "Year", v: new Date(p.date).getFullYear() },
    { k: "Status", v: p.status.replace("-", " ") },
    { k: "Type", v: p.tags.join(", ") || "—" },
  ];
  return (
    <article className="pb-28 pt-36">
      <div className="container-x max-w-4xl">
        <Link href="/projects" className="font-mono text-sm text-zinc-500 transition hover:text-white">← all work</Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">{p.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400">{p.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn-primary">Live site <ArrowIcon /></a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost"><GitHubIcon /> Source</a>}
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-white/10 py-6">
          {meta.map((m) => (
            <div key={m.k}><dt className="font-mono text-xs uppercase tracking-widest text-zinc-500">{m.k}</dt><dd className="mt-1 capitalize text-white">{m.v}</dd></div>
          ))}
        </dl>
      </div>
      {p.cover && (
        <div className="container-x mt-12 max-w-5xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover} alt={p.title} className="w-full rounded-3xl border border-white/10" />
        </div>
      )}
      <div className="container-x mt-16 grid max-w-4xl gap-12 md:grid-cols-[1fr_200px]">
        <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-violet-400" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
        <aside>
          <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500">Stack</h4>
          <div className="mt-3 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        </aside>
      </div>
      {next && next.slug !== p.slug && (
        <div className="container-x mt-24 max-w-4xl">
          <Link href={`/projects/${next.slug}`} className="card group flex items-center justify-between p-8">
            <div><p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Next project</p><p className="mt-2 text-2xl font-semibold text-white">{next.title}</p></div>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 transition group-hover:rotate-45 group-hover:bg-white group-hover:text-zinc-950"><ArrowIcon /></span>
          </Link>
        </div>
      )}
    </article>
  );
}
