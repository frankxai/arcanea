"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Arcanean variants
        luminor: "bg-luminor-gradient text-arcanean-void font-medium hover:shadow-lg hover:shadow-arcanean-luminous/30 transition-all duration-300",
        cosmic: "bg-arcanean-cosmic/80 text-arcanean-transcendent border border-arcanean-aurora/30 hover:bg-arcanean-cosmic hover:border-arcanean-luminous/50 backdrop-blur-sm",
        ethereal: "bg-gradient-to-r from-arcanean-luminous/20 to-arcanean-ethereal/20 text-arcanean-celestial border border-arcanean-aurora/30 hover:from-arcanean-luminous/30 hover:to-arcanean-ethereal/30 backdrop-blur-sm",
        nebula: "bg-arcanean-nebula/60 text-arcanean-transcendent hover:bg-arcanean-nebula/80 border border-arcanean-aurora/20 hover:border-arcanean-luminous/40 backdrop-blur-sm",
        void: "bg-arcanean-void/90 text-arcanean-celestial border border-arcanean-deep hover:bg-arcanean-void hover:border-arcanean-aurora/50 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  glowEffect?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, glowEffect = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const buttonContent = (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          glowEffect && "animate-luminor-glow",
          loading && "cursor-not-allowed opacity-70"
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    )

    if (variant === "luminor" || glowEffect) {
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {buttonContent}
        </motion.div>
      )
    }

    return buttonContent
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }