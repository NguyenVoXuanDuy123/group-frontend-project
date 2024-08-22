/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "white": "#ffffff",
      "black": "#2F3135",
      "grey": "#CCCCCC",
      "light-grey": "#F3F1F1",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif", {
        "light": 300,
        "normal": 500,
        "bold": 700,
        "extrabold": 800,
      }],

    }
  },
  plugins: [],
};
