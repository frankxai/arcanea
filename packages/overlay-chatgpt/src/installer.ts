/**
 * ChatGPT / OpenAI Overlay Installer
 * Generates Custom GPT configs and system prompts for OpenAI integration.
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
  generateChatGPTSystemPrompt,
  generateMainGPTConfig,
  generateGuardianGPTFile,
  generateSetupGuide,
} from './generators.js';

const PACKAGE_VERSION = '1.0.0';

// ---------------------------------------------------------------------------
// Manifest helpers (shared pattern across all overlays)
// ---------------------------------------------------------------------------

function readOrCreateManifest(manifestPath: string): Record<string, unknown> {
  if (existsSync(manifestPath)) {
    try {
      return JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
    } catch {
      // Fall through to create fresh
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

  const overlays = ((manifest.overlays as Record<string, unknown>) || {}) as Record<string, unknown>;
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

export class ChatGPTOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    const hasApiKey = !!(process.env.OPENAI_API_KEY);
    const hasExistingDir = existsSync(join(projectDir, '.arcanea', 'chatgpt'));

    let existingOverlay: OverlayConfig | undefined;
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        existingOverlay = overlays?.openai as OverlayConfig | undefined;
      } catch {
        // Ignore
      }
    }

    return {
      provider: 'openai',
      detected: hasApiKey || hasExistingDir,
      configPath: join(projectDir, '.arcanea', 'chatgpt'),
      existingOverlay,
    };
  }

  /**
   * Verifies that a prior installation is complete and valid.
   */
  async verify(projectDir: string): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    const outDir = join(projectDir, '.arcanea', 'chatgpt');

    if (!existsSync(outDir)) {
      issues.push('ChatGPT overlay directory (.arcanea/chatgpt/) does not exist');
    }

    const requiredFiles = ['system-prompt.md', 'SETUP.md'];
    for (const f of requiredFiles) {
      if (!existsSync(join(outDir, f))) {
        issues.push(`Missing required file: .arcanea/chatgpt/${f}`);
      }
    }

    // Check system-prompt contains Arcanea Identity marker
    const promptPath = join(outDir, 'system-prompt.md');
    if (existsSync(promptPath)) {
      const content = readFileSync(promptPath, 'utf-8');
      if (!content.includes('Arcanea Intelligence OS')) {
        issues.push('system-prompt.md does not contain Arcanea Intelligence OS content — may be outdated');
      }
      if (!content.includes('Ten Guardians') && !content.includes('Guardian')) {
        issues.push('system-prompt.md is missing Guardian routing content');
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

    const outDir = join(projectDir, '.arcanea', 'chatgpt');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    // 1. System prompt (always)
    const systemPromptContent = generateChatGPTSystemPrompt(level);
    const promptPath = join(outDir, 'system-prompt.md');
    const promptExists = existsSync(promptPath);
    writeFileSync(promptPath, systemPromptContent);
    if (promptExists) {
      filesModified.push(relative(projectDir, promptPath));
    } else {
      filesCreated.push(relative(projectDir, promptPath));
    }

    // 2. Custom GPT config JSON (standard+)
    if (level !== 'minimal') {
      const { filename, content } = generateMainGPTConfig(level);
      const configPath = join(outDir, filename);
      const configExists = existsSync(configPath);
      writeFileSync(configPath, content);
      if (configExists) {
        filesModified.push(relative(projectDir, configPath));
      } else {
        filesCreated.push(relative(projectDir, configPath));
      }
    }

    // 3. Guardian GPTs (full+)
    if (level === 'full' || level === 'luminor') {
      const guardiansDir = join(outDir, 'guardian-gpts');
      if (!existsSync(guardiansDir)) mkdirSync(guardiansDir, { recursive: true });

      for (const guardian of GUARDIANS) {
        const { filename, content } = generateGuardianGPTFile(guardian);
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

    // 4. SETUP.md (always)
    const { filename: setupFilename, content: setupContent } = generateSetupGuide(level);
    const setupPath = join(outDir, setupFilename);
    const setupExists = existsSync(setupPath);
    writeFileSync(setupPath, setupContent);
    if (setupExists) {
      filesModified.push(relative(projectDir, setupPath));
    } else {
      filesCreated.push(relative(projectDir, setupPath));
    }

    // 5. Write manifest
    writeManifest(projectDir, 'openai', level, [...filesCreated, ...filesModified]);

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        'Copy .arcanea/chatgpt/system-prompt.md to ChatGPT Custom Instructions',
        level !== 'minimal'
          ? 'Import .arcanea/chatgpt/custom-gpt-config.json to create a Custom GPT'
          : '',
        level === 'full' || level === 'luminor'
          ? 'Create individual Guardian GPTs from .arcanea/chatgpt/guardian-gpts/'
          : '',
        'See .arcanea/chatgpt/SETUP.md for detailed integration steps',
      ].filter(Boolean),
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || 'standard';
    return this.install(projectDir, level);
  }

  async uninstall(_projectDir: string): Promise<void> {
    // Soft uninstall: remove from manifest only, do not delete generated files
    // Users may have manually edited the configs
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'openai',
      name: '@arcanea/overlay-chatgpt',
      version: PACKAGE_VERSION,
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'custom-gpt', 'assistants-api', 'vision'],
    };
  }

  async preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      { path: '.arcanea/chatgpt/system-prompt.md', description: 'Full Arcanea system prompt for ChatGPT' },
      { path: '.arcanea/chatgpt/SETUP.md', description: 'Step-by-step integration guide' },
    ];

    if (level !== 'minimal') {
      files.push({
        path: '.arcanea/chatgpt/custom-gpt-config.json',
        description: 'Ready-to-import Custom GPT configuration',
      });
    }

    if (level === 'full' || level === 'luminor') {
      for (const g of GUARDIANS) {
        files.push({
          path: `.arcanea/chatgpt/guardian-gpts/${g.name}.json`,
          description: `${g.displayName} Guardian GPT (${g.gate} Gate, ${g.frequency} Hz)`,
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
        level === 'luminor' ? '~40KB' : level === 'full' ? '~25KB' : level === 'standard' ? '~12KB' : '~5KB',
    };
  }
}
