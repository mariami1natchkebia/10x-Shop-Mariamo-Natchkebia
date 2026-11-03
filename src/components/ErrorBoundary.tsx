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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <span className="text-4xl">⚠️</span>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-slate-900">
                Oops! Something went wrong.
            </h1>

            <p className="mb-8 text-sm leading-6 text-slate-500">
                We're sorry, but something unexpected happened.
                Please try again.
            </p>

            <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                Reload page
                </button>
            </div>
        </div>
    )
    }
    return this.props.children
  }

}

export default ErrorBoundary