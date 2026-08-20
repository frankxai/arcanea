#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const SCHEMAS = path.join(ROOT, 'schemas');

const PRIMARY_ELEMENTS = ['earth', 'fire', 'spirit', 'void', 'water', 'wind'];
const DISCIPLINES = new Set(['attack', 'defense', 'summoning']);
const ARTIFACT_CLASSES = new Set(['focus', 'key', 'vessel', 'bridge', 'pact', 'engine', 'seal', 'assembly']);
const COST_TYPES = new Set([
  'mana',
  'vitality',
  'memory',
  'time',
  'identity',
  'oath',
  'emotion',
  'relationship',
  'ecology',
  'material',
  'attention',
]);
const RANKS = new Set(['apprentice', 'mage', 'master', 'archmage', 'luminor']);
const INFLUENCE_IDS = new Set([
  'lightbringer-prism',
  'avatar-multi-element-role',
  'avatar-sonam-staff',
  'harry-potter-wandlore',
  'inheritance-language-magic',
  'tolkien-rings',
  'marvel-domain-relics',
  'dc-power-ring',
  'dc-agentive-helmet',
  'elder-scrolls-combined-artifacts',
  'league-world-ecologies',
  'myth-sacred-gifts',
  'myth-apotropaic-symbols',
  'myth-forged-treasures',
  'myth-wholeness-amulets',
  'myth-regalia-legitimacy',
  'myth-abundance-vessels',
  'myth-transformative-masks',
  'myth-magic-ships',
  'myth-memory-vessels',
  'arcanea-verdance',
  'arcanea-water-memory',
  'arcanea-otome-truth',
  'arcanea-kyuro-observation',
  'arcanea-shadow',
]);

const GATE_RULES = new Map([
  [1, { tier: 'light', rank: 'apprentice' }],
  [2, { tier: 'light', rank: 'apprentice' }],
  [3, { tier: 'advanced', rank: 'mage' }],
  [4, { tier: 'advanced', rank: 'mage' }],
  [5, { tier: 'greater', rank: 'master' }],
  [6, { tier: 'greater', rank: 'master' }],
  [7, { tier: 'sacred', rank: 'archmage' }],
  [8, { tier: 'royal', rank: 'archmage' }],
  [9, { tier: 'imperial', rank: 'luminor' }],
  [10, { tier: 'divine', rank: 'luminor' }],
]);

const failures = [];
const warnings = [];

function fail(location, message) {
  failures.push(`${location}: ${message}`);
}

function warn(location, message) {
  warnings.push(`${location}: ${message}`);
}

function expect(location, condition, message) {
  if (!condition) fail(location, message);
}

function isSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function duplicates(values) {
  const seen = new Set();
  return values.filter((value) => {
    if (seen.has(value)) return true;
    seen.add(value);
    return false;
  });
}

function sameSet(left, right) {
  return left.length === right.length && [...left].sort().every((value, index) => value === [...right].sort()[index]);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

function contentHash(value) {
  const canonical = JSON.stringify(canonicalize(value));
  return `sha256:${createHash('sha256').update(canonical).digest('hex')}`;
}

function forbiddenKeys(value, pathParts = []) {
  const found = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => found.push(...forbiddenKeys(item, [...pathParts, index])));
    return found;
  }
  if (!value || typeof value !== 'object') return found;

  for (const [key, child] of Object.entries(value)) {
    if (['grantsRank', 'opensGate', 'becomesLuminor', 'unlimitedPower'].includes(key)) {
      found.push([...pathParts, key].join('.'));
    }
    found.push(...forbiddenKeys(child, [...pathParts, key]));
  }
  return found;
}

async function loadJson(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

const [domainDoc, artifactDoc, profileDoc] = await Promise.all([
  loadJson(path.join(DATA, 'domains.json')),
  loadJson(path.join(DATA, 'artifacts.json')),
  loadJson(path.join(DATA, 'world-magic-profiles.json')),
]);

await Promise.all([
  loadJson(path.join(SCHEMAS, 'domain.schema.json')),
  loadJson(path.join(SCHEMAS, 'artifact.schema.json')),
  loadJson(path.join(SCHEMAS, 'world-magic-profile.schema.json')),
]);

expect('domains', domainDoc.schemaVersion === '1.0.0', 'unexpected schemaVersion');
expect('artifacts', artifactDoc.schemaVersion === '1.0.0', 'unexpected schemaVersion');
expect('world profiles', profileDoc.schemaVersion === '1.0.0', 'unexpected schemaVersion');
expect('domains', Array.isArray(domainDoc.domains), 'domains must be an array');
expect('artifacts', Array.isArray(artifactDoc.artifacts), 'artifacts must be an array');
expect('world profiles', Array.isArray(profileDoc.profiles), 'profiles must be an array');

const domainIds = domainDoc.domains.map((domain) => domain.id);
const profileIds = profileDoc.profiles.map((profile) => profile.worldId);
const artifactIds = artifactDoc.artifacts.map((artifact) => artifact.id);

for (const duplicate of duplicates(domainIds)) fail('domains', `duplicate id ${duplicate}`);
for (const duplicate of duplicates(profileIds)) fail('world profiles', `duplicate id ${duplicate}`);
for (const duplicate of duplicates(artifactIds)) fail('artifacts', `duplicate id ${duplicate}`);

const domainsById = new Map(domainDoc.domains.map((domain) => [domain.id, domain]));
const profilesById = new Map(profileDoc.profiles.map((profile) => [profile.worldId, profile]));
const artifactsById = new Map(artifactDoc.artifacts.map((artifact) => [artifact.id, artifact]));

for (const domain of domainDoc.domains) {
  const location = `domain ${domain.id ?? '<missing>'}`;
  expect(location, isSlug(domain.id), 'id must be a kebab-case slug');
  expect(location, Array.isArray(domain.components) && domain.components.length > 0, 'components must be non-empty');
  expect(location, duplicates(domain.components ?? []).length === 0, 'components must be unique');
  for (const component of domain.components ?? []) {
    expect(location, PRIMARY_ELEMENTS.includes(component), `unknown primary component ${component}`);
  }
  expect(location, Number.isInteger(domain.minimumGate) && GATE_RULES.has(domain.minimumGate), 'minimumGate must be 1-10');
  expect(location, Array.isArray(domain.disciplines) && domain.disciplines.length > 0, 'disciplines must be non-empty');
  for (const discipline of domain.disciplines ?? []) {
    expect(location, DISCIPLINES.has(discipline), `unknown discipline ${discipline}`);
  }
  expect(location, Array.isArray(domain.constraints) && domain.constraints.length > 0, 'constraints must be non-empty');

  if (domain.class === 'primary') {
    expect(location, PRIMARY_ELEMENTS.includes(domain.id), 'primary domain id must be a locked Element');
    expect(location, sameSet(domain.components, [domain.id]), 'primary domain must contain only itself');
    expect(location, domain.status === 'locked-reference', 'primary domain must be a locked-reference');
  } else if (domain.class === 'derived') {
    expect(location, domain.components.length >= 2, 'derived domain needs at least two primary components');
    expect(location, domain.status !== 'locked-reference', 'derived domain cannot claim locked-reference status');
  }

  if (domain.id === 'shadow') {
    expect(location, domain.class === 'corrupted', 'Shadow must be classified as corrupted');
    expect(location, domain.status === 'restricted', 'Shadow must remain restricted');
    expect(location, sameSet(domain.components, ['void']), 'Shadow derives from corrupted Void only');
  }
}

for (const requiredElement of PRIMARY_ELEMENTS) {
  expect('domains', domainsById.has(requiredElement), `missing locked Element reference ${requiredElement}`);
}
expect('domains', !domainsById.has('light') || domainsById.get('light').class !== 'primary', 'Light cannot be a primary Element');

for (const profile of profileDoc.profiles) {
  const location = `world ${profile.worldId ?? '<missing>'}`;
  expect(location, isSlug(profile.worldId), 'worldId must be a kebab-case slug');
  expect(location, profile.parentCosmology === 'arcanea-core', 'parentCosmology must be arcanea-core');
  expect(location, profile.lockedInheritance?.overridePolicy === 'forbidden', 'locked inheritance override must be forbidden');
  expect(location, sameSet(profile.domains?.enabledPrimary ?? [], PRIMARY_ELEMENTS), 'all six canonical primary values must be inherited exactly');
  expect(location, duplicates(profile.domains?.enabledDerived ?? []).length === 0, 'enabledDerived values must be unique');

  for (const domainId of profile.domains?.enabledDerived ?? []) {
    expect(location, domainsById.has(domainId), `unknown derived domain ${domainId}`);
    expect(location, domainsById.get(domainId)?.class === 'derived', `${domainId} is not a derived domain`);
  }
  for (const domainId of profile.domains?.restricted ?? []) {
    expect(location, domainsById.has(domainId), `unknown restricted domain ${domainId}`);
  }

  expect(location, Array.isArray(profile.worldRules) && profile.worldRules.length >= 2, 'at least two world rules are required');
  expect(location, profile.contributionPolicy?.canonRoute === 'experimental->staging->human-approval->approved', 'canon route must preserve human approval');
  expect(location, profile.contributionPolicy?.creatorAttributionRequired === true, 'creator attribution must be required');
  expect(location, profile.memory?.authority === 'git-projection-only', 'memory must remain a Git projection');
  expect(location, profile.memory?.defaultQueryStatus === 'approved', 'default query status must be approved');
  expect(location, Array.isArray(profile.artifactEcology?.allowedClasses), 'allowedClasses must be an array');
  for (const artifactClass of profile.artifactEcology?.allowedClasses ?? []) {
    expect(location, ARTIFACT_CLASSES.has(artifactClass), `unknown artifact class ${artifactClass}`);
  }
}

for (const artifact of artifactDoc.artifacts) {
  const location = `artifact ${artifact.id ?? '<missing>'}`;
  expect(location, isSlug(artifact.id), 'id must be a kebab-case slug');
  expect(location, profilesById.has(artifact.worldId), `unknown world ${artifact.worldId}`);
  expect(location, ARTIFACT_CLASSES.has(artifact.artifactClass), `unknown class ${artifact.artifactClass}`);
  expect(location, artifact.provenance?.originWorldId && profilesById.has(artifact.provenance.originWorldId), `unknown origin world ${artifact.provenance?.originWorldId}`);
  expect(location, Array.isArray(artifact.substrates) && artifact.substrates.length > 0, 'substrates must be non-empty');
  expect(location, Array.isArray(artifact.capabilities) && artifact.capabilities.length > 0, 'capabilities must be non-empty');
  expect(location, (artifact.capabilities?.length ?? 0) <= 4, 'capabilities must not exceed four');
  expect(location, Array.isArray(artifact.costs) && artifact.costs.length > 0, 'costs must be non-empty');
  expect(location, Array.isArray(artifact.constraints) && artifact.constraints.length > 0, 'constraints must be non-empty');
  expect(location, Array.isArray(artifact.failureModes) && artifact.failureModes.length > 0, 'failureModes must be non-empty');
  expect(location, Array.isArray(artifact.counterplay) && artifact.counterplay.length > 0, 'counterplay must be non-empty');
  expect(location, artifact.memory?.authority === 'git-projection-only', 'memory must remain a Git projection');

  const forbidden = forbiddenKeys(artifact);
  expect(location, forbidden.length === 0, `forbidden capability keys found: ${forbidden.join(', ')}`);

  const gateRule = GATE_RULES.get(artifact.attunement?.gate);
  expect(location, Boolean(gateRule), `invalid Gate ${artifact.attunement?.gate}`);
  if (gateRule) {
    expect(location, artifact.attunement.tier === gateRule.tier, `Gate ${artifact.attunement.gate} requires tier ${gateRule.tier}`);
    expect(location, artifact.attunement.rank === gateRule.rank, `Gate ${artifact.attunement.gate} requires rank ${gateRule.rank}`);
  }

  const primaryElements = artifact.attunement?.primaryElements ?? [];
  expect(location, primaryElements.length > 0, 'primaryElements must be non-empty');
  expect(location, duplicates(primaryElements).length === 0, 'primaryElements must be unique');
  for (const element of primaryElements) {
    expect(location, PRIMARY_ELEMENTS.includes(element), `unknown primary Element ${element}`);
  }
  for (const discipline of artifact.attunement?.disciplines ?? []) {
    expect(location, DISCIPLINES.has(discipline), `unknown discipline ${discipline}`);
  }

  const world = profilesById.get(artifact.worldId);
  for (const domainId of artifact.attunement?.derivedDomains ?? []) {
    const domain = domainsById.get(domainId);
    expect(location, Boolean(domain), `unknown derived domain ${domainId}`);
    if (!domain) continue;
    expect(location, domain.class !== 'primary', `${domainId} must not be redundantly listed as a derived domain`);
    expect(location, domain.components.every((component) => primaryElements.includes(component)), `${domainId} requires components ${domain.components.join(', ')}`);
    expect(location, artifact.attunement.gate >= domain.minimumGate, `${domainId} requires Gate ${domain.minimumGate} or higher`);
    if (domain.class === 'derived') {
      expect(location, world.domains.enabledDerived.includes(domainId), `${domainId} is not enabled in ${artifact.worldId}`);
    }
    if (domain.class === 'corrupted') {
      expect(location, world.domains.restricted.includes(domainId), `${domainId} must be restricted in ${artifact.worldId}`);
      expect(location, artifact.status === 'quarantined', `${domainId} artifacts must be quarantined`);
    }
  }

  for (const cost of artifact.costs ?? []) {
    expect(location, COST_TYPES.has(cost.type), `unknown cost type ${cost.type}`);
    expect(location, Number.isInteger(cost.severity) && cost.severity >= 1 && cost.severity <= 5, 'cost severity must be 1-5');
  }

  const permanentCapabilities = (artifact.capabilities ?? []).filter((capability) => capability.permanent);
  if (permanentCapabilities.length > 0) {
    expect(location, artifact.attunement.gate >= 7, 'permanent transformation requires Gate Seven or higher');
    expect(location, world.artifactEcology.permanentImprinting === true, `${artifact.worldId} does not permit permanent imprinting`);
    expect(location, artifact.costs.some((cost) => ['ecology', 'identity'].includes(cost.type)), 'permanent transformation needs ecology or identity cost');
    expect(location, artifact.constraints.some((constraint) => constraint.type === 'consent'), 'permanent transformation needs explicit consent');
    expect(location, ['engine', 'pact'].includes(artifact.artifactClass), 'permanent transformation must use an Engine or Pact');
    expect(location, ['architecture', 'network', 'seed', 'symbiote'].includes(artifact.form), 'permanent transformation cannot use a portable generic form');
  }

  if (artifact.artifactClass === 'pact') {
    expect(location, ['sentient', 'sovereign'].includes(artifact.agency), 'Pact artifacts must be sentient or sovereign');
    expect(location, artifact.bond?.canRefuse === true, 'Pact artifacts must be able to refuse');
  }
  if (['sentient', 'sovereign'].includes(artifact.agency)) {
    expect(location, artifact.bond?.canRefuse === true, 'agentive artifacts must be able to refuse');
  }
  if (artifact.artifactClass === 'assembly') {
    expect(location, artifact.combination?.roles?.includes('core'), 'Assembly requires a Core role');
    expect(location, artifact.combination?.roles?.includes('keystone'), 'Assembly requires a Keystone role');
    expect(location, artifact.combination?.maxAssemblySize >= 2, 'Assembly size must be at least two');
  }

  expect(location, artifact.rights?.originalMechanics?.length >= 2, 'at least two original mechanics are required');
  for (const influenceId of artifact.rights?.inspirationIds ?? []) {
    expect(location, INFLUENCE_IDS.has(influenceId), `unregistered influence id ${influenceId}`);
  }
  if (artifact.rights?.similarityRisk === 'high') {
    expect(location, artifact.status === 'quarantined', 'high-similarity artifact must be quarantined');
    expect(location, artifact.rights.reviewStatus === 'redesign-required', 'high-similarity artifact requires redesign');
    expect(location, artifact.memory?.project === false, 'high-similarity artifact cannot project to memory');
  }
  if (artifact.status === 'approved') {
    expect(location, artifact.rights?.reviewStatus === 'cleared', 'approved artifact requires cleared rights review');
    expect(location, artifact.memory?.project === true, 'approved artifact must be projectable');
  }

  for (const relation of artifact.relations ?? []) {
    const targetExists = domainsById.has(relation.targetId)
      || profilesById.has(relation.targetId)
      || artifactsById.has(relation.targetId)
      || RANKS.has(relation.targetId);
    expect(location, targetExists, `relation target ${relation.targetId} does not exist`);
  }

  if (artifact.status === 'staging' && artifact.rights?.similarityRisk === 'medium') {
    warn(location, 'medium similarity risk requires explicit human rights review before approval');
  }
}

if (failures.length > 0) {
  console.error(`Artifact system validation failed with ${failures.length} error(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const emitIndex = process.argv.indexOf('--emit-memory');
let emittedPath = null;

if (emitIndex !== -1) {
  const suppliedPath = process.argv[emitIndex + 1];
  emittedPath = path.resolve(process.cwd(), suppliedPath && !suppliedPath.startsWith('--')
    ? suppliedPath
    : path.join(ROOT, 'dist', 'artifact-memory.jsonl'));
  const sourceCommit = process.env.GITHUB_SHA || 'local';
  const events = artifactDoc.artifacts
    .filter((artifact) => artifact.memory.project)
    .map((artifact) => ({
      eventType: 'lore.entity.upserted',
      entityType: 'artifact',
      entityId: artifact.id,
      worldId: artifact.worldId,
      canonScope: artifact.canonScope,
      status: artifact.status,
      version: artifact.version,
      sourcePath: 'magic-intelligence-system/data/artifacts.json',
      sourceCommit,
      contentHash: contentHash(artifact),
      namespace: artifact.memory.namespace,
      labels: artifact.memory.retrievalLabels,
      relations: artifact.relations ?? [],
      payload: artifact,
    }));

  await mkdir(path.dirname(emittedPath), { recursive: true });
  await writeFile(emittedPath, `${events.map((event) => JSON.stringify(event)).join('\n')}\n`, 'utf8');
  console.log(`Emitted ${events.length} Starlight Memory projection event(s) to ${emittedPath}`);
}

console.log(JSON.stringify({
  ok: true,
  schemaVersion: artifactDoc.schemaVersion,
  counts: {
    domains: domainDoc.domains.length,
    worldProfiles: profileDoc.profiles.length,
    artifacts: artifactDoc.artifacts.length,
    projectedArtifacts: artifactDoc.artifacts.filter((artifact) => artifact.memory.project).length,
  },
  warnings,
  emittedPath,
}, null, 2));
