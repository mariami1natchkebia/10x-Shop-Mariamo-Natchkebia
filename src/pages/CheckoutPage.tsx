import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Order, ShippingInfo } from '../types/order'
import { discountedPrice, formatPrice } from '../utils/format'
import { getNextOrderNumber, getShippingCost, saveOrder } from '../utils/orders'
import { validateShipping } from '../utils/checkoutValidation'

const COUNTRIES = [
  'Georgia',
  'Armenia',
  'Azerbaijan',
  'Turkey',
  'Germany',
  'France',
  'United Kingdom',
  'United States',
]

const INITIAL_VALUES: ShippingInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Georgia',
}

type TouchedFields = Partial<Record<keyof ShippingInfo, boolean>>

interface FieldProps {
  label: string
  name: keyof ShippingInfo
  value: string
  error?: string
  type?: string
  autoComplete?: string
  options?: string[]
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function Field({
  label,
  name,
  value,
  error,
  type = 'text',
  autoComplete,
  options,
  onChange,
  onBlur,
}: FieldProps) {
  const id = `checkout-${name}`
  const errorId = `${id}-error`
  
  const className = `min-h-[38px] w-full rounded-md border bg-white px-3 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:bg-[#1b2e23] ${
    error
      ? 'border-red-500'
      : 'border-emerald-700/60 hover:border-emerald-800 dark:border-emerald-500/50'
  }`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 inline-block pb-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-700/80 dark:text-emerald-300 dark:border-emerald-500/70"
      >
        {label}
      </label>

      {options ? (
        <select
          id={id}
          name={name}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={className}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={className}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

interface ToastMessage {
  id: number
  text: string
  type: 'success' | 'error'
}

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [values, setValues] = useState<ShippingInfo>(INITIAL_VALUES)
  const [touched, setTouched] = useState<TouchedFields>({})
  const [submitted, setSubmitted] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const timerRef = useRef<number | null>(null)
  const toastTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  function showToast(text: string, type: 'success' | 'error') {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
    setToast({ id: Date.now(), text, type })
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  const errors = validateShipping(values)
  const hasErrors = Object.keys(errors).length > 0
  const shippingCost = getShippingCost(subtotal)
  const total = subtotal + shippingCost

  function errorFor(name: keyof ShippingInfo): string | undefined {
    return touched[name] || submitted ? errors[name] : undefined
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.name as keyof ShippingInfo
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (placing) return

    setSubmitted(true)
    setSubmitError(null)
    if (hasErrors) {
      showToast('Please fix the errors in the form before submitting.', 'error')
      return
    }

    setPlacing(true)

    timerRef.current = window.setTimeout(() => {
      const order: Order = {
        id: Date.now(),
        number: getNextOrderNumber(),
        items,
        shipping: {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          address: values.address.trim(),
          city: values.city.trim(),
          postalCode: values.postalCode.trim(),
          country: values.country,
        },
        subtotal,
        discount: 0,
        shippingCost,
        total,
        placedAt: new Date().toISOString(),
      }

      if (!saveOrder(order)) {
        const errorMsg = 'Could not save your order. Please try again.'
        setSubmitError(errorMsg)
        showToast(errorMsg, 'error')
        setPlacing(false)
        return
      }

      showToast('Payment successful! Your order has been placed.', 'success')
      setPlacedOrder(order)
      clearCart()
      setPlacing(false)
    }, 600)
  }

  if (placedOrder) {
    return (
      <section className="container mx-auto max-w-2xl px-4 py-10 relative">
        {toast && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            <span>{toast.text}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 rounded p-1 text-white/80 hover:bg-black/10 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        )}
        <div
          role="status"
          className="rounded-lg border border-emerald-600/30 bg-emerald-50 p-6 dark:bg-[#243629]"
        >
          <h1 className="text-2xl font-bold">Thank you! Your order has been placed.</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Order <span className="font-semibold">#{placedOrder.number}</span>
          </p>

          <ul className="mt-4 space-y-1 border-t border-emerald-600/20 pt-4 text-sm">
            {placedOrder.items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>
                  {formatPrice(
                    discountedPrice(item.price, item.discountPercentage) * item.quantity,
                  )}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-1 border-t border-emerald-600/20 pt-4 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(placedOrder.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{placedOrder.shippingCost === 0 ? 'Free' : formatPrice(placedOrder.shippingCost)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(placedOrder.total)}</dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-emerald-600/20 pt-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium">Shipping to</p>
            <p>{placedOrder.shipping.fullName}</p>
            <p>
              {placedOrder.shipping.address}, {placedOrder.shipping.city},{' '}
              {placedOrder.shipping.postalCode}
            </p>
            <p>{placedOrder.shipping.country}</p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-[#3b4d3c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2f3e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c]"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <section className="container mx-auto px-4 py-6 relative">
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          <span>{toast.text}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 rounded p-1 text-white/80 hover:bg-black/10 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="mb-2 text-lg font-bold">Contact</legend>

            <Field
              label="Full name"
              name="fullName"
              value={values.fullName}
              error={errorFor('fullName')}
              autoComplete="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errorFor('email')}
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={values.phone}
              error={errorFor('phone')}
              autoComplete="tel"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 text-lg font-bold">Shipping address</legend>

            <Field
              label="Address"
              name="address"
              value={values.address}
              error={errorFor('address')}
              autoComplete="street-address"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="City"
                name="city"
                value={values.city}
                error={errorFor('city')}
                autoComplete="address-level2"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                label="Postal code"
                name="postalCode"
                value={values.postalCode}
                error={errorFor('postalCode')}
                autoComplete="postal-code"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <Field
              label="Country"
              name="country"
              value={values.country}
              error={errorFor('country')}
              autoComplete="country-name"
              options={COUNTRIES}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </fieldset>
        </form>

        <aside className="h-fit rounded-lg border border-gray-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-[#243629]">
          <h2 className="mb-3 text-lg font-bold">Order summary</h2>

          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">
                  {item.title} × {item.quantity}
                </span>
                <span className="shrink-0">
                  {formatPrice(
                    discountedPrice(item.price, item.discountPercentage) * item.quantity,
                  )}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-sm dark:border-gray-600">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Shipping</dt>
              <dd>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-600">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {submitError && (
            <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            form="checkout-form"
            disabled={placing}
            className="mt-4 w-full rounded-lg bg-[#3b4d3c] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#2f3e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b4d3c] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          >
            {placing ? 'Placing order...' : 'Place order'}
          </button>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage