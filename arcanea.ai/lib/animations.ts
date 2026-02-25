import type { Variants, Transition } from 'framer-motion'

// ============================================
// ARCANEA FRAMER MOTION ANIMATION LIBRARY
// Premium animation variants for arcanea.ai
// ============================================

// === COSMIC ANIMATIONS ===
export const cosmicFadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cosmicFadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cosmicSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cosmicSlideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cosmicScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cosmicGlow: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

// === STAGGER CONTAINERS ===
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// === HERO ANIMATIONS ===
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const heroStats: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// === CARD ANIMATIONS ===
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 0 0 rgba(127, 255, 212, 0)',
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(127, 255, 212, 0.1)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const cardTap: Variants = {
  rest: { scale: 1 },
  tap: { scale: 0.98 },
}

// === NAVIGATION ===
export const navSlideDown: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const mobileMenuExpand: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: -20 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// === PAGE TRANSITIONS ===
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

// === SCROLL REVEAL ===
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// === FLOATING ORB / PARTICLE ===
export const floatingOrb: Variants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    transition: {
      y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    },
  },
}

// === SPRING TRANSITIONS ===
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
}

export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
}

// === UTILITY ===
export const fadeInViewport = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-100px' },
}

export const fadeInViewportEager = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-50px' },
}
