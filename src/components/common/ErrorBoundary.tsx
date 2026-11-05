import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallbackTitle?: string
  fallback?: ReactNode
  onReset?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center min-h-[360px] bg-slate-900/40 rounded-2xl border border-slate-700/40 backdrop-blur-sm shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {this.props.fallbackTitle || 'Something went wrong'}
          </h3>

          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || 'An unexpected error occurred while loading this view.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>

            <a
              href="/student/learning"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 text-sm font-semibold border border-slate-700/60 shadow-md transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              Back to Learning
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

