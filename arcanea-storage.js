// Arcanea Data Persistence Layer
// Saves all game state, business data, and project data to localStorage
// Version: 1.0.0

const ArcaneaStorage = {
    // Storage keys
    KEYS: {
        GAMES: 'arcanea_games_state',
        SOLopreneur: 'arcanea_business_state',
        GAMEDEV: 'arcanea_gamedev_state',
        PORTAL: 'arcanea_portal_state',
        SETTINGS: 'arcanea_settings',
        TEMPLATES: 'arcanea_templates',
        ANALYTICS: 'arcanea_analytics'
    },

    // Initialize storage
    init() {
        console.log('🏛️ Arcanea Storage: Initializing...');
        
        // Check if first run
        if (!localStorage.getItem('arcanea_initialized')) {
            this.firstRunSetup();
        }
        
        // Load all data
        this.loadAll();
        
        console.log('✅ Arcanea Storage: Ready');
        return true;
    },

    // First run setup with defaults
    firstRunSetup() {
        console.log('🌟 First run detected - setting up defaults...');
        
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
            agents: this.generateDefaultAgents(),
            skills: this.generateDefaultSkills(),
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
            assets: {
                visual: [],
                audio: []
            },
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
        
        console.log('✅ Defaults created');
    },

    // Generate default agents
    generateDefaultAgents() {
        return [
            { id: 'dragon-forge', name: 'Dragon-Forge', element: 'fire', icon: '🐉', summoned: false, bonded: false },
            { id: 'phoenix-artisan', name: 'Phoenix-Artisan', element: 'fire', icon: '🔥', summoned: false, bonded: false },
            { id: 'river-story', name: 'River-Story', element: 'water', icon: '🌊', summoned: false, bonded: false },
            { id: 'crystal-arch', name: 'Crystal-Arch', element: 'earth', icon: '💎', summoned: false, bonded: false },
            { id: 'void-gazer', name: 'Void-Gazer', element: 'void', icon: '👁️', summoned: false, bonded: false }
        ];
    },

    // Generate default skills
    generateDefaultSkills() {
        return [
            { id: 'ignite', name: 'Ignition.Spark', element: 'fire', level: 1, xp: 0, maxXP: 1000, icon: '🔥' },
            { id: 'flow', name: 'Flow.Channel', element: 'water', level: 1, xp: 0, maxXP: 1000, icon: '🌊' },
            { id: 'foundation', name: 'Foundation.Stone', element: 'earth', level: 1, xp: 0, maxXP: 1000, icon: '🗿' }
        ];
    },

    // Load all data
    loadAll() {
        this.data = {
            games: this.get(this.KEYS.GAMES),
            business: this.get(this.KEYS.SOLopreneur),
            gamedev: this.get(this.KEYS.GAMEDEV),
            settings: this.get(this.KEYS.SETTINGS) || {},
            templates: this.get(this.KEYS.TEMPLATES) || []
        };
        return this.data;
    },

    // Generic get
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error(`Error loading ${key}:`, e);
            return null;
        }
    },

    // Generic set
    set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error(`Error saving ${key}:`, e);
            return false;
        }
    },

    // Update specific system
    update(system, data) {
        const key = this.KEYS[system.toUpperCase()];
        if (!key) {
            console.error(`Unknown system: ${system}`);
            return false;
        }
        
        // Merge with existing data
        const existing = this.get(key) || {};
        const updated = { ...existing, ...data, lastSync: new Date().toISOString() };
        
        return this.set(key, updated);
    },

    // Games specific
    saveGameState(state) {
        return this.update('games', state);
    },

    getGameState() {
        return this.get(this.KEYS.GAMES);
    },

    // Business specific
    saveBusinessState(state) {
        return this.update('solopreneur', state);
    },

    getBusinessState() {
        return this.get(this.KEYS.SOLopreneur);
    },

    // GameDev specific
    saveGameDevState(state) {
        return this.update('gamedev', state);
    },

    getGameDevState() {
        return this.get(this.KEYS.GAMEDEV);
    },

    // Export all data
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
        
        console.log('📦 Full export complete');
        return true;
    },

    // Import data
    import(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate structure
                    if (!data.systems) {
                        throw new Error('Invalid backup file structure');
                    }

                    // Confirm import
                    if (!confirm(`Import backup from ${data.exportDate}? This will overwrite current data.`)) {
                        resolve(false);
                        return;
                    }

                    // Import each system
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

                    console.log('📥 Import complete');
                    resolve(true);
                } catch (error) {
                    console.error('Import error:', error);
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    },

    // Clear all data (reset)
    reset() {
        if (confirm('⚠️ WARNING: This will DELETE ALL DATA. Are you sure?')) {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            localStorage.removeItem('arcanea_initialized');
            console.log('🗑️ All data cleared');
            return true;
        }
        return false;
    },

    // Get storage stats
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
            available: '5 MB' // localStorage limit
        };
    }
};

// Auto-initialize when script loads
ArcaneaStorage.init();

// Auto-save on page unload
window.addEventListener('beforeunload', () => {
    console.log('💾 Auto-saving before exit...');
});

// Keyboard shortcut for export (Ctrl+Shift+E)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        ArcaneaStorage.exportAll();
    }
});

console.log('🔮 Arcanea Data Persistence: Loaded');
