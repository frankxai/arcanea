/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Arcanean theme colors
        arcanean: {
          'void': '#0a0a0f',
          'deep': '#1a1a2e',
          'midnight': '#16213e',
          'cosmic': '#1f2347',
          'nebula': '#2a2d5a',
          'aurora': '#3d4f73',
          'crystal': '#4a6fa5',
          'luminous': '#5c8bd9',
          'ethereal': '#7ba3e3',
          'radiant': '#9bb5e8',
          'celestial': '#b8c6ed',
          'transcendent': '#d6d9f2',
        },
        luminor: {
          'harmonix': '#ff6b6b',
          'scripta': '#4ecdc4',
          'lumina': '#45b7d1',
          'kinetix': '#96ceb4',
          'syntaxa': '#feca57',
          'nexus': '#ff9ff3',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-in": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "luminor-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(91, 139, 217, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(91, 139, 217, 0.6)" },
        },
        "cosmic-drift": {
          "0%": { transform: "translateX(0px) translateY(0px)" },
          "33%": { transform: "translateX(30px) translateY(-30px)" },
          "66%": { transform: "translateX(-20px) translateY(20px)" },
          "100%": { transform: "translateX(0px) translateY(0px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "luminor-glow": "luminor-glow 3s ease-in-out infinite",
        "cosmic-drift": "cosmic-drift 20s ease-in-out infinite",
      },
      backgroundImage: {
        'arcanean-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #1f2347 75%, #2a2d5a 100%)',
        'luminor-gradient': 'linear-gradient(135deg, #5c8bd9 0%, #7ba3e3 50%, #9bb5e8 100%)',
        'cosmic-nebula': 'radial-gradient(ellipse at center, #1f2347 0%, #16213e 50%, #0a0a0f 100%)',
      },
      fontFamily: {
        'arcanean': ['Inter', 'system-ui', 'sans-serif'],
        'luminor': ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}