"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./button"

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: Toast
  onDismiss: (id: string) => void
}

const toastVariants = {
  default: {
    icon: <Info className="w-4 h-4" />,
    className: "bg-background border-border text-foreground"
  },
  success: {
    icon: <Check className="w-4 h-4" />,
    className: "bg-green-500/10 border-green-500/20 text-green-400"
  },
  error: {
    icon: <AlertCircle className="w-4 h-4" />,
    className: "bg-red-500/10 border-red-500/20 text-red-400"
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    className: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    className: "bg-blue-500/10 border-blue-500/20 text-blue-400"
  }
}

const ToastComponent = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, toast, onDismiss, ...props }, ref) => {
    const [progress, setProgress] = React.useState(100)
    const variant = toastVariants[toast.type || "default"]

    React.useEffect(() => {
      if (!toast.duration) return

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (toast.duration! / 100))
          if (newProgress <= 0) {
            onDismiss(toast.id)
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }, [toast.duration, toast.id, onDismiss])

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "relative flex w-full max-w-sm items-center space-x-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm",
          variant.className,
          className
        )}
        {...props}
      >
        {/* Progress bar */}
        {toast.duration && (
          <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-lg overflow-hidden">
            <motion.div
              className="h-full bg-current"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        )}

        {/* Icon */}
        <div className="flex-shrink-0">
          {variant.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <div className="text-sm font-medium">
              {toast.title}
            </div>
          )}
          {toast.description && (
            <div className={cn(
              "text-sm",
              toast.title ? "text-muted-foreground mt-1" : ""
            )}>
              {toast.description}
            </div>
          )}
        </div>

        {/* Action button */}
        {toast.action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toast.action.onClick}
            className="text-current hover:bg-current/10"
          >
            {toast.action.label}
          </Button>
        )}

        {/* Dismiss button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 p-1 h-auto text-current hover:bg-current/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </motion.div>
    )
  }
)

ToastComponent.displayName = "Toast"

// Toast Provider Context
interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    }
    
    setToasts((prev) => [...prev, newToast])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Toast Viewport
interface ToastViewportProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

function ToastViewport({ 
  toasts, 
  onDismiss, 
  position = "top-right" 
}: ToastViewportProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
  }

  return (
    <div className={cn(
      "fixed z-[100] flex flex-col space-y-2 pointer-events-none",
      positionClasses[position]
    )}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastComponent toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Convenience functions
export function createToast(
  type: Toast["type"],
  title: string,
  description?: string,
  options?: Partial<Toast>
): Omit<Toast, "id"> {
  return {
    type,
    title,
    description,
    ...options
  }
}

export function successToast(title: string, description?: string, options?: Partial<Toast>) {
  return createToast("success", title, description, options)
}

export function errorToast(title: string, description?: string, options?: Partial<Toast>) {
  return createToast("error", title, description, options)
}

export function warningToast(title: string, description?: string, options?: Partial<Toast>) {
  return createToast("warning", title, description, options)
}

export function infoToast(title: string, description?: string, options?: Partial<Toast>) {
  return createToast("info", title, description, options)
}

export { ToastComponent as Toast }