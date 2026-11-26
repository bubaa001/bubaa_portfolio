import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllProjects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/projects` },
    ...getAllProjects().map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}`, lastModified: p.date })),
  ];
}
