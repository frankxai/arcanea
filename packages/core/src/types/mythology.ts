/**
 * Arcanea Mythology Types
 *
 * The canonical type definitions for the Arcanea universe.
 * Based on ARCANEA_CANON.md - the master source of truth.
 */

// ============================================
// COSMIC DUALITY
// ============================================

export type CosmicEntity = 'lumina' | 'nero';

export interface CosmicDuality {
  lumina: {
    title: string;
    aspects: string[];
    color: string;
  };
  nero: {
    title: string;
    aspects: string[];
    color: string;
  };
}

// ============================================
// THE FIVE ELEMENTS
// ============================================

export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void';
export type ElementWithSpirit = Element | 'spirit';
export type ElementOrAll = Element | 'all';

export interface ElementDefinition {
  name: Element;
  domain: string;
  colors: string[];
  application?: string;
  frequency?: number;
}

// ============================================
// THE TEN GATES
// ============================================

export type GateName =
  | 'foundation'
  | 'flow'
  | 'fire'
  | 'heart'
  | 'voice'
  | 'sight'
  | 'crown'
  | 'shift'
  | 'unity'
  | 'source';

export type GateFrequency = 174 | 285 | 396 | 417 | 528 | 639 | 741 | 852 | 963 | 1111;

export interface Gate {
  name: GateName;
  number: number;
  frequency: GateFrequency;
  guardian: GuardianName;
  godbeast: GodbeastName;
  domain: string;
  element?: Element;
  color?: string;
}

// ============================================
// GUARDIANS (Gods/Goddesses)
// ============================================

export type GuardianName =
  | 'lyssandria'
  | 'leyla'
  | 'draconia'
  | 'maylinn'
  | 'alera'
  | 'lyria'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'shinkami';

export interface Guardian {
  name: GuardianName;
  displayName: string;
  gate: GateName;
  godbeast: GodbeastName;
  domain: string;
  element?: Element;
  frequency: GateFrequency;
  description?: string;
  archetype?: string;
  // Rich profile fields
  role?: string;
  vibe?: string;
  codingStyle?: string[];
  helpPatterns?: string[];
  metaphorDomain?: string[];
  signOff?: string;
}

// ============================================
// GODBEASTS
// ============================================

export type GodbeastName =
  | 'kaelith'
  | 'veloura'
  | 'draconis'
  | 'laeylinn'
  | 'otome'
  | 'yumiko'
  | 'sol'
  | 'thessara'
  | 'kyuro'
  | 'amaterasu';

export interface Godbeast {
  name: GodbeastName;
  displayName: string;
  guardian: GuardianName;
  form: string;
  power: string;
}

// ============================================
// MAGIC RANKS
// ============================================

export type MagicRank =
  | 'apprentice'
  | 'mage'
  | 'master'
  | 'archmage'
  | 'luminor';

export interface MagicRankDefinition {
  rank: MagicRank;
  gatesRequired: [number, number]; // [min, max]
  description: string;
}

// ============================================
// ACADEMY HOUSES
// ============================================

export type AcademyHouse =
  | 'lumina'
  | 'nero'
  | 'pyros'
  | 'aqualis'
  | 'terra'
  | 'ventus'
  | 'synthesis';

export interface Academy {
  house: AcademyHouse;
  displayName: string;
  element?: Element;
  focus: string;
  color: string;
}

// ============================================
// LUMINORS (AI Companions)
// ============================================

export type LuminorId =
  | 'valora'
  | 'sophron'
  | 'kardia'
  | 'poiesis'
  | 'enduran'
  | 'orakis'
  | 'eudaira';

export interface Luminor {
  id: LuminorId;
  name: string;
  archetype: string;
  domain: string;
  element?: Element;
  personality: string;
  systemPrompt?: string;
}

// ============================================
// ANTAGONISTS
// ============================================

export interface DarkLord {
  name: string;
  formerName: string;
  origin: string;
  domain: string;
  sealed: string;
}

// ============================================
// WORLD STRUCTURE
// ============================================

export interface ArcaneaWorld {
  cosmicDuality: CosmicDuality;
  elements: ElementDefinition[];
  gates: Gate[];
  guardians: Guardian[];
  godbeasts: Godbeast[];
  academies: Academy[];
  luminors: Luminor[];
  darkLord: DarkLord;
}
