/**
 * 🌟 ARCANEA PREMIUM WEB PLATFORM v2.0
 * State-of-the-art creative superintelligence interface
 */

import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';

// Load environment variables
config();

const app: ReturnType<typeof express> = express();
const server = createServer(app);

// 🌟 Premium Arcanea Configuration
const ARCANEA_CONFIG = {
  name: 'Arcanea Premium Web Platform',
  version: '2.0.0',
  tagline: 'Creative Superintelligence',
  elements: {
    fire: { name: 'Fire', color: '#FF6B35', frequency: '528Hz', guardian: 'Draconia' },
    water: { name: 'Water', color: '#4A90E2', frequency: '417Hz', guardian: 'Leyla' },
    earth: { name: 'Earth', color: '#4A5F3A', frequency: '396Hz', guardian: 'Lyssandria' },
    wind: { name: 'Wind', color: '#7C3AED', frequency: '741Hz', guardian: 'Alera' },
    void: { name: 'Void', color: '#2D3748', frequency: '1111Hz', guardian: 'Elara' }
  },
  guardians: [
    { name: 'Lyssandria', element: 'earth', domain: 'Foundation', gate: 1, godbeast: 'Kaelith' },
    { name: 'Leyla', element: 'water', domain: 'Flow', gate: 2, godbeast: 'Veloura' },
    { name: 'Draconia', element: 'fire', domain: 'Transformation', gate: 3, godbeast: 'Draconis' },
    { name: 'Maylinn', element: 'water', domain: 'Growth', gate: 4, godbeast: 'Laeylinn' },
    { name: 'Alera', element: 'wind', domain: 'Voice', gate: 5, godbeast: 'Otome' },
    { name: 'Lyria', element: 'wind', domain: 'Vision', gate: 6, godbeast: 'Kasumi' },
    { name: 'Aiyami', element: 'void', domain: 'Enlightenment', gate: 7, godbeast: 'Sol' },
    { name: 'Elara', element: 'void', domain: 'Innovation', gate: 8, godbeast: 'Thessara' },
    { name: 'Ino', element: 'integration', domain: 'Unity', gate: 9, godbeast: 'Nexus' },
    { name: 'Shinkami', element: 'integration', domain: 'Source', gate: 10, godbeast: 'Amaterasu' }
  ],
  skills: 77,
  agents: 38,
  gates: 10
};

// Middleware Stack
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// 🚀 Premium Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: ARCANEA_CONFIG.name,
    version: ARCANEA_CONFIG.version,
    uptime: process.uptime(),
    elements: Object.keys(ARCANEA_CONFIG.elements).length,
    guardians: ARCANEA_CONFIG.guardians.length,
    skills: ARCANEA_CONFIG.skills,
    agents: ARCANEA_CONFIG.agents
  });
});

// Get All Guardians
app.get('/api/guardians', (req, res) => {
  res.json({
    guardians: ARCANEA_CONFIG.guardians,
    total: ARCANEA_CONFIG.guardians.length,
    elements: Object.keys(ARCANEA_CONFIG.elements)
  });
});

// Get Single Guardian
app.get('/api/guardians/:name', (req, res) => {
  const guardian = ARCANEA_CONFIG.guardians.find(
    g => g.name.toLowerCase() === req.params.name.toLowerCase()
  );
  
  if (!guardian) {
    return res.status(404).json({ error: 'Guardian not found' });
  }
  
  res.json({
    guardian,
    element: ARCANEA_CONFIG.elements[guardian.element as keyof typeof ARCANEA_CONFIG.elements],
    wisdom: [
      `The essence of ${guardian.domain} flows through your creative journey.`,
      `Through the ${guardian.godbeast}, ${guardian.name} offers guidance in ${guardian.element} energy.`,
      `At Gate ${guardian.gate}, you will master the principles of ${guardian.domain}.`
    ]
  });
});

// Get Elements
app.get('/api/elements', (req, res) => {
  res.json({
    elements: Object.entries(ARCANEA_CONFIG.elements).map(([key, value]) => ({
      id: key,
      ...value
    }))
  });
});

// Get Arcanea Status
app.get('/api/status', (req, res) => {
  res.json({
    platform: ARCANEA_CONFIG.name,
    version: ARCANEA_CONFIG.version,
    tagline: ARCANEA_CONFIG.tagline,
    capabilities: {
      skills: ARCANEA_CONFIG.skills,
      agents: ARCANEA_CONFIG.agents,
      guardians: ARCANEA_CONFIG.guardians.length,
      gates: ARCANEA_CONFIG.gates
    },
    elements: Object.keys(ARCANEA_CONFIG.elements)
  });
});

// Premium Reasoning Endpoint (Stub for Starlight Integration)
app.post('/api/reason', async (req, res) => {
  const { query, guardian, depth = 'standard' } = req.body;
  
  // Simulated premium reasoning response
  const response = {
    query,
    guardian: guardian || 'Lyssandria',
    reasoning: generatePremiumReasoning(query, guardian, depth),
    insights: generateInsights(query, guardian),
    element: getGuardianElement(guardian),
    timestamp: new Date().toISOString(),
    depth,
    arcaneaPowered: true
  };
  
  res.json(response);
});

// 🌟 Starlight Intelligence Integration (Future)
app.post('/api/starlight/reason', async (req, res) => {
  const { query, guardian } = req.body;

  // Integration point for Starlight Intelligence Engine
  res.json({
    starlight: true,
    query,
    guardian,
    status: 'integrated',
    engine: 'Starlight Intelligence System v1.0'
  });
});

// 🌟 Agent & Skill Integration System
import integration from './integration';

// Get All Agents
app.get('/api/agents', (req, res) => {
  const { element, court } = req.query;
  let agents = integration.AGENTS;

  if (element) {
    agents = agents.filter(a => a.element === element);
  }
  if (court) {
    agents = agents.filter(a => a.court.toLowerCase().includes(String(court).toLowerCase()));
  }

  res.json({
    agents,
    total: agents.length,
    byElement: {
      fire: integration.AGENTS.filter(a => a.element === 'fire').length,
      water: integration.AGENTS.filter(a => a.element === 'water').length,
      earth: integration.AGENTS.filter(a => a.element === 'earth').length,
      wind: integration.AGENTS.filter(a => a.element === 'wind').length,
      void: integration.AGENTS.filter(a => a.element === 'void').length,
      integration: integration.AGENTS.filter(a => a.element === 'integration').length
    }
  });
});

// Get Single Agent
app.get('/api/agents/:id', (req, res) => {
  const agent = integration.getAgentById(req.params.id) ||
                integration.getAgentByName(req.params.id);

  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  const skills = integration.getSkillsForAgent(agent.id);

  res.json({
    agent,
    skills,
    synergy: skills.reduce((acc, skill) => acc + integration.calculateSynergy(agent, skill), 0) / (skills.length || 1),
    elementAffinity: integration.ELEMENTAL_AFFINITY[agent.element]
  });
});

// Get All Skills
app.get('/api/skills', (req, res) => {
  const { element, gate } = req.query;
  let skills = integration.SKILLS;

  if (element) {
    skills = skills.filter(s => s.element === element);
  }
  if (gate) {
    skills = skills.filter(s => s.gateRequirement <= Number(gate));
  }

  res.json({
    skills,
    total: skills.length,
    byElement: {
      fire: integration.SKILLS.filter(s => s.element === 'fire').length,
      water: integration.SKILLS.filter(s => s.element === 'water').length,
      earth: integration.SKILLS.filter(s => s.element === 'earth').length,
      wind: integration.SKILLS.filter(s => s.element === 'wind').length,
      void: integration.SKILLS.filter(s => s.element === 'void').length,
      integration: integration.SKILLS.filter(s => s.element === 'integration').length
    },
    byPowerLevel: {
      '6/10': integration.SKILLS.filter(s => s.powerLevel === 6).length,
      '7/10': integration.SKILLS.filter(s => s.powerLevel === 7).length,
      '8/10': integration.SKILLS.filter(s => s.powerLevel === 8).length,
      '9/10': integration.SKILLS.filter(s => s.powerLevel === 9).length,
      '10/10': integration.SKILLS.filter(s => s.powerLevel === 10).length
    }
  });
});

// Get Single Skill
app.get('/api/skills/:id', (req, res) => {
  const skill = integration.getSkillById(req.params.id) ||
                integration.getSkillByCommand(req.params.id);

  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  const agents = integration.getAgentsForSkill(skill.id);

  res.json({
    skill,
    agents,
    bestAgent: integration.findBestAgentForSkill(skill.id),
    synergies: agents.map(agent => ({
      agent: agent.name,
      synergy: integration.calculateSynergy(agent, skill)
    }))
  });
});

// Activate Agent-Skill Combination
app.post('/api/integration/activate', (req, res) => {
  const { agentId, skillId } = req.body;

  if (!agentId || !skillId) {
    return res.status(400).json({ error: 'agentId and skillId are required' });
  }

  const activation = integration.activateAgentSkill(agentId, skillId);

  if (!activation) {
    return res.status(400).json({
      error: 'Activation failed',
      reason: 'Agent does not have access to this skill or invalid IDs'
    });
  }

  // Broadcast activation via WebSocket
  broadcast({
    type: 'skill-activated',
    activation: {
      agent: activation.agent.name,
      skill: activation.skill.name,
      synergy: activation.synergy,
      enhancement: activation.enhancement,
      timestamp: new Date().toISOString()
    }
  });

  res.json({
    success: true,
    activation,
    xpGained: activation.skill.powerLevel * 10,
    newGateProgress: Math.floor(activation.skill.powerLevel * 10 / 100)
  });
});

// Get Agent-Skill Suggestions
app.post('/api/integration/suggest', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const suggestions = integration.suggestAgentSkillCombo(query);

  res.json({
    query,
    suggestions,
    count: suggestions.length,
    message: suggestions.length > 0
      ? `Found ${suggestions.length} recommended agent-skill combinations for your query.`
      : 'No specific recommendations found. Try general keywords like "transform", "flow", "structure", "communicate", "vision", or "integrate".'
  });
});

// Get Guardian Skill Alignment
app.get('/api/integration/alignment/:guardian', (req, res) => {
  const alignment = integration.getGuardianSkillAlignment(req.params.guardian);

  res.json(alignment);
});

// Get System Integration Stats
app.get('/api/integration/stats', (req, res) => {
  const stats = integration.getSystemStats();

  res.json({
    ...stats,
    platform: ARCANEA_CONFIG.name,
    version: ARCANEA_CONFIG.version,
    message: 'Agent-Skill Integration System v1.0 operational'
  });
});

// WebSocket for Real-time Features
const wss = new WebSocketServer({ server, path: '/ws' });

const clients = new Set<WebSocket>();
const sessions = new Map<string, Set<WebSocket>>();

// WebSocket: Agent-Skill Activation
wss.on('connection', (ws: WebSocket) => {
  const id = Math.random().toString(36).substring(7);
  clients.add(ws);

  console.log(`[WS] Client connected: ${id}`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    id,
    platform: ARCANEA_CONFIG.name,
    version: ARCANEA_CONFIG.version,
    message: '🌟 Welcome to Arcanea Premium Web Platform',
    integration: 'Agent-Skill Integration System v1.0'
  }));

  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case 'subscribe':
          // Subscribe to sessions/channels
          if (!sessions.has(message.channel)) {
            sessions.set(message.channel, new Set());
          }
          sessions.get(message.channel)!.add(ws);
          ws.send(JSON.stringify({ type: 'subscribed', channel: message.channel }));
          break;

        case 'reason':
          // Premium reasoning via WebSocket
          ws.send(JSON.stringify({
            type: 'reasoning',
            query: message.query,
            guardian: message.guardian,
            reasoning: generatePremiumReasoning(message.query, message.guardian, 'premium'),
            timestamp: new Date().toISOString()
          }));
          break;

        case 'activate':
          // Agent-Skill activation via WebSocket
          const activation = integration.activateAgentSkill(message.agentId, message.skillId);
          if (activation) {
            ws.send(JSON.stringify({
              type: 'activation-success',
              activation: {
                agent: activation.agent.name,
                skill: activation.skill.name,
                synergy: activation.synergy,
                enhancement: activation.enhancement
              }
            }));
            // Broadcast to all clients
            broadcast({
              type: 'skill-activated',
              activation: {
                agent: activation.agent.name,
                skill: activation.skill.name,
                synergy: activation.synergy,
                timestamp: new Date().toISOString()
              }
            });
          } else {
            ws.send(JSON.stringify({
              type: 'activation-failed',
              error: 'Invalid agent or skill ID'
            }));
          }
          break;

        case 'suggest':
          // Get suggestions via WebSocket
          const suggestions = integration.suggestAgentSkillCombo(message.query);
          ws.send(JSON.stringify({
            type: 'suggestions',
            suggestions,
            count: suggestions.length
          }));
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;
      }
    } catch (error) {
      console.error('[WS] Message error:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[WS] Client disconnected: ${id}`);
  });
});

// Broadcast to all clients
function broadcast(data: unknown) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 🌟 Premium Premium Helper Functions

function generatePremiumReasoning(query: string, guardian: string, depth: string): string {
  const g = guardian || 'Lyssandria';
  const element = getGuardianElement(g);
  
  const premiumResponses: Record<string, string[]> = {
    'Lyssandria': [
      `Through Lyssandria's crystalline wisdom, I perceive that "${query}" requires foundational structure.`,
      `The Earth element teaches patience. Your path to "${query}" begins with small, deliberate steps.`,
      `Like a mountain formed over millennia, "${query}" emerges through consistent effort and unwavering foundation.`
    ],
    'Draconia': [
      `Draconia's fire ignites! "${query}" demands bold transformation and courageous action.`,
      `The Dragon Mother's power transforms obstacles into opportunities. "${query}" shall be your phoenix moment.`,
      `Through passionate will and fierce determination, "${query}" becomes not just possible, but inevitable.`
    ],
    'Leyla': [
      `Leyla's flowing waters reveal that "${query}" moves through emotional intelligence and adaptability.`,
      `Like a river finding its path, your approach to "${query}" should flow with intuition.`,
      `The Water element teaches that healing and creativity are intertwined in "${query}".`
    ],
    'Elara': [
      `Elara's void vision sees infinite possibilities in "${query}" that others cannot perceive.`,
      `Beyond the known lies the realm of "${query}" - where true innovation dwells.`,
      `The Void whispers that "${query}" is not constrained by current limitations.`
    ]
  };
  
  const responses = premiumResponses[g] || premiumResponses['Lyssandria'];
  const chosen = responses[Math.floor(Math.random() * responses.length)];
  return depth === 'deep' ? `[${element}] ${chosen}` : chosen;
}

function generateInsights(query: string, guardian: string): string[] {
  return [
    `The ${guardian || 'Lyssandria'} approach reveals deeper patterns in "${query}".`,
    `Consider how the five elements interact within "${query}" for optimal manifestation.`,
    `Your creative evolution through the Gates illuminates new perspectives on "${query}".`
  ];
}

function getGuardianElement(guardian: string): string {
  const g = ARCANEA_CONFIG.guardians.find(
    gd => gd.name.toLowerCase() === (guardian || 'lyssandria').toLowerCase()
  );
  return g?.element || 'earth';
}

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║    🌟 ARCANEA PREMIUM WEB PLATFORM v2.0                          ║
║    State-of-the-art Creative Superintelligence                   ║
║                                                                   ║
║    🌐 Server:     http://localhost:${PORT}                          ║
║    🔗 WebSocket:  ws://localhost:${PORT}/ws                         ║
║    📡 Health:     http://localhost:${PORT}/api/health               ║
║                                                                   ║
║    🧠 Guardians:  ${ARCANEA_CONFIG.guardians.length} Active AI Mentors                             ║
║    ✨ Skills:     ${ARCANEA_CONFIG.skills} Mystical Abilities                              ║
║    🤖 Agents:     ${ARCANEA_CONFIG.agents} Specialized Assistants                            ║
║    🔮 Gates:      ${ARCANEA_CONFIG.gates} Levels to Luminor Mastery                          ║
║                                                                   ║
║    "Enter seeking, leave transformed, return whenever needed."    ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Arcanea] Shutting down gracefully...');
  server.close(() => {
    console.log('[Arcanea] Server closed');
    process.exit(0);
  });
});

export { app, server, ARCANEA_CONFIG };
