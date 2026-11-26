import type { Metadata } from "next";
import DemoBar from "@/components/demo/DemoBar";
import TryIt from "./TryIt";

export const metadata: Metadata = { title: "n8n AI automation demo" };

const flow1 = [
  ["🌐", "Website form", "Webhook"],
  ["🤖", "Claude qualifies", "Score, intent, budget, reply draft"],
  ["📊", "Google Sheets", "Every lead logged"],
  ["🔥", "Hot lead?", "IF score ≥ 70"],
  ["✉️", "Email owner", "With ready-to-send reply"],
];
const flow2 = [
  ["⏰", "Every morning", "Schedule"],
  ["🕸️", "Scrape competitor", "HTTP + HTML extract"],
  ["🧮", "Compare prices", "vs. yesterday"],
  ["📈", "Changed?", "IF"],
  ["✉️", "Price alert", "Email / Slack"],
];

function Flow({ steps }: { steps: string[][] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {steps.map(([i, t, s], n) => (
        <div key={t} className="flex items-center gap-2">
          <div className="w-36 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xl">{i}</p><p className="mt-1 text-sm font-medium text-white">{t}</p><p className="text-xs text-zinc-500">{s}</p>
          </div>
          {n < steps.length - 1 && <span className="text-zinc-600">→</span>}
        </div>
      ))}
    </div>
  );
}

export default function Automation() {
  return (
    <div className="min-h-screen bg-[#07070b] pb-28 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400">n8n + AI automation · live demo</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Never miss a hot lead again.</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">Every form submission is read by Claude, scored 0–100, logged to Google Sheets, and the hot ones land in your inbox with a reply already written. Try it below; it runs the same logic as the n8n workflow.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TryIt />
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 font-medium text-white">Workflow 1 · AI Lead Qualifier</h2>
              <Flow steps={flow1} />
              <a href="/demos/n8n/ai-lead-qualifier.json" download className="mt-4 inline-block rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5">⬇ n8n workflow (.json)</a>
            </section>
            <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 font-medium text-white">Workflow 2 · Competitor Price Monitor</h2>
              <Flow steps={flow2} />
              <a href="/demos/n8n/competitor-price-monitor.json" download className="mt-4 inline-block rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5">⬇ n8n workflow (.json)</a>
            </section>
            <p className="text-sm text-zinc-500">Both import straight into n8n (cloud or self-hosted): <span className="text-zinc-300">Workflows → Import from file</span>, add your credentials, activate.</p>
          </div>
        </div>
      </div>
      <DemoBar gig="n8n AI automation" />
    </div>
  );
}
