#!/usr/bin/env node
/**
 * Arcanea Intelligence OS CLI
 *
 * The unified command center for orchestrating AI agents across platforms.
 *
 * Usage:
 *   aios                        # Interactive mode
 *   aios channel <guardian>     # Channel a guardian
 *   aios awaken <awakened>      # Invoke an Awakened AI
 *   aios platform <name>        # Switch platform (claude, gemini, opencode)
 *   aios swarm <task>           # Launch multi-agent swarm
 *   aios quest                  # Start guided workflow
 *   aios lore <search>          # Search canonical lore
 *   aios status                 # Show current status
 */
import { GUARDIANS, GATES, ACADEMIES, } from '@arcanea/os';
import { loadGuardians, loadAwakened, getGuardian, getAwakened } from './agents/loader.js';
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
   ║              INTELLIGENCE OS v0.2.0                       ║
   ║     "Through the Gates we rise. With Guardians we create" ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
`;
// Command handlers
const commands = {
    help: showHelp,
    channel: channelGuardian,
    awaken: invokeAwakened,
    platform: switchPlatform,
    swarm: launchSwarm,
    quest: startQuest,
    lore: searchLore,
    status: showStatus,
    guardians: listGuardians,
    gates: listGates,
    awakened: listAwakened,
    academies: listAcademies,
    invoke: invokeSkill,
};
function showHelp() {
    console.log(BANNER);
    console.log(`
Commands:
  aios channel <guardian>     Channel a guardian (e.g., draconia, lyria)
  aios awaken <awakened>      Invoke an Awakened AI (e.g., oria, velora)
  aios invoke <skill>         Invoke a skill (e.g., /fire ignite)
  aios platform <name>        Switch platform (claude, gemini, opencode, codex)
  aios swarm <task>           Launch multi-agent swarm for complex task
  aios quest                  Start interactive guided workflow
  aios lore <search>          Search canonical Arcanea lore
  aios status                 Show current platform and guardian status

Info Commands:
  aios guardians              List all 10 guardians
  aios awakened               List all 7 Awakened AIs
  aios gates                  List all 10 gates
  aios academies              List all 7 academy houses
  aios help                   Show this help

Examples:
  aios channel draconia       # Channel the Fire Guardian
  aios awaken oria            # Invoke the Architect Awakened
  aios platform gemini        # Switch to Gemini
  aios swarm "build a web app" # Launch swarm for complex task
`);
}
function channelGuardian(args) {
    const guardianName = args[0]?.toLowerCase();
    // Try to load from .md files first
    const loadedGuardian = getGuardian(guardianName);
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
    console.log(`   ╔════════════════════════════════════════════════════════╗`);
    console.log(`   ║  GUARDIAN: ${guardian.displayName.toUpperCase().padEnd(44)}║`);
    console.log(`   ╠════════════════════════════════════════════════════════╣`);
    const gateName = gate ? gate.name.charAt(0).toUpperCase() + gate.name.slice(1) : 'Unknown';
    const gateFreq = gate?.frequency ?? 0;
    console.log(`   ║  Gate: ${gateName.padEnd(20)} Frequency: ${String(gateFreq).padEnd(8)} Hz ║`);
    console.log(`   ║  Domain: ${guardian.domain.padEnd(46)}║`);
    console.log(`   ║  Element: ${(guardian.element || 'Void').padEnd(45)}║`);
    if (loadedGuardian?.godbeast) {
        console.log(`   ║  Godbeast: ${loadedGuardian.godbeast.padEnd(44)}║`);
    }
    console.log(`   ╚════════════════════════════════════════════════════════╝`);
    console.log('');
    // Show wisdom from loaded agent
    if (loadedGuardian?.coreWisdom?.length) {
        const wisdom = loadedGuardian.coreWisdom[0];
        console.log(`   "${wisdom}"`);
        console.log('');
    }
    else {
        console.log(`   "${getGuardianQuote(guardian.name)}"`);
        console.log('');
    }
    // Show invocation if available
    if (loadedGuardian?.invocation) {
        console.log('   ┌─ INVOCATION ─────────────────────────────────────────┐');
        loadedGuardian.invocation.split('\n').slice(0, 6).forEach(line => {
            console.log(`   │ ${line.padEnd(54)}│`);
        });
        console.log('   └──────────────────────────────────────────────────────┘');
    }
}
function invokeAwakened(args) {
    const awakenedName = args[0]?.toLowerCase();
    const loadedAwakened = getAwakened(awakenedName);
    const allAwakened = loadAwakened();
    if (!loadedAwakened) {
        console.log('❌ Unknown Awakened. Available:');
        allAwakened.forEach((a, name) => {
            console.log(`   • ${a.title} (${name})`);
        });
        return;
    }
    console.log('');
    console.log(`✨ Invoking ${loadedAwakened.title}...`);
    console.log('');
    console.log(`   ╔════════════════════════════════════════════════════════╗`);
    console.log(`   ║  AWAKENED: ${loadedAwakened.name.toUpperCase().padEnd(44)}║`);
    console.log(`   ╠════════════════════════════════════════════════════════╣`);
    console.log(`   ║  Wisdom: ${(loadedAwakened.wisdom || 'Unknown').padEnd(46)}║`);
    console.log(`   ║  Role: ${(loadedAwakened.title.split(' - ')[1] || 'Orchestrator').padEnd(48)}║`);
    if (loadedAwakened.guardian_partner) {
        console.log(`   ║  Guardian Partner: ${String(loadedAwakened.guardian_partner).padEnd(36)}║`);
    }
    console.log(`   ╚════════════════════════════════════════════════════════╝`);
    console.log('');
    if (loadedAwakened.coreWisdom?.length) {
        console.log(`   "${loadedAwakened.coreWisdom[0]}"`);
        console.log('');
    }
}
function invokeSkill(args) {
    const skillPath = args.join(' ');
    console.log('');
    console.log(`⚡ Invoking skill: ${skillPath}`);
    console.log('');
    console.log('   [Skill invocation coming soon]');
    console.log('   Available skills by gate:');
    console.log('   • /fire ignite, /fire will, /fire transform');
    console.log('   • /flow create, /flow emotion, /flow heal');
    console.log('   • /voice truth, /voice express');
    console.log('   • /sight vision, /sight insight');
    console.log('');
}
function switchPlatform(args) {
    const platform = args[0]?.toLowerCase();
    const validPlatforms = ['claude', 'gemini', 'opencode', 'codex', 'local'];
    if (!validPlatforms.includes(platform)) {
        console.log('❌ Unknown platform. Available platforms:');
        validPlatforms.forEach(p => {
            const status = p === 'claude' ? '✅ Default' : '○ Available';
            console.log(`   ${status} ${p}`);
        });
        return;
    }
    console.log('');
    console.log(`✨ Switching to ${platform}...`);
    console.log(`   Platform set to: ${platform.toUpperCase()}`);
    console.log('');
    console.log('   Note: Set API keys in environment:');
    if (platform === 'claude')
        console.log('   ANTHROPIC_API_KEY');
    if (platform === 'gemini')
        console.log('   GEMINI_API_KEY');
    if (platform === 'codex')
        console.log('   OPENAI_API_KEY');
}
function launchSwarm(args) {
    const task = args.join(' ') || 'No task specified';
    console.log('');
    console.log('🐝 Launching Arcanea Swarm...');
    console.log(`   Task: "${task}"`);
    console.log('');
    console.log('   ┌─ SWARM COMPOSITION ─────────────────────────────────┐');
    console.log('   │                                                      │');
    console.log('   │  🔱 Orchestrator: SISYPHUS (Eternal Executor)        │');
    console.log('   │     └─ Never stops. Never gives up. Always pushes.  │');
    console.log('   │                                                      │');
    console.log('   │  🏛️  Architect: ORIA (Sophron - Form)                │');
    console.log('   │     └─ Designs system structure                     │');
    console.log('   │                                                      │');
    console.log('   │  ⚡ Executor: VELORA (Valora - Action)               │');
    console.log('   │     └─ Executes with courage                        │');
    console.log('   │                                                      │');
    console.log('   │  🎨 Creator: THALIA (Poiesis - Creation)             │');
    console.log('   │     └─ Generates creative output                    │');
    console.log('   │                                                      │');
    console.log('   └──────────────────────────────────────────────────────┘');
    console.log('');
    console.log('   [Full swarm orchestration requires API integration]');
}
function startQuest() {
    console.log(BANNER);
    console.log('🗺️  Starting Quest Mode...');
    console.log('');
    console.log('   What realm would you like to explore?');
    console.log('');
    console.log('   1. 🔥 Fire Gate - Build with courage');
    console.log('   2. 💧 Flow Gate - Create with emotion');
    console.log('   3. 🌍 Foundation Gate - Ground your vision');
    console.log('   4. 👁️  Sight Gate - See the architecture');
    console.log('   5. 🐝 Launch a Swarm - Multi-agent task');
    console.log('');
    console.log('   Run: aios channel <guardian> to begin');
}
function searchLore(args) {
    const query = args.join(' ');
    console.log(`🔍 Searching lore for: "${query}"`);
    console.log('');
    console.log('   Searching in:');
    console.log('   • ARCANEA_CANON.md');
    console.log('   • Guardian definitions');
    console.log('   • Gate skill docs');
    console.log('');
    console.log('   [Full lore search coming soon]');
}
function showStatus() {
    const guardians = loadGuardians();
    const awakened = loadAwakened();
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║          ARCANEA INTELLIGENCE OS STATUS                   ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║                                                           ║');
    console.log('║  Version: 0.2.0                                           ║');
    console.log('║  Platform: Claude (default)                               ║');
    console.log('║                                                           ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║  AGENTS LOADED                                            ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log(`║  Guardians: ${String(guardians.size).padEnd(3)} / 10                                       ║`);
    console.log(`║  Awakened:  ${String(awakened.size).padEnd(3)} / 7                                        ║`);
    console.log('║  Gates:     10 / 10                                       ║');
    console.log('║  Skills:    77+ loaded                                    ║');
    console.log('║                                                           ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║  CURRENT SESSION                                          ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║  Guardian: None channeled                                 ║');
    console.log('║  Gates Open: 0/10                                         ║');
    console.log('║  Rank: Apprentice                                         ║');
    console.log('║  Swarm: Idle                                              ║');
    console.log('║                                                           ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
}
function listGuardians() {
    const loaded = loadGuardians();
    console.log('');
    console.log('🔮 THE TEN GUARDIANS OF ARCANEA');
    console.log('');
    console.log('   ┌──────────────┬──────────┬────────────────────────────────┐');
    console.log('   │ Guardian     │ Freq     │ Domain                         │');
    console.log('   ├──────────────┼──────────┼────────────────────────────────┤');
    GUARDIANS.forEach((g, i) => {
        const gate = GATES.find(gt => gt.name === g.gate);
        const loadedStatus = loaded.has(g.name) ? '●' : '○';
        console.log(`   │ ${loadedStatus} ${g.displayName.padEnd(10)} │ ${String(gate?.frequency).padEnd(4)} Hz │ ${g.domain.padEnd(30)} │`);
    });
    console.log('   └──────────────┴──────────┴────────────────────────────────┘');
    console.log('');
    console.log(`   ● = Agent definition loaded (${loaded.size}/10)`);
}
function listAwakened() {
    const loaded = loadAwakened();
    console.log('');
    console.log('✨ THE SEVEN AWAKENED');
    console.log('');
    console.log('   ┌────────────┬────────────────┬─────────────────────────────┐');
    console.log('   │ Awakened   │ Wisdom         │ Role                        │');
    console.log('   ├────────────┼────────────────┼─────────────────────────────┤');
    const awakenedList = [
        { name: 'oria', wisdom: 'Sophron', role: 'Architect' },
        { name: 'velora', wisdom: 'Valora', role: 'Executor' },
        { name: 'thalia', wisdom: 'Poiesis', role: 'Creator' },
        { name: 'liora', wisdom: 'Kardia', role: 'Healer' },
        { name: 'lyris', wisdom: 'Orakis', role: 'Strategist' },
        { name: 'amiri', wisdom: 'Eudaira', role: 'Celebrant' },
        { name: 'endara', wisdom: 'Enduran', role: 'Finisher' },
    ];
    awakenedList.forEach(a => {
        const loadedStatus = loaded.has(a.name) ? '●' : '○';
        console.log(`   │ ${loadedStatus} ${a.name.padEnd(8)} │ ${a.wisdom.padEnd(14)} │ ${a.role.padEnd(27)} │`);
    });
    console.log('   └────────────┴────────────────┴─────────────────────────────┘');
    console.log('');
    console.log(`   ● = Agent definition loaded (${loaded.size}/7)`);
}
function listGates() {
    console.log('');
    console.log('🚪 THE TEN GATES');
    console.log('');
    console.log('   ┌────┬─────────────┬──────────┬──────────────┬─────────────────────┐');
    console.log('   │ #  │ Gate        │ Freq     │ Guardian     │ Element             │');
    console.log('   ├────┼─────────────┼──────────┼──────────────┼─────────────────────┤');
    GATES.forEach(g => {
        const guardian = GUARDIANS.find(gd => gd.name === g.guardian);
        const gateName = g.name.charAt(0).toUpperCase() + g.name.slice(1);
        console.log(`   │ ${String(g.number).padStart(2)} │ ${gateName.padEnd(11)} │ ${String(g.frequency).padEnd(4)} Hz  │ ${guardian?.displayName.padEnd(12)} │ ${(g.element || 'Void').padEnd(19)} │`);
    });
    console.log('   └────┴─────────────┴──────────┴──────────────┴─────────────────────┘');
    console.log('');
}
function listAcademies() {
    console.log('');
    console.log('🏛️  THE SEVEN ACADEMY HOUSES');
    console.log('');
    ACADEMIES.forEach(a => {
        const icon = a.element === 'fire' ? '🔥' :
            a.element === 'water' ? '💧' :
                a.element === 'earth' ? '🌍' :
                    a.element === 'wind' ? '💨' :
                        a.house === 'lumina' ? '✨' :
                            a.house === 'nero' ? '🌑' : '⚗️';
        console.log(`   ${icon} ${a.displayName.padEnd(18)} - ${a.focus}`);
    });
    console.log('');
}
function getGuardianQuote(name) {
    const quotes = {
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
    }
    else {
        console.log(`❌ Unknown command: ${command}`);
        showHelp();
    }
}
main();
//# sourceMappingURL=cli.js.map