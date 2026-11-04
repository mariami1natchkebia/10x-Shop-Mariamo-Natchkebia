
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err))
  }, [])

  useEffect(() => {
    let ignore = false

    const fetchCall = selectedCategory
      ? fetchProductsByCategory(selectedCategory, 12, 0)
      : fetchProducts(12, 0)

    fetchCall
      .then((data) => {
        if (!ignore) {
          setProducts(data.products)
          setTotal(data.total)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : 'Something went wrong',
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
  }, [selectedCategory])

  useEffect(() => {
    if (!notice) return

    const timer = setTimeout(() => setNotice(null), 2500)

    return () => clearTimeout(timer)
  }, [notice])

  function handleCategoryChange(category: string) {
    setLoading(true)
    setError(null)
    setSelectedCategory(category)
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
    <section className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-bold text-text-primary">
          Catalog
        </h1>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <div className="w-full sm:w-72">
            <CategorySelect
              value={selectedCategory}
              onChange={handleCategoryChange}
              categories={categories}
            />
          </div>

          {!loading && !error && (
            <span className="whitespace-nowrap text-sm font-medium text-text-secondary">
              Showing {products.length} of {total} products
            </span>
          )}
        </div>
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
            onClick={() => handleCategoryChange('')}
            className="min-h-11 text-sm font-medium text-brand-dark underline hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Clear filters
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} onAdd={handleAdd} />
      )}

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
