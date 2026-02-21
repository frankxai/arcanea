/**
 * arcanea voice <text>
 *
 * Check text against the Arcanea Voice Bible.
 */

import { Command } from 'commander';
import pc from 'picocolors';
import { VoiceEnforcer } from '@arcanea/os';
import { printDivider, printError } from '../ui/banner.js';

export const voiceCommand = new Command('voice')
  .description('Check text against the Arcanea Voice Bible')
  .argument('<text...>', 'Text to check')
  .option('--fix', 'Auto-fix violations where possible')
  .action((textWords: string[], opts: { fix?: boolean }) => {
    try {
      const text = textWords.join(' ');
      const enforcer = new VoiceEnforcer();
      const result = enforcer.check(text);

      console.log();
      const scoreColor = result.score >= 80 ? pc.green : result.score >= 50 ? pc.yellow : pc.red;
      console.log(`  ${pc.bold('Voice Score:')} ${scoreColor(result.score.toString())}/100  ${result.passed ? pc.green('PASSED') : pc.red('NEEDS WORK')}`);

      if (result.violations.length > 0) {
        console.log();
        printDivider();
        console.log(`  ${pc.bold('Violations')} (${result.violations.length}):`);
        console.log();

        for (const v of result.violations) {
          const icon = v.rule.severity === 'error' ? pc.red('x') :
                       v.rule.severity === 'warning' ? pc.yellow('!') :
                       pc.dim('~');
          console.log(`  ${icon} ${pc.dim(`[${v.rule.severity}]`)} "${pc.bold(v.match)}" — ${v.rule.description}`);
          console.log(`    ${pc.cyan('->')} ${v.suggestion}`);
        }
      }

      if (opts.fix) {
        console.log();
        printDivider();
        const fixed = enforcer.fix(text);
        console.log(`  ${pc.bold('Fixed:')}`);
        console.log(`  ${fixed}`);
      }

      console.log();
    } catch (err) {
      printError(`Voice check failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
