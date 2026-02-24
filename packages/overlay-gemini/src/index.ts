/**
 * @arcanea/overlay-gemini
 *
 * Google Gemini overlay for the Arcanea Intelligence OS.
 * Generates system instructions, Guardian prompts, and AI Studio configs.
 */

// Installer — primary entry point
export { GeminiOverlayInstaller } from './installer.js';

// Generators — use directly in custom integrations
export {
  generateGeminiSystemInstruction,
  generateGuardianPromptFile,
  generateSetupGuide,
} from './generators.js';

// Templates — canonical content building blocks
export {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  SACRED_TERMINOLOGY,
  GEMINI_FUNCTION_DECLARATIONS,
  generateGuardianSystemInstruction,
} from './templates.js';
