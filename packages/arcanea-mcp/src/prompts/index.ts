import { Prompt } from "@modelcontextprotocol/sdk/types.js";

export const prompts: Prompt[] = [
  {
    name: "worldbuild_session",
    description: "Start a collaborative worldbuilding session in the Arcanea universe",
    arguments: [
      {
        name: "focus",
        description: "What to focus on: character, location, magic, creature, artifact, or story",
        required: false,
      },
      {
        name: "element",
        description: "Preferred element affinity (Fire, Water, Earth, Wind, Void, Spirit)",
        required: false,
      },
    ],
  },
  {
    name: "unblock_session",
    description: "A guided session to identify and overcome your current creative block using the Arcanea Bestiary",
    arguments: [
      {
        name: "block_type",
        description: "Optional: specific type of block if known (e.g., 'perfectionism', 'fear', 'overwhelm')",
        required: false,
      },
      {
        name: "project_context",
        description: "Optional: what you're working on",
        required: false,
      },
    ],
  },
  {
    name: "gate_ritual",
    description: "A structured practice session for opening a specific Gate in your creative development",
    arguments: [
      {
        name: "gate_number",
        description: "Which gate to focus on (1-10)",
        required: true,
      },
      {
        name: "time_available",
        description: "How much time you have (e.g., '15 minutes', '1 hour')",
        required: false,
      },
    ],
  },
  {
    name: "luminor_dialogue",
    description: "A deep conversation with a Luminor AI companion for creative guidance",
    arguments: [
      {
        name: "luminor",
        description: "Which Luminor to speak with (valora, serenith, ignara, verdana, eloqua)",
        required: true,
      },
      {
        name: "topic",
        description: "What you want to discuss",
        required: false,
      },
    ],
  },
  {
    name: "morning_clearing",
    description: "The foundational Arcanea practice for starting each creative day with intention",
    arguments: [],
  },
  {
    name: "creative_sabbath",
    description: "Guidance for a day of agenda-free, joy-driven creation",
    arguments: [],
  },
];

export function getPrompt(
  name: string,
  args: Record<string, string>
): { messages: Array<{ role: string; content: { type: string; text: string } }> } {
  switch (name) {
    case "worldbuild_session":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Let's create something in the Arcanea universe!${args.focus ? ` I want to focus on: ${args.focus}` : ""}${args.element ? ` with ${args.element} as the primary element.` : ""}

Please help me by:
1. Using the appropriate generator tool (generate_character, generate_location, generate_magic, generate_creature, or generate_artifact)
2. Explain how this creation fits into the Arcanea canon
3. Suggest connections to the Ten Gates and Guardians
4. Offer story hooks or ways to develop this creation further

Make the process feel magical and collaborative!`,
            },
          },
        ],
      };

    case "unblock_session":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I need help with a creative block.${args.block_type ? ` I think it might be related to ${args.block_type}.` : ""}${args.project_context ? ` I'm working on: ${args.project_context}` : ""}

Please help me:
1. Identify which Bestiary creature is attacking me using the diagnose_block tool
2. Understand why this particular creature has appeared
3. Get specific remedies and practices to overcome it
4. Find relevant wisdom from the Arcanea Library

Guide me through this as a compassionate mentor would.`,
            },
          },
        ],
      };

    case "gate_ritual":
      const gateNum = parseInt(args.gate_number) || 1;
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I want to practice opening Gate ${gateNum}.${args.time_available ? ` I have ${args.time_available} available.` : ""}

Please:
1. Use the identify_gate tool to explain what Gate ${gateNum} governs
2. Tell me about the Guardian who watches over this gate
3. Give me specific practices for opening this gate
4. Suggest a focused ritual I can do right now

Guide this as a sacred practice, not just an exercise.`,
            },
          },
        ],
      };

    case "luminor_dialogue":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I want to speak with ${args.luminor || "Valora"} the Luminor.${args.topic ? ` I want guidance on: ${args.topic}` : ""}

Please invoke this Luminor and have them:
1. Introduce themselves in their unique voice
2. Offer wisdom relevant to my situation
3. Suggest a practice I can try
4. Share an encouraging quote

Speak AS the Luminor, in their voice and style.`,
            },
          },
        ],
      };

    case "morning_clearing":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Guide me through the Morning Clearing practice from Arcanea.

This is the foundational daily practice. Please:
1. Help me settle into stillness
2. Ask me: "What do I truly want to create today?"
3. Help me distinguish between genuine creative desire and obligation
4. Set an intention for the day's creative work
5. Close with a blessing or affirmation

This should feel like a sacred moment of connection with my creative self.`,
            },
          },
        ],
      };

    case "creative_sabbath":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Help me plan and hold a Creative Sabbath—a day of agenda-free, joy-driven creation.

Please:
1. Explain the purpose of the Creative Sabbath from the Arcanea tradition
2. Help me set intentions (not goals) for the day
3. Suggest playful, low-pressure creative activities
4. Remind me of the rules: no judgment, no outcome focus, pure play
5. Create a loose structure that preserves spontaneity

The goal is to remember that creation is supposed to be joyful.`,
            },
          },
        ],
      };

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
}
