"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { getAllBrands } from "@/data/brands"
import { BrandCard } from "@/components/brand-card"

export default function GammesClientPage() {
  const brands = getAllBrands()

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Nos Gammes"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Nos Gammes</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Découvrez notre sélection de produits cosmétiques avancés
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
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
              Des gammes adaptées à tous les besoins
            </h2>
            <p className="text-lg text-emerald-800 max-w-2xl mx-auto">
              Chaque gamme a été développée pour répondre à des besoins spécifiques, avec des formules innovantes
              alliant science et nature.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
