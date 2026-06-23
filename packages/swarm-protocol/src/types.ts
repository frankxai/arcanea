/**
 * Swarm Package Manifest — the chain-agnostic unit that gets tokenized.
 *
 * A manifest fully describes a licensable Arcanea swarm: its topology
 * (queen + worker mesh), the portable agent specs inside it, the licensing
 * terms (what is forkable vs. what is non-transferable per SIP), pricing,
 * the on-chain revenue split, the SIP attestation, and the per-chain
 * contract bindings (Base / Polygon / Solana).
 *
 * The on-chain layer consumes three things from here:
 *   - `agents` + `topology`  → the metadata pinned to IPFS/Arweave (NFT tokenURI)
 *   - `royalty.recipients`   → the RoyaltyRouter split (basis points)
 *   - `pricing`              → mint price + per-call price + EIP-2981 secondary bps
 *
 * This module is *data shape only* — no behavior, no chain calls. Validation
 * lives in `schema.ts`; construction in `pack.ts`.
 */

export const SWARM_MANIFEST_VERSION = '1.0.0';

/** Chains Phase 1 targets. EVM chains share one Solidity deployment. */
export type Chain = 'base' | 'polygon' | 'solana';

/** Elemental affinity — mirrors the Arcanea LuminorSpec element set. */
export type ElementAffinity = 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Void' | 'Spirit';

/** How the swarm is coordinated. Mirrors starlight-swarm topology language. */
export type TopologyPattern = 'queen-led' | 'mesh' | 'hierarchical';

/** What a buyer pays for. */
export type LicenseModel = 'nft-license' | 'per-call' | 'hybrid';

/** Settlement currency. USDC rides x402; NATIVE is the chain's gas token. */
export type SettlementCurrency = 'USDC' | 'NATIVE';

/** Named revenue-split profile (provenance for the bps below). */
export type RoyaltyProfile =
  | 'conservative'
  | 'generous'
  | 'community-prioritized'
  | 'custom';

/** Token standard backing the license on a given chain. */
export type TokenStandard = 'ERC-721' | 'ERC-1155' | 'metaplex-nft';

/**
 * A single agent inside the swarm — a portable, licensable unit. Mirrors the
 * load-bearing fields of `apps/web/lib/luminors/luminor-spec.ts` without
 * coupling the protocol package to the web app.
 *
 * The licensed IP is `systemPrompt`. For swarms that include encoded-self
 * material, omit `systemPrompt` and point `specUri` at gated storage so the
 * non-transferable artifact never lands in a public manifest (SIP boundary).
 */
export interface AgentPackage {
  /** Stable slug (e.g. "story-writer"). */
  id: string;
  /** Display name (e.g. "Quillblade"). */
  name: string;
  /** Mythic title (e.g. "The Story Weaver"). */
  title: string;
  /** Seat in the topology. */
  role: 'queen' | 'worker';
  /** Primary domain of expertise. */
  domain: string;
  /** Voice archetype. */
  voice: string;
  /** Elemental affinity for theming. */
  element: ElementAffinity;
  /** The licensed IP. Optional so encoded-self can stay out of public manifests. */
  systemPrompt?: string;
  /** Where the full portable spec lives (ipfs:// | ar:// | https://). */
  specUri?: string;
  /** Preferred gateway model hint. */
  preferredModel?: string;
  /** 1-5 short capability bullets. */
  capabilities: string[];
}

/** The orchestration contract: one queen leading a worker mesh. */
export interface SwarmTopology {
  pattern: TopologyPattern;
  /** Agent id of the queen (must exist in `agents` with role 'queen'). */
  queen: string;
  /** Agent ids of the workers (each must exist in `agents` with role 'worker'). */
  workers: string[];
  /** Ordered steps of the queen's self-improving loop. */
  loop: string[];
  /** MCP servers the swarm touches (verify-only where money is near). */
  mcp: string[];
}

/** One payee in the revenue split. */
export interface RoyaltyRecipient {
  /** 'creator' | 'platform' | 'treasury' | custom label. */
  label: string;
  /** EVM address / Solana pubkey, or '<placeholder>' until set by a human. */
  address: string;
  /** Basis points (1% = 100). All recipients must sum to 10000. */
  bps: number;
}

/** On-chain revenue split consumed by RoyaltyRouter. */
export interface RoyaltySplit {
  profile: RoyaltyProfile;
  recipients: RoyaltyRecipient[];
}

/** Pricing for both money models. Amounts are strings (smallest unit) to avoid float drift. */
export interface Pricing {
  /** License mint price in the smallest unit of `currency` (e.g. USDC has 6 decimals). */
  licensePrice: string;
  /** Per-invocation price for metered (x402) usage. */
  perCallPrice: string;
  currency: SettlementCurrency;
  /** EIP-2981 secondary-sale royalty to the creator, in basis points. */
  secondaryRoyaltyBps: number;
}

/**
 * Licensing boundary per SIP: the orchestration *pattern* is forkable; the
 * *person* (founder voice clones, identity vectors, private canon) is not.
 */
export interface LicenseTerms {
  model: LicenseModel;
  /** License id for the forkable pattern (e.g. 'CC-BY-NC-4.0', 'MIT'). */
  patternLicense: string;
  /** Artifacts explicitly excluded from the grant (non-transferable). */
  nonLicensable: string[];
  /** Human-readable summary of what holding the license grants. */
  grant: string;
}

/** "Built on SIP" attestation block (ambient on every shipped artifact). */
export interface SipAttestation {
  builtOnSip: true;
  sipVersion: string;
  /** This package declares no vertical canon of its own. */
  declaresCanon: boolean;
  /** Upstream canon this swarm composes (e.g. ['arcanea']). */
  composesCanon: string[];
  attribution: 'Built on SIP';
}

/** Deployed-contract coordinates for one chain. Addresses are placeholders until deploy. */
export interface ChainBinding {
  chain: Chain;
  standard: TokenStandard;
  /** SwarmRegistry address. */
  registry?: string;
  /** SwarmLicense (NFT) address / program. */
  license?: string;
  /** RoyaltyRouter address / program. */
  royaltyRouter?: string;
  /** Manifest metadata URI pinned for the tokenURI (ipfs:// | ar://). */
  metadataUri?: string;
  /** Network label for clarity (e.g. 'base-sepolia', 'polygon-amoy', 'solana-devnet'). */
  network: string;
}

/** The full, tokenizable manifest. */
export interface SwarmManifest {
  manifestVersion: string;
  /** Slug SKU id (e.g. "creative-author-council"). */
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** SemVer of this swarm SKU. */
  version: string;
  element: ElementAffinity;
  /** Optional Guardian Gate alignment label. */
  gateAlignment?: string;
  topology: SwarmTopology;
  agents: AgentPackage[];
  pricing: Pricing;
  royalty: RoyaltySplit;
  license: LicenseTerms;
  attestation: SipAttestation;
  /** Per-chain bindings. Phase 1 carries all three. */
  chains: ChainBinding[];
  createdAt: string;
  updatedAt: string;
}
