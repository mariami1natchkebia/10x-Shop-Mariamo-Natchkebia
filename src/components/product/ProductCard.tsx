import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

function ProductCard({ product, onAdd }: ProductCardProps) {
  const hasDiscount = product.discountPercentage >= 1
  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const outOfStock = product.stock === 0
  const lowStock = product.stock > 0 && product.stock <= 5

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm transition-shadow hover:shadow-md dark:border-emerald-500/20 dark:bg-[#243629] dark:text-gray-100">
      <Link to={`/products/${product.id}`} className="block bg-gray-50 dark:bg-[#1b2e23]">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={150}
          height={150}
          loading="lazy"
          className="aspect-square h-40 w-full object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          {product.category}
          {product.brand ? ` · ${product.brand}` : ''}
        </p>

        <h2 className="text-sm font-semibold leading-snug">
          <Link
            to={`/products/${product.id}`}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c]"
          >
            {product.title}
          </Link>
        </h2>

        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <>
              <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                {formatPrice(product.price)}
              </span>
              <span className="rounded bg-green-100 px-1 py-0.5 text-[10px] font-semibold text-green-800">
                −{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </div>

        <p className="text-xs">★ {product.rating.toFixed(1)}</p>

        {outOfStock ? (
          <p className="text-xs font-medium text-red-600 dark:text-red-400">Out of stock</p>
        ) : lowStock ? (
          <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
            Only {product.stock} left!
          </p>
        ) : (
          <p className="text-xs font-medium text-green-700 dark:text-green-400">In stock</p>
        )}

        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={outOfStock}
          className="mt-auto min-h-[36px] rounded-md bg-[#3b4d3c] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2f3e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          {outOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard