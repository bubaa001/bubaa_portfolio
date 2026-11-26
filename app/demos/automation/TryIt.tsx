"use client";
import { useState } from "react";
import type { Qualification } from "@/lib/automation/qualify";

const samples = [
  { name: "Maria Lopez", email: "maria@bloomdental.example", company: "Bloom Dental", budget: "$1,500", message: "We need an AI chatbot on our clinic website to answer patient questions and book appointments. We'd like it live before our new location opens in 3 weeks." },
  { name: "Dev", email: "dev@example.com", company: "", budget: "", message: "how much for website" },
  { name: "Tom", email: "tom@shopfast.example", company: "ShopFast", budget: "$400", message: "Looking to scrape competitor prices daily from 3 sites into Google Sheets. Not urgent, maybe next month." },
];
const color = { hot: "text-rose-300 border-rose-400/30 bg-rose-500/10", warm: "text-amber-300 border-amber-400/30 bg-amber-500/10", cold: "text-sky-300 border-sky-400/30 bg-sky-500/10" };

export default function TryIt() {
  const [lead, setLead] = useState(samples[0]);
  const [res, setRes] = useState<{ mode: string; result: Qualification } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function run() {
    setBusy(true); setErr(""); setRes(null);
    try {
      const r = await fetch("/api/qualify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setRes(j);
    } catch (e) { setErr(e instanceof Error ? e.message : "Failed"); }
    setBusy(false);
  }
  const f = (k: keyof typeof lead, label: string, area = false) => (
    <label className="block text-sm">
      <span className="text-zinc-500">{label}</span>
      {area
        ? <textarea value={lead[k]} onChange={(e) => setLead({ ...lead, [k]: e.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-violet-400" />
        : <input value={lead[k]} onChange={(e) => setLead({ ...lead, [k]: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-violet-400" />}
    </label>
  );
  const q = res?.result;
  return (
    <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500">Sample leads:</span>
        {samples.map((s) => <button key={s.name} onClick={() => { setLead(s); setRes(null); }} className={`rounded-full border px-3 py-1 ${lead.name === s.name ? "border-violet-400 text-white" : "border-white/10 text-zinc-400"}`}>{s.name}</button>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{f("name", "Name")}{f("email", "Email")}{f("company", "Company")}{f("budget", "Budget")}</div>
      <div className="mt-3">{f("message", "Message", true)}</div>
      <button onClick={run} disabled={busy} className="mt-4 w-full rounded-xl bg-white py-3 font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-60">{busy ? "Claude is reading the lead…" : "Submit lead → run automation"}</button>
      {err && <p className="mt-3 text-sm text-rose-400">{err}</p>}
      {q && (
        <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-3 py-1 font-semibold uppercase ${color[q.tier]}`}>{q.tier}</span>
            <span className="text-2xl font-semibold text-white">{q.score}<span className="text-sm text-zinc-500">/100</span></span>
            <span className="text-zinc-400">{q.intent}</span>
            <span className="ml-auto text-xs text-zinc-600">{res?.mode === "ai" ? "Claude AI" : "demo mode (no API key)"}</span>
          </div>
          <p className="text-zinc-300">{q.summary}</p>
          <p className="text-xs text-zinc-500">Budget fit: {q.budget_fit} · Urgency: {q.urgency}</p>
          <p><span className="text-zinc-500">Next step:</span> {q.next_step}</p>
          <div className="rounded-lg bg-white/5 p-3"><p className="mb-1 text-xs text-zinc-500">Suggested reply</p><p className="text-zinc-200">{q.reply_draft}</p></div>
          <ul className="space-y-1 border-t border-white/10 pt-3 text-xs text-zinc-400">
            <li>✓ Logged to Google Sheets → “Leads”</li>
            <li>{q.tier === "hot" ? "✓ Hot-lead email sent to owner" : "– No alert (not hot)"}</li>
            <li>✓ Form answered</li>
          </ul>
        </div>
      )}
    </section>
  );
}
