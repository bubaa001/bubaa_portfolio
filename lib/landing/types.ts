export type LandingConfig = {
  slug: string;
  label: string; // shown in demo switcher
  brand: string;
  logo: string; // emoji / letter
  theme: { bg: string; surface: string; text: string; muted: string; accent: string; accentText: string; border: string; heading: "sans" | "serif" };
  nav: string[];
  hero: { badge?: string; title: string; highlight: string; sub: string; cta: string; cta2?: string; image?: string; proof?: string };
  logos?: string[];
  stats?: [string, string][];
  featuresTitle: string;
  features: { icon: string; title: string; text: string }[];
  steps?: { title: string; text: string }[];
  testimonials?: { quote: string; name: string; role: string }[];
  pricing?: { title: string; plans: { name: string; price: string; per?: string; desc: string; feats: string[]; hot?: boolean }[] };
  faq: [string, string][];
  lead: { title: string; sub: string; button: string; fields: ("name" | "email" | "phone" | "message" | "date" | "guests")[] };
  footer: string;
};
