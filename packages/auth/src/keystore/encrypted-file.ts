/**
 * Encrypted File Keystore
 * Stores credentials in an encrypted JSON file at ~/.arcanea/credentials.enc
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';
import type { Keystore, ProviderType } from '@arcanea/core';

const ARCANEA_DIR = join(homedir(), '.arcanea');
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
    return JSON.parse(decrypt(raw)) as CredStore;
  } catch {
    return {};
  }
}

function writeStore(store: CredStore): void {
  if (!existsSync(ARCANEA_DIR)) {
    mkdirSync(ARCANEA_DIR, { recursive: true, mode: 0o700 });
  }
  writeFileSync(CREDS_FILE, encrypt(JSON.stringify(store)), { mode: 0o600 });
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
