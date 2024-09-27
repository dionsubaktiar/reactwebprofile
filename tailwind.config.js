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
        brandColor: {
          mainBlue: "#015AFF",
          mainRed: "#FE004F",
          darkenRed: "#DC89A3",
          darkenBlue: "#2f6fe6",
          backgroundColor: "#241185",
          gradationBlue: "#018DFF",
          gradationRed: "#FF6A6F",
          // complementarybg: "#855511",
        },
        eggplant: "#6C464E",
      },
    },
  },
  plugins: [],
};
