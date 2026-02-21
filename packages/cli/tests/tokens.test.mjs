/**
 * @arcanea/cli — tokens command tests
 *
 * Tests the `arcanea tokens` command for JSON, CSS, and Tailwind output formats,
 * and validates the color palette display mode.
 *
 * Run: node --test packages/cli/tests/tokens.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'dist', 'arcanea.cjs');

function run(args, opts = {}) {
  return execSync(`node "${CLI}" ${args}`, {
    encoding: 'utf-8',
    timeout: 15000,
    ...opts,
  });
}

// ============================================================
// JSON format (default)
// ============================================================

describe('CLI — tokens: JSON format (default)', () => {
  it('outputs valid JSON by default', () => {
    const output = run('tokens');
    let parsed;
    assert.doesNotThrow(() => {
      parsed = JSON.parse(output);
    }, 'Default tokens output should be valid JSON');
    assert.ok(parsed !== null && typeof parsed === 'object', 'Parsed JSON should be an object');
  });

  it('JSON output contains colors key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('colors' in parsed, 'JSON tokens should contain "colors" key');
  });

  it('JSON output contains fonts key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('fonts' in parsed, 'JSON tokens should contain "fonts" key');
  });

  it('JSON output contains fontSizes key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('fontSizes' in parsed, 'JSON tokens should contain "fontSizes" key');
  });

  it('JSON output contains spacing key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('spacing' in parsed, 'JSON tokens should contain "spacing" key');
  });

  it('JSON output contains effects key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('effects' in parsed, 'JSON tokens should contain "effects" key');
  });

  it('JSON output contains animations key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('animations' in parsed, 'JSON tokens should contain "animations" key');
  });

  it('JSON output contains breakpoints key', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok('breakpoints' in parsed, 'JSON tokens should contain "breakpoints" key');
  });

  it('tokens --format json also outputs valid JSON', () => {
    const output = run('tokens --format json');
    assert.doesNotThrow(() => JSON.parse(output), '--format json should also produce valid JSON');
  });

  it('colors.arcane.crystal is the Atlantean Teal value', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.equal(
      parsed.colors?.arcane?.crystal,
      '#7fffd4',
      'Primary Atlantean Teal should be #7fffd4',
    );
  });

  it('colors.arcane.gold is the Lumina gold value', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.equal(
      parsed.colors?.arcane?.gold,
      '#ffd700',
      'Lumina gold should be #ffd700',
    );
  });

  it('colors.cosmic.void is the darkest background', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.equal(
      parsed.colors?.cosmic?.void,
      '#0a0a0f',
      'Cosmic void should be #0a0a0f',
    );
  });

  it('fonts.display references Cinzel', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok(
      parsed.fonts?.display?.includes('Cinzel'),
      'Display font should reference Cinzel',
    );
  });

  it('fonts.body references Crimson Pro', () => {
    const output = run('tokens');
    const parsed = JSON.parse(output);
    assert.ok(
      parsed.fonts?.body?.includes('Crimson Pro'),
      'Body font should reference Crimson Pro',
    );
  });
});

// ============================================================
// CSS format
// ============================================================

describe('CLI — tokens: CSS format', () => {
  it('--format css outputs CSS custom properties block', () => {
    const output = run('tokens --format css');
    assert.ok(output.includes(':root {'), 'CSS output should start with :root {');
    assert.ok(output.includes('}'), 'CSS output should end the :root block');
  });

  it('CSS output contains --arcanea- prefixed variables', () => {
    const output = run('tokens --format css');
    assert.ok(output.includes('--arcanea-'), 'CSS output should use --arcanea- variable prefix');
  });

  it('CSS output contains crystal color variable', () => {
    const output = run('tokens --format css');
    assert.ok(output.includes('#7fffd4'), 'CSS output should include Atlantean Teal value');
  });

  it('CSS output contains cosmic-void variable', () => {
    const output = run('tokens --format css');
    assert.ok(
      output.includes('--arcanea-cosmic-void'),
      'CSS output should include --arcanea-cosmic-void',
    );
  });

  it('CSS output contains font variables', () => {
    const output = run('tokens --format css');
    assert.ok(
      output.includes('--arcanea-font-display'),
      'CSS output should include font-display variable',
    );
  });

  it('-f css shorthand also works', () => {
    const output = run('tokens -f css');
    assert.ok(output.includes(':root {'), '-f css shorthand should produce CSS output');
  });
});

// ============================================================
// Tailwind format
// ============================================================

describe('CLI — tokens: Tailwind format', () => {
  it('--format tailwind outputs valid JSON', () => {
    const output = run('tokens --format tailwind');
    assert.doesNotThrow(() => JSON.parse(output), 'Tailwind output should be valid JSON');
  });

  it('Tailwind config contains colors key', () => {
    const output = run('tokens --format tailwind');
    const parsed = JSON.parse(output);
    assert.ok('colors' in parsed, 'Tailwind config should have colors');
  });

  it('Tailwind config contains fontFamily key', () => {
    const output = run('tokens --format tailwind');
    const parsed = JSON.parse(output);
    assert.ok('fontFamily' in parsed, 'Tailwind config should have fontFamily');
  });

  it('Tailwind config contains screens key', () => {
    const output = run('tokens --format tailwind');
    const parsed = JSON.parse(output);
    assert.ok('screens' in parsed, 'Tailwind config should have screens');
  });

  it('Tailwind config colors include cosmic and arcane groups', () => {
    const output = run('tokens --format tailwind');
    const parsed = JSON.parse(output);
    assert.ok('cosmic' in parsed.colors, 'Tailwind colors should include cosmic group');
    assert.ok('arcane' in parsed.colors, 'Tailwind colors should include arcane group');
  });

  it('-f tailwind shorthand also works', () => {
    const output = run('tokens -f tailwind');
    assert.doesNotThrow(() => JSON.parse(output), '-f tailwind shorthand should produce valid JSON');
  });
});

// ============================================================
// --colors palette display
// ============================================================

describe('CLI — tokens: --colors palette display', () => {
  it('--colors outputs Arcanea Color Palette header', () => {
    const output = run('tokens --colors');
    assert.ok(output.includes('Arcanea Color Palette'), 'Should show color palette header');
  });

  it('--colors lists COSMIC group', () => {
    const output = run('tokens --colors');
    assert.ok(output.toUpperCase().includes('COSMIC'), 'Should list COSMIC color group');
  });

  it('--colors lists ARCANE group', () => {
    const output = run('tokens --colors');
    assert.ok(output.toUpperCase().includes('ARCANE'), 'Should list ARCANE color group');
  });

  it('--colors output includes hex color values', () => {
    const output = run('tokens --colors');
    assert.match(output, /#[0-9a-fA-F]{6}/, 'Should include hex color values');
  });
});
