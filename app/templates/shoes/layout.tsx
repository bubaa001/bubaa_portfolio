import type { Metadata } from "next";
import { Anton, Inter_Tight } from "next/font/google";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Inter_Tight({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = { title: "STRYDE — Premium Shoe Store Template", description: "Premium animated e-commerce template for shoe and sneaker stores." };

export default function L({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
