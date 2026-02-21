/**
 * arcanea route <description>
 *
 * Route a task to the best Guardian using the intelligence engine.
 */

import { Command } from 'commander';
import pc from 'picocolors';
import { routeToGuardian } from '@arcanea/os';
import { printDivider, printError } from '../ui/banner.js';

export const routeCommand = new Command('route')
  .description('Route a task to the best Guardian')
  .argument('<description...>', 'Task description to route')
  .action((descWords: string[]) => {
    try {
      const description = descWords.join(' ');
      const result = routeToGuardian(description);
      const g = result.guardian;

      console.log();
      console.log(
        `  ${pc.bold(pc.cyan(g.displayName))} ${pc.dim(`(${g.role})`)}`,
      );
      console.log(`  ${pc.dim('Gate:')} ${g.gate} ${pc.dim('|')} ${pc.dim('Element:')} ${result.element} ${pc.dim('|')} ${pc.dim('Confidence:')} ${pc.green((result.confidence * 100).toFixed(0) + '%')}`);
      console.log(`  ${pc.dim('Domain:')} ${g.domain}`);
      console.log();
      console.log(`  ${pc.italic(pc.dim(g.vibe))}`);
      console.log();
      console.log(`  ${pc.dim('Reasoning:')} ${result.reasoning}`);

      if (result.alternatives.length > 0) {
        console.log();
        printDivider();
        console.log(`  ${pc.dim('Alternatives:')}`);
        for (const alt of result.alternatives) {
          const pct = (alt.confidence * 100).toFixed(0);
          console.log(`    ${pc.dim(alt.guardian.displayName)} (${pct}%)`);
        }
      }

      console.log();
      console.log(`  ${pc.dim(g.signOff)}`);
      console.log();
    } catch (err) {
      printError(`Route failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
