"use client";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, tags }: { projects: Project[]; tags: string[] }) {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag));
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...tags].map((t) => (
          <button key={t} onClick={() => setTag(t)}
            className={`rounded-full px-3 py-1 text-sm transition ${t === tag ? "bg-accent text-white" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
      {!shown.length && <p className="text-slate-500">No projects with this tag yet.</p>}
    </>
  );
}
