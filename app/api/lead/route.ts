export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["name", "email", "phone", "message", "date", "guests", "source"] as const;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return Response.json({ ok: false, error: "Bad request" }, { status: 400 }); }

  // Honeypot: real users never fill the hidden "company" field.
  if (typeof data.company === "string" && data.company) return Response.json({ ok: true });

  const lead: Record<string, string> = {};
  for (const k of ALLOWED) if (typeof data[k] === "string") lead[k] = (data[k] as string).trim().slice(0, 2000);
  if (!lead.name || (!lead.email && !lead.phone)) return Response.json({ ok: false, error: "Please add your name and an email or phone." }, { status: 400 });
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return Response.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });

  // Delivery: email via Resend when configured (RESEND_API_KEY + LEAD_TO_EMAIL), otherwise log.
  const key = process.env.RESEND_API_KEY, to = process.env.LEAD_TO_EMAIL;
  if (key && to) {
    const text = Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join("\n");
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL || "Leads <onboarding@resend.dev>", to: [to], reply_to: lead.email || undefined, subject: `New lead: ${lead.name} (${lead.source || "website"})`, text }),
    });
    if (!r.ok) { console.error("lead email failed", r.status, await r.text()); return Response.json({ ok: false, error: "Couldn't send right now, please try again." }, { status: 502 }); }
  } else {
    console.log("New lead (email not configured):", lead);
  }
  return Response.json({ ok: true });
}
