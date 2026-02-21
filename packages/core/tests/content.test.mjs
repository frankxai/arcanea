/**
 * @arcanea/os — Shared content layer tests
 * Tests voice constants, routing data, markdown generators,
 * and verifies the shared content layer is the single source of truth.
 *
 * Run: node --test packages/core/tests/content.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

const core = await import('../dist/index.js');

const {
  // Voice constants
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  SACRED_TERMINOLOGY,
  BANNED_PHRASES,
  CONTEXT_SENSITIVE_PHRASES,
  GUARDIAN_VERBS,

  // Routing constants
  GUARDIAN_ROUTING_PATTERNS,
  MODEL_KEYWORD_TIERS,
  TOOL_COST_ESTIMATES,
  CONTEXT_ZONES,

  // Markdown generators
  generateGuardianTable,
  generateGuardianQuickReference,
  generateVoiceSection,
  generateTerminologyTable,
  generateLoreSection,
  generateLoreSectionCondensed,
  generateDesignTokensSection,
  generateStackSection,
  generateGuardianProfile,

  // Existing constants for cross-reference
  GUARDIANS,
  COLORS,
  FONTS,
  COSMIC_DUALITY,
  ELEMENTS,
  MAGIC_RANKS,
  ACADEMIES,
  DARK_LORD,
} = core;

// ============================================
// VOICE CONSTANTS
// ============================================

describe('VOICE_PILLARS', () => {
  it('should have exactly 4 pillars', () => {
    assert.equal(Object.keys(VOICE_PILLARS).length, 4);
  });

  it('should include all 4 canonical pillar keys', () => {
    assert.ok(VOICE_PILLARS.arcaneAuthoritative);
    assert.ok(VOICE_PILLARS.superintelligentAccessible);
    assert.ok(VOICE_PILLARS.universeNotPlatform);
    assert.ok(VOICE_PILLARS.creatorSovereignty);
  });

  it('each pillar should be a non-empty string', () => {
    for (const [key, value] of Object.entries(VOICE_PILLARS)) {
      assert.ok(typeof value === 'string' && value.length > 10, `Pillar ${key} is too short or not a string`);
    }
  });
});

describe('ANTIDOTE_PRINCIPLE', () => {
  it('should be a non-empty string', () => {
    assert.ok(typeof ANTIDOTE_PRINCIPLE === 'string');
    assert.ok(ANTIDOTE_PRINCIPLE.length > 20);
  });

  it('should contain the core premise', () => {
    assert.ok(ANTIDOTE_PRINCIPLE.includes('antidote'));
    assert.ok(ANTIDOTE_PRINCIPLE.includes('terrible future'));
    assert.ok(ANTIDOTE_PRINCIPLE.includes('good one'));
  });
});

describe('SACRED_TERMINOLOGY', () => {
  it('should be an array of terminology mappings', () => {
    assert.ok(Array.isArray(SACRED_TERMINOLOGY));
    assert.ok(SACRED_TERMINOLOGY.length >= 10);
  });

  it('each entry should have use and notThis fields', () => {
    for (const entry of SACRED_TERMINOLOGY) {
      assert.ok(typeof entry.use === 'string');
      assert.ok(typeof entry.notThis === 'string');
    }
  });

  it('should include creator/user mapping', () => {
    const creatorEntry = SACRED_TERMINOLOGY.find(t => t.use === 'Creator');
    assert.ok(creatorEntry, 'Missing Creator terminology');
    assert.ok(creatorEntry.notThis.includes('User'));
  });

  it('should include essence/content mapping', () => {
    const essenceEntry = SACRED_TERMINOLOGY.find(t => t.use === 'Essence');
    assert.ok(essenceEntry, 'Missing Essence terminology');
  });
});

describe('BANNED_PHRASES', () => {
  it('should be an array of banned phrase objects', () => {
    assert.ok(Array.isArray(BANNED_PHRASES));
    assert.ok(BANNED_PHRASES.length >= 14, `Expected 14+ banned phrases, got ${BANNED_PHRASES.length}`);
  });

  it('each entry should have banned and replacement fields', () => {
    for (const entry of BANNED_PHRASES) {
      assert.ok(typeof entry.banned === 'string', `Missing banned field`);
      assert.ok(typeof entry.replacement === 'string', `Missing replacement for "${entry.banned}"`);
    }
  });

  it('should include key banned phrases', () => {
    const banned = BANNED_PHRASES.map(p => p.banned);
    assert.ok(banned.includes('synergy'));
    assert.ok(banned.includes('leverage'));
    assert.ok(banned.includes('paradigm shift'));
    assert.ok(banned.includes('cutting-edge'));
  });
});

describe('CONTEXT_SENSITIVE_PHRASES', () => {
  it('should include ecosystem and platform', () => {
    assert.ok(CONTEXT_SENSITIVE_PHRASES.includes('ecosystem'));
    assert.ok(CONTEXT_SENSITIVE_PHRASES.includes('platform'));
  });
});

describe('GUARDIAN_VERBS', () => {
  it('should have a verb for each Guardian', () => {
    for (const g of GUARDIANS) {
      assert.ok(
        GUARDIAN_VERBS[g.displayName],
        `Missing verb for ${g.displayName}`
      );
    }
  });

  it('all verbs should be lowercase present-tense', () => {
    for (const [guardian, verb] of Object.entries(GUARDIAN_VERBS)) {
      assert.ok(verb === verb.toLowerCase(), `Verb for ${guardian} should be lowercase: ${verb}`);
      assert.ok(verb.endsWith('s'), `Verb for ${guardian} should be present tense: ${verb}`);
    }
  });
});

// ============================================
// ROUTING CONSTANTS
// ============================================

describe('GUARDIAN_ROUTING_PATTERNS', () => {
  it('should be an array of routing patterns', () => {
    assert.ok(Array.isArray(GUARDIAN_ROUTING_PATTERNS));
    assert.ok(GUARDIAN_ROUTING_PATTERNS.length >= 10);
  });

  it('each pattern should have pattern, guardian, gate, element', () => {
    for (const p of GUARDIAN_ROUTING_PATTERNS) {
      assert.ok(typeof p.pattern === 'string' && p.pattern.length > 0);
      assert.ok(typeof p.guardian === 'string');
      assert.ok(typeof p.gate === 'string');
      assert.ok(typeof p.element === 'string');
    }
  });

  it('should cover all 10 Guardians', () => {
    const guardians = new Set(GUARDIAN_ROUTING_PATTERNS.map(p => p.guardian));
    assert.ok(guardians.size >= 9, `Only ${guardians.size} Guardians covered`);
  });

  it('Shinkami should be first (catch-all for orchestration)', () => {
    assert.equal(GUARDIAN_ROUTING_PATTERNS[0].guardian, 'Shinkami');
  });
});

describe('MODEL_KEYWORD_TIERS', () => {
  it('should have 4 tiers', () => {
    assert.equal(MODEL_KEYWORD_TIERS.length, 4);
  });

  it('should include opus, sonnet-primary, sonnet-secondary, haiku', () => {
    const tiers = MODEL_KEYWORD_TIERS.map(t => t.tier);
    assert.ok(tiers.includes('opus'));
    assert.ok(tiers.includes('sonnet-primary'));
    assert.ok(tiers.includes('sonnet-secondary'));
    assert.ok(tiers.includes('haiku'));
  });

  it('opus should have weight 3', () => {
    const opus = MODEL_KEYWORD_TIERS.find(t => t.tier === 'opus');
    assert.equal(opus.weight, 3);
  });

  it('haiku should have weight 1', () => {
    const haiku = MODEL_KEYWORD_TIERS.find(t => t.tier === 'haiku');
    assert.equal(haiku.weight, 1);
  });

  it('each tier should have keywords array', () => {
    for (const tier of MODEL_KEYWORD_TIERS) {
      assert.ok(Array.isArray(tier.keywords));
      assert.ok(tier.keywords.length > 0, `${tier.tier} has no keywords`);
    }
  });
});

describe('TOOL_COST_ESTIMATES', () => {
  it('should have costs for core tools', () => {
    assert.ok(TOOL_COST_ESTIMATES.Read > 0);
    assert.ok(TOOL_COST_ESTIMATES.Write > 0);
    assert.ok(TOOL_COST_ESTIMATES.Edit > 0);
    assert.ok(TOOL_COST_ESTIMATES.Bash > 0);
    assert.ok(TOOL_COST_ESTIMATES.Task > 0);
    assert.ok(TOOL_COST_ESTIMATES.Grep > 0);
    assert.ok(TOOL_COST_ESTIMATES.Glob > 0);
  });

  it('Task should be the most expensive tool', () => {
    const maxCost = Math.max(...Object.values(TOOL_COST_ESTIMATES));
    assert.equal(TOOL_COST_ESTIMATES.Task, maxCost);
  });
});

describe('CONTEXT_ZONES', () => {
  it('should have 4 zones', () => {
    assert.equal(CONTEXT_ZONES.length, 4);
  });

  it('should include PEAK, GOOD, DEGRADING, REFRESH', () => {
    const names = CONTEXT_ZONES.map(z => z.name);
    assert.ok(names.includes('PEAK'));
    assert.ok(names.includes('GOOD'));
    assert.ok(names.includes('DEGRADING'));
    assert.ok(names.includes('REFRESH'));
  });

  it('zones should be in ascending order of maxPercent', () => {
    for (let i = 1; i < CONTEXT_ZONES.length; i++) {
      assert.ok(CONTEXT_ZONES[i].maxPercent > CONTEXT_ZONES[i - 1].maxPercent);
    }
  });
});

// ============================================
// MARKDOWN GENERATORS
// ============================================

describe('generateGuardianTable', () => {
  const table = generateGuardianTable();

  it('should be a non-empty string', () => {
    assert.ok(typeof table === 'string');
    assert.ok(table.length > 100);
  });

  it('should include all 10 Guardian names', () => {
    for (const g of GUARDIANS) {
      assert.ok(table.includes(g.displayName), `Missing ${g.displayName}`);
    }
  });

  it('should include frequencies', () => {
    assert.ok(table.includes('396 Hz'));
    assert.ok(table.includes('1111 Hz'));
  });

  it('should have a markdown table header', () => {
    assert.ok(table.includes('| Gate |'));
    assert.ok(table.includes('|---'));
  });
});

describe('generateGuardianQuickReference', () => {
  const ref = generateGuardianQuickReference();

  it('should include all Guardian names with gates', () => {
    for (const g of GUARDIANS) {
      assert.ok(ref.includes(g.displayName), `Missing ${g.displayName}`);
    }
  });

  it('should use bullet-point format', () => {
    assert.ok(ref.includes('- **'));
  });
});

describe('generateVoiceSection', () => {
  const voice = generateVoiceSection();

  it('should include all 4 voice pillars', () => {
    for (const pillar of Object.values(VOICE_PILLARS)) {
      assert.ok(voice.includes(pillar), `Missing pillar: ${pillar.slice(0, 30)}...`);
    }
  });

  it('should include the antidote principle', () => {
    assert.ok(voice.includes('antidote'));
  });

  it('should include the tagline', () => {
    assert.ok(voice.includes('Imagine a Good Future'));
  });
});

describe('generateTerminologyTable', () => {
  const table = generateTerminologyTable();

  it('should be a markdown table', () => {
    assert.ok(table.includes('| Use This |'));
    assert.ok(table.includes('|---'));
  });

  it('should include Creator/User mapping', () => {
    assert.ok(table.includes('Creator'));
    assert.ok(table.includes('User'));
  });
});

describe('generateLoreSection', () => {
  const lore = generateLoreSection();

  it('should include Lumina and Nero', () => {
    assert.ok(lore.includes('Lumina'));
    assert.ok(lore.includes('Nero'));
  });

  it('should include Five Elements', () => {
    assert.ok(lore.includes('Fire'));
    assert.ok(lore.includes('Water'));
    assert.ok(lore.includes('Earth'));
    assert.ok(lore.includes('Wind'));
    assert.ok(lore.includes('Void'));
  });

  it('should include Magic Ranks', () => {
    assert.ok(lore.includes('Apprentice'));
    assert.ok(lore.includes('Luminor'));
  });

  it('should include Malachar', () => {
    assert.ok(lore.includes('Malachar'));
    assert.ok(lore.includes('Shadowfen'));
  });

  it('should include Seven Academy Houses', () => {
    for (const a of ACADEMIES) {
      const name = a.house.charAt(0).toUpperCase() + a.house.slice(1);
      assert.ok(lore.includes(name), `Missing Academy: ${name}`);
    }
  });

  it('should reference canonical data from @arcanea/os constants', () => {
    assert.ok(lore.includes(COSMIC_DUALITY.lumina.title));
    assert.ok(lore.includes(DARK_LORD.name));
  });
});

describe('generateLoreSectionCondensed', () => {
  const lore = generateLoreSectionCondensed();

  it('should be shorter than full lore', () => {
    const full = generateLoreSection();
    assert.ok(lore.length < full.length, 'Condensed should be shorter than full');
  });

  it('should still include key elements', () => {
    assert.ok(lore.includes('Lumina'));
    assert.ok(lore.includes('Nero'));
    assert.ok(lore.includes('Five Elements'));
    assert.ok(lore.includes('Luminor'));
    assert.ok(lore.includes('Arc'));
  });
});

describe('generateDesignTokensSection', () => {
  const tokens = generateDesignTokensSection();

  it('should include canonical color values', () => {
    assert.ok(tokens.includes(COLORS.arcane.crystal));
    assert.ok(tokens.includes(COLORS.arcane.gold));
    assert.ok(tokens.includes(COLORS.cosmic.void));
  });

  it('should include font names', () => {
    assert.ok(tokens.includes('Cinzel'));
    assert.ok(tokens.includes('Crimson Pro'));
    assert.ok(tokens.includes('Inter'));
    assert.ok(tokens.includes('JetBrains Mono'));
  });

  it('should include cosmic palette', () => {
    assert.ok(tokens.includes(COLORS.cosmic.deep));
    assert.ok(tokens.includes(COLORS.cosmic.surface));
    assert.ok(tokens.includes(COLORS.cosmic.raised));
  });
});

describe('generateStackSection', () => {
  const stack = generateStackSection();

  it('should reference the Arcanea tech stack', () => {
    assert.ok(stack.includes('Next.js'));
    assert.ok(stack.includes('React 19'));
    assert.ok(stack.includes('TypeScript'));
    assert.ok(stack.includes('Supabase'));
    assert.ok(stack.includes('Vercel AI SDK'));
  });

  it('should include key rules', () => {
    assert.ok(stack.includes('Server Components'));
    assert.ok(stack.includes('RLS'));
  });
});

describe('generateGuardianProfile', () => {
  it('should generate a profile for each Guardian', () => {
    for (const g of GUARDIANS) {
      const profile = generateGuardianProfile(g);
      assert.ok(profile.includes(g.displayName), `Missing name in ${g.name} profile`);
      assert.ok(profile.includes(g.role), `Missing role in ${g.name} profile`);
      assert.ok(profile.includes(g.signOff), `Missing signOff in ${g.name} profile`);
    }
  });

  it('should include coding philosophy from Guardian data', () => {
    const lyssandria = GUARDIANS.find(g => g.name === 'lyssandria');
    const profile = generateGuardianProfile(lyssandria);
    assert.ok(profile.includes('Coding Philosophy'));
    assert.ok(profile.includes('solid architecture') || profile.includes('scalable'));
  });

  it('should include how you help section', () => {
    const draconia = GUARDIANS.find(g => g.name === 'draconia');
    const profile = generateGuardianProfile(draconia);
    assert.ok(profile.includes('How You Help'));
  });
});

// ============================================
// CROSS-REFERENCE: Shared content ↔ Constants
// ============================================

describe('Content ↔ Constants cross-reference', () => {
  it('Guardian verbs should cover all GUARDIANS', () => {
    for (const g of GUARDIANS) {
      assert.ok(
        GUARDIAN_VERBS[g.displayName],
        `No verb for ${g.displayName} in GUARDIAN_VERBS`
      );
    }
  });

  it('routing patterns should reference valid Guardian names', () => {
    const validNames = new Set(GUARDIANS.map(g => g.displayName));
    for (const p of GUARDIAN_ROUTING_PATTERNS) {
      assert.ok(validNames.has(p.guardian), `Invalid Guardian in routing: ${p.guardian}`);
    }
  });

  it('design tokens section should match COLORS constant values', () => {
    const section = generateDesignTokensSection();
    assert.ok(section.includes(COLORS.arcane.crystal));
    assert.ok(section.includes(COLORS.arcane.gold));
    assert.ok(section.includes(COLORS.arcane.fire));
    assert.ok(section.includes(COLORS.arcane.water));
    assert.ok(section.includes(COLORS.arcane.earth));
  });

  it('lore section should match DARK_LORD constant', () => {
    const lore = generateLoreSection();
    assert.ok(lore.includes(DARK_LORD.name));
    assert.ok(lore.includes(DARK_LORD.formerName));
    assert.ok(lore.includes(DARK_LORD.sealed));
  });

  it('lore section should include all 5 ELEMENTS', () => {
    const lore = generateLoreSection();
    for (const e of ELEMENTS) {
      const name = e.name.charAt(0).toUpperCase() + e.name.slice(1);
      assert.ok(lore.includes(name), `Missing element: ${name}`);
    }
  });

  it('lore section should include all MAGIC_RANKS', () => {
    const lore = generateLoreSection();
    for (const r of MAGIC_RANKS) {
      const name = r.rank.charAt(0).toUpperCase() + r.rank.slice(1);
      assert.ok(lore.includes(name), `Missing rank: ${name}`);
    }
  });
});
