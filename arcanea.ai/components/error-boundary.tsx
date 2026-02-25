"use client";

import { Component, ReactNode } from "react";
import { Icons } from "@/components/icons";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

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
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 animate-ping bg-red-500/20 rounded-full" />
            <div className="relative bg-red-500/10 p-4 rounded-full border border-red-500/30">
              <Icons.AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </div>

          <h3 className="text-xl font-display text-white mb-2 text-center">
            Component Error
          </h3>

          <p className="text-text-muted text-center max-w-md mb-6 font-body">
            This component encountered an unexpected error. Try refreshing to
            continue.
          </p>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <div className="mb-6 p-4 glass-strong rounded-xl max-w-xl w-full">
              <p className="text-xs text-text-disabled font-mono mb-2">
                Error Details:
              </p>
              <p className="text-sm text-red-400 font-mono break-all">
                {this.state.error.message}
              </p>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-arcane-crystal hover:bg-arcane-crystal-bright text-cosmic-void font-display rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(127,255,212,0.3)] hover:shadow-[0_0_30px_rgba(127,255,212,0.5)]"
          >
            <Icons.RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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
