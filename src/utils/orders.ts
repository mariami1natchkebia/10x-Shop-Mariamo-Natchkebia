import type { Order } from '../types/order'

const STORAGE_KEY = 'shop_orders'

export const FREE_SHIPPING_FROM = 100
export const SHIPPING_COST = 10

export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST
}

function isOrder(x: unknown): x is Order {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return (
    typeof o.id === 'number' &&
    typeof o.number === 'string' &&
    Array.isArray(o.items) &&
    typeof o.shipping === 'object' &&
    o.shipping !== null &&
    typeof o.total === 'number' &&
    typeof o.placedAt === 'string'
  )
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isOrder) : []
  } catch {
    return []
  }
}

export function getNextOrderNumber(): string {
  const next = loadOrders().length + 1
  return `10X-${String(next).padStart(5, '0')}`
}

export function saveOrder(order: Order): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...loadOrders()]))
    return true
  } catch {
    return false
  }
}