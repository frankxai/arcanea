import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-arcane-fire text-white",
        secondary: "border-transparent bg-arcane-cosmic text-arcane-300",
        destructive: "border-transparent bg-red-600 text-white",
        outline: "border-arcane-crystal/30 text-arcane-300",
        crystal: "border-arcane-crystal text-arcane-crystal bg-arcane-crystal/10",
        gold: "border-arcane-gold text-arcane-gold bg-arcane-gold/10",
        void: "border-arcane-void text-white bg-arcane-void/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }