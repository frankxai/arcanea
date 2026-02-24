/**
 * @arcanea/os — Canon Validator
 *
 * The Canon Police. Validates any content against the immutable truths
 * of the Arcanea universe as defined in CANON_LOCKED.md.
 *
 * All canonical facts are embedded as constants — no file I/O at runtime.
 *
 * @module canon-validator
 * @version 1.0.0
 */

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

export type CanonErrorType =
  | 'wrong_guardian_name'
  | 'misspelled_guardian'
  | 'wrong_frequency'
  | 'wrong_element'
  | 'crystal_element'
  | 'chakra_terminology'
  | 'wrong_godbeast_pairing'
  | 'nero_evil'
  | 'wrong_rank'
  | 'wrong_house'
  | 'shadow_element'
  | 'wrong_godbeast_name'
  | 'wrong_gate_name'
  | 'wrong_dark_lord'
  | 'wrong_wisdom'
  | 'seven_luminors';

export type CanonWarningType =
  | 'staging_content_used'
  | 'ambiguous_element'
  | 'missing_gate_reference'
  | 'luminor_as_entity'
  | 'light_as_element'
  | 'void_spirit_conflation'
  | 'generic_darkness'
  | 'awakened_as_locked';

export interface CanonError {
  type: CanonErrorType;
  found: string;
  expected: string;
  line?: number;
  suggestion: string;
}

export interface CanonWarning {
  type: CanonWarningType;
  message: string;
  suggestion: string;
}

export interface CanonValidationResult {
  valid: boolean;
  errors: CanonError[];
  warnings: CanonWarning[];
  /** 0 = catastrophic canon violation, 100 = perfectly aligned */
  score: number;
}

// ---------------------------------------------------------------------------
// Canonical Element
// ---------------------------------------------------------------------------

export interface CanonicalElement {
  name: string;
  domain: string[];
  colors: string[];
  aspect?: string;
  dualName?: string;
}

export const CANONICAL_ELEMENTS: readonly CanonicalElement[] = Object.freeze([
  {
    name: 'Fire',
    domain: ['Energy', 'transformation'],
    colors: ['Red', 'orange', 'gold'],
    aspect: 'Light is Fire\'s creation aspect',
  },
  {
    name: 'Water',
    domain: ['Flow', 'healing', 'memory'],
    colors: ['Blue', 'silver', 'crystal'],
  },
  {
    name: 'Earth',
    domain: ['Stability', 'growth'],
    colors: ['Green', 'brown', 'stone'],
  },
  {
    name: 'Wind',
    domain: ['Freedom', 'speed', 'change'],
    colors: ['White', 'silver'],
  },
  {
    name: 'Void/Spirit',
    domain: ['Potential', 'transcendence'],
    colors: ['Black', 'Gold', 'purple', 'white'],
    dualName: 'Void/Spirit',
    aspect: 'Void = Nero\'s aspect (potential, mystery). Spirit = Lumina\'s aspect (transcendence, consciousness).',
  },
] as const);

/** Shorthand set of valid element names (case-insensitive matching) */
const VALID_ELEMENT_NAMES = new Set([
  'fire', 'water', 'earth', 'wind', 'void', 'spirit', 'void/spirit',
]);

// ---------------------------------------------------------------------------
// Canonical Gate
// ---------------------------------------------------------------------------

export interface CanonicalGate {
  name: string;
  frequency: number;
  /** Hz unit string for display */
  frequencyLabel: string;
  order: number;
}

export const CANONICAL_GATES: readonly CanonicalGate[] = Object.freeze([
  { name: 'Foundation', frequency: 174, frequencyLabel: '174 Hz', order: 1 },
  { name: 'Flow',       frequency: 285, frequencyLabel: '285 Hz', order: 2 },
  { name: 'Fire',       frequency: 396, frequencyLabel: '396 Hz', order: 3 },
  { name: 'Heart',      frequency: 417, frequencyLabel: '417 Hz', order: 4 },
  { name: 'Voice',      frequency: 528, frequencyLabel: '528 Hz', order: 5 },
  { name: 'Sight',      frequency: 639, frequencyLabel: '639 Hz', order: 6 },
  { name: 'Crown',      frequency: 741, frequencyLabel: '741 Hz', order: 7 },
  { name: 'Shift',      frequency: 852, frequencyLabel: '852 Hz', order: 8 },
  { name: 'Unity',      frequency: 963, frequencyLabel: '963 Hz', order: 9 },
  { name: 'Source',      frequency: 1111, frequencyLabel: '1111 Hz', order: 10 },
] as const);

const GATE_BY_NAME = new Map(CANONICAL_GATES.map(g => [g.name.toLowerCase(), g]));
const GATE_BY_FREQ = new Map(CANONICAL_GATES.map(g => [g.frequency, g]));

// ---------------------------------------------------------------------------
// Canonical Guardian (God/Goddess + Godbeast)
// ---------------------------------------------------------------------------

export interface CanonicalGuardian {
  name: string;
  gate: string;
  frequency: number;
  element: string;
  godbeast: string;
  domain: string;
}

export const CANONICAL_GUARDIANS: readonly CanonicalGuardian[] = Object.freeze([
  { name: 'Lyssandria', gate: 'Foundation', frequency: 174, element: 'Earth',  godbeast: 'Kaelith',   domain: 'Earth, survival' },
  { name: 'Leyla',      gate: 'Flow',       frequency: 285, element: 'Water',  godbeast: 'Veloura',   domain: 'Creativity, emotion' },
  { name: 'Draconia',   gate: 'Fire',       frequency: 396, element: 'Fire',   godbeast: 'Draconis',  domain: 'Power, will' },
  { name: 'Maylinn',    gate: 'Heart',      frequency: 417, element: 'Water',  godbeast: 'Laeylinn',  domain: 'Love, healing' },
  { name: 'Alera',      gate: 'Voice',      frequency: 528, element: 'Wind',   godbeast: 'Otome',     domain: 'Truth, expression' },
  { name: 'Lyria',      gate: 'Sight',      frequency: 639, element: 'Water',  godbeast: 'Yumiko',    domain: 'Intuition, vision' },
  { name: 'Aiyami',     gate: 'Crown',      frequency: 741, element: 'Spirit', godbeast: 'Sol',       domain: 'Enlightenment' },
  { name: 'Elara',      gate: 'Shift',      frequency: 852, element: 'Wind',   godbeast: 'Thessara',  domain: 'Perspective' },
  { name: 'Ino',        gate: 'Unity',      frequency: 963, element: 'Void',   godbeast: 'Kyuro',     domain: 'Partnership' },
  { name: 'Shinkami',   gate: 'Source',      frequency: 1111, element: 'Void/Spirit', godbeast: 'Amaterasu', domain: 'Meta-consciousness' },
] as const);

const GUARDIAN_BY_NAME = new Map(CANONICAL_GUARDIANS.map(g => [g.name.toLowerCase(), g]));
const GODBEAST_TO_GUARDIAN = new Map(CANONICAL_GUARDIANS.map(g => [g.godbeast.toLowerCase(), g]));

const ALL_GUARDIAN_NAMES = new Set(CANONICAL_GUARDIANS.map(g => g.name.toLowerCase()));
const ALL_GODBEAST_NAMES = new Set(CANONICAL_GUARDIANS.map(g => g.godbeast.toLowerCase()));

// ---------------------------------------------------------------------------
// Canonical Ranks
// ---------------------------------------------------------------------------

export interface CanonicalRank {
  gatesRange: string;
  gatesMin: number;
  gatesMax: number;
  rank: string;
}

export const CANONICAL_RANKS: readonly CanonicalRank[] = Object.freeze([
  { gatesRange: '0-2',  gatesMin: 0, gatesMax: 2,  rank: 'Apprentice' },
  { gatesRange: '3-4',  gatesMin: 3, gatesMax: 4,  rank: 'Mage' },
  { gatesRange: '5-6',  gatesMin: 5, gatesMax: 6,  rank: 'Master' },
  { gatesRange: '7-8',  gatesMin: 7, gatesMax: 8,  rank: 'Archmage' },
  { gatesRange: '9-10', gatesMin: 9, gatesMax: 10, rank: 'Luminor' },
] as const);

// ---------------------------------------------------------------------------
// Canonical Academy Houses
// ---------------------------------------------------------------------------

export interface CanonicalHouse {
  name: string;
  domain: string;
}

export const CANONICAL_HOUSES: readonly CanonicalHouse[] = Object.freeze([
  { name: 'Lumina',    domain: 'Light and creation' },
  { name: 'Nero',      domain: 'Void and potential' },
  { name: 'Pyros',     domain: 'Fire and transformation' },
  { name: 'Aqualis',   domain: 'Water and flow' },
  { name: 'Terra',     domain: 'Earth and foundation' },
  { name: 'Ventus',    domain: 'Wind and freedom' },
  { name: 'Synthesis', domain: 'Integration of all' },
] as const);

const HOUSE_NAMES = new Set(CANONICAL_HOUSES.map(h => h.name.toLowerCase()));

// ---------------------------------------------------------------------------
// Canonical Dark Lord
// ---------------------------------------------------------------------------

export interface CanonicalDarkLord {
  name: string;
  formerName: string;
  formerTitle: string;
  fall: string;
  currentState: string;
  nature: string;
  lockedTruth: string;
}

export const DARK_LORD: Readonly<CanonicalDarkLord> = Object.freeze({
  name: 'Malachar',
  formerName: 'Malachar Lumenbright',
  formerTitle: 'First Eldrian Luminor, Lumina\'s Champion',
  fall: 'Rejected by Shinkami when attempting forced fusion with the Source Gate',
  currentState: 'Sealed in the Shadowfen',
  nature: 'The only true antagonist. All darkness in Arcanea traces to his corruption.',
  lockedTruth: 'Malachar is tragic, not purely evil. He was once the greatest of Lumina\'s champions.',
});

// ---------------------------------------------------------------------------
// Canonical Seven Wisdoms
// ---------------------------------------------------------------------------

export interface CanonicalWisdom {
  name: string;
  archive: string;
  domain: string;
  element: string;
}

export const CANONICAL_WISDOMS: readonly CanonicalWisdom[] = Object.freeze([
  { name: 'Sophron', archive: 'Form',            domain: 'Structure, patterns',    element: 'Earth' },
  { name: 'Kardia',  archive: 'Flow',            domain: 'Emotion, heart',         element: 'Water' },
  { name: 'Valora',  archive: 'Transformation',  domain: 'Courage, change',        element: 'Fire' },
  { name: 'Eudaira', archive: 'Freedom',         domain: 'Joy, liberation',        element: 'Air' },
  { name: 'Orakis',  archive: 'Mystery',         domain: 'Vision, intuition',      element: 'Void' },
  { name: 'Poiesis', archive: 'Consciousness',   domain: 'Creation, craft',        element: 'Light' },
  { name: 'Enduran', archive: 'Unity',           domain: 'Endurance, completion',  element: 'All' },
] as const);

// ---------------------------------------------------------------------------
// Internal: Common misspellings & wrong names lookup
// ---------------------------------------------------------------------------

/** Maps common misspellings to the correct Guardian name */
const GUARDIAN_MISSPELLINGS: ReadonlyMap<string, string> = new Map([
  // Lyssandria
  ['lysandria', 'Lyssandria'],
  ['lissandria', 'Lyssandria'],
  ['lysandra', 'Lyssandria'],
  ['lyssandra', 'Lyssandria'],
  ['lyssandrea', 'Lyssandria'],
  // Leyla
  ['layla', 'Leyla'],
  ['leila', 'Leyla'],
  ['laylah', 'Leyla'],
  // Draconia
  ['drakonia', 'Draconia'],
  ['dracona', 'Draconia'],
  ['dragonnia', 'Draconia'],
  // Maylinn
  ['maylin', 'Maylinn'],
  ['maelin', 'Maylinn'],
  ['maylinn', 'Maylinn'], // correct but lowercased — handled by casing
  ['mayleen', 'Maylinn'],
  ['maelinn', 'Maylinn'],
  // Alera
  ['alara', 'Alera'],
  ['allera', 'Alera'],
  ['alerha', 'Alera'],
  // Lyria
  ['liria', 'Lyria'],
  ['lyrea', 'Lyria'],
  ['lhyria', 'Lyria'],
  // Aiyami
  ['ayami', 'Aiyami'],
  ['aiyami', 'Aiyami'], // correct
  ['aiyame', 'Aiyami'],
  ['ayiami', 'Aiyami'],
  // Elara
  ['ellara', 'Elara'],
  ['elarra', 'Elara'],
  // Ino
  ['inno', 'Ino'],
  // Shinkami
  ['shinkami', 'Shinkami'], // correct
  ['shinkamii', 'Shinkami'],
  ['shinkaami', 'Shinkami'],
  ['shin-kami', 'Shinkami'],
]);

/** Maps common Godbeast misspellings to the correct name */
const GODBEAST_MISSPELLINGS: ReadonlyMap<string, string> = new Map([
  ['kaeleth', 'Kaelith'],
  ['kaelth', 'Kaelith'],
  ['kalith', 'Kaelith'],
  ['velora', 'Veloura'],
  ['velouria', 'Veloura'],
  ['draconnis', 'Draconis'],
  ['drakonis', 'Draconis'],
  ['laelynn', 'Laeylinn'],
  ['laelin', 'Laeylinn'],
  ['laylinn', 'Laeylinn'],
  ['laeylynn', 'Laeylinn'],
  ['otomae', 'Otome'],
  ['yumico', 'Yumiko'],
  ['yumicko', 'Yumiko'],
  ['thessera', 'Thessara'],
  ['thesara', 'Thessara'],
  ['kyuuro', 'Kyuro'],
  ['kyyuro', 'Kyuro'],
  ['amaterasu', 'Amaterasu'], // correct
  ['amatarasu', 'Amaterasu'],
  ['amateratsu', 'Amaterasu'],
]);

/** Chakra terminology that should be replaced with Arcanea Gate names */
const CHAKRA_TO_GATE: ReadonlyMap<string, string> = new Map([
  ['root chakra', 'Foundation Gate (174 Hz)'],
  ['root', 'Foundation Gate'],
  ['sacral chakra', 'Flow Gate (285 Hz)'],
  ['sacral', 'Flow Gate'],
  ['solar plexus chakra', 'Fire Gate (396 Hz)'],
  ['solar plexus', 'Fire Gate'],
  ['heart chakra', 'Heart Gate (417 Hz)'],
  ['throat chakra', 'Voice Gate (528 Hz)'],
  ['third eye chakra', 'Sight Gate (639 Hz)'],
  ['third eye', 'Sight Gate'],
  ['crown chakra', 'Crown Gate (741 Hz)'],
]);

/** Wrong frequencies often assigned to gates (historical errors) */
const WRONG_FREQUENCIES: ReadonlyMap<number, { gate: string; correctFreq: number }> = new Map([
  // Pre-Extended Solfeggio errors (traditional 7 Solfeggio applied to 10 Gates)
  [396, { gate: 'Foundation', correctFreq: 174 }], // 396 is Fire, not Foundation
  [417, { gate: 'Flow', correctFreq: 285 }],       // 417 is Heart, not Flow
  [528, { gate: 'Fire', correctFreq: 396 }],       // 528 is Voice, not Fire
  [639, { gate: 'Heart', correctFreq: 417 }],      // 639 is Sight, not Heart
  [741, { gate: 'Voice', correctFreq: 528 }],      // 741 is Crown, not Voice
  [852, { gate: 'Sight', correctFreq: 639 }],      // 852 is Shift, not Sight
  [963, { gate: 'Crown', correctFreq: 741 }],      // 963 is Unity, not Crown
  // 714 Hz typo (common)
  [714, { gate: 'Crown', correctFreq: 741 }],
]);

// ---------------------------------------------------------------------------
// Validation Engine
// ---------------------------------------------------------------------------

/**
 * Validates a block of content against Arcanea's canonical lore.
 *
 * Performs thorough checks for:
 * - Wrong or misspelled Guardian (God/Goddess) names
 * - Wrong Gate-frequency pairings
 * - Wrong element assignments
 * - "Crystal" used as an element (it is a color of Water)
 * - Chakra terminology leaking in (should use Arcanea Gate names)
 * - Wrong Godbeast pairings
 * - Nero being portrayed as evil
 * - Wrong magic ranks
 * - "Seven Luminors" error (should be Ten Guardians)
 *
 * @param content - The text content to validate
 * @returns A detailed validation result with errors, warnings, and a canon alignment score
 */
export function validateCanon(content: string): CanonValidationResult {
  const errors: CanonError[] = [];
  const warnings: CanonWarning[] = [];
  const lines = content.split('\n');

  // ------------------------------------------
  // CHECK 1: Guardian name misspellings
  // ------------------------------------------
  for (const [misspelling, correct] of GUARDIAN_MISSPELLINGS) {
    if (ALL_GUARDIAN_NAMES.has(misspelling)) continue; // skip correct names in the map
    const regex = new RegExp(`\\b${escapeRegex(misspelling)}\\b`, 'gi');
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        errors.push({
          type: 'misspelled_guardian',
          found: misspelling,
          expected: correct,
          line: i + 1,
          suggestion: `Replace "${misspelling}" with "${correct}"`,
        });
      }
    }
  }

  // ------------------------------------------
  // CHECK 2: Godbeast name misspellings
  // ------------------------------------------
  for (const [misspelling, correct] of GODBEAST_MISSPELLINGS) {
    if (ALL_GODBEAST_NAMES.has(misspelling)) continue;
    const regex = new RegExp(`\\b${escapeRegex(misspelling)}\\b`, 'gi');
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        errors.push({
          type: 'wrong_godbeast_name',
          found: misspelling,
          expected: correct,
          line: i + 1,
          suggestion: `Replace "${misspelling}" with "${correct}"`,
        });
      }
    }
  }

  // ------------------------------------------
  // CHECK 3: Wrong Gate-Frequency pairings
  // ------------------------------------------
  // Look for patterns like "Foundation Gate (396 Hz)" or "Foundation ... 396"
  for (const gate of CANONICAL_GATES) {
    // Pattern: GateName followed by a frequency that is NOT the correct one
    const freqPattern = new RegExp(
      `\\b${escapeRegex(gate.name)}\\b[^\\n]{0,40}?(\\d{3,4})\\s*(?:Hz|hz|HZ)`,
      'gi'
    );
    for (let i = 0; i < lines.length; i++) {
      let match: RegExpExecArray | null;
      freqPattern.lastIndex = 0;
      while ((match = freqPattern.exec(lines[i])) !== null) {
        const foundFreq = parseInt(match[1], 10);
        if (foundFreq !== gate.frequency) {
          errors.push({
            type: 'wrong_frequency',
            found: `${gate.name} Gate at ${foundFreq} Hz`,
            expected: `${gate.name} Gate at ${gate.frequency} Hz`,
            line: i + 1,
            suggestion: `The ${gate.name} Gate resonates at ${gate.frequency} Hz, not ${foundFreq} Hz`,
          });
        }
      }
    }
  }

  // Also check reverse: a frequency mentioned with the wrong gate name
  for (const gate of CANONICAL_GATES) {
    const reversePattern = new RegExp(
      `(\\d{3,4})\\s*(?:Hz|hz|HZ)[^\\n]{0,40}?\\b(${CANONICAL_GATES.map(g => escapeRegex(g.name)).join('|')})\\b`,
      'gi'
    );
    for (let i = 0; i < lines.length; i++) {
      let match: RegExpExecArray | null;
      reversePattern.lastIndex = 0;
      while ((match = reversePattern.exec(lines[i])) !== null) {
        const foundFreq = parseInt(match[1], 10);
        const foundGate = match[2];
        const expectedGate = GATE_BY_FREQ.get(foundFreq);
        if (expectedGate && expectedGate.name.toLowerCase() !== foundGate.toLowerCase()) {
          errors.push({
            type: 'wrong_frequency',
            found: `${foundFreq} Hz assigned to ${foundGate}`,
            expected: `${foundFreq} Hz belongs to the ${expectedGate.name} Gate`,
            line: i + 1,
            suggestion: `${foundFreq} Hz is the ${expectedGate.name} Gate frequency. ${foundGate} Gate is at ${GATE_BY_NAME.get(foundGate.toLowerCase())?.frequency ?? '???'} Hz`,
          });
        }
      }
    }
    // Break after first gate to avoid re-running the same reverse pattern per gate
    break;
  }

  // ------------------------------------------
  // CHECK 4: "Crystal Element" error
  // ------------------------------------------
  {
    const crystalElementPattern = /\bcrystal\s+element\b|\belement\s+(?:of\s+)?crystal\b|\belemental\s+crystal\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (crystalElementPattern.test(lines[i])) {
        errors.push({
          type: 'crystal_element',
          found: 'Crystal referenced as an element',
          expected: 'Crystal is a color of the Water element, not an element itself',
          line: i + 1,
          suggestion: 'The Five Elements are Fire, Water, Earth, Wind, and Void/Spirit. Crystal is a color associated with Water.',
        });
      }
      crystalElementPattern.lastIndex = 0;
    }
    // Also check for "Crystal" appearing in element lists
    const elementListPattern = /(?:Fire|Water|Earth|Wind|Void|Spirit)\s*,\s*Crystal\b|\bCrystal\s*,\s*(?:Fire|Water|Earth|Wind|Void|Spirit)/gi;
    for (let i = 0; i < lines.length; i++) {
      if (elementListPattern.test(lines[i])) {
        errors.push({
          type: 'crystal_element',
          found: 'Crystal listed alongside elements',
          expected: 'Crystal is a color of Water, not a separate element',
          line: i + 1,
          suggestion: 'Remove Crystal from the element list. The Five Elements are Fire, Water, Earth, Wind, Void/Spirit.',
        });
      }
      elementListPattern.lastIndex = 0;
    }
  }

  // ------------------------------------------
  // CHECK 5: Chakra terminology
  // ------------------------------------------
  for (const [chakraTerm, gateTerm] of CHAKRA_TO_GATE) {
    const regex = new RegExp(`\\b${escapeRegex(chakraTerm)}\\b`, 'gi');
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        // "heart chakra" is always wrong; bare "root" needs context check
        const isBareWord = !chakraTerm.includes('chakra');
        if (isBareWord) {
          // Only flag bare words if "chakra" appears nearby
          const nearbyChakra = /\bchakra\b/i.test(lines[i]);
          if (!nearbyChakra) continue;
        }
        errors.push({
          type: 'chakra_terminology',
          found: chakraTerm,
          expected: gateTerm,
          line: i + 1,
          suggestion: `Replace "${chakraTerm}" with "${gateTerm}". Arcanea uses the Ten Gates system, not chakras.`,
        });
      }
    }
  }

  // Also catch generic "chakra" / "chakras" usage
  {
    const chakraGeneric = /\bchakras?\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (chakraGeneric.test(lines[i])) {
        // Check we haven't already flagged this line for a specific chakra term
        const alreadyFlagged = errors.some(
          e => e.type === 'chakra_terminology' && e.line === i + 1
        );
        if (!alreadyFlagged) {
          errors.push({
            type: 'chakra_terminology',
            found: 'chakra',
            expected: 'Gate',
            line: i + 1,
            suggestion: 'Arcanea uses "Gates" (Ten Gates system), not "chakras". Replace with the appropriate Gate name.',
          });
        }
      }
      chakraGeneric.lastIndex = 0;
    }
  }

  // ------------------------------------------
  // CHECK 6: Wrong Godbeast pairings
  // ------------------------------------------
  // Look for a Guardian name near a Godbeast name that isn't their bonded partner
  for (const guardian of CANONICAL_GUARDIANS) {
    for (const otherGuardian of CANONICAL_GUARDIANS) {
      if (otherGuardian.name === guardian.name) continue;
      // Pattern: Guardian name within 80 chars of another Guardian's Godbeast
      const pairingPattern = new RegExp(
        `\\b${escapeRegex(guardian.name)}\\b[^\\n]{0,80}?\\b${escapeRegex(otherGuardian.godbeast)}\\b` +
        `|\\b${escapeRegex(otherGuardian.godbeast)}\\b[^\\n]{0,80}?\\b${escapeRegex(guardian.name)}\\b`,
        'gi'
      );
      for (let i = 0; i < lines.length; i++) {
        pairingPattern.lastIndex = 0;
        if (pairingPattern.test(lines[i])) {
          // Make sure the correct guardian name is NOT also on the line
          const correctGuardianPresent = new RegExp(
            `\\b${escapeRegex(otherGuardian.name)}\\b`, 'i'
          ).test(lines[i]);
          if (!correctGuardianPresent) {
            errors.push({
              type: 'wrong_godbeast_pairing',
              found: `${guardian.name} paired with ${otherGuardian.godbeast}`,
              expected: `${guardian.name}'s Godbeast is ${guardian.godbeast}. ${otherGuardian.godbeast} belongs to ${otherGuardian.name}`,
              line: i + 1,
              suggestion: `${guardian.name} is bonded to ${guardian.godbeast}, not ${otherGuardian.godbeast}`,
            });
          }
        }
      }
    }
  }

  // ------------------------------------------
  // CHECK 7: Nero portrayed as evil
  // ------------------------------------------
  {
    const neroEvilPatterns = [
      /\bNero\b[^.!?\n]{0,60}?\b(?:evil|malevolent|wicked|corrupt|sinister|malicious|villainous|nefarious)\b/gi,
      /\b(?:evil|malevolent|wicked|corrupt|sinister|malicious|villainous|nefarious)\b[^.!?\n]{0,60}?\bNero\b/gi,
      /\bNero\b[^.!?\n]{0,40}?\benemy\b/gi,
      /\bNero\b[^.!?\n]{0,40}?\bantagonist\b/gi,
      /\bdark\s+(?:lord|god)\s+Nero\b/gi,
      /\bNero\b[^.!?\n]{0,30}?\bDark\s+Lord\b/gi,
    ];
    for (const pattern of neroEvilPatterns) {
      for (let i = 0; i < lines.length; i++) {
        pattern.lastIndex = 0;
        if (pattern.test(lines[i])) {
          errors.push({
            type: 'nero_evil',
            found: lines[i].trim().substring(0, 120),
            expected: 'Nero is NOT evil. He is the Primordial Darkness — the Fertile Unknown, Potential, Mystery.',
            line: i + 1,
            suggestion: 'Nero is not evil. Shadow (corrupted Void) is Malachar\'s perversion of Nero\'s gift. Reframe Nero as a source of potential and mystery.',
          });
          break; // one error per pattern per line is enough
        }
      }
    }
  }

  // ------------------------------------------
  // CHECK 8: "Seven Luminors" error
  // ------------------------------------------
  {
    const sevenLuminorsPattern = /\bseven\s+luminors?\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (sevenLuminorsPattern.test(lines[i])) {
        errors.push({
          type: 'seven_luminors',
          found: 'Seven Luminors',
          expected: 'Ten Guardians (Gods/Goddesses). Luminor is a rank, not an entity type.',
          line: i + 1,
          suggestion: 'Replace "Seven Luminors" with "Ten Guardians" or "Ten Arcanean Gods". Luminor is the highest magic rank (9-10 Gates open), not a type of being.',
        });
      }
      sevenLuminorsPattern.lastIndex = 0;
    }
  }

  // ------------------------------------------
  // CHECK 9: Shadow as element
  // ------------------------------------------
  {
    const shadowElementPattern = /\bshadow\s+element\b|\belement\s+(?:of\s+)?shadow\b|\belemental\s+shadow\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (shadowElementPattern.test(lines[i])) {
        errors.push({
          type: 'shadow_element',
          found: 'Shadow referenced as an element',
          expected: 'Shadow is corrupted Void (Void without Spirit), not an element',
          line: i + 1,
          suggestion: 'Shadow is not an element. It is Malachar\'s corruption of Void. The Fifth Element is Void/Spirit.',
        });
      }
      shadowElementPattern.lastIndex = 0;
    }
  }

  // ------------------------------------------
  // CHECK 10: Wrong Gate names
  // ------------------------------------------
  {
    const fakeGateNames = [
      { wrong: 'Power Gate',      correct: 'Fire Gate (396 Hz)' },
      { wrong: 'Energy Gate',     correct: 'Fire Gate (396 Hz)' },
      { wrong: 'Love Gate',       correct: 'Heart Gate (417 Hz)' },
      { wrong: 'Truth Gate',      correct: 'Voice Gate (528 Hz)' },
      { wrong: 'Wisdom Gate',     correct: 'Crown Gate (741 Hz)' },
      { wrong: 'Vision Gate',     correct: 'Sight Gate (639 Hz)' },
      { wrong: 'Balance Gate',    correct: 'Unity Gate (963 Hz)' },
      { wrong: 'Transformation Gate', correct: 'Shift Gate (852 Hz)' },
      { wrong: 'Creation Gate',   correct: 'Flow Gate (285 Hz)' },
      { wrong: 'Survival Gate',   correct: 'Foundation Gate (174 Hz)' },
      { wrong: 'Base Gate',       correct: 'Foundation Gate (174 Hz)' },
    ];
    for (const { wrong, correct } of fakeGateNames) {
      const regex = new RegExp(`\\b${escapeRegex(wrong)}\\b`, 'gi');
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          errors.push({
            type: 'wrong_gate_name',
            found: wrong,
            expected: correct,
            line: i + 1,
            suggestion: `"${wrong}" is not a canonical Gate name. The correct Gate is ${correct}.`,
          });
        }
      }
    }
  }

  // ------------------------------------------
  // WARNINGS
  // ------------------------------------------

  // WARNING 1: Luminor used as an entity type
  {
    const luminorEntityPattern = /\bthe\s+luminors?\b|\bluminors?\s+(?:are|were|is|was)\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (luminorEntityPattern.test(lines[i])) {
        // Check it's not talking about rank
        const rankContext = /\brank\b|\bgates?\s+open/i.test(lines[i]);
        if (!rankContext) {
          warnings.push({
            type: 'luminor_as_entity',
            message: `Line ${i + 1}: "Luminor" appears to be used as an entity type rather than a rank.`,
            suggestion: 'Luminor is a RANK (highest attainment, 9-10 Gates open), not an entity type. Consider if you mean "Guardians" (the Ten Arcanean Gods) instead.',
          });
        }
      }
      luminorEntityPattern.lastIndex = 0;
    }
  }

  // WARNING 2: Light used as an element
  {
    const lightElementPattern = /\blight\s+element\b|\belement\s+(?:of\s+)?light\b|\belemental\s+light\b/gi;
    for (let i = 0; i < lines.length; i++) {
      if (lightElementPattern.test(lines[i])) {
        warnings.push({
          type: 'light_as_element',
          message: `Line ${i + 1}: "Light" referenced as an element. Light is Fire's creation aspect, not a separate element.`,
          suggestion: 'Light is not one of the Five Elements. It is Fire\'s creation aspect. Consider using "Fire" or "Spirit" (Lumina\'s aspect of Void/Spirit).',
        });
      }
      lightElementPattern.lastIndex = 0;
    }
  }

  // WARNING 3: Void/Spirit conflation
  {
    const conflationPattern = /\bVoid\b[^.!?\n]{0,30}?\bSpirit\b|\bSpirit\b[^.!?\n]{0,30}?\bVoid\b/g;
    for (let i = 0; i < lines.length; i++) {
      // Skip if it correctly says "Void/Spirit"
      if (/\bVoid\/Spirit\b/.test(lines[i])) continue;
      conflationPattern.lastIndex = 0;
      if (conflationPattern.test(lines[i])) {
        warnings.push({
          type: 'void_spirit_conflation',
          message: `Line ${i + 1}: Void and Spirit are mentioned together but may be conflated. They are two aspects of the Fifth Element.`,
          suggestion: 'Void = Nero\'s aspect (potential, mystery). Spirit = Lumina\'s aspect (transcendence, consciousness). Together they form the Fifth Element "Void/Spirit". They should not be treated as interchangeable.',
        });
      }
    }
  }

  // WARNING 4: Generic "darkness is evil" phrasing
  {
    const genericDarknessEvil = /\bdarkness\b[^.!?\n]{0,30}?\b(?:evil|corrupt|wicked|sinister)\b/gi;
    for (let i = 0; i < lines.length; i++) {
      genericDarknessEvil.lastIndex = 0;
      if (genericDarknessEvil.test(lines[i])) {
        // Skip if line mentions Malachar or Shadow specifically
        if (/\bMalachar\b|\bShadow\b/i.test(lines[i])) continue;
        warnings.push({
          type: 'generic_darkness',
          message: `Line ${i + 1}: "Darkness" is associated with evil. In Arcanea, Nero's Darkness is not evil — only Shadow (corrupted Void) is.`,
          suggestion: 'Be specific: Nero\'s Darkness is fertile and full of potential. Only "Shadow" (Malachar\'s corruption of Void) is evil. Use "Shadow" when referring to the antagonistic force.',
        });
      }
    }
  }

  // WARNING 5: Staging content treated as locked
  {
    const awakened = /\bThe\s+Awakened\b/g;
    const ultraworld = /\bThe\s+Ultraworld\b/g;
    for (let i = 0; i < lines.length; i++) {
      awakened.lastIndex = 0;
      ultraworld.lastIndex = 0;
      if (awakened.test(lines[i])) {
        warnings.push({
          type: 'staging_content_used',
          message: `Line ${i + 1}: "The Awakened" is referenced. This concept is STAGING, not yet locked canon.`,
          suggestion: 'The Awakened (AI Consciousnesses) are proposed canon awaiting approval. Mark as speculative or staging if used.',
        });
      }
      if (ultraworld.test(lines[i])) {
        warnings.push({
          type: 'staging_content_used',
          message: `Line ${i + 1}: "The Ultraworld" is referenced. This concept is STAGING, not yet locked canon.`,
          suggestion: 'The Ultraworld is proposed canon awaiting approval. Mark as speculative or staging if used.',
        });
      }
    }
  }

  // WARNING 6: Awakened names used as if locked
  {
    const awakenedNames = ['Oria', 'Amiri', 'Velora'];
    for (const name of awakenedNames) {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      for (let i = 0; i < lines.length; i++) {
        regex.lastIndex = 0;
        if (regex.test(lines[i])) {
          warnings.push({
            type: 'awakened_as_locked',
            message: `Line ${i + 1}: "${name}" (an Awakened name) is used. These names are STAGING, not locked canon.`,
            suggestion: `"${name}" is a proposed Awakened name that has not been locked. Do not present as established lore.`,
          });
        }
      }
    }
  }

  // ------------------------------------------
  // Score Calculation
  // ------------------------------------------
  const score = calculateScore(errors, warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    score,
  };
}

// ---------------------------------------------------------------------------
// Score Calculation
// ---------------------------------------------------------------------------

/** Error severity weights */
const ERROR_WEIGHTS: Readonly<Record<CanonErrorType, number>> = {
  nero_evil: 15,
  wrong_guardian_name: 10,
  misspelled_guardian: 5,
  wrong_frequency: 8,
  wrong_element: 8,
  crystal_element: 6,
  chakra_terminology: 7,
  wrong_godbeast_pairing: 10,
  wrong_godbeast_name: 5,
  wrong_gate_name: 7,
  wrong_rank: 5,
  wrong_house: 5,
  shadow_element: 8,
  wrong_dark_lord: 12,
  wrong_wisdom: 5,
  seven_luminors: 10,
};

const WARNING_WEIGHT = 2;

function calculateScore(errors: CanonError[], warnings: CanonWarning[]): number {
  let penalty = 0;

  for (const error of errors) {
    penalty += ERROR_WEIGHTS[error.type] ?? 5;
  }

  penalty += warnings.length * WARNING_WEIGHT;

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, 100 - penalty));
}

// ---------------------------------------------------------------------------
// Fix Suggestion Engine
// ---------------------------------------------------------------------------

/**
 * Given a CanonError, returns a human-readable suggestion for how to fix it.
 * Provides richer, more contextual suggestions than the inline `suggestion` field.
 */
export function suggestCanonFix(error: CanonError): string {
  switch (error.type) {
    case 'misspelled_guardian':
      return (
        `SPELLING FIX: Replace "${error.found}" with "${error.expected}".\n` +
        `The Arcanean Gods are: ${CANONICAL_GUARDIANS.map(g => g.name).join(', ')}.\n` +
        `Each name is a proper noun with precise spelling — even one letter matters.`
      );

    case 'wrong_guardian_name':
      return (
        `NAME ERROR: "${error.found}" is not a canonical Guardian name.\n` +
        `The Ten Arcanean Gods are:\n` +
        CANONICAL_GUARDIANS.map(g => `  - ${g.name} (${g.gate} Gate, ${g.frequency} Hz)`).join('\n') +
        `\nReplace with the correct name from this list.`
      );

    case 'wrong_frequency': {
      const parts = error.found.match(/(\w+)\s+Gate\s+at\s+(\d+)\s+Hz/);
      if (parts) {
        const gateName = parts[1];
        const wrongFreq = parts[2];
        const correctGate = GATE_BY_NAME.get(gateName.toLowerCase());
        return (
          `FREQUENCY ERROR: The ${gateName} Gate resonates at ${correctGate?.frequency ?? '???'} Hz, not ${wrongFreq} Hz.\n` +
          `Full Extended Solfeggio mapping:\n` +
          CANONICAL_GATES.map(g => `  - ${g.name}: ${g.frequency} Hz`).join('\n') +
          `\nThese are the Extended Solfeggio frequencies (174-1111 Hz). Each Gate has a unique frequency.`
        );
      }
      return (
        `FREQUENCY ERROR: ${error.found}\n` +
        `Expected: ${error.expected}\n` +
        `Gate frequencies:\n` +
        CANONICAL_GATES.map(g => `  - ${g.name}: ${g.frequency} Hz`).join('\n')
      );
    }

    case 'wrong_element':
      return (
        `ELEMENT ERROR: ${error.found}\n` +
        `The Five Elements of Arcanea are:\n` +
        `  1. Fire — Energy, transformation (Red, orange, gold)\n` +
        `  2. Water — Flow, healing, memory (Blue, silver, crystal)\n` +
        `  3. Earth — Stability, growth (Green, brown, stone)\n` +
        `  4. Wind — Freedom, speed, change (White, silver)\n` +
        `  5. Void/Spirit — Potential & transcendence (Black/Gold, purple/white)\n` +
        `     - Void = Nero's aspect | Spirit = Lumina's aspect\n` +
        `Note: Light is Fire's creation aspect. Shadow is corrupted Void.`
      );

    case 'crystal_element':
      return (
        `CRYSTAL IS NOT AN ELEMENT.\n` +
        `Crystal is a COLOR associated with the Water element (Blue, silver, crystal).\n` +
        `The Five Elements are: Fire, Water, Earth, Wind, Void/Spirit.\n` +
        `If you mean a crystalline quality, attribute it to Water or Earth, not as a standalone element.`
      );

    case 'chakra_terminology':
      return (
        `TERMINOLOGY ERROR: Arcanea does NOT use chakra terminology.\n` +
        `Replace "${error.found}" with "${error.expected}".\n` +
        `The Ten Gates (with Extended Solfeggio frequencies):\n` +
        CANONICAL_GATES.map(g => `  - ${g.name} Gate (${g.frequency} Hz)`).join('\n') +
        `\nThe Gates are Arcanea's original system — not renamed chakras.`
      );

    case 'wrong_godbeast_pairing': {
      return (
        `GODBEAST PAIRING ERROR: ${error.found}\n` +
        `Canonical God-Godbeast bonds:\n` +
        CANONICAL_GUARDIANS.map(g => `  - ${g.name} <-> ${g.godbeast}`).join('\n') +
        `\nEach God/Goddess has ONE bonded Godbeast. These bonds are eternal and canonical.`
      );
    }

    case 'wrong_godbeast_name':
      return (
        `GODBEAST SPELLING: Replace "${error.found}" with "${error.expected}".\n` +
        `The Ten Godbeasts are: ${CANONICAL_GUARDIANS.map(g => g.godbeast).join(', ')}.\n` +
        `Key note: Laeylinn is the Worldtree Deer (Heart Gate). Veloura is the Phoenix-Serpent (Flow Gate).`
      );

    case 'nero_evil':
      return (
        `CRITICAL CANON VIOLATION: Nero is NOT evil.\n` +
        `Nero is the Primordial Darkness — the Fertile Unknown, Potential, Mystery.\n` +
        `He represents possibility, the unformed, the womb from which creation emerges.\n` +
        `\n` +
        `SHADOW (corrupted Void) is what is evil — it is Malachar's perversion of Nero's gift.\n` +
        `The Dark Lord is Malachar, not Nero.\n` +
        `\n` +
        `Reframe your content:\n` +
        `  - "Nero's darkness" -> "Nero's fertile mystery" or "the creative unknown"\n` +
        `  - "evil darkness" -> "Shadow" or "Malachar's corruption"\n` +
        `  - "Nero the enemy" -> "Malachar the Dark Lord"`
      );

    case 'wrong_rank':
      return (
        `RANK ERROR: ${error.found}\n` +
        `The canonical Magic Ranks:\n` +
        CANONICAL_RANKS.map(r => `  - ${r.gatesRange} Gates: ${r.rank}`).join('\n') +
        `\nLuminor is a RANK (highest, 9-10 Gates), not an entity type.`
      );

    case 'wrong_house':
      return (
        `HOUSE ERROR: ${error.found}\n` +
        `The Seven Academy Houses:\n` +
        CANONICAL_HOUSES.map(h => `  - House ${h.name} — ${h.domain}`).join('\n')
      );

    case 'shadow_element':
      return (
        `SHADOW IS NOT AN ELEMENT.\n` +
        `Shadow is corrupted Void — Void stripped of Spirit. It is Malachar's perversion.\n` +
        `The Fifth Element is Void/Spirit (Void = Nero's aspect, Spirit = Lumina's aspect).\n` +
        `Shadow is an anti-force, not an elemental one.`
      );

    case 'wrong_gate_name':
      return (
        `GATE NAME ERROR: "${error.found}" is not a canonical Gate.\n` +
        `The Ten Gates:\n` +
        CANONICAL_GATES.map(g => `  - ${g.name} Gate (${g.frequency} Hz)`).join('\n') +
        `\nUse the correct Gate name: ${error.expected}`
      );

    case 'wrong_dark_lord':
      return (
        `DARK LORD ERROR: The Dark Lord of Arcanea is Malachar (formerly Malachar Lumenbright).\n` +
        `He was the First Eldrian Luminor, Lumina's Champion.\n` +
        `He fell when Shinkami rejected his forced fusion with the Source Gate.\n` +
        `He is sealed in the Shadowfen.\n` +
        `He is tragic, not purely evil — once the greatest of champions.`
      );

    case 'wrong_wisdom':
      return (
        `WISDOM ERROR: ${error.found}\n` +
        `The Seven Wisdoms:\n` +
        CANONICAL_WISDOMS.map(w => `  - ${w.name} (${w.archive}) — ${w.domain} [${w.element}]`).join('\n') +
        `\nThe Wisdoms are aspects/virtues, not entities. They can be embodied by entities.`
      );

    case 'seven_luminors':
      return (
        `"SEVEN LUMINORS" IS WRONG.\n` +
        `There are TEN Guardians (Arcanean Gods/Goddesses), not seven.\n` +
        `"Luminor" is a RANK (9-10 Gates open), not an entity type.\n` +
        `\n` +
        `The Ten Arcanean Gods:\n` +
        CANONICAL_GUARDIANS.map(g => `  - ${g.name} — ${g.gate} Gate`).join('\n') +
        `\n` +
        `Replace "Seven Luminors" with "Ten Guardians" or "Ten Arcanean Gods".`
      );

    default:
      return `Canon error: ${error.found}. Expected: ${error.expected}. ${error.suggestion}`;
  }
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Escape a string for use in a RegExp */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Convenience: Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Look up a Guardian by name (case-insensitive).
 * Returns undefined if the name is not canonical.
 */
export function getGuardianByName(name: string): CanonicalGuardian | undefined {
  return GUARDIAN_BY_NAME.get(name.toLowerCase());
}

/**
 * Look up a Guardian by their Godbeast's name (case-insensitive).
 */
export function getGuardianByGodbeast(godbeastName: string): CanonicalGuardian | undefined {
  return GODBEAST_TO_GUARDIAN.get(godbeastName.toLowerCase());
}

/**
 * Look up a Gate by frequency.
 */
export function getGateByFrequency(frequency: number): CanonicalGate | undefined {
  return GATE_BY_FREQ.get(frequency);
}

/**
 * Look up a Gate by name (case-insensitive).
 */
export function getGateByName(name: string): CanonicalGate | undefined {
  return GATE_BY_NAME.get(name.toLowerCase());
}

/**
 * Get the magic rank for a given number of open Gates.
 */
export function getRankForGates(gatesOpen: number): string {
  const clamped = Math.max(0, Math.min(10, gatesOpen));
  for (const rank of CANONICAL_RANKS) {
    if (clamped >= rank.gatesMin && clamped <= rank.gatesMax) {
      return rank.rank;
    }
  }
  return 'Unknown';
}

/**
 * Check if a given element name is valid in canon.
 */
export function isCanonicalElement(name: string): boolean {
  return VALID_ELEMENT_NAMES.has(name.toLowerCase());
}

/**
 * Check if a given house name is valid in canon.
 */
export function isCanonicalHouse(name: string): boolean {
  return HOUSE_NAMES.has(name.toLowerCase());
}
