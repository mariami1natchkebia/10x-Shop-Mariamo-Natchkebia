export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string 
  thumbnail: string
  images: string[]
  reviews?: Review[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Category {
  slug: string
  name: string
  url: string
}


export type ProductDetails = Product & {
  description: string
  brand?: string
  sku?: string
  tags?: string[]
  images: string[]
  rating: number
  stock: number
  availabilityStatus?: string
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  reviews?: Review[]
}