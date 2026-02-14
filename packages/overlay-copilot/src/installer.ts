/**
 * GitHub Copilot Overlay Installer
 * Generates .github/copilot-instructions.md for Copilot Chat integration.
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
import { generateCopilotInstructions } from '@arcanea/core';

export class CopilotOverlayInstaller implements OverlayInstaller {
  async canInstall(projectDir: string): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    return {
      provider: 'copilot',
      detected: existsSync(join(projectDir, '.github')) || existsSync(join(projectDir, '.github', 'copilot-instructions.md')),
      configPath: join(projectDir, '.github'),
    };
  }

  async install(projectDir: string, level: OverlayLevel): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const filesModified: string[] = [];
    const githubDir = join(projectDir, '.github');
    if (!existsSync(githubDir)) mkdirSync(githubDir, { recursive: true });

    const content = generateCopilotInstructions(level);
    const filePath = join(githubDir, 'copilot-instructions.md');

    if (existsSync(filePath)) {
      const existing = readFileSync(filePath, 'utf-8');
      if (!existing.includes('Arcanea Enhanced')) {
        writeFileSync(filePath, existing + '\n\n' + content);
        filesModified.push(relative(projectDir, filePath));
      }
    } else {
      writeFileSync(filePath, content);
      filesCreated.push(relative(projectDir, filePath));
    }

    // 2. .copilotignore (full+)
    if (level === 'full' || level === 'luminor') {
      const copilotIgnore = `# Copilot Ignore — Arcanea Enhanced
# Prevent Copilot from indexing sensitive or irrelevant files

# Credentials and secrets
.env
.env.*
*.pem
*.key
credentials.json

# Build artifacts
dist/
build/
.next/
out/

# Dependencies
node_modules/
pnpm-lock.yaml
package-lock.json

# Arcanea internal
.arcanea/overlay-manifest.json
`;
      const ignorePath = join(projectDir, '.copilotignore');
      if (!existsSync(ignorePath)) {
        writeFileSync(ignorePath, copilotIgnore);
        filesCreated.push(relative(projectDir, ignorePath));
      }
    }

    // Update manifest
    const manifestDir = join(projectDir, '.arcanea');
    if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });
    const manifestPath = join(manifestDir, 'overlay-manifest.json');
    const now = new Date().toISOString();

    let manifest: Record<string, unknown> = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
      : { arcanea: { coreVersion: '1.0.0', installedAt: now, updatedAt: now }, overlays: {} };

    const overlays = (manifest.overlays || {}) as Record<string, unknown>;
    overlays.copilot = {
      packageVersion: '1.0.0',
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: [...filesCreated, ...filesModified],
      filesCustomized: [],
    };
    manifest.overlays = overlays;
    (manifest.arcanea as Record<string, unknown>).updatedAt = now;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings: [],
      nextSteps: ['Copilot Chat will automatically read .github/copilot-instructions.md'],
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    return this.install(projectDir, 'standard');
  }

  async uninstall(): Promise<void> {
    // No-op for now
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'copilot',
      name: '@arcanea/overlay-copilot',
      version: '1.0.0',
      supportedLevels: ['minimal', 'standard', 'full'],
      capabilities: ['system-prompt', 'file-injection', 'workspace-context'],
    };
  }

  async preview(_projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      { path: '.github/copilot-instructions.md', description: 'Arcanea-enhanced Copilot instructions' },
    ];
    if (level === 'full' || level === 'luminor') {
      files.push({ path: '.copilotignore', description: 'Copilot file ignore rules' });
    }
    return {
      filesToCreate: files,
      filesToModify: [],
      estimatedSize: '~8KB',
    };
  }
}
