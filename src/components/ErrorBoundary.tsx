import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  /** Nested boundary: compact reset without full-page chrome */
  nested?: boolean
}

interface State {
  hasError: boolean
  message: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    const card = (
      <div className="glass-card w-full max-w-sm card-pad text-center space-y-4 border-rose-200/50 dark:border-rose-800/40">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-glow-sm">
          <AlertTriangle className="w-7 h-7 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-title text-slate-900 dark:text-slate-50">
            Oops, something went wrong
          </h1>
          <p className="mt-2 text-body-muted leading-relaxed">
            This screen failed to load. Reload the page or return to the home screen.
          </p>
          <p className="mt-1 text-body-muted text-sm opacity-80">
            Ой, что-то пошло не так. Обновите страницу или вернитесь на главную.
          </p>
          {import.meta.env.DEV && this.state.message && (
            <p className="mt-3 text-[11px] font-mono text-rose-600 dark:text-rose-400 break-all">
              {this.state.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={this.handleReload}
            className="btn-primary w-full h-11 flex items-center justify-center gap-2 text-base"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
          <Link
            to="/dashboard"
            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-body font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home / Главная
          </Link>
          {!this.props.nested && (
            <button
              type="button"
              onClick={this.handleRetry}
              className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              Try again without reload
            </button>
          )}
        </div>
      </div>
    )

    if (this.props.nested) {
      return <div className="p-4">{card}</div>
    }

    return (
      <div className="page-shell min-h-screen flex items-center justify-center p-6 bg-mesh-light dark:bg-mesh-dark">
        {card}
      </div>
    )
  }
}
