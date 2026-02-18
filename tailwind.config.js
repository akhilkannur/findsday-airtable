/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'banknote-black': '#050805', // Deep forest black
        'terminal-green': '#00FF41', // Vibrant matrix/terminal green
        'paper-white': '#FDFDFD',
        charcoal: '#121212',
        'charcoal-light': '#1a1a1a',
        'charcoal-dark': '#0a0a0a',
        'accent-pink': '#ec4899',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '0', // Sharp corners by default
      },
      borderWidth: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
