import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
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
        // Arcanean Cosmic Colors
        cosmic: {
          void: 'hsl(var(--cosmic-void))',
          deep: 'hsl(var(--cosmic-deep))',
          surface: 'hsl(var(--cosmic-surface))',
          raised: 'hsl(var(--cosmic-raised))',
          border: 'hsl(var(--cosmic-border))',
          'border-bright': 'hsl(var(--cosmic-border-bright))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          disabled: 'hsl(var(--text-disabled))',
        },
        gold: {
          light: 'hsl(var(--gold-light))',
          medium: 'hsl(var(--gold-medium))',
          bright: 'hsl(var(--gold-bright))',
          deep: 'hsl(var(--gold-deep))',
          dark: 'hsl(var(--gold-dark))',
        },
        // Atlantean Academy
        atlantean: {
          deepest: 'hsl(var(--atlantean-deepest))',
          deep: 'hsl(var(--atlantean-deep))',
          primary: 'hsl(var(--atlantean-primary))',
          medium: 'hsl(var(--atlantean-medium))',
          light: 'hsl(var(--atlantean-light))',
          'teal-deep': 'hsl(var(--atlantean-teal-deep))',
          teal: 'hsl(var(--atlantean-teal))',
          'teal-light': 'hsl(var(--atlantean-teal-light))',
          aqua: 'hsl(var(--atlantean-aqua))',
          glow: 'hsl(var(--atlantean-glow))',
          shimmer: 'hsl(var(--atlantean-shimmer))',
        },
        // Draconic Academy
        draconic: {
          'crimson-deep': 'hsl(var(--draconic-crimson-deep))',
          crimson: 'hsl(var(--draconic-crimson))',
          'crimson-bright': 'hsl(var(--draconic-crimson-bright))',
          'crimson-light': 'hsl(var(--draconic-crimson-light))',
          'gold-deep': 'hsl(var(--draconic-gold-deep))',
          gold: 'hsl(var(--draconic-gold))',
          'gold-bright': 'hsl(var(--draconic-gold-bright))',
          'gold-light': 'hsl(var(--draconic-gold-light))',
          'sky-deep': 'hsl(var(--draconic-sky-deep))',
          sky: 'hsl(var(--draconic-sky))',
          'sky-bright': 'hsl(var(--draconic-sky-bright))',
          'sky-light': 'hsl(var(--draconic-sky-light))',
          storm: 'hsl(var(--draconic-storm))',
          cloud: 'hsl(var(--draconic-cloud))',
        },
        // Creation & Light Academy
        creation: {
          pure: 'hsl(var(--creation-pure))',
          bright: 'hsl(var(--creation-bright))',
          soft: 'hsl(var(--creation-soft))',
          warm: 'hsl(var(--creation-warm))',
          'gold-pure': 'hsl(var(--creation-gold-pure))',
          gold: 'hsl(var(--creation-gold))',
          'gold-deep': 'hsl(var(--creation-gold-deep))',
          'prism-red': 'hsl(var(--creation-prism-red))',
          'prism-orange': 'hsl(var(--creation-prism-orange))',
          'prism-yellow': 'hsl(var(--creation-prism-yellow))',
          'prism-green': 'hsl(var(--creation-prism-green))',
          'prism-cyan': 'hsl(var(--creation-prism-cyan))',
          'prism-blue': 'hsl(var(--creation-prism-blue))',
          'prism-purple': 'hsl(var(--creation-prism-purple))',
          'wave-light': 'hsl(var(--creation-wave-light))',
          'wave-medium': 'hsl(var(--creation-wave-medium))',
          'wave-deep': 'hsl(var(--creation-wave-deep))',
        },
        // Semantic Colors
        success: {
          light: 'hsl(var(--success-light))',
          DEFAULT: 'hsl(var(--success))',
          dark: 'hsl(var(--success-dark))',
        },
        warning: {
          light: 'hsl(var(--warning-light))',
          DEFAULT: 'hsl(var(--warning))',
          dark: 'hsl(var(--warning-dark))',
        },
        error: {
          light: 'hsl(var(--error-light))',
          DEFAULT: 'hsl(var(--error))',
          dark: 'hsl(var(--error-dark))',
        },
        info: {
          light: 'hsl(var(--info-light))',
          DEFAULT: 'hsl(var(--info))',
          dark: 'hsl(var(--info-dark))',
        },
      },
      backgroundImage: {
        'cosmic-grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        'cosmic-gradient': 'conic-gradient(from 180deg at 50% 50%, rgba(120,166,255,0.25), rgba(127,255,212,0.25), rgba(120,166,255,0.25))',
        'atlantean-gradient': 'linear-gradient(135deg, hsl(var(--atlantean-deep)) 0%, hsl(var(--atlantean-primary)) 50%, hsl(var(--atlantean-teal)) 100%)',
        'draconic-gradient': 'linear-gradient(135deg, hsl(var(--draconic-crimson)) 0%, hsl(var(--draconic-gold)) 50%, hsl(var(--draconic-sky)) 100%)',
        'creation-gradient': 'linear-gradient(135deg, hsl(var(--creation-gold)) 0%, hsl(var(--creation-prism-blue)) 50%, hsl(var(--creation-prism-purple)) 100%)',
        'prism-gradient': 'linear-gradient(90deg, hsl(var(--creation-prism-red)), hsl(var(--creation-prism-orange)), hsl(var(--creation-prism-yellow)), hsl(var(--creation-prism-green)), hsl(var(--creation-prism-cyan)), hsl(var(--creation-prism-blue)), hsl(var(--creation-prism-purple)))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        // Cosmic Animations
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 204, 51, 0.3)',
            opacity: '1'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 204, 51, 0.6)',
            opacity: '0.9'
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Atlantean Animations (Water)
        'water-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'wave': {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) scaleY(1.1)' },
        },
        'ripple': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2.5)',
            opacity: '0'
          },
        },
        'flow': {
          '0%, 100%': {
            transform: 'translateX(0) rotate(0deg)',
            opacity: '0.6'
          },
          '50%': {
            transform: 'translateX(10px) rotate(5deg)',
            opacity: '1'
          },
        },
        // Draconic Animations (Fire & Sky)
        'fire-flicker': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.9',
            filter: 'brightness(1.2)',
          },
        },
        'flame': {
          '0%, 100%': {
            transform: 'scaleY(1) translateY(0)',
            opacity: '1'
          },
          '50%': {
            transform: 'scaleY(1.2) translateY(-5px)',
            opacity: '0.8'
          },
        },
        'soar': {
          '0%': {
            transform: 'translateY(0) translateX(0) scale(1)',
            opacity: '0'
          },
          '50%': {
            transform: 'translateY(-100px) translateX(50px) scale(1.2)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-200px) translateX(100px) scale(0.8)',
            opacity: '0'
          },
        },
        'ember': {
          '0%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-50px) scale(0.5)',
            opacity: '0'
          },
        },
        // Creation Animations (Light & Sound)
        'prism-rotate': {
          '0%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)'
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(180deg)'
          },
          '100%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(360deg)'
          },
        },
        'radial-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: '0.5'
          },
        },
        'frequency': {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        // Standard Animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        // Cosmic
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        // Atlantean
        'water-flow': 'water-flow 6s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'ripple': 'ripple 1.5s ease-out',
        'flow': 'flow 5s ease-in-out infinite',
        // Draconic
        'fire-flicker': 'fire-flicker 2s ease-in-out infinite',
        'flame': 'flame 1.5s ease-in-out infinite',
        'soar': 'soar 3s ease-out',
        'ember': 'ember 2s ease-out infinite',
        // Creation
        'prism-rotate': 'prism-rotate 10s ease infinite',
        'radial-pulse': 'radial-pulse 2s ease-in-out infinite',
        'frequency': 'frequency 1s ease-in-out infinite',
        // Standard
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        cinzel: ['Cinzel', 'serif'], // Elegant display font for headings
        crimson: ['Crimson Pro', 'serif'], // Refined body font
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 204, 51, 0.3)',
        'glow-md': '0 0 20px rgba(255, 204, 51, 0.4)',
        'glow-lg': '0 0 30px rgba(255, 204, 51, 0.5)',
        'glow-xl': '0 0 40px rgba(255, 204, 51, 0.6)',
        'atlantean': '0 0 25px rgba(38, 204, 204, 0.5)',
        'draconic': '0 0 25px rgba(255, 198, 26, 0.5)',
        'creation': '0 0 25px rgba(255, 230, 128, 0.5)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
