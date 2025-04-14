"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { getProductsByBrand } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { getBrandBySlug } from "@/data/brands"
import { notFound } from "next/navigation"

interface BrandPageProps {
  params: {
    brand: string
  }
  dict: any
  lang: string
}

export default function BrandClientPage({ params, dict, lang }: BrandPageProps) {
  const brand = getBrandBySlug(params.brand)

  if (!brand) {
    notFound()
  }

  const products = getProductsByBrand(params.brand)

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src={brand.heroImage || "/placeholder.svg"} alt={brand.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{brand.name}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">{brand.tagline}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Description */}
      <section className="py-16 md:py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
              {dict.products.about} {brand.name}
            </h2>
            <p className="text-lg text-emerald-800">{brand.longDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              {dict.products.discover} {brand.name}
            </h2>
            <p className="text-lg text-emerald-800 max-w-2xl mx-auto">{dict.products.innovativeSelection}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
