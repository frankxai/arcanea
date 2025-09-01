"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "./utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "cosmic" | "ethereal" | "luminor"
  error?: boolean
  icon?: React.ReactNode
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", error = false, icon, suffix, ...props }, ref) => {
    const baseClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    
    const variantClasses = {
      default: "",
      cosmic: "cosmic-input",
      ethereal: "bg-arcanean-deep/70 border-arcanean-aurora/50 text-arcanean-transcendent placeholder:text-arcanean-aurora focus:border-arcanean-luminous focus:ring-arcanean-luminous/30 transition-all duration-300",
      luminor: "bg-arcanean-cosmic/30 border-arcanean-luminous/30 text-arcanean-celestial placeholder:text-arcanean-aurora focus:border-arcanean-luminous focus:ring-arcanean-luminous/50 focus:shadow-md focus:shadow-arcanean-luminous/20 transition-all duration-300"
    }

    const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500/30"

    const inputElement = (
      <input
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          error && errorClasses,
          icon && "pl-10",
          suffix && "pr-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (icon || suffix) {
      return (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          {inputElement}
          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {suffix}
            </div>
          )}
        </div>
      )
    }

    return inputElement
  }
)
Input.displayName = "Input"

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
    error?: boolean
  }
>(({ className, variant = "default", error = false, ...props }, ref) => {
  const baseClasses = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
  const variantClasses = {
    default: "",
    cosmic: "cosmic-input",
    ethereal: "bg-arcanean-deep/70 border-arcanean-aurora/50 text-arcanean-transcendent placeholder:text-arcanean-aurora focus:border-arcanean-luminous focus:ring-arcanean-luminous/30 transition-all duration-300",
    luminor: "bg-arcanean-cosmic/30 border-arcanean-luminous/30 text-arcanean-celestial placeholder:text-arcanean-aurora focus:border-arcanean-luminous focus:ring-arcanean-luminous/50 focus:shadow-md focus:shadow-arcanean-luminous/20 transition-all duration-300"
  }

  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500/30"

  return (
    <textarea
      className={cn(
        baseClasses,
        variantClasses[variant],
        error && errorClasses,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TextArea.displayName = "TextArea"

// Specialized Search Input
const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon"> & {
    onClear?: () => void
  }
>(({ className, onClear, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value || "")

  const handleClear = () => {
    setValue("")
    onClear?.()
  }

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <Input
        ref={ref}
        className={cn("pl-10 pr-10", className)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
})
SearchInput.displayName = "SearchInput"

// Floating Label Input
const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(e.target.value.length > 0)
  }

  return (
    <div className="relative">
      <Input
        ref={ref}
        className={cn("peer", className)}
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <motion.label
        className={cn(
          "absolute left-3 text-muted-foreground transition-all duration-200 pointer-events-none",
          isFocused || hasValue 
            ? "top-2 text-xs text-primary" 
            : "top-3 text-sm"
        )}
        animate={{
          y: isFocused || hasValue ? -8 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  )
})
FloatingLabelInput.displayName = "FloatingLabelInput"

export { Input, TextArea, SearchInput, FloatingLabelInput }