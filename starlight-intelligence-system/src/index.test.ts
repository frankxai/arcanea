import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StarlightIntelligence, GUARDIANS, SKILLS, AGENTS, TEN_GATES } from './index';

describe('Starlight Intelligence Engine', () => {
  let starlight: StarlightIntelligence;

  beforeEach(async () => {
    starlight = new StarlightIntelligence();
    await starlight.initialize({
      supabaseUrl: 'https://test.supabase.co',
      supabaseKey: 'test-key'
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct configuration', () => {
      expect(starlight.isInitialized()).toBe(true);
    });

    it('should have all 10 guardians', () => {
      const guardians = starlight.getAllGuardians();
      expect(guardians).toHaveLength(10);
    });

    it('should have all skills defined', () => {
      expect(SKILLS).toHaveLength(10);
      expect(SKILLS.every(s => s.id && s.name && s.element)).toBe(true);
    });

    it('should have all agents defined', () => {
      expect(AGENTS).toHaveLength(10);
      expect(AGENTS.every(a => a.id && a.name && a.guardian && a.command)).toBe(true);
    });

    it('should have all 10 gates defined', () => {
      expect(TEN_GATES).toHaveLength(10);
      expect(TEN_GATES.every(g => g.gate && g.name && g.element)).toBe(true);
    });
  });

  describe('Guardian System', () => {
    it('should retrieve specific guardian by name', () => {
      const draconia = starlight.getGuardianInfo('Draconia');
      expect(draconia).not.toBeNull();
      expect(draconia?.name).toBe('Draconia');
      expect(draconia?.element).toBe('fire');
    });

    it('should return null for unknown guardian', () => {
      const unknown = starlight.getGuardianInfo('UnknownGuardian');
      expect(unknown).toBeNull();
    });

    it('should have wisdom for each guardian', () => {
      GUARDIANS.forEach(guardian => {
        expect(guardian.wisdom).toBeInstanceOf(Array);
        expect(guardian.wisdom.length).toBeGreaterThan(0);
      });
    });

    it('should have powers for each guardian', () => {
      GUARDIANS.forEach(guardian => {
        expect(guardian.powers).toBeInstanceOf(Array);
        expect(guardian.powers.length).toBeGreaterThanOrEqual(4);
      });
    });

    it('should have unique godbeasts for each guardian', () => {
      const godbeasts = GUARDIANS.map(g => g.godbeast);
      const uniqueGodbeasts = new Set(godbeasts);
      expect(uniqueGodbeasts.size).toBe(godbeasts.length);
    });
  });

  describe('Reasoning System', () => {
    it('should generate reasoning result structure', async () => {
      const result = await starlight.reason('Test query');

      expect(result).toHaveProperty('reasoning');
      expect(result).toHaveProperty('guardian');
      expect(result).toHaveProperty('arcaneanContext', true);
      expect(result).toHaveProperty('tokensUsed');
      expect(result).toHaveProperty('executionTime');
      expect(typeof result.reasoning).toBe('string');
    });

    it('should accept guardian parameter', async () => {
      const result = await starlight.reason('Test query', { guardian: 'Draconia' });

      expect(result.guardian).toBe('Draconia');
    });

    it('should accept context parameter', async () => {
      const context = { projectType: 'creative', goal: 'inspiration' };
      const result = await starlight.reason('Test query', { context });

      expect(result).toHaveProperty('arcaneanContext', true);
    });

    it('should include guardian wisdom in reasoning', async () => {
      const result = await starlight.reason('How to transform my creative process?', { guardian: 'Draconia' });

      expect(result.reasoning.toLowerCase()).toContain('transform');
    });

    it('should handle empty query gracefully', async () => {
      const result = await starlight.reason('');
      expect(result.reasoning.length).toBeGreaterThan(0);
    });
  });

  describe('Memory System', () => {
    it('should have memory stats structure', async () => {
      const stats = await starlight.getMemoryStats();

      expect(stats).toHaveProperty('totalEntries');
      expect(stats).toHaveProperty('storageType');
      expect(stats).toHaveProperty('oldestMemory');
      expect(stats).toHaveProperty('newestMemory');
    });

    it('should search memory with results', async () => {
      const results = await starlight.searchMemory('creative');

      expect(results).toBeInstanceOf(Array);
      results.forEach(result => {
        expect(result).toHaveProperty('entry');
        expect(result).toHaveProperty('arcaneanInsight');
        expect(result).toHaveProperty('elementResonance');
        expect(result).toHaveProperty('relevanceScore');
      });
    });

    it('should detect element resonance correctly', async () => {
      await starlight.reason('I want to transform my passion into bold action', { guardian: 'Draconia' });
      await starlight.reason('My emotions flow and adapt like water', { guardian: 'Leyla' });
      await starlight.reason('I need to build a solid foundation and structure', { guardian: 'Lyssandria' });

      const fireResults = await starlight.searchMemory('transform passion bold');
      expect(fireResults[0]?.elementResonance).toBe('fire');

      const waterResults = await starlight.searchMemory('flow emotion adapt');
      expect(waterResults[0]?.elementResonance).toBe('water');

      const earthResults = await starlight.searchMemory('build structure foundation');
      expect(earthResults[0]?.elementResonance).toBe('earth');
    });
  });

  describe('Evolution Tracking', () => {
    it('should initialize new user at gate 1', async () => {
      const status = await starlight.getEvolutionStatus('test-user-new');

      expect(status?.progress.currentGate).toBe(1);
      expect(status?.progress.experiencePoints).toBe(0);
    });

    it('should track skill addition', async () => {
      const progress1 = await starlight.recordEvolutionAction('test-user-1', 'skill', 'Dragon Forge');
      const progress2 = await starlight.recordEvolutionAction('test-user-1', 'skill', 'River Storytelling');

      expect(progress1.skills).toContain('Dragon Forge');
      expect(progress2.skills).toHaveLength(2);
    });

    it('should track guardian affinity', async () => {
      const progress = await starlight.recordEvolutionAction('test-user-2', 'guardian', 'Draconia');

      expect(progress.guardians).toContain('Draconia');
    });

    it('should track experience points', async () => {
      const progress1 = await starlight.recordEvolutionAction('test-user-3', 'xp', '100');
      const progress2 = await starlight.recordEvolutionAction('test-user-3', 'xp', '200');

      expect(progress2.experiencePoints).toBe(300);
    });

    it('should advance gate based on experience threshold', async () => {
      const progress = await starlight.recordEvolutionAction('test-user-4', 'xp', '10000');

      expect(progress.currentGate).toBe(10);
    });

    it('should return gate info', async () => {
      const status = await starlight.getEvolutionStatus('test-user-5');

      expect(status?.gateInfo).not.toBeNull();
      expect(status?.gateInfo?.name).toBe('Foundation');
      expect(status?.gateInfo?.element).toBe('earth');
    });

    it('should generate evolution path', async () => {
      await starlight.recordEvolutionAction('test-user-6', 'xp', '100');
      const status = await starlight.getEvolutionStatus('test-user-6');

      expect(status).not.toBeNull();
      expect(status?.progress).not.toBeNull();
      expect(status?.progress.currentGate).toBeGreaterThan(0);
      expect(status?.progress.experiencePoints).toBe(100);
    });
  });

  describe('Starlight Notes', () => {
    it('should send starlight note with default 100-year delivery', async () => {
      const result = await starlight.sendStarlightNote('Test note to future self');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Starlight Note will arrive on');
      expect(result.quantumSignature).toMatch(/^STARLIGHT-[0-9]+-[A-Z0-9]{12}$/);
    });

    it('should send starlight note with custom delivery date', async () => {
      const customDate = new Date('2030-01-01');
      const result = await starlight.sendStarlightNote('Test note', customDate);

      expect(result.success).toBe(true);
      expect(result.message).toContain('2030-01-01');
    });

    it('should generate unique quantum signatures', async () => {
      const result1 = await starlight.sendStarlightNote('Note 1');
      const result2 = await starlight.sendStarlightNote('Note 2');

      expect(result1.quantumSignature).not.toBe(result2.quantumSignature);
    });
  });

  describe('Agent System', () => {
    it('should invoke agent by command', async () => {
      const result = await starlight.invokeAgent('/dragon-forge', []);

      expect(result.agent.name).toBe('Dragon Forge');
      expect(result.agent.guardian).toBe('Draconia');
      expect(result.agent.element).toBe('fire');
    });

    it('should throw error for unknown agent', async () => {
      await expect(starlight.invokeAgent('/unknown-agent', [])).rejects.toThrow('Unknown agent');
    });

    it('should have all agents with valid commands', () => {
      AGENTS.forEach(agent => {
        expect(agent.command).toMatch(/^\/[a-z-]+$/);
      });
    });
  });

  describe('Command Interface', () => {
    it('should list available commands', () => {
      const commands = starlight.getCommands();

      expect(commands).toContain('reason');
      expect(commands).toContain('note');
      expect(commands).toContain('search');
      expect(commands).toContain('track');
      expect(commands).toContain('guardian');
      expect(commands).toContain('guardians');
      expect(commands).toContain('gate');
      expect(commands).toContain('evolve');
      expect(commands).toContain('agent');
      expect(commands).toContain('help');
      expect(commands).toContain('version');
    });

    it('should execute version command', async () => {
      const result = await starlight.executeCommand('version', []);

      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('name', 'Starlight Intelligence Engine');
    });

    it('should execute help command', async () => {
      const result = await starlight.executeCommand('help', []);

      expect(typeof result).toBe('string');
      expect(result).toContain('Starlight Intelligence Engine');
      expect(result).toContain('reason');
      expect(result).toContain('note');
    });

    it('should execute guardians command', async () => {
      const result = await starlight.executeCommand('guardians', []);

      expect(result).toBeInstanceOf(Array);
      expect((result as ArcaneanGuardian[]).length).toBe(10);
    });

    it('should throw error for unknown command', async () => {
      await expect(starlight.executeCommand('unknown-command', [])).rejects.toThrow('Unknown command');
    });
  });

  describe('System Stats', () => {
    it('should return system statistics', async () => {
      const stats = await starlight.getSystemStats();

      expect(stats).toHaveProperty('version', '1.0.0');
      expect(stats).toHaveProperty('guardians', 10);
      expect(stats).toHaveProperty('skills', 10);
      expect(stats).toHaveProperty('agents', 10);
      expect(stats).toHaveProperty('gates', 10);
      expect(stats).toHaveProperty('initialized', true);
    });
  });

  describe('Elemental Analysis', () => {
    it('should correctly identify fire element queries', async () => {
      const results = await starlight.searchMemory('transform ignite bold passion');

      results.forEach(result => {
        expect(['fire', 'integration']).toContain(result.elementResonance);
      });
    });

    it('should correctly identify water element queries', async () => {
      const results = await starlight.searchMemory('flow adapt emotion heal');

      results.forEach(result => {
        expect(['water', 'integration']).toContain(result.elementResonance);
      });
    });

    it('should correctly identify earth element queries', async () => {
      const results = await starlight.searchMemory('build foundation structure stable');

      results.forEach(result => {
        expect(['earth', 'integration']).toContain(result.elementResonance);
      });
    });

    it('should correctly identify wind element queries', async () => {
      const results = await starlight.searchMemory('express voice communicate free');

      results.forEach(result => {
        expect(['wind', 'integration']).toContain(result.elementResonance);
      });
    });

    it('should correctly identify void element queries', async () => {
      const results = await starlight.searchMemory('vision infinite possibility mystery');

      results.forEach(result => {
        expect(['void', 'integration']).toContain(result.elementResonance);
      });
    });
  });

  describe('Progress Tracking', () => {
    it('should track progress with skills', async () => {
      const result = await starlight.trackProgress({
        userId: 'progress-test-user',
        guardian: 'Draconia',
        skills: ['Dragon Forge', 'Gem Cutting']
      });

      expect(result).toHaveProperty('currentGate');
      expect(result).toHaveProperty('nextGate');
      expect(result).toHaveProperty('guardianGuidance');
      expect(result).toHaveProperty('evolutionPath');
      expect(result.nextGate).toBe(result.currentGate + 1);
    });

    it('should include Arcanean insights in progress', async () => {
      const result = await starlight.trackProgress({
        userId: 'insight-test-user'
      });

      expect(result.evolutionPath.length).toBeGreaterThan(0);
    });
  });
});

describe('Guardian Constants', () => {
  it('should have correct guardian names', () => {
    const expectedNames = [
      'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
      'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami'
    ];

    const actualNames = GUARDIANS.map(g => g.name);
    expect(actualNames).toEqual(expectedNames);
  });

  it('should have unique guardian IDs', () => {
    const ids = GUARDIANS.map(g => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should map guardians to correct gates', () => {
    GUARDIANS.forEach(guardian => {
      expect(guardian.gateAlignment).toBeGreaterThanOrEqual(1);
      expect(guardian.gateAlignment).toBeLessThanOrEqual(10);
    });
  });

  it('should have correct element distribution', () => {
    const elements = GUARDIANS.map(g => g.element);
    expect(elements.filter(e => e === 'earth')).toHaveLength(1);
    expect(elements.filter(e => e === 'water')).toHaveLength(2);
    expect(elements.filter(e => e === 'fire')).toHaveLength(1);
    expect(elements.filter(e => e === 'wind')).toHaveLength(1);
    expect(elements.filter(e => e === 'void')).toHaveLength(3);
    expect(elements.filter(e => e === 'integration')).toHaveLength(2);
  });
});

describe('Ten Gates Progression', () => {
  it('should have gates in ascending order', () => {
    for (let i = 0; i < TEN_GATES.length - 1; i++) {
      expect(TEN_GATES[i].threshold).toBeLessThan(TEN_GATES[i + 1].threshold);
    }
  });

  it('should start with earth element at gate 1', () => {
    expect(TEN_GATES[0].name).toBe('Foundation');
    expect(TEN_GATES[0].element).toBe('earth');
    expect(TEN_GATES[0].threshold).toBe(0);
  });

  it('should end with integration element at gate 10', () => {
    expect(TEN_GATES[9].name).toBe('Source');
    expect(TEN_GATES[9].element).toBe('integration');
    expect(TEN_GATES[9].threshold).toBe(10000);
  });

  it('should have unique gate names', () => {
    const names = TEN_GATES.map(g => g.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe('Skills Configuration', () => {
  it('should have unique skill IDs', () => {
    const ids = SKILLS.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have power levels from 1 to 10', () => {
    const powerLevels = SKILLS.map(s => s.powerLevel).sort((a, b) => a - b);
    expect(powerLevels).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should have skills across all elements', () => {
    const elements = new Set(SKILLS.map(s => s.element));
    expect(elements.size).toBeGreaterThanOrEqual(4);
  });
});
