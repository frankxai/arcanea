'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

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
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
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
            <div className="absolute inset-0 animate-pulse blur-xl bg-fire/20 rounded-full" />
            <div className="relative bg-fire/10 p-4 rounded-full border border-fire/30">
              <AlertCircle className="w-12 h-12 text-fire" />
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold text-crystal mb-2 text-center">
            Something Unexpected Happened
          </h3>

          <p className="text-neutral-400 text-center max-w-md mb-6">
            This component encountered an error. Try refreshing to restore normal operation.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mb-6 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg max-w-xl w-full">
              <p className="font-jetbrains-mono text-xs text-neutral-500 mb-2">Error:</p>
              <p className="font-jetbrains-mono text-sm text-red-400 break-all">
                {this.state.error.message}
              </p>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-crystal/20 to-crystal-deep/20 hover:from-crystal/30 hover:to-crystal-deep/30 border border-crystal/50 rounded-lg text-crystal font-semibold transition-all duration-300"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
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
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
