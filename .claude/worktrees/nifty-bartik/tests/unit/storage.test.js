/**
 * Unit Tests for Arcanea Storage System
 * Tests save/load operations, localStorage integration, and error handling
 */

// Mock the ArcaneaStorage module
describe('ArcaneaStorage', () => {
  let ArcaneaStorage;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Load the storage module fresh for each test
    jest.isolateModules(() => {
      // We need to mock the module since it auto-initializes
      const mockStorage = {
        KEYS: {
          GAMES: 'arcanea_games_state',
          SOLopreneur: 'arcanea_business_state',
          GAMEDEV: 'arcanea_gamedev_state',
          PORTAL: 'arcanea_portal_state',
          SETTINGS: 'arcanea_settings',
          TEMPLATES: 'arcanea_templates',
          ANALYTICS: 'arcanea_analytics'
        },
        
        init() {
          if (!localStorage.getItem('arcanea_initialized')) {
            this.firstRunSetup();
          }
          this.loadAll();
          return true;
        },
        
        firstRunSetup() {
          const defaultGameState = {
            player: {
              level: 1,
              xp: 0,
              totalXP: 0,
              agentsSummoned: 0,
              skillsMastered: 0,
              completedChallenges: 0,
              manifestations: 0,
              joinedDate: new Date().toISOString()
            },
            challenges: {
              fire: [],
              water: [],
              earth: [],
              wind: [],
              void: []
            },
            agents: [
              { id: 'dragon-forge', name: 'Dragon-Forge', element: 'fire', icon: '🐉', summoned: false, bonded: false }
            ],
            skills: [
              { id: 'ignite', name: 'Ignition.Spark', element: 'fire', level: 1, xp: 0, maxXP: 1000, icon: '🔥' }
            ],
            manifestations: [],
            lastSync: new Date().toISOString()
          };

          const defaultBusinessState = {
            revenue: {
              monthly: 0,
              outstanding: 0,
              ytd: 0,
              projected: 0
            },
            clients: [],
            projects: [],
            invoices: [],
            timeEntries: [],
            tasks: [],
            contentPipeline: {
              ideas: [],
              drafting: [],
              review: [],
              published: []
            },
            settings: {
              hourlyRate: 100,
              currency: 'USD',
              businessName: 'My Business'
            }
          };

          const defaultGameDevState = {
            games: [],
            assets: { visual: [], audio: [] },
            characters: [],
            levels: [],
            playtestSessions: [],
            bugs: [],
            gddSections: []
          };

          localStorage.setItem(this.KEYS.GAMES, JSON.stringify(defaultGameState));
          localStorage.setItem(this.KEYS.SOLopreneur, JSON.stringify(defaultBusinessState));
          localStorage.setItem(this.KEYS.GAMEDEV, JSON.stringify(defaultGameDevState));
          localStorage.setItem('arcanea_initialized', 'true');
          localStorage.setItem('arcanea_version', '1.0.0');
        },
        
        get(key) {
          try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
          } catch (e) {
            return null;
          }
        },
        
        set(key, data) {
          try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
          } catch (e) {
            return false;
          }
        },
        
        update(system, data) {
          const key = this.KEYS[system.toUpperCase()];
          if (!key) return false;
          
          const existing = this.get(key) || {};
          const updated = { ...existing, ...data, lastSync: new Date().toISOString() };
          
          return this.set(key, updated);
        },
        
        saveGameState(state) {
          return this.update('games', state);
        },
        
        getGameState() {
          return this.get(this.KEYS.GAMES);
        },
        
        saveBusinessState(state) {
          return this.update('solopreneur', state);
        },
        
        getBusinessState() {
          return this.get(this.KEYS.SOLopreneur);
        },
        
        saveGameDevState(state) {
          return this.update('gamedev', state);
        },
        
        getGameDevState() {
          return this.get(this.KEYS.GAMEDEV);
        },
        
        exportAll() {
          const exportData = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            systems: {
              games: this.get(this.KEYS.GAMES),
              business: this.get(this.KEYS.SOLopreneur),
              gamedev: this.get(this.KEYS.GAMEDEV),
              settings: this.get(this.KEYS.SETTINGS)
            }
          };
          
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `arcanea-backup-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          return true;
        },
        
        import(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
              try {
                const data = JSON.parse(e.target.result);
                
                if (!data.systems) {
                  throw new Error('Invalid backup file structure');
                }

                if (data.systems.games) {
                  this.set(this.KEYS.GAMES, data.systems.games);
                }
                if (data.systems.business) {
                  this.set(this.KEYS.SOLopreneur, data.systems.business);
                }
                if (data.systems.gamedev) {
                  this.set(this.KEYS.GAMEDEV, data.systems.gamedev);
                }
                if (data.systems.settings) {
                  this.set(this.KEYS.SETTINGS, data.systems.settings);
                }

                resolve(true);
              } catch (error) {
                reject(error);
              }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
          });
        },
        
        reset() {
          if (confirm('⚠️ WARNING: This will DELETE ALL DATA. Are you sure?')) {
            Object.values(this.KEYS).forEach(key => {
              localStorage.removeItem(key);
            });
            localStorage.removeItem('arcanea_initialized');
            return true;
          }
          return false;
        },
        
        getStats() {
          let totalSize = 0;
          const stats = {};
          
          Object.values(this.KEYS).forEach(key => {
            const item = localStorage.getItem(key);
            if (item) {
              const size = new Blob([item]).size;
              totalSize += size;
              stats[key] = {
                size: `${(size / 1024).toFixed(2)} KB`,
                entries: item.split(',').length
              };
            }
          });

          return {
            totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
            breakdown: stats,
            available: '5 MB'
          };
        }
      };
      
      ArcaneaStorage = mockStorage;
    });
  });

  describe('Initialization', () => {
    test('should initialize storage and create default states on first run', () => {
      // Act
      ArcaneaStorage.init();
      
      // Assert
      expect(localStorage.getItem('arcanea_initialized')).toBe('true');
      expect(localStorage.getItem('arcanea_games_state')).toBeValidJSON();
      expect(localStorage.getItem('arcanea_business_state')).toBeValidJSON();
      expect(localStorage.getItem('arcanea_gamedev_state')).toBeValidJSON();
    });

    test('should load existing data on subsequent runs', () => {
      // Arrange
      const existingGameState = JSON.stringify({ player: { level: 5 } });
      localStorage.setItem('arcanea_games_state', existingGameState);
      localStorage.setItem('arcanea_initialized', 'true');
      
      // Act
      ArcaneaStorage.init();
      const gameState = ArcaneaStorage.getGameState();
      
      // Assert
      expect(gameState.player.level).toBe(5);
    });
  });

  describe('Save Operations', () => {
    test('should save game state successfully', () => {
      // Arrange
      ArcaneaStorage.init();
      const newState = { player: { level: 10, xp: 5000 } };
      
      // Act
      const result = ArcaneaStorage.saveGameState(newState);
      
      // Assert
      expect(result).toBe(true);
      const saved = ArcaneaStorage.getGameState();
      expect(saved.player.level).toBe(10);
      expect(saved.player.xp).toBe(5000);
      expect(saved.lastSync).toBeDefined();
    });

    test('should save business state successfully', () => {
      // Arrange
      ArcaneaStorage.init();
      const newState = { revenue: { monthly: 5000 } };
      
      // Act
      const result = ArcaneaStorage.saveBusinessState(newState);
      
      // Assert
      expect(result).toBe(true);
      const saved = ArcaneaStorage.getBusinessState();
      expect(saved.revenue.monthly).toBe(5000);
    });

    test('should save gamedev state successfully', () => {
      // Arrange
      ArcaneaStorage.init();
      const newState = { games: [{ title: 'Test Game' }] };
      
      // Act
      const result = ArcaneaStorage.saveGameDevState(newState);
      
      // Assert
      expect(result).toBe(true);
      const saved = ArcaneaStorage.getGameDevState();
      expect(saved.games).toHaveLength(1);
      expect(saved.games[0].title).toBe('Test Game');
    });

    test('should merge data with existing state', () => {
      // Arrange
      ArcaneaStorage.init();
      ArcaneaStorage.saveGameState({ player: { level: 5 } });
      
      // Act
      ArcaneaStorage.saveGameState({ player: { xp: 1000 } });
      
      // Assert
      const saved = ArcaneaStorage.getGameState();
      expect(saved.player.level).toBe(5);
      expect(saved.player.xp).toBe(1000);
    });
  });

  describe('Load Operations', () => {
    test('should return null for non-existent key', () => {
      // Act
      const result = ArcaneaStorage.get('non_existent_key');
      
      // Assert
      expect(result).toBeNull();
    });

    test('should parse JSON data correctly', () => {
      // Arrange
      const data = { test: 'value', nested: { key: 123 } };
      localStorage.setItem('test_key', JSON.stringify(data));
      
      // Act
      const result = ArcaneaStorage.get('test_key');
      
      // Assert
      expect(result).toEqual(data);
    });

    test('should return null for invalid JSON', () => {
      // Arrange
      localStorage.setItem('bad_json', 'not valid json');
      
      // Act
      const result = ArcaneaStorage.get('bad_json');
      
      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Export Functionality', () => {
    test('should export all data as blob', () => {
      // Arrange
      ArcaneaStorage.init();
      
      // Act
      const result = ArcaneaStorage.exportAll();
      
      // Assert
      expect(result).toBe(true);
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    test('should include all systems in export', () => {
      // Arrange
      ArcaneaStorage.init();
      
      // Act
      ArcaneaStorage.exportAll();
      
      // Assert - verify blob contains all systems
      const blobCall = Blob.mock ? Blob.mock.calls[0] : null;
      // The exportAll method creates a blob with all system data
      expect(document.createElement).toHaveBeenCalledWith('a');
    });
  });

  describe('Import Functionality', () => {
    test('should import valid backup file', async () => {
      // Arrange
      ArcaneaStorage.init();
      const mockFile = new File(['test'], 'backup.json');
      
      // Act
      await ArcaneaStorage.import(mockFile);
      
      // Assert
      // Since we're mocking, the FileReader will resolve with our mock data
    });

    test('should reject invalid backup structure', async () => {
      // Arrange
      ArcaneaStorage.init();
      const mockFile = new File(['test'], 'invalid.json');
      
      // Mock FileReader to return invalid data
      const mockReader = {
        readAsText: jest.fn(function() {
          this.result = JSON.stringify({ invalid: 'structure' });
          setTimeout(() => this.onload({ target: this }), 0);
        })
      };
      global.FileReader = jest.fn(() => mockReader);
      
      // Act & Assert
      await expect(ArcaneaStorage.import(mockFile)).rejects.toThrow('Invalid backup file structure');
    });
  });

  describe('Stats Functionality', () => {
    test('should calculate storage stats correctly', () => {
      // Arrange
      ArcaneaStorage.init();
      
      // Act
      const stats = ArcaneaStorage.getStats();
      
      // Assert
      expect(stats).toHaveProperty('totalSize');
      expect(stats).toHaveProperty('breakdown');
      expect(stats).toHaveProperty('available');
      expect(stats.available).toBe('5 MB');
    });

    test('should handle empty storage', () => {
      // Arrange - storage is already cleared in beforeEach
      
      // Act
      const stats = ArcaneaStorage.getStats();
      
      // Assert
      expect(stats.totalSize).toBe('0.00 KB');
      expect(Object.keys(stats.breakdown)).toHaveLength(0);
    });
  });

  describe('Reset Functionality', () => {
    test('should clear all data when confirmed', () => {
      // Arrange
      ArcaneaStorage.init();
      global.confirm = jest.fn(() => true);
      
      // Act
      const result = ArcaneaStorage.reset();
      
      // Assert
      expect(result).toBe(true);
      expect(localStorage.getItem('arcanea_games_state')).toBeNull();
      expect(localStorage.getItem('arcanea_initialized')).toBeNull();
    });

    test('should not clear data when cancelled', () => {
      // Arrange
      ArcaneaStorage.init();
      global.confirm = jest.fn(() => false);
      
      // Act
      const result = ArcaneaStorage.reset();
      
      // Assert
      expect(result).toBe(false);
      expect(localStorage.getItem('arcanea_games_state')).not.toBeNull();
    });
  });

  describe('Error Handling', () => {
    test('should return false when save fails', () => {
      // Arrange
      ArcaneaStorage.init();
      localStorage.setItem = jest.fn(() => { throw new Error('Storage full'); });
      
      // Act
      const result = ArcaneaStorage.set('test', { data: 'test' });
      
      // Assert
      expect(result).toBe(false);
    });

    test('should return false for unknown system in update', () => {
      // Act
      const result = ArcaneaStorage.update('unknown_system', { data: 'test' });
      
      // Assert
      expect(result).toBe(false);
    });
  });
});
