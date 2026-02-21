import { Command } from 'commander';
import pc from 'picocolors';
import { detectAllTools, type ProviderType, type OverlayLevel, type InstallResult, OVERLAY_LEVELS } from '@arcanea/os';
import { getAuthAdapter, createKeystore, maskCredential } from '@arcanea/auth';
import { ClaudeOverlayInstaller } from '@arcanea/overlay-claude';
import { ChatGPTOverlayInstaller } from '@arcanea/overlay-chatgpt';
import { GeminiOverlayInstaller } from '@arcanea/overlay-gemini';
import { CopilotOverlayInstaller } from '@arcanea/overlay-copilot';
import { OpenCodeOverlayInstaller } from '@arcanea/overlay-opencode';
import { printBanner, printSuccess, printError, printInfo, printWarning, printDivider } from '../ui/banner.js';
import { promptMultiSelect, promptSelect, promptPassword, promptConfirm } from '../ui/prompts.js';

const INSTALLERS: Record<ProviderType, ClaudeOverlayInstaller | ChatGPTOverlayInstaller | GeminiOverlayInstaller | CopilotOverlayInstaller | OpenCodeOverlayInstaller> = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller(),
};

const PROVIDER_LABELS: Record<ProviderType, string> = {
  claude: 'Claude Code',
  openai: 'ChatGPT / OpenAI',
  gemini: 'Gemini (Google)',
  copilot: 'GitHub Copilot',
  opencode: 'Cursor IDE',
};

export const initCommand = new Command('init')
  .description('Initialize Arcanea overlays in your project')
  .option('--dry-run', 'Preview changes without installing')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .action(async (options) => {
    try {
    const projectDir = options.dir as string;

    printBanner();
    console.log('  Scanning for AI tools...\n');

    // 1. Detect tools
    const detections = await detectAllTools(projectDir);

    printDivider();
    console.log('  Detected tools:\n');
    for (const d of detections) {
      const label = PROVIDER_LABELS[d.provider];
      if (d.detected) {
        printSuccess(`${label}${d.version ? ` (${d.version})` : ''}`);
      } else {
        printError(`${label} — not detected`);
      }
    }

    // 2. Select overlays
    const providers = await promptMultiSelect(
      'Select overlays to install:',
      detections.map(d => ({
        label: PROVIDER_LABELS[d.provider],
        value: d.provider,
        detected: d.detected,
      })),
    );

    if (providers.length === 0) {
      printWarning('No overlays selected. Run `arcanea init` again when ready.');
      return;
    }

    // 3. Select level + authenticate for each
    const keystore = createKeystore();
    const installPlan: Array<{ provider: ProviderType; level: OverlayLevel }> = [];

    for (const provider of providers as ProviderType[]) {
      // Select level
      const level = await promptSelect(
        `${PROVIDER_LABELS[provider]} overlay level:`,
        OVERLAY_LEVELS.map(l => ({ label: `${l.level} — ${l.description}`, value: l.level })),
      ) as OverlayLevel;

      // Authenticate
      const adapter = getAuthAdapter(provider);
      let session = await adapter.detectFromEnv();

      if (!session?.validated && provider !== 'opencode' && provider !== 'copilot') {
        printInfo(`Authenticate with ${adapter.displayName}`);
        printInfo(`Get your API key at: ${adapter.getSetupUrl()}`);
        const credential = await promptPassword(`  Enter API key: `);

        if (credential) {
          session = await adapter.validate(credential);
          if (session.validated) {
            printSuccess(`Validated! ${session.models.length} models available`);
            await keystore.save(provider, credential);
            printSuccess('Credentials saved securely');
          } else {
            printError('Validation failed — key may be invalid');
            const proceed = await promptConfirm('Install overlay anyway?', false);
            if (!proceed) continue;
          }
        }
      } else if (session?.validated) {
        printSuccess(`${adapter.displayName} — already authenticated`);
      }

      installPlan.push({ provider, level });
    }

    // 4. Preview
    printDivider();
    console.log('\n  Installation preview:\n');

    for (const plan of installPlan) {
      const installer = INSTALLERS[plan.provider];
      const preview = await installer.preview(projectDir, plan.level);
      console.log(`  ${PROVIDER_LABELS[plan.provider]} (${plan.level}):`);
      for (const f of preview.filesToCreate) {
        console.log(`    + ${f.path}`);
      }
      for (const f of preview.filesToModify) {
        console.log(`    ~ ${f.path}`);
      }
      console.log('');
    }

    if (options.dryRun) {
      printInfo('Dry run — no files written.');
      return;
    }

    // 5. Confirm
    const confirmed = await promptConfirm('Install overlays?');
    if (!confirmed) {
      printWarning('Installation cancelled.');
      return;
    }

    // 6. Install
    printDivider();
    console.log('\n  Installing...\n');

    const installResults: Array<{ provider: ProviderType; result: InstallResult }> = [];

    for (const plan of installPlan) {
      const installer = INSTALLERS[plan.provider];
      const result = await installer.install(projectDir, plan.level);
      installResults.push({ provider: plan.provider, result });

      if (result.success) {
        printSuccess(`${PROVIDER_LABELS[plan.provider]} overlay installed (${plan.level})`);
        if (result.filesCreated.length > 0) {
          printInfo(`Created ${result.filesCreated.length} files`);
        }
        for (const warning of result.warnings) {
          printWarning(warning);
        }
      } else {
        printError(`Failed to install ${PROVIDER_LABELS[plan.provider]}`);
      }
    }

    // 7. Next steps
    printDivider();
    console.log('\n  Next steps:\n');
    const shownSteps = new Set<string>();
    for (const { result } of installResults) {
      for (const step of result.nextSteps) {
        if (!shownSteps.has(step)) {
          printInfo(step);
          shownSteps.add(step);
        }
      }
    }

    console.log('');
    printSuccess('Arcanea Intelligence OS initialized.');
    console.log(`\n  ${pc.dim('Run `arcanea status` to see your installation.')}\n`);
    } catch (err) {
      printError(`Init failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
