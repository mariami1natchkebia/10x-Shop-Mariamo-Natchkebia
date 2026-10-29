import { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api/products.api'
import ProductGrid from '../components/product/ProductGrid'
import CategorySelect from '../components/ui/CategorySelect'
import type { Product, Category } from '../types/product'

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err))
  }, [])

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

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
          setError(err instanceof Error ? err.message : 'Something went wrong')
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

  function handleAdd(product: Product) {
    alert(`Added to cart: ${product.title}`)
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <div className="w-full sm:w-72">
            <CategorySelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              categories={categories}
            />
          </div>

          {!loading && !error && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {total} products
            </span>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p role="status" className="animate-pulse text-base font-medium text-emerald-800 dark:text-emerald-400">
            Loading products...
          </p>
        </div>
      )}

      {error && (
        <p role="alert" className="text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-2 text-gray-600 dark:text-gray-400">No products found.</p>
          <button
            onClick={() => setSelectedCategory('')}
            className="text-sm font-medium text-emerald-700 underline hover:text-emerald-800 dark:text-emerald-400"
          >
            Clear filters
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} onAdd={handleAdd} />
      )}
    </section>
  )
}

export default CatalogPage