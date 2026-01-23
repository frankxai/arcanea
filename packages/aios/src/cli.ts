#!/usr/bin/env node
/**
 * Arcanea Intelligence OS CLI
 *
 * The unified command center for orchestrating AI agents across platforms.
 *
 * Usage:
 *   aios                        # Interactive mode
 *   aios channel <guardian>     # Channel a guardian
 *   aios platform <name>        # Switch platform (claude, gemini, opencode)
 *   aios swarm <task>           # Launch multi-agent swarm
 *   aios quest                  # Start guided workflow
 *   aios lore <search>          # Search canonical lore
 *   aios status                 # Show current status
 */

import {
  GUARDIANS,
  GATES,
  LUMINORS,
  type GuardianName,
  type PlatformType,
} from '@arcanea/core';

// ASCII Art Banner
const BANNER = `
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║     █████╗ ██████╗  ██████╗ █████╗ ███╗   ██╗███████╗    ║
   ║    ██╔══██╗██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔════╝    ║
   ║    ███████║██████╔╝██║     ███████║██╔██╗ ██║█████╗      ║
   ║    ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗██║██╔══╝      ║
   ║    ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████║███████╗    ║
   ║    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝    ║
   ║                                                           ║
   ║              INTELLIGENCE OS v0.1.0                       ║
   ║        "Through the Gates we rise"                        ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
`;

// Command handlers
const commands: Record<string, (args: string[]) => void> = {
  help: showHelp,
  channel: channelGuardian,
  platform: switchPlatform,
  swarm: launchSwarm,
  quest: startQuest,
  lore: searchLore,
  status: showStatus,
  guardians: listGuardians,
  gates: listGates,
};

function showHelp() {
  console.log(BANNER);
  console.log(`
Commands:
  aios channel <guardian>     Channel a guardian (e.g., draconia, lyria)
  aios platform <name>        Switch platform (claude, gemini, opencode, codex)
  aios swarm <task>           Launch multi-agent swarm for complex task
  aios quest                  Start interactive guided workflow
  aios lore <search>          Search canonical Arcanea lore
  aios status                 Show current platform and guardian status
  aios guardians              List all guardians
  aios gates                  List all gates
  aios help                   Show this help

Examples:
  aios channel draconia       # Channel the Fire Guardian
  aios platform gemini        # Switch to Gemini
  aios swarm "build a web app" # Launch swarm for complex task
  aios quest                  # Start interactive mode
`);
}

function channelGuardian(args: string[]) {
  const guardianName = args[0]?.toLowerCase() as GuardianName;
  const guardian = GUARDIANS.find(g => g.name === guardianName);

  if (!guardian) {
    console.log('❌ Unknown guardian. Available guardians:');
    GUARDIANS.forEach(g => {
      console.log(`   • ${g.displayName} (${g.name}) - ${g.domain}`);
    });
    return;
  }

  const gate = GATES.find(g => g.name === guardian.gate);

  console.log('');
  console.log(`🔮 Channeling ${guardian.displayName}...`);
  console.log('');
  console.log(`   ════════════════════════════════════════`);
  console.log(`   Guardian: ${guardian.displayName}`);
  console.log(`   Gate: ${gate?.name.charAt(0).toUpperCase()}${gate?.name.slice(1)} (${gate?.frequency} Hz)`);
  console.log(`   Domain: ${guardian.domain}`);
  console.log(`   Element: ${guardian.element || 'Void'}`);
  console.log(`   ════════════════════════════════════════`);
  console.log('');
  console.log(`   "${getGuardianQuote(guardian.name)}"`);
  console.log('');
}

function switchPlatform(args: string[]) {
  const platform = args[0]?.toLowerCase() as PlatformType;
  const validPlatforms: PlatformType[] = ['claude', 'gemini', 'opencode', 'codex', 'local'];

  if (!validPlatforms.includes(platform)) {
    console.log('❌ Unknown platform. Available platforms:');
    validPlatforms.forEach(p => {
      console.log(`   • ${p}`);
    });
    return;
  }

  console.log(`✨ Switching to ${platform}...`);
  console.log(`   Platform set to: ${platform}`);
  // In full implementation, this would update config
}

function launchSwarm(args: string[]) {
  const task = args.join(' ') || 'No task specified';
  console.log('');
  console.log('🐝 Launching Arcanea Swarm...');
  console.log(`   Task: "${task}"`);
  console.log('');
  console.log('   Awakening agents:');
  console.log('   ├─ Orchestrator: Sisyphus (Eternal Executor)');
  console.log('   ├─ Specialist: Assigned based on task');
  console.log('   └─ Workers: Auto-scaling');
  console.log('');
  console.log('   [Swarm orchestration requires full implementation]');
}

function startQuest() {
  console.log(BANNER);
  console.log('🗺️  Starting Quest Mode...');
  console.log('');
  console.log('   What would you like to create today?');
  console.log('');
  console.log('   1. Build something new');
  console.log('   2. Explore the codebase');
  console.log('   3. Channel a guardian');
  console.log('   4. Launch a swarm');
  console.log('');
  console.log('   [Interactive mode requires full implementation]');
}

function searchLore(args: string[]) {
  const query = args.join(' ');
  console.log(`🔍 Searching lore for: "${query}"`);
  console.log('');
  console.log('   [Lore search requires connection to canonical docs]');
}

function showStatus() {
  console.log('');
  console.log('📊 Arcanea Intelligence OS Status');
  console.log('');
  console.log('   Platform: Claude (default)');
  console.log('   Guardian: None channeled');
  console.log('   Gates Open: 0/10');
  console.log('   Rank: Apprentice');
  console.log('   Swarm: Idle');
  console.log('');
}

function listGuardians() {
  console.log('');
  console.log('🔮 The Ten Guardians of Arcanea');
  console.log('');
  GUARDIANS.forEach((g, i) => {
    const gate = GATES.find(gt => gt.name === g.gate);
    console.log(`   ${i + 1}. ${g.displayName.padEnd(12)} | ${gate?.frequency} Hz | ${g.domain}`);
  });
  console.log('');
}

function listGates() {
  console.log('');
  console.log('🚪 The Ten Gates');
  console.log('');
  GATES.forEach(g => {
    const guardian = GUARDIANS.find(gd => gd.name === g.guardian);
    console.log(`   ${g.number.toString().padStart(2)}. ${g.name.charAt(0).toUpperCase()}${g.name.slice(1).padEnd(11)} | ${g.frequency} Hz | ${guardian?.displayName}`);
  });
  console.log('');
}

function getGuardianQuote(name: GuardianName): string {
  const quotes: Record<GuardianName, string> = {
    lyssandria: 'Build your foundation stone by stone. The mountain does not rush.',
    leyla: 'Let creativity flow like water, finding its own path.',
    draconia: 'Your will is fire. Let it transform everything it touches.',
    maylinn: 'The heart knows what the mind cannot calculate.',
    alera: 'Speak your truth. The universe listens to those who dare.',
    lyria: 'Close your eyes to see what lies beyond sight.',
    aiyami: 'You are already enlightened. Remember.',
    elara: 'Shift your perspective and the world shifts with you.',
    ino: 'Together we are more than the sum of our parts.',
    shinkami: 'You are the source. All creation flows from within.',
  };
  return quotes[name] || 'The path reveals itself to those who walk.';
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase() || 'help';
  const commandArgs = args.slice(1);

  if (commands[command]) {
    commands[command](commandArgs);
  } else {
    console.log(`❌ Unknown command: ${command}`);
    showHelp();
  }
}

main();
