import type { LandingConfig } from "./types";

// ✏️ New client = copy one of these, change the words/colors/images, deploy.
export const saas: LandingConfig = {
  slug: "saas", label: "SaaS / Startup", brand: "Pulse", logo: "◆",
  theme: { bg: "#fbfbfd", surface: "#ffffff", text: "#0f172a", muted: "#64748b", accent: "#4f46e5", accentText: "#ffffff", border: "#e2e8f0", heading: "sans" },
  nav: ["Features", "How it works", "Pricing", "FAQ"],
  hero: { badge: "✨ New: AI weekly reports", title: "Analytics your whole team", highlight: "actually understands", sub: "Pulse turns raw traffic into clear answers. Set up in 2 minutes, no cookies, no data science degree.", cta: "Start free — no card", cta2: "See how it works", proof: "★★★★★ Loved by 12,000+ teams" },
  logos: ["Northwind", "Acme", "Globex", "Umbrella", "Initech", "Hooli"],
  stats: [["2 min", "average setup"], ["99.99%", "uptime"], ["1 KB", "tracking script"]],
  featuresTitle: "Everything you need, nothing you don't",
  features: [
    { icon: "⚡", title: "Real-time dashboards", text: "See every visitor, signup and sale the second it happens." },
    { icon: "🎯", title: "Funnels that explain why", text: "Find exactly where users drop off and what to fix first." },
    { icon: "🔒", title: "Privacy-first", text: "No cookies, no banners, GDPR and CCPA compliant." },
    { icon: "🧩", title: "40+ integrations", text: "Stripe, Shopify, Webflow, Slack and more in two clicks." },
    { icon: "🤖", title: "AI insights", text: "Weekly plain-English reports on what changed and why." },
    { icon: "📱", title: "Works everywhere", text: "Web, iOS and Android with one tiny script." },
  ],
  steps: [
    { title: "Add one line", text: "Paste our script or install the plugin." },
    { title: "Watch data flow", text: "Dashboards fill up in real time." },
    { title: "Get answers", text: "AI tells you what to improve each week." },
  ],
  testimonials: [
    { quote: "We replaced three tools with Pulse and finally understand our funnel.", name: "Sarah K.", role: "Head of Growth, sample quote" },
    { quote: "Setup took less time than my coffee. The weekly AI report is gold.", name: "Daniel M.", role: "Founder, sample quote" },
    { quote: "Our whole team checks it every morning. Nobody did that with GA.", name: "Priya R.", role: "Marketing Lead, sample quote" },
  ],
  pricing: { title: "Simple, honest pricing", plans: [
    { name: "Starter", price: "$0", per: "/mo", desc: "For side projects", feats: ["1 site", "10k events / mo", "7-day history"] },
    { name: "Growth", price: "$29", per: "/mo", desc: "For growing teams", feats: ["5 sites", "1M events / mo", "Funnels & cohorts", "Email support"], hot: true },
    { name: "Scale", price: "$99", per: "/mo", desc: "For serious volume", feats: ["Unlimited sites", "20M events / mo", "SSO", "Priority support"] },
  ] },
  faq: [
    ["Do I need a credit card?", "No. The Starter plan is free forever and trials don't need a card."],
    ["Is my data private?", "Yes. Pulse is cookieless and GDPR-compliant."],
    ["Can I import from Google Analytics?", "Yes, up to 3 years of history in one click."],
    ["What if I go over my limit?", "Nothing breaks. We'll email you and you can upgrade anytime."],
  ],
  lead: { title: "Join the waitlist for Pulse AI", sub: "Get early access and 3 months free.", button: "Get early access", fields: ["name", "email"] },
  footer: "© 2026 Pulse Analytics (fictional brand)",
};

export const restaurant: LandingConfig = {
  slug: "restaurant", label: "Restaurant / Café", brand: "Oak & Ember", logo: "🔥",
  theme: { bg: "#faf7f2", surface: "#ffffff", text: "#1c1917", muted: "#78716c", accent: "#c2410c", accentText: "#ffffff", border: "#e7e5e4", heading: "serif" },
  nav: ["Menu", "Experience", "Reviews", "Book"],
  hero: { badge: "Wood-fired kitchen · Downtown", title: "Slow food,", highlight: "cooked over real fire.", sub: "Seasonal plates, natural wine and a 12-seat chef's counter. Open Tuesday to Sunday.", cta: "Book a table", cta2: "View menu", image: "radial-gradient(circle at 30% 30%,#fb923c,#9a3412 60%,#292524)", proof: "★ 4.9 from 1,200+ guests" },
  stats: [["12", "seat chef's counter"], ["40+", "natural wines"], ["100%", "local produce"]],
  featuresTitle: "What makes us different",
  features: [
    { icon: "🔥", title: "Cooked over fire", text: "Every dish touches our wood oven or open grill." },
    { icon: "🥕", title: "Seasonal menu", text: "We change the menu with what local farms bring us." },
    { icon: "🍷", title: "Natural wine", text: "A small, lively list from independent growers." },
    { icon: "🌱", title: "Plant-friendly", text: "A third of the menu is vegetarian, vegan options marked." },
    { icon: "🎉", title: "Private events", text: "Book the whole room for up to 40 guests." },
    { icon: "🅿️", title: "Free parking", text: "Free guest parking right behind the restaurant." },
  ],
  testimonials: [
    { quote: "The ember-roasted cauliflower changed my life. Book the chef's counter.", name: "Amina O.", role: "Guest, sample review" },
    { quote: "Warm service, incredible food, and the wine list is so fun.", name: "Tom B.", role: "Guest, sample review" },
    { quote: "Best date night spot in town, no contest.", name: "Lucia F.", role: "Guest, sample review" },
  ],
  pricing: { title: "Our menus", plans: [
    { name: "À la carte", price: "$18–32", desc: "Mains, lunch & dinner", feats: ["Starters $9–14", "Wood-oven flatbreads", "Kids menu at lunch"] },
    { name: "Chef's counter", price: "$65", per: "/person", desc: "Thu–Sat, 19:00", feats: ["8-course tasting menu", "Watch the kitchen", "Wine pairing +$35"], hot: true },
    { name: "Private dining", price: "From $45", per: "/person", desc: "Groups of 12–40", feats: ["Custom menu", "Dedicated host", "AV for speeches"] },
  ] },
  faq: [
    ["Do you take walk-ins?", "Yes, at the bar and terrace, but booking is recommended on weekends."],
    ["Do you cater for allergies?", "Yes. Tell us when booking and we'll adapt your dishes."],
    ["Are kids welcome?", "Kids are very welcome at lunch, and we have a kids menu."],
    ["Can I buy a gift card?", "Yes, at the restaurant or by contacting us."],
  ],
  lead: { title: "Book your table", sub: "We'll confirm by email within the hour.", button: "Request booking", fields: ["name", "email", "date", "guests"] },
  footer: "© 2026 Oak & Ember (fictional restaurant) · 14 Riverside Lane",
};

export const agency: LandingConfig = {
  slug: "agency", label: "Service business", brand: "BrightFix Plumbing", logo: "🔧",
  theme: { bg: "#f8fafc", surface: "#ffffff", text: "#0c1a2e", muted: "#5b6b82", accent: "#0284c7", accentText: "#ffffff", border: "#dbe4ee", heading: "sans" },
  nav: ["Services", "How it works", "Reviews", "Get a quote"],
  hero: { badge: "⚡ Same-day service · Licensed & insured", title: "Leaks, clogs, heaters —", highlight: "fixed today.", sub: "Upfront prices, on-time plumbers and a 1-year guarantee on every job. Serving the whole metro area 7 days a week.", cta: "Get a free quote", cta2: "Call (555) 014-7788", image: "linear-gradient(135deg,#0ea5e9,#0c4a6e)", proof: "★ 4.9 on Google · 800+ jobs done" },
  stats: [["60 min", "average arrival"], ["1-year", "work guarantee"], ["24/7", "emergency line"]],
  featuresTitle: "Services we handle every day",
  features: [
    { icon: "🚿", title: "Leak repair", text: "Find and fix leaks fast, before they damage your home." },
    { icon: "🚽", title: "Drain cleaning", text: "Kitchen, bathroom and main-line clogs cleared for good." },
    { icon: "🔥", title: "Water heaters", text: "Repair and same-day replacement, tank or tankless." },
    { icon: "🛁", title: "Bathroom remodels", text: "From new fixtures to full renovations." },
    { icon: "🏢", title: "Commercial", text: "Maintenance plans for offices, shops and restaurants." },
    { icon: "🚨", title: "Emergencies", text: "Burst pipe at 2am? We pick up, every time." },
  ],
  steps: [
    { title: "Tell us the problem", text: "Fill the form or call — takes 30 seconds." },
    { title: "Get a fixed price", text: "No surprises. You approve before we start." },
    { title: "We fix it", text: "Clean, on-time work with a 1-year guarantee." },
  ],
  testimonials: [
    { quote: "Arrived in 40 minutes and fixed the leak in under an hour. Fair price.", name: "Mark T.", role: "Homeowner, sample review" },
    { quote: "Upfront quote, no upsell, super clean. My go-to plumber now.", name: "Grace N.", role: "Homeowner, sample review" },
    { quote: "They handle all our restaurant's plumbing. Always reliable.", name: "Chef Ali", role: "Business owner, sample review" },
  ],
  faq: [
    ["How much does a call-out cost?", "Diagnosis is free when we do the repair. You get a fixed price before any work."],
    ["Do you work weekends?", "Yes, 7 days a week, plus a 24/7 emergency line."],
    ["Are you licensed and insured?", "Yes, fully licensed and insured for residential and commercial work."],
    ["Do you guarantee your work?", "Every job comes with a 1-year labor guarantee."],
  ],
  lead: { title: "Get your free quote", sub: "We reply within 15 minutes during business hours.", button: "Send my request", fields: ["name", "phone", "email", "message"] },
  footer: "© 2026 BrightFix Plumbing (fictional business)",
};

export const landings: Record<string, LandingConfig> = { saas, restaurant, agency };
