/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/canvas-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: '#0b0e14',
          deep: '#121826',
          surface: '#1a2332',
          raised: '#242f42',
          elevated: '#2d3a52',
          overlay: '#364562',
          border: '#2d3a52',
        },
        brand: {
          primary: '#8b5cf6',
          accent: '#7fffd4',
          gold: '#ffd700',
          secondary: '#78a6ff',
        },
        text: {
          primary: '#e6eefc',
          secondary: '#9bb1d0',
          muted: '#708094',
          disabled: '#515b6b',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Crimson Pro', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
