import Link from "next/link";

/** Small floating bar shown on template previews (remove for client delivery). */
export default function TemplateBar({ name }: { name: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/90 py-1.5 pl-4 pr-1.5 font-sans text-xs text-zinc-300 shadow-2xl backdrop-blur-xl">
      <span>Template preview · {name}</span>
      <a href="/templates" className="hidden text-zinc-400 hover:text-white sm:inline">Get this template</a>
      <Link href="/templates" className="rounded-full bg-white px-3 py-1.5 font-medium text-zinc-950 hover:bg-zinc-200">All templates</Link>
    </div>
  );
}
