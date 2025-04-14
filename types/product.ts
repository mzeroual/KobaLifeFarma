export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  benefits: string[]
  ingredients: string[]
  usage: string
  image: string
  gallery?: string[]
  category: string
  brand: string
  skinType: string[]
  skinConcerns: string[]
  isNew?: boolean
  isFeatured?: boolean
  relatedProducts?: string[]
}

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
}

export interface Brand {
  id: string
  slug: string
  name: string
  description: string
  image: string
  heroImage: string
  tagline: string
  longDescription: string
}
