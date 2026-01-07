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
        },
        cosmic: {
          void: 'hsl(var(--cosmic-void))',
          deep: 'hsl(var(--cosmic-deep))',
          surface: 'hsl(var(--cosmic-surface))',
          raised: 'hsl(var(--cosmic-raised))',
          border: 'hsl(var(--cosmic-border))'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        gold: {
          light: 'hsl(var(--gold-light))',
          medium: 'hsl(var(--gold-medium))',
          bright: 'hsl(var(--gold-bright))',
          deep: 'hsl(var(--gold-deep))',
          dark: 'hsl(var(--gold-dark))'
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          disabled: 'hsl(var(--text-disabled))'
        },
        atlantean: {
          deepest: 'hsl(var(--atlantean-deepest))',
          deep: 'hsl(var(--atlantean-deep))',
          primary: 'hsl(var(--atlantean-primary))',
          medium: 'hsl(var(--atlantean-medium))',
          light: 'hsl(var(--atlantean-light))',
          teal: {
            deep: 'hsl(var(--atlantean-teal-deep))',
            DEFAULT: 'hsl(var(--atlantean-teal))',
            light: 'hsl(var(--atlantean-teal-light))',
            aqua: 'hsl(var(--atlantean-aqua))'
          },
          glow: 'hsl(var(--atlantean-glow))',
          shimmer: 'hsl(var(--atlantean-shimmer))'
        },
        draconic: {
          crimson: {
            deep: 'hsl(var(--draconic-crimson-deep))',
            DEFAULT: 'hsl(var(--draconic-crimson))',
            bright: 'hsl(var(--draconic-crimson-bright))',
            light: 'hsl(var(--draconic-crimson-light))'
          },
          gold: {
            deep: 'hsl(var(--draconic-gold-deep))',
            DEFAULT: 'hsl(var(--draconic-gold))',
            bright: 'hsl(var(--draconic-gold-bright))',
            light: 'hsl(var(--draconic-gold-light))'
          },
          sky: {
            deep: 'hsl(var(--draconic-sky-deep))',
            DEFAULT: 'hsl(var(--draconic-sky))',
            bright: 'hsl(var(--draconic-sky-bright))',
            light: 'hsl(var(--draconic-sky-light))'
          },
          storm: 'hsl(var(--draconic-storm))',
          cloud: 'hsl(var(--draconic-cloud))'
        },
        creation: {
          pure: 'hsl(var(--creation-pure))',
          bright: 'hsl(var(--creation-bright))',
          soft: 'hsl(var(--creation-soft))',
          warm: 'hsl(var(--creation-warm))',
          gold: {
            pure: 'hsl(var(--creation-gold-pure))',
            DEFAULT: 'hsl(var(--creation-gold))',
            deep: 'hsl(var(--creation-gold-deep))'
          },
          prism: {
            red: 'hsl(var(--creation-prism-red))',
            orange: 'hsl(var(--creation-prism-orange))',
            yellow: 'hsl(var(--creation-prism-yellow))',
            green: 'hsl(var(--creation-prism-green))',
            cyan: 'hsl(var(--creation-prism-cyan))',
            blue: 'hsl(var(--creation-prism-blue))',
            purple: 'hsl(var(--creation-prism-purple))'
          },
          wave: {
            light: 'hsl(var(--creation-wave-light))',
            medium: 'hsl(var(--creation-wave-medium))',
            deep: 'hsl(var(--creation-wave-deep))'
          }
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

