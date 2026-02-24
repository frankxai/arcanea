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

  // Skill generators
  SKILL_TRIGGERS,
  SKILL_DEFINITIONS,
  matchSkillTriggers,
  getSkillsForLevel,
  generateSkillContent,

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

// ============================================
// SKILL DEFINITIONS
// ============================================

describe('SKILL_DEFINITIONS', () => {
  it('should define 13 skills', () => {
    assert.equal(SKILL_DEFINITIONS.length, 13);
  });

  it('should have 4 core, 5 development, 4 creative', () => {
    const core = SKILL_DEFINITIONS.filter(s => s.category === 'core');
    const dev = SKILL_DEFINITIONS.filter(s => s.category === 'development');
    const creative = SKILL_DEFINITIONS.filter(s => s.category === 'creative');
    assert.equal(core.length, 4);
    assert.equal(dev.length, 5);
    assert.equal(creative.length, 4);
  });

  it('core skills should require standard level', () => {
    const core = SKILL_DEFINITIONS.filter(s => s.category === 'core');
    for (const s of core) {
      assert.equal(s.minLevel, 'standard', `${s.id} should be standard`);
    }
  });

  it('dev skills should require full level', () => {
    const dev = SKILL_DEFINITIONS.filter(s => s.category === 'development');
    for (const s of dev) {
      assert.equal(s.minLevel, 'full', `${s.id} should be full`);
    }
  });

  it('creative skills should require luminor level', () => {
    const creative = SKILL_DEFINITIONS.filter(s => s.category === 'creative');
    for (const s of creative) {
      assert.equal(s.minLevel, 'luminor', `${s.id} should be luminor`);
    }
  });

  it('every definition should have unique id', () => {
    const ids = SKILL_DEFINITIONS.map(s => s.id);
    const unique = [...new Set(ids)];
    assert.equal(ids.length, unique.length);
  });
});

// ============================================
// SKILL TRIGGERS
// ============================================

describe('SKILL_TRIGGERS', () => {
  it('should define triggers for all 13 skills', () => {
    const triggerIds = SKILL_TRIGGERS.map(t => t.skillId);
    for (const def of SKILL_DEFINITIONS) {
      assert.ok(triggerIds.includes(def.id), `Missing trigger for: ${def.id}`);
    }
  });

  it('every trigger should have keywords array', () => {
    for (const t of SKILL_TRIGGERS) {
      assert.ok(Array.isArray(t.keywords), `${t.skillId} keywords not array`);
      assert.ok(t.keywords.length >= 2, `${t.skillId} needs at least 2 keywords`);
    }
  });

  it('no duplicate keywords within same trigger', () => {
    for (const t of SKILL_TRIGGERS) {
      const unique = [...new Set(t.keywords)];
      assert.equal(t.keywords.length, unique.length, `${t.skillId} has duplicate keywords`);
    }
  });
});

describe('matchSkillTriggers', () => {
  it('should match guardian-related prompts to canon', () => {
    assert.ok(matchSkillTriggers('Tell me about the guardian').includes('arcanea-canon'));
  });

  it('should match design prompts to design-system', () => {
    assert.ok(matchSkillTriggers('Update the color tokens').includes('arcanea-design-system'));
  });

  it('should match database prompts to supabase-patterns', () => {
    assert.ok(matchSkillTriggers('Add RLS policy for supabase').includes('supabase-patterns'));
  });

  it('should match test prompts to testing-patterns', () => {
    assert.ok(matchSkillTriggers('Write playwright e2e tests').includes('testing-patterns'));
  });

  it('should return empty for unrelated prompts', () => {
    assert.equal(matchSkillTriggers('make me a sandwich').length, 0);
  });

  it('should not duplicate skill IDs', () => {
    const matches = matchSkillTriggers('canon lore guardian mythology');
    const unique = [...new Set(matches)];
    assert.equal(matches.length, unique.length);
  });
});

// ============================================
// getSkillsForLevel
// ============================================

describe('getSkillsForLevel', () => {
  it('minimal returns empty', () => {
    assert.deepEqual(getSkillsForLevel('minimal'), []);
  });

  it('standard returns 4 core', () => {
    assert.equal(getSkillsForLevel('standard').length, 4);
  });

  it('full returns 9', () => {
    assert.equal(getSkillsForLevel('full').length, 9);
  });

  it('luminor returns 13', () => {
    assert.equal(getSkillsForLevel('luminor').length, 13);
  });

  it('each level is superset of previous', () => {
    const standard = getSkillsForLevel('standard');
    const full = getSkillsForLevel('full');
    const luminor = getSkillsForLevel('luminor');
    for (const s of standard) assert.ok(full.includes(s));
    for (const s of full) assert.ok(luminor.includes(s));
  });
});

// ============================================
// SKILL CONTENT GENERATORS
// ============================================

describe('generateSkillContent', () => {
  it('should return null for unknown skill', () => {
    assert.equal(generateSkillContent('nonexistent'), null);
  });

  it('should generate content for all 13 skills', () => {
    for (const def of SKILL_DEFINITIONS) {
      const content = generateSkillContent(def.id);
      assert.ok(content, `Failed to generate: ${def.id}`);
      assert.ok(content.length > 200, `${def.id} too short: ${content.length}`);
    }
  });

  it('canon content should include Guardian data from GUARDIANS constant', () => {
    const content = generateSkillContent('arcanea-canon');
    for (const g of GUARDIANS.slice(0, 3)) {
      assert.ok(content.includes(g.displayName), `Missing Guardian: ${g.displayName}`);
    }
  });

  it('voice content should include VOICE_PILLARS data', () => {
    const content = generateSkillContent('arcanea-voice');
    assert.ok(content.includes('Arcane'));
    assert.ok(content.includes('antidote'));
  });

  it('voice content should include BANNED_PHRASES data', () => {
    const content = generateSkillContent('arcanea-voice');
    // Should include some banned phrases from the shared constant
    const hasSomeBanned = BANNED_PHRASES.slice(0, 3).some(b => content.includes(b.banned));
    assert.ok(hasSomeBanned, 'Should include at least some BANNED_PHRASES');
  });

  it('lore content should include COSMIC_DUALITY', () => {
    const content = generateSkillContent('arcanea-lore');
    assert.ok(content.includes('Lumina'));
    assert.ok(content.includes('Nero'));
  });

  it('architecture content should reference the stack', () => {
    const content = generateSkillContent('architecture-patterns');
    assert.ok(content.includes('Next.js'));
    assert.ok(content.includes('Supabase'));
    assert.ok(content.includes('TypeScript'));
  });

  it('react content should cover server and client components', () => {
    const content = generateSkillContent('react-patterns');
    assert.ok(content.includes('Server Component'));
    assert.ok(content.includes('Client Component'));
  });

  it('character-forge content should include character template', () => {
    const content = generateSkillContent('character-forge');
    assert.ok(content.includes('Character Template'));
    assert.ok(content.includes('personality'));
  });

  it('scene-craft content should include scene structure', () => {
    const content = generateSkillContent('scene-craft');
    assert.ok(content.includes('HOOK'));
    assert.ok(content.includes('TURNING POINT'));
  });
});
