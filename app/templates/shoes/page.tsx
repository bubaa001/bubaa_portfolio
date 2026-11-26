import TemplateBar from "@/components/tpl/TemplateBar";
import Store from "./Store";
import { getCatalog } from "./sheet";

// Re-read the owner's Google Sheet at most once a minute (keep in sync with SHEET_REFRESH_SECONDS).
export const revalidate = 60;

export default async function Page() {
  const catalog = await getCatalog();
  return (<><Store catalog={{ products: catalog.products, categories: catalog.categories }} /><TemplateBar name="Shoe store" /></>);
}
