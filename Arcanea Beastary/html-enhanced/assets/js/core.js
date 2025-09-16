/**
 * ARCANEAN BESTIARY - CORE JAVASCRIPT
 * Advanced ES2024+ JavaScript with cutting-edge web technologies
 * Performance-optimized, accessibility-focused, and magically enhanced
 */

'use strict';

// ===== PERFORMANCE MONITORING =====
class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.init();
  }

  init() {
    if ('performance' in window) {
      this.setupPerformanceObserver();
      this.trackCoreWebVitals();
      this.setupNavigationTiming();
    }
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.set('lcp', entry.startTime);
          console.log('🎯 LCP:', entry.startTime.toFixed(2) + 'ms');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.set('fid', entry.processingStart - entry.startTime);
          console.log('⚡ FID:', (entry.processingStart - entry.startTime).toFixed(2) + 'ms');
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.set('cls', clsValue);
            console.log('📐 CLS:', clsValue.toFixed(4));
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    }
  }

  trackCoreWebVitals() {
    // Web Vitals tracking with reporting
    this.reportVitals();
  }

  setupNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          const loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
          this.metrics.set('loadTime', loadTime);
          console.log('🚀 Page Load Time:', loadTime.toFixed(2) + 'ms');
        }
      }, 0);
    });
  }

  reportVitals() {
    const vitals = {
      lcp: this.metrics.get('lcp'),
      fid: this.metrics.get('fid'),
      cls: this.metrics.get('cls'),
      loadTime: this.metrics.get('loadTime')
    };

    // In production, send to analytics
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(vitals);
    }
  }

  sendToAnalytics(vitals) {
    // Privacy-focused analytics implementation
    if (!navigator.doNotTrack && 'sendBeacon' in navigator) {
      const data = JSON.stringify({
        ...vitals,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      
      navigator.sendBeacon('/api/analytics/vitals', data);
    }
  }
}

// ===== MAGICAL ANIMATION SYSTEM =====
class MagicalAnimations {
  constructor() {
    this.animations = new WeakMap();
    this.timeline = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.initializeParticles();
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: [0, 0.1, 0.5, 1]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          }
        });
      }, options);

      // Observe all animatable elements
      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
      });
    }
  }

  animateElement(element) {
    const animationType = element.dataset.animate;
    const delay = parseFloat(element.dataset.delay) || 0;
    
    setTimeout(() => {
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element);
          break;
        case 'fadeIn':
          this.fadeIn(element);
          break;
        case 'scaleIn':
          this.scaleIn(element);
          break;
        case 'slideInLeft':
          this.slideInLeft(element);
          break;
        case 'slideInRight':
          this.slideInRight(element);
          break;
        default:
          this.fadeInUp(element);
      }
    }, delay * 1000);
  }

  fadeInUp(element) {
    if ('animate' in element) {
      element.animate([
        { opacity: '0', transform: 'translateY(30px)' },
        { opacity: '1', transform: 'translateY(0)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards'
      });
    } else {
      // Fallback for older browsers
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  }

  fadeIn(element) {
    if ('animate' in element) {
      element.animate([
        { opacity: '0' },
        { opacity: '1' }
      ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
      });
    }
  }

  scaleIn(element) {
    if ('animate' in element) {
      element.animate([
        { opacity: '0', transform: 'scale(0.8)' },
        { opacity: '1', transform: 'scale(1)' }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards'
      });
    }
  }

  slideInLeft(element) {
    if ('animate' in element) {
      element.animate([
        { opacity: '0', transform: 'translateX(-50px)' },
        { opacity: '1', transform: 'translateX(0)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards'
      });
    }
  }

  slideInRight(element) {
    if ('animate' in element) {
      element.animate([
        { opacity: '0', transform: 'translateX(50px)' },
        { opacity: '1', transform: 'translateX(0)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards'
      });
    }
  }

  setupScrollAnimations() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for floating orbs
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.3;
      orb.style.transform = `translateY(${rate * speed}px)`;
    });

    // Update navigation background
    const nav = document.querySelector('.magical-nav');
    if (nav) {
      if (scrolled > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }

  initializeParticles() {
    const particlesContainer = document.querySelector('.mystical-particles');
    if (!particlesContainer) return;

    // Create additional particles dynamically
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.setProperty('--random-x', Math.random() * 100);
      particle.style.setProperty('--random-y', Math.random() * 100);
      particle.style.setProperty('--delay', `${Math.random() * 6}s`);
      particle.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
      particlesContainer.appendChild(particle);
    }
  }

  // Advanced animation with Web Animations API
  createMagicalGlow(element, options = {}) {
    const {
      color = '#6366f1',
      intensity = 0.4,
      duration = 3000,
      iterations = Infinity
    } = options;

    if ('animate' in element) {
      return element.animate([
        { boxShadow: `0 0 20px ${color}${Math.round(intensity * 255).toString(16)}` },
        { boxShadow: `0 0 30px ${color}${Math.round(intensity * 1.5 * 255).toString(16)}` },
        { boxShadow: `0 0 20px ${color}${Math.round(intensity * 255).toString(16)}` }
      ], {
        duration,
        iterations,
        easing: 'ease-in-out'
      });
    }
  }
}

// ===== ADVANCED SEARCH SYSTEM =====
class MagicalSearch {
  constructor() {
    this.searchIndex = null;
    this.fuse = null;
    this.cache = new Map();
    this.debounceTimer = null;
    this.init();
  }

  async init() {
    await this.loadSearchIndex();
    this.setupSearchInterface();
    this.setupKeyboardShortcuts();
  }

  async loadSearchIndex() {
    try {
      // Load creature data and build search index
      const response = await fetch('/data/initial-creatures-dataset.json');
      const data = await response.json();
      
      this.searchIndex = data.creatures;
      
      // Initialize Fuse.js for fuzzy search
      if (typeof Fuse !== 'undefined') {
        this.fuse = new Fuse(this.searchIndex, {
          keys: [
            { name: 'name', weight: 0.4 },
            { name: 'alternative_names', weight: 0.3 },
            { name: 'classification', weight: 0.2 },
            { name: 'semantic_tags', weight: 0.2 },
            { name: 'cultural_significance', weight: 0.1 }
          ],
          threshold: 0.3,
          includeScore: true,
          includeMatches: true
        });
      }
      
      console.log('🔮 Search index loaded:', this.searchIndex.length, 'creatures');
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }

  setupSearchInterface() {
    const searchTrigger = document.querySelector('.search-trigger');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('magical-search');
    const closeButton = document.querySelector('.modal-close');

    if (searchTrigger && searchModal) {
      searchTrigger.addEventListener('click', () => {
        this.openSearchModal();
      });

      closeButton?.addEventListener('click', () => {
        this.closeSearchModal();
      });

      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          this.closeSearchModal();
        }
      });

      // Search input handling
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.handleSearchInput(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
          this.handleSearchKeydown(e);
        });
      }

      // Shortcut tags
      document.querySelectorAll('.shortcut-tag').forEach(tag => {
        tag.addEventListener('click', () => {
          const query = tag.dataset.search;
          if (searchInput) {
            searchInput.value = query;
            this.handleSearchInput(query);
          }
        });
      });
    }
  }

  openSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('magical-search');
    
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      
      // Focus the input with a slight delay for animation
      setTimeout(() => {
        if (input) {
          input.focus();
        }
      }, 100);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }
  }

  closeSearchModal() {
    const modal = document.getElementById('search-modal');
    
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      
      // Restore body scrolling
      document.body.style.overflow = '';
      
      // Clear search
      const input = document.getElementById('magical-search');
      if (input) {
        input.value = '';
      }
      this.clearSearchResults();
    }
  }

  handleSearchInput(query) {
    clearTimeout(this.debounceTimer);
    
    if (query.length < 2) {
      this.clearSearchResults();
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    const input = document.getElementById('magical-search');
    const suggestions = document.getElementById('search-suggestions');
    
    if (input) {
      input.classList.add('loading');
    }

    try {
      let results = [];
      
      if (this.fuse) {
        // Use Fuse.js for fuzzy search
        const fuseResults = this.fuse.search(query);
        results = fuseResults.slice(0, 8).map(result => ({
          ...result.item,
          score: result.score,
          matches: result.matches
        }));
      } else {
        // Fallback simple search
        results = this.searchIndex
          .filter(creature => 
            creature.name.toLowerCase().includes(query.toLowerCase()) ||
            creature.classification.toLowerCase().includes(query.toLowerCase()) ||
            creature.semantic_tags.some(tag => 
              tag.toLowerCase().includes(query.toLowerCase())
            )
          )
          .slice(0, 8);
      }
      
      this.displaySearchResults(results, query);
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      if (input) {
        input.classList.remove('loading');
      }
    }
  }

  displaySearchResults(results, query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions) return;

    suggestions.innerHTML = '';
    
    if (results.length === 0) {
      suggestions.innerHTML = `
        <div class="search-no-results">
          <div class="no-results-icon">🔍</div>
          <p>No creatures found for "${query}"</p>
          <p class="suggestion-text">Try searching for dragon, spirit, or guardian</p>
        </div>
      `;
      return;
    }

    results.forEach((creature, index) => {
      const suggestion = document.createElement('div');
      suggestion.className = 'search-suggestion';
      suggestion.setAttribute('role', 'option');
      suggestion.setAttribute('tabindex', '-1');
      
      const emoji = this.getCreatureEmoji(creature.classification);
      const culture = this.getCultureName(creature.culture_id);
      
      suggestion.innerHTML = `
        <div class="suggestion-icon">${emoji}</div>
        <div class="suggestion-content">
          <div class="suggestion-title">${this.highlightMatches(creature.name, query)}</div>
          <div class="suggestion-meta">${creature.classification} • ${culture}</div>
        </div>
        <div class="suggestion-arrow">→</div>
      `;
      
      suggestion.addEventListener('click', () => {
        this.selectCreature(creature);
      });
      
      suggestions.appendChild(suggestion);
    });
  }

  highlightMatches(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  getCreatureEmoji(classification) {
    const emojiMap = {
      'Dragon': '🐉',
      'Divine Wolf': '🐺',
      'Serpentine Monster': '🐍',
      'Divine Guardian': '🦁',
      'Fairy Spirit': '👻',
      'Fox Spirit': '🦊',
      'Sea Monster': '🐙',
      'Divine Bird': '🔥',
      'Divine Guide': '⚱️'
    };
    return emojiMap[classification] || '✨';
  }

  getCultureName(cultureId) {
    // This would normally come from the cultures data
    const cultureMap = {
      'norse-001': 'Norse',
      'greek-001': 'Greek',
      'egyptian-001': 'Egyptian',
      'celtic-001': 'Celtic',
      'japanese-001': 'Japanese'
    };
    return cultureMap[cultureId] || 'Unknown';
  }

  selectCreature(creature) {
    // Navigate to creature detail page
    window.location.href = `/creature/${creature.id}`;
  }

  clearSearchResults() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
      suggestions.innerHTML = '';
    }
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
      
      // Escape to close modal
      if (e.key === 'Escape') {
        this.closeSearchModal();
      }
    });
  }

  handleSearchKeydown(e) {
    const suggestions = document.querySelectorAll('.search-suggestion');
    let currentIndex = Array.from(suggestions).findIndex(el => 
      el.classList.contains('selected')
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = Math.min(currentIndex + 1, suggestions.length - 1);
        this.highlightSuggestion(suggestions, currentIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        currentIndex = Math.max(currentIndex - 1, -1);
        this.highlightSuggestion(suggestions, currentIndex);
        break;
        
      case 'Enter':
        e.preventDefault();
        const selected = suggestions[currentIndex];
        if (selected) {
          selected.click();
        }
        break;
    }
  }

  highlightSuggestion(suggestions, index) {
    suggestions.forEach(el => el.classList.remove('selected'));
    if (index >= 0 && suggestions[index]) {
      suggestions[index].classList.add('selected');
    }
  }
}

// ===== THEME SYSTEM =====
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('arcanea-theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
    this.setupSystemThemeListener();
  }

  setupThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.toggleTheme();
      });
      
      // Update ARIA state
      toggle.setAttribute('aria-pressed', this.currentTheme === 'light');
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem('arcanea-theme', theme);
    
    // Update toggle button
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'light');
    }
  }

  applyTheme(theme) {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    
    // Update meta theme color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = theme === 'light' ? '#f8fafc' : '#0a0b1e';
    }
  }

  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('arcanea-theme')) {
          this.setTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    this.setupMotionPreferences();
    this.setupScreenReaderOptimizations();
  }

  setupFocusManagement() {
    // Focus trap for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
          this.trapFocus(e, modal);
        }
      }
    });
  }

  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for custom components
    document.addEventListener('keydown', (e) => {
      const currentElement = document.activeElement;
      
      // Navigation with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const navList = currentElement.closest('.nav-list');
        if (navList) {
          this.handleArrowNavigation(e, navList);
        }
      }
    });
  }

  handleArrowNavigation(e, container) {
    const items = container.querySelectorAll('[role="menuitem"], .nav-link');
    const currentIndex = Array.from(items).indexOf(document.activeElement);
    let newIndex;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
    }

    if (newIndex !== undefined && items[newIndex]) {
      items[newIndex].focus();
      e.preventDefault();
    }
  }

  setupMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };
    
    handleMotionPreference(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
  }

  setupScreenReaderOptimizations() {
    // Announce important state changes to screen readers
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'sr-only';
    document.body.appendChild(this.announcer);
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
      setTimeout(() => {
        this.announcer.textContent = '';
      }, 1000);
    }
  }
}

// ===== ERROR HANDLING & LOGGING =====
class ErrorManager {
  constructor() {
    this.errors = [];
    this.init();
  }

  init() {
    this.setupErrorHandlers();
    this.setupUnhandledRejectionHandler();
  }

  setupErrorHandlers() {
    window.addEventListener('error', (e) => {
      this.logError({
        type: 'javascript',
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack
      });
    });
  }

  setupUnhandledRejectionHandler() {
    window.addEventListener('unhandledrejection', (e) => {
      this.logError({
        type: 'promise',
        message: e.reason?.message || 'Unhandled promise rejection',
        stack: e.reason?.stack
      });
    });
  }

  logError(error) {
    console.error('🚨 Error logged:', error);
    this.errors.push({
      ...error,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendErrorReport(error);
    }
  }

  sendErrorReport(error) {
    if ('sendBeacon' in navigator) {
      const data = JSON.stringify(error);
      navigator.sendBeacon('/api/errors', data);
    }
  }
}

// ===== INITIALIZATION =====
class ArcaneanBestiary {
  constructor() {
    this.modules = new Map();
    this.init();
  }

  async init() {
    try {
      // Initialize loading screen
      this.showLoadingScreen();
      
      // Initialize core modules
      this.modules.set('performance', new PerformanceTracker());
      this.modules.set('animations', new MagicalAnimations());
      this.modules.set('search', new MagicalSearch());
      this.modules.set('theme', new ThemeManager());
      this.modules.set('accessibility', new AccessibilityManager());
      this.modules.set('errors', new ErrorManager());
      
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      
      // Initialize UI components
      this.initializeComponents();
      
      // Hide loading screen
      await this.hideLoadingScreen();
      
      console.log('🪄 Arcanean Bestiary initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Arcanean Bestiary:', error);
      this.handleInitializationError(error);
    }
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
    }
  }

  async hideLoadingScreen() {
    return new Promise(resolve => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          resolve();
        }, 1000);
      } else {
        resolve();
      }
    });
  }

  initializeComponents() {
    this.setupMobileMenu();
    this.setupStatCounters();
    this.setupSmoothScrolling();
    this.setupFormValidation();
  }

  setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
        
        // Accessibility announcement
        const accessibility = this.modules.get('accessibility');
        if (accessibility) {
          accessibility.announce(isExpanded ? 'Menu closed' : 'Menu opened');
        }
      });
      
      // Close menu on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('active');
        }
      });
    }
  }

  setupStatCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOut);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };
    
    animate();
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('[required], [data-validate]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let message = '';
    
    // Required validation
    if (isRequired && !value) {
      isValid = false;
      message = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    }
    
    // Custom validation
    const customValidation = field.dataset.validate;
    if (customValidation && value) {
      switch (customValidation) {
        case 'name':
          if (value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
          }
          break;
        case 'password':
          if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters';
          }
          break;
      }
    }
    
    // Update field status
    this.updateFieldStatus(field, isValid, message);
    
    return isValid;
  }

  updateFieldStatus(field, isValid, message) {
    const container = field.closest('.form-field') || field.parentElement;
    const errorElement = container.querySelector('.field-error') || 
                        this.createErrorElement(container);
    
    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid);
    
    if (isValid) {
      errorElement.textContent = '';
      errorElement.hidden = true;
    } else {
      errorElement.textContent = message;
      errorElement.hidden = false;
    }
  }

  createErrorElement(container) {
    const error = document.createElement('div');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    error.hidden = true;
    container.appendChild(error);
    return error;
  }

  handleInitializationError(error) {
    // Graceful degradation
    console.error('Initialization failed, falling back to basic functionality');
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
    
    // Basic functionality without JavaScript enhancements
    document.body.classList.add('no-js-fallback');
  }
}

// ===== INITIALIZE APPLICATION =====
const app = new ArcaneanBestiary();