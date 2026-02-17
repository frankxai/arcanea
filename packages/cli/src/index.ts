#!/usr/bin/env node

/**
 * @arcanea/cli
 * Arcanea Realm — Your AI Creation Realm
 *
 * Overlay any AI tool with arcane intelligence.
 * Route tasks through Guardians. Enforce voice. Create worlds.
 */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { authCommand } from './commands/auth.js';
import { statusCommand } from './commands/status.js';
import { installCommand } from './commands/install.js';
import { updateCommand } from './commands/update.js';
import { worldCommand } from './commands/world.js';
import { createCommand } from './commands/create.js';
import { routeCommand } from './commands/route.js';
import { voiceCommand } from './commands/voice.js';
import { tokensCommand } from './commands/tokens.js';

const program = new Command();

program
  .name('arcanea')
  .description('Arcanea Realm — Overlay any AI tool with arcane intelligence')
  .version('0.2.0');

// Overlay management
program.addCommand(initCommand);
program.addCommand(authCommand);
program.addCommand(statusCommand);
program.addCommand(installCommand);
program.addCommand(updateCommand);

// Intelligence engine
program.addCommand(routeCommand);
program.addCommand(voiceCommand);
program.addCommand(tokensCommand);

// Creative tools
program.addCommand(worldCommand);
program.addCommand(createCommand);

program.parse(process.argv);
