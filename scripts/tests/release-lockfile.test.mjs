import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import test from 'node:test';

const fixture = JSON.parse(await readFile(new URL('./fixtures/release-package-versions.json', import.meta.url), 'utf8'));
const pnpmCli = process.env.npm_execpath;

// pnpm run supplies its actual JavaScript entry point on Windows and Linux.
// Avoid shell quoting, global shim versions, downloads, and real workspace writes.
assert.ok(pnpmCli && isAbsolute(pnpmCli), 'Run this suite through pnpm test:release');
await access(pnpmCli);
assert.match(process.env.npm_config_user_agent ?? '', /^pnpm\/8\.15\.0\s/);

function install(cwd, frozen) {
  return spawnSync(process.execPath, [
    pnpmCli,
    'install',
    '--lockfile-only',
    '--ignore-scripts',
    '--offline',
    frozen ? '--frozen-lockfile' : '--no-frozen-lockfile',
  ], {
    cwd,
    encoding: 'utf8',
    timeout: 15_000,
    windowsHide: true,
    env: { ...process.env, CI: 'true' },
  });
}

function expectSuccess(result) {
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  assert.equal(result.status, 0, result.stdout + result.stderr);
}

async function writePackages(cwd, version) {
  for (const entry of fixture.packages) {
    const path = join(cwd, entry.path, 'package.json');
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(entry[version], null, 2) + '\n');
  }
}

async function withWorkspace(run) {
  const temporaryRoot = resolve(tmpdir());
  const cwd = await mkdtemp(join(temporaryRoot, 'arcanea-release-regression-'));
  try {
    await writeFile(join(cwd, 'package.json'), JSON.stringify({
      name: 'arcanea-release-regression',
      private: true,
      packageManager: 'pnpm@8.15.0',
      scripts: {
        preinstall: 'node -e "require(\'node:fs\').writeFileSync(\'lifecycle-ran\', \'unexpected\')"',
      },
    }, null, 2) + '\n');
    await writeFile(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - "packages/*"\n');
    await writeFile(join(cwd, '.npmrc'), 'link-workspace-packages=true\nshared-workspace-lockfile=true\n');
    await writePackages(cwd, 'before');
    await run(cwd);
  } finally {
    // Only this invocation's newly created fixture may be removed.
    const child = relative(temporaryRoot, resolve(cwd));
    assert.equal(dirname(cwd), temporaryRoot);
    assert.ok(child && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child));
    assert.ok(basename(cwd).startsWith('arcanea-release-regression-'));
    await rm(cwd, { recursive: true });
  }
}

async function expectAbsent(path) {
  await assert.rejects(access(path), { code: 'ENOENT' });
}

async function expectIsolated(cwd) {
  await expectAbsent(join(cwd, 'node_modules'));
  await expectAbsent(join(cwd, 'lifecycle-ran'));
  for (const entry of fixture.packages) {
    await expectAbsent(join(cwd, entry.path, 'node_modules'));
    assert.deepEqual(JSON.parse(await readFile(join(cwd, entry.path, 'package.json'), 'utf8')), entry.after);
  }
}

test('release range changes refuse the old lock, then regenerate and pass frozen verification', { timeout: 60_000 }, async () => {
  await withWorkspace(async (cwd) => {
    expectSuccess(install(cwd, false));
    const beforeLock = await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8');
    await writePackages(cwd, 'after');

    const stale = install(cwd, true);
    assert.ifError(stale.error);
    assert.equal(stale.signal, null);
    assert.notEqual(stale.status, 0);
    assert.match(stale.stdout + stale.stderr, /ERR_PNPM_OUTDATED_LOCKFILE/);
    assert.equal(await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8'), beforeLock);

    expectSuccess(install(cwd, false));
    const generatedLock = await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8');
    assert.notEqual(generatedLock, beforeLock);
    expectSuccess(install(cwd, true));
    assert.equal(await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8'), generatedLock);
    await expectIsolated(cwd);
  });
});

test('an impossible workspace release refuses regeneration and preserves the existing lock', { timeout: 45_000 }, async () => {
  await withWorkspace(async (cwd) => {
    expectSuccess(install(cwd, false));
    const beforeLock = await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8');
    await writePackages(cwd, 'after');
    const auth = fixture.packages.find((entry) => entry.after.name === '@arcanea/auth');
    const invalid = structuredClone(auth.after);
    invalid.dependencies['@arcanea/core'] = 'workspace:9.0.0';
    await writeFile(join(cwd, auth.path, 'package.json'), JSON.stringify(invalid, null, 2) + '\n');

    const refused = install(cwd, false);
    assert.ifError(refused.error);
    assert.equal(refused.signal, null);
    assert.notEqual(refused.status, 0);
    assert.match(refused.stdout + refused.stderr, /ERR_PNPM_NO_MATCHING_VERSION_INSIDE_WORKSPACE/);
    assert.equal(await readFile(join(cwd, 'pnpm-lock.yaml'), 'utf8'), beforeLock);
    await expectAbsent(join(cwd, 'node_modules'));
    await expectAbsent(join(cwd, 'lifecycle-ran'));
  });
});
