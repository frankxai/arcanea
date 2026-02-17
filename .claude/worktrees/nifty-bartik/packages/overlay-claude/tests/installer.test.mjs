/**
 * @arcanea/overlay-claude — Installer tests
 * Run: node --test packages/overlay-claude/tests/installer.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const { ClaudeOverlayInstaller } = await import('../dist/installer.js');

let installer;
let tmpDir;

function freshDir() {
  return mkdtempSync(join(tmpdir(), 'arcanea-test-'));
}

before(() => {
  installer = new ClaudeOverlayInstaller();
});

describe('ClaudeOverlayInstaller', () => {
  describe('canInstall', () => {
    it('should always return true', async () => {
      const dir = freshDir();
      try {
        const result = await installer.canInstall(dir);
        assert.equal(result, true);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });

  describe('getManifest', () => {
    it('should return correct manifest', () => {
      const manifest = installer.getManifest();
      assert.equal(manifest.provider, 'claude');
      assert.ok(manifest.supportedLevels.includes('minimal'));
      assert.ok(manifest.supportedLevels.includes('luminor'));
      assert.ok(manifest.capabilities.includes('skills'));
      assert.ok(manifest.capabilities.includes('agents'));
    });
  });

  describe('install — minimal', () => {
    let dir, result;

    before(async () => {
      dir = freshDir();
      result = await installer.install(dir, 'minimal');
    });

    after(() => rmSync(dir, { recursive: true, force: true }));

    it('should succeed', () => {
      assert.equal(result.success, true);
    });

    it('should create CLAUDE.md', () => {
      assert.ok(existsSync(join(dir, '.claude', 'CLAUDE.md')));
    });

    it('should create manifest', () => {
      assert.ok(existsSync(join(dir, '.arcanea', 'overlay-manifest.json')));
    });

    it('should NOT create skills directory content', () => {
      const skillsDir = join(dir, '.claude', 'skills');
      if (existsSync(skillsDir)) {
        const files = readdirSync(skillsDir);
        assert.equal(files.length, 0, 'Minimal should not install skills');
      }
    });

    it('should NOT create agents', () => {
      const agentsDir = join(dir, '.claude', 'agents');
      assert.ok(!existsSync(agentsDir), 'Minimal should not create agents dir');
    });

    it('manifest should record level as minimal', () => {
      const manifest = JSON.parse(readFileSync(join(dir, '.arcanea', 'overlay-manifest.json'), 'utf-8'));
      assert.equal(manifest.overlays.claude.level, 'minimal');
    });
  });

  describe('install — standard', () => {
    let dir, result;

    before(async () => {
      dir = freshDir();
      result = await installer.install(dir, 'standard');
    });

    after(() => rmSync(dir, { recursive: true, force: true }));

    it('should succeed', () => {
      assert.equal(result.success, true);
    });

    it('should create 4 skill files', () => {
      const skillsDir = join(dir, '.claude', 'skills');
      assert.ok(existsSync(skillsDir));
      const files = readdirSync(skillsDir).filter(f => f.endsWith('.md'));
      assert.equal(files.length, 4, `Expected 4 skills, got: ${files}`);
    });

    it('should create 10 Guardian agent files', () => {
      const agentsDir = join(dir, '.claude', 'agents', 'guardians');
      assert.ok(existsSync(agentsDir));
      const files = readdirSync(agentsDir).filter(f => f.endsWith('.md'));
      assert.equal(files.length, 10, `Expected 10 agents, got: ${files}`);
    });

    it('should NOT create commands (standard level)', () => {
      const cmdsDir = join(dir, '.claude', 'commands');
      assert.ok(!existsSync(cmdsDir), 'Standard should not create commands');
    });

    it('should have correct file count', () => {
      const total = result.filesCreated.length + result.filesModified.length;
      assert.ok(total >= 15, `Expected at least 15 files, got ${total}`);
    });
  });

  describe('install — full', () => {
    let dir, result;

    before(async () => {
      dir = freshDir();
      result = await installer.install(dir, 'full');
    });

    after(() => rmSync(dir, { recursive: true, force: true }));

    it('should create commands', () => {
      const cmdsDir = join(dir, '.claude', 'commands');
      assert.ok(existsSync(cmdsDir));
      const files = readdirSync(cmdsDir).filter(f => f.endsWith('.md'));
      assert.ok(files.length >= 2, `Expected at least 2 commands, got: ${files}`);
    });

    it('skill content should be deeper than standard', () => {
      const skillContent = readFileSync(join(dir, '.claude', 'skills', 'arcanea-canon.md'), 'utf-8');
      const lines = skillContent.split('\n').length;
      assert.ok(lines > 30, `Full skill should have >30 lines, got ${lines}`);
    });
  });

  describe('install — luminor', () => {
    let dir, result;

    before(async () => {
      dir = freshDir();
      result = await installer.install(dir, 'luminor');
    });

    after(() => rmSync(dir, { recursive: true, force: true }));

    it('skill content should be the deepest', () => {
      const skillContent = readFileSync(join(dir, '.claude', 'skills', 'arcanea-canon.md'), 'utf-8');
      const lines = skillContent.split('\n').length;
      assert.ok(lines > 60, `Luminor skill should have >60 lines, got ${lines}`);
    });

    it('should create lore directory', () => {
      const loreDir = join(dir, '.claude', 'lore');
      assert.ok(existsSync(loreDir), 'Luminor should create lore directory');
    });
  });

  describe('detect', () => {
    it('should detect installed overlay via manifest', async () => {
      const dir = freshDir();
      try {
        await installer.install(dir, 'standard');
        const detection = await installer.detect(dir);
        assert.equal(detection.detected, true);
        assert.ok(detection.existingOverlay);
        assert.equal(detection.existingOverlay.level, 'standard');
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });

    it('should not detect in empty directory', async () => {
      const dir = freshDir();
      try {
        const detection = await installer.detect(dir);
        assert.equal(detection.detected, false);
        assert.equal(detection.existingOverlay, undefined);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });

  describe('preview', () => {
    it('should list expected files for standard level', async () => {
      const dir = freshDir();
      try {
        const preview = await installer.preview(dir, 'standard');
        assert.ok(preview.filesToCreate.length >= 15);
        const paths = preview.filesToCreate.map(f => f.path);
        assert.ok(paths.some(p => p.includes('CLAUDE.md')));
        assert.ok(paths.some(p => p.includes('arcanea-canon')));
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });

  describe('idempotency', () => {
    it('should not duplicate files on second install', async () => {
      const dir = freshDir();
      try {
        const first = await installer.install(dir, 'standard');
        const second = await installer.install(dir, 'standard');
        // Second install should create 0 new files (only manifest gets overwritten)
        assert.ok(second.filesCreated.length <= 1,
          `Second install should not create new files, created: ${second.filesCreated}`);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });
});
