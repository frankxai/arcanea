/**
 * Test suite for @arcanea/overlay-chatgpt
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  // Installer
  ChatGPTOverlayInstaller,
  // Generators
  generateChatGPTSystemPrompt,
  generateMainGPTConfig,
  generateGuardianGPTFile,
  generateSetupGuide,
  // Templates
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  SACRED_TERMINOLOGY,
  SACRED_TERMINOLOGY_MD,
  generateCustomGPTConfig,
  generateGuardianGPTProfile,
} from '../dist/index.js';

// -------------------------------------------------------------------------
// Template constants
// -------------------------------------------------------------------------
describe('VOICE_PILLARS', () => {
  it('is an object', () => {
    assert.strictEqual(typeof VOICE_PILLARS, 'object');
    assert.notStrictEqual(VOICE_PILLARS, null);
  });

  it('has the four canonical pillar keys', () => {
    assert.ok('arcaneAuthoritative' in VOICE_PILLARS);
    assert.ok('superintelligentAccessible' in VOICE_PILLARS);
    assert.ok('universeNotPlatform' in VOICE_PILLARS);
    assert.ok('creatorSovereignty' in VOICE_PILLARS);
  });

  it('arcaneAuthoritative contains Arcane + Authoritative text', () => {
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.includes('Arcane'));
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.includes('Authoritative'));
  });

  it('universeNotPlatform references the living universe concept', () => {
    assert.ok(VOICE_PILLARS.universeNotPlatform.includes('Universe'));
  });

  it('creatorSovereignty references creator ownership', () => {
    assert.ok(VOICE_PILLARS.creatorSovereignty.includes('Creator Sovereignty'));
  });
});

describe('ANTIDOTE_PRINCIPLE', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof ANTIDOTE_PRINCIPLE, 'string');
    assert.ok(ANTIDOTE_PRINCIPLE.length > 0);
  });

  it('contains the canonical antidote phrase', () => {
    assert.ok(ANTIDOTE_PRINCIPLE.includes('antidote to a terrible future'));
  });
});

describe('GUARDIAN_REFERENCE', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof GUARDIAN_REFERENCE, 'string');
    assert.ok(GUARDIAN_REFERENCE.length > 0);
  });

  it('references all 10 canonical Guardians by name', () => {
    const guardians = ['Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera', 'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami'];
    for (const name of guardians) {
      assert.ok(GUARDIAN_REFERENCE.includes(name), `Missing Guardian: ${name}`);
    }
  });

  it('contains gate frequency values', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('174 Hz'));
    assert.ok(GUARDIAN_REFERENCE.includes('1111 Hz'));
  });

  it('contains the five canonical elements', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('Earth'));
    assert.ok(GUARDIAN_REFERENCE.includes('Water'));
    assert.ok(GUARDIAN_REFERENCE.includes('Fire'));
    assert.ok(GUARDIAN_REFERENCE.includes('Wind'));
    assert.ok(GUARDIAN_REFERENCE.includes('Void'));
  });
});

describe('LORE_SECTION', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof LORE_SECTION, 'string');
    assert.ok(LORE_SECTION.length > 0);
  });

  it('contains Lumina and Nero cosmic duality', () => {
    assert.ok(LORE_SECTION.includes('Lumina'));
    assert.ok(LORE_SECTION.includes('Nero'));
  });

  it('clarifies Nero is NOT evil', () => {
    assert.ok(LORE_SECTION.includes('Nero is NOT evil'));
  });

  it('contains all five magic ranks', () => {
    assert.ok(LORE_SECTION.includes('Apprentice'));
    assert.ok(LORE_SECTION.includes('Mage'));
    assert.ok(LORE_SECTION.includes('Master'));
    assert.ok(LORE_SECTION.includes('Archmage'));
    assert.ok(LORE_SECTION.includes('Luminor'));
  });

  it('contains Malachar the Dark Lord', () => {
    assert.ok(LORE_SECTION.includes('Malachar'));
  });

  it('contains the Seven Academy Houses', () => {
    assert.ok(LORE_SECTION.includes('Pyros'));
    assert.ok(LORE_SECTION.includes('Aqualis'));
    assert.ok(LORE_SECTION.includes('Synthesis'));
  });
});

describe('DESIGN_TOKENS', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof DESIGN_TOKENS, 'string');
    assert.ok(DESIGN_TOKENS.length > 0);
  });

  it('contains the four canonical arcane color hex values', () => {
    assert.ok(DESIGN_TOKENS.includes('#7fffd4'), 'Missing Crystal teal');
    assert.ok(DESIGN_TOKENS.includes('#ffd700'), 'Missing Gold');
    assert.ok(DESIGN_TOKENS.includes('#9966ff') || DESIGN_TOKENS.includes('#a855f7'), 'Missing Violet/Void');
    assert.ok(DESIGN_TOKENS.includes('#0b0e14') || DESIGN_TOKENS.includes('#0a0a0f'), 'Missing Void background');
  });

  it('references the Cinzel display font', () => {
    assert.ok(DESIGN_TOKENS.includes('Cinzel'));
  });
});

describe('SACRED_TERMINOLOGY', () => {
  it('is a non-empty array (structured data from @arcanea/os)', () => {
    assert.ok(Array.isArray(SACRED_TERMINOLOGY));
    assert.ok(SACRED_TERMINOLOGY.length > 0);
  });

  it('each entry has use and notThis fields', () => {
    for (const entry of SACRED_TERMINOLOGY) {
      assert.ok('use' in entry, 'Missing "use" field');
      assert.ok('notThis' in entry, 'Missing "notThis" field');
    }
  });

  it('includes Creator, Essence, Realm, Guardian, Studio mappings', () => {
    const uses = SACRED_TERMINOLOGY.map(e => e.use);
    assert.ok(uses.includes('Creator'));
    assert.ok(uses.includes('Essence'));
    assert.ok(uses.includes('Realm'));
    assert.ok(uses.includes('Guardian'));
    assert.ok(uses.includes('Studio'));
  });
});

describe('SACRED_TERMINOLOGY_MD', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof SACRED_TERMINOLOGY_MD, 'string');
    assert.ok(SACRED_TERMINOLOGY_MD.length > 0);
  });

  it('instructs using "Creator" not "User"', () => {
    assert.ok(SACRED_TERMINOLOGY_MD.includes('Creator'));
    assert.ok(SACRED_TERMINOLOGY_MD.includes('User'));
  });

  it('references Essence, Realm, Guardian, Studio vocabulary', () => {
    assert.ok(SACRED_TERMINOLOGY_MD.includes('Essence'));
    assert.ok(SACRED_TERMINOLOGY_MD.includes('Realm'));
    assert.ok(SACRED_TERMINOLOGY_MD.includes('Guardian'));
    assert.ok(SACRED_TERMINOLOGY_MD.includes('Studio'));
  });
});

// -------------------------------------------------------------------------
// Template functions
// -------------------------------------------------------------------------
describe('generateCustomGPTConfig', () => {
  it('returns an object with name, description, instructions, capabilities, conversation_starters', () => {
    const config = generateCustomGPTConfig('Test instructions');
    assert.strictEqual(typeof config, 'object');
    assert.ok('name' in config);
    assert.ok('description' in config);
    assert.ok('instructions' in config);
    assert.ok('capabilities' in config);
    assert.ok('conversation_starters' in config);
  });

  it('uses guardian name when guardianName is provided', () => {
    const config = generateCustomGPTConfig('instructions', 'Lyria', 'Design');
    assert.ok(config.name.includes('Lyria'));
    assert.ok(config.description.includes('Lyria'));
  });

  it('has default Arcanea name when no guardian specified', () => {
    const config = generateCustomGPTConfig('instructions');
    assert.strictEqual(config.name, 'Arcanea Intelligence');
  });

  it('capabilities include web_browsing, dalle, code_interpreter', () => {
    const config = generateCustomGPTConfig('instructions');
    assert.strictEqual(config.capabilities.web_browsing, true);
    assert.strictEqual(config.capabilities.dalle, true);
    assert.strictEqual(config.capabilities.code_interpreter, true);
  });

  it('conversation_starters is an array with entries', () => {
    const config = generateCustomGPTConfig('instructions');
    assert.ok(Array.isArray(config.conversation_starters));
    assert.ok(config.conversation_starters.length > 0);
  });
});

describe('generateGuardianGPTProfile', () => {
  const mockGuardian = {
    name: 'lyria',
    displayName: 'Lyria',
    gate: 'sight',
    frequency: '639 Hz',
    element: 'void',
    godbeast: 'yumiko',
    domain: 'Design, vision, intuition',
    vibe: 'The keeper of sight and vision.',
    codingStyle: ['Prefer clarity', 'Use semantic HTML'],
    helpPatterns: ['UI reviews', 'Design system questions'],
    signOff: 'Walk the Sight Gate.',
  };

  it('returns a non-empty string', () => {
    const result = generateGuardianGPTProfile(mockGuardian);
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('includes guardian display name', () => {
    const result = generateGuardianGPTProfile(mockGuardian);
    assert.ok(result.includes('Lyria'));
  });

  it('includes gate and frequency', () => {
    const result = generateGuardianGPTProfile(mockGuardian);
    assert.ok(result.includes('sight'));
    assert.ok(result.includes('639 Hz'));
  });

  it('includes domain information', () => {
    const result = generateGuardianGPTProfile(mockGuardian);
    assert.ok(result.includes('Design, vision, intuition'));
  });

  it('includes the antidote principle', () => {
    const result = generateGuardianGPTProfile(mockGuardian);
    assert.ok(result.includes('antidote'));
  });
});

// -------------------------------------------------------------------------
// Generators
// -------------------------------------------------------------------------
describe('generateChatGPTSystemPrompt', () => {
  it('returns a string for minimal level', () => {
    const result = generateChatGPTSystemPrompt('minimal');
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('returns a string for standard level', () => {
    const result = generateChatGPTSystemPrompt('standard');
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('returns a string for full level', () => {
    const result = generateChatGPTSystemPrompt('full');
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('returns a string for luminor level', () => {
    const result = generateChatGPTSystemPrompt('luminor');
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('always includes Arcanea Intelligence OS identity', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateChatGPTSystemPrompt(level);
      assert.ok(result.includes('Arcanea Intelligence OS'), `Missing identity for level: ${level}`);
    }
  });

  it('minimal level does NOT include Guardian routing section', () => {
    const result = generateChatGPTSystemPrompt('minimal');
    assert.ok(!result.includes('Lyssandria'), 'Minimal should not include Guardian names');
  });

  it('standard level includes Guardian routing section', () => {
    const result = generateChatGPTSystemPrompt('standard');
    assert.ok(result.includes('Lyssandria'));
  });

  it('full level includes lore section', () => {
    const result = generateChatGPTSystemPrompt('full');
    assert.ok(result.includes('Malachar'));
  });

  it('luminor level includes design tokens', () => {
    const result = generateChatGPTSystemPrompt('luminor');
    assert.ok(result.includes('#7fffd4'));
  });

  it('luminor level includes the Arc cycle', () => {
    const result = generateChatGPTSystemPrompt('luminor');
    assert.ok(result.includes('The Arc'));
  });

  it('luminor content is longer than minimal content', () => {
    const minimal = generateChatGPTSystemPrompt('minimal');
    const luminor = generateChatGPTSystemPrompt('luminor');
    assert.ok(luminor.length > minimal.length);
  });
});

describe('generateMainGPTConfig', () => {
  it('returns an object with filename, content, config fields', () => {
    const result = generateMainGPTConfig('standard');
    assert.ok('filename' in result);
    assert.ok('content' in result);
    assert.ok('config' in result);
  });

  it('filename is custom-gpt-config.json', () => {
    const result = generateMainGPTConfig('standard');
    assert.strictEqual(result.filename, 'custom-gpt-config.json');
  });

  it('content is valid JSON', () => {
    const result = generateMainGPTConfig('standard');
    assert.doesNotThrow(() => JSON.parse(result.content));
  });

  it('parsed JSON has instructions field with Arcanea content', () => {
    const result = generateMainGPTConfig('standard');
    const parsed = JSON.parse(result.content);
    assert.ok(typeof parsed.instructions === 'string');
    assert.ok(parsed.instructions.includes('Arcanea'));
  });
});

describe('generateGuardianGPTFile', () => {
  const mockGuardian = {
    name: 'shinkami',
    displayName: 'Shinkami',
    gate: 'source',
    frequency: '1111 Hz',
    element: 'void',
    godbeast: 'amaterasu',
    domain: 'Orchestration, meta-consciousness',
    vibe: null,
    codingStyle: null,
    helpPatterns: null,
    signOff: null,
  };

  it('returns filename, content, config', () => {
    const result = generateGuardianGPTFile(mockGuardian);
    assert.ok('filename' in result);
    assert.ok('content' in result);
    assert.ok('config' in result);
  });

  it('filename uses guardian name', () => {
    const result = generateGuardianGPTFile(mockGuardian);
    assert.ok(result.filename.includes('shinkami'));
    assert.ok(result.filename.endsWith('.json'));
  });

  it('content is valid JSON', () => {
    const result = generateGuardianGPTFile(mockGuardian);
    assert.doesNotThrow(() => JSON.parse(result.content));
  });

  it('config name includes guardian display name', () => {
    const result = generateGuardianGPTFile(mockGuardian);
    assert.ok(result.config.name.includes('Shinkami'));
  });
});

describe('generateSetupGuide', () => {
  it('returns filename and content for all levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateSetupGuide(level);
      assert.ok('filename' in result, `Missing filename for level: ${level}`);
      assert.ok('content' in result, `Missing content for level: ${level}`);
    }
  });

  it('filename is SETUP.md', () => {
    const result = generateSetupGuide('standard');
    assert.strictEqual(result.filename, 'SETUP.md');
  });

  it('content contains ChatGPT setup instructions', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('ChatGPT'));
  });

  it('full level setup guide mentions Guardian GPTs', () => {
    const result = generateSetupGuide('full');
    assert.ok(result.content.includes('Guardian GPTs'));
  });

  it('minimal level setup guide does not mention Guardian GPTs section', () => {
    const result = generateSetupGuide('minimal');
    assert.ok(!result.content.includes('Guardian GPTs — Specialized Companions'));
  });
});

// -------------------------------------------------------------------------
// Installer
// -------------------------------------------------------------------------
describe('ChatGPTOverlayInstaller', () => {
  it('can be instantiated', () => {
    const installer = new ChatGPTOverlayInstaller();
    assert.ok(installer instanceof ChatGPTOverlayInstaller);
  });

  it('canInstall resolves to true', async () => {
    const installer = new ChatGPTOverlayInstaller();
    const result = await installer.canInstall();
    assert.strictEqual(result, true);
  });

  it('getManifest returns correct provider', () => {
    const installer = new ChatGPTOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.provider, 'openai');
  });

  it('getManifest returns correct package name', () => {
    const installer = new ChatGPTOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.name, '@arcanea/overlay-chatgpt');
  });

  it('getManifest supportedLevels contains all four levels', () => {
    const installer = new ChatGPTOverlayInstaller();
    const manifest = installer.getManifest();
    assert.ok(manifest.supportedLevels.includes('minimal'));
    assert.ok(manifest.supportedLevels.includes('standard'));
    assert.ok(manifest.supportedLevels.includes('full'));
    assert.ok(manifest.supportedLevels.includes('luminor'));
  });

  it('getManifest capabilities includes system-prompt and custom-gpt', () => {
    const installer = new ChatGPTOverlayInstaller();
    const manifest = installer.getManifest();
    assert.ok(manifest.capabilities.includes('system-prompt'));
    assert.ok(manifest.capabilities.includes('custom-gpt'));
  });

  it('detect resolves to an object with provider field', async () => {
    const installer = new ChatGPTOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(typeof result, 'object');
    assert.ok('provider' in result);
    assert.strictEqual(result.provider, 'openai');
  });

  it('detect resolves detected and configPath fields', async () => {
    const installer = new ChatGPTOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.ok('detected' in result);
    assert.ok('configPath' in result);
  });

  it('preview returns filesToCreate and filesToModify arrays', async () => {
    const installer = new ChatGPTOverlayInstaller();
    const result = await installer.preview('/tmp/nonexistent-arcanea-test-dir', 'standard');
    assert.ok(Array.isArray(result.filesToCreate));
    assert.ok(Array.isArray(result.filesToModify));
  });

  it('preview estimatedSize is a string for each level', async () => {
    const installer = new ChatGPTOverlayInstaller();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = await installer.preview('/tmp/nonexistent-arcanea-test-dir', level);
      assert.strictEqual(typeof result.estimatedSize, 'string', `estimatedSize missing for ${level}`);
    }
  });
});
