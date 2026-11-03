import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="mb-3 text-3xl font-bold">Page not found</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Go to catalog
      </Link>
    </section>
  )
}

export default NotFoundPage