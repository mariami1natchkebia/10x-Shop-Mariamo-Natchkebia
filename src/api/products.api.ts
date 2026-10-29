import type { ProductsResponse, Category } from '../types/product'
const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error(`Failed to load products (status ${response.status})`)
  }

  return (await response.json()) as ProductsResponse
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`)

  if (!response.ok) {
    throw new Error(`Failed to load categories (status ${response.status})`)
  }

  return (await response.json()) as Category[]
}

