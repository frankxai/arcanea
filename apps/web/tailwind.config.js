/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        arcanean: {
          bg: '#0b0e14',
          panel: '#121826',
          text: '#e6eefc',
          muted: '#9bb1d0',
          accent: '#78a6ff',
          accent2: '#7fffd4',
          border: '#233049'
        }
      },
      backgroundImage: {
        'grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        'cosmic': 'conic-gradient(from 180deg at 50% 50%, rgba(120,166,255,0.25), rgba(127,255,212,0.25), rgba(120,166,255,0.25))'
      }
    },
  },
  plugins: [],
}

