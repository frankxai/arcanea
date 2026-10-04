import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertPublishScope, command, makePlan, planPath, releases, unpublished, validatePlan, validateRegistryConfig, workspaces, writePlan } from '../release/publish-scope.mjs';

const fixture = JSON.parse(await readFile(new URL('./fixtures/release-publish-scope.json', import.meta.url), 'utf8'));
const after = fixture.workspaces;
const before = after.map((p) => ({ ...p, version: p.beforeVersion }));
const plan = { releases: releases(before, after) };
const registry = async (url) => {
  const p = after.find((p) => url.endsWith(`/${encodeURIComponent(p.name)}/${encodeURIComponent(p.version)}`));
  assert.ok(p && !p.private);
  return p.published ? Response.json({ name: p.name, version: p.version }) : new Response(null, { status: 404 });
};

test('actual 43-package publishing surface refuses all 14 unversioned candidates', async () => {
  assert.equal(plan.releases.length, 12);
  const candidates = await unpublished(after, registry);
  assert.equal(candidates.length, 26);
  assert.throws(() => assertPublishScope(plan, candidates), /Unplanned publication refused/);
  const unexpected = candidates.filter((p) => !plan.releases.some((r) => r.name === p.name));
  assert.equal(unexpected.length, 14);
  assert.ok(unexpected.some((p) => p.name === 'arcanea-premium-web'));
  assert.ok(unexpected.some((p) => p.name === '@arcanea/mcp-server'));
  assert.equal(unexpected.filter((p) => p.path.startsWith('tools/')).length, 4);
});

test('only planned missing versions pass, including a retry after partial publication', () => {
  assertPublishScope(plan, plan.releases);
  assertPublishScope(plan, plan.releases.slice(1));
  assertPublishScope(plan, []);
  assert.throws(() => assertPublishScope(plan, [{ ...plan.releases[0], version: '999.0.0' }]), /Unplanned/);
});

test('registry reads are limited to four, private packages are excluded and all reads finish', async () => {
  let active = 0; let maximum = 0; let count = 0;
  await unpublished(after, async (url, options) => {
    active++; maximum = Math.max(maximum, active); count++;
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(options.redirect, 'error');
    await new Promise((resolve) => setImmediate(resolve));
    active--;
    return registry(url);
  });
  assert.equal(maximum, 4);
  assert.equal(active, 0);
  assert.equal(count, 43);
});

for (const status of [401, 403, 429, 500]) {
  test(`HTTP ${status} refuses registry admission`, async () => {
    await assert.rejects(unpublished(after.slice(0, 1), async () => new Response(null, { status })), /Registry lookup refused/);
  });
}
test('network, malformed response and substituted identity all refuse admission', async () => {
  const packages = [plan.releases[0]];
  await assert.rejects(unpublished(packages, async () => { throw new Error('network interrupted'); }), /interrupted/);
  await assert.rejects(unpublished(packages, async () => new Response('{', { status: 200 })), SyntaxError);
  await assert.rejects(unpublished(packages, async () => Response.json({ name: 'another', version: packages[0].version })), /another package/);
  await assert.rejects(unpublished(packages, async () => Response.json({ name: packages[0].name, version: '999.0.0' })), /another version/);
});

async function workspace(run) {
  const parent = resolve(tmpdir());
  const cwd = await mkdtemp(join(parent, 'arcanea-publish-scope-'));
  try {
    await mkdir(join(cwd, '.changeset'));
    await writeFile(join(cwd, '.gitattributes'), '*.json text eol=lf\n*.yaml text eol=lf\n*.md text eol=lf\n');
    await mkdir(join(cwd, 'packages/core'), { recursive: true });
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'scope-test', private: true, packageManager: 'pnpm@8.15.0' }));
    await writeFile(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n');
    await writeFile(join(cwd, 'packages/core/package.json'), JSON.stringify({ name: '@arcanea/test-core', version: '0.1.0' }));
    await writeFile(join(cwd, 'packages/core/index.js'), 'export const value = 1;\n');
    await writeFile(join(cwd, 'pnpm-lock.yaml'), 'lockfileVersion: 6.0\n');
    await writeFile(join(cwd, '.changeset/scope-fixture.md'), '---\n"@arcanea/test-core": minor\n---\nFixture release.\n');
    command(cwd, 'git', ['init', '--initial-branch=main']);
    const commit = () => {
      command(cwd, 'git', ['add', '--', '.']);
      command(cwd, 'git', ['-c', 'user.name=Arcanea test', '-c', 'user.email=release-test@invalid.example', 'commit', '-m', 'Fixture']);
    };
    commit();
    const base = command(cwd, 'git', ['rev-parse', 'HEAD']).trim();
    const before = await workspaces(cwd);
    await writeFile(join(cwd, 'packages/core/package.json'), JSON.stringify({ name: '@arcanea/test-core', version: '0.2.0' }));
    await rm(join(cwd, '.changeset/scope-fixture.md'));
    const after = await workspaces(cwd);
    const plan = await makePlan(cwd, base, before, after, ['.changeset/scope-fixture.md']);
    await writePlan(cwd, plan);
    commit();
    await run({ cwd, plan, packages: after, commit });
  } finally {
    const child = relative(parent, resolve(cwd));
    assert.equal(dirname(cwd), parent);
    assert.ok(child && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child));
    assert.ok(basename(cwd).startsWith('arcanea-publish-scope-'));
    await rm(cwd, { recursive: true });
  }
}

test('actual pnpm discovery and Git release history validate a generated atomic plan', () => workspace(async ({ cwd, plan, packages }) => {
  await validatePlan(cwd, plan, packages);
  assert.deepEqual(JSON.parse(await readFile(join(cwd, planPath), 'utf8')), plan);
}));
test('failed atomic plan serialization preserves the old plan and removes only its own temporary file', () => workspace(async ({ cwd, plan }) => {
  const before = await readFile(join(cwd, planPath));
  const circular = {}; circular.self = circular;
  await assert.rejects(writePlan(cwd, circular), TypeError);
  assert.deepEqual(await readFile(join(cwd, planPath)), before);
  assert.deepEqual(await readdir(join(cwd, '.changeset')), ['release-plan.json']);
  await writePlan(cwd, plan);
  assert.deepEqual(await readFile(join(cwd, planPath)), before);
}));
test('Git-equivalent Windows line endings retain the canonical metadata binding', () => workspace(async ({ cwd, plan, packages }) => {
  const path = join(cwd, 'pnpm-lock.yaml');
  await writeFile(path, (await readFile(path, 'utf8')).replaceAll('\n', '\r\n'));
  await validatePlan(cwd, plan, packages);
}));
test('actual default and scoped pnpm registry overrides refuse mismatched admission', () => workspace(async ({ cwd, packages }) => {
  await writeFile(join(cwd, '.npmrc'), 'registry=https://registry.npmjs.org/\n@arcanea:registry=https://registry.npmjs.org/\n');
  validateRegistryConfig(cwd, packages);
  await writeFile(join(cwd, '.npmrc'), 'registry=https://example.invalid/\n');
  assert.throws(() => validateRegistryConfig(cwd, packages), /Registry configuration/);
  await writeFile(join(cwd, '.npmrc'), 'registry=https://registry.npmjs.org/\n@arcanea:registry=https://example.invalid/\n');
  assert.throws(() => validateRegistryConfig(cwd, packages), /Registry configuration/);
}));
test('package-directory scoped registry overrides refuse publication with pinned pnpm', () => workspace(async ({ cwd, packages }) => {
  const packageCwd = join(cwd, 'packages/core');
  await writeFile(join(cwd, '.npmrc'), 'registry=https://registry.npmjs.org/\n@arcanea:registry=https://registry.npmjs.org/\n');
  await writeFile(join(packageCwd, '.npmrc'), 'registry=https://example.invalid/\n');
  assert.equal(command(packageCwd, process.execPath, [process.env.npm_execpath, 'config', 'get', 'registry']).trim(), 'https://registry.npmjs.org/');
  validateRegistryConfig(cwd, packages);
  await writeFile(join(packageCwd, '.npmrc'), 'registry=https://registry.npmjs.org/\n@arcanea:registry=https://example.invalid/\n');
  assert.equal(command(packageCwd, process.execPath, [process.env.npm_execpath, 'config', 'get', '@arcanea:registry']).trim(), 'https://example.invalid/');
  assert.throws(() => validateRegistryConfig(cwd, packages), /Registry configuration/);
  await writeFile(join(packageCwd, '.npmrc'), 'registry=https://registry.npmjs.org/\n@arcanea:registry=https://registry.npmjs.org/\n');
  validateRegistryConfig(cwd, packages);
}));
test('the pinned publisher scoped publishConfig registry cannot bypass admission', () => workspace(async ({ cwd }) => {
  const path = join(cwd, 'packages/core/package.json');
  const manifest = JSON.parse(await readFile(path, 'utf8'));
  manifest.publishConfig = { '@arcanea:registry': 'https://example.invalid/' };
  await writeFile(path, JSON.stringify(manifest));
  await assert.rejects(workspaces(cwd), /Registry configuration/);
  manifest.publishConfig['@arcanea:registry'] = 'https://registry.npmjs.org/';
  manifest.publishConfig.registry = 'https://registry.npmjs.org/';
  await writeFile(path, JSON.stringify(manifest));
  assert.equal((await workspaces(cwd))[0].name, manifest.name);
}));
test('no pending changesets preserves the existing plan and lock without pnpm mutation', () => workspace(async ({ cwd }) => {
  const lockBefore = await readFile(join(cwd, 'pnpm-lock.yaml'));
  const planBefore = await readFile(join(cwd, planPath));
  const probe = join(cwd, 'pnpm-mutation-probe.mjs');
  await writeFile(probe, `import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const args = process.argv.slice(2); const cwd = process.cwd();
appendFileSync(join(cwd, 'pnpm-called'), JSON.stringify(args) + '\\n');
if (args[0] === 'list') { const manifest = JSON.parse(readFileSync(join(cwd, 'packages/core/package.json'))); console.log(JSON.stringify([{ ...manifest, path: join(cwd, 'packages/core') }])); }
else { writeFileSync(join(cwd, 'pnpm-lock.yaml'), 'unexpected mutation\\n'); }
`);
  const version = fileURLToPath(new URL('../release/version-packages.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [version], { cwd, encoding: 'utf8', timeout: 10_000, windowsHide: true, env: { ...process.env, npm_execpath: probe, npm_config_user_agent: 'pnpm/8.15.0 node/test' } });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(await readFile(join(cwd, 'pnpm-lock.yaml')), lockBefore);
  assert.deepEqual(await readFile(join(cwd, planPath)), planBefore);
  await assert.rejects(readFile(join(cwd, 'pnpm-called')), { code: 'ENOENT' });
}));
test('an invented release version cannot expand publication intent', () => workspace(async ({ cwd, plan, packages }) => {
  const forged = { ...plan, releases: [{ ...plan.releases[0], version: '999.0.0' }] };
  await assert.rejects(validatePlan(cwd, forged, packages), /does not match version changes/);
}));
test('committed source edits after planning refuse publication', () => workspace(async ({ cwd, plan, packages, commit }) => {
  await writeFile(join(cwd, 'packages/core/index.js'), 'export const value = 2;\n'); commit();
  await assert.rejects(validatePlan(cwd, plan, packages), /Source changed after release planning/);
}));
test('committed metadata edits and newly pending changesets refuse publication', () => workspace(async ({ cwd, plan, packages, commit }) => {
  await writeFile(join(cwd, 'pnpm-lock.yaml'), 'lockfileVersion: 9.0\n'); commit();
  await assert.rejects(validatePlan(cwd, plan, packages), /Release metadata changed/);
  await writeFile(join(cwd, '.changeset/new-fixture.md'), '---\n---\nNext release.\n'); commit();
  await assert.rejects(validatePlan(cwd, plan, packages), /Pending changesets/);
}));
test('missing plan exits nonzero before a publisher chained with && can run', async () => {
  const parent = resolve(tmpdir());
  const cwd = await mkdtemp(join(parent, 'arcanea-publish-scope-denial-'));
  try {
    const guard = fileURLToPath(new URL('../release/publish-scope.mjs', import.meta.url));
    assert.doesNotMatch(guard, /["%]/);
    const quoted = process.platform === 'win32' ? `"${guard}"` : `'${guard.replaceAll("'", "'\\''")}'`;
    await writeFile(join(cwd, 'publisher.mjs'), "import { writeFileSync } from 'node:fs'; writeFileSync('publisher-ran', 'unexpected');\n");
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'scope-denial', private: true, packageManager: 'pnpm@8.15.0', scripts: { deny: `node ${quoted} && node publisher.mjs` } }));
    const result = spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'deny'], { cwd, encoding: 'utf8', timeout: 10_000, windowsHide: true });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Publication refused/);
    assert.equal(result.signal, null);
    await assert.rejects(readFile(join(cwd, 'publisher-ran')), { code: 'ENOENT' });
  } finally {
    assert.equal(dirname(cwd), parent);
    assert.ok(basename(cwd).startsWith('arcanea-publish-scope-denial-'));
    await rm(cwd, { recursive: true });
  }
});
