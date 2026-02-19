/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'enjin-bg': '#070707', 
        'enjin-card': '#0e0e0e',
        'enjin-teal': '#2dd4bf',
        'enjin-border': 'rgba(255, 255, 255, 0.08)',
        // Keeping club names for compatibility with existing code
        'club-dark': '#070707',
        'club-card': '#0e0e0e',
        'club-teal': '#2dd4bf',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
