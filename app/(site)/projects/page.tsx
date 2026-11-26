import type { Metadata } from "next";
import { getAllProjects, getAllTags } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <section className="container-x pb-28 pt-40">
      <SectionHeading eyebrow="Portfolio" title="All work." sub="Premium templates, live and ready to customise for your brand." />
      <ProjectGrid projects={getAllProjects()} tags={getAllTags()} />
    </section>
  );
}
