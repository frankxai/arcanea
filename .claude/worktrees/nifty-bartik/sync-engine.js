/**
 * Arcanea Sync Engine
 * Real-time synchronization with offline support
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * Sync Engine - Manages data synchronization between localStorage and Supabase
     */
    const SyncEngine = {
        // Configuration
        config: {
            syncInterval: 5000,
            retryAttempts: 3,
            retryDelay: 1000,
            batchSize: 50,
            offlineQueueMax: 100,
            conflictResolution: 'server-wins' // 'server-wins' | 'client-wins' | 'manual'
        },

        // State
        isOnline: navigator.onLine,
        isSyncing: false,
        lastSync: null,
        syncQueue: [],
        subscriptions: [],
        syncStatus: 'idle', // 'idle' | 'syncing' | 'error' | 'offline'
        listeners: [],

        /**
         * Initialize the sync engine
         */
        async initialize(options = {}) {
            // Merge options with defaults
            Object.assign(this.config, options);

            // Load offline queue from localStorage
            this._loadQueue();

            // Setup network monitoring
            this._setupNetworkMonitoring();

            // Setup periodic sync
            this._setupPeriodicSync();

            // Setup real-time subscriptions if Supabase is available
            if (global.ArcaneaSupabase?.Client?.isReady()) {
                await this._setupRealtimeSubscriptions();
            }

            // Try to sync any pending items
            if (this.isOnline && this.syncQueue.length > 0) {
                await this.processQueue();
            }

            console.log('✅ Sync Engine initialized');
            console.log(`   Queue: ${this.syncQueue.length} items pending`);
            console.log(`   Status: ${this.syncStatus}`);

            return true;
        },

        /**
         * Setup network status monitoring
         */
        _setupNetworkMonitoring() {
            window.addEventListener('online', () => {
                console.log('🌐 Online - resuming sync');
                this.isOnline = true;
                this.syncStatus = 'idle';
                this._notifyListeners('online');
                this.processQueue();
            });

            window.addEventListener('offline', () => {
                console.log('📴 Offline - queueing changes');
                this.isOnline = false;
                this.syncStatus = 'offline';
                this._notifyListeners('offline');
            });

            // Listen for sync trigger events
            window.addEventListener('arcanea:sync:trigger', () => {
                this.sync();
            });
        },

        /**
         * Setup periodic background sync
         */
        _setupPeriodicSync() {
            setInterval(() => {
                if (this.isOnline && !this.isSyncing) {
                    this.sync();
                }
            }, this.config.syncInterval);
        },

        /**
         * Setup real-time database subscriptions
         */
        async _setupRealtimeSubscriptions() {
            const client = global.ArcaneaSupabase.Client.getClient();
            const user = global.ArcaneaAuth?.getUser();

            if (!user) return;

            const tables = [
                'game_state',
                'business_state',
                'gamedev_state',
                'agents',
                'skills',
                'challenges',
                'manifestations'
            ];

            tables.forEach(table => {
                const channel = client
                    .channel(`sync:${table}`)
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: table,
                        filter: `user_id=eq.${user.id}`
                    }, (payload) => {
                        this._handleRealtimeChange(table, payload);
                    })
                    .subscribe();

                this.subscriptions.push(channel);
            });

            console.log(`✅ Realtime subscriptions: ${tables.length} tables`);
        },

        /**
         * Handle real-time database changes
         */
        _handleRealtimeChange(table, payload) {
            const { eventType, new: newRecord, old: oldRecord } = payload;

            console.log(`📡 Realtime ${eventType} on ${table}`);

            // Update localStorage with server change
            this._updateLocalStorage(table, newRecord, eventType);

            // Notify listeners
            this._notifyListeners('realtime', {
                table,
                event: eventType,
                data: newRecord
            });

            // Dispatch custom event for UI updates
            window.dispatchEvent(new CustomEvent('arcanea:data:updated', {
                detail: { table, event: eventType, data: newRecord }
            }));
        },

        /**
         * Update localStorage with server data
         */
        _updateLocalStorage(table, data, event) {
            const key = `arcanea_${table}`;
            
            try {
                switch (table) {
                    case 'game_state':
                        localStorage.setItem('arcanea_games_state', JSON.stringify(data));
                        break;
                    case 'business_state':
                        localStorage.setItem('arcanea_business_state', JSON.stringify(data));
                        break;
                    case 'gamedev_state':
                        localStorage.setItem('arcanea_gamedev_state', JSON.stringify(data));
                        break;
                    case 'agents':
                    case 'skills':
                    case 'challenges':
                        // These are arrays - merge with existing
                        const existing = JSON.parse(localStorage.getItem(key) || '[]');
                        if (event === 'DELETE') {
                            const filtered = existing.filter(item => item.id !== data.id);
                            localStorage.setItem(key, JSON.stringify(filtered));
                        } else {
                            const index = existing.findIndex(item => item.id === data.id);
                            if (index >= 0) {
                                existing[index] = data;
                            } else {
                                existing.push(data);
                            }
                            localStorage.setItem(key, JSON.stringify(existing));
                        }
                        break;
                    default:
                        localStorage.setItem(key, JSON.stringify(data));
                }
            } catch (e) {
                console.warn('Failed to update localStorage:', e);
            }
        },

        /**
         * Add operation to sync queue
         */
        queue(operation) {
            // Check queue size limit
            if (this.syncQueue.length >= this.config.offlineQueueMax) {
                console.warn('⚠️ Sync queue full - removing oldest item');
                this.syncQueue.shift();
            }

            // Add to queue with metadata
            const queueItem = {
                id: this._generateId(),
                timestamp: Date.now(),
                attempts: 0,
                operation: {
                    type: operation.type, // 'insert' | 'update' | 'delete'
                    table: operation.table,
                    data: operation.data,
                    filters: operation.filters || {}
                }
            };

            this.syncQueue.push(queueItem);
            this._saveQueue();

            // Try to sync immediately if online
            if (this.isOnline && !this.isSyncing) {
                this.processQueue();
            }

            this._notifyListeners('queued', queueItem);

            return queueItem.id;
        },

        /**
         * Process the sync queue
         */
        async processQueue() {
            if (!this.isOnline || this.isSyncing || this.syncQueue.length === 0) {
                return { processed: 0, failed: 0 };
            }

            this.isSyncing = true;
            this.syncStatus = 'syncing';
            this._notifyListeners('sync-start');

            const client = global.ArcaneaSupabase?.Client?.getClient();
            if (!client) {
                console.warn('⚠️ Supabase client not available');
                this.isSyncing = false;
                this.syncStatus = 'error';
                return { processed: 0, failed: this.syncQueue.length };
            }

            let processed = 0;
            let failed = 0;
            const queue = [...this.syncQueue];
            this.syncQueue = []; // Clear queue - we'll re-add failures

            for (const item of queue) {
                try {
                    const result = await this._executeOperation(client, item.operation);
                    
                    if (result.success) {
                        processed++;
                        console.log(`✅ Synced: ${item.operation.type} ${item.operation.table}`);
                    } else {
                        // Re-queue if attempts < max
                        if (item.attempts < this.config.retryAttempts) {
                            item.attempts++;
                            this.syncQueue.push(item);
                        } else {
                            failed++;
                            console.error(`❌ Failed permanently: ${item.operation.table}`);
                        }
                    }
                } catch (error) {
                    console.error('Sync error:', error);
                    if (item.attempts < this.config.retryAttempts) {
                        item.attempts++;
                        this.syncQueue.push(item);
                    } else {
                        failed++;
                    }
                }
            }

            this._saveQueue();
            this.isSyncing = false;
            this.lastSync = new Date();
            this.syncStatus = failed > 0 ? 'error' : 'idle';

            this._notifyListeners('sync-complete', { processed, failed });

            // Update local lastSync timestamp
            localStorage.setItem('arcanea_last_sync', this.lastSync.toISOString());

            return { processed, failed };
        },

        /**
         * Execute a single database operation
         */
        async _executeOperation(client, operation) {
            const { type, table, data, filters } = operation;

            try {
                let result;

                switch (type) {
                    case 'insert':
                        result = await client.from(table).insert(data).select();
                        break;

                    case 'update':
                        let updateQuery = client.from(table).update(data);
                        Object.entries(filters).forEach(([key, value]) => {
                            updateQuery = updateQuery.eq(key, value);
                        });
                        result = await updateQuery.select();
                        break;

                    case 'delete':
                        let deleteQuery = client.from(table).delete();
                        Object.entries(filters).forEach(([key, value]) => {
                            deleteQuery = deleteQuery.eq(key, value);
                        });
                        result = await deleteQuery.select();
                        break;

                    case 'upsert':
                        result = await client.from(table).upsert(data).select();
                        break;

                    default:
                        throw new Error(`Unknown operation type: ${type}`);
                }

                if (result.error) {
                    throw result.error;
                }

                return { success: true, data: result.data };

            } catch (error) {
                console.error(`Operation failed: ${type} ${table}`, error);
                return { success: false, error: error.message };
            }
        },

        /**
         * Perform full sync with server
         */
        async sync() {
            if (!this.isOnline) {
                return { success: false, error: 'Offline' };
            }

            // First, process any queued operations
            const queueResult = await this.processQueue();

            // Then, pull latest data from server
            const pullResult = await this._pullFromServer();

            return {
                success: queueResult.failed === 0 && pullResult.success,
                queue: queueResult,
                pull: pullResult,
                timestamp: new Date()
            };
        },

        /**
         * Pull latest data from server
         */
        async _pullFromServer() {
            const client = global.ArcaneaSupabase?.Client?.getClient();
            const user = global.ArcaneaAuth?.getUser();

            if (!client || !user) {
                return { success: false, error: 'Not authenticated' };
            }

            try {
                const tables = [
                    { name: 'game_state', key: 'arcanea_games_state', single: true },
                    { name: 'business_state', key: 'arcanea_business_state', single: true },
                    { name: 'gamedev_state', key: 'arcanea_gamedev_state', single: true },
                    { name: 'agents', key: 'arcanea_agents', single: false },
                    { name: 'skills', key: 'arcanea_skills', single: false }
                ];

                for (const { name, key, single } of tables) {
                    let query = client
                        .from(name)
                        .select('*')
                        .eq('user_id', user.id);

                    if (single) {
                        query = query.single();
                    }

                    const { data, error } = await query;

                    if (error && error.code !== 'PGRST116') {
                        console.warn(`Failed to sync ${name}:`, error.message);
                        continue;
                    }

                    if (data) {
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                }

                return { success: true };

            } catch (error) {
                console.error('Pull failed:', error);
                return { success: false, error: error.message };
            }
        },

        /**
         * Save game state to cloud
         */
        async saveGameState(state) {
            const user = global.ArcaneaAuth?.getUser();
            if (!user) {
                // Just save locally
                localStorage.setItem('arcanea_games_state', JSON.stringify(state));
                return { success: true, localOnly: true };
            }

            const data = {
                user_id: user.id,
                ...state,
                last_sync: new Date().toISOString()
            };

            if (this.isOnline) {
                try {
                    const client = global.ArcaneaSupabase.Client.getClient();
                    const { error } = await client
                        .from('game_state')
                        .upsert(data, { onConflict: 'user_id' });

                    if (error) throw error;

                    return { success: true };
                } catch (error) {
                    // Queue for later
                    this.queue({
                        type: 'upsert',
                        table: 'game_state',
                        data: data
                    });
                    return { success: false, queued: true, error: error.message };
                }
            } else {
                // Queue for later
                this.queue({
                    type: 'upsert',
                    table: 'game_state',
                    data: data
                });
                return { success: true, queued: true };
            }
        },

        /**
         * Save business state to cloud
         */
        async saveBusinessState(state) {
            const user = global.ArcaneaAuth?.getUser();
            if (!user) {
                localStorage.setItem('arcanea_business_state', JSON.stringify(state));
                return { success: true, localOnly: true };
            }

            const data = {
                user_id: user.id,
                ...state,
                last_sync: new Date().toISOString()
            };

            if (this.isOnline) {
                try {
                    const client = global.ArcaneaSupabase.Client.getClient();
                    const { error } = await client
                        .from('business_state')
                        .upsert(data, { onConflict: 'user_id' });

                    if (error) throw error;

                    return { success: true };
                } catch (error) {
                    this.queue({
                        type: 'upsert',
                        table: 'business_state',
                        data: data
                    });
                    return { success: false, queued: true };
                }
            } else {
                this.queue({
                    type: 'upsert',
                    table: 'business_state',
                    data: data
                });
                return { success: true, queued: true };
            }
        },

        /**
         * Save gamedev state to cloud
         */
        async saveGameDevState(state) {
            const user = global.ArcaneaAuth?.getUser();
            if (!user) {
                localStorage.setItem('arcanea_gamedev_state', JSON.stringify(state));
                return { success: true, localOnly: true };
            }

            const data = {
                user_id: user.id,
                ...state,
                last_sync: new Date().toISOString()
            };

            if (this.isOnline) {
                try {
                    const client = global.ArcaneaSupabase.Client.getClient();
                    const { error } = await client
                        .from('gamedev_state')
                        .upsert(data, { onConflict: 'user_id' });

                    if (error) throw error;

                    return { success: true };
                } catch (error) {
                    this.queue({
                        type: 'upsert',
                        table: 'gamedev_state',
                        data: data
                    });
                    return { success: false, queued: true };
                }
            } else {
                this.queue({
                    type: 'upsert',
                    table: 'gamedev_state',
                    data: data
                });
                return { success: true, queued: true };
            }
        },

        /**
         * Create sync status indicator UI
         */
        createStatusIndicator(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const indicator = document.createElement('div');
            indicator.id = 'arcanea-sync-status';
            indicator.style.cssText = `
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                font-size: 0.8rem;
                color: #a0a0b0;
                cursor: pointer;
                transition: all 0.2s;
            `;

            this._updateStatusIndicator(indicator);
            container.appendChild(indicator);

            // Update on status change
            this.onStatusChange((status) => {
                this._updateStatusIndicator(indicator);
            });

            // Click to force sync
            indicator.addEventListener('click', () => {
                this.sync();
            });
        },

        /**
         * Update status indicator
         */
        _updateStatusIndicator(indicator) {
            const icons = {
                'idle': '✓',
                'syncing': '↻',
                'error': '⚠',
                'offline': '📴'
            };

            const colors = {
                'idle': '#4caf50',
                'syncing': '#ff9800',
                'error': '#f44336',
                'offline': '#9e9e9e'
            };

            const texts = {
                'idle': this.lastSync 
                    ? `Synced ${this._timeAgo(this.lastSync)}` 
                    : 'Ready to sync',
                'syncing': 'Syncing...',
                'error': 'Sync error - click to retry',
                'offline': 'Offline - changes queued'
            };

            indicator.innerHTML = `
                <span style="color: ${colors[this.syncStatus]}">${icons[this.syncStatus]}</span>
                <span>${texts[this.syncStatus]}</span>
            `;

            if (this.syncStatus === 'syncing') {
                indicator.querySelector('span:first-child').style.animation = 'spin 1s linear infinite';
            }
        },

        /**
         * Format time ago
         */
        _timeAgo(date) {
            const seconds = Math.floor((new Date() - new Date(date)) / 1000);
            if (seconds < 60) return 'just now';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours}h ago`;
            return `${Math.floor(hours / 24)}d ago`;
        },

        /**
         * Load queue from localStorage
         */
        _loadQueue() {
            try {
                const saved = localStorage.getItem('arcanea_sync_queue');
                if (saved) {
                    this.syncQueue = JSON.parse(saved);
                }
            } catch (e) {
                console.warn('Failed to load sync queue:', e);
                this.syncQueue = [];
            }
        },

        /**
         * Save queue to localStorage
         */
        _saveQueue() {
            try {
                localStorage.setItem('arcanea_sync_queue', JSON.stringify(this.syncQueue));
            } catch (e) {
                console.warn('Failed to save sync queue:', e);
            }
        },

        /**
         * Generate unique ID
         */
        _generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },

        /**
         * Add status change listener
         */
        onStatusChange(callback) {
            this.listeners.push(callback);
            return () => {
                const index = this.listeners.indexOf(callback);
                if (index > -1) {
                    this.listeners.splice(index, 1);
                }
            };
        },

        /**
         * Notify all listeners
         */
        _notifyListeners(event, data = {}) {
            this.listeners.forEach(callback => {
                try {
                    callback(event, data);
                } catch (e) {
                    console.error('Sync listener error:', e);
                }
            });
        },

        /**
         * Get current sync status
         */
        getStatus() {
            return {
                isOnline: this.isOnline,
                isSyncing: this.isSyncing,
                status: this.syncStatus,
                queueLength: this.syncQueue.length,
                lastSync: this.lastSync
            };
        },

        /**
         * Force sync now
         */
        async forceSync() {
            return await this.sync();
        },

        /**
         * Clear sync queue
         */
        clearQueue() {
            this.syncQueue = [];
            this._saveQueue();
            console.log('🗑️ Sync queue cleared');
        }
    };

    // Export to global scope
    global.ArcaneaSync = SyncEngine;

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        SyncEngine.initialize();
    });

})(window);
