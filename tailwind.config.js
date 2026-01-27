/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // CRITICAL: This was missing in Main
    "./pages/**/*.{js,ts,jsx,tsx}",      // CRITICAL: This was missing in Main
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#FFF2EC',
        'ink': '#1a1a1a',
        'signal-red': '#E21E3F',
        'gold': '#C5A059',
      },
      fontFamily: {
        // Exact definition from your Main repo
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}