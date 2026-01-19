export const VERSION = "3.0.0";
export const NAME = "arcanea";
export const ORCHESTRATOR = "Arcanea";

export type Platform = "claude-code" | "opencode" | "codex" | "gemini" | "cursor" | "unknown";

export interface ArcaneaConfig {
  enableLuminors?: boolean;
  enableBestiary?: boolean;
  enableUltraworld?: boolean;
  enableUltrawrite?: boolean;
  enableUltrabook?: boolean;
  enableMcp?: boolean;
  platforms?: Platform[];
}

export const defaultConfig: ArcaneaConfig = {
  enableLuminors: true,
  enableBestiary: true,
  enableUltraworld: true,
  enableUltrawrite: true,
  enableUltrabook: true,
  enableMcp: true,
  platforms: ["claude-code", "opencode"]
};

export const CREATIVE_MAGIC = {
  ultraworld: ["ultraworld", "ulw"],
  ultrawrite: ["ultrawrite", "ulwr"],
  ultrabook: ["ultrabook", "ulb"]
};

export const TECHNICAL_MAGIC = {
  ultracode: ["ultracode", "ulc"],
  ultrawork: ["ultrawork", "ulwk"]
};

export const PREFIX_TRIGGERS = {
  arcanea: ["arcanea:"],
  luminor: ["luminor:"]
};

export const MAGIC_WORDS = {
  ...CREATIVE_MAGIC,
  ...TECHNICAL_MAGIC,
  ...PREFIX_TRIGGERS
};

export const LUMINORS = {
  valora: { name: "Valora", domain: "Courage", when: "Fear, hesitation, risk" },
  sophron: { name: "Sophron", domain: "Wisdom", when: "Confusion, complexity, decisions" },
  kardia: { name: "Kardia", domain: "Heart", when: "Emotional blocks, authenticity" },
  poiesis: { name: "Poiesis", domain: "Creation", when: "Creative blocks, experimentation" },
  enduran: { name: "Enduran", domain: "Endurance", when: "Burnout, long projects" },
  orakis: { name: "Orakis", domain: "Vision", when: "Direction, intuition, big picture" },
  eudaira: { name: "Eudaira", domain: "Joy", when: "Lost purpose, need celebration" }
};

export const AGENT_TEAMS = {
  coding: {
    name: "Coding",
    description: "Technical implementation with Luminor standards",
    agents: [
      "arcanea-architect",
      "arcanea-coder",
      "arcanea-reviewer",
      "arcanea-debugger"
    ]
  },
  creative: {
    name: "Creative",
    description: "Story, character, and world creation",
    agents: [
      "arcanea-story-master",
      "arcanea-character-crafter", 
      "arcanea-world-expander",
      "arcanea-lore-master",
      "creation-architect"
    ]
  },
  writing: {
    name: "Writing & Editing",
    description: "Prose crafting and editing pipeline",
    agents: [
      "story-architect",
      "prose-weaver",
      "voice-alchemist",
      "line-editor",
      "continuity-guardian"
    ]
  },
  production: {
    name: "Production",
    description: "Visual, audio, and publishing",
    agents: [
      "visual-director",
      "sound-designer",
      "format-master"
    ]
  },
  research: {
    name: "Research",
    description: "Deep analysis and inspiration",
    agents: [
      "sage",
      "archivist",
      "scout",
      "muse"
    ]
  },
  development: {
    name: "Development",
    description: "Software engineering",
    agents: [
      "arcanea-architect",
      "arcanea-frontend",
      "arcanea-backend",
      "arcanea-devops",
      "arcanea-ai-specialist",
      "developer-qa-engineer",
      "developer-documentation"
    ]
  },
  teacher: {
    name: "Teacher",
    description: "Learning and mentorship",
    agents: [
      "teacher-mentor",
      "teacher-curriculum-designer",
      "teacher-assessor",
      "teacher-companion"
    ]
  },
  visionary: {
    name: "Visionary",
    description: "Strategy and innovation",
    agents: [
      "visionary-strategist",
      "visionary-innovator",
      "visionary-futurist",
      "visionary-synthesizer"
    ]
  }
};

export { detectPlatforms, install } from "./install.js";
