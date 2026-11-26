// ✏️  Edit this file to personalise the whole site.
export const siteConfig = {
  name: "Bubaa",
  title: "Full-Stack Web Developer",
  tagline: "I design and build fast, accessible web products — from idea to production.",
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
    { title: "Landing Pages", text: "Fast, responsive, SEO-ready landing pages that turn visitors into leads and customers." },
    { title: "Dashboards & Web Apps", text: "Admin panels, SaaS MVPs and internal tools with auth, data and clean UI." },
    { title: "AI Chatbots", text: "Website assistants that answer from your own info, powered by Claude or OpenAI." },
    { title: "Fix & Deploy", text: "Broken Next.js builds, Vercel errors and AI-built apps (Lovable, Bolt, v0) made production-ready." },
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
