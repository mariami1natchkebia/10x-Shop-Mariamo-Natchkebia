import type { CartItem } from './cart'

export interface ShippingInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: number
  number: string
  items: CartItem[]
  shipping: ShippingInfo
  subtotal: number
  discount: number
  shippingCost: number
  total: number
  placedAt: string
}