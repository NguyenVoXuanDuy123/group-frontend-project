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
