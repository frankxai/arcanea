#!/usr/bin/env node

/**
 * @arcanea/cli
 * The Arcanea Intelligence OS command line interface.
 */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { authCommand } from './commands/auth.js';
import { statusCommand } from './commands/status.js';
import { installCommand } from './commands/install.js';
import { updateCommand } from './commands/update.js';
import { worldCommand } from './commands/world.js';
import { createCommand } from './commands/create.js';

const program = new Command();

program
  .name('arcanea')
  .description('Arcanea Intelligence OS — Overlay any AI tool with arcane intelligence')
  .version('1.0.0');

program.addCommand(initCommand);
program.addCommand(authCommand);
program.addCommand(statusCommand);
program.addCommand(installCommand);
program.addCommand(updateCommand);
program.addCommand(worldCommand);
program.addCommand(createCommand);

program.parse(process.argv);
