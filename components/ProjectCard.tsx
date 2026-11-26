import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.cover} alt={project.title} className="aspect-video w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold group-hover:text-accent">{project.title}</h3>
          {project.status === "in-progress" && <span className="chip !bg-amber-100 !text-amber-700">In progress</span>}
        </div>
        <p className="flex-1 text-sm text-slate-600 dark:text-slate-400">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}
