/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D9E4F",
        navFot: "#047E3B",
        secondary: "#4a9e5a",
        cardBg: "#E0F1E7",
      },
      fontFamily: {
        heading: ["Rubik", "sans-serif"],
        headingTwo: ["Ultra", "sans-serif"],
        subHeading: ["Roboto-Condensed", "sans-serif"],
        text: ["Nunito", "sans-serif"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
}
