/**
 * Theme Utilities for Arcanea MVP
 * Handles academy theme switching, color manipulation, and responsive utilities
 */

export type Academy = 'atlantean' | 'draconic' | 'creation' | 'default';

export interface AcademyTheme {
  name: Academy;
  displayName: string;
  primary: string;
  accent: string;
  gradient: string;
  glow: string;
  icon: string;
  description: string;
}

/**
 * Academy theme configurations
 */
export const ACADEMY_THEMES: Record<Academy, AcademyTheme> = {
  default: {
    name: 'default',
    displayName: 'Cosmic',
    primary: 'hsl(var(--gold-bright))',
    accent: 'hsl(var(--atlantean-teal))',
    gradient: 'cosmic-gradient',
    glow: 'glow-strong',
    icon: '✨',
    description: 'Universal Arcanean theme',
  },
  atlantean: {
    name: 'atlantean',
    displayName: 'Atlantean Academy',
    primary: 'hsl(var(--atlantean-teal))',
    accent: 'hsl(var(--atlantean-primary))',
    gradient: 'atlantean-gradient',
    glow: 'glow-atlantean',
    icon: '🌊',
    description: 'Story & Lore Creation - Flowing wisdom of the depths',
  },
  draconic: {
    name: 'draconic',
    displayName: 'Draconic Academy',
    primary: 'hsl(var(--draconic-gold))',
    accent: 'hsl(var(--draconic-crimson))',
    gradient: 'draconic-gradient',
    glow: 'glow-draconic',
    icon: '🐉',
    description: 'Visual Creation - Soaring vision and creative fire',
  },
  creation: {
    name: 'creation',
    displayName: 'Creation & Light',
    primary: 'hsl(var(--creation-gold))',
    accent: 'hsl(var(--creation-prism-blue))',
    gradient: 'creation-gradient',
    glow: 'glow-creation',
    icon: '✨',
    description: 'Music & Audio - Pure light and harmonic frequencies',
  },
};

/**
 * Get academy theme by name
 */
export function getAcademyTheme(academy: Academy): AcademyTheme {
  return ACADEMY_THEMES[academy] || ACADEMY_THEMES.default;
}

/**
 * Apply academy theme to element or document
 */
export function applyAcademyTheme(
  academy: Academy,
  element?: HTMLElement
): void {
  const target = element || document.documentElement;

  // Remove existing theme classes
  Object.keys(ACADEMY_THEMES).forEach((theme) => {
    target.classList.remove(`theme-${theme}`);
  });

  // Apply new theme
  if (academy !== 'default') {
    target.classList.add(`theme-${academy}`);
  }

  // Store in localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('arcanea-academy-theme', academy);
  }
}

/**
 * Get current academy theme from localStorage
 */
export function getCurrentAcademyTheme(): Academy {
  if (typeof window === 'undefined') return 'default';

  const stored = localStorage.getItem('arcanea-academy-theme');
  return (stored as Academy) || 'default';
}

/**
 * Color interpolation utility
 * Useful for creating smooth color transitions
 */
export function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  // Parse HSL values (expects format: hsl(h, s%, l%))
  const parseHSL = (hsl: string) => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return { h: 0, s: 0, l: 0 };
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3]),
    };
  };

  const c1 = parseHSL(color1);
  const c2 = parseHSL(color2);

  const h = Math.round(c1.h + (c2.h - c1.h) * factor);
  const s = Math.round(c1.s + (c2.s - c1.s) * factor);
  const l = Math.round(c1.l + (c2.l - c1.l) * factor);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Get responsive breakpoint
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Check if current viewport matches breakpoint
 */
export function isBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'lg';

  const width = window.innerWidth;
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

/**
 * Mobile detection utility
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
}

/**
 * Tablet detection utility
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
}

/**
 * Desktop detection utility
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.lg;
}

/**
 * Generate academy-specific class names
 */
export function getAcademyClasses(academy: Academy): {
  text: string;
  bg: string;
  border: string;
  glow: string;
} {
  const theme = getAcademyTheme(academy);

  const classMap: Record<Academy, ReturnType<typeof getAcademyClasses>> = {
    default: {
      text: 'text-gold-bright',
      bg: 'bg-cosmic-surface',
      border: 'border-gold-medium',
      glow: 'shadow-glow-md',
    },
    atlantean: {
      text: 'text-atlantean-teal',
      bg: 'bg-atlantean-deep/20',
      border: 'border-atlantean-teal',
      glow: 'shadow-atlantean',
    },
    draconic: {
      text: 'text-draconic-gold',
      bg: 'bg-draconic-crimson-deep/20',
      border: 'border-draconic-gold',
      glow: 'shadow-draconic',
    },
    creation: {
      text: 'text-creation-gold',
      bg: 'bg-creation-gold-deep/10',
      border: 'border-creation-gold',
      glow: 'shadow-creation',
    },
  };

  return classMap[academy] || classMap.default;
}

/**
 * Preference for reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Safe animation class that respects user preferences
 */
export function getAnimationClass(animationClass: string): string {
  return prefersReducedMotion() ? '' : animationClass;
}
