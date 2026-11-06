import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useCart } from '../../context/useCart'
import shopLogo from '../../assets/10x-shop-logo.png'


const THEME_KEY = 'shop_theme'

function readStoredTheme(): boolean {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark'
  } catch {
    return false
  }
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(readStoredTheme)

  const { totalQuantity } = useCart()
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const cartBadge = totalQuantity > 0 && (
    <span
      aria-label={`${totalQuantity} items in cart`}
      className="ml-1.5 rounded-full bg-brand px-1.5 py-0.5 text-xs font-semibold text-[#354137]"
    >
      {totalQuantity}
    </span>
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)

    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    } catch {
      // storage unavailable - theme still works for this session
    }
  }, [isDark])

  const linkClass =
    'flex min-h-[44px] items-center px-2 text-text-primary transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark'

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkClass} ${isActive ? 'font-bold underline underline-offset-4 decoration-brand-dark' : ''}`

  const themeToggle = (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-text-primary transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )

  return (
    <header className="relative z-40 border-b border-border bg-surface px-4 py-1.5 shadow-sm transition-colors sm:px-6">
      <nav className="flex items-center justify-between">
        <Link
        to="/"
        aria-label="10X Shop, go to catalog"
        className="flex h-full shrink-0 items-center"
        >
        <img
            src={shopLogo}
            alt="10X Shop Logo"
            className="h-12 w-auto object-contain sm:h-14"
        />
        </Link>

        <div className="hidden items-center gap-2 text-sm font-medium sm:flex sm:gap-4 sm:text-base">
          <NavLink to="/" end className={navLinkClass}>Catalog</NavLink>
          <NavLink to="/cart" className={navLinkClass}>Cart{cartBadge}</NavLink>
          {isLoggedIn ? (
            <button type="button" onClick={handleLogout} className={linkClass}>Log out</button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>Log in</NavLink>
          )}
          {themeToggle}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          {themeToggle}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-text-primary transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M8,7H22.5a1.5,1.5,0,0,0,0-3H8A1.5,1.5,0,0,0,8,7Z"/>
                <path d="M22.5,11H8a1.5,1.5,0,0,0,0,3H22.5a1.5,1.5,0,0,0,0-3Z"/>
                <path d="M22.5,18H8a1.5,1.5,0,0,0,0,3H22.5a1.5,1.5,0,0,0,0-3Z"/>
                <circle cx="2.5" cy="5.5" r="2.5"/>
                <circle cx="2.5" cy="12" r="2.5"/>
                <circle cx="2.5" cy="19" r="2.5"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col border-b border-border bg-surface px-6 py-4 shadow-md sm:hidden">
          <NavLink to="/" end onClick={() => setIsOpen(false)} className={navLinkClass}>Catalog</NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)} className={navLinkClass}>Cart{cartBadge}</NavLink>
          {isLoggedIn ? (
            <button type="button" onClick={handleLogout} className={linkClass}>Log out</button>
          ) : (
            <NavLink to="/login" onClick={() => setIsOpen(false)} className={navLinkClass}>Log in</NavLink>
          )}
        </div>
      )}
    </header>
  )
}

export default Header