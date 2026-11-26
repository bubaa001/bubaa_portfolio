// ✏️  Edit this file to personalise the whole site.
export const siteConfig = {
  name: "Bubaa",
  title: "Software Developer",
  tagline: "I build clean, fast and useful things for the web.",
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
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
};
export type SiteConfig = typeof siteConfig;
