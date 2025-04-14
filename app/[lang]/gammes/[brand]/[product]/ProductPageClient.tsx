"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import type { Product, Brand } from "@/types/product"
import { getRelatedProducts } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

interface ProductPageProps {
  product: Product
  brand: Brand
  dict: any
  lang: string
}

export default function ProductPageClient({ product, brand, dict, lang }: ProductPageProps) {
  // No need to fetch data again since we're receiving the full objects
  if (!product || !brand) {
    return <div>{dict.products.productNotFound}</div>
  }

  const relatedProducts = getRelatedProducts(product.id)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-emerald-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-emerald-800">
            <Link href={`/${lang}/gammes`} className="hover:text-emerald-600">
              {dict.common.navigation.products}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/gammes/${brand.slug}`} className="hover:text-emerald-600">
              {brand.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-emerald-600 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={
                      product.image || `/placeholder.svg?height=500&width=500&text=${encodeURIComponent(product.name)}`
                    }
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                {product.gallery && product.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {product.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={
                            image ||
                            `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name) || "/placeholder.svg"}+${index + 1}`
                          }
                          alt={`${product.name} - ${dict.products.image} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <Link
                href={`/${lang}/gammes/${brand.slug}`}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>
                  {dict.products.backTo} {brand.name}
                </span>
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">{product.name}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.skinType.map((type) => (
                  <span key={type} className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded">
                    {type}
                  </span>
                ))}
              </div>

              <p className="text-lg text-emerald-800 mb-8">{product.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-emerald-900 mb-4">{dict.products.benefits}</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-emerald-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-emerald-900 mb-4">{dict.products.usage}</h3>
                <p className="text-emerald-800">{product.usage}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-emerald-900 mb-4">{dict.products.ingredients}</h3>
                <p className="text-emerald-800 text-sm">{product.ingredients}</p>
              </div>

              <div className="mt-10">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-auto">
                  {dict.products.askAdvice}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-8 text-center">
              {dict.products.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts
                .filter((product) => product.brand && product.slug)
                .map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} lang={lang} />
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
