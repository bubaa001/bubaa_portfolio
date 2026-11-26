import type { Metadata } from "next";
import { templates } from "@/lib/templates";
import Explore from "./Explore";

export const metadata: Metadata = { title: "Templates", description: "Premium website, dashboard and brand templates, customised and delivered for you." };

export default function TemplatesPage() {
  return (
    <section className="pb-28 pt-28 sm:pt-32">
      <div className="container-x">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Template studio</p>
        <h1 className="mt-3 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">Premium templates for <span className="gradient-text">online stores and companies.</span></h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg">Every template is live, fully responsive and animated. Pick one, and I customise it with your name, colours, photos and content, then put it online for you.</p>
      </div>
      <Explore items={templates} />
    </section>
  );
}
