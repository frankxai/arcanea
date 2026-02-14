/**
 * Google Gemini Auth Adapter
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/core';
import { httpValidate } from '../validate.js';

export class GeminiAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'gemini';
  displayName = 'Gemini (Google)';

  async validate(credential: string): Promise<AuthSession> {
    const result = await httpValidate(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${credential}`,
      {},
    );

    if (!result.ok) {
      return { provider: 'gemini', validated: false, models: [], capabilities: [] };
    }

    const data = result.body as { models?: Array<{ name: string }> };
    const models = data?.models?.map((m) => m.name.replace('models/', '')).slice(0, 10) || [];

    return {
      provider: 'gemini',
      validated: true,
      models,
      capabilities: ['chat', 'vision', 'image-generation', 'grounding'],
    };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!key) return null;
    return this.validate(key);
  }

  envVarNames(): string[] {
    return ['GEMINI_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY'];
  }

  getSetupUrl(): string {
    return 'https://aistudio.google.com/app/apikey';
  }
}
