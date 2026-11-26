"use client";
import { useState } from "react";

const qs = [
  ["Do I need a credit card to start?", "No. The Starter plan is free forever and trials on paid plans don't need a card."],
  ["Is my data private?", "Yes. Pulse is cookieless, GDPR-compliant and all data is stored in the EU."],
  ["Can I import from Google Analytics?", "One click. We import up to 3 years of history in the background."],
  ["What happens if I go over my limit?", "Nothing breaks. We'll email you and you can upgrade whenever you like."],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
      {qs.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-slate-900">
            {q}<span className={`text-xl text-indigo-600 transition ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden px-6 text-slate-600"><span className="block pb-5">{a}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}
