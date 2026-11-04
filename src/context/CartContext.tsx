import { createContext } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

export interface AddResult {
  ok: boolean
  message: string
}

export interface CartContextValue {
  items: CartItem[]
  totalQuantity: number
  subtotal: number
  addItem: (product: Product, qty?: number) => AddResult
  removeItem: (productId: number) => void
  setQuantity: (productId: number, qty: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)