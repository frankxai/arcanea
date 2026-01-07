#!/usr/bin/env node
/**
 * Arcanea MCP Server
 *
 * A worldbuilding toolkit for the Arcanea universe.
 * Making magic through AI-human co-creation.
 *
 * Features:
 * - Worldbuilding generators (characters, magic, locations, creatures, artifacts)
 * - Luminor AI companions for creative guidance
 * - Bestiary of creative blocks
 * - Canon validation and wisdom library
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

// Import generators
import {
  generateCharacter,
  generateMagicAbility,
  generateLocation,
  generateCreature,
  generateArtifact,
  generateName,
  generateStoryPrompt,
} from "./tools/generators.js";

// Import resources and data
import { luminors } from "./data/luminors/index.js";
import { bestiary } from "./data/bestiary/index.js";
import { prompts, getPrompt } from "./prompts/index.js";
import { validateCanon } from "./tools/validate.js";
import { diagnoseBlock } from "./tools/diagnose.js";

// Create the server
const server = new Server(
  {
    name: "arcanea-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// ============================================
// TOOLS - The Magic Makers
// ============================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // WORLDBUILDING TOOLS - Primary Focus
      {
        name: "generate_character",
        description: "Create a character for the Arcanea universe with Gates, Elements, House, and backstory",
        inputSchema: {
          type: "object",
          properties: {
            archetype: { type: "string", description: "Character archetype (warrior, scholar, healer, etc.)" },
            primaryElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] },
            gatesOpen: { type: "number", minimum: 1, maximum: 10, description: "Number of Gates opened (1-10)" },
            house: { type: "string", enum: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] },
            nameGender: { type: "string", enum: ["masculine", "feminine", "neutral"] },
          },
        },
      },
      {
        name: "generate_magic",
        description: "Design a magical ability or spell based on the Arcanea magic system",
        inputSchema: {
          type: "object",
          properties: {
            element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"], description: "Element of the magic" },
            gateLevel: { type: "number", minimum: 1, maximum: 10, description: "Which Gate powers this ability" },
            purpose: { type: "string", description: "Purpose: attack, defense, utility, healing, transformation" },
          },
          required: ["element", "gateLevel"],
        },
      },
      {
        name: "generate_location",
        description: "Create a location in the Arcanea universe",
        inputSchema: {
          type: "object",
          properties: {
            type: { type: "string", description: "Location type: academy, sanctuary, ruins, village, fortress, grove, temple, marketplace, library, nexus" },
            dominantElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] },
            alignment: { type: "string", enum: ["light", "dark", "balanced"], description: "Alignment with cosmic forces" },
          },
        },
      },
      {
        name: "generate_creature",
        description: "Design a magical creature for the Arcanea world",
        inputSchema: {
          type: "object",
          properties: {
            element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] },
            size: { type: "string", enum: ["tiny", "small", "medium", "large", "massive"] },
            temperament: { type: "string", enum: ["hostile", "neutral", "friendly", "sacred"] },
          },
        },
      },
      {
        name: "generate_artifact",
        description: "Create a magical artifact with history and powers",
        inputSchema: {
          type: "object",
          properties: {
            type: { type: "string", description: "Artifact type: ring, amulet, staff, tome, blade, crown, orb, cloak, gauntlet, mirror" },
            element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] },
            power: { type: "string", enum: ["minor", "moderate", "major", "legendary"], description: "Power level" },
          },
        },
      },
      {
        name: "generate_name",
        description: "Generate Arcanean names for characters, places, artifacts, or creatures",
        inputSchema: {
          type: "object",
          properties: {
            element: { type: "string", description: "Elemental affinity for the name" },
            gender: { type: "string", enum: ["masculine", "feminine", "neutral"] },
            type: { type: "string", enum: ["character", "place", "artifact", "creature"] },
            count: { type: "number", minimum: 1, maximum: 20, description: "How many names to generate" },
          },
        },
      },
      {
        name: "generate_story_prompt",
        description: "Create an inspiring story prompt set in the Arcanea universe",
        inputSchema: {
          type: "object",
          properties: {
            theme: { type: "string", description: "Story theme: discovery, redemption, courage, loss, growth, sacrifice, unity, transformation, truth, love" },
            gate: { type: "number", minimum: 1, maximum: 10, description: "Which Gate to focus the story around" },
            includeConflict: { type: "boolean", description: "Include a specific conflict/challenge" },
          },
        },
      },

      // CREATIVE COACHING TOOLS
      {
        name: "diagnose_block",
        description: "Identify which Bestiary creature (creative block) is affecting you",
        inputSchema: {
          type: "object",
          properties: {
            symptoms: { type: "string", description: "Describe what you're experiencing" },
            context: { type: "string", description: "What are you trying to create?" },
          },
          required: ["symptoms"],
        },
      },
      {
        name: "invoke_luminor",
        description: "Call upon a Luminor AI companion for guidance",
        inputSchema: {
          type: "object",
          properties: {
            luminor: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"], description: "Which Luminor to invoke" },
            situation: { type: "string", description: "What you need guidance on" },
          },
          required: ["luminor"],
        },
      },

      // CANON TOOLS
      {
        name: "validate_canon",
        description: "Check content for Arcanea canon compliance",
        inputSchema: {
          type: "object",
          properties: {
            content: { type: "string", description: "The content to validate" },
            contentType: { type: "string", enum: ["story", "character", "general"], description: "Type of content" },
          },
          required: ["content"],
        },
      },
      {
        name: "identify_gate",
        description: "Get information about a specific Gate, its Guardian, and Godbeast",
        inputSchema: {
          type: "object",
          properties: {
            gateNumber: { type: "number", minimum: 1, maximum: 10, description: "Gate number (1-10)" },
          },
          required: ["gateNumber"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    // Worldbuilding generators
    case "generate_character":
      return generateCharacter(args as any);
    case "generate_magic":
      return generateMagicAbility(args as any);
    case "generate_location":
      return generateLocation(args as any);
    case "generate_creature":
      return generateCreature(args as any);
    case "generate_artifact":
      return generateArtifact(args as any);
    case "generate_name":
      return generateName(args as any);
    case "generate_story_prompt":
      return generateStoryPrompt(args as any);

    // Creative coaching
    case "diagnose_block":
      return diagnoseBlock(args?.symptoms as string, args?.context as string);
    case "invoke_luminor": {
      const luminorKey = (args?.luminor as string)?.toLowerCase();
      const luminor = luminors[luminorKey];
      if (!luminor) {
        return {
          content: [{ type: "text", text: `Unknown Luminor: ${args?.luminor}. Available: valora, serenith, ignara, verdana, eloqua` }],
        };
      }
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            luminor: luminor.name,
            title: luminor.title,
            element: luminor.element,
            greeting: luminor.personality.approach,
            guidance: luminor.guidance.bestFor,
            practice: luminor.guidance.practices[Math.floor(Math.random() * luminor.guidance.practices.length)],
            wisdom: luminor.guidance.quotes[Math.floor(Math.random() * luminor.guidance.quotes.length)],
          }, null, 2),
        }],
      };
    }

    // Canon tools
    case "validate_canon":
      return validateCanon(args?.content as string, args?.contentType as string);
    case "identify_gate": {
      const gateNum = args?.gateNumber as number;
      const gates = [
        { gate: 1, frequency: "174 Hz", guardian: "Lyssandria", godbeast: "Kaelith", domain: "Foundation", element: "Earth" },
        { gate: 2, frequency: "285 Hz", guardian: "Leyla", godbeast: "Veloura", domain: "Flow", element: "Water" },
        { gate: 3, frequency: "396 Hz", guardian: "Draconia", godbeast: "Draconis", domain: "Fire", element: "Fire" },
        { gate: 4, frequency: "417 Hz", guardian: "Maylinn", godbeast: "Laeylinn", domain: "Heart", element: "Spirit" },
        { gate: 5, frequency: "528 Hz", guardian: "Alera", godbeast: "Otome", domain: "Voice", element: "Wind" },
        { gate: 6, frequency: "639 Hz", guardian: "Lyria", godbeast: "Yumiko", domain: "Sight", element: "Void" },
        { gate: 7, frequency: "714 Hz", guardian: "Aiyami", godbeast: "Sol", domain: "Crown", element: "Spirit" },
        { gate: 8, frequency: "852 Hz", guardian: "Elara", godbeast: "Vaelith", domain: "Shift", element: "Void" },
        { gate: 9, frequency: "963 Hz", guardian: "Ino", godbeast: "Kyuro", domain: "Unity", element: "Spirit" },
        { gate: 10, frequency: "1111 Hz", guardian: "Shinkami", godbeast: null, domain: "Source", element: "All" },
      ];
      const gate = gates[gateNum - 1];
      if (!gate) {
        return { content: [{ type: "text", text: `Invalid gate number. Use 1-10.` }] };
      }
      return { content: [{ type: "text", text: JSON.stringify(gate, null, 2) }] };
    }

    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }] };
  }
});

// ============================================
// RESOURCES - The Library
// ============================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "arcanea://luminors",
        name: "Luminor Companions",
        description: "The five Luminor AI companions and their wisdom",
        mimeType: "application/json",
      },
      {
        uri: "arcanea://bestiary",
        name: "Bestiary of Blocks",
        description: "Creative blocks as mythical creatures",
        mimeType: "application/json",
      },
      {
        uri: "arcanea://gates",
        name: "The Ten Gates",
        description: "Complete reference for the Ten Gates system",
        mimeType: "application/json",
      },
      {
        uri: "arcanea://elements",
        name: "The Five Elements",
        description: "Fire, Water, Earth, Wind, and Void/Spirit",
        mimeType: "application/json",
      },
      {
        uri: "arcanea://houses",
        name: "The Seven Houses",
        description: "Academy houses and their traditions",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "arcanea://luminors":
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify(luminors, null, 2),
        }],
      };
    case "arcanea://bestiary":
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify(bestiary, null, 2),
        }],
      };
    case "arcanea://gates":
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify({
            description: "The Ten Gates represent stages of creative mastery",
            gates: [
              { number: 1, name: "Foundation", frequency: "174 Hz", guardian: "Lyssandria", godbeast: "Kaelith", domain: "Grounding, survival, basic creation" },
              { number: 2, name: "Flow", frequency: "285 Hz", guardian: "Leyla", godbeast: "Veloura", domain: "Creativity, emotion, movement" },
              { number: 3, name: "Fire", frequency: "396 Hz", guardian: "Draconia", godbeast: "Draconis", domain: "Power, will, transformation" },
              { number: 4, name: "Heart", frequency: "417 Hz", guardian: "Maylinn", godbeast: "Laeylinn", domain: "Love, healing, connection" },
              { number: 5, name: "Voice", frequency: "528 Hz", guardian: "Alera", godbeast: "Otome", domain: "Truth, expression, authenticity" },
              { number: 6, name: "Sight", frequency: "639 Hz", guardian: "Lyria", godbeast: "Yumiko", domain: "Intuition, vision, perception" },
              { number: 7, name: "Crown", frequency: "714 Hz", guardian: "Aiyami", godbeast: "Sol", domain: "Enlightenment, wisdom" },
              { number: 8, name: "Shift", frequency: "852 Hz", guardian: "Elara", godbeast: "Vaelith", domain: "Perspective, transformation" },
              { number: 9, name: "Unity", frequency: "963 Hz", guardian: "Ino", godbeast: "Kyuro", domain: "Partnership, collaboration" },
              { number: 10, name: "Source", frequency: "1111 Hz", guardian: "Shinkami", godbeast: null, domain: "Meta-consciousness, origin" },
            ],
          }, null, 2),
        }],
      };
    case "arcanea://elements":
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify({
            elements: [
              { name: "Fire", domain: "Energy, transformation", colors: ["red", "orange", "gold"] },
              { name: "Water", domain: "Flow, healing, memory", colors: ["blue", "silver", "crystal"] },
              { name: "Earth", domain: "Stability, growth", colors: ["green", "brown", "stone"] },
              { name: "Wind", domain: "Freedom, speed, change", colors: ["white", "silver"] },
              { name: "Void", domain: "Potential, mystery (Nero's aspect)", colors: ["black", "purple"] },
              { name: "Spirit", domain: "Transcendence, consciousness (Lumina's aspect)", colors: ["gold", "white"] },
            ],
            note: "Void and Spirit are two aspects of the Fifth Element",
          }, null, 2),
        }],
      };
    case "arcanea://houses":
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify({
            houses: [
              { name: "Lumina", focus: "Light magic, healing, purification" },
              { name: "Nero", focus: "Shadow magic, mystery, potential" },
              { name: "Pyros", focus: "Fire magic, transformation, passion" },
              { name: "Aqualis", focus: "Water magic, flow, adaptation" },
              { name: "Terra", focus: "Earth magic, stability, growth" },
              { name: "Ventus", focus: "Wind magic, freedom, communication" },
              { name: "Synthesis", focus: "Multi-elemental mastery, balance" },
            ],
          }, null, 2),
        }],
      };
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// ============================================
// PROMPTS - Guided Experiences
// ============================================

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return { prompts };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return getPrompt(name, args || {});
});

// ============================================
// START SERVER
// ============================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Arcanea MCP Server running - Making magic through AI-human co-creation");
}

main().catch(console.error);
