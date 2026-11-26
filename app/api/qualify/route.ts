import Anthropic from "@anthropic-ai/sdk";
import { heuristic, leadToPrompt, QUALIFY_SCHEMA, QUALIFY_SYSTEM, type Lead, type Qualification } from "@/lib/automation/qualify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const r = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  r.push(now);
  hits.set(ip, r);
  return r.length > 8;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return Response.json({ error: "Too many requests — try again in a minute." }, { status: 429 });
  let raw: Record<string, unknown>;
  try { raw = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }
  const lead: Lead = {};
  for (const k of ["name", "email", "company", "budget", "message"] as const)
    if (typeof raw[k] === "string") lead[k] = (raw[k] as string).slice(0, 1500);
  if (!lead.message?.trim()) return Response.json({ error: "Add a message to qualify." }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ mode: "demo", result: heuristic(lead) });

  try {
    const client = new Anthropic();
    const msg = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2048,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema: QUALIFY_SCHEMA } },
      system: QUALIFY_SYSTEM,
      messages: [{ role: "user", content: leadToPrompt(lead) }],
    });
    if (msg.stop_reason === "refusal") return Response.json({ mode: "demo", result: heuristic(lead) });
    const text = msg.content.find((b) => b.type === "text");
    const result = JSON.parse(text && text.type === "text" ? text.text : "{}") as Qualification;
    return Response.json({ mode: "ai", result });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return Response.json({ error: "AI is busy, try again shortly." }, { status: 429 });
    console.error("qualify failed", err);
    return Response.json({ mode: "demo", result: heuristic(lead) });
  }
}
