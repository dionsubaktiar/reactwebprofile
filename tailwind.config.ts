// Service: reactwebprofile | File: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        honeyDew: "#F1FAEE",
        customGreen: {
          light: "#D8F3DC",
          DEFAULT: "#2D6A4F",
          dark: "#1B4332",
        },
      },
    },
  },
  plugins: [],
};

export default config;