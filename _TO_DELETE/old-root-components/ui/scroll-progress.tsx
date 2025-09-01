"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "./utils"

interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bar" | "circle" | "dots"
  position?: "top" | "bottom" | "left" | "right"
  color?: "primary" | "luminous" | "ethereal" | "cosmic"
  size?: "sm" | "md" | "lg"
  showPercentage?: boolean
}

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ 
    className, 
    variant = "bar", 
    position = "top", 
    color = "luminous", 
    size = "md",
    showPercentage = false,
    ...props 
  }, ref) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    })

    const [scrollPercentage, setScrollPercentage] = React.useState(0)

    React.useEffect(() => {
      return scrollYProgress.onChange((latest) => {
        setScrollPercentage(Math.round(latest * 100))
      })
    }, [scrollYProgress])

    const colorClasses = {
      primary: "bg-primary",
      luminous: "bg-arcanean-luminous",
      ethereal: "bg-arcanean-ethereal",
      cosmic: "bg-arcanean-cosmic"
    }

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3"
    }

    const positionClasses = {
      top: "top-0 left-0 right-0",
      bottom: "bottom-0 left-0 right-0",
      left: "left-0 top-0 bottom-0 w-2",
      right: "right-0 top-0 bottom-0 w-2"
    }

    if (variant === "circle") {
      const size = 60
      const strokeWidth = 4
      const radius = (size - strokeWidth) / 2
      const circumference = radius * 2 * Math.PI

      return (
        <div
          ref={ref}
          className={cn(
            "fixed z-50 flex items-center justify-center",
            position === "top" && "top-4 right-4",
            position === "bottom" && "bottom-4 right-4",
            position === "left" && "top-4 left-4",
            position === "right" && "top-4 right-4",
            className
          )}
          {...props}
        >
          <div className="relative">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
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
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
                className={cn(colorClasses[color])}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: circumference - (scrollPercentage / 100) * circumference,
                }}
                transition={{ duration: 0.1 }}
              />
            </svg>
            {showPercentage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{scrollPercentage}%</span>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (variant === "dots") {
      const sections = 10
      const dotsArray = Array.from({ length: sections }, (_, i) => i)
      const activeIndex = Math.floor(scrollPercentage / (100 / sections))

      return (
        <div
          ref={ref}
          className={cn(
            "fixed z-50 flex gap-1",
            position === "left" && "left-4 top-1/2 -translate-y-1/2 flex-col",
            position === "right" && "right-4 top-1/2 -translate-y-1/2 flex-col",
            position === "top" && "top-4 left-1/2 -translate-x-1/2 flex-row",
            position === "bottom" && "bottom-4 left-1/2 -translate-x-1/2 flex-row",
            className
          )}
          {...props}
        >
          {dotsArray.map((index) => (
            <motion.div
              key={index}
              className={cn(
                "rounded-full transition-all duration-200",
                size === "sm" && "w-2 h-2",
                size === "md" && "w-3 h-3",
                size === "lg" && "w-4 h-4",
                index <= activeIndex 
                  ? colorClasses[color]
                  : "bg-muted-foreground/30"
              )}
              animate={{
                scale: index <= activeIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      )
    }

    // Default bar variant
    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background/20 backdrop-blur-sm",
          positionClasses[position],
          position === "top" || position === "bottom" ? sizeClasses[size] : "h-full",
          className
        )}
        {...props}
      >
        <motion.div
          className={cn(
            colorClasses[color],
            position === "top" || position === "bottom" ? "h-full" : "w-full",
            position === "left" || position === "right" ? "origin-top" : "origin-left"
          )}
          style={{
            scaleX: position === "top" || position === "bottom" ? scaleX : 1,
            scaleY: position === "left" || position === "right" ? scaleX : 1,
          }}
        />
        {showPercentage && (
          <div className={cn(
            "absolute text-xs font-medium text-white mix-blend-difference",
            position === "top" && "right-2 top-1/2 -translate-y-1/2",
            position === "bottom" && "right-2 top-1/2 -translate-y-1/2",
            position === "left" && "left-1/2 -translate-x-1/2 bottom-2",
            position === "right" && "left-1/2 -translate-x-1/2 bottom-2"
          )}>
            {scrollPercentage}%
          </div>
        )}
      </div>
    )
  }
)

ScrollProgress.displayName = "ScrollProgress"

// Hook for scroll-based animations
export function useScrollAnimation() {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = React.useState<"up" | "down">("down")
  const [isScrolling, setIsScrolling] = React.useState(false)
  
  React.useEffect(() => {
    let prevScrollY = 0
    let timeoutId: NodeJS.Timeout

    const unsubscribe = scrollY.onChange((current) => {
      const direction = current > prevScrollY ? "down" : "up"
      setScrollDirection(direction)
      setIsScrolling(true)
      
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
      
      prevScrollY = current
    })

    return () => {
      unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [scrollY])

  return {
    scrollY,
    scrollYProgress,
    scrollDirection,
    isScrolling
  }
}

export { ScrollProgress }