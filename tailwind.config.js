/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#0D9488', //TEAL-600
          dark: '#0f7766e', //teal-700
        },
      },
    },
  },
  plugins: [],
}
