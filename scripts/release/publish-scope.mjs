import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { open, readFile, readdir, realpath, rename, unlink } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const planPath = '.changeset/release-plan.json';
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

export function command(cwd, executable, args, timeout = 20_000) {
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8', timeout, windowsHide: true, maxBuffer: 10 * 1024 * 1024 });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `Release command failed: ${args.join(' ')}\n${result.stderr}`);
  return result.stdout;
}

export function pnpm(cwd, args, timeout) {
  const cli = process.env.npm_execpath;
  assert.ok(cli && isAbsolute(cli), 'Run release commands through pnpm');
  assert.match(process.env.npm_config_user_agent ?? '', /^pnpm\/8\.15\.0\s/);
  return command(cwd, process.execPath, [cli, ...args], timeout);
}

export async function workspaces(cwd) {
  const rows = JSON.parse(pnpm(cwd, ['list', '-r', '--depth', '-1', '--json']));
  assert.ok(Array.isArray(rows) && rows.length, 'No workspace inventory');
  const repository = await realpath(cwd);
  const packages = [];
  for (const row of rows) {
    const child = relative(repository, await realpath(row.path));
    if (!child) continue; // Changesets excludes the workspace root.
    assert.ok(child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child), 'Workspace escapes repository');
    const path = child.split(sep).join('/');
    assert.match(path, /^(apps|packages|tools)\/[^/]+$/);
    const manifest = JSON.parse(await readFile(join(cwd, path, 'package.json'), 'utf8'));
    assert.equal(manifest.name, row.name);
    assert.equal(manifest.version, row.version);
    assert.match(manifest.name, /^(?:@[a-z0-9._-]+\/)?[a-z0-9._-]+$/);
    assert.equal(typeof manifest.version, 'string');
    assert.ok(!manifest.publishConfig?.registry || manifest.publishConfig.registry === 'https://registry.npmjs.org', 'Only the public npm registry is supported');
    packages.push({ name: manifest.name, version: manifest.version, path, private: manifest.private === true });
  }
  assert.equal(new Set(packages.map((p) => p.name)).size, packages.length, 'Duplicate package names');
  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

export function validateRegistryConfig(cwd, packages) {
  const keys = ['registry', ...new Set(packages.filter((p) => !p.private && p.name.startsWith('@')).map((p) => `${p.name.split('/')[0]}:registry`))];
  for (const key of keys) {
    const value = pnpm(cwd, ['config', 'get', key]).trim();
    if (key !== 'registry' && (value === 'undefined' || value === 'null')) continue;
    let registry;
    try { registry = new URL(value); } catch { throw new Error('Registry configuration could not be resolved to public npm'); }
    assert.ok(registry.href === 'https://registry.npmjs.org/', 'Registry configuration differs from the public npm admission endpoint');
  }
}

export function releases(before, after) {
  const previous = new Map(before.map((p) => [p.name, p]));
  assert.equal(before.length, after.length, 'Versioning changed workspace inventory');
  return after.flatMap((p) => {
    const old = previous.get(p.name);
    assert.ok(old && old.path === p.path && old.private === p.private, 'Versioning changed package identity or privacy');
    return !p.private && p.version !== old.version ? [{ name: p.name, version: p.version, path: p.path }] : [];
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export async function pendingChangesets(cwd) {
  return (await readdir(join(cwd, '.changeset'))).filter((name) => name.endsWith('.md') && name !== 'README.md').sort().map((name) => `.changeset/${name}`);
}

async function metadata(cwd, packages) {
  const paths = ['pnpm-lock.yaml'];
  for (const p of packages) {
    paths.push(`${p.path}/package.json`);
    try {
      await readFile(join(cwd, p.path, 'CHANGELOG.md'));
      paths.push(`${p.path}/CHANGELOG.md`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  const result = {};
  // Git text checkouts may use CRLF on Windows; bind canonical content across runners.
  for (const path of paths.sort()) result[path] = sha256((await readFile(join(cwd, path), 'utf8')).replaceAll('\r\n', '\n'));
  return result;
}

export async function makePlan(cwd, baseCommit, before, after, consumedChangesets) {
  return { schemaVersion: 1, baseCommit, releases: releases(before, after), metadata: await metadata(cwd, after), consumedChangesets };
}

export async function writePlan(cwd, plan) {
  const destination = join(cwd, planPath);
  const temporary = `${destination}.${randomUUID()}.tmp`;
  let owned = false;
  try {
    const file = await open(temporary, 'wx');
    owned = true;
    try { await file.writeFile(JSON.stringify(plan, null, 2) + '\n'); }
    finally { await file.close(); }
    await rename(temporary, destination);
  } finally {
    if (owned) await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; });
  }
}

export async function validatePlan(cwd, plan, packages) {
  assert.equal(plan.schemaVersion, 1, 'Unknown release plan schema');
  assert.match(plan.baseCommit, /^[a-f0-9]{40}$/);
  assert.ok(Array.isArray(plan.releases) && Array.isArray(plan.consumedChangesets));
  const git = (...args) => command(cwd, 'git', args);
  git('merge-base', '--is-ancestor', plan.baseCommit, 'HEAD');
  git('diff', '--quiet', 'HEAD', '--');
  assert.deepEqual(await pendingChangesets(cwd), [], 'Pending changesets must be versioned first');
  const before = packages.map((p) => {
    const old = JSON.parse(git('show', `${plan.baseCommit}:${p.path}/package.json`));
    return { name: old.name, version: old.version, path: p.path, private: old.private === true };
  });
  assert.deepEqual(plan.releases, releases(before, packages), 'Release intent does not match version changes');
  assert.deepEqual(plan.metadata, await metadata(cwd, packages), 'Release metadata changed after versioning');
  for (const path of plan.consumedChangesets) {
    assert.match(path, /^\.changeset\/[a-zA-Z0-9_-]+\.md$/);
    assert.notEqual(path, '.changeset/README.md');
    git('show', `${plan.baseCommit}:${path}`); // A consumed changeset must exist in its recorded source.
  }
  const allowed = new Set([planPath, ...Object.keys(plan.metadata), ...plan.consumedChangesets]);
  const changed = git('diff', '--name-only', '-z', plan.baseCommit, 'HEAD', '--').split('\0').filter(Boolean);
  assert.deepEqual(changed.filter((path) => !allowed.has(path)), [], 'Source changed after release planning; regenerate from current main');
}

export async function unpublished(packages, fetchImpl = fetch) {
  const publicPackages = packages.filter((p) => !p.private);
  const result = [];
  for (let i = 0; i < publicPackages.length; i += 4) {
    const batch = await Promise.allSettled(publicPackages.slice(i, i + 4).map(async (p) => {
      const url = `https://registry.npmjs.org/${encodeURIComponent(p.name)}/${encodeURIComponent(p.version)}`;
      const response = await fetchImpl(url, { signal: AbortSignal.timeout(8_000), redirect: 'error' });
      if (response.status === 404) { await response.body?.cancel(); return p; }
      assert.equal(response.status, 200, `Registry lookup refused for ${p.name}@${p.version}: HTTP ${response.status}`);
      const data = await response.json();
      assert.equal(data.name, p.name, 'Registry returned another package');
      assert.equal(data.version, p.version, 'Registry returned another version');
      return null;
    }));
    const failed = batch.find((r) => r.status === 'rejected');
    if (failed) throw failed.reason;
    result.push(...batch.map((r) => r.value).filter(Boolean));
  }
  return result;
}

export function assertPublishScope(plan, candidates) {
  const planned = new Set(plan.releases.map((p) => `${p.name}@${p.version}`));
  const unexpected = candidates.map((p) => `${p.name}@${p.version}`).filter((name) => !planned.has(name));
  assert.deepEqual(unexpected, [], `Unplanned publication refused: ${unexpected.join(', ')}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const cwd = process.cwd();
    const plan = JSON.parse(await readFile(join(cwd, planPath), 'utf8'));
    const packages = await workspaces(cwd);
    validateRegistryConfig(cwd, packages);
    await validatePlan(cwd, plan, packages);
    const candidates = await unpublished(packages);
    assertPublishScope(plan, candidates);
    console.log(`Publish scope verified: ${candidates.length} unpublished versions within ${plan.releases.length} planned releases.`);
  } catch (error) {
    console.error(`Publication refused: ${error.message}`);
    process.exitCode = 1;
  }
}
