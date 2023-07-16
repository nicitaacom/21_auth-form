/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Inter", "sans-serif"]
    },
    screens: {
      tablet: "768px",
      // => @media (min-width: 768px) { ... }
      laptop: "1024px"
      // => @media (min-width: 1024px) { ... }
    }
  },
  plugins: []
}
