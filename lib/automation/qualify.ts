// Shared by the website demo (/api/qualify) and mirrored in the n8n workflow
// (products/n8n/ai-lead-qualifier.json) so the demo behaves like the product.

export type Lead = { name?: string; email?: string; company?: string; budget?: string; message?: string };
export type Qualification = {
  score: number;
  tier: "hot" | "warm" | "cold";
  intent: string;
  budget_fit: "high" | "medium" | "low" | "unknown";
  urgency: "high" | "medium" | "low";
  summary: string;
  next_step: string;
  reply_draft: string;
};

export const QUALIFY_SYSTEM = `You qualify inbound sales leads for a small web & AI automation studio.
Services: websites, AI chatbots, n8n automations, web scraping. Typical project: $150–$3,000.
Score the lead 0–100 on fit, intent, budget and urgency. tier: hot (>=70), warm (40–69), cold (<40).
Be fair: short or vague messages are warm/cold, not hot. Spam or unrelated = cold with score < 10.
reply_draft: a friendly 2–4 sentence first reply the owner could send, specific to the request, ending with one clear question. No placeholders like [Name] — use the lead's name if given.`;

export const QUALIFY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["score", "tier", "intent", "budget_fit", "urgency", "summary", "next_step", "reply_draft"],
  properties: {
    score: { type: "integer" },
    tier: { type: "string", enum: ["hot", "warm", "cold"] },
    intent: { type: "string" },
    budget_fit: { type: "string", enum: ["high", "medium", "low", "unknown"] },
    urgency: { type: "string", enum: ["high", "medium", "low"] },
    summary: { type: "string" },
    next_step: { type: "string" },
    reply_draft: { type: "string" },
  },
} as const;

export const leadToPrompt = (l: Lead) =>
  `New lead from the website form:\n<lead>\n${JSON.stringify(l, null, 2)}\n</lead>`;

// Offline heuristic so the demo works without an API key.
export function heuristic(l: Lead): Qualification {
  const text = `${l.message ?? ""} ${l.budget ?? ""}`.toLowerCase();
  const money = Number((l.budget ?? "").replace(/[^0-9.]/g, "")) || 0;
  let score = 20;
  if ((l.message ?? "").length > 80) score += 15;
  if (/website|chatbot|automat|n8n|scrap|shopify|app|ai\b/.test(text)) score += 20;
  if (/asap|urgent|this week|deadline|launch/.test(text)) score += 15;
  if (money >= 1000) score += 25; else if (money >= 300) score += 15; else if (money > 0) score += 5;
  if (l.company) score += 5;
  score = Math.min(score, 95);
  const tier = score >= 70 ? "hot" : score >= 40 ? "warm" : "cold";
  const first = (l.name ?? "there").split(" ")[0];
  return {
    score, tier,
    intent: /chatbot/.test(text) ? "AI chatbot" : /scrap/.test(text) ? "Web scraping" : /automat|n8n/.test(text) ? "Automation" : /website|site|landing/.test(text) ? "Website" : "General inquiry",
    budget_fit: money >= 1000 ? "high" : money >= 300 ? "medium" : money > 0 ? "low" : "unknown",
    urgency: /asap|urgent|this week|deadline/.test(text) ? "high" : /month|soon|launch/.test(text) ? "medium" : "low",
    summary: (l.message ?? "").slice(0, 140) || "No details provided.",
    next_step: tier === "hot" ? "Reply within 1 hour and offer a call." : tier === "warm" ? "Reply today with 2 clarifying questions." : "Send the standard info reply.",
    reply_draft: `Hi ${first}, thanks for reaching out! I'd love to help with this. Could you share a bit more about your timeline and what success looks like for you?`,
  };
}
