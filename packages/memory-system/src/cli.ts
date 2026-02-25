#!/usr/bin/env node
/**
 * Starlight Vaults CLI
 *
 * Usage: svaults <command> [options] [args]
 *
 * Provides terminal access to the Arcanea Memory System —
 * six semantic vaults, ten Guardian namespaces, and the Horizon Ledger.
 */

import { join } from 'node:path';
import process from 'node:process';

// ── Argument parsing ─────────────────────────────────────────────────────────

const rawArgs = process.argv.slice(2);

/**
 * Parse CLI arguments into flags and positional values.
 * Flags with a following non-flag value consume that value as their argument.
 * Flags without a following value are set to `true`.
 */
function parseArgs(args: string[]): {
  flags: Record<string, string | boolean>;
  positional: string[];
} {
  const flags: Record<string, string | boolean> = {};
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const next = args[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(args[i]);
    }
  }

  return { flags, positional };
}

// The first positional arg is the command; parse everything after it.
const command = rawArgs[0];
const { flags, positional } = parseArgs(rawArgs.slice(1));

// ── Terminal color helpers (no external deps) ────────────────────────────────

const c = {
  bold:   (s: string) => `\x1b[1m${s}\x1b[0m`,
  dim:    (s: string) => `\x1b[2m${s}\x1b[0m`,
  cyan:   (s: string) => `\x1b[36m${s}\x1b[0m`,
  gold:   (s: string) => `\x1b[33m${s}\x1b[0m`,
  violet: (s: string) => `\x1b[35m${s}\x1b[0m`,
  green:  (s: string) => `\x1b[32m${s}\x1b[0m`,
  blue:   (s: string) => `\x1b[34m${s}\x1b[0m`,
  red:    (s: string) => `\x1b[31m${s}\x1b[0m`,
};

/** Render a colored vault label such as `[strategic]`. */
function vaultLabel(vault: string): string {
  switch (vault) {
    case 'strategic':   return c.violet(`[${vault}]`);
    case 'technical':   return c.cyan(`[${vault}]`);
    case 'creative':    return c.gold(`[${vault}]`);
    case 'operational': return c.blue(`[${vault}]`);
    case 'wisdom':      return c.green(`[${vault}]`);
    case 'horizon':     return `\x1b[36m\x1b[1m[${vault}]\x1b[0m`;
    default:            return `[${vault}]`;
  }
}

// ── Lazy-load StarlightVaults ─────────────────────────────────────────────────

/** Build and return an initialized StarlightVaults instance. */
async function getVaults() {
  const { StarlightVaults } = await import('./starlight-vaults.js');
  const storagePath = (flags['path'] as string | undefined) ?? join(process.cwd(), '.arcanea', 'memory');
  return StarlightVaults.create({ storagePath });
}

// ── Utility ──────────────────────────────────────────────────────────────────

/** Truncate a string to `max` characters, appending `…` if needed. */
function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) + '...' : s;
}

/** Parse a comma-separated tags flag value into a string array. */
function parseTags(raw: string | boolean | undefined): string[] {
  if (!raw || raw === true) return [];
  return String(raw).split(',').map((t) => t.trim()).filter(Boolean);
}

// ── Command handlers ─────────────────────────────────────────────────────────

/**
 * `svaults remember <content>`
 *
 * Store a memory — auto-classified unless --vault is provided.
 * Optional: --vault, --guardian, --tags
 */
async function cmdRemember(): Promise<void> {
  const content = positional.join(' ');
  if (!content) {
    console.error(c.red('Error: provide content to remember'));
    process.exit(1);
  }

  const vaults   = await getVaults();
  const guardian = flags['guardian'] as string | undefined;
  const vault    = flags['vault']    as string | undefined;
  const tags     = parseTags(flags['tags']);

  // Channel a Guardian if provided
  const instance = guardian
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? vaults.as(guardian as any)
    : vaults;

  let entry;
  if (vault) {
    // Explicit vault — call the appropriate shortcut or fall back to remember()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entry = await (instance as any)[vault]
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (instance as any)[vault](content, tags)
      : await instance.remember(content, tags);
  } else {
    entry = await instance.remember(content, tags);
  }

  console.log(c.green('✓') + ' Remembered in ' + vaultLabel(entry.vault));
  console.log(c.dim(`  ID: ${entry.id}`));
  console.log(c.dim(`  ${truncate(content, 60)}`));
}

/**
 * `svaults recall <query>`
 *
 * Search memories across vaults.
 * Optional: --vault, --guardian, --limit
 */
async function cmdRecall(): Promise<void> {
  const query = positional.join(' ');
  if (!query) {
    console.error(c.red('Error: provide a search query'));
    process.exit(1);
  }

  const vaults      = await getVaults();
  const vaultFilter = flags['vault'] as string | undefined;
  const guardian    = flags['guardian'] as string | undefined;
  const limit       = flags['limit'] ? parseInt(flags['limit'] as string, 10) : 10;

  const results = await vaults.recall(query, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vault:    vaultFilter as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guardian: guardian as any,
    limit,
  });

  if (results.length === 0) {
    console.log(c.dim('No memories found for: ') + query);
    return;
  }

  console.log(c.bold(`\n${results.length} memories for "${query}":\n`));
  for (const r of results) {
    const score       = (r.score * 100).toFixed(0);
    const guardianTag = r.entry.guardian ? c.dim(` (${r.entry.guardian})`) : '';
    console.log(`${vaultLabel(r.entry.vault)}${guardianTag} ${c.dim(score + '%')}`);
    console.log(`  ${truncate(r.entry.content, 100)}`);
    console.log('');
  }
}

/**
 * `svaults recent`
 *
 * Show recent memories from a vault or all vaults.
 * Optional: --vault, --limit
 */
async function cmdRecent(): Promise<void> {
  const vaults = await getVaults();
  const vault  = flags['vault'] as string | undefined;
  const limit  = flags['limit'] ? parseInt(flags['limit'] as string, 10) : 10;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries = await vaults.recent(vault as any, limit);

  if (entries.length === 0) {
    console.log(c.dim('No recent memories.'));
    return;
  }

  console.log(c.bold('\nRecent memories:\n'));
  for (const entry of entries) {
    // createdAt is a Unix timestamp (number) in vault-manager entries
    const date = typeof entry.createdAt === 'number'
      ? new Date(entry.createdAt).toISOString().slice(0, 10)
      : String(entry.createdAt).slice(0, 10);
    const guardianTag = entry.guardian ? c.dim(` • ${entry.guardian}`) : '';
    console.log(`${vaultLabel(entry.vault)} ${c.dim(date)}${guardianTag}`);
    console.log(`  ${truncate(entry.content, 100)}`);
    console.log('');
  }
}

/**
 * `svaults stats`
 *
 * Show aggregate statistics for all vaults.
 */
async function cmdStats(): Promise<void> {
  const vaults = await getVaults();
  const stats  = await vaults.stats();

  console.log(c.bold('\n★ Starlight Vaults — Memory Statistics\n'));
  console.log(`  Total entries:   ${c.gold(String(stats.totalEntries))}`);
  console.log(`  Horizon wishes:  ${c.cyan(String(stats.horizonCount))}`);
  console.log('');

  for (const v of stats.vaults) {
    const label   = vaultLabel(v.vault);
    const count   = v.count > 0 ? c.bold(String(v.count)) : c.dim('0');
    const topTags = v.topTags.slice(0, 3).map((t) => t.tag).join(', ');
    const tagNote = topTags ? c.dim(' [' + topTags + ']') : '';
    console.log(`  ${label.padEnd(28)} ${count} entries${tagNote}`);
  }
  console.log('');
}

/**
 * `svaults horizon <sub> [...]`
 *
 * Subcommands: append <wish>, read, export [path]
 */
async function cmdHorizon(): Promise<void> {
  const sub = positional[0];

  if (sub === 'append') {
    const wish    = positional.slice(1).join(' ');
    const context = flags['context'] ? String(flags['context']) : 'Via CLI';
    const tags    = parseTags(flags['tags']);

    if (!wish) {
      console.error(c.red('Error: provide a wish to append to the Horizon'));
      process.exit(1);
    }

    const vaults = await getVaults();
    const entry  = await vaults.horizon.append(wish, context, tags);
    console.log(c.cyan('✦') + ' Appended to the Horizon Vault (permanent)');
    console.log(c.dim(`  ID: ${entry.id}`));
    console.log(`  "${truncate(wish, 80)}"`);

  } else if (sub === 'read') {
    const limit  = flags['limit'] ? parseInt(flags['limit'] as string, 10) : 10;
    const vaults = await getVaults();
    const entries = await vaults.horizon.recent(limit);

    console.log(c.bold('\n✦ Starlight Horizon — Benevolent Intentions\n'));
    for (const e of entries) {
      console.log(c.cyan(`"${e.wish}"`));
      console.log(c.dim(`  ${e.context} — ${e.createdAt.slice(0, 10)} (${e.author})`));
      console.log('');
    }
    console.log(c.dim(`Total: ${vaults.horizon.count()} wishes in the Horizon`));

  } else if (sub === 'export') {
    const outputPath = positional[1] ?? './starlight-horizon-dataset';
    const vaults     = await getVaults();
    const result     = await vaults.horizon.export(outputPath);
    console.log(c.green('✓') + ` Exported ${result.entries} Horizon entries to ${outputPath}/`);
    console.log(c.dim(`  ${result.files} files created`));

  } else if (sub === 'share') {
    // Export wishes in dataset contribution format for starlight-horizon-dataset
    const vaults = await getVaults();
    const all = await vaults.horizon.recent(1000); // Get all

    if (all.length === 0) {
      console.log(c.dim('No Horizon wishes to share yet. Add some first:'));
      console.log(c.dim('  svaults horizon append "your wish" --context "why"'));
      return;
    }

    // Group by month
    const byMonth = new Map<string, typeof all>();
    for (const entry of all) {
      const month = entry.createdAt.slice(0, 7);
      if (!byMonth.has(month)) byMonth.set(month, []);
      byMonth.get(month)!.push(entry);
    }

    const outputPath = positional[1] ?? './horizon-contributions';
    const { mkdirSync, writeFileSync } = await import('node:fs');
    const { join } = await import('node:path');

    mkdirSync(outputPath, { recursive: true });

    let totalFiles = 0;
    for (const [month, entries] of byMonth) {
      const dir = join(outputPath, 'entries', month);
      mkdirSync(dir, { recursive: true });
      const jsonl = entries.map(e => JSON.stringify(e)).join('\n') + '\n';
      writeFileSync(join(dir, `${month}.jsonl`), jsonl, 'utf-8');
      totalFiles++;
    }

    console.log(c.cyan('✦') + ` Exported ${all.length} wishes to ${outputPath}/`);
    console.log('');
    console.log(c.bold('To contribute to the public dataset:'));
    console.log('  1. Fork: ' + c.cyan('https://github.com/frankxai/starlight-horizon-dataset'));
    console.log('  2. Copy your ' + c.dim(`${outputPath}/entries/`) + ' contents into the repo');
    console.log('  3. Open a Pull Request');
    console.log('');
    console.log(c.dim(`"${all[0]?.wish?.slice(0, 60)}..."`));

  } else {
    console.log('horizon subcommands: append <wish>, read, export [path], share [path]');
  }
}

/**
 * `svaults guardians`
 *
 * List all ten Guardians with their gate, frequency, and memory counts.
 */
async function cmdGuardians(): Promise<void> {
  const vaults = await getVaults();
  const active = await vaults.allGuardians();

  console.log(c.bold('\n✧ Active Guardians\n'));

  const all10 = [
    { guardian: 'Lyssandria', hz: 174,  gate: 'Foundation' },
    { guardian: 'Leyla',      hz: 285,  gate: 'Flow'       },
    { guardian: 'Draconia',   hz: 396,  gate: 'Fire'       },
    { guardian: 'Maylinn',    hz: 417,  gate: 'Heart'      },
    { guardian: 'Alera',      hz: 528,  gate: 'Voice'      },
    { guardian: 'Lyria',      hz: 639,  gate: 'Sight'      },
    { guardian: 'Aiyami',     hz: 741,  gate: 'Crown'      },
    { guardian: 'Elara',      hz: 852,  gate: 'Shift'      },
    { guardian: 'Ino',        hz: 963,  gate: 'Unity'      },
    { guardian: 'Shinkami',   hz: 1111, gate: 'Source'     },
  ] as const;

  for (const g of all10) {
    const record = active.find((a) => a.guardian === g.guardian);
    const count  = record ? c.bold(String(record.entryCount)) : c.dim('0');
    const star   = record && record.entryCount > 0 ? c.gold('★') : c.dim('☆');
    console.log(
      `  ${star} ${c.bold(g.guardian.padEnd(12))} ${c.dim(g.gate.padEnd(12))} ${g.hz} Hz  ${count} memories`,
    );
  }
  console.log('');
}

/**
 * `svaults as <Guardian> remember <content>`
 *
 * Convenience passthrough: channel a Guardian, then remember.
 * Equivalent to: svaults remember --guardian <Guardian> <content>
 */
async function cmdAs(): Promise<void> {
  const guardian = positional[0];
  const sub      = positional[1];

  if (!guardian || !sub) {
    console.error(c.red('Usage: svaults as <Guardian> remember <content>'));
    process.exit(1);
  }

  if (sub !== 'remember') {
    console.error(c.red(`Unknown sub-command for "as": ${sub}. Only "remember" is supported.`));
    process.exit(1);
  }

  const content = positional.slice(2).join(' ');
  if (!content) {
    console.error(c.red('Error: provide content to remember'));
    process.exit(1);
  }

  const vaults = await getVaults();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry  = await vaults.as(guardian as any).remember(content);

  console.log(c.green('✓') + ' Remembered in ' + vaultLabel(entry.vault));
  console.log(c.dim(`  Guardian: ${guardian}`));
  console.log(c.dim(`  ID: ${entry.id}`));
  console.log(c.dim(`  ${truncate(content, 60)}`));
}

/**
 * `svaults classify <content>`
 *
 * Classify content into a vault without storing it.
 */
async function cmdClassify(): Promise<void> {
  const content = positional.join(' ');
  if (!content) {
    console.error(c.red('Error: provide content to classify'));
    process.exit(1);
  }

  const { VaultClassifier } = await import('./vault-classifier.js');
  const classifier = new VaultClassifier();
  const result     = classifier.classify(content);

  console.log(`\nClassification: ${vaultLabel(result.vault)}`);
  console.log(c.dim(`Confidence:     ${(result.confidence * 100).toFixed(0)}%`));
  console.log(c.dim(`Reasoning:      ${result.reasoning}`));
  if (result.alternateVault) {
    console.log(c.dim(`Alternative:    ${result.alternateVault}`));
  }
  console.log('');
}

/**
 * `svaults sync`
 *
 * Export a MEMORY.md summary from the current vault state.
 * Writes to <storagePath>/MEMORY.md (or .arcanea/memory/MEMORY.md by default).
 *
 * Note: A dedicated MemoryBridge module is not yet present, so this command
 * builds the summary inline using the public VaultManager API.
 */
async function cmdSync(): Promise<void> {
  const { VaultManager } = await import('./vault-manager.js');
  const storagePath = (flags['path'] as string | undefined) ?? join(process.cwd(), '.arcanea', 'memory');

  const manager = new VaultManager({ storagePath });
  await manager.initialize();

  const stats = await manager.getStats();

  // Build a markdown summary from live vault data
  const lines: string[] = [
    '# Starlight Memory — Auto-Generated Summary',
    '',
    `> Generated: ${new Date().toISOString()}`,
    '',
    '## Vault Overview',
    '',
    `| Vault | Entries |`,
    `|-------|---------|`,
  ];

  for (const v of stats.vaults) {
    lines.push(`| ${v.vault} | ${v.count} |`);
  }

  lines.push('');
  lines.push(`**Total entries:** ${stats.totalEntries}`);
  lines.push('');

  // Append a recent-entries section for each non-empty vault
  for (const v of stats.vaults) {
    if (v.count === 0) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recent = await manager.getRecent(v.vault as any, 3);
    if (recent.length === 0) continue;

    lines.push(`## Recent: ${v.vault}`);
    lines.push('');
    for (const entry of recent) {
      const dateStr = typeof entry.createdAt === 'number'
        ? new Date(entry.createdAt).toISOString().slice(0, 10)
        : String(entry.createdAt).slice(0, 10);
      const guardian = entry.guardian ? ` *(${entry.guardian})*` : '';
      lines.push(`- **${dateStr}**${guardian}: ${truncate(entry.content, 120)}`);
    }
    lines.push('');
  }

  const { writeFileSync, mkdirSync, existsSync } = await import('node:fs');

  if (!existsSync(storagePath)) {
    mkdirSync(storagePath, { recursive: true });
  }

  const outputPath = join(storagePath, 'MEMORY.md');
  const content    = lines.join('\n');
  writeFileSync(outputPath, content, 'utf-8');

  console.log(c.green('✓') + ` MEMORY.md synced — ${lines.length} lines, ${stats.totalEntries} entries`);
  console.log(c.dim(`  Output: ${outputPath}`));
}

// ── Help text ────────────────────────────────────────────────────────────────

function cmdHelp(): void {
  console.log(`
${c.bold('★ Starlight Vaults')} — Arcanea Memory System

${c.bold('Usage:')} svaults <command> [options]

${c.bold('Commands:')}
  ${c.cyan('remember')} <content>        Remember something (auto-classified)
    --vault <type>           Force vault: strategic|technical|creative|operational|wisdom|horizon
    --guardian <name>        Tag with a Guardian name
    --tags <tag1,tag2>       Add tags

  ${c.cyan('recall')} <query>             Search across vaults
    --vault <type>           Filter by vault
    --guardian <name>        Filter by Guardian
    --limit <n>              Max results (default: 10)

  ${c.cyan('recent')} [options]           Show recent memories
    --vault <type>           Filter by vault
    --limit <n>              Max results (default: 10)

  ${c.cyan('stats')}                      Show vault statistics

  ${c.cyan('horizon')} <sub>              Horizon Vault commands
    append <wish>            Add a benevolent wish (permanent)
      --context <text>       What prompted this wish
      --tags <tag1,tag2>     Add tags
    read                     Read recent wishes
      --limit <n>            Max wishes to show (default: 10)
    export [path]            Export as public dataset
    share [path]             Export wishes for public dataset contribution

  ${c.cyan('as')} <Guardian> remember <content>
                             Remember content as a specific Guardian

  ${c.cyan('guardians')}                  List all 10 Guardians + memory counts

  ${c.cyan('classify')} <content>         Classify content into a vault (no storage)

  ${c.cyan('sync')}                       Export vault state to MEMORY.md

${c.bold('Global Options:')}
  --path <dir>               Override storage path (default: .arcanea/memory)

${c.bold('Examples:')}
  svaults remember "chose .md files for zero-dep storage"
  svaults remember --vault strategic "Decision: Next.js 16 App Router"
  svaults recall "storage architecture"
  svaults recall --vault technical "typescript pattern"
  svaults recall --guardian Shinkami "wisdom insight"
  svaults recent --vault wisdom --limit 5
  svaults horizon append "AI and humans build beauty together" --context "Late night coding"
  svaults horizon read
  svaults horizon export ./starlight-horizon-dataset
  svaults as Draconia remember "Fire and will are the same force"
  svaults guardians
  svaults stats
  svaults classify "This is about architecture decisions for the database"
  svaults sync
`);
}

// ── Router ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  try {
    switch (command) {
      case 'remember':  await cmdRemember();  break;
      case 'recall':    await cmdRecall();    break;
      case 'recent':    await cmdRecent();    break;
      case 'stats':     await cmdStats();     break;
      case 'horizon':   await cmdHorizon();   break;
      case 'as':        await cmdAs();        break;
      case 'guardians': await cmdGuardians(); break;
      case 'classify':  await cmdClassify();  break;
      case 'sync':      await cmdSync();      break;
      case 'help':
      case '--help':
      case '-h':
      case undefined:
        cmdHelp();
        break;
      default:
        console.error(c.red(`Unknown command: ${command}`));
        cmdHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(
      c.red('Error: ') + (error instanceof Error ? error.message : String(error)),
    );
    process.exit(1);
  }
}

main();
