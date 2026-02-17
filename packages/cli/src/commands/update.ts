/**
 * arcanea update — Update existing overlays to latest content
 */

import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ProviderType, OverlayLevel } from '@arcanea/os';
import { ClaudeOverlayInstaller } from '@arcanea/overlay-claude';
import { ChatGPTOverlayInstaller } from '@arcanea/overlay-chatgpt';
import { GeminiOverlayInstaller } from '@arcanea/overlay-gemini';
import { CopilotOverlayInstaller } from '@arcanea/overlay-copilot';
import { OpenCodeOverlayInstaller } from '@arcanea/overlay-opencode';
import { printSuccess, printError, printInfo, printWarning, printDivider } from '../ui/banner.js';

const INSTALLERS: Record<string, ClaudeOverlayInstaller | ChatGPTOverlayInstaller | GeminiOverlayInstaller | CopilotOverlayInstaller | OpenCodeOverlayInstaller> = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller(),
};

export const updateCommand = new Command('update')
  .description('Update existing Arcanea overlays to latest content')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('--dry-run', 'Preview changes without updating')
  .action(async (options: { dir: string; dryRun?: boolean }) => {
    const projectDir = options.dir;
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');

    if (!existsSync(manifestPath)) {
      printError('No Arcanea overlays found. Run `arcanea init` first.');
      return;
    }

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    const overlays = manifest.overlays || {};
    const providers = Object.keys(overlays);

    if (providers.length === 0) {
      printWarning('No overlays installed. Run `arcanea init` to get started.');
      return;
    }

    printInfo(`Found ${providers.length} overlay(s) to update...`);
    printDivider();

    for (const providerKey of providers) {
      const overlay = overlays[providerKey];
      const level = overlay.level as OverlayLevel || 'standard';
      // Map 'cursor' manifest key back to 'opencode' installer key
      const installerKey = providerKey === 'cursor' ? 'opencode' : providerKey;
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
  });
