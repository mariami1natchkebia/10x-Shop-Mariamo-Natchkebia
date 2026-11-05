import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { discountedPrice, formatPrice } from '../utils/format'
import { FREE_SHIPPING_FROM, getShippingCost } from '../utils/orders'

function CartPage() {
  const navigate = useNavigate()
  const { items, totalQuantity, subtotal, setQuantity, removeItem, clearCart } = useCart()
  const [confirmingClear, setConfirmingClear] = useState(false)

  const shippingCost = getShippingCost(subtotal)
  const total = subtotal + shippingCost
  const remainingForFree = FREE_SHIPPING_FROM - subtotal

  function handleConfirmClear() {
    clearCart()
    setConfirmingClear(false)
  }

  if (items.length === 0) {
    return (
      <section className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
        {/* ცარიელი კალათის კონტეინერი გამჭვირვალე/მუქი დივით */}
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface/55 p-10 text-center backdrop-blur-md shadow-lg">
          <h1 className="mb-3 text-3xl font-bold text-text-primary">Cart</h1>
          <p className="mb-6 text-text-secondary">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Browse products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-6">
      {/* მთავარი კალათის კონტეინერი შემოკრული გამჭვირვალე/მუქი დივით */}
      <div className="rounded-3xl border border-border bg-surface/55 p-6 backdrop-blur-md shadow-lg sm:p-8">
        <h1 className="mb-6 text-2xl font-bold text-text-primary">Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <ul className="space-y-3">
              {items.map((item) => {
                const unitPrice = discountedPrice(item.price, item.discountPercentage)

                return (
                  <li
                    key={item.productId}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/80 p-3 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="h-20 w-20 shrink-0 rounded-xl bg-surface-secondary object-contain p-1"
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/products/${item.productId}`}
                        className="font-semibold text-text-primary hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-text-secondary">
                        {formatPrice(unitPrice)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="h-11 w-11 rounded-xl border border-border text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold text-text-primary" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="h-11 w-11 rounded-xl border border-border text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:w-32 sm:flex-col sm:items-end sm:gap-1">
                      <span className="font-bold text-text-primary">{formatPrice(unitPrice * item.quantity)}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="min-h-11 text-sm font-medium text-error hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 min-h-[44px]">
              {confirmingClear ? (
                <div
                  role="alertdialog"
                  aria-label="Confirm clearing the cart"
                  className="flex flex-wrap items-center gap-3 text-sm"
                >
                  <span className="font-medium text-error">
                    Remove all items from the cart?
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmClear}
                    className="min-h-11 rounded-xl bg-error px-3 py-1.5 font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                  >
                    Yes, clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(false)}
                    className="min-h-11 rounded-xl border border-border px-3 py-1.5 font-medium text-text-primary transition-colors hover:bg-surface-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingClear(true)}
                  className="min-h-11 text-sm font-medium text-text-secondary underline hover:text-error"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface/80 p-4">
            <h2 className="mb-3 text-lg font-bold text-text-primary">Summary</h2>

            <dl className="space-y-2 text-sm text-text-primary">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Items</dt>
                <dd>{totalQuantity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Shipping</dt>
                <dd>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            {shippingCost > 0 && (
              <p className="mt-3 text-xs text-text-secondary">
                Add {formatPrice(remainingForFree)} more for free shipping.
              </p>
            )}

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-4 min-h-11 w-full rounded-xl bg-brand px-4 py-3 font-semibold text-text-primary transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Proceed to checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CartPage