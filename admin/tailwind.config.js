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
    },
  },
  plugins: [],
}
