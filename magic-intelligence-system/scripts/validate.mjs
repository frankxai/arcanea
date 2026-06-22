#!/usr/bin/env node
/**
 * Validates data/spells.json against the spell schema's load-bearing rules.
 * Dependency-free: checks enums, required fields, id uniqueness, and the
 * canonical tier <-> gate <-> rank mapping from docs/MAGIC-PROTOCOLS.md.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const ELEMENTS = ['fire', 'water', 'earth', 'wind', 'void', 'spirit'];
const DISCIPLINES = ['attack', 'defense', 'summoning'];
const TIERS = ['light', 'advanced', 'greater', 'sacred', 'royal', 'imperial', 'divine'];
const RANKS = ['apprentice', 'mage', 'master', 'archmage', 'luminor'];
const REQUIRED = ['id', 'name', 'incantation', 'element', 'discipline', 'tier', 'gate', 'rank', 'description', 'effect', 'manaCost'];

// tier -> { gates: [min,max], rank }
const TIER_MAP = {
  light: { gates: [1, 2], rank: 'apprentice' },
  advanced: { gates: [3, 4], rank: 'mage' },
  greater: { gates: [5, 6], rank: 'master' },
  sacred: { gates: [7, 7], rank: 'archmage' },
  royal: { gates: [8, 8], rank: 'archmage' },
  imperial: { gates: [9, 9], rank: 'luminor' },
  divine: { gates: [10, 10], rank: 'luminor' },
};

const data = JSON.parse(readFileSync(join(root, 'data', 'spells.json'), 'utf8'));
const spells = data.spells ?? [];
const errors = [];
const ids = new Set();

for (const [i, s] of spells.entries()) {
  const at = `spell[${i}] (${s.id ?? '?'})`;
  for (const f of REQUIRED) if (s[f] === undefined) errors.push(`${at}: missing required '${f}'`);
  if (s.id) {
    if (ids.has(s.id)) errors.push(`${at}: duplicate id`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id)) errors.push(`${at}: id not kebab-case`);
    ids.add(s.id);
  }
  if (s.element && !ELEMENTS.includes(s.element)) errors.push(`${at}: bad element '${s.element}'`);
  if (s.discipline && !DISCIPLINES.includes(s.discipline)) errors.push(`${at}: bad discipline '${s.discipline}'`);
  if (s.tier && !TIERS.includes(s.tier)) errors.push(`${at}: bad tier '${s.tier}'`);
  if (s.rank && !RANKS.includes(s.rank)) errors.push(`${at}: bad rank '${s.rank}'`);
  if (typeof s.gate === 'number' && (s.gate < 1 || s.gate > 10)) errors.push(`${at}: gate out of 1-10`);
  const map = TIER_MAP[s.tier];
  if (map) {
    if (typeof s.gate === 'number' && (s.gate < map.gates[0] || s.gate > map.gates[1]))
      errors.push(`${at}: tier '${s.tier}' requires gate ${map.gates[0]}-${map.gates[1]}, got ${s.gate}`);
    if (s.rank && s.rank !== map.rank)
      errors.push(`${at}: tier '${s.tier}' requires rank '${map.rank}', got '${s.rank}'`);
  }
}

// Coverage: every discipline x tier cell should have >= 1 spell.
const cells = new Set(spells.map((s) => `${s.discipline}/${s.tier}`));
const missing = [];
for (const d of DISCIPLINES) for (const t of TIERS) if (!cells.has(`${d}/${t}`)) missing.push(`${d}/${t}`);

if (errors.length) {
  console.error(`✗ ${errors.length} validation error(s):`);
  for (const e of errors) console.error('  - ' + e);
}
if (missing.length) console.warn(`⚠ ${missing.length} empty matrix cell(s): ${missing.join(', ')}`);
if (!errors.length) console.log(`✓ ${spells.length} spells valid · matrix ${21 - missing.length}/21 cells filled`);
process.exit(errors.length ? 1 : 0);
