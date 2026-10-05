// Arcanea Memory Layer
// Inspired by mem0 and Qdrant patterns

import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { homedir } from "node:os";
import { dirname, isAbsolute, join } from "node:path";

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
const configuredDirectory = process.env.ARCANEA_STATE_DIR;
if (configuredDirectory !== undefined && !isAbsolute(configuredDirectory)) {
  throw new Error("ARCANEA_STATE_DIR must be an absolute directory path.");
}
const memoryFilePath = join(configuredDirectory ?? join(homedir(), ".arcanea"), "memories.json");
let persistedSessions = new Map<string, CreativeSession>();
let memoryLoadError: Error | undefined;

interface MemoryFile {
  version: 1;
  updatedAt: string;
  sessions: Record<string, CreativeSession>;
}

function ensureMemoryDirectory(): void {
  mkdirSync(dirname(memoryFilePath), { recursive: true, mode: 0o700 });
}

function validateSession(id: string, session: CreativeSession): void {
  if (!session || session.id !== id || typeof session.startedAt !== "string" ||
      Number.isNaN(Date.parse(session.startedAt)) || !Array.isArray(session.gatesExplored) ||
      !Array.isArray(session.luminorsConsulted) || !Array.isArray(session.creaturesEncountered) ||
      !Array.isArray(session.creations) || !session.preferences ||
      typeof session.preferences !== "object" || Array.isArray(session.preferences)) {
    throw new Error("Invalid creative session.");
  }
}

function loadSessions(): void {
  ensureMemoryDirectory();

  if (!existsSync(memoryFilePath)) {
    return;
  }

  try {
    const data = JSON.parse(readFileSync(memoryFilePath, "utf-8")) as Partial<MemoryFile>;
    if (data.version !== 1 || !data.sessions || typeof data.sessions !== "object" || Array.isArray(data.sessions)) {
      throw new Error("Unsupported memory file structure.");
    }
    const loaded = new Map<string, CreativeSession>();
    for (const [id, session] of Object.entries(data.sessions)) {
      validateSession(id, session);
      loaded.set(id, session);
    }
    for (const [id, session] of loaded) {
      sessions.set(id, session);
    }
    persistedSessions = structuredClone(sessions);
  } catch {
    // Keep diagnostics available, but never overwrite an unreadable user's file.
    memoryLoadError = new Error("Arcanea memory cannot be read. Preserve and repair memories.json before saving, then restart the server.");
  }
}

function saveSessions(): void {
  let temporaryPath: string | undefined;
  let descriptor: number | undefined;
  try {
    if (memoryLoadError) throw memoryLoadError;
    ensureMemoryDirectory();
    const candidate = structuredClone(sessions);
    for (const [id, session] of candidate) validateSession(id, session);
    const data: MemoryFile = {
      version: 1,
      updatedAt: new Date().toISOString(),
      sessions: Object.fromEntries(candidate),
    };
    // The existing file remains readable until a complete, flushed sibling replaces it.
    temporaryPath = `${memoryFilePath}.${randomUUID()}.tmp`;
    descriptor = openSync(temporaryPath, "wx", 0o600);
    writeFileSync(descriptor, JSON.stringify(data, null, 2), "utf-8");
    fsyncSync(descriptor);
    closeSync(descriptor);
    descriptor = undefined;
    for (let attempt = 0; ; attempt++) {
      try {
        renameSync(temporaryPath, memoryFilePath);
        break;
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (process.platform !== "win32" || attempt >= 5 || !["EPERM", "EACCES", "EBUSY"].includes(code ?? "")) throw error;
        // Windows readers/virus scanners can briefly prevent replacing an open file.
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10 * 2 ** attempt);
      }
    }
    temporaryPath = undefined;
    persistedSessions = candidate;
  } catch (error) {
    sessions.clear();
    for (const [id, session] of structuredClone(persistedSessions)) sessions.set(id, session);
    throw error;
  } finally {
    if (descriptor !== undefined) {
      try { closeSync(descriptor); } catch { /* preserve the save error */ }
    }
    if (temporaryPath !== undefined) {
      try { unlinkSync(temporaryPath); } catch { /* never delete another writer's file */ }
    }
  }
}

loadSessions();

export function getMemoryFilePath(): string {
  ensureMemoryDirectory();
  return memoryFilePath;
}

export function listSessions(): string[] {
  if (memoryLoadError) throw memoryLoadError;
  return [...sessions.keys()];
}

export function deleteSession(sessionId: string): boolean {
  if (memoryLoadError) throw memoryLoadError;
  const deleted = sessions.delete(sessionId);
  if (deleted) {
    saveSessions();
  }
  return deleted;
}

export function getOrCreateSession(sessionId: string): CreativeSession {
  if (memoryLoadError) throw memoryLoadError;
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
