import type { Metadata } from "next";
import { getAllProjects, getAllTags } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="container-x py-16">
      <SectionHeading eyebrow="Portfolio" title="All projects" />
      <ProjectGrid projects={getAllProjects()} tags={getAllTags()} />
    </section>
  );
}
