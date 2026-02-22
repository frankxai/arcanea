/**
 * Arcanea Tailwind Configuration v2.0
 * Source of truth: .arcanea/design/DESIGN_BIBLE.md
 * Cosmic Glass Design System
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./apps/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
    "./packages/**/*.{ts,tsx,js,jsx,md,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      /* ==========================================
         COLORS
         ========================================== */
      colors: {
        // shadcn/ui base (HSL variables from globals.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },

        // Cosmic Palette (Backgrounds & Surfaces)
        cosmic: {
          void: "#0b0e14",
          deep: "#121826",
          surface: "#1a2332",
          raised: "#242f42",
          elevated: "#2d3a52",
          overlay: "#364562"
        },

        // Brand
        brand: {
          primary: "#8b5cf6",
          accent: "#7fffd4",
          gold: "#ffd700",
          secondary: "#78a6ff"
        },

        // Elemental Accents
        crystal: {
          DEFAULT: "#7fffd4",
          bright: "#99ffe0",
          deep: "#5ce6b8"
        },
        fire: {
          DEFAULT: "#ff6b35",
          bright: "#ff8c5a",
          deep: "#d94e1f"
        },
        water: {
          DEFAULT: "#78a6ff",
          bright: "#9dbfff",
          deep: "#5a8ce6"
        },
        "void-el": {
          DEFAULT: "#9966ff",
          bright: "#b38cff",
          deep: "#7a4dcc"
        },
        gold: {
          DEFAULT: "#ffd700",
          bright: "#ffe44d",
          deep: "#ccac00"
        },
        wind: {
          DEFAULT: "#00ff88",
          bright: "#33ffaa",
          deep: "#00cc6d"
        },
        earth: {
          DEFAULT: "#8b7355",
          bright: "#a89070",
          deep: "#6e5940"
        },

        // Text
        "text-primary": "#e6eefc",
        "text-secondary": "#9bb1d0",
        "text-muted": "#708094",
        "text-disabled": "#515b6b",

        // Semantic
        success: { DEFAULT: "#20cc73", light: "#5ae096", dark: "#18a65c" },
        warning: { DEFAULT: "#ffa500", light: "#ffbf4d", dark: "#cc8400" },
        error: { DEFAULT: "#f52952", light: "#f75c7a", dark: "#cc1f42" },
        info: { DEFAULT: "#26b8e6", light: "#5ccde6", dark: "#1f99bf" }
      },

      /* ==========================================
         TYPOGRAPHY
         ========================================== */
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Crimson Pro", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },

      fontSize: {
        "fluid-xs": ["clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)", { lineHeight: "1.4" }],
        "fluid-sm": ["clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(0.9rem, 0.85rem + 0.25vw, 1rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.1rem, 1rem + 0.5vw, 1.25rem)", { lineHeight: "1.5" }],
        "fluid-xl": ["clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)", { lineHeight: "1.4" }],
        "fluid-2xl": ["clamp(1.5rem, 1.25rem + 1.25vw, 2rem)", { lineHeight: "1.3" }],
        "fluid-3xl": ["clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)", { lineHeight: "1.2" }],
        "fluid-4xl": ["clamp(2.25rem, 1.75rem + 2.5vw, 3rem)", { lineHeight: "1.1" }],
        "fluid-5xl": ["clamp(3rem, 2rem + 5vw, 4.5rem)", { lineHeight: "1.0" }],
        "fluid-hero": ["clamp(3rem, 1.5rem + 7.5vw, 7rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }]
      },

      /* ==========================================
         BORDER RADIUS
         ========================================== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },

      /* ==========================================
         SHADOWS & GLOWS
         ========================================== */
      boxShadow: {
        // Glows
        "glow-sm": "0 0 10px rgba(127, 255, 212, 0.15)",
        "glow-md": "0 0 20px rgba(127, 255, 212, 0.25)",
        "glow-lg": "0 0 40px rgba(127, 255, 212, 0.35)",
        "glow-xl": "0 0 60px rgba(127, 255, 212, 0.45)",
        "glow-brand": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-fire": "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-gold": "0 0 20px rgba(255, 215, 0, 0.3)",
        "glow-void": "0 0 20px rgba(153, 102, 255, 0.3)",

        // Elevation
        "elevation-1": "0 2px 8px rgba(0,0,0,0.2), 0 0 1px rgba(255,255,255,0.05)",
        "elevation-2": "0 4px 16px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.06)",
        "elevation-3": "0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08)",
        "elevation-4": "0 16px 64px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)"
      },

      /* ==========================================
         BACKGROUND IMAGES
         ========================================== */
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #0b0e14 0%, #1a2332 100%)",
        "cosmic-mesh": "radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(153, 102, 255, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(120, 166, 255, 0.03) 0%, transparent 50%)",
        "aurora": "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(127, 255, 212, 0.06) 33%, rgba(120, 166, 255, 0.08) 66%, rgba(255, 215, 0, 0.04) 100%)",
        "gradient-crystal": "linear-gradient(135deg, #7fffd4 0%, #99ffe0 100%)",
        "gradient-fire": "linear-gradient(135deg, #ff6b35 0%, #ffd700 100%)",
        "gradient-void": "linear-gradient(135deg, #9966ff 0%, #b38cff 100%)",
        "gradient-gold": "linear-gradient(135deg, #ffd700 0%, #ffe44d 100%)",
        "gradient-brand": "linear-gradient(135deg, #8b5cf6 0%, #7fffd4 100%)"
      },

      /* ==========================================
         ANIMATIONS
         ========================================== */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "cosmic-drift": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -30px)" },
          "66%": { transform: "translate(-20px, 20px)" },
          "100%": { transform: "translate(0, 0)" }
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.9" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(127, 255, 212, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(127, 255, 212, 0.4)" }
        }
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in-down": "fade-in-down 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "cosmic-drift": "cosmic-drift 20s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite"
      },

      /* ==========================================
         TRANSITIONS
         ========================================== */
      transitionTimingFunction: {
        "default": "cubic-bezier(0.4, 0, 0.2, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "cosmic": "cubic-bezier(0.22, 1, 0.36, 1)",
        "snappy": "cubic-bezier(0.2, 0, 0, 1)"
      },

      transitionDuration: {
        "instant": "100ms",
        "fast": "150ms",
        "normal": "250ms",
        "smooth": "400ms",
        "flowing": "600ms",
        "cosmic": "1000ms"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ]
};
