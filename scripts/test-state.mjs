import { after } from 'node:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';

// Each test child gets a distinct store before importing modules that resolve paths.
export const stateDirectory = mkdtempSync(join(tmpdir(), '.arcanea-test-'));
process.env.ARCANEA_STATE_DIR = stateDirectory;

after(() => {
  if (dirname(resolve(stateDirectory)) !== resolve(tmpdir()) || !basename(stateDirectory).startsWith('.arcanea-test-')) {
    throw new Error('Refusing cleanup outside the owned test sandbox.');
  }
  rmSync(stateDirectory, { recursive: true, force: true });
});
