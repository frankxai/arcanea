import { Command } from 'commander';
import type { ProviderType, OverlayLevel } from '@arcanea/os';
import { ClaudeOverlayInstaller } from '@arcanea/overlay-claude';
import { ChatGPTOverlayInstaller } from '@arcanea/overlay-chatgpt';
import { GeminiOverlayInstaller } from '@arcanea/overlay-gemini';
import { CopilotOverlayInstaller } from '@arcanea/overlay-copilot';
import { OpenCodeOverlayInstaller } from '@arcanea/overlay-opencode';
import { printSuccess, printError, printInfo, printDivider } from '../ui/banner.js';

const INSTALLERS: Record<ProviderType, ClaudeOverlayInstaller | ChatGPTOverlayInstaller | GeminiOverlayInstaller | CopilotOverlayInstaller | OpenCodeOverlayInstaller> = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller(),
};

export const installCommand = new Command('install')
  .description('Install a specific overlay')
  .argument('<provider>', 'Provider to install (claude, openai, gemini, copilot, cursor)')
  .option('-l, --level <level>', 'Overlay level (minimal, standard, full, luminor)', 'standard')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('--dry-run', 'Preview without installing')
  .action(async (providerName: string, options: { level: string; dir: string; dryRun?: boolean }) => {
    try {
      // Accept 'cursor' as alias for 'opencode'
      const resolvedName = providerName === 'cursor' ? 'opencode' : providerName;
      const provider = resolvedName as ProviderType;
      const installer = INSTALLERS[provider];

      if (!installer) {
        printError(`Unknown provider: ${providerName}`);
        printInfo(`Available: ${Object.keys(INSTALLERS).join(', ')}`);
        process.exitCode = 1;
        return;
      }

      const level = options.level as OverlayLevel;
      const projectDir = options.dir as string;

      if (options.dryRun) {
        const preview = await installer.preview(projectDir, level);
        console.log(`\n  Preview for ${providerName} (${level}):\n`);
        for (const f of preview.filesToCreate) console.log(`  + ${f.path} — ${f.description}`);
        for (const f of preview.filesToModify) console.log(`  ~ ${f.path} — ${f.description}`);
        console.log(`\n  Estimated size: ${preview.estimatedSize}\n`);
        return;
      }

      printInfo(`Installing ${providerName} overlay (${level})...`);

      const result = await installer.install(projectDir, level);

      if (result.success) {
        printSuccess(`${providerName} overlay installed!`);
        printDivider();
        console.log('  Files created:');
        for (const f of result.filesCreated) console.log(`    + ${f}`);
        if (result.filesModified.length) {
          console.log('  Files modified:');
          for (const f of result.filesModified) console.log(`    ~ ${f}`);
        }
        console.log('\n  Next steps:');
        for (const step of result.nextSteps) printInfo(step);
        console.log('');
      } else {
        printError('Installation failed.');
        process.exitCode = 1;
      }
    } catch (err) {
      printError(`Install failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
