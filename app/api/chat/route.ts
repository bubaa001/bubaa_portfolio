import Anthropic from "@anthropic-ai/sdk";
import { bots, defaultBot, scriptedAnswer, systemPrompt } from "@/lib/chatbot/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InMsg = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 20;
const MAX_CHARS = 1000;

// Very small in-memory rate limit (per server instance). Use Upstash/Redis for real traffic.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 15;
}

function textStream(gen: AsyncGenerator<string>) {
  const enc = new TextEncoder();
  return new Response(
    new ReadableStream({
      async start(ctrl) {
        try {
          for await (const chunk of gen) ctrl.enqueue(enc.encode(chunk));
        } catch (err) {
          console.error("chat stream error", err);
          ctrl.enqueue(enc.encode("\n\nSorry, something went wrong. Please try again."));
        }
        ctrl.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

async function* fake(text: string) {
  for (let i = 0; i < text.length; i += 4) {
    yield text.slice(i, i + 4);
    await new Promise((r) => setTimeout(r, 15));
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return new Response("Too many messages — please wait a minute.", { status: 429 });

  let body: { bot?: string; messages?: InMsg[] };
  try { body = await req.json(); } catch { return new Response("Bad request", { status: 400 }); }

  const bot = (body.bot && bots[body.bot]) || defaultBot;
  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return new Response("Bad request", { status: 400 });

  // Demo mode: no key configured → scripted answers, so the demo always works.
  if (!process.env.ANTHROPIC_API_KEY) {
    return textStream(fake(scriptedAnswer(messages[messages.length - 1].content, bot)));
  }

  const client = new Anthropic();
  async function* live() {
    const stream = client.beta.messages.stream({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: systemPrompt(bot), cache_control: { type: "ephemeral" } }],
      messages,
    });
    let wrote = false;
    for await (const ev of stream) {
      if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
        wrote = true;
        yield ev.delta.text;
      }
    }
    const final = await stream.finalMessage();
    if (!wrote || final.stop_reason === "refusal") yield `I can't help with that here. ${bot.handoff}`;
  }
  return textStream(live());
}
