/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burtons: "burtons",
        poppins: ["Poppins", "sans-serif"],
        productSans: ["Product Sans", "sans-serif"],
      },
      colors: {
        honeyDew: "#F1FFE7",
        customGreen: {
          light: "#A9FDAC",
          default: "#44CF6C",
          dark: "#32A287",
        },
        eggplant: "#6C464E",
        brandColor: {
          mainBlue: "#015AFF",
          mainRed: "#FE004F",
          darkenRed: "#DC89A3",
          darkenBlue: "#2f6fe6",
          backgroundColor: "#241185",
          gradationBlue: "#018DFF",
          gradationRed: "#FF6A6F",
        },
        // Minimalist Theme Accent Colors
        accent: {
          primary: "#6366f1", // Indigo
          primaryHover: "#4f46e5",
          secondary: "#0d9488", // Teal
          secondaryHover: "#0f766e",
          success: "#10b981", // Emerald
          darkBg: "#09090b", // Zinc 950
          darkCard: "#18181b", // Zinc 900
          darkBorder: "#27272a", // Zinc 800
        }
      },
    },
  },
  plugins: [],
};
