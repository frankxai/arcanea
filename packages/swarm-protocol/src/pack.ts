/**
 * Manifest construction + deterministic serialization.
 *
 * `buildManifest` fills the boilerplate (manifestVersion, attestation default,
 * timestamps) and validates before returning, so callers can't produce a
 * structurally-invalid manifest. `canonicalize` emits a stable, key-sorted
 * JSON string — this is what gets hashed and pinned to IPFS/Arweave, so the
 * same logical manifest always yields the same bytes (and the same content id).
 */

import { SWARM_MANIFEST_VERSION, type SwarmManifest } from './types';
import { arcaneaAttestation } from './licensing';
import { assertValidSwarmManifest } from './schema';

/** Fields a caller supplies; the rest are defaulted. */
export type ManifestInput = Omit<
  SwarmManifest,
  'manifestVersion' | 'attestation' | 'createdAt' | 'updatedAt'
> & {
  attestation?: SwarmManifest['attestation'];
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Build and validate a manifest. `now` is injectable so packaging can be made
 * deterministic in tests (otherwise it stamps the current time).
 */
export function buildManifest(input: ManifestInput, now: string = new Date().toISOString()): SwarmManifest {
  const manifest: SwarmManifest = {
    manifestVersion: SWARM_MANIFEST_VERSION,
    attestation: input.attestation ?? arcaneaAttestation(),
    createdAt: input.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
    ...stripUndefined(input),
  } as SwarmManifest;
  return assertValidSwarmManifest(manifest);
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as T;
}

/**
 * Stable, recursively key-sorted JSON. Object keys are ordered alphabetically;
 * arrays keep their order (array order is semantic — e.g. the loop steps).
 */
export function canonicalize(value: unknown): string {
  return JSON.stringify(sortDeep(value), null, 2);
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = sortDeep((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return value;
}

/**
 * A small, stable content fingerprint (FNV-1a, 32-bit, hex) of the canonical
 * form. Not a cryptographic hash — a cheap deterministic id for diffing and
 * cache keys. Real pinning uses the IPFS CID of `canonicalize(manifest)`.
 */
export function manifestFingerprint(manifest: SwarmManifest): string {
  const text = canonicalize(manifest);
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
