"use client";

// 🎨 Arcanea Design System - Radix UI + Premium Effects
// The definitive implementation combining Radix primitives with Arcanea magic

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import * as RadixTabs from "@radix-ui/react-tabs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// === BUTTON COMPONENT ===
// 🔒 LOCKED premium effects with Radix flexibility

const buttonVariants = cva(
  [
    "inline-flex items-center justify-content center gap-2",
    "font-semibold transition-all duration-300 cursor-pointer select-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none",
    // BELOVED ROUND CORNERS PRESERVED!
    "rounded-2xl min-h-[48px] px-6 py-3",
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        // 🔒 LOCKED - Premium gradient with light sweep (your favorite!)
        premium: [
          "bg-[var(--gradient-aurora-grained)] text-white border border-white/15",
          "hover:transform hover:translateY(-3px)",
          "hover:shadow-[0_15px_35px_rgba(102,126,234,0.3),0_5px_15px_rgba(0,0,0,0.1)]",
          // Light sweep animation
          "before:absolute before:inset-0 before:bg-gradient-to-r",
          "before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] before:transition-transform before:duration-600",
          "hover:before:translate-x-[100%]",
        ],
        // 🔒 LOCKED - Glass morphism with shimmer
        glass: [
          "bg-white/8 backdrop-blur-[20px] backdrop-saturate-[180%]",
          "border border-white/15 text-foreground",
          "hover:bg-white/12 hover:transform hover:translateY(-2px)",
          "hover:shadow-[0_10px_25px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
          // Shimmer effect
          "after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full",
          "after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent",
          "after:transition-all after:duration-500",
          "hover:after:left-[100%]",
        ],
        // 🔧 FLEXIBLE - Standard variants
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:transform hover:translateY(-1px) hover:shadow-lg",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:transform hover:translateY(-1px)",
        ],
        ghost: [
          "text-foreground hover:bg-accent hover:text-accent-foreground",
          "hover:transform hover:translateY(-1px)",
        ],
      },
      size: {
        sm: "px-3 py-2 text-sm min-h-[36px]",
        md: "px-6 py-3 text-base min-h-[48px]",
        lg: "px-8 py-4 text-lg min-h-[56px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {leftIcon && !isLoading && <span className="w-4 h-4 shrink-0">{leftIcon}</span>}
        {isLoading && <span className="w-4 h-4 animate-spin shrink-0">⟳</span>}
        {children}
        {rightIcon && !isLoading && <span className="w-4 h-4 shrink-0">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// === CARD COMPONENT ===
// Premium cards with hover effects

const cardVariants = cva(
  [
    "rounded-xl border transition-all duration-400",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground border-border p-6",
          "hover:transform hover:translateY(-2px) hover:shadow-md",
        ],
        // 🔒 LOCKED - Premium glass card
        glass: [
          "bg-white/8 backdrop-blur-[20px] backdrop-saturate-[180%] text-foreground",
          "border-white/15 p-6 relative",
          "hover:transform hover:translateY(-8px) hover:scale-[1.02]",
          "hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]",
          // Highlight overlay effect
          "after:absolute after:inset-0 after:rounded-xl after:pointer-events-none",
          "after:bg-gradient-to-br after:from-white/10 after:to-transparent",
          "after:opacity-0 after:transition-all after:duration-400",
          "hover:after:opacity-100",
        ],
        gradient: [
          "p-6 text-white border-transparent",
          "hover:transform hover:translateY(-6px) hover:scale-[1.02]",
          "hover:shadow-xl",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  gradient?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, gradient, style, children, ...props }, ref) => {
    const gradientStyle = gradient ? { background: `var(--gradient-${gradient})` } : {};
    
    return (
      <div
        className={cn(cardVariants({ variant, className }))}
        style={{ ...gradientStyle, ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

// === DIALOG COMPONENT ===
// Premium modal with glass morphism

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ children, ...props }: DialogProps) => (
  <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
);

const DialogTrigger = RadixDialog.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        // Premium glass dialog
        "bg-white/10 backdrop-blur-[24px] backdrop-saturate-[200%]",
        "border border-white/20 rounded-2xl p-6 shadow-xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogClose = RadixDialog.Close;

// === TABS COMPONENT ===
// Premium tabs with smooth transitions

const Tabs = RadixTabs.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-lg",
      "bg-muted p-1 text-muted-foreground",
      // Glass morphism for tab list
      "bg-white/5 backdrop-blur-lg border border-white/10",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5",
      "text-sm font-medium ring-offset-background transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground",
      // Premium active state
      "data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-sm",
      "data-[state=active]:shadow-sm hover:bg-white/5 transition-all",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// === TOOLTIP COMPONENT ===
// Premium tooltips with glass effect

const TooltipProvider = RadixTooltip.Provider;
const TooltipRoot = RadixTooltip.Root;
const TooltipTrigger = RadixTooltip.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-lg px-3 py-1.5 text-sm",
      // Premium glass tooltip
      "bg-black/80 backdrop-blur-sm text-white",
      "border border-white/10",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

const Tooltip = ({ children, content, ...props }: { 
  children: React.ReactNode; 
  content: React.ReactNode;
} & React.ComponentProps<typeof TooltipRoot>) => (
  <TooltipRoot {...props}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>{content}</TooltipContent>
  </TooltipRoot>
);

// === PREMIUM WRAPPER COMPONENTS ===

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

const HoverLift = ({ children, className, intensity = "medium" }: HoverLiftProps) => {
  const intensityStyles = {
    subtle: "hover:transform hover:translateY(-2px) hover:scale-[1.01]",
    medium: "hover:transform hover:translateY(-4px) hover:scale-[1.02]",
    strong: "hover:transform hover:translateY(-8px) hover:scale-[1.04]",
  };

  return (
    <div
      className={cn(
        "transition-all duration-400 cursor-pointer",
        "hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)]",
        intensityStyles[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};

// === GRADIENT BACKGROUNDS ===
const GradientBackground = ({ 
  gradient, 
  children, 
  className 
}: { 
  gradient: string; 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div 
    className={cn("relative overflow-hidden", className)}
    style={{ background: `var(--gradient-${gradient})` }}
  >
    {children}
  </div>
);

// Export everything
export {
  Button,
  buttonVariants,
  Card,
  cardVariants,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TooltipProvider,
  Tooltip,
  TooltipContent,
  HoverLift,
  GradientBackground,
};

// Export types
export type { ButtonProps, CardProps, HoverLiftProps };