import type { Metadata } from "next";
import TemplateBar from "@/components/tpl/TemplateBar";
import App from "./App";

export const metadata: Metadata = { title: "School Management System — Template", description: "Premium school management dashboard template." };

export default function Page() {
  return (<><App /><TemplateBar name="School management system" /></>);
}
