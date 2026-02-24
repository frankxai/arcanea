/**
 * OpenAI/ChatGPT Auth Adapter
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/os';
import { httpValidate } from '../validate.js';

export class OpenAIAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'openai';
  displayName = 'ChatGPT (OpenAI)';

  async validate(credential: string): Promise<AuthSession> {
    const result = await httpValidate('https://api.openai.com/v1/models', {
      Authorization: `Bearer ${credential}`,
    });

    if (!result.ok) {
      return { provider: 'openai', validated: false, models: [], capabilities: [] };
    }

    const data = result.body as { data?: Array<{ id: string }> };
    const models = data?.data?.map((m) => m.id).filter((id) => id.startsWith('gpt')).slice(0, 10) || [];

    return {
      provider: 'openai',
      validated: true,
      models,
      capabilities: ['chat', 'vision', 'tools', 'assistants', 'custom-gpt'],
    };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return null;
    return this.validate(key);
  }

  envVarNames(): string[] {
    return ['OPENAI_API_KEY'];
  }

  getSetupUrl(): string {
    return 'https://platform.openai.com/api-keys';
  }
}
