/**
 * Arcanea Memory System — Integration Test Suite
 *
 * Tests the full system end-to-end using a temp directory.
 * Covers: VaultManager, HorizonLedger, VaultClassifier,
 * TTL expiry, Guardian namespaces, vault protection.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeTmpDir(label: string): string {
  return mkdtempSync(join(tmpdir(), `arcanea-${label}-`));
}

// ── Full Workflow ────────────────────────────────────────────────────────────

describe('Arcanea Memory System — Integration', () => {
  let rootTmpDir: string;

  before(() => {
    rootTmpDir = makeTmpDir('root');
  });

  after(() => {
    rmSync(rootTmpDir, { recursive: true, force: true });
  });

  // ── 1. Full Workflow: Remember → Recall → Stats ──────────────────────────

  describe('Full Workflow: Remember → Recall → Stats', () => {
    it('complete memory lifecycle works', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'lifecycle'),
      });
      await manager.initialize();

      // 1. Remember — strategic vault (explicit)
      const strategic = await manager.remember({
        content: 'Architecture decision: use file-based storage for zero-dependency simplicity',
        tags: ['architecture', 'storage', 'decision'],
        vault: 'strategic',
        guardian: 'Lyssandria',
        confidence: 'high',
      });
      assert.ok(strategic.id, 'strategic entry has an ID');
      assert.equal(strategic.vault, 'strategic');
      assert.equal(strategic.confidence, 'high');
      assert.ok(strategic.createdAt > 0, 'createdAt is a positive timestamp');

      // 2. Remember — technical vault (explicit)
      const technical = await manager.remember({
        content: 'Pattern: YAML frontmatter in .md files for human-readable memory storage',
        vault: 'technical',
        tags: ['pattern', 'yaml', 'markdown'],
        guardian: 'Draconia',
      });
      assert.equal(technical.vault, 'technical');

      // 3. Remember — horizon vault (explicit)
      const horizon = await manager.remember({
        content: 'I wish for AI systems that amplify human creativity, serving as true partners',
        vault: 'horizon',
        tags: ['wish', 'ai-alignment', 'creativity'],
        guardian: 'Shinkami',
      });
      assert.equal(horizon.vault, 'horizon');

      // 4. Recall relevant memories
      const results = await manager.recall({ query: 'storage architecture', limit: 5 });
      assert.ok(results.length > 0, 'recall finds memories');
      assert.ok(results[0].score > 0, 'results have scores');

      // 5. Recall filtered by guardian
      const shinkamiResults = await manager.recall({
        query: 'wish',
        guardian: 'Shinkami',
      });
      assert.ok(
        shinkamiResults.every((r) => r.entry.guardian === 'Shinkami'),
        'guardian filter works',
      );

      // 6. Get by guardian
      const shinkamiMemories = await manager.getByGuardian('Shinkami');
      assert.ok(shinkamiMemories.length >= 1);
      assert.ok(shinkamiMemories.every((e) => e.guardian === 'Shinkami'));

      // 7. Stats
      const stats = await manager.getStats();
      assert.ok(stats.totalEntries >= 3, `expected >= 3 entries, got ${stats.totalEntries}`);
      // stats.vaults is the correct field name (not vaultStats)
      assert.equal(stats.vaults.length, 6, 'six vaults in stats');
      const strategicStats = stats.vaults.find((v) => v.vault === 'strategic');
      assert.ok(strategicStats, 'strategic vault in stats');
      assert.ok(
        strategicStats!.count >= 1,
        `strategic count should be >= 1, got ${strategicStats!.count}`,
      );

      // 8. Recent entries
      const recent = await manager.getRecent(undefined, 10);
      assert.ok(recent.length >= 3, `expected >= 3 recent, got ${recent.length}`);

      // 9. Count
      const total = await manager.count();
      assert.ok(total >= 3, `expected count >= 3, got ${total}`);
    });

    it('auto-classification assigns vaults based on content', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'auto-classify'),
      });
      await manager.initialize();

      // No vault provided — should auto-classify
      const entry = await manager.remember({
        content: 'Bug in the API endpoint caused a deployment failure',
        tags: ['bug', 'deploy'],
      });
      // Should land in 'technical' due to 'api', 'endpoint', 'deploy' keywords
      assert.equal(entry.vault, 'technical', 'auto-classified as technical');
    });

    it('throws on empty content', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'empty-content'),
      });
      await manager.initialize();

      await assert.rejects(
        () => manager.remember({ content: '' }),
        { message: /empty/i },
      );

      await assert.rejects(
        () => manager.remember({ content: '   ' }),
        { message: /empty/i },
      );
    });
  });

  // ── 2. HorizonLedger — Append-Only Permanence ────────────────────────────

  describe('HorizonLedger — Append-Only Permanence', () => {
    it('horizon is truly append-only', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-test'));
      await ledger.initialize();

      // Seed founding wishes
      const founded = await ledger.seedFoundingWishes();
      assert.equal(founded.length, 5, 'seeds exactly 5 founding wishes');

      // Append a custom wish
      const wish = await ledger.append(
        'That developers everywhere find flow states and build with joy',
        'Integration testing the HorizonLedger',
        'test-runner',
        true,
        ['test', 'joy', 'flow'],
      );

      assert.ok(wish.id.startsWith('horizon_'), 'ID starts with horizon_');
      assert.ok(wish.createdAt, 'has createdAt');
      assert.equal(wish.coAuthored, true, 'coAuthored flag correct');
      assert.equal(wish.author, 'test-runner', 'author preserved');
      assert.deepEqual(wish.tags, ['test', 'joy', 'flow'], 'tags preserved');

      // All entries persisted
      const all = await ledger.getAll();
      assert.ok(all.length >= 6, `expected >= 6 entries, got ${all.length}`);

      // getRecent returns most recent first
      const recent = await ledger.getRecent(3);
      assert.equal(recent[0].id, wish.id, 'most recent entry is first');
      assert.equal(recent.length, 3, 'limited to 3');

      // Count tracks correctly
      assert.equal(ledger.getCount(), all.length, 'count matches total entries');

      // Search works
      const found = await ledger.search('joy developers flow');
      assert.ok(found.length >= 1, 'search finds the appended wish');
      assert.ok(
        found.some((e) => e.wish.includes('joy')),
        'search result contains "joy"',
      );
    });

    it('seeding is idempotent — only seeds once', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-idempotent'));
      await ledger.initialize();

      const firstSeed = await ledger.seedFoundingWishes();
      assert.equal(firstSeed.length, 5, 'first seed returns 5 entries');

      // Second call should be a no-op
      const secondSeed = await ledger.seedFoundingWishes();
      assert.equal(secondSeed.length, 0, 'second seed returns empty array');

      const all = await ledger.getAll();
      assert.equal(all.length, 5, 'still exactly 5 entries after second seed');
    });

    it('rejects empty wishes', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-empty'));
      await ledger.initialize();

      await assert.rejects(
        () => ledger.append('', 'context', 'tester'),
        { message: /empty|envision/i },
      );
    });

    it('rejects destructive / toxic wishes', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-reject'));
      await ledger.initialize();

      await assert.rejects(
        () =>
          ledger.append(
            'I wish to destroy all competition',
            'bad vibes',
            'tester',
          ),
        { message: /benevolent/i },
      );

      // Other toxic keywords
      const toxicWishes = [
        'We must kill all inefficiency',
        'I want to harm no one but this system',
        'Time to punish our rivals',
        'Revenge is the only path forward',
      ];

      for (const badWish of toxicWishes) {
        await assert.rejects(
          () => ledger.append(badWish, 'context', 'tester'),
          { message: /benevolent/i },
          `Should reject toxic wish: "${badWish}"`,
        );
      }
    });

    it('persists across re-initialization', async () => {
      const path = join(rootTmpDir, 'horizon-persist');

      // First session
      const { HorizonLedger: LedgerA } = await import('./horizon-ledger.js');
      const ledgerA = new LedgerA(path);
      await ledgerA.initialize();
      await ledgerA.append('Wish from session A', 'persistence test', 'session-a');
      const countA = ledgerA.getCount();
      assert.equal(countA, 1);

      // Second session — same path, new instance
      const { HorizonLedger: LedgerB } = await import('./horizon-ledger.js');
      const ledgerB = new LedgerB(path);
      await ledgerB.initialize();
      const countB = ledgerB.getCount();
      assert.equal(countB, 1, 'count restored from disk');

      const all = await ledgerB.getAll();
      assert.equal(all.length, 1);
      assert.equal(all[0].wish, 'Wish from session A');
    });

    it('getByAuthor filters correctly', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-author'));
      await ledger.initialize();

      await ledger.append('Wish by Alice', 'ctx', 'alice');
      await ledger.append('Another wish by Alice', 'ctx', 'alice');
      await ledger.append('Wish by Bob', 'ctx', 'bob');

      const aliceWishes = await ledger.getByAuthor('alice');
      assert.equal(aliceWishes.length, 2, 'Alice has 2 wishes');
      assert.ok(aliceWishes.every((e) => e.author === 'alice'));

      const bobWishes = await ledger.getByAuthor('bob');
      assert.equal(bobWishes.length, 1, 'Bob has 1 wish');
    });

    it('exportDataset produces correct file structure', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-export'));
      await ledger.initialize();

      await ledger.append('Export test wish', 'export context', 'exporter', false, ['export']);

      const exportDir = join(rootTmpDir, 'horizon-dataset');
      const result = await ledger.exportDataset(exportDir);

      assert.ok(result.files >= 2, 'at least schema.json + README.md');
      assert.equal(result.entries, 1, 'exports 1 entry');

      // Verify files exist
      const { existsSync } = await import('node:fs');
      assert.ok(existsSync(join(exportDir, 'schema.json')), 'schema.json created');
      assert.ok(existsSync(join(exportDir, 'README.md')), 'README.md created');
    });

    it('getTagStats aggregates tag counts', async () => {
      const { HorizonLedger } = await import('./horizon-ledger.js');
      const ledger = new HorizonLedger(join(rootTmpDir, 'horizon-tags'));
      await ledger.initialize();

      await ledger.append('Wish A', 'ctx', 'a', false, ['creativity', 'ai']);
      await ledger.append('Wish B', 'ctx', 'b', false, ['creativity', 'future']);
      await ledger.append('Wish C', 'ctx', 'c', false, ['ai']);

      const tags = await ledger.getTagStats();
      assert.equal(tags.get('creativity'), 2, 'creativity appears twice');
      assert.equal(tags.get('ai'), 2, 'ai appears twice');
      assert.equal(tags.get('future'), 1, 'future appears once');
    });
  });

  // ── 3. VaultClassifier — Smart Classification ────────────────────────────

  describe('VaultClassifier — Smart Classification', () => {
    it('classifies correctly across all vault types', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const classifier = new VaultClassifier();

      const cases: Array<{ content: string; expectedVault: string }> = [
        {
          content: 'Architecture decision to migrate the database to a new schema',
          expectedVault: 'strategic',
        },
        {
          content: 'The TypeScript component pattern for API endpoints and functions',
          expectedVault: 'technical',
        },
        {
          content: 'Brand voice should be elevated and mythic in tone and style',
          expectedVault: 'creative',
        },
        {
          content: 'Currently working on the dashboard feature today in this sprint',
          expectedVault: 'operational',
        },
        {
          content: 'Meta-insight: fundamental principle — always apply simplicity as an axiom',
          expectedVault: 'wisdom',
        },
        {
          content: 'I wish for a beautiful future where humans and AI co-create together',
          expectedVault: 'horizon',
        },
      ];

      for (const { content, expectedVault } of cases) {
        const result = classifier.classify(content);
        assert.equal(
          result.vault,
          expectedVault,
          `"${content.slice(0, 50)}..." → expected ${expectedVault}, got ${result.vault}`,
        );
        assert.ok(result.confidence > 0, 'confidence is positive');
        assert.ok(result.reasoning.length > 0, 'reasoning is non-empty');
      }
    });

    it('classifyDetailed returns allScores map', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const classifier = new VaultClassifier();

      const result = classifier.classifyDetailed(
        'Architecture decision for the database migration strategy',
      );
      assert.ok(result.allScores instanceof Map, 'allScores is a Map');
      assert.ok(result.allScores.size > 0, 'allScores has entries');
      assert.ok(result.allScores.has('strategic'), 'strategic vault scored');
    });

    it('getGuardiansForVault returns correct guardians', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const classifier = new VaultClassifier();

      const wisdomGuardians = classifier.getGuardiansForVault('wisdom');
      assert.ok(wisdomGuardians.length > 0, 'wisdom has guardians');
      assert.ok(wisdomGuardians.includes('Shinkami'), 'Shinkami is a wisdom guardian');
      assert.ok(wisdomGuardians.includes('Aiyami'), 'Aiyami is a wisdom guardian');
    });

    it('getVaultsForGuardian returns correct vault affinities', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const classifier = new VaultClassifier();

      const shinkamiVaults = classifier.getVaultsForGuardian('Shinkami');
      assert.ok(shinkamiVaults.includes('wisdom'), 'Shinkami has wisdom affinity');
      assert.ok(shinkamiVaults.includes('horizon'), 'Shinkami has horizon affinity');

      const lyssandriaVaults = classifier.getVaultsForGuardian('Lyssandria');
      assert.ok(lyssandriaVaults.includes('strategic'), 'Lyssandria has strategic affinity');
    });

    it('Guardian affinity boosts classification score', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const classifier = new VaultClassifier();

      // Ambiguous content — Guardian affinity should tip the scale
      const withoutGuardian = classifier.classifyDetailed('Working on the current project today');
      const withShinkami = classifier.classifyDetailed(
        'Working on the current project today',
        'Shinkami',
      );

      // Shinkami boosts wisdom and horizon — those scores should be higher
      const wisdomScoreBase = withoutGuardian.allScores.get('wisdom') ?? 0;
      const wisdomScoreBoosted = withShinkami.allScores.get('wisdom') ?? 0;
      assert.ok(
        wisdomScoreBoosted > wisdomScoreBase,
        `Shinkami should boost wisdom score: ${wisdomScoreBase} → ${wisdomScoreBoosted}`,
      );
    });

    it('accepts custom classification rules', async () => {
      const { VaultClassifier } = await import('./vault-classifier.js');
      const customRules = [
        {
          vault: 'wisdom' as const,
          keywords: ['customkeyword123'],
          patterns: [],
          weight: 1.0,
        },
      ];
      const classifier = new VaultClassifier(customRules);

      const result = classifier.classify('content with customkeyword123');
      assert.equal(result.vault, 'wisdom', 'custom rule classifies correctly');
    });
  });

  // ── 4. Forget — Vault Protection ────────────────────────────────────────

  describe('Forget — Vault Protection', () => {
    it('prevents forgetting Horizon entries', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'forget-protect'),
      });
      await manager.initialize();

      const horizonEntry = await manager.remember({
        content: 'Horizon wish that should be permanent and protected',
        vault: 'horizon',
        tags: ['permanent', 'test'],
      });

      await assert.rejects(
        () => manager.forget(horizonEntry.id),
        /append-only|permanent/i,
      );
    });

    it('cannot clear Horizon vault', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'clear-protect'),
      });
      await manager.initialize();

      await assert.rejects(
        () => manager.clear('horizon'),
        /append-only|permanent/i,
      );
    });

    it('successfully forgets non-horizon entries', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'forget-ok'),
      });
      await manager.initialize();

      const entry = await manager.remember({
        content: 'Temporary operational note to be deleted',
        vault: 'operational',
        tags: ['temp', 'delete-me'],
      });

      assert.ok(entry.id, 'entry was created');

      const removed = await manager.forget(entry.id);
      assert.equal(removed, true, 'forget returns true on success');

      // Verify it's gone from recall
      const check = await manager.recall({ query: 'Temporary operational note to be deleted' });
      assert.ok(
        !check.some((r) => r.entry.id === entry.id),
        'Deleted entry no longer appears in recall',
      );
    });

    it('forget returns false for non-existent ID', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'forget-nonexistent'),
      });
      await manager.initialize();

      const result = await manager.forget('vault_nonexistent_id_abc123');
      assert.equal(result, false, 'returns false when ID does not exist');
    });

    it('can forget from each non-horizon vault type', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'forget-each-vault'),
      });
      await manager.initialize();

      const vaults = ['strategic', 'technical', 'creative', 'operational', 'wisdom'] as const;

      for (const vault of vaults) {
        const entry = await manager.remember({
          content: `Temporary ${vault} entry for forget test`,
          vault,
        });
        const removed = await manager.forget(entry.id);
        assert.equal(removed, true, `Can forget from ${vault} vault`);
      }
    });
  });

  // ── 5. TTL — Time-To-Live Expiry ────────────────────────────────────────

  describe('TTL — Time-To-Live Expiry', () => {
    it('expired entries are filtered from recall results', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'ttl-recall'),
      });
      await manager.initialize();

      const expiring = await manager.remember({
        content: 'This memory should expire imminently for the TTL test',
        vault: 'operational',
        tags: ['expiring', 'ttl-test'],
        ttl: 1, // 1 second TTL
      });

      assert.ok(expiring.expiresAt, 'entry has expiresAt timestamp');
      assert.ok(
        expiring.expiresAt! > Date.now(),
        'expiresAt is in the future at creation time',
      );

      // Wait for expiry
      await new Promise<void>((r) => setTimeout(r, 1100));

      const afterExpiry = await manager.recall({
        query: 'memory expire imminently TTL test',
      });
      const found = afterExpiry.find((r) => r.entry.id === expiring.id);
      assert.ok(!found, 'expired entry is not returned after TTL elapses');
    });

    it('expired entries are excluded from getRecent', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'ttl-recent'),
      });
      await manager.initialize();

      const expiring = await manager.remember({
        content: 'Short-lived recent entry for expiry list test',
        vault: 'operational',
        ttl: 1,
      });

      await new Promise<void>((r) => setTimeout(r, 1100));

      const recent = await manager.getRecent('operational', 50);
      assert.ok(
        !recent.some((e) => e.id === expiring.id),
        'expired entry not in getRecent',
      );
    });

    it('expired entries are excluded from count', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'ttl-count'),
      });
      await manager.initialize();

      // Add a long-lived entry
      await manager.remember({
        content: 'Permanent operational entry count baseline',
        vault: 'operational',
      });

      const countBefore = await manager.count('operational');

      // Add expiring entry
      await manager.remember({
        content: 'Expiring count test entry',
        vault: 'operational',
        ttl: 1,
      });

      const countWithExpiring = await manager.count('operational');
      assert.equal(countWithExpiring, countBefore + 1, 'expiring entry counted while alive');

      await new Promise<void>((r) => setTimeout(r, 1100));

      const countAfterExpiry = await manager.count('operational');
      assert.equal(countAfterExpiry, countBefore, 'expired entry no longer counted');
    });

    it('long-lived entries survive while short-lived expire', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'ttl-mixed'),
      });
      await manager.initialize();

      const longLived = await manager.remember({
        content: 'This entry should survive the TTL test period',
        vault: 'operational',
        ttl: 60, // 60 seconds
      });

      const shortLived = await manager.remember({
        content: 'This entry expires after one second in the mixed TTL test',
        vault: 'operational',
        ttl: 1,
      });

      await new Promise<void>((r) => setTimeout(r, 1100));

      const results = await manager.recall({ query: 'TTL test period', vault: 'operational' });
      const longLivedFound = results.some((r) => r.entry.id === longLived.id);
      const shortLivedFound = results.some((r) => r.entry.id === shortLived.id);

      assert.ok(longLivedFound, 'long-lived entry still present');
      assert.ok(!shortLivedFound, 'short-lived entry expired and removed from results');
    });
  });

  // ── 6. Multi-Guardian Namespace ──────────────────────────────────────────

  describe('Multi-Guardian Namespace', () => {
    it('different Guardians create separate memory namespaces', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'guardian-namespace'),
      });
      await manager.initialize();

      await manager.remember({
        content: 'Lyssandria Foundation: Earth stability pattern',
        vault: 'technical',
        guardian: 'Lyssandria',
      });
      await manager.remember({
        content: 'Shinkami Source: meta-wisdom principle of unity',
        vault: 'wisdom',
        guardian: 'Shinkami',
      });
      await manager.remember({
        content: 'Draconia Fire: transformation decision process',
        vault: 'strategic',
        guardian: 'Draconia',
      });

      const lyssandria = await manager.getByGuardian('Lyssandria');
      const shinkami = await manager.getByGuardian('Shinkami');
      const draconia = await manager.getByGuardian('Draconia');

      assert.ok(lyssandria.every((e) => e.guardian === 'Lyssandria'), 'Lyssandria namespace isolated');
      assert.ok(shinkami.every((e) => e.guardian === 'Shinkami'), 'Shinkami namespace isolated');
      assert.ok(draconia.every((e) => e.guardian === 'Draconia'), 'Draconia namespace isolated');

      // No cross-contamination between namespaces
      assert.ok(!lyssandria.some((e) => e.guardian === 'Shinkami'), 'No Lyssandria→Shinkami bleed');
      assert.ok(!shinkami.some((e) => e.guardian === 'Draconia'), 'No Shinkami→Draconia bleed');
      assert.ok(!draconia.some((e) => e.guardian === 'Lyssandria'), 'No Draconia→Lyssandria bleed');
    });

    it('all ten Guardians can store and retrieve independently', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'all-guardians'),
      });
      await manager.initialize();

      const guardians = [
        'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
        'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
      ] as const;

      // Each Guardian stores one entry in their natural vault
      for (const guardian of guardians) {
        await manager.remember({
          content: `${guardian} remembers their Gate frequency and sacred purpose`,
          guardian,
          vault: guardian === 'Lyria' ? 'horizon' : 'wisdom',
        });
      }

      // Each Guardian retrieves only their own
      for (const guardian of guardians) {
        const entries = await manager.getByGuardian(guardian);
        assert.ok(entries.length >= 1, `${guardian} has at least 1 entry`);
        assert.ok(entries.every((e) => e.guardian === guardian), `${guardian} entries are clean`);
      }
    });

    it('recall filtered by guardian returns only that guardian\'s entries', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'guardian-recall-filter'),
      });
      await manager.initialize();

      await manager.remember({
        content: 'Maylinn Heart healing pattern across all sessions',
        vault: 'creative',
        guardian: 'Maylinn',
        tags: ['healing', 'pattern'],
      });
      await manager.remember({
        content: 'Alera Voice pattern for truth expression and clarity',
        vault: 'creative',
        guardian: 'Alera',
        tags: ['voice', 'pattern'],
      });

      const maylinnRecall = await manager.recall({
        query: 'pattern',
        guardian: 'Maylinn',
      });
      assert.ok(maylinnRecall.every((r) => r.entry.guardian === 'Maylinn'), 'Only Maylinn entries');
    });
  });

  // ── 7. VaultManager — Utility & Edge Cases ──────────────────────────────

  describe('VaultManager — Utility & Edge Cases', () => {
    it('classify preview matches actual storage vault', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'classify-preview'),
      });
      await manager.initialize();

      const content = 'TypeScript interface pattern for API configuration schema';
      const predicted = manager.classify(content);
      const actual = await manager.remember({ content, vault: predicted });

      assert.equal(actual.vault, predicted, 'classify preview matches stored vault');
    });

    it('getHorizon provides direct HorizonLedger access', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'get-horizon'),
      });
      await manager.initialize();

      const ledger = manager.getHorizon();
      assert.ok(typeof ledger.append === 'function', 'ledger has append method');
      assert.ok(typeof ledger.getAll === 'function', 'ledger has getAll method');
      assert.ok(typeof ledger.getCount === 'function', 'ledger has getCount method');
    });

    it('getConfig returns readonly configuration', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const customPath = join(rootTmpDir, 'config-check');
      const manager = new VaultManager({
        storagePath: customPath,
        defaultConfidence: 'high',
      });
      await manager.initialize();

      const config = manager.getConfig();
      assert.equal(config.storagePath, customPath, 'storagePath preserved');
      assert.equal(config.defaultConfidence, 'high', 'defaultConfidence preserved');
    });

    it('clear removes all non-horizon vault entries', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'clear-vaults'),
      });
      await manager.initialize();

      await manager.remember({ content: 'Strategic entry', vault: 'strategic' });
      await manager.remember({ content: 'Technical entry', vault: 'technical' });
      await manager.remember({ content: 'Horizon wish', vault: 'horizon' });

      const countBefore = await manager.count();
      assert.ok(countBefore >= 3, 'entries present before clear');

      await manager.clear(); // clears all except horizon

      const strategicCount = await manager.count('strategic');
      const technicalCount = await manager.count('technical');
      assert.equal(strategicCount, 0, 'strategic cleared');
      assert.equal(technicalCount, 0, 'technical cleared');

      // Horizon should still have its entry
      const horizonCount = await manager.count('horizon');
      assert.ok(horizonCount >= 1, 'horizon preserved after clear');
    });

    it('throws when operations called before initialize()', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'uninitialized'),
      });

      await assert.rejects(
        () => manager.remember({ content: 'test' }),
        /not initialized|initialize/i,
      );

      await assert.rejects(
        () => manager.recall({ query: 'test' }),
        /not initialized|initialize/i,
      );
    });

    it('recall with tag filter uses AND logic', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'tag-filter'),
      });
      await manager.initialize();

      await manager.remember({
        content: 'Entry with tags A and B for tag filter test',
        vault: 'technical',
        tags: ['tagA', 'tagB'],
      });
      await manager.remember({
        content: 'Entry with only tag A for tag filter test',
        vault: 'technical',
        tags: ['tagA'],
      });

      const results = await manager.recall({
        query: 'tag filter test',
        tags: ['tagA', 'tagB'],
      });

      // Only the entry with BOTH tags should appear
      assert.ok(
        results.every((r) => r.entry.tags.includes('tagA') && r.entry.tags.includes('tagB')),
        'tag filter uses AND logic — only entries with ALL tags returned',
      );
    });

    it('recall sortBy recency puts newest first', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'sort-recency'),
      });
      await manager.initialize();

      await manager.remember({
        content: 'First recency sort entry for temporal ordering test',
        vault: 'operational',
      });
      // Small delay to ensure different timestamps
      await new Promise<void>((r) => setTimeout(r, 10));
      await manager.remember({
        content: 'Second recency sort entry for temporal ordering test',
        vault: 'operational',
      });

      const results = await manager.recall({
        query: 'recency sort entry temporal ordering',
        sortBy: 'recency',
        limit: 10,
      });

      assert.ok(results.length >= 2, 'at least 2 results');
      // Newest should be first
      assert.ok(
        results[0].entry.createdAt >= results[1].entry.createdAt,
        'recency sort: newest first',
      );
    });

    it('recall minConfidence filters out lower-confidence entries', async () => {
      const { VaultManager } = await import('./vault-manager.js');
      const manager = new VaultManager({
        storagePath: join(rootTmpDir, 'confidence-filter'),
      });
      await manager.initialize();

      await manager.remember({
        content: 'High confidence entry for confidence filtering test',
        vault: 'strategic',
        confidence: 'high',
      });
      await manager.remember({
        content: 'Low confidence entry for confidence filtering test',
        vault: 'strategic',
        confidence: 'low',
      });

      const highOnly = await manager.recall({
        query: 'confidence filtering test',
        minConfidence: 'high',
      });

      assert.ok(
        highOnly.every(
          (r) => r.entry.confidence === 'high' || r.entry.confidence === 'verified',
        ),
        'Only high/verified confidence entries returned',
      );
    });
  });

  // ── 8. Persistence — Data Survives Process Restart ──────────────────────

  describe('Persistence — Data Survives Process Restart', () => {
    it('vault entries persist across VaultManager re-creation', async () => {
      const persistPath = join(rootTmpDir, 'persistence-test');

      // Session A — write entries
      const { VaultManager: ManagerA } = await import('./vault-manager.js');
      const managerA = new ManagerA({ storagePath: persistPath });
      await managerA.initialize();

      const entryA = await managerA.remember({
        content: 'Persisted strategic decision for session replay test',
        vault: 'strategic',
        tags: ['persistence', 'session-a'],
        confidence: 'verified',
      });

      // Session B — new instance, same path
      const { VaultManager: ManagerB } = await import('./vault-manager.js');
      const managerB = new ManagerB({ storagePath: persistPath });
      await managerB.initialize();

      const results = await managerB.recall({ query: 'persisted strategic decision' });
      const found = results.find((r) => r.entry.id === entryA.id);

      assert.ok(found, 'entry from session A found in session B');
      assert.equal(found!.entry.content, entryA.content, 'content preserved');
      assert.equal(found!.entry.confidence, 'verified', 'confidence preserved');
      assert.deepEqual(found!.entry.tags, entryA.tags, 'tags preserved');
    });
  });
});
