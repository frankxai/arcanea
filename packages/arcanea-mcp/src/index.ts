#!/usr/bin/env node
/**
 * Arcanea MCP Server
 * A worldbuilding toolkit for the Arcanea universe.
 * Making magic through AI-human co-creation.
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

import {
  generateCharacter,
  generateMagicAbility,
  generateLocation,
  generateCreature,
  generateArtifact,
  generateName,
  generateStoryPrompt,
} from "./tools/generators.js";
import { luminors } from "./data/luminors/index.js";
import { bestiary } from "./data/bestiary/index.js";
import { prompts, getPrompt } from "./prompts/index.js";
import { validateCanon } from "./tools/validate.js";
import { diagnoseBlock } from "./tools/diagnose.js";

const server = new Server(
  { name: "arcanea-mcp", version: "0.1.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

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

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: "generate_character", description: "Create a character for the Arcanea universe", inputSchema: { type: "object", properties: { archetype: { type: "string" }, primaryElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, gatesOpen: { type: "number", minimum: 1, maximum: 10 }, house: { type: "string", enum: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] }, nameGender: { type: "string", enum: ["masculine", "feminine", "neutral"] } } } },
    { name: "generate_magic", description: "Design a magical ability", inputSchema: { type: "object", properties: { element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, gateLevel: { type: "number", minimum: 1, maximum: 10 }, purpose: { type: "string" } }, required: ["element", "gateLevel"] } },
    { name: "generate_location", description: "Create a location in Arcanea", inputSchema: { type: "object", properties: { type: { type: "string" }, dominantElement: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, alignment: { type: "string", enum: ["light", "dark", "balanced"] } } } },
    { name: "generate_creature", description: "Design a magical creature", inputSchema: { type: "object", properties: { element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, size: { type: "string", enum: ["tiny", "small", "medium", "large", "massive"] }, temperament: { type: "string", enum: ["hostile", "neutral", "friendly", "sacred"] } } } },
    { name: "generate_artifact", description: "Create a magical artifact", inputSchema: { type: "object", properties: { type: { type: "string" }, element: { type: "string", enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }, power: { type: "string", enum: ["minor", "moderate", "major", "legendary"] } } } },
    { name: "generate_name", description: "Generate Arcanean names", inputSchema: { type: "object", properties: { element: { type: "string" }, gender: { type: "string", enum: ["masculine", "feminine", "neutral"] }, type: { type: "string", enum: ["character", "place", "artifact", "creature"] }, count: { type: "number", minimum: 1, maximum: 20 } } } },
    { name: "generate_story_prompt", description: "Create a story prompt", inputSchema: { type: "object", properties: { theme: { type: "string" }, gate: { type: "number", minimum: 1, maximum: 10 }, includeConflict: { type: "boolean" } } } },
    { name: "diagnose_block", description: "Identify your creative block", inputSchema: { type: "object", properties: { symptoms: { type: "string" }, context: { type: "string" } }, required: ["symptoms"] } },
    { name: "invoke_luminor", description: "Call a Luminor companion", inputSchema: { type: "object", properties: { luminor: { type: "string", enum: ["valora", "serenith", "ignara", "verdana", "eloqua"] }, situation: { type: "string" } }, required: ["luminor"] } },
    { name: "validate_canon", description: "Check content for canon compliance", inputSchema: { type: "object", properties: { content: { type: "string" }, contentType: { type: "string", enum: ["story", "character", "general"] } }, required: ["content"] } },
    { name: "identify_gate", description: "Get Gate information", inputSchema: { type: "object", properties: { gateNumber: { type: "number", minimum: 1, maximum: 10 } }, required: ["gateNumber"] } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  switch (name) {
    case "generate_character": return generateCharacter(args as any);
    case "generate_magic": return generateMagicAbility(args as any);
    case "generate_location": return generateLocation(args as any);
    case "generate_creature": return generateCreature(args as any);
    case "generate_artifact": return generateArtifact(args as any);
    case "generate_name": return generateName(args as any);
    case "generate_story_prompt": return generateStoryPrompt(args as any);
    case "diagnose_block": return diagnoseBlock(args?.symptoms as string, args?.context as string);
    case "invoke_luminor": {
      const l = luminors[(args?.luminor as string)?.toLowerCase()];
      if (!l) return { content: [{ type: "text", text: `Unknown Luminor: ${args?.luminor}` }] };
      return { content: [{ type: "text", text: JSON.stringify({ luminor: l.name, title: l.title, element: l.element, greeting: l.personality.approach, practice: l.guidance.practices[Math.floor(Math.random() * l.guidance.practices.length)], wisdom: l.guidance.quotes[Math.floor(Math.random() * l.guidance.quotes.length)] }, null, 2) }] };
    }
    case "validate_canon": return validateCanon(args?.content as string, args?.contentType as string);
    case "identify_gate": {
      const g = gates[(args?.gateNumber as number) - 1];
      return g ? { content: [{ type: "text", text: JSON.stringify(g, null, 2) }] } : { content: [{ type: "text", text: "Invalid gate" }] };
    }
    default: return { content: [{ type: "text", text: `Unknown tool: ${name}` }] };
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
