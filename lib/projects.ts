import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const DIR = path.join(process.cwd(), "content/projects");

export type Project = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  tech: string[];
  cover?: string;
  repo?: string;
  demo?: string;
  featured: boolean;
  status: string;
};

function parse(file: string): { meta: Project; body: string } {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || file.replace(/\.mdx?$/, "");
  return {
    body: content,
    meta: {
      slug,
      title: data.title ?? slug,
      summary: data.summary ?? "",
      date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
      tags: data.tags ?? [],
      tech: data.tech ?? [],
      cover: data.cover,
      repo: data.repo,
      demo: data.demo,
      featured: Boolean(data.featured),
      status: data.status ?? "completed",
    },
  };
}

function files() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"));
}

export function getAllProjects(): Project[] {
  return files()
    .map((f) => parse(f).meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getFeaturedProjects(limit = 3) {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getAllTags() {
  return Array.from(new Set(getAllProjects().flatMap((p) => p.tags))).sort();
}

export async function getProject(slug: string) {
  const file = files().find((f) => parse(f).meta.slug === slug);
  if (!file) return null;
  const { meta, body } = parse(file);
  const contentHtml = String(await remark().use(gfm).use(html).process(body));
  return { ...meta, contentHtml };
}
