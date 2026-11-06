import { useState, type FormEvent } from 'react'

function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubscribed(true)
    e.currentTarget.reset()
  }

  return (
    <footer className="border-t border-border bg-surface px-6 py-6 font-sans text-text-primary transition-colors duration-250">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm md:flex-row">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <h2 className="font-serif font-semibold uppercase tracking-widest">
            10x-shop
          </h2>
          <span className="hidden text-text-secondary md:inline" aria-hidden="true">|</span>
          <p className="max-w-xs text-xs text-text-secondary">
            Subscribe for shop updates.
          </p>
        </div>

        <div className="w-full max-w-sm md:w-auto">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>

            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              onChange={() => setSubscribed(false)}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-text-primary outline-none placeholder:text-text-secondary focus:border-border-hover"
            />

            <button
              type="submit"
              className="min-h-11 whitespace-nowrap rounded-lg bg-brand px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#354137] transition-colors hover:bg-brand-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Sign Up
            </button>
          </form>

          {subscribed && (
            <p role="status" className="mt-2 text-xs text-success">
              Thanks for subscribing!
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 text-xs text-text-secondary md:flex-row">
          <p>Terms • Privacy • Refund</p>
          <span className="hidden md:inline" aria-hidden="true">|</span>
          <div>© 2026 10x-shop by Maro.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer