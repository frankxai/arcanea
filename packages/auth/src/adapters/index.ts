/**
 * Auth Adapter Registry
 */

import type { AuthAdapter, ProviderType } from '@arcanea/os';
import { ClaudeAuthAdapter } from './claude.js';
import { OpenAIAuthAdapter } from './openai.js';
import { GeminiAuthAdapter } from './gemini.js';
import { CopilotAuthAdapter } from './copilot.js';
import { CursorAuthAdapter } from './cursor.js';

const adapters: Record<ProviderType, AuthAdapter> = {
  claude: new ClaudeAuthAdapter(),
  openai: new OpenAIAuthAdapter(),
  gemini: new GeminiAuthAdapter(),
  copilot: new CopilotAuthAdapter(),
  cursor: new CursorAuthAdapter(),
};

export function getAuthAdapter(provider: ProviderType): AuthAdapter {
  return adapters[provider];
}

export function getAllAdapters(): AuthAdapter[] {
  return Object.values(adapters);
}

export function getAdapterByEnvVar(envVar: string): AuthAdapter | undefined {
  return Object.values(adapters).find((a) => a.envVarNames().includes(envVar));
}

export { ClaudeAuthAdapter } from './claude.js';
export { OpenAIAuthAdapter } from './openai.js';
export { GeminiAuthAdapter } from './gemini.js';
export { CopilotAuthAdapter } from './copilot.js';
export { CursorAuthAdapter } from './cursor.js';
