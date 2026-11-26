import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: { accent: { DEFAULT: "#8b5cf6", 2: "#22d3ee" } },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: ".7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        float: "float 8s ease-in-out infinite",
        pulseRing: "pulseRing 1.8s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
