import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught render error', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-10"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-10 text-center shadow-lg">
            <h1 className="mb-3 text-2xl font-bold text-text-primary">
              Something went wrong.
            </h1>

            <p className="mb-8 text-sm leading-6 text-text-secondary">
              We&apos;re sorry, but something unexpected happened. Please try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-11 cursor-pointer rounded-xl bg-brand px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary