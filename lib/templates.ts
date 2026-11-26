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
  tiers: Tier[];
};

// ✏️ Paste each Snippe payment page link into `pay`. Empty = the Buy button opens WhatsApp instead.
export type Tier = { name: string; tzs: number; usd: number; includes: string[]; pay: string };

export const templates: Template[] = [
  {
    slug: "stryde", name: "STRYDE", kind: "Shoe & Sneaker Store", category: "E-commerce", href: "/templates/shoes", cover: "/templates/covers/shoes.jpg", coverMobile: "/templates/covers/shoes-m.jpg",
    price: 129, premium: true, isNew: true, popularity: 100, added: "2026-11-27",
    blurb: "A bold, animated online store for shoe and sneaker sellers: colourway-switching hero, cursor-following category previews, quick-add sizes, a cart that sends orders to WhatsApp, and a live drop countdown.",
    features: ["Interactive colourway hero with parallax", "Cursor-following category previews", "Quick-add with size picker", "Cart drawer: WhatsApp order + M-Pesa", "Drop countdown + notify form", "Original AI product photography (no third-party brands)"],
    stack: ["Next.js", "React", "Tailwind CSS"],
    tiers: [
      { name: "Basic", tzs: 340000, usd: 129, pay: "https://snippe.me/pay/stryde-shoe-store-template-basic", includes: ["Your logo, colours, products and photos", "Up to 12 products", "Cart with WhatsApp ordering", "Mobile-ready, delivered in 4 days"] },
      { name: "Standard", tzs: 790000, usd: 299, pay: "https://snippe.me/pay/stryde-shoe-store-template-standard", includes: ["Everything in Basic", "Up to 50 products", "Colourway hero, categories, drop countdown", "Custom domain + SEO", "Editable Figma design file"] },
      { name: "Premium", tzs: 1580000, usd: 599, pay: "", includes: ["Everything in Standard", "Up to 150 products + product editor", "Online payments (M-Pesa / card)", "Order notifications, stock & sizes", "30 days support"] },
    ],
  },
  {
    slug: "meridian", name: "Meridian", kind: "Corporate / Official Website", category: "Corporate", href: "/templates/corporate", cover: "/templates/covers/corporate.jpg", coverMobile: "/templates/covers/corporate-m.jpg",
    price: 99, premium: true, isNew: true, popularity: 99, added: "2026-11-26",
    blurb: "An editorial, high-trust website for companies, NGOs and public institutions, with services, projects, leadership and insights.",
    features: ["Word-by-word hero reveal", "Client logo marquee", "Hover-reveal services", "Project showcase", "Leadership grid", "Insights list + contact form"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    tiers: [
      { name: "Basic", tzs: 260000, usd: 99, pay: "", includes: ["One long page with all sections", "Your brand, text and photos", "Mobile-ready, delivered in 3 days"] },
      { name: "Standard", tzs: 600000, usd: 229, pay: "", includes: ["5 pages (Home, About, Services, Projects, Contact)", "Contact form to your email", "SEO setup", "Editable Figma design file"] },
      { name: "Premium", tzs: 1190000, usd: 449, pay: "", includes: ["Up to 10 pages + news/insights", "Careers page, multilingual", "Deployed on your domain", "30 days support"] },
    ],
  },
];

export const categories = ["E-commerce", "Corporate"] as const;
