'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Type, 
  ZoomIn, 
  ZoomOut,
  Keyboard,
  Moon,
  Sun
} from 'lucide-react'

export interface AccessibilitySettings {
  screenReader: boolean
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  keyboardNavigation: boolean
  darkMode: boolean
  announcements: boolean
}

export function AccessibilityControls() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    screenReader: false,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    keyboardNavigation: false,
    darkMode: true,
    announcements: true
  })

  const [isVisible, setIsVisible] = useState(false)

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Large text
    if (settings.largeText) {
      root.style.fontSize = '18px'
    } else {
      root.style.fontSize = '16px'
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--transition-duration', '0ms')
      root.classList.add('reduce-motion')
    } else {
      root.style.removeProperty('--transition-duration')
      root.classList.remove('reduce-motion')
    }

    // Dark mode
    if (settings.darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Announce changes to screen readers
    if (settings.announcements && settings.screenReader) {
      announceToScreenReader('Accessibility settings updated')
    }
  }, [settings])

  // Keyboard navigation
  useEffect(() => {
    if (settings.keyboardNavigation) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.altKey) {
          switch (e.key) {
            case 'a':
              e.preventDefault()
              setIsVisible(!isVisible)
              break
            case '1':
              e.preventDefault()
              navigateToMain()
              break
            case '2':
              e.preventDefault()
              navigateToChat()
              break
            case '3':
              e.preventDefault()
              navigateToStudio()
              break
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [settings.keyboardNavigation, isVisible])

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const navigateToMain = () => {
    window.location.href = '/'
  }

  const navigateToChat = () => {
    window.location.href = '/chat'
  }

  const navigateToStudio = () => {
    window.location.href = '/studio'
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-20 left-4 z-50 bg-arcane-shadow/80 backdrop-blur-sm border-arcane-crystal/20"
        aria-label="Toggle accessibility controls"
      >
        <Keyboard className="w-4 h-4" />
        <span className="ml-2 hidden sm:inline">Accessibility</span>
      </Button>

      {/* Accessibility Panel */}
      {isVisible && (
        <div 
          className="fixed top-16 left-4 z-40 bg-arcane-shadow/95 backdrop-blur-md rounded-xl p-6 border border-arcane-crystal/20 w-80 max-h-96 overflow-y-auto"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <h2 id="accessibility-title" className="text-arcane-crystal font-semibold mb-4">
            Accessibility Settings
          </h2>

          <div className="space-y-4">
            {/* Screen Reader */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.screenReader ? (
                  <Volume2 className="w-4 h-4 text-arcane-crystal" />
                ) : (
                  <VolumeX className="w-4 h-4 text-arcane-400" />
                )}
                <span className="text-arcane-300 text-sm">Screen Reader</span>
              </div>
              <Button
                variant={settings.screenReader ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('screenReader', !settings.screenReader)}
                aria-pressed={settings.screenReader}
              >
                {settings.screenReader ? 'On' : 'Off'}
              </Button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-arcane-crystal" />
                <span className="text-arcane-300 text-sm">High Contrast</span>
              </div>
              <Button
                variant={settings.highContrast ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                aria-pressed={settings.highContrast}
              >
                {settings.highContrast ? 'On' : 'Off'}
              </Button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-arcane-crystal" />
                <span className="text-arcane-300 text-sm">Large Text</span>
              </div>
              <Button
                variant={settings.largeText ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('largeText', !settings.largeText)}
                aria-pressed={settings.largeText}
              >
                {settings.largeText ? 'On' : 'Off'}
              </Button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-arcane-crystal rounded" />
                <span className="text-arcane-300 text-sm">Reduced Motion</span>
              </div>
              <Button
                variant={settings.reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                aria-pressed={settings.reducedMotion}
              >
                {settings.reducedMotion ? 'On' : 'Off'}
              </Button>
            </div>

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-arcane-crystal" />
                <span className="text-arcane-300 text-sm">Keyboard Navigation</span>
              </div>
              <Button
                variant={settings.keyboardNavigation ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
                aria-pressed={settings.keyboardNavigation}
              >
                {settings.keyboardNavigation ? 'On' : 'Off'}
              </Button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.darkMode ? (
                  <Moon className="w-4 h-4 text-arcane-crystal" />
                ) : (
                  <Sun className="w-4 h-4 text-arcane-crystal" />
                )}
                <span className="text-arcane-300 text-sm">Dark Mode</span>
              </div>
              <Button
                variant={settings.darkMode ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('darkMode', !settings.darkMode)}
                aria-pressed={settings.darkMode}
              >
                {settings.darkMode ? 'On' : 'Off'}
              </Button>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          {settings.keyboardNavigation && (
            <div className="mt-6 pt-4 border-t border-arcane-crystal/20">
              <h3 className="text-arcane-crystal font-medium mb-2">Keyboard Shortcuts</h3>
              <div className="space-y-1 text-xs text-arcane-400">
                <div>Alt + A: Toggle accessibility</div>
                <div>Alt + 1: Navigate to home</div>
                <div>Alt + 2: Navigate to chat</div>
                <div>Alt + 3: Navigate to studio</div>
              </div>
            </div>
          )}

          {/* Announcements */}
          {settings.screenReader && (
            <div className="mt-4">
              <Badge 
                variant="crystal" 
                className="text-xs"
                onClick={() => announceToScreenReader('Current page loaded')}
              >
                Test Screen Reader
              </Badge>
            </div>
          )}
        </div>
      )}
    </>
  )
}

// Screen reader announcements component
export function ScreenReaderAnnouncements() {
  return (
    <div 
      aria-live="polite" 
      aria-atomic="true" 
      className="sr-only"
      id="screen-reader-announcements"
    />
  )
}

// Focus trap for modal accessibility
export function FocusTrap({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  return <>{children}</>
}