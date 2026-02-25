"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service (e.g., Sentry, LogRocket)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 animate-pulse blur-xl bg-draconic-crimson/20 rounded-full" />
            <div className="relative bg-draconic-crimson/10 p-4 rounded-full border border-draconic-crimson/30">
              <svg
                className="w-12 h-12 text-draconic-crimson"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-cinzel font-semibold text-atlantean-teal-aqua mb-2 text-center">
            Something Unexpected Happened
          </h3>

          <p className="text-neutral-400 text-center max-w-md mb-6">
            This component encountered an error. Try refreshing to restore
            normal operation.
          </p>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <div className="mb-6 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg max-w-xl w-full">
              <p className="font-jetbrains-mono text-xs text-neutral-500 mb-2">
                Error:
              </p>
              <p className="font-jetbrains-mono text-sm text-red-400 break-all">
                {this.state.error.message}
              </p>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-atlantean-teal-aqua/20 to-atlantean-teal-deep/20 hover:from-atlantean-teal-aqua/30 hover:to-atlantean-teal-deep/30 border border-atlantean-teal-aqua/50 rounded-lg text-atlantean-teal-aqua font-semibold transition-all duration-300"
          >
            <svg
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * withErrorBoundary Higher-Order Component
 *
 * Wraps a component with an ErrorBoundary.
 *
 * Usage:
 * ```tsx
 * export default withErrorBoundary(YourComponent);
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
