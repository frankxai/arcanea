/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // FrankX Conscious Color Palette
        cosmic: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        aurora: {
          50: '#fef7ff',
          100: '#fcefff',
          200: '#f8d7ff',
          300: '#f2b5ff',
          400: '#ea8dff',
          500: '#dc5fff',
          600: '#c93dff',
          700: '#b126ff',
          800: '#9a1fff',
          900: '#8519ff',
        },
        draconia: {
          50: '#fff7f0',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        leyline: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora 15s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%, 100%': {
            transform: 'translateX(0%) translateY(0%)',
            opacity: '0.3',
          },
          '33%': {
            transform: 'translateX(30%) translateY(-30%)',
            opacity: '0.5',
          },
          '66%': {
            transform: 'translateX(-20%) translateY(20%)',
            opacity: '0.3',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(220, 95, 255, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 40px rgba(220, 95, 255, 0.6)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};