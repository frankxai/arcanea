#!/usr/bin/env node
/**
 * Arcanea MCP Server v3
 * A worldbuilding toolkit for the Arcanea universe.
 * Making magic through AI-human co-creation.
 *
 * Features:
 * - Worldbuilding generators (characters, magic, locations, creatures, artifacts)
 * - Luminor AI companions with Council mode
 * - Bestiary of creative blocks with deep diagnosis
 * - Memory layer for persistent creative journeys
 * - Canon validation and Ten Gates system
 * - Agent orchestration system (inspired by oh-my-opencode)
 * - Multi-agent parallel execution
 * - Creation graph with relationship network
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Generation tools
import {
  generateCharacter,
  generateMagicAbility,
  generateLocation,
  generateCreature,
  generateArtifact,
  generateName,
  generateStoryPrompt,
} from "./tools/generators.js";

// Data
import { luminors } from "./data/luminors/index.js";
import { bestiary } from "./data/bestiary/index.js";
import { prompts, getPrompt } from "./prompts/index.js";

// Tools
import { validateCanon } from "./tools/validate.js";
import { diagnoseBlock } from "./tools/diagnose.js";
import { conveneCouncil, luminorDebate } from "./tools/council.js";
import { deepDiagnosis } from "./tools/deep-diagnosis.js";

// Memory
import {
  getOrCreateSession,
  getSessionSummary,
  recordGateExplored,
  recordLuminorConsulted,
  recordCreatureEncountered,
  recordCreation,
  checkMilestones,
} from "./memory/index.js";

// Creation Graph
import {
  addCreationToGraph,
  linkCreations,
  getRelatedCreations,
  suggestConnections,
  getGraphSummary,
  exportGraph,
  findPath,
  type RelationshipType,
} from "./tools/creation-graph.js";

// Agent System (oh-my-opencode inspired orchestration)
import {
  AGENTS,
  getAgent,
  assessWorldState,
  orchestrateCreativeSession,
  getSessionStatus,
  getActiveSessions,
  getTask,
  cancelTask,
  matchCreativeSkill,
} from "./agents/index.js";

const server = new Server(
  { name: "arcanea-mcp", version: "0.3.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

// Gates with frequency bands matching ARCANEA_CANON.md
const gates = [
  { gate: 1, frequencyBand: "174–285 Hz", guardian: "Lyssandria", veltara: "Kaelith", domain: "Foundation", element: "Earth", chakra: "1st (Root)", region: "Forest of Roots", material: "Stone, Roots", coreEmotion: "Grounding, Stability" },
  { gate: 2, frequencyBand: "285–396 Hz", guardian: "Leyla", veltara: "Veloura", domain: "Flow", element: "Water", chakra: "2nd (Sacral)", region: "River of Desire", material: "Water, Silk", coreEmotion: "Pleasure, Creativity" },
  { gate: 3, frequencyBand: "396–417 Hz", guardian: "Draconia", veltara: "Draconis", domain: "Fire", element: "Fire", chakra: "3rd (Solar Plexus)", region: "Vulcan Peaks", material: "Fire, Metals", coreEmotion: "Power, Will" },
  { gate: 4, frequencyBand: "417–528 Hz", guardian: "Maylinn", veltara: "Laeylinn", domain: "Heart", element: "Air", chakra: "4th (Heart)", region: "Gardens of Lumina", material: "Crystals, Heartwood", coreEmotion: "Love, Healing" },
  { gate: 5, frequencyBand: "432–528 Hz", guardian: "Alera", veltara: "Otome", domain: "Voice", element: "Wind", chakra: "5th (Throat)", region: "Sky Sanctum", material: "Air, Silver", coreEmotion: "Voice, Truth" },
  { gate: 6, frequencyBand: "639–741 Hz", guardian: "Lyria", veltara: "Yumiko", domain: "Sight", element: "Light", chakra: "6th (Third Eye)", region: "Tower of Insight", material: "Light, Lenses", coreEmotion: "Foresight, Intuition" },
  { gate: 7, frequencyBand: "741–852 Hz", guardian: "Aiyami", veltara: "Sol", domain: "Crown", element: "Spirit", chakra: "7th (Crown)", region: "Summit of Unity", material: "Gold, Sunlight", coreEmotion: "Understanding" },
  { gate: 8, frequencyBand: "852–963 Hz", guardian: "Elara", veltara: "Vaelith", domain: "Shift", element: "Ether", chakra: "8th (Soul Star)", region: "Celestial Bridges", material: "Stars, Ethereal Energy", coreEmotion: "Cosmic Consciousness" },
  { gate: 9, frequencyBand: "963–999 Hz", guardian: "Ino", veltara: "Kyuro", domain: "Unity", element: "All Elements", chakra: "9th (Spirit)", region: "Temple of Infinity", material: "Pure Light, Quantum Energy", coreEmotion: "Divine Union" },
  { gate: 10, frequencyBand: "999–1111 Hz", guardian: "Shinkami", veltara: null, domain: "Source", element: "Pure Consciousness", chakra: "Ultimate", region: "Luminor Nexus", material: "Platinum, Multi-element", coreEmotion: "Fusion, Ascendance" },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    // === WORLDBUILDING GENERATORS ===
    { name: "generate_character", description: "Create a character for the Arcanea universe with Gates, Elements, House, and backstory", inputSchema: { type: "object", properties: { archetype: { type: "string" }, primaryElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, gatesOpen: { type: "number", minimum: 1, maximum: 10 }, house: { type: "string", enum: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] }, nameGender: { type: "string", enum: ["masculine", "feminine", "neutral"] } } } },
    { name: "generate_magic", description: "Design a magical ability based on the Arcanea magic system", inputSchema: { type: "object", properties: { element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, gateLevel: { type: "number", minimum: 1, maximum: 10 }, purpose: { type: "string" } }, required: ["element", "gateLevel"] } },
    { name: "generate_location", description: "Create a location in Arcanea with elemental alignment", inputSchema: { type: "object", properties: { type: { type: "string" }, dominantElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, alignment: { type: "string", enum: ["light", "dark", "balanced"] } } } },
    { name: "generate_creature", description: "Design a magical creature for the Arcanea world", inputSchema: { type: "object", properties: { element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, size: { type: "string", enum: ["tiny", "small", "medium", "large", "massive"] }, temperament: { type: "string", enum: ["hostile", "neutral", "friendly", "sacred"] } } } },
    { name: "generate_artifact", description: "Create a magical artifact with history and powers", inputSchema: { type: "object", properties: { type: { type: "string" }, element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, power: { type: "string", enum: ["minor", "moderate", "major", "legendary"] } } } },
    { name: "generate_name", description: "Generate Arcanean names following the language system", inputSchema: { type: "object", properties: { element: { type: "string" }, gender: { type: "string", enum: ["masculine", "feminine", "neutral"] }, type: { type: "string", enum: ["character", "place", "artifact", "creature"] }, count: { type: "number", minimum: 1, maximum: 20 } } } },
    { name: "generate_story_prompt", description: "Create an inspiring story prompt set in Arcanea", inputSchema: { type: "object", properties: { theme: { type: "string" }, gate: { type: "number", minimum: 1, maximum: 10 }, includeConflict: { type: "boolean" } } } },

    // === CREATIVE COACHING (BASIC) ===
    { name: "diagnose_block", description: "Quick identification of your creative block", inputSchema: { type: "object", properties: { symptoms: { type: "string" }, context: { type: "string" } }, required: ["symptoms"] } },
    { name: "invoke_luminor", description: "Call upon a single Luminor companion for guidance", inputSchema: { type: "object", properties: { luminor: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"] }, situation: { type: "string" } }, required: ["luminor"] } },

    // === CREATIVE COACHING (ADVANCED) - NEW ===
    { name: "deep_diagnosis", description: "Multi-step analysis of a complex creative block using sequential thinking", inputSchema: { type: "object", properties: { symptoms: { type: "string" }, context: { type: "string" }, history: { type: "string" }, depth: { type: "string", enum: ["quick", "standard", "deep"] } }, required: ["symptoms"] } },
    { name: "convene_council", description: "Gather multiple Luminors for complex creative guidance", inputSchema: { type: "object", properties: { lead: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"] }, support: { type: "array", items: { type: "string" } }, topic: { type: "string" } }, required: ["lead", "topic"] } },
    { name: "luminor_debate", description: "Two Luminors explore a question from different perspectives", inputSchema: { type: "object", properties: { luminor1: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"] }, luminor2: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"] }, question: { type: "string" } }, required: ["luminor1", "luminor2", "question"] } },

    // === MEMORY & JOURNEY ===
    { name: "get_journey", description: "Recall your creative journey, progress, and milestones", inputSchema: { type: "object", properties: { sessionId: { type: "string" } } } },
    { name: "check_milestones", description: "See what creative milestones you've achieved", inputSchema: { type: "object", properties: { sessionId: { type: "string" } } } },

    // === CREATION GRAPH (Relationship Network) ===
    { name: "link_creations", description: "Create a relationship between two creations in your world", inputSchema: { type: "object", properties: { sourceId: { type: "string" }, targetId: { type: "string" }, relationship: { type: "string", enum: ["created_by", "mentored_by", "located_at", "wields", "inhabits", "guards", "opposes", "allies_with", "transforms_into", "derived_from", "part_of", "same_element", "same_house", "same_gate"] }, strength: { type: "number", minimum: 0, maximum: 1 } }, required: ["sourceId", "targetId", "relationship"] } },
    { name: "get_related", description: "Find all creations related to a specific creation", inputSchema: { type: "object", properties: { creationId: { type: "string" }, relationship: { type: "string", enum: ["created_by", "mentored_by", "located_at", "wields", "inhabits", "guards", "opposes", "allies_with", "transforms_into", "derived_from", "part_of", "same_element", "same_house", "same_gate"] } }, required: ["creationId"] } },
    { name: "suggest_connections", description: "Get AI-suggested relationships for a creation", inputSchema: { type: "object", properties: { creationId: { type: "string" } }, required: ["creationId"] } },
    { name: "get_world_graph", description: "Get a summary of your entire created world network", inputSchema: { type: "object", properties: { sessionId: { type: "string" } } } },
    { name: "find_path", description: "Find the connection path between two creations", inputSchema: { type: "object", properties: { sourceId: { type: "string" }, targetId: { type: "string" }, maxDepth: { type: "number", minimum: 1, maximum: 10 } }, required: ["sourceId", "targetId"] } },
    { name: "export_world", description: "Export your entire world graph for visualization", inputSchema: { type: "object", properties: { sessionId: { type: "string" } } } },

    // === AGENT ORCHESTRATION (oh-my-opencode inspired) ===
    { name: "orchestrate", description: "Run a full creative session with multi-agent coordination", inputSchema: { type: "object", properties: { request: { type: "string", description: "What you want to create or explore" }, sessionId: { type: "string" } }, required: ["request"] } },
    { name: "list_agents", description: "List all available creative agents and their capabilities", inputSchema: { type: "object", properties: {} } },
    { name: "agent_info", description: "Get detailed information about a specific agent", inputSchema: { type: "object", properties: { agentId: { type: "string", enum: ["creator", "worldsmith", "luminor-council", "scribe", "seer"] } }, required: ["agentId"] } },
    { name: "assess_world", description: "Analyze your world's maturity and get strategic suggestions", inputSchema: { type: "object", properties: { sessionId: { type: "string" } } } },
    { name: "match_skill", description: "Find the best agent for a specific creative request", inputSchema: { type: "object", properties: { request: { type: "string" } }, required: ["request"] } },
    { name: "active_sessions", description: "List all currently running creative sessions", inputSchema: { type: "object", properties: {} } },

    // === CANON & REFERENCE ===
    { name: "validate_canon", description: "Check content for Arcanea canon compliance", inputSchema: { type: "object", properties: { content: { type: "string" }, contentType: { type: "string", enum: ["story", "character", "general"] } }, required: ["content"] } },
    { name: "identify_gate", description: "Get detailed information about a specific Gate, Guardian, and Godbeast", inputSchema: { type: "object", properties: { gateNumber: { type: "number", minimum: 1, maximum: 10 } }, required: ["gateNumber"] } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const sessionId = (args as any)?.sessionId || "default";

  switch (name) {
    // Worldbuilding generators
    case "generate_character": {
      const result = await generateCharacter(args as any);
      const parsed = JSON.parse(result.content[0].text);
      const creation = { id: Date.now().toString(), type: "character" as const, name: parsed.name, element: parsed.primaryElement, gate: parsed.gatesOpen, createdAt: new Date(), summary: `${parsed.rank} of ${parsed.house}` };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
      return result;
    }
    case "generate_magic": return generateMagicAbility(args as any);
    case "generate_location": {
      const result = await generateLocation(args as any);
      const parsed = JSON.parse(result.content[0].text);
      const creation = { id: Date.now().toString(), type: "location" as const, name: parsed.name, element: parsed.dominantElement, createdAt: new Date(), summary: parsed.type };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
      return result;
    }
    case "generate_creature": {
      const result = await generateCreature(args as any);
      const parsed = JSON.parse(result.content[0].text);
      const creation = { id: Date.now().toString(), type: "creature" as const, name: parsed.name, element: parsed.element, createdAt: new Date(), summary: parsed.species };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
      return result;
    }
    case "generate_artifact": {
      const result = await generateArtifact(args as any);
      const parsed = JSON.parse(result.content[0].text);
      const creation = { id: Date.now().toString(), type: "artifact" as const, name: parsed.name, element: parsed.element, createdAt: new Date(), summary: parsed.type };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
      return result;
    }
    case "generate_name": return generateName(args as any);
    case "generate_story_prompt": return generateStoryPrompt(args as any);

    // Basic coaching
    case "diagnose_block": {
      const result = await diagnoseBlock(args?.symptoms as string, args?.context as string);
      const parsed = JSON.parse(result.content[0].text);
      if (parsed.creature?.name) recordCreatureEncountered(sessionId, parsed.creature.name);
      return result;
    }
    case "invoke_luminor": {
      const l = luminors[(args?.luminor as string)?.toLowerCase()];
      if (!l) return { content: [{ type: "text", text: `Unknown Luminor: ${args?.luminor}. Available: valora, serenith, ignara, verdana, eloqua` }] };
      recordLuminorConsulted(sessionId, l.name);
      return { content: [{ type: "text", text: JSON.stringify({
        luminor: l.name,
        title: l.title,
        element: l.element,
        greeting: l.personality.approach,
        bestFor: l.guidance.bestFor,
        practice: l.guidance.practices[Math.floor(Math.random() * l.guidance.practices.length)],
        wisdom: l.guidance.quotes[Math.floor(Math.random() * l.guidance.quotes.length)],
      }, null, 2) }] };
    }

    // Advanced coaching (NEW)
    case "deep_diagnosis": {
      const result = await deepDiagnosis(
        args?.symptoms as string,
        args?.context as string,
        args?.history as string,
        (args?.depth as "quick" | "standard" | "deep") || "standard"
      );
      const parsed = JSON.parse(result.content[0].text);
      if (parsed.primaryCreature?.name) recordCreatureEncountered(sessionId, parsed.primaryCreature.name);
      return result;
    }
    case "convene_council": {
      const result = await conveneCouncil(
        args?.lead as string,
        (args?.support as string[]) || [],
        args?.topic as string
      );
      const parsed = JSON.parse(result.content[0].text);
      if (parsed.lead?.luminor) recordLuminorConsulted(sessionId, parsed.lead.luminor);
      parsed.supporting?.forEach((s: any) => recordLuminorConsulted(sessionId, s.luminor));
      return result;
    }
    case "luminor_debate": {
      const result = await luminorDebate(
        args?.luminor1 as string,
        args?.luminor2 as string,
        args?.question as string
      );
      recordLuminorConsulted(sessionId, args?.luminor1 as string);
      recordLuminorConsulted(sessionId, args?.luminor2 as string);
      return result;
    }

    // Memory & Journey (NEW)
    case "get_journey": {
      const summary = getSessionSummary(sessionId);
      const session = getOrCreateSession(sessionId);
      return { content: [{ type: "text", text: JSON.stringify({
        journey: summary,
        gatesExplored: session.gatesExplored,
        luminorsConsulted: session.luminorsConsulted,
        creaturesEncountered: session.creaturesEncountered,
        creations: session.creations.slice(-10), // Last 10
        preferences: session.preferences,
      }, null, 2) }] };
    }
    case "check_milestones": {
      const milestones = checkMilestones(sessionId);
      return { content: [{ type: "text", text: JSON.stringify({
        achieved: milestones,
        message: milestones.length > 0
          ? `Congratulations! You've achieved ${milestones.length} milestone(s) on your creative journey.`
          : "Keep creating! Milestones await you on the path ahead.",
      }, null, 2) }] };
    }

    // Creation Graph
    case "link_creations": {
      const edge = linkCreations(
        sessionId,
        args?.sourceId as string,
        args?.targetId as string,
        args?.relationship as RelationshipType,
        (args?.strength as number) || 0.5
      );
      if (!edge) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "One or both creations not found in the graph. Make sure to generate them first." }) }] };
      }
      return { content: [{ type: "text", text: JSON.stringify({ success: true, edge, message: `Linked creations with '${edge.relationship}' relationship.` }, null, 2) }] };
    }
    case "get_related": {
      const related = getRelatedCreations(sessionId, args?.creationId as string, args?.relationship as RelationshipType | undefined);
      return { content: [{ type: "text", text: JSON.stringify({
        creationId: args?.creationId,
        relatedCount: related.length,
        related: related.map(r => ({ name: r.node.name, type: r.node.type, relationship: r.relationship, strength: r.strength })),
      }, null, 2) }] };
    }
    case "suggest_connections": {
      const suggestions = suggestConnections(sessionId, args?.creationId as string);
      return { content: [{ type: "text", text: JSON.stringify({
        creationId: args?.creationId,
        suggestions: suggestions.map(s => ({ targetName: s.target.name, targetType: s.target.type, suggestedRelationship: s.suggestedRelationship, reason: s.reason })),
      }, null, 2) }] };
    }
    case "get_world_graph": {
      const summary = getGraphSummary(sessionId);
      return { content: [{ type: "text", text: JSON.stringify({
        worldSummary: summary,
        description: `Your world contains ${summary.nodeCount} creations connected by ${summary.edgeCount} relationships.`,
      }, null, 2) }] };
    }
    case "find_path": {
      const path = findPath(sessionId, args?.sourceId as string, args?.targetId as string, (args?.maxDepth as number) || 5);
      if (!path) {
        return { content: [{ type: "text", text: JSON.stringify({ found: false, message: "No connection path found between these creations." }) }] };
      }
      return { content: [{ type: "text", text: JSON.stringify({ found: true, pathLength: path.length, path }, null, 2) }] };
    }
    case "export_world": {
      const graph = exportGraph(sessionId);
      return { content: [{ type: "text", text: JSON.stringify({
        exportedAt: new Date().toISOString(),
        nodeCount: graph.nodes.length,
        edgeCount: graph.edges.length,
        graph,
      }, null, 2) }] };
    }

    // Agent Orchestration
    case "orchestrate": {
      const { session, result } = await orchestrateCreativeSession(args?.request as string, sessionId);
      return { content: [{ type: "text", text: JSON.stringify({
        sessionId: session.id,
        goal: session.goal,
        state: session.state,
        agentsUsed: session.agents,
        taskCount: session.tasks.length,
        result,
        message: `Creative session completed with ${session.agents.length} agent(s).`,
      }, null, 2) }] };
    }
    case "list_agents": {
      const agentList = Object.values(AGENTS).map(a => ({
        id: a.id,
        name: a.displayName,
        role: a.role,
        model: a.model,
        capabilities: a.capabilities.map(c => c.name),
        canParallelize: a.canParallelize,
      }));
      return { content: [{ type: "text", text: JSON.stringify({
        agents: agentList,
        totalAgents: agentList.length,
        message: "Available creative agents in the Arcanea system.",
      }, null, 2) }] };
    }
    case "agent_info": {
      const agent = getAgent(args?.agentId as string);
      if (!agent) {
        return { content: [{ type: "text", text: JSON.stringify({ error: `Unknown agent: ${args?.agentId}` }) }] };
      }
      return { content: [{ type: "text", text: JSON.stringify({
        ...agent,
        description: `${agent.displayName} is a ${agent.role} agent using ${agent.model}.`,
      }, null, 2) }] };
    }
    case "assess_world": {
      const worldState = assessWorldState(sessionId);
      const suggestions: string[] = [];
      switch (worldState.maturity) {
        case "virgin": suggestions.push("Start by creating a founding character and their home location."); break;
        case "emerging": suggestions.push("Connect your creations with relationships. Try linking characters to locations."); break;
        case "developing": suggestions.push("Develop narrative threads. Consider what conflicts or alliances exist."); break;
        case "rich": suggestions.push("Document your world's history. Create artifacts that tie characters together."); break;
        case "epic": suggestions.push("Your world is vast! Consider creating an epic narrative that spans your creations."); break;
      }
      return { content: [{ type: "text", text: JSON.stringify({
        worldState,
        suggestions,
        message: `World maturity: ${worldState.maturity} (${worldState.creationCount} creations, ${worldState.connectionCount} connections)`,
      }, null, 2) }] };
    }
    case "match_skill": {
      const skill = matchCreativeSkill(args?.request as string);
      if (!skill) {
        return { content: [{ type: "text", text: JSON.stringify({
          matched: false,
          message: "No specific skill matched. The Creator orchestrator will analyze and delegate.",
          suggestedAgent: "creator",
        }) }] };
      }
      const agent = getAgent(skill.agent);
      return { content: [{ type: "text", text: JSON.stringify({
        matched: true,
        skill: skill.name,
        agent: skill.agent,
        agentName: agent?.displayName,
        triggers: skill.triggers,
        message: `Matched skill "${skill.name}" - routing to ${agent?.displayName}.`,
      }, null, 2) }] };
    }
    case "active_sessions": {
      const sessions = getActiveSessions();
      return { content: [{ type: "text", text: JSON.stringify({
        activeSessions: sessions.map(s => ({
          id: s.id,
          goal: s.goal,
          state: s.state,
          agents: s.agents,
          startedAt: s.startedAt,
        })),
        count: sessions.length,
        message: sessions.length > 0 ? `${sessions.length} session(s) currently running.` : "No active sessions.",
      }, null, 2) }] };
    }

    // Canon & Reference
    case "validate_canon": return validateCanon(args?.content as string, args?.contentType as string);
    case "identify_gate": {
      const gateNum = args?.gateNumber as number;
      const g = gates[gateNum - 1];
      if (!g) return { content: [{ type: "text", text: "Invalid gate number. Use 1-10." }] };
      recordGateExplored(sessionId, gateNum);
      return { content: [{ type: "text", text: JSON.stringify({
        ...g,
        description: `The ${g.domain} Gate, guarded by ${g.guardian}, resonates at ${g.frequencyBand}. It governs ${g.domain.toLowerCase()} and is aligned with ${g.element}.`,
        godbeastDescription: g.veltara ? `${g.veltara} is the Godbeast companion of ${g.guardian}.` : "Shinkami has no Godbeast - they are the Source itself.",
      }, null, 2) }] };
    }

    default: return { content: [{ type: "text", text: `Unknown tool: ${name}. Use tools like generate_character, invoke_luminor, or diagnose_block.` }] };
  }
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    { uri: "arcanea://luminors", name: "Luminor Companions", mimeType: "application/json" },
    { uri: "arcanea://bestiary", name: "Bestiary of Blocks", mimeType: "application/json" },
    { uri: "arcanea://gates", name: "The Ten Gates", mimeType: "application/json" },
    { uri: "arcanea://elements", name: "The Five Elements", mimeType: "application/json" },
    { uri: "arcanea://houses", name: "The Seven Houses", mimeType: "application/json" },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  const content = uri === "arcanea://luminors" ? luminors : uri === "arcanea://bestiary" ? bestiary : uri === "arcanea://gates" ? { gates } : uri === "arcanea://elements" ? { elements: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] } : uri === "arcanea://houses" ? { houses: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] } : null;
  if (!content) throw new Error(`Unknown resource: ${uri}`);
  return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(content, null, 2) }] };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts }));
server.setRequestHandler(GetPromptRequestSchema, async (request) => getPrompt(request.params.name, request.params.arguments || {}));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Arcanea MCP Server running");
}

main().catch(console.error);
