import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import {
  validateSwarmManifest,
  assertValidSwarmManifest,
  buildManifest,
  canonicalize,
  manifestFingerprint,
  royaltyFromProfile,
  totalBps,
  arcaneaAttestation,
  ROYALTY_PROFILE_BPS,
  BPS_TOTAL,
  SWARM_MANIFEST_VERSION,
  type SwarmManifest,
  type ManifestInput,
} from '../src/index';

const MANIFEST_DIR = join(__dirname, '..', '..', 'manifests');

function loadManifest(slug: string): SwarmManifest {
  return JSON.parse(readFileSync(join(MANIFEST_DIR, `${slug}.json`), 'utf8'));
}

function allSlugs(): string[] {
  return readdirSync(MANIFEST_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

test('three reference manifests are bundled', () => {
  const slugs = allSlugs().sort();
  assert.deepEqual(slugs, ['catalog-kits', 'creative-author-council', 'guardian-orchestration']);
});

test('every bundled manifest validates', () => {
  for (const slug of allSlugs()) {
    const res = validateSwarmManifest(loadManifest(slug));
    assert.equal(res.valid, true, `${slug} invalid: ${res.errors.join('; ')}`);
  }
});

test('royalty recipients sum to exactly 10000 bps in every manifest', () => {
  for (const slug of allSlugs()) {
    const m = loadManifest(slug);
    assert.equal(totalBps(m.royalty), BPS_TOTAL, `${slug} bps != ${BPS_TOTAL}`);
  }
});

test('every manifest carries all three chains and the SIP attestation', () => {
  for (const slug of allSlugs()) {
    const m = loadManifest(slug);
    const chains = m.chains.map((c) => c.chain).sort();
    assert.deepEqual(chains, ['base', 'polygon', 'solana'], `${slug} chains`);
    assert.equal(m.attestation.builtOnSip, true);
    assert.equal(m.attestation.attribution, 'Built on SIP');
  }
});

test('topology queen + workers reference real agents with correct roles', () => {
  for (const slug of allSlugs()) {
    const m = loadManifest(slug);
    const byId = new Map(m.agents.map((a) => [a.id, a]));
    assert.equal(byId.get(m.topology.queen)?.role, 'queen', `${slug} queen role`);
    for (const w of m.topology.workers) {
      assert.equal(byId.get(w)?.role, 'worker', `${slug} worker ${w} role`);
    }
  }
});

test('canonicalize is deterministic and round-trips a manifest', () => {
  const original = loadManifest('creative-author-council');
  // Rebuild from the same input (timestamps + attestation provided) and confirm
  // the canonical bytes are identical — packaging is reproducible.
  const input: ManifestInput = {
    ...original,
    attestation: original.attestation,
    createdAt: original.createdAt,
    updatedAt: original.updatedAt,
  };
  const rebuilt = buildManifest(input, '2099-01-01T00:00:00.000Z');
  assert.equal(canonicalize(rebuilt), canonicalize(original));
  assert.equal(manifestFingerprint(rebuilt), manifestFingerprint(original));
});

test('buildManifest stamps defaults (version, attestation, timestamps)', () => {
  const original = loadManifest('creative-author-council');
  const { manifestVersion, attestation, createdAt, updatedAt, ...rest } = original;
  void manifestVersion; void attestation; void createdAt; void updatedAt;
  const built = buildManifest(rest as ManifestInput, '2026-06-23T12:00:00.000Z');
  assert.equal(built.manifestVersion, SWARM_MANIFEST_VERSION);
  assert.equal(built.attestation.builtOnSip, true);
  assert.equal(built.createdAt, '2026-06-23T12:00:00.000Z');
  assert.equal(built.updatedAt, '2026-06-23T12:00:00.000Z');
});

test('royaltyFromProfile produces a 10000-bps split for each named profile', () => {
  for (const profile of Object.keys(ROYALTY_PROFILE_BPS) as (keyof typeof ROYALTY_PROFILE_BPS)[]) {
    const split = royaltyFromProfile(profile);
    assert.equal(totalBps(split), BPS_TOTAL, `${profile} sum`);
    assert.equal(split.recipients.every((r) => r.address === '<placeholder>'), true);
  }
});

test('arcaneaAttestation declines its own canon and composes arcanea', () => {
  const att = arcaneaAttestation();
  assert.equal(att.declaresCanon, false);
  assert.deepEqual(att.composesCanon, ['arcanea']);
});

// ── negative cases ─────────────────────────────────────────────────────────

test('rejects a royalty split that does not sum to 10000', () => {
  const m = loadManifest('creative-author-council');
  m.royalty.recipients[0].bps = 5000; // now 5000+2000+1000 = 8000
  const res = validateSwarmManifest(m);
  assert.equal(res.valid, false);
  assert.ok(res.errors.some((e) => e.includes('sum to 10000')));
});

test('rejects a topology queen that is not in agents', () => {
  const m = loadManifest('creative-author-council');
  m.topology.queen = 'ghost-agent';
  const res = validateSwarmManifest(m);
  assert.equal(res.valid, false);
  assert.ok(res.errors.some((e) => e.includes('not in agents')));
});

test('rejects an agent with neither systemPrompt nor specUri', () => {
  const m = loadManifest('creative-author-council');
  delete (m.agents[1] as unknown as Record<string, unknown>).specUri;
  const res = validateSwarmManifest(m);
  assert.equal(res.valid, false);
  assert.ok(res.errors.some((e) => e.includes('systemPrompt or specUri')));
});

test('rejects an unknown chain', () => {
  const m = loadManifest('creative-author-council');
  (m.chains[0] as unknown as Record<string, unknown>).chain = 'aptos';
  const res = validateSwarmManifest(m);
  assert.equal(res.valid, false);
  assert.ok(res.errors.some((e) => e.includes('base | polygon | solana')));
});

test('assertValidSwarmManifest throws with a readable message', () => {
  assert.throws(() => assertValidSwarmManifest({ id: 'broken' }), /Invalid SwarmManifest/);
});
