
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
  `min-h-[44px] w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 ${
    hasError ? 'border-error' : 'border-border hover:border-brand-dark'
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
    <section className="container mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold text-text-primary">Log in</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4 rounded-lg border border-border bg-surface-secondary p-5"
      >
        <div>
          <label htmlFor="login-username" className="mb-1 block text-sm font-medium text-text-primary">
            Username
          </label>
          <input
            id="login-username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            aria-invalid={!!usernameError}
            aria-describedby={usernameError ? 'login-username-error' : undefined}
            className={inputClass(!!usernameError)}
          />
          {usernameError && (
            <p id="login-username-error" className="mt-1 text-xs text-error">
              {usernameError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-text-primary">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'login-password-error' : undefined}
            className={inputClass(!!passwordError)}
          />
          {passwordError && (
            <p id="login-password-error" className="mt-1 text-xs text-error">
              {passwordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="min-h-11 w-full rounded-lg bg-brand px-4 py-3 font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Log In
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-base font-medium text-brand-dark underline hover:text-text-primary"
        >
          ← Back to catalog
        </Link>
      </p>
    </section>
  )
}

export default LoginPage