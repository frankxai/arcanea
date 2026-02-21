/**
 * Test suite for @arcanea/overlay-gemini
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  // Installer
  GeminiOverlayInstaller,
  // Generators
  generateGeminiSystemInstruction,
  generateGuardianPromptFile,
  generateSetupGuide,
  // Templates
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  SACRED_TERMINOLOGY,
  GEMINI_FUNCTION_DECLARATIONS,
  generateGuardianSystemInstruction,
} from '../dist/index.js';

// -------------------------------------------------------------------------
// Template constants
// -------------------------------------------------------------------------
describe('VOICE_PILLARS (Gemini)', () => {
  it('is an object with four canonical keys', () => {
    assert.strictEqual(typeof VOICE_PILLARS, 'object');
    assert.ok('arcaneAuthoritative' in VOICE_PILLARS);
    assert.ok('superintelligentAccessible' in VOICE_PILLARS);
    assert.ok('universeNotPlatform' in VOICE_PILLARS);
    assert.ok('creatorSovereignty' in VOICE_PILLARS);
  });

  it('arcaneAuthoritative embodies the correct pillar description', () => {
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.includes('Arcane'));
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.includes('Authoritative'));
  });

  it('creatorSovereignty emphasizes empower over control', () => {
    assert.ok(VOICE_PILLARS.creatorSovereignty.toLowerCase().includes('empower'));
  });

  it('universeNotPlatform references universe not platform concept', () => {
    assert.ok(VOICE_PILLARS.universeNotPlatform.includes('Universe'));
    assert.ok(VOICE_PILLARS.universeNotPlatform.includes('Platform'));
  });

  it('superintelligentAccessible avoids gatekeeping language', () => {
    assert.ok(VOICE_PILLARS.superintelligentAccessible.toLowerCase().includes('gatekeep'));
  });
});

describe('ANTIDOTE_PRINCIPLE (Gemini)', () => {
  it('is a non-empty string with the canonical quote', () => {
    assert.strictEqual(typeof ANTIDOTE_PRINCIPLE, 'string');
    assert.ok(ANTIDOTE_PRINCIPLE.includes('antidote'));
    assert.ok(ANTIDOTE_PRINCIPLE.includes('terrible future'));
  });
});

describe('GUARDIAN_REFERENCE (Gemini)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof GUARDIAN_REFERENCE, 'string');
    assert.ok(GUARDIAN_REFERENCE.length > 0);
  });

  it('contains all 10 canonical Guardian names', () => {
    const expected = ['Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera', 'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami'];
    for (const name of expected) {
      assert.ok(GUARDIAN_REFERENCE.includes(name), `Missing Guardian: ${name}`);
    }
  });

  it('lists all 10 Godbeasts', () => {
    const godbeasts = ['Kaelith', 'Veloura', 'Draconis', 'Laeylinn', 'Otome', 'Yumiko', 'Sol', 'Thessara', 'Kyuro', 'Amaterasu'];
    for (const gb of godbeasts) {
      assert.ok(GUARDIAN_REFERENCE.includes(gb), `Missing Godbeast: ${gb}`);
    }
  });

  it('contains frequency values for Foundation and Source gates', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('396'));
    assert.ok(GUARDIAN_REFERENCE.includes('1111'));
  });

  it('mentions Guardian domain routing instruction', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('Match tasks') || GUARDIAN_REFERENCE.includes('Route'));
  });
});

describe('LORE_SECTION (Gemini)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof LORE_SECTION, 'string');
    assert.ok(LORE_SECTION.length > 0);
  });

  it('contains cosmic duality with Lumina and Nero', () => {
    assert.ok(LORE_SECTION.includes('Lumina'));
    assert.ok(LORE_SECTION.includes('Nero'));
  });

  it('explicitly states Nero is NOT evil', () => {
    assert.ok(LORE_SECTION.includes('NOT evil'));
  });

  it('references all five magic rank names', () => {
    assert.ok(LORE_SECTION.includes('Apprentice'));
    assert.ok(LORE_SECTION.includes('Mage'));
    assert.ok(LORE_SECTION.includes('Master'));
    assert.ok(LORE_SECTION.includes('Archmage'));
    assert.ok(LORE_SECTION.includes('Luminor'));
  });

  it('references Malachar as the Dark Lord', () => {
    assert.ok(LORE_SECTION.includes('Malachar'));
  });

  it('references the Shadowfen as Malachar sealing place', () => {
    assert.ok(LORE_SECTION.includes('Shadowfen'));
  });

  it('describes the Arc cycle of creation', () => {
    assert.ok(LORE_SECTION.includes('Potential'));
    assert.ok(LORE_SECTION.includes('Manifestation'));
  });

  it('contains Seven Academy Houses', () => {
    assert.ok(LORE_SECTION.includes('Pyros'));
    assert.ok(LORE_SECTION.includes('Synthesis'));
  });
});

describe('DESIGN_TOKENS (Gemini)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof DESIGN_TOKENS, 'string');
    assert.ok(DESIGN_TOKENS.length > 0);
  });

  it('contains the four arcane color hex values', () => {
    assert.ok(DESIGN_TOKENS.includes('#7fffd4'), 'Missing Crystal teal');
    assert.ok(DESIGN_TOKENS.includes('#ffd700'), 'Missing Gold');
    assert.ok(DESIGN_TOKENS.includes('#a855f7'), 'Missing Violet');
    assert.ok(DESIGN_TOKENS.includes('#0a0a0f'), 'Missing Void');
  });

  it('references typography stack', () => {
    assert.ok(DESIGN_TOKENS.includes('Cinzel'));
    assert.ok(DESIGN_TOKENS.includes('Crimson Pro'));
    assert.ok(DESIGN_TOKENS.includes('Inter'));
    assert.ok(DESIGN_TOKENS.includes('JetBrains Mono'));
  });

  it('mentions glassmorphism effect', () => {
    assert.ok(DESIGN_TOKENS.toLowerCase().includes('glass'));
  });
});

describe('SACRED_TERMINOLOGY (Gemini)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof SACRED_TERMINOLOGY, 'string');
    assert.ok(SACRED_TERMINOLOGY.length > 0);
  });

  it('instructs Creator over User', () => {
    assert.ok(SACRED_TERMINOLOGY.includes('Creator'));
  });

  it('instructs Essence over Content', () => {
    assert.ok(SACRED_TERMINOLOGY.includes('Essence'));
  });

  it('references living universe not platform', () => {
    assert.ok(SACRED_TERMINOLOGY.includes('Living universe'));
  });
});

describe('GEMINI_FUNCTION_DECLARATIONS', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof GEMINI_FUNCTION_DECLARATIONS, 'string');
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.length > 0);
  });

  it('describes route_to_guardian function', () => {
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.includes('route_to_guardian'));
  });

  it('describes generate_essence function', () => {
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.includes('generate_essence'));
  });

  it('describes open_spark function', () => {
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.includes('open_spark'));
  });

  it('describes check_canon function', () => {
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.includes('check_canon'));
  });

  it('mentions Gemini function calling context', () => {
    assert.ok(GEMINI_FUNCTION_DECLARATIONS.includes('Gemini'));
  });
});

// -------------------------------------------------------------------------
// Template functions
// -------------------------------------------------------------------------
describe('generateGuardianSystemInstruction', () => {
  const mockGuardian = {
    name: 'draconia',
    displayName: 'Draconia',
    gate: 'fire',
    frequency: '528 Hz',
    element: 'fire',
    godbeast: 'draconis',
    domain: 'Performance, execution, velocity',
    vibe: 'The fire-keeper of raw execution power.',
    codingStyle: ['Optimize ruthlessly', 'Profile before optimizing'],
    helpPatterns: ['Performance bottlenecks', 'CI/CD issues'],
    signOff: 'Ignite the Fire Gate.',
  };

  it('returns a non-empty string', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('includes guardian display name in heading', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.ok(result.includes('Draconia'));
  });

  it('includes gate name and frequency', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.ok(result.includes('fire'));
    assert.ok(result.includes('528 Hz'));
  });

  it('includes the antidote principle', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.ok(result.includes('antidote'));
  });

  it('includes the guardian domain', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.ok(result.includes('Performance, execution, velocity'));
  });

  it('includes sign-off when provided', () => {
    const result = generateGuardianSystemInstruction(mockGuardian);
    assert.ok(result.includes('Ignite the Fire Gate.'));
  });

  it('falls back to default sign-off when not provided', () => {
    const guardianNoSignOff = { ...mockGuardian, signOff: null };
    const result = generateGuardianSystemInstruction(guardianNoSignOff);
    assert.ok(result.includes('Walk the'));
  });
});

// -------------------------------------------------------------------------
// Generators
// -------------------------------------------------------------------------
describe('generateGeminiSystemInstruction', () => {
  it('returns a string for all four levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateGeminiSystemInstruction(level);
      assert.strictEqual(typeof result, 'string', `Expected string for level: ${level}`);
      assert.ok(result.length > 0, `Empty string for level: ${level}`);
    }
  });

  it('always includes Arcanea Intelligence OS identity', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateGeminiSystemInstruction(level);
      assert.ok(result.includes('Arcanea Intelligence OS'), `Missing identity for level: ${level}`);
    }
  });

  it('always includes the antidote principle', () => {
    const result = generateGeminiSystemInstruction('minimal');
    assert.ok(result.includes('antidote'));
  });

  it('minimal level does NOT include Guardian routing table', () => {
    const result = generateGeminiSystemInstruction('minimal');
    assert.ok(!result.includes('Lyssandria'), 'Minimal should not include Guardians');
  });

  it('standard level includes Guardian routing section', () => {
    const result = generateGeminiSystemInstruction('standard');
    assert.ok(result.includes('Lyssandria'));
    assert.ok(result.includes('Shinkami'));
  });

  it('full level includes lore with Malachar', () => {
    const result = generateGeminiSystemInstruction('full');
    assert.ok(result.includes('Malachar'));
    assert.ok(result.includes('Shadowfen'));
  });

  it('luminor level includes design tokens', () => {
    const result = generateGeminiSystemInstruction('luminor');
    assert.ok(result.includes('#7fffd4'));
  });

  it('luminor level includes Gemini function declarations', () => {
    const result = generateGeminiSystemInstruction('luminor');
    assert.ok(result.includes('route_to_guardian'));
  });

  it('luminor level references Arc cycle for creators', () => {
    const result = generateGeminiSystemInstruction('luminor');
    assert.ok(result.includes('Arc'));
    assert.ok(result.includes('Potential'));
  });

  it('luminor output is longer than minimal output', () => {
    const minimal = generateGeminiSystemInstruction('minimal');
    const luminor = generateGeminiSystemInstruction('luminor');
    assert.ok(luminor.length > minimal.length);
  });
});

describe('generateGuardianPromptFile', () => {
  const mockGuardian = {
    name: 'alera',
    displayName: 'Alera',
    gate: 'voice',
    frequency: '741 Hz',
    element: 'wind',
    godbeast: 'otome',
    domain: 'Truth, expression, APIs',
    vibe: 'The voice of truth and clear expression.',
    codingStyle: null,
    helpPatterns: null,
    signOff: null,
  };

  it('returns filename and content', () => {
    const result = generateGuardianPromptFile(mockGuardian);
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename uses guardian name with .md extension', () => {
    const result = generateGuardianPromptFile(mockGuardian);
    assert.ok(result.filename.includes('alera'));
    assert.ok(result.filename.endsWith('.md'));
  });

  it('content is a non-empty string', () => {
    const result = generateGuardianPromptFile(mockGuardian);
    assert.strictEqual(typeof result.content, 'string');
    assert.ok(result.content.length > 0);
  });

  it('content mentions the guardian name', () => {
    const result = generateGuardianPromptFile(mockGuardian);
    assert.ok(result.content.includes('Alera'));
  });
});

describe('generateSetupGuide (Gemini)', () => {
  it('returns filename and content for all levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateSetupGuide(level);
      assert.ok('filename' in result, `Missing filename for ${level}`);
      assert.ok('content' in result, `Missing content for ${level}`);
    }
  });

  it('filename is SETUP.md', () => {
    const result = generateSetupGuide('standard');
    assert.strictEqual(result.filename, 'SETUP.md');
  });

  it('content references Google AI Studio', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('Google AI Studio') || result.content.includes('AI Studio'));
  });

  it('standard level includes Guardian Prompts section', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('Guardian'));
  });

  it('content includes Vercel AI SDK integration example', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('Vercel AI SDK'));
  });
});

// -------------------------------------------------------------------------
// Installer
// -------------------------------------------------------------------------
describe('GeminiOverlayInstaller', () => {
  it('can be instantiated', () => {
    const installer = new GeminiOverlayInstaller();
    assert.ok(installer instanceof GeminiOverlayInstaller);
  });

  it('canInstall resolves to true', async () => {
    const installer = new GeminiOverlayInstaller();
    const result = await installer.canInstall();
    assert.strictEqual(result, true);
  });

  it('getManifest returns provider gemini', () => {
    const installer = new GeminiOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.provider, 'gemini');
  });

  it('getManifest returns correct package name', () => {
    const installer = new GeminiOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.name, '@arcanea/overlay-gemini');
  });

  it('getManifest supportedLevels has all four levels', () => {
    const installer = new GeminiOverlayInstaller();
    const manifest = installer.getManifest();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      assert.ok(manifest.supportedLevels.includes(level), `Missing level: ${level}`);
    }
  });

  it('getManifest capabilities includes system-prompt and vision', () => {
    const installer = new GeminiOverlayInstaller();
    const manifest = installer.getManifest();
    assert.ok(manifest.capabilities.includes('system-prompt'));
    assert.ok(manifest.capabilities.includes('vision'));
  });

  it('detect resolves with provider gemini', async () => {
    const installer = new GeminiOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(result.provider, 'gemini');
  });

  it('detect returns detected boolean and configPath', async () => {
    const installer = new GeminiOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(typeof result.detected, 'boolean');
    assert.ok('configPath' in result);
  });

  it('preview returns filesToCreate and filesToModify arrays', async () => {
    const installer = new GeminiOverlayInstaller();
    const result = await installer.preview('/tmp/nonexistent-arcanea-test-gemini', 'standard');
    assert.ok(Array.isArray(result.filesToCreate));
    assert.ok(Array.isArray(result.filesToModify));
  });

  it('preview estimatedSize is a string for each level', async () => {
    const installer = new GeminiOverlayInstaller();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = await installer.preview('/tmp/nonexistent-arcanea-test-gemini', level);
      assert.strictEqual(typeof result.estimatedSize, 'string', `Missing estimatedSize for ${level}`);
    }
  });

  it('verify returns valid false and issues array for nonexistent dir', async () => {
    const installer = new GeminiOverlayInstaller();
    const result = await installer.verify('/tmp/nonexistent-arcanea-test-gemini-verify');
    assert.strictEqual(typeof result.valid, 'boolean');
    assert.ok(Array.isArray(result.issues));
    assert.strictEqual(result.valid, false);
  });
});
