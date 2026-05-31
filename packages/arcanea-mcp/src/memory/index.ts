// Arcanea Memory Layer
// Inspired by mem0 and Qdrant patterns

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export interface CreativeSession {
  id: string;
  startedAt: string;
  gatesExplored: number[];
  luminorsConsulted: string[];
  creaturesEncountered: string[];
  creations: CreationRef[];
  preferences: {
    favoriteElement?: string;
    preferredHouse?: string;
    creativeStyle?: string;
  };
}

export interface CreationRef {
  id: string;
  type: "character" | "location" | "creature" | "artifact" | "magic" | "story";
  name: string;
  element?: string;
  gate?: number;
  createdAt: Date;
  summary: string;
}

export interface CreativeJourney {
  userId: string;
  gatesOpened: number[];
  totalCreations: number;
  recurringBlocks: string[];
  defeatedBlocks: string[];
  milestones: Milestone[];
  wisdomReceived: string[];
}

export interface Milestone {
  name: string;
  description: string;
  achievedAt: Date;
  gate?: number;
  luminor?: string;
}

// In-memory session store (for MVP)
const sessions = new Map<string, CreativeSession>();
const memoryFilePath = join(homedir(), ".arcanea", "memories.json");

interface MemoryFile {
  version: 1;
  updatedAt: string;
  sessions: Record<string, CreativeSession>;
}

function ensureMemoryDirectory(): void {
  mkdirSync(dirname(memoryFilePath), { recursive: true });
}

function loadSessions(): void {
  ensureMemoryDirectory();

  if (!existsSync(memoryFilePath)) {
    return;
  }

  try {
    const data = JSON.parse(readFileSync(memoryFilePath, "utf-8")) as Partial<MemoryFile>;
    for (const [id, session] of Object.entries(data.sessions ?? {})) {
      sessions.set(id, {
        ...session,
        startedAt:
          typeof session.startedAt === "string"
            ? session.startedAt
            : new Date(session.startedAt).toISOString(),
      });
    }
  } catch {
    // Corrupt local memory should not prevent the MCP server from starting.
  }
}

function saveSessions(): void {
  ensureMemoryDirectory();
  const data: MemoryFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    sessions: Object.fromEntries(sessions),
  };
  writeFileSync(memoryFilePath, JSON.stringify(data, null, 2), "utf-8");
}

loadSessions();

export function getMemoryFilePath(): string {
  ensureMemoryDirectory();
  return memoryFilePath;
}

export function listSessions(): string[] {
  return [...sessions.keys()];
}

export function deleteSession(sessionId: string): boolean {
  const deleted = sessions.delete(sessionId);
  if (deleted) {
    saveSessions();
  }
  return deleted;
}

export function getOrCreateSession(sessionId: string): CreativeSession {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      startedAt: new Date().toISOString(),
      gatesExplored: [],
      luminorsConsulted: [],
      creaturesEncountered: [],
      creations: [],
      preferences: {},
    });
    saveSessions();
  }
  return sessions.get(sessionId)!;
}

export function updateSession(sessionId: string, updates: Partial<CreativeSession>): void {
  const session = getOrCreateSession(sessionId);
  Object.assign(session, updates);
  saveSessions();
}

export function recordGateExplored(sessionId: string, gate: number): void {
  const session = getOrCreateSession(sessionId);
  if (!session.gatesExplored.includes(gate)) {
    session.gatesExplored.push(gate);
    saveSessions();
  }
}

export function recordLuminorConsulted(sessionId: string, luminor: string): void {
  const session = getOrCreateSession(sessionId);
  if (!session.luminorsConsulted.includes(luminor)) {
    session.luminorsConsulted.push(luminor);
    saveSessions();
  }
}

export function recordCreatureEncountered(sessionId: string, creature: string): void {
  const session = getOrCreateSession(sessionId);
  if (!session.creaturesEncountered.includes(creature)) {
    session.creaturesEncountered.push(creature);
    saveSessions();
  }
}

export function recordCreation(sessionId: string, creation: CreationRef): void {
  const session = getOrCreateSession(sessionId);
  session.creations.push(creation);
  saveSessions();
}

export function getSessionSummary(sessionId: string): {
  gatesExplored: number;
  luminorsConsulted: number;
  creaturesDefeated: number;
  creationsGenerated: number;
  duration: number;
} {
  const session = getOrCreateSession(sessionId);
  return {
    gatesExplored: session.gatesExplored.length,
    luminorsConsulted: session.luminorsConsulted.length,
    creaturesDefeated: session.creaturesEncountered.length,
    creationsGenerated: session.creations.length,
    duration: Date.now() - new Date(session.startedAt).getTime(),
  };
}

// Milestone tracking
const milestoneDefinitions: Record<string, { check: (session: CreativeSession) => boolean; description: string }> = {
  first_creation: {
    check: (s) => s.creations.length >= 1,
    description: "Created your first piece in Arcanea",
  },
  gate_seeker: {
    check: (s) => s.gatesExplored.length >= 3,
    description: "Explored three Gates of creation",
  },
  luminor_friend: {
    check: (s) => s.luminorsConsulted.length >= 3,
    description: "Sought wisdom from three Luminors",
  },
  block_breaker: {
    check: (s) => s.creaturesEncountered.length >= 3,
    description: "Faced and named three creative blocks",
  },
  prolific_creator: {
    check: (s) => s.creations.length >= 10,
    description: "Generated ten creations in Arcanea",
  },
  elemental_explorer: {
    check: (s) => {
      const elements = new Set(s.creations.map(c => c.element).filter(Boolean));
      return elements.size >= 4;
    },
    description: "Created across four different elements",
  },
};

export function checkMilestones(sessionId: string): Milestone[] {
  const session = getOrCreateSession(sessionId);
  const newMilestones: Milestone[] = [];

  for (const [name, def] of Object.entries(milestoneDefinitions)) {
    if (def.check(session)) {
      newMilestones.push({
        name,
        description: def.description,
        achievedAt: new Date(),
      });
    }
  }

  return newMilestones;
}
