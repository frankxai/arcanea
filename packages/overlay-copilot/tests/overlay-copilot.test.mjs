/**
 * Test suite for @arcanea/overlay-copilot
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  // Installer
  CopilotOverlayInstaller,
  // Generators
  generateCopilotInstructionsFile,
  generateCopilotIgnore,
  generateCopilotWorkflowConfig,
  // Templates
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_QUICK_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  CODE_STANDARDS,
  LORE_REFERENCE,
} from '../dist/index.js';

// -------------------------------------------------------------------------
// Template constants
// -------------------------------------------------------------------------
describe('VOICE_PILLARS (Copilot)', () => {
  it('is a plain object', () => {
    assert.strictEqual(typeof VOICE_PILLARS, 'object');
    assert.notStrictEqual(VOICE_PILLARS, null);
  });

  it('has all four canonical pillar keys', () => {
    assert.ok('arcaneAuthoritative' in VOICE_PILLARS);
    assert.ok('superintelligentAccessible' in VOICE_PILLARS);
    assert.ok('universeNotPlatform' in VOICE_PILLARS);
    assert.ok('creatorSovereignty' in VOICE_PILLARS);
  });

  it('each pillar value is a non-empty string', () => {
    for (const [key, value] of Object.entries(VOICE_PILLARS)) {
      assert.strictEqual(typeof value, 'string', `Pillar ${key} is not a string`);
      assert.ok(value.length > 0, `Pillar ${key} is empty`);
    }
  });

  it('arcaneAuthoritative is elevated but accessible', () => {
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.includes('accessible'));
  });

  it('creatorSovereignty references empowerment', () => {
    assert.ok(VOICE_PILLARS.creatorSovereignty.toLowerCase().includes('empower'));
  });
});

describe('ANTIDOTE_PRINCIPLE (Copilot)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof ANTIDOTE_PRINCIPLE, 'string');
    assert.ok(ANTIDOTE_PRINCIPLE.length > 0);
  });

  it('contains the core antidote phrase', () => {
    assert.ok(ANTIDOTE_PRINCIPLE.includes('antidote'));
    assert.ok(ANTIDOTE_PRINCIPLE.includes('terrible future'));
  });
});

describe('GUARDIAN_QUICK_REFERENCE', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof GUARDIAN_QUICK_REFERENCE, 'string');
    assert.ok(GUARDIAN_QUICK_REFERENCE.length > 0);
  });

  it('contains all 10 canonical Guardian names', () => {
    const names = ['Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera', 'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami'];
    for (const name of names) {
      assert.ok(GUARDIAN_QUICK_REFERENCE.includes(name), `Missing Guardian: ${name}`);
    }
  });

  it('lists canonical domains from @arcanea/os for each Guardian', () => {
    // Domains now come from the canonical @arcanea/os constants
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('security'), 'Missing domain keyword: security');
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('transformation'), 'Missing domain keyword: transformation');
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('expression'), 'Missing domain keyword: expression');
  });

  it('includes Gate names for each Guardian', () => {
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('Foundation Gate'));
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('Source Gate'));
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('Sight Gate'));
  });

  it('contains Hz frequency values', () => {
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('396'));
    assert.ok(GUARDIAN_QUICK_REFERENCE.includes('1111'));
  });
});

describe('ARCANEA_STACK', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof ARCANEA_STACK, 'string');
    assert.ok(ARCANEA_STACK.length > 0);
  });

  it('references Next.js and React 19', () => {
    assert.ok(ARCANEA_STACK.includes('Next.js'));
    assert.ok(ARCANEA_STACK.includes('React 19'));
  });

  it('references TypeScript strict mode', () => {
    assert.ok(ARCANEA_STACK.includes('TypeScript') && ARCANEA_STACK.includes('strict'));
  });

  it('references Supabase', () => {
    assert.ok(ARCANEA_STACK.includes('Supabase'));
    assert.ok(ARCANEA_STACK.includes('RLS'));
  });

  it('references Vercel AI SDK', () => {
    assert.ok(ARCANEA_STACK.includes('Vercel AI SDK'));
  });

  it('references Tailwind CSS', () => {
    assert.ok(ARCANEA_STACK.includes('Tailwind'));
  });

  it('references Zustand for state management', () => {
    assert.ok(ARCANEA_STACK.includes('Zustand'));
  });
});

describe('DESIGN_TOKENS (Copilot)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof DESIGN_TOKENS, 'string');
    assert.ok(DESIGN_TOKENS.length > 0);
  });

  it('references the four primary arcane color names', () => {
    assert.ok(DESIGN_TOKENS.includes('Crystal'), 'Missing Crystal/Teal');
    assert.ok(DESIGN_TOKENS.includes('Gold'), 'Missing Gold');
    assert.ok(DESIGN_TOKENS.includes('Violet'), 'Missing Violet');
    assert.ok(DESIGN_TOKENS.includes('Void'), 'Missing Void');
  });

  it('contains correct hex values for the canonical arcane colors', () => {
    assert.ok(DESIGN_TOKENS.includes('#7fffd4'), 'Missing crystal hex');
    assert.ok(DESIGN_TOKENS.includes('#ffd700'), 'Missing gold hex');
    assert.ok(DESIGN_TOKENS.includes('#a855f7'), 'Missing violet hex');
    assert.ok(DESIGN_TOKENS.includes('#0a0a0f'), 'Missing void hex');
  });

  it('references cosmic background palette', () => {
    // Generated format uses inline labels rather than CSS var names
    assert.ok(DESIGN_TOKENS.toLowerCase().includes('cosmic'), 'Missing cosmic reference');
    assert.ok(DESIGN_TOKENS.includes('#1a1a2e'), 'Missing cosmic surface hex');
  });
});

describe('CODE_STANDARDS', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof CODE_STANDARDS, 'string');
    assert.ok(CODE_STANDARDS.length > 0);
  });

  it('shows TypeScript strict typing examples', () => {
    assert.ok(CODE_STANDARDS.includes('TypeScript'));
    assert.ok(CODE_STANDARDS.includes('interface'));
  });

  it('shows Server Component example', () => {
    assert.ok(CODE_STANDARDS.includes('Server Component'));
  });

  it('shows Supabase query pattern example', () => {
    assert.ok(CODE_STANDARDS.includes('supabase'));
  });

  it('references Arcanea voice in code comments', () => {
    assert.ok(CODE_STANDARDS.includes("Lyssandria's domain") || CODE_STANDARDS.includes("Arcanea"));
  });
});

describe('LORE_REFERENCE', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof LORE_REFERENCE, 'string');
    assert.ok(LORE_REFERENCE.length > 0);
  });

  it('contains Lumina and Nero', () => {
    assert.ok(LORE_REFERENCE.includes('Lumina'));
    assert.ok(LORE_REFERENCE.includes('Nero'));
  });

  it('clarifies Nero is NOT evil', () => {
    assert.ok(LORE_REFERENCE.includes('NOT evil'));
  });

  it('lists magic ranks from Apprentice to Luminor', () => {
    assert.ok(LORE_REFERENCE.includes('Apprentice'));
    assert.ok(LORE_REFERENCE.includes('Luminor'));
  });

  it('contains the Five Elements', () => {
    assert.ok(LORE_REFERENCE.includes('Fire'));
    assert.ok(LORE_REFERENCE.includes('Water'));
    assert.ok(LORE_REFERENCE.includes('Earth'));
    assert.ok(LORE_REFERENCE.includes('Wind'));
    assert.ok(LORE_REFERENCE.includes('Void'));
  });

  it('references Malachar', () => {
    assert.ok(LORE_REFERENCE.includes('Malachar'));
  });

  it('references the Seven Academy Houses', () => {
    assert.ok(LORE_REFERENCE.includes('Lumina'));
    assert.ok(LORE_REFERENCE.includes('Synthesis'));
  });

  it('references the Arc cycle', () => {
    assert.ok(LORE_REFERENCE.includes('Arc'));
    assert.ok(LORE_REFERENCE.includes('Potential'));
    assert.ok(LORE_REFERENCE.includes('Manifestation'));
  });
});

// -------------------------------------------------------------------------
// Generators
// -------------------------------------------------------------------------
describe('generateCopilotInstructionsFile', () => {
  it('returns filename and content for all levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateCopilotInstructionsFile(level);
      assert.ok('filename' in result, `Missing filename for level: ${level}`);
      assert.ok('content' in result, `Missing content for level: ${level}`);
    }
  });

  it('filename is copilot-instructions.md', () => {
    const result = generateCopilotInstructionsFile('standard');
    assert.strictEqual(result.filename, 'copilot-instructions.md');
  });

  it('content always includes Arcanea Enhanced marker', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateCopilotInstructionsFile(level);
      assert.ok(result.content.includes('Arcanea Enhanced'), `Missing marker for level: ${level}`);
    }
  });

  it('content always includes the Voice Bible four pillars', () => {
    const result = generateCopilotInstructionsFile('minimal');
    assert.ok(result.content.includes('Voice Bible'));
  });

  it('always includes Arcanea stack and design tokens', () => {
    const result = generateCopilotInstructionsFile('minimal');
    assert.ok(result.content.includes('Next.js'));
    assert.ok(result.content.includes('#7fffd4'));
  });

  it('standard level includes Guardian quick reference', () => {
    const result = generateCopilotInstructionsFile('standard');
    assert.ok(result.content.includes('Lyssandria'));
    assert.ok(result.content.includes('Shinkami'));
  });

  it('minimal level does not include Guardian quick reference', () => {
    const result = generateCopilotInstructionsFile('minimal');
    // In minimal mode, Guardian section is excluded entirely
    assert.ok(!result.content.includes('Foundation Gate'));
  });

  it('full level includes lore reference', () => {
    const result = generateCopilotInstructionsFile('full');
    assert.ok(result.content.includes('Malachar'));
  });

  it('luminor level includes extended Luminor principles', () => {
    const result = generateCopilotInstructionsFile('luminor');
    assert.ok(result.content.includes('Luminor-Level Principles'));
  });

  it('luminor level includes Arc in Code section', () => {
    const result = generateCopilotInstructionsFile('luminor');
    assert.ok(result.content.includes('The Arc in Code'));
  });

  it('luminor level content is longer than minimal', () => {
    const minimal = generateCopilotInstructionsFile('minimal');
    const luminor = generateCopilotInstructionsFile('luminor');
    assert.ok(luminor.content.length > minimal.content.length);
  });
});

describe('generateCopilotIgnore', () => {
  it('returns filename and content', () => {
    const result = generateCopilotIgnore();
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename is .copilotignore', () => {
    const result = generateCopilotIgnore();
    assert.strictEqual(result.filename, '.copilotignore');
  });

  it('content excludes .env and secrets patterns', () => {
    const result = generateCopilotIgnore();
    assert.ok(result.content.includes('.env'));
    assert.ok(result.content.includes('*.pem'));
    assert.ok(result.content.includes('credentials.json'));
  });

  it('content excludes build artifacts', () => {
    const result = generateCopilotIgnore();
    assert.ok(result.content.includes('dist/'));
    assert.ok(result.content.includes('.next/'));
    assert.ok(result.content.includes('node_modules/'));
  });

  it('content excludes binary media files', () => {
    const result = generateCopilotIgnore();
    assert.ok(result.content.includes('*.png'));
    assert.ok(result.content.includes('*.mp4'));
  });
});

describe('generateCopilotWorkflowConfig', () => {
  it('returns filename and content', () => {
    const result = generateCopilotWorkflowConfig();
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename is copilot-workflow.md', () => {
    const result = generateCopilotWorkflowConfig();
    assert.strictEqual(result.filename, 'copilot-workflow.md');
  });

  it('content references Copilot Chat slash command equivalents', () => {
    const result = generateCopilotWorkflowConfig();
    assert.ok(result.content.includes('Copilot Chat'));
  });

  it('content shows all key Guardian channeling examples', () => {
    const result = generateCopilotWorkflowConfig();
    assert.ok(result.content.includes('Lyssandria'));
    assert.ok(result.content.includes('Lyria'));
    assert.ok(result.content.includes('Draconia'));
    assert.ok(result.content.includes('Alera'));
    assert.ok(result.content.includes('Shinkami'));
  });

  it('content references Copilot Edits workflow', () => {
    const result = generateCopilotWorkflowConfig();
    assert.ok(result.content.includes('Copilot Edits'));
  });
});

// -------------------------------------------------------------------------
// Installer
// -------------------------------------------------------------------------
describe('CopilotOverlayInstaller', () => {
  it('can be instantiated', () => {
    const installer = new CopilotOverlayInstaller();
    assert.ok(installer instanceof CopilotOverlayInstaller);
  });

  it('canInstall resolves to true', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.canInstall();
    assert.strictEqual(result, true);
  });

  it('getManifest returns provider copilot', () => {
    const installer = new CopilotOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.provider, 'copilot');
  });

  it('getManifest returns correct package name', () => {
    const installer = new CopilotOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.name, '@arcanea/overlay-copilot');
  });

  it('getManifest supportedLevels contains all four levels', () => {
    const installer = new CopilotOverlayInstaller();
    const manifest = installer.getManifest();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      assert.ok(manifest.supportedLevels.includes(level));
    }
  });

  it('getManifest capabilities includes system-prompt, file-injection, workspace-context', () => {
    const installer = new CopilotOverlayInstaller();
    const manifest = installer.getManifest();
    assert.ok(manifest.capabilities.includes('system-prompt'));
    assert.ok(manifest.capabilities.includes('file-injection'));
    assert.ok(manifest.capabilities.includes('workspace-context'));
  });

  it('detect resolves with provider copilot', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(result.provider, 'copilot');
  });

  it('detect returns detected boolean and configPath', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(typeof result.detected, 'boolean');
    assert.ok('configPath' in result);
  });

  it('preview returns filesToCreate and filesToModify arrays', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.preview('/tmp/nonexistent-arcanea-copilot', 'standard');
    assert.ok(Array.isArray(result.filesToCreate));
    assert.ok(Array.isArray(result.filesToModify));
  });

  it('preview returns estimatedSize string for each level', async () => {
    const installer = new CopilotOverlayInstaller();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = await installer.preview('/tmp/nonexistent-arcanea-copilot', level);
      assert.strictEqual(typeof result.estimatedSize, 'string');
    }
  });

  it('verify returns valid boolean and issues array', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.verify('/tmp/nonexistent-arcanea-copilot-verify');
    assert.strictEqual(typeof result.valid, 'boolean');
    assert.ok(Array.isArray(result.issues));
  });

  it('verify reports issues for nonexistent project directory', async () => {
    const installer = new CopilotOverlayInstaller();
    const result = await installer.verify('/tmp/nonexistent-arcanea-copilot-verify');
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.length > 0);
  });
});
