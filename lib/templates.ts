// ✏️ The template catalog shown on /templates. Add an entry to list a new template.
export type Template = {
  slug: string;
  name: string;
  kind: string; // short product type
  category: "E-commerce" | "Education" | "Corporate" | "Branding" | "Landing pages" | "Dashboards";
  href: string;
  cover: string;
  price: number; // starting price in USD (Fiverr basic package)
  premium?: boolean;
  isNew?: boolean;
  popularity: number; // for "Most popular" sort
  added: string; // ISO date, for "Newest"
  blurb: string;
  features: string[];
  stack: string[];
};

export const templates: Template[] = [
  {
    slug: "stryde", name: "STRYDE", kind: "Shoe & Sneaker Store", category: "E-commerce", href: "/templates/shoes", cover: "/templates/covers/shoes.jpg",
    price: 149, premium: true, isNew: true, popularity: 100, added: "2026-11-27",
    blurb: "A bold, animated online store for shoe and sneaker sellers: colourway-switching hero, cursor-following category previews, quick-add sizes, a cart that sends orders to WhatsApp, and a live drop countdown.",
    features: ["Interactive colourway hero with parallax", "Cursor-following category previews", "Quick-add with size picker", "Cart drawer: WhatsApp order + M-Pesa", "Drop countdown + notify form", "Original AI product photography (no third-party brands)"],
    stack: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    slug: "kilele-school", name: "Kilele", kind: "School Website", category: "Education", href: "/templates/school", cover: "/templates/covers/school.jpg",
    price: 79, premium: true, isNew: true, popularity: 98, added: "2026-11-26",
    blurb: "An elegant, admissions-focused website for schools and academies, with programmes, campus gallery, news and an enquiry form.",
    features: ["Cinematic hero with Ken Burns photo", "Animated stats counters", "Tabbed programmes", "Masonry campus gallery", "Testimonial carousel", "Admissions steps + enquiry form"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "kilele-sms", name: "Kilele SMS", kind: "School Management System", category: "Education", href: "/templates/school-admin", cover: "/templates/covers/school-admin.jpg",
    price: 149, premium: true, isNew: true, popularity: 95, added: "2026-11-26",
    blurb: "A complete school admin dashboard: students, attendance registers, gradebook with automatic ranking, fees with mobile-money payments, and timetables.",
    features: ["Login screen", "Student records with search, add, edit, CSV export", "Daily attendance register", "Editable gradebook with grades and positions", "Fee tracking and payment recording", "Weekly timetable"],
    stack: ["Next.js", "React", "Tailwind CSS", "Ready for Supabase/Django API"],
  },
  {
    slug: "meridian", name: "Meridian", kind: "Corporate / Official Website", category: "Corporate", href: "/templates/corporate", cover: "/templates/covers/corporate.jpg",
    price: 99, premium: true, isNew: true, popularity: 99, added: "2026-11-26",
    blurb: "An editorial, high-trust website for companies, NGOs and public institutions, with services, projects, leadership and insights.",
    features: ["Word-by-word hero reveal", "Client logo marquee", "Hover-reveal services", "Project showcase", "Leadership grid", "Insights list + contact form"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "nuru-brand", name: "Nuru", kind: "Brand Guidelines Toolkit", category: "Branding", href: "/templates/brand-kit", cover: "/templates/covers/brand-kit.jpg",
    price: 69, premium: true, isNew: true, popularity: 90, added: "2026-11-26",
    blurb: "An interactive brand book: logo system, click-to-copy colour palette with contrast checks, type scale, imagery, components and social templates.",
    features: ["Logo on 3 backgrounds + misuse rules", "Copyable HEX / RGB / CMYK", "WCAG contrast pairings", "Type specimen + scale", "UI components", "Social post templates"],
    stack: ["Next.js", "Tailwind CSS", "SVG logo"],
  },
  {
    slug: "pulse", name: "Pulse", kind: "SaaS Landing Page", category: "Landing pages", href: "/demos/landing/saas", cover: "/templates/covers/saas.jpg",
    price: 59, popularity: 80, added: "2026-11-25",
    blurb: "A conversion-focused startup landing page with product preview, features, testimonials, pricing and a working lead form.",
    features: ["Lead form that emails you", "Pricing table", "FAQ accordion", "Config-driven: rebrand in minutes"],
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "oak-ember", name: "Oak & Ember", kind: "Restaurant Website", category: "Landing pages", href: "/demos/landing/restaurant", cover: "/templates/covers/restaurant.jpg",
    price: 59, popularity: 78, added: "2026-11-25",
    blurb: "A warm restaurant and café site with menus, reviews and a table-booking form.",
    features: ["Booking form", "Menu cards", "Reviews", "Serif editorial style"],
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "brightfix", name: "BrightFix", kind: "Service Business Website", category: "Landing pages", href: "/demos/landing/agency", cover: "/templates/covers/service.jpg",
    price: 59, popularity: 74, added: "2026-11-25",
    blurb: "A lead-generating site for plumbers, cleaners, electricians and other local services.",
    features: ["Quote request form", "Services grid", "How-it-works steps", "Trust signals"],
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "nimbus", name: "Nimbus", kind: "Admin Dashboard", category: "Dashboards", href: "/demos/dashboard", cover: "/projects/admin-dashboard.png",
    price: 89, popularity: 82, added: "2026-11-22",
    blurb: "A dark SaaS admin dashboard with KPI cards, charts and a searchable, sortable orders table.",
    features: ["KPI cards", "SVG charts", "Search, filter, sort", "Mobile drawer"],
    stack: ["Next.js", "React", "Tailwind CSS"],
  },
];

export const categories = ["E-commerce", "Corporate", "Education", "Branding", "Landing pages", "Dashboards"] as const;
