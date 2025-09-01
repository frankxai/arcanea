export interface Thread {
  id: string
  name: string
  frequency: string
  element: string
  guardian: string
  archetype: string
  description: string
  color: string
  textColor: string
}

export const threads: Thread[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    frequency: '174 Hz',
    element: 'Earth',
    guardian: 'Lyssandria',
    archetype: 'Protector',
    description: 'Grounding, protection, stability, and security. The Obsidian Thread helps establish foundations and boundaries.',
    color: 'bg-obsidian',
    textColor: 'text-obsidian'
  },
  {
    id: 'flame',
    name: 'Flame',
    frequency: '285 Hz',
    element: 'Water/Fire',
    guardian: 'Leyla',
    archetype: 'Seductress',
    description: 'Passion, transformation, desire, and emotional intensity. The Flame Thread ignites change and burns away obstacles.',
    color: 'bg-flame',
    textColor: 'text-flame'
  },
  {
    id: 'solar',
    name: 'Solar',
    frequency: '396 Hz',
    element: 'Fire',
    guardian: 'Helios',
    archetype: 'Leader',
    description: 'Vitality, willpower, confidence, and personal power. The Solar Thread fuels action and manifestation.',
    color: 'bg-solar',
    textColor: 'text-solar'
  },
  {
    id: 'verdant',
    name: 'Verdant',
    frequency: '417 Hz',
    element: 'Earth/Water',
    guardian: 'Gaiana',
    archetype: 'Nurturer',
    description: 'Growth, healing, abundance, and connection to nature. The Verdant Thread fosters renewal and nourishment.',
    color: 'bg-verdant',
    textColor: 'text-verdant'
  },
  {
    id: 'sonic',
    name: 'Sonic',
    frequency: '528 Hz',
    element: 'Air',
    guardian: 'Zephyra',
    archetype: 'Messenger',
    description: 'Communication, expression, creativity, and truth. The Sonic Thread facilitates clear and authentic expression.',
    color: 'bg-sonic',
    textColor: 'text-sonic'
  },
  {
    id: 'dream',
    name: 'Dream',
    frequency: '639 Hz',
    element: 'Water/Air',
    guardian: 'Morpheus',
    archetype: 'Visionary',
    description: 'Intuition, imagination, dreams, and psychic abilities. The Dream Thread connects to the subconscious and higher wisdom.',
    color: 'bg-dream',
    textColor: 'text-dream'
  },
  {
    id: 'crown',
    name: 'Crown',
    frequency: '741 Hz',
    element: 'Fire/Air',
    guardian: 'Seraphina',
    archetype: 'Sage',
    description: 'Wisdom, enlightenment, spiritual connection, and divine truth. The Crown Thread opens the mind to higher knowledge.',
    color: 'bg-crown',
    textColor: 'text-crown'
  },
  {
    id: 'infinity',
    name: 'Infinity',
    frequency: '852 Hz',
    element: 'Ether',
    guardian: 'Orion',
    archetype: 'Mystic',
    description: 'Eternal cycles, timelessness, and the infinite. The Infinity Thread connects to the cosmic web of existence.',
    color: 'bg-infinity',
    textColor: 'text-infinity'
  },
  {
    id: 'unity',
    name: 'Unity',
    frequency: '963 Hz',
    element: 'All',
    guardian: 'Harmonia',
    archetype: 'Unifier',
    description: 'Oneness, connection, and universal love. The Unity Thread weaves all other threads together in perfect harmony.',
    color: 'bg-unity',
    textColor: 'text-unity'
  },
  {
    id: 'architect',
    name: 'Architect',
    frequency: '111 Hz',
    element: 'Ether',
    guardian: 'The Architect',
    archetype: 'Creator',
    description: 'The master weaver who designs the fabric of reality. The Architect Thread represents pure creative potential.',
    color: 'bg-architect',
    textColor: 'text-architect'
  }
]

export function getThreadById(id: string): Thread | undefined {
  return threads.find(thread => thread.id === id)
}
