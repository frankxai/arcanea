/**
 * ArcaneMD Format — Parser, Serializer, and Validator
 *
 * Handles the .md file format with YAML frontmatter used by the Arcanea Memory System.
 * See /docs/arcaneMD-spec.md for the full format specification.
 */

import type {
  VaultEntry,
  VaultType,
  GuardianName,
  GateName,
  ConfidenceLevel,
} from './types.js';

// ── Valid values for frontmatter fields ─────────────────────────────────────

const VALID_VAULTS: readonly VaultType[] = [
  'strategic', 'technical', 'creative', 'operational', 'wisdom', 'horizon',
];

const VALID_GUARDIANS: readonly GuardianName[] = [
  'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
  'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
];

const VALID_GATES: readonly GateName[] = [
  'Foundation', 'Flow', 'Fire', 'Heart', 'Voice',
  'Sight', 'Crown', 'Shift', 'Unity', 'Source',
];

const VALID_FREQUENCIES = [174, 285, 396, 417, 528, 639, 741, 852, 963, 1111] as const;

const VALID_CONFIDENCE: readonly ConfidenceLevel[] = ['low', 'medium', 'high', 'verified'];

// ── Guardian lookup tables ────────────────────────────────────────────────────

const GUARDIAN_FREQUENCIES: Readonly<Record<GuardianName, number>> = {
  Lyssandria: 174,
  Leyla:      285,
  Draconia:   396,
  Maylinn:    417,
  Alera:      528,
  Lyria:      639,
  Aiyami:     741,
  Elara:      852,
  Ino:        963,
  Shinkami:   1111,
};

const GUARDIAN_GATES: Readonly<Record<GuardianName, GateName>> = {
  Lyssandria: 'Foundation',
  Leyla:      'Flow',
  Draconia:   'Fire',
  Maylinn:    'Heart',
  Alera:      'Voice',
  Lyria:      'Sight',
  Aiyami:     'Crown',
  Elara:      'Shift',
  Ino:        'Unity',
  Shinkami:   'Source',
};

// ── Public API types ─────────────────────────────────────────────────────────

export interface ArcaneMDParseResult {
  valid: boolean;
  entry?: VaultEntry;
  errors: string[];
  warnings: string[];
}

// ── Parser ────────────────────────────────────────────────────────────────────

/**
 * Parse an ArcaneMD file string into a VaultEntry.
 *
 * Returns a result object with `valid`, `entry`, `errors`, and `warnings`.
 * Errors indicate the file cannot be used. Warnings indicate degraded data.
 */
export function parseArcaneMD(fileContent: string): ArcaneMDParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Require frontmatter block
  if (!fileContent.startsWith('---\n')) {
    return {
      valid: false,
      errors: ['File must start with YAML frontmatter (---)'],
      warnings,
    };
  }

  const endFm = fileContent.indexOf('\n---\n', 4);
  if (endFm === -1) {
    return {
      valid: false,
      errors: ['Frontmatter closing --- not found'],
      warnings,
    };
  }

  const yamlStr = fileContent.slice(4, endFm);
  const body = fileContent.slice(endFm + 5).trim();

  // Minimal line-by-line YAML parser (covers the ArcaneMD subset)
  const meta: Record<string, unknown> = {};
  for (const line of yamlStr.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    const rawValue = trimmed.slice(colonIdx + 1).trim();

    if (rawValue === '' || rawValue === 'null') {
      meta[key] = null;
    } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      // Inline YAML array: [a, b, c]
      const inner = rawValue.slice(1, -1);
      meta[key] = inner === ''
        ? []
        : inner.split(',').map(s => s.trim()).filter(Boolean);
    } else if (!isNaN(Number(rawValue))) {
      meta[key] = Number(rawValue);
    } else {
      meta[key] = rawValue;
    }
  }

  // ── Required field validation ───────────────────────────────────────────────

  if (!meta['id'] || typeof meta['id'] !== 'string') {
    errors.push('Missing required field: id');
  }

  const vault = meta['vault'];
  if (!vault || !VALID_VAULTS.includes(vault as VaultType)) {
    errors.push(
      `Invalid or missing vault: "${vault}". Must be one of: ${VALID_VAULTS.join(', ')}`,
    );
  }

  if (!meta['created'] || typeof meta['created'] !== 'string') {
    errors.push('Missing required field: created (ISO 8601 timestamp)');
  }

  // ── Optional field validation ───────────────────────────────────────────────

  const guardian = meta['guardian'];
  if (guardian !== null && guardian !== undefined) {
    if (!VALID_GUARDIANS.includes(guardian as GuardianName)) {
      errors.push(
        `Invalid guardian: "${guardian}". Must be one of: ${VALID_GUARDIANS.join(', ')}`,
      );
    }
  }

  const gate = meta['gate'];
  if (gate !== null && gate !== undefined) {
    if (!VALID_GATES.includes(gate as GateName)) {
      errors.push(
        `Invalid gate: "${gate}". Must be one of: ${VALID_GATES.join(', ')}`,
      );
    }
  }

  const frequency = meta['frequency'];
  if (frequency !== null && frequency !== undefined) {
    if (!VALID_FREQUENCIES.includes(frequency as typeof VALID_FREQUENCIES[number])) {
      warnings.push(
        `Non-standard frequency: ${frequency}. Canonical values: ${VALID_FREQUENCIES.join(', ')}`,
      );
    }
  }

  const confidence = meta['confidence'];
  if (confidence !== null && confidence !== undefined) {
    if (!VALID_CONFIDENCE.includes(confidence as ConfidenceLevel)) {
      errors.push(
        `Invalid confidence: "${confidence}". Must be one of: ${VALID_CONFIDENCE.join(', ')}`,
      );
    }
  }

  if (!body) {
    warnings.push('Entry has no content body');
  }

  if (errors.length > 0) {
    return { valid: false, errors, warnings };
  }

  // ── Build VaultEntry ────────────────────────────────────────────────────────

  const createdRaw = meta['created'];
  const updatedRaw = meta['updated'];
  const createdAt: number = typeof createdRaw === 'number' ? createdRaw : (typeof createdRaw === 'string' ? new Date(createdRaw).getTime() : Date.now());
  const updatedAt: number = typeof updatedRaw === 'number' ? updatedRaw : (typeof updatedRaw === 'string' ? new Date(updatedRaw).getTime() : createdAt);

  const entry: VaultEntry = {
    id:         meta['id'] as string,
    vault:      meta['vault'] as VaultType,
    content:    body,
    tags:       (meta['tags'] as string[] | null) ?? [],
    confidence: (meta['confidence'] as ConfidenceLevel | null) ?? 'medium',
    guardian:   (meta['guardian'] as GuardianName | undefined) ?? undefined,
    gate:       (meta['gate'] as GateName | undefined) ?? undefined,
    source:     (meta['source'] as string | undefined) ?? undefined,
    metadata:   frequency !== null && frequency !== undefined
                  ? { frequency, gate: meta['gate'] }
                  : undefined,
    createdAt,
    updatedAt,
    expiresAt:  meta['expires'] ? (typeof meta['expires'] === 'number' ? meta['expires'] as number : new Date(meta['expires'] as string).getTime()) : undefined,
  };

  return { valid: true, entry, errors: [], warnings };
}

// ── Serializer ────────────────────────────────────────────────────────────────

/**
 * Serialize a VaultEntry to ArcaneMD format.
 *
 * Guardian frequency and gate are auto-derived from the Guardian name when
 * not explicitly present on the entry.
 */
export function serializeArcaneMD(entry: VaultEntry): string {
  const guardian = entry.guardian;

  const frequency = guardian ? GUARDIAN_FREQUENCIES[guardian] : null;
  const gate = guardian ? (entry.gate ?? GUARDIAN_GATES[guardian]) : entry.gate ?? null;

  const lines: string[] = ['---'];

  lines.push(`id: ${entry.id}`);
  lines.push(`vault: ${entry.vault}`);

  if (guardian)  lines.push(`guardian: ${guardian}`);
  if (gate)      lines.push(`gate: ${gate}`);
  if (frequency) lines.push(`frequency: ${frequency}`);

  lines.push(`tags: [${entry.tags.join(', ')}]`);
  lines.push(`confidence: ${entry.confidence}`);

  if (entry.source) lines.push(`source: ${entry.source}`);

  lines.push(`created: ${entry.createdAt}`);
  lines.push(`updated: ${entry.updatedAt}`);
  lines.push(`expires: ${entry.expiresAt ?? 'null'}`);

  lines.push('---');
  lines.push('');
  lines.push(entry.content);

  return lines.join('\n');
}

// ── ID generation ─────────────────────────────────────────────────────────────

/**
 * Generate a unique ArcaneMD entry ID.
 *
 * Format: `{vault}_{timestampBase36}_{6-char random}`
 * Example: `strategic_lx5q2a_k7m3np`
 */
export function generateId(vault: VaultType): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${vault}_${timestamp}_${random}`;
}
