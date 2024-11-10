/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainBlack': '#000814',
        'mainMarine': '#001d3d',
        'secMarine': '#003566',
        'mainYellow': '#ffc300',
        'secYellow': '#ffd60a'
      }

    },
  },
  plugins: [],
}