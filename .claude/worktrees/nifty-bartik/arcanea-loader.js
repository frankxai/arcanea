/**
 * Arcanea Ecosystem Master Loader
 * Integrates all systems: Auth, Sync, AI Agents, Mobile
 * Auto-detects page type and initializes appropriate modules
 */

(function() {
    'use strict';

    // Arcanea Loader Namespace
    window.ArcaneaLoader = {
        version: '3.0.0',
        initialized: false,
        currentPage: null,
        modules: {},
        
        // Page type detection
        pageTypes: {
            'games-v2.html': 'games',
            'games.html': 'games',
            'solopreneur-os.html': 'business',
            'game-designer-os.html': 'gamedev',
            'portal.html': 'portal',
            'index.html': 'landing',
            'integrate-all.html': 'integration',
            'arcanea-auth-ui.html': 'auth'
        },

        /**
         * Initialize the Arcanea ecosystem
         */
        init: function() {
            if (this.initialized) {
                console.log('[Arcanea] Already initialized');
                return;
            }

            console.log('[Arcanea] Initializing ecosystem v' + this.version);
            
            // Detect current page
            this.currentPage = this.detectPage();
            console.log('[Arcanea] Page detected:', this.currentPage);

            // Load configuration
            this.loadConfig();

            // Initialize auth system
            this.initAuth();

            // Initialize sync engine
            this.initSync();

            // Initialize AI agents
            this.initAgents();

            // Initialize mobile features
            this.initMobile();

            // Page-specific initialization
            this.initPageSpecific();

            // Setup global event listeners
            this.setupGlobalListeners();

            this.initialized = true;
            console.log('[Arcanea] Ecosystem fully initialized');

            // Dispatch initialization event
            window.dispatchEvent(new CustomEvent('arcanea:initialized', {
                detail: { page: this.currentPage, version: this.version }
            }));
        },

        /**
         * Detect which page we're on
         */
        detectPage: function() {
            const path = window.location.pathname;
            const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
            return this.pageTypes[filename] || 'unknown';
        },

        /**
         * Load configuration
         */
        loadConfig: function() {
            // Check if Supabase config is available
            if (window.ArcaneaConfig) {
                this.config = window.ArcaneaConfig;
                console.log('[Arcanea] Configuration loaded');
            } else {
                console.warn('[Arcanea] No configuration found, using defaults');
                this.config = {
                    supabaseUrl: null,
                    supabaseKey: null,
                    offlineMode: true
                };
            }
        },

        /**
         * Initialize authentication
         */
        initAuth: function() {
            if (window.ArcaneaAuth) {
                this.modules.auth = window.ArcaneaAuth;
                console.log('[Arcanea] Auth module connected');
                
                // Listen for auth state changes
                window.addEventListener('auth:stateChanged', (e) => {
                    this.handleAuthChange(e.detail);
                });
            } else {
                console.warn('[Arcanea] Auth module not available');
            }
        },

        /**
         * Initialize sync engine
         */
        initSync: function() {
            if (window.ArcaneaSync) {
                this.modules.sync = window.ArcaneaSync;
                console.log('[Arcanea] Sync engine connected');
                
                // Connect to sync events
                window.addEventListener('sync:dataReceived', (e) => {
                    this.handleSyncData(e.detail);
                });
            } else {
                console.warn('[Arcanea] Sync engine not available');
            }
        },

        /**
         * Initialize AI agents
         */
        initAgents: function() {
            if (window.ArcaneaAgents) {
                this.modules.agents = window.ArcaneaAgents;
                console.log('[Arcanea] AI agents connected');
                
                // Register page-specific agents
                this.registerPageAgents();
            } else {
                console.warn('[Arcanea] Agents module not available');
            }
        },

        /**
         * Initialize mobile features
         */
        initMobile: function() {
            if (window.ArcaneaMobile) {
                this.modules.mobile = window.ArcaneaMobile;
                console.log('[Arcanea] Mobile integration connected');
                
                // Enable mobile optimizations
                this.modules.mobile.optimize();
            } else {
                console.warn('[Arcanea] Mobile module not available');
            }
        },

        /**
         * Page-specific initialization
         */
        initPageSpecific: function() {
            const page = this.currentPage;
            console.log('[Arcanea] Initializing page-specific features for:', page);

            switch(page) {
                case 'games':
                    this.initGamesPage();
                    break;
                case 'business':
                    this.initBusinessPage();
                    break;
                case 'gamedev':
                    this.initGameDevPage();
                    break;
                case 'portal':
                    this.initPortalPage();
                    break;
                case 'landing':
                    this.initLandingPage();
                    break;
                case 'auth':
                    this.initAuthPage();
                    break;
            }
        },

        /**
         * Initialize Games page features
         */
        initGamesPage: function() {
            // Connect XP system to sync
            this.hookXPSystem();
            
            // Connect level progression
            this.hookLevelSystem();
            
            // Connect skill unlocks
            this.hookSkillSystem();

            console.log('[Arcanea] Games page features initialized');
        },

        /**
         * Initialize Business/Solopreneur page features
         */
        initBusinessPage: function() {
            // Connect time tracker
            this.hookTimeTracker();
            
            // Connect revenue tracking
            this.hookRevenueTracking();
            
            // Connect client data
            this.hookClientData();

            console.log('[Arcanea] Business page features initialized');
        },

        /**
         * Initialize Game Dev page features
         */
        initGameDevPage: function() {
            // Connect level editor
            this.hookLevelEditor();
            
            // Connect asset management
            this.hookAssetManagement();

            console.log('[Arcanea] Game Dev page features initialized');
        },

        /**
         * Initialize Portal page features
         */
        initPortalPage: function() {
            // Show auth status
            this.updateAuthStatus();
            
            // Show sync indicator
            this.updateSyncIndicator();
            
            // Enable real-time updates
            this.enableRealtimeUpdates();

            console.log('[Arcanea] Portal page features initialized');
        },

        /**
         * Initialize Landing page features
         */
        initLandingPage: function() {
            // Add login/signup buttons if not present
            this.enhanceLandingPage();
            
            // Check auth and redirect if logged in
            this.checkAuthAndRedirect();

            console.log('[Arcanea] Landing page features initialized');
        },

        /**
         * Initialize Auth page features
         */
        initAuthPage: function() {
            // Auth UI is handled by auth-ui.js
            console.log('[Arcanea] Auth page features initialized');
        },

        /**
         * Register page-specific agents
         */
        registerPageAgents: function() {
            const pageAgents = {
                'games': ['dragon-forge', 'phoenix-artisan', 'catalyst-architect'],
                'business': ['crystal-architect', 'gem-cutter', 'structural-optimiser'],
                'gamedev': ['void-gazer', 'quantum-designer', 'reality-weaver'],
                'portal': ['source-tapper', 'void-gazer', 'elemental-fusion'],
                'landing': ['whisper-messenger', 'mirror-reflector']
            };

            const agents = pageAgents[this.currentPage] || [];
            agents.forEach(agentId => {
                if (this.modules.agents && this.modules.agents.register) {
                    this.modules.agents.register(agentId);
                }
            });

            console.log('[Arcanea] Registered agents for', this.currentPage, ':', agents);
        },

        /**
         * Hook into XP system for games page
         */
        hookXPSystem: function() {
            // Override addXP function if it exists
            if (window.addXP) {
                const originalAddXP = window.addXP;
                window.addXP = function(amount, source) {
                    const result = originalAddXP(amount, source);
                    
                    // Sync to cloud
                    if (window.ArcaneaSync) {
                        window.ArcaneaSync.sync('xp', { amount, source, timestamp: Date.now() });
                    }
                    
                    // Notify other tabs
                    window.dispatchEvent(new CustomEvent('arcanea:xpEarned', {
                        detail: { amount, source }
                    }));
                    
                    return result;
                };
            }
        },

        /**
         * Hook into level system
         */
        hookLevelSystem: function() {
            // Listen for level up events
            window.addEventListener('arcanea:levelUp', (e) => {
                if (window.ArcaneaSync) {
                    window.ArcaneaSync.sync('level', e.detail);
                }
                
                // Show notification
                this.showNotification('Level Up!', `You've reached level ${e.detail.level}`);
            });
        },

        /**
         * Hook into skill system
         */
        hookSkillSystem: function() {
            window.addEventListener('arcanea:skillUnlocked', (e) => {
                if (window.ArcaneaSync) {
                    window.ArcaneaSync.sync('skill', e.detail);
                }
            });
        },

        /**
         * Hook into time tracker for business page
         */
        hookTimeTracker: function() {
            const self = this;
            
            // Intercept timer functions
            if (window.startTimer) {
                const originalStart = window.startTimer;
                window.startTimer = function() {
                    const result = originalStart.apply(this, arguments);
                    self.syncTimerState('started');
                    return result;
                };
            }

            if (window.stopTimer) {
                const originalStop = window.stopTimer;
                window.stopTimer = function() {
                    const result = originalStop.apply(this, arguments);
                    self.syncTimerState('stopped');
                    return result;
                };
            }
        },

        /**
         * Sync timer state
         */
        syncTimerState: function(state) {
            if (window.ArcaneaSync) {
                window.ArcaneaSync.sync('timer', { state, timestamp: Date.now() });
            }
        },

        /**
         * Hook into revenue tracking
         */
        hookRevenueTracking: function() {
            window.addEventListener('arcanea:revenueUpdated', (e) => {
                if (window.ArcaneaSync) {
                    window.ArcaneaSync.sync('revenue', e.detail);
                }
            });
        },

        /**
         * Hook into client data
         */
        hookClientData: function() {
            window.addEventListener('arcanea:clientUpdated', (e) => {
                if (window.ArcaneaSync) {
                    window.ArcaneaSync.sync('client', e.detail);
                }
            });
        },

        /**
         * Hook into level editor
         */
        hookLevelEditor: function() {
            window.addEventListener('arcanea:levelSaved', (e) => {
                if (window.ArcaneaSync) {
                    window.ArcaneaSync.sync('level', e.detail);
                }
                this.showNotification('Level Saved', 'Your level has been synced to the cloud');
            });
        },

        /**
         * Hook into asset management
         */
        hookAssetManagement: function() {
            // Connect to asset generation
            if (window.generateAsset && window.ArcaneaMCP) {
                const self = this;
                const originalGenerate = window.generateAsset;
                window.generateAsset = function(type, params) {
                    // Use MCP for generation
                    return window.ArcaneaMCP.generate(type, params).then(result => {
                        // Sync to cloud
                        if (window.ArcaneaSync) {
                            window.ArcaneaSync.sync('asset', { type, params, result });
                        }
                        return result;
                    });
                };
            }
        },

        /**
         * Update auth status display
         */
        updateAuthStatus: function() {
            const statusEl = document.getElementById('auth-status');
            if (!statusEl) return;

            if (this.modules.auth && this.modules.auth.isAuthenticated) {
                const user = this.modules.auth.getUser();
                statusEl.innerHTML = `<span class="auth-indicator authenticated">●</span> ${user.email}`;
            } else {
                statusEl.innerHTML = `<span class="auth-indicator anonymous">●</span> Guest`;
            }
        },

        /**
         * Update sync indicator
         */
        updateSyncIndicator: function() {
            const indicatorEl = document.getElementById('sync-indicator');
            if (!indicatorEl) return;

            if (this.modules.sync && this.modules.sync.isConnected) {
                indicatorEl.innerHTML = `<span class="sync-status connected">⟲</span> Synced`;
            } else {
                indicatorEl.innerHTML = `<span class="sync-status offline">✕</span> Offline`;
            }
        },

        /**
         * Enable real-time updates
         */
        enableRealtimeUpdates: function() {
            // Listen for updates from other tabs
            window.addEventListener('storage', (e) => {
                if (e.key.startsWith('arcanea:')) {
                    this.handleStorageChange(e.key, e.newValue);
                }
            });
        },

        /**
         * Handle auth state changes
         */
        handleAuthChange: function(detail) {
            console.log('[Arcanea] Auth state changed:', detail);
            this.updateAuthStatus();
            
            // Reload page data if authenticated
            if (detail.authenticated && this.modules.sync) {
                this.modules.sync.pull();
            }
        },

        /**
         * Handle sync data
         */
        handleSyncData: function(data) {
            console.log('[Arcanea] Sync data received:', data);
            this.updateSyncIndicator();
        },

        /**
         * Handle storage changes from other tabs
         */
        handleStorageChange: function(key, value) {
            const data = JSON.parse(value || '{}');
            console.log('[Arcanea] Storage change:', key, data);
            
            // Refresh relevant UI components
            window.dispatchEvent(new CustomEvent('arcanea:update', { detail: data }));
        },

        /**
         * Enhance landing page with auth buttons
         */
        enhanceLandingPage: function() {
            // Check if auth buttons already exist
            if (document.getElementById('arcanea-auth-buttons')) return;

            const ctaContainer = document.querySelector('.cta-buttons');
            if (!ctaContainer) return;

            const authDiv = document.createElement('div');
            authDiv.id = 'arcanea-auth-buttons';
            authDiv.style.cssText = 'display: flex; gap: 1rem; margin-top: 1.5rem;';
            authDiv.innerHTML = `
                <button onclick="ArcaneaLoader.showAuthModal('login')" class="btn btn-secondary">🔐 Login</button>
                <button onclick="ArcaneaLoader.showAuthModal('signup')" class="btn btn-secondary">✨ Sign Up</button>
            `;

            ctaContainer.parentNode.insertBefore(authDiv, ctaContainer.nextSibling);
        },

        /**
         * Check auth and redirect if needed
         */
        checkAuthAndRedirect: function() {
            if (this.modules.auth && this.modules.auth.isAuthenticated) {
                // User is logged in, suggest portal
                const ctaContainer = document.querySelector('.cta-buttons');
                if (ctaContainer) {
                    const portalBtn = document.createElement('a');
                    portalBtn.href = 'portal.html';
                    portalBtn.className = 'btn btn-primary';
                    portalBtn.innerHTML = '🌐 Go to Portal';
                    ctaContainer.insertBefore(portalBtn, ctaContainer.firstChild);
                }
            }
        },

        /**
         * Show auth modal
         */
        showAuthModal: function(type) {
            window.location.href = `arcanea-auth-ui.html?mode=${type}`;
        },

        /**
         * Show notification
         */
        showNotification: function(title, message) {
            // Create notification element
            const notif = document.createElement('div');
            notif.className = 'arcanea-notification';
            notif.innerHTML = `
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            `;
            
            // Add styles
            notif.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ffd700, #ff8f00);
                color: #000;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            `;

            document.body.appendChild(notif);

            // Remove after 5 seconds
            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 5000);
        },

        /**
         * Setup global event listeners
         */
        setupGlobalListeners: function() {
            // Handle online/offline
            window.addEventListener('online', () => {
                console.log('[Arcanea] Connection restored');
                this.updateSyncIndicator();
                if (this.modules.sync) {
                    this.modules.sync.connect();
                }
            });

            window.addEventListener('offline', () => {
                console.log('[Arcanea] Connection lost');
                this.updateSyncIndicator();
            });

            // Handle visibility change (tab switching)
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && this.modules.sync) {
                    this.modules.sync.pull();
                }
            });
        },

        /**
         * Utility: Wait for element
         */
        waitForElement: function(selector, timeout = 5000) {
            return new Promise((resolve, reject) => {
                const el = document.querySelector(selector);
                if (el) return resolve(el);

                const observer = new MutationObserver(() => {
                    const el = document.querySelector(selector);
                    if (el) {
                        observer.disconnect();
                        resolve(el);
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });

                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Element ${selector} not found`));
                }, timeout);
            });
        },

        /**
         * Utility: Safe JSON parse
         */
        safeJSON: function(str, defaultValue = null) {
            try {
                return JSON.parse(str);
            } catch (e) {
                return defaultValue;
            }
        }
    };

    // Add keyframe animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        .auth-indicator { font-size: 1.2rem; }
        .auth-indicator.authenticated { color: #4caf50; }
        .auth-indicator.anonymous { color: #ff9800; }
        .sync-status { font-size: 1.2rem; }
        .sync-status.connected { color: #4caf50; }
        .sync-status.offline { color: #f44336; }
    `;
    document.head.appendChild(style);

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.ArcaneaLoader.init());
    } else {
        window.ArcaneaLoader.init();
    }

    console.log('[Arcanea] Loader script loaded');
})();
