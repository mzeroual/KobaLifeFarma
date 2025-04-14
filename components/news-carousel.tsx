"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  link: string
}

interface NewsCarouselProps {
  newsItems: NewsItem[]
}

export function NewsCarousel({ newsItems }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine how many items to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalItems = newsItems.length
  const maxIndex = Math.max(0, totalItems - visibleItems)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1))
  }

  // Calculate positions and styles for each item
  const getItemStyle = (index: number) => {
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

  return (
    <div className="relative w-full py-10 overflow-hidden" ref={containerRef}>
      {/* Left Navigation Arrow */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        aria-label="Previous news"
      >
        <ChevronLeft className="h-6 w-6 text-emerald-600" />
      </button>

      {/* Carousel Container */}
      <div className="flex justify-center items-center h-[450px] perspective-[1200px]">
        <div className="relative w-full max-w-6xl h-full">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
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
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(item.title)}`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-emerald-600 mb-2">{item.date}</p>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-3">{item.title}</h3>
                  <p className="text-emerald-800 mb-4 flex-grow">{item.excerpt}</p>
                  <Link
                    href={item.link}
                    className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center mt-auto"
                  >
                    Lire la suite
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all ${
          currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        aria-label="Next news"
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
