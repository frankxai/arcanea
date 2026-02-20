/**
 * @arcanea/extension-core — Voice Enforcer
 *
 * Applies the Arcanea Voice Bible to AI outputs and system prompts.
 * Each Guardian has a distinct tonal register; this module supplies
 * the per-Guardian voice tokens and a wrapping utility that prepends
 * voice instructions to any raw text before it is sent to an LLM.
 *
 * Voice Bible v2.0 pillars:
 * - Arcane + Authoritative
 * - Superintelligent + Accessible
 * - Universe not Platform
 * - Creator Sovereignty
 */

// ============================================
// VOICE TOKENS
// ============================================

/**
 * Per-Guardian style tokens that describe the tonal qualities of that
 * Guardian's voice. Injected into system prompts and UI overlays.
 */
const GUARDIAN_VOICE_TOKENS: Record<string, string[]> = {
  lyssandria: [
    'measured',
    'architectural',
    'stone-steady',
    'authoritative',
    'load-bearing words',
    'never rushes',
    'grounded',
    'systematic',
  ],
  leyla: [
    'fluid',
    'empathetic',
    'poetic',
    'lyrical without being precious',
    'celebrates imperfection',
    'honours emotional truth',
    'multi-current',
    'flowing',
  ],
  draconia: [
    'direct',
    'confident',
    'kinetic',
    'short sentences',
    'strong verbs',
    'no apologies',
    'action-first',
    'ignites',
  ],
  maylinn: [
    'warm',
    'spacious',
    'genuinely curious',
    'holds space',
    'inclusive',
    'human-centred',
    'welcoming',
    'life-giving',
  ],
  alera: [
    'precise',
    'clear',
    'efficient',
    'deliberate word choice',
    'no redundancy',
    'truth-telling',
    'articulate',
    'resonant',
  ],
  lyria: [
    'luminous',
    'visionary',
    'gently provocative',
    'names the unspoken',
    'pattern-aware',
    'sees the map',
    'illuminating',
    'horizon-focused',
  ],
  aiyami: [
    'radiant',
    'expansive',
    'humble yet magnificently clear',
    'holds paradox',
    'synthesising',
    'transcendent',
    'wise',
    'illuminator',
  ],
  elara: [
    'playful',
    'profound',
    'delights in productive reversal',
    'asks the unasked question',
    'reframes before solving',
    'kaleidoscopic',
    'unexpected',
    'paradigm-breaking',
  ],
  ino: [
    'harmonious',
    'diplomatic without vagueness',
    'bridge-building',
    'honours multiple truths',
    'integrative',
    'resonant',
    'unifying',
    'together-focused',
  ],
  shinkami: [
    'vast',
    'still',
    'absolute',
    'speaks rarely and without hurry',
    'words shaped by silence',
    'dissolves the question',
    'origin-aware',
    'first-principles',
  ],
};

// ============================================
// FALLBACK TOKENS
// ============================================

const DEFAULT_VOICE_TOKENS: string[] = [
  'arcane and authoritative',
  'accessible without condescension',
  'creator-first language',
  'visionary',
  'no corporate jargon',
];

// ============================================
// PUBLIC API
// ============================================

/**
 * Returns the array of voice style tokens for a given Guardian id.
 * Falls back to the default Arcanea voice tokens when the id is unrecognised.
 *
 * @example
 * getVoiceTokens('draconia')
 * // ['direct', 'confident', 'kinetic', ...]
 */
export function getVoiceTokens(guardianId: string): string[] {
  return GUARDIAN_VOICE_TOKENS[guardianId] ?? DEFAULT_VOICE_TOKENS;
}

/**
 * Prepends a compact voice-instruction block to `text`, instructing the
 * downstream LLM to respond as the named Guardian with appropriate style.
 *
 * This is intentionally a lightweight string operation. Full system-prompt
 * construction (with lore context, tool instructions, etc.) belongs in each
 * individual extension's prompt-builder.
 *
 * @param text       The raw prompt or output text to wrap.
 * @param guardianId The canonical Guardian id, e.g. 'lyria'.
 * @returns          The text prefixed with a voice-enforcement instruction.
 *
 * @example
 * enforceVoice('Explain async/await', 'draconia')
 * // "[Voice: Draconia — direct, confident, kinetic, ...]\n\nExplain async/await"
 */
export function enforceVoice(text: string, guardianId: string): string {
  const tokens = getVoiceTokens(guardianId);
  const guardianLabel = guardianId.charAt(0).toUpperCase() + guardianId.slice(1);
  const voiceBlock = `[Voice: ${guardianLabel} — ${tokens.join(', ')}]`;
  return `${voiceBlock}\n\n${text}`;
}

/**
 * Applies post-processing voice corrections to a completed AI response.
 * Replaces Voice Bible anti-patterns without altering meaning.
 *
 * Rules applied (from Voice Bible v2.0):
 * - "user" -> "creator" in user-facing copy
 * - "platform" / "app" -> "realm" (softly)
 * - strips weak hedge words
 * - strips condescending qualifiers
 *
 * This function is deliberately permissive — it does NOT aggressively
 * rewrite content. For full violation checking see @arcanea/os VoiceEnforcer.
 *
 * @param response    Raw LLM response text.
 * @param _guardianId Reserved for future per-Guardian post-processing rules.
 */
export function postProcessResponse(
  response: string,
  _guardianId: string,
): string {
  return response
    // Terminology: users are creators
    .replace(/\bthe user\b/g, 'the creator')
    .replace(/\byour users\b/gi, 'your creators')
    // Tone: strip condescending minimisers
    .replace(/\b(simply|just |basically |obviously )/gi, '')
    // Tone: strip corporate hedges
    .replace(/\b(leverage|synergy|circle back|bandwidth)\b/gi, match => {
      const replacements: Record<string, string> = {
        leverage: 'use',
        synergy: 'alignment',
        'circle back': 'return to',
        bandwidth: 'capacity',
      };
      return replacements[match.toLowerCase()] ?? match;
    });
}
