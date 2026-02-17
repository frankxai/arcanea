/**
 * OpenCode Auth Adapter
 * OpenCode is open-source — no authentication required.
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/os';

export class OpenCodeAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'opencode';
  displayName = 'Cursor IDE';

  async validate(_credential: string): Promise<AuthSession> {
    return {
      provider: 'opencode',
      validated: true,
      models: ['local'],
      capabilities: ['chat', 'plugins', 'hooks'],
    };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    // Always valid — no auth needed
    return {
      provider: 'opencode',
      validated: true,
      models: ['local'],
      capabilities: ['chat', 'plugins', 'hooks'],
    };
  }

  envVarNames(): string[] {
    return [];
  }

  getSetupUrl(): string {
    return 'https://opencode.ai';
  }
}
