/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
          extend: {
            animation: {
              'spin-slow': 'spin 12s linear infinite',
            },
            colors: {
        'paper': '#f4f1ea',
        'paper-dark': '#e8e4da',
        'ink': '#1a1917',
        'ink-fade': '#66635c',
        'sage-bg': '#DCDFCF', 
        'ink-black': '#121212',
        'accent-blue': '#B5C0FF',
        'accent-orange': '#FF4D00',
        'blob-bg': '#D1D4C4',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
