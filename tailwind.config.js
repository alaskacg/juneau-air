/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alaska: {
          blue: '#003f87',
          gold: '#ffd700',
          glacier: '#e0f2fe',
          forest: '#0f4c3a',
        }
      }
    },
  },
  plugins: [],
}
