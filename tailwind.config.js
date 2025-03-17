/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MyStyle: ['Outfit', "sans-serif"],
      },
      colors: {
        'WhiteColor': '#ffffff',
        'ButtonColor': '#3EB4E7',
        'ButtonHover': '#096f9e',
        'TextColor': '#3EB4E7'
      },
    },
  },
  plugins: [],
}

