/**
 * leviathan-generators.test.mjs
 *
 * Unit tests for:
 *   - generateLeviathan()  — imported from dist/tools/generators.js
 *   - classifyCanonFit()   — from .arcanea/intake/canon-spectrum.ts (logic inlined;
 *                            that directory is tool-agnostic, not part of tsconfig build)
 *   - inferCaptureType()   — from .arcanea/intake/capture-types.ts (logic inlined)
 *
 * Run: node --test packages/arcanea-mcp/tests/leviathan-generators.test.mjs
 */

import { describe, it, before } from 'node:test';
import { strict as assert } from 'node:assert';

// ─── Helper ─────────────────────────────────────────────────────────────────

function parseContent(result) {
  assert.ok(result, 'result must be defined');
  assert.ok(Array.isArray(result.content), 'result.content must be an array');
  assert.ok(result.content.length >= 1, 'result.content must have at least one item');
  assert.equal(result.content[0].type, 'text', 'content[0].type must be "text"');
  return JSON.parse(result.content[0].text);
}

// ─── classifyCanonFit — inlined from .arcanea/intake/canon-spectrum.ts ──────
// .arcanea/ is a tool-agnostic config dir, not part of the arcanea-mcp tsconfig.

const SCALE_TO_TIER = {
  mote: 'T0',
  beast: 'T1',
  shade: 'T2',
  leviathan: 'T3',
  godbeast: 'T4',
};

function classifyCanonFit(signals) {
  const {
    introducesNewEntity = false,
    referencesLockedCanon = false,
    creatureScale,
    bonded = false,
    techLeaning = false,
  } = signals;

  let spectrum;
  if (techLeaning && !referencesLockedCanon && !introducesNewEntity) {
    spectrum = 'tech';
  } else if (referencesLockedCanon || introducesNewEntity) {
    spectrum = techLeaning ? 'mixed' : 'canon';
  } else {
    spectrum = 'mixed';
  }

  let canonTier;
  if (creatureScale) {
    canonTier = SCALE_TO_TIER[creatureScale];
  } else if (bonded) {
    canonTier = 'T4';
  } else if (introducesNewEntity) {
    canonTier = 'T3'; // conservative: unbonded new entity forces the gate
  } else {
    canonTier = 'none';
  }

  const newEntityTier = canonTier === 'T3' || canonTier === 'T4';
  const requiresCanonGate = newEntityTier || (introducesNewEntity && referencesLockedCanon);

  return { spectrum, canonTier, requiresCanonGate };
}

// ─── inferCaptureType — inlined from .arcanea/intake/capture-types.ts ───────

const CAPTURE_TYPE_LIST = [
  {
    id: 'lore-text',
    label: 'Lore text',
    mimeTypes: ['text/markdown', 'text/plain', 'application/pdf'],
    extensions: ['.md', '.mdx', '.txt', '.pdf'],
    defaultCanonTier: 'none',
  },
  {
    id: 'monster-concept',
    label: 'Monster concept',
    mimeTypes: ['text/markdown', 'text/plain', 'image/png', 'image/jpeg', 'image/webp'],
    extensions: ['.md', '.txt', '.png', '.jpg', '.jpeg', '.webp'],
    defaultCanonTier: 'T3',
  },
  {
    id: 'character-sketch',
    label: 'Character sketch',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'text/markdown', 'text/plain'],
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.heic', '.md', '.txt'],
    defaultCanonTier: 'none',
  },
  {
    id: 'concept-art',
    label: 'Concept art',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/svg+xml'],
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.heic', '.svg'],
    defaultCanonTier: 'none',
  },
  {
    id: 'guardian-wisdom',
    label: 'Guardian wisdom',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-m4a', 'audio/ogg', 'audio/webm'],
    extensions: ['.m4a', '.mp3', '.wav', '.ogg', '.opus', '.webm'],
    defaultCanonTier: 'none',
  },
  {
    id: 'music-seed',
    label: 'Music seed',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav'],
    extensions: ['.m4a', '.mp3', '.wav'],
    defaultCanonTier: 'none',
  },
  {
    id: 'world-fragment',
    label: 'World fragment',
    mimeTypes: ['text/markdown', 'text/plain', 'application/json'],
    extensions: ['.md', '.mdx', '.txt', '.json'],
    defaultCanonTier: 'T1',
  },
];

function inferCaptureType(mimeType, extension) {
  const lowerExt = extension.toLowerCase();
  const normalizedExt = lowerExt.startsWith('.') ? lowerExt : `.${lowerExt}`;
  const byExt = CAPTURE_TYPE_LIST.find((c) => c.extensions.includes(normalizedExt));
  if (byExt) return byExt;
  return CAPTURE_TYPE_LIST.find((c) => c.mimeTypes.includes(mimeType));
}

// ─── generateLeviathan tests ─────────────────────────────────────────────────

describe('generateLeviathan', () => {
  let generateLeviathan;

  before(async () => {
    const mod = await import('../dist/tools/generators.js');
    generateLeviathan = mod.generateLeviathan;
  });

  describe('named=true, element="Water" → canonical Nethyssa', () => {
    it('returns the Nethyssa data block with correct name and title', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.equal(data.name, 'Nethyssa');
      assert.equal(data.title, 'the Abyss That Dreams');
    });

    it('has tier=3, class=Leviathan/Wild Godbeast, bonded=false', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.equal(data.tier, 3);
      assert.equal(data.class, 'Leviathan / Wild Godbeast');
      assert.equal(data.bonded, false);
    });

    it('reflects the requested element back', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.equal(data.requestedElement, 'Water');
    });

    it('has the correct elements, resonance, domain, material, and corruption', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.deepEqual(data.elements, ['Water', 'Void']);
      assert.equal(data.resonance, 'Abyssal Hum');
      assert.equal(data.domain, 'The Drowned Deep');
      assert.equal(data.material, 'Nethyss Pearl');
      assert.equal(data.corruption, 'The Drowned Shadow');
    });

    it('marks canon as STAGING', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.ok(data.canon.includes('STAGING'), `expected "STAGING" in canon, got: ${data.canon}`);
    });

    it('does not carry a "note" field (canonical path, no fallback message)', async () => {
      const result = await generateLeviathan({ named: true, element: 'Water' });
      const data = parseContent(result);
      assert.equal(data.note, undefined);
    });

    it('also matches via lowercase input (element normalisation)', async () => {
      const result = await generateLeviathan({ named: true, element: 'water' });
      const data = parseContent(result);
      assert.equal(data.name, 'Nethyssa');
    });
  });

  describe('named=true, element="Fire" → procedural (no canonical Fire Leviathan yet)', () => {
    it('returns a procedural Wild Godbeast with the named-fallback note', async () => {
      const result = await generateLeviathan({ named: true, element: 'Fire' });
      const data = parseContent(result);
      assert.ok(typeof data.note === 'string', 'note must be a string');
      assert.ok(
        data.note.includes('named=true requested'),
        `note should describe the fallback, got: ${data.note}`,
      );
    });

    it('has tier=3, class=Leviathan/Wild Godbeast, bonded=false', async () => {
      const result = await generateLeviathan({ named: true, element: 'Fire' });
      const data = parseContent(result);
      assert.equal(data.tier, 3);
      assert.equal(data.class, 'Leviathan / Wild Godbeast');
      assert.equal(data.bonded, false);
    });

    it('element array contains only Fire', async () => {
      const result = await generateLeviathan({ named: true, element: 'Fire' });
      const data = parseContent(result);
      assert.deepEqual(data.elements, ['Fire']);
    });

    it('is not Nethyssa', async () => {
      const result = await generateLeviathan({ named: true, element: 'Fire' });
      const data = parseContent(result);
      assert.notEqual(data.name, 'Nethyssa');
    });

    it('does not carry a corruption field (not a canonical Leviathan)', async () => {
      const result = await generateLeviathan({ named: true, element: 'Fire' });
      const data = parseContent(result);
      assert.equal(data.corruption, undefined);
    });
  });

  describe('named=false → always procedural, no note', () => {
    it('returns tier=3, bonded=false', async () => {
      const result = await generateLeviathan({ named: false });
      const data = parseContent(result);
      assert.equal(data.tier, 3);
      assert.equal(data.bonded, false);
    });

    it('has class=Leviathan/Wild Godbeast', async () => {
      const result = await generateLeviathan({ named: false });
      const data = parseContent(result);
      assert.equal(data.class, 'Leviathan / Wild Godbeast');
    });

    it('does not carry a "note" field', async () => {
      const result = await generateLeviathan({ named: false });
      const data = parseContent(result);
      assert.equal(data.note, undefined);
    });

    it('has a name, title, resonance, domain, and material', async () => {
      const result = await generateLeviathan({ named: false });
      const data = parseContent(result);
      assert.ok(typeof data.name === 'string' && data.name.length > 0, 'name must be a non-empty string');
      assert.ok(typeof data.title === 'string' && data.title.length > 0, 'title must be a non-empty string');
      assert.ok(typeof data.resonance === 'string', 'resonance must be a string');
      assert.ok(typeof data.domain === 'string', 'domain must be a string');
      assert.ok(typeof data.material === 'string', 'material must be a string');
    });
  });
});

// ─── classifyCanonFit tests ──────────────────────────────────────────────────

describe('classifyCanonFit', () => {
  it('empty signals → mixed spectrum, tier=none, no gate', () => {
    const fit = classifyCanonFit({});
    assert.equal(fit.spectrum, 'mixed');
    assert.equal(fit.canonTier, 'none');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('techLeaning only → tech spectrum, tier=none, no gate', () => {
    const fit = classifyCanonFit({ techLeaning: true });
    assert.equal(fit.spectrum, 'tech');
    assert.equal(fit.canonTier, 'none');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('referencesLockedCanon only → canon spectrum, tier=none, no gate', () => {
    const fit = classifyCanonFit({ referencesLockedCanon: true });
    assert.equal(fit.spectrum, 'canon');
    assert.equal(fit.canonTier, 'none');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('techLeaning + referencesLockedCanon → mixed spectrum (blend), no gate', () => {
    const fit = classifyCanonFit({ techLeaning: true, referencesLockedCanon: true });
    assert.equal(fit.spectrum, 'mixed');
    assert.equal(fit.canonTier, 'none');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('introducesNewEntity alone → canon spectrum, tier=T3 (conservative), gate required', () => {
    const fit = classifyCanonFit({ introducesNewEntity: true });
    assert.equal(fit.spectrum, 'canon');
    assert.equal(fit.canonTier, 'T3');
    assert.equal(fit.requiresCanonGate, true);
  });

  it('introducesNewEntity + referencesLockedCanon → gate required from both conditions', () => {
    const fit = classifyCanonFit({ introducesNewEntity: true, referencesLockedCanon: true });
    assert.equal(fit.spectrum, 'canon');
    assert.equal(fit.canonTier, 'T3');
    assert.equal(fit.requiresCanonGate, true);
  });

  it('creatureScale=mote → T0, no gate', () => {
    const fit = classifyCanonFit({ creatureScale: 'mote' });
    assert.equal(fit.canonTier, 'T0');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('creatureScale=beast → T1, no gate', () => {
    const fit = classifyCanonFit({ creatureScale: 'beast' });
    assert.equal(fit.canonTier, 'T1');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('creatureScale=shade → T2, no gate', () => {
    const fit = classifyCanonFit({ creatureScale: 'shade' });
    assert.equal(fit.canonTier, 'T2');
    assert.equal(fit.requiresCanonGate, false);
  });

  it('creatureScale=leviathan → T3, gate required', () => {
    const fit = classifyCanonFit({ creatureScale: 'leviathan', introducesNewEntity: true });
    assert.equal(fit.canonTier, 'T3');
    assert.equal(fit.requiresCanonGate, true);
  });

  it('creatureScale=godbeast → T4, gate required', () => {
    const fit = classifyCanonFit({ creatureScale: 'godbeast', introducesNewEntity: true });
    assert.equal(fit.canonTier, 'T4');
    assert.equal(fit.requiresCanonGate, true);
  });

  it('bonded=true, no scale → T4 (only the Ten are bonded), gate required', () => {
    const fit = classifyCanonFit({ bonded: true });
    assert.equal(fit.canonTier, 'T4');
    assert.equal(fit.requiresCanonGate, true);
  });

  it('creatureScale wins over bonded when both are set', () => {
    const fit = classifyCanonFit({ creatureScale: 'leviathan', bonded: true });
    assert.equal(fit.canonTier, 'T3'); // scale wins
    assert.equal(fit.requiresCanonGate, true);
  });

  it('Nethyssa capture profile → canon spectrum, T3, gate required', () => {
    // Represents a new Leviathan creature concept capture
    const fit = classifyCanonFit({
      introducesNewEntity: true,
      referencesLockedCanon: false,
      creatureScale: 'leviathan',
    });
    assert.equal(fit.spectrum, 'canon');
    assert.equal(fit.canonTier, 'T3');
    assert.equal(fit.requiresCanonGate, true);
  });
});

// ─── inferCaptureType tests ──────────────────────────────────────────────────

describe('inferCaptureType', () => {
  describe('extension-first routing', () => {
    it('.json → world-fragment (defaultCanonTier=T1)', () => {
      const result = inferCaptureType('application/json', '.json');
      assert.equal(result.id, 'world-fragment');
      assert.equal(result.defaultCanonTier, 'T1');
    });

    it('json (no leading dot) → world-fragment (normalisation)', () => {
      const result = inferCaptureType('application/json', 'json');
      assert.equal(result.id, 'world-fragment');
    });

    it('.svg → concept-art', () => {
      const result = inferCaptureType('image/svg+xml', '.svg');
      assert.equal(result.id, 'concept-art');
    });

    it('.opus → guardian-wisdom (only type with .opus)', () => {
      const result = inferCaptureType('audio/ogg', '.opus');
      assert.equal(result.id, 'guardian-wisdom');
    });

    it('.pdf → lore-text', () => {
      const result = inferCaptureType('application/pdf', '.pdf');
      assert.equal(result.id, 'lore-text');
    });

    it('.webm → guardian-wisdom', () => {
      const result = inferCaptureType('audio/webm', '.webm');
      assert.equal(result.id, 'guardian-wisdom');
    });

    it('.png → monster-concept (first .png match, defaultCanonTier=T3)', () => {
      // .png appears in: monster-concept(1), character-sketch(2), concept-art(3).
      // Extension find() returns the first match in CAPTURE_TYPE_LIST order.
      const result = inferCaptureType('image/png', '.png');
      assert.equal(result.id, 'monster-concept');
      assert.equal(result.defaultCanonTier, 'T3');
    });

    it('unknown extension → undefined', () => {
      const result = inferCaptureType('application/octet-stream', '.xyz_arcanea_unknown');
      assert.equal(result, undefined);
    });
  });

  describe('mime fallback (when extension is unknown)', () => {
    it('audio/ogg + unknown extension → guardian-wisdom via mime', () => {
      const result = inferCaptureType('audio/ogg', '.unk');
      assert.equal(result.id, 'guardian-wisdom');
    });

    it('audio/x-m4a + unknown extension → guardian-wisdom via mime', () => {
      const result = inferCaptureType('audio/x-m4a', '.unk');
      assert.equal(result.id, 'guardian-wisdom');
    });

    it('image/svg+xml + unknown extension → concept-art via mime', () => {
      const result = inferCaptureType('image/svg+xml', '.unk');
      assert.equal(result.id, 'concept-art');
    });

    it('unknown mime + unknown extension → undefined', () => {
      const result = inferCaptureType('model/gltf-binary', '.glb');
      assert.equal(result, undefined);
    });
  });

  describe('canon tier priors by capture type', () => {
    it('monster-concept carries defaultCanonTier=T3', () => {
      // .webp is unique first-match for monster-concept
      const result = inferCaptureType('image/webp', '.webp');
      // .webp appears in monster-concept(1), character-sketch(2), concept-art(3)
      assert.equal(result.id, 'monster-concept');
      assert.equal(result.defaultCanonTier, 'T3');
    });

    it('world-fragment carries defaultCanonTier=T1', () => {
      const result = inferCaptureType('application/json', '.json');
      assert.equal(result.defaultCanonTier, 'T1');
    });

    it('lore-text carries defaultCanonTier=none', () => {
      const result = inferCaptureType('application/pdf', '.pdf');
      assert.equal(result.defaultCanonTier, 'none');
    });

    it('guardian-wisdom carries defaultCanonTier=none', () => {
      const result = inferCaptureType('audio/ogg', '.opus');
      assert.equal(result.defaultCanonTier, 'none');
    });
  });
});
