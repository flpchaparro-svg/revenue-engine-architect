/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // <--- RESTORED: Scans your components folder
    "./pages/**/*.{js,ts,jsx,tsx}",      // <--- RESTORED: Scans your pages folder
    "./constants/**/*.{js,ts,jsx,tsx}",  // <--- RESTORED: Scans constants
  ],
  theme: {
    extend: {
      fontFamily: {
        // PERFORMANCE: Fallback fonts prevent the 750ms "Invisible Text" delay
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        serif: [
          'Lora', 
          'ui-serif', 
          'Georgia', 
          'Cambria', 
          'Times New Roman', 
          'Times', 
          'serif'
        ],
        mono: [
          'ui-monospace', 
          'SFMono-Regular', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          'Liberation Mono', 
          'Courier New', 
          'monospace'
        ]
      },
      colors: {
        cream: '#FFF2EC',
        dark: '#1a1a1a',
        gold: '#C5A059',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}