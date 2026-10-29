export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function discountedPrice(price: number, discountPercentage: number): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}