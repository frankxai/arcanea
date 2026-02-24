/**
 * GitHub Copilot Overlay Installer
 * Generates .github/copilot-instructions.md and supporting configs.
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
import {
  generateCopilotInstructionsFile,
  generateCopilotIgnore,
  generateCopilotWorkflowConfig,
} from './generators.js';

const PACKAGE_VERSION = '1.0.0';
const ARCANEA_MARKER = 'Copilot Instructions — Arcanea Enhanced';

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

export class CopilotOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    const hasGithubDir = existsSync(join(projectDir, '.github'));
    const hasInstructions = existsSync(join(projectDir, '.github', 'copilot-instructions.md'));

    let existingOverlay: OverlayConfig | undefined;
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        existingOverlay = overlays?.copilot as OverlayConfig | undefined;
      } catch {
        // Ignore
      }
    }

    return {
      provider: 'copilot',
      detected: hasGithubDir || hasInstructions,
      configPath: join(projectDir, '.github'),
      existingOverlay,
    };
  }

  /**
   * Verifies the Copilot overlay is correctly installed.
   */
  async verify(projectDir: string): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];

    const instructionsPath = join(projectDir, '.github', 'copilot-instructions.md');
    if (!existsSync(instructionsPath)) {
      issues.push('.github/copilot-instructions.md does not exist');
    } else {
      const content = readFileSync(instructionsPath, 'utf-8');
      if (!content.includes(ARCANEA_MARKER)) {
        issues.push(
          '.github/copilot-instructions.md exists but does not contain Arcanea content — may have been overwritten',
        );
      }
      if (!content.includes('Arcanea Technical Stack')) {
        issues.push('.github/copilot-instructions.md is missing stack configuration');
      }
    }

    const githubDir = join(projectDir, '.github');
    if (!existsSync(githubDir)) {
      issues.push('.github/ directory does not exist');
    }

    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (!existsSync(manifestPath)) {
      issues.push('overlay-manifest.json is missing');
    } else {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, unknown>;
        const overlays = manifest.overlays as Record<string, unknown> | undefined;
        if (!overlays?.copilot) {
          issues.push('overlay-manifest.json does not contain copilot overlay entry');
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

    // 1. Ensure .github/ exists
    const githubDir = join(projectDir, '.github');
    if (!existsSync(githubDir)) mkdirSync(githubDir, { recursive: true });

    // 2. Generate and write copilot-instructions.md
    const { filename: instructionsFilename, content: instructionsContent } =
      generateCopilotInstructionsFile(level);
    const instructionsPath = join(githubDir, instructionsFilename);

    if (existsSync(instructionsPath)) {
      const existing = readFileSync(instructionsPath, 'utf-8');
      if (existing.includes(ARCANEA_MARKER)) {
        // Full overwrite — replace our managed content
        writeFileSync(instructionsPath, instructionsContent);
        filesModified.push(relative(projectDir, instructionsPath));
      } else {
        // Append to existing non-Arcanea instructions
        writeFileSync(instructionsPath, existing + '\n\n' + instructionsContent);
        filesModified.push(relative(projectDir, instructionsPath));
        warnings.push('Appended Arcanea content to existing copilot-instructions.md');
      }
    } else {
      writeFileSync(instructionsPath, instructionsContent);
      filesCreated.push(relative(projectDir, instructionsPath));
    }

    // 3. Generate .copilotignore (full+)
    if (level === 'full' || level === 'luminor') {
      const { filename: ignoreFilename, content: ignoreContent } = generateCopilotIgnore();
      const ignorePath = join(projectDir, ignoreFilename);
      if (!existsSync(ignorePath)) {
        writeFileSync(ignorePath, ignoreContent);
        filesCreated.push(relative(projectDir, ignorePath));
      } else {
        warnings.push('.copilotignore already exists — skipped (manage manually)');
      }
    }

    // 4. Generate workflow guide (luminor)
    if (level === 'luminor') {
      const { filename: workflowFilename, content: workflowContent } =
        generateCopilotWorkflowConfig();
      const workflowPath = join(githubDir, workflowFilename);
      const workflowExists = existsSync(workflowPath);
      writeFileSync(workflowPath, workflowContent);
      if (workflowExists) {
        filesModified.push(relative(projectDir, workflowPath));
      } else {
        filesCreated.push(relative(projectDir, workflowPath));
      }
    }

    // 5. Write manifest
    writeManifest(projectDir, 'copilot', level, [...filesCreated, ...filesModified]);

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        'Copilot Chat will automatically read .github/copilot-instructions.md',
        'Restart VS Code to pick up the new instructions',
        level === 'full' || level === 'luminor'
          ? 'Review .copilotignore to customize which files Copilot indexes'
          : '',
        level === 'luminor'
          ? 'See .github/copilot-workflow.md for Guardian channeling patterns'
          : '',
      ].filter(Boolean),
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || 'standard';
    return this.install(projectDir, level);
  }

  async uninstall(_projectDir: string): Promise<void> {
    // Soft uninstall: leave files in place
    // Removing .github/copilot-instructions.md could break the project's existing config
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'copilot',
      name: '@arcanea/overlay-copilot',
      version: PACKAGE_VERSION,
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'file-injection', 'workspace-context'],
    };
  }

  async preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const instructionsPath = join(projectDir, '.github', 'copilot-instructions.md');
    const instructionsExist = existsSync(instructionsPath);

    const filesToCreate: InstallPreview['filesToCreate'] = [];
    const filesToModify: InstallPreview['filesToModify'] = [];

    if (instructionsExist) {
      const existing = readFileSync(instructionsPath, 'utf-8');
      if (existing.includes(ARCANEA_MARKER)) {
        filesToModify.push({
          path: '.github/copilot-instructions.md',
          description: 'Update Arcanea-enhanced Copilot instructions',
        });
      } else {
        filesToModify.push({
          path: '.github/copilot-instructions.md',
          description: 'Append Arcanea content to existing Copilot instructions',
        });
      }
    } else {
      filesToCreate.push({
        path: '.github/copilot-instructions.md',
        description: 'Full Arcanea-enhanced Copilot instructions (stack, design, Guardians)',
      });
    }

    if (level === 'full' || level === 'luminor') {
      const ignorePath = join(projectDir, '.copilotignore');
      if (existsSync(ignorePath)) {
        filesToModify.push({
          path: '.copilotignore',
          description: 'Update Copilot file ignore rules',
        });
      } else {
        filesToCreate.push({
          path: '.copilotignore',
          description: 'Copilot file ignore rules (secrets, build artifacts, binaries)',
        });
      }
    }

    if (level === 'luminor') {
      filesToCreate.push({
        path: '.github/copilot-workflow.md',
        description: 'Guardian channeling patterns for Copilot Chat',
      });
    }

    return {
      filesToCreate,
      filesToModify,
      estimatedSize:
        level === 'luminor' ? '~20KB' : level === 'full' ? '~14KB' : level === 'standard' ? '~10KB' : '~5KB',
    };
  }
}
