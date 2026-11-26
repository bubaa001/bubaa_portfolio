import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { accent: { DEFAULT: "#6366f1", soft: "#818cf8" } },
    },
  },
  plugins: [typography],
} satisfies Config;
