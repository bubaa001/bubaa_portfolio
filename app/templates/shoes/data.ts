// ✏️ Everything a store owner changes lives in this file.
export const store = {
  name: "STRYDE",
  tagline: "Made to move.",
  currency: "TZS",
  whatsapp: "255700000000", // orders are sent here as a WhatsApp message
  city: "Dar es Salaam",
  announcements: ["Free delivery across Dar es Salaam", "Pay with M-Pesa, Tigo Pesa or Airtel Money", "New drop every Friday 7PM", "30-day easy exchanges"],
  nextDrop: "2026-12-04T19:00:00+03:00",
};

export type Colorway = { key: string; name: string; bg: string; ink: "light" | "dark"; img: string };
export const hero = {
  name: "Aero Runner 01",
  price: 185000,
  sizes: [39, 40, 41, 42, 43, 44, 45],
  colorways: [
    { key: "ember", name: "Ember", bg: "#fe5816", ink: "light", img: "/templates/shoes/hero-ember.jpg" },
    { key: "volt", name: "Volt", bg: "#bfeb56", ink: "dark", img: "/templates/shoes/hero-volt.jpg" },
    { key: "cobalt", name: "Cobalt", bg: "#2759fd", ink: "light", img: "/templates/shoes/hero-cobalt.jpg" },
    { key: "bone", name: "Bone", bg: "#e6ddcc", ink: "dark", img: "/templates/shoes/hero-bone.jpg" },
  ] as Colorway[],
};

export type Product = { id: string; name: string; cat: string; price: number; was?: number; img: string; badge?: string; bg?: string; sizes: number[] };
export const products: Product[] = [
  { id: "aero-ember", name: "Aero Runner 01 · Ember", cat: "Sneakers", price: 185000, img: "/templates/shoes/hero-ember.jpg", badge: "New", bg: "#fe5816", sizes: [39, 40, 41, 42, 43, 44] },
  { id: "aero-volt", name: "Aero Runner 01 · Volt", cat: "Sneakers", price: 185000, img: "/templates/shoes/hero-volt.jpg", badge: "New", bg: "#bfeb56", sizes: [40, 41, 42, 43, 44, 45] },
  { id: "court-hi", name: "Court Hi · Shadow", cat: "Sneakers", price: 210000, img: "/templates/shoes/hightop.jpg", sizes: [40, 41, 42, 43, 44] },
  { id: "pace-one", name: "Pace One · Coral", cat: "Running", price: 165000, was: 205000, img: "/templates/shoes/runner.jpg", badge: "-20%", sizes: [38, 39, 40, 41, 42, 43] },
  { id: "aero-cobalt", name: "Aero Runner 01 · Cobalt", cat: "Sneakers", price: 185000, img: "/templates/shoes/hero-cobalt.jpg", bg: "#2759fd", sizes: [40, 41, 42, 43, 44] },
  { id: "chelsea", name: "Mason Chelsea · Cognac", cat: "Boots", price: 245000, img: "/templates/shoes/chelsea.jpg", sizes: [40, 41, 42, 43, 44, 45] },
  { id: "oxford", name: "Regent Oxford · Black", cat: "Formal", price: 230000, img: "/templates/shoes/oxford.jpg", sizes: [40, 41, 42, 43, 44, 45] },
  { id: "stiletto", name: "Amara Pump · Bordeaux", cat: "Heels", price: 195000, img: "/templates/shoes/heel.jpg", badge: "Bestseller", sizes: [36, 37, 38, 39, 40, 41] },
  { id: "slide", name: "Pwani Slide · Tan", cat: "Slides", price: 95000, img: "/templates/shoes/slide.jpg", sizes: [38, 39, 40, 41, 42, 43, 44] },
  { id: "aero-bone", name: "Aero Runner 01 · Bone", cat: "Sneakers", price: 185000, img: "/templates/shoes/hero-bone.jpg", bg: "#e6ddcc", sizes: [38, 39, 40, 41, 42, 43] },
];

export const categories = [
  { name: "Sneakers", img: "/templates/shoes/hero-volt.jpg", count: 48 },
  { name: "Running", img: "/templates/shoes/runner.jpg", count: 22 },
  { name: "Boots", img: "/templates/shoes/chelsea.jpg", count: 17 },
  { name: "Formal", img: "/templates/shoes/oxford.jpg", count: 26 },
  { name: "Heels", img: "/templates/shoes/heel.jpg", count: 31 },
  { name: "Slides", img: "/templates/shoes/slide.jpg", count: 14 },
];

export const reviews = [
  { name: "Rehema K.", city: "Mikocheni", text: "Delivered the same afternoon. The Volt colour is even louder in person, and so comfortable." },
  { name: "Baraka M.", city: "Arusha", text: "Ordered on WhatsApp, paid with M-Pesa, got them in two days. Quality is premium." },
  { name: "Neema J.", city: "Masaki", text: "Exchanged a size with zero stress. My third pair from STRYDE." },
  { name: "Daudi S.", city: "Sinza", text: "The Mason Chelsea boots are proper leather. Wore them to my wedding." },
];

export const fmt = (n: number) => `${store.currency} ${n.toLocaleString("en-US")}`;
