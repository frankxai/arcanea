/**
 * Dependency-free validator for a Swarm Package Manifest.
 *
 * Deliberately zero-runtime-dependency (no zod) so the protocol package
 * compiles with plain `tsc` and tests with `node --test` in any environment,
 * and so a manifest can be validated on-chain-adjacent services without
 * pulling a schema library. Returns a structured result rather than throwing.
 */

import {
  SWARM_MANIFEST_VERSION,
  type AgentPackage,
  type Chain,
  type ElementAffinity,
  type SwarmManifest,
} from './types';
import { BPS_TOTAL } from './licensing';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  /** Present only when valid. */
  value?: SwarmManifest;
}

const ELEMENTS: ElementAffinity[] = ['Fire', 'Water', 'Earth', 'Wind', 'Void', 'Spirit'];
const CHAINS: Chain[] = ['base', 'polygon', 'solana'];
const LICENSE_MODELS = ['nft-license', 'per-call', 'hybrid'];
const CURRENCIES = ['USDC', 'NATIVE'];
const STANDARDS = ['ERC-721', 'ERC-1155', 'metaplex-nft'];
const TOPOLOGY_PATTERNS = ['queen-led', 'mesh', 'hierarchical'];
const SPEC_URI_SCHEMES = ['ipfs://', 'ar://', 'https://'];
export const PLACEHOLDER = '<placeholder>';

function isString(v: unknown): v is string {
  return typeof v === 'string';
}
function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}
function isInt(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v);
}
function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString);
}

function validateAgent(a: unknown, i: number, errors: string[]): a is AgentPackage {
  const p = `agents[${i}]`;
  if (typeof a !== 'object' || a === null) {
    errors.push(`${p}: must be an object`);
    return false;
  }
  const o = a as Record<string, unknown>;
  const before = errors.length;
  if (!isNonEmptyString(o.id)) errors.push(`${p}.id: required non-empty string`);
  if (!isNonEmptyString(o.name)) errors.push(`${p}.name: required non-empty string`);
  if (!isNonEmptyString(o.title)) errors.push(`${p}.title: required non-empty string`);
  if (o.role !== 'queen' && o.role !== 'worker') errors.push(`${p}.role: must be 'queen' | 'worker'`);
  if (!isNonEmptyString(o.domain)) errors.push(`${p}.domain: required non-empty string`);
  if (!isNonEmptyString(o.voice)) errors.push(`${p}.voice: required non-empty string`);
  if (!ELEMENTS.includes(o.element as ElementAffinity)) errors.push(`${p}.element: invalid element`);
  if (!isStringArray(o.capabilities)) errors.push(`${p}.capabilities: required string[]`);
  if (o.systemPrompt !== undefined && !isString(o.systemPrompt)) errors.push(`${p}.systemPrompt: must be string`);
  if (o.specUri !== undefined && !isString(o.specUri)) errors.push(`${p}.specUri: must be string`);
  if (typeof o.specUri === 'string' && !SPEC_URI_SCHEMES.some((s) => (o.specUri as string).startsWith(s))) {
    errors.push(`${p}.specUri: must start with ipfs://, ar://, or https://`);
  }
  if (o.systemPrompt === undefined && o.specUri === undefined) {
    errors.push(`${p}: must carry either systemPrompt or specUri (the licensed IP must be locatable)`);
  }
  return errors.length === before;
}

/**
 * Validate an unknown value as a SwarmManifest. Accumulates every error so a
 * caller sees all problems at once, not just the first.
 */
export function validateSwarmManifest(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null) {
    return { valid: false, errors: ['manifest: must be an object'] };
  }
  const m = input as Record<string, unknown>;

  if (m.manifestVersion !== SWARM_MANIFEST_VERSION) {
    errors.push(`manifestVersion: must be '${SWARM_MANIFEST_VERSION}'`);
  }
  if (!isNonEmptyString(m.id)) errors.push('id: required non-empty string');
  if (!isNonEmptyString(m.name)) errors.push('name: required non-empty string');
  if (!isNonEmptyString(m.tagline)) errors.push('tagline: required non-empty string');
  if (!isNonEmptyString(m.description)) errors.push('description: required non-empty string');
  if (!isNonEmptyString(m.version)) errors.push('version: required semver string');
  if (!ELEMENTS.includes(m.element as ElementAffinity)) errors.push('element: invalid element');
  if (!isNonEmptyString(m.createdAt)) errors.push('createdAt: required ISO string');
  if (!isNonEmptyString(m.updatedAt)) errors.push('updatedAt: required ISO string');

  // agents
  const agents = m.agents;
  const agentIds = new Set<string>();
  if (!Array.isArray(agents) || agents.length === 0) {
    errors.push('agents: required non-empty array');
  } else {
    agents.forEach((a, i) => {
      validateAgent(a, i, errors);
      const id = (a as Record<string, unknown>)?.id;
      if (isNonEmptyString(id)) {
        if (agentIds.has(id)) errors.push(`agents: duplicate id '${id}'`);
        agentIds.add(id);
      }
    });
  }

  // topology — queen + workers must reference real agents with matching roles
  const topo = m.topology as Record<string, unknown> | undefined;
  if (typeof topo !== 'object' || topo === null) {
    errors.push('topology: required object');
  } else {
    if (!TOPOLOGY_PATTERNS.includes(topo.pattern as string)) errors.push('topology.pattern: invalid');
    if (!isStringArray(topo.loop) || (topo.loop as string[]).length === 0) errors.push('topology.loop: required non-empty string[]');
    if (!isStringArray(topo.mcp)) errors.push('topology.mcp: required string[]');
    if (!isNonEmptyString(topo.queen)) {
      errors.push('topology.queen: required agent id');
    } else if (agentIds.size && !agentIds.has(topo.queen)) {
      errors.push(`topology.queen: '${topo.queen}' is not in agents`);
    } else if (Array.isArray(agents)) {
      const q = (agents as Array<Partial<AgentPackage> | null | undefined>).find((a) => a?.id === topo.queen);
      if (q && q.role !== 'queen') errors.push(`topology.queen: agent '${topo.queen}' must have role 'queen'`);
    }
    if (!isStringArray(topo.workers) || (topo.workers as string[]).length === 0) {
      errors.push('topology.workers: required non-empty string[]');
    } else {
      (topo.workers as string[]).forEach((w) => {
        if (agentIds.size && !agentIds.has(w)) {
          errors.push(`topology.workers: '${w}' is not in agents`);
        } else if (Array.isArray(agents)) {
          const wa = (agents as Array<Partial<AgentPackage> | null | undefined>).find((a) => a?.id === w);
          if (wa && wa.role !== 'worker') errors.push(`topology.workers: agent '${w}' must have role 'worker'`);
        }
      });
    }
  }

  // pricing
  const pricing = m.pricing as Record<string, unknown> | undefined;
  if (typeof pricing !== 'object' || pricing === null) {
    errors.push('pricing: required object');
  } else {
    if (!isNonEmptyString(pricing.licensePrice)) errors.push('pricing.licensePrice: required string (smallest unit)');
    if (!isNonEmptyString(pricing.perCallPrice)) errors.push('pricing.perCallPrice: required string (smallest unit)');
    if (!CURRENCIES.includes(pricing.currency as string)) errors.push('pricing.currency: must be USDC | NATIVE');
    if (!isInt(pricing.secondaryRoyaltyBps) || (pricing.secondaryRoyaltyBps as number) < 0 || (pricing.secondaryRoyaltyBps as number) > BPS_TOTAL) {
      errors.push(`pricing.secondaryRoyaltyBps: int 0..${BPS_TOTAL}`);
    }
  }

  // royalty split — must sum to exactly 10000 bps
  const royalty = m.royalty as Record<string, unknown> | undefined;
  if (typeof royalty !== 'object' || royalty === null) {
    errors.push('royalty: required object');
  } else {
    const recips = royalty.recipients;
    if (!Array.isArray(recips) || recips.length === 0) {
      errors.push('royalty.recipients: required non-empty array');
    } else {
      let sum = 0;
      recips.forEach((r, i) => {
        if (typeof r !== 'object' || r === null) {
          errors.push(`royalty.recipients[${i}]: must be an object`);
          return;
        }
        const ro = r as Record<string, unknown>;
        if (!isNonEmptyString(ro.label)) errors.push(`royalty.recipients[${i}].label: required`);
        if (!isNonEmptyString(ro.address)) errors.push(`royalty.recipients[${i}].address: required (use '<placeholder>')`);
        if (!isInt(ro.bps) || (ro.bps as number) < 0) errors.push(`royalty.recipients[${i}].bps: required non-negative int`);
        else sum += ro.bps as number;
      });
      if (sum !== BPS_TOTAL) errors.push(`royalty.recipients: bps must sum to ${BPS_TOTAL}, got ${sum}`);
    }
  }

  // license terms
  const license = m.license as Record<string, unknown> | undefined;
  if (typeof license !== 'object' || license === null) {
    errors.push('license: required object');
  } else {
    if (!LICENSE_MODELS.includes(license.model as string)) errors.push('license.model: nft-license | per-call | hybrid');
    if (!isNonEmptyString(license.patternLicense)) errors.push('license.patternLicense: required');
    if (!isStringArray(license.nonLicensable)) errors.push('license.nonLicensable: required string[]');
    if (!isNonEmptyString(license.grant)) errors.push('license.grant: required');
  }

  // attestation
  const att = m.attestation as Record<string, unknown> | undefined;
  if (typeof att !== 'object' || att === null) {
    errors.push('attestation: required object');
  } else {
    if (att.builtOnSip !== true) errors.push('attestation.builtOnSip: must be true');
    if (!isNonEmptyString(att.sipVersion)) errors.push('attestation.sipVersion: required');
    if (typeof att.declaresCanon !== 'boolean') errors.push('attestation.declaresCanon: required boolean');
    if (!isStringArray(att.composesCanon)) errors.push('attestation.composesCanon: required string[]');
    if (att.attribution !== 'Built on SIP') errors.push("attestation.attribution: must be 'Built on SIP'");
  }

  // chains — at least one binding, valid chain + standard
  const chains = m.chains;
  if (!Array.isArray(chains) || chains.length === 0) {
    errors.push('chains: required non-empty array');
  } else {
    chains.forEach((c, i) => {
      if (typeof c !== 'object' || c === null) {
        errors.push(`chains[${i}]: must be an object`);
        return;
      }
      const co = c as Record<string, unknown>;
      if (!CHAINS.includes(co.chain as Chain)) errors.push(`chains[${i}].chain: base | polygon | solana`);
      if (!STANDARDS.includes(co.standard as string)) errors.push(`chains[${i}].standard: invalid token standard`);
      if (!isNonEmptyString(co.network)) errors.push(`chains[${i}].network: required label`);
    });
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, errors: [], value: input as SwarmManifest };
}

/** Throwing variant for call sites that prefer exceptions. */
export function assertValidSwarmManifest(input: unknown): SwarmManifest {
  const res = validateSwarmManifest(input);
  if (!res.valid || !res.value) {
    throw new Error(`Invalid SwarmManifest:\n  - ${res.errors.join('\n  - ')}`);
  }
  return res.value;
}

/**
 * Stricter gate for deploy-time: a manifest is "deploy ready" only if it is
 * structurally valid AND carries no unset placeholders — real royalty addresses
 * and a pinned metadata URI on every chain. Reference manifests intentionally
 * fail this until a human sets the real values before a (human-gated) deploy.
 */
export function checkDeployReady(input: unknown): ValidationResult {
  const base = validateSwarmManifest(input);
  if (!base.valid || !base.value) return base;

  const m = base.value;
  const errors: string[] = [];
  m.royalty.recipients.forEach((r, i) => {
    if (r.address === PLACEHOLDER) errors.push(`royalty.recipients[${i}].address: still a placeholder`);
  });
  m.chains.forEach((c, i) => {
    if (!c.metadataUri || c.metadataUri.includes('<')) errors.push(`chains[${i}].metadataUri: not pinned`);
    for (const k of ['registry', 'license', 'royaltyRouter'] as const) {
      if (!c[k] || c[k] === PLACEHOLDER) errors.push(`chains[${i}].${k}: not deployed`);
    }
  });

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, errors: [], value: m };
}
