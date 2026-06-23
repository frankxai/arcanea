#!/usr/bin/env node
/**
 * pack-swarm — CLI for the swarm packaging protocol.
 *
 *   pack-swarm list                       list bundled reference manifests
 *   pack-swarm validate <file|slug>       validate a manifest, exit non-zero on error
 *   pack-swarm canonicalize <file|slug>   print the canonical (pinnable) JSON
 *   pack-swarm fingerprint <file|slug>    print the deterministic content fingerprint
 *
 * A <slug> resolves to manifests/<slug>.json shipped with this package.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { validateSwarmManifest } from './schema';
import { canonicalize, manifestFingerprint } from './pack';

const MANIFEST_DIR = join(__dirname, '..', 'manifests');

function resolvePath(arg: string): string {
  if (existsSync(arg)) return arg;
  const asSlug = join(MANIFEST_DIR, arg.endsWith('.json') ? arg : `${arg}.json`);
  if (existsSync(asSlug)) return asSlug;
  throw new Error(`Cannot find manifest: '${arg}' (looked for a file path and manifests/${arg}.json)`);
}

function loadJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function listManifests(): string[] {
  if (!existsSync(MANIFEST_DIR)) return [];
  return readdirSync(MANIFEST_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

function main(argv: string[]): number {
  const [cmd, arg] = argv;

  if (cmd === 'list') {
    const slugs = listManifests();
    if (slugs.length === 0) {
      console.log('(no bundled manifests)');
    } else {
      slugs.forEach((s) => console.log(s));
    }
    return 0;
  }

  if (!cmd || !['validate', 'canonicalize', 'fingerprint'].includes(cmd)) {
    console.error('usage: pack-swarm <list|validate|canonicalize|fingerprint> [file|slug]');
    return 2;
  }
  if (!arg) {
    console.error(`error: '${cmd}' needs a file path or manifest slug`);
    return 2;
  }

  let data: unknown;
  try {
    data = loadJson(resolvePath(arg));
  } catch (err) {
    console.error(`error: ${(err as Error).message}`);
    return 2;
  }

  const result = validateSwarmManifest(data);
  if (!result.valid || !result.value) {
    console.error(`INVALID ${arg}:`);
    result.errors.forEach((e) => console.error(`  - ${e}`));
    return 1;
  }

  if (cmd === 'validate') {
    console.log(`OK ${result.value.id}@${result.value.version} (${result.value.agents.length} agents, ${result.value.chains.length} chains)`);
    return 0;
  }
  if (cmd === 'canonicalize') {
    console.log(canonicalize(result.value));
    return 0;
  }
  if (cmd === 'fingerprint') {
    console.log(`${result.value.id}@${result.value.version} ${manifestFingerprint(result.value)}`);
    return 0;
  }
  return 0;
}

process.exit(main(process.argv.slice(2)));
