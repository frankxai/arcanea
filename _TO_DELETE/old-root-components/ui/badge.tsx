"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn, type LuminorType } from "./utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Arcanean variants
        cosmic: "bg-arcanean-cosmic/50 text-arcanean-transcendent border-arcanean-aurora/30 backdrop-blur-sm",
        ethereal: "bg-gradient-to-r from-arcanean-luminous/20 to-arcanean-ethereal/20 text-arcanean-celestial border-arcanean-aurora/30 backdrop-blur-sm",
        luminor: "bg-luminor-gradient text-arcanean-void font-medium shadow-sm",
        void: "bg-arcanean-void/80 text-arcanean-celestial border-arcanean-deep",
        success: "bg-green-500/20 text-green-400 border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        error: "bg-red-500/20 text-red-400 border-red-500/30",
        info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean
  glow?: boolean
  luminorType?: LuminorType
}

function Badge({ className, variant, size, pulse = false, glow = false, luminorType, ...props }: BadgeProps) {
  const badgeClasses = cn(
    badgeVariants({ variant, size }),
    pulse && "animate-pulse",
    glow && "animate-luminor-glow",
    className
  )

  if (luminorType) {
    return (
      <motion.div
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
          `bg-opacity-20 text-luminor-${luminorType} border border-opacity-30`,
          glow && "animate-luminor-glow",
          className
        )}
        style={{
          backgroundColor: `var(--luminor-${luminorType})`,
          color: `var(--luminor-${luminorType})`,
          borderColor: `var(--luminor-${luminorType})`,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    )
  }

  return (
    <motion.div
      className={badgeClasses}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  )
}

// Specialized badge components
const SkillBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    level: "beginner" | "intermediate" | "advanced" | "master"
  }
>(({ className, level, ...props }, ref) => {
  const levelConfig = {
    beginner: { variant: "success" as const, text: "Beginner" },
    intermediate: { variant: "warning" as const, text: "Intermediate" },
    advanced: { variant: "error" as const, text: "Advanced" },
    master: { variant: "cosmic" as const, text: "Master" },
  }

  const config = levelConfig[level]

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      className={cn("font-medium", className)}
      {...props}
    >
      {config.text}
    </Badge>
  )
})
SkillBadge.displayName = "SkillBadge"

const StatusBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status: "online" | "offline" | "away" | "busy"
  }
>(({ className, status, ...props }, ref) => {
  const statusConfig = {
    online: { variant: "success" as const, text: "Online", pulse: false },
    offline: { variant: "outline" as const, text: "Offline", pulse: false },
    away: { variant: "warning" as const, text: "Away", pulse: false },
    busy: { variant: "error" as const, text: "Busy", pulse: true },
  }

  const config = statusConfig[status]

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      pulse={config.pulse}
      className={cn("font-medium", className)}
      {...props}
    >
      <div className={cn(
        "w-2 h-2 rounded-full mr-1",
        status === "online" && "bg-green-400",
        status === "offline" && "bg-gray-400",
        status === "away" && "bg-yellow-400",
        status === "busy" && "bg-red-400",
      )} />
      {config.text}
    </Badge>
  )
})
StatusBadge.displayName = "StatusBadge"

const AchievementBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    achievement: string
    rarity?: "common" | "rare" | "epic" | "legendary"
  }
>(({ className, achievement, rarity = "common", ...props }, ref) => {
  const rarityConfig = {
    common: { variant: "outline" as const, glow: false },
    rare: { variant: "info" as const, glow: false },
    epic: { variant: "cosmic" as const, glow: true },
    legendary: { variant: "luminor" as const, glow: true },
  }

  const config = rarityConfig[rarity]

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      glow={config.glow}
      className={cn("font-medium", className)}
      {...props}
    >
      {rarity === "legendary" && "⭐ "}
      {rarity === "epic" && "💎 "}
      {achievement}
    </Badge>
  )
})
AchievementBadge.displayName = "AchievementBadge"

const CategoryBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    category: "visual" | "narrative" | "music" | "video" | "code" | "synthesis"
  }
>(({ className, category, ...props }, ref) => {
  const categoryConfig = {
    visual: { variant: "cosmic" as const, icon: "🎨" },
    narrative: { variant: "ethereal" as const, icon: "📚" },
    music: { variant: "luminor" as const, icon: "🎵" },
    video: { variant: "info" as const, icon: "🎬" },
    code: { variant: "success" as const, icon: "💻" },
    synthesis: { variant: "warning" as const, icon: "⚡" },
  }

  const config = categoryConfig[category]

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      className={cn("font-medium capitalize", className)}
      {...props}
    >
      {config.icon} {category}
    </Badge>
  )
})
CategoryBadge.displayName = "CategoryBadge"

export { Badge, badgeVariants, SkillBadge, StatusBadge, AchievementBadge, CategoryBadge }