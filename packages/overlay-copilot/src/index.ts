/**
 * @arcanea/overlay-copilot
 *
 * GitHub Copilot overlay for the Arcanea Intelligence OS.
 * Generates .github/copilot-instructions.md and supporting Copilot configs.
 */

// Installer — primary entry point
export { CopilotOverlayInstaller } from './installer.js';

// Generators — use directly in custom integrations
export {
  generateCopilotInstructionsFile,
  generateCopilotIgnore,
  generateCopilotWorkflowConfig,
} from './generators.js';

// Templates — canonical content building blocks
export {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_QUICK_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  CODE_STANDARDS,
  LORE_REFERENCE,
} from './templates.js';
