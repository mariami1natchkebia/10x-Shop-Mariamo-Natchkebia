import { useEffect, useState, type ReactNode } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'
import { discountedPrice } from '../utils/format'
import { CartContext, type AddResult } from './CartContext'

const STORAGE_KEY = 'shop_cart'

function isCartItem(x: unknown): x is CartItem {
  if (typeof x !== 'object' || x === null) return false

  const o = x as Record<string, unknown>

  return (
    typeof o.productId === 'number' &&
    typeof o.title === 'string' &&
    typeof o.thumbnail === 'string' &&
    typeof o.price === 'number' &&
    typeof o.discountPercentage === 'number' &&
    typeof o.stock === 'number' &&
    typeof o.quantity === 'number'
  )
}

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)

    return Array.isArray(parsed) ? parsed.filter(isCartItem) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable — cart still works in memory
    }
  }, [items])

  function addItem(product: Product, qty = 1): AddResult {
    if (product.stock === 0) {
      return { ok: false, message: 'Out of stock' }
    }

    const quantityInCart =
      items.find((item) => item.productId === product.id)?.quantity ?? 0

    if (quantityInCart + qty > product.stock) {
      return {
        ok: false,
        message:
          quantityInCart > 0
            ? `Only ${product.stock} in stock (you already have ${quantityInCart} in your cart)`
            : `Only ${product.stock} in stock`,
      }
    }

    setItems((prev) => {
      const exists = prev.some((item) => item.productId === product.id)

      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + qty, product.stock) }
            : item,
        )
      }

      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          quantity: qty,
        },
      ]
    })

    return { ok: true, message: 'Added to cart' }
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  function setQuantity(productId: number, qty: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(Math.max(1, qty), i.stock) }
          : i,
      ),
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0)

  const subtotal = items.reduce(
    (sum, i) =>
      sum + discountedPrice(i.price, i.discountPercentage) * i.quantity,
    0,
  )

  const value = {
    items,
    totalQuantity,
    subtotal,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}