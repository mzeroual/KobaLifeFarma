"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
  index?: number
  lang: string
}

export function ProductCard({ product, index = 0, lang }: ProductCardProps) {
  // Safety check for required product properties
  if (!product || !product.brand || !product.slug) {
    console.warn("Invalid product data in ProductCard:", product)
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group h-full flex flex-col"
    >
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded">
          {product.category}
        </div>
        {product.isNew && (
          <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-medium px-2.5 py-1 rounded">
            Nouveau
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-emerald-900 mb-2">{product.name}</h3>
        <p className="text-emerald-800 mb-4 flex-grow">{product.shortDescription}</p>

        {/* Display skin types as tags */}
        {product.skinType && product.skinType.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.skinType.map((type) => (
              <span key={type} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded">
                {type}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-auto">
          <Link href={`/${lang}/gammes/${product.brand}/${product.slug}`}>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              Découvrir
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
