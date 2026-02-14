/**
 * Claude/Anthropic Auth Adapter
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/core';
import { httpValidate } from '../validate.js';

export class ClaudeAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'claude';
  displayName = 'Claude (Anthropic)';

  async validate(credential: string): Promise<AuthSession> {
    const result = await httpValidate('https://api.anthropic.com/v1/models', {
      'x-api-key': credential,
      'anthropic-version': '2023-06-01',
    });

    if (!result.ok) {
      return { provider: 'claude', validated: false, models: [], capabilities: [] };
    }

    const data = result.body as { data?: Array<{ id: string }> };
    const models = data?.data?.map((m) => m.id) || [];

    return {
      provider: 'claude',
      validated: true,
      models,
      capabilities: ['chat', 'vision', 'tools', 'computer-use'],
    };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return null;
    return this.validate(key);
  }

  envVarNames(): string[] {
    return ['ANTHROPIC_API_KEY'];
  }

  getSetupUrl(): string {
    return 'https://console.anthropic.com/settings/keys';
  }
}
