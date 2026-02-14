// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Arcanea Statusline — ESM Module for Claude Code
// A living universe statusbar. Resilient: never crashes, always returns a string.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SYM = "\u27e1"; // ⟡
const SEP = "\u2502"; // │
const FALLBACK = `Arcanea ${SYM} Ready`;

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Read a file and return its trimmed content, or the fallback value.
 */
async function readSafe(path, fallback = "") {
  try {
    const content = await readFile(path, "utf-8");
    const trimmed = content.trim();
    return trimmed || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Read a JSON file and return parsed object, or null.
 */
async function readJsonSafe(path) {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Count files in a directory, or return 0.
 */
async function countFiles(dirPath) {
  try {
    if (!existsSync(dirPath)) return 0;
    const entries = await readdir(dirPath);
    return entries.length;
  } catch {
    return 0;
  }
}

/**
 * Format a token count into a human-readable string.
 * e.g. 1234 -> "1.2k", 1234567 -> "1.2M"
 */
function formatTokens(count) {
  if (typeof count !== "number" || count < 0) return null;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return `${count}`;
}

// ── Guardian-to-Element Mapping ─────────────────────────────────────────────

const GUARDIAN_ELEMENTS = {
  Lyssandria: "Earth",
  Leyla: "Water",
  Draconia: "Fire",
  Maylinn: "Earth",
  Alera: "Wind",
  Lyria: "Void",
  Aiyami: "Void",
  Elara: "Wind",
  Ino: "Water",
  Shinkami: "Void",
};

// ── Main ────────────────────────────────────────────────────────────────────

/**
 * Claude Code statusline entry point.
 * Returns a single-line branded status string.
 */
export default async function statusline() {
  try {
    // Run all I/O in parallel for speed
    const [guardian, gate, agentCount, tokenData, memory, swarmPid, element] =
      await Promise.all([
        readSafe("/tmp/arcanea-guardian", "Shinkami"),
        readSafe("/tmp/arcanea-gate"),
        countFiles("/tmp/arcanea-agents"),
        readJsonSafe("/tmp/arcanea-tokens.json"),
        readSafe("/tmp/arcanea-memory-usage"),
        readSafe("/tmp/arcanea-flow.pid"),
        readSafe("/tmp/arcanea-element"),
      ]);

    // ── Model ───────────────────────────────────────────────────────────
    const rawModel =
      process.env.ANTHROPIC_MODEL ||
      process.env.CLAUDE_MODEL ||
      "claude-opus-4-6";

    // Prettify model name
    let modelName = rawModel;
    if (rawModel.includes("opus")) modelName = "Claude Opus";
    else if (rawModel.includes("sonnet")) modelName = "Claude Sonnet";
    else if (rawModel.includes("haiku")) modelName = "Claude Haiku";

    // ── Tokens ──────────────────────────────────────────────────────────
    let tokenStr = null;
    if (tokenData && typeof tokenData === "object") {
      // Support multiple shapes: { total }, { input, output }, { tokens }
      const fromTotal = tokenData.total ?? tokenData.tokens ?? null;
      const fromParts =
        tokenData.input != null || tokenData.output != null
          ? (tokenData.input ?? 0) + (tokenData.output ?? 0)
          : null;
      const total = fromTotal ?? fromParts;
      tokenStr = total != null ? formatTokens(total) : null;
    }

    // ── Element ─────────────────────────────────────────────────────────
    const activeElement =
      element || GUARDIAN_ELEMENTS[guardian] || "Void";

    // ── Swarm ───────────────────────────────────────────────────────────
    const swarmActive = swarmPid.length > 0;

    // ── Assemble ────────────────────────────────────────────────────────
    const parts = [`Arcanea ${SYM} ${modelName}`];

    parts.push(`Guardian: ${guardian}`);

    if (gate) {
      parts.push(`Gate: ${gate}`);
    }

    if (agentCount > 0) {
      parts.push(`Agents: ${agentCount}`);
    }

    if (tokenStr) {
      parts.push(`Tokens: ${tokenStr}`);
    }

    if (memory) {
      parts.push(`Mem: ${memory}`);
    }

    if (swarmActive) {
      parts.push("Swarm: active");
    }

    parts.push(`\u2726 ${activeElement}`); // ✦ Element

    return parts.join(` ${SEP} `);
  } catch {
    // Absolute safety net — never crash
    return FALLBACK;
  }
}
