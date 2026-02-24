/**
 * arcanea update — Update existing overlays to latest content
 */

import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ProviderType, OverlayLevel } from '@arcanea/core';
import { ClaudeOverlayInstaller } from '@arcanea/overlay-claude';
import { ChatGPTOverlayInstaller } from '@arcanea/overlay-chatgpt';
import { GeminiOverlayInstaller } from '@arcanea/overlay-gemini';
import { CopilotOverlayInstaller } from '@arcanea/overlay-copilot';
import { CursorOverlayInstaller } from '@arcanea/overlay-cursor';
import { printSuccess, printError, printInfo, printWarning, printDivider } from '../ui/banner.js';

const INSTALLERS: Record<string, ClaudeOverlayInstaller | ChatGPTOverlayInstaller | GeminiOverlayInstaller | CopilotOverlayInstaller | CursorOverlayInstaller> = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  cursor: new CursorOverlayInstaller(),
};

export const updateCommand = new Command('update')
  .description('Update existing Arcanea overlays to latest content')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('--dry-run', 'Preview changes without updating')
  .action(async (options: { dir: string; dryRun?: boolean }) => {
    try {
      const projectDir = options.dir;
      const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');

      if (!existsSync(manifestPath)) {
        printError('No Arcanea overlays found. Run `arcanea init` first.');
        process.exitCode = 1;
        return;
      }

      let manifest: Record<string, unknown>;
      try {
        manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      } catch {
        printError('Corrupted overlay manifest. Delete .arcanea/overlay-manifest.json and run `arcanea init` again.');
        process.exitCode = 1;
        return;
      }

      const overlays = (manifest.overlays || {}) as Record<string, { level?: string }>;
      const providers = Object.keys(overlays);

      if (providers.length === 0) {
        printWarning('No overlays installed. Run `arcanea init` to get started.');
        return;
      }

      printInfo(`Found ${providers.length} overlay(s) to update...`);
      printDivider();

      for (const providerKey of providers) {
        const overlay = overlays[providerKey];
        const level = (overlay.level as OverlayLevel) || 'standard';
        // Legacy manifests may have 'opencode' — map to 'cursor'
        const installerKey = providerKey === 'opencode' ? 'cursor' : providerKey;
        const installer = INSTALLERS[installerKey];

        if (!installer) {
          printWarning(`Unknown provider: ${providerKey} — skipping`);
          continue;
        }

        if (options.dryRun) {
          const preview = await installer.preview(projectDir, level);
          console.log(`\n  ${providerKey} (${level}):`);
          for (const f of preview.filesToCreate) console.log(`    + ${f.path}`);
          for (const f of preview.filesToModify) console.log(`    ~ ${f.path}`);
          continue;
        }

        const result = await installer.install(projectDir, level);
        if (result.success) {
          const totalFiles = result.filesCreated.length + result.filesModified.length;
          printSuccess(`${providerKey} (${level}) — ${totalFiles} files updated`);
        } else {
          printError(`Failed to update ${providerKey}`);
        }
      }

      if (!options.dryRun) {
        console.log('');
        printSuccess('All overlays updated.');
      } else {
        console.log('');
        printInfo('Dry run — no files written.');
      }
    } catch (err) {
      printError(`Update failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
