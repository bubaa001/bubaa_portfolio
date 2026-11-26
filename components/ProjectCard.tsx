import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowIcon } from "./Icons";

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card group relative flex h-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(139,92,246,.15), transparent 40%)" }} />
      {project.cover && (
        <div className={`relative overflow-hidden border-b border-white/5 ${large ? "aspect-[16/8]" : "aspect-video"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {project.status === "in-progress" && (
            <span className="absolute left-4 top-4 rounded-full border border-amber-400/30 bg-zinc-950/70 px-2.5 py-1 font-mono text-[11px] text-amber-300 backdrop-blur">● in progress</span>
          )}
        </div>
      )}
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-semibold text-white ${large ? "text-2xl" : "text-lg"}`}>{project.title}</h3>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-400 transition duration-300 group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white"><ArrowIcon /></span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">{project.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      </div>
    </Link>
  );
}
