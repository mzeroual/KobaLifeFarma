import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductBySlug } from "@/data/products"
import { getBrandBySlug } from "@/data/brands"
import { getDictionary } from "@/lib/dictionary"
import ProductPageClient from "./ProductPageClient"

interface ProductPageProps {
  params: { brand: string; product: string; lang: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Await params to properly access its properties
  const resolvedParams = await params
  const brandSlug = resolvedParams.brand
  const productSlug = resolvedParams.product
  const lang = resolvedParams.lang || "fr"

  const product = getProductBySlug(brandSlug, productSlug)
  const brand = getBrandBySlug(brandSlug)
  const dict = await getDictionary(lang)

  if (!product || !brand) {
    return {
      title: `${dict.products.productNotFound} | KOBALIFE`,
      description: dict.products.productNotFoundDesc,
    }
  }

  return {
    title: `${product.name} | ${brand.name} | KOBALIFE`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params to properly access its properties
  const resolvedParams = await params
  const brandSlug = resolvedParams.brand
  const productSlug = resolvedParams.product
  const lang = resolvedParams.lang || "fr"

  console.log("Server Component - Params:", resolvedParams)

  const product = getProductBySlug(brandSlug, productSlug)
  const brand = getBrandBySlug(brandSlug)
  const dict = await getDictionary(lang)

  console.log("Server Component - Data:", {
    hasProduct: !!product,
    hasBrand: !!brand,
    productId: product?.id,
    brandId: brand?.id,
  })

  if (!product || !brand) {
    notFound()
  }

  // Pass the full objects instead of just slugs
  return <ProductPageClient product={product} brand={brand} dict={dict} lang={lang} />
}
