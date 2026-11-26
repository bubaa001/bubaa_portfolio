"use client";
import { useState } from "react";

const plans = [
  { name: "Starter", m: 0, y: 0, desc: "For side projects", feats: ["1 workspace", "10k events / mo", "7-day history", "Community support"] },
  { name: "Growth", m: 29, y: 23, desc: "For growing teams", feats: ["5 workspaces", "1M events / mo", "1-year history", "Funnels & cohorts", "Email support"], hot: true },
  { name: "Scale", m: 99, y: 79, desc: "For serious volume", feats: ["Unlimited workspaces", "20M events / mo", "Unlimited history", "SSO & audit logs", "Priority support"] },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <>
      <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-full bg-slate-100 p-1 text-sm">
        {["Monthly", "Yearly"].map((l, i) => (
          <button key={l} onClick={() => setYearly(i === 1)} className={`rounded-full px-4 py-1.5 font-medium transition ${yearly === (i === 1) ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}>
            {l}{i === 1 && <span className="ml-1.5 text-emerald-600">−20%</span>}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`relative rounded-3xl border p-8 ${p.hot ? "border-indigo-600 bg-slate-900 text-white shadow-2xl shadow-indigo-600/20" : "border-slate-200 bg-white"}`}>
            {p.hot && <span className="absolute -top-3 left-8 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className={`text-sm ${p.hot ? "text-slate-400" : "text-slate-500"}`}>{p.desc}</p>
            <p className="mt-6 text-5xl font-bold tracking-tight">${yearly ? p.y : p.m}<span className={`text-base font-normal ${p.hot ? "text-slate-400" : "text-slate-500"}`}>/mo</span></p>
            <button className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition ${p.hot ? "bg-indigo-600 hover:bg-indigo-500" : "bg-slate-900 text-white hover:bg-slate-700"}`}>{p.m === 0 ? "Start free" : "Start 14-day trial"}</button>
            <ul className="mt-8 space-y-3 text-sm">
              {p.feats.map((f) => <li key={f} className="flex gap-3"><span className="text-indigo-500">✓</span>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
