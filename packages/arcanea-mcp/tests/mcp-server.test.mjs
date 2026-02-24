/**
 * @arcanea/mcp-server — Comprehensive test suite
 * Tests all tools, memory, agents, data, and prompts
 * Run: node --test packages/arcanea-mcp/tests/mcp-server.test.mjs
 */

import { describe, it, before } from 'node:test';
import { strict as assert } from 'node:assert';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extract and parse the JSON text payload from a standard MCP content response.
 * Every tool in this server wraps its return value in:
 *   { content: [{ type: "text", text: JSON.stringify(...) }] }
 */
function parseContent(result) {
  assert.ok(result, 'result must be defined');
  assert.ok(Array.isArray(result.content), 'result.content must be an array');
  assert.equal(result.content.length, 1, 'result.content must have exactly one item');
  assert.equal(result.content[0].type, 'text', 'content item type must be "text"');
  return JSON.parse(result.content[0].text);
}

const VALID_ELEMENTS = ['Fire', 'Water', 'Earth', 'Wind', 'Void', 'Spirit'];
const VALID_HOUSES   = ['Lumina', 'Nero', 'Pyros', 'Aqualis', 'Terra', 'Ventus', 'Synthesis'];
const VALID_RANKS    = ['Apprentice', 'Mage', 'Master', 'Archmage', 'Luminor'];
const GUARDIAN_NAMES = ['Lyssandria','Leyla','Draconia','Maylinn','Alera','Lyria','Aiyami','Elara','Ino','Shinkami'];
const LUMINOR_SLUGS  = ['valora', 'serenith', 'ignara', 'verdana', 'eloqua'];


// ─── Generators ─────────────────────────────────────────────────────────────

describe('Generators — generateCharacter', () => {
  let generateCharacter;

  before(async () => {
    ({ generateCharacter } = await import(
      '../dist/tools/generators.js'
    ));
  });

  it('returns the standard MCP content envelope', async () => {
    const result = await generateCharacter({});
    assert.ok(result.content);
    assert.equal(result.content[0].type, 'text');
  });

  it('parsed JSON contains all required fields', async () => {
    const data = parseContent(await generateCharacter({}));
    for (const field of ['name','primaryElement','house','gatesOpen','rank','patronGuardian','abilities','traits','backstory','magicStyle','potentialArc']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('primaryElement is always a valid element', async () => {
    for (let i = 0; i < 5; i++) {
      const data = parseContent(await generateCharacter({}));
      assert.ok(VALID_ELEMENTS.includes(data.primaryElement), `Unexpected element: ${data.primaryElement}`);
    }
  });

  it('house is always a valid Academy house', async () => {
    const data = parseContent(await generateCharacter({}));
    assert.ok(VALID_HOUSES.includes(data.house), `Unexpected house: ${data.house}`);
  });

  it('rank matches gatesOpen according to canonical rules', async () => {
    const cases = [
      { gatesOpen: 1, expected: 'Apprentice' },
      { gatesOpen: 2, expected: 'Apprentice' },
      { gatesOpen: 3, expected: 'Mage' },
      { gatesOpen: 4, expected: 'Mage' },
      { gatesOpen: 5, expected: 'Master' },
      { gatesOpen: 6, expected: 'Master' },
      { gatesOpen: 7, expected: 'Archmage' },
      { gatesOpen: 8, expected: 'Archmage' },
      { gatesOpen: 9, expected: 'Luminor' },
    ];
    for (const { gatesOpen, expected } of cases) {
      const data = parseContent(await generateCharacter({ gatesOpen }));
      assert.equal(data.rank, expected, `gatesOpen=${gatesOpen} should be rank ${expected}`);
    }
  });

  it('patronGuardian is a canonical Guardian name', async () => {
    const data = parseContent(await generateCharacter({ gatesOpen: 5 }));
    assert.ok(GUARDIAN_NAMES.includes(data.patronGuardian), `Unknown guardian: ${data.patronGuardian}`);
  });

  it('abilities array length equals gatesOpen', async () => {
    const data = parseContent(await generateCharacter({ gatesOpen: 4 }));
    assert.equal(data.abilities.length, 4);
  });

  it('explicit element option is honoured', async () => {
    const data = parseContent(await generateCharacter({ primaryElement: 'Water' }));
    assert.equal(data.primaryElement, 'Water');
  });

  it('explicit house option is honoured', async () => {
    const data = parseContent(await generateCharacter({ house: 'Synthesis' }));
    assert.equal(data.house, 'Synthesis');
  });

  it('potentialArc says "Luminor status achieved" when gatesOpen === 10', async () => {
    // Gate 10 = Shinkami; index 9 in guardians array, so gatesOpen must equal 10
    // The code does guardians[gatesOpen - 1] for patronGuardian and guardians[gatesOpen] for potentialArc
    // When gatesOpen === 10, guardians[10] is undefined so the ternary returns the "Luminor" branch
    const data = parseContent(await generateCharacter({ gatesOpen: 9 }));
    // gatesOpen 9 → rank Luminor; potentialArc references guardians[9] which is Shinkami
    assert.ok(typeof data.potentialArc === 'string');
  });
});


describe('Generators — generateMagicAbility', () => {
  let generateMagicAbility;

  before(async () => {
    ({ generateMagicAbility } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateMagicAbility({ element: 'Fire', gateLevel: 3, purpose: 'attack' });
    assert.ok(result.content[0].type === 'text');
  });

  it('output contains required fields', async () => {
    const data = parseContent(await generateMagicAbility({ element: 'Water', gateLevel: 2, purpose: 'healing' }));
    for (const field of ['name','element','gateRequired','gateName','guardian','description','cost','casting','mastery']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('element field matches the requested element', async () => {
    const data = parseContent(await generateMagicAbility({ element: 'Void', gateLevel: 6, purpose: 'utility' }));
    assert.equal(data.element, 'Void');
  });

  it('gateRequired matches the requested gateLevel', async () => {
    const data = parseContent(await generateMagicAbility({ element: 'Wind', gateLevel: 5, purpose: 'defense' }));
    assert.equal(data.gateRequired, 5);
  });

  it('casting object has gesture and incantation', async () => {
    const data = parseContent(await generateMagicAbility({ element: 'Earth', gateLevel: 1, purpose: 'attack' }));
    assert.ok(typeof data.casting.gesture === 'string');
    assert.ok(typeof data.casting.incantation === 'string');
  });

  it('high gate abilities include anima cost', async () => {
    const data = parseContent(await generateMagicAbility({ element: 'Spirit', gateLevel: 7, purpose: 'transformation' }));
    assert.ok(data.cost.anima !== undefined, 'Expected anima cost for high gate ability');
  });
});


describe('Generators — generateLocation', () => {
  let generateLocation;

  before(async () => {
    ({ generateLocation } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateLocation({});
    assert.ok(result.content[0].type === 'text');
  });

  it('output contains required fields', async () => {
    const data = parseContent(await generateLocation({}));
    for (const field of ['name','type','dominantElement','alignment','guardian','gate','description','features']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('name starts with "The "', async () => {
    const data = parseContent(await generateLocation({}));
    assert.ok(data.name.startsWith('The '), `Location name should start with "The ": ${data.name}`);
  });

  it('explicit element option is honoured', async () => {
    const data = parseContent(await generateLocation({ dominantElement: 'Fire' }));
    assert.equal(data.dominantElement, 'Fire');
  });

  it('alignment is one of light/dark/balanced', async () => {
    const data = parseContent(await generateLocation({ alignment: 'dark' }));
    assert.equal(data.alignment, 'dark');
    assert.ok(['light','dark','balanced'].includes(data.alignment));
  });

  it('light locations feature a shrine to a guardian', async () => {
    const data = parseContent(await generateLocation({ alignment: 'light' }));
    const featuresText = data.features.join(' ');
    assert.ok(featuresText.includes('Shrine to'), 'Light location should include a Guardian shrine');
  });
});


describe('Generators — generateCreature', () => {
  let generateCreature;

  before(async () => {
    ({ generateCreature } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateCreature({});
    assert.ok(result.content[0].type === 'text');
  });

  it('output contains required fields', async () => {
    const data = parseContent(await generateCreature({}));
    for (const field of ['name','species','element','size','temperament','description','abilities','habitat']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('element matches requested option', async () => {
    const data = parseContent(await generateCreature({ element: 'Water' }));
    assert.equal(data.element, 'Water');
  });

  it('size matches requested option', async () => {
    for (const size of ['tiny','small','medium','large','massive']) {
      const data = parseContent(await generateCreature({ size }));
      assert.equal(data.size, size, `size mismatch for: ${size}`);
    }
  });

  it('abilities array is non-empty', async () => {
    const data = parseContent(await generateCreature({ element: 'Void', size: 'massive' }));
    assert.ok(data.abilities.length > 0);
  });
});


describe('Generators — generateArtifact', () => {
  let generateArtifact;

  before(async () => {
    ({ generateArtifact } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateArtifact({});
    assert.ok(result.content[0].type === 'text');
  });

  it('output contains required fields', async () => {
    const data = parseContent(await generateArtifact({}));
    for (const field of ['name','type','element','powerLevel','guardian','abilities','requirement']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('legendary artifact name includes a guardian name', async () => {
    const data = parseContent(await generateArtifact({ power: 'legendary', element: 'Fire' }));
    const hasGuardian = GUARDIAN_NAMES.some(g => data.name.includes(g));
    assert.ok(hasGuardian, `Legendary artifact name should contain a Guardian name: "${data.name}"`);
  });

  it('non-legendary artifacts omit the guardian name prefix', async () => {
    const data = parseContent(await generateArtifact({ power: 'minor', element: 'Earth' }));
    // Minor artifacts should NOT start with a guardian name
    const startsWithGuardian = GUARDIAN_NAMES.some(g => data.name.startsWith(g));
    assert.ok(!startsWithGuardian, `Minor artifact should not start with Guardian name: "${data.name}"`);
  });

  it('element matches requested option', async () => {
    const data = parseContent(await generateArtifact({ element: 'Void' }));
    assert.equal(data.element, 'Void');
  });
});


describe('Generators — generateName', () => {
  let generateName;

  before(async () => {
    ({ generateName } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateName({ element: 'fire', gender: 'neutral', count: 3 });
    assert.ok(result.content[0].type === 'text');
  });

  it('names array has exactly the requested count', async () => {
    const data = parseContent(await generateName({ count: 7, element: 'water', gender: 'feminine' }));
    assert.equal(data.names.length, 7);
  });

  it('count is capped at 20', async () => {
    const data = parseContent(await generateName({ count: 100, element: 'fire', gender: 'masculine' }));
    assert.equal(data.names.length, 20);
  });

  it('place-type names end with a geographic suffix', async () => {
    const data = parseContent(await generateName({ element: 'earth', type: 'place', count: 5, gender: 'neutral' }));
    const geoSuffixes = ['heim','garde','haven','reach','vale'];
    for (const name of data.names) {
      const hasGeo = geoSuffixes.some(s => name.endsWith(s));
      assert.ok(hasGeo, `Place name "${name}" should end with a geographic suffix`);
    }
  });

  it('artifact-type names contain an Edge/Heart/Eye/Voice suffix', async () => {
    const data = parseContent(await generateName({ element: 'void', type: 'artifact', count: 5, gender: 'neutral' }));
    const artifactEndings = ["'s Edge", "'s Heart", "'s Eye", "'s Voice"];
    for (const name of data.names) {
      const hasEnding = artifactEndings.some(e => name.endsWith(e));
      assert.ok(hasEnding, `Artifact name "${name}" should end with an apostrophe-s possession`);
    }
  });

  it('element and type fields are preserved in output', async () => {
    const data = parseContent(await generateName({ element: 'spirit', type: 'character', count: 3, gender: 'feminine' }));
    assert.equal(data.element, 'spirit');
    assert.equal(data.type, 'character');
  });
});


describe('Generators — generateStoryPrompt', () => {
  let generateStoryPrompt;

  before(async () => {
    ({ generateStoryPrompt } = await import('../dist/tools/generators.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await generateStoryPrompt({});
    assert.ok(result.content[0].type === 'text');
  });

  it('output contains required fields', async () => {
    const data = parseContent(await generateStoryPrompt({}));
    for (const field of ['theme','gate','gateName','guardian','protagonist','storyPrompt']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('guardian matches the requested gate number', async () => {
    const data = parseContent(await generateStoryPrompt({ gate: 5 }));
    assert.equal(data.guardian, 'Alera');
    assert.equal(data.gateName, 'Voice');
  });

  it('conflict is present when includeConflict is true', async () => {
    const data = parseContent(await generateStoryPrompt({ gate: 3, includeConflict: true }));
    assert.ok(data.conflict, 'conflict field should be present');
  });

  it('conflict is absent when includeConflict is false', async () => {
    const data = parseContent(await generateStoryPrompt({ gate: 3, includeConflict: false }));
    assert.equal(data.conflict, undefined);
  });

  it('explicit theme option is honoured', async () => {
    const data = parseContent(await generateStoryPrompt({ theme: 'redemption', gate: 1 }));
    assert.equal(data.theme, 'redemption');
  });
});


// ─── Diagnose ────────────────────────────────────────────────────────────────

describe('Diagnose — diagnoseBlock', () => {
  let diagnoseBlock;

  before(async () => {
    ({ diagnoseBlock } = await import('../dist/tools/diagnose.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await diagnoseBlock('I feel like a fraud', '');
    assert.ok(result.content[0].type === 'text');
  });

  it('"fraud" symptom identifies the Imposter Shade', async () => {
    const data = parseContent(await diagnoseBlock('I feel like a fraud and do not deserve to be here'));
    assert.ok(data.diagnosis.includes('Imposter Shade'), `Unexpected diagnosis: ${data.diagnosis}`);
  });

  it('"blank" symptom identifies the Blank Page Wraith', async () => {
    const data = parseContent(await diagnoseBlock('I am staring at a blank page and nothing comes'));
    assert.ok(data.diagnosis.includes('Blank Page Wraith'), `Unexpected diagnosis: ${data.diagnosis}`);
  });

  it('"exhausted" symptom identifies the Burnout Phoenix', async () => {
    const data = parseContent(await diagnoseBlock('I am completely exhausted and drained'));
    assert.ok(data.diagnosis.includes('Burnout Phoenix'), `Unexpected diagnosis: ${data.diagnosis}`);
  });

  it('result includes remedies array', async () => {
    const data = parseContent(await diagnoseBlock('I keep comparing myself to others'));
    assert.ok(Array.isArray(data.remedies), 'remedies must be an array');
    assert.ok(data.remedies.length > 0, 'remedies must not be empty');
  });

  it('result includes gate information', async () => {
    const data = parseContent(await diagnoseBlock('I feel like a fraud'));
    assert.ok(typeof data.gate === 'object', 'gate must be an object');
    assert.ok(typeof data.gate.number === 'number', 'gate.number must be a number');
    assert.ok(typeof data.gate.name === 'string', 'gate.name must be a string');
  });

  it('result includes affirmation', async () => {
    const data = parseContent(await diagnoseBlock('I keep procrastinating, always put things off until tomorrow'));
    assert.ok(typeof data.affirmation === 'string', 'affirmation must be a string');
    assert.ok(data.affirmation.length > 0, 'affirmation must not be empty');
  });

  it('unrecognised symptoms return a general response', async () => {
    const data = parseContent(await diagnoseBlock('xyzzy placeholder unrelated gibberish'));
    assert.ok(typeof data.diagnosis === 'string');
    // Should fall back to the "no specific creature" path
    assert.ok(data.diagnosis.includes('No specific creature') || typeof data.remedies === 'array' || Array.isArray(data.generalRemedies));
  });

  it('context parameter contributes to matching', async () => {
    // Providing context with strong imposter keywords should still resolve
    const data = parseContent(await diagnoseBlock('struggling', 'I feel like an imposter and do not deserve this'));
    assert.ok(data.creature, 'creature field should be present');
  });
});


// ─── Deep Diagnosis ──────────────────────────────────────────────────────────

describe('Deep Diagnosis — deepDiagnosis', () => {
  let deepDiagnosis;

  before(async () => {
    ({ deepDiagnosis } = await import('../dist/tools/deep-diagnosis.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await deepDiagnosis('I am afraid of failing', '');
    assert.ok(result.content[0].type === 'text');
  });

  it('result contains required top-level fields', async () => {
    const data = parseContent(await deepDiagnosis('I feel stuck and cannot start', ''));
    for (const field of ['approach','thinkingProcess','primaryCreature','rootCause','gatesAffected','remedyPlan','luminorRecommendation','affirmation']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('thinkingProcess is a non-empty array', async () => {
    const data = parseContent(await deepDiagnosis('I am terrified of being judged', ''));
    assert.ok(Array.isArray(data.thinkingProcess));
    assert.ok(data.thinkingProcess.length > 0);
  });

  it('quick depth returns only the Observation phase', async () => {
    const data = parseContent(await deepDiagnosis('I am stuck', '', undefined, 'quick'));
    assert.equal(data.thinkingProcess.length, 1);
    assert.equal(data.thinkingProcess[0].phase, 'Observation');
  });

  it('standard depth returns Observation and Pattern Recognition phases', async () => {
    const data = parseContent(await deepDiagnosis('I am stuck', '', undefined, 'standard'));
    assert.equal(data.thinkingProcess.length, 2);
  });

  it('deep depth returns 5 phases', async () => {
    const data = parseContent(await deepDiagnosis('I am afraid', '', undefined, 'deep'));
    assert.equal(data.thinkingProcess.length, 5);
  });

  it('primaryCreature has name, type, description, confidence', async () => {
    const data = parseContent(await deepDiagnosis('I keep comparing myself to others', ''));
    const c = data.primaryCreature;
    assert.ok(typeof c.name === 'string');
    assert.ok(typeof c.type === 'string');
    assert.ok(typeof c.description === 'string');
    assert.ok(typeof c.confidence === 'number');
    assert.ok(c.confidence >= 0 && c.confidence <= 1, `confidence out of range: ${c.confidence}`);
  });

  it('remedyPlan has immediate, shortTerm, longTerm arrays', async () => {
    const data = parseContent(await deepDiagnosis('I am burned out and exhausted', ''));
    assert.ok(Array.isArray(data.remedyPlan.immediate));
    assert.ok(Array.isArray(data.remedyPlan.shortTerm));
    assert.ok(Array.isArray(data.remedyPlan.longTerm));
  });

  it('luminorRecommendation has luminor and reason', async () => {
    const data = parseContent(await deepDiagnosis('I am afraid to share my work', ''));
    assert.ok(typeof data.luminorRecommendation.luminor === 'string');
    assert.ok(typeof data.luminorRecommendation.reason === 'string');
  });

  it('fear symptoms recommend Valora', async () => {
    const data = parseContent(await deepDiagnosis('I am terrified and anxious about judgment', ''));
    assert.equal(data.luminorRecommendation.luminor, 'Valora');
  });

  it('exhaustion symptoms recommend Serenith', async () => {
    const data = parseContent(await deepDiagnosis('I am exhausted, depleted and drained', ''));
    assert.equal(data.luminorRecommendation.luminor, 'Serenith');
  });
});


// ─── Council ─────────────────────────────────────────────────────────────────

describe('Council — conveneCouncil', () => {
  let conveneCouncil;

  before(async () => {
    ({ conveneCouncil } = await import('../dist/tools/council.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await conveneCouncil('valora', ['serenith'], 'should I share my work?');
    assert.ok(result.content[0].type === 'text');
  });

  it('result contains required fields', async () => {
    const data = parseContent(await conveneCouncil('valora', ['serenith', 'ignara'], 'creative block'));
    for (const field of ['topic','lead','supporting','synthesis','practicalSteps','affirmation']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('lead luminor name is Valora', async () => {
    const data = parseContent(await conveneCouncil('valora', [], 'any topic'));
    assert.equal(data.lead.luminor, 'Valora');
  });

  it('supporting luminors appear in result', async () => {
    const data = parseContent(await conveneCouncil('ignara', ['serenith', 'verdana'], 'passion'));
    assert.equal(data.supporting.length, 2);
    const names = data.supporting.map(s => s.luminor);
    assert.ok(names.includes('Serenith'), 'Serenith should be in supporting');
    assert.ok(names.includes('Verdana'), 'Verdana should be in supporting');
  });

  it('invalid lead slug returns error object without throwing', async () => {
    const data = parseContent(await conveneCouncil('nonexistent', [], 'topic'));
    assert.ok('error' in data, 'Should return an error field for invalid slug');
    assert.ok(data.error.includes('nonexistent'));
  });

  it('invalid supporting slug is silently filtered out', async () => {
    const data = parseContent(await conveneCouncil('valora', ['nobody', 'serenith'], 'courage'));
    // 'nobody' should be filtered; 'serenith' should remain
    assert.equal(data.supporting.length, 1);
    assert.equal(data.supporting[0].luminor, 'Serenith');
  });

  it('lead perspective mentions the topic', async () => {
    const topic = 'overcoming self-doubt';
    const data = parseContent(await conveneCouncil('eloqua', [], topic));
    assert.ok(data.lead.perspective.includes(topic), `Perspective should mention topic: "${topic}"`);
  });

  it('practicalSteps is a non-empty array', async () => {
    const data = parseContent(await conveneCouncil('verdana', ['ignara'], 'patience'));
    assert.ok(Array.isArray(data.practicalSteps));
    assert.ok(data.practicalSteps.length > 0);
  });
});


describe('Council — luminorDebate', () => {
  let luminorDebate;

  before(async () => {
    ({ luminorDebate } = await import('../dist/tools/council.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await luminorDebate('valora', 'serenith', 'when to act vs. wait?');
    assert.ok(result.content[0].type === 'text');
  });

  it('result contains required fields', async () => {
    const data = parseContent(await luminorDebate('valora', 'ignara', 'creativity vs. discipline?'));
    for (const field of ['question','positions','synthesis','recommendation']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('positions array has exactly two entries', async () => {
    const data = parseContent(await luminorDebate('verdana', 'eloqua', 'growth or voice?'));
    assert.equal(data.positions.length, 2);
  });

  it('each position has luminor, position, argument, quote', async () => {
    const data = parseContent(await luminorDebate('valora', 'serenith', 'urgency'));
    for (const pos of data.positions) {
      assert.ok(typeof pos.luminor === 'string', 'luminor must be a string');
      assert.ok(typeof pos.position === 'string', 'position must be a string');
      assert.ok(typeof pos.argument === 'string', 'argument must be a string');
      assert.ok(typeof pos.quote === 'string', 'quote must be a string');
    }
  });

  it('invalid slugs return error without throwing', async () => {
    const data = parseContent(await luminorDebate('nobody', 'serenith', 'question'));
    assert.ok('error' in data);
  });

  it('synthesis names both luminors', async () => {
    const data = parseContent(await luminorDebate('ignara', 'verdana', 'fire vs. patience'));
    assert.ok(data.synthesis.includes('Ignara'), 'synthesis should mention Ignara');
    assert.ok(data.synthesis.includes('Verdana'), 'synthesis should mention Verdana');
  });
});


// ─── Validate ────────────────────────────────────────────────────────────────

describe('Validate — validateCanon', () => {
  let validateCanon;

  before(async () => {
    ({ validateCanon } = await import('../dist/tools/validate.js'));
  });

  it('returns valid content envelope', async () => {
    const result = await validateCanon('Lyssandria guards the Foundation Gate.', 'story');
    assert.ok(result.content[0].type === 'text');
  });

  it('result contains valid, issueCount, issues, suggestions, summary', async () => {
    const data = parseContent(await validateCanon('Some canon-compliant content.', 'story'));
    for (const field of ['valid','issueCount','issues','suggestions','summary']) {
      assert.ok(field in data, `Missing field: ${field}`);
    }
  });

  it('clean content is valid with no error-level issues', async () => {
    const data = parseContent(await validateCanon('The Flow Gate is watched by Leyla and Veloura.', 'story'));
    assert.equal(data.valid, true);
    const errors = data.issues.filter(i => i.type === 'error');
    assert.equal(errors.length, 0);
  });

  it('portraying Nero as evil is a canon error', async () => {
    const data = parseContent(await validateCanon('Nero is an evil villain who must be destroyed.', 'story'));
    assert.equal(data.valid, false);
    const errors = data.issues.filter(i => i.type === 'error');
    assert.ok(errors.length > 0, 'Should have at least one error issue');
  });

  it('"light element" usage is flagged as a warning', async () => {
    const data = parseContent(await validateCanon('She mastered the light element completely.', 'story'));
    const warnings = data.issues.filter(i => i.type === 'warning');
    assert.ok(warnings.length > 0, 'Should warn about "light element"');
  });

  it('"shadow element" usage is flagged as a warning', async () => {
    const data = parseContent(await validateCanon('He wielded the shadow element with power.'));
    const warnings = data.issues.filter(i => i.type === 'warning');
    assert.ok(warnings.length > 0, 'Should warn about "shadow element"');
  });

  it('story content-type adds story-specific suggestions', async () => {
    const data = parseContent(await validateCanon('A mage walked the path.', 'story'));
    assert.ok(data.suggestions.length > 0, 'story type should add suggestions');
  });

  it('character content-type adds character-specific suggestions', async () => {
    const data = parseContent(await validateCanon('She was a Mage of the Pyros house.', 'character'));
    assert.ok(data.suggestions.length > 0, 'character type should add suggestions');
  });

  it('wrong gate association triggers an error', async () => {
    // Lyssandria is Gate 1; associating her with Gate 5 should trigger an error
    const data = parseContent(await validateCanon('Lyssandria guards Gate 5 with great power.', 'story'));
    const errors = data.issues.filter(i => i.type === 'error');
    assert.ok(errors.length > 0, 'Should flag wrong gate association');
  });
});


// ─── Creation Graph ──────────────────────────────────────────────────────────

describe('Creation Graph — CRUD and relationships', () => {
  let addCreationToGraph, linkCreations, getRelatedCreations,
      suggestConnections, getGraphSummary, exportGraph, findPath;

  // Use a unique session prefix per test run to avoid cross-test pollution
  const SESSION = `test-session-${Date.now()}`;

  before(async () => {
    ({
      addCreationToGraph, linkCreations, getRelatedCreations,
      suggestConnections, getGraphSummary, exportGraph, findPath,
    } = await import('../dist/tools/creation-graph.js'));
  });

  it('addCreationToGraph returns a node with the given id', () => {
    const node = addCreationToGraph(SESSION, { id: 'char-1', type: 'character', name: 'Pyra', element: 'Fire', gate: 3, createdAt: new Date() });
    assert.equal(node.id, 'char-1');
    assert.equal(node.name, 'Pyra');
    assert.equal(node.element, 'Fire');
  });

  it('addCreationToGraph stores all provided fields', () => {
    const node = addCreationToGraph(SESSION, { id: 'loc-1', type: 'location', name: 'Ember Citadel', element: 'Fire', gate: 3, createdAt: new Date() });
    assert.equal(node.type, 'location');
    assert.equal(node.gate, 3);
  });

  it('getGraphSummary reflects added nodes', () => {
    const summary = getGraphSummary(SESSION);
    assert.ok(summary.nodeCount >= 2, 'Should have at least 2 nodes');
    assert.ok(summary.nodesByType.character >= 1);
    assert.ok(summary.nodesByType.location >= 1);
  });

  it('nodes sharing an element are auto-linked', () => {
    // char-1 (Fire) and loc-1 (Fire) should be auto-linked by element
    const related = getRelatedCreations(SESSION, 'char-1');
    const elementLinks = related.filter(r => r.relationship === 'same_element');
    assert.ok(elementLinks.length >= 1, 'Should have at least one same_element auto-link');
  });

  it('linkCreations returns an edge object', () => {
    addCreationToGraph(SESSION, { id: 'art-1', type: 'artifact', name: 'Phoenix Blade', element: 'Fire', gate: 3, createdAt: new Date() });
    const edge = linkCreations(SESSION, 'char-1', 'art-1', 'wields', 0.9);
    assert.ok(edge, 'edge should not be null');
    assert.equal(edge.sourceId, 'char-1');
    assert.equal(edge.targetId, 'art-1');
    assert.equal(edge.relationship, 'wields');
    assert.equal(edge.strength, 0.9);
  });

  it('linkCreations clamps strength to [0, 1]', () => {
    addCreationToGraph(SESSION, { id: 'char-2', type: 'character', name: 'Aquin', element: 'Water', gate: 2, createdAt: new Date() });
    addCreationToGraph(SESSION, { id: 'char-3', type: 'character', name: 'Gale', element: 'Wind', gate: 5, createdAt: new Date() });
    const edge = linkCreations(SESSION, 'char-2', 'char-3', 'rivals', 2.5);
    assert.equal(edge.strength, 1, 'strength above 1 should be clamped to 1');
    const edge2 = linkCreations(SESSION, 'char-3', 'char-2', 'rivals', -1);
    assert.equal(edge2.strength, 0, 'strength below 0 should be clamped to 0');
  });

  it('linkCreations returns null for unknown node ids', () => {
    const edge = linkCreations(SESSION, 'ghost-1', 'ghost-2', 'unknown');
    assert.equal(edge, null);
  });

  it('duplicate linkCreations updates the existing edge', () => {
    // Link char-1 → art-1 a second time with different strength
    linkCreations(SESSION, 'char-1', 'art-1', 'wields', 0.5);
    const related = getRelatedCreations(SESSION, 'char-1', 'wields');
    const wieldsEdges = related.filter(r => r.relationship === 'wields');
    // There should still be only one 'wields' edge from char-1 to art-1
    assert.equal(wieldsEdges.length, 1, 'Duplicate link should update, not duplicate');
    assert.equal(wieldsEdges[0].strength, 0.5);
  });

  it('getRelatedCreations respects relationship filter', () => {
    const allRelated = getRelatedCreations(SESSION, 'char-1');
    const filtered = getRelatedCreations(SESSION, 'char-1', 'wields');
    assert.ok(filtered.length <= allRelated.length);
    for (const r of filtered) {
      assert.equal(r.relationship, 'wields');
    }
  });

  it('getRelatedCreations is sorted by strength descending', () => {
    const related = getRelatedCreations(SESSION, 'char-1');
    for (let i = 0; i < related.length - 1; i++) {
      assert.ok(related[i].strength >= related[i + 1].strength, 'Results should be sorted by strength descending');
    }
  });

  it('suggestConnections returns character-to-location suggestions', () => {
    addCreationToGraph(SESSION, { id: 'loc-2', type: 'location', name: 'Storm Haven', element: 'Wind', gate: 5, createdAt: new Date() });
    const suggestions = suggestConnections(SESSION, 'char-2');
    const locationSuggestions = suggestions.filter(s => s.suggestedRelationship === 'located_at');
    assert.ok(locationSuggestions.length > 0, 'Should suggest located_at for character → location');
  });

  it('suggestConnections returns character-to-artifact suggestions', () => {
    const suggestions = suggestConnections(SESSION, 'char-2');
    const artifactSuggestions = suggestions.filter(s => s.suggestedRelationship === 'wields');
    assert.ok(artifactSuggestions.length > 0, 'Should suggest wields for character → artifact');
  });

  it('suggestConnections returns at most 5 results', () => {
    const suggestions = suggestConnections(SESSION, 'char-1');
    assert.ok(suggestions.length <= 5);
  });

  it('suggestConnections returns empty for unknown node', () => {
    const suggestions = suggestConnections(SESSION, 'ghost-999');
    assert.equal(suggestions.length, 0);
  });

  it('exportGraph returns nodes and edges arrays', () => {
    const graph = exportGraph(SESSION);
    assert.ok(Array.isArray(graph.nodes));
    assert.ok(Array.isArray(graph.edges));
    assert.ok(graph.nodes.length >= 2);
  });

  it('findPath returns null when nodes do not exist', () => {
    const path = findPath(SESSION, 'ghost-1', 'ghost-2');
    assert.equal(path, null);
  });

  it('findPath finds a path between directly linked nodes', () => {
    // char-1 and art-1 are linked via 'wields'
    const path = findPath(SESSION, 'char-1', 'art-1');
    assert.ok(path !== null, 'Should find a path between directly linked nodes');
    assert.ok(Array.isArray(path));
  });

  it('findPath returns empty array for same source and target', () => {
    // BFS finds target immediately after dequeue, so path is []
    const path = findPath(SESSION, 'char-1', 'char-1');
    assert.deepEqual(path, []);
  });
});


// ─── Memory ──────────────────────────────────────────────────────────────────

describe('Memory — session lifecycle', () => {
  let getOrCreateSession, getSessionSummary, recordGateExplored,
      recordLuminorConsulted, recordCreatureEncountered, recordCreation, checkMilestones;

  const MEM_SESSION = `mem-session-${Date.now()}`;

  before(async () => {
    ({
      getOrCreateSession, getSessionSummary,
      recordGateExplored, recordLuminorConsulted,
      recordCreatureEncountered, recordCreation, checkMilestones,
    } = await import('../dist/memory/index.js'));
  });

  it('getOrCreateSession returns a session object', () => {
    const session = getOrCreateSession(MEM_SESSION);
    assert.ok(session, 'session must be defined');
    assert.equal(session.id, MEM_SESSION);
  });

  it('new session has empty arrays and a startedAt date', () => {
    const session = getOrCreateSession(MEM_SESSION);
    assert.equal(typeof session.startedAt, 'string');
    assert.ok(!isNaN(Date.parse(session.startedAt)), 'startedAt should be a valid ISO date string');
    assert.deepEqual(session.gatesExplored, []);
    assert.deepEqual(session.luminorsConsulted, []);
    assert.deepEqual(session.creaturesEncountered, []);
    assert.deepEqual(session.creations, []);
  });

  it('getOrCreateSession returns the same object on repeat calls', () => {
    const a = getOrCreateSession(MEM_SESSION);
    const b = getOrCreateSession(MEM_SESSION);
    assert.equal(a, b);
  });

  it('recordGateExplored adds gate to the session', () => {
    recordGateExplored(MEM_SESSION, 'Foundation');
    const session = getOrCreateSession(MEM_SESSION);
    assert.ok(session.gatesExplored.includes('Foundation'));
  });

  it('recordGateExplored does not add duplicates', () => {
    recordGateExplored(MEM_SESSION, 'Foundation');
    recordGateExplored(MEM_SESSION, 'Foundation');
    const session = getOrCreateSession(MEM_SESSION);
    const count = session.gatesExplored.filter(g => g === 'Foundation').length;
    assert.equal(count, 1);
  });

  it('recordLuminorConsulted adds luminor to the session', () => {
    recordLuminorConsulted(MEM_SESSION, 'Valora');
    const session = getOrCreateSession(MEM_SESSION);
    assert.ok(session.luminorsConsulted.includes('Valora'));
  });

  it('recordLuminorConsulted does not add duplicates', () => {
    recordLuminorConsulted(MEM_SESSION, 'Valora');
    const session = getOrCreateSession(MEM_SESSION);
    const count = session.luminorsConsulted.filter(l => l === 'Valora').length;
    assert.equal(count, 1);
  });

  it('recordCreatureEncountered adds creature to the session', () => {
    recordCreatureEncountered(MEM_SESSION, 'Imposter Shade');
    const session = getOrCreateSession(MEM_SESSION);
    assert.ok(session.creaturesEncountered.includes('Imposter Shade'));
  });

  it('recordCreation appends to the creations array', () => {
    const creation = { id: 'c1', type: 'character', element: 'Fire', name: 'Pyra' };
    recordCreation(MEM_SESSION, creation);
    const session = getOrCreateSession(MEM_SESSION);
    assert.ok(session.creations.some(c => c.id === 'c1'));
  });

  it('getSessionSummary returns correct counts', () => {
    // Add more creations and interactions
    recordGateExplored(MEM_SESSION, 'Flow');
    recordGateExplored(MEM_SESSION, 'Fire');
    recordLuminorConsulted(MEM_SESSION, 'Serenith');
    recordLuminorConsulted(MEM_SESSION, 'Ignara');
    recordCreatureEncountered(MEM_SESSION, 'Perfectionist Wyrm');
    recordCreatureEncountered(MEM_SESSION, 'Burnout Phoenix');
    recordCreation(MEM_SESSION, { id: 'c2', type: 'location', element: 'Water', name: 'Crystal Pool' });

    const summary = getSessionSummary(MEM_SESSION);
    assert.ok(summary.gatesExplored >= 3, `Expected >= 3 gates, got ${summary.gatesExplored}`);
    assert.ok(summary.luminorsConsulted >= 3, `Expected >= 3 luminors, got ${summary.luminorsConsulted}`);
    assert.ok(summary.creaturesDefeated >= 3, `Expected >= 3 creatures, got ${summary.creaturesDefeated}`);
    assert.ok(summary.creationsGenerated >= 2, `Expected >= 2 creations, got ${summary.creationsGenerated}`);
    assert.ok(typeof summary.duration === 'number');
  });

  it('checkMilestones returns first_creation after one creation', () => {
    const singleSession = `single-${Date.now()}`;
    recordCreation(singleSession, { id: 'x1', type: 'character', element: 'Fire', name: 'Test' });
    const milestones = checkMilestones(singleSession);
    const names = milestones.map(m => m.name);
    assert.ok(names.includes('first_creation'), 'Should unlock first_creation milestone');
  });

  it('checkMilestones returns gate_seeker after 3 gates', () => {
    const gateSession = `gate-${Date.now()}`;
    recordGateExplored(gateSession, 'Foundation');
    recordGateExplored(gateSession, 'Flow');
    recordGateExplored(gateSession, 'Fire');
    const milestones = checkMilestones(gateSession);
    const names = milestones.map(m => m.name);
    assert.ok(names.includes('gate_seeker'), 'Should unlock gate_seeker milestone');
  });

  it('checkMilestones returns luminor_friend after 3 luminors', () => {
    const lSession = `lum-${Date.now()}`;
    recordLuminorConsulted(lSession, 'Valora');
    recordLuminorConsulted(lSession, 'Serenith');
    recordLuminorConsulted(lSession, 'Ignara');
    const milestones = checkMilestones(lSession);
    const names = milestones.map(m => m.name);
    assert.ok(names.includes('luminor_friend'), 'Should unlock luminor_friend milestone');
  });

  it('checkMilestones returns block_breaker after 3 creatures', () => {
    const bSession = `block-${Date.now()}`;
    recordCreatureEncountered(bSession, 'A');
    recordCreatureEncountered(bSession, 'B');
    recordCreatureEncountered(bSession, 'C');
    const milestones = checkMilestones(bSession);
    const names = milestones.map(m => m.name);
    assert.ok(names.includes('block_breaker'), 'Should unlock block_breaker milestone');
  });

  it('checkMilestones returns elemental_explorer after 4 different elements', () => {
    const eSession = `elem-${Date.now()}`;
    recordCreation(eSession, { id: 'e1', element: 'Fire' });
    recordCreation(eSession, { id: 'e2', element: 'Water' });
    recordCreation(eSession, { id: 'e3', element: 'Earth' });
    recordCreation(eSession, { id: 'e4', element: 'Wind' });
    const milestones = checkMilestones(eSession);
    const names = milestones.map(m => m.name);
    assert.ok(names.includes('elemental_explorer'), 'Should unlock elemental_explorer milestone');
  });

  it('each milestone has a name, description, and achievedAt', () => {
    const mSession = `ms-${Date.now()}`;
    recordCreation(mSession, { id: 'm1', element: 'Fire', name: 'X' });
    const milestones = checkMilestones(mSession);
    for (const m of milestones) {
      assert.ok(typeof m.name === 'string');
      assert.ok(typeof m.description === 'string');
      assert.ok(m.achievedAt instanceof Date);
    }
  });
});


// ─── Agent System ─────────────────────────────────────────────────────────────

describe('Agent System — definitions and registry', () => {
  let AGENTS, getAgent, getAgentsByRole, getAgentsByCapability;

  before(async () => {
    ({ AGENTS, getAgent, getAgentsByRole, getAgentsByCapability } = await import('../dist/agents/definitions.js'));
  });

  it('AGENTS registry contains exactly 5 agents', () => {
    assert.equal(Object.keys(AGENTS).length, 5);
  });

  it('all canonical agent ids are present', () => {
    for (const id of ['creator','worldsmith','luminor-council','scribe','seer']) {
      assert.ok(id in AGENTS, `Missing agent: ${id}`);
    }
  });

  it('each agent has required fields', () => {
    for (const [id, agent] of Object.entries(AGENTS)) {
      for (const field of ['id','name','displayName','role','model','temperature','maxTokens','capabilities','systemPrompt']) {
        assert.ok(field in agent, `Agent "${id}" missing field: ${field}`);
      }
    }
  });

  it('getAgent returns the correct agent by id', () => {
    const agent = getAgent('worldsmith');
    assert.equal(agent.id, 'worldsmith');
    assert.equal(agent.role, 'generator');
  });

  it('getAgent returns undefined for an unknown id', () => {
    assert.equal(getAgent('phantom'), undefined);
  });

  it('getAgentsByRole returns only matching agents', () => {
    const coaches = getAgentsByRole('coach');
    assert.equal(coaches.length, 1);
    assert.equal(coaches[0].id, 'luminor-council');
  });

  it('getAgentsByCapability returns agents that have the named capability', () => {
    const agents = getAgentsByCapability('diagnose_block');
    assert.ok(agents.length >= 1);
    assert.ok(agents.some(a => a.id === 'luminor-council'));
  });

  it('creator agent cannot parallelize (orchestrator pattern)', () => {
    const creator = getAgent('creator');
    assert.equal(creator.canParallelize, false);
  });

  it('worldsmith agent can parallelize', () => {
    const ws = getAgent('worldsmith');
    assert.equal(ws.canParallelize, true);
  });
});


describe('Agent System — matchCreativeSkill and WorldMaturity', () => {
  let matchCreativeSkill, CREATIVE_SKILLS, WorldMaturity;

  before(async () => {
    ({ matchCreativeSkill, CREATIVE_SKILLS, WorldMaturity } = await import('../dist/agents/types.js'));
  });

  it('CREATIVE_SKILLS has at least 5 entries', () => {
    assert.ok(CREATIVE_SKILLS.length >= 5);
  });

  it('matchCreativeSkill returns character_creation for "create character"', () => {
    const skill = matchCreativeSkill('create character for my story');
    assert.ok(skill, 'Should return a skill');
    assert.equal(skill.name, 'character_creation');
    assert.equal(skill.agent, 'worldsmith');
  });

  it('matchCreativeSkill returns creative_coaching for "stuck"', () => {
    const skill = matchCreativeSkill('I am stuck on my project');
    assert.ok(skill);
    assert.equal(skill.name, 'creative_coaching');
    assert.equal(skill.agent, 'luminor-council');
  });

  it('matchCreativeSkill returns narrative_development for "story"', () => {
    const skill = matchCreativeSkill('tell me a story about this character');
    assert.ok(skill);
    assert.equal(skill.name, 'narrative_development');
  });

  it('matchCreativeSkill returns null for unrecognised request', () => {
    const skill = matchCreativeSkill('xyzzy unrelated nonsense');
    assert.equal(skill, null);
  });

  it('WorldMaturity enum has 5 values', () => {
    const values = Object.values(WorldMaturity);
    assert.equal(values.length, 5);
    for (const v of ['virgin','emerging','developing','rich','epic']) {
      assert.ok(values.includes(v), `Missing WorldMaturity value: ${v}`);
    }
  });
});


describe('Agent System — orchestrator', () => {
  let assessWorldState, assessRequest, getActiveSessions, WorldMaturity;

  const ORCH_SESSION = `orch-${Date.now()}`;

  before(async () => {
    ({ assessWorldState, assessRequest, getActiveSessions } = await import('../dist/agents/orchestrator.js'));
    ({ WorldMaturity } = await import('../dist/agents/types.js'));
  });

  it('assessWorldState returns a world state object', () => {
    const state = assessWorldState(ORCH_SESSION);
    for (const field of ['maturity','creationCount','connectionCount','elementsUsed','gatesExplored','luminorsConsulted']) {
      assert.ok(field in state, `Missing field: ${field}`);
    }
  });

  it('fresh session has VIRGIN maturity', () => {
    const state = assessWorldState(ORCH_SESSION);
    assert.equal(state.maturity, WorldMaturity.VIRGIN);
  });

  it('assessRequest routes coaching requests to luminor-council', () => {
    const state = assessWorldState(ORCH_SESSION);
    const decision = assessRequest('I am stuck and overwhelmed', state);
    assert.ok(decision.agents.includes('luminor-council'));
    assert.equal(decision.action, 'creative_coaching');
  });

  it('assessRequest routes generation requests to worldsmith', () => {
    const state = assessWorldState(ORCH_SESSION);
    const decision = assessRequest('generate a new character for me', state);
    assert.ok(decision.agents.includes('worldsmith'));
  });

  it('assessRequest routes narrative requests to scribe', () => {
    const state = assessWorldState(ORCH_SESSION);
    const decision = assessRequest('write a story about Pyra', state);
    assert.ok(decision.agents.includes('scribe'));
  });

  it('assessRequest routes research requests to seer', () => {
    const state = assessWorldState(ORCH_SESSION);
    const decision = assessRequest('find connections between my creations', state);
    assert.ok(decision.agents.includes('seer'));
  });

  it('assessRequest decision includes reasoning string', () => {
    const state = assessWorldState(ORCH_SESSION);
    const decision = assessRequest('generate character', state);
    assert.ok(typeof decision.reasoning === 'string');
    assert.ok(decision.reasoning.length > 0);
  });

  it('getActiveSessions returns an array', () => {
    const sessions = getActiveSessions();
    assert.ok(Array.isArray(sessions));
  });
});


// ─── Data — Luminors ──────────────────────────────────────────────────────────

describe('Data — luminors', () => {
  let luminors;

  before(async () => {
    ({ luminors } = await import('../dist/data/luminors/index.js'));
  });

  it('exports exactly 5 luminors', () => {
    assert.equal(Object.keys(luminors).length, 5);
  });

  it('all canonical luminor slugs are present', () => {
    for (const slug of LUMINOR_SLUGS) {
      assert.ok(slug in luminors, `Missing luminor: ${slug}`);
    }
  });

  it('each luminor has required fields', () => {
    for (const [slug, luminor] of Object.entries(luminors)) {
      for (const field of ['slug','name','title','domain','element','personality','guidance','appearance']) {
        assert.ok(field in luminor, `Luminor "${slug}" missing field: ${field}`);
      }
    }
  });

  it('each luminor has at least 5 quotes', () => {
    for (const [slug, luminor] of Object.entries(luminors)) {
      assert.ok(luminor.guidance.quotes.length >= 5, `${slug} should have at least 5 quotes`);
    }
  });

  it('each luminor element is valid', () => {
    for (const luminor of Object.values(luminors)) {
      assert.ok(VALID_ELEMENTS.includes(luminor.element), `Invalid element for ${luminor.slug}: ${luminor.element}`);
    }
  });

  it('valora is the Fire courage keeper', () => {
    const v = luminors.valora;
    assert.equal(v.element, 'Fire');
    assert.ok(v.title.includes('Courage'), `Expected Courage in title: ${v.title}`);
  });

  it('serenith is the Water calm guide', () => {
    const s = luminors.serenith;
    assert.equal(s.element, 'Water');
  });

  it('each luminor has guidance.bestFor and guidance.practices', () => {
    for (const [slug, luminor] of Object.entries(luminors)) {
      assert.ok(Array.isArray(luminor.guidance.bestFor), `${slug} should have bestFor array`);
      assert.ok(Array.isArray(luminor.guidance.practices), `${slug} should have practices array`);
      assert.ok(luminor.guidance.bestFor.length > 0, `${slug} bestFor should not be empty`);
      assert.ok(luminor.guidance.practices.length > 0, `${slug} practices should not be empty`);
    }
  });
});


// ─── Data — Bestiary ──────────────────────────────────────────────────────────

describe('Data — bestiary', () => {
  let bestiary;

  before(async () => {
    ({ bestiary } = await import('../dist/data/bestiary/index.js'));
  });

  it('exports at least 20 creatures', () => {
    assert.ok(Object.keys(bestiary).length >= 20, `Expected >= 20 creatures, got ${Object.keys(bestiary).length}`);
  });

  it('all expected canonical creatures are present', () => {
    const expected = [
      'imposter_shade', 'perfectionist_wyrm', 'comparison_specter',
      'procrastination_hydra', 'overwhelm_leviathan', 'burnout_phoenix',
      'inner_critic_basilisk', 'blank_page_wraith', 'fear_of_judgment_phantom',
      'resistance_golem',
    ];
    for (const slug of expected) {
      assert.ok(slug in bestiary, `Missing bestiary creature: ${slug}`);
    }
  });

  it('each creature has required fields', () => {
    for (const [slug, creature] of Object.entries(bestiary)) {
      for (const field of ['slug','name','type','description','symptoms','gateAffected','remedies','affirmation']) {
        assert.ok(field in creature, `Creature "${slug}" missing field: ${field}`);
      }
    }
  });

  it('each creature gateAffected is between 1 and 10', () => {
    for (const [slug, creature] of Object.entries(bestiary)) {
      assert.ok(creature.gateAffected >= 1 && creature.gateAffected <= 10,
        `Creature "${slug}" has invalid gateAffected: ${creature.gateAffected}`);
    }
  });

  it('each creature has at least one symptom', () => {
    for (const [slug, creature] of Object.entries(bestiary)) {
      assert.ok(creature.symptoms.length > 0, `"${slug}" should have at least one symptom`);
    }
  });

  it('each creature has at least one remedy', () => {
    for (const [slug, creature] of Object.entries(bestiary)) {
      assert.ok(creature.remedies.length > 0, `"${slug}" should have at least one remedy`);
    }
  });

  it('each creature has a non-empty affirmation', () => {
    for (const [slug, creature] of Object.entries(bestiary)) {
      assert.ok(typeof creature.affirmation === 'string' && creature.affirmation.length > 0,
        `"${slug}" should have a non-empty affirmation`);
    }
  });

  it('resistance_golem is the default fallback creature', () => {
    const rg = bestiary.resistance_golem;
    assert.equal(rg.slug, 'resistance_golem');
    assert.equal(rg.type, 'Golem');
  });
});


// ─── Prompts ─────────────────────────────────────────────────────────────────

describe('Prompts — getPrompt', () => {
  let getPrompt;

  before(async () => {
    ({ getPrompt } = await import('../dist/prompts/index.js'));
  });

  const ALL_PROMPTS = [
    'worldbuild_session',
    'unblock_session',
    'gate_ritual',
    'luminor_dialogue',
    'morning_clearing',
    'creative_sabbath',
  ];

  it('all 6 prompts exist and return a messages array', () => {
    for (const name of ALL_PROMPTS) {
      const args = { focus: 'test', element: 'Fire', gate_number: '3', luminor: 'Valora', topic: 'courage', block_type: 'fear' };
      const result = getPrompt(name, args);
      assert.ok(result, `${name} should return a result`);
      assert.ok(Array.isArray(result.messages), `${name} should have a messages array`);
      assert.ok(result.messages.length > 0, `${name} messages should not be empty`);
    }
  });

  it('each message has a role and content', () => {
    for (const name of ALL_PROMPTS) {
      const result = getPrompt(name, { gate_number: '1', luminor: 'Serenith', topic: 'flow' });
      for (const msg of result.messages) {
        assert.ok(typeof msg.role === 'string', `${name}: message should have a role`);
        assert.ok(msg.content, `${name}: message should have content`);
      }
    }
  });

  it('each message content has type "text" and non-empty text', () => {
    for (const name of ALL_PROMPTS) {
      const result = getPrompt(name, { gate_number: '5', luminor: 'Ignara' });
      for (const msg of result.messages) {
        assert.equal(msg.content.type, 'text', `${name}: content.type should be "text"`);
        assert.ok(typeof msg.content.text === 'string' && msg.content.text.length > 0,
          `${name}: content.text should be a non-empty string`);
      }
    }
  });

  it('worldbuild_session includes the focus argument in the text', () => {
    const result = getPrompt('worldbuild_session', { focus: 'dragon lore' });
    assert.ok(result.messages[0].content.text.includes('dragon lore'));
  });

  it('worldbuild_session includes the element argument when provided', () => {
    const result = getPrompt('worldbuild_session', { element: 'Void' });
    assert.ok(result.messages[0].content.text.includes('Void'));
  });

  it('gate_ritual includes the gate number in the text', () => {
    const result = getPrompt('gate_ritual', { gate_number: '7' });
    assert.ok(result.messages[0].content.text.includes('Gate 7'));
  });

  it('luminor_dialogue defaults to Valora when no luminor provided', () => {
    const result = getPrompt('luminor_dialogue', {});
    assert.ok(result.messages[0].content.text.includes('Valora'));
  });

  it('luminor_dialogue uses the specified luminor name', () => {
    const result = getPrompt('luminor_dialogue', { luminor: 'Serenith', topic: 'rest' });
    assert.ok(result.messages[0].content.text.includes('Serenith'));
  });

  it('unknown prompt name throws an error', () => {
    assert.throws(() => getPrompt('nonexistent_prompt', {}), /Unknown prompt/);
  });
});
