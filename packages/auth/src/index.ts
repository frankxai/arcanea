/**
 * @arcanea/auth
 * Universal AI provider authentication for the Arcanea ecosystem.
 */

// Adapters
export {
  getAuthAdapter,
  getAllAdapters,
  getAdapterByEnvVar,
  ClaudeAuthAdapter,
  OpenAIAuthAdapter,
  GeminiAuthAdapter,
  CopilotAuthAdapter,
  OpenCodeAuthAdapter,
} from './adapters/index.js';

// Keystore
export {
  createKeystore,
  CascadingKeystore,
  EncryptedFileKeystore,
  EnvKeystore,
} from './keystore/index.js';
export type { KeystoreBackend } from './keystore/index.js';

// Types
export type { AuthConfig, ValidationResult, KeystoreEntry } from './types.js';

// Utilities
export { httpValidate, maskCredential } from './validate.js';

// Re-export core types for convenience
export type { AuthSession, AuthAdapter, Keystore, ProviderType } from '@arcanea/os';

// Version
export const VERSION = '1.0.0';
