"use client"
import { useState, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getProductsByBrand } from "@/data/products"
import type { Brand } from "@/types/product"

interface DynamicBrandPageProps {
  brand: Brand
  dict: any
  lang: string
}

export default function DynamicBrandPage({ brand, dict, lang }: DynamicBrandPageProps) {
  // Get products for this brand
  const products = getProductsByBrand(brand.slug)

  // State for category filtering
  const [activeTab, setActiveTab] = useState<string>("all")

  // Ref for products section
  const productsSectionRef = useRef<HTMLDivElement>(null)

  // Use useMemo to derive values instead of useState + useEffect
  const productCategories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") {
      return products
    } else {
      return products.filter((product) => product.category === activeTab)
    }
  }, [activeTab, products])

  // Function to scroll to products section
  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Add a check for empty products
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">{dict.products.notFound}</h1>
        <p className="text-gray-600 mb-8">{dict.products.brandNotFoundDesc}</p>
        <Link href={`/${lang}/gammes`}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {dict.common.buttons.discover} {dict.common.navigation.products}
          </Button>
        </Link>
      </div>
    )
  }

  // Define the main category cards
  const mainCategories = [
    {
      id: "visage",
      title: "Soins Visage",
      description: "Des formules ciblées pour tous les besoins de votre peau.",
      icon: "Bottle",
      category: "Visage",
    },
    {
      id: "corps",
      title: "Soins Corps",
      description: "Hydratation, nutrition et protection pour votre corps.",
      icon: "Heart",
      category: "Corps",
    },
    {
      id: "specifiques",
      title: "Traitements Spécifiques",
      description: "Solutions ciblées pour des problématiques spécifiques.",
      icon: "Shield",
      category: "Traitements Spécifiques",
    },
  ]

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image src={brand.heroImage || "/placeholder.svg"} alt={brand.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{brand.name}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">{brand.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section - Brand Title and Description */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-8">
            {dict.products.about} {brand.name}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">{brand.longDescription}</p>
          <div className="mt-8 flex justify-center">
            <div className="w-20 h-1 bg-emerald-600 rounded-full"></div>
          </div>
        </div>

        {/* Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {mainCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-emerald-50 rounded-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  {category.icon === "Bottle" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600"
                    >
                      <path d="M10 2v1.5a.5.5 0 0 0 .5.5H13a.5.5 0 0 0 .5-.5V2" />
                      <path d="M14 3.5v2a1.5 1.5 0 0 0 3 0v-2" />
                      <path d="M8 3h8l1 1.5H7L8 3Z" />
                      <path d="M16 10.5c0 .5-.5 1-1 1.5 0 .5 0 1-1 1.5 0 .5 0 1-1 1" />
                      <path d="M13.5 17A3.5 3.5 0 0 1 10 20.5v-2A3.5 3.5 0 0 0 6.5 15H6a2 2 0 0 1-2-2v-1.5h16V13a2 2 0 0 1-2 2h-.5a3.5 3.5 0 0 0-3.5 3.5v2a3.5 3.5 0 0 1-3.5-3.5" />
                    </svg>
                  )}
                  {category.icon === "Heart" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  )}
                  {category.icon === "Shield" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <a
                href="#products"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(category.category)
                  scrollToProducts()
                }}
              >
                Découvrir <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div id="products" ref={productsSectionRef} className="bg-emerald-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              {dict.products.discover} {brand.name}
            </h2>
            <p className="text-lg text-emerald-800 max-w-2xl mx-auto">{dict.products.innovativeSelection}</p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === "all" ? "bg-emerald-600 text-white" : "bg-white text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              Tous les produits
            </button>
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === category
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts
              .filter((product) => product.brand && product.slug)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} lang={lang} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
