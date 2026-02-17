/**
 * Arcanea Mobile Integration
 * Automatic mobile optimization and PWA features
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * Mobile Integration - Detects and optimizes for mobile devices
     */
    const MobileIntegration = {
        isMobile: false,
        isTouch: false,
        deviceType: 'desktop', // 'desktop' | 'tablet' | 'mobile'
        orientation: 'portrait',
        
        config: {
            enablePWA: true,
            enableTouchGestures: true,
            enableViewportOptimization: true,
            enableServiceWorker: true,
            mobileBreakpoint: 768,
            tabletBreakpoint: 1024
        },

        /**
         * Initialize mobile integration
         */
        initialize(options = {}) {
            Object.assign(this.config, options);

            // Detect device capabilities
            this._detectDevice();

            // Setup mobile optimizations
            if (this.isMobile || this.isTouch) {
                this._injectMobileStyles();
                this._setupTouchGestures();
                this._optimizeViewport();
            }

            // Setup PWA features
            if (this.config.enablePWA) {
                this._setupPWA();
            }

            // Setup orientation monitoring
            this._setupOrientationMonitoring();

            console.log('✅ Mobile Integration initialized');
            console.log(`   Device: ${this.deviceType}`);
            console.log(`   Touch: ${this.isTouch}`);
            console.log(`   Mobile: ${this.isMobile}`);

            return true;
        },

        /**
         * Detect device type and capabilities
         */
        _detectDevice() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Check for touch support
            this.isTouch = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 ||
                          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Determine device type by screen size
            if (width <= this.config.mobileBreakpoint) {
                this.deviceType = 'mobile';
                this.isMobile = true;
            } else if (width <= this.config.tabletBreakpoint) {
                this.deviceType = 'tablet';
                this.isMobile = true;
            } else {
                this.deviceType = 'desktop';
                this.isMobile = false;
            }

            // Determine orientation
            this.orientation = width > height ? 'landscape' : 'portrait';

            // Store detection results
            document.documentElement.classList.add(`device-${this.deviceType}`);
            document.documentElement.classList.add(`orientation-${this.orientation}`);
            
            if (this.isTouch) {
                document.documentElement.classList.add('touch-device');
            }
        },

        /**
         * Inject mobile-specific CSS
         */
        _injectMobileStyles() {
            if (document.getElementById('arcanea-mobile-styles')) return;

            const mobileStyles = `
                <style id="arcanea-mobile-styles">
                    /* Mobile Base Styles */
                    .device-mobile {
                        font-size: 16px;
                    }

                    .device-mobile body {
                        overflow-x: hidden;
                        -webkit-overflow-scrolling: touch;
                    }

                    /* Touch Optimizations */
                    .touch-device * {
                        -webkit-tap-highlight-color: transparent;
                    }

                    .touch-device button,
                    .touch-device a,
                    .touch-device input,
                    .touch-device select,
                    .touch-device textarea {
                        touch-action: manipulation;
                    }

                    /* Mobile Layout Adjustments */
                    .device-mobile .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }

                    .device-mobile .grid {
                        grid-template-columns: 1fr !important;
                    }

                    .device-mobile .flex-row {
                        flex-direction: column;
                    }

                    /* Mobile Navigation */
                    .device-mobile .nav-desktop {
                        display: none;
                    }

                    .device-mobile .nav-mobile {
                        display: flex;
                    }

                    /* Mobile Cards */
                    .device-mobile .card {
                        margin-bottom: 1rem;
                    }

                    .device-mobile .card-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    /* Mobile Forms */
                    .device-mobile input,
                    .device-mobile select,
                    .device-mobile textarea {
                        font-size: 16px; /* Prevents zoom on iOS */
                        padding: 0.875rem;
                    }

                    .device-mobile .form-group {
                        margin-bottom: 1rem;
                    }

                    /* Mobile Buttons */
                    .device-mobile button,
                    .device-mobile .btn {
                        padding: 0.875rem 1.25rem;
                        min-height: 44px; /* iOS minimum touch target */
                    }

                    /* Mobile Tables */
                    .device-mobile table {
                        display: block;
                        overflow-x: auto;
                        white-space: nowrap;
                    }

                    /* Mobile Modals */
                    .device-mobile .modal {
                        padding: 1rem;
                    }

                    .device-mobile .modal-content {
                        width: 100%;
                        max-height: 90vh;
                        overflow-y: auto;
                    }

                    /* Mobile Sidebar */
                    .device-mobile .sidebar {
                        position: fixed;
                        top: 0;
                        left: -100%;
                        width: 80%;
                        height: 100%;
                        z-index: 1000;
                        transition: left 0.3s ease;
                    }

                    .device-mobile .sidebar.open {
                        left: 0;
                    }

                    .device-mobile .sidebar-overlay {
                        display: none;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 999;
                    }

                    .device-mobile .sidebar-overlay.show {
                        display: block;
                    }

                    /* Mobile Touch Feedback */
                    .touch-device .btn:active,
                    .touch-device button:active,
                    .touch-device a:active {
                        transform: scale(0.98);
                        opacity: 0.8;
                    }

                    /* Mobile Scrollbar */
                    .device-mobile ::-webkit-scrollbar {
                        width: 4px;
                        height: 4px;
                    }

                    .device-mobile ::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 2px;
                    }

                    /* Mobile Safe Areas (notch, home indicator) */
                    @supports (padding-top: env(safe-area-inset-top)) {
                        .device-mobile .safe-area-top {
                            padding-top: env(safe-area-inset-top);
                        }

                        .device-mobile .safe-area-bottom {
                            padding-bottom: env(safe-area-inset-bottom);
                        }
                    }

                    /* Mobile Bottom Navigation */
                    .mobile-bottom-nav {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #1a1a28;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        display: flex;
                        justify-content: space-around;
                        padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom, 0px));
                        z-index: 100;
                    }

                    .mobile-bottom-nav .nav-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 0.5rem;
                        color: #a0a0b0;
                        text-decoration: none;
                        font-size: 0.7rem;
                        transition: color 0.2s;
                    }

                    .mobile-bottom-nav .nav-item.active,
                    .mobile-bottom-nav .nav-item:hover {
                        color: #ff6b35;
                    }

                    .mobile-bottom-nav .nav-item .icon {
                        font-size: 1.25rem;
                        margin-bottom: 0.25rem;
                    }

                    /* Pull to Refresh Indicator */
                    .pull-to-refresh {
                        position: fixed;
                        top: -50px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 40px;
                        height: 40px;
                        background: #ff6b35;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: top 0.3s ease;
                        z-index: 1000;
                    }

                    .pull-to-refresh.show {
                        top: 20px;
                    }

                    .pull-to-refresh.spinning::after {
                        content: '';
                        width: 20px;
                        height: 20px;
                        border: 2px solid white;
                        border-top-color: transparent;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }

                    /* Tablet Optimizations */
                    .device-tablet .grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .device-tablet .card-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    /* Landscape Mode */
                    .orientation-landscape.device-mobile .grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    /* Hide elements on mobile */
                    .hide-mobile {
                        display: none !important;
                    }

                    .show-mobile {
                        display: block !important;
                    }

                    @media (min-width: 769px) {
                        .hide-desktop {
                            display: none !important;
                        }
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', mobileStyles);
        },

        /**
         * Setup touch gestures
         */
        _setupTouchGestures() {
            if (!this.config.enableTouchGestures) return;

            let touchStartX = 0;
            let touchStartY = 0;
            let touchEndX = 0;
            let touchEndY = 0;
            let touchStartTime = 0;

            document.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
                touchStartTime = Date.now();
            }, { passive: true });

            document.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;
                const deltaTime = Date.now() - touchStartTime;

                // Swipe detection
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        this._handleSwipeRight();
                    } else {
                        this._handleSwipeLeft();
                    }
                }

                // Pull to refresh (at top of page)
                if (deltaY > 100 && window.scrollY === 0) {
                    this._handlePullToRefresh();
                }

                // Long press detection
                if (deltaTime > 500 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                    this._handleLongPress(e.target);
                }
            }, { passive: true });

            // Double tap detection
            let lastTap = 0;
            document.addEventListener('touchend', (e) => {
                const currentTime = Date.now();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    this._handleDoubleTap(e.target);
                    e.preventDefault();
                }
                
                lastTap = currentTime;
            });
        },

        /**
         * Handle swipe right gesture
         */
        _handleSwipeRight() {
            // Open sidebar or go back
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && this.deviceType === 'mobile') {
                sidebar.classList.add('open');
                document.querySelector('.sidebar-overlay')?.classList.add('show');
            }

            window.dispatchEvent(new CustomEvent('arcanea:swipe:right'));
        },

        /**
         * Handle swipe left gesture
         */
        _handleSwipeLeft() {
            // Close sidebar
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
                document.querySelector('.sidebar-overlay')?.classList.remove('show');
            }

            window.dispatchEvent(new CustomEvent('arcanea:swipe:left'));
        },

        /**
         * Handle pull to refresh
         */
        _handlePullToRefresh() {
            const indicator = document.querySelector('.pull-to-refresh');
            if (!indicator) return;

            indicator.classList.add('show');
            indicator.classList.add('spinning');

            // Trigger sync
            window.dispatchEvent(new CustomEvent('arcanea:pulltorefresh'));

            setTimeout(() => {
                indicator.classList.remove('show');
                indicator.classList.remove('spinning');
            }, 1500);
        },

        /**
         * Handle long press
         */
        _handleLongPress(target) {
            // Show context menu or additional options
            window.dispatchEvent(new CustomEvent('arcanea:longpress', {
                detail: { target }
            }));
        },

        /**
         * Handle double tap
         */
        _handleDoubleTap(target) {
            // Zoom or expand
            window.dispatchEvent(new CustomEvent('arcanea:doubletap', {
                detail: { target }
            }));
        },

        /**
         * Optimize viewport for mobile
         */
        _optimizeViewport() {
            if (!this.config.enableViewportOptimization) return;

            // Ensure proper viewport meta tag
            let viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
                viewport = document.createElement('meta');
                viewport.name = 'viewport';
                document.head.appendChild(viewport);
            }
            
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';

            // iOS standalone mode support
            if (window.navigator.standalone) {
                document.documentElement.classList.add('ios-standalone');
            }

            // Theme color for mobile browsers
            let themeColor = document.querySelector('meta[name="theme-color"]');
            if (!themeColor) {
                themeColor = document.createElement('meta');
                themeColor.name = 'theme-color';
                document.head.appendChild(themeColor);
            }
            themeColor.content = '#1a1a28';
        },

        /**
         * Setup PWA features
         */
        _setupPWA() {
            if (!this.config.enablePWA) return;

            // Add manifest link
            let manifest = document.querySelector('link[rel="manifest"]');
            if (!manifest) {
                manifest = document.createElement('link');
                manifest.rel = 'manifest';
                manifest.href = '/manifest.json';
                document.head.appendChild(manifest);
            }

            // Add Apple touch icon
            let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
            if (!appleIcon) {
                appleIcon = document.createElement('link');
                appleIcon.rel = 'apple-touch-icon';
                appleIcon.sizes = '180x180';
                appleIcon.href = '/icon-180.png';
                document.head.appendChild(appleIcon);
            }

            // Register service worker
            if (this.config.enableServiceWorker && 'serviceWorker' in navigator) {
                this._registerServiceWorker();
            }

            // Setup beforeinstallprompt
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                global.arcaneaInstallPrompt = e;
                
                window.dispatchEvent(new CustomEvent('arcanea:pwa:installable', {
                    detail: { prompt: e }
                }));
            });

            // Track PWA installation
            window.addEventListener('appinstalled', () => {
                console.log('✅ Arcanea installed as PWA');
                global.arcaneaInstallPrompt = null;
                
                window.dispatchEvent(new CustomEvent('arcanea:pwa:installed'));
            });
        },

        /**
         * Register service worker
         */
        async _registerServiceWorker() {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service Worker registered');

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available
                            window.dispatchEvent(new CustomEvent('arcanea:sw:update'));
                        }
                    });
                });
            } catch (error) {
                console.warn('⚠️ Service Worker registration failed:', error);
            }
        },

        /**
         * Setup orientation monitoring
         */
        _setupOrientationMonitoring() {
            window.addEventListener('resize', () => {
                const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
                
                if (newOrientation !== this.orientation) {
                    this.orientation = newOrientation;
                    
                    document.documentElement.classList.remove('orientation-portrait', 'orientation-landscape');
                    document.documentElement.classList.add(`orientation-${newOrientation}`);
                    
                    window.dispatchEvent(new CustomEvent('arcanea:orientationchange', {
                        detail: { orientation: newOrientation }
                    }));
                }
            });
        },

        /**
         * Create mobile navigation
         */
        createMobileNav(items) {
            if (!this.isMobile) return;

            const existingNav = document.querySelector('.mobile-bottom-nav');
            if (existingNav) existingNav.remove();

            const nav = document.createElement('nav');
            nav.className = 'mobile-bottom-nav';
            
            nav.innerHTML = items.map(item => `
                <a href="${item.href}" class="nav-item ${item.active ? 'active' : ''}" data-page="${item.id}">
                    <span class="icon">${item.icon}</span>
                    <span>${item.label}</span>
                </a>
            `).join('');

            document.body.appendChild(nav);

            // Add padding to body to account for nav
            document.body.style.paddingBottom = '70px';

            return nav;
        },

        /**
         * Show install prompt
         */
        async showInstallPrompt() {
            if (!global.arcaneaInstallPrompt) {
                return { success: false, error: 'Install prompt not available' };
            }

            try {
                global.arcaneaInstallPrompt.prompt();
                const { outcome } = await global.arcaneaInstallPrompt.userChoice;
                
                global.arcaneaInstallPrompt = null;
                
                return {
                    success: outcome === 'accepted',
                    outcome
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        /**
         * Vibrate device (if supported)
         */
        vibrate(pattern = 50) {
            if ('vibrate' in navigator) {
                navigator.vibrate(pattern);
            }
        },

        /**
         * Get device info
         */
        getDeviceInfo() {
            return {
                type: this.deviceType,
                isMobile: this.isMobile,
                isTouch: this.isTouch,
                orientation: this.orientation,
                screen: {
                    width: window.screen.width,
                    height: window.screen.height,
                    availWidth: window.screen.availWidth,
                    availHeight: window.screen.availHeight
                },
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                pixelRatio: window.devicePixelRatio,
                standalone: window.navigator.standalone || false
            };
        }
    };

    // Export to global scope
    global.ArcaneaMobile = MobileIntegration;

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        MobileIntegration.initialize();
    });

})(window);
