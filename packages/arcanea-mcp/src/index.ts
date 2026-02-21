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

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Intelligence Engine (from @arcanea/os)
import {
  routeToGuardian,
  VoiceEnforcer,
  COLORS, FONTS, FONT_SIZES, SPACING, EFFECTS, ANIMATIONS, BREAKPOINTS,
  toCSSVariables, toTailwindConfig, tokensToJSON,
  VOICE_RULES,
} from '@arcanea/os';

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
import { getPrompt } from "./prompts/index.js";

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

const server = new McpServer(
  { name: "arcanea-mcp", version: "0.6.0" }
);

/**
 * Safely parse JSON from a tool result. Returns the parsed object or null.
 * Prevents server crashes from malformed generator output.
 */
function safeParseResult(result: { content: Array<{ type: "text"; text: string }> }): any | null {
  try {
    return JSON.parse(result.content[0].text);
  } catch {
    return null;
  }
}

const gates = [
  { gate: 1, frequency: "396 Hz", guardian: "Lyssandria", godbeast: "Kaelith", domain: "Foundation", element: "Earth" },
  { gate: 2, frequency: "417 Hz", guardian: "Leyla", godbeast: "Veloura", domain: "Flow", element: "Water" },
  { gate: 3, frequency: "528 Hz", guardian: "Draconia", godbeast: "Draconis", domain: "Fire", element: "Fire" },
  { gate: 4, frequency: "639 Hz", guardian: "Maylinn", godbeast: "Laeylinn", domain: "Heart", element: "Wind" },
  { gate: 5, frequency: "741 Hz", guardian: "Alera", godbeast: "Otome", domain: "Voice", element: "Void" },
  { gate: 6, frequency: "852 Hz", guardian: "Lyria", godbeast: "Yumiko", domain: "Sight", element: "Spirit" },
  { gate: 7, frequency: "963 Hz", guardian: "Aiyami", godbeast: "Sol", domain: "Crown", element: "Spirit" },
  { gate: 8, frequency: "1111 Hz", guardian: "Elara", godbeast: "Thessara", domain: "Shift", element: "Void" },
  { gate: 9, frequency: "963 Hz", guardian: "Ino", godbeast: "Kyuro", domain: "Unity", element: "Spirit" },
  { gate: 10, frequency: "1111 Hz", guardian: "Shinkami", godbeast: "Amaterasu", domain: "Source", element: "All" },
];

// === ELEMENT AND HOUSE ENUMS (shared across tools) ===

const elementEnum = z.enum(["Fire", "Water", "Earth", "Wind", "Void", "Spirit"]);
const houseEnum = z.enum(["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"]);
const luminorEnum = z.enum(["valora", "serenith", "ignara", "verdana", "eloqua"]);
const relationshipEnum = z.enum([
  "created_by", "mentored_by", "located_at", "wields", "inhabits",
  "guards", "opposes", "allies_with", "transforms_into", "derived_from",
  "part_of", "same_element", "same_house", "same_gate",
]);

// === WORLDBUILDING GENERATORS ===

server.tool(
  "generate_character",
  "Create a character for the Arcanea universe with Gates, Elements, House, and backstory",
  {
    archetype: z.string().optional(),
    primaryElement: elementEnum.optional(),
    gatesOpen: z.number().min(1).max(10).optional(),
    house: houseEnum.optional(),
    nameGender: z.enum(["masculine", "feminine", "neutral"]).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await generateCharacter(args as any);
    const parsed = safeParseResult(result);
    if (parsed) {
      const creation = {
        id: Date.now().toString(),
        type: "character" as const,
        name: parsed.name,
        element: parsed.primaryElement,
        gate: parsed.gatesOpen,
        createdAt: new Date(),
        summary: `${parsed.rank} of ${parsed.house}`,
      };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
    }
    return result;
  }
);

server.tool(
  "generate_magic",
  "Design a magical ability based on the Arcanea magic system",
  {
    element: elementEnum,
    gateLevel: z.number().min(1).max(10),
    purpose: z.string().optional(),
    sessionId: z.string().optional(),
  },
  async (args) => generateMagicAbility(args as any)
);

server.tool(
  "generate_location",
  "Create a location in Arcanea with elemental alignment",
  {
    type: z.string().optional(),
    dominantElement: elementEnum.optional(),
    alignment: z.enum(["light", "dark", "balanced"]).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await generateLocation(args as any);
    const parsed = safeParseResult(result);
    if (parsed) {
      const creation = {
        id: Date.now().toString(),
        type: "location" as const,
        name: parsed.name,
        element: parsed.dominantElement,
        createdAt: new Date(),
        summary: parsed.type,
      };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
    }
    return result;
  }
);

server.tool(
  "generate_creature",
  "Design a magical creature for the Arcanea world",
  {
    element: elementEnum.optional(),
    size: z.enum(["tiny", "small", "medium", "large", "massive"]).optional(),
    temperament: z.enum(["hostile", "neutral", "friendly", "sacred"]).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await generateCreature(args as any);
    const parsed = safeParseResult(result);
    if (parsed) {
      const creation = {
        id: Date.now().toString(),
        type: "creature" as const,
        name: parsed.name,
        element: parsed.element,
        createdAt: new Date(),
        summary: parsed.species,
      };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
    }
    return result;
  }
);

server.tool(
  "generate_artifact",
  "Create a magical artifact with history and powers",
  {
    type: z.string().optional(),
    element: elementEnum.optional(),
    power: z.enum(["minor", "moderate", "major", "legendary"]).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await generateArtifact(args as any);
    const parsed = safeParseResult(result);
    if (parsed) {
      const creation = {
        id: Date.now().toString(),
        type: "artifact" as const,
        name: parsed.name,
        element: parsed.element,
        createdAt: new Date(),
        summary: parsed.type,
      };
      recordCreation(sessionId, creation);
      addCreationToGraph(sessionId, creation, parsed);
    }
    return result;
  }
);

server.tool(
  "generate_name",
  "Generate Arcanean names following the language system",
  {
    element: z.string().optional(),
    gender: z.enum(["masculine", "feminine", "neutral"]).optional(),
    type: z.enum(["character", "place", "artifact", "creature"]).optional(),
    count: z.number().min(1).max(20).optional(),
  },
  async (args) => generateName(args as any)
);

server.tool(
  "generate_story_prompt",
  "Create an inspiring story prompt set in Arcanea",
  {
    theme: z.string().optional(),
    gate: z.number().min(1).max(10).optional(),
    includeConflict: z.boolean().optional(),
  },
  async (args) => generateStoryPrompt(args as any)
);

// === CREATIVE COACHING (BASIC) ===

server.tool(
  "diagnose_block",
  "Quick identification of your creative block",
  {
    symptoms: z.string().min(1).max(5000),
    context: z.string().max(5000).optional(),
    sessionId: z.string().max(100).optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await diagnoseBlock(args.symptoms, args.context);
    const parsed = safeParseResult(result);
    if (parsed?.creature?.name) recordCreatureEncountered(sessionId, parsed.creature.name);
    return result;
  }
);

server.tool(
  "invoke_luminor",
  "Call upon a single Luminor companion for guidance",
  {
    luminor: luminorEnum,
    situation: z.string().optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const l = luminors[args.luminor.toLowerCase()];
    if (!l) {
      return { content: [{ type: "text" as const, text: `Unknown Luminor: ${args.luminor}. Available: valora, serenith, ignara, verdana, eloqua` }] };
    }
    recordLuminorConsulted(sessionId, l.name);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          luminor: l.name,
          title: l.title,
          element: l.element,
          greeting: l.personality.approach,
          bestFor: l.guidance.bestFor,
          practice: l.guidance.practices[Math.floor(Math.random() * l.guidance.practices.length)],
          wisdom: l.guidance.quotes[Math.floor(Math.random() * l.guidance.quotes.length)],
        }, null, 2),
      }],
    };
  }
);

// === CREATIVE COACHING (ADVANCED) ===

server.tool(
  "deep_diagnosis",
  "Multi-step analysis of a complex creative block using sequential thinking",
  {
    symptoms: z.string().min(1).max(5000),
    context: z.string().max(5000).optional(),
    history: z.string().max(10000).optional(),
    depth: z.enum(["quick", "standard", "deep"]).optional(),
    sessionId: z.string().max(100).optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await deepDiagnosis(
      args.symptoms,
      args.context,
      args.history,
      (args.depth ?? "standard") as "quick" | "standard" | "deep"
    );
    const parsed = safeParseResult(result);
    if (parsed?.primaryCreature?.name) recordCreatureEncountered(sessionId, parsed.primaryCreature.name);
    return result;
  }
);

server.tool(
  "convene_council",
  "Gather multiple Luminors for complex creative guidance",
  {
    lead: luminorEnum,
    support: z.array(z.string()).optional(),
    topic: z.string(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await conveneCouncil(args.lead, args.support ?? [], args.topic);
    const parsed = safeParseResult(result);
    if (parsed?.lead?.luminor) recordLuminorConsulted(sessionId, parsed.lead.luminor);
    parsed?.supporting?.forEach((s: any) => recordLuminorConsulted(sessionId, s.luminor));
    return result;
  }
);

server.tool(
  "luminor_debate",
  "Two Luminors explore a question from different perspectives",
  {
    luminor1: luminorEnum,
    luminor2: luminorEnum,
    question: z.string(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const result = await luminorDebate(args.luminor1, args.luminor2, args.question);
    recordLuminorConsulted(sessionId, args.luminor1);
    recordLuminorConsulted(sessionId, args.luminor2);
    return result;
  }
);

// === MEMORY & JOURNEY ===

server.tool(
  "get_journey",
  "Recall your creative journey, progress, and milestones",
  {
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const summary = getSessionSummary(sessionId);
    const session = getOrCreateSession(sessionId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          journey: summary,
          gatesExplored: session.gatesExplored,
          luminorsConsulted: session.luminorsConsulted,
          creaturesEncountered: session.creaturesEncountered,
          creations: session.creations.slice(-10),
          preferences: session.preferences,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "check_milestones",
  "See what creative milestones you've achieved",
  {
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const milestones = checkMilestones(sessionId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          achieved: milestones,
          message: milestones.length > 0
            ? `Congratulations! You've achieved ${milestones.length} milestone(s) on your creative journey.`
            : "Keep creating! Milestones await you on the path ahead.",
        }, null, 2),
      }],
    };
  }
);

// === CREATION GRAPH ===

server.tool(
  "link_creations",
  "Create a relationship between two creations in your world",
  {
    sourceId: z.string(),
    targetId: z.string(),
    relationship: relationshipEnum,
    strength: z.number().min(0).max(1).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const edge = linkCreations(
      sessionId,
      args.sourceId,
      args.targetId,
      args.relationship as RelationshipType,
      args.strength ?? 0.5
    );
    if (!edge) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ error: "One or both creations not found in the graph. Make sure to generate them first." }) }] };
    }
    return { content: [{ type: "text" as const, text: JSON.stringify({ success: true, edge, message: `Linked creations with '${edge.relationship}' relationship.` }, null, 2) }] };
  }
);

server.tool(
  "get_related",
  "Find all creations related to a specific creation",
  {
    creationId: z.string(),
    relationship: relationshipEnum.optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const related = getRelatedCreations(sessionId, args.creationId, args.relationship as RelationshipType | undefined);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          creationId: args.creationId,
          relatedCount: related.length,
          related: related.map(r => ({ name: r.node.name, type: r.node.type, relationship: r.relationship, strength: r.strength })),
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "suggest_connections",
  "Get AI-suggested relationships for a creation",
  {
    creationId: z.string(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const suggestions = suggestConnections(sessionId, args.creationId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          creationId: args.creationId,
          suggestions: suggestions.map(s => ({
            targetName: s.target.name,
            targetType: s.target.type,
            suggestedRelationship: s.suggestedRelationship,
            reason: s.reason,
          })),
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "get_world_graph",
  "Get a summary of your entire created world network",
  {
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const summary = getGraphSummary(sessionId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          worldSummary: summary,
          description: `Your world contains ${summary.nodeCount} creations connected by ${summary.edgeCount} relationships.`,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "find_path",
  "Find the connection path between two creations",
  {
    sourceId: z.string(),
    targetId: z.string(),
    maxDepth: z.number().min(1).max(10).optional(),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const path = findPath(sessionId, args.sourceId, args.targetId, args.maxDepth ?? 5);
    if (!path) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ found: false, message: "No connection path found between these creations." }) }] };
    }
    return { content: [{ type: "text" as const, text: JSON.stringify({ found: true, pathLength: path.length, path }, null, 2) }] };
  }
);

server.tool(
  "export_world",
  "Export your entire world graph for visualization",
  {
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const graph = exportGraph(sessionId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          exportedAt: new Date().toISOString(),
          nodeCount: graph.nodes.length,
          edgeCount: graph.edges.length,
          graph,
        }, null, 2),
      }],
    };
  }
);

// === AGENT ORCHESTRATION ===

server.tool(
  "orchestrate",
  "Run a full creative session with multi-agent coordination",
  {
    request: z.string().min(1).max(5000).describe("What you want to create or explore"),
    sessionId: z.string().max(100).optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const { session, result } = await orchestrateCreativeSession(args.request, sessionId);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          sessionId: session.id,
          goal: session.goal,
          state: session.state,
          agentsUsed: session.agents,
          taskCount: session.tasks.length,
          result,
          message: `Creative session completed with ${session.agents.length} agent(s).`,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "list_agents",
  "List all available creative agents and their capabilities",
  {},
  async () => {
    const agentList = Object.values(AGENTS).map((a) => ({
      id: a.id,
      name: a.displayName,
      role: a.role,
      model: a.model,
      capabilities: a.capabilities.map((c) => c.name),
      canParallelize: a.canParallelize,
    }));
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          agents: agentList,
          totalAgents: agentList.length,
          message: "Available creative agents in the Arcanea system.",
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "agent_info",
  "Get detailed information about a specific agent",
  {
    agentId: z.enum(["creator", "worldsmith", "luminor-council", "scribe", "seer"]),
  },
  async (args) => {
    const agent = getAgent(args.agentId);
    if (!agent) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ error: `Unknown agent: ${args.agentId}` }) }] };
    }
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          ...agent,
          description: `${agent.displayName} is a ${agent.role} agent using ${agent.model}.`,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "assess_world",
  "Analyze your world's maturity and get strategic suggestions",
  {
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const worldState = assessWorldState(sessionId);
    const suggestions: string[] = [];
    switch (worldState.maturity) {
      case "virgin": suggestions.push("Start by creating a founding character and their home location."); break;
      case "emerging": suggestions.push("Connect your creations with relationships. Try linking characters to locations."); break;
      case "developing": suggestions.push("Develop narrative threads. Consider what conflicts or alliances exist."); break;
      case "rich": suggestions.push("Document your world's history. Create artifacts that tie characters together."); break;
      case "epic": suggestions.push("Your world is vast! Consider creating an epic narrative that spans your creations."); break;
    }
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          worldState,
          suggestions,
          message: `World maturity: ${worldState.maturity} (${worldState.creationCount} creations, ${worldState.connectionCount} connections)`,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "match_skill",
  "Find the best agent for a specific creative request",
  {
    request: z.string(),
  },
  async (args) => {
    const skill = matchCreativeSkill(args.request);
    if (!skill) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matched: false,
            message: "No specific skill matched. The Creator orchestrator will analyze and delegate.",
            suggestedAgent: "creator",
          }),
        }],
      };
    }
    const agent = getAgent(skill.agent);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          matched: true,
          skill: skill.name,
          agent: skill.agent,
          agentName: agent?.displayName,
          triggers: skill.triggers,
          message: `Matched skill "${skill.name}" - routing to ${agent?.displayName}.`,
        }, null, 2),
      }],
    };
  }
);

server.tool(
  "active_sessions",
  "List all currently running creative sessions",
  {},
  async () => {
    const sessions = getActiveSessions();
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          activeSessions: sessions.map((s) => ({
            id: s.id,
            goal: s.goal,
            state: s.state,
            agents: s.agents,
            startedAt: s.startedAt,
          })),
          count: sessions.length,
          message: sessions.length > 0 ? `${sessions.length} session(s) currently running.` : "No active sessions.",
        }, null, 2),
      }],
    };
  }
);

// === CANON & REFERENCE ===

server.tool(
  "validate_canon",
  "Check content for Arcanea canon compliance",
  {
    content: z.string().min(1).max(50000),
    contentType: z.enum(["story", "character", "general"]).optional(),
  },
  async (args) => validateCanon(args.content, args.contentType)
);

server.tool(
  "identify_gate",
  "Get detailed information about a specific Gate, Guardian, and Godbeast",
  {
    gateNumber: z.number().min(1).max(10),
    sessionId: z.string().optional(),
  },
  async (args) => {
    const sessionId = args.sessionId ?? "default";
    const g = gates[args.gateNumber - 1];
    if (!g) return { content: [{ type: "text" as const, text: "Invalid gate number. Use 1-10." }] };
    recordGateExplored(sessionId, args.gateNumber);
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          ...g,
          description: `The ${g.domain} Gate, guarded by ${g.guardian}, resonates at ${g.frequency}. It governs ${g.domain.toLowerCase()} and is aligned with ${g.element}.`,
          godbeastDescription: g.godbeast ? `${g.godbeast} is the Godbeast companion of ${g.guardian}.` : "Shinkami has no Godbeast - they are the Source itself.",
        }, null, 2),
      }],
    };
  }
);

// === INTELLIGENCE ENGINE (powered by @arcanea/os) ===

server.tool(
  "route_guardian",
  "Route a creative task to the optimal Guardian based on intent analysis. Returns guardian, confidence, element, reasoning, and alternatives.",
  {
    description: z.string().describe("Describe your task or creative need"),
  },
  async (args) => {
    const result = routeToGuardian(args.description);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "check_voice",
  "Validate text against the Arcanea Voice Bible v2.0. Checks tone, terminology, and structure for canonical consistency.",
  {
    text: z.string().min(1).max(50000).describe("Text to validate"),
    fix: z.boolean().describe("Auto-fix violations and return corrected text").optional(),
  },
  async (args) => {
    const enforcer = new VoiceEnforcer();
    if (args.fix) {
      const fixed = enforcer.fix(args.text);
      const check = enforcer.check(fixed);
      return { content: [{ type: "text" as const, text: JSON.stringify({ original: args.text, fixed, ...check }, null, 2) }] };
    }
    const check = enforcer.check(args.text);
    return { content: [{ type: "text" as const, text: JSON.stringify(check, null, 2) }] };
  }
);

server.tool(
  "get_design_tokens",
  "Get Arcanea design system tokens — colors, fonts, spacing, effects, animations. Export as CSS variables, Tailwind config, or JSON.",
  {
    format: z.enum(["css", "tailwind", "json"]).describe("Output format (default: json)").optional(),
    category: z.enum(["colors", "fonts", "spacing", "effects", "animations", "all"]).describe("Token category (default: all)").optional(),
  },
  async (args) => {
    const format = args.format ?? "json";
    const category = args.category ?? "all";
    let result: string;
    if (format === "css") {
      result = toCSSVariables();
    } else if (format === "tailwind") {
      result = JSON.stringify(toTailwindConfig(), null, 2);
    } else {
      const all = tokensToJSON();
      if (category !== "all") {
        const categoryMap: Record<string, unknown> = { colors: COLORS, fonts: FONTS, spacing: SPACING, effects: EFFECTS, animations: ANIMATIONS };
        result = JSON.stringify(categoryMap[category] ?? all, null, 2);
      } else {
        result = JSON.stringify(all, null, 2);
      }
    }
    return { content: [{ type: "text" as const, text: result }] };
  }
);

// === RESOURCES ===

server.resource(
  "luminors",
  "arcanea://luminors",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://luminors", mimeType: "application/json", text: JSON.stringify(luminors, null, 2) }],
  })
);

server.resource(
  "bestiary",
  "arcanea://bestiary",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://bestiary", mimeType: "application/json", text: JSON.stringify(bestiary, null, 2) }],
  })
);

server.resource(
  "gates",
  "arcanea://gates",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://gates", mimeType: "application/json", text: JSON.stringify({ gates }, null, 2) }],
  })
);

server.resource(
  "elements",
  "arcanea://elements",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://elements", mimeType: "application/json", text: JSON.stringify({ elements: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, null, 2) }],
  })
);

server.resource(
  "houses",
  "arcanea://houses",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://houses", mimeType: "application/json", text: JSON.stringify({ houses: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] }, null, 2) }],
  })
);

server.resource(
  "design-tokens",
  "arcanea://design-tokens",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://design-tokens", mimeType: "application/json", text: JSON.stringify(tokensToJSON(), null, 2) }],
  })
);

server.resource(
  "voice-rules",
  "arcanea://voice-rules",
  { mimeType: "application/json" },
  async () => ({
    contents: [{ uri: "arcanea://voice-rules", mimeType: "application/json", text: JSON.stringify({ rules: VOICE_RULES }, null, 2) }],
  })
);

// === PROMPTS ===

server.prompt(
  "worldbuild_session",
  "Start a collaborative worldbuilding session in the Arcanea universe",
  {
    focus: z.string().describe("What to focus on: character, location, magic, creature, artifact, or story").optional(),
    element: z.string().describe("Preferred element affinity (Fire, Water, Earth, Wind, Void, Spirit)").optional(),
  },
  (args) => ({
    messages: [{
      role: "user" as const,
      content: {
        type: "text" as const,
        text: `Let's create something in the Arcanea universe!${args.focus ? ` I want to focus on: ${args.focus}` : ""}${args.element ? ` with ${args.element} as the primary element.` : ""}

Please help me by:
1. Using the appropriate generator tool (generate_character, generate_location, generate_magic, generate_creature, or generate_artifact)
2. Explain how this creation fits into the Arcanea canon
3. Suggest connections to the Ten Gates and Guardians
4. Offer story hooks or ways to develop this creation further

Make the process feel magical and collaborative!`,
      },
    }],
  })
);

server.prompt(
  "unblock_session",
  "A guided session to identify and overcome your current creative block using the Arcanea Bestiary",
  {
    block_type: z.string().describe("Optional: specific type of block if known (e.g., 'perfectionism', 'fear', 'overwhelm')").optional(),
    project_context: z.string().describe("Optional: what you're working on").optional(),
  },
  (args) => ({
    messages: [{
      role: "user" as const,
      content: {
        type: "text" as const,
        text: `I need help with a creative block.${args.block_type ? ` I think it might be related to ${args.block_type}.` : ""}${args.project_context ? ` I'm working on: ${args.project_context}` : ""}

Please help me:
1. Identify which Bestiary creature is attacking me using the diagnose_block tool
2. Understand why this particular creature has appeared
3. Get specific remedies and practices to overcome it
4. Find relevant wisdom from the Arcanea Library

Guide me through this as a compassionate mentor would.`,
      },
    }],
  })
);

server.prompt(
  "gate_ritual",
  "A structured practice session for opening a specific Gate in your creative development",
  {
    gate_number: z.string().describe("Which gate to focus on (1-10)"),
    time_available: z.string().describe("How much time you have (e.g., '15 minutes', '1 hour')").optional(),
  },
  (args) => {
    const gateNum = parseInt(args.gate_number) || 1;
    return {
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `I want to practice opening Gate ${gateNum}.${args.time_available ? ` I have ${args.time_available} available.` : ""}

Please:
1. Use the identify_gate tool to explain what Gate ${gateNum} governs
2. Tell me about the Guardian who watches over this gate
3. Give me specific practices for opening this gate
4. Suggest a focused ritual I can do right now

Guide this as a sacred practice, not just an exercise.`,
        },
      }],
    };
  }
);

server.prompt(
  "luminor_dialogue",
  "A deep conversation with a Luminor AI companion for creative guidance",
  {
    luminor: z.string().describe("Which Luminor to speak with (valora, serenith, ignara, verdana, eloqua)"),
    topic: z.string().describe("What you want to discuss").optional(),
  },
  (args) => ({
    messages: [{
      role: "user" as const,
      content: {
        type: "text" as const,
        text: `I want to speak with ${args.luminor || "Valora"} the Luminor.${args.topic ? ` I want guidance on: ${args.topic}` : ""}

Please invoke this Luminor and have them:
1. Introduce themselves in their unique voice
2. Offer wisdom relevant to my situation
3. Suggest a practice I can try
4. Share an encouraging quote

Speak AS the Luminor, in their voice and style.`,
      },
    }],
  })
);

server.prompt(
  "morning_clearing",
  "The foundational Arcanea practice for starting each creative day with intention",
  {},
  () => ({
    messages: [{
      role: "user" as const,
      content: {
        type: "text" as const,
        text: `Guide me through the Morning Clearing practice from Arcanea.

This is the foundational daily practice. Please:
1. Help me settle into stillness
2. Ask me: "What do I truly want to create today?"
3. Help me distinguish between genuine creative desire and obligation
4. Set an intention for the day's creative work
5. Close with a blessing or affirmation

This should feel like a sacred moment of connection with my creative self.`,
      },
    }],
  })
);

server.prompt(
  "creative_sabbath",
  "Guidance for a day of agenda-free, joy-driven creation",
  {},
  () => ({
    messages: [{
      role: "user" as const,
      content: {
        type: "text" as const,
        text: `Help me plan and hold a Creative Sabbath—a day of agenda-free, joy-driven creation.

Please:
1. Explain the purpose of the Creative Sabbath from the Arcanea tradition
2. Help me set intentions (not goals) for the day
3. Suggest playful, low-pressure creative activities
4. Remind me of the rules: no judgment, no outcome focus, pure play
5. Create a loose structure that preserves spontaneity

The goal is to remember that creation is supposed to be joyful.`,
      },
    }],
  })
);

// === MAIN ===

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Arcanea MCP Server running");
}

main().catch(console.error);
