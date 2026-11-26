import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "SOFT"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = { title: "Kilele Academy — School Website Template", description: "Premium school website template." };

export default function L({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
