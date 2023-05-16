/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      "gdt-primary": "#CA8A04",
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        primary: "#C00000",
        secondary: "#4E4B66",
        white: "#FFFFFF",
        grayScale: "#F7F7FF",
        faint: "#6E7191",
        ternary: "#14142B",
        irish: "#5D5FEF",
        footer: "#333546",
        dark: "#151515",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
