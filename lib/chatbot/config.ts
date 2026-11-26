// ✏️ One file per client. To deliver a new chatbot order:
// copy this object, replace the business info, set ANTHROPIC_API_KEY, deploy.
export type BotConfig = {
  id: string;
  business: string;
  botName: string;
  tagline: string;
  accent: string; // brand color
  avatar: string; // emoji or short text
  greeting: string;
  quickReplies: string[];
  handoff: string; // what to tell users when a human is needed
  knowledge: string; // everything the bot is allowed to answer from
};

export const bots: Record<string, BotConfig> = {
  "oak-ember": {
    id: "oak-ember",
    business: "Oak & Ember",
    botName: "Ember",
    tagline: "AI assistant · replies instantly",
    accent: "#ea580c",
    avatar: "🔥",
    greeting: "Hi! 👋 I'm Ember, the Oak & Ember assistant. Ask me about the menu, hours or bookings.",
    quickReplies: ["Opening hours", "Book a table", "Vegan options?", "Allergies"],
    handoff: "Call us on (555) 010-2030 or email hello@oakandember.example and the team will reply within the hour.",
    knowledge: `
Oak & Ember is a wood-fired restaurant downtown at 14 Riverside Lane. Free parking for guests in the building behind.
Hours: Tuesday–Sunday. Lunch 12:00–15:00, dinner 18:00–23:00. Closed Mondays.
Bookings: tables for up to 6 can be booked online at oakandember.example/book. Groups of 7+ and private events: email events@oakandember.example.
Menu: seasonal, cooked over fire. Starters $9–14, mains $18–32. Chef's counter tasting menu (12 seats, Thu–Sat 19:00) $65 per person, wine pairing +$35.
Signature dishes: ember-roasted cauliflower (vegan), smoked aubergine (vegan), flame-grilled ribeye, wood-oven flatbreads, burnt honey cheesecake.
Dietary: about a third of the menu is vegetarian; vegan dishes are marked. Gluten-free bread available. Kitchen handles nuts, sesame and dairy — guests with severe allergies should mention them when booking.
Drinks: natural wine list, local craft beer, zero-proof cocktails.
Kids welcome at lunch; kids menu $8.
Gift cards: available at the restaurant and online.
Cancellation: please cancel at least 24h before; no-shows for the tasting menu are charged $20 per person.
`.trim(),
  },
};

export const defaultBot = bots["oak-ember"];

export function systemPrompt(b: BotConfig) {
  return `You are ${b.botName}, the website assistant for ${b.business}.
Answer visitors' questions using only the business information below. Be warm, brief (1–3 short sentences), and specific.
If the answer isn't in the information, say you're not sure and share this contact option: ${b.handoff}
Never invent prices, dates, availability or policies. Don't discuss topics unrelated to ${b.business}; politely steer back.
Reply in the language the visitor writes in. Plain text only, no markdown.

<business_information>
${b.knowledge}
</business_information>`;
}

// Offline fallback used when no API key is configured (demo mode).
const scripted: { keys: string[]; a: string }[] = [
  { keys: ["hour", "open", "close", "time"], a: "We're open Tuesday to Sunday: lunch 12:00–15:00 and dinner 18:00–23:00. Closed Mondays." },
  { keys: ["book", "reserv", "table"], a: "Tables for up to 6 can be booked online at oakandember.example/book. For 7+ guests, email events@oakandember.example." },
  { keys: ["vegan", "vegetarian", "plant"], a: "About a third of the menu is vegetarian, and the ember-roasted cauliflower and smoked aubergine are fully vegan." },
  { keys: ["allerg", "gluten", "nut"], a: "Gluten-free bread is available and we adapt most dishes. Our kitchen handles nuts, sesame and dairy, so please flag severe allergies when booking." },
  { keys: ["price", "cost", "much", "menu"], a: "Starters are $9–14 and mains $18–32. The chef's counter tasting menu is $65 per person." },
  { keys: ["park", "where", "address", "location"], a: "We're at 14 Riverside Lane, downtown, with free guest parking in the building behind us." },
];
export function scriptedAnswer(q: string, b: BotConfig) {
  const s = q.toLowerCase();
  return scripted.find((k) => k.keys.some((w) => s.includes(w)))?.a ?? `I'm not sure about that one. ${b.handoff}`;
}
