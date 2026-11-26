import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/landing/LandingTemplate";
import { landings } from "@/lib/landing/configs";

type Props = { params: Promise<{ niche: string }> };

export function generateStaticParams() { return Object.keys(landings).map((niche) => ({ niche })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = landings[(await params).niche];
  return c ? { title: `${c.brand} — landing page demo` } : {};
}

export default async function Page({ params }: Props) {
  const { niche } = await params;
  const c = landings[niche];
  if (!c) notFound();
  return (
    <>
      <LandingTemplate c={c} />
      <div className="fixed bottom-4 left-1/2 z-[100] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/90 p-1.5 text-xs text-zinc-300 shadow-2xl backdrop-blur-xl">
        <span className="hidden px-2 sm:inline">Same template, 3 businesses:</span>
        {Object.values(landings).map((l) => (
          <Link key={l.slug} href={`/demos/landing/${l.slug}`} className={`rounded-full px-3 py-1.5 ${l.slug === niche ? "bg-white font-medium text-zinc-950" : "hover:bg-white/10"}`}>{l.label}</Link>
        ))}
        <Link href="/projects" className="rounded-full px-3 py-1.5 hover:bg-white/10">← Portfolio</Link>
      </div>
    </>
  );
}
