/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // === ARCANEA CUSTOM COLORS ===
      colors: {
        // Primary Brand Colors
        arcanea: {
          primary: "var(--arcanea-primary)",
          secondary: "var(--arcanea-secondary)", 
          tertiary: "var(--arcanea-tertiary)",
          black: "var(--arcanea-black)",
          white: "var(--arcanea-white)",
        },
        
        // Cosmic Grays
        cosmic: {
          50: "var(--arcanea-gray-100)",
          100: "var(--arcanea-gray-200)",
          200: "var(--arcanea-gray-300)",
          300: "var(--arcanea-gray-400)",
          400: "var(--arcanea-gray-500)",
          500: "var(--arcanea-gray-600)",
          600: "var(--arcanea-gray-700)",
          700: "var(--arcanea-gray-800)",
          800: "var(--arcanea-gray-900)",
          900: "var(--arcanea-black)",
        },
        
        // Luminor Character Colors
        lumina: {
          primary: "var(--lumina-primary)",
          glow: "var(--lumina-glow)",
          50: "#F0F4FF",
          100: "#E0E7FF", 
          500: "var(--lumina-primary)",
          600: "var(--lumina-glow)",
        },
        
        harmonix: {
          primary: "var(--harmonix-primary)",
          glow: "var(--harmonix-glow)",
          50: "#FDF2F8",
          100: "#FCE7F3",
          500: "var(--harmonix-primary)",
          600: "var(--harmonix-glow)",
        },
        
        scripta: {
          primary: "var(--scripta-primary)",
          glow: "var(--scripta-glow)",
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "var(--scripta-primary)",
          600: "var(--scripta-glow)",
        },
        
        kinetix: {
          primary: "var(--kinetix-primary)",
          glow: "var(--kinetix-glow)",
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "var(--kinetix-primary)",
          600: "var(--kinetix-glow)",
        },
        
        syntaxa: {
          primary: "var(--syntaxa-primary)",
          glow: "var(--syntaxa-glow)",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "var(--syntaxa-primary)",
          600: "var(--syntaxa-glow)",
        },
        
        nexus: {
          primary: "var(--nexus-primary)",
          glow: "var(--nexus-glow)",
          50: "#F7F3E9",
          100: "#F0E6D2",
          500: "var(--nexus-primary)",
          600: "var(--nexus-glow)",
        },
        
        // Semantic Colors
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        card: "var(--bg-secondary)",
        "card-foreground": "var(--text-primary)",
        popover: "var(--bg-secondary)",
        "popover-foreground": "var(--text-primary)",
        primary: "var(--arcanea-primary)",
        "primary-foreground": "var(--arcanea-white)",
        secondary: "var(--bg-secondary)",
        "secondary-foreground": "var(--text-secondary)",
        muted: "var(--bg-tertiary)",
        "muted-foreground": "var(--text-tertiary)",
        accent: "var(--arcanea-secondary)",
        "accent-foreground": "var(--arcanea-white)",
        destructive: "var(--error)",
        "destructive-foreground": "var(--arcanea-white)",
        border: "var(--border-color)",
        input: "var(--border-color)",
        ring: "var(--arcanea-primary)",
      },
      
      // === COSMIC GRADIENTS ===
      backgroundImage: {
        "gradient-cosmic": "var(--gradient-cosmic)",
        "gradient-void": "var(--gradient-void)",
        "gradient-ethereal": "var(--gradient-ethereal)",
        "gradient-lumina": "var(--gradient-lumina)",
        "gradient-harmonix": "var(--gradient-harmonix)",
        "gradient-scripta": "var(--gradient-scripta)",
        "gradient-kinetix": "var(--gradient-kinetix)",
        "gradient-syntaxa": "var(--gradient-syntaxa)",
        "gradient-nexus": "var(--gradient-nexus)",
        "cosmic-stars": "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        "nebula": "conic-gradient(from 180deg at 50% 50%, var(--arcanea-primary) 0deg, var(--arcanea-secondary) 120deg, var(--arcanea-tertiary) 240deg, var(--arcanea-primary) 360deg)",
      },
      
      // === COSMIC TYPOGRAPHY ===
      fontFamily: {
        cosmic: ["var(--font-cosmic)", ...fontFamily.sans],
        ethereal: ["var(--font-ethereal)", ...fontFamily.serif],
        technical: ["var(--font-technical)", ...fontFamily.mono],
      },
      
      fontSize: {
        "cosmic-xs": ["var(--text-xs)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-sm": ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        "cosmic-base": ["var(--text-base)", { lineHeight: "var(--leading-normal)" }],
        "cosmic-lg": ["var(--text-lg)", { lineHeight: "var(--leading-relaxed)" }],
        "cosmic-xl": ["var(--text-xl)", { lineHeight: "var(--leading-relaxed)" }],
        "cosmic-2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-7xl": ["var(--text-7xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-8xl": ["var(--text-8xl)", { lineHeight: "var(--leading-tight)" }],
        "cosmic-9xl": ["var(--text-9xl)", { lineHeight: "var(--leading-tight)" }],
      },
      
      // === COSMIC SPACING ===
      spacing: {
        "cosmic-1": "var(--space-1)",
        "cosmic-2": "var(--space-2)", 
        "cosmic-3": "var(--space-3)",
        "cosmic-4": "var(--space-4)",
        "cosmic-5": "var(--space-5)",
        "cosmic-6": "var(--space-6)",
        "cosmic-8": "var(--space-8)",
        "cosmic-10": "var(--space-10)",
        "cosmic-12": "var(--space-12)",
        "cosmic-16": "var(--space-16)",
        "cosmic-20": "var(--space-20)",
        "cosmic-24": "var(--space-24)",
        "cosmic-32": "var(--space-32)",
        "cosmic-40": "var(--space-40)",
        "cosmic-48": "var(--space-48)",
        "cosmic-56": "var(--space-56)",
        "cosmic-64": "var(--space-64)",
      },
      
      // === COSMIC EFFECTS ===
      borderRadius: {
        "cosmic-sm": "var(--radius-sm)",
        "cosmic": "var(--radius-default)",
        "cosmic-md": "var(--radius-md)",
        "cosmic-lg": "var(--radius-lg)",
        "cosmic-xl": "var(--radius-xl)",
        "cosmic-2xl": "var(--radius-2xl)",
        "cosmic-3xl": "var(--radius-3xl)",
      },
      
      boxShadow: {
        "cosmic-sm": "var(--shadow-sm)",
        "cosmic": "var(--shadow-default)",
        "cosmic-md": "var(--shadow-md)",
        "cosmic-lg": "var(--shadow-lg)",
        "cosmic-xl": "var(--shadow-xl)",
        "cosmic-2xl": "var(--shadow-2xl)",
        "cosmic-inner": "var(--shadow-inner)",
        
        // Luminor Glows
        "glow-lumina": "var(--glow-lumina)",
        "glow-harmonix": "var(--glow-harmonix)",
        "glow-scripta": "var(--glow-scripta)",
        "glow-kinetix": "var(--glow-kinetix)",
        "glow-syntaxa": "var(--glow-syntaxa)",
        "glow-nexus": "var(--glow-nexus)",
      },
      
      // === COSMIC ANIMATIONS ===
      animation: {
        "cosmic-pulse": "cosmic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cosmic-float": "cosmic-float 6s ease-in-out infinite",
        "cosmic-glow": "cosmic-glow 3s ease-in-out infinite alternate",
        "cosmic-spin": "spin 3s linear infinite",
        "nebula-drift": "nebula-drift 20s ease-in-out infinite",
        "star-twinkle": "star-twinkle 4s ease-in-out infinite",
      },
      
      keyframes: {
        "cosmic-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "cosmic-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "cosmic-glow": {
          "0%": { boxShadow: "0 0 20px var(--arcanea-primary)" },
          "100%": { boxShadow: "0 0 40px var(--arcanea-secondary)" },
        },
        "nebula-drift": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 1 },
        },
      },
      
      // === TRANSITIONS ===
      transitionDuration: {
        "cosmic-fast": "var(--duration-fast)",
        "cosmic": "var(--duration-normal)",
        "cosmic-slow": "var(--duration-slow)",
        "cosmic-slower": "var(--duration-slower)",
        "cosmic-slowest": "var(--duration-slowest)",
      },
      
      transitionTimingFunction: {
        "cosmic": "var(--ease-cosmic)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    
    // Custom Arcanea Plugin
    function({ addUtilities, addComponents, addBase, theme }) {
      // Base Cosmic Styles
      addBase({
        ':root': {
          '--font-cosmic': '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          '--font-ethereal': '"Playfair Display", Georgia, serif',
          '--font-technical': '"JetBrains Mono", "Menlo", "Monaco", monospace',
        },
        'html': {
          fontFamily: 'var(--font-cosmic)',
        },
        'body': {
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          minHeight: '100vh',
        },
      });
      
      // Cosmic Utilities
      addUtilities({
        '.cosmic-gradient': {
          background: 'var(--gradient-cosmic)',
        },
        '.void-gradient': {
          background: 'var(--gradient-void)',
        },
        '.ethereal-gradient': {
          background: 'var(--gradient-ethereal)',
        },
        '.cosmic-glow': {
          boxShadow: '0 0 30px var(--arcanea-primary)',
        },
        '.cosmic-text-glow': {
          textShadow: '0 0 20px currentColor',
        },
        '.cosmic-border-glow': {
          boxShadow: '0 0 0 1px var(--arcanea-primary), 0 0 20px var(--arcanea-primary)',
        },
      });
      
      // Luminor Utilities  
      addUtilities({
        '.lumina-glow': { boxShadow: 'var(--glow-lumina)' },
        '.harmonix-glow': { boxShadow: 'var(--glow-harmonix)' },
        '.scripta-glow': { boxShadow: 'var(--glow-scripta)' },
        '.kinetix-glow': { boxShadow: 'var(--glow-kinetix)' },
        '.syntaxa-glow': { boxShadow: 'var(--glow-syntaxa)' },
        '.nexus-glow': { boxShadow: 'var(--glow-nexus)' },
      });
      
      // Cosmic Components
      addComponents({
        '.cosmic-card': {
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all var(--duration-normal) var(--ease-cosmic)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-xl)',
          },
        },
        '.cosmic-button': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-3) var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          fontWeight: 'var(--font-semibold)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-tight)',
          transition: 'all var(--duration-normal) var(--ease-cosmic)',
          cursor: 'pointer',
          border: 'none',
          background: 'var(--gradient-cosmic)',
          color: 'var(--arcanea-white)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-lg)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        '.cosmic-input': {
          width: '100%',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          fontSize: 'var(--text-sm)',
          transition: 'all var(--duration-normal) var(--ease-cosmic)',
          '&:focus': {
            outline: 'none',
            borderColor: 'var(--arcanea-primary)',
            boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
          },
        },
      });
    },
  ],
};