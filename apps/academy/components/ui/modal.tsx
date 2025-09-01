"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "./utils"

const Modal = Dialog.Root

const ModalTrigger = Dialog.Trigger

const ModalPortal = Dialog.Portal

const ModalClose = Dialog.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay> & {
    variant?: "default" | "cosmic" | "ethereal"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-background/80 backdrop-blur-sm",
    cosmic: "bg-arcanean-void/80 backdrop-blur-sm",
    ethereal: "bg-arcanean-cosmic/60 backdrop-blur-md"
  }

  return (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 transition-all duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
ModalOverlay.displayName = Dialog.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
    size?: "sm" | "default" | "lg" | "xl" | "full"
  }
>(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw] max-h-[90vh]"
  }

  const variantClasses = {
    default: "bg-background border",
    cosmic: "bg-arcanean-cosmic/90 border-arcanean-aurora/30 backdrop-blur-md",
    ethereal: "bg-arcanean-deep/90 border-arcanean-luminous/20 backdrop-blur-md shadow-lg shadow-arcanean-luminous/10",
    luminor: "bg-arcanean-nebula/90 border-arcanean-ethereal/30 backdrop-blur-md shadow-xl shadow-arcanean-ethereal/20"
  }

  return (
    <ModalPortal>
      <ModalOverlay variant={variant === "default" ? "default" : "cosmic"} />
      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] rounded-lg p-6 shadow-lg duration-300",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </ModalPortal>
  )
})
ModalContent.displayName = Dialog.Content.displayName

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
    {...props}
  />
))
ModalHeader.displayName = "ModalHeader"

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
    {...props}
  />
))
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title> & {
    gradient?: boolean
  }
>(({ className, gradient = false, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      gradient && "nebula-text",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = Dialog.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = Dialog.Description.displayName

// Animated Modal Component
const AnimatedModal = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    variant?: "default" | "cosmic" | "ethereal" | "luminor"
    size?: "sm" | "default" | "lg" | "xl" | "full"
    animation?: "scale" | "slide" | "fade"
  }
>(({ className, variant = "default", size = "default", animation = "scale", children, ...props }, ref) => {
  const animations = {
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  }

  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ModalOverlay variant={variant === "default" ? "default" : "cosmic"} />
      </motion.div>
      <motion.div
        className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
        {...animations[animation]}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Dialog.Content
          ref={ref}
          className={cn(
            "w-full rounded-lg p-6 shadow-lg",
            size === "sm" && "max-w-md",
            size === "default" && "max-w-lg",
            size === "lg" && "max-w-2xl",
            size === "xl" && "max-w-4xl",
            size === "full" && "max-w-[90vw] max-h-[90vh]",
            variant === "default" && "bg-background border",
            variant === "cosmic" && "bg-arcanean-cosmic/90 border-arcanean-aurora/30 backdrop-blur-md",
            variant === "ethereal" && "bg-arcanean-deep/90 border-arcanean-luminous/20 backdrop-blur-md shadow-lg shadow-arcanean-luminous/10",
            variant === "luminor" && "bg-arcanean-nebula/90 border-arcanean-ethereal/30 backdrop-blur-md shadow-xl shadow-arcanean-ethereal/20",
            className
          )}
          {...props}
        >
          {children}
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </motion.div>
    </ModalPortal>
  )
})
AnimatedModal.displayName = "AnimatedModal"

// Confirmation Modal
interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: "default" | "destructive" | "cosmic"
}

const ConfirmationModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default"
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <AnimatedModal 
        variant={variant === "destructive" ? "cosmic" : variant as any}
        size="sm"
        animation="scale"
      >
        <ModalHeader>
          <ModalTitle gradient={variant === "cosmic"}>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
              variant === "cosmic" && "bg-arcanean-luminous text-arcanean-void hover:bg-arcanean-ethereal",
              variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {confirmText}
          </button>
        </ModalFooter>
      </AnimatedModal>
    </Modal>
  )
}

// Image Modal
interface ImageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  src: string
  alt: string
  title?: string
}

const ImageModal = ({ open, onOpenChange, src, alt, title }: ImageModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <AnimatedModal variant="cosmic" size="full" animation="fade">
        <div className="flex flex-col items-center">
          {title && (
            <ModalHeader>
              <ModalTitle gradient>{title}</ModalTitle>
            </ModalHeader>
          )}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      </AnimatedModal>
    </Modal>
  )
}

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  AnimatedModal,
  ConfirmationModal,
  ImageModal
}