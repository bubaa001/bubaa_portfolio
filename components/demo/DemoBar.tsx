import Link from "next/link";

export default function DemoBar({ gig }: { gig: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/90 py-1.5 pl-4 pr-1.5 text-xs text-zinc-300 shadow-2xl backdrop-blur-xl">
      <span className="hidden sm:inline">Concept demo · {gig}</span>
      <span className="sm:hidden">Concept demo</span>
      <Link href="/projects" className="rounded-full bg-white px-3 py-1.5 font-medium text-zinc-950 hover:bg-zinc-200">← Portfolio</Link>
    </div>
  );
}
