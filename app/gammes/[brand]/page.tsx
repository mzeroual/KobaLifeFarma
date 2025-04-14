import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getBrandBySlug } from "@/data/brands"
import BrandClientPage from "./BrandClientPage"

interface BrandPageProps {
  params: Promise<{ brand: string }>
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  // Await the entire params object
  const resolvedParams = await params
  const brand = getBrandBySlug(resolvedParams.brand)

  if (!brand) {
    return {
      title: "Gamme non trouvée | KOBALIFE",
      description: "La gamme que vous recherchez n'existe pas.",
    }
  }

  return {
    title: `${brand.name} | KOBALIFE`,
    description: brand.description,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  // Await the entire params object
  const resolvedParams = await params
  const brand = getBrandBySlug(resolvedParams.brand)

  if (!brand) {
    notFound()
  }

  return <BrandClientPage params={{ brand: resolvedParams.brand }} />
}
