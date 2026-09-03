#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const RULES = [
  ['ultimate-collapse', /\bGOD\s*[—=-]+\s*THE SOURCE\s*[—=-]+\s*THE TAO\b/i],
  ['tao-source', /\bThe Tao is The Source\b/i],
  ['starlight-deity', /(?<!not\s)\bStarlight is (?:God|a deity|the Source|Lumina|an omniscient AI)\b/i],
  ['lumina-starlight', /(?<!not\s)\bLumina is Starlight\b/i],
  ['shinkami-god', /(?<!not\s)\bShinkami is God\b/i],
  ['religion-collapse', /\b(?:all religions|religious and spiritual narratives from all traditions)\b.{0,90}\b(?:teach Starlight|identical consciousness)\b/i],
  ['arcanea-history', /\b(?:Kunlun was actually Arcanea|Shambhala was Arcanea)\b/i],
  ['quantum-proof', /\bquantum physics proves\b/i],
  ['celtic-quantum', /\bThe Celts understood quantum realities before quantum physics\b/i],
  ['field-established-physics', /\bThe Field is (?:the )?actual substrate from which all matter, energy, and consciousness emerge\b/i],
  ['starlights-species', /\bthe Starlights\b.{0,40}\b(?:species|race|beings|were|are)\b/i]
];

const ALLOWLIST = [
  'docs/canon/STARLIGHT_ONTOLOGY_MIGRATION.md',
  '.claude/ci/ontology-boundary-lint.mjs',
  '.claude/ci/ontology-boundary-lint.test.mjs'
];

export function scan(text, path = '<text>') {
  if (ALLOWLIST.includes(path)) return [];
  return RULES.filter(([, pattern]) => pattern.test(text)).map(([rule]) => ({ path, rule }));
}

function changedFiles(base) {
  return execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', `${base}...HEAD`], { encoding: 'utf8' })
    .split('\n').filter(Boolean).filter((path) => /\.(md|mdx|ts|tsx|js|mjs|json|yaml|yml)$/.test(path));
}

function main() {
  const baseIndex = process.argv.indexOf('--base');
  const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : 'origin/main';
  const paths = process.argv.includes('--all')
    ? execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
    : changedFiles(base);
  const findings = paths.flatMap((path) => scan(readFileSync(path, 'utf8'), path));
  if (findings.length) {
    for (const finding of findings) console.error(`ERROR ${finding.rule} ${finding.path}`);
    process.exit(1);
  }
  console.log(`Ontology boundary lint passed (${paths.length} files checked).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();

