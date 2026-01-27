/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Root-level HTML
    "./index.html",
    
    // Everything in src/
    "./src/**/*.{js,ts,jsx,tsx}",
    
    // CRITICAL: Root-level components and pages folders
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    
    // CRITICAL: Root-level TypeScript files (App.tsx, constants.ts, etc.)
    "./*.tsx",
    "./*.ts",
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
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        'tight-custom': '-0.04em',
        'wide-custom': '0.15em',
        'nav': '0.3em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'extend-line': 'extendLine 4s cubic-bezier(0.85, 0, 0.15, 1) forwards',
        'flicker': 'flicker 4s linear infinite',
        'lens-sweep': 'lensSweep 8s cubic-bezier(0.3, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        extendLine: {
          '0%': { width: '0' },
          '100%': { width: '4rem' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.3' },
        },
        lensSweep: {
          '0%': { backgroundPosition: '150% 0' },
          '35%': { backgroundPosition: '-50% 0' },
          '100%': { backgroundPosition: '-50% 0' },
        },
      },
    },
  },
  plugins: [],
}
