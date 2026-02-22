/**
 * External type re-exports for @arcanea/council.
 *
 * These types originate from @arcanea/guardian-memory but are
 * inlined here to avoid workspace resolution issues before
 * pnpm install. When the monorepo is properly linked, these
 * can be replaced with: export type { GuardianName, Element } from '@arcanea/guardian-memory';
 */

export type GuardianName =
  | 'shinkami'
  | 'lyssandria'
  | 'draconia'
  | 'lyria'
  | 'alera'
  | 'maylinn'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'leyla';

export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'spirit';

export interface GuardianProfile {
  name: GuardianName;
  gate: string;
  frequency: number;
  element: Element;
  vault: string;
  godbeast: string;
}

export const GUARDIANS: Record<GuardianName, GuardianProfile> = {
  lyssandria: { name: 'lyssandria', gate: 'Foundation', frequency: 174, element: 'earth', vault: 'technical', godbeast: 'Kaelith' },
  leyla:      { name: 'leyla',      gate: 'Flow',       frequency: 285, element: 'water', vault: 'creative', godbeast: 'Veloura' },
  draconia:   { name: 'draconia',   gate: 'Fire',       frequency: 396, element: 'fire',  vault: 'technical', godbeast: 'Draconis' },
  maylinn:    { name: 'maylinn',    gate: 'Heart',      frequency: 417, element: 'wind',  vault: 'creative', godbeast: 'Laeylinn' },
  alera:      { name: 'alera',      gate: 'Voice',      frequency: 528, element: 'wind',  vault: 'operational', godbeast: 'Otome' },
  lyria:      { name: 'lyria',      gate: 'Sight',      frequency: 639, element: 'water', vault: 'horizon', godbeast: 'Yumiko' },
  aiyami:     { name: 'aiyami',     gate: 'Crown',      frequency: 741, element: 'spirit', vault: 'wisdom', godbeast: 'Sol' },
  elara:      { name: 'elara',      gate: 'Shift',      frequency: 852, element: 'void',  vault: 'wisdom', godbeast: 'Thessara' },
  ino:        { name: 'ino',        gate: 'Unity',      frequency: 963, element: 'earth', vault: 'operational', godbeast: 'Kyuro' },
  shinkami:    { name: 'shinkami',    gate: 'Source',      frequency: 1111, element: 'void', vault: 'strategic', godbeast: 'Amaterasu' },
};
