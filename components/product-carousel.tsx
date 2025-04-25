"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { useWindowSize } from "@/hooks/use-window-size"

interface ProductCarouselProps {
  products: Product[]
  lang: string
}

export function ProductCarousel({ products, lang }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  // Determine how many items to show based on screen width using useMemo
  const visibleItems = useMemo(() => {
    if (width < 640) return 1
    if (width < 1024) return 2
    return 3
  }, [width])

  const totalItems = products.length
  const maxIndex = Math.max(0, totalItems - visibleItems)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1))
  }

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    // Instead of manual preloading, we'll rely on Next.js Image component's built-in optimizations
    // and just prepare the indices of images that should be loaded with priority
    const priorityIndices = []
    for (let i = currentIndex; i < currentIndex + visibleItems + 2 && i < products.length; i++) {
      priorityIndices.push(i)
    }

    // We can use this array in our rendering logic to set priority on specific images
    // No need to manually create Image objects which can cause CORS issues
  }, [currentIndex, products, visibleItems])

  // Calculate positions and styles for each item - memoized for performance
  const getItemStyle = useMemo(() => {
    return (index: number) => {
      const position = index - currentIndex

      // Items that are not visible
      if (position < 0 || position >= visibleItems) {
        return {
          opacity: 0,
          scale: 0.8,
          zIndex: 0,
          display: "none",
        }
      }

      // Calculate styles based on position
      const opacity = 1
      const scale = 1 - 0.05 * Math.abs(position - visibleItems / 2 + 0.5)
      const zIndex = visibleItems - Math.abs(position - visibleItems / 2 + 0.5)

      return {
        opacity,
        scale,
        zIndex,
        display: "block",
      }
    }
  }, [currentIndex, visibleItems])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative w-full py-10 overflow-hidden" ref={containerRef}>
      {/* Left Navigation Arrow */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6 text-emerald-600" />
      </button>

      {/* Carousel Container */}
      <div className="flex justify-center items-center h-[500px] perspective-[1200px]">
        <div className="relative w-full max-w-6xl h-full">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="absolute top-0 left-0 right-0 w-full max-w-sm mx-auto h-full"
                initial={getItemStyle(index)}
                animate={{
                  opacity: getItemStyle(index).opacity,
                  scale: getItemStyle(index).scale,
                  zIndex: getItemStyle(index).zIndex,
                  display: getItemStyle(index).display,
                  x: `${(index - currentIndex - (visibleItems - 1) / 2) * 110}%`,
                  rotateY: `${(index - currentIndex - (visibleItems - 1) / 2) * -5}deg`,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={currentIndex <= index && index < currentIndex + visibleItems}
                      loading="eager"
                    />
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
                    <div className="flex justify-end mt-auto">
                      <Link
                        href={
                          product.brand && product.slug
                            ? `/${lang}/gammes/${product.brand}/${product.slug}`
                            : `/${lang}/gammes`
                        }
                      >
                        <Button
                          variant="outline"
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                        >
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all ${
          currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6 text-emerald-600" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? "bg-emerald-600 w-6" : "bg-emerald-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
