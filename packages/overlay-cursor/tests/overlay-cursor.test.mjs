/**
 * Test suite for @arcanea/overlay-cursor
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  // Installer
  CursorOverlayInstaller,
  // Generators
  generateCursorRules,
  generateArcaneMdcRule,
  generateTypeScriptMdcRule,
  generateGuardianMdcFile,
  generateSetupGuide,
  // Templates
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  LORE_REFERENCE,
  formatMdcRule,
  generateGuardianMdcRule,
} from '../dist/index.js';

// -------------------------------------------------------------------------
// Template constants
// -------------------------------------------------------------------------
describe('VOICE_PILLARS (Cursor)', () => {
  it('is an object with four canonical keys', () => {
    assert.strictEqual(typeof VOICE_PILLARS, 'object');
    assert.ok('arcaneAuthoritative' in VOICE_PILLARS);
    assert.ok('superintelligentAccessible' in VOICE_PILLARS);
    assert.ok('universeNotPlatform' in VOICE_PILLARS);
    assert.ok('creatorSovereignty' in VOICE_PILLARS);
  });

  it('all pillar values are non-empty strings', () => {
    for (const [key, val] of Object.entries(VOICE_PILLARS)) {
      assert.strictEqual(typeof val, 'string', `${key} is not a string`);
      assert.ok(val.length > 0, `${key} is empty`);
    }
  });

  it('arcaneAuthoritative is accessible and warm', () => {
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.toLowerCase().includes('accessible'));
    assert.ok(VOICE_PILLARS.arcaneAuthoritative.toLowerCase().includes('warm'));
  });
});

describe('ANTIDOTE_PRINCIPLE (Cursor)', () => {
  it('is a non-empty string with canonical quote', () => {
    assert.strictEqual(typeof ANTIDOTE_PRINCIPLE, 'string');
    assert.ok(ANTIDOTE_PRINCIPLE.includes('antidote'));
    assert.ok(ANTIDOTE_PRINCIPLE.includes('terrible future'));
  });
});

describe('GUARDIAN_REFERENCE (Cursor)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof GUARDIAN_REFERENCE, 'string');
    assert.ok(GUARDIAN_REFERENCE.length > 0);
  });

  it('contains all 10 Guardians by name', () => {
    const names = ['Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera', 'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami'];
    for (const name of names) {
      assert.ok(GUARDIAN_REFERENCE.includes(name), `Missing Guardian: ${name}`);
    }
  });

  it('lists gate names including Foundation and Source', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('Foundation'));
    assert.ok(GUARDIAN_REFERENCE.includes('Source'));
  });

  it('contains all five canonical elements', () => {
    assert.ok(GUARDIAN_REFERENCE.includes('Earth'));
    assert.ok(GUARDIAN_REFERENCE.includes('Water'));
    assert.ok(GUARDIAN_REFERENCE.includes('Fire'));
    assert.ok(GUARDIAN_REFERENCE.includes('Wind'));
    assert.ok(GUARDIAN_REFERENCE.includes('Void'));
  });
});

describe('ARCANEA_STACK (Cursor)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof ARCANEA_STACK, 'string');
    assert.ok(ARCANEA_STACK.length > 0);
  });

  it('references Next.js 16+', () => {
    assert.ok(ARCANEA_STACK.includes('Next.js 16'));
  });

  it('references TypeScript strict mode', () => {
    assert.ok(ARCANEA_STACK.includes('TypeScript'));
    assert.ok(ARCANEA_STACK.includes('strict'));
  });

  it('references Supabase with RLS requirement', () => {
    assert.ok(ARCANEA_STACK.includes('Supabase'));
    assert.ok(ARCANEA_STACK.includes('RLS'));
  });

  it('references AI Gateway model pattern', () => {
    assert.ok(ARCANEA_STACK.includes('provider/model') || ARCANEA_STACK.includes('Vercel AI'));
  });

  it('mentions Server Components rule', () => {
    assert.ok(ARCANEA_STACK.includes('Server Components') || ARCANEA_STACK.includes("'use client'"));
  });
});

describe('DESIGN_TOKENS (Cursor)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof DESIGN_TOKENS, 'string');
    assert.ok(DESIGN_TOKENS.length > 0);
  });

  it('contains the four canonical arcane color hex values', () => {
    assert.ok(DESIGN_TOKENS.includes('#7fffd4'));
    assert.ok(DESIGN_TOKENS.includes('#ffd700'));
    assert.ok(DESIGN_TOKENS.includes('#a855f7'));
    assert.ok(DESIGN_TOKENS.includes('#0a0a0f'));
  });

  it('defines cosmic palette entries', () => {
    assert.ok(DESIGN_TOKENS.includes('Cosmic'));
    assert.ok(DESIGN_TOKENS.includes('surface'));
  });

  it('references typography fonts', () => {
    assert.ok(DESIGN_TOKENS.includes('Cinzel'));
    assert.ok(DESIGN_TOKENS.includes('Inter'));
  });
});

describe('LORE_REFERENCE (Cursor)', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof LORE_REFERENCE, 'string');
    assert.ok(LORE_REFERENCE.length > 0);
  });

  it('contains Lumina and Nero with correct characterization', () => {
    assert.ok(LORE_REFERENCE.includes('Lumina'));
    assert.ok(LORE_REFERENCE.includes('Nero'));
    assert.ok(LORE_REFERENCE.includes('NOT evil'));
  });

  it('lists all five elements', () => {
    assert.ok(LORE_REFERENCE.includes('Fire'));
    assert.ok(LORE_REFERENCE.includes('Water'));
    assert.ok(LORE_REFERENCE.includes('Earth'));
    assert.ok(LORE_REFERENCE.includes('Wind'));
    assert.ok(LORE_REFERENCE.includes('Void'));
  });

  it('lists key lore concepts', () => {
    assert.ok(LORE_REFERENCE.includes('Guardian'));
    assert.ok(LORE_REFERENCE.includes('Ten Gates'));
    assert.ok(LORE_REFERENCE.includes('Magic Ranks'));
  });

  it('describes the Arc cycle', () => {
    assert.ok(LORE_REFERENCE.includes('Arc'));
    assert.ok(LORE_REFERENCE.includes('Potential'));
  });
});

// -------------------------------------------------------------------------
// Template functions
// -------------------------------------------------------------------------
describe('formatMdcRule', () => {
  it('returns a string with YAML frontmatter', () => {
    const rule = {
      filename: 'test.mdc',
      description: 'Test rule',
      globs: ['**/*.ts'],
      alwaysApply: false,
      body: 'Test body',
    };
    const result = formatMdcRule(rule);
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.startsWith('---'));
  });

  it('includes description in frontmatter', () => {
    const rule = {
      filename: 'test.mdc',
      description: 'My description',
      globs: [],
      alwaysApply: true,
      body: 'Body text',
    };
    const result = formatMdcRule(rule);
    assert.ok(result.includes('description: My description'));
  });

  it('includes alwaysApply in frontmatter', () => {
    const rule = {
      filename: 'test.mdc',
      description: 'Test',
      globs: [],
      alwaysApply: true,
      body: 'Body',
    };
    const result = formatMdcRule(rule);
    assert.ok(result.includes('alwaysApply: true'));
  });

  it('formats globs correctly when non-empty', () => {
    const rule = {
      filename: 'test.mdc',
      description: 'Test',
      globs: ['**/*.ts', '**/*.tsx'],
      alwaysApply: false,
      body: 'Body',
    };
    const result = formatMdcRule(rule);
    assert.ok(result.includes('globs:'));
    assert.ok(result.includes('**/*.ts'));
  });

  it('includes body content after frontmatter', () => {
    const rule = {
      filename: 'test.mdc',
      description: 'Test',
      globs: [],
      alwaysApply: false,
      body: 'My unique body content',
    };
    const result = formatMdcRule(rule);
    assert.ok(result.includes('My unique body content'));
  });
});

describe('generateGuardianMdcRule', () => {
  const mockGuardian = {
    name: 'ino',
    displayName: 'Ino',
    gate: 'unity',
    frequency: '963 Hz',
    element: 'earth',
    godbeast: 'kyuro',
    domain: 'Collaboration, partnerships, integration',
    vibe: 'The weaver of connections and partnerships.',
    codingStyle: ['Design for interoperability', 'Document integrations clearly'],
    helpPatterns: ['Third-party API questions', 'Collaboration features'],
    signOff: 'Walk the Unity Gate.',
  };

  it('returns an object with filename, description, globs, alwaysApply, body', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.ok('filename' in result);
    assert.ok('description' in result);
    assert.ok('globs' in result);
    assert.ok('alwaysApply' in result);
    assert.ok('body' in result);
  });

  it('filename follows guardian-{name}.mdc pattern', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.strictEqual(result.filename, 'guardian-ino.mdc');
  });

  it('description includes guardian name and gate', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.ok(result.description.includes('Ino'));
    assert.ok(result.description.includes('unity') || result.description.includes('Unity'));
  });

  it('alwaysApply is false for guardian rules', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.strictEqual(result.alwaysApply, false);
  });

  it('body contains gate and frequency', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.ok(result.body.includes('963 Hz'));
  });

  it('body includes domain information', () => {
    const result = generateGuardianMdcRule(mockGuardian);
    assert.ok(result.body.includes('Collaboration'));
  });
});

// -------------------------------------------------------------------------
// Generators
// -------------------------------------------------------------------------
describe('generateCursorRules', () => {
  it('returns filename and content for all levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateCursorRules(level);
      assert.ok('filename' in result, `Missing filename for ${level}`);
      assert.ok('content' in result, `Missing content for ${level}`);
    }
  });

  it('filename is .cursorrules', () => {
    const result = generateCursorRules('standard');
    assert.strictEqual(result.filename, '.cursorrules');
  });

  it('content always includes Arcanea Intelligence OS marker', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateCursorRules(level);
      assert.ok(result.content.includes('Arcanea Intelligence OS'), `Missing marker for ${level}`);
    }
  });

  it('content always includes the stack and design tokens', () => {
    const result = generateCursorRules('minimal');
    assert.ok(result.content.includes('Next.js'));
    assert.ok(result.content.includes('#7fffd4'));
  });

  it('minimal level does NOT include Guardian routing table', () => {
    const result = generateCursorRules('minimal');
    assert.ok(!result.content.includes('Lyssandria'));
  });

  it('standard level includes Guardian routing table', () => {
    const result = generateCursorRules('standard');
    assert.ok(result.content.includes('Lyssandria'));
    assert.ok(result.content.includes('Shinkami'));
  });

  it('full level includes lore reference', () => {
    const result = generateCursorRules('full');
    assert.ok(result.content.includes('Malachar') || result.content.includes('Nero is NOT evil'));
  });

  it('luminor level includes extended code principles', () => {
    const result = generateCursorRules('luminor');
    assert.ok(result.content.includes('Luminor-Level Code Principles'));
  });

  it('luminor level includes Hundred-Year Code principle', () => {
    const result = generateCursorRules('luminor');
    assert.ok(result.content.includes('Hundred-Year'));
  });

  it('luminor content is longer than minimal content', () => {
    const minimal = generateCursorRules('minimal');
    const luminor = generateCursorRules('luminor');
    assert.ok(luminor.content.length > minimal.content.length);
  });
});

describe('generateArcaneMdcRule', () => {
  it('returns filename and content', () => {
    const result = generateArcaneMdcRule('standard');
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename is arcanea.mdc', () => {
    const result = generateArcaneMdcRule('standard');
    assert.strictEqual(result.filename, 'arcanea.mdc');
  });

  it('content begins with MDC frontmatter dashes', () => {
    const result = generateArcaneMdcRule('standard');
    assert.ok(result.content.startsWith('---'));
  });

  it('content has alwaysApply true', () => {
    const result = generateArcaneMdcRule('standard');
    assert.ok(result.content.includes('alwaysApply: true'));
  });

  it('content includes Arcanea stack reference', () => {
    const result = generateArcaneMdcRule('standard');
    assert.ok(result.content.includes('Next.js'));
  });

  it('standard level includes Guardian reference in body', () => {
    const result = generateArcaneMdcRule('standard');
    assert.ok(result.content.includes('Lyssandria'));
  });
});

describe('generateTypeScriptMdcRule', () => {
  it('returns filename and content', () => {
    const result = generateTypeScriptMdcRule();
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename is arcanea-typescript.mdc', () => {
    const result = generateTypeScriptMdcRule();
    assert.strictEqual(result.filename, 'arcanea-typescript.mdc');
  });

  it('content has globs for ts and tsx files', () => {
    const result = generateTypeScriptMdcRule();
    assert.ok(result.content.includes('**/*.ts'));
    assert.ok(result.content.includes('**/*.tsx'));
  });

  it('content includes TypeScript strict mode examples', () => {
    const result = generateTypeScriptMdcRule();
    assert.ok(result.content.includes('strict'));
    assert.ok(result.content.includes('interface'));
  });

  it('content includes Supabase query pattern', () => {
    const result = generateTypeScriptMdcRule();
    assert.ok(result.content.includes('supabase'));
  });

  it('content includes Zod validation example', () => {
    const result = generateTypeScriptMdcRule();
    assert.ok(result.content.includes('Zod') || result.content.includes('z.object'));
  });
});

describe('generateGuardianMdcFile', () => {
  const mockGuardian = {
    name: 'elara',
    displayName: 'Elara',
    gate: 'shift',
    frequency: '1111 Hz',
    element: 'wind',
    godbeast: 'thessara',
    domain: 'Perspective shifts, refactoring, transformation',
    vibe: null,
    codingStyle: null,
    helpPatterns: null,
    signOff: null,
  };

  it('returns filename and content', () => {
    const result = generateGuardianMdcFile(mockGuardian);
    assert.ok('filename' in result);
    assert.ok('content' in result);
  });

  it('filename uses guardian-{name}.mdc pattern', () => {
    const result = generateGuardianMdcFile(mockGuardian);
    assert.strictEqual(result.filename, 'guardian-elara.mdc');
  });

  it('content is valid MDC (starts with frontmatter)', () => {
    const result = generateGuardianMdcFile(mockGuardian);
    assert.ok(result.content.startsWith('---'));
  });

  it('content includes guardian name', () => {
    const result = generateGuardianMdcFile(mockGuardian);
    assert.ok(result.content.includes('Elara'));
  });

  it('content includes frequency', () => {
    const result = generateGuardianMdcFile(mockGuardian);
    assert.ok(result.content.includes('1111 Hz'));
  });
});

describe('generateSetupGuide (Cursor)', () => {
  it('returns filename and content for all levels', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateSetupGuide(level);
      assert.ok('filename' in result);
      assert.ok('content' in result);
    }
  });

  it('filename is SETUP.md', () => {
    const result = generateSetupGuide('standard');
    assert.strictEqual(result.filename, 'SETUP.md');
  });

  it('content references Cursor IDE', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('Cursor'));
  });

  it('standard level includes Guardian quick reference table', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('guardian-lyssandria.mdc') || result.content.includes('Lyssandria'));
  });

  it('content explains how to activate rules in Cursor Chat', () => {
    const result = generateSetupGuide('standard');
    assert.ok(result.content.includes('@rules'));
  });
});

// -------------------------------------------------------------------------
// Installer
// -------------------------------------------------------------------------
describe('CursorOverlayInstaller', () => {
  it('can be instantiated', () => {
    const installer = new CursorOverlayInstaller();
    assert.ok(installer instanceof CursorOverlayInstaller);
  });

  it('canInstall resolves to true', async () => {
    const installer = new CursorOverlayInstaller();
    const result = await installer.canInstall();
    assert.strictEqual(result, true);
  });

  it('getManifest returns provider cursor', () => {
    const installer = new CursorOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.provider, 'cursor');
  });

  it('getManifest returns correct package name', () => {
    const installer = new CursorOverlayInstaller();
    const manifest = installer.getManifest();
    assert.strictEqual(manifest.name, '@arcanea/overlay-cursor');
  });

  it('getManifest has all four supported levels', () => {
    const installer = new CursorOverlayInstaller();
    const manifest = installer.getManifest();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      assert.ok(manifest.supportedLevels.includes(level));
    }
  });

  it('getManifest capabilities includes system-prompt, file-injection, workspace-context', () => {
    const installer = new CursorOverlayInstaller();
    const manifest = installer.getManifest();
    assert.ok(manifest.capabilities.includes('system-prompt'));
    assert.ok(manifest.capabilities.includes('file-injection'));
    assert.ok(manifest.capabilities.includes('workspace-context'));
  });

  it('detect resolves with provider cursor', async () => {
    const installer = new CursorOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(result.provider, 'cursor');
  });

  it('detect returns detected boolean and configPath', async () => {
    const installer = new CursorOverlayInstaller();
    const result = await installer.detect('/tmp');
    assert.strictEqual(typeof result.detected, 'boolean');
    assert.ok('configPath' in result);
  });

  it('preview returns filesToCreate and filesToModify arrays', async () => {
    const installer = new CursorOverlayInstaller();
    const result = await installer.preview('/tmp/nonexistent-arcanea-cursor', 'standard');
    assert.ok(Array.isArray(result.filesToCreate));
    assert.ok(Array.isArray(result.filesToModify));
  });

  it('preview estimatedSize is a string for each level', async () => {
    const installer = new CursorOverlayInstaller();
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = await installer.preview('/tmp/nonexistent-arcanea-cursor', level);
      assert.strictEqual(typeof result.estimatedSize, 'string');
    }
  });

  it('verify returns valid false and non-empty issues for nonexistent dir', async () => {
    const installer = new CursorOverlayInstaller();
    const result = await installer.verify('/tmp/nonexistent-arcanea-cursor-verify');
    assert.strictEqual(typeof result.valid, 'boolean');
    assert.ok(Array.isArray(result.issues));
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.length > 0);
  });
});
