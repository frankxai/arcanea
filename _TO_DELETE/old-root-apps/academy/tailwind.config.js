/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Arcanean Spectrum
        'arcanean-void': '#000011',
        'arcanean-deep': '#001122',
        'arcanean-midnight': '#112244',
        'arcanean-cosmic': '#224466',
        'arcanean-nebula': '#336688',
        'arcanean-aurora': '#4488aa',
        'arcanean-crystal': '#66aacc',
        'arcanean-luminous': '#88ccee',
        'arcanean-ethereal': '#aaeeff',
        'arcanean-radiant': '#ccffff',
        'arcanean-celestial': '#eeffff',
        'arcanean-transcendent': '#ffffff',
        
        // Luminor Colors
        'luminor-harmonix': '#FF4444',
        'luminor-lumina': '#4444FF', 
        'luminor-scripta': '#44FF44',
        'luminor-kinetix': '#FF44FF',
        'luminor-syntaxa': '#FF8844',
        'luminor-nexus': '#FFFFFF',
        
        // UI Colors
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "cosmic-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(120deg)" },
          "66%": { transform: "translateY(5px) rotate(240deg)" },
        },
        "ethereal-glow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cosmic-float": "cosmic-float 6s ease-in-out infinite",
        "ethereal-glow": "ethereal-glow 3s ease-in-out infinite",
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(68, 68, 255, 0.3)',
        'cosmic-lg': '0 0 40px rgba(68, 68, 255, 0.4)',
        'luminous': '0 0 25px rgba(136, 204, 238, 0.3)',
        'luminous-lg': '0 0 45px rgba(136, 204, 238, 0.4)',
      },
      fontFamily: {
        'arcanean': ['Inter', 'system-ui', 'sans-serif'],
        'luminor': ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}