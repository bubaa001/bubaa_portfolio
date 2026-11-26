import type { Metadata } from "next";
import { getAllProjects, getAllTags } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <section className="container-x pb-28 pt-40">
      <SectionHeading eyebrow="Portfolio" title="All work." sub="Everything I've built — side projects, client work and experiments." />
      <ProjectGrid projects={getAllProjects()} tags={getAllTags()} />
    </section>
  );
}
