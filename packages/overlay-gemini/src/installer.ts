/**
 * Google Gemini Overlay Installer
 * Generates system instructions and Guardian prompts for Gemini AI Studio and API.
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
} from '@arcanea/os';
import { GUARDIANS } from '@arcanea/os';
import {
  generateGeminiSystemInstruction,
  generateGuardianPromptFile,
  generateSetupGuide,
} from './generators.js';

const PACKAGE_VERSION = '1.0.0';

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

export class GeminiOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    const hasApiKey = !!(
      process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );
    const hasExistingDir = existsSync(join(projectDir, '.arcanea', 'gemini'));

    let existingOverlay: OverlayConfig | undefined;
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        existingOverlay = overlays?.gemini as OverlayConfig | undefined;
      } catch {
        // Ignore
      }
    }

    return {
      provider: 'gemini',
      detected: hasApiKey || hasExistingDir,
      configPath: join(projectDir, '.arcanea', 'gemini'),
      existingOverlay,
    };
  }

  /**
   * Verifies that a prior installation is complete and valid.
   */
  async verify(projectDir: string): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    const outDir = join(projectDir, '.arcanea', 'gemini');

    if (!existsSync(outDir)) {
      issues.push('Gemini overlay directory (.arcanea/gemini/) does not exist');
    }

    const requiredFiles = ['system-instructions.md', 'SETUP.md'];
    for (const f of requiredFiles) {
      if (!existsSync(join(outDir, f))) {
        issues.push(`Missing required file: .arcanea/gemini/${f}`);
      }
    }

    const instructionsPath = join(outDir, 'system-instructions.md');
    if (existsSync(instructionsPath)) {
      const content = readFileSync(instructionsPath, 'utf-8');
      if (!content.includes('Arcanea Intelligence OS')) {
        issues.push('system-instructions.md is missing Arcanea Identity — may be outdated');
      }
      if (!content.includes('Guardian') && !content.includes('Ten Guardians')) {
        issues.push('system-instructions.md is missing Guardian routing content');
      }
    }

    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (!existsSync(manifestPath)) {
      issues.push('overlay-manifest.json is missing');
    } else {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        if (!overlays?.gemini) {
          issues.push('overlay-manifest.json does not contain gemini overlay entry');
        }
      } catch {
        issues.push('overlay-manifest.json is not valid JSON');
      }
    }

    return { valid: issues.length === 0, issues };
  }

  async install(projectDir: string, level: OverlayLevel): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const filesModified: string[] = [];
    const warnings: string[] = [];

    const outDir = join(projectDir, '.arcanea', 'gemini');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    // 1. System instructions (always)
    const systemInstructionContent = generateGeminiSystemInstruction(level);
    const instructionPath = join(outDir, 'system-instructions.md');
    const instructionExists = existsSync(instructionPath);
    writeFileSync(instructionPath, systemInstructionContent);
    if (instructionExists) {
      filesModified.push(relative(projectDir, instructionPath));
    } else {
      filesCreated.push(relative(projectDir, instructionPath));
    }

    // 2. Guardian prompts (standard+)
    if (level !== 'minimal') {
      const guardiansDir = join(outDir, 'guardian-prompts');
      if (!existsSync(guardiansDir)) mkdirSync(guardiansDir, { recursive: true });

      for (const guardian of GUARDIANS) {
        const { filename, content } = generateGuardianPromptFile(guardian);
        const gPath = join(guardiansDir, filename);
        const exists = existsSync(gPath);
        writeFileSync(gPath, content);
        if (exists) {
          filesModified.push(relative(projectDir, gPath));
        } else {
          filesCreated.push(relative(projectDir, gPath));
        }
      }
    }

    // 3. SETUP.md (always)
    const { filename: setupFilename, content: setupContent } = generateSetupGuide(level);
    const setupPath = join(outDir, setupFilename);
    const setupExists = existsSync(setupPath);
    writeFileSync(setupPath, setupContent);
    if (setupExists) {
      filesModified.push(relative(projectDir, setupPath));
    } else {
      filesCreated.push(relative(projectDir, setupPath));
    }

    // 4. Write manifest
    writeManifest(projectDir, 'gemini', level, [...filesCreated, ...filesModified]);

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        'Paste .arcanea/gemini/system-instructions.md into Gemini AI Studio system instruction',
        level !== 'minimal'
          ? 'Use .arcanea/gemini/guardian-prompts/ for specialized Guardian interactions'
          : '',
        'See .arcanea/gemini/SETUP.md for API integration examples',
      ].filter(Boolean),
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || 'standard';
    return this.install(projectDir, level);
  }

  async uninstall(_projectDir: string): Promise<void> {
    // Soft uninstall: files are kept — users may have referenced them in AI Studio
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'gemini',
      name: '@arcanea/overlay-gemini',
      version: PACKAGE_VERSION,
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'vision', 'file-injection', 'workspace-context'],
    };
  }

  async preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      {
        path: '.arcanea/gemini/system-instructions.md',
        description: 'Full Arcanea system instruction for Gemini AI Studio',
      },
      {
        path: '.arcanea/gemini/SETUP.md',
        description: 'Setup guide with API and AI Studio integration steps',
      },
    ];

    if (level !== 'minimal') {
      for (const g of GUARDIANS) {
        files.push({
          path: `.arcanea/gemini/guardian-prompts/${g.name}.md`,
          description: `${g.displayName} system instruction (${g.gate} Gate, ${g.frequency} Hz)`,
        });
      }
    }

    const toModify: InstallPreview['filesToModify'] = [];
    const existingFiles = files.filter(f => existsSync(join(projectDir, f.path)));
    for (const f of existingFiles) {
      toModify.push({ path: f.path, description: 'Update with latest Arcanea content' });
    }

    return {
      filesToCreate: files.filter(f => !existsSync(join(projectDir, f.path))),
      filesToModify: toModify,
      estimatedSize:
        level === 'luminor' ? '~35KB' : level === 'full' ? '~20KB' : level === 'standard' ? '~15KB' : '~5KB',
    };
  }
}
