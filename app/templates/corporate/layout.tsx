import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const body = Inter_Tight({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = { title: "Meridian Group — Corporate Website Template", description: "Premium corporate / official website template." };

export default function L({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
