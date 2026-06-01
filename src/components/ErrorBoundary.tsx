import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
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

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-mesh-light dark:bg-mesh-dark">
        <div className="glass-card w-full max-w-sm p-6 text-center space-y-4 border-rose-200/50 dark:border-rose-800/40">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-glow-sm">
            <AlertTriangle className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Ой, что-то пошло не так
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Компонент не смог отобразиться. Попробуйте обновить страницу или вернитесь на главную.
            </p>
            {import.meta.env.DEV && this.state.message && (
              <p className="mt-3 text-[11px] font-mono text-rose-500/90 break-all">
                {this.state.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/dashboard"
              className="btn-primary w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <Home className="w-4 h-4" />
              Вернуться на главную
            </Link>
            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }
}
