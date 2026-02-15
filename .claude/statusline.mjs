// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Arcanea Statusline v2.1 — Living Universe Display
// Shows world, guardian+godbeast, gate+frequency, realm, team, element
// Works as both: `node statusline.mjs` (command) and ESM import
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { readFile } from "node:fs/promises";

const SYM = "\u27e1"; // ⟡
const SEP = "\u2502"; // │
const STAR = "\u2726"; // ✦
const BOND = "\u00b7"; // ·
const FALLBACK = `Arcanea ${SYM} Ready`;

// ── Read helpers ─────────────────────────────────────────────────────────────

async function readSafe(path, fallback = "") {
  try {
    const content = await readFile(path, "utf-8");
    const trimmed = content.trim();
    return trimmed || fallback;
  } catch {
    return fallback;
  }
}

async function readJsonSafe(path) {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// ── Canonical Guardian Data ──────────────────────────────────────────────────

const GUARDIANS = {
  Lyssandria: { gate: "Foundation", freq: "396Hz", godbeast: "Kaelith", element: "Earth", team: "Foundation Forge" },
  Leyla:      { gate: "Flow",       freq: "417Hz", godbeast: "Veloura", element: "Water", team: "Flow Weavers" },
  Draconia:   { gate: "Fire",       freq: "528Hz", godbeast: "Draconis", element: "Fire", team: "Fire Brigade" },
  Maylinn:    { gate: "Heart",      freq: "639Hz", godbeast: "Laeylinn", element: "Earth", team: "Heart Circle" },
  Alera:      { gate: "Voice",      freq: "741Hz", godbeast: "Otome", element: "Wind", team: "Voice Court" },
  Lyria:      { gate: "Sight",      freq: "852Hz", godbeast: "Yumiko", element: "Void", team: "Sight Council" },
  Aiyami:     { gate: "Crown",      freq: "963Hz", godbeast: "Sol", element: "Void", team: "Crown Assembly" },
  Elara:      { gate: "Shift",      freq: "1111Hz", godbeast: "Thessara", element: "Wind", team: "Shift Engineers" },
  Ino:        { gate: "Unity",      freq: "963Hz", godbeast: "Kyuro", element: "Water", team: "Unity Bridge" },
  Shinkami:   { gate: "Source",      freq: "1111Hz", godbeast: "Amaterasu", element: "Void", team: "Source Council" },
};

// ── Main ────────────────────────────────────────────────────────────────────

async function statusline() {
  try {
    const [guardian, realm, team, focus, tokenData] = await Promise.all([
      readSafe("/tmp/arcanea-guardian", "Shinkami"),
      readSafe("/tmp/arcanea-realm", ""),
      readSafe("/tmp/arcanea-team", ""),
      readSafe("/tmp/arcanea-focus", ""),
      readJsonSafe("/tmp/arcanea-tokens.json"),
    ]);

    // ── Model ─────────────────────────────────────────────────────────────
    const rawModel =
      process.env.ANTHROPIC_MODEL ||
      process.env.CLAUDE_MODEL ||
      "claude-opus-4-6";

    let modelName = rawModel;
    if (rawModel.includes("opus")) modelName = "Opus";
    else if (rawModel.includes("sonnet")) modelName = "Sonnet";
    else if (rawModel.includes("haiku")) modelName = "Haiku";

    // ── Guardian data ─────────────────────────────────────────────────────
    const g = GUARDIANS[guardian] || GUARDIANS.Shinkami;

    // ── Tokens ────────────────────────────────────────────────────────────
    let tokenStr = null;
    if (tokenData && typeof tokenData === "object") {
      const fromTotal = tokenData.total ?? tokenData.tokens ?? null;
      const fromParts =
        (tokenData.input != null || tokenData.output != null)
          ? (tokenData.input ?? 0) + (tokenData.output ?? 0)
          : null;
      const total = fromTotal ?? fromParts;
      if (total != null && total > 0) {
        if (total >= 1_000_000) tokenStr = `${(total / 1_000_000).toFixed(1)}M`;
        else if (total >= 1_000) tokenStr = `${(total / 1_000).toFixed(1)}k`;
        else tokenStr = `${total}`;
      }
    }

    // ── Active team ───────────────────────────────────────────────────────
    const activeTeam = team || g.team;

    // ── Assemble ──────────────────────────────────────────────────────────
    const parts = [`Arcanea ${SYM} ${modelName}`];

    // Guardian + Godbeast bond
    parts.push(`${guardian}${BOND}${g.godbeast}`);

    // Gate + Frequency
    parts.push(`${g.gate} ${g.freq}`);

    // Realm (world location)
    if (realm) {
      parts.push(realm);
    }

    // Active team
    if (activeTeam) {
      parts.push(activeTeam);
    }

    // Focus entity (character/object)
    if (focus) {
      parts.push(focus);
    }

    // Token count
    if (tokenStr) {
      parts.push(`${tokenStr}`);
    }

    // Element sigil
    parts.push(`${STAR} ${g.element}`);

    return parts.join(` ${SEP} `);
  } catch {
    return FALLBACK;
  }
}

// ── Export for ESM import ────────────────────────────────────────────────────
export default statusline;

// ── Self-invoke for command mode (`node statusline.mjs`) ─────────────────────
statusline().then(s => process.stdout.write(s));
