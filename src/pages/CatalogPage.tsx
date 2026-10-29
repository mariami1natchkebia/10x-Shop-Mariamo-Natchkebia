import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products.api'
import ProductGrid from '../components/product/ProductGrid'
import type { Product } from '../types/product'

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function loadProfucts() {
      try {
        const data = await fetchProducts(12, 0)
        if (!ignore) {
          setProducts(data.products)
          setTotal(data.total)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Something went wrong')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadProfucts()

    return () => {
      ignore = true
    }
  }, [])

  function handleAdd(product: Product) {
    alert(`Added to cart: ${product.title}`)
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">Catalog</h1>
        {!loading && !error && <p className="text-sm opacity-70">{total} products</p>}
      </div>

      {loading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p role="status" className="text-base bg-emerald-100 p-10 rounded-lg font-medium text-emerald-800 dark:text-emerald-400 animate-pulse">
            Loading products...
          </p>
        </div>
      )}

      {error && (
        <p role="alert" className="text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} onAdd={handleAdd} />
      )}
    </section>
  )
}

export default CatalogPage