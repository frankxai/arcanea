import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const sandboxes = [];
const source = process.env.ARCANEA_TEST_SOURCE === '1';
const memoryModule = new URL(source ? '../src/memory/index.ts' : '../dist/memory/index.js', import.meta.url).href;
const authModule = new URL(source ? '../../auth/src/keystore/encrypted-file.ts' : '../../auth/dist/keystore/encrypted-file.js', import.meta.url).href;

function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'arcanea-persistence-'));
  sandboxes.push(root);
  const state = join(root, '.arcanea-test-state');
  mkdirSync(state);
  return { root, state, file: join(state, 'memories.json') };
}

after(() => {
  for (const root of sandboxes) {
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    assert.ok(basename(root).startsWith('arcanea-persistence-'));
    rmSync(root, { recursive: true, force: true });
  }
});

function prelude(root) {
  // Even the uncorrected implementation is confined to a fake home in this child.
  return `import os from 'node:os';
    import { syncBuiltinESMExports } from 'node:module';
    os.homedir = () => ${JSON.stringify(join(root, 'fake-home'))};
    syncBuiltinESMExports();
    import assert from 'node:assert/strict';
    import fs from 'node:fs';
    import path from 'node:path';`;
}

function run(box, body, options = {}) {
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', prelude(box.root) + body], {
    env: { ...process.env, ARCANEA_STATE_DIR: box.state, ...options.env },
    encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, options.status ?? 0, result.stderr);
  return result;
}

test('configured memory and credential stores stay outside the real home', () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    assert.equal(memory.getMemoryFilePath(), ${JSON.stringify(box.file)});
    memory.getOrCreateSession('isolated');
    const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    const store = new EncryptedFileKeystore();
    await store.save('openai', 'synthetic-credential');
    assert.equal(await store.load('openai'), 'synthetic-credential');
    assert.ok(fs.existsSync(path.join(process.env.ARCANEA_STATE_DIR, 'credentials.enc')));
    assert.ok(!fs.existsSync(path.join(os.homedir(), '.arcanea')));`);
});

test('default state location remains compatible when no override is supplied', () => {
  const box = sandbox();
  run(box, `delete process.env.ARCANEA_STATE_DIR;
    const memory = await import(${JSON.stringify(memoryModule)});
    assert.equal(memory.getMemoryFilePath(), path.join(os.homedir(), '.arcanea', 'memories.json'));
    const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    await new EncryptedFileKeystore().save('openai', 'synthetic-default');
    assert.ok(fs.existsSync(path.join(os.homedir(), '.arcanea', 'credentials.enc')));`);
});

test('empty or relative state overrides are refused before writing', () => {
  for (const override of ['', 'relative-state']) {
    const box = sandbox();
    run(box, `await assert.rejects(import(${JSON.stringify(memoryModule)}), /absolute/);
      await assert.rejects(import(${JSON.stringify(authModule)}), /absolute/);
      assert.ok(!fs.existsSync(path.join(os.homedir(), '.arcanea')));`, { env: { ARCANEA_STATE_DIR: override } });
  }
});

test('complete creative sessions survive a separate process reopening them', () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    memory.recordGateExplored('chapter', 1);
    memory.recordCreation('chapter', { id: 'scene', type: 'story', name: 'First scene',
      createdAt: new Date('2026-10-03T00:00:00Z'), summary: 'A choice with consequences.' });
    memory.updateSession('chapter', { preferences: { creativeStyle: 'close third person' } });`);
  const persisted = JSON.parse(readFileSync(box.file, 'utf8'));
  assert.equal(persisted.version, 1);
  assert.equal(persisted.sessions.chapter.creations[0].summary, 'A choice with consequences.');
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    const session = memory.getOrCreateSession('chapter');
    assert.deepEqual(session.gatesExplored, [1]);
    assert.equal(session.creations[0].name, 'First scene');
    assert.equal(session.preferences.creativeStyle, 'close third person');`);
});

test('failed replacement restores memory, preserves the previous file and permits retry', () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    memory.updateSession('chapter', { preferences: { creativeStyle: 'original' } });
    const original = fs.readFileSync(memory.getMemoryFilePath(), 'utf8');
    const rename = fs.renameSync;
    fs.renameSync = () => { throw Object.assign(new Error('synthetic rename refusal'), { code: 'EPERM' }); };
    syncBuiltinESMExports();
    assert.throws(() => memory.updateSession('chapter', { preferences: { creativeStyle: 'unsaved' } }), /rename refusal/);
    assert.equal(fs.readFileSync(memory.getMemoryFilePath(), 'utf8'), original);
    assert.equal(memory.getOrCreateSession('chapter').preferences.creativeStyle, 'original');
    assert.equal(fs.readdirSync(process.env.ARCANEA_STATE_DIR).filter(name => name.endsWith('.tmp')).length, 0);
    fs.renameSync = rename;
    syncBuiltinESMExports();
    memory.updateSession('chapter', { preferences: { creativeStyle: 'retry' } });
    assert.equal(JSON.parse(fs.readFileSync(memory.getMemoryFilePath(), 'utf8')).sessions.chapter.preferences.creativeStyle, 'retry');`);
});

test('invalid updates cannot commit a session that the next process would refuse', () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    memory.getOrCreateSession('chapter');
    const original = fs.readFileSync(memory.getMemoryFilePath(), 'utf8');
    assert.throws(() => memory.updateSession('chapter', { id: 'different' }), /Invalid creative session/);
    assert.equal(fs.readFileSync(memory.getMemoryFilePath(), 'utf8'), original);
    assert.equal(memory.getOrCreateSession('chapter').id, 'chapter');
    memory.recordGateExplored('chapter', 1);`);
});

test('corrupt existing memory is preserved and blocks destructive saves', () => {
  for (const bytes of ['', '{broken', JSON.stringify({ version: 2, sessions: {} })]) {
    const box = sandbox();
    writeFileSync(box.file, bytes);
    run(box, `const memory = await import(${JSON.stringify(memoryModule)});
      assert.throws(() => memory.getOrCreateSession('replacement'), /cannot be read/);
      assert.throws(() => memory.listSessions(), /cannot be read/);`);
    assert.equal(readFileSync(box.file, 'utf8'), bytes);
  }
});

test('credential save failure preserves encrypted bytes and supports retry', () => {
  const box = sandbox();
  run(box, `const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    const store = new EncryptedFileKeystore();
    await store.save('openai', 'synthetic-original');
    const file = path.join(process.env.ARCANEA_STATE_DIR, 'credentials.enc');
    const original = fs.readFileSync(file, 'utf8');
    const rename = fs.renameSync;
    fs.renameSync = () => { throw Object.assign(new Error('synthetic rename refusal'), { code: 'EPERM' }); };
    syncBuiltinESMExports();
    await assert.rejects(store.save('openai', 'synthetic-unsaved'), /rename refusal/);
    assert.equal(fs.readFileSync(file, 'utf8'), original);
    assert.equal(await store.load('openai'), 'synthetic-original');
    assert.equal(fs.readdirSync(process.env.ARCANEA_STATE_DIR).filter(name => name.endsWith('.tmp')).length, 0);
    fs.renameSync = rename;
    syncBuiltinESMExports();
    await store.save('openai', 'synthetic-retried');
    assert.equal(await store.load('openai'), 'synthetic-retried');`);
});

test('unreadable credentials are preserved and every store operation reports the failure', () => {
  for (const bytes of ['', 'corrupt-encrypted-data']) {
    const box = sandbox();
    const file = join(box.state, 'credentials.enc');
    writeFileSync(file, bytes);
    run(box, `const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
      const store = new EncryptedFileKeystore();
      await assert.rejects(store.load('openai'), /cannot be read/);
      await assert.rejects(store.list(), /cannot be read/);
      await assert.rejects(store.delete('openai'), /cannot be read/);
      await assert.rejects(store.save('openai', 'synthetic-replacement'), /cannot be read/);`);
    assert.equal(readFileSync(file, 'utf8'), bytes);
  }
});

test('credential interruption keeps the previous key usable after reopening', () => {
  const box = sandbox();
  const file = join(box.state, 'credentials.enc');
  run(box, `const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    await new EncryptedFileKeystore().save('openai', 'synthetic-original');`);
  const original = readFileSync(file, 'utf8');
  run(box, `const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    fs.renameSync = () => process.exit(17);
    syncBuiltinESMExports();
    await new EncryptedFileKeystore().save('openai', 'synthetic-interrupted');`, { status: 17 });
  assert.equal(readFileSync(file, 'utf8'), original);
  run(box, `const { EncryptedFileKeystore } = await import(${JSON.stringify(authModule)});
    const store = new EncryptedFileKeystore();
    assert.equal(await store.load('openai'), 'synthetic-original');
    await store.save('openai', 'synthetic-recovered');
    assert.equal(await store.load('openai'), 'synthetic-recovered');`);
});

test('interruption before replacement keeps the last complete file available', () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    memory.updateSession('chapter', { preferences: { creativeStyle: 'original' } });`);
  const original = readFileSync(box.file, 'utf8');
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    fs.renameSync = () => process.exit(17);
    syncBuiltinESMExports();
    memory.updateSession('chapter', { preferences: { creativeStyle: 'interrupted' } });`, { status: 17 });
  assert.equal(readFileSync(box.file, 'utf8'), original);
  assert.equal(readdirSync(box.state).filter(name => name.endsWith('.tmp')).length, 1);
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    assert.equal(memory.getOrCreateSession('chapter').preferences.creativeStyle, 'original');
    memory.updateSession('chapter', { preferences: { creativeStyle: 'recovered' } });`);
  assert.equal(JSON.parse(readFileSync(box.file, 'utf8')).sessions.chapter.preferences.creativeStyle, 'recovered');
});

test('busy concurrent readers see complete JSON and refused writes can recover', { timeout: 15000 }, async () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)}); memory.getOrCreateSession('chapter');`);
  const child = spawn(process.execPath, ['--input-type=module', '--eval', prelude(box.root) + `
    const memory = await import(${JSON.stringify(memoryModule)});
    process.stdout.write('ready');
    await new Promise(resolve => setTimeout(resolve, 40));
    let saved = 0, refused = 0;
    for (let i = 0; i < 12; i++) {
      try {
        memory.updateSession('chapter', { preferences: { creativeStyle: String(i) + 'x'.repeat(16384) } });
        saved++;
      } catch (error) {
        assert.ok(['EPERM', 'EACCES', 'EBUSY'].includes(error.code));
        assert.deepEqual(memory.getOrCreateSession('chapter').preferences,
          JSON.parse(fs.readFileSync(memory.getMemoryFilePath(), 'utf8')).sessions.chapter.preferences);
        refused++;
      }
    }
    process.stdout.write(JSON.stringify({ saved, refused }));`], {
    env: { ...process.env, ARCANEA_STATE_DIR: box.state }, stdio: ['ignore', 'pipe', 'pipe'],
    signal: AbortSignal.timeout(10000),
  });
  let errorOutput = '';
  let settled = false;
  let failed = null;
  let workerError = null;
  let workerOutput = '';
  child.stdout.on('data', bytes => { workerOutput += bytes; });
  child.stderr.on('data', bytes => { errorOutput += bytes; });
  const completion = new Promise(resolve => {
    child.once('error', error => { workerError = error; });
    child.once('close', code => { settled = true; resolve(code); });
  });
  try {
    let samples = 0;
    while (!settled) {
      try {
        const data = JSON.parse(readFileSync(box.file, 'utf8'));
        assert.equal(data.version, 1);
        assert.ok(data.sessions.chapter);
        samples++;
      } catch (error) { failed ??= error; }
      await new Promise(resolve => setImmediate(resolve));
    }
    assert.equal(await completion, 0, errorOutput);
    assert.equal(workerError, null);
    assert.equal(failed, null, failed?.message);
    assert.ok(samples > 5, 'reader must observe the writer while it runs');
    const outcome = JSON.parse(workerOutput.slice('ready'.length));
    assert.equal(outcome.saved + outcome.refused, 12);
    run(box, `const memory = await import(${JSON.stringify(memoryModule)});
      memory.updateSession('chapter', { preferences: { creativeStyle: 'after contention' } });`);
    assert.equal(JSON.parse(readFileSync(box.file, 'utf8')).sessions.chapter.preferences.creativeStyle, 'after contention');
  } finally {
    if (!settled) child.kill();
  }
});

test('Windows replacement retries transient handle contention before succeeding', { skip: process.platform !== 'win32' }, () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)});
    const rename = fs.renameSync;
    let calls = 0;
    fs.renameSync = (...args) => {
      if (++calls < 3) throw Object.assign(new Error('synthetic brief contention'), { code: 'EPERM' });
      return rename(...args);
    };
    syncBuiltinESMExports();
    memory.getOrCreateSession('retry');
    assert.equal(calls, 3);
    assert.ok(JSON.parse(fs.readFileSync(memory.getMemoryFilePath(), 'utf8')).sessions.retry);`);
});

test('new memory files are private on platforms with POSIX mode bits', { skip: process.platform === 'win32' }, () => {
  const box = sandbox();
  run(box, `const memory = await import(${JSON.stringify(memoryModule)}); memory.getOrCreateSession('private');`);
  assert.equal(statSync(box.file).mode & 0o777, 0o600);
});
