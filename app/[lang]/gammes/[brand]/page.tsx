import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getBrandBySlug } from "@/data/brands"
import { getDictionary } from "@/lib/dictionary"
import DynamicBrandPage from "./DynamicBrandPage"

interface BrandPageProps {
  params: { brand: string; lang: string }
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  // Await params to properly access its properties
  const resolvedParams = await params
  const brandSlug = resolvedParams.brand
  const lang = resolvedParams.lang || "fr"

  const brand = getBrandBySlug(brandSlug)
  const dict = await getDictionary(lang)

  if (!brand) {
    return {
      title: `${dict.products.notFound} | KOBALIFE`,
      description: dict.products.brandNotFoundDesc,
    }
  }

  return {
    title: `${brand.name} | KOBALIFE`,
    description: brand.description,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  // Await params to properly access its properties
  const resolvedParams = await params
  const brandSlug = resolvedParams.brand
  const lang = resolvedParams.lang || "fr"

  const brand = getBrandBySlug(brandSlug)
  const dict = await getDictionary(lang)

  if (!brand) {
    notFound()
  }

  return <DynamicBrandPage brand={brand} dict={dict} lang={lang} />
}
