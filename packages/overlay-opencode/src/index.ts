/**
 * @arcanea/overlay-cursor
 *
 * Cursor IDE overlay for the Arcanea Intelligence OS.
 * Generates .cursorrules and .cursor/rules/*.mdc for Cursor IDE integration.
 */

// Installer — primary entry point
export { CursorOverlayInstaller } from './installer.js';

// Backwards-compatible alias
export { CursorOverlayInstaller as OpenCodeOverlayInstaller } from './installer.js';

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
