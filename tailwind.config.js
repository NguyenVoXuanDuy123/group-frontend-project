/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        white: "#ffffff",
        black: "#2F3135",
        grey: "#CCCCCC",
        "light-grey": "#F0F4F8",
        "dark-grey": "#777777",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out forwards",
        slideDown: "slideDown 0.3s ease-out forwards",
      },
    },
    fontFamily: {
      sans: [
        "Montserrat",
        "sans-serif",
        {
          light: 300,
          normal: 400,
          medium: 500,
          bold: 700,
          extrabold: 800,
        },
      ],
    },
  },
  plugins: [],
};
