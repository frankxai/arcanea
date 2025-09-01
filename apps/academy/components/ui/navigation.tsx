"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, User, Settings, LogOut } from "lucide-react"
import { cn } from "./utils"

// Navigation Base Component
const Navigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    variant?: "default" | "cosmic" | "ethereal" | "transparent"
    fixed?: boolean
    blur?: boolean
  }
>(({ className, variant = "default", fixed = false, blur = false, ...props }, ref) => {
  const variantClasses = {
    default: "bg-background border-b",
    cosmic: "bg-arcanean-cosmic/90 border-arcanean-aurora/30",
    ethereal: "bg-arcanean-deep/90 border-arcanean-luminous/20",
    transparent: "bg-transparent"
  }

  return (
    <nav
      ref={ref}
      className={cn(
        "w-full z-50 transition-all duration-300",
        fixed && "fixed top-0 left-0 right-0",
        blur && "backdrop-blur-md",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Navigation.displayName = "Navigation"

// Navigation Container
const NavigationContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 h-16 flex items-center justify-between", className)}
    {...props}
  />
))
NavigationContainer.displayName = "NavigationContainer"

// Navigation Logo
const NavigationLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    href?: string
    gradient?: boolean
  }
>(({ className, href = "/", gradient = false, children, ...props }, ref) => {
  const content = (
    <div
      ref={ref}
      className={cn(
        "flex items-center space-x-2 font-bold text-xl cursor-pointer",
        gradient && "nebula-text",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return content
})
NavigationLogo.displayName = "NavigationLogo"

// Navigation Menu
const NavigationMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    direction?: "horizontal" | "vertical"
  }
>(({ className, direction = "horizontal", ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex items-center space-x-6",
      direction === "vertical" && "flex-col space-x-0 space-y-2",
      className
    )}
    {...props}
  />
))
NavigationMenu.displayName = "NavigationMenu"

// Navigation Item
const NavigationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    href?: string
    active?: boolean
    disabled?: boolean
  }
>(({ className, href, active = false, disabled = false, children, ...props }, ref) => {
  const content = (
    <li
      ref={ref}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
        active && "text-primary",
        disabled && "text-muted-foreground cursor-not-allowed opacity-50",
        !disabled && !active && "text-foreground hover:text-primary",
        className
      )}
      {...props}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </li>
  )

  if (href && !disabled) {
    return <a href={href}>{content}</a>
  }

  return content
})
NavigationItem.displayName = "NavigationItem"

// Navigation Dropdown
const NavigationDropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    trigger: React.ReactNode
    items: Array<{
      label: string
      href?: string
      icon?: React.ReactNode
      onClick?: () => void
      disabled?: boolean
    }>
  }
>(({ className, trigger, items, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
      >
        {trigger}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50"
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  "flex items-center px-4 py-2 text-sm transition-colors",
                  item.disabled 
                    ? "text-muted-foreground cursor-not-allowed opacity-50"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
NavigationDropdown.displayName = "NavigationDropdown"

// Mobile Navigation Toggle
const MobileNavigationToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOpen: boolean
    onToggle: () => void
  }
>(({ className, isOpen, onToggle, ...props }, ref) => (
  <button
    ref={ref}
    onClick={onToggle}
    className={cn("md:hidden p-2 rounded-md hover:bg-accent", className)}
    {...props}
  >
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { rotate: 180 },
        closed: { rotate: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </motion.div>
  </button>
))
MobileNavigationToggle.displayName = "MobileNavigationToggle"

// Mobile Navigation Menu
const MobileNavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean
    onClose: () => void
  }
>(({ className, isOpen, onClose, children, ...props }, ref) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background border-t shadow-lg",
          className
        )}
        {...props}
      >
        <div className="p-4 space-y-2">
          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
))
MobileNavigationMenu.displayName = "MobileNavigationMenu"

// User Navigation
const UserNavigation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    user?: {
      name: string
      email?: string
      avatar?: string
    }
    onSignOut?: () => void
  }
>(({ className, user, onSignOut, ...props }, ref) => {
  if (!user) {
    return (
      <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
        <a
          href="/auth/signin"
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          Sign In
        </a>
        <a
          href="/auth/signup"
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Sign Up
        </a>
      </div>
    )
  }

  const userMenuItems = [
    { label: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
    { label: "Sign Out", onClick: onSignOut, icon: <LogOut className="h-4 w-4" /> }
  ]

  return (
    <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
      <NavigationDropdown
        trigger={
          <div className="flex items-center space-x-2">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="hidden md:inline text-sm font-medium">{user.name}</span>
          </div>
        }
        items={userMenuItems}
      />
    </div>
  )
})
UserNavigation.displayName = "UserNavigation"

// Breadcrumb Navigation
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    items: Array<{
      label: string
      href?: string
      current?: boolean
    }>
    separator?: React.ReactNode
  }
>(({ className, items, separator = "/", ...props }, ref) => (
  <nav ref={ref} className={cn("flex items-center space-x-2 text-sm", className)} {...props}>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className="text-muted-foreground">{separator}</span>}
        {item.href && !item.current ? (
          <a
            href={item.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </a>
        ) : (
          <span className={cn(item.current && "text-foreground font-medium")}>
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
))
Breadcrumb.displayName = "Breadcrumb"

// Tab Navigation
const TabNavigation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    tabs: Array<{
      id: string
      label: string
      count?: number
      disabled?: boolean
    }>
    activeTab: string
    onTabChange: (tabId: string) => void
    variant?: "default" | "pills" | "underline"
  }
>(({ className, tabs, activeTab, onTabChange, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "border-b",
    pills: "bg-muted rounded-lg p-1",
    underline: "border-b-2 border-transparent"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center space-x-1",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
            tab.disabled && "opacity-50 cursor-not-allowed",
            variant === "pills" && "hover:bg-background",
            variant === "underline" && "border-b-2 border-transparent",
            tab.id === activeTab
              ? variant === "pills"
                ? "bg-background text-foreground shadow-sm"
                : "text-primary border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          {tab.count && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
})
TabNavigation.displayName = "TabNavigation"

export {
  Navigation,
  NavigationContainer,
  NavigationLogo,
  NavigationMenu,
  NavigationItem,
  NavigationDropdown,
  MobileNavigationToggle,
  MobileNavigationMenu,
  UserNavigation,
  Breadcrumb,
  TabNavigation
}