import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/projects";

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
  return (
    <article className="container-x max-w-3xl py-16">
      <Link href="/projects" className="text-sm text-accent hover:underline">← All projects</Link>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{p.title}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{p.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <time>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</time>
        {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="mt-6 flex gap-3">
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn-primary">Live demo ↗</a>}
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost">Source code</a>}
      </div>
      {p.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.cover} alt={p.title} className="mt-10 w-full rounded-xl border border-slate-200 dark:border-slate-800" />
      )}
      <div className="prose prose-slate mt-10 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
    </article>
  );
}
