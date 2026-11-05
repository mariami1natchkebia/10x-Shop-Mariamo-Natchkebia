
import { useEffect, useState } from 'react'
import heroImage from '../assets/hero-image.jpg'
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../api/products.api'
import ProductGrid from '../components/product/ProductGrid'
import CategorySelect from '../components/ui/CategorySelect'
import Toast from '../components/ui/Toast'
import { useCart } from '../context/useCart'
import type { Product, Category } from '../types/product'

interface Notice {
  id: number
  text: string
  ok: boolean
}

function CatalogPage() {
  const { addItem } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 12
  const totalPages = Math.ceil(total / limit) || 1

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err))
  }, [])

  useEffect(() => {
    let ignore = false
    setLoading(true)

    const skip = (currentPage - 1) * limit
    const fetchCall = selectedCategory
      ? fetchProductsByCategory(selectedCategory, limit, skip)
      : fetchProducts(limit, skip)

    fetchCall
      .then((data) => {
        if (!ignore) {
          let filteredProducts = data.products

          if (minPrice !== '') {
            filteredProducts = filteredProducts.filter(
              (p: Product) => p.price >= Number(minPrice)
            )
          }

          if (maxPrice !== '') {
            filteredProducts = filteredProducts.filter(
              (p: Product) => p.price <= Number(maxPrice)
            )
          }

          if (onlyDiscounted) {
            filteredProducts = filteredProducts.filter(
              (product) => product.discountPercentage > 0
            )
          }

          setProducts(filteredProducts)
          setTotal(data.total)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : 'Something went wrong'
          )
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [selectedCategory, currentPage, minPrice, maxPrice, onlyDiscounted])

  useEffect(() => {
    if (!notice) return

    const timer = setTimeout(() => setNotice(null), 2500)

    return () => clearTimeout(timer)
  }, [notice])

  function handleCategoryChange(category: string) {
    setCurrentPage(1)
    setError(null)
    setSelectedCategory(category)
  }

  function handleClearFilters() {
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setOnlyDiscounted(false)
    setCurrentPage(1)
  }

  function handleAdd(product: Product) {
    const result = addItem(product, 1)

    setNotice({
      id: Date.now(),
      text: result.message,
      ok: result.ok,
    })
  }

  return (
    <section className="container mx-auto px-6 py-6">

      {/* Hero Banner */}
      <div className="mb-8 flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-surface-secondary p-8 md:flex-row md:p-12 border border-border">
        <div className="mb-6 max-w-lg md:mb-0">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Elevate Your Everyday
          </h1>

          <p className="mb-6 text-base text-text-secondary">
            Discover quality products across every category – made for the way you live.
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-xl bg-brand px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-brand-dark"
          >
            Shop Now →
          </button>
        </div>

        <div className="w-full max-w-md">
          <img
            src={heroImage}
            alt="Hero Banner Product"
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 mt-13.5 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-text-primary">
            Filters
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Category
            </label>

            <div className="rounded-xl bg-surface border border-border shadow-sm">
              <CategorySelect
                value={selectedCategory}
                onChange={handleCategoryChange}
                categories={categories}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Price Range
            </label>

            <div className="flex items-center gap-2">
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                autoComplete="off"
                aria-label="Minimum price"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:border-brand focus:outline-none"
              />

              <span className="text-text-secondary">-</span>

              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                autoComplete="off"
                aria-label="Maximum price"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-text-primary select-none">
              <input
                id="onlyDiscounted"
                name="onlyDiscounted"
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => {
                  setOnlyDiscounted(e.target.checked)
                  setCurrentPage(1)
                }}
                className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand"
              />

              Discounted only
            </label>
          </div>

          {(selectedCategory || minPrice || maxPrice || onlyDiscounted) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full rounded-xl border border-border py-2 text-sm font-medium text-brand-dark hover:bg-surface-secondary"
            >
              Clear filters
            </button>
          )}
        </aside>

        <div>
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h2 className="text-2xl font-bold text-text-primary">
              Catalog
            </h2>

            {!loading && !error && (
              <span className="whitespace-nowrap text-sm font-medium text-text-secondary">
                Showing {products.length} of {total} products
              </span>
            )}
          </div>

          {loading && (
            <div className="flex min-h-[40vh] items-center justify-center">
              <p
                role="status"
                className="animate-pulse text-base font-medium text-brand-dark"
              >
                Loading products...
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="text-error">
              {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="py-12 text-center">
              <p className="mb-2 text-text-secondary">
                No products found.
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
                className="min-h-11 text-sm font-medium text-brand-dark underline hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Clear filters
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <ProductGrid products={products} onAdd={handleAdd} />

              <div className="mt-10 flex items-center justify-center gap-2 py-4">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-primary hover:border-brand disabled:opacity-40"
                  aria-label="Previous Page"
                >
                  ←
                </button>

                {Array.from(
                  { length: Math.min(totalPages, 10) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-brand text-text-primary'
                        : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-primary hover:border-brand disabled:opacity-40"
                  aria-label="Next Page"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {notice && (
        <Toast
          key={notice.id}
          message={notice.text}
          ok={notice.ok}
        />
      )}
    </section>
  )
}

export default CatalogPage