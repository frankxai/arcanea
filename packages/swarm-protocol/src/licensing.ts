/**
 * Licensing + royalty helpers.
 *
 * Royalty profiles map to a creator / platform / treasury split in basis
 * points. The profile names mirror the Arcanea book-royalty profiles in
 * `packages/arcanea-multilingual-config/src/royalty.ts` so the marketplace
 * speaks one vocabulary, but here the payees are creator/platform/treasury
 * (not author/translator/platform) and the values are bps for on-chain use.
 */

import type {
  RoyaltyProfile,
  RoyaltyRecipient,
  RoyaltySplit,
  SipAttestation,
} from './types';

/** Basis points denominator. 100% = 10000 bps. */
export const BPS_TOTAL = 10000;

/** SIP substrate version this protocol attests against. */
export const SIP_VERSION = '1.0.0';

/**
 * creator / platform / treasury splits per named profile (basis points).
 *  - generous (default): creator-favorable, sustainable platform cut
 *  - conservative: larger platform cut (used for unproven creators)
 *  - community-prioritized: maximum creator share for co-launches
 */
export const ROYALTY_PROFILE_BPS: Record<
  Exclude<RoyaltyProfile, 'custom'>,
  { creator: number; platform: number; treasury: number }
> = {
  conservative: { creator: 6000, platform: 3000, treasury: 1000 },
  generous: { creator: 7000, platform: 2000, treasury: 1000 },
  'community-prioritized': { creator: 8000, platform: 1000, treasury: 1000 },
};

/** Recommended default, matching the Arcanea book-royalty default. */
export const DEFAULT_ROYALTY_PROFILE: RoyaltyProfile = 'generous';

/**
 * Build a RoyaltySplit from a named profile and the three payee addresses.
 * Addresses default to '<placeholder>' so manifests never ship guessed
 * destinations — a human sets them before any real deploy.
 */
export function royaltyFromProfile(
  profile: Exclude<RoyaltyProfile, 'custom'>,
  addresses: Partial<Record<'creator' | 'platform' | 'treasury', string>> = {},
): RoyaltySplit {
  const bps = ROYALTY_PROFILE_BPS[profile];
  const recipients: RoyaltyRecipient[] = [
    { label: 'creator', address: addresses.creator ?? '<placeholder>', bps: bps.creator },
    { label: 'platform', address: addresses.platform ?? '<placeholder>', bps: bps.platform },
    { label: 'treasury', address: addresses.treasury ?? '<placeholder>', bps: bps.treasury },
  ];
  return { profile, recipients };
}

/** Sum the basis points across all recipients. */
export function totalBps(split: RoyaltySplit): number {
  return split.recipients.reduce((sum, r) => sum + r.bps, 0);
}

/** The standard "Built on SIP" attestation for an Arcanea-composing swarm. */
export function arcaneaAttestation(): SipAttestation {
  return {
    builtOnSip: true,
    sipVersion: SIP_VERSION,
    declaresCanon: false,
    composesCanon: ['arcanea'],
    attribution: 'Built on SIP',
  };
}
