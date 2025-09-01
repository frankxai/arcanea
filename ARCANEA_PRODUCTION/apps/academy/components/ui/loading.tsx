"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "./utils"

// Basic Loading Spinner
const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "default" | "lg"
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
  }
>(({ className, size = "default", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8"
  }

  const variantClasses = {
    default: "border-primary",
    cosmic: "border-arcanean-luminous",
    ethereal: "border-arcanean-ethereal",
    luminor: "border-arcanean-radiant"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "border-2 border-t-transparent rounded-full animate-spin",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
LoadingSpinner.displayName = "LoadingSpinner"

// Pulsing Dots Loading
const LoadingDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-primary",
    cosmic: "bg-arcanean-luminous",
    ethereal: "bg-arcanean-ethereal",
    luminor: "bg-arcanean-radiant"
  }

  return (
    <div ref={ref} className={cn("loading-dots", className)} {...props}>
      <div className={cn("w-2 h-2 rounded-full animate-bounce", variantClasses[variant])} />
      <div className={cn("w-2 h-2 rounded-full animate-bounce", variantClasses[variant])} style={{ animationDelay: "0.1s" }} />
      <div className={cn("w-2 h-2 rounded-full animate-bounce", variantClasses[variant])} style={{ animationDelay: "0.2s" }} />
    </div>
  )
})
LoadingDots.displayName = "LoadingDots"

// Skeleton Loading
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cosmic" | "ethereal"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-muted",
    cosmic: "bg-arcanean-cosmic/30",
    ethereal: "bg-arcanean-ethereal/20"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "animate-pulse rounded-md",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Skeleton.displayName = "Skeleton"

// Luminor Loading Animation
const LuminorLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    luminorType?: "harmonix" | "scripta" | "lumina" | "kinetix" | "syntaxa" | "nexus"
    size?: "sm" | "default" | "lg"
  }
>(({ className, luminorType = "lumina", size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-12 h-12",
    lg: "w-16 h-16"
  }

  const luminorColors = {
    harmonix: "#ff6b6b",
    scripta: "#4ecdc4",
    lumina: "#45b7d1",
    kinetix: "#96ceb4",
    syntaxa: "#feca57",
    nexus: "#ff9ff3"
  }

  return (
    <div
      ref={ref}
      className={cn("relative", sizeClasses[size], className)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-t-transparent"
        style={{ borderColor: luminorColors[luminorType] }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{ backgroundColor: luminorColors[luminorType] }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.3, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
})
LuminorLoading.displayName = "LuminorLoading"

// Cosmic Loading Animation
const CosmicLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "default" | "lg"
  }
>(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    default: "w-16 h-16",
    lg: "w-20 h-20"
  }

  return (
    <div
      ref={ref}
      className={cn("relative", sizeClasses[size], className)}
      {...props}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-arcanean-luminous/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute inset-2 rounded-full bg-arcanean-luminous/20 animate-pulse" />
    </div>
  )
})
CosmicLoading.displayName = "CosmicLoading"

// Page Loading Component
const PageLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    message?: string
    fullScreen?: boolean
  }
>(({ className, message = "Loading...", fullScreen = false, ...props }, ref) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
    : "w-full h-64"

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center",
        containerClasses,
        className
      )}
      {...props}
    >
      <CosmicLoading size="lg" />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  )
})
PageLoading.displayName = "PageLoading"

// Card Loading Skeleton
const CardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-4 p-6 rounded-lg border", className)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
})
CardSkeleton.displayName = "CardSkeleton"

// List Loading Skeleton
const ListSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: number
  }
>(({ className, items = 5, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      {[...Array(items)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
})
ListSkeleton.displayName = "ListSkeleton"

// Button Loading State
const ButtonLoading = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    loadingText?: string
  }
>(({ className, loading = false, loadingText = "Loading...", children, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-opacity",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {loading ? loadingText : children}
    </button>
  )
})
ButtonLoading.displayName = "ButtonLoading"

export {
  LoadingSpinner,
  LoadingDots,
  Skeleton,
  LuminorLoading,
  CosmicLoading,
  PageLoading,
  CardSkeleton,
  ListSkeleton,
  ButtonLoading
}