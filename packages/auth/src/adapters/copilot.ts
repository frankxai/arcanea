/**
 * GitHub Copilot Auth Adapter
 */

import type { AuthSession, AuthAdapter, ProviderType } from '@arcanea/core';
import { execSync } from 'node:child_process';

export class CopilotAuthAdapter implements AuthAdapter {
  provider: ProviderType = 'copilot';
  displayName = 'GitHub Copilot';

  async validate(_credential: string): Promise<AuthSession> {
    // Copilot auth is via gh CLI, not API key
    const session = await this.detectFromEnv();
    return session ?? { provider: 'copilot', validated: false, models: [], capabilities: [] };
  }

  async detectFromEnv(): Promise<AuthSession | null> {
    try {
      const output = execSync('gh auth status 2>&1', { encoding: 'utf-8', stdio: 'pipe' });
      const isLoggedIn = output.includes('Logged in');

      if (!isLoggedIn) return null;

      // Extract account info
      const accountMatch = output.match(/account\s+(\S+)/);
      const accountName = accountMatch?.[1];

      return {
        provider: 'copilot',
        validated: true,
        accountName,
        models: ['copilot'],
        capabilities: ['code-completion', 'chat', 'workspace-context'],
      };
    } catch {
      return null;
    }
  }

  envVarNames(): string[] {
    return ['GITHUB_TOKEN'];
  }

  getSetupUrl(): string {
    return 'https://github.com/features/copilot';
  }
}
