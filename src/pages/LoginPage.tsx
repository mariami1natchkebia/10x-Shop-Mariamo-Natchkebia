import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

interface LoginErrors {
  username?: string
  password?: string
}

function validateLogin(username: string, password: string): LoginErrors {
  const errors: LoginErrors = {}

  if (username.trim().length === 0) {
    errors.username = 'Username is required'
  }

  if (password.length === 0) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

function getRedirectPath(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'string'
  ) {
    return state.from
  }
  return '/'
}

const inputClass = (hasError: boolean) =>
  `min-h-[48px] w-full rounded-2xl border bg-surface-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 ${
    hasError ? 'border-error' : 'border-transparent hover:border-border'
  }`

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ username: false, password: false })
  const [submitted, setSubmitted] = useState(false)

  const errors = validateLogin(username, password)
  const usernameError = touched.username || submitted ? errors.username : undefined
  const passwordError = touched.password || submitted ? errors.password : undefined

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)

    if (errors.username || errors.password) return

    login(username.trim())
    navigate(getRedirectPath(location.state), { replace: true })
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-surface p-8 shadow-sm border border-border">
        <h1 className="mb-6 text-center text-3xl font-bold text-text-primary">Login</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="login-username" className="sr-only">
              Username
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              placeholder="Email address / Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              aria-invalid={!!usernameError}
              aria-describedby={usernameError ? 'login-username-error' : undefined}
              className={inputClass(!!usernameError)}
            />
            {usernameError && (
              <p id="login-username-error" className="ml-2 mt-1 text-xs text-error">
                {usernameError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'login-password-error' : undefined}
              className={inputClass(!!passwordError)}
            />
            {passwordError && (
              <p id="login-password-error" className="ml-2 mt-1 text-xs text-error">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="min-h-[48px] w-full rounded-full bg-brand px-4 py-3 font-semibold text-text-primary transition-colors hover:bg-brand-dark"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link
            to="/"
            className="text-sm font-medium text-brand-dark underline hover:text-text-primary"
          >
            Back to catalog
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage