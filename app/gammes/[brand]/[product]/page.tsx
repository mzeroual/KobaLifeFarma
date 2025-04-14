import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductBySlug } from "@/data/products"
import { getBrandBySlug } from "@/data/brands"
import ProductPageClient from "./ProductPageClient"

interface ProductPageProps {
  params: Promise<{ brand: string; product: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Await the entire params object
  const resolvedParams = await params

  const product = getProductBySlug(resolvedParams.brand, resolvedParams.product)
  const brand = getBrandBySlug(resolvedParams.brand)

  if (!product || !brand) {
    return {
      title: "Produit non trouvé | KOBALIFE",
      description: "Le produit que vous recherchez n'existe pas.",
    }
  }

  return {
    title: `${product.name} | KOBALIFE`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the entire params object
  const resolvedParams = await params

  const product = getProductBySlug(resolvedParams.brand, resolvedParams.product)
  const brand = getBrandBySlug(resolvedParams.brand)

  if (!product || !brand) {
    notFound()
  }

  return <ProductPageClient params={{ brand: resolvedParams.brand, product: resolvedParams.product }} />
}
