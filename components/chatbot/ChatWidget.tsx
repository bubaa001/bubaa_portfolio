"use client";
import { useEffect, useRef, useState } from "react";

export type PublicBot = { id: string; botName: string; tagline: string; accent: string; avatar: string; greeting: string; quickReplies: string[] };
type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget({ bot, embedded = false }: { bot: PublicBot; embedded?: boolean }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [input, setInput] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs, waiting]);
  useEffect(() => {
    if (embedded) window.parent?.postMessage({ type: "bubaa-chat", open }, "*");
  }, [open, embedded]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(history);
    setInput("");
    setBusy(true);
    setWaiting(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bot: bot.id, messages: history }) });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      setWaiting(false);
      setMsgs((m) => [...m, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: acc }; return c; });
      }
    } catch (e) {
      setWaiting(false);
      const msg = e instanceof Error && e.message.length < 120 ? e.message : "Sorry, I couldn't connect. Please try again.";
      setMsgs((m) => [...m, { role: "assistant", content: msg }]);
    } finally {
      setBusy(false);
    }
  }

  const shown: Msg[] = [{ role: "assistant", content: bot.greeting }, ...msgs];
  const pos = embedded ? "fixed bottom-3 right-3" : "fixed bottom-20 right-4 sm:right-6";

  return (
    <div className={`${pos} z-50 flex flex-col items-end gap-3 font-sans`} style={{ ["--accent" as string]: bot.accent }}>
      {open && (
        <div className={`flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl ${embedded ? "h-[calc(100vh-6rem)] w-[calc(100vw-1.5rem)]" : "h-[480px] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm"}`}>
          <div className="flex items-center gap-3 bg-stone-900 px-5 py-4 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)]">{bot.avatar}</span>
            <div><p className="text-sm font-semibold">{bot.botName}</p><p className="text-xs text-stone-400">{bot.tagline}</p></div>
            <button onClick={() => setOpen(false)} className="ml-auto text-stone-400 hover:text-white" aria-label="Close chat">✕</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4 text-sm" aria-live="polite">
            {shown.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <p className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 ${m.role === "user" ? "rounded-br-md bg-[var(--accent)] text-white" : "rounded-bl-md bg-white text-stone-800 shadow-sm"}`}>{m.content || "…"}</p>
              </div>
            ))}
            {waiting && <div className="flex w-fit gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
            <div ref={end} />
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-stone-100 px-3 py-2">
            {bot.quickReplies.map((q) => <button key={q} onClick={() => send(q)} disabled={busy} className="shrink-0 rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-[var(--accent)] disabled:opacity-50">{q}</button>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-stone-100 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} placeholder="Type a message…" className="flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            <button disabled={busy} className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-white disabled:opacity-50" aria-label="Send">↑</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-2xl text-white shadow-xl transition hover:scale-105" aria-label={open ? "Close chat" : "Open chat"}>{open ? "✕" : "💬"}</button>
    </div>
  );
}
