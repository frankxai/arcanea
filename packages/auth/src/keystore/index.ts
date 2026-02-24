/**
 * Keystore Factory
 * Creates the appropriate keystore based on platform capabilities.
 */

import type { Keystore, ProviderType } from '@arcanea/os';
import { EncryptedFileKeystore } from './encrypted-file.js';
import { EnvKeystore } from './env.js';

export type KeystoreBackend = 'encrypted-file' | 'env-only';

/**
 * Cascading keystore that checks multiple backends in order:
 * 1. Environment variables (always checked first)
 * 2. Encrypted file store (for saved credentials)
 */
export class CascadingKeystore implements Keystore {
  private envStore = new EnvKeystore();
  private fileStore = new EncryptedFileKeystore();

  async save(provider: ProviderType, credential: string): Promise<void> {
    return this.fileStore.save(provider, credential);
  }

  async load(provider: ProviderType): Promise<string | null> {
    // Env vars take priority
    const envCred = await this.envStore.load(provider);
    if (envCred) return envCred;

    // Fall back to encrypted file
    return this.fileStore.load(provider);
  }

  async delete(provider: ProviderType): Promise<void> {
    return this.fileStore.delete(provider);
  }

  async list(): Promise<ProviderType[]> {
    const envProviders = await this.envStore.list();
    const fileProviders = await this.fileStore.list();
    return [...new Set([...envProviders, ...fileProviders])];
  }
}

export function createKeystore(backend?: KeystoreBackend): Keystore {
  switch (backend) {
    case 'env-only':
      return new EnvKeystore();
    case 'encrypted-file':
      return new EncryptedFileKeystore();
    default:
      return new CascadingKeystore();
  }
}

export { EncryptedFileKeystore } from './encrypted-file.js';
export { EnvKeystore } from './env.js';
