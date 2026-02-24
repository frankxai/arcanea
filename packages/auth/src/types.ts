/**
 * @arcanea/auth - Types
 * Re-exports core overlay types + auth-specific types.
 */

import type { ProviderType, AuthSession } from '@arcanea/core';

export type {
  ProviderType,
  AuthSession,
  AuthAdapter,
  Keystore,
} from '@arcanea/core';

export interface AuthConfig {
  providers: ProviderType[];
  keystoreBackend?: 'system' | 'encrypted-file' | 'env-only';
  encryptionKey?: string;
}

export interface ValidationResult {
  valid: boolean;
  session?: AuthSession;
  error?: string;
}

export interface KeystoreEntry {
  provider: ProviderType;
  credential: string;
  savedAt: string;
  lastValidated?: string;
}
