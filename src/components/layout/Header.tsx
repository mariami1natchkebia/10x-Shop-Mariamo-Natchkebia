import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/10x-shop-logo.svg'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const linkClass =
    'flex min-h-[44px] items-center px-2 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

  return (
    <header className="relative border-b bg-white px-4 py-3 shadow-sm sm:px-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="10X Shop"
            width={160}
            height={48}
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <div className="hidden items-center gap-2 text-sm font-medium text-gray-700 sm:flex sm:gap-4 sm:text-base">
          <Link to="/" className={linkClass}>Catalog</Link>
          <Link to="/cart" className={linkClass}>Cart</Link>
          <Link to="/login" className={linkClass}>Log in</Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-gray-700 sm:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          aria-label="Toggle menu"
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
      </nav>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col border-b bg-white px-6 py-4 shadow-md sm:hidden">
          <Link to="/" onClick={() => setIsOpen(false)} className={linkClass}>Catalog</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className={linkClass}>Cart</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className={linkClass}>Log in</Link>
        </div>
      )}
    </header>
  )
}

export default Header