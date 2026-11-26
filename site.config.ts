// ✏️  Edit this file to personalise the whole site.
export const siteConfig = {
  name: "Joshua John",
  handle: "bubaa",
  title: "AI Automation Developer",
  tagline: "I build AI chatbots, automations and data tools that save small businesses hours every week.",
  avatar: "https://github.com/bubaa001.png", // or "/me.jpg" placed in /public
  bio: [
    "I'm Joshua, a full-stack developer from Dar es Salaam, Tanzania. I build products end to end: Next.js and React on the web, Flutter on mobile, and Django or Node on the backend.",
    "I've shipped Kupon, a QR-based food payment platform for Tanzanian university cafeterias, and MURA, a Flutter habits app with its own content studio and auto-updates. Now I help businesses with AI chatbots, n8n automations and data tools that save hours every week.",
  ],
  location: "Dar es Salaam, Tanzania · works remotely worldwide",
  email: "joshuajohnr1@gmail.com",
  phone: "+255 742 901 900",
  whatsapp: "https://wa.me/255742901900",
  url: process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"), // used for SEO + sitemap
  resume: "", // e.g. "/resume.pdf" after dropping the PDF in /public
  available: true, // shows the "open to work" badge
  socials: [
    { label: "GitHub", href: "https://github.com/bubaa001" },
    { label: "WhatsApp", href: "https://wa.me/255742901900" },
    { label: "Email", href: "mailto:joshuajohnr1@gmail.com" },
  ],
  stats: [
    { value: "26", label: "Public GitHub repos" },
    { value: "3", label: "Platforms: web, Android, API" },
    { value: "24h", label: "Reply time" },
  ],
  services: [
    { title: "AI Chatbots", text: "Claude-powered assistants that answer customers 24/7 from your own info. One line of code on any website." },
    { title: "n8n AI Automation", text: "Workflows that qualify leads, sync your tools and send alerts, so your business runs while you sleep." },
    { title: "Web Scraping", text: "Any website turned into a clean Excel, CSV or Google Sheet, one-off or on a schedule." },
    { title: "Fix & Ship AI-built Apps", text: "Apps made with Lovable, Bolt, Cursor or Claude Code made secure, bug-free and deployed." },
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Dart", "SQL"] },
    { group: "Web & Mobile", items: ["Next.js", "React", "Tailwind CSS", "Flutter", "PWA"] },
    { group: "Backend & Data", items: ["Django / DRF", "Node.js", "PostgreSQL", "Prisma", "Supabase"] },
    { group: "AI & Automation", items: ["Claude API", "n8n", "AI agents", "Web scraping", "Vercel"] },
  ],
  experience: [
    {
      role: "Founder & Developer",
      company: "Kupon",
      period: "2026 — Present",
      description: "Designed and built a multi-tenant campus food payment platform (Next.js, Prisma, PostgreSQL) with student, vendor and admin apps, QR coupons and an auditable ledger.",
    },
    {
      role: "Mobile & Backend Developer",
      company: "MURA",
      period: "2026",
      description: "Shipped a Flutter Android app with a Django REST API, push campaigns, a React publishing studio and GitHub-hosted auto-updates.",
    },
    {
      role: "Informatics Student & Builder",
      company: "University (final-year project 2026)",
      period: "2025 — 2026",
      description: "Built Django and React systems including Kantiine (canteen ordering with roles, wallet and coupons) and a team final-year project.",
    },
  ],
  nav: [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
};
export type SiteConfig = typeof siteConfig;
