import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        poppins: ["Poppins", "sans-serif"],
        burtons: ["burtons", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Modern Unified Accent Palette (Indigo/Teal/Emerald)
        accent: {
          primary: "#6366f1", // Indigo-500
          primaryHover: "#4f46e5", // Indigo-600
          secondary: "#0d9488", // Teal-600
          secondaryHover: "#0f766e", // Teal-700
          success: "#10b981", // Emerald-500
          darkBg: "#09090b", // Zinc-950
          darkCard: "#18181b", // Zinc-900
          darkBorder: "#27272a", // Zinc-800
        },
        // Fallback mappings for backwards compatibility harmonized with modern theme
        honeyDew: "#f8fafc",
        eggplant: "#0f172a",
        customGreen: {
          light: "#e0e7ff",
          DEFAULT: "#6366f1",
          default: "#6366f1",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};

export default config;
