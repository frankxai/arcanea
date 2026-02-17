/**
 * Design Token Provider
 *
 * Exports the Arcanea Design System as consumable tokens:
 * CSS custom properties, Tailwind config, JSON, and typed constants.
 */

// ============================================
// COLOR TOKENS
// ============================================

export const COLORS = {
  // Cosmic backgrounds (dark → light)
  cosmic: {
    void: '#0a0a0f',
    deep: '#12121f',
    surface: '#1a1a2e',
    raised: '#232340',
    elevated: '#2d2d55',
    overlay: '#3a3a6a',
  },

  // Arcane accents
  arcane: {
    crystal: '#7fffd4',  // Atlantean Teal — PRIMARY
    fire: '#ff6b35',
    water: '#78a6ff',
    earth: '#4ade80',
    void: '#a855f7',
    gold: '#ffd700',     // Lumina's color
  },

  // Semantic
  semantic: {
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#78a6ff',
  },

  // Text
  text: {
    primary: '#e4e4f0',
    secondary: '#a0a0b8',
    muted: '#6b6b80',
    inverse: '#0a0a0f',
  },

  // Element colors
  element: {
    fire: '#ff4500',
    water: '#00bfff',
    earth: '#228b22',
    wind: '#f0f8ff',
    void: '#4b0082',
    spirit: '#ffd700',
  },
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export const FONTS = {
  display: "'Cinzel', serif",
  body: "'Crimson Pro', serif",
  sans: "'Inter', sans-serif",
  code: "'JetBrains Mono', monospace",
} as const;

export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
} as const;

// ============================================
// SPACING TOKENS
// ============================================

export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

// ============================================
// EFFECT TOKENS
// ============================================

export const EFFECTS = {
  glass: {
    background: 'rgba(26, 26, 46, 0.6)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(127, 255, 212, 0.1)',
  },
  glassStrong: {
    background: 'rgba(26, 26, 46, 0.8)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(127, 255, 212, 0.2)',
  },
  glow: {
    crystal: '0 0 20px rgba(127, 255, 212, 0.3)',
    fire: '0 0 20px rgba(255, 107, 53, 0.3)',
    gold: '0 0 20px rgba(255, 215, 0, 0.3)',
  },
  gradient: {
    cosmicMesh: 'radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
    aurora: 'linear-gradient(135deg, rgba(127, 255, 212, 0.1) 0%, rgba(120, 166, 255, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)',
    textGold: 'linear-gradient(135deg, #ffd700, #ffaa00)',
    textCrystal: 'linear-gradient(135deg, #7fffd4, #78a6ff)',
  },
} as const;

// ============================================
// ANIMATION TOKENS
// ============================================

export const ANIMATIONS = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    glacial: '1000ms',
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// EXPORT FORMATS
// ============================================

/**
 * Export tokens as CSS custom properties string.
 */
export function toCSSVariables(): string {
  const lines: string[] = [':root {'];

  // Colors
  for (const [group, values] of Object.entries(COLORS)) {
    for (const [name, value] of Object.entries(values)) {
      lines.push(`  --arcanea-${group}-${name}: ${value};`);
    }
  }

  // Fonts
  for (const [name, value] of Object.entries(FONTS)) {
    lines.push(`  --arcanea-font-${name}: ${value};`);
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Export as Tailwind CSS theme extension.
 */
export function toTailwindConfig(): Record<string, unknown> {
  return {
    colors: {
      cosmic: { ...COLORS.cosmic },
      arcane: { ...COLORS.arcane },
    },
    fontFamily: {
      display: [FONTS.display],
      body: [FONTS.body],
      sans: [FONTS.sans],
      mono: [FONTS.code],
    },
    screens: { ...BREAKPOINTS },
  };
}

/**
 * Export all tokens as a flat JSON object.
 */
export function toJSON(): Record<string, unknown> {
  return {
    colors: COLORS,
    fonts: FONTS,
    fontSizes: FONT_SIZES,
    spacing: SPACING,
    effects: EFFECTS,
    animations: ANIMATIONS,
    breakpoints: BREAKPOINTS,
  };
}
