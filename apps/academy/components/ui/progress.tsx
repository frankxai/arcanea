"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"
import { cn } from "./utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
    showValue?: boolean
    animated?: boolean
    size?: "sm" | "default" | "lg"
  }
>(({ className, value, variant = "default", showValue = false, animated = true, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-2",
    default: "h-4",
    lg: "h-6"
  }

  const variantClasses = {
    default: "bg-secondary",
    cosmic: "bg-arcanean-deep",
    ethereal: "bg-arcanean-cosmic/30 border border-arcanean-aurora/20",
    luminor: "bg-arcanean-void/50 border border-arcanean-luminous/20"
  }

  const indicatorVariants = {
    default: "bg-primary",
    cosmic: "bg-gradient-to-r from-arcanean-luminous to-arcanean-ethereal",
    ethereal: "bg-gradient-to-r from-arcanean-ethereal to-arcanean-radiant",
    luminor: "bg-luminor-gradient"
  }

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500",
            indicatorVariants[variant],
            animated && "animate-pulse"
          )}
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`
          }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="absolute -top-6 right-0 text-xs text-muted-foreground">
          {value}%
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

// Circular Progress Component
const CircularProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: number
    size?: number
    strokeWidth?: number
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
    showValue?: boolean
  }
>(({ className, value, size = 80, strokeWidth = 6, variant = "default", showValue = true, ...props }, ref) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const variantColors = {
    default: "#3b82f6",
    cosmic: "#5c8bd9",
    ethereal: "#7ba3e3",
    luminor: "#9bb5e8"
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium">{value}%</span>
        </div>
      )}
    </div>
  )
})
CircularProgress.displayName = "CircularProgress"

// Skill Progress Component
const SkillProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    skill: string
    level: "beginner" | "intermediate" | "advanced" | "master"
    progress: number
    showLevel?: boolean
  }
>(({ className, skill, level, progress, showLevel = true, ...props }, ref) => {
  const levelConfig = {
    beginner: { color: "success", max: 25 },
    intermediate: { color: "warning", max: 50 },
    advanced: { color: "error", max: 75 },
    master: { color: "cosmic", max: 100 }
  }

  const config = levelConfig[level]
  const normalizedProgress = Math.min(progress, config.max)

  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill}</span>
        {showLevel && (
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            level === "beginner" && "bg-green-500/20 text-green-400",
            level === "intermediate" && "bg-yellow-500/20 text-yellow-400",
            level === "advanced" && "bg-orange-500/20 text-orange-400",
            level === "master" && "bg-purple-500/20 text-purple-400"
          )}>
            {level}
          </span>
        )}
      </div>
      <Progress
        value={normalizedProgress}
        variant={config.color as any}
        className="h-2"
        showValue
      />
    </div>
  )
})
SkillProgress.displayName = "SkillProgress"

// XP Progress Component
const XPProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    currentXP: number
    nextLevelXP: number
    level: number
  }
>(({ className, currentXP, nextLevelXP, level, ...props }, ref) => {
  const progress = (currentXP / nextLevelXP) * 100

  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Level {level}</span>
        <span className="text-xs text-muted-foreground">
          {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
        </span>
      </div>
      <Progress
        value={progress}
        variant="luminor"
        className="h-3"
        animated
      />
    </div>
  )
})
XPProgress.displayName = "XPProgress"

// Multi-step Progress Component
const MultiStepProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    steps: string[]
    currentStep: number
    completedSteps?: number[]
  }
>(({ className, steps, currentStep, completedSteps = [], ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300",
              index < currentStep || completedSteps.includes(index)
                ? "bg-primary text-primary-foreground border-primary"
                : index === currentStep
                ? "bg-secondary text-secondary-foreground border-primary"
                : "bg-muted text-muted-foreground border-muted"
            )}>
              {completedSteps.includes(index) ? "✓" : index + 1}
            </div>
            <span className="text-xs text-center mt-2 max-w-20">{step}</span>
          </div>
        ))}
      </div>
      <Progress
        value={((currentStep + 1) / steps.length) * 100}
        variant="cosmic"
        className="h-2"
      />
    </div>
  )
})
MultiStepProgress.displayName = "MultiStepProgress"

export { 
  Progress, 
  CircularProgress, 
  SkillProgress, 
  XPProgress, 
  MultiStepProgress 
}