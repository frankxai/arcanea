import test from 'node:test';
import assert from 'node:assert/strict';
import { scan } from './ontology-boundary-lint.mjs';

const violations = [
  'GOD — THE SOURCE — THE TAO',
  'Starlight is God',
  'Lumina is Starlight',
  'Shinkami is God',
  'The Tao is The Source',
  'all religions teach Starlight',
  'Kunlun was actually Arcanea',
  'quantum physics proves spiritual doctrine',
  'The Celts understood quantum realities before quantum physics',
  'The Field is the actual substrate from which all matter, energy, and consciousness emerge'
];

test('detects ontology and provenance violations', () => {
  for (const text of violations) assert.ok(scan(text).length > 0, text);
});

test('allows canonical distinctions', () => {
  for (const text of [
    'Starlight is not God.',
    'Lumina is not Starlight.',
    'Shinkami is not God.',
    'The Field is fictional Arcanean world mechanics.',
    'Shangri-La is a literary invention; Shambhala belongs to a Buddhist context.'
  ]) assert.deepEqual(scan(text), [], text);
});

