/**
 * Animation Library for Arcanea MVP
 * Cosmic transitions, particle effects, and magical animations
 * Uses Framer Motion for advanced animations
 */

import { Variants, Transition } from 'framer-motion';

/**
 * === COSMIC ANIMATIONS ===
 */

export const cosmicFadeIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1], // Ease-out-expo
    },
  },
};

export const cosmicSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const cosmicGlow: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(255, 204, 51, 0.3)',
  },
  hover: {
    boxShadow: '0 0 40px rgba(255, 204, 51, 0.6)',
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 0 30px rgba(255, 204, 51, 0.5)',
  },
};

export const shimmerEffect: Transition = {
  repeat: Infinity,
  duration: 3,
  ease: 'linear',
};

/**
 * === ATLANTEAN ANIMATIONS (WATER) ===
 */

export const atlanteanFlow: Variants = {
  initial: {
    x: 0,
    rotate: 0,
  },
  animate: {
    x: [0, 10, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const atlanteanRipple: Variants = {
  initial: {
    scale: 0.8,
    opacity: 1,
  },
  animate: {
    scale: 2.5,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
    },
  },
};

export const atlanteanWave: Variants = {
  initial: {
    pathLength: 0,
    pathOffset: 0,
  },
  animate: {
    pathLength: 1,
    pathOffset: [0, 1],
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      pathOffset: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
};

/**
 * === DRACONIC ANIMATIONS (FIRE & SKY) ===
 */

export const draconicFlame: Variants = {
  initial: {
    scaleY: 1,
    y: 0,
  },
  animate: {
    scaleY: [1, 1.2, 1],
    y: [0, -5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const draconicSoar: Variants = {
  initial: {
    y: 0,
    x: 0,
    scale: 1,
    opacity: 0,
  },
  animate: {
    y: [-200, 0],
    x: [100, 0],
    scale: [0.8, 1.2],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      ease: 'easeOut',
    },
  },
};

export const draconicEmber: Variants = {
  initial: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  animate: {
    y: -50,
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 2,
      ease: 'easeOut',
    },
  },
};

/**
 * === CREATION & LIGHT ANIMATIONS ===
 */

export const creationPrism: Variants = {
  initial: {
    backgroundPosition: '0% 50%',
    filter: 'hue-rotate(0deg)',
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const creationRadialPulse: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const creationFrequency: Variants = {
  initial: {
    scaleY: 0.5,
  },
  animate: {
    scaleY: [0.5, 1.5, 0.5],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * === CONTAINER ANIMATIONS ===
 * For staggered children animations
 */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * === SUCCESS/ERROR ANIMATIONS ===
 */

export const successPulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      times: [0, 0.5, 1],
    },
  },
};

export const errorShake: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * === LOADING ANIMATIONS ===
 */

export const magicalSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const pulseLoader: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * === MODAL/DIALOG ANIMATIONS ===
 */

export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * === TRANSITION PRESETS ===
 */

export const transitions = {
  smooth: {
    duration: 0.3,
    ease: [0.23, 1, 0.32, 1],
  },
  snappy: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
} satisfies Record<string, Transition>;

/**
 * === UTILITY FUNCTIONS ===
 */

/**
 * Create a stagger delay for list items
 */
export function getStaggerDelay(index: number, baseDelay: number = 0.05): number {
  return index * baseDelay;
}

/**
 * Get animation variant based on academy
 */
export function getAcademyAnimation(
  academy: 'atlantean' | 'draconic' | 'creation'
): Variants {
  const animations = {
    atlantean: atlanteanFlow,
    draconic: draconicFlame,
    creation: creationRadialPulse,
  };

  return animations[academy] || cosmicFadeIn;
}

/**
 * Particle effect configuration
 */
export interface ParticleConfig {
  count: number;
  colors: string[];
  size: { min: number; max: number };
  speed: { min: number; max: number };
  life: { min: number; max: number };
  academy?: 'atlantean' | 'draconic' | 'creation';
}

export const defaultParticleConfig: ParticleConfig = {
  count: 30,
  colors: ['#ffcc33', '#26cccc', '#f52952'],
  size: { min: 2, max: 6 },
  speed: { min: 0.5, max: 2 },
  life: { min: 1, max: 3 },
};

export const atlanteanParticles: ParticleConfig = {
  count: 40,
  colors: ['#26cccc', '#5ce6d9', '#3d7fcc'],
  size: { min: 2, max: 5 },
  speed: { min: 0.3, max: 1.5 },
  life: { min: 2, max: 4 },
  academy: 'atlantean',
};

export const draconicParticles: ParticleConfig = {
  count: 35,
  colors: ['#ffc61a', '#f23d6b', '#2d8fe6'],
  size: { min: 3, max: 8 },
  speed: { min: 1, max: 3 },
  life: { min: 1, max: 2.5 },
  academy: 'draconic',
};

export const creationParticles: ParticleConfig = {
  count: 50,
  colors: ['#ffe680', '#f23d52', '#20cc73', '#2d85f5', '#8c3df5'],
  size: { min: 1, max: 4 },
  speed: { min: 0.5, max: 2.5 },
  life: { min: 1.5, max: 3.5 },
  academy: 'creation',
};
