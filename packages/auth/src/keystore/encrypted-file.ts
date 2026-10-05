/**
 * Encrypted File Keystore
 * Stores credentials in an encrypted JSON file at ~/.arcanea/credentials.enc
 */

import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { homedir } from 'node:os';
import { createCipheriv, createDecipheriv, randomBytes, createHash, randomUUID } from 'node:crypto';
import type { Keystore, ProviderType } from '@arcanea/core';

const configuredDirectory = process.env.ARCANEA_STATE_DIR;
if (configuredDirectory !== undefined && !isAbsolute(configuredDirectory)) {
  throw new Error('ARCANEA_STATE_DIR must be an absolute directory path.');
}
const ARCANEA_DIR = configuredDirectory ?? join(homedir(), '.arcanea');
const CREDS_FILE = join(ARCANEA_DIR, 'credentials.enc');
const ALGORITHM = 'aes-256-gcm';

function getMachineKey(): Buffer {
  // Derive key from machine-specific data (hostname + homedir)
  const seed = `arcanea-${homedir()}-${process.env.USER || process.env.USERNAME || 'default'}`;
  return createHash('sha256').update(seed).digest();
}

function encrypt(plaintext: string): string {
  const key = getMachineKey();
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(ciphertext: string): string {
  const [ivHex, authTagHex, encrypted] = ciphertext.split(':');
  const key = getMachineKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

type CredStore = Partial<Record<ProviderType, { credential: string; savedAt: string }>>;

function readStore(): CredStore {
  if (!existsSync(CREDS_FILE)) return {};
  try {
    const raw = readFileSync(CREDS_FILE, 'utf-8');
    const store = JSON.parse(decrypt(raw)) as CredStore;
    if (!store || typeof store !== 'object' || Array.isArray(store) ||
        Object.values(store).some(entry => !entry || typeof entry.credential !== 'string' ||
          typeof entry.savedAt !== 'string' || Number.isNaN(Date.parse(entry.savedAt)))) {
      throw new Error('Invalid credential store.');
    }
    return store;
  } catch {
    throw new Error('Arcanea credentials cannot be read. Preserve and restore credentials.enc before retrying.');
  }
}

function writeStore(store: CredStore): void {
  if (!existsSync(ARCANEA_DIR)) {
    mkdirSync(ARCANEA_DIR, { recursive: true, mode: 0o700 });
  }
  const temporaryPath = `${CREDS_FILE}.${randomUUID()}.tmp`;
  let descriptor: number | undefined;
  try {
    descriptor = openSync(temporaryPath, 'wx', 0o600);
    writeFileSync(descriptor, encrypt(JSON.stringify(store)), 'utf8');
    fsyncSync(descriptor);
    closeSync(descriptor);
    descriptor = undefined;
    for (let attempt = 0; ; attempt++) {
      try {
        renameSync(temporaryPath, CREDS_FILE);
        break;
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (process.platform !== 'win32' || attempt >= 5 || !['EPERM', 'EACCES', 'EBUSY'].includes(code ?? '')) throw error;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10 * 2 ** attempt);
      }
    }
  } finally {
    if (descriptor !== undefined) {
      try { closeSync(descriptor); } catch { /* preserve the save error */ }
    }
    try { unlinkSync(temporaryPath); } catch { /* only this call's temporary file */ }
  }
}

export class EncryptedFileKeystore implements Keystore {
  async save(provider: ProviderType, credential: string): Promise<void> {
    const store = readStore();
    store[provider] = { credential, savedAt: new Date().toISOString() };
    writeStore(store);
  }

  async load(provider: ProviderType): Promise<string | null> {
    const store = readStore();
    return store[provider]?.credential || null;
  }

  async delete(provider: ProviderType): Promise<void> {
    const store = readStore();
    delete store[provider];
    writeStore(store);
  }

  async list(): Promise<ProviderType[]> {
    const store = readStore();
    return Object.keys(store) as ProviderType[];
  }
}
