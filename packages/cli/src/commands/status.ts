import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import pc from 'picocolors';
import { createKeystore, getAuthAdapter, maskCredential } from '@arcanea/auth';
import type { ProviderType } from '@arcanea/os';
import { printBanner, printSuccess, printError, printInfo, printDivider } from '../ui/banner.js';

const PROVIDERS: ProviderType[] = ['claude', 'openai', 'gemini', 'copilot', 'opencode'];

export const statusCommand = new Command('status')
  .description('Show Arcanea overlay status')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .action(async (options) => {
    const projectDir = options.dir as string;

    printBanner();

    // 1. Check providers
    console.log('  Providers:\n');
    const keystore = createKeystore();
    for (const provider of PROVIDERS) {
      const cred = await keystore.load(provider);
      const adapter = getAuthAdapter(provider);
      if (cred) {
        printSuccess(`${adapter.displayName.padEnd(25)} ${maskCredential(cred)}`);
      } else {
        printError(`${adapter.displayName.padEnd(25)} not configured`);
      }
    }

    // 2. Check overlays
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    console.log('\n  Overlays:\n');

    if (existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
        const overlays = manifest.overlays || {};

        if (Object.keys(overlays).length === 0) {
          printInfo('No overlays installed. Run `arcanea init` to get started.');
        } else {
          for (const [provider, config] of Object.entries(overlays) as [string, Record<string, unknown>][]) {
            let adapterDisplayName: string;
            try {
              const adapter = getAuthAdapter(provider as ProviderType);
              adapterDisplayName = adapter.displayName;
            } catch {
              adapterDisplayName = provider;
            }
            const filesCount = (config.filesManaged as string[] | undefined)?.length || 0;
            printSuccess(
              `${adapterDisplayName.padEnd(18)} ${(config.level as string).padEnd(10)} v${config.packageVersion}  (${filesCount} files)`,
            );
          }
        }
      } catch {
        printError('Could not read overlay manifest.');
      }
    } else {
      printInfo('No overlay manifest found. Run `arcanea init` to get started.');
    }

    console.log(`\n  ${pc.dim('Run `arcanea update` to check for overlay updates.')}\n`);
  });
