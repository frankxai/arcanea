/**
 * Arcanea Design Preset v2.0
 * Tailwind CSS preset for any Arcanea package or app.
 * Source of truth: .arcanea/design/DESIGN_BIBLE.md
 *
 * Usage in tailwind.config:
 *   presets: [require('@arcanea/design-preset')]
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: "#0b0e14",
          deep: "#121826",
          surface: "#1a2332",
          raised: "#242f42",
          elevated: "#2d3a52",
          overlay: "#364562"
        },
        brand: {
          primary: "#8b5cf6",
          accent: "#7fffd4",
          gold: "#ffd700",
          secondary: "#78a6ff"
        },
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
        "text-primary": "#e6eefc",
        "text-secondary": "#9bb1d0",
        "text-muted": "#708094"
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Crimson Pro", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      backgroundImage: {
        "cosmic-mesh": "radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(153, 102, 255, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(120, 166, 255, 0.03) 0%, transparent 50%)",
        "gradient-crystal": "linear-gradient(135deg, #7fffd4 0%, #99ffe0 100%)",
        "gradient-fire": "linear-gradient(135deg, #ff6b35 0%, #ffd700 100%)",
        "gradient-void": "linear-gradient(135deg, #9966ff 0%, #b38cff 100%)",
        "gradient-gold": "linear-gradient(135deg, #ffd700 0%, #ffe44d 100%)",
        "gradient-brand": "linear-gradient(135deg, #8b5cf6 0%, #7fffd4 100%)"
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(127, 255, 212, 0.15)",
        "glow-md": "0 0 20px rgba(127, 255, 212, 0.25)",
        "glow-lg": "0 0 40px rgba(127, 255, 212, 0.35)",
        "glow-brand": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-fire": "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-gold": "0 0 20px rgba(255, 215, 0, 0.3)",
        "elevation-1": "0 2px 8px rgba(0,0,0,0.2), 0 0 1px rgba(255,255,255,0.05)",
        "elevation-2": "0 4px 16px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.06)",
        "elevation-3": "0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08)"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" }
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
};
