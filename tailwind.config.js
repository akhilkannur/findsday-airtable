/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
      extend: {
            animation: {
              'spin-slow': 'spin 12s linear infinite',
            },
            colors: {
        'paper': '#f7f5f2',
        'paper-dark': '#eeebe4',
        'ink': '#111111',
        'ink-fade': '#5e5a55',
        'sage-bg': '#d9dfd8',
        'ink-black': '#0f1115',
        'accent-blue': '#94a3b8',
        'accent-orange': '#c56f3f',
        'blob-bg': '#e4e0d8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Courier New', 'Courier', 'monospace'],
        playfair: ['var(--font-playfair)', 'serif'],
        crimson: ['var(--font-crimson)', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
