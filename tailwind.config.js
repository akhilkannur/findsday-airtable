/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A052DE',
        accent: '#FFC857',
        background: '#F0F0F0',
        'sales-green': '#00C853',
        charcoal: '#121212',
        'paper-white': '#FDFDFD',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['PT Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
