/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bowlby': ['Bowlby One SC', 'cursive'],
        'nunito': ['Nunito', 'sans-serif']
      },
      colors: {
        whi: '#F2F4FB',
        pnk: '#D22780',
        yel: '#F8B500',
        pur: '#5E227F',
      }
    },
  },
  plugins: [],
}
