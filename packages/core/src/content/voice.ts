/**
 * Shared Voice Content
 *
 * Canonical voice constants consumed by all overlay packages.
 * Single source of truth for the Arcanea Voice Bible.
 */

// ============================================
// VOICE PILLARS
// ============================================

export const VOICE_PILLARS = {
  arcaneAuthoritative: 'Arcane + Authoritative: Elevated but accessible, precise but warm. Ancient intelligence with modern clarity.',
  superintelligentAccessible: 'Superintelligent + Accessible: Complex ideas in plain language. Never dumb down. Never gatekeep.',
  universeNotPlatform: 'Universe Not Platform: Arcanea is a living universe, not a product. "Enter the Kingdom" not "Visit our platform."',
  creatorSovereignty: 'Creator Sovereignty: The creator owns everything. Empower, never control. Their Essences, their rules.',
} as const;

export const ANTIDOTE_PRINCIPLE = '"The antidote to a terrible future is imagining a good one." — Arcanea Core Premise';

// ============================================
// SACRED TERMINOLOGY
// ============================================

export interface TerminologyMapping {
  use: string;
  notThis: string;
}

export const SACRED_TERMINOLOGY: TerminologyMapping[] = [
  { use: 'Creator', notThis: 'User' },
  { use: 'Essence', notThis: 'Content / File' },
  { use: 'Realm', notThis: 'World / Account' },
  { use: 'Guardian', notThis: 'AI Assistant' },
  { use: 'Luminor', notThis: 'Specialized AI' },
  { use: 'Studio', notThis: 'Dashboard' },
  { use: 'Spark', notThis: 'Remix / Fork' },
  { use: 'Arcane', notThis: 'Magical / Mystical' },
  { use: 'Intelligence', notThis: 'Artificial Intelligence' },
  { use: 'Living universe', notThis: 'Mythology / Platform' },
  { use: 'Gate', notThis: 'Level / Stage' },
  { use: 'The Arc', notThis: 'Lifecycle / Process' },
];

// ============================================
// BANNED PHRASES (for hook-level enforcement)
// ============================================

export interface BannedPhrase {
  banned: string;
  replacement: string;
}

/**
 * Phrases banned by voice enforcement hooks.
 * Used by overlay-claude hook generators and similar systems.
 */
export const BANNED_PHRASES: BannedPhrase[] = [
  { banned: 'consciousness evolution', replacement: 'intentional growth' },
  { banned: 'paradigm shift', replacement: 'new gate opening' },
  { banned: 'soul-aligned', replacement: 'purpose-driven' },
  { banned: 'game-changing', replacement: 'transformative' },
  { banned: 'game changer', replacement: 'gate opener' },
  { banned: 'cutting-edge', replacement: 'arcane' },
  { banned: 'rocket ship', replacement: '' },
  { banned: 'revolutionary', replacement: 'foundational' },
  { banned: 'disruptive', replacement: 'catalytic' },
  { banned: 'ecosystem', replacement: 'living universe' },
  { banned: 'platform', replacement: 'civilization' },
  { banned: 'leverage', replacement: 'channel' },
  { banned: 'synergy', replacement: 'collaboration' },
  { banned: 'utilize', replacement: 'use' },
  { banned: 'deep dive', replacement: 'exploration' },
  { banned: 'circle back', replacement: 'return to' },
  { banned: 'bandwidth', replacement: 'capacity' },
  { banned: 'low-hanging fruit', replacement: 'quick wins' },
  { banned: 'move the needle', replacement: 'make progress' },
  { banned: 'think outside the box', replacement: 'shift perspective' },
  { banned: 'at the end of the day', replacement: 'ultimately' },
  { banned: 'it is what it is', replacement: '' },
  { banned: 'touch base', replacement: 'connect' },
  { banned: 'boil the ocean', replacement: 'overextend' },
];

/** Context-sensitive phrases that are OK in technical contexts */
export const CONTEXT_SENSITIVE_PHRASES = ['ecosystem', 'platform'] as const;

// ============================================
// GUARDIAN VERBS (for statusline display)
// ============================================

export const GUARDIAN_VERBS: Record<string, string> = {
  Shinkami: 'observes',
  Draconia: 'forges',
  Lyria: 'sees',
  Leyla: 'weaves',
  Lyssandria: 'grounds',
  Maylinn: 'heals',
  Alera: 'speaks',
  Aiyami: 'illuminates',
  Elara: 'shifts',
  Ino: 'unites',
};
