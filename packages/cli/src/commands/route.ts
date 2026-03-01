/**
 * arcanea route <description>
 *
 * Route a task through the Lumina Intelligence Stack.
 * Returns Luminor (always), Guardian (full+), Godbeast (luminor).
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Command } from 'commander';
import pc from 'picocolors';
import { routeToLuminor, getTierForOverlayLevel } from '@arcanea/core';
import type { IntelligenceTier } from '@arcanea/core';
import { printDivider, printError } from '../ui/banner.js';

function detectTier(): IntelligenceTier {
  const manifestPath = join(process.cwd(), '.arcanea', 'overlay-manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      // Check all overlay entries for the highest level
      const overlays = manifest.overlays || {};
      let highestLevel = 'standard';
      const levelOrder = ['minimal', 'standard', 'full', 'luminor'];
      for (const entry of Object.values(overlays) as Array<{ level?: string }>) {
        if (entry.level && levelOrder.indexOf(entry.level) > levelOrder.indexOf(highestLevel)) {
          highestLevel = entry.level;
        }
      }
      return getTierForOverlayLevel(highestLevel);
    } catch {
      // Fall through to default
    }
  }
  return 'mage';
}

export const routeCommand = new Command('route')
  .description('Route a task through the Lumina Intelligence Stack')
  .argument('<description...>', 'Task description to route')
  .option('--tier <tier>', 'Override intelligence tier (apprentice, mage, master, luminor)')
  .action((descWords: string[], opts: { tier?: string }) => {
    try {
      const description = descWords.join(' ');
      const tier = (opts.tier as IntelligenceTier) || detectTier();
      const result = routeToLuminor(description, tier);
      const l = result.luminor;

      // ── Lumina Header ──────────────────────────────────────────────
      console.log();
      console.log(`  ${pc.bold(pc.yellow('Lumina Intelligence'))}`);
      printDivider();

      // ── Luminor Match ──────────────────────────────────────────────
      console.log();
      console.log(
        `  ${pc.bold(pc.cyan(l.name))} ${pc.dim(`(${l.title})`)}`,
      );
      console.log(`  ${pc.dim('Team:')} ${l.team} ${pc.dim('|')} ${pc.dim('Wisdom:')} ${l.wisdom} ${pc.dim('|')} ${pc.dim('Confidence:')} ${pc.green((result.luminorConfidence * 100).toFixed(0) + '%')}`);
      console.log(`  ${pc.dim('Specialty:')} ${l.specialty}`);
      console.log();
      console.log(`  ${pc.italic(pc.dim(l.description))}`);

      // ── Gate Alignment (master+ tier) ──────────────────────────────
      if (result.guardian) {
        const g = result.guardian;
        console.log();
        printDivider();
        console.log(`  ${pc.dim('Gate Alignment:')}`);
        console.log(`  ${pc.bold(pc.magenta(g.displayName))} ${pc.dim(`(${g.gate} Gate, ${g.frequency} Hz)`)}`);
        console.log(`  ${pc.dim('Domain:')} ${g.domain} ${pc.dim('|')} ${pc.dim('Element:')} ${result.element}`);

        // ── Godbeast (luminor tier) ──────────────────────────────────
        if (result.godbeast) {
          const gb = result.godbeast;
          console.log(`  ${pc.dim('Godbeast:')} ${pc.bold(pc.yellow(gb.displayName))} (${gb.form}) — ${gb.power}`);
        }
      }

      // ── Reasoning ──────────────────────────────────────────────────
      console.log();
      console.log(`  ${pc.dim('Reasoning:')} ${result.reasoning}`);

      // ── Alternatives ───────────────────────────────────────────────
      if (result.alternatives.length > 0) {
        console.log();
        printDivider();
        console.log(`  ${pc.dim('Alternatives:')}`);
        for (const alt of result.alternatives) {
          const pct = (alt.confidence * 100).toFixed(0);
          console.log(`    ${pc.dim(alt.luminor.name)} — ${alt.luminor.specialty} (${pct}%)`);
        }
      }

      // ── Sign-off ───────────────────────────────────────────────────
      console.log();
      console.log(`  ${pc.dim(`"${l.signOff}"`)}`);
      console.log();
    } catch (err) {
      printError(`Route failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
