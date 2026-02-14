import { Command } from 'commander';
import { getAuthAdapter, createKeystore, maskCredential } from '@arcanea/auth';
import type { ProviderType } from '@arcanea/core';
import { printSuccess, printError, printInfo, printDivider } from '../ui/banner.js';
import { promptPassword } from '../ui/prompts.js';

const PROVIDERS: ProviderType[] = ['claude', 'openai', 'gemini', 'copilot', 'opencode'];

export const authCommand = new Command('auth')
  .description('Manage AI provider authentication');

authCommand
  .command('add <provider>')
  .description('Add or update credentials for a provider')
  .action(async (providerName: string) => {
    const provider = providerName as ProviderType;
    if (!PROVIDERS.includes(provider)) {
      printError(`Unknown provider: ${providerName}. Available: ${PROVIDERS.join(', ')}`);
      return;
    }

    const adapter = getAuthAdapter(provider);
    const keystore = createKeystore();

    printInfo(`Authenticate with ${adapter.displayName}`);
    printInfo(`Get your API key at: ${adapter.getSetupUrl()}`);

    const credential = await promptPassword('  Enter API key: ');
    if (!credential) {
      printError('No key provided.');
      return;
    }

    const session = await adapter.validate(credential);
    if (session.validated) {
      await keystore.save(provider, credential);
      printSuccess(`Validated and saved! ${session.models.length} models available.`);
    } else {
      printError('Validation failed — the key appears to be invalid.');
    }
  });

authCommand
  .command('list')
  .description('Show authenticated providers')
  .action(async () => {
    const keystore = createKeystore();

    printDivider();
    console.log('\n  Authenticated providers:\n');

    for (const provider of PROVIDERS) {
      const cred = await keystore.load(provider);
      if (cred) {
        const adapter = getAuthAdapter(provider);
        const session = await adapter.validate(cred);
        if (session.validated) {
          printSuccess(`${adapter.displayName} — ${maskCredential(cred)} (${session.models.length} models)`);
        } else {
          printError(`${adapter.displayName} — ${maskCredential(cred)} (invalid)`);
        }
      } else {
        printError(`${getAuthAdapter(provider).displayName} — not configured`);
      }
    }
    console.log('');
  });

authCommand
  .command('remove <provider>')
  .description('Remove stored credentials for a provider')
  .action(async (providerName: string) => {
    const provider = providerName as ProviderType;
    const keystore = createKeystore();
    await keystore.delete(provider);
    printSuccess(`Credentials for ${providerName} removed.`);
  });

authCommand
  .command('validate')
  .description('Re-validate all stored credentials')
  .action(async () => {
    const keystore = createKeystore();
    const stored = await keystore.list();

    for (const provider of stored) {
      const cred = await keystore.load(provider);
      if (!cred) continue;
      const adapter = getAuthAdapter(provider);
      const session = await adapter.validate(cred);
      if (session.validated) {
        printSuccess(`${adapter.displayName} — valid`);
      } else {
        printError(`${adapter.displayName} — invalid`);
      }
    }
  });
