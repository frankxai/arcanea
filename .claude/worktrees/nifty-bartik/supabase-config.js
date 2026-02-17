/**
 * Arcanea Supabase Configuration
 * Production-ready Supabase client with environment handling
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * Configuration manager for environment variables
     * Supports both .env files and runtime configuration
     */
    const ConfigManager = {
        // Default configuration (override in production)
        defaults: {
            SUPABASE_URL: '',
            SUPABASE_ANON_KEY: '',
            SUPABASE_SERVICE_KEY: '',
            DEBUG_MODE: false,
            SYNC_INTERVAL: 5000,
            OFFLINE_MODE_ENABLED: true,
            MAX_OFFLINE_QUEUE: 100,
            APP_NAME: 'Arcanea',
            APP_URL: window.location.origin,
            DEFAULT_THEME: 'dark'
        },

        /**
         * Load configuration from multiple sources
         * Priority: 1) Runtime config 2) LocalStorage 3) Defaults
         */
        load() {
            const config = { ...this.defaults };
            
            // Try to load from window.ARCANEA_CONFIG (runtime injection)
            if (global.ARCANEA_CONFIG) {
                Object.assign(config, global.ARCANEA_CONFIG);
                console.log('🔮 Config loaded from runtime injection');
            }
            
            // Try to load from localStorage (user preferences)
            try {
                const stored = localStorage.getItem('arcanea_config');
                if (stored) {
                    Object.assign(config, JSON.parse(stored));
                }
            } catch (e) {
                console.warn('⚠️ Failed to load config from localStorage:', e.message);
            }
            
            // Validate required fields
            if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
                console.warn('⚠️ Supabase credentials not configured. Set ARCANEA_CONFIG before loading.');
                console.warn('   Example: window.ARCANEA_CONFIG = { SUPABASE_URL: "...", SUPABASE_ANON_KEY: "..." }');
            }
            
            return config;
        },

        /**
         * Save configuration to localStorage
         */
        save(key, value) {
            try {
                const stored = localStorage.getItem('arcanea_config');
                const config = stored ? JSON.parse(stored) : {};
                config[key] = value;
                localStorage.setItem('arcanea_config', JSON.stringify(config));
                return true;
            } catch (e) {
                console.error('❌ Failed to save config:', e.message);
                return false;
            }
        },

        /**
         * Get a specific configuration value
         */
        get(key, defaultValue = null) {
            const config = this.load();
            return config[key] !== undefined ? config[key] : defaultValue;
        }
    };

    /**
     * Supabase client wrapper with enhanced error handling
     */
    const SupabaseClient = {
        client: null,
        config: null,
        connectionState: 'disconnected',
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,
        reconnectDelay: 1000,

        /**
         * Initialize the Supabase client
         */
        async initialize() {
            this.config = ConfigManager.load();
            
            // Check if Supabase library is loaded
            if (typeof supabase === 'undefined' && typeof global.supabase === 'undefined') {
                console.error('❌ Supabase library not loaded. Include: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0');
                this.connectionState = 'error';
                return false;
            }
            
            // Get the supabase constructor
            const { createClient } = global.supabase || supabase;
            
            if (!createClient) {
                console.error('❌ Supabase createClient not available');
                this.connectionState = 'error';
                return false;
            }
            
            // Validate credentials
            if (!this.config.SUPABASE_URL || !this.config.SUPABASE_ANON_KEY) {
                console.error('❌ Supabase credentials missing');
                this.connectionState = 'error';
                return false;
            }
            
            try {
                // Create client with enhanced options
                this.client = createClient(
                    this.config.SUPABASE_URL,
                    this.config.SUPABASE_ANON_KEY,
                    {
                        auth: {
                            autoRefreshToken: true,
                            persistSession: true,
                            detectSessionInUrl: true,
                            storage: localStorage,
                            storageKey: 'arcanea_supabase_auth'
                        },
                        realtime: {
                            params: {
                                eventsPerSecond: 10
                            }
                        },
                        global: {
                            headers: {
                                'X-Client-Info': 'arcanea-ecosystem@3.0.0'
                            }
                        },
                        db: {
                            schema: 'public'
                        }
                    }
                );
                
                this.connectionState = 'connected';
                this.reconnectAttempts = 0;
                
                // Setup connection monitoring
                this._setupConnectionMonitoring();
                
                console.log('✅ Supabase client initialized');
                return true;
                
            } catch (error) {
                console.error('❌ Failed to initialize Supabase client:', error.message);
                this.connectionState = 'error';
                return false;
            }
        },

        /**
         * Setup connection monitoring and reconnection logic
         */
        _setupConnectionMonitoring() {
            // Monitor auth state changes
            this.client.auth.onAuthStateChange((event, session) => {
                console.log(`🔐 Auth state changed: ${event}`);
                
                // Broadcast to other windows/tabs
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                    this._broadcastAuthEvent(event, session);
                }
            });
            
            // Monitor online/offline status
            window.addEventListener('online', () => {
                console.log('🌐 Back online');
                this.connectionState = 'connected';
                this._triggerSync();
            });
            
            window.addEventListener('offline', () => {
                console.log('📴 Offline mode');
                this.connectionState = 'offline';
            });
        },

        /**
         * Broadcast auth events to other windows/tabs
         */
        _broadcastAuthEvent(event, session) {
            try {
                localStorage.setItem('arcanea_auth_event', JSON.stringify({
                    event,
                    timestamp: Date.now(),
                    userId: session?.user?.id
                }));
            } catch (e) {
                console.warn('Failed to broadcast auth event:', e);
            }
        },

        /**
         * Trigger sync when coming back online
         */
        _triggerSync() {
            // Dispatch custom event for sync engine
            window.dispatchEvent(new CustomEvent('arcanea:sync:trigger'));
        },

        /**
         * Get the Supabase client instance
         */
        getClient() {
            if (!this.client) {
                throw new Error('Supabase client not initialized. Call initialize() first.');
            }
            return this.client;
        },

        /**
         * Check if client is ready
         */
        isReady() {
            return this.client !== null && this.connectionState === 'connected';
        },

        /**
         * Get current connection state
         */
        getConnectionState() {
            return this.connectionState;
        },

        /**
         * Test database connection
         */
        async testConnection() {
            if (!this.isReady()) {
                return { success: false, error: 'Client not initialized' };
            }
            
            try {
                const { data, error } = await this.client
                    .from('profiles')
                    .select('count')
                    .limit(1);
                
                if (error) throw error;
                
                return { success: true, latency: Date.now() };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        /**
         * Retry connection with exponential backoff
         */
        async retryConnection() {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.error('❌ Max reconnection attempts reached');
                return false;
            }
            
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
            
            console.log(`🔄 Retrying connection in ${delay}ms (attempt ${this.reconnectAttempts})`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
            return await this.initialize();
        }
    };

    /**
     * Database operations helper
     */
    const Database = {
        /**
         * Get the Supabase client
         */
        get client() {
            return SupabaseClient.getClient();
        },

        /**
         * Select data from a table
         */
        async select(table, options = {}) {
            const {
                columns = '*',
                filters = {},
                order = null,
                limit = null,
                single = false
            } = options;
            
            let query = this.client.from(table).select(columns);
            
            // Apply filters
            Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    query = query.in(key, value);
                } else if (typeof value === 'object' && value.op) {
                    // Custom operators: { op: 'gt', value: 100 }
                    switch (value.op) {
                        case 'gt': query = query.gt(key, value.value); break;
                        case 'gte': query = query.gte(key, value.value); break;
                        case 'lt': query = query.lt(key, value.value); break;
                        case 'lte': query = query.lte(key, value.value); break;
                        case 'like': query = query.like(key, value.value); break;
                        case 'ilike': query = query.ilike(key, value.value); break;
                    }
                } else {
                    query = query.eq(key, value);
                }
            });
            
            // Apply ordering
            if (order) {
                const [column, direction = 'asc'] = order.split(':');
                query = query.order(column, { ascending: direction === 'asc' });
            }
            
            // Apply limit
            if (limit) {
                query = query.limit(limit);
            }
            
            // Single result
            if (single) {
                query = query.single();
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            return data;
        },

        /**
         * Insert data into a table
         */
        async insert(table, data, options = {}) {
            const { returning = 'minimal', onConflict = null } = options;
            
            let query = this.client.from(table).insert(data);
            
            if (onConflict) {
                query = query.onConflict(onConflict);
            }
            
            const { data: result, error } = await query.select(returning);
            
            if (error) throw error;
            return result;
        },

        /**
         * Update data in a table
         */
        async update(table, data, filters = {}) {
            let query = this.client.from(table).update(data);
            
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            
            const { data: result, error } = await query.select();
            
            if (error) throw error;
            return result;
        },

        /**
         * Upsert data (insert or update)
         */
        async upsert(table, data, options = {}) {
            const { onConflict = 'id', returning = 'representation' } = options;
            
            const { data: result, error } = await this.client
                .from(table)
                .upsert(data, { onConflict })
                .select(returning);
            
            if (error) throw error;
            return result;
        },

        /**
         * Delete data from a table
         */
        async delete(table, filters = {}) {
            let query = this.client.from(table).delete();
            
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            
            const { data, error } = await query.select();
            
            if (error) throw error;
            return data;
        },

        /**
         * Subscribe to real-time changes
         */
        subscribe(table, callback, options = {}) {
            const { event = '*', filters = {} } = options;
            
            const channel = this.client
                .channel(`public:${table}`)
                .on('postgres_changes', {
                    event,
                    schema: 'public',
                    table,
                    ...filters
                }, (payload) => {
                    callback(payload);
                })
                .subscribe();
            
            return channel;
        },

        /**
         * Unsubscribe from a channel
         */
        async unsubscribe(channel) {
            await this.client.removeChannel(channel);
        },

        /**
         * Execute a stored function (RPC)
         */
        async rpc(functionName, params = {}) {
            const { data, error } = await this.client.rpc(functionName, params);
            
            if (error) throw error;
            return data;
        }
    };

    /**
     * Storage operations helper
     */
    const Storage = {
        /**
         * Get the Supabase client
         */
        get client() {
            return SupabaseClient.getClient();
        },

        /**
         * Upload a file to storage
         */
        async upload(bucket, path, file, options = {}) {
            const { cacheControl = '3600', upsert = false } = options;
            
            const { data, error } = await this.client.storage
                .from(bucket)
                .upload(path, file, {
                    cacheControl,
                    upsert
                });
            
            if (error) throw error;
            return data;
        },

        /**
         * Download a file from storage
         */
        async download(bucket, path) {
            const { data, error } = await this.client.storage
                .from(bucket)
                .download(path);
            
            if (error) throw error;
            return data;
        },

        /**
         * Get public URL for a file
         */
        getPublicUrl(bucket, path) {
            const { data } = this.client.storage
                .from(bucket)
                .getPublicUrl(path);
            
            return data.publicUrl;
        },

        /**
         * Delete a file from storage
         */
        async delete(bucket, paths) {
            const pathsArray = Array.isArray(paths) ? paths : [paths];
            
            const { data, error } = await this.client.storage
                .from(bucket)
                .remove(pathsArray);
            
            if (error) throw error;
            return data;
        },

        /**
         * List files in a bucket
         */
        async list(bucket, path = '', options = {}) {
            const { limit = 100, offset = 0, search = '' } = options;
            
            const { data, error } = await this.client.storage
                .from(bucket)
                .list(path, {
                    limit,
                    offset,
                    search
                });
            
            if (error) throw error;
            return data;
        }
    };

    // Export to global scope
    global.ArcaneaSupabase = {
        ConfigManager,
        Client: SupabaseClient,
        Database,
        Storage,
        version: '3.0.0'
    };

    // Auto-initialize if config is available
    if (global.ARCANEA_CONFIG && global.ARCANEA_CONFIG.SUPABASE_URL) {
        SupabaseClient.initialize().then(success => {
            if (success) {
                console.log('✅ Arcanea Supabase auto-initialized');
            }
        });
    }

})(window);
