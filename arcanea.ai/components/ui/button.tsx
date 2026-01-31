import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-arcane-fire text-white hover:bg-arcane-fire/80",
        destructive: "bg-red-600 text-white hover:bg-red-600/80",
        outline: "border border-arcane-cosmic bg-background hover:bg-arcane-cosmic/50 hover:text-arcane-crystal",
        secondary: "bg-arcane-cosmic/50 text-arcane-300 hover:bg-arcane-cosmic/70",
        ghost: "text-arcane-300 hover:bg-arcane-cosmic/30 hover:text-arcane-crystal",
        link: "text-arcane-crystal underline-offset-4 hover:underline",
        crystal: "bg-arcane-crystal text-arcane-shadow hover:bg-arcane-crystal/80",
        gold: "bg-arcane-gold text-arcane-shadow hover:bg-arcane-gold/80",
        void: "bg-arcane-void text-white hover:bg-arcane-void/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }