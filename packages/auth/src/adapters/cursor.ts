/**
 * Cursor IDE Auth Adapter
 * Cursor is local-first — no authentication required.
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/core';

export class CursorAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'cursor';
  displayName = 'Cursor IDE';

  async validate(_credential: string): Promise<AuthSession> {
    return {
      provider: 'cursor',
      validated: true,
      models: ['local'],
      capabilities: ['chat', 'plugins', 'hooks'],
    };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    // Always valid — no auth needed
    return {
      provider: 'cursor',
      validated: true,
      models: ['local'],
      capabilities: ['chat', 'plugins', 'hooks'],
    };
  }

  envVarNames(): string[] {
    return [];
  }

  getSetupUrl(): string {
    return 'https://cursor.com';
  }
}
