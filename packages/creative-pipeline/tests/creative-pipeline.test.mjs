import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Top-level after hook for clean exit
after(() => { setTimeout(() => process.exit(0), 500); });

const mod = await import('../dist/index.js');
const {
  PromptEngine,
  AssetVault,
  Curator,
  CreativeSessionManager,
  GUARDIAN_CREATIVE_DOMAINS,
  ELEMENT_AESTHETICS,
  IMAGE_MODELS,
  GUARDIAN_FREQUENCIES,
  GUARDIAN_GATES,
  GUARDIAN_ELEMENTS,
} = mod;

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

describe('Exports', { timeout: 10000 }, () => {
  it('exports PromptEngine class', () => {
    assert.equal(typeof PromptEngine, 'function');
  });

  it('exports AssetVault class', () => {
    assert.equal(typeof AssetVault, 'function');
  });

  it('exports Curator class', () => {
    assert.equal(typeof Curator, 'function');
  });

  it('exports CreativeSessionManager class', () => {
    assert.equal(typeof CreativeSessionManager, 'function');
  });

  it('exports GUARDIAN_CREATIVE_DOMAINS constant', () => {
    assert.equal(typeof GUARDIAN_CREATIVE_DOMAINS, 'object');
  });

  it('exports ELEMENT_AESTHETICS constant', () => {
    assert.equal(typeof ELEMENT_AESTHETICS, 'object');
  });

  it('exports IMAGE_MODELS constant', () => {
    assert.equal(typeof IMAGE_MODELS, 'object');
  });

  it('exports GUARDIAN_FREQUENCIES constant', () => {
    assert.equal(typeof GUARDIAN_FREQUENCIES, 'object');
  });

  it('exports GUARDIAN_GATES constant', () => {
    assert.equal(typeof GUARDIAN_GATES, 'object');
  });

  it('exports GUARDIAN_ELEMENTS constant', () => {
    assert.equal(typeof GUARDIAN_ELEMENTS, 'object');
  });

  it('PromptEngine is instantiable', () => {
    const engine = new PromptEngine();
    assert.ok(engine);
  });

  it('AssetVault is instantiable', () => {
    const vault = new AssetVault();
    assert.ok(vault);
  });

  it('Curator is instantiable', () => {
    const curator = new Curator();
    assert.ok(curator);
  });

  it('CreativeSessionManager is instantiable', () => {
    const mgr = new CreativeSessionManager();
    assert.ok(mgr);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT ENGINE
// ═══════════════════════════════════════════════════════════════════════════

describe('PromptEngine', { timeout: 10000 }, () => {
  let engine;

  beforeEach(() => {
    engine = new PromptEngine();
  });

  describe('Template Management', { timeout: 10000 }, () => {
    it('has pre-registered templates', () => {
      const stats = engine.getStats();
      assert.ok(stats.templatesRegistered >= 7);
    });

    it('retrieves img-character-humanoid template', () => {
      const t = engine.getTemplate('img-character-humanoid');
      assert.ok(t);
      assert.equal(t.id, 'img-character-humanoid');
      assert.equal(t.type, 'image');
    });

    it('retrieves img-character-chibi template', () => {
      const t = engine.getTemplate('img-character-chibi');
      assert.ok(t);
      assert.equal(t.name, 'Chibi/Mascot Character');
    });

    it('retrieves img-scene-cosmic template', () => {
      const t = engine.getTemplate('img-scene-cosmic');
      assert.ok(t);
    });

    it('retrieves img-godbeast template', () => {
      const t = engine.getTemplate('img-godbeast');
      assert.ok(t);
    });

    it('retrieves txt-lore-entry template', () => {
      const t = engine.getTemplate('txt-lore-entry');
      assert.ok(t);
      assert.equal(t.type, 'text');
    });

    it('retrieves txt-chronicle template', () => {
      const t = engine.getTemplate('txt-chronicle');
      assert.ok(t);
    });

    it('retrieves music-theme template', () => {
      const t = engine.getTemplate('music-theme');
      assert.ok(t);
      assert.equal(t.type, 'music');
    });

    it('registers a custom template', () => {
      engine.registerTemplate({
        id: 'custom-test',
        name: 'Custom Test',
        type: 'text',
        template: '{{subject}} is great',
        variables: ['subject'],
        tags: ['test'],
      });
      const t = engine.getTemplate('custom-test');
      assert.ok(t);
      assert.equal(t.name, 'Custom Test');
    });

    it('overwrites template with same id', () => {
      engine.registerTemplate({
        id: 'custom-overwrite',
        name: 'Version 1',
        type: 'text',
        template: '{{x}}',
        variables: ['x'],
        tags: [],
      });
      engine.registerTemplate({
        id: 'custom-overwrite',
        name: 'Version 2',
        type: 'text',
        template: '{{x}} v2',
        variables: ['x'],
        tags: [],
      });
      assert.equal(engine.getTemplate('custom-overwrite').name, 'Version 2');
    });

    it('returns undefined for unknown template', () => {
      assert.equal(engine.getTemplate('nonexistent'), undefined);
    });

    it('getTemplatesByType returns image templates', () => {
      const images = engine.getTemplatesByType('image');
      assert.ok(images.length >= 4);
      images.forEach(t => assert.equal(t.type, 'image'));
    });

    it('getTemplatesByType returns text templates', () => {
      const texts = engine.getTemplatesByType('text');
      assert.ok(texts.length >= 2);
    });

    it('getTemplatesByType returns music templates', () => {
      const music = engine.getTemplatesByType('music');
      assert.ok(music.length >= 1);
    });

    it('getTemplatesByType returns empty for unused type', () => {
      const vids = engine.getTemplatesByType('video');
      assert.equal(vids.length, 0);
    });

    it('getTemplatesByGuardian returns templates for lyria', () => {
      const templates = engine.getTemplatesByGuardian('lyria');
      assert.ok(templates.length >= 1);
    });

    it('getTemplatesByGuardian returns empty for guardian with no specific templates', () => {
      const templates = engine.getTemplatesByGuardian('draconia');
      assert.equal(templates.length, 0);
    });
  });

  describe('Generation', { timeout: 10000 }, () => {
    it('generates prompt from template', () => {
      const result = engine.generate('img-character-humanoid', {
        name: 'Lyria',
        element: 'Water',
        gate: 'Sight',
        style: 'ethereal',
      });
      assert.ok(result.prompt.includes('Lyria'));
      assert.ok(result.prompt.includes('Water'));
      assert.ok(result.prompt.includes('Sight'));
      assert.equal(result.templateId, 'img-character-humanoid');
    });

    it('substitutes all variables', () => {
      const result = engine.generate('img-character-chibi', {
        name: 'Mamoru',
        element: 'Spirit',
        style: 'cute',
      });
      assert.ok(result.prompt.includes('Mamoru'));
      assert.ok(result.prompt.includes('Spirit'));
      assert.ok(result.prompt.includes('cute'));
    });

    it('returns empty string for missing variables', () => {
      const result = engine.generate('img-character-humanoid', {});
      assert.ok(result.prompt); // still produces output
      assert.equal(result.variables.name, '');
    });

    it('includes negativePrompt from template', () => {
      const result = engine.generate('img-character-humanoid', { name: 'Test', element: 'Fire', gate: 'Fire', style: 'bold' });
      assert.ok(result.negativePrompt);
      assert.ok(result.negativePrompt.includes('low quality'));
    });

    it('enriches with context element', () => {
      const result = engine.generate('img-character-humanoid', {
        name: 'Draconia',
        element: 'Fire',
        gate: 'Fire',
        style: 'bold',
      }, { element: 'Fire' });
      assert.ok(result.prompt.includes('golds') || result.prompt.includes('reds'));
    });

    it('enriches with context mood', () => {
      const result = engine.generate('img-character-humanoid', {
        name: 'Test',
        element: 'Water',
        gate: 'Flow',
        style: 'serene',
      }, { mood: 'tranquil' });
      assert.ok(result.prompt.includes('tranquil'));
    });

    it('enriches with context style', () => {
      const result = engine.generate('txt-lore-entry', {
        subject: 'The First Gate',
        element: 'Earth',
        guardian: 'lyssandria',
        gate: 'Foundation',
      }, { style: 'epic narrative' });
      assert.ok(result.prompt.includes('epic narrative'));
    });

    it('enriches with context setting', () => {
      const result = engine.generate('img-scene-cosmic', {
        setting: 'Crystal Tower',
        subject: 'battle',
        element: 'Fire',
        mood: 'intense',
      }, { setting: 'Ancient Realm' });
      assert.ok(result.prompt.includes('Ancient Realm'));
    });

    it('records timestamp', () => {
      const before = Date.now();
      const result = engine.generate('img-character-humanoid', { name: 'X', element: 'Y', gate: 'Z', style: 'A' });
      assert.ok(result.timestamp instanceof Date);
      assert.ok(result.timestamp.getTime() >= before);
    });

    it('records variables in result', () => {
      const result = engine.generate('img-character-humanoid', { name: 'Alera', element: 'Wind', gate: 'Voice', style: 'regal' });
      assert.equal(result.variables.name, 'Alera');
      assert.equal(result.variables.element, 'Wind');
    });

    it('records context in result', () => {
      const ctx = { mood: 'joyful', element: 'Spirit' };
      const result = engine.generate('img-character-humanoid', { name: 'X', element: 'Y', gate: 'Z', style: 'A' }, ctx);
      assert.equal(result.context.mood, 'joyful');
      assert.equal(result.context.element, 'Spirit');
    });

    it('throws on unknown template', () => {
      assert.throws(() => engine.generate('no-such-template', {}), /Template not found/);
    });
  });

  describe('generateForGuardian', { timeout: 10000 }, () => {
    it('generates for lyria with text type', () => {
      const result = engine.generateForGuardian('lyria', 'text');
      assert.ok(result.prompt.length > 0);
      assert.ok(result.context.guardianId === 'lyria');
    });

    it('generates for draconia with image type', () => {
      const result = engine.generateForGuardian('draconia', 'image');
      assert.ok(result.prompt.length > 0);
    });

    it('auto-selects guardian-specific template when available', () => {
      const result = engine.generateForGuardian('lyria', 'text');
      assert.equal(result.templateId, 'txt-chronicle');
    });

    it('falls back to type-only template', () => {
      const result = engine.generateForGuardian('lyssandria', 'image');
      assert.ok(result.prompt.length > 0);
    });

    it('includes guardian element in context', () => {
      const result = engine.generateForGuardian('leyla', 'image');
      assert.equal(result.context.element, 'Water');
    });

    it('includes guardian gate in context', () => {
      const result = engine.generateForGuardian('maylinn', 'image');
      assert.equal(result.context.gate, 'Heart');
    });

    it('passes style from context', () => {
      const result = engine.generateForGuardian('aiyami', 'image', { style: 'sacred' });
      assert.ok(result.prompt.includes('sacred') || result.context.style === 'sacred');
    });

    it('throws when no template for type', () => {
      assert.throws(() => engine.generateForGuardian('lyria', 'video'), /No template found/);
    });
  });

  describe('buildImagePrompt', { timeout: 10000 }, () => {
    it('builds basic image prompt', () => {
      const prompt = engine.buildImagePrompt('a crystal tower');
      assert.ok(prompt.includes('crystal tower'));
      assert.ok(prompt.includes('Arcanean fantasy'));
    });

    it('incorporates Fire element aesthetics', () => {
      const prompt = engine.buildImagePrompt('a warrior', { element: 'Fire' });
      assert.ok(prompt.includes('golds') || prompt.includes('reds'));
      assert.ok(prompt.includes('ember'));
      assert.ok(prompt.includes('heat distortion'));
    });

    it('incorporates Water element aesthetics', () => {
      const prompt = engine.buildImagePrompt('a mage', { element: 'Water' });
      assert.ok(prompt.includes('blues') || prompt.includes('silvers'));
      assert.ok(prompt.includes('crystal refractions'));
    });

    it('incorporates Earth element aesthetics', () => {
      const prompt = engine.buildImagePrompt('a golem', { element: 'Earth' });
      assert.ok(prompt.includes('greens') || prompt.includes('browns'));
    });

    it('incorporates Wind element aesthetics', () => {
      const prompt = engine.buildImagePrompt('a spirit', { element: 'Wind' });
      assert.ok(prompt.includes('whites') || prompt.includes('silvers'));
    });

    it('incorporates Void element aesthetics', () => {
      const prompt = engine.buildImagePrompt('the dark lord', { element: 'Void' });
      assert.ok(prompt.includes('purples') || prompt.includes('blacks'));
    });

    it('incorporates Spirit element aesthetics', () => {
      const prompt = engine.buildImagePrompt('Shinkami', { element: 'Spirit' });
      assert.ok(prompt.includes('gold') || prompt.includes('white'));
      assert.ok(prompt.includes('transcendent'));
    });

    it('includes mood when provided', () => {
      const prompt = engine.buildImagePrompt('a scene', { mood: 'melancholy' });
      assert.ok(prompt.includes('melancholy'));
    });

    it('includes style when provided', () => {
      const prompt = engine.buildImagePrompt('a scene', { style: 'watercolor' });
      assert.ok(prompt.includes('watercolor'));
    });

    it('includes setting when provided', () => {
      const prompt = engine.buildImagePrompt('a scene', { setting: 'Ancient Academy' });
      assert.ok(prompt.includes('Ancient Academy'));
    });

    it('includes guardian themes when provided', () => {
      const prompt = engine.buildImagePrompt('a scene', { guardianId: 'lyria' });
      assert.ok(prompt.includes('concept art') || prompt.includes('visions') || prompt.includes('mystical'));
    });
  });

  describe('buildCharacterPrompt', { timeout: 10000 }, () => {
    it('builds basic character prompt', () => {
      const prompt = engine.buildCharacterPrompt('Lyria', 'Water');
      assert.ok(prompt.includes('Lyria'));
      assert.ok(prompt.includes('Water'));
      assert.ok(prompt.includes('Arcanean'));
    });

    it('includes element description', () => {
      const prompt = engine.buildCharacterPrompt('Draconia', 'Fire');
      assert.ok(prompt.includes('golds') || prompt.includes('reds') || prompt.includes('ember'));
    });

    it('includes no body transformation note', () => {
      const prompt = engine.buildCharacterPrompt('Test', 'Earth');
      assert.ok(prompt.includes('no body transformation'));
    });

    it('includes guardian gate', () => {
      const prompt = engine.buildCharacterPrompt('Maylinn', 'Earth', 'maylinn');
      assert.ok(prompt.includes('Heart'));
    });

    it('includes guardian domain', () => {
      const prompt = engine.buildCharacterPrompt('Alera', 'Wind', 'alera');
      assert.ok(prompt.includes('typography'));
    });

    it('includes style when provided', () => {
      const prompt = engine.buildCharacterPrompt('Ino', 'Spirit', 'ino', 'regal anime');
      assert.ok(prompt.includes('regal anime'));
    });

    it('handles unknown element gracefully', () => {
      const prompt = engine.buildCharacterPrompt('Unknown', 'Plasma');
      assert.ok(prompt.includes('Unknown'));
    });
  });

  describe('buildScenePrompt', { timeout: 10000 }, () => {
    it('builds basic scene prompt', () => {
      const prompt = engine.buildScenePrompt('The Crystal Academy', ['Lyria', 'Aiyami'], 'awe-inspiring');
      assert.ok(prompt.includes('Crystal Academy'));
      assert.ok(prompt.includes('Lyria'));
      assert.ok(prompt.includes('Aiyami'));
      assert.ok(prompt.includes('awe-inspiring'));
    });

    it('includes element atmosphere', () => {
      const prompt = engine.buildScenePrompt('The Forge', ['Draconia'], 'intense', 'Fire');
      assert.ok(prompt.includes('golds') || prompt.includes('ember'));
    });

    it('handles empty characters array', () => {
      const prompt = engine.buildScenePrompt('The Void', [], 'ominous', 'Void');
      assert.ok(prompt.includes('Void'));
      assert.ok(!prompt.includes('Characters:'));
    });

    it('includes cinematic composition', () => {
      const prompt = engine.buildScenePrompt('test', ['a'], 'calm');
      assert.ok(prompt.includes('cinematic'));
    });

    it('handles scene without element', () => {
      const prompt = engine.buildScenePrompt('A library', ['Scholar'], 'peaceful');
      assert.ok(prompt.includes('library'));
    });
  });

  describe('Stats', { timeout: 10000 }, () => {
    it('tracks templates registered count', () => {
      const stats = engine.getStats();
      assert.ok(stats.templatesRegistered >= 7);
    });

    it('tracks prompts generated per type', () => {
      engine.generate('img-character-humanoid', { name: 'A', element: 'B', gate: 'C', style: 'D' });
      engine.generate('img-character-humanoid', { name: 'E', element: 'F', gate: 'G', style: 'H' });
      engine.generate('txt-lore-entry', { subject: 'X', element: 'Y', guardian: 'Z', gate: 'W' });
      const stats = engine.getStats();
      assert.equal(stats.promptsGenerated.image, 2);
      assert.equal(stats.promptsGenerated.text, 1);
    });

    it('starts with zero generation counts', () => {
      const fresh = new PromptEngine();
      const stats = fresh.getStats();
      assert.deepEqual(stats.promptsGenerated, {});
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// ASSET VAULT
// ═══════════════════════════════════════════════════════════════════════════

describe('AssetVault', { timeout: 10000 }, () => {
  let vault;

  beforeEach(() => {
    vault = new AssetVault();
  });

  const makeAsset = (overrides = {}) => ({
    type: 'image',
    name: 'Test Asset',
    description: 'A test asset for the vault',
    content: 'base64content...',
    tags: ['test', 'guardian', 'fire'],
    guardianId: 'draconia',
    gate: 'Fire',
    element: 'Fire',
    ...overrides,
  });

  describe('Store and Get', { timeout: 10000 }, () => {
    it('stores an asset and returns it with id', () => {
      const asset = vault.store(makeAsset());
      assert.ok(asset.id);
      assert.equal(asset.name, 'Test Asset');
    });

    it('generates unique ids', () => {
      const a1 = vault.store(makeAsset());
      const a2 = vault.store(makeAsset());
      assert.notEqual(a1.id, a2.id);
    });

    it('sets createdAt timestamp', () => {
      const before = Date.now();
      const asset = vault.store(makeAsset());
      assert.ok(asset.createdAt instanceof Date);
      assert.ok(asset.createdAt.getTime() >= before);
    });

    it('sets updatedAt timestamp', () => {
      const asset = vault.store(makeAsset());
      assert.ok(asset.updatedAt instanceof Date);
    });

    it('gets stored asset by id', () => {
      const stored = vault.store(makeAsset());
      const retrieved = vault.get(stored.id);
      assert.equal(retrieved.id, stored.id);
      assert.equal(retrieved.name, stored.name);
    });

    it('returns undefined for unknown id', () => {
      assert.equal(vault.get('nonexistent'), undefined);
    });
  });

  describe('Update', { timeout: 10000 }, () => {
    it('updates asset name', () => {
      const asset = vault.store(makeAsset());
      const updated = vault.update(asset.id, { name: 'Updated Name' });
      assert.equal(updated.name, 'Updated Name');
    });

    it('preserves id on update', () => {
      const asset = vault.store(makeAsset());
      const updated = vault.update(asset.id, { name: 'New' });
      assert.equal(updated.id, asset.id);
    });

    it('preserves createdAt on update', () => {
      const asset = vault.store(makeAsset());
      const updated = vault.update(asset.id, { name: 'New' });
      assert.equal(updated.createdAt.getTime(), asset.createdAt.getTime());
    });

    it('updates updatedAt timestamp', () => {
      const asset = vault.store(makeAsset());
      const originalUpdated = asset.updatedAt.getTime();
      // Small delay to ensure timestamp differs
      const updated = vault.update(asset.id, { name: 'New' });
      assert.ok(updated.updatedAt.getTime() >= originalUpdated);
    });

    it('throws on update of nonexistent asset', () => {
      assert.throws(() => vault.update('nonexistent', { name: 'x' }), /Asset not found/);
    });
  });

  describe('Delete', { timeout: 10000 }, () => {
    it('deletes an asset', () => {
      const asset = vault.store(makeAsset());
      vault.delete(asset.id);
      assert.equal(vault.get(asset.id), undefined);
    });

    it('throws on delete of nonexistent asset', () => {
      assert.throws(() => vault.delete('nonexistent'), /Asset not found/);
    });

    it('reduces total count after delete', () => {
      const a1 = vault.store(makeAsset());
      vault.store(makeAsset());
      assert.equal(vault.getStats().total, 2);
      vault.delete(a1.id);
      assert.equal(vault.getStats().total, 1);
    });
  });

  describe('Query', { timeout: 10000 }, () => {
    beforeEach(() => {
      vault.store(makeAsset({ name: 'Fire Sword', type: 'image', guardianId: 'draconia', element: 'Fire', tags: ['fire', 'weapon'] }));
      vault.store(makeAsset({ name: 'Water Shield', type: 'image', guardianId: 'leyla', element: 'Water', tags: ['water', 'armor'] }));
      vault.store(makeAsset({ name: 'Lore of Fire', type: 'text', guardianId: 'draconia', element: 'Fire', tags: ['fire', 'lore'] }));
      vault.store(makeAsset({ name: 'Cosmic Song', type: 'music', guardianId: 'aiyami', element: 'Spirit', tags: ['cosmic', 'music'] }));
      vault.store(makeAsset({ name: 'Earth Golem', type: 'character', guardianId: 'lyssandria', element: 'Earth', tags: ['earth', 'guardian'] }));
    });

    it('queries by type', () => {
      const images = vault.query({ type: 'image' });
      assert.equal(images.length, 2);
    });

    it('queries by guardianId', () => {
      const draconia = vault.query({ guardianId: 'draconia' });
      assert.equal(draconia.length, 2);
    });

    it('queries by element', () => {
      const fire = vault.query({ element: 'Fire' });
      assert.equal(fire.length, 2);
    });

    it('queries by tags', () => {
      const fireLore = vault.query({ tags: ['fire', 'lore'] });
      assert.equal(fireLore.length, 1);
      assert.equal(fireLore[0].name, 'Lore of Fire');
    });

    it('queries by search text in name', () => {
      const results = vault.query({ search: 'sword' });
      assert.equal(results.length, 1);
      assert.equal(results[0].name, 'Fire Sword');
    });

    it('queries by search text in description', () => {
      vault.store(makeAsset({ name: 'Item', description: 'A legendary beacon of hope', tags: [] }));
      const results = vault.query({ search: 'beacon' });
      assert.equal(results.length, 1);
    });

    it('queries by search text in tags', () => {
      const results = vault.query({ search: 'cosmic' });
      assert.equal(results.length, 1);
    });

    it('combines type and guardian filters', () => {
      const results = vault.query({ type: 'image', guardianId: 'draconia' });
      assert.equal(results.length, 1);
      assert.equal(results[0].name, 'Fire Sword');
    });

    it('applies limit', () => {
      const results = vault.query({ limit: 2 });
      assert.equal(results.length, 2);
    });

    it('applies offset', () => {
      const all = vault.query({});
      const page2 = vault.query({ offset: 2, limit: 2 });
      assert.equal(page2.length, 2);
      assert.equal(page2[0].id, all[2].id);
    });

    it('orders by name', () => {
      const results = vault.query({ orderBy: 'name' });
      for (let i = 1; i < results.length; i++) {
        assert.ok(results[i - 1].name.localeCompare(results[i].name) <= 0);
      }
    });

    it('orders by created (default)', () => {
      const results = vault.query({});
      // Default is created desc
      for (let i = 1; i < results.length; i++) {
        assert.ok(results[i - 1].createdAt.getTime() >= results[i].createdAt.getTime());
      }
    });

    it('returns empty for no matches', () => {
      const results = vault.query({ type: 'video' });
      assert.equal(results.length, 0);
    });
  });

  describe('Convenience Query Methods', { timeout: 10000 }, () => {
    beforeEach(() => {
      vault.store(makeAsset({ name: 'A', guardianId: 'lyria', element: 'Water', type: 'image', tags: ['mystical'] }));
      vault.store(makeAsset({ name: 'B', guardianId: 'lyria', element: 'Water', type: 'text', tags: ['prophetic'] }));
      vault.store(makeAsset({ name: 'C', guardianId: 'draconia', element: 'Fire', type: 'image', tags: ['mystical'] }));
    });

    it('getByGuardian returns all assets for guardian', () => {
      const results = vault.getByGuardian('lyria');
      assert.equal(results.length, 2);
    });

    it('getByGuardian filters by type', () => {
      const results = vault.getByGuardian('lyria', 'image');
      assert.equal(results.length, 1);
    });

    it('getByElement returns all for element', () => {
      const results = vault.getByElement('Water');
      assert.equal(results.length, 2);
    });

    it('getByElement filters by type', () => {
      const results = vault.getByElement('Water', 'text');
      assert.equal(results.length, 1);
    });

    it('getByTag returns matching assets', () => {
      const results = vault.getByTag('mystical');
      assert.equal(results.length, 2);
    });

    it('search finds by name', () => {
      const results = vault.search('A');
      assert.ok(results.length >= 1);
    });
  });

  describe('Variations', { timeout: 10000 }, () => {
    it('creates variation linked to parent', () => {
      const parent = vault.store(makeAsset({ name: 'Original' }));
      const variation = vault.createVariation(parent.id, { name: 'Remix' });
      assert.equal(variation.parentId, parent.id);
      assert.equal(variation.name, 'Remix');
    });

    it('variation gets its own id', () => {
      const parent = vault.store(makeAsset());
      const variation = vault.createVariation(parent.id, {});
      assert.notEqual(variation.id, parent.id);
    });

    it('variation inherits parent properties', () => {
      const parent = vault.store(makeAsset({ guardianId: 'lyria', element: 'Water' }));
      const variation = vault.createVariation(parent.id, {});
      assert.equal(variation.guardianId, 'lyria');
      assert.equal(variation.element, 'Water');
    });

    it('variation can override properties', () => {
      const parent = vault.store(makeAsset({ element: 'Fire' }));
      const variation = vault.createVariation(parent.id, { element: 'Water' });
      assert.equal(variation.element, 'Water');
    });

    it('default variation name appends (variation)', () => {
      const parent = vault.store(makeAsset({ name: 'Original' }));
      const variation = vault.createVariation(parent.id, {});
      assert.equal(variation.name, 'Original (variation)');
    });

    it('getVariations returns children', () => {
      const parent = vault.store(makeAsset());
      vault.createVariation(parent.id, { name: 'V1' });
      vault.createVariation(parent.id, { name: 'V2' });
      const variations = vault.getVariations(parent.id);
      assert.equal(variations.length, 2);
    });

    it('getVariations returns empty for no children', () => {
      const parent = vault.store(makeAsset());
      assert.equal(vault.getVariations(parent.id).length, 0);
    });

    it('throws on variation of nonexistent parent', () => {
      assert.throws(() => vault.createVariation('nonexistent', {}), /Parent asset not found/);
    });
  });

  describe('Export', { timeout: 10000 }, () => {
    it('exports asset with metadata', () => {
      const asset = vault.store(makeAsset());
      const exported = vault.export(asset.id);
      assert.ok(exported.asset);
      assert.ok(exported.metadata);
      assert.equal(exported.asset.id, asset.id);
    });

    it('export metadata includes exportedAt', () => {
      const asset = vault.store(makeAsset());
      const exported = vault.export(asset.id);
      assert.ok(exported.metadata.exportedAt);
    });

    it('export metadata includes hasParent', () => {
      const parent = vault.store(makeAsset());
      const variation = vault.createVariation(parent.id, {});
      const exported = vault.export(variation.id);
      assert.equal(exported.metadata.hasParent, true);
    });

    it('export metadata includes variationCount', () => {
      const parent = vault.store(makeAsset());
      vault.createVariation(parent.id, {});
      vault.createVariation(parent.id, {});
      const exported = vault.export(parent.id);
      assert.equal(exported.metadata.variationCount, 2);
    });

    it('throws on export of nonexistent asset', () => {
      assert.throws(() => vault.export('nonexistent'), /Asset not found/);
    });
  });

  describe('Events', { timeout: 10000 }, () => {
    it('emits asset-stored on store', () => {
      let emitted = null;
      vault.on('asset-stored', (a) => { emitted = a; });
      const asset = vault.store(makeAsset());
      assert.ok(emitted);
      assert.equal(emitted.id, asset.id);
    });

    it('emits asset-updated on update', () => {
      let emitted = null;
      vault.on('asset-updated', (a) => { emitted = a; });
      const asset = vault.store(makeAsset());
      vault.update(asset.id, { name: 'Updated' });
      assert.ok(emitted);
      assert.equal(emitted.name, 'Updated');
    });

    it('emits asset-deleted on delete', () => {
      let emitted = null;
      vault.on('asset-deleted', (a) => { emitted = a; });
      const asset = vault.store(makeAsset());
      vault.delete(asset.id);
      assert.ok(emitted);
      assert.equal(emitted.id, asset.id);
    });

    it('emits variation-created on createVariation', () => {
      let emitted = null;
      vault.on('variation-created', (a) => { emitted = a; });
      const parent = vault.store(makeAsset());
      vault.createVariation(parent.id, { name: 'V1' });
      assert.ok(emitted);
      assert.equal(emitted.parentId, parent.id);
    });
  });

  describe('Stats', { timeout: 10000 }, () => {
    it('returns total count', () => {
      vault.store(makeAsset());
      vault.store(makeAsset());
      assert.equal(vault.getStats().total, 2);
    });

    it('returns byType breakdown', () => {
      vault.store(makeAsset({ type: 'image' }));
      vault.store(makeAsset({ type: 'image' }));
      vault.store(makeAsset({ type: 'text' }));
      const stats = vault.getStats();
      assert.equal(stats.byType.image, 2);
      assert.equal(stats.byType.text, 1);
    });

    it('returns byGuardian breakdown', () => {
      vault.store(makeAsset({ guardianId: 'lyria' }));
      vault.store(makeAsset({ guardianId: 'lyria' }));
      vault.store(makeAsset({ guardianId: 'draconia' }));
      const stats = vault.getStats();
      assert.equal(stats.byGuardian.lyria, 2);
      assert.equal(stats.byGuardian.draconia, 1);
    });

    it('returns byElement breakdown', () => {
      vault.store(makeAsset({ element: 'Fire' }));
      vault.store(makeAsset({ element: 'Water' }));
      vault.store(makeAsset({ element: 'Fire' }));
      const stats = vault.getStats();
      assert.equal(stats.byElement.Fire, 2);
      assert.equal(stats.byElement.Water, 1);
    });

    it('starts empty', () => {
      const stats = vault.getStats();
      assert.equal(stats.total, 0);
      assert.deepEqual(stats.byType, {});
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// CURATOR
// ═══════════════════════════════════════════════════════════════════════════

describe('Curator', { timeout: 10000 }, () => {
  let curator;

  beforeEach(() => {
    curator = new Curator();
  });

  const makeFullAsset = (overrides = {}) => ({
    id: 'asset-001',
    type: 'image',
    name: 'Epic Guardian Portrait',
    description: 'A highly detailed portrait of Lyria, Guardian of the Gate of Sight, surrounded by mystical Water energy with crystal refractions and prophetic visions swirling around her.',
    content: 'A'.repeat(600),
    tags: ['guardian', 'lyria', 'water', 'cosmic', 'arcanea', 'portrait'],
    guardianId: 'lyria',
    gate: 'Sight',
    element: 'Water',
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: { resolution: '4k', style: 'fantasy', format: 'png' },
    promptUsed: 'Epic portrait of Lyria...',
    model: 'gemini-3-pro-image-preview',
    ...overrides,
  });

  const makePoorAsset = (overrides = {}) => ({
    id: 'asset-002',
    type: 'image',
    name: 'img',
    description: 'a pic',
    content: 'x',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  describe('Default Criteria', { timeout: 10000 }, () => {
    it('has default criteria', () => {
      const criteria = curator.getDefaultCriteria();
      assert.ok(criteria.minQuality > 0);
      assert.ok(criteria.minAlignment > 0);
      assert.equal(typeof criteria.requireGuardianFit, 'boolean');
      assert.ok(criteria.autoApproveThreshold > 0);
    });

    it('setDefaultCriteria updates criteria', () => {
      curator.setDefaultCriteria({ minQuality: 80, minAlignment: 80, requireGuardianFit: true, autoApproveThreshold: 90 });
      const criteria = curator.getDefaultCriteria();
      assert.equal(criteria.minQuality, 80);
      assert.equal(criteria.requireGuardianFit, true);
    });
  });

  describe('Evaluation', { timeout: 10000 }, () => {
    it('evaluates a full asset', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.scores);
      assert.ok(result.scores.quality > 0);
      assert.ok(result.scores.alignment > 0);
      assert.ok(result.scores.originality > 0);
      assert.ok(result.scores.guardianFit > 0);
      assert.ok(result.scores.overall > 0);
    });

    it('returns assetId in result', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.equal(result.assetId, 'asset-001');
    });

    it('returns feedback array', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(Array.isArray(result.feedback));
    });

    it('returns curatorGuardian', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.curatorGuardian);
    });

    it('uses asset guardianId as curatorGuardian', () => {
      const result = curator.evaluate(makeFullAsset({ guardianId: 'draconia' }));
      assert.equal(result.curatorGuardian, 'draconia');
    });

    it('defaults curatorGuardian to lyria when no guardianId', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.equal(result.curatorGuardian, 'lyria');
    });

    it('evaluates with custom criteria', () => {
      const customCriteria = { minQuality: 90, minAlignment: 90, requireGuardianFit: true, autoApproveThreshold: 95 };
      const result = curator.evaluate(makeFullAsset(), customCriteria);
      assert.ok(result.scores);
    });
  });

  describe('Quality Scoring', { timeout: 10000 }, () => {
    it('scores high quality asset highly', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.scores.quality >= 70);
    });

    it('scores poor quality asset lower', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.ok(result.scores.quality < 60);
    });

    it('content length boosts quality', () => {
      const short = curator.evaluate(makePoorAsset({ content: 'short' }));
      const long = curator.evaluate(makePoorAsset({ id: 'x', content: 'A'.repeat(600) }));
      assert.ok(long.scores.quality > short.scores.quality);
    });

    it('description length boosts quality', () => {
      const short = curator.evaluate(makePoorAsset({ id: 'a', description: 'hi' }));
      const long = curator.evaluate(makePoorAsset({ id: 'b', description: 'A very detailed description of this amazing artwork that spans over a hundred characters and provides rich context about the piece.' }));
      assert.ok(long.scores.quality > short.scores.quality);
    });

    it('metadata presence boosts quality', () => {
      const noMeta = curator.evaluate(makePoorAsset({ id: 'a' }));
      const withMeta = curator.evaluate(makePoorAsset({ id: 'b', metadata: { style: 'cosmic' } }));
      assert.ok(withMeta.scores.quality >= noMeta.scores.quality);
    });

    it('tags boost quality', () => {
      const noTags = curator.evaluate(makePoorAsset({ id: 'a', tags: [] }));
      const withTags = curator.evaluate(makePoorAsset({ id: 'b', tags: ['fire', 'guardian', 'cosmic'] }));
      assert.ok(withTags.scores.quality > noTags.scores.quality);
    });
  });

  describe('Alignment Scoring', { timeout: 10000 }, () => {
    it('scores canon-aligned asset highly', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.scores.alignment >= 70);
    });

    it('scores non-aligned asset lower', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.ok(result.scores.alignment < 50);
    });

    it('guardian presence boosts alignment', () => {
      const noGuardian = curator.evaluate(makePoorAsset({ id: 'a' }));
      const withGuardian = curator.evaluate(makePoorAsset({ id: 'b', guardianId: 'lyria' }));
      assert.ok(withGuardian.scores.alignment > noGuardian.scores.alignment);
    });

    it('element presence boosts alignment', () => {
      const noElement = curator.evaluate(makePoorAsset({ id: 'a' }));
      const withElement = curator.evaluate(makePoorAsset({ id: 'b', element: 'Water' }));
      assert.ok(withElement.scores.alignment > noElement.scores.alignment);
    });

    it('gate presence boosts alignment', () => {
      const noGate = curator.evaluate(makePoorAsset({ id: 'a' }));
      const withGate = curator.evaluate(makePoorAsset({ id: 'b', gate: 'Sight' }));
      assert.ok(withGate.scores.alignment > noGate.scores.alignment);
    });

    it('canon-compatible tags boost alignment', () => {
      const generic = curator.evaluate(makePoorAsset({ id: 'a', tags: ['photo', 'modern'] }));
      const canon = curator.evaluate(makePoorAsset({ id: 'b', tags: ['guardian', 'arcanea', 'cosmic'] }));
      assert.ok(canon.scores.alignment > generic.scores.alignment);
    });
  });

  describe('Originality Scoring', { timeout: 10000 }, () => {
    it('scores original asset reasonably', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.scores.originality >= 50);
    });

    it('variations score slightly lower originality', () => {
      const original = curator.evaluate(makeFullAsset({ id: 'orig' }));
      const variation = curator.evaluate(makeFullAsset({ id: 'var', parentId: 'orig' }));
      assert.ok(variation.scores.originality < original.scores.originality);
    });

    it('longer descriptions boost originality', () => {
      const short = curator.evaluate(makePoorAsset({ id: 'a', description: 'x' }));
      const long = curator.evaluate(makePoorAsset({ id: 'b', description: 'A very unique and original description that spans many words and paints a vivid picture of something never seen before in the Arcanean universe, featuring new characters and locations' }));
      assert.ok(long.scores.originality > short.scores.originality);
    });
  });

  describe('Guardian Fit Scoring', { timeout: 10000 }, () => {
    it('scores guardian-matched asset well', () => {
      const result = curator.evaluate(makeFullAsset({
        guardianId: 'lyria',
        tags: ['concept art', 'visions', 'mystical imagery'],
        description: 'Mystical concept art vision of prophetic scenes',
      }));
      assert.ok(result.scores.guardianFit >= 50);
    });

    it('returns neutral score (50) for no guardian', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.equal(result.scores.guardianFit, 50);
    });

    it('returns low score for unknown guardian', () => {
      const result = curator.evaluate(makePoorAsset({ id: 'x', guardianId: 'unknown-guardian' }));
      assert.ok(result.scores.guardianFit <= 40);
    });

    it('domain keywords in tags improve guardian fit', () => {
      const noMatch = curator.evaluate(makeFullAsset({
        id: 'a',
        guardianId: 'draconia',
        tags: ['peaceful', 'calm'],
        description: 'A peaceful meadow',
      }));
      const match = curator.evaluate(makeFullAsset({
        id: 'b',
        guardianId: 'draconia',
        tags: ['action', 'fire', 'transformation', 'energy'],
        description: 'An intense action scene with fire transformation and energy effects',
      }));
      assert.ok(match.scores.guardianFit > noMatch.scores.guardianFit);
    });
  });

  describe('Overall Score', { timeout: 10000 }, () => {
    it('overall is weighted average', () => {
      const result = curator.evaluate(makeFullAsset());
      const { quality, alignment, originality, guardianFit, overall } = result.scores;
      const expected = Math.round(quality * 0.3 + alignment * 0.3 + originality * 0.2 + guardianFit * 0.2);
      assert.equal(overall, expected);
    });

    it('overall never exceeds 100', () => {
      const result = curator.evaluate(makeFullAsset());
      assert.ok(result.scores.overall <= 100);
    });

    it('overall is non-negative', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.ok(result.scores.overall >= 0);
    });
  });

  describe('Approval Logic', { timeout: 10000 }, () => {
    it('auto-approves at threshold', () => {
      curator.setDefaultCriteria({ minQuality: 10, minAlignment: 10, requireGuardianFit: false, autoApproveThreshold: 40 });
      const result = curator.evaluate(makeFullAsset());
      assert.equal(result.approved, true);
    });

    it('rejects poor assets with strict criteria', () => {
      curator.setDefaultCriteria({ minQuality: 95, minAlignment: 95, requireGuardianFit: true, autoApproveThreshold: 99 });
      const result = curator.evaluate(makePoorAsset());
      assert.equal(result.approved, false);
    });

    it('requireGuardianFit can cause rejection', () => {
      curator.setDefaultCriteria({ minQuality: 10, minAlignment: 10, requireGuardianFit: true, autoApproveThreshold: 99 });
      const result = curator.evaluate(makePoorAsset({ id: 'x', guardianId: 'unknown-guardian' }));
      // guardianFit for unknown guardian is low, so it should reject
      assert.equal(result.approved, false);
    });
  });

  describe('Batch Evaluation', { timeout: 10000 }, () => {
    it('evaluates multiple assets', () => {
      const results = curator.batchEvaluate([makeFullAsset(), makePoorAsset()]);
      assert.equal(results.length, 2);
    });

    it('getApproved filters approved', () => {
      curator.setDefaultCriteria({ minQuality: 10, minAlignment: 10, requireGuardianFit: false, autoApproveThreshold: 30 });
      const results = curator.batchEvaluate([makeFullAsset(), makePoorAsset()]);
      const approved = curator.getApproved(results);
      assert.ok(approved.length >= 1);
      approved.forEach(r => assert.equal(r.approved, true));
    });

    it('getRejected filters rejected', () => {
      curator.setDefaultCriteria({ minQuality: 95, minAlignment: 95, requireGuardianFit: true, autoApproveThreshold: 99 });
      const results = curator.batchEvaluate([makeFullAsset(), makePoorAsset()]);
      const rejected = curator.getRejected(results);
      assert.ok(rejected.length >= 1);
      rejected.forEach(r => assert.equal(r.approved, false));
    });
  });

  describe('Feedback', { timeout: 10000 }, () => {
    it('provides feedback for poor assets', () => {
      const result = curator.evaluate(makePoorAsset());
      assert.ok(result.feedback.length > 0);
    });

    it('suggests adding guardian', () => {
      const result = curator.evaluate(makePoorAsset());
      const hasGuardianSuggestion = result.feedback.some(f => f.toLowerCase().includes('guardian'));
      assert.ok(hasGuardianSuggestion);
    });

    it('suggests adding tags', () => {
      const result = curator.evaluate(makePoorAsset());
      const hasTagSuggestion = result.feedback.some(f => f.toLowerCase().includes('tag'));
      assert.ok(hasTagSuggestion);
    });

    it('praises excellent work', () => {
      curator.setDefaultCriteria({ minQuality: 10, minAlignment: 10, requireGuardianFit: false, autoApproveThreshold: 40 });
      const result = curator.evaluate(makeFullAsset());
      const hasExcellent = result.feedback.some(f => f.toLowerCase().includes('excellent'));
      assert.ok(hasExcellent);
    });
  });

  describe('Stats', { timeout: 10000 }, () => {
    it('starts with zero evaluations', () => {
      const stats = curator.getStats();
      assert.equal(stats.evaluated, 0);
    });

    it('tracks evaluated count', () => {
      curator.evaluate(makeFullAsset());
      curator.evaluate(makePoorAsset());
      assert.equal(curator.getStats().evaluated, 2);
    });

    it('tracks approved count', () => {
      curator.setDefaultCriteria({ minQuality: 10, minAlignment: 10, requireGuardianFit: false, autoApproveThreshold: 30 });
      curator.evaluate(makeFullAsset());
      assert.ok(curator.getStats().approved >= 1);
    });

    it('tracks rejected count', () => {
      curator.setDefaultCriteria({ minQuality: 95, minAlignment: 95, requireGuardianFit: true, autoApproveThreshold: 99 });
      curator.evaluate(makePoorAsset());
      assert.ok(curator.getStats().rejected >= 1);
    });

    it('tracks average scores', () => {
      curator.evaluate(makeFullAsset());
      const stats = curator.getStats();
      assert.ok(stats.avgScores.quality > 0);
      assert.ok(stats.avgScores.overall > 0);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// CREATIVE SESSION MANAGER
// ═══════════════════════════════════════════════════════════════════════════

describe('CreativeSessionManager', { timeout: 10000 }, () => {
  let mgr;

  beforeEach(() => {
    mgr = new CreativeSessionManager();
  });

  describe('Session Lifecycle', { timeout: 10000 }, () => {
    it('starts a session', () => {
      const session = mgr.startSession('lyria', 'Sight', 'Water');
      assert.ok(session.id);
      assert.equal(session.guardianId, 'lyria');
      assert.equal(session.gate, 'Sight');
      assert.equal(session.element, 'Water');
      assert.equal(session.status, 'active');
    });

    it('sets startedAt', () => {
      const before = Date.now();
      const session = mgr.startSession('lyria');
      assert.ok(session.startedAt instanceof Date);
      assert.ok(session.startedAt.getTime() >= before);
    });

    it('starts with empty assets and prompts', () => {
      const session = mgr.startSession('lyria');
      assert.deepEqual(session.assets, []);
      assert.deepEqual(session.prompts, []);
    });

    it('getSession retrieves by id', () => {
      const session = mgr.startSession('lyria');
      const retrieved = mgr.getSession(session.id);
      assert.equal(retrieved.id, session.id);
    });

    it('getSession returns undefined for unknown id', () => {
      assert.equal(mgr.getSession('nonexistent'), undefined);
    });

    it('getActiveSession returns active session', () => {
      const session = mgr.startSession('lyria');
      const active = mgr.getActiveSession();
      assert.equal(active.id, session.id);
    });

    it('getActiveSession returns undefined when no active session', () => {
      assert.equal(mgr.getActiveSession(), undefined);
    });

    it('completes a session', () => {
      const session = mgr.startSession('lyria');
      const { session: completed, summary } = mgr.completeSession(session.id);
      assert.equal(completed.status, 'complete');
      assert.ok(summary.durationMs >= 0);
    });

    it('completeSession returns summary with counts', () => {
      const session = mgr.startSession('lyria');
      mgr.addAssetToSession(session.id, 'a1');
      mgr.addAssetToSession(session.id, 'a2');
      mgr.addPromptToSession(session.id, 'p1');
      const { summary } = mgr.completeSession(session.id);
      assert.equal(summary.assetsCreated, 2);
      assert.equal(summary.promptsUsed, 1);
    });

    it('completeSession returns formatted duration', () => {
      const session = mgr.startSession('lyria');
      const { summary } = mgr.completeSession(session.id);
      assert.ok(typeof summary.durationFormatted === 'string');
    });

    it('throws on completing nonexistent session', () => {
      assert.throws(() => mgr.completeSession('nonexistent'), /Session not found/);
    });

    it('throws on completing already-completed session', () => {
      const session = mgr.startSession('lyria');
      mgr.completeSession(session.id);
      assert.throws(() => mgr.completeSession(session.id), /already complete/);
    });
  });

  describe('Single Active Session Constraint', { timeout: 10000 }, () => {
    it('throws when starting second active session', () => {
      mgr.startSession('lyria');
      assert.throws(() => mgr.startSession('draconia'), /already active/);
    });

    it('allows new session after completing previous', () => {
      const s1 = mgr.startSession('lyria');
      mgr.completeSession(s1.id);
      const s2 = mgr.startSession('draconia');
      assert.ok(s2.id);
      assert.notEqual(s2.id, s1.id);
    });

    it('allows new session after pausing previous', () => {
      const s1 = mgr.startSession('lyria');
      mgr.pauseSession(s1.id);
      const s2 = mgr.startSession('draconia');
      assert.ok(s2.id);
    });
  });

  describe('Assets and Prompts', { timeout: 10000 }, () => {
    it('adds asset to session', () => {
      const session = mgr.startSession('lyria');
      mgr.addAssetToSession(session.id, 'asset-001');
      const updated = mgr.getSession(session.id);
      assert.deepEqual(updated.assets, ['asset-001']);
    });

    it('adds multiple assets', () => {
      const session = mgr.startSession('lyria');
      mgr.addAssetToSession(session.id, 'a1');
      mgr.addAssetToSession(session.id, 'a2');
      mgr.addAssetToSession(session.id, 'a3');
      assert.equal(mgr.getSession(session.id).assets.length, 3);
    });

    it('adds prompt to session', () => {
      const session = mgr.startSession('lyria');
      mgr.addPromptToSession(session.id, 'prompt-001');
      assert.deepEqual(mgr.getSession(session.id).prompts, ['prompt-001']);
    });

    it('throws on adding asset to nonexistent session', () => {
      assert.throws(() => mgr.addAssetToSession('nonexistent', 'a1'), /Session not found/);
    });

    it('throws on adding prompt to nonexistent session', () => {
      assert.throws(() => mgr.addPromptToSession('nonexistent', 'p1'), /Session not found/);
    });

    it('throws on adding asset to completed session', () => {
      const session = mgr.startSession('lyria');
      mgr.completeSession(session.id);
      assert.throws(() => mgr.addAssetToSession(session.id, 'a1'), /completed session/);
    });

    it('throws on adding prompt to completed session', () => {
      const session = mgr.startSession('lyria');
      mgr.completeSession(session.id);
      assert.throws(() => mgr.addPromptToSession(session.id, 'p1'), /completed session/);
    });
  });

  describe('Pause and Resume', { timeout: 10000 }, () => {
    it('pauses active session', () => {
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      assert.equal(mgr.getSession(session.id).status, 'paused');
    });

    it('resumes paused session', () => {
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      mgr.resumeSession(session.id);
      assert.equal(mgr.getSession(session.id).status, 'active');
    });

    it('throws on pausing non-active session', () => {
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      assert.throws(() => mgr.pauseSession(session.id), /Only active sessions/);
    });

    it('throws on resuming non-paused session', () => {
      const session = mgr.startSession('lyria');
      assert.throws(() => mgr.resumeSession(session.id), /Only paused sessions/);
    });

    it('throws on pausing nonexistent session', () => {
      assert.throws(() => mgr.pauseSession('nonexistent'), /Session not found/);
    });

    it('throws on resuming nonexistent session', () => {
      assert.throws(() => mgr.resumeSession('nonexistent'), /Session not found/);
    });

    it('cannot resume if another session is active', () => {
      const s1 = mgr.startSession('lyria');
      mgr.pauseSession(s1.id);
      mgr.startSession('draconia');
      assert.throws(() => mgr.resumeSession(s1.id), /already active/);
    });

    it('can add assets to paused session', () => {
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      mgr.addAssetToSession(session.id, 'a1');
      assert.equal(mgr.getSession(session.id).assets.length, 1);
    });
  });

  describe('Session Stats', { timeout: 10000 }, () => {
    it('returns stats for session', () => {
      const session = mgr.startSession('lyria');
      mgr.addAssetToSession(session.id, 'a1');
      mgr.addPromptToSession(session.id, 'p1');
      const stats = mgr.getSessionStats(session.id);
      assert.equal(stats.assetsCreated, 1);
      assert.equal(stats.promptsUsed, 1);
      assert.equal(stats.status, 'active');
    });

    it('duration is non-negative', () => {
      const session = mgr.startSession('lyria');
      const stats = mgr.getSessionStats(session.id);
      assert.ok(stats.durationMs >= 0);
    });

    it('throws for nonexistent session', () => {
      assert.throws(() => mgr.getSessionStats('nonexistent'), /Session not found/);
    });
  });

  describe('List Sessions', { timeout: 10000 }, () => {
    it('lists all sessions', () => {
      const s1 = mgr.startSession('lyria');
      mgr.completeSession(s1.id);
      mgr.startSession('draconia');
      const all = mgr.listSessions();
      assert.equal(all.length, 2);
    });

    it('lists by status', () => {
      const s1 = mgr.startSession('lyria');
      mgr.completeSession(s1.id);
      mgr.startSession('draconia');
      assert.equal(mgr.listSessions('active').length, 1);
      assert.equal(mgr.listSessions('complete').length, 1);
    });

    it('returns empty when no sessions', () => {
      assert.equal(mgr.listSessions().length, 0);
    });

    it('lists paused sessions', () => {
      const s1 = mgr.startSession('lyria');
      mgr.pauseSession(s1.id);
      assert.equal(mgr.listSessions('paused').length, 1);
    });
  });

  describe('Events', { timeout: 10000 }, () => {
    it('emits session-started', () => {
      let emitted = null;
      mgr.on('session-started', (s) => { emitted = s; });
      const session = mgr.startSession('lyria');
      assert.ok(emitted);
      assert.equal(emitted.id, session.id);
    });

    it('emits session-completed', () => {
      let emitted = null;
      mgr.on('session-completed', (data) => { emitted = data; });
      const session = mgr.startSession('lyria');
      mgr.completeSession(session.id);
      assert.ok(emitted);
      assert.ok(emitted.session);
      assert.ok(emitted.summary);
    });

    it('emits asset-added', () => {
      let emitted = null;
      mgr.on('asset-added', (data) => { emitted = data; });
      const session = mgr.startSession('lyria');
      mgr.addAssetToSession(session.id, 'a1');
      assert.ok(emitted);
      assert.equal(emitted.assetId, 'a1');
    });

    it('emits session-paused', () => {
      let emitted = null;
      mgr.on('session-paused', (s) => { emitted = s; });
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      assert.ok(emitted);
    });

    it('emits session-resumed', () => {
      let emitted = null;
      mgr.on('session-resumed', (s) => { emitted = s; });
      const session = mgr.startSession('lyria');
      mgr.pauseSession(session.id);
      mgr.resumeSession(session.id);
      assert.ok(emitted);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// GUARDIAN CREATIVE DOMAINS
// ═══════════════════════════════════════════════════════════════════════════

describe('Guardian Creative Domains', { timeout: 10000 }, () => {
  const guardians = ['lyssandria', 'leyla', 'draconia', 'maylinn', 'alera', 'lyria', 'aiyami', 'elara', 'ino', 'shinkami'];

  it('all 10 Guardians have creative domains defined', () => {
    for (const g of guardians) {
      assert.ok(GUARDIAN_CREATIVE_DOMAINS[g], `Missing domains for ${g}`);
      assert.ok(GUARDIAN_CREATIVE_DOMAINS[g].length > 0, `Empty domains for ${g}`);
    }
  });

  it('lyssandria domains include architecture', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.lyssandria.includes('architecture'));
  });

  it('leyla domains include character emotion', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.leyla.includes('character emotion'));
  });

  it('draconia domains include action scenes', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.draconia.includes('action scenes'));
  });

  it('maylinn domains include healing imagery', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.maylinn.includes('healing imagery'));
  });

  it('alera domains include typography', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.alera.includes('typography'));
  });

  it('lyria domains include concept art', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.lyria.includes('concept art'));
  });

  it('aiyami domains include sacred geometry', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.aiyami.includes('sacred geometry'));
  });

  it('elara domains include impossible architecture', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.elara.includes('impossible architecture'));
  });

  it('ino domains include collaboration scenes', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.ino.includes('collaboration scenes'));
  });

  it('shinkami domains include meta-designs', () => {
    assert.ok(GUARDIAN_CREATIVE_DOMAINS.shinkami.includes('meta-designs'));
  });
});

describe('Element Aesthetics', { timeout: 10000 }, () => {
  const elements = ['Fire', 'Water', 'Earth', 'Wind', 'Void', 'Spirit'];

  it('all 6 elements have aesthetics defined', () => {
    for (const el of elements) {
      assert.ok(ELEMENT_AESTHETICS[el], `Missing aesthetics for ${el}`);
    }
  });

  it('each element has colors array', () => {
    for (const el of elements) {
      assert.ok(Array.isArray(ELEMENT_AESTHETICS[el].colors));
      assert.ok(ELEMENT_AESTHETICS[el].colors.length > 0);
    }
  });

  it('each element has particles', () => {
    for (const el of elements) {
      assert.ok(typeof ELEMENT_AESTHETICS[el].particles === 'string');
    }
  });

  it('each element has effect', () => {
    for (const el of elements) {
      assert.ok(typeof ELEMENT_AESTHETICS[el].effect === 'string');
    }
  });

  it('each element has description', () => {
    for (const el of elements) {
      assert.ok(typeof ELEMENT_AESTHETICS[el].description === 'string');
      assert.ok(ELEMENT_AESTHETICS[el].description.length > 10);
    }
  });

  it('Fire aesthetics include warm colors', () => {
    assert.ok(ELEMENT_AESTHETICS.Fire.colors.some(c => c.includes('gold') || c.includes('red')));
  });

  it('Water aesthetics include blue colors', () => {
    assert.ok(ELEMENT_AESTHETICS.Water.colors.some(c => c.includes('blue') || c.includes('silver')));
  });

  it('Void aesthetics include dark colors', () => {
    assert.ok(ELEMENT_AESTHETICS.Void.colors.some(c => c.includes('purple') || c.includes('black')));
  });

  it('Spirit aesthetics include light colors', () => {
    assert.ok(ELEMENT_AESTHETICS.Spirit.colors.some(c => c.includes('gold') || c.includes('white')));
  });
});

describe('Guardian Frequencies', { timeout: 10000 }, () => {
  it('all 10 Guardians have frequencies', () => {
    const guardians = ['lyssandria', 'leyla', 'draconia', 'maylinn', 'alera', 'lyria', 'aiyami', 'elara', 'ino', 'shinkami'];
    for (const g of guardians) {
      assert.ok(GUARDIAN_FREQUENCIES[g] > 0, `Missing frequency for ${g}`);
    }
  });

  it('uses canonical extended solfeggio frequencies', () => {
    assert.equal(GUARDIAN_FREQUENCIES.lyssandria, 174);
    assert.equal(GUARDIAN_FREQUENCIES.leyla, 285);
    assert.equal(GUARDIAN_FREQUENCIES.draconia, 396);
    assert.equal(GUARDIAN_FREQUENCIES.maylinn, 417);
    assert.equal(GUARDIAN_FREQUENCIES.alera, 528);
    assert.equal(GUARDIAN_FREQUENCIES.lyria, 639);
    assert.equal(GUARDIAN_FREQUENCIES.aiyami, 741);
    assert.equal(GUARDIAN_FREQUENCIES.elara, 852);
    assert.equal(GUARDIAN_FREQUENCIES.ino, 963);
    assert.equal(GUARDIAN_FREQUENCIES.shinkami, 1111);
  });
});

describe('Image Models', { timeout: 10000 }, () => {
  it('primary model is gemini-3-pro-image-preview', () => {
    assert.equal(IMAGE_MODELS.primary, 'gemini-3-pro-image-preview');
  });

  it('fast model is gemini-2.5-flash-image', () => {
    assert.equal(IMAGE_MODELS.fast, 'gemini-2.5-flash-image');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRATION TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe('Integration', { timeout: 10000 }, () => {
  it('full creative flow: session → prompt → asset → curate → complete', () => {
    const engine = new PromptEngine();
    const vault = new AssetVault();
    const curator = new Curator();
    const sessionMgr = new CreativeSessionManager();

    // 1. Start session
    const session = sessionMgr.startSession('lyria', 'Sight', 'Water');
    assert.equal(session.status, 'active');

    // 2. Generate prompt
    const prompt = engine.generateForGuardian('lyria', 'image', { mood: 'mystical' });
    sessionMgr.addPromptToSession(session.id, prompt.templateId);

    // 3. Store asset
    const asset = vault.store({
      type: 'image',
      name: 'Lyria Vision',
      description: 'A mystical vision of Lyria with prophetic imagery and water crystal refractions',
      content: prompt.prompt,
      tags: ['guardian', 'lyria', 'water', 'vision', 'cosmic'],
      guardianId: 'lyria',
      gate: 'Sight',
      element: 'Water',
      promptUsed: prompt.prompt,
      model: 'gemini-3-pro-image-preview',
      metadata: { style: 'fantasy', resolution: '4k' },
    });
    sessionMgr.addAssetToSession(session.id, asset.id);

    // 4. Curate
    const curation = curator.evaluate(asset);
    assert.ok(curation.scores.overall > 0);
    assert.ok(curation.approved);

    // 5. Complete session
    const { summary } = sessionMgr.completeSession(session.id);
    assert.equal(summary.assetsCreated, 1);
    assert.equal(summary.promptsUsed, 1);
  });

  it('variation chain: create → vary → vary', () => {
    const vault = new AssetVault();

    const original = vault.store({
      type: 'image',
      name: 'Original Design',
      description: 'The original concept',
      content: 'original content',
      tags: ['original'],
    });

    const v1 = vault.createVariation(original.id, { name: 'Variation 1', description: 'First remix' });
    const v2 = vault.createVariation(original.id, { name: 'Variation 2', description: 'Second remix' });
    const v1a = vault.createVariation(v1.id, { name: 'Sub-variation', description: 'Remix of remix' });

    assert.equal(vault.getVariations(original.id).length, 2);
    assert.equal(vault.getVariations(v1.id).length, 1);
    assert.equal(v1a.parentId, v1.id);
  });

  it('Guardian-specific creative routing', () => {
    const engine = new PromptEngine();

    // Each Guardian should produce different prompts
    const lyriaPrompt = engine.generateForGuardian('lyria', 'image');
    const draconiaPrompt = engine.generateForGuardian('draconia', 'image');

    assert.notEqual(lyriaPrompt.prompt, draconiaPrompt.prompt);
    assert.equal(lyriaPrompt.context.guardianId, 'lyria');
    assert.equal(draconiaPrompt.context.guardianId, 'draconia');
  });

  it('curate multiple assets from same session', () => {
    const vault = new AssetVault();
    const curator = new Curator();

    const assets = [];
    for (let i = 0; i < 5; i++) {
      assets.push(vault.store({
        type: 'image',
        name: `Asset ${i}`,
        description: `Detailed description for asset number ${i} with Guardian alignment and cosmic themes`,
        content: 'x'.repeat(200),
        tags: ['guardian', 'cosmic', 'arcanea'],
        guardianId: 'lyria',
        element: 'Water',
        gate: 'Sight',
      }));
    }

    const results = curator.batchEvaluate(assets);
    assert.equal(results.length, 5);
    assert.ok(curator.getStats().evaluated === 5);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// EDGE CASES
// ═══════════════════════════════════════════════════════════════════════════

describe('Edge Cases', { timeout: 10000 }, () => {
  it('empty template variables produce valid prompt', () => {
    const engine = new PromptEngine();
    const result = engine.generate('img-character-humanoid', {});
    assert.ok(typeof result.prompt === 'string');
    assert.ok(result.prompt.length > 0);
  });

  it('unknown template ID throws', () => {
    const engine = new PromptEngine();
    assert.throws(() => engine.generate('totally-fake-id', {}), /Template not found/);
  });

  it('store asset without guardianId', () => {
    const vault = new AssetVault();
    const asset = vault.store({
      type: 'text',
      name: 'Unguarded',
      description: 'No guardian',
      content: 'just text',
      tags: ['misc'],
    });
    assert.ok(asset.id);
    assert.equal(asset.guardianId, undefined);
  });

  it('store asset without element', () => {
    const vault = new AssetVault();
    const asset = vault.store({
      type: 'text',
      name: 'No element',
      description: 'desc',
      content: 'x',
      tags: [],
    });
    assert.equal(asset.element, undefined);
  });

  it('duplicate tags are stored as-is', () => {
    const vault = new AssetVault();
    const asset = vault.store({
      type: 'text',
      name: 'Dupes',
      description: 'desc',
      content: 'x',
      tags: ['fire', 'fire', 'fire'],
    });
    assert.equal(asset.tags.length, 3);
  });

  it('very long content is stored', () => {
    const vault = new AssetVault();
    const longContent = 'A'.repeat(100000);
    const asset = vault.store({
      type: 'text',
      name: 'Long',
      description: 'Very long content',
      content: longContent,
      tags: [],
    });
    assert.equal(asset.content.length, 100000);
  });

  it('session already active error message', () => {
    const mgr = new CreativeSessionManager();
    mgr.startSession('lyria');
    try {
      mgr.startSession('draconia');
      assert.fail('Should have thrown');
    } catch (e) {
      assert.ok(e.message.includes('already active'));
    }
  });

  it('delete nonexistent asset throws', () => {
    const vault = new AssetVault();
    assert.throws(() => vault.delete('no-such-id'), /Asset not found/);
  });

  it('update nonexistent asset throws', () => {
    const vault = new AssetVault();
    assert.throws(() => vault.update('no-such-id', { name: 'x' }), /Asset not found/);
  });

  it('export nonexistent asset throws', () => {
    const vault = new AssetVault();
    assert.throws(() => vault.export('no-such-id'), /Asset not found/);
  });

  it('createVariation of nonexistent parent throws', () => {
    const vault = new AssetVault();
    assert.throws(() => vault.createVariation('no-such-id', {}), /Parent asset not found/);
  });

  it('buildImagePrompt with no context', () => {
    const engine = new PromptEngine();
    const prompt = engine.buildImagePrompt('a simple subject');
    assert.ok(prompt.includes('simple subject'));
    assert.ok(prompt.includes('Arcanean'));
  });

  it('buildScenePrompt with no element', () => {
    const engine = new PromptEngine();
    const prompt = engine.buildScenePrompt('a forest', ['Hero'], 'peaceful');
    assert.ok(prompt.includes('forest'));
    assert.ok(prompt.includes('Hero'));
  });

  it('buildCharacterPrompt with unknown element', () => {
    const engine = new PromptEngine();
    const prompt = engine.buildCharacterPrompt('Unknown', 'Plasma');
    assert.ok(prompt.includes('Unknown'));
    // Should not crash
  });

  it('curator handles asset with no content', () => {
    const curator = new Curator();
    const result = curator.evaluate({
      id: 'empty',
      type: 'text',
      name: 'Empty',
      description: '',
      content: '',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    assert.ok(result.scores.overall >= 0);
  });

  it('session getStats after completion uses completedAt', () => {
    const mgr = new CreativeSessionManager();
    const session = mgr.startSession('lyria');
    mgr.completeSession(session.id);
    const stats = mgr.getSessionStats(session.id);
    assert.ok(stats.durationMs >= 0);
    assert.equal(stats.status, 'complete');
  });

  it('multiple completed sessions can coexist', () => {
    const mgr = new CreativeSessionManager();
    const s1 = mgr.startSession('lyria');
    mgr.completeSession(s1.id);
    const s2 = mgr.startSession('draconia');
    mgr.completeSession(s2.id);
    const s3 = mgr.startSession('aiyami');
    mgr.completeSession(s3.id);
    assert.equal(mgr.listSessions('complete').length, 3);
  });

  it('guardian gates are canonical', () => {
    assert.equal(GUARDIAN_GATES.lyssandria, 'Foundation');
    assert.equal(GUARDIAN_GATES.leyla, 'Flow');
    assert.equal(GUARDIAN_GATES.draconia, 'Fire');
    assert.equal(GUARDIAN_GATES.maylinn, 'Heart');
    assert.equal(GUARDIAN_GATES.alera, 'Voice');
    assert.equal(GUARDIAN_GATES.lyria, 'Sight');
    assert.equal(GUARDIAN_GATES.aiyami, 'Crown');
    assert.equal(GUARDIAN_GATES.elara, 'Shift');
    assert.equal(GUARDIAN_GATES.ino, 'Unity');
    assert.equal(GUARDIAN_GATES.shinkami, 'Source');
  });

  it('guardian elements are mapped', () => {
    assert.equal(GUARDIAN_ELEMENTS.lyssandria, 'Earth');
    assert.equal(GUARDIAN_ELEMENTS.leyla, 'Water');
    assert.equal(GUARDIAN_ELEMENTS.draconia, 'Fire');
    assert.equal(GUARDIAN_ELEMENTS.shinkami, 'Void');
  });
});
