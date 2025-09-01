"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "./utils"

// Main Layout Container
const Layout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cosmic" | "ethereal"
    fullHeight?: boolean
  }
>(({ className, variant = "default", fullHeight = false, ...props }, ref) => {
  const variantClasses = {
    default: "bg-background",
    cosmic: "bg-arcanean-gradient",
    ethereal: "bg-cosmic-nebula"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Layout.displayName = "Layout"

// Container Component
const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "md" | "lg" | "xl" | "full"
    centered?: boolean
  }
>(({ className, size = "lg", centered = false, ...props }, ref) => {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        centered && "mx-auto",
        className
      )}
      {...props}
    />
  )
})
Container.displayName = "Container"

// Grid Layout
const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    gap?: "sm" | "md" | "lg" | "xl"
    responsive?: boolean
  }
>(({ className, cols = 1, gap = "md", responsive = true, ...props }, ref) => {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    12: "grid-cols-12"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  }

  const responsiveClasses = responsive ? {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    12: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
  } : {}

  return (
    <div
      ref={ref}
      className={cn(
        "grid",
        responsive && cols in responsiveClasses 
          ? responsiveClasses[cols as keyof typeof responsiveClasses]
          : colsClasses[cols],
        gapClasses[gap],
        className
      )}
      {...props}
    />
  )
})
Grid.displayName = "Grid"

// Flex Layout
const Flex = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "row" | "col"
    align?: "start" | "center" | "end" | "stretch"
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
    wrap?: boolean
    gap?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, direction = "row", align = "start", justify = "start", wrap = false, gap, ...props }, ref) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col"
  }

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  }

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  }

  const gapClasses = gap ? {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  }[gap] : ""

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        gapClasses,
        className
      )}
      {...props}
    />
  )
})
Flex.displayName = "Flex"

// Stack Layout
const Stack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "md" | "lg" | "xl"
    align?: "start" | "center" | "end" | "stretch"
  }
>(({ className, spacing = "md", align = "stretch", ...props }, ref) => {
  const spacingClasses = {
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8"
  }

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
      {...props}
    />
  )
})
Stack.displayName = "Stack"

// Section Component
const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    padding?: "sm" | "md" | "lg" | "xl"
    background?: "default" | "muted" | "cosmic" | "ethereal"
    centered?: boolean
  }
>(({ className, padding = "lg", background = "default", centered = false, ...props }, ref) => {
  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24"
  }

  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    cosmic: "bg-arcanean-cosmic/20",
    ethereal: "bg-arcanean-ethereal/10"
  }

  return (
    <section
      ref={ref}
      className={cn(
        "w-full",
        paddingClasses[padding],
        backgroundClasses[background],
        centered && "text-center",
        className
      )}
      {...props}
    />
  )
})
Section.displayName = "Section"

// Sidebar Layout
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "left" | "right"
    width?: "sm" | "md" | "lg"
    collapsible?: boolean
    collapsed?: boolean
    onToggle?: () => void
  }
>(({ className, position = "left", width = "md", collapsible = false, collapsed = false, onToggle, ...props }, ref) => {
  const widthClasses = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80"
  }

  const collapsedWidthClasses = {
    sm: "w-12",
    md: "w-16",
    lg: "w-20"
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "h-full bg-card border-r flex-shrink-0 transition-all duration-300",
        collapsed && collapsible ? collapsedWidthClasses[width] : widthClasses[width],
        position === "right" && "border-r-0 border-l order-last",
        className
      )}
      animate={{
        width: collapsed && collapsible ? 
          (width === "sm" ? "3rem" : width === "md" ? "4rem" : "5rem") :
          (width === "sm" ? "12rem" : width === "md" ? "16rem" : "20rem")
      }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

// Main Content Area
const MainContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    padding?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, padding = "lg", ...props }, ref) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12"
  }

  return (
    <main
      ref={ref}
      className={cn(
        "flex-1 overflow-auto",
        paddingClasses[padding],
        className
      )}
      {...props}
    />
  )
})
MainContent.displayName = "MainContent"

// Page Header
const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    description?: string
    actions?: React.ReactNode
    gradient?: boolean
  }
>(({ className, title, description, actions, gradient = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between border-b pb-4 mb-6", className)}
    {...props}
  >
    <div>
      <h1 className={cn(
        "text-2xl font-bold tracking-tight",
        gradient && "nebula-text"
      )}>
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
    {actions && (
      <div className="flex items-center space-x-2">
        {actions}
      </div>
    )}
  </div>
))
PageHeader.displayName = "PageHeader"

// Divider
const Divider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
    variant?: "default" | "dashed" | "dotted"
    spacing?: "sm" | "md" | "lg"
  }
>(({ className, orientation = "horizontal", variant = "default", spacing = "md", ...props }, ref) => {
  const orientationClasses = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px"
  }

  const variantClasses = {
    default: "bg-border",
    dashed: "border-t border-dashed border-border",
    dotted: "border-t border-dotted border-border"
  }

  const spacingClasses = {
    sm: orientation === "horizontal" ? "my-2" : "mx-2",
    md: orientation === "horizontal" ? "my-4" : "mx-4",
    lg: orientation === "horizontal" ? "my-6" : "mx-6"
  }

  return (
    <div
      ref={ref}
      className={cn(
        orientationClasses[orientation],
        variant === "default" ? variantClasses[variant] : "h-0",
        variant !== "default" && variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      {...props}
    />
  )
})
Divider.displayName = "Divider"

// Spacer
const Spacer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    axis?: "x" | "y" | "both"
  }
>(({ className, size = "md", axis = "y", ...props }, ref) => {
  const sizeClasses = {
    xs: "1",
    sm: "2",
    md: "4",
    lg: "6",
    xl: "8",
    "2xl": "12"
  }

  const axisClasses = {
    x: `w-${sizeClasses[size]}`,
    y: `h-${sizeClasses[size]}`,
    both: `w-${sizeClasses[size]} h-${sizeClasses[size]}`
  }

  return (
    <div
      ref={ref}
      className={cn(axisClasses[axis], className)}
      {...props}
    />
  )
})
Spacer.displayName = "Spacer"

export {
  Layout,
  Container,
  Grid,
  Flex,
  Stack,
  Section,
  Sidebar,
  MainContent,
  PageHeader,
  Divider,
  Spacer
}