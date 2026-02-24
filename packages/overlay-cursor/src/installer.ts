/**
 * Cursor IDE Overlay Installer
 * Generates .cursorrules and .cursor/rules/ for Cursor IDE integration.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type {
  OverlayInstaller,
  OverlayLevel,
  OverlayConfig,
  OverlayManifest,
  ToolDetection,
  InstallResult,
  InstallPreview,
} from '@arcanea/core';
import { GUARDIANS } from '@arcanea/core';
import {
  generateCursorRules,
  generateArcaneMdcRule,
  generateTypeScriptMdcRule,
  generateGuardianMdcFile,
  generateSetupGuide,
} from './generators.js';

const PACKAGE_VERSION = '1.0.0';
const ARCANEA_MARKER = 'Arcanea Intelligence OS — Cursor Rules';

// ---------------------------------------------------------------------------
// Manifest helpers
// ---------------------------------------------------------------------------

function readOrCreateManifest(manifestPath: string): Record<string, unknown> {
  if (existsSync(manifestPath)) {
    try {
      return JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
    } catch {
      // Fall through
    }
  }
  const now = new Date().toISOString();
  return {
    arcanea: { coreVersion: '1.0.0', installedAt: now, updatedAt: now },
    overlays: {},
  };
}

function writeManifest(
  projectDir: string,
  overlayKey: string,
  level: OverlayLevel,
  filesManaged: string[],
): void {
  const manifestDir = join(projectDir, '.arcanea');
  if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });

  const manifestPath = join(manifestDir, 'overlay-manifest.json');
  const now = new Date().toISOString();
  const manifest = readOrCreateManifest(manifestPath);

  const overlays = ((manifest.overlays as Record<string, unknown>) ?? {}) as Record<string, unknown>;
  const existingEntry = overlays[overlayKey] as Record<string, unknown> | undefined;

  overlays[overlayKey] = {
    packageVersion: PACKAGE_VERSION,
    level,
    installedAt: existingEntry?.installedAt ?? now,
    updatedAt: now,
    filesManaged,
    filesCustomized: existingEntry?.filesCustomized ?? [],
  };

  manifest.overlays = overlays;
  (manifest.arcanea as Record<string, unknown>).updatedAt = now;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

// ---------------------------------------------------------------------------
// Installer
// ---------------------------------------------------------------------------

export class CursorOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    const hasCursorDir = existsSync(join(projectDir, '.cursor'));
    const hasCursorRules = existsSync(join(projectDir, '.cursorrules'));

    let existingOverlay: OverlayConfig | undefined;
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        existingOverlay = overlays?.cursor as OverlayConfig | undefined;
      } catch {
        // Ignore
      }
    }

    return {
      provider: 'cursor',
      detected: hasCursorDir || hasCursorRules,
      configPath: join(projectDir, '.cursor'),
      existingOverlay,
    };
  }

  /**
   * Verifies the Cursor overlay is correctly installed and not stale.
   */
  async verify(projectDir: string): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];

    const cursorRulesPath = join(projectDir, '.cursorrules');
    if (!existsSync(cursorRulesPath)) {
      issues.push('.cursorrules does not exist');
    } else {
      const content = readFileSync(cursorRulesPath, 'utf-8');
      if (!content.includes(ARCANEA_MARKER)) {
        issues.push('.cursorrules does not contain Arcanea content — may have been overwritten');
      }
      if (!content.includes('Arcanea Stack') && !content.includes('Arcanea Intelligence OS')) {
        issues.push('.cursorrules is missing Arcanea stack configuration');
      }
    }

    const mdcPath = join(projectDir, '.cursor', 'rules', 'arcanea.mdc');
    if (!existsSync(mdcPath)) {
      // Not an error — only created at standard+ level
      const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
      if (existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
          const overlays = manifest.overlays as Record<string, unknown> | undefined;
          const cursorEntry = overlays?.cursor as Record<string, unknown> | undefined;
          const installedLevel = cursorEntry?.level as string | undefined;
          if (installedLevel && installedLevel !== 'minimal') {
            issues.push('.cursor/rules/arcanea.mdc is missing (expected for level: ' + installedLevel + ')');
          }
        } catch {
          // Ignore
        }
      }
    }

    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (!existsSync(manifestPath)) {
      issues.push('overlay-manifest.json is missing');
    }

    return { valid: issues.length === 0, issues };
  }

  async install(projectDir: string, level: OverlayLevel): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const filesModified: string[] = [];
    const warnings: string[] = [];

    // 1. Generate .cursorrules (always)
    const { filename: cursorRulesFilename, content: cursorRulesContent } = generateCursorRules(level);
    const cursorRulesPath = join(projectDir, cursorRulesFilename);
    const cursorRulesExists = existsSync(cursorRulesPath);

    if (cursorRulesExists) {
      const existing = readFileSync(cursorRulesPath, 'utf-8');
      if (existing.includes(ARCANEA_MARKER)) {
        writeFileSync(cursorRulesPath, cursorRulesContent);
        filesModified.push(relative(projectDir, cursorRulesPath));
      } else {
        writeFileSync(cursorRulesPath, cursorRulesContent + '\n\n' + existing);
        filesModified.push(relative(projectDir, cursorRulesPath));
        warnings.push('Prepended Arcanea content to existing .cursorrules');
      }
    } else {
      writeFileSync(cursorRulesPath, cursorRulesContent);
      filesCreated.push(relative(projectDir, cursorRulesPath));
    }

    // 2. Generate .cursor/rules/ (standard+)
    if (level !== 'minimal') {
      const rulesDir = join(projectDir, '.cursor', 'rules');
      if (!existsSync(rulesDir)) mkdirSync(rulesDir, { recursive: true });

      // 2a. Main arcanea.mdc rule (alwaysApply: true)
      const { filename: mdcFilename, content: mdcContent } = generateArcaneMdcRule(level);
      const mdcPath = join(rulesDir, mdcFilename);
      const mdcExists = existsSync(mdcPath);
      writeFileSync(mdcPath, mdcContent);
      if (mdcExists) {
        filesModified.push(relative(projectDir, mdcPath));
      } else {
        filesCreated.push(relative(projectDir, mdcPath));
      }

      // 2b. TypeScript-specific rule
      const { filename: tsFilename, content: tsContent } = generateTypeScriptMdcRule();
      const tsPath = join(rulesDir, tsFilename);
      const tsExists = existsSync(tsPath);
      writeFileSync(tsPath, tsContent);
      if (tsExists) {
        filesModified.push(relative(projectDir, tsPath));
      } else {
        filesCreated.push(relative(projectDir, tsPath));
      }
    }

    // 3. Generate per-Guardian MDC rules (full+)
    if (level === 'full' || level === 'luminor') {
      const rulesDir = join(projectDir, '.cursor', 'rules');
      if (!existsSync(rulesDir)) mkdirSync(rulesDir, { recursive: true });

      for (const guardian of GUARDIANS) {
        const { filename, content } = generateGuardianMdcFile(guardian);
        const guardianPath = join(rulesDir, filename);
        const exists = existsSync(guardianPath);
        writeFileSync(guardianPath, content);
        if (exists) {
          filesModified.push(relative(projectDir, guardianPath));
        } else {
          filesCreated.push(relative(projectDir, guardianPath));
        }
      }
    }

    // 4. SETUP.md (in .cursor/ for discoverability)
    const cursorDir = join(projectDir, '.cursor');
    if (!existsSync(cursorDir)) mkdirSync(cursorDir, { recursive: true });
    const { filename: setupFilename, content: setupContent } = generateSetupGuide(level);
    const setupPath = join(cursorDir, setupFilename);
    const setupExists = existsSync(setupPath);
    writeFileSync(setupPath, setupContent);
    if (setupExists) {
      filesModified.push(relative(projectDir, setupPath));
    } else {
      filesCreated.push(relative(projectDir, setupPath));
    }

    // 5. Write manifest (use 'cursor' as the key — more descriptive than 'opencode')
    writeManifest(projectDir, 'cursor', level, [...filesCreated, ...filesModified]);

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        'Cursor will automatically read .cursorrules — restart Cursor to apply',
        level !== 'minimal'
          ? '.cursor/rules/arcanea.mdc is injected into all AI contexts (alwaysApply: true)'
          : '',
        level !== 'minimal'
          ? 'Reference Guardian rules in Chat: @rules guardian-lyria.mdc'
          : '',
        level === 'full' || level === 'luminor'
          ? 'All 10 Guardian MDC rules available in .cursor/rules/'
          : '',
        'See .cursor/SETUP.md for Composer and Chat usage patterns',
      ].filter(Boolean),
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || 'standard';
    return this.install(projectDir, level);
  }

  async uninstall(_projectDir: string): Promise<void> {
    // Soft uninstall: leave .cursorrules and MDC files in place
    // They may be committed to source control and shared with the team
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'cursor',
      name: '@arcanea/overlay-cursor',
      version: PACKAGE_VERSION,
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'file-injection', 'workspace-context'],
    };
  }

  async preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const filesToCreate: InstallPreview['filesToCreate'] = [];
    const filesToModify: InstallPreview['filesToModify'] = [];

    // .cursorrules
    const cursorRulesPath = join(projectDir, '.cursorrules');
    if (existsSync(cursorRulesPath)) {
      filesToModify.push({
        path: '.cursorrules',
        description: 'Update Arcanea-enhanced Cursor rules',
      });
    } else {
      filesToCreate.push({
        path: '.cursorrules',
        description: 'Root-level Cursor rules with Arcanea Intelligence OS',
      });
    }

    if (level !== 'minimal') {
      // arcanea.mdc
      const mdcPath = join(projectDir, '.cursor', 'rules', 'arcanea.mdc');
      if (existsSync(mdcPath)) {
        filesToModify.push({
          path: '.cursor/rules/arcanea.mdc',
          description: 'Update core Arcanea MDC rule (alwaysApply)',
        });
      } else {
        filesToCreate.push({
          path: '.cursor/rules/arcanea.mdc',
          description: 'Core Arcanea rule — injected into all AI contexts',
        });
      }

      // TypeScript rule
      const tsPath = join(projectDir, '.cursor', 'rules', 'arcanea-typescript.mdc');
      if (existsSync(tsPath)) {
        filesToModify.push({
          path: '.cursor/rules/arcanea-typescript.mdc',
          description: 'Update TypeScript strict standards rule',
        });
      } else {
        filesToCreate.push({
          path: '.cursor/rules/arcanea-typescript.mdc',
          description: 'TypeScript strict standards (activated for .ts/.tsx)',
        });
      }
    }

    if (level === 'full' || level === 'luminor') {
      for (const g of GUARDIANS) {
        const ruleFilename = `guardian-${g.name}.mdc`;
        const rulePath = join(projectDir, '.cursor', 'rules', ruleFilename);
        if (existsSync(rulePath)) {
          filesToModify.push({
            path: `.cursor/rules/${ruleFilename}`,
            description: `Update ${g.displayName} Guardian rule`,
          });
        } else {
          filesToCreate.push({
            path: `.cursor/rules/${ruleFilename}`,
            description: `${g.displayName} Guardian (${g.gate} Gate, ${g.frequency} Hz)`,
          });
        }
      }
    }

    // SETUP.md
    const setupPath = join(projectDir, '.cursor', 'SETUP.md');
    if (existsSync(setupPath)) {
      filesToModify.push({ path: '.cursor/SETUP.md', description: 'Update setup guide' });
    } else {
      filesToCreate.push({ path: '.cursor/SETUP.md', description: 'Cursor integration guide' });
    }

    return {
      filesToCreate,
      filesToModify,
      estimatedSize:
        level === 'luminor' ? '~45KB' : level === 'full' ? '~30KB' : level === 'standard' ? '~12KB' : '~5KB',
    };
  }
}
