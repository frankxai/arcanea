// Arcanea Memory Layer
// Persistent JSON file storage at ~/.arcanea/memories.json
// Survives process restarts — no external database dependencies

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// === Types ===

export interface CreativeSession {
  id: string;
  startedAt: string; // ISO string for JSON serialization
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
  createdAt: string; // ISO string for JSON serialization
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

// === Persistence Layer ===

const ARCANEA_DIR = join(homedir(), ".arcanea");
const MEMORIES_FILE = join(ARCANEA_DIR, "memories.json");

interface PersistedData {
  version: 1;
  updatedAt: string;
  sessions: Record<string, CreativeSession>;
}

function ensureDir(): void {
  if (!existsSync(ARCANEA_DIR)) {
    mkdirSync(ARCANEA_DIR, { recursive: true });
  }
}

function loadFromDisk(): Record<string, CreativeSession> {
  try {
    if (existsSync(MEMORIES_FILE)) {
      const raw = readFileSync(MEMORIES_FILE, "utf-8");
      const data: PersistedData = JSON.parse(raw);
      if (data.version === 1 && data.sessions) {
        return data.sessions;
      }
    }
  } catch {
    // Corrupted file or parse error — start fresh, don't crash
  }
  return {};
}

function saveToDisk(): void {
  try {
    ensureDir();
    const data: PersistedData = {
      version: 1,
      updatedAt: new Date().toISOString(),
      sessions,
    };
    writeFileSync(MEMORIES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Best-effort persistence — don't crash the MCP server on write failure
  }
}

// === In-Memory Cache (hydrated from disk on module load) ===

const sessions: Record<string, CreativeSession> = loadFromDisk();

// === Public API ===

export function getOrCreateSession(sessionId: string): CreativeSession {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      id: sessionId,
      startedAt: new Date().toISOString(),
      gatesExplored: [],
      luminorsConsulted: [],
      creaturesEncountered: [],
      creations: [],
      preferences: {},
    };
    saveToDisk();
  }
  return sessions[sessionId];
}

export function updateSession(sessionId: string, updates: Partial<CreativeSession>): void {
  const session = getOrCreateSession(sessionId);
  Object.assign(session, updates);
  saveToDisk();
}

export function recordGateExplored(sessionId: string, gate: number): void {
  const session = getOrCreateSession(sessionId);
  if (!session.gatesExplored.includes(gate)) {
    session.gatesExplored.push(gate);
    saveToDisk();
  }
}

export function recordLuminorConsulted(sessionId: string, luminor: string): void {
  const session = getOrCreateSession(sessionId);
  if (!session.luminorsConsulted.includes(luminor)) {
    session.luminorsConsulted.push(luminor);
    saveToDisk();
  }
}

export function recordCreatureEncountered(sessionId: string, creature: string): void {
  const session = getOrCreateSession(sessionId);
  if (!session.creaturesEncountered.includes(creature)) {
    session.creaturesEncountered.push(creature);
    saveToDisk();
  }
}

export function recordCreation(sessionId: string, creation: CreationRef): void {
  const session = getOrCreateSession(sessionId);
  session.creations.push(creation);
  saveToDisk();
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

/**
 * List all session IDs that have been persisted.
 */
export function listSessions(): string[] {
  return Object.keys(sessions);
}

/**
 * Delete a session from memory and disk.
 * Returns true if the session existed and was deleted.
 */
export function deleteSession(sessionId: string): boolean {
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    saveToDisk();
    return true;
  }
  return false;
}

/**
 * Get the path to the persistence file (for diagnostics).
 */
export function getMemoryFilePath(): string {
  return MEMORIES_FILE;
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
