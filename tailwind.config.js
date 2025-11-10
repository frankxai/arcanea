/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./apps/**/*.{ts,tsx,js,jsx,md,mdx}",
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
      colors: {
        // Shadcn/UI base colors
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

        // Cosmic Foundation - Universal Arcanean colors
        cosmic: {
          void: "#0a0a0f",
          deep: "#1a1a2e",
          midnight: "#16213e",
          cosmic: "#1f2347",
          nebula: "#2a2d5a",
          aurora: "#3d4f73",
          crystal: "#4a6fa5",
          luminous: "#5c8bd9",
          ethereal: "#7ba3e3",
          radiant: "#9bb5e8",
          celestial: "#b8c6ed",
          transcendent: "#d6d9f2"
        },

        // Atlantean Academy - Story & Lore
        atlantean: {
          abyss: "#0a1f2e",
          depth: "#0d3a52",
          current: "#118ab2",
          surface: "#06aed5",
          foam: "#86cfda",
          pearl: "#c8e7f2",
          coral: "#ff6b9d",
          silver: "#b8c9d9",
          jade: "#2a9d8f",
          amber: "#e9c46a"
        },

        // Draconic Academy - Visual Creation
        draconic: {
          shadow: "#1a0f0a",
          ember: "#8b2635",
          flame: "#c9384a",
          crimson: "#e63946",
          gold: "#f4a261",
          sky: "#4a90e2",
          cloud: "#a8b8d8",
          radiance: "#ffd97d",
          bronze: "#cd7f32",
          ruby: "#e01e37",
          sapphire: "#0f52ba",
          amber: "#ffbf00"
        },

        // Academy of Creation & Light - Music & Audio
        creation: {
          silence: "#f8f9fa",
          harmony: "#ffffff",
          frequency: "#fff4e6",
          gold: "#ffd700",
          prism: "#e0f7fa",
          violet: "#b794f6",
          indigo: "#818cf8",
          blue: "#60a5fa",
          cyan: "#22d3ee",
          green: "#34d399",
          yellow: "#fbbf24",
          orange: "#fb923c",
          rose: "#fda4af",
          aurora: "#7bf1a8",
          crystal: "#e5e7eb",
          shimmer: "#fef3c7"
        },

        // Luminor AI Companions
        luminor: {
          melodia: "#ff6b6b",    // Music
          chronica: "#4ecdc4",   // Story
          prismatic: "#45b7d1",  // Visual
          synthesis: "#feca57"   // Cross-media
        },

        // System Status Colors
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6"
        }
      },

      // Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },

      // Font Families
      fontFamily: {
        primary: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },

      // Font Sizes with line heights
      fontSize: {
        cosmic: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        stellar: ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        radiant: ["1.75rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        luminous: ["1.5rem", { lineHeight: "1.4" }],
        bright: ["1.25rem", { lineHeight: "1.5" }],
        clear: ["1.125rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.4" }]
      },

      // Spacing Scale (8px base grid)
      spacing: {
        xs: "0.25rem",   // 4px
        sm: "0.5rem",    // 8px
        md: "1rem",      // 16px
        lg: "1.5rem",    // 24px
        xl: "2rem",      // 32px
        "2xl": "3rem",   // 48px
        "3xl": "4rem",   // 64px
        "4xl": "6rem"    // 96px
      },

      // Box Shadows (magical glowing shadows)
      boxShadow: {
        "glow-subtle": "0 0 16px rgba(91, 139, 217, 0.15)",
        "glow-medium": "0 0 24px rgba(91, 139, 217, 0.3), 0 0 48px rgba(91, 139, 217, 0.15)",
        "glow-strong": "0 0 32px rgba(91, 139, 217, 0.5), 0 0 64px rgba(91, 139, 217, 0.25)",
        "glow-magical": "0 0 48px rgba(91, 139, 217, 0.6), 0 0 96px rgba(91, 139, 217, 0.3), 0 0 128px rgba(91, 139, 217, 0.15)",
        "elevation-1": "0 2px 8px rgba(91, 139, 217, 0.1), 0 0 16px rgba(91, 139, 217, 0.05)",
        "elevation-2": "0 4px 16px rgba(91, 139, 217, 0.15), 0 0 24px rgba(91, 139, 217, 0.08)",
        "elevation-3": "0 8px 24px rgba(91, 139, 217, 0.2), 0 0 32px rgba(91, 139, 217, 0.12)",
        "elevation-4": "0 16px 48px rgba(91, 139, 217, 0.25), 0 0 64px rgba(91, 139, 217, 0.15)",
        "elevation-5": "0 24px 64px rgba(91, 139, 217, 0.3), 0 0 96px rgba(91, 139, 217, 0.2)"
      },

      // Animations
      keyframes: {
        // Standard UI animations
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        "slide-in": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 }
        },
        "slide-out": {
          from: { transform: "translateY(0)", opacity: 1 },
          to: { transform: "translateY(20px)", opacity: 0 }
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 }
        },

        // Magical effects
        "luminor-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(91, 139, 217, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(91, 139, 217, 0.6)" }
        },
        "cosmic-glow": {
          "0%, 100%": { boxShadow: "0 0 40px rgba(91, 139, 217, 0.2), 0 0 80px rgba(91, 139, 217, 0.1)" },
          "50%": { boxShadow: "0 0 60px rgba(91, 139, 217, 0.3), 0 0 120px rgba(91, 139, 217, 0.15)" }
        },
        "cosmic-drift": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -30px)" },
          "66%": { transform: "translate(-20px, 20px)" },
          "100%": { transform: "translate(0, 0)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        "sparkle-burst": {
          "0%": { opacity: 0, transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: 1, transform: "scale(1.2) rotate(180deg)" },
          "100%": { opacity: 0, transform: "scale(0.8) rotate(360deg)" }
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        },

        // Academy-specific
        "water-flow": {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "50%": { transform: "translateY(-10px) scaleY(1.05)" }
        },
        "fire-flicker": {
          "0%, 100%": { opacity: 1, transform: "scaleY(1)" },
          "25%": { opacity: 0.9, transform: "scaleY(1.05)" },
          "50%": { opacity: 1, transform: "scaleY(0.98)" },
          "75%": { opacity: 0.95, transform: "scaleY(1.02)" }
        },
        "prismatic-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" }
        }
      },

      animation: {
        // Standard
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in": "slide-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-out": "slide-out 0.3s cubic-bezier(0.4, 0, 1, 1)",
        "scale-in": "scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",

        // Magical
        "luminor-glow": "luminor-glow 3s ease-in-out infinite",
        "cosmic-glow": "cosmic-glow 8s ease-in-out infinite",
        "cosmic-drift": "cosmic-drift 20s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "sparkle": "sparkle-burst 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse": "pulse-scale 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",

        // Academy
        "water-flow": "water-flow 4s ease-in-out infinite",
        "fire-flicker": "fire-flicker 2s ease-in-out infinite",
        "prismatic": "prismatic-shift 6s linear infinite"
      },

      // Background Gradients
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #1f2347 75%, #2a2d5a 100%)",
        "luminous-gradient": "linear-gradient(135deg, #5c8bd9 0%, #7ba3e3 50%, #9bb5e8 100%)",
        "cosmic-nebula": "radial-gradient(ellipse at center, #1f2347 0%, #16213e 50%, #0a0a0f 100%)",

        // Academy gradients
        "atlantean-gradient": "linear-gradient(135deg, #0d3a52 0%, #118ab2 100%)",
        "atlantean-glow": "radial-gradient(circle, #c8e7f2 0%, #06aed5 50%, #0d3a52 100%)",
        "draconic-gradient": "linear-gradient(135deg, #8b2635 0%, #e63946 50%, #f4a261 100%)",
        "draconic-sky": "linear-gradient(180deg, #4a90e2 0%, #a8b8d8 100%)",
        "creation-gradient": "linear-gradient(135deg, #ffffff 0%, #fff4e6 50%, #ffd700 100%)",
        "creation-rainbow": "linear-gradient(90deg, #b794f6 0%, #818cf8 14.3%, #60a5fa 28.6%, #22d3ee 42.9%, #34d399 57.2%, #fbbf24 71.5%, #fb923c 85.8%, #fda4af 100%)"
      },

      // Transition Timing
      transitionTimingFunction: {
        "magic": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "cosmic": "cubic-bezier(0.22, 1, 0.36, 1)",
        "glow": "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },

      // Transition Durations
      transitionDuration: {
        instant: "100ms",
        fast: "200ms",
        normal: "300ms",
        smooth: "500ms",
        flowing: "800ms",
        cosmic: "1200ms"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ]
};
