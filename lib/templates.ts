// ✏️ The template catalog shown on /templates. Add an entry to list a new template.
export type Template = {
  slug: string;
  name: string;
  kind: string; // short product type
  category: "E-commerce" | "Education" | "Corporate" | "Branding" | "Landing pages" | "Dashboards";
  href: string;
  cover: string;
  coverMobile?: string; // phone screenshot shown to phone visitors
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
    slug: "stryde", name: "STRYDE", kind: "Shoe & Sneaker Store", category: "E-commerce", href: "/templates/shoes", cover: "/templates/covers/shoes.jpg", coverMobile: "/templates/covers/shoes-m.jpg",
    price: 129, premium: true, isNew: true, popularity: 100, added: "2026-11-27",
    blurb: "A bold, animated online store for shoe and sneaker sellers: colourway-switching hero, cursor-following category previews, quick-add sizes, a cart that sends orders to WhatsApp, and a live drop countdown.",
    features: ["Interactive colourway hero with parallax", "Cursor-following category previews", "Quick-add with size picker", "Cart drawer: WhatsApp order + M-Pesa", "Drop countdown + notify form", "Original AI product photography (no third-party brands)"],
    stack: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    slug: "meridian", name: "Meridian", kind: "Corporate / Official Website", category: "Corporate", href: "/templates/corporate", cover: "/templates/covers/corporate.jpg", coverMobile: "/templates/covers/corporate-m.jpg",
    price: 99, premium: true, isNew: true, popularity: 99, added: "2026-11-26",
    blurb: "An editorial, high-trust website for companies, NGOs and public institutions, with services, projects, leadership and insights.",
    features: ["Word-by-word hero reveal", "Client logo marquee", "Hover-reveal services", "Project showcase", "Leadership grid", "Insights list + contact form"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
];

export const categories = ["E-commerce", "Corporate"] as const;
