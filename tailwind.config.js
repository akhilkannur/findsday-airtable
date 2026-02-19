/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'sage-bg': '#DCDFCF', 
        'ink-black': '#121212',
        'accent-blue': '#B5C0FF',
        'accent-orange': '#FF4D00',
        'blob-bg': '#D1D4C4',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
