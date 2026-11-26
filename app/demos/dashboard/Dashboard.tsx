"use client";
import { useMemo, useState } from "react";
import DemoBar from "@/components/demo/DemoBar";

const nav = ["Overview", "Orders", "Customers", "Products", "Analytics", "Settings"];
const revenue = [32, 41, 38, 52, 48, 61, 58, 72, 69, 84, 79, 96];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const names = ["Ava Johnson", "Liam Smith", "Noah Brown", "Emma Davis", "Mia Wilson", "Lucas Moore", "Zoe Taylor", "Ethan Clark", "Isla Lewis", "Leo Walker", "Amara Hall", "Kofi Mensah"];
const statuses = ["Paid", "Pending", "Refunded"] as const;
const orders = names.map((n, i) => ({
  id: `#${(4821 + i * 7).toString()}`,
  customer: n,
  date: `Nov ${26 - i}, 2026`,
  amount: Math.round(((i * 37) % 9) * 41 + 29 + i * 3.5),
  status: statuses[i % 5 === 3 ? 2 : i % 3 === 1 ? 1 : 0],
}));
const badge = { Paid: "bg-emerald-500/10 text-emerald-400", Pending: "bg-amber-500/10 text-amber-400", Refunded: "bg-rose-500/10 text-rose-400" };

function AreaChart() {
  const max = 100, w = 600, h = 200;
  const pts = revenue.map((v, i) => [(i / (revenue.length - 1)) * w, h - (v / max) * h]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full">
      <defs><linearGradient id="r" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#818cf8" stopOpacity=".35" /><stop offset="1" stopColor="#818cf8" stopOpacity="0" /></linearGradient></defs>
      {[0, 50, 100, 150].map((y) => <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="rgba(255,255,255,.05)" />)}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#r)" />
      <path d={line} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0b0b12" stroke="#818cf8" strokeWidth="2" />)}
      {months.map((m, i) => <text key={i} x={(i / 11) * w} y={h + 18} fontSize="11" fill="#71717a" textAnchor={i === 0 ? "start" : i === 11 ? "end" : "middle"}>{m}</text>)}
    </svg>
  );
}

function Donut() {
  const parts = [["Organic", 46, "#818cf8"], ["Paid ads", 28, "#22d3ee"], ["Referral", 16, "#f472b6"], ["Social", 10, "#facc15"]] as const;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" className="h-36 w-36 -rotate-90">
        {parts.map(([, v, c]) => { const el = <circle key={c} cx="21" cy="21" r="15.9" fill="none" stroke={c} strokeWidth="5" strokeDasharray={`${v} ${100 - v}`} strokeDashoffset={-acc} />; acc += v; return el; })}
      </svg>
      <ul className="space-y-2 text-sm">
        {parts.map(([l, v, c]) => <li key={l} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} /> <span className="text-zinc-400">{l}</span> <span className="ml-auto font-medium text-white">{v}%</span></li>)}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | (typeof statuses)[number]>("All");
  const [sort, setSort] = useState<{ k: "amount" | "customer"; dir: 1 | -1 }>({ k: "amount", dir: -1 });
  const [menu, setMenu] = useState(false);

  const rows = useMemo(() => orders
    .filter((o) => (filter === "All" || o.status === filter) && (o.customer + o.id).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : -1) * sort.dir), [q, filter, sort]);
  const toggle = (k: "amount" | "customer") => setSort((s) => ({ k, dir: s.k === k ? (s.dir === 1 ? -1 : 1) : -1 }));

  const Side = (
    <aside className="flex h-full w-64 flex-col border-r border-white/5 bg-[#0b0b12] p-4">
      <div className="mb-8 flex items-center gap-2 px-2 text-lg font-semibold text-white"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm">N</span>Nimbus</div>
      <nav className="space-y-1">
        {nav.map((n) => (
          <button key={n} onClick={() => { setActive(n); setMenu(false); }} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${active === n ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>{n}</button>
        ))}
      </nav>
      <div className="mt-auto rounded-xl bg-gradient-to-br from-indigo-600/30 to-cyan-500/10 p-4 text-sm">
        <p className="font-medium text-white">Upgrade to Pro</p><p className="mt-1 text-xs text-zinc-400">Unlock advanced reports.</p>
        <button className="mt-3 w-full rounded-lg bg-white py-1.5 text-xs font-semibold text-zinc-900">Upgrade</button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#07070b] text-zinc-300">
      <div className="sticky top-0 hidden h-screen lg:block">{Side}</div>
      {menu && <div className="fixed inset-0 z-50 flex lg:hidden"><div className="h-full">{Side}</div><button aria-label="Close" className="flex-1 bg-black/60" onClick={() => setMenu(false)} /></div>}

      <div className="min-w-0 flex-1 pb-24">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-[#07070b]/80 px-4 backdrop-blur sm:px-8">
          <button aria-label="Menu" onClick={() => setMenu(true)} className="text-xl lg:hidden">☰</button>
          <h1 className="text-lg font-semibold text-white">{active}</h1>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="hidden w-64 rounded-lg sm:ml-auto border border-white/10 bg-white/5 px-3 py-1.5 text-sm outline-none focus:border-indigo-400 sm:block" />
          <span className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full sm:ml-0 bg-gradient-to-br from-pink-500 to-orange-400 text-sm font-semibold text-white">JD</span>
        </header>

        <main className="space-y-6 p-4 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[["Total revenue", "$84,254", "+18.2%", true], ["Orders", "2,431", "+9.1%", true], ["New customers", "642", "+4.3%", true], ["Refund rate", "1.8%", "+0.2%", false]].map(([k, v, c, up]) => (
              <div key={k as string} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <p className="text-sm text-zinc-500">{k}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{v}</p>
                <p className={`mt-1 text-xs ${up ? "text-emerald-400" : "text-rose-400"}`}>{c} vs last month</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 xl:col-span-2">
              <div className="mb-4 flex items-center justify-between"><h2 className="font-medium text-white">Revenue (k$)</h2><span className="rounded-md bg-white/5 px-2 py-1 text-xs">2026</span></div>
              <AreaChart />
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-6 font-medium text-white">Traffic sources</h2>
              <Donut />
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <h2 className="font-medium text-white">Recent orders</h2>
              <div className="flex gap-1 rounded-lg bg-white/5 p-1 text-xs">
                {(["All", ...statuses] as const).map((s) => <button key={s} onClick={() => setFilter(s)} className={`rounded-md px-3 py-1 ${filter === s ? "bg-white/10 text-white" : "text-zinc-400"}`}>{s}</button>)}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="border-y border-white/5 text-left text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="cursor-pointer px-5 py-3 font-medium hover:text-white" onClick={() => toggle("customer")}>Customer {sort.k === "customer" && (sort.dir === 1 ? "↑" : "↓")}</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="cursor-pointer px-5 py-3 text-right font-medium hover:text-white" onClick={() => toggle("amount")}>Amount {sort.k === "amount" && (sort.dir === 1 ? "↑" : "↓")}</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-mono text-zinc-400">{o.id}</td>
                      <td className="px-5 py-3 text-white">{o.customer}</td>
                      <td className="px-5 py-3 text-zinc-400">{o.date}</td>
                      <td className="px-5 py-3 text-right font-medium text-white">${o.amount.toFixed(2)}</td>
                      <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${badge[o.status]}`}>{o.status}</span></td>
                    </tr>
                  ))}
                  {!rows.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-zinc-500">No orders match.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <DemoBar gig="SaaS admin dashboard" />
    </div>
  );
}
