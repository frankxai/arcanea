import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Arcanea theme colors
        arcane: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          
          // Elemental colors
          fire: '#ff6b35',
          water: '#78a6ff', 
          earth: '#8b7355',
          wind: '#00ff88',
          void: '#9966ff',
          
          // Premium gradients
          gold: '#ffd700',
          crystal: '#7fffd4',
          shadow: '#1a1a2e',
          cosmic: '#16213e',
        },
      },
      fontFamily: {
        'display': ['Inter Display', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        ' arcane': ['Arcanea', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'energy-flow': 'energy-flow 4s ease-in-out infinite',
        'portal-rotate': 'portal-rotate 20s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(127, 255, 212, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(127, 255, 212, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'energy-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'portal-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'arcane-gradient': 'radial-gradient(ellipse at top, rgba(127, 255, 212, 0.3) 0%, transparent 70%)',
        'energy-gradient': 'linear-gradient(45deg, #ff6b35, #78a6ff, #9966ff, #ffd700)',
        'cosmic-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'portal-gradient': 'radial-gradient(circle, rgba(127, 255, 212, 0.8) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config