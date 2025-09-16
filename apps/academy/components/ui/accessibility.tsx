"use client";

/**
 * ♿ Arcanea Accessibility System
 * 
 * Comprehensive accessibility utilities, components, and hooks
 * ensuring WCAG 2.1 AA compliance across the Arcanea platform.
 */

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useRef, 
  useCallback,
  forwardRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './icon-system';

// ===== ACCESSIBILITY CONTEXT ===== //

interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
  focusIndicators: 'minimal' | 'enhanced' | 'high-contrast';
  colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';
  announcements: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  isScreenReaderActive: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// ===== ACCESSIBILITY PROVIDER ===== //

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
    keyboardNavigation: true,
    focusIndicators: 'enhanced',
    colorBlindnessMode: 'none',
    announcements: true,
  });

  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);

  // Detect system preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    // Check for large text preference
    const prefersLargeText = window.matchMedia('(prefers-reduced-data: reduce)').matches;

    // Detect screen reader usage
    const detectScreenReader = () => {
      // Multiple detection methods for better accuracy
      const hasScreenReader = 
        'speechSynthesis' in window ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window ||
        /NVDA|JAWS|SAPI|VoiceOver|TalkBack/i.test(navigator.userAgent);
      
      setIsScreenReaderActive(hasScreenReader);
    };

    detectScreenReader();

    setSettings(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
      largeText: prefersLargeText,
      screenReaderOptimized: isScreenReaderActive,
    }));

    // Listen for preference changes
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastMediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reducedMotion: e.matches }));
    };
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, highContrast: e.matches }));
    };

    motionMediaQuery.addEventListener('change', handleMotionChange);
    contrastMediaQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionMediaQuery.removeEventListener('change', handleMotionChange);
      contrastMediaQuery.removeEventListener('change', handleContrastChange);
    };
  }, [isScreenReaderActive]);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply settings as CSS classes and properties
    root.classList.toggle('reduced-motion', settings.reducedMotion);
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('large-text', settings.largeText);
    root.classList.toggle('screen-reader-optimized', settings.screenReaderOptimized);
    root.classList.toggle('enhanced-focus', settings.focusIndicators === 'enhanced');
    root.classList.toggle('high-contrast-focus', settings.focusIndicators === 'high-contrast');
    
    // Color blindness filters
    if (settings.colorBlindnessMode !== 'none') {
      root.style.filter = getColorBlindnessFilter(settings.colorBlindnessMode);
    } else {
      root.style.filter = '';
    }

    // Font size adjustments
    if (settings.largeText) {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!settings.announcements || !announcementRef.current) return;

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    announcementRef.current.appendChild(announcer);
    
    setTimeout(() => {
      if (announcementRef.current?.contains(announcer)) {
        announcementRef.current.removeChild(announcer);
      }
    }, 1000);
  }, [settings.announcements]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        announce,
        isScreenReaderActive,
      }}
    >
      {children}
      <div ref={announcementRef} className="sr-only" />
    </AccessibilityContext.Provider>
  );
};

// ===== UTILITY FUNCTIONS ===== //

const getColorBlindnessFilter = (mode: AccessibilitySettings['colorBlindnessMode']) => {
  switch (mode) {
    case 'protanopia':
      return 'url(#protanopia)';
    case 'deuteranopia':
      return 'url(#deuteranopia)';
    case 'tritanopia':
      return 'url(#tritanopia)';
    case 'monochrome':
      return 'grayscale(100%)';
    default:
      return '';
  }
};

// ===== FOCUS MANAGEMENT HOOKS ===== //

export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

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
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Allow escape handling by parent components
        const escapeEvent = new CustomEvent('accessibilityEscape', {
          bubbles: true,
          cancelable: true,
        });
        container.dispatchEvent(escapeEvent);
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);
    
    // Focus first element when activated
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return containerRef;
};

export const useAnnouncer = () => {
  const { announce } = useAccessibility();
  return announce;
};

export const useSkipNavigation = () => {
  const skipToMain = useCallback(() => {
    const mainElement = document.querySelector('main, [role="main"], #main-content');
    if (mainElement) {
      (mainElement as HTMLElement).focus();
      (mainElement as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const skipToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.focus();
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { skipToMain, skipToSection };
};

// ===== ACCESSIBLE COMPONENTS ===== //

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ 
  href, 
  children, 
  className 
}) => {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50',
        'px-4 py-2 bg-mystic-500 text-white rounded-lg font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mystic-400',
        'transition-all duration-200',
        className
      )}
    >
      {children}
    </a>
  );
};

interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ 
  children, 
  className 
}) => {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  );
};

interface LiveRegionProps {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  priority = 'polite',
  atomic = true,
  className,
}) => {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  );
};

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: IconName;
  loading?: boolean;
  loadingText?: string;
  description?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    icon, 
    loading = false, 
    loadingText, 
    description, 
    disabled,
    className,
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, ref) => {
    const { settings, announce } = useAccessibility();
    const buttonId = React.useId();
    const descriptionId = `${buttonId}-description`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (settings.announcements && !loading && !disabled) {
        announce(`${children} button activated`);
      }
      props.onClick?.(e);
    };

    return (
      <>
        <button
          ref={ref}
          className={cn(
            'relative inline-flex items-center justify-center gap-2',
            'font-medium transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            settings.focusIndicators === 'enhanced' && 'focus-visible:ring-mystic-500',
            settings.focusIndicators === 'high-contrast' && 'focus-visible:ring-white focus-visible:ring-4',
            settings.highContrast && 'border-2 border-current',
            className
          )}
          disabled={disabled || loading}
          aria-disabled={disabled || loading}
          aria-busy={loading}
          aria-describedby={description ? descriptionId : ariaDescribedBy}
          onClick={handleClick}
          {...props}
        >
          {icon && !loading && (
            <Icon name={icon} size="sm" aria-hidden="true" />
          )}
          
          {loading && (
            <Icon 
              name="magic" 
              size="sm" 
              effect="spin" 
              aria-hidden="true"
            />
          )}
          
          <span className={loading && loadingText ? 'sr-only' : ''}>
            {children}
          </span>
          
          {loading && loadingText && (
            <span>{loadingText}</span>
          )}
        </button>
        
        {description && (
          <ScreenReaderOnly>
            <div id={descriptionId}>{description}</div>
          </ScreenReaderOnly>
        )}
      </>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const { settings, announce } = useAccessibility();
  const modalRef = useFocusTrap(isOpen);
  const titleId = React.useId();
  const descriptionId = React.useId();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (settings.announcements) {
        announce(`${title} modal opened`, 'assertive');
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, title, announce, settings.announcements]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'relative w-full max-w-lg mx-4 p-6 glass-primary rounded-2xl',
          'focus:outline-none',
          settings.highContrast && 'border-2 border-white',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: settings.reducedMotion 
            ? { duration: 0 } 
            : { duration: 0.2 }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.95,
          transition: settings.reducedMotion 
            ? { duration: 0 } 
            : { duration: 0.15 }
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 id={titleId} className="text-xl font-semibold text-foreground">
            {title}
          </h2>
          
          <AccessibleButton
            onClick={onClose}
            icon="close"
            description="Close modal"
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <ScreenReaderOnly>Close</ScreenReaderOnly>
          </AccessibleButton>
        </div>
        
        {/* Description */}
        {description && (
          <p id={descriptionId} className="text-muted-foreground mb-4">
            {description}
          </p>
        )}
        
        {/* Content */}
        {children}
      </motion.div>
    </div>
  );
};

// ===== ACCESSIBILITY SETTINGS PANEL ===== //

interface AccessibilitySettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilitySettingsPanel: React.FC<AccessibilitySettingsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { settings, updateSetting } = useAccessibility();

  const settingItems = [
    {
      key: 'reducedMotion' as const,
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: 'pause' as IconName,
    },
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      description: 'Increase contrast for better visibility',
      icon: 'eye' as IconName,
    },
    {
      key: 'largeText' as const,
      label: 'Large Text',
      description: 'Increase font size throughout the app',
      icon: 'plus' as IconName,
    },
    {
      key: 'screenReaderOptimized' as const,
      label: 'Screen Reader Optimized',
      description: 'Enhanced screen reader experience',
      icon: 'volume' as IconName,
    },
    {
      key: 'announcements' as const,
      label: 'Voice Announcements',
      description: 'Announce important actions and changes',
      icon: 'bell' as IconName,
    },
  ];

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Accessibility Settings"
      description="Customize the app to meet your accessibility needs"
    >
      <div className="space-y-4">
        {settingItems.map((item) => (
          <div 
            key={item.key}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Icon 
              name={item.icon} 
              size="md" 
              className="mt-0.5 text-mystic-400" 
              aria-hidden="true"
            />
            
            <div className="flex-1 min-w-0">
              <label 
                htmlFor={`setting-${item.key}`}
                className="block text-sm font-medium text-foreground cursor-pointer"
              >
                {item.label}
              </label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </div>
            
            <button
              id={`setting-${item.key}`}
              role="switch"
              aria-checked={settings[item.key]}
              onClick={() => updateSetting(item.key, !settings[item.key])}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full',
                'transition-colors focus:outline-none focus:ring-2 focus:ring-mystic-500 focus:ring-offset-2',
                settings[item.key] ? 'bg-mystic-500' : 'bg-gray-600'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        ))}
        
        {/* Focus Indicators */}
        <div className="p-3 rounded-lg hover:bg-white/5 transition-colors">
          <label className="block text-sm font-medium text-foreground mb-2">
            Focus Indicators
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Choose how focus indicators appear
          </p>
          
          <div className="space-y-2">
            {(['minimal', 'enhanced', 'high-contrast'] as const).map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="focusIndicators"
                  value={mode}
                  checked={settings.focusIndicators === mode}
                  onChange={() => updateSetting('focusIndicators', mode)}
                  className="w-4 h-4 text-mystic-500 focus:ring-mystic-400"
                />
                <span className="text-sm capitalize">{mode.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Blindness Mode */}
        <div className="p-3 rounded-lg hover:bg-white/5 transition-colors">
          <label className="block text-sm font-medium text-foreground mb-2">
            Color Vision
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Adjust colors for different types of color blindness
          </p>
          
          <select
            value={settings.colorBlindnessMode}
            onChange={(e) => updateSetting('colorBlindnessMode', e.target.value as any)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-sm text-foreground"
          >
            <option value="none">Normal Vision</option>
            <option value="protanopia">Protanopia (Red-blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-blind)</option>
            <option value="tritanopia">Tritanopia (Blue-blind)</option>
            <option value="monochrome">Monochrome</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-6 pt-4 border-t border-white/20">
        <AccessibleButton
          onClick={onClose}
          className="px-4 py-2 bg-mystic-500 hover:bg-mystic-600 text-white rounded-lg"
        >
          Done
        </AccessibleButton>
      </div>
    </AccessibleModal>
  );
};

// ===== CSS STYLES FOR ACCESSIBILITY ===== //

export const accessibilityStyles = `
  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only:focus-within,
  .sr-only:focus,
  .sr-only:active {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  /* High contrast mode */
  .high-contrast {
    filter: contrast(150%);
  }

  .high-contrast .glass-primary,
  .high-contrast .glass-secondary,
  .high-contrast .glass-subtle {
    background: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: none !important;
    border: 2px solid #000000 !important;
  }

  /* Reduced motion */
  .reduced-motion,
  .reduced-motion *,
  .reduced-motion *:before,
  .reduced-motion *:after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Enhanced focus indicators */
  .enhanced-focus *:focus-visible {
    outline: 2px solid #7c6df2 !important;
    outline-offset: 2px !important;
    border-radius: 4px !important;
  }

  .high-contrast-focus *:focus-visible {
    outline: 4px solid #ffffff !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 6px #000000 !important;
  }

  /* Large text mode */
  .large-text {
    font-size: 18px !important;
  }

  .large-text h1 { font-size: 3.5rem !important; }
  .large-text h2 { font-size: 2.5rem !important; }
  .large-text h3 { font-size: 2rem !important; }
  .large-text h4 { font-size: 1.5rem !important; }
  .large-text h5 { font-size: 1.25rem !important; }
  .large-text h6 { font-size: 1.125rem !important; }

  /* Screen reader optimized */
  .screen-reader-optimized [aria-hidden="true"] {
    display: none !important;
  }

  .screen-reader-optimized .decorative {
    display: none !important;
  }

  /* Color blindness filters - would need SVG filter definitions */
  /* These would be implemented with proper SVG color matrix filters */
`;

// ===== EXPORT ALL ===== //

export {
  accessibilityStyles,
};