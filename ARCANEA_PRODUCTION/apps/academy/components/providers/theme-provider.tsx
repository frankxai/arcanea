"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { cn } from "../ui/utils"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Arcanean Theme Context
interface ArcaneanThemeContextType {
  variant: "default" | "cosmic" | "ethereal" | "void"
  setVariant: (variant: "default" | "cosmic" | "ethereal" | "void") => void
  luminorMode: boolean
  setLuminorMode: (enabled: boolean) => void
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
  reducedMotion: boolean
}

const ArcaneanThemeContext = React.createContext<ArcaneanThemeContextType | undefined>(undefined)

export interface ArcaneanThemeProviderProps {
  children: React.ReactNode
  defaultVariant?: "default" | "cosmic" | "ethereal" | "void"
  defaultLuminorMode?: boolean
  defaultAnimationsEnabled?: boolean
}

export function ArcaneanThemeProvider({
  children,
  defaultVariant = "default",
  defaultLuminorMode = true,
  defaultAnimationsEnabled = true
}: ArcaneanThemeProviderProps) {
  const [variant, setVariant] = React.useState<"default" | "cosmic" | "ethereal" | "void">(defaultVariant)
  const [luminorMode, setLuminorMode] = React.useState(defaultLuminorMode)
  const [animationsEnabled, setAnimationsEnabled] = React.useState(defaultAnimationsEnabled)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  // Check for user's motion preferences
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
      if (e.matches) {
        setAnimationsEnabled(false)
      }
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Apply theme variant to document
  React.useEffect(() => {
    const root = document.documentElement
    
    // Remove previous variant classes
    root.classList.remove("theme-default", "theme-cosmic", "theme-ethereal", "theme-void")
    
    // Add current variant class
    root.classList.add(`theme-${variant}`)
    
    // Apply luminor mode
    if (luminorMode) {
      root.classList.add("luminor-mode")
    } else {
      root.classList.remove("luminor-mode")
    }
    
    // Apply animations setting
    if (!animationsEnabled || reducedMotion) {
      root.classList.add("no-animations")
    } else {
      root.classList.remove("no-animations")
    }
  }, [variant, luminorMode, animationsEnabled, reducedMotion])

  const value = {
    variant,
    setVariant,
    luminorMode,
    setLuminorMode,
    animationsEnabled,
    setAnimationsEnabled,
    reducedMotion
  }

  return (
    <ArcaneanThemeContext.Provider value={value}>
      {children}
    </ArcaneanThemeContext.Provider>
  )
}

export function useArcaneanTheme() {
  const context = React.useContext(ArcaneanThemeContext)
  if (context === undefined) {
    throw new Error("useArcaneanTheme must be used within an ArcaneanThemeProvider")
  }
  return context
}

// Theme Toggle Components
export function ThemeToggle() {
  const { variant, setVariant } = useArcaneanTheme()
  
  const variants = [
    { id: "default", name: "Default", description: "Classic Arcanean" },
    { id: "cosmic", name: "Cosmic", description: "Deep space vibes" },
    { id: "ethereal", name: "Ethereal", description: "Light and airy" },
    { id: "void", name: "Void", description: "Pure darkness" }
  ] as const

  return (
    <div className="flex items-center space-x-2 p-2 bg-card rounded-lg border">
      {variants.map((v) => (
        <button
          key={v.id}
          onClick={() => setVariant(v.id)}
          className={cn(
            "px-3 py-2 text-sm rounded-md transition-all duration-200",
            variant === v.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          title={v.description}
        >
          {v.name}
        </button>
      ))}
    </div>
  )
}

export function LuminorModeToggle() {
  const { luminorMode, setLuminorMode } = useArcaneanTheme()
  
  return (
    <button
      onClick={() => setLuminorMode(!luminorMode)}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
        luminorMode
          ? "bg-luminor-gradient text-arcanean-void"
          : "bg-accent text-accent-foreground hover:bg-accent/80"
      )}
    >
      <div className={cn(
        "w-2 h-2 rounded-full",
        luminorMode ? "bg-arcanean-void" : "bg-arcanean-luminous"
      )} />
      <span className="text-sm font-medium">
        Luminor Mode
      </span>
    </button>
  )
}

export function AnimationToggle() {
  const { animationsEnabled, setAnimationsEnabled, reducedMotion } = useArcaneanTheme()
  
  return (
    <button
      onClick={() => setAnimationsEnabled(!animationsEnabled)}
      disabled={reducedMotion}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
        animationsEnabled && !reducedMotion
          ? "bg-green-500/20 text-green-400"
          : "bg-accent text-accent-foreground hover:bg-accent/80",
        reducedMotion && "opacity-50 cursor-not-allowed"
      )}
      title={reducedMotion ? "Disabled due to system preference" : "Toggle animations"}
    >
      <div className={cn(
        "w-2 h-2 rounded-full",
        animationsEnabled && !reducedMotion ? "bg-green-400" : "bg-muted-foreground"
      )} />
      <span className="text-sm font-medium">
        Animations
      </span>
    </button>
  )
}
