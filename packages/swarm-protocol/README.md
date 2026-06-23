# @arcanea/swarm-protocol

The chain-agnostic packaging layer for Arcanea agent swarms. A **Swarm Package Manifest**
is the unit that gets tokenized as a Swarm License NFT and metered per-invocation across
Base, Polygon, and Solana.

A manifest composes: **topology** (queen + worker mesh), **agents** (portable specs;
the licensed IP), **license terms** (forkable pattern vs. non-licensable encoded-self per
SIP), **pricing** (license + per-call + EIP-2981 secondary), **royalty split**
(creator/platform/treasury in bps, summing to 10000), **SIP attestation**, and per-chain
**bindings**.

Zero runtime dependencies — compiles with plain `tsc`, tests with `node --test`.

## Use

```ts
import {
  validateSwarmManifest, buildManifest, canonicalize,
  royaltyFromProfile, type SwarmManifest,
} from '@arcanea/swarm-protocol';

const res = validateSwarmManifest(json);
if (!res.valid) throw new Error(res.errors.join('\n'));

// Build + reproducibly serialize for pinning (the canonical bytes = the IPFS CID):
const manifest = buildManifest(input);
const pinnable = canonicalize(manifest);

// Royalty split from a named profile (addresses default to '<placeholder>'):
const split = royaltyFromProfile('generous'); // creator 70 / platform 20 / treasury 10
```

## CLI

```bash
pack-swarm list                          # bundled reference manifests
pack-swarm validate <file|slug>          # validate, non-zero exit on error
pack-swarm canonicalize <file|slug>      # print pinnable canonical JSON
pack-swarm fingerprint <file|slug>       # deterministic content fingerprint
```

## Reference manifests (`manifests/`)

- `creative-author-council` — story weaver leading character/world/editor/cover specialists
- `catalog-kits` — the full 12-agent Arcanea catalog under one conductor
- `guardian-orchestration` — the Lumina→Guardians routing harness (queen-pays-queen)

## Build & test

```bash
pnpm build         # tsc → dist/
pnpm test          # tsc -p tsconfig.test.json → node --test (14 tests)
```

## Invariants (validated)

- `royalty.recipients` bps sum to exactly 10000
- `topology.queen` / `topology.workers` reference real agents with matching roles
- every agent carries `systemPrompt` or `specUri` (the IP must be locatable)
- `chains` non-empty; only `base | polygon | solana`
- `attestation.builtOnSip === true` and `attribution === 'Built on SIP'`

Built on SIP.
