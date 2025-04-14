"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import type { Brand } from "@/types/product"
import { Button } from "@/components/ui/button"

interface BrandCardProps {
  brand: Brand
  index?: number
  lang: string
}

export function BrandCard({ brand, index = 0, lang }: BrandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
    >
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={brand.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(brand.name)}`}
            alt={brand.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-emerald-900 mb-2">{brand.name}</h3>
        <p className="text-emerald-800 mb-4">{brand.description}</p>
        <div className="flex justify-end">
          <Link href={`/${lang}/gammes/${brand.slug}`}>
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
