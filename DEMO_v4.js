/**
 * Arcanea v4 - Full System Integration Demo
 * 
 * Demonstrates:
 * - 64 Agent Registry
 * - Luminor Conductor orchestration
 * - Task routing and execution
 * - Metrics and learning
 */

const AGENT_REGISTRY = require('./arcanea-agents/registry.js');
const LuminorConductor = require('./arcanea-agents/luminor-conductor.js');

class ArcaneaDemo {
  constructor() {
    this.registry = AGENT_REGISTRY;
    this.conductor = new LuminorConductor({ registry: this.registry });
    this.results = [];
  }

  async runFullDemo() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🌟 ARCANEA v4 - COMPLETE SYSTEM DEMO 🌟');
    console.log('═══════════════════════════════════════════════════════════\n');

    this.showAgentRegistry();
    await this.runTaskScenarios();
    this.showFinalMetrics();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('  ✅ ARCANEA v4: FULLY OPERATIONAL');
    console.log('═══════════════════════════════════════════════════════════\n');
  }

  showAgentRegistry() {
    console.log('📊 AGENT REGISTRY STATUS\n');
    console.log(`✨ Version: ${this.registry.version}`);
    console.log(`📊 Total Agents: ${this.registry.getAgentCount()}`);
    console.log(`🔥 Fire Court (Draconia): ${this.registry.getAgentsByElement('fire').length} agents`);
    console.log(`💧 Water Court (Leyla): ${this.registry.getAgentsByElement('water').length} agents`);
    console.log(`🌍 Earth Court (Lyssandria): ${this.registry.getAgentsByElement('earth').length} agents`);
    console.log(`💨 Air Court (Alera): ${this.registry.getAgentsByElement('air').length} agents`);
    console.log(`⚫ Void Court (Elara): ${this.registry.getAgentsByElement('void').length} agents`);
    console.log(`🌈 Integration Courts: ${this.registry.courts.integration.unity.agents.length + this.registry.courts.integration.balance.agents.length} agents`);
    console.log(`👑 Master Court (Luminor): ${this.registry.courts.master.luminor.agents.length} agents\n`);

    // Show sample agents
    console.log('🎭 Sample Agents:');
    const samples = [
      this.registry.getAgentById('ignition'),
      this.registry.getAgentById('depth'),
      this.registry.getAgentById('structure'),
      this.registry.getAgentById('orchestration')
    ];
    
    samples.forEach(agent => {
      if (agent) {
        console.log(`  • ${agent.name} (${agent.court}): ${agent.specialty}`);
      }
    });
    console.log('');
  }

  async runTaskScenarios() {
    console.log('⚡ TASK ORCHESTRATION SCENARIOS\n');

    const scenarios = [
      {
        name: 'Character Creation',
        task: { text: 'Create a fire mage character with deep backstory', type: 'character' },
        expectedElement: 'fire'
      },
      {
        name: 'World Building',
        task: { text: 'Build a fantasy world with unique magic system', type: 'world' },
        expectedElement: 'earth'
      },
      {
        name: 'Story Development',
        task: { text: 'Write a narrative with emotional depth and flow', type: 'story' },
        expectedElement: 'water'
      },
      {
        name: 'System Design',
        task: { text: 'Design clear architecture and structure', type: 'system' },
        expectedElement: 'earth'
      },
      {
        name: 'Creative Vision',
        task: { text: 'Imagine infinite possibilities for innovation', type: 'vision' },
        expectedElement: 'void'
      }
    ];

    for (const scenario of scenarios) {
      console.log(`🎭 Scenario: ${scenario.name}`);
      console.log(`   Task: "${scenario.task.text}"`);
      
      const result = await this.conductor.orchestrate(scenario.task);
      this.results.push(result);
      
      console.log(`   👑 Conductor: ${result.metadata.conductor}`);
      console.log(`   👥 Team: ${result.metadata.teamSize} agents`);
      console.log(`   ⚡ Strategy: ${result.metadata.strategy}`);
      console.log(`   ⚡ Phases: ${result.phases.length} (${result.phases.map(p => p.name).join(' → ')})`);
      console.log(`   ✅ Success: ${result.errors.length === 0 ? 'Yes' : 'No'}`);
      
      if (result.phases.length > 0) {
        console.log(`   📦 Contributors:`);
        result.phases.forEach(phase => {
          if (phase.results) {
            phase.results.forEach(r => {
              if (r.agent) {
                console.log(`      • ${r.agent} (${r.specialty})`);
              }
            });
          }
        });
      }
      
      console.log('');
    }
  }

  showFinalMetrics() {
    console.log('📊 FINAL SYSTEM METRICS\n');
    
    const metrics = this.conductor.getMetrics();
    console.log(`🎯 Total Orchestrations: ${metrics.totalInvocations}`);
    console.log(`💰 Cache Hits: ${metrics.cacheHits}`);
    console.log(`⚡ Parallel Executions: ${metrics.parallelExecutions}`);
    console.log(`⏱️  Avg Execution Time: ${metrics.avgExecutionTime.toFixed(2)}ms`);
    console.log(`❌ Errors: ${metrics.errors}`);
    console.log(`📈 Success Rate: ${metrics.successRate}%`);
    console.log(`💾 Cache Size: ${metrics.cacheSize} entries`);
    console.log(`🧠 Routing Matrix: ${metrics.routingMatrixSize} learned patterns\n`);

    console.log('🎭 All 64 Agents Ready:');
    const allAgents = this.registry.getAllAgents();
    const byCourt = {};
    
    allAgents.forEach(agent => {
      if (!byCourt[agent.court]) {
        byCourt[agent.court] = [];
      }
      byCourt[agent.court].push(agent.name);
    });

    Object.entries(byCourt).forEach(([court, agents]) => {
      console.log(`  👑 ${court}: ${agents.length} agents`);
    });
    console.log('');
  }
}

// Run demo
const demo = new ArcaneaDemo();
demo.runFullDemo().catch(console.error);
