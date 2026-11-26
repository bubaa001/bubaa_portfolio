// ✏️  Edit this file to personalise the whole site.
export const siteConfig = {
  name: "Bubaa",
  title: "AI Automation Developer",
  tagline: "I build AI chatbots, automations and data tools that save small businesses hours every week.",
  avatar: "https://github.com/bubaa001.png", // or "/me.jpg" placed in /public
  bio: [
    "Hi! I'm Bubaa, a developer who enjoys turning ideas into polished products. I care about good design, readable code and shipping things people actually use.",
    "Replace this text in site.config.ts with your own story: what you do, what you're learning and what you're looking for next.",
  ],
  location: "Your City, Country",
  email: "you@example.com",
  url: "https://example.com", // your deployed URL (used for SEO + sitemap)
  resume: "", // e.g. "/resume.pdf" after dropping the PDF in /public
  available: true, // shows the "open to work" badge
  socials: [
    { label: "GitHub", href: "https://github.com/bubaa001" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "X", href: "https://x.com/your-handle" },
  ],
  stats: [
    { value: "2+", label: "Years building" },
    { value: "20+", label: "Repos shipped" },
    { value: "100%", label: "Client focus" },
  ],
  services: [
    { title: "AI Chatbots", text: "Claude-powered assistants that answer customers 24/7 from your own info. One line of code on any website." },
    { title: "n8n AI Automation", text: "Workflows that qualify leads, sync your tools and send alerts, so your business runs while you sleep." },
    { title: "Web Scraping", text: "Any website turned into a clean Excel, CSV or Google Sheet, one-off or on a schedule." },
    { title: "Fix & Ship AI-built Apps", text: "Apps made with Lovable, Bolt, Cursor or Claude Code made secure, bug-free and deployed." },
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
    { group: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "Supabase"] },
    { group: "Tools", items: ["Git", "GitHub", "Vercel", "Figma"] },
  ],
  experience: [
    {
      role: "Freelance Developer",
      company: "Self-employed",
      period: "2025 — Present",
      description: "Building websites and web apps for clients. Replace with your real experience.",
    },
    {
      role: "Student / Learner",
      company: "Your School",
      period: "2023 — 2025",
      description: "Studied computer science fundamentals and built side projects.",
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
