import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'


function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const { totalQuantity } = useCart()

    const cartBadge = totalQuantity > 0 && (
    <span
        aria-label={`${totalQuantity} items in cart`}
        className="ml-1.5 rounded-full bg-[#3b4d3c] px-1.5 py-0.5 text-xs font-semibold text-white dark:bg-[#a8e6cf] dark:text-[#3b4d3c]"
    >
        {totalQuantity}
    </span>
    )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const linkClass =
    'flex min-h-[44px] items-center px-2 text-[#3b4d3c] dark:text-[#a8e6cf] transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

  const mobileLinkClass =
    'flex min-h-[44px] items-center px-2 text-[#3b4d3c] dark:text-[#a8e6cf] transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

  const themeToggle = (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-[#3b4d3c] dark:text-[#a8e6cf] transition-colors hover:bg-emerald-900/10 dark:hover:bg-emerald-100/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
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
    <header className="relative border-b border-emerald-900/10 bg-[#a8e6cf] px-4 py-3 shadow-sm transition-colors dark:border-emerald-500/20 dark:bg-[#3b4d3c] sm:px-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024.000000 1024.000000"
            preserveAspectRatio="xMidYMid meet"
            className="h-10 w-auto fill-current text-[#3b4d3c] dark:text-[#a8e6cf] transition-colors sm:h-12"
          >
            <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" stroke="none">
              <path d="M6775 7444 c-38 -7 -211 -39 -383 -71 l-313 -57 123 -123 123 -123 -1145 -1145 -1145 -1145 1098 0 1097 0 0 115 0 115 -809 2 -809 3 938 945 938 945 124 -122 123 -123 69 383 c37 210 70 390 73 400 5 20 -3 20 -102 1z"/>
              <path d="M3370 6775 l0 -115 284 0 284 0 11 -32 c5 -18 57 -179 114 -358 58 -179 139 -432 181 -562 42 -131 80 -238 84 -238 9 0 982 973 982 983 0 4 -71 7 -157 7 l-158 0 -282 -282 c-155 -155 -284 -280 -286 -278 -4 4 -148 448 -295 908 l-26 82 -368 0 -368 0 0 -115z"/>
              <path d="M6305 6448 c-3 -7 -32 -101 -64 -208 -33 -107 -100 -325 -150 -485 l-89 -290 -347 -3 -348 -2 -109 -113 -109 -112 538 -3 c295 -1 540 1 544 5 3 5 20 53 37 108 16 55 100 325 186 601 86 276 156 504 156 508 0 3 -54 6 -120 6 -87 0 -122 -3 -125 -12z"/>
              <path d="M4847 4738 c-54 -15 -112 -73 -127 -127 -32 -121 52 -230 178 -231 59 0 95 15 133 57 39 42 49 66 49 124 0 122 -115 209 -233 177z"/>
              <path d="M5795 4745 c-5 -2 -22 -6 -37 -9 -63 -14 -128 -103 -128 -176 0 -155 194 -239 310 -134 46 42 64 89 58 155 -6 58 -39 110 -88 138 -35 19 -96 33 -115 26z"/>
              <path d="M3220 3940 c-70 -12 -115 -35 -170 -86 -166 -156 -175 -516 -15 -692 19 -21 58 -51 87 -67 44 -24 68 -30 140 -33 108 -5 171 14 238 75 200 180 177 621 -40 758 -65 41 -160 59 -240 45z m140 -165 c62 -32 101 -138 101 -274 0 -129 -20 -193 -77 -250 l-44 -43 -66 4 c-63 4 -69 6 -105 45 -52 56 -73 131 -72 253 2 221 119 339 263 265z"/>
              <path d="M5680 3510 l0 -441 81 3 80 3 3 203 c3 222 5 228 69 276 36 26 109 26 145 -1 48 -36 52 -53 52 -275 l0 -208 86 0 86 0 -4 243 c-3 229 -4 244 -26 285 -47 87 -160 135 -270 113 -55 -11 -122 -45 -122 -62 0 -5 -4 -9 -9 -9 -4 0 -8 69 -9 153 l0 152 -81 3 -81 3 0 -441z"/>
              <path d="M5087 3926 c-60 -22 -114 -62 -144 -108 -23 -34 -29 -55 -31 -118 -8 -155 56 -213 303 -276 130 -33 169 -60 169 -117 0 -83 -103 -128 -217 -96 -46 12 -110 68 -127 110 -10 24 -17 29 -34 24 -12 -3 -43 -12 -69 -19 -27 -7 -53 -18 -58 -23 -14 -14 37 -107 83 -149 71 -64 138 -88 258 -92 90 -3 114 -1 163 18 138 52 202 170 163 302 -28 98 -100 146 -290 194 -104 26 -159 52 -170 80 -13 33 -6 84 14 104 72 72 222 46 276 -47 20 -32 31 -42 43 -38 9 4 41 16 71 27 30 11 57 22 58 24 2 1 -9 26 -24 54 -60 110 -156 160 -307 160 -51 -1 -109 -7 -130 -14z"/>
              <path d="M2420 3860 l0 -70 38 -1 c20 0 60 -1 87 -2 l50 -2 3 -357 2 -358 80 0 80 0 0 408 c0 224 3 417 6 430 l6 22 -176 0 -176 0 0 -70z"/>
              <path d="M6642 3710 c-59 -12 -137 -57 -174 -99 -84 -95 -107 -247 -55 -363 30 -68 86 -126 153 -159 42 -21 63 -24 154 -24 91 0 112 3 155 25 112 55 175 160 176 294 1 136 -61 240 -174 295 -69 34 -162 46 -235 31z m163 -161 c66 -39 96 -135 71 -222 -51 -176 -278 -166 -315 14 -13 61 -8 93 21 151 40 81 141 106 223 57z"/>
              <path d="M7448 3707 c-26 -8 -63 -26 -82 -41 l-36 -27 0 30 0 31 -80 0 -80 0 0 -430 0 -430 85 0 85 0 0 139 0 140 58 -30 c53 -29 63 -31 143 -27 70 3 94 9 131 31 118 69 177 199 157 347 -26 189 -207 316 -381 267z m134 -153 c92 -47 108 -236 27 -311 -110 -101 -273 -12 -272 148 2 143 125 224 245 163z"/>
              <path d="M3762 3613 c34 -49 81 -114 105 -147 24 -32 43 -64 43 -71 0 -7 -35 -62 -78 -122 -43 -59 -92 -129 -110 -155 l-33 -48 98 0 98 0 63 95 c34 52 66 95 70 95 5 0 37 -43 73 -95 l64 -94 98 -1 c53 0 97 2 97 5 0 2 -51 75 -114 161 l-115 156 103 142 c57 79 106 148 110 154 5 9 -19 12 -88 12 l-95 0 -62 -90 c-34 -49 -65 -90 -68 -90 -3 0 -33 41 -66 90 l-60 89 -97 1 -98 0 62 -87z"/>
              <path d="M4400 3420 l0 -70 189 0 c122 0 192 4 196 11 4 5 4 37 0 70 l-7 59 -189 0 -189 0 0 -70z"/>
            </g>
          </svg>
        </Link>

        <div className="hidden items-center gap-2 text-sm font-medium sm:flex sm:gap-4 sm:text-base">
            <Link to="/" className={linkClass}>Catalog</Link>
            <Link to="/cart" className={linkClass}>Cart{cartBadge}</Link>          <Link to="/login" className={linkClass}>Log in</Link>
            {themeToggle}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          {themeToggle}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-[#3b4d3c] dark:text-[#a8e6cf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
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
        </div>
      </nav>

        {isOpen && (
            <div className="absolute left-0 top-full z-50 flex w-full flex-col border-b border-emerald-900/10 bg-[#a8e6cf] px-6 py-4 shadow-md dark:border-emerald-500/20 dark:bg-[#3b4d3c] sm:hidden">
                <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Catalog</Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Cart{cartBadge}</Link>          <Link to="/login" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Log in</Link>
            </div>
        )}
    </header>
  )
}

export default Header