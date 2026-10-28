import { Link } from 'react-router-dom'
import logo from '../../assets/10x-shop-logo.svg'

function Header() {
  const linkClass =
    'flex min-h-[44px] items-center px-2 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

  return (
    <header className="border-b bg-white px-4 py-3 shadow-sm sm:px-6">
      <nav className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="10X Shop"
            width={160}
            height={48}
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 sm:gap-4 sm:text-base">
          <Link to="/" className={linkClass}>Catalog</Link>
          <Link to="/cart" className={linkClass}>Cart</Link>
          <Link to="/login" className={linkClass}>Log in</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header