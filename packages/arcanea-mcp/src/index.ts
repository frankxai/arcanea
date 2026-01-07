#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  ReadResourceRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { bestiaryResources, getBestiaryCreature } from "./resources/bestiary.js";
import { canonResources, getCanonContent } from "./resources/canon.js";
import { luminorResources, getLuminorProfile } from "./resources/luminors.js";
import { tools, handleToolCall } from "./tools/index.js";
import { prompts, getPrompt } from "./prompts/index.js";

const server = new Server(
  {
    name: "arcanea-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// List all available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      ...bestiaryResources,
      ...canonResources,
      ...luminorResources,
    ],
  };
});

// Read a specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri.startsWith("arcanea://bestiary/")) {
    const slug = uri.replace("arcanea://bestiary/", "");
    return getBestiaryCreature(slug);
  }

  if (uri.startsWith("arcanea://canon/")) {
    const topic = uri.replace("arcanea://canon/", "");
    return getCanonContent(topic);
  }

  if (uri.startsWith("arcanea://luminors/")) {
    const name = uri.replace("arcanea://luminors/", "");
    return getLuminorProfile(name);
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// List all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  return handleToolCall(request.params.name, request.params.arguments ?? {});
});

// List all available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return { prompts };
});

// Get a specific prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  return getPrompt(request.params.name, request.params.arguments ?? {});
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Arcanea MCP Server running on stdio");
}

main().catch(console.error);
