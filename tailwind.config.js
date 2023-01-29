/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors:{
        darkBlue : '#16172d',
      }
    },
  },
  plugins: [],
}
