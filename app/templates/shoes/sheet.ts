// Loads the store's products from the owner's Google Sheet, so they can change
// products, prices, photos and stock from their phone without a developer.
// Setup steps for the owner: see ./README.md
import { categories as demoCategories, products as demoProducts, store, type Category, type Product } from "./data";

/** How often (in seconds) the site re-reads the sheet. */
export const SHEET_REFRESH_SECONDS = 60;

export type Catalog = { products: Product[]; categories: Category[]; source: "sheet" | "demo" };

const demo: Catalog = { products: demoProducts, categories: demoCategories, source: "demo" };
// Last copy of the sheet that loaded fine, so a short Google outage doesn't swap the shop back to demo products.
let lastGood: Catalog | null = null;

export async function getCatalog(): Promise<Catalog> {
  const link = (process.env.STORE_SHEET_URL || store.productsSheet || "").trim();
  if (!link) return demo;
  try {
    const res = await fetch(toCsvUrl(link), { next: { revalidate: SHEET_REFRESH_SECONDS } });
    if (!res.ok) throw new Error(`sheet answered ${res.status}`);
    const text = await res.text();
    if (/^\s*<(!doctype|html)/i.test(text)) throw new Error("got a web page, not CSV. Is the sheet shared as 'Anyone with the link'?");
    const products = rowsToProducts(parseCsv(text));
    if (!products.length) throw new Error("no valid product rows (each row needs a name and a price)");
    lastGood = { products, categories: buildCategories(products), source: "sheet" };
    return lastGood;
  } catch (err) {
    const why = (err as Error).message;
    if (lastGood) { console.warn(`[STRYDE] Could not load the products sheet, keeping the last version that loaded: ${why}`); return lastGood; }
    // During the build there is no earlier page yet, so fall back to the sample products.
    if (process.env.NEXT_PHASE === "phase-production-build") { console.warn(`[STRYDE] Could not load the products sheet, building with the products from data.ts: ${why}`); return demo; }
    // On the live site, failing here makes Next.js keep serving the last page that rendered fine.
    console.warn(`[STRYDE] Could not load the products sheet, keeping the current page: ${why}`);
    throw err;
  }
}

/* ----------------------------- links ----------------------------- */

/** Accepts a normal Google Sheets share link, a "Publish to web" link, or any direct CSV link. */
export function toCsvUrl(link: string): string {
  if (/output=csv|format=csv|\.csv(\?|$)/i.test(link)) return link;
  const published = link.match(/docs\.google\.com\/spreadsheets\/d\/e\/([\w-]+)/);
  if (published) return `https://docs.google.com/spreadsheets/d/e/${published[1]}/pub?output=csv${gid(link, "&")}`;
  const id = link.match(/docs\.google\.com\/spreadsheets\/d\/([\w-]+)/);
  if (id) return `https://docs.google.com/spreadsheets/d/${id[1]}/export?format=csv${gid(link, "&")}`;
  return link;
}
const gid = (link: string, sep: string) => { const m = link.match(/[#&?]gid=(\d+)/); return m ? `${sep}gid=${m[1]}` : ""; };

/** Turns a Google Drive share link into a direct image link; other links pass through. */
export function toImageUrl(link: string): string {
  const drive = link.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  return drive ? `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w1200` : link;
}

/* ----------------------------- parsing ----------------------------- */

/** Minimal RFC 4180 CSV parser (handles quotes, commas and line breaks inside cells). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim()));
}

// Column headers the owner may use (lower-case, spaces/underscores ignored).
const COLUMNS: Record<string, keyof Row> = {
  name: "name", product: "name", jina: "name",
  category: "cat", cat: "cat", aina: "cat",
  price: "price", bei: "price",
  oldprice: "was", was: "was", beiyazamani: "was",
  sizes: "sizes", size: "sizes", saizi: "sizes",
  photo: "img", image: "img", picture: "img", picha: "img",
  badge: "badge", label: "badge",
  colour: "bg", color: "bg", background: "bg", rangi: "bg",
  instock: "stock", stock: "stock", available: "stock", ipo: "stock",
  id: "id",
};
type Row = { name: string; cat: string; price: string; was: string; sizes: string; img: string; badge: string; bg: string; stock: string; id: string };

export function rowsToProducts(rows: string[][]): Product[] {
  if (rows.length < 2) return [];
  const keys = rows[0].map((h) => COLUMNS[h.toLowerCase().replace(/[\s_\-().]/g, "")]);
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const cells of rows.slice(1)) {
    const r = {} as Row;
    keys.forEach((k, i) => { if (k && !r[k]) r[k] = (cells[i] ?? "").trim(); });
    const price = money(r.price);
    if (!r.name || !price) continue;
    if (/^(no|n|false|0|hapana|sold ?out|out)$/i.test(r.stock ?? "")) continue;
    let id = slug(r.id || r.name);
    for (let n = 2; seen.has(id); n++) id = `${slug(r.id || r.name)}-${n}`;
    seen.add(id);
    const was = money(r.was);
    const sizes = parseSizes(r.sizes);
    out.push({
      id, name: r.name, cat: r.cat || "Shoes", price,
      ...(was && was > price ? { was } : {}),
      img: r.img ? toImageUrl(r.img) : "/templates/shoes/campaign.jpg",
      ...(r.badge ? { badge: r.badge } : was && was > price ? { badge: `-${Math.round((1 - price / was) * 100)}%` } : {}),
      ...(/^#[0-9a-f]{3,8}$/i.test(r.bg ?? "") ? { bg: r.bg } : {}),
      sizes: sizes.length ? sizes : [39, 40, 41, 42, 43, 44],
    });
  }
  return out;
}

const money = (v?: string) => { const n = Number((v ?? "").replace(/[^\d.]/g, "")); return Number.isFinite(n) && n > 0 ? Math.round(n) : 0; };
const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "") || "item";

/** "39-44", "39, 40, 41" or "39 40 41" → [39, 40, …]. */
export function parseSizes(v?: string): number[] {
  const out = new Set<number>();
  for (const part of (v ?? "").split(/[,;/\s]+/).filter(Boolean)) {
    const range = part.match(/^(\d+(?:\.\d+)?)[-–](\d+(?:\.\d+)?)$/);
    if (range) { for (let s = Number(range[1]); s <= Number(range[2]) && out.size < 40; s++) out.add(s); }
    else if (!Number.isNaN(Number(part))) out.add(Number(part));
  }
  return [...out].sort((a, b) => a - b);
}

/** One category tile per category used in the sheet, with its real count and its first product's photo. */
function buildCategories(products: Product[]): Category[] {
  const map = new Map<string, Category>();
  for (const p of products) {
    const c = map.get(p.cat);
    if (c) c.count++;
    else map.set(p.cat, { name: p.cat, img: p.img, count: 1 });
  }
  return [...map.values()];
}
