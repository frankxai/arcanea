/**
 * Arcanea Authentication UI Components
 * Complete auth interface with forms, modals, and validation
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * Auth UI Component Manager
     */
    const AuthUI = {
        modal: null,
        currentView: 'login',
        isOpen: false,

        /**
         * Initialize Auth UI
         */
        initialize() {
            this._injectStyles();
            this._createModal();
            this._bindEvents();
            console.log('✅ Auth UI initialized');
        },

        /**
         * Inject required CSS styles
         */
        _injectStyles() {
            if (document.getElementById('arcanea-auth-styles')) return;

            const styles = `
                <style id="arcanea-auth-styles">
                    /* Auth Modal Overlay */
                    .arcanea-auth-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(10, 10, 15, 0.95);
                        backdrop-filter: blur(10px);
                        z-index: 10000;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        animation: fadeIn 0.3s ease;
                    }

                    .arcanea-auth-overlay.active {
                        display: flex;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    /* Auth Modal Container */
                    .arcanea-auth-modal {
                        background: linear-gradient(135deg, #1a1a28 0%, #12121a 100%);
                        border: 1px solid rgba(255, 215, 0, 0.3);
                        border-radius: 20px;
                        padding: 2.5rem;
                        width: 90%;
                        max-width: 420px;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
                                    0 0 100px rgba(255, 107, 53, 0.1);
                        position: relative;
                        animation: slideUp 0.4s ease;
                    }

                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    /* Close Button */
                    .arcanea-auth-close {
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: none;
                        border: none;
                        color: #a0a0b0;
                        font-size: 1.5rem;
                        cursor: pointer;
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        transition: all 0.2s;
                    }

                    .arcanea-auth-close:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: #fff;
                    }

                    /* Header */
                    .arcanea-auth-header {
                        text-align: center;
                        margin-bottom: 2rem;
                    }

                    .arcanea-auth-logo {
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #ff6b35, #ffd700);
                        border-radius: 50%;
                        margin: 0 auto 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                        box-shadow: 0 0 30px rgba(255, 107, 53, 0.4);
                    }

                    .arcanea-auth-title {
                        font-family: 'Cinzel', serif;
                        font-size: 1.5rem;
                        color: #fff;
                        margin-bottom: 0.5rem;
                    }

                    .arcanea-auth-subtitle {
                        color: #a0a0b0;
                        font-size: 0.9rem;
                    }

                    /* Form Elements */
                    .arcanea-auth-form {
                        display: flex;
                        flex-direction: column;
                        gap: 1.25rem;
                    }

                    .arcanea-form-group {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .arcanea-form-label {
                        color: #d0d0e0;
                        font-size: 0.85rem;
                        font-weight: 500;
                    }

                    .arcanea-form-input {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                        padding: 0.875rem 1rem;
                        color: #fff;
                        font-size: 1rem;
                        transition: all 0.2s;
                        outline: none;
                    }

                    .arcanea-form-input:focus {
                        border-color: #ff6b35;
                        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
                    }

                    .arcanea-form-input::placeholder {
                        color: #606070;
                    }

                    .arcanea-form-input.error {
                        border-color: #ff4444;
                        box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2);
                    }

                    /* Password Input with Toggle */
                    .arcanea-password-wrapper {
                        position: relative;
                    }

                    .arcanea-password-toggle {
                        position: absolute;
                        right: 12px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #606070;
                        cursor: pointer;
                        padding: 4px;
                        font-size: 1.1rem;
                    }

                    .arcanea-password-toggle:hover {
                        color: #a0a0b0;
                    }

                    /* Error Message */
                    .arcanea-auth-error {
                        background: rgba(255, 68, 68, 0.1);
                        border: 1px solid rgba(255, 68, 68, 0.3);
                        border-radius: 8px;
                        padding: 0.75rem 1rem;
                        color: #ff8888;
                        font-size: 0.85rem;
                        display: none;
                        animation: shake 0.4s ease;
                    }

                    .arcanea-auth-error.show {
                        display: block;
                    }

                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }

                    /* Success Message */
                    .arcanea-auth-success {
                        background: rgba(76, 175, 80, 0.1);
                        border: 1px solid rgba(76, 175, 80, 0.3);
                        border-radius: 8px;
                        padding: 0.75rem 1rem;
                        color: #81c784;
                        font-size: 0.85rem;
                        display: none;
                    }

                    .arcanea-auth-success.show {
                        display: block;
                    }

                    /* Submit Button */
                    .arcanea-auth-submit {
                        background: linear-gradient(135deg, #ff6b35 0%, #ff8f00 100%);
                        border: none;
                        border-radius: 10px;
                        padding: 1rem;
                        color: #fff;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        position: relative;
                        overflow: hidden;
                    }

                    .arcanea-auth-submit:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
                    }

                    .arcanea-auth-submit:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                        transform: none;
                    }

                    /* Loading Spinner */
                    .arcanea-auth-spinner {
                        display: none;
                        width: 20px;
                        height: 20px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-top-color: #fff;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                        margin: 0 auto;
                    }

                    .arcanea-auth-submit.loading .arcanea-auth-spinner {
                        display: block;
                    }

                    .arcanea-auth-submit.loading .btn-text {
                        display: none;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }

                    /* OAuth Buttons */
                    .arcanea-auth-divider {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin: 1.5rem 0;
                        color: #606070;
                        font-size: 0.8rem;
                    }

                    .arcanea-auth-divider::before,
                    .arcanea-auth-divider::after {
                        content: '';
                        flex: 1;
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                    }

                    .arcanea-oauth-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0.75rem;
                    }

                    .arcanea-oauth-btn {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        padding: 0.75rem;
                        color: #fff;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    }

                    .arcanea-oauth-btn:hover {
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(255, 255, 255, 0.2);
                    }

                    /* Footer Links */
                    .arcanea-auth-footer {
                        text-align: center;
                        margin-top: 1.5rem;
                        padding-top: 1.5rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .arcanea-auth-link {
                        color: #ff6b35;
                        text-decoration: none;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: color 0.2s;
                    }

                    .arcanea-auth-link:hover {
                        color: #ff8f00;
                        text-decoration: underline;
                    }

                    .arcanea-auth-text {
                        color: #606070;
                        font-size: 0.9rem;
                    }

                    /* User Menu (when logged in) */
                    .arcanea-user-menu {
                        position: relative;
                    }

                    .arcanea-user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #ff6b35, #ffd700);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 1.2rem;
                        transition: transform 0.2s;
                    }

                    .arcanea-user-avatar:hover {
                        transform: scale(1.1);
                    }

                    .arcanea-user-dropdown {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        margin-top: 0.5rem;
                        background: #1a1a28;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        padding: 0.5rem;
                        min-width: 200px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                        display: none;
                        z-index: 10001;
                    }

                    .arcanea-user-dropdown.show {
                        display: block;
                        animation: fadeIn 0.2s ease;
                    }

                    .arcanea-user-item {
                        padding: 0.75rem 1rem;
                        color: #d0d0e0;
                        cursor: pointer;
                        border-radius: 8px;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }

                    .arcanea-user-item:hover {
                        background: rgba(255, 255, 255, 0.05);
                        color: #fff;
                    }

                    .arcanea-user-item.danger {
                        color: #ff6666;
                    }

                    .arcanea-user-item.danger:hover {
                        background: rgba(255, 68, 68, 0.1);
                    }

                    /* Responsive */
                    @media (max-width: 480px) {
                        .arcanea-auth-modal {
                            padding: 1.5rem;
                            width: 95%;
                        }

                        .arcanea-oauth-buttons {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', styles);
        },

        /**
         * Create modal HTML structure
         */
        _createModal() {
            const modalHTML = `
                <div id="arcanea-auth-overlay" class="arcanea-auth-overlay">
                    <div class="arcanea-auth-modal">
                        <button class="arcanea-auth-close" onclick="AuthUI.close()">&times;</button>
                        
                        <div class="arcanea-auth-header">
                            <div class="arcanea-auth-logo">⚡</div>
                            <h2 class="arcanea-auth-title">Welcome to Arcanea</h2>
                            <p class="arcanea-auth-subtitle">Enter the realm of infinite possibility</p>
                        </div>

                        <div id="arcanea-auth-error" class="arcanea-auth-error"></div>
                        <div id="arcanea-auth-success" class="arcanea-auth-success"></div>

                        <!-- Login Form -->
                        <form id="arcanea-login-form" class="arcanea-auth-form" style="display: none;">
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Email</label>
                                <input type="email" id="login-email" class="arcanea-form-input" placeholder="your@email.com" required>
                            </div>
                            
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Password</label>
                                <div class="arcanea-password-wrapper">
                                    <input type="password" id="login-password" class="arcanea-form-input" placeholder="Enter your password" required>
                                    <button type="button" class="arcanea-password-toggle" onclick="AuthUI.togglePassword('login-password')">👁️</button>
                                </div>
                            </div>

                            <button type="submit" class="arcanea-auth-submit">
                                <span class="btn-text">Sign In</span>
                                <div class="arcanea-auth-spinner"></div>
                            </button>

                            <div class="arcanea-auth-divider">or continue with</div>

                            <div class="arcanea-oauth-buttons">
                                <button type="button" class="arcanea-oauth-btn" onclick="AuthUI.signInWithOAuth('google')">
                                    <span>🔍</span> Google
                                </button>
                                <button type="button" class="arcanea-oauth-btn" onclick="AuthUI.signInWithOAuth('github')">
                                    <span>🐙</span> GitHub
                                </button>
                            </div>

                            <div class="arcanea-auth-footer">
                                <p class="arcanea-auth-text">
                                    Don't have an account? 
                                    <a class="arcanea-auth-link" onclick="AuthUI.showSignup()">Sign up</a>
                                </p>
                                <p style="margin-top: 0.5rem;">
                                    <a class="arcanea-auth-link" onclick="AuthUI.showReset()">Forgot password?</a>
                                </p>
                            </div>
                        </form>

                        <!-- Signup Form -->
                        <form id="arcanea-signup-form" class="arcanea-auth-form" style="display: none;">
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Full Name</label>
                                <input type="text" id="signup-name" class="arcanea-form-input" placeholder="Your name" required>
                            </div>
                            
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Email</label>
                                <input type="email" id="signup-email" class="arcanea-form-input" placeholder="your@email.com" required>
                            </div>
                            
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Password</label>
                                <div class="arcanea-password-wrapper">
                                    <input type="password" id="signup-password" class="arcanea-form-input" placeholder="Create a password (min 6 chars)" required minlength="6">
                                    <button type="button" class="arcanea-password-toggle" onclick="AuthUI.togglePassword('signup-password')">👁️</button>
                                </div>
                            </div>

                            <button type="submit" class="arcanea-auth-submit">
                                <span class="btn-text">Create Account</span>
                                <div class="arcanea-auth-spinner"></div>
                            </button>

                            <div class="arcanea-auth-footer">
                                <p class="arcanea-auth-text">
                                    Already have an account? 
                                    <a class="arcanea-auth-link" onclick="AuthUI.showLogin()">Sign in</a>
                                </p>
                            </div>
                        </form>

                        <!-- Reset Password Form -->
                        <form id="arcanea-reset-form" class="arcanea-auth-form" style="display: none;">
                            <p style="color: #a0a0b0; margin-bottom: 1rem; text-align: center;">
                                Enter your email and we'll send you a reset link.
                            </p>
                            
                            <div class="arcanea-form-group">
                                <label class="arcanea-form-label">Email</label>
                                <input type="email" id="reset-email" class="arcanea-form-input" placeholder="your@email.com" required>
                            </div>

                            <button type="submit" class="arcanea-auth-submit">
                                <span class="btn-text">Send Reset Link</span>
                                <div class="arcanea-auth-spinner"></div>
                            </button>

                            <div class="arcanea-auth-footer">
                                <p class="arcanea-auth-text">
                                    <a class="arcanea-auth-link" onclick="AuthUI.showLogin()">Back to sign in</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modal = document.getElementById('arcanea-auth-overlay');
        },

        /**
         * Bind form events
         */
        _bindEvents() {
            // Login form
            document.getElementById('arcanea-login-form')?.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this._handleLogin();
            });

            // Signup form
            document.getElementById('arcanea-signup-form')?.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this._handleSignup();
            });

            // Reset form
            document.getElementById('arcanea-reset-form')?.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this._handleReset();
            });

            // Close on overlay click
            this.modal?.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        },

        /**
         * Handle login form submission
         */
        async _handleLogin() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const submitBtn = document.querySelector('#arcanea-login-form .arcanea-auth-submit');

            this._hideMessages();
            this._setLoading(submitBtn, true);

            try {
                const result = await ArcaneaAuth.signIn(email, password);

                if (result.success) {
                    this._showSuccess('Welcome back! Redirecting...');
                    setTimeout(() => {
                        this.close();
                        window.location.reload();
                    }, 1000);
                } else {
                    this._showError(result.error);
                    document.getElementById('login-password').classList.add('error');
                }
            } catch (error) {
                this._showError('An unexpected error occurred. Please try again.');
            } finally {
                this._setLoading(submitBtn, false);
            }
        },

        /**
         * Handle signup form submission
         */
        async _handleSignup() {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const submitBtn = document.querySelector('#arcanea-signup-form .arcanea-auth-submit');

            this._hideMessages();
            this._setLoading(submitBtn, true);

            try {
                const result = await ArcaneaAuth.signUp(email, password, {
                    fullName: name
                });

                if (result.success) {
                    if (result.session) {
                        this._showSuccess('Account created! Welcome to Arcanea!');
                        setTimeout(() => {
                            this.close();
                            window.location.reload();
                        }, 1500);
                    } else {
                        this._showSuccess(result.message);
                        this.showLogin();
                    }
                } else {
                    this._showError(result.error);
                }
            } catch (error) {
                this._showError('An unexpected error occurred. Please try again.');
            } finally {
                this._setLoading(submitBtn, false);
            }
        },

        /**
         * Handle password reset
         */
        async _handleReset() {
            const email = document.getElementById('reset-email').value;
            const submitBtn = document.querySelector('#arcanea-reset-form .arcanea-auth-submit');

            this._hideMessages();
            this._setLoading(submitBtn, true);

            try {
                const result = await ArcaneaAuth.resetPassword(email);

                if (result.success) {
                    this._showSuccess(result.message);
                    document.getElementById('reset-email').value = '';
                } else {
                    this._showError(result.error);
                }
            } catch (error) {
                this._showError('An unexpected error occurred. Please try again.');
            } finally {
                this._setLoading(submitBtn, false);
            }
        },

        /**
         * OAuth sign in
         */
        async signInWithOAuth(provider) {
            const result = await ArcaneaAuth.signInWithOAuth(provider);

            if (result.success) {
                // Redirect to OAuth provider
                window.location.href = result.url;
            } else {
                this._showError(result.error);
            }
        },

        /**
         * Show login view
         */
        showLogin() {
            this._hideAllForms();
            document.getElementById('arcanea-login-form').style.display = 'flex';
            this.currentView = 'login';
            this._hideMessages();
        },

        /**
         * Show signup view
         */
        showSignup() {
            this._hideAllForms();
            document.getElementById('arcanea-signup-form').style.display = 'flex';
            this.currentView = 'signup';
            this._hideMessages();
        },

        /**
         * Show reset password view
         */
        showReset() {
            this._hideAllForms();
            document.getElementById('arcanea-reset-form').style.display = 'flex';
            this.currentView = 'reset';
            this._hideMessages();
        },

        /**
         * Hide all form views
         */
        _hideAllForms() {
            const forms = document.querySelectorAll('.arcanea-auth-form');
            forms.forEach(form => form.style.display = 'none');
        },

        /**
         * Open modal
         */
        open(view = 'login') {
            if (!this.modal) {
                this.initialize();
            }

            this.modal.classList.add('active');
            this.isOpen = true;

            if (view === 'signup') {
                this.showSignup();
            } else if (view === 'reset') {
                this.showReset();
            } else {
                this.showLogin();
            }

            // Focus first input
            setTimeout(() => {
                const firstInput = this.modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);

            // Dispatch event
            window.dispatchEvent(new CustomEvent('arcanea:auth:open'));
        },

        /**
         * Close modal
         */
        close() {
            if (this.modal) {
                this.modal.classList.remove('active');
                this.isOpen = false;
                this._hideMessages();

                // Dispatch event
                window.dispatchEvent(new CustomEvent('arcanea:auth:close'));
            }
        },

        /**
         * Toggle password visibility
         */
        togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
        },

        /**
         * Show error message
         */
        _showError(message) {
            const errorEl = document.getElementById('arcanea-auth-error');
            errorEl.textContent = message;
            errorEl.classList.add('show');
        },

        /**
         * Show success message
         */
        _showSuccess(message) {
            const successEl = document.getElementById('arcanea-auth-success');
            successEl.textContent = message;
            successEl.classList.add('show');
        },

        /**
         * Hide all messages
         */
        _hideMessages() {
            document.getElementById('arcanea-auth-error').classList.remove('show');
            document.getElementById('arcanea-auth-success').classList.remove('show');
            document.querySelectorAll('.arcanea-form-input').forEach(input => {
                input.classList.remove('error');
            });
        },

        /**
         * Set loading state on button
         */
        _setLoading(button, isLoading) {
            if (isLoading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        },

        /**
         * Create user menu component (for when logged in)
         */
        createUserMenu(containerId) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container #${containerId} not found`);
                return;
            }

            const user = ArcaneaAuth.getUser();
            if (!user) {
                // Show sign in button
                container.innerHTML = `
                    <button class="arcanea-auth-submit" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="AuthUI.open()">
                        Sign In
                    </button>
                `;
                return;
            }

            // Show user menu
            const avatar = user.profile?.avatar_url || user.user_metadata?.avatar_url || '👤';
            const name = user.profile?.display_name || user.email?.split('@')[0] || 'User';

            container.innerHTML = `
                <div class="arcanea-user-menu">
                    <div class="arcanea-user-avatar" onclick="AuthUI.toggleUserMenu()">
                        ${avatar.startsWith('http') ? `<img src="${avatar}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : avatar}
                    </div>
                    <div id="arcanea-user-dropdown" class="arcanea-user-dropdown">
                        <div class="arcanea-user-item">
                            <span>👤</span> ${name}
                        </div>
                        <div class="arcanea-user-item" onclick="window.location.href='/profile'">
                            <span>⚙️</span> Profile Settings
                        </div>
                        <div class="arcanea-user-item danger" onclick="AuthUI.signOut()">
                            <span>🚪</span> Sign Out
                        </div>
                    </div>
                </div>
            `;

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    const dropdown = document.getElementById('arcanea-user-dropdown');
                    if (dropdown) dropdown.classList.remove('show');
                }
            });
        },

        /**
         * Toggle user menu dropdown
         */
        toggleUserMenu() {
            const dropdown = document.getElementById('arcanea-user-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        },

        /**
         * Sign out current user
         */
        async signOut() {
            const result = await ArcaneaAuth.signOut();
            if (result.success) {
                window.location.reload();
            } else {
                alert('Failed to sign out. Please try again.');
            }
        }
    };

    // Export to global scope
    global.AuthUI = AuthUI;

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        AuthUI.initialize();
    });

})(window);
