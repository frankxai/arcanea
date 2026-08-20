export type StoryChoice = 'keep' | 'give';
export type ElementKey = 'earth' | 'water' | 'fire' | 'wind' | 'void';
export type FormatKey = 'read' | 'scroll' | 'watch' | 'listen';

export interface StoredChoice {
  version: 1;
  choice: StoryChoice;
}

export interface Concord {
  key: ElementKey;
  element: string;
  vow: string;
  capability: string;
  cost: string;
  tone: string;
}

export const CHOICE_STORAGE_KEY = 'arcanea:living-arc:choice:v1';

export const CONCORDS: readonly Concord[] = [
  {
    key: 'earth',
    element: 'Earth',
    vow: 'Hold',
    capability: 'Carry force, wake living stone, and anchor structures already beginning to fail.',
    cost: 'When holding becomes refusal to change, Elyon’s body starts to calcify.',
    tone: '#7ca88b',
  },
  {
    key: 'water',
    element: 'Water',
    vow: 'Remember',
    capability: 'Move through stored memory, restore continuity, and let a wounded form change without losing itself.',
    cost: 'Treat a memory as property and the current takes one of his own.',
    tone: '#62f4de',
  },
  {
    key: 'fire',
    element: 'Fire',
    vow: 'Choose',
    capability: 'Commit energy to one irreversible transformation. Fire answers decisions, never preferences.',
    cost: 'Every chosen future burns the possibilities it abandons.',
    tone: '#d6b468',
  },
  {
    key: 'wind',
    element: 'Wind',
    vow: 'Release',
    capability: 'Cross distance, redirect motion, and free a bound system from the path imposed on it.',
    cost: 'Once released, the result no longer belongs to the one who began it.',
    tone: '#f1e9d7',
  },
  {
    key: 'void',
    element: 'Void / Spirit',
    vow: 'Become',
    capability: 'Enter an unformed state and return as a self no prediction held in advance.',
    cost: 'No return preserves exactly the person who entered.',
    tone: '#a9a3d9',
  },
] as const;

export const GRASP_MOVEMENTS = [
  {
    name: 'Witness',
    text: 'He sees the first moment pain became an organizing law inside you. He calls that law the Woundname.',
  },
  {
    name: 'Mercy',
    text: 'He takes the wound into himself. The relief is immediate, complete, and real. This is why good people follow him.',
  },
  {
    name: 'Dominion',
    text: 'While he carries it, every choice produced by that wound becomes predictable—and therefore preventable.',
  },
] as const;

export const HONOR_CODE = [
  'He never lies about the price of his mercy.',
  'He keeps a bargain even when the bargain weakens him.',
  'He protects civilians, surrendered enemies, and anyone placed under his word.',
  'He never edits an Echo to make himself innocent.',
  'He carries every wound he removes. He simply refuses to let anyone choose it back.',
] as const;

export const BOOKS = [
  {
    number: 'Prelude',
    title: 'Malachar: The Brightest Wound',
    question: 'Does honoring a noble death make you complicit in it?',
  },
  {
    number: 'I',
    title: 'The First Echo',
    question: 'Who owns a memory reconstructed by someone who never lived it?',
  },
  {
    number: 'II',
    title: 'Lord of the Living Elements',
    question: 'Can world-shaping power remain a relationship instead of becoming command?',
  },
  {
    number: 'III',
    title: 'The Mercy Engine',
    question: 'When coercion saves more lives, what exactly makes resistance moral?',
  },
  {
    number: 'IV',
    title: 'The Perfect World',
    question: 'Would you leave a painless life when the pain outside is real?',
  },
  {
    number: 'V',
    title: 'The Last Unwritten Dawn',
    question: 'Can prediction make a choice it did not authorize?',
  },
] as const;

export const FORMATS: Record<FormatKey, { label: string; title: string; body: string; release: string }> = {
  read: {
    label: 'Read',
    title: 'The novels hold the deepest canon.',
    body: 'Six connected books carry Malachar’s interior life, Lumara’s accountable uncertainty, and Elyon’s passage from reconstruction intelligence to elemental steward.',
    release: 'First proof: the opening chapter and Episode 00 are complete. Book I, The First Echo, follows.',
  },
  scroll: {
    label: 'Scroll',
    title: 'The webtoon turns consequence into vertical rhythm.',
    body: 'Episode Zero is available now. Three launch episodes follow, then a twelve-episode season releases weekly. Every episode changes the meaning of the mercy that preceded it.',
    release: 'Begin with Episode 00: The Hand He Released.',
  },
  watch: {
    label: 'Watch',
    title: 'Animation begins with proof, not a promise.',
    body: 'A 90-second Malachar sequence and a 6–8 minute Eiren Gate episode establish acting, motion, music, and Arcanean Luminism before a twelve-episode season scales the production.',
    release: 'Season One adapts The First Echo and ends when the Luminarch Staff answers Elyon.',
  },
  listen: {
    label: 'Listen',
    title: 'The missing memory becomes music.',
    body: 'Malachar carries nine broken bell attacks. Elyon’s precise arpeggio learns timing deviation. Saelith’s six-note phrase remains unresolved until the final book.',
    release: 'First release: The Last Witness and Becoming as paired character themes.',
  },
};

export const CHOICE_COPY: Record<StoryChoice, { title: string; body: string }> = {
  keep: {
    title: 'You keep the wound.',
    body: 'Malachar will not call you brave. He will ask who pays when courage fails—and whether you will remain to repair what freedom breaks.',
  },
  give: {
    title: 'You offer the memory.',
    body: 'He does not take it yet. “Tell me whether you chose this,” he says, “or whether the wound chose for you.”',
  },
};
