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
    <article className="flex flex-col overflow-hidden rounded-md border border-border bg-surface text-text-primary shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block bg-surface-secondary">
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
        <p className="text-xs capitalize text-text-secondary">
          {product.category.replace(/-/g, ' ')}
          {product.brand ? ` · ${product.brand}` : ''}
        </p>

        <h2 className="text-sm font-semibold leading-snug">
          <Link
            to={`/products/${product.id}`}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {product.title}
          </Link>
        </h2>

        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <>
              <span className="text-xs text-text-secondary line-through">
                {formatPrice(product.price)}
              </span>
              <span className="rounded bg-accent-pink/20 px-1 py-0.5 text-xs font-semibold text-[#fc557d]">
                −{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </div>

        <p className="text-xs text-text-secondary">★ {product.rating.toFixed(1)}</p>

        {outOfStock ? (
          <p className="text-xs font-medium text-error">Out of stock</p>
        ) : lowStock ? (
          <p className="text-xs font-medium text-[#9A7737] dark:text-accent-yellow">
            Only {product.stock} left!
          </p>
        ) : (
          <p className="text-xs font-medium text-success">In stock</p>
        )}

        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={outOfStock}
          className="mt-auto min-h-11 rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-text-secondary"
        >
          {outOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard