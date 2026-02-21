/**
 * @arcanea/overlay-chatgpt
 *
 * ChatGPT / OpenAI overlay for the Arcanea Intelligence OS.
 * Generates Custom GPT configs, system prompts, and Guardian GPTs.
 */

// Installer — primary entry point
export { ChatGPTOverlayInstaller } from './installer.js';

// Generators — use directly in custom integrations
export {
  generateChatGPTSystemPrompt,
  generateMainGPTConfig,
  generateGuardianGPTFile,
  generateSetupGuide,
  type GeneratedGPTConfig,
} from './generators.js';

// Templates — canonical content building blocks
export {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  SACRED_TERMINOLOGY,
  SACRED_TERMINOLOGY_MD,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  generateCustomGPTConfig,
  generateGuardianGPTProfile,
  type CustomGPTConfig,
} from './templates.js';
