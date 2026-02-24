/**
 * arcanea tokens [--format css|tailwind|json]
 *
 * Export Arcanea design system tokens.
 */

import { Command } from 'commander';
import pc from 'picocolors';
import { toCSSVariables, toTailwindConfig, tokensToJSON, COLORS } from '@arcanea/os';

export const tokensCommand = new Command('tokens')
  .description('Export Arcanea design system tokens')
  .option('-f, --format <format>', 'Output format: css, tailwind, json', 'json')
  .option('--colors', 'Show color palette only')
  .action((opts: { format: string; colors?: boolean }) => {
    if (opts.colors) {
      console.log();
      console.log(`  ${pc.bold('Arcanea Color Palette')}`);
      console.log();

      for (const [group, values] of Object.entries(COLORS)) {
        console.log(`  ${pc.bold(pc.dim(group.toUpperCase()))}`);
        for (const [name, value] of Object.entries(values)) {
          console.log(`    ${pc.dim(name.padEnd(12))} ${value}`);
        }
        console.log();
      }
      return;
    }

    switch (opts.format) {
      case 'css':
        console.log(toCSSVariables());
        break;
      case 'tailwind':
        console.log(JSON.stringify(toTailwindConfig(), null, 2));
        break;
      case 'json':
      default:
        console.log(JSON.stringify(tokensToJSON(), null, 2));
        break;
    }
  });
