/**
 * Arcanean Library Exports
 * Central export file for utilities and animations
 */

// Utilities
export { cn, formatDate, truncate, debounce, generateId } from './utils';

// Theme Utilities
export {
  getAcademyTheme,
  applyAcademyTheme,
  getCurrentAcademyTheme,
  interpolateColor,
  isBreakpoint,
  getCurrentBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getAcademyClasses,
  prefersReducedMotion,
  getAnimationClass,
  ACADEMY_THEMES,
  BREAKPOINTS,
} from './theme-utils';
export type { Academy, AcademyTheme, Breakpoint } from './theme-utils';

// Animations
export {
  // Cosmic
  cosmicFadeIn,
  cosmicSlideUp,
  cosmicGlow,
  shimmerEffect,
  // Atlantean
  atlanteanFlow,
  atlanteanRipple,
  atlanteanWave,
  // Draconic
  draconicFlame,
  draconicSoar,
  draconicEmber,
  // Creation
  creationPrism,
  creationRadialPulse,
  creationFrequency,
  // Containers
  staggerContainer,
  staggerItem,
  // Success/Error
  successPulse,
  errorShake,
  // Loading
  magicalSpinner,
  pulseLoader,
  // Modal
  modalBackdrop,
  modalContent,
  // Transitions
  transitions,
  // Utilities
  getStaggerDelay,
  getAcademyAnimation,
  // Particles
  defaultParticleConfig,
  atlanteanParticles,
  draconicParticles,
  creationParticles,
} from './animations';
export type { ParticleConfig } from './animations';
