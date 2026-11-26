"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "me"; text: string };

const kb: { keys: string[]; a: string }[] = [
  { keys: ["hour", "open", "close", "time"], a: "We're open Tuesday to Sunday, 12:00–15:00 for lunch and 18:00–23:00 for dinner. Closed Mondays." },
  { keys: ["book", "reserv", "table"], a: "I can help with that! Tables for up to 6 can be booked online. For bigger groups, I'll pass you to our events team. How many guests and what date?" },
  { keys: ["vegan", "vegetarian", "plant"], a: "Yes — about a third of the menu is vegetarian, and our ember-roasted cauliflower and smoked aubergine are fully vegan. Just tell your server." },
  { keys: ["allerg", "gluten", "nut"], a: "We take allergies seriously. Gluten-free bread is available, and we can adapt most dishes. Our kitchen does handle nuts, so please flag severe allergies when booking." },
  { keys: ["price", "cost", "expensive", "much"], a: "Starters are $9–14, mains $18–32. The chef's counter tasting menu is $65 per person." },
  { keys: ["park", "where", "location", "address"], a: "We're at 14 Riverside Lane, Westlands. Free parking for guests in the building behind us." },
  { keys: ["human", "person", "staff", "call"], a: "No problem — I've notified the team. Someone will reply here within 10 minutes, or you can call (555) 010-2030." },
];
const quick = ["Opening hours", "Book a table", "Vegan options?", "Allergies"];

function answer(q: string) {
  const s = q.toLowerCase();
  return kb.find((k) => k.keys.some((w) => s.includes(w)))?.a
    ?? "Good question! I don't have that in my notes yet, so I've passed it to the team. Meanwhile, I can help with hours, bookings, the menu or allergies.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! 👋 I'm Ember, the Oak & Ember assistant. Ask me about the menu, hours or bookings." }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs, typing]);

  function send(text: string) {
    if (!text.trim() || typing) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setTyping(true);
    const full = answer(text);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: "" }]);
      let i = 0;
      const t = setInterval(() => {
        i += 3;
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { from: "bot", text: full.slice(0, i) }; return c; });
        if (i >= full.length) clearInterval(t);
      }, 18);
    }, 700);
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {open && (
        <div className="flex h-[480px] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-stone-900 px-5 py-4 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-600">🔥</span>
            <div><p className="text-sm font-semibold">Ember</p><p className="text-xs text-stone-400">AI assistant · replies instantly</p></div>
            <button onClick={() => setOpen(false)} className="ml-auto text-stone-400 hover:text-white" aria-label="Close chat">✕</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                <p className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 ${m.from === "me" ? "rounded-br-md bg-orange-600 text-white" : "rounded-bl-md bg-white text-stone-800 shadow-sm"}`}>{m.text}</p>
              </div>
            ))}
            {typing && <div className="flex gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm w-fit">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
            <div ref={end} />
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-stone-100 px-3 py-2">
            {quick.map((q) => <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-orange-500 hover:text-orange-700">{q}</button>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-stone-100 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-orange-500" />
            <button className="grid h-9 w-9 place-items-center rounded-full bg-orange-600 text-white hover:bg-orange-500" aria-label="Send">↑</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="grid h-14 w-14 place-items-center rounded-full bg-orange-600 text-2xl text-white shadow-xl shadow-orange-600/30 transition hover:scale-105" aria-label="Open chat">{open ? "✕" : "💬"}</button>
    </div>
  );
}
