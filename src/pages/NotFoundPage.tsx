import { Link } from 'react-router-dom'
import notFoundImage from "../assets/404.png";

function NotFoundPage() {
  return (
    <section className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 max-w-sm">
        <img
            src={notFoundImage}
            alt="404 Not Found"
            className="mx-auto w-full max-w-xs rounded-3xl"
        />
    </div>

      <h1 className="mb-3 text-3xl font-bold text-text-primary">Page not found</h1>
      <p className="mb-6 text-text-secondary">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Go to catalog
      </Link>
    </section>
  )
}

export default NotFoundPage