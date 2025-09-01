"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "./utils"

interface AnimatedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "particles" | "grid" | "waves" | "constellation" | "nebula"
  intensity?: "low" | "medium" | "high"
  color?: "luminous" | "ethereal" | "cosmic" | "aurora"
  animated?: boolean
}

const AnimatedBackground = React.forwardRef<HTMLDivElement, AnimatedBackgroundProps>(
  ({ className, variant = "particles", intensity = "medium", color = "luminous", animated = true, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) {
      return <div ref={ref} className={cn("absolute inset-0", className)} {...props} />
    }

    const colorClasses = {
      luminous: "text-arcanean-luminous",
      ethereal: "text-arcanean-ethereal",
      cosmic: "text-arcanean-cosmic",
      aurora: "text-arcanean-aurora"
    }

    const intensityConfig = {
      low: { count: 20, opacity: 0.1, scale: 0.5 },
      medium: { count: 50, opacity: 0.2, scale: 0.7 },
      high: { count: 100, opacity: 0.3, scale: 1 }
    }

    const config = intensityConfig[intensity]

    if (variant === "particles") {
      return (
        <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
          {[...Array(config.count)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full",
                colorClasses[color]
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: config.opacity,
                backgroundColor: "currentColor",
              }}
              animate={animated ? {
                y: [0, -30, 0],
                opacity: [config.opacity, config.opacity * 2, config.opacity],
                scale: [config.scale, config.scale * 1.5, config.scale],
              } : {}}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === "grid") {
      return (
        <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className={cn(colorClasses[color])}
                  style={{ opacity: config.opacity }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-10"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ color: `var(--${color})` }}
            />
          )}
        </div>
      )
    }

    if (variant === "waves") {
      return (
        <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${200 + i * 50} Q${200},${150 + i * 50} ${400},${200 + i * 50} T${800},${200 + i * 50} T${1200},${200 + i * 50} T${1600},${200 + i * 50}`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className={cn(colorClasses[color])}
                style={{ opacity: config.opacity / (i + 1) }}
                animate={animated ? {
                  d: [
                    `M0,${200 + i * 50} Q${200},${150 + i * 50} ${400},${200 + i * 50} T${800},${200 + i * 50} T${1200},${200 + i * 50} T${1600},${200 + i * 50}`,
                    `M0,${200 + i * 50} Q${200},${250 + i * 50} ${400},${200 + i * 50} T${800},${200 + i * 50} T${1200},${200 + i * 50} T${1600},${200 + i * 50}`,
                    `M0,${200 + i * 50} Q${200},${150 + i * 50} ${400},${200 + i * 50} T${800},${200 + i * 50} T${1200},${200 + i * 50} T${1600},${200 + i * 50}`
                  ]
                } : {}}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>
      )
    }

    if (variant === "constellation") {
      const stars = React.useMemo(() => 
        [...Array(config.count)].map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 2
        })), [config.count]
      )

      return (
        <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {stars.map((star) => (
              <motion.circle
                key={star.id}
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r={star.size * config.scale}
                fill="currentColor"
                className={cn(colorClasses[color])}
                style={{ opacity: config.opacity }}
                animate={animated ? {
                  opacity: [config.opacity, config.opacity * 2, config.opacity],
                  scale: [1, 1.5, 1],
                } : {}}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Connection lines */}
            {animated && stars.slice(0, 8).map((star, i) => {
              const nextStar = stars[(i + 1) % 8]
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${star.x}%`}
                  y1={`${star.y}%`}
                  x2={`${nextStar.x}%`}
                  y2={`${nextStar.y}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className={cn(colorClasses[color])}
                  style={{ opacity: config.opacity * 0.3 }}
                  animate={{
                    opacity: [0, config.opacity * 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              )
            })}
          </svg>
        </div>
      )
    }

    if (variant === "nebula") {
      return (
        <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full mix-blend-screen",
                colorClasses[color]
              )}
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, currentColor ${config.opacity * 100}%, transparent 70%)`,
              }}
              animate={animated ? {
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
              } : {}}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )
    }

    return <div ref={ref} className={cn("absolute inset-0", className)} {...props} />
  }
)

AnimatedBackground.displayName = "AnimatedBackground"

export { AnimatedBackground }