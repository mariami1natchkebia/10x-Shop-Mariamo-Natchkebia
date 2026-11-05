import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import ScrollToTop from './Scrolltotop'
import ErrorBoundary from '../ErrorBoundary'

function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen">
      <ScrollToTop />
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1">
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout