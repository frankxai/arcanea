/**
 * @arcanea/overlay-opencode
 *
 * Cursor IDE overlay for the Arcanea Intelligence OS.
 * Generates .cursorrules and .cursor/rules/*.mdc for Cursor IDE integration.
 * (Provider ID: 'opencode' for backwards compatibility)
 */

// Installer — primary entry point
export { OpenCodeOverlayInstaller } from './installer.js';

// Generators — use directly in custom integrations
export {
  generateCursorRules,
  generateArcaneMdcRule,
  generateTypeScriptMdcRule,
  generateGuardianMdcFile,
  generateSetupGuide,
} from './generators.js';

// Templates — canonical content building blocks
export {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  LORE_REFERENCE,
  formatMdcRule,
  generateGuardianMdcRule,
  type MdcRule,
} from './templates.js';
