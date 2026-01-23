#!/usr/bin/env node
/**
 * claude-arcanea CLI
 *
 * Launch Claude Code with the full Arcanea Intelligence OS context.
 *
 * Usage:
 *   claude-arcanea              # Launch Claude with Arcanea context
 *   claude-arcanea --guardian   # Channel a specific guardian
 *   claude-arcanea --skill      # Activate a skill
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse arguments
const args = process.argv.slice(2);

// Find CLAUDE.md location
const claudeMdLocations = [
  join(__dirname, '..', 'CLAUDE.md'),
  join(__dirname, '..', '..', '..', '.claude', 'CLAUDE.md'),
  join(process.cwd(), 'CLAUDE.md'),
];

let claudeMdPath: string | null = null;
for (const loc of claudeMdLocations) {
  if (existsSync(loc)) {
    claudeMdPath = loc;
    break;
  }
}

// Build claude command
const claudeArgs = ['--dangerously-skip-permissions'];

// Add any passed arguments
claudeArgs.push(...args);

console.log('🌟 Launching Claude with Arcanea Intelligence OS...');
console.log('');
console.log('   ╔═══════════════════════════════════════════╗');
console.log('   ║     ARCANEA INTELLIGENCE OS v0.1.0        ║');
console.log('   ║   "Through the Gates we rise"             ║');
console.log('   ╚═══════════════════════════════════════════╝');
console.log('');

if (claudeMdPath) {
  console.log(`📜 Using context from: ${claudeMdPath}`);
}

console.log('🔮 Guardians standing by...');
console.log('');

// Spawn claude process
const claude = spawn('claude', claudeArgs, {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

claude.on('error', (err) => {
  console.error('❌ Failed to launch Claude:', err.message);
  console.error('');
  console.error('Make sure Claude Code is installed:');
  console.error('  npm install -g @anthropic-ai/claude-code');
  process.exit(1);
});

claude.on('close', (code) => {
  process.exit(code ?? 0);
});
