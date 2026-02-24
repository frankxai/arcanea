/**
 * Arcanea Authentication System
 * Complete auth with email/password, OAuth, session management
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * Authentication state management
     */
    const AuthState = {
        currentUser: null,
        session: null,
        listeners: [],

        /**
         * Set current user and notify listeners
         */
        setUser(user, session) {
            this.currentUser = user;
            this.session = session;
            this._notifyListeners('user_changed', { user, session });
        },

        /**
         * Get current user
         */
        getUser() {
            return this.currentUser;
        },

        /**
         * Check if user is authenticated
         */
        isAuthenticated() {
            return this.currentUser !== null && this.session !== null;
        },

        /**
         * Add state change listener
         */
        onChange(callback) {
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
        _notifyListeners(event, data) {
            this.listeners.forEach(callback => {
                try {
                    callback(event, data);
                } catch (e) {
                    console.error('Auth listener error:', e);
                }
            });
        }
    };

    /**
     * Main Authentication Manager
     */
    const ArcaneaAuth = {
        client: null,
        initialized: false,

        /**
         * Initialize authentication system
         */
        async initialize() {
            if (this.initialized) return true;
            
            // Check if Supabase client is available
            if (!global.ArcaneaSupabase || !global.ArcaneaSupabase.Client) {
                console.error('❌ ArcaneaSupabase not loaded. Load supabase-config.js first.');
                return false;
            }
            
            // Wait for Supabase client to be ready
            if (!global.ArcaneaSupabase.Client.isReady()) {
                const success = await global.ArcaneaSupabase.Client.initialize();
                if (!success) {
                    console.error('❌ Failed to initialize Supabase client');
                    return false;
                }
            }
            
            this.client = global.ArcaneaSupabase.Client.getClient();
            
            // Setup auth state listener
            this._setupAuthListener();
            
            // Check for existing session
            await this._restoreSession();
            
            // Listen for auth events from other tabs
            this._setupCrossTabSync();
            
            this.initialized = true;
            console.log('✅ Arcanea Auth initialized');
            return true;
        },

        /**
         * Setup auth state change listener
         */
        _setupAuthListener() {
            this.client.auth.onAuthStateChange(async (event, session) => {
                console.log(`🔐 Auth event: ${event}`);
                
                switch (event) {
                    case 'SIGNED_IN':
                        AuthState.setUser(session?.user || null, session);
                        await this._onSignIn(session);
                        break;
                        
                    case 'SIGNED_OUT':
                        AuthState.setUser(null, null);
                        await this._onSignOut();
                        break;
                        
                    case 'USER_UPDATED':
                        AuthState.setUser(session?.user || null, session);
                        break;
                        
                    case 'TOKEN_REFRESHED':
                        AuthState.setUser(session?.user || null, session);
                        console.log('🔄 Token refreshed');
                        break;
                        
                    case 'PASSWORD_RECOVERY':
                        console.log('🔑 Password recovery initiated');
                        break;
                }
            });
        },

        /**
         * Restore existing session on load
         */
        async _restoreSession() {
            try {
                const { data: { session }, error } = await this.client.auth.getSession();
                
                if (error) throw error;
                
                if (session) {
                    AuthState.setUser(session.user, session);
                    console.log('✅ Session restored for:', session.user.email);
                    
                    // Load user profile
                    await this._loadUserProfile(session.user.id);
                }
            } catch (error) {
                console.warn('⚠️ Failed to restore session:', error.message);
            }
        },

        /**
         * Load user profile from database
         */
        async _loadUserProfile(userId) {
            try {
                const { data, error } = await this.client
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();
                
                if (error && error.code !== 'PGRST116') throw error;
                
                if (data) {
                    // Merge profile with user
                    AuthState.currentUser = {
                        ...AuthState.currentUser,
                        profile: data
                    };
                    console.log('✅ User profile loaded');
                } else {
                    // Create profile if it doesn't exist
                    await this._createUserProfile(userId);
                }
            } catch (error) {
                console.warn('⚠️ Failed to load user profile:', error.message);
            }
        },

        /**
         * Create user profile on first sign in
         */
        async _createUserProfile(userId) {
            try {
                const { data: { user } } = await this.client.auth.getUser();
                
                const profile = {
                    id: userId,
                    email: user.email,
                    username: user.email.split('@')[0],
                    display_name: user.user_metadata?.full_name || user.email.split('@')[0],
                    avatar_url: user.user_metadata?.avatar_url || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    last_sign_in: new Date().toISOString()
                };
                
                const { error } = await this.client
                    .from('profiles')
                    .insert(profile);
                
                if (error) throw error;
                
                // Initialize game state
                await this._initializeGameState(userId);
                
                console.log('✅ User profile created');
            } catch (error) {
                console.error('❌ Failed to create user profile:', error.message);
            }
        },

        /**
         * Initialize default game state for new user
         */
        async _initializeGameState(userId) {
            try {
                const defaultGameState = {
                    user_id: userId,
                    level: 1,
                    xp: 0,
                    total_xp: 0,
                    agents_summoned: 0,
                    skills_mastered: 0,
                    completed_challenges: 0,
                    manifestations: 0,
                    joined_date: new Date().toISOString(),
                    last_sync: new Date().toISOString()
                };
                
                const { error } = await this.client
                    .from('game_state')
                    .insert(defaultGameState);
                
                if (error) throw error;
                
                // Initialize default agents
                await this._initializeDefaultAgents(userId);
                
                // Initialize default skills
                await this._initializeDefaultSkills(userId);
                
                console.log('✅ Game state initialized');
            } catch (error) {
                console.error('❌ Failed to initialize game state:', error.message);
            }
        },

        /**
         * Initialize default agents for new user
         */
        async _initializeDefaultAgents(userId) {
            const defaultAgents = [
                { id: 'dragon-forge', name: 'Dragon-Forge', element: 'fire', icon: '🐉', summoned: false, bonded: false },
                { id: 'phoenix-artisan', name: 'Phoenix-Artisan', element: 'fire', icon: '🔥', summoned: false, bonded: false },
                { id: 'volcano-sculptor', name: 'Volcano-Sculptor', element: 'fire', icon: '🌋', summoned: false, bonded: false },
                { id: 'sun-weaver', name: 'Sun-Weaver', element: 'fire', icon: '☀️', summoned: false, bonded: false },
                { id: 'catalyst-architect', name: 'Catalyst-Architect', element: 'fire', icon: '⚡', summoned: false, bonded: false },
                { id: 'river-story', name: 'River-Story', element: 'water', icon: '🌊', summoned: false, bonded: false },
                { id: 'ocean-memory', name: 'Ocean-Memory', element: 'water', icon: '🌊', summoned: false, bonded: false },
                { id: 'rain-singer', name: 'Rain-Singer', element: 'water', icon: '🌧️', summoned: false, bonded: false },
                { id: 'mist-weaver', name: 'Mist-Weaver', element: 'water', icon: '💨', summoned: false, bonded: false },
                { id: 'crystal-arch', name: 'Crystal-Arch', element: 'earth', icon: '💎', summoned: false, bonded: false },
                { id: 'mountain-builder', name: 'Mountain-Builder', element: 'earth', icon: '⛰️', summoned: false, bonded: false },
                { id: 'void-gazer', name: 'Void-Gazer', element: 'void', icon: '👁️', summoned: false, bonded: false }
            ];
            
            const agents = defaultAgents.map(agent => ({
                user_id: userId,
                agent_id: agent.id,
                name: agent.name,
                element: agent.element,
                icon: agent.icon,
                summoned: agent.summoned,
                bonded: agent.bonded,
                bond_level: 0,
                created_at: new Date().toISOString()
            }));
            
            const { error } = await this.client.from('agents').insert(agents);
            if (error) console.warn('Failed to create default agents:', error.message);
        },

        /**
         * Initialize default skills for new user
         */
        async _initializeDefaultSkills(userId) {
            const defaultSkills = [
                { id: 'ignite', name: 'Ignition.Spark', element: 'fire', icon: '🔥' },
                { id: 'flow', name: 'Flow.Channel', element: 'water', icon: '🌊' },
                { id: 'foundation', name: 'Foundation.Stone', element: 'earth', icon: '🗿' },
                { id: 'whisper', name: 'Whisper.Messenger', element: 'wind', icon: '💨' },
                { id: 'void', name: 'Void.Gazer', element: 'void', icon: '👁️' }
            ];
            
            const skills = defaultSkills.map(skill => ({
                user_id: userId,
                skill_id: skill.id,
                name: skill.name,
                element: skill.element,
                level: 1,
                xp: 0,
                max_xp: 1000,
                icon: skill.icon,
                unlocked: true,
                created_at: new Date().toISOString()
            }));
            
            const { error } = await this.client.from('skills').insert(skills);
            if (error) console.warn('Failed to create default skills:', error.message);
        },

        /**
         * Handle post-signin actions
         */
        async _onSignIn(session) {
            // Update last sign in
            try {
                await this.client
                    .from('profiles')
                    .update({ last_sign_in: new Date().toISOString() })
                    .eq('id', session.user.id);
            } catch (e) {
                console.warn('Failed to update last sign in:', e);
            }
            
            // Trigger sync
            window.dispatchEvent(new CustomEvent('arcanea:auth:signedin', {
                detail: { user: session.user }
            }));
        },

        /**
         * Handle post-signout actions
         */
        async _onSignOut() {
            // Clear local data
            localStorage.removeItem('arcanea_auth_event');
            
            // Trigger event
            window.dispatchEvent(new CustomEvent('arcanea:auth:signedout'));
        },

        /**
         * Setup cross-tab synchronization
         */
        _setupCrossTabSync() {
            window.addEventListener('storage', (e) => {
                if (e.key === 'arcanea_auth_event') {
                    try {
                        const event = JSON.parse(e.newValue);
                        if (event.event === 'SIGNED_OUT') {
                            // Sign out in this tab too
                            this.signOut();
                        }
                    } catch (err) {
                        console.warn('Cross-tab sync error:', err);
                    }
                }
            });
        },

        // ==================== AUTH METHODS ====================

        /**
         * Sign up with email and password
         */
        async signUp(email, password, options = {}) {
            try {
                const { data, error } = await this.client.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: options.fullName || email.split('@')[0],
                            ...options.metadata
                        },
                        emailRedirectTo: options.redirectTo || window.location.origin
                    }
                });
                
                if (error) throw error;
                
                return {
                    success: true,
                    user: data.user,
                    session: data.session,
                    message: data.user?.identities?.length === 0 
                        ? 'Email already registered. Please sign in.'
                        : 'Check your email to confirm your account.'
                };
            } catch (error) {
                console.error('Sign up error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Sign in with email and password
         */
        async signIn(email, password) {
            try {
                const { data, error } = await this.client.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) throw error;
                
                return {
                    success: true,
                    user: data.user,
                    session: data.session
                };
            } catch (error) {
                console.error('Sign in error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Sign in with OAuth provider
         */
        async signInWithOAuth(provider, options = {}) {
            const validProviders = ['google', 'github', 'discord', 'twitter'];
            
            if (!validProviders.includes(provider)) {
                return {
                    success: false,
                    error: `Invalid provider. Choose from: ${validProviders.join(', ')}`
                };
            }
            
            try {
                const { data, error } = await this.client.auth.signInWithOAuth({
                    provider,
                    options: {
                        redirectTo: options.redirectTo || window.location.origin,
                        scopes: options.scopes || ''
                    }
                });
                
                if (error) throw error;
                
                return {
                    success: true,
                    url: data.url
                };
            } catch (error) {
                console.error('OAuth error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Sign out current user
         */
        async signOut() {
            try {
                const { error } = await this.client.auth.signOut();
                
                if (error) throw error;
                
                return { success: true };
            } catch (error) {
                console.error('Sign out error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Send password reset email
         */
        async resetPassword(email) {
            try {
                const { error } = await this.client.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/auth/reset-password`
                });
                
                if (error) throw error;
                
                return {
                    success: true,
                    message: 'Password reset email sent. Check your inbox.'
                };
            } catch (error) {
                console.error('Reset password error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Update user password
         */
        async updatePassword(newPassword) {
            try {
                const { error } = await this.client.auth.updateUser({
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
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Update user metadata
         */
        async updateUser(metadata) {
            try {
                const { data, error } = await this.client.auth.updateUser({
                    data: metadata
                });
                
                if (error) throw error;
                
                // Update profile in database
                await this.client
                    .from('profiles')
                    .update({
                        display_name: metadata.full_name,
                        avatar_url: metadata.avatar_url,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', data.user.id);
                
                return {
                    success: true,
                    user: data.user
                };
            } catch (error) {
                console.error('Update user error:', error);
                return {
                    success: false,
                    error: this._formatError(error)
                };
            }
        },

        /**
         * Get current session
         */
        async getSession() {
            try {
                const { data: { session }, error } = await this.client.auth.getSession();
                
                if (error) throw error;
                
                return {
                    success: true,
                    session
                };
            } catch (error) {
                return {
                    success: false,
                    error: error.message
                };
            }
        },

        /**
         * Get current user
         */
        getUser() {
            return AuthState.getUser();
        },

        /**
         * Check if user is authenticated
         */
        isAuthenticated() {
            return AuthState.isAuthenticated();
        },

        /**
         * Listen for auth state changes
         */
        onAuthStateChange(callback) {
            return AuthState.onChange(callback);
        },

        /**
         * Format error messages for user display
         */
        _formatError(error) {
            const errorMessages = {
                'auth/invalid-email': 'Invalid email address format',
                'auth/user-disabled': 'This account has been disabled',
                'auth/user-not-found': 'No account found with this email',
                'auth/wrong-password': 'Incorrect password',
                'auth/email-already-in-use': 'An account already exists with this email',
                'auth/weak-password': 'Password should be at least 6 characters',
                'auth/invalid-credentials': 'Invalid email or password',
                'auth/popup-closed-by-user': 'Sign in was cancelled',
                'auth/popup-blocked': 'Pop-up was blocked by the browser',
                'auth/unauthorized-domain': 'This domain is not authorized',
                'auth/too-many-requests': 'Too many attempts. Please try again later',
                'auth/network-request-failed': 'Network error. Check your connection'
            };
            
            const code = error.code || error.message;
            return errorMessages[code] || error.message || 'An unexpected error occurred';
        }
    };

    /**
     * Protected route helper
     */
    const RouteGuard = {
        /**
         * Check if route requires authentication
         */
        requireAuth(redirectTo = '/auth/login') {
            if (!ArcaneaAuth.isAuthenticated()) {
                // Store intended destination
                sessionStorage.setItem('auth_redirect', window.location.pathname);
                
                // Redirect to login
                window.location.href = redirectTo;
                return false;
            }
            return true;
        },

        /**
         * Check if user has required role
         */
        requireRole(roles, redirectTo = '/') {
            const user = ArcaneaAuth.getUser();
            
            if (!user) {
                window.location.href = redirectTo;
                return false;
            }
            
            const userRole = user.profile?.role || 'user';
            
            if (!roles.includes(userRole)) {
                console.warn(`Access denied. Required roles: ${roles.join(', ')}`);
                window.location.href = redirectTo;
                return false;
            }
            
            return true;
        },

        /**
         * Redirect authenticated users away from auth pages
         */
        redirectIfAuthenticated(redirectTo = '/') {
            if (ArcaneaAuth.isAuthenticated()) {
                window.location.href = redirectTo;
                return true;
            }
            return false;
        }
    };

    // Export to global scope
    global.ArcaneaAuth = ArcaneaAuth;
    global.ArcaneaAuthState = AuthState;
    global.ArcaneaRouteGuard = RouteGuard;

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        ArcaneaAuth.initialize();
    });

})(window);
