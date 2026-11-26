"use client";
import { useState } from "react";
import type { LandingConfig } from "@/lib/landing/types";

const meta = {
  name: { label: "Your name", type: "text", ph: "Jane Doe" },
  email: { label: "Email", type: "email", ph: "jane@email.com" },
  phone: { label: "Phone", type: "tel", ph: "(555) 000-0000" },
  date: { label: "Date", type: "date", ph: "" },
  guests: { label: "Guests", type: "number", ph: "2" },
  message: { label: "What do you need?", type: "textarea", ph: "Tell us a bit about it…" },
} as const;

export default function LeadForm({ lead, source }: { lead: LandingConfig["lead"]; source: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, source }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error);
      setState("done");
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done")
    return <div className="rounded-2xl bg-[var(--surface)] p-10 text-center text-[var(--text)]"><p className="text-4xl">✓</p><p className="mt-3 text-xl font-semibold">Thanks! We got your request.</p><p className="mt-1 text-[var(--muted)]">We&apos;ll be in touch shortly.</p></div>;

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-[var(--surface)] p-6 text-left text-[var(--text)] shadow-xl sm:grid-cols-2 sm:p-8">
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {lead.fields.map((f) => {
        const m = meta[f];
        const cls = "mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--accent)]";
        return (
          <label key={f} className={`text-sm font-medium ${f === "message" ? "sm:col-span-2" : ""}`}>
            {m.label}
            {m.type === "textarea"
              ? <textarea name={f} rows={3} placeholder={m.ph} className={cls} />
              : <input name={f} type={m.type} placeholder={m.ph} required={f === "name"} min={m.type === "number" ? 1 : undefined} className={cls} />}
          </label>
        );
      })}
      <button disabled={state === "sending"} className="rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-text)] transition hover:opacity-90 disabled:opacity-60 sm:col-span-2">
        {state === "sending" ? "Sending…" : lead.button}
      </button>
      {state === "error" && <p className="text-sm text-red-600 sm:col-span-2">{err}</p>}
    </form>
  );
}
