"use client";
import { useEffect, useMemo, useState } from "react";
import { attendanceWeek, CLASSES, events, feeMonths, grade, periods, SCHOOL, seedScores, seedStudents, SUBJECTS, timetable, TERM_FEE, tzs, type Status, type Student } from "./data";

/* ---------- persistence (browser only, safe if storage is blocked) ---------- */
function usePersisted<T>(key: string, init: () => T) {
  const [v, setV] = useState<T>(init);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => { if (ready) try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v, ready]);
  return [v, setV] as const;
}

const NAV = [
  ["dashboard", "Dashboard", "M3 12l9-9 9 9M5 10v10h14V10"],
  ["students", "Students", "M16 11a4 4 0 1 0-8 0M3 21a9 9 0 0 1 18 0"],
  ["attendance", "Attendance", "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
  ["grades", "Gradebook", "M4 19V5m6 14V9m6 10v-6m4 6V3"],
  ["fees", "Fees", "M3 7h18v10H3zM12 12h.01M7 12h.01M17 12h.01"],
  ["timetable", "Timetable", "M3 5h18v16H3zM3 10h18M8 3v4m8-4v4"],
] as const;
type Page = (typeof NAV)[number][0];

const Icon = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.04)] ${className}`}>{children}</div>;
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);
const hue = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
const Avatar = ({ name }: { name: string }) => <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white" style={{ background: `hsl(${hue(name)} 55% 55%)` }}>{initials(name)}</span>;

/* ---------------------------------- App ---------------------------------- */
export default function App() {
  const [authed, setAuthed] = usePersisted("sms-auth", () => false);
  const [students, setStudents] = usePersisted<Student[]>("sms-students", seedStudents);
  const [scores, setScores] = usePersisted("sms-scores", () => seedScores(seedStudents()));
  const [att, setAtt] = usePersisted<Record<string, Record<string, Status>>>("sms-att", () => ({}));
  const [page, setPage] = useState<Page>("dashboard");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const Side = (
    <aside className="flex h-full w-64 flex-col bg-[#0b1437] p-4 text-slate-300">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 font-bold text-white">K</span>
        <div><p className="font-semibold text-white">{SCHOOL}</p><p className="text-xs text-slate-400">Term 3 · 2026</p></div>
      </div>
      <nav className="space-y-1">
        {NAV.map(([k, label, d]) => (
          <button key={k} onClick={() => { setPage(k); setMenu(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${page === k ? "bg-white/10 text-white shadow-inner" : "hover:bg-white/5 hover:text-white"}`}>
            <Icon d={d} />{label}{page === k && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />}
          </button>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/10 p-4">
        <p className="text-sm font-medium text-white">Reports due 12 Dec</p>
        <p className="mt-1 text-xs text-slate-400">71% of teachers have submitted marks.</p>
        <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full w-[71%] rounded-full bg-indigo-400" /></div>
      </div>
      <button onClick={() => setAuthed(false)} className="mt-3 rounded-xl px-3 py-2 text-left text-sm text-slate-400 hover:bg-white/5 hover:text-white">↩ Sign out</button>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#f5f7fb] font-sans text-slate-700 [color-scheme:light]">
      <div className="sticky top-0 hidden h-screen lg:block">{Side}</div>
      {menu && <div className="fixed inset-0 z-50 flex lg:hidden"><div className="h-full animate-[slideIn_.25s_ease-out]">{Side}</div><button aria-label="Close menu" className="flex-1 bg-slate-900/50" onClick={() => setMenu(false)} /></div>}
      <div className="min-w-0 flex-1 pb-24">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur sm:px-8">
          <button className="lg:hidden" onClick={() => setMenu(true)} aria-label="Menu"><Icon d="M4 7h16M4 12h16M4 17h16" /></button>
          <h1 className="text-lg font-semibold text-slate-900">{NAV.find((n) => n[0] === page)![1]}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 sm:inline">● All systems normal</span>
            <Avatar name="Grace Mwakyusa" />
          </div>
        </header>
        <main key={page} className="animate-[fadeIn_.35s_ease-out] p-4 sm:p-8">
          {page === "dashboard" && <Dashboard students={students} go={setPage} />}
          {page === "students" && <Students students={students} setStudents={setStudents} notify={notify} />}
          {page === "attendance" && <Attendance students={students} att={att} setAtt={setAtt} notify={notify} />}
          {page === "grades" && <Grades students={students} scores={scores} setScores={setScores} />}
          {page === "fees" && <Fees students={students} setStudents={setStudents} notify={notify} />}
          {page === "timetable" && <Timetable />}
        </main>
      </div>
      {toast && <div className="fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 animate-[fadeIn_.2s] rounded-xl bg-slate-900 px-5 py-3 text-sm text-white shadow-2xl">✓ {toast}</div>}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes slideIn{from{transform:translateX(-100%)}to{transform:none}}`}</style>
    </div>
  );
}

/* --------------------------------- Login --------------------------------- */
function Login({ onLogin }: { onLogin: () => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="grid min-h-screen bg-[#f5f7fb] font-sans [color-scheme:light] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#0b1437] p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" /><div className="absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-xl font-bold">K</span>
        <div className="relative mt-auto">
          <p className="text-4xl font-semibold leading-tight">Run your whole school<br />from one calm dashboard.</p>
          <p className="mt-4 max-w-md text-slate-400">Students, attendance, marks, fees and timetables, always up to date for teachers, bursars and the head of school.</p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">{[["1,240", "Students"], ["98%", "Fee visibility"], ["5 min", "Daily register"]].map(([v, l]) => <div key={l} className="rounded-xl bg-white/5 p-4"><p className="text-2xl font-semibold">{v}</p><p className="text-slate-400">{l}</p></div>)}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(onLogin, 700); }} className="w-full max-w-sm">
          <p className="text-sm font-medium text-indigo-600">{SCHOOL}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-500">Sign in to the school portal.</p>
          <label className="mt-8 block text-sm font-medium text-slate-700">Email<input defaultValue="head@kileleacademy.example" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></label>
          <label className="mt-4 block text-sm font-medium text-slate-700">Password<input type="password" defaultValue="demo-password" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></label>
          <button disabled={busy} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 disabled:opacity-70">{busy ? "Signing in…" : "Sign in"}</button>
          <p className="mt-4 text-center text-xs text-slate-400">Demo: credentials are pre-filled.</p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------- Dashboard ------------------------------- */
function Dashboard({ students, go }: { students: Student[]; go: (p: Page) => void }) {
  const collected = students.reduce((a, s) => a + s.paid, 0), due = students.reduce((a, s) => a + s.fee, 0);
  const w = 560, h = 160, max = 100, min = 85;
  const pts = attendanceWeek.map((v, i) => [(i / (attendanceWeek.length - 1)) * w, h - ((v - min) / (max - min)) * h]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const kpi = [
    ["Students", students.length.toString(), "+12 this term", "bg-indigo-50 text-indigo-600", "M16 11a4 4 0 1 0-8 0M3 21a9 9 0 0 1 18 0"],
    ["Attendance today", "96.4%", "+1.2% vs last week", "bg-emerald-50 text-emerald-600", "M9 11l3 3 8-8"],
    ["Fees collected", `${Math.round((collected / due) * 100)}%`, tzs(collected), "bg-amber-50 text-amber-600", "M3 7h18v10H3z"],
    ["Teachers", "48", "3 on leave", "bg-rose-50 text-rose-600", "M12 14l9-5-9-5-9 5 9 5zM12 14v7"],
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-sm text-slate-500">Thursday, 26 November</p><h2 className="text-2xl font-semibold text-slate-900">Good morning, Grace 👋</h2></div>
        <button onClick={() => go("attendance")} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">Take today&apos;s register</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpi.map(([k, v, sub, c, d]) => (
          <Card key={k} className="transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-500">{k}</p><span className={`grid h-9 w-9 place-items-center rounded-xl ${c}`}><Icon d={d} className="h-4 w-4" /></span></div>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{v}</p><p className="mt-1 text-xs text-slate-400">{sub}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-900">Attendance · last 12 school days</h3><span className="text-xs text-slate-400">%</span></div>
          <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full">
            <defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6366f1" stopOpacity=".25" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs>
            {[0, 0.5, 1].map((t) => <line key={t} x1="0" x2={w} y1={t * h} y2={t * h} stroke="#e2e8f0" strokeDasharray="4 4" />)}
            <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#ag)" /><path d={line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" className="[stroke-dasharray:1400] [stroke-dashoffset:1400] animate-[draw_1.4s_ease-out_forwards]" />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="white" stroke="#6366f1" strokeWidth="2" />)}
          </svg>
          <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold text-slate-900">Fee collection (M TZS)</h3>
          <div className="flex h-40 items-end gap-3">
            {feeMonths.map(([m, v], i) => (
              <div key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[11px] font-medium text-slate-500">{v}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-violet-400 origin-bottom animate-[grow_.9s_cubic-bezier(.16,1,.3,1)_both]" style={{ height: `${(v / 90) * 100}%`, animationDelay: `${i * 90}ms` }} />
                <span className="text-xs text-slate-400">{m}</span>
              </div>
            ))}
          </div>
          <style>{`@keyframes grow{from{transform:scaleY(0)}to{transform:none}}`}</style>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold text-slate-900">Outstanding fees</h3><button onClick={() => go("fees")} className="text-sm text-indigo-600 hover:underline">View all</button></div>
          <ul className="divide-y divide-slate-100">
            {students.filter((s) => s.paid < s.fee).sort((a, b) => a.paid - b.paid).slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-3"><Avatar name={s.name} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.cls} · {s.guardian}</p></div><p className="text-sm font-medium text-rose-600">{tzs(s.fee - s.paid)}</p></li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="mb-3 font-semibold text-slate-900">Upcoming</h3>
          <ul className="space-y-3">{events.map((e) => <li key={e.t} className="flex gap-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${e.c}`} /><div><p className="text-xs font-medium text-slate-400">{e.d}</p><p className="text-sm text-slate-800">{e.t}</p></div></li>)}</ul>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------------- Students -------------------------------- */
function Students({ students, setStudents, notify }: { students: Student[]; setStudents: (s: Student[]) => void; notify: (m: string) => void }) {
  const [q, setQ] = useState(""); const [cls, setCls] = useState("All"); const [edit, setEdit] = useState<Student | null>(null);
  const rows = students.filter((s) => (cls === "All" || s.cls === cls) && (s.name + s.id).toLowerCase().includes(q.toLowerCase()));
  function exportCsv() {
    const csv = ["ID,Name,Class,Gender,Guardian,Phone,Fee,Paid", ...rows.map((s) => [s.id, s.name, s.cls, s.gender, s.guardian, s.phone, s.fee, s.paid].join(","))].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "students.csv"; a.click();
  }
  function save(s: Student) {
    setStudents(students.some((x) => x.id === s.id) ? students.map((x) => (x.id === s.id ? s : x)) : [s, ...students]);
    setEdit(null); notify("Student saved");
  }
  return (
    <Card className="p-0">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or ID…" className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500 sm:w-64" />
        <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none">{["All", ...CLASSES].map((c) => <option key={c}>{c}</option>)}</select>
        <div className="ml-auto flex gap-2">
          <button onClick={exportCsv} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">Export CSV</button>
          <button onClick={() => setEdit({ id: `KA-${2400 + students.length + Math.floor(Math.random() * 1000)}`, name: "", cls: CLASSES[0], gender: "F", guardian: "", phone: "", fee: TERM_FEE, paid: 0 })} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">+ Add student</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400"><tr>{["Student", "Class", "Guardian", "Phone", "Fees", ""].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((s) => (
              <tr key={s.id} className="transition hover:bg-indigo-50/40">
                <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar name={s.name} /><div><p className="font-medium text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.id}</p></div></div></td>
                <td className="px-5 py-3"><span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">{s.cls}</span></td>
                <td className="px-5 py-3">{s.guardian}</td><td className="px-5 py-3 text-slate-500">{s.phone}</td>
                <td className="px-5 py-3">{s.paid >= s.fee ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Paid</span> : s.paid > 0 ? <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">Partial</span> : <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">Unpaid</span>}</td>
                <td className="px-5 py-3 text-right"><button onClick={() => setEdit(s)} className="rounded-lg px-2 py-1 text-indigo-600 hover:bg-indigo-50">Edit</button><button onClick={() => { if (confirm(`Remove ${s.name}?`)) { setStudents(students.filter((x) => x.id !== s.id)); notify("Student removed"); } }} className="rounded-lg px-2 py-1 text-rose-600 hover:bg-rose-50">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="p-10 text-center text-slate-400">No students match.</p>}
      </div>
      <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">{rows.length} of {students.length} students</p>
      {edit && <StudentModal s={edit} onSave={save} onClose={() => setEdit(null)} />}
    </Card>
  );
}

function StudentModal({ s, onSave, onClose }: { s: Student; onSave: (s: Student) => void; onClose: () => void }) {
  const [f, setF] = useState(s);
  const inp = "mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="w-full max-w-lg animate-[fadeIn_.25s] rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-900">{s.name ? "Edit student" : "New student"}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm sm:col-span-2">Full name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inp} /></label>
          <label className="text-sm">Class<select value={f.cls} onChange={(e) => setF({ ...f, cls: e.target.value })} className={inp}>{CLASSES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="text-sm">Gender<select value={f.gender} onChange={(e) => setF({ ...f, gender: e.target.value as "M" | "F" })} className={inp}><option value="F">Female</option><option value="M">Male</option></select></label>
          <label className="text-sm">Guardian<input value={f.guardian} onChange={(e) => setF({ ...f, guardian: e.target.value })} className={inp} /></label>
          <label className="text-sm">Phone<input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={inp} /></label>
        </div>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm hover:bg-slate-100">Cancel</button><button className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save</button></div>
      </form>
    </div>
  );
}

/* ------------------------------- Attendance ------------------------------- */
function Attendance({ students, att, setAtt, notify }: { students: Student[]; att: Record<string, Record<string, Status>>; setAtt: (a: Record<string, Record<string, Status>>) => void; notify: (m: string) => void }) {
  const [cls, setCls] = useState(CLASSES[0]);
  const [date, setDate] = useState("2026-11-26");
  const key = `${cls}|${date}`;
  const list = students.filter((s) => s.cls === cls);
  const [draft, setDraft] = useState<Record<string, Status>>({});
  useEffect(() => { setDraft(att[key] ?? Object.fromEntries(list.map((s) => [s.id, "P" as Status]))); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const count = (st: Status) => list.filter((s) => (draft[s.id] ?? "P") === st).length;
  const btn: Record<Status, string> = { P: "bg-emerald-500 text-white", A: "bg-rose-500 text-white", L: "bg-amber-400 text-white" };
  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center gap-3">
        <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">{CLASSES.map((c) => <option key={c}>{c}</option>)}</select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <div className="flex gap-4 text-sm"><span className="text-emerald-600">● {count("P")} present</span><span className="text-rose-600">● {count("A")} absent</span><span className="text-amber-600">● {count("L")} late</span></div>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setDraft(Object.fromEntries(list.map((s) => [s.id, "P" as Status])))} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">Mark all present</button>
          <button onClick={() => { setAtt({ ...att, [key]: draft }); notify(`Register saved for ${cls}`); }} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save register</button>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => (
          <Card key={s.id} className="flex items-center gap-3 py-4">
            <Avatar name={s.name} /><div className="min-w-0 flex-1"><p className="truncate font-medium text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.id}</p></div>
            <div className="flex gap-1">{(["P", "A", "L"] as Status[]).map((st) => <button key={st} onClick={() => setDraft({ ...draft, [s.id]: st })} className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${(draft[s.id] ?? "P") === st ? btn[st] + " shadow-md" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>{st}</button>)}</div>
          </Card>
        ))}
      </div>
      {att[key] && <p className="text-xs text-slate-400">✓ Saved register found for this class and date.</p>}
    </div>
  );
}

/* -------------------------------- Gradebook -------------------------------- */
function Grades({ students, scores, setScores }: { students: Student[]; scores: Record<string, Record<string, number>>; setScores: (s: Record<string, Record<string, number>>) => void }) {
  const [cls, setCls] = useState(CLASSES[0]);
  const list = students.filter((s) => s.cls === cls);
  const avg = (id: string) => { const v = SUBJECTS.map((sub) => scores[id]?.[sub] ?? 0); return v.reduce((a, b) => a + b, 0) / v.length; };
  const ranked = useMemo(() => [...list].sort((a, b) => avg(b.id) - avg(a.id)), [list, scores]); // eslint-disable-line react-hooks/exhaustive-deps
  const colour = (g: string) => ({ A: "text-emerald-600 bg-emerald-50", B: "text-sky-600 bg-sky-50", C: "text-amber-600 bg-amber-50", D: "text-orange-600 bg-orange-50", F: "text-rose-600 bg-rose-50" })[g];
  return (
    <Card className="p-0">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
        <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">{CLASSES.map((c) => <option key={c}>{c}</option>)}</select>
        <p className="text-sm text-slate-500">Mid-term · click any score to edit. Averages, grades and positions update instantly.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400"><tr><th className="px-4 py-3 font-medium">Pos</th><th className="px-4 py-3 font-medium">Student</th>{SUBJECTS.map((s) => <th key={s} className="px-2 py-3 text-center font-medium">{s.slice(0, 4)}</th>)}<th className="px-4 py-3 text-center font-medium">Avg</th><th className="px-4 py-3 text-center font-medium">Grade</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {ranked.map((s, i) => { const a = avg(s.id), g = grade(a); return (
              <tr key={s.id} className="hover:bg-indigo-50/40">
                <td className="px-4 py-2 font-semibold text-slate-400">{i + 1}</td>
                <td className="px-4 py-2 font-medium text-slate-900">{s.name}</td>
                {SUBJECTS.map((sub) => (
                  <td key={sub} className="px-1 py-1.5 text-center">
                    <input type="number" min={0} max={100} value={scores[s.id]?.[sub] ?? 0} onChange={(e) => setScores({ ...scores, [s.id]: { ...scores[s.id], [sub]: Math.max(0, Math.min(100, Number(e.target.value))) } })} className={`w-14 rounded-lg border border-transparent bg-transparent py-1 text-center outline-none hover:border-slate-200 focus:border-indigo-500 focus:bg-white ${(scores[s.id]?.[sub] ?? 0) < 30 ? "text-rose-600" : ""}`} />
                  </td>
                ))}
                <td className="px-4 py-2 text-center font-semibold text-slate-900">{a.toFixed(1)}</td>
                <td className="px-4 py-2 text-center"><span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${colour(g)}`}>{g}</span></td>
              </tr>); })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ---------------------------------- Fees ---------------------------------- */
function Fees({ students, setStudents, notify }: { students: Student[]; setStudents: (s: Student[]) => void; notify: (m: string) => void }) {
  const [pay, setPay] = useState<Student | null>(null); const [amt, setAmt] = useState(0);
  const [filter, setFilter] = useState<"All" | "Unpaid" | "Partial" | "Paid">("All");
  const st = (s: Student) => (s.paid >= s.fee ? "Paid" : s.paid > 0 ? "Partial" : "Unpaid");
  const due = students.reduce((a, s) => a + s.fee, 0), got = students.reduce((a, s) => a + s.paid, 0);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Expected this term", tzs(due), "text-slate-900"], ["Collected", tzs(got), "text-emerald-600"], ["Outstanding", tzs(due - got), "text-rose-600"]].map(([k, v, c]) => <Card key={k}><p className="text-sm text-slate-500">{k}</p><p className={`mt-2 text-2xl font-semibold ${c}`}>{v}</p></Card>)}
      </div>
      <Card className="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-5">
          {(["All", "Unpaid", "Partial", "Paid"] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-sm ${filter === f ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{f}</button>)}
        </div>
        <ul className="divide-y divide-slate-100">
          {students.filter((s) => filter === "All" || st(s) === filter).map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
              <Avatar name={s.name} /><div className="min-w-[160px] flex-1"><p className="font-medium text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.cls} · {s.id}</p></div>
              <div className="w-48"><div className="h-2 rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-700 ${s.paid >= s.fee ? "bg-emerald-500" : "bg-indigo-500"}`} style={{ width: `${Math.min(100, (s.paid / s.fee) * 100)}%` }} /></div><p className="mt-1 text-xs text-slate-400">{tzs(s.paid)} of {tzs(s.fee)}</p></div>
              {s.paid < s.fee ? <button onClick={() => { setPay(s); setAmt(s.fee - s.paid); }} className="rounded-xl border border-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">Record payment</button> : <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">✓ Cleared</span>}
            </li>
          ))}
        </ul>
      </Card>
      {pay && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setPay(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); setStudents(students.map((x) => (x.id === pay.id ? { ...x, paid: Math.min(x.fee, x.paid + amt) } : x))); setPay(null); notify(`Payment of ${tzs(amt)} recorded`); }} className="w-full max-w-sm animate-[fadeIn_.25s] rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Record payment</h3><p className="text-sm text-slate-500">{pay.name} · balance {tzs(pay.fee - pay.paid)}</p>
            <label className="mt-5 block text-sm">Amount (TZS)<input type="number" min={1000} step={1000} max={pay.fee - pay.paid} value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-500" /></label>
            <label className="mt-3 block text-sm">Method<select className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5"><option>M-Pesa</option><option>Bank deposit</option><option>Tigo Pesa</option><option>Airtel Money</option><option>Cash</option></select></label>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setPay(null)} className="rounded-xl px-4 py-2 text-sm hover:bg-slate-100">Cancel</button><button className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">Save payment</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Timetable -------------------------------- */
function Timetable() {
  const colour = (s: string) => s === "Break" || s === "Lunch" ? "bg-slate-50 text-slate-400" : `text-slate-800`;
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[900px] text-sm">
        <thead><tr className="text-xs uppercase tracking-wider text-slate-400"><th className="w-28 px-4 py-3 text-left font-medium">Form 1A</th>{periods.map((p) => <th key={p} className="px-2 py-3 font-medium">{p}</th>)}</tr></thead>
        <tbody>
          {Object.entries(timetable).map(([day, slots]) => (
            <tr key={day} className="border-t border-slate-100">
              <td className="px-4 py-3 font-semibold text-slate-900">{day}</td>
              {slots.map((s, i) => (
                <td key={i} className="p-1.5">
                  <div className={`rounded-xl px-3 py-3 text-center text-xs font-medium transition hover:scale-[1.03] ${colour(s)}`} style={s === "Break" || s === "Lunch" ? {} : { background: `hsl(${hue(s)} 80% 95%)`, borderLeft: `3px solid hsl(${hue(s)} 60% 55%)` }}>{s}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
