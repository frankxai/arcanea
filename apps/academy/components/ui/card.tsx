"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "./utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean
    ethereal?: boolean
    luminor?: boolean
    cosmic?: boolean
  }
>(({ className, hover = false, ethereal = false, luminor = false, cosmic = false, ...props }, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm"
  const etherealClasses = "transcendent-card"
  const luminorClasses = "luminor-card"
  const cosmicClasses = "bg-arcanean-cosmic/50 border-arcanean-aurora/30 backdrop-blur-sm"

  const cardClasses = cn(
    baseClasses,
    ethereal && etherealClasses,
    luminor && luminorClasses,
    cosmic && cosmicClasses,
    className
  )

  if (hover) {
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cardClasses}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    gradient?: boolean
  }
>(({ className, gradient = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      gradient && "nebula-text",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Specialized Arcanean Card Components
const CosmicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowEffect?: boolean
  }
>(({ className, glowEffect = false, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "bg-arcanean-cosmic/30 border border-arcanean-aurora/30 rounded-xl p-6 backdrop-blur-sm",
      glowEffect && "animate-luminor-glow",
      className
    )}
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ duration: 0.3 }}
    {...props}
  />
))
CosmicCard.displayName = "CosmicCard"

const EtherealCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "bg-gradient-to-br from-arcanean-deep/50 to-arcanean-cosmic/50 border border-arcanean-aurora/20 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-arcanean-luminous/10",
      className
    )}
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ duration: 0.3 }}
    {...props}
  />
))
EtherealCard.displayName = "EtherealCard"

const GlowCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowColor?: string
  }
>(({ className, glowColor = "arcanean-luminous", ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "bg-card border rounded-xl p-6 transition-all duration-300",
      className
    )}
    whileHover={{ 
      scale: 1.02, 
      y: -2,
      boxShadow: `0 10px 30px rgba(91, 139, 217, 0.3)`
    }}
    transition={{ duration: 0.3 }}
    {...props}
  />
))
GlowCard.displayName = "GlowCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CosmicCard,
  EtherealCard,
  GlowCard,
}