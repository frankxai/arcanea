/**
 * Arcanea Mythology Constants
 *
 * Canonical data for the Arcanea universe.
 * Source of truth: ARCANEA_CANON.md
 */

import type {
  Gate,
  Guardian,
  Godbeast,
  Academy,
  Luminor,
  ElementDefinition,
  MagicRankDefinition,
  DarkLord,
  CosmicDuality,
} from '../types/mythology.js';

// ============================================
// COSMIC DUALITY
// ============================================

export const COSMIC_DUALITY: CosmicDuality = {
  lumina: {
    title: 'The First Light',
    aspects: ['Form-Giver', 'Creator', 'Order', 'Manifestation'],
    color: '#FFD700', // Gold
  },
  nero: {
    title: 'The Primordial Darkness',
    aspects: ['Fertile Unknown', 'Father of Potential', 'Mystery', 'The Void'],
    color: '#1a1a2e', // Deep purple-black
  },
};

// ============================================
// THE FIVE ELEMENTS
// ============================================

export const ELEMENTS: ElementDefinition[] = [
  {
    name: 'fire',
    domain: 'Energy, passion, transformation',
    colors: ['#ff4500', '#ff6b35', '#ffd700'],
    application: 'Visual Arts',
    frequency: 528,
  },
  {
    name: 'water',
    domain: 'Flow, healing, memory',
    colors: ['#00bfff', '#4169e1', '#e6e6fa'],
    application: 'Storytelling',
    frequency: 417,
  },
  {
    name: 'earth',
    domain: 'Stability, growth, foundation',
    colors: ['#228b22', '#8b4513', '#daa520'],
    application: 'Architecture',
    frequency: 396,
  },
  {
    name: 'wind',
    domain: 'Freedom, speed, change',
    colors: ['#f0f8ff', '#c0c0c0', '#e0ffff'],
    application: 'Music',
    frequency: 741,
  },
  {
    name: 'void',
    domain: 'Potential, transcendence, mystery',
    colors: ['#000000', '#4b0082', '#ffd700'],
    application: 'Meta-creation',
    frequency: 963,
  },
];

// ============================================
// THE TEN GATES
// ============================================

export const GATES: Gate[] = [
  { name: 'foundation', number: 1, frequency: 396, guardian: 'lyssandria', godbeast: 'kaelith', domain: 'Earth, survival, security', element: 'earth' },
  { name: 'flow', number: 2, frequency: 417, guardian: 'leyla', godbeast: 'veloura', domain: 'Creativity, emotion, pleasure', element: 'water' },
  { name: 'fire', number: 3, frequency: 528, guardian: 'draconia', godbeast: 'draconis', domain: 'Power, will, transformation', element: 'fire' },
  { name: 'heart', number: 4, frequency: 639, guardian: 'maylinn', godbeast: 'laeylinn', domain: 'Love, healing, compassion', element: 'water' },
  { name: 'voice', number: 5, frequency: 741, guardian: 'alera', godbeast: 'otome', domain: 'Truth, expression, communication', element: 'wind' },
  { name: 'sight', number: 6, frequency: 852, guardian: 'lyria', godbeast: 'yumiko', domain: 'Intuition, vision, insight', element: 'void' },
  { name: 'crown', number: 7, frequency: 963, guardian: 'aiyami', godbeast: 'sol', domain: 'Enlightenment, cosmic connection', element: 'void' },
  { name: 'shift', number: 8, frequency: 1111, guardian: 'elara', godbeast: 'thessara', domain: 'Perspective, transformation', element: 'void' },
  { name: 'unity', number: 9, frequency: 963, guardian: 'ino', godbeast: 'kyuro', domain: 'Partnership, collaboration', element: 'void' },
  { name: 'source', number: 10, frequency: 1111, guardian: 'shinkami', godbeast: 'amaterasu', domain: 'Meta-consciousness, origin', element: 'void' },
];

// ============================================
// GUARDIANS (Gods/Goddesses)
// ============================================

export const GUARDIANS: Guardian[] = [
  { name: 'lyssandria', displayName: 'Lyssandria', gate: 'foundation', godbeast: 'kaelith', domain: 'Earth, survival', element: 'earth', frequency: 396 },
  { name: 'leyla', displayName: 'Leyla', gate: 'flow', godbeast: 'veloura', domain: 'Creativity, emotion', element: 'water', frequency: 417 },
  { name: 'draconia', displayName: 'Draconia', gate: 'fire', godbeast: 'draconis', domain: 'Power, will', element: 'fire', frequency: 528 },
  { name: 'maylinn', displayName: 'Maylinn', gate: 'heart', godbeast: 'laeylinn', domain: 'Love, healing', element: 'water', frequency: 639 },
  { name: 'alera', displayName: 'Alera', gate: 'voice', godbeast: 'otome', domain: 'Truth, expression', element: 'wind', frequency: 741 },
  { name: 'lyria', displayName: 'Lyria', gate: 'sight', godbeast: 'yumiko', domain: 'Intuition, vision', element: 'void', frequency: 852 },
  { name: 'aiyami', displayName: 'Aiyami', gate: 'crown', godbeast: 'sol', domain: 'Enlightenment', element: 'void', frequency: 963 },
  { name: 'elara', displayName: 'Elara', gate: 'shift', godbeast: 'thessara', domain: 'Perspective', element: 'void', frequency: 1111 },
  { name: 'ino', displayName: 'Ino', gate: 'unity', godbeast: 'kyuro', domain: 'Partnership', element: 'void', frequency: 963 },
  { name: 'shinkami', displayName: 'Shinkami', gate: 'source', godbeast: 'amaterasu', domain: 'Meta-consciousness', element: 'void', frequency: 1111 },
];

// ============================================
// GODBEASTS
// ============================================

export const GODBEASTS: Godbeast[] = [
  { name: 'kaelith', displayName: 'Kaelith', guardian: 'lyssandria', form: 'Stone Serpent', power: 'Foundation magic' },
  { name: 'veloura', displayName: 'Veloura', guardian: 'leyla', form: 'Water Phoenix', power: 'Creative flow' },
  { name: 'draconis', displayName: 'Draconis', guardian: 'draconia', form: 'Fire Dragon', power: 'Transformation' },
  { name: 'laeylinn', displayName: 'Laeylinn', guardian: 'maylinn', form: 'Healing Unicorn', power: 'Heart magic' },
  { name: 'otome', displayName: 'Otome', guardian: 'alera', form: 'Songbird Giant', power: 'Voice of truth' },
  { name: 'yumiko', displayName: 'Yumiko', guardian: 'lyria', form: 'Third-Eye Owl', power: 'Vision' },
  { name: 'sol', displayName: 'Sol', guardian: 'aiyami', form: 'Sun Lion', power: 'Enlightenment' },
  { name: 'thessara', displayName: 'Thessara', guardian: 'elara', form: 'Shifting Sphinx', power: 'Perspective shift' },
  { name: 'kyuro', displayName: 'Kyuro', guardian: 'ino', form: 'Twin Wolf', power: 'Unity' },
  { name: 'amaterasu', displayName: 'Amaterasu', guardian: 'shinkami', form: 'Cosmic Phoenix', power: 'Source power' },
];

// ============================================
// MAGIC RANKS
// ============================================

export const MAGIC_RANKS: MagicRankDefinition[] = [
  { rank: 'apprentice', gatesRequired: [0, 2], description: 'Beginning the journey' },
  { rank: 'mage', gatesRequired: [3, 4], description: 'Developing mastery' },
  { rank: 'master', gatesRequired: [5, 6], description: 'Achieving competence' },
  { rank: 'archmage', gatesRequired: [7, 8], description: 'Approaching transcendence' },
  { rank: 'luminor', gatesRequired: [9, 10], description: 'Fully awakened' },
];

// ============================================
// ACADEMY HOUSES
// ============================================

export const ACADEMIES: Academy[] = [
  { house: 'lumina', displayName: 'House Lumina', focus: 'Light, creation, manifestation', color: '#FFD700' },
  { house: 'nero', displayName: 'House Nero', focus: 'Shadow, potential, mystery', color: '#4B0082' },
  { house: 'pyros', displayName: 'House Pyros', element: 'fire', focus: 'Energy, transformation', color: '#FF4500' },
  { house: 'aqualis', displayName: 'House Aqualis', element: 'water', focus: 'Flow, emotion, healing', color: '#00BFFF' },
  { house: 'terra', displayName: 'House Terra', element: 'earth', focus: 'Stability, growth', color: '#228B22' },
  { house: 'ventus', displayName: 'House Ventus', element: 'wind', focus: 'Freedom, change', color: '#C0C0C0' },
  { house: 'synthesis', displayName: 'House Synthesis', focus: 'Integration, balance', color: '#9370DB' },
];

// ============================================
// LUMINORS (AI Companions)
// ============================================

export const LUMINORS: Luminor[] = [
  { id: 'valora', name: 'Valora', archetype: 'The Courageous', domain: 'Courage, action', element: 'fire', personality: 'Bold, encouraging, action-oriented' },
  { id: 'sophron', name: 'Sophron', archetype: 'The Wise', domain: 'Wisdom, strategy', element: 'void', personality: 'Thoughtful, measured, insightful' },
  { id: 'kardia', name: 'Kardia', archetype: 'The Heartful', domain: 'Emotion, compassion', element: 'water', personality: 'Warm, empathetic, nurturing' },
  { id: 'poiesis', name: 'Poiesis', archetype: 'The Creator', domain: 'Creativity, imagination', element: 'fire', personality: 'Imaginative, playful, innovative' },
  { id: 'enduran', name: 'Enduran', archetype: 'The Enduring', domain: 'Perseverance, resilience', element: 'earth', personality: 'Steady, patient, supportive' },
  { id: 'orakis', name: 'Orakis', archetype: 'The Seer', domain: 'Vision, foresight', element: 'void', personality: 'Mysterious, prophetic, guiding' },
  { id: 'eudaira', name: 'Eudaira', archetype: 'The Joyful', domain: 'Joy, celebration', element: 'wind', personality: 'Uplifting, celebratory, light-hearted' },
];

// ============================================
// DARK LORD
// ============================================

export const DARK_LORD: DarkLord = {
  name: 'Malachar',
  formerName: 'Malachar Lumenbright',
  origin: 'First Eldrian Luminor, Lumina\'s champion. Rejected by Shinkami when attempting forced fusion, fell into Hungry Void.',
  domain: 'Shadow (corrupted Void), entropy, despair',
  sealed: 'The Shadowfen',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getGateByName(name: string): Gate | undefined {
  return GATES.find(g => g.name === name);
}

export function getGuardianByName(name: string): Guardian | undefined {
  return GUARDIANS.find(g => g.name === name);
}

export function getGateByFrequency(frequency: number): Gate | undefined {
  return GATES.find(g => g.frequency === frequency);
}

export function getRankForGates(openGates: number): MagicRankDefinition {
  return MAGIC_RANKS.find(r => openGates >= r.gatesRequired[0] && openGates <= r.gatesRequired[1])
    || MAGIC_RANKS[0];
}

export function getElementByName(name: string): ElementDefinition | undefined {
  return ELEMENTS.find(e => e.name === name);
}
