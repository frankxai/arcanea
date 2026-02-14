/**
 * Environment Variable Keystore
 * Reads credentials from environment variables.
 */

import type { Keystore, ProviderType } from '@arcanea/core';
import { getAuthAdapter } from '../adapters/index.js';

export class EnvKeystore implements Keystore {
  async save(_provider: ProviderType, _credential: string): Promise<void> {
    throw new Error('Cannot save to environment variables. Set them in your shell profile.');
  }

  async load(provider: ProviderType): Promise<string | null> {
    const adapter = getAuthAdapter(provider);
    for (const envVar of adapter.envVarNames()) {
      const value = process.env[envVar];
      if (value) return value;
    }
    return null;
  }

  async delete(_provider: ProviderType): Promise<void> {
    throw new Error('Cannot delete environment variables from here.');
  }

  async list(): Promise<ProviderType[]> {
    const providers: ProviderType[] = ['claude', 'openai', 'gemini', 'copilot', 'opencode'];
    const found: ProviderType[] = [];
    for (const p of providers) {
      if (await this.load(p)) found.push(p);
    }
    return found;
  }
}
