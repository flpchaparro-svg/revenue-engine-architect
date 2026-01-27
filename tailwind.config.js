/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
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
        // These keys allow you to use 'font-sans' and 'font-serif' in your HTML
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
