import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { discountedPrice, formatPrice } from '../utils/format'

function CartPage() {
  const navigate = useNavigate()
  const { items, totalQuantity, subtotal, setQuantity, removeItem, clearCart } = useCart()

  function handleClear() {
    if (window.confirm('Clear the cart? This cannot be undone.')) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-3 text-2xl font-bold">Cart</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-[#3b4d3c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2f3e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c]"
        >
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        {/* Items */}
        <div>
          <ul className="space-y-3">
            {items.map((item) => {
              const unitPrice = discountedPrice(item.price, item.discountPercentage)

              return (
                <li
                  key={item.productId}
                  className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center dark:border-emerald-500/20 dark:bg-[#243629]"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-md bg-gray-50 object-contain p-1 dark:bg-[#1b2e23]"
                  />

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/products/${item.productId}`}
                      className="font-semibold hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                      {formatPrice(unitPrice)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="h-9 w-9 rounded-lg border border-gray-300 transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-[#2f4a36]"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="h-9 w-9 rounded-lg border border-gray-300 transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-[#2f4a36]"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:w-32 sm:flex-col sm:items-end sm:gap-1">
                    <span className="font-bold">{formatPrice(unitPrice * item.quantity)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={handleClear}
            className="mt-4 text-sm font-medium text-gray-600 underline hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-lg border border-gray-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-[#243629]">
          <h2 className="mb-3 text-lg font-bold">Summary</h2>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Items</dt>
              <dd>{totalQuantity}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-600">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-4 w-full rounded-lg bg-[#3b4d3c] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#2f3e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c]"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </section>
  )
}

export default CartPage