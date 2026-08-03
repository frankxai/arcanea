#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const SCHEMAS = path.join(ROOT, 'schemas');
const MAGIC_ROOT = path.resolve(ROOT, '..', 'magic-intelligence-system');

const PRIMARY_ELEMENTS = new Set(['earth', 'fire', 'spirit', 'void', 'water', 'wind']);
const SPIRIT_CLASSES = new Set([
  'emanant',
  'placekeeper',
  'echo',
  'ancestor',
  'collective',
  'awakened-work',
  'delegated-presence',
  'severed-presence',
]);
const ARCHETYPE_FAMILIES = new Set(['orientation', 'reciprocity', 'pressure', 'ecology', 'scale']);
const BOND_MODES = new Set([
  'witness',
  'invitation',
  'habitat',
  'co-stewardship',
  'translation',
  'channel',
  'seal',
  'predation',
]);
const MANIFESTATION_LEVELS = new Set([0, 1, 2, 3, 4, 5, 6]);
const failures = [];
const warnings = [];

function fail(location, message) {
  failures.push(location + ': ' + message);
}

function warn(location, message) {
  warnings.push(location + ': ' + message);
}

function expect(location, condition, message) {
  if (!condition) fail(location, message);
}

function isSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function duplicates(values) {
  const seen = new Set();
  const found = [];
  for (const value of values) {
    if (seen.has(value)) found.push(value);
    seen.add(value);
  }
  return found;
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function contentHash(value) {
  const canonical = JSON.stringify(canonicalize(value));
  return 'sha256:' + createHash('sha256').update(canonical).digest('hex');
}

function projectableSpiritPayload(spirit) {
  const names = { ...spirit.names };
  delete names.accordName;
  return { ...spirit, names };
}

async function loadJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

const [
  sourceDoc,
  referenceDoc,
  archetypeDoc,
  spiritDoc,
  spiritProfileDoc,
  bondDoc,
  domainDoc,
  artifactDoc,
  magicProfileDoc,
] = await Promise.all([
  loadJson(path.join(DATA, 'sources.json')),
  loadJson(path.join(DATA, 'reference-entities.json')),
  loadJson(path.join(DATA, 'archetypes.json')),
  loadJson(path.join(DATA, 'spirits.json')),
  loadJson(path.join(DATA, 'world-spirit-profiles.json')),
  loadJson(path.join(DATA, 'spirit-artifact-bonds.json')),
  loadJson(path.join(MAGIC_ROOT, 'data', 'domains.json')),
  loadJson(path.join(MAGIC_ROOT, 'data', 'artifacts.json')),
  loadJson(path.join(MAGIC_ROOT, 'data', 'world-magic-profiles.json')),
]);

await Promise.all([
  'source.schema.json',
  'reference-entity.schema.json',
  'archetype.schema.json',
  'spirit.schema.json',
  'world-spirit-profile.schema.json',
  'spirit-artifact-bond.schema.json',
].map((file) => loadJson(path.join(SCHEMAS, file))));

const docs = [
  ['sources', sourceDoc],
  ['reference entities', referenceDoc],
  ['archetypes', archetypeDoc],
  ['spirits', spiritDoc],
  ['spirit world profiles', spiritProfileDoc],
  ['spirit artifact bonds', bondDoc],
];

for (const [name, doc] of docs) {
  expect(name, doc.schemaVersion === '1.0.0', 'unexpected schemaVersion');
}

expect('sources', Array.isArray(sourceDoc.sources), 'sources must be an array');
expect('reference entities', Array.isArray(referenceDoc.entities), 'entities must be an array');
expect('archetypes', Array.isArray(archetypeDoc.archetypes), 'archetypes must be an array');
expect('spirits', Array.isArray(spiritDoc.spirits), 'spirits must be an array');
expect('spirit world profiles', Array.isArray(spiritProfileDoc.profiles), 'profiles must be an array');
expect('spirit artifact bonds', Array.isArray(bondDoc.bonds), 'bonds must be an array');

const sources = sourceDoc.sources || [];
const references = referenceDoc.entities || [];
const archetypes = archetypeDoc.archetypes || [];
const spirits = spiritDoc.spirits || [];
const spiritProfiles = spiritProfileDoc.profiles || [];
const bonds = bondDoc.bonds || [];
const domains = domainDoc.domains || [];
const artifacts = artifactDoc.artifacts || [];
const magicProfiles = magicProfileDoc.profiles || [];

const collections = [
  ['sources', sources],
  ['reference entities', references],
  ['archetypes', archetypes],
  ['spirits', spirits],
  ['spirit world profiles', spiritProfiles],
  ['spirit artifact bonds', bonds],
];

for (const [name, records] of collections) {
  for (const duplicate of duplicates(records.map((record) => record.id))) {
    fail(name, 'duplicate id ' + duplicate);
  }
}

const sourceById = new Map(sources.map((source) => [source.id, source]));
const archetypeById = new Map(archetypes.map((archetype) => [archetype.id, archetype]));
const spiritById = new Map(spirits.map((spirit) => [spirit.id, spirit]));
const spiritProfileById = new Map(spiritProfiles.map((profile) => [profile.id, profile]));
const domainById = new Map(domains.map((domain) => [domain.id, domain]));
const artifactById = new Map(artifacts.map((artifact) => [artifact.id, artifact]));
const magicProfileById = new Map(magicProfiles.map((profile) => [profile.worldId, profile]));

for (const source of sources) {
  const location = 'source ' + (source.id || '<missing>');
  expect(location, isSlug(source.id), 'id must be a kebab-case slug');
  expect(location, ['fiction', 'historical-tradition', 'living-tradition'].includes(source.kind), 'unknown source kind');
  expect(location, Array.isArray(source.sourceLocators) && source.sourceLocators.length > 0, 'at least one source locator is required');
  expect(location, ['mechanics-only', 'public-domain-study', 'consultation-required'].includes(source.rights?.usageMode), 'unknown rights usage mode');
  expect(location, ['standard', 'elevated', 'living-sacred'].includes(source.rights?.culturalSensitivity), 'unknown cultural sensitivity');
  expect(location, ['abstract-patterns-only', 'human-review-required', 'prohibited'].includes(source.rights?.canonIngestion), 'unknown canon ingestion policy');
  expect(location, Array.isArray(source.coverage?.knownGaps) && source.coverage.knownGaps.length > 0, 'coverage gaps must be explicit');
}

for (const reference of references) {
  const location = 'reference ' + (reference.id || '<missing>');
  expect(location, isSlug(reference.id), 'id must be a kebab-case slug');
  expect(location, sourceById.has(reference.sourceId), 'unknown source ' + reference.sourceId);
  expect(location, reference.notForProjection === true, 'reference records must be not-for-projection');
  expect(location, Array.isArray(reference.functions) && reference.functions.length > 0, 'functions must be non-empty');
  expect(location, Array.isArray(reference.mechanisms) && reference.mechanisms.length > 0, 'mechanisms must be non-empty');
  expect(location, typeof reference.usage?.transferablePattern === 'string', 'transferable pattern is required');
  expect(location, Array.isArray(reference.usage?.copyProhibitions) && reference.usage.copyProhibitions.length > 0, 'copy prohibitions are required');
}

for (const archetype of archetypes) {
  const location = 'archetype ' + (archetype.id || '<missing>');
  expect(location, isSlug(archetype.id), 'id must be a kebab-case slug');
  expect(location, ARCHETYPE_FAMILIES.has(archetype.family), 'unknown archetype family');
  expect(location, Array.isArray(archetype.storyQuestions) && archetype.storyQuestions.length >= 2, 'at least two story questions are required');
  expect(location, Array.isArray(archetype.compatibleClasses) && archetype.compatibleClasses.length > 0, 'compatible classes are required');
  for (const spiritClass of archetype.compatibleClasses || []) {
    expect(location, SPIRIT_CLASSES.has(spiritClass), 'unknown compatible spirit class ' + spiritClass);
  }
}

const referenceNames = new Map();
for (const reference of references) {
  const normalized = normalizeName(reference.name);
  if (normalized) referenceNames.set(normalized, reference);
}

const commonSigns = [];
const mantles = [];
const sourceTones = [];

for (const spirit of spirits) {
  const location = 'spirit ' + (spirit.id || '<missing>');
  expect(location, isSlug(spirit.id), 'id must be a kebab-case slug');
  expect(location, ['staging', 'approved', 'quarantined'].includes(spirit.status), 'unknown status');
  expect(location, SPIRIT_CLASSES.has(spirit.class), 'unknown spirit class');
  expect(location, typeof spirit.names?.commonSign === 'string' && spirit.names.commonSign.length >= 3, 'Common Sign is required');
  expect(location, typeof spirit.names?.mantle === 'string' && spirit.names.mantle.length >= 3, 'Mantle is required');
  expect(location, /^sha256:[a-f0-9]{64}$/.test(spirit.names?.sourceToneFingerprint || ''), 'Source-tone must be a one-way sha256 fingerprint');

  commonSigns.push(normalizeName(spirit.names?.commonSign));
  mantles.push(normalizeName(spirit.names?.mantle));
  sourceTones.push(spirit.names?.sourceToneFingerprint);

  for (const candidate of [spirit.names?.commonSign, spirit.names?.mantle]) {
    const normalized = normalizeName(candidate);
    if (referenceNames.has(normalized)) {
      fail(location, 'name collides with research-only reference ' + referenceNames.get(normalized).name);
    }
  }

  expect(location, Array.isArray(spirit.archetypeIds) && spirit.archetypeIds.length >= 1 && spirit.archetypeIds.length <= 3, 'one to three archetypes are required');
  expect(location, duplicates(spirit.archetypeIds || []).length === 0, 'archetypes must be unique');
  for (const archetypeId of spirit.archetypeIds || []) {
    const archetype = archetypeById.get(archetypeId);
    expect(location, Boolean(archetype), 'unknown archetype ' + archetypeId);
    if (archetype) {
      expect(location, archetype.compatibleClasses.includes(spirit.class), archetypeId + ' is not compatible with class ' + spirit.class);
    }
  }

  expect(location, Array.isArray(spirit.worldIds) && spirit.worldIds.length > 0, 'at least one world is required');
  for (const worldId of spirit.worldIds || []) {
    expect(location, spiritProfileById.has(worldId), 'unknown spirit world profile ' + worldId);
    expect(location, magicProfileById.has(worldId), 'unknown magic world profile ' + worldId);
  }

  const elements = spirit.resonance?.primaryElements || [];
  const expressions = spirit.resonance?.expressionIds || [];
  expect(location, elements.length > 0, 'at least one primary Element is required');
  expect(location, duplicates(elements).length === 0, 'primary Elements must be unique');
  expect(location, duplicates(expressions).length === 0, 'Expressions must be unique');
  for (const element of elements) {
    expect(location, PRIMARY_ELEMENTS.has(element), 'unknown primary Element ' + element);
  }

  let minimumExpressionGate = 1;
  for (const expressionId of expressions) {
    const domain = domainById.get(expressionId);
    expect(location, Boolean(domain), 'unknown Expression ' + expressionId);
    if (domain) {
      expect(location, domain.class !== 'primary', expressionId + ' must not be redundantly listed as an Expression');
      minimumExpressionGate = Math.max(minimumExpressionGate, domain.minimumGate || 1);
    }
  }
  expect(location, Number.isInteger(spirit.resonance?.minimumSafeGate) && spirit.resonance.minimumSafeGate >= 1 && spirit.resonance.minimumSafeGate <= 10, 'minimumSafeGate must be 1-10');
  expect(location, spirit.resonance?.minimumSafeGate >= minimumExpressionGate, 'minimumSafeGate is below an Expression requirement');

  expect(location, MANIFESTATION_LEVELS.has(spirit.manifestation?.maximumLevel), 'maximum manifestation level must be 0-6');
  expect(location, Array.isArray(spirit.manifestation?.forms) && spirit.manifestation.forms.length > 0, 'at least one manifestation form is required');
  expect(location, Array.isArray(spirit.manifestation?.tells) && spirit.manifestation.tells.length >= 2, 'at least two manifestation tells are required');

  for (const key of ['need', 'gift', 'refusal', 'boundary', 'price', 'release', 'consentMode']) {
    expect(location, typeof spirit.relationship?.[key] === 'string' && spirit.relationship[key].length > 0, 'relationship.' + key + ' is required');
  }
  for (const key of ['desire', 'contradiction', 'choicePressure']) {
    expect(location, typeof spirit.storyEngine?.[key] === 'string' && spirit.storyEngine[key].length > 0, 'storyEngine.' + key + ' is required');
  }

  const sourcePatternIds = spirit.rightsReview?.sourcePatternIds || [];
  expect(location, sourcePatternIds.length >= 3, 'at least three source-system patterns are required');
  expect(location, duplicates(sourcePatternIds).length === 0, 'source-system patterns must be unique');
  for (const sourceId of sourcePatternIds) {
    const source = sourceById.get(sourceId);
    expect(location, Boolean(source), 'unknown source pattern ' + sourceId);
    if (!source) continue;
    expect(location, source.rights.canonIngestion !== 'prohibited', 'prohibited cultural source cannot feed automated canon synthesis: ' + sourceId);
    if (source.rights.culturalSensitivity === 'living-sacred') {
      expect(location, ['human-required', 'approved'].includes(spirit.rightsReview?.reviewStatus), 'living sacred source ' + sourceId + ' requires human review');
      expect(location, ['medium', 'high'].includes(spirit.rightsReview?.similarityRisk), 'living sacred source ' + sourceId + ' cannot be marked low risk');
    }
  }
  expect(location, Array.isArray(spirit.rightsReview?.notes) && spirit.rightsReview.notes.length >= 2, 'originality notes are required');

  if (spirit.rightsReview?.similarityRisk === 'medium') {
    expect(location, ['human-required', 'approved'].includes(spirit.rightsReview?.reviewStatus), 'medium similarity risk requires human review');
    warn(location, 'human cultural and originality review remains required before approval');
  }
  if (spirit.rightsReview?.similarityRisk === 'high') {
    expect(location, spirit.status === 'quarantined', 'high similarity risk must be quarantined');
    expect(location, spirit.rightsReview?.reviewStatus === 'redesign-required', 'high similarity risk requires redesign');
    expect(location, spirit.memoryProjection?.enabled === false, 'high similarity risk cannot project');
  }

  const isShadowExpression = expressions.includes('shadow');
  if (isShadowExpression || spirit.shadow?.state === 'severed') {
    expect(location, spirit.class === 'severed-presence', 'Shadow presence must use the severed-presence class');
    expect(location, spirit.shadow?.state === 'severed', 'Shadow presence must be marked severed');
    expect(location, typeof spirit.shadow?.severanceEvent === 'string' && spirit.shadow.severanceEvent.length > 0, 'severance event is required');
    expect(location, spirit.status === 'quarantined', 'Shadow presence must be quarantined');
    expect(location, spirit.memoryProjection?.enabled === false, 'Shadow presence cannot project');
  } else {
    expect(location, elements.includes('spirit'), 'whole or wounded spirit-being must include the Spirit Element');
  }

  if (spirit.status === 'quarantined') {
    expect(location, spirit.memoryProjection?.enabled === false, 'quarantined spirit cannot project');
  }
  if (spirit.memoryProjection?.enabled) {
    expect(location, spirit.status !== 'quarantined', 'projected spirit cannot be quarantined');
    expect(location, spirit.memoryProjection.namespace === 'arcanea.staging.spirits' || spirit.memoryProjection.namespace === 'arcanea.canon.spirits', 'invalid projection namespace');
    if (spirit.status === 'staging') {
      expect(location, spirit.memoryProjection.namespace === 'arcanea.staging.spirits', 'staging spirit must use staging namespace');
    }
  }
}

for (const duplicate of duplicates(commonSigns)) fail('spirits', 'duplicate Common Sign ' + duplicate);
for (const duplicate of duplicates(mantles)) fail('spirits', 'duplicate Mantle ' + duplicate);
for (const duplicate of duplicates(sourceTones)) fail('spirits', 'duplicate Source-tone fingerprint ' + duplicate);

for (const profile of spiritProfiles) {
  const location = 'spirit world ' + (profile.id || '<missing>');
  expect(location, isSlug(profile.id), 'id must be a kebab-case slug');
  expect(location, magicProfileById.has(profile.id), 'no matching magic world profile');
  expect(location, ['staging', 'approved', 'experimental'].includes(profile.status), 'unknown status');
  expect(location, MANIFESTATION_LEVELS.has(profile.maximumManifestation), 'maximum manifestation level must be 0-6');
  expect(location, Array.isArray(profile.institutions) && profile.institutions.length >= 2, 'at least two institutions are required');
  expect(location, Array.isArray(profile.laws) && profile.laws.length >= 3, 'at least three laws are required');
  expect(location, Array.isArray(profile.bannedPractices) && profile.bannedPractices.length >= 3, 'at least three banned practices are required');
  expect(location, typeof profile.disputeProtocol === 'string' && profile.disputeProtocol.length > 0, 'dispute protocol is required');
  expect(location, typeof profile.memoryPolicy === 'string' && profile.memoryPolicy.length > 0, 'memory policy is required');
}

for (const bond of bonds) {
  const location = 'bond ' + (bond.id || '<missing>');
  const spirit = spiritById.get(bond.spiritId);
  const artifact = artifactById.get(bond.artifactId);
  expect(location, isSlug(bond.id), 'id must be a kebab-case slug');
  expect(location, ['staging', 'approved', 'quarantined'].includes(bond.status), 'unknown status');
  expect(location, Boolean(spirit), 'unknown spirit ' + bond.spiritId);
  expect(location, Boolean(artifact), 'unknown artifact ' + bond.artifactId);
  expect(location, spiritProfileById.has(bond.worldId), 'unknown spirit world ' + bond.worldId);
  expect(location, magicProfileById.has(bond.worldId), 'unknown magic world ' + bond.worldId);
  expect(location, BOND_MODES.has(bond.mode), 'unknown bond mode ' + bond.mode);
  if (spirit) {
    expect(location, spirit.worldIds.includes(bond.worldId), 'spirit is not available in bond world ' + bond.worldId);
  }
  for (const key of ['function', 'consent', 'price', 'failure', 'release']) {
    expect(location, typeof bond[key] === 'string' && bond[key].length > 0, key + ' is required');
  }

  if (bond.mode === 'predation') {
    expect(location, bond.status === 'quarantined', 'predation must be quarantined');
    expect(location, bond.memoryProjection === false, 'predation cannot project');
    expect(location, spirit?.status === 'quarantined', 'predation spirit must be quarantined');
    expect(location, artifact?.status === 'quarantined', 'predation artifact must be quarantined');
  }
  if (bond.status === 'quarantined') {
    expect(location, bond.memoryProjection === false, 'quarantined bond cannot project');
  }
  if (bond.memoryProjection) {
    expect(location, bond.mode !== 'predation', 'predatory bond cannot project');
    expect(location, spirit?.memoryProjection?.enabled === true, 'bond spirit endpoint is not projectable');
    expect(location, artifact?.memory?.project === true, 'bond artifact endpoint is not projectable');
  }
}

if (sourceDoc.coverage?.status !== 'complete') {
  warn('reference corpus', 'coverage is governed and extensible; it does not claim completeness across all anime, mythologies, editions, or living traditions');
}
if (spirits.some((spirit) => spirit.status === 'quarantined')) {
  warn('projection', 'quarantined spirits and their bonds are excluded from memory events');
}

if (failures.length > 0) {
  console.error('Spirit system validation failed with ' + failures.length + ' error(s):');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

const emitIndex = process.argv.indexOf('--emit-memory');
let emittedPath = null;
let projectedEvents = 0;

if (emitIndex !== -1) {
  const suppliedPath = process.argv[emitIndex + 1];
  emittedPath = path.resolve(
    process.cwd(),
    suppliedPath && !suppliedPath.startsWith('--')
      ? suppliedPath
      : path.join(ROOT, 'dist', 'spirit-memory.jsonl'),
  );
  const sourceCommit = process.env.GITHUB_SHA || 'working-tree';
  const projectedAt = new Date().toISOString();
  const events = [];

  for (const archetype of archetypes) {
    events.push({
      eventType: 'lore.entity.upserted',
      entityType: 'spirit-archetype',
      entityId: archetype.id,
      status: archetypeDoc.status,
      version: archetypeDoc.schemaVersion,
      sourcePath: 'spirit-intelligence-system/data/archetypes.json',
      sourceCommit,
      contentHash: contentHash(archetype),
      namespace: 'arcanea.staging.archetypes',
      projectedAt,
      payload: archetype,
    });
  }

  for (const spirit of spirits.filter((record) => record.memoryProjection.enabled)) {
    const payload = projectableSpiritPayload(spirit);
    events.push({
      eventType: 'lore.entity.upserted',
      entityType: 'spirit',
      entityId: spirit.id,
      worldIds: spirit.worldIds,
      status: spirit.status,
      version: spiritDoc.schemaVersion,
      sourcePath: 'spirit-intelligence-system/data/spirits.json',
      sourceCommit,
      contentHash: contentHash(spirit),
      namespace: spirit.memoryProjection.namespace,
      projectedAt,
      payload,
    });
  }

  for (const profile of spiritProfiles.filter((record) => record.status === 'staging' || record.status === 'approved')) {
    events.push({
      eventType: 'lore.entity.upserted',
      entityType: 'spirit-world-profile',
      entityId: profile.id,
      worldId: profile.id,
      status: profile.status,
      version: spiritProfileDoc.schemaVersion,
      sourcePath: 'spirit-intelligence-system/data/world-spirit-profiles.json',
      sourceCommit,
      contentHash: contentHash(profile),
      namespace: profile.status === 'approved' ? 'arcanea.canon.spirit-worlds' : 'arcanea.staging.spirit-worlds',
      projectedAt,
      payload: profile,
    });
  }

  for (const bond of bonds.filter((record) => record.memoryProjection)) {
    events.push({
      eventType: 'lore.entity.upserted',
      entityType: 'spirit-artifact-bond',
      entityId: bond.id,
      worldId: bond.worldId,
      status: bond.status,
      version: bondDoc.schemaVersion,
      sourcePath: 'spirit-intelligence-system/data/spirit-artifact-bonds.json',
      sourceCommit,
      contentHash: contentHash(bond),
      namespace: bond.status === 'approved' ? 'arcanea.canon.spirit-bonds' : 'arcanea.staging.spirit-bonds',
      projectedAt,
      payload: bond,
    });
  }

  projectedEvents = events.length;
  await mkdir(path.dirname(emittedPath), { recursive: true });
  await writeFile(emittedPath, events.map((event) => JSON.stringify(event)).join('\n') + '\n', 'utf8');
  console.log('Emitted ' + events.length + ' Starlight Memory projection event(s) to ' + emittedPath);
}

console.log(JSON.stringify({
  ok: true,
  schemaVersion: spiritDoc.schemaVersion,
  counts: {
    sources: sources.length,
    referenceEntities: references.length,
    archetypes: archetypes.length,
    spirits: spirits.length,
    projectableSpirits: spirits.filter((spirit) => spirit.memoryProjection.enabled).length,
    worldProfiles: spiritProfiles.length,
    bonds: bonds.length,
    projectableBonds: bonds.filter((bond) => bond.memoryProjection).length,
    projectedEvents,
  },
  warnings,
  emittedPath,
}, null, 2));
