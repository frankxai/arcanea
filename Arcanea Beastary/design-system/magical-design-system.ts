/**
 * 🪄 ARCANEAN DESIGN SYSTEM
 * Magical Component Library for Creator Wizards
 * Inspired by: Apple HIG, Material Design, Gaming UX Excellence
 */

// ✨ MAGICAL COLOR PALETTE
export const arcaneColors = {
  // Primary Spell Spectrum
  midnight: '#0a0b1e',
  deep: '#1a1b3a', 
  royal: '#2d3561',
  mystic: '#4a5c96',
  crystal: '#6366f1',
  aurora: '#8b5cf6',
  ethereal: '#ec4899',
  radiant: '#f59e0b',
  shimmer: '#10b981',
  warning: '#f97316',
  danger: '#ef4444',
  
  // Realm-Specific Palettes
  realms: {
    shadow: {
      primary: '#1a1a2e',
      secondary: '#16213e', 
      accent: '#0f3460',
      text: '#e2e8f0'
    },
    crystal: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      text: '#ffffff'
    },
    fire: {
      primary: '#ff6b6b',
      secondary: '#ee5a24',
      accent: '#feca57',
      text: '#ffffff'
    },
    nature: {
      primary: '#26de81',
      secondary: '#20bf6b',
      accent: '#4b7bec',
      text: '#2d3436'
    },
    arcane: {
      primary: '#a55eea',
      secondary: '#8854d0',
      accent: '#3d5af1',
      text: '#ffffff'
    }
  }
}

// 🎨 PREMIUM GRADIENT COLLECTION
export const magicalGradients = {
  // Spell Casting Effects
  spells: {
    mysticAurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    dragonFire: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    etherealMist: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    phoenixRising: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    voidMagic: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
    crystalline: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    enchanted: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    cosmic: 'linear-gradient(135deg, #243949 0%, #517fa4 100%)',
  },
  
  // Interactive States
  interactions: {
    hover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    active: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    focus: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
  },

  // Background Realms
  backgrounds: {
    primaryRealm: 'linear-gradient(135deg, #0a0b1e 0%, #1a1b3a 50%, #2d3561 100%)',
    shadowRealm: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0c0c0c 100%)',
    crystalCavern: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 100%)',
    etherealPlanes: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 75%, #764ba2 100%)',
  }
}

// 🔮 GLASSMORPHIC MAGIC SYSTEM
export const glassEffects = {
  // Core Glass Properties
  primary: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
    borderRadius: '16px',
  },
  
  secondary: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.16)',
    borderRadius: '12px',
  },
  
  subtle: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(8px) saturate(120%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: '8px',
  },

  // Magical Variants
  enchanted: {
    background: 'rgba(102, 126, 234, 0.12)',
    backdropFilter: 'blur(20px) saturate(200%)',
    border: '1px solid rgba(102, 126, 234, 0.24)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
  },

  mystical: {
    background: 'rgba(139, 92, 246, 0.10)',
    backdropFilter: 'blur(18px) saturate(190%)', 
    border: '1px solid rgba(139, 92, 246, 0.20)',
    boxShadow: '0 10px 35px rgba(139, 92, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    borderRadius: '18px',
  }
}

// ✨ MAGICAL ANIMATIONS
export const spellAnimations = {
  // Entrance Spells
  materialize: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  shimmer: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    }
  },

  float: {
    animate: {
      y: [-2, 2, -2],
      rotate: [-1, 1, -1],
    },
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    }
  },

  glow: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(102, 126, 234, 0.3)',
        '0 0 30px rgba(139, 92, 246, 0.5)', 
        '0 0 20px rgba(102, 126, 234, 0.3)'
      ],
    },
    transition: {
      duration: 3,
      ease: 'easeInOut', 
      repeat: Infinity,
    }
  },

  // Interactive Enchantments
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' }
  },

  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeInOut' }
  },

  // Particle Effects
  sparkle: {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
    },
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      staggerChildren: 0.1,
    }
  }
}

// 🪄 TYPOGRAPHY MAGIC SYSTEM
export const magicalTypography = {
  // Font Families
  families: {
    spells: '"Cinzel Decorative", serif',      // Headlines & Magic Words
    arcane: '"Inter Display", sans-serif',     // Interface & Body Text  
    runes: '"JetBrains Mono", monospace',      // Code & Ancient Scripts
    scrolls: '"Playfair Display", serif',      // Lore & Stories
  },

  // Magical Text Scales
  scales: {
    // Spell Titles (H1)
    grandSpell: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-spells)',
    },
    
    // Section Headers (H2) 
    majorSpell: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: '600', 
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      fontFamily: 'var(--font-spells)',
    },

    // Subsection Headers (H3)
    minorSpell: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: '600',
      lineHeight: '1.3',
      fontFamily: 'var(--font-arcane)',
    },

    // Body Text
    incantation: {
      fontSize: '1.125rem',
      fontWeight: '400', 
      lineHeight: '1.7',
      fontFamily: 'var(--font-arcane)',
    },

    // Captions & Labels
    rune: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.5',
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-runes)',
    },
  }
}

// 🎯 COMPONENT SPACING & SIZING
export const magicalSpacing = {
  // Spell Casting Distances
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px  
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px

  // Magical Containers
  containers: {
    spell: '20rem',      // Small spells
    ward: '28rem',       // Medium protections
    ritual: '48rem',     // Large ceremonies
    realm: '80rem',      // Full realms
  },

  // Interaction Zones
  touch: {
    minimum: '44px',     // Apple/Material minimum
    comfortable: '48px', // Comfortable tapping
    spacious: '56px',    // Spacious interactions
  }
}

// 🔮 Z-INDEX LAYERING SYSTEM
export const magicalLayers = {
  background: -10,
  content: 0,
  elevated: 10,
  dropdown: 100,
  sticky: 200,
  modal: 1000,
  popover: 1100,
  tooltip: 1200,
  notification: 1300,
  maximum: 9999,
}

// 🌟 SHADOW SPELL SYSTEM  
export const magicalShadows = {
  // Elevation Shadows
  subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
  soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
  medium: '0 8px 25px rgba(0, 0, 0, 0.15)',
  strong: '0 20px 40px rgba(0, 0, 0, 0.2)',
  dramatic: '0 40px 80px rgba(0, 0, 0, 0.3)',

  // Magical Glows
  enchanted: '0 0 30px rgba(102, 126, 234, 0.4)',
  mystical: '0 0 25px rgba(139, 92, 246, 0.4)',
  ethereal: '0 0 20px rgba(236, 72, 153, 0.4)',
  radiant: '0 0 35px rgba(245, 158, 11, 0.4)',

  // Interactive States
  hover: '0 12px 30px rgba(0, 0, 0, 0.18)',
  active: '0 4px 12px rgba(0, 0, 0, 0.25)',
  focus: '0 0 0 4px rgba(102, 126, 234, 0.25)',
}

export type MagicalTheme = {
  colors: typeof arcaneColors;
  gradients: typeof magicalGradients; 
  glass: typeof glassEffects;
  animations: typeof spellAnimations;
  typography: typeof magicalTypography;
  spacing: typeof magicalSpacing;
  layers: typeof magicalLayers;
  shadows: typeof magicalShadows;
}

// 🎭 THEME VARIANTS
export const realmThemes = {
  shadow: {
    primary: arcaneColors.realms.shadow.primary,
    gradient: magicalGradients.backgrounds.shadowRealm,
    glass: glassEffects.primary,
  },
  crystal: {
    primary: arcaneColors.realms.crystal.primary, 
    gradient: magicalGradients.backgrounds.crystalCavern,
    glass: glassEffects.enchanted,
  },
  ethereal: {
    primary: arcaneColors.ethereal,
    gradient: magicalGradients.backgrounds.etherealPlanes,
    glass: glassEffects.mystical,
  }
}

export default {
  colors: arcaneColors,
  gradients: magicalGradients,
  glass: glassEffects,
  animations: spellAnimations,
  typography: magicalTypography,
  spacing: magicalSpacing,
  layers: magicalLayers,
  shadows: magicalShadows,
  themes: realmThemes,
}