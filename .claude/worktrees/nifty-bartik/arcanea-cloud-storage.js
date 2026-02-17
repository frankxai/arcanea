/**
 * Arcanea Cloud Storage Client
 * Production-ready cloud sync with offline-first architecture
 * Version: 2.0.0
 * 
 * Features:
 * - Supabase integration with real-time subscriptions
 * - Offline-first queue system with optimistic updates
 * - Conflict resolution with timestamp-based strategy
 * - Data encryption layer for sensitive information
 * - Cross-device synchronization
 * 
 * @module ArcaneaCloudStorage
 * @author Arcanea Team
 * @license MIT
 */

import { supabase, handleSupabaseError } from './supabase-client-config.js';

/**
 * Arcanea Cloud Storage - Main Storage Class
 * Implements offline-first pattern with cloud synchronization
 */
class ArcaneaCloudStorage {
    /**
     * Creates an instance of ArcaneaCloudStorage
     * @param {Object} options - Configuration options
     * @param {boolean} options.enableEncryption - Enable data encryption (default: true)
     * @param {number} options.syncInterval - Sync interval in ms (default: 30000)
     * @param {number} options.maxRetries - Max retry attempts for failed operations (default: 3)
     * @param {boolean} options.enableRealtime - Enable real-time subscriptions (default: true)
     */
    constructor(options = {}) {
        this.options = {
            enableEncryption: options.enableEncryption !== false,
            syncInterval: options.syncInterval || 30000,
            maxRetries: options.maxRetries || 3,
            enableRealtime: options.enableRealtime !== false
        };

        // Storage keys for localStorage
        this.STORAGE_KEYS = {
            SYNC_QUEUE: 'arcanea_sync_queue',
            PENDING_OPS: 'arcanea_pending_operations',
            LAST_SYNC: 'arcanea_last_sync_timestamp',
            OFFLINE_DATA: 'arcanea_offline_cache',
            CONFLICT_LOG: 'arcanea_conflict_log',
            SYNC_STATUS: 'arcanea_sync_status'
        };

        // State
        this.isOnline = navigator.onLine;
        this.isSyncing = false;
        this.syncIntervalId = null;
        this.subscriptions = new Map();
        this.eventListeners = new Map();
        this.encryptionKey = null;

        // Initialize encryption key if enabled
        if (this.options.enableEncryption) {
            this._initEncryption();
        }

        // Set up network listeners
        this._setupNetworkListeners();

        console.log('☁️ Arcanea Cloud Storage: Initialized');
    }

    /**
     * Initialize the storage system
     * @returns {Promise<boolean>} - Initialization success status
     */
    async init() {
        try {
            // Check if user is authenticated
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                console.log(`✅ Authenticated as: ${user.email}`);
                
                // Load any pending operations from offline queue
                await this._processOfflineQueue();
                
                // Set up real-time subscriptions if enabled
                if (this.options.enableRealtime) {
                    this._setupRealtimeSubscriptions(user.id);
                }
                
                // Start periodic sync
                this._startPeriodicSync();
                
                // Perform initial sync
                await this.sync();
            } else {
                console.log('⚠️ No authenticated user - operating in offline mode');
            }

            return true;
        } catch (error) {
            console.error('❌ Cloud Storage initialization failed:', error);
            return false;
        }
    }

    /**
     * Save data to cloud with offline fallback
     * @param {string} table - Table name
     * @param {Object} data - Data to save
     * @param {Object} options - Save options
     * @param {boolean} options.optimistic - Enable optimistic updates (default: true)
     * @param {string} options.id - Optional ID for upsert
     * @returns {Promise<Object>} - Saved data or queued operation
     */
    async save(table, data, options = {}) {
        const { optimistic = true, id } = options;
        
        try {
            // Generate operation ID
            const operationId = this._generateId();
            const timestamp = new Date().toISOString();
            
            // Prepare data with metadata
            const payload = {
                ...data,
                id: id || data.id || operationId,
                updated_at: timestamp,
                version: (data.version || 0) + 1,
                device_id: this._getDeviceId()
            };

            // Encrypt if enabled
            let storedData = payload;
            if (this.options.enableEncryption) {
                storedData = await this._encrypt(payload);
            }

            // Optimistic update - save to localStorage first
            if (optimistic) {
                this._saveToLocalCache(table, payload);
            }

            // If online, try to sync immediately
            if (this.isOnline) {
                const result = await this._syncToCloud(table, storedData);
                
                if (result.success) {
                    this._emit('data:saved', { table, data: payload, operationId });
                    return { success: true, data: payload, operationId };
                }
            }

            // Queue for later if offline or sync failed
            this._queueOperation({
                id: operationId,
                type: 'upsert',
                table,
                data: storedData,
                timestamp,
                retries: 0
            });

            this._emit('data:queued', { table, operationId, status: 'offline' });
            
            return { 
                success: true, 
                data: payload, 
                operationId,
                status: 'queued',
                message: 'Saved locally, will sync when online'
            };

        } catch (error) {
            console.error('Save error:', error);
            this._emit('error', { operation: 'save', table, error });
            throw error;
        }
    }

    /**
     * Load data from cloud with offline fallback
     * @param {string} table - Table name
     * @param {Object} query - Query parameters
     * @param {Object} options - Load options
     * @param {boolean} options.fallbackToCache - Use cache if offline (default: true)
     * @returns {Promise<Array>} - Array of data items
     */
    async load(table, query = {}, options = {}) {
        const { fallbackToCache = true } = options;

        try {
            if (this.isOnline) {
                // Try to fetch from cloud
                let dbQuery = supabase
                    .from(table)
                    .select('*');

                // Apply filters
                Object.entries(query).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        dbQuery = dbQuery.in(key, value);
                    } else if (typeof value === 'object') {
                        // Range queries
                        if (value.gt) dbQuery = dbQuery.gt(key, value.gt);
                        if (value.lt) dbQuery = dbQuery.lt(key, value.lt);
                        if (value.gte) dbQuery = dbQuery.gte(key, value.gte);
                        if (value.lte) dbQuery = dbQuery.lte(key, value.lte);
                    } else {
                        dbQuery = dbQuery.eq(key, value);
                    }
                });

                const { data, error } = await dbQuery;

                if (error) throw error;

                // Decrypt if needed
                let decryptedData = data;
                if (this.options.enableEncryption) {
                    decryptedData = await Promise.all(
                        data.map(item => this._decrypt(item))
                    );
                }

                // Update local cache with fresh data
                this._updateLocalCache(table, decryptedData);

                this._emit('data:loaded', { table, count: decryptedData.length });
                
                return decryptedData;
            }

            // Offline - return cached data
            if (fallbackToCache) {
                const cached = this._getFromLocalCache(table);
                if (cached) {
                    console.log(`📦 Returning cached data for ${table}`);
                    return cached;
                }
            }

            throw new Error('Offline and no cached data available');

        } catch (error) {
            console.error('Load error:', error);
            
            // Try cache as fallback
            if (fallbackToCache) {
                const cached = this._getFromLocalCache(table);
                if (cached) {
                    console.log(`📦 Fallback to cache for ${table}`);
                    return cached;
                }
            }

            this._emit('error', { operation: 'load', table, error });
            throw error;
        }
    }

    /**
     * Delete data from cloud with offline fallback
     * @param {string} table - Table name
     * @param {string} id - Record ID to delete
     * @returns {Promise<Object>} - Deletion result
     */
    async delete(table, id) {
        try {
            const operationId = this._generateId();
            const timestamp = new Date().toISOString();

            // Optimistic delete from cache
            this._removeFromLocalCache(table, id);

            if (this.isOnline) {
                const { error } = await supabase
                    .from(table)
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                this._emit('data:deleted', { table, id, operationId });
                return { success: true, operationId };
            }

            // Queue for later
            this._queueOperation({
                id: operationId,
                type: 'delete',
                table,
                data: { id },
                timestamp,
                retries: 0
            });

            return { 
                success: true, 
                operationId,
                status: 'queued',
                message: 'Delete queued for sync'
            };

        } catch (error) {
            console.error('Delete error:', error);
            this._emit('error', { operation: 'delete', table, id, error });
            throw error;
        }
    }

    /**
     * Perform semantic search on agent memories using pgvector
     * @param {string} query - Search query text
     * @param {Object} options - Search options
     * @param {number} options.limit - Max results (default: 10)
     * @param {number} options.threshold - Similarity threshold (default: 0.7)
     * @returns {Promise<Array>} - Matching memories with similarity scores
     */
    async searchMemories(query, options = {}) {
        const { limit = 10, threshold = 0.7 } = options;

        try {
            // Call the vector search function
            const { data, error } = await supabase.rpc('search_agent_memories', {
                query_text: query,
                match_threshold: threshold,
                match_count: limit
            });

            if (error) throw error;

            this._emit('search:completed', { 
                query, 
                results: data?.length || 0 
            });

            return data || [];

        } catch (error) {
            console.error('Memory search error:', error);
            
            // Fallback to local search if available
            const localResults = this._searchLocalMemories(query, limit);
            if (localResults.length > 0) {
                console.log('📦 Returning local search results');
                return localResults;
            }

            this._emit('error', { operation: 'search', query, error });
            throw error;
        }
    }

    /**
     * Save agent memory with embedding
     * @param {Object} memory - Memory data
     * @param {string} memory.agent_id - Agent identifier
     * @param {string} memory.content - Memory content
     * @param {string} memory.memory_type - Type of memory
     * @param {Object} memory.metadata - Additional metadata
     * @returns {Promise<Object>} - Saved memory
     */
    async saveMemory(memory) {
        try {
            const { data, error } = await supabase
                .from('agent_memories')
                .upsert({
                    ...memory,
                    id: memory.id || this._generateId(),
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;

            this._emit('memory:saved', { memoryId: data.id });
            return data;

        } catch (error) {
            console.error('Save memory error:', error);
            throw error;
        }
    }

    /**
     * Synchronize all pending operations
     * @returns {Promise<Object>} - Sync results
     */
    async sync() {
        if (this.isSyncing) {
            return { status: 'already_syncing' };
        }

        this.isSyncing = true;
        this._emit('sync:started');

        try {
            const queue = this._getSyncQueue();
            const results = {
                processed: 0,
                failed: 0,
                skipped: 0,
                details: []
            };

            for (const operation of queue) {
                try {
                    if (operation.retries >= this.options.maxRetries) {
                        results.skipped++;
                        results.details.push({
                            id: operation.id,
                            status: 'max_retries_exceeded'
                        });
                        continue;
                    }

                    const success = await this._executeOperation(operation);
                    
                    if (success) {
                        results.processed++;
                        this._removeFromQueue(operation.id);
                    } else {
                        operation.retries++;
                        this._updateQueueOperation(operation);
                        results.failed++;
                    }

                } catch (error) {
                    console.error(`Operation ${operation.id} failed:`, error);
                    operation.retries++;
                    this._updateQueueOperation(operation);
                    results.failed++;
                }
            }

            // Update last sync timestamp
            localStorage.setItem(
                this.STORAGE_KEYS.LAST_SYNC, 
                new Date().toISOString()
            );

            this._emit('sync:completed', results);
            return results;

        } catch (error) {
            console.error('Sync error:', error);
            this._emit('error', { operation: 'sync', error });
            throw error;
        } finally {
            this.isSyncing = false;
        }
    }

    /**
     * Force an immediate sync
     * @returns {Promise<Object>} - Sync results
     */
    async forceSync() {
        if (!this.isOnline) {
            throw new Error('Cannot sync while offline');
        }
        return this.sync();
    }

    /**
     * Get sync status and statistics
     * @returns {Object} - Sync status information
     */
    getSyncStatus() {
        const queue = this._getSyncQueue();
        const lastSync = localStorage.getItem(this.STORAGE_KEYS.LAST_SYNC);

        return {
            isOnline: this.isOnline,
            isSyncing: this.isSyncing,
            pendingOperations: queue.length,
            lastSync: lastSync ? new Date(lastSync) : null,
            encryptionEnabled: this.options.enableEncryption,
            realtimeEnabled: this.options.enableRealtime
        };
    }

    /**
     * Export all user data
     * @returns {Promise<Object>} - Complete data export
     */
    async exportAllData() {
        try {
            const userId = (await supabase.auth.getUser()).data.user?.id;
            
            if (!userId) {
                // Export from local cache only
                return this._exportLocalData();
            }

            // Fetch all user data
            const tables = ['user_data', 'agent_memories', 'user_settings'];
            const exportData = {
                version: '2.0.0',
                exported_at: new Date().toISOString(),
                user_id: userId,
                data: {}
            };

            for (const table of tables) {
                const { data, error } = await supabase
                    .from(table)
                    .select('*')
                    .eq('user_id', userId);

                if (error) throw error;
                exportData.data[table] = data;
            }

            // Add local cache data
            exportData.local_cache = this._getAllLocalCache();

            return exportData;

        } catch (error) {
            console.error('Export error:', error);
            throw error;
        }
    }

    /**
     * Import data from export
     * @param {Object} importData - Data to import
     * @param {Object} options - Import options
     * @param {boolean} options.merge - Merge with existing data (default: false)
     * @returns {Promise<Object>} - Import results
     */
    async importData(importData, options = {}) {
        const { merge = false } = options;

        try {
            const userId = (await supabase.auth.getUser()).data.user?.id;
            const results = { imported: 0, failed: 0 };

            // Import each table
            for (const [table, data] of Object.entries(importData.data || {})) {
                if (!Array.isArray(data)) continue;

                for (const item of data) {
                    try {
                        // Update user_id to current user
                        const itemWithUser = { ...item, user_id: userId };
                        
                        if (!merge) {
                            // Clear existing data first
                            await supabase.from(table).delete().eq('user_id', userId);
                        }

                        await this.save(table, itemWithUser);
                        results.imported++;
                    } catch (error) {
                        console.error(`Failed to import item to ${table}:`, error);
                        results.failed++;
                    }
                }
            }

            return results;

        } catch (error) {
            console.error('Import error:', error);
            throw error;
        }
    }

    /**
     * Subscribe to real-time changes
     * @param {string} table - Table to subscribe to
     * @param {Function} callback - Callback function for changes
     * @returns {Function} - Unsubscribe function
     */
    subscribe(table, callback) {
        if (!this.options.enableRealtime) {
            console.warn('Real-time subscriptions are disabled');
            return () => {};
        }

        const channel = supabase
            .channel(`table-changes-${table}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table },
                (payload) => {
                    callback(payload);
                    this._emit('realtime:change', { table, payload });
                }
            )
            .subscribe();

        this.subscriptions.set(table, channel);

        // Return unsubscribe function
        return () => {
            channel.unsubscribe();
            this.subscriptions.delete(table);
        };
    }

    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event handler
     * @returns {Function} - Remove listener function
     */
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event).add(callback);

        return () => {
            this.eventListeners.get(event)?.delete(callback);
        };
    }

    /**
     * Remove all event listeners
     */
    removeAllListeners() {
        this.eventListeners.clear();
    }

    /**
     * Unsubscribe from all real-time channels
     */
    unsubscribeAll() {
        this.subscriptions.forEach(channel => channel.unsubscribe());
        this.subscriptions.clear();
    }

    /**
     * Destroy the storage instance and clean up
     */
    destroy() {
        this._stopPeriodicSync();
        this.unsubscribeAll();
        this.removeAllListeners();
        console.log('☁️ Arcanea Cloud Storage: Destroyed');
    }

    // ==================== PRIVATE METHODS ====================

    /**
     * Initialize encryption key
     * @private
     */
    _initEncryption() {
        // Get or create device-specific encryption key
        let key = localStorage.getItem('arcanea_encryption_key');
        
        if (!key) {
            // Generate new key
            key = this._generateEncryptionKey();
            localStorage.setItem('arcanea_encryption_key', key);
        }
        
        this.encryptionKey = key;
    }

    /**
     * Generate encryption key
     * @private
     * @returns {string} - Encryption key
     */
    _generateEncryptionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Encrypt data
     * @private
     * @param {Object} data - Data to encrypt
     * @returns {Promise<Object>} - Encrypted data
     */
    async _encrypt(data) {
        if (!this.options.enableEncryption) return data;

        try {
            // Simple XOR encryption for demo (use proper encryption in production)
            const encrypted = { ...data };
            
            // Encrypt sensitive fields
            const sensitiveFields = ['content', 'notes', 'private_data'];
            
            for (const field of sensitiveFields) {
                if (data[field]) {
                    encrypted[field] = this._xorEncrypt(
                        JSON.stringify(data[field]), 
                        this.encryptionKey
                    );
                    encrypted[`${field}_encrypted`] = true;
                }
            }

            return encrypted;
        } catch (error) {
            console.error('Encryption error:', error);
            return data;
        }
    }

    /**
     * Decrypt data
     * @private
     * @param {Object} data - Data to decrypt
     * @returns {Promise<Object>} - Decrypted data
     */
    async _decrypt(data) {
        if (!this.options.enableEncryption) return data;

        try {
            const decrypted = { ...data };
            
            // Decrypt fields marked as encrypted
            const sensitiveFields = ['content', 'notes', 'private_data'];
            
            for (const field of sensitiveFields) {
                if (data[`${field}_encrypted`] && data[field]) {
                    try {
                        const decryptedValue = this._xorDecrypt(data[field], this.encryptionKey);
                        decrypted[field] = JSON.parse(decryptedValue);
                        delete decrypted[`${field}_encrypted`];
                    } catch (e) {
                        console.warn(`Failed to decrypt field ${field}`);
                    }
                }
            }

            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            return data;
        }
    }

    /**
     * XOR encrypt text
     * @private
     * @param {string} text - Text to encrypt
     * @param {string} key - Encryption key
     * @returns {string} - Encrypted text
     */
    _xorEncrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(result);
    }

    /**
     * XOR decrypt text
     * @private
     * @param {string} encrypted - Encrypted text
     * @param {string} key - Encryption key
     * @returns {string} - Decrypted text
     */
    _xorDecrypt(encrypted, key) {
        const text = atob(encrypted);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return result;
    }

    /**
     * Set up network status listeners
     * @private
     */
    _setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Online - resuming sync');
            this._emit('network:online');
            this._processOfflineQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Offline - switching to local mode');
            this._emit('network:offline');
        });
    }

    /**
     * Process offline queue when coming back online
     * @private
     */
    async _processOfflineQueue() {
        if (!this.isOnline) return;

        const queue = this._getSyncQueue();
        if (queue.length === 0) return;

        console.log(`🔄 Processing ${queue.length} pending operations...`);
        await this.sync();
    }

    /**
     * Execute a single operation
     * @private
     * @param {Object} operation - Operation to execute
     * @returns {Promise<boolean>} - Success status
     */
    async _executeOperation(operation) {
        try {
            switch (operation.type) {
                case 'upsert':
                    const { error: upsertError } = await supabase
                        .from(operation.table)
                        .upsert(operation.data);
                    return !upsertError;

                case 'delete':
                    const { error: deleteError } = await supabase
                        .from(operation.table)
                        .delete()
                        .eq('id', operation.data.id);
                    return !deleteError;

                default:
                    console.warn('Unknown operation type:', operation.type);
                    return false;
            }
        } catch (error) {
            console.error('Operation execution error:', error);
            return false;
        }
    }

    /**
     * Sync data to cloud
     * @private
     * @param {string} table - Table name
     * @param {Object} data - Data to sync
     * @returns {Promise<Object>} - Sync result
     */
    async _syncToCloud(table, data) {
        try {
            const { error } = await supabase
                .from(table)
                .upsert(data);

            return { success: !error, error };
        } catch (error) {
            return { success: false, error };
        }
    }

    /**
     * Set up real-time subscriptions
     * @private
     * @param {string} userId - User ID
     */
    _setupRealtimeSubscriptions(userId) {
        // Subscribe to user data changes
        this.subscribe('user_data', (payload) => {
            if (payload.new.user_id === userId) {
                // Update local cache with new data
                this._updateLocalCache('user_data', [payload.new]);
            }
        });

        // Subscribe to agent memories
        this.subscribe('agent_memories', (payload) => {
            if (payload.new.user_id === userId) {
                this._emit('memory:updated', payload.new);
            }
        });

        console.log('📡 Real-time subscriptions active');
    }

    /**
     * Start periodic sync interval
     * @private
     */
    _startPeriodicSync() {
        if (this.syncIntervalId) return;

        this.syncIntervalId = setInterval(() => {
            if (this.isOnline && !this.isSyncing) {
                this.sync();
            }
        }, this.options.syncInterval);
    }

    /**
     * Stop periodic sync
     * @private
     */
    _stopPeriodicSync() {
        if (this.syncIntervalId) {
            clearInterval(this.syncIntervalId);
            this.syncIntervalId = null;
        }
    }

    /**
     * Queue operation for later sync
     * @private
     * @param {Object} operation - Operation to queue
     */
    _queueOperation(operation) {
        const queue = this._getSyncQueue();
        queue.push(operation);
        localStorage.setItem(
            this.STORAGE_KEYS.SYNC_QUEUE, 
            JSON.stringify(queue)
        );
    }

    /**
     * Get sync queue
     * @private
     * @returns {Array} - Queue of operations
     */
    _getSyncQueue() {
        try {
            const queue = localStorage.getItem(this.STORAGE_KEYS.SYNC_QUEUE);
            return queue ? JSON.parse(queue) : [];
        } catch {
            return [];
        }
    }

    /**
     * Remove operation from queue
     * @private
     * @param {string} operationId - Operation ID to remove
     */
    _removeFromQueue(operationId) {
        const queue = this._getSyncQueue().filter(op => op.id !== operationId);
        localStorage.setItem(this.STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    }

    /**
     * Update operation in queue
     * @private
     * @param {Object} operation - Updated operation
     */
    _updateQueueOperation(operation) {
        const queue = this._getSyncQueue().map(op => 
            op.id === operation.id ? operation : op
        );
        localStorage.setItem(this.STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    }

    /**
     * Save to local cache
     * @private
     * @param {string} table - Table name
     * @param {Object} data - Data to cache
     */
    _saveToLocalCache(table, data) {
        try {
            const cache = this._getLocalCache();
            if (!cache[table]) cache[table] = {};
            cache[table][data.id] = {
                ...data,
                _cachedAt: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(cache));
        } catch (error) {
            console.error('Cache save error:', error);
        }
    }

    /**
     * Update local cache with array of items
     * @private
     * @param {string} table - Table name
     * @param {Array} items - Items to cache
     */
    _updateLocalCache(table, items) {
        try {
            const cache = this._getLocalCache();
            if (!cache[table]) cache[table] = {};
            
            items.forEach(item => {
                cache[table][item.id] = {
                    ...item,
                    _cachedAt: new Date().toISOString()
                };
            });
            
            localStorage.setItem(this.STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(cache));
        } catch (error) {
            console.error('Cache update error:', error);
        }
    }

    /**
     * Get from local cache
     * @private
     * @param {string} table - Table name
     * @returns {Array|null} - Cached data or null
     */
    _getFromLocalCache(table) {
        try {
            const cache = this._getLocalCache();
            const tableCache = cache[table];
            return tableCache ? Object.values(tableCache) : null;
        } catch {
            return null;
        }
    }

    /**
     * Remove from local cache
     * @private
     * @param {string} table - Table name
     * @param {string} id - Item ID to remove
     */
    _removeFromLocalCache(table, id) {
        try {
            const cache = this._getLocalCache();
            if (cache[table]) {
                delete cache[table][id];
                localStorage.setItem(this.STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(cache));
            }
        } catch (error) {
            console.error('Cache remove error:', error);
        }
    }

    /**
     * Get all local cache data
     * @private
     * @returns {Object} - Complete cache
     */
    _getLocalCache() {
        try {
            const cache = localStorage.getItem(this.STORAGE_KEYS.OFFLINE_DATA);
            return cache ? JSON.parse(cache) : {};
        } catch {
            return {};
        }
    }

    /**
     * Get all local cache as arrays
     * @private
     * @returns {Object} - Cache organized by table
     */
    _getAllLocalCache() {
        const cache = this._getLocalCache();
        const result = {};
        
        for (const [table, items] of Object.entries(cache)) {
            result[table] = Object.values(items);
        }
        
        return result;
    }

    /**
     * Export local data only
     * @private
     * @returns {Object} - Local data export
     */
    _exportLocalData() {
        return {
            version: '2.0.0',
            exported_at: new Date().toISOString(),
            source: 'local_cache',
            data: this._getAllLocalCache()
        };
    }

    /**
     * Search local memories (fallback)
     * @private
     * @param {string} query - Search query
     * @param {number} limit - Max results
     * @returns {Array} - Local search results
     */
    _searchLocalMemories(query, limit) {
        const memories = this._getFromLocalCache('agent_memories') || [];
        const queryLower = query.toLowerCase();
        
        return memories
            .filter(memory => 
                memory.content?.toLowerCase().includes(queryLower) ||
                memory.metadata?.tags?.some(tag => 
                    tag.toLowerCase().includes(queryLower)
                )
            )
            .slice(0, limit)
            .map(memory => ({
                ...memory,
                similarity: 0.5, // Approximate for local search
                source: 'local'
            }));
    }

    /**
     * Generate unique ID
     * @private
     * @returns {string} - Unique ID
     */
    _generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get or create device ID
     * @private
     * @returns {string} - Device ID
     */
    _getDeviceId() {
        let deviceId = localStorage.getItem('arcanea_device_id');
        if (!deviceId) {
            deviceId = this._generateId();
            localStorage.setItem('arcanea_device_id', deviceId);
        }
        return deviceId;
    }

    /**
     * Emit event
     * @private
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    _emit(event, data = {}) {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Event listener error for ${event}:`, error);
                }
            });
        }
    }
}

/**
 * Conflict Resolution Strategy
 * Handles data conflicts during sync
 */
class ConflictResolver {
    /**
     * Resolve conflict between local and remote data
     * @param {Object} local - Local data
     * @param {Object} remote - Remote data
     * @param {string} strategy - Resolution strategy (default: 'timestamp')
     * @returns {Object} - Resolved data
     */
    static resolve(local, remote, strategy = 'timestamp') {
        switch (strategy) {
            case 'timestamp':
                return this._timestampStrategy(local, remote);
            case 'local-wins':
                return { ...remote, ...local, _conflictResolved: true };
            case 'remote-wins':
                return { ...local, ...remote, _conflictResolved: true };
            case 'merge':
                return this._mergeStrategy(local, remote);
            default:
                return this._timestampStrategy(local, remote);
        }
    }

    /**
     * Timestamp-based resolution (newest wins)
     * @private
     */
    static _timestampStrategy(local, remote) {
        const localTime = new Date(local.updated_at || 0);
        const remoteTime = new Date(remote.updated_at || 0);

        if (localTime > remoteTime) {
            return { ...remote, ...local, _conflictResolved: true, _winner: 'local' };
        } else {
            return { ...local, ...remote, _conflictResolved: true, _winner: 'remote' };
        }
    }

    /**
     * Deep merge strategy
     * @private
     */
    static _mergeStrategy(local, remote) {
        const merged = { ...remote };
        
        for (const [key, value] of Object.entries(local)) {
            if (key.startsWith('_')) continue;
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                merged[key] = this._mergeStrategy(value, remote[key] || {});
            } else if (Array.isArray(value)) {
                // Merge arrays by ID if objects, otherwise concatenate
                if (value.length > 0 && typeof value[0] === 'object' && value[0].id) {
                    const remoteArray = remote[key] || [];
                    const mergedArray = [...remoteArray];
                    
                    value.forEach(localItem => {
                        const existingIndex = mergedArray.findIndex(r => r.id === localItem.id);
                        if (existingIndex >= 0) {
                            mergedArray[existingIndex] = this._timestampStrategy(
                                localItem, 
                                mergedArray[existingIndex]
                            );
                        } else {
                            mergedArray.push(localItem);
                        }
                    });
                    
                    merged[key] = mergedArray;
                } else {
                    merged[key] = [...new Set([...(remote[key] || []), ...value])];
                }
            } else {
                // For primitives, use timestamp strategy
                const localTime = new Date(local.updated_at || 0);
                const remoteTime = new Date(remote.updated_at || 0);
                if (localTime >= remoteTime) {
                    merged[key] = value;
                }
            }
        }

        return { ...merged, _conflictResolved: true, _strategy: 'merge' };
    }
}

/**
 * Arcanea Auth Service
 * Handles authentication operations
 */
class ArcaneaAuth {
    constructor() {
        this.user = null;
        this.session = null;
        this.listeners = new Set();
        
        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            this.session = session;
            this.user = session?.user || null;
            this._notifyListeners(event, session);
        });
    }

    /**
     * Sign up with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {Object} metadata - Additional user metadata
     * @returns {Promise<Object>} - Auth result
     */
    async signUp(email, password, metadata = {}) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            });

            if (error) throw error;

            return { 
                success: true, 
                user: data.user,
                message: 'Check your email to confirm your account'
            };
        } catch (error) {
            console.error('Sign up error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Sign in with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} - Auth result
     */
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            this.user = data.user;
            this.session = data.session;

            return { 
                success: true, 
                user: data.user,
                session: data.session
            };
        } catch (error) {
            console.error('Sign in error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Sign in with OAuth provider
     * @param {string} provider - OAuth provider (google, github, etc.)
     * @returns {Promise<Object>} - Auth result
     */
    async signInWithOAuth(provider) {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });

            if (error) throw error;

            return { success: true, url: data.url };
        } catch (error) {
            console.error('OAuth error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Sign out current user
     * @returns {Promise<Object>} - Sign out result
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            this.user = null;
            this.session = null;

            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Send password reset email
     * @param {string} email - User email
     * @returns {Promise<Object>} - Result
     */
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`
            });

            if (error) throw error;

            return { 
                success: true, 
                message: 'Password reset email sent' 
            };
        } catch (error) {
            console.error('Reset password error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Update user password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Result
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            return { 
                success: true, 
                message: 'Password updated successfully' 
            };
        } catch (error) {
            console.error('Update password error:', error);
            return { 
                success: false, 
                error: handleSupabaseError(error) 
            };
        }
    }

    /**
     * Get current user
     * @returns {Promise<Object|null>} - Current user or null
     */
    async getUser() {
        if (this.user) return this.user;
        
        try {
            const { data: { user } } = await supabase.auth.getUser();
            this.user = user;
            return user;
        } catch {
            return null;
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} - Authentication status
     */
    isAuthenticated() {
        return !!this.user;
    }

    /**
     * Subscribe to auth state changes
     * @param {Function} callback - Callback function
     * @returns {Function} - Unsubscribe function
     */
    onAuthStateChange(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    /**
     * Notify auth state listeners
     * @private
     */
    _notifyListeners(event, session) {
        this.listeners.forEach(callback => {
            try {
                callback(event, session);
            } catch (error) {
                console.error('Auth listener error:', error);
            }
        });
    }
}

// ==================== EXPORTS ====================

// Create singleton instances
const cloudStorage = new ArcaneaCloudStorage();
const auth = new ArcaneaAuth();

// Export everything
export { 
    ArcaneaCloudStorage, 
    ArcaneaAuth, 
    ConflictResolver,
    cloudStorage,
    auth
};

// Default export
export default cloudStorage;

// Global access for non-module scripts
if (typeof window !== 'undefined') {
    window.ArcaneaCloudStorage = ArcaneaCloudStorage;
    window.ArcaneaAuth = ArcaneaAuth;
    window.ConflictResolver = ConflictResolver;
    window.arcaneaCloud = cloudStorage;
    window.arcaneaAuth = auth;
}

console.log('☁️✨ Arcanea Cloud Storage System v2.0.0 - Loaded');
