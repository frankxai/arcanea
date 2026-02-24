import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { diagnoseBlock } from "./diagnose.js";
import { getWisdom } from "./wisdom.js";
import { invokeLuminor } from "./luminor.js";
import { identifyGate } from "./gates.js";
import { validateCanon } from "./validate.js";

export const tools: Tool[] = [
  {
    name: "diagnose_block",
    description: "Identify which Bestiary creature matches the creator's current creative block. Returns the creature name, affected Gate, and proven remedies.",
    inputSchema: {
      type: "object",
      properties: {
        symptoms: {
          type: "string",
          description: "Description of creative struggle (e.g., 'I keep starting but never finishing')",
        },
        context: {
          type: "string",
          description: "What they're trying to create (optional)",
        },
      },
      required: ["symptoms"],
    },
  },
  {
    name: "get_wisdom",
    description: "Find relevant wisdom from the Arcanea Library for a creator's current situation.",
    inputSchema: {
      type: "object",
      properties: {
        situation: {
          type: "string",
          enum: ["stuck", "beginning", "finishing", "comparing", "doubting", "celebrating", "overwhelmed", "burned_out"],
          description: "The creator's current situation",
        },
        domain: {
          type: "string",
          enum: ["writing", "music", "visual", "general", "any"],
          description: "Creative domain (optional)",
        },
      },
      required: ["situation"],
    },
  },
  {
    name: "invoke_luminor",
    description: "Get guidance from a Luminor AI companion. Each Luminor has a unique personality and domain expertise.",
    inputSchema: {
      type: "object",
      properties: {
        luminor: {
          type: "string",
          description: "Luminor name (e.g., 'valora', 'serenith') or domain (e.g., 'courage', 'calm')",
        },
        question: {
          type: "string",
          description: "What guidance they seek",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "identify_gate",
    description: "Assess which of the Ten Gates a creator is currently working on opening, based on their challenges and growth edge.",
    inputSchema: {
      type: "object",
      properties: {
        challenges: {
          type: "string",
          description: "Description of current creative challenges",
        },
        strengths: {
          type: "string",
          description: "What they're already good at (optional)",
        },
      },
      required: ["challenges"],
    },
  },
  {
    name: "validate_canon",
    description: "Check if content aligns with Arcanea canon (names, terminology, lore).",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Text content to validate",
        },
        content_type: {
          type: "string",
          enum: ["story", "character", "location", "magic_system", "general"],
          description: "Type of content being validated",
        },
      },
      required: ["content"],
    },
  },
];

export async function handleToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }> }> {
  switch (name) {
    case "diagnose_block":
      return diagnoseBlock(args.symptoms as string, args.context as string | undefined);

    case "get_wisdom":
      return getWisdom(args.situation as string, args.domain as string | undefined);

    case "invoke_luminor":
      return invokeLuminor(args.luminor as string | undefined, args.question as string);

    case "identify_gate":
      return identifyGate(args.challenges as string, args.strengths as string | undefined);

    case "validate_canon":
      return validateCanon(args.content as string, args.content_type as string | undefined);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
