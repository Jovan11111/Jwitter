/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00FF88',
        background: '#121212',
        surface: '#1E1E1E'
      }
    },
  },
  plugins: [],
}

