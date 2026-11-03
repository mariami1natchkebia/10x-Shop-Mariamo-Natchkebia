
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products.api'
import type { ProductDetails } from '../types/product'
import { discountedPrice, formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import NotFoundPage from './NotFoundPage'
import Toast from '../components/ui/Toast'

const VALID_ID = /^[1-9]\d*$/

interface Notice {
  id: number
  text: string
  ok: boolean
}

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)

  const isValidId = !!id && VALID_ID.test(id)

  useEffect(() => {
    if (!id || !VALID_ID.test(id)) return
    let ignore = false
    setLoading(true)
    setError(null)
    setActiveImage(0)
    setQty(1)
    setNotice(null)

    fetchProductById(id)
      .then((data) => {
        if (!ignore) setProduct(data)
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Something went wrong')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 2500)
    return () => clearTimeout(timer)
  }, [notice])

  if (!isValidId) return <NotFoundPage />

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p
          role="status"
          className="animate-pulse rounded-lg bg-brand/20 p-8 text-base font-medium text-brand-dark"
        >
          Loading product...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <p role="alert" className="mb-4 text-error">
          {error}
        </p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-base font-medium text-brand-dark underline"
        >
          Back to catalog
        </Link>
      </section>
    )
  }

  if (!product) return <NotFoundPage />

  const hasDiscount = product.discountPercentage >= 1
  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const inStock = product.stock > 0

  function handleAddToCart() {
    if (!product) return
    const result = addItem(product, qty)
    setNotice({ id: Date.now(), text: result.message, ok: result.ok })
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <Link
        to="/"
        className="mb-6 inline-flex min-h-11 items-center text-base font-medium text-brand-dark hover:underline"
      >
        ← Back to catalog
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <img
              src={product.images[activeImage] ?? product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-16 w-16 shrink-0 rounded-xl border-2 bg-surface p-1 ${
                    i === activeImage ? 'border-brand-dark' : 'border-border'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm capitalize text-text-secondary">
            {product.category}
            {product.brand && ` · ${product.brand}`}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-text-primary">{product.title}</h1>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
            <StarIcon />
            <span>{product.rating.toFixed(1)}</span>
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-text-primary">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-text-secondary line-through">{formatPrice(product.price)}</span>
                <span className="rounded-md bg-accent-pink/20 px-2 py-0.5 text-sm font-semibold text-[#A65F70]">
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p
            className={`mt-3 text-sm font-medium ${
              !inStock
                ? 'text-error'
                : product.stock <= 5
                  ? 'text-[#9A7737] dark:text-accent-yellow'
                  : 'text-success'
            }`}
          >
            {!inStock ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left!` : 'In stock'}
          </p>

          <p className="mt-4 text-text-secondary">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={!inStock || qty <= 1}
              aria-label="Decrease quantity"
              className="h-11 w-11 rounded-xl border border-border text-lg text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-text-primary" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              disabled={!inStock || qty >= product.stock}
              aria-label="Increase quantity"
              className="h-11 w-11 rounded-xl border border-border text-lg text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={!inStock}
            onClick={handleAddToCart}
            className="mt-4 min-h-11 w-full rounded-xl bg-brand px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-text-secondary sm:w-auto"
          >
            {inStock ? 'Add to cart' : 'Out of stock'}
          </button>

          <dl className="mt-8 space-y-2 border-t border-border pt-4 text-sm">
            {product.sku && <Row label="SKU" value={product.sku} />}
            {product.warrantyInformation && <Row label="Warranty" value={product.warrantyInformation} />}
            {product.shippingInformation && <Row label="Shipping" value={product.shippingInformation} />}
            {product.returnPolicy && <Row label="Returns" value={product.returnPolicy} />}
          </dl>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-text-primary">Reviews ({product.reviews.length})</h2>
          <ul className="space-y-3">
            {product.reviews.map((r) => (
              <li
                key={`${r.reviewerName}-${r.date}`}
                className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-text-primary">{r.reviewerName}</span>
                  <span
                    role="img"
                    aria-label={`${r.rating} out of 5`}
                    className="flex items-center gap-0.5"
                  >
                    {Array.from({ length: r.rating }, (_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{r.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {notice && <Toast key={notice.id} message={notice.text} ok={notice.ok} />}
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 font-medium text-text-secondary">{label}</dt>
      <dd className="text-text-primary">{value}</dd>
    </div>
  )
}

function StarIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 360"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        fill="#A9BB8C"
        stroke="#849B68"
        strokeWidth="20"
        d="m203.8 43.5 20.2 62.1a25 25 0 0 0 23.8 17.3h65.3a25 25 0 0 1 14.7 45.2L275 206.5a25 25 0 0 0-9.1 28l20.2 62.1a25 25 0 0 1-38.5 28l-52.8-38.4a25 25 0 0 0-29.4 0l-52.8 38.4a25 25 0 0 1-38.5-28l20.2-62.1a25 25 0 0 0-9.1-28l-52.8-38.4a25 25 0 0 1 14.7-45.2h65.3c10.8 0 20.4-7 23.8-17.3l20.2-62.1a25 25 0 0 1 47.6 0Z"
      />
    </svg>
  )
}

export default ProductPage
