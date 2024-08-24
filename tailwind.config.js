/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
    extend: {
      colors: {
        primary: "#3B82F6",
        white: "#ffffff",
        black: "#2F3135",
        grey: "#CCCCCC",
        "light-grey": "#FCFCFC",
      },
    },
  },
  plugins: [],
};
