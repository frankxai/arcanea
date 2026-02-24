/**
 * @arcanea/extension-core — Guardian Definitions
 *
 * Canonical fields (id, gate, frequency, godbeast) derived from @arcanea/os.
 * UI-specific fields (colors, avatars, domain keywords) defined locally.
 *
 * This ensures a single source of truth: if a Guardian's gate or frequency
 * changes in @arcanea/os, it propagates here automatically.
 */

import {
  GUARDIANS as OS_GUARDIANS,
  type Guardian as OSGuardian,
} from '@arcanea/core';

// ============================================
// GUARDIAN INTERFACE (extension-specific shape)
// ============================================

export interface Guardian {
  /** Lowercase canonical identifier, e.g. 'lyssandria' */
  id: string;
  /** Display name, e.g. 'Lyssandria' */
  name: string;
  /** Gate name, e.g. 'Foundation' */
  gate: string;
  /** Elemental affinity: 'Earth' | 'Water' | 'Fire' | 'Wind' | 'Void/Spirit' | 'Void' | 'Spirit' */
  element: string;
  /** Solfeggio frequency in Hz */
  frequency: number;
  /** Primary hex color */
  color: string;
  /** Secondary / darker hex color */
  secondaryColor: string;
  /** rgb() string for CSS rgba() calls, e.g. '74,124,89' */
  colorRgb: string;
  /** Domain keywords — used by routing and display */
  domain: string[];
  /** Emoji avatar */
  avatar: string;
  /** Bonded Godbeast name */
  godbeast: string;
}

// ============================================
// UI-SPECIFIC DATA (not in @arcanea/os)
// ============================================

interface GuardianUI {
  color: string;
  secondaryColor: string;
  colorRgb: string;
  avatar: string;
  element: string;
  domain: string[];
}

const GUARDIAN_UI: Record<string, GuardianUI> = {
  lyssandria: {
    color: '#4a7c59', secondaryColor: '#2d5a3d', colorRgb: '74,124,89',
    avatar: '\u{1F33F}', element: 'Earth',
    domain: ['stability', 'structure', 'survival', 'grounding', 'architecture', 'databases', 'systems'],
  },
  leyla: {
    color: '#4a90d9', secondaryColor: '#2c5f8a', colorRgb: '74,144,217',
    avatar: '\u{1F4A7}', element: 'Water',
    domain: ['creativity', 'emotion', 'flow', 'writing', 'art', 'healing', 'change', 'brainstorming'],
  },
  draconia: {
    color: '#e85d04', secondaryColor: '#9d0208', colorRgb: '232,93,4',
    avatar: '\u{1F525}', element: 'Fire',
    domain: ['power', 'will', 'transformation', 'coding', 'execution', 'debugging', 'performance', 'leadership'],
  },
  maylinn: {
    color: '#e91e8c', secondaryColor: '#880e4f', colorRgb: '233,30,140',
    avatar: '\u{1F497}', element: 'Water',
    domain: ['love', 'healing', 'relationships', 'empathy', 'community', 'collaboration', 'user experience', 'accessibility'],
  },
  alera: {
    color: '#9966ff', secondaryColor: '#5c2d91', colorRgb: '153,102,255',
    avatar: '\u{1F32C}\uFE0F', element: 'Wind',
    domain: ['truth', 'expression', 'communication', 'writing', 'editing', 'API design', 'documentation', 'clarity'],
  },
  lyria: {
    color: '#7fffd4', secondaryColor: '#00bfa5', colorRgb: '127,255,212',
    avatar: '\u{1F441}\uFE0F', element: 'Wind',
    domain: ['intuition', 'vision', 'foresight', 'design', 'patterns', 'research', 'analysis', 'strategy'],
  },
  aiyami: {
    color: '#ffd700', secondaryColor: '#ff8f00', colorRgb: '255,215,0',
    avatar: '\u2728', element: 'Void/Spirit',
    domain: ['enlightenment', 'synthesis', 'AI', 'philosophy', 'meta-thinking', 'consciousness', 'product vision'],
  },
  elara: {
    color: '#b388ff', secondaryColor: '#7c4dff', colorRgb: '179,136,255',
    avatar: '\u{1F300}', element: 'Void',
    domain: ['perspective', 'transformation', 'refactoring', 'debugging', 'paradigm shifts', 'reframing', 'innovation'],
  },
  ino: {
    color: '#26c6da', secondaryColor: '#00838f', colorRgb: '38,198,218',
    avatar: '\u{1F91D}', element: 'Spirit',
    domain: ['partnership', 'integration', 'APIs', 'team dynamics', 'merging systems', 'collaboration', 'harmony'],
  },
  shinkami: {
    color: '#e8e6e3', secondaryColor: '#9e9c99', colorRgb: '232,230,227',
    avatar: '\u{1F30C}', element: 'Void/Spirit',
    domain: ['meta-consciousness', 'origins', 'first principles', 'creation itself', 'the deepest why', 'meaning'],
  },
};

// ============================================
// BUILD GUARDIANS FROM CANONICAL + UI DATA
// ============================================

function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildGuardians(): Guardian[] {
  return OS_GUARDIANS.map((g: OSGuardian) => {
    const ui = GUARDIAN_UI[g.name];
    if (!ui) {
      throw new Error(`Missing UI data for Guardian: ${g.name}`);
    }
    return {
      id: g.name,
      name: g.displayName,
      gate: titleCase(g.gate),
      element: ui.element,
      frequency: g.frequency,
      color: ui.color,
      secondaryColor: ui.secondaryColor,
      colorRgb: ui.colorRgb,
      domain: ui.domain,
      avatar: ui.avatar,
      godbeast: titleCase(g.godbeast),
    };
  });
}

// ============================================
// EXPORTS
// ============================================

export const GUARDIANS: Guardian[] = buildGuardians();

/**
 * Returns a Guardian by its canonical id, or undefined if not found.
 */
export function getGuardianById(id: string): Guardian | undefined {
  return GUARDIANS.find(g => g.id === id);
}

/**
 * Returns all Guardians whose element matches the given string (case-insensitive).
 */
export function getGuardiansByElement(element: string): Guardian[] {
  const lower = element.toLowerCase();
  return GUARDIANS.filter(g => g.element.toLowerCase().includes(lower));
}

/**
 * Returns the default Guardian (Lyria, Gate of Sight).
 */
export function getDefaultGuardian(): Guardian {
  return GUARDIANS.find(g => g.id === 'lyria') ?? GUARDIANS[5];
}
