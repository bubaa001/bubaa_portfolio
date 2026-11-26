"use client";
import { useState } from "react";

export default function FaqList({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
            {q}<span className={`text-xl text-[var(--accent)] transition ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden"><p className="px-6 pb-5 text-[var(--muted)]">{a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
