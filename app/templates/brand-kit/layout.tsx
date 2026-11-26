import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono2" });

export const metadata: Metadata = { title: "Nuru — Brand Guidelines Toolkit Template", description: "Premium brand identity & guidelines toolkit." };

export default function L({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${mono.variable}`}>{children}</div>;
}
