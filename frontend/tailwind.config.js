/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003e29",
        secondary: "#6BBF8A",
        cardBg: "#A8D5BA",
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
