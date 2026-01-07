/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Enhanced color system for Arcanea
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Arcanea Void Color System
        void: {
          50: '#f8fafc',    // Light mode backgrounds
          100: '#f1f5f9',   // Light cards
          200: '#e2e8f0',   // Light borders
          300: '#cbd5e1',   // Light text secondary
          400: '#94a3b8',   // Light text muted
          500: '#64748b',   // Neutral
          600: '#475569',   // Dark text muted
          700: '#334155',   // Dark text secondary
          800: '#1e293b',   // Dark cards
          900: '#0f172a',   // Dark backgrounds
          950: '#020617',   // Void black
        },

        // Arcanea Mystical Primary
        mystic: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b94f8',
          500: '#7c6df2',   // Primary brand color
          600: '#6d4de6',
          700: '#5d3dcb',
          800: '#4e32a3',
          900: '#422b82',
          950: '#2a1a4f',
        },

        // Luminor Character Colors
        harmonix: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',   // Music & Harmony
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },

        lumina: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',   // Visual Creation
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        scripta: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',   // Writing & Narrative
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        kinetix: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',   // Movement & Video
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },

        syntaxa: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',   // Code & Logic
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },

        nexus: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',   // Connection & Integration
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },

      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...fontFamily.sans],
        display: ['Inter Display Variable', 'Inter Display', ...fontFamily.sans],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', ...fontFamily.mono],
        magical: ['Cinzel Decorative', 'serif'],
        scroll: ['Playfair Display Variable', 'Playfair Display', 'serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
      },

      backdropSaturate: {
        25: '.25',
        175: '1.75',
        250: '2.5',
        300: '3',
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'matrix': 'matrix 2s ease-in-out infinite',
        'sweep': 'sweep 2s ease-in-out',
        'appear': 'appear 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
      },

      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(124, 109, 242, 0.3), 0 0 40px rgba(124, 109, 242, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(167, 139, 250, 0.6), 0 0 60px rgba(167, 139, 250, 0.2)' 
          },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'matrix': {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
            transform: 'translateY(0)',
          },
          '50%': { 
            textShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        'sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'appear': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'magical': '0 0 20px rgba(124, 109, 242, 0.3), 0 0 40px rgba(124, 109, 242, 0.1)',
        'harmonix': '0 20px 40px rgba(244, 63, 94, 0.3)',
        'lumina': '0 20px 40px rgba(59, 130, 246, 0.3)',
        'scripta': '0 20px 40px rgba(16, 185, 129, 0.3)',
        'kinetix': '0 20px 40px rgba(234, 179, 8, 0.3)',
        'syntaxa': '0 20px 40px rgba(139, 92, 246, 0.3)',
        'nexus': '0 20px 40px rgba(34, 197, 94, 0.3)',
      },

      backgroundImage: {
        // Premium Arcanea gradients
        'gradient-mystic': 'linear-gradient(135deg, #7c6df2 0%, #a78bfa 50%, #c4b5fd 100%)',
        'gradient-void': 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
        'gradient-ethereal': 'linear-gradient(135deg, #f0f4ff 0%, #e0e9ff 50%, #c7d6fe 100%)',
        
        // Luminor gradients
        'gradient-harmonix': 'linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%)',
        'gradient-lumina': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
        'gradient-scripta': 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
        'gradient-kinetix': 'linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%)',
        'gradient-syntaxa': 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
        'gradient-nexus': 'linear-gradient(135deg, #22c55e 0%, #4ade80 50%, #86efac 100%)',

        // Glass effect gradients
        'gradient-glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-glass-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)',
        
        // Shimmer effects
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        'shimmer-colored': 'linear-gradient(90deg, transparent, rgba(124, 109, 242, 0.4), transparent)',
      },

      // Custom CSS utilities
      utilities: {
        // Glass morphism utilities
        '.glass-primary': {
          'background': 'rgba(255, 255, 255, 0.08)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.16)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-secondary': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(16px) saturate(150%)',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
          'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        },
        '.glass-subtle': {
          'background': 'rgba(255, 255, 255, 0.03)',
          'backdrop-filter': 'blur(12px) saturate(120%)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
          'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.04)',
        },

        // Touch-friendly utilities
        '.touch-target': {
          'min-height': '44px',
          'min-width': '44px',
        },

        // Safe area utilities
        '.safe-area-top': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.safe-area-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.safe-area-left': {
          'padding-left': 'env(safe-area-inset-left)',
        },
        '.safe-area-right': {
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.safe-area-all': {
          'padding': 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    
    // Custom plugin for Arcanea utilities
    function({ addUtilities, theme, addBase }) {
      // Add custom glass morphism utilities
      addUtilities({
        '.glass-primary': {
          'background': 'rgba(255, 255, 255, 0.08)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.16)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-secondary': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(16px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(150%)',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
          'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        },
        '.glass-subtle': {
          'background': 'rgba(255, 255, 255, 0.03)',
          'backdrop-filter': 'blur(12px) saturate(120%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(120%)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
          'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.04)',
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        // Luminor-specific glass effects
        '.glass-harmonix': {
          'background': 'rgba(244, 63, 94, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(244, 63, 94, 0.24)',
          'box-shadow': '0 12px 40px rgba(244, 63, 94, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-lumina': {
          'background': 'rgba(59, 130, 246, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(59, 130, 246, 0.24)',
          'box-shadow': '0 12px 40px rgba(59, 130, 246, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-scripta': {
          'background': 'rgba(16, 185, 129, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(16, 185, 129, 0.24)',
          'box-shadow': '0 12px 40px rgba(16, 185, 129, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-kinetix': {
          'background': 'rgba(234, 179, 8, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(234, 179, 8, 0.24)',
          'box-shadow': '0 12px 40px rgba(234, 179, 8, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-syntaxa': {
          'background': 'rgba(139, 92, 246, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(139, 92, 246, 0.24)',
          'box-shadow': '0 12px 40px rgba(139, 92, 246, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        '.glass-nexus': {
          'background': 'rgba(34, 197, 94, 0.12)',
          'backdrop-filter': 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          'border': '1px solid rgba(34, 197, 94, 0.24)',
          'box-shadow': '0 12px 40px rgba(34, 197, 94, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
      });

      // Add base styles for improved accessibility
      addBase({
        ':root': {
          '--border': '217 32% 17%',
          '--input': '217 32% 17%',
          '--ring': '224 71% 4%',
          '--background': '224 71% 4%',
          '--foreground': '213 31% 91%',
          '--primary': '263 70% 50%',
          '--primary-foreground': '210 20% 98%',
          '--secondary': '215 25% 27%',
          '--secondary-foreground': '210 20% 98%',
          '--accent': '215 25% 27%',
          '--accent-foreground': '210 20% 98%',
          '--destructive': '0 63% 31%',
          '--destructive-foreground': '210 20% 98%',
          '--muted': '215 25% 27%',
          '--muted-foreground': '217 32% 17%',
          '--card': '224 71% 4%',
          '--card-foreground': '213 31% 91%',
          '--popover': '224 71% 4%',
          '--popover-foreground': '215 20% 65%',
        },
        '.light': {
          '--border': '220 13% 91%',
          '--input': '220 13% 91%',
          '--ring': '263 70% 50%',
          '--background': '0 0% 100%',
          '--foreground': '224 71% 4%',
          '--primary': '263 70% 50%',
          '--primary-foreground': '210 20% 98%',
          '--secondary': '220 14% 96%',
          '--secondary-foreground': '220 9% 46%',
          '--accent': '220 14% 96%',
          '--accent-foreground': '220 9% 46%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '210 20% 98%',
          '--muted': '220 14% 96%',
          '--muted-foreground': '220 9% 46%',
          '--card': '0 0% 100%',
          '--card-foreground': '224 71% 4%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '224 71% 4%',
        },
        // Improved focus styles for accessibility
        '*:focus': {
          outline: '2px solid transparent',
          'outline-offset': '2px',
        },
        '*:focus-visible': {
          'outline': '2px solid hsl(var(--ring))',
          'outline-offset': '2px',
        },
        // Better button reset
        'button': {
          'background-color': 'transparent',
          'border': 'none',
          'cursor': 'pointer',
        },
        // Improved form element styles
        'input, textarea, select': {
          'font-family': 'inherit',
        },
        // Better text rendering
        'html': {
          'text-rendering': 'optimizeLegibility',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      });
    },
  ],
};