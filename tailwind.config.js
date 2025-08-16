/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#A052DE', // Keep for shadcn defaults if needed, but new colors will override
        accent: '#FFC857', // Keep for shadcn defaults if needed
        background: '#F0F0F0', // Keep for shadcn defaults if needed
        'sales-green': '#00C853', // Original green
        charcoal: '#121212', // Main dark background
        'charcoal-light': '#1a1a1a', // Slightly lighter dark background
        'charcoal-dark': '#0a0a0a', // Even darker background for cards/sections
        'paper-white': '#FDFDFD', // Original white
        'accent-green': '#00c853', // New vibrant green from image
        'accent-pink': '#ec4899', // New vibrant pink/purple from image
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'], // Original heading font
        body: ['PT Sans', 'sans-serif'], // Original body font
        sans: ['Inter', 'sans-serif'], // Default sans-serif, can be adjusted if a specific font is identified in the image
        serif: ['Playfair Display', 'serif'], // Default serif
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
