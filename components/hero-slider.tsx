"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface HeroSliderProps {
  dict: any
  lang: string
  slides?: {
    id: number
    title: string
    subtitle: string
    image: string
    cta: string
  }[]
}

export function HeroSlider({ dict, lang, slides: providedSlides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = providedSlides || [
    {
      id: 1,
      title: dict.home.hero.slide1.title,
      subtitle: dict.home.hero.slide1.subtitle,
      image: "/placeholder.svg?height=800&width=1600&text=Slide+1",
      cta: dict.home.hero.slide1.cta,
    },
    {
      id: 2,
      title: dict.home.hero.slide2.title,
      subtitle: dict.home.hero.slide2.subtitle,
      image: "/placeholder.svg?height=800&width=1600&text=Slide+2",
      cta: dict.home.hero.slide2.cta,
    },
    {
      id: 3,
      title: dict.home.hero.slide3.title,
      subtitle: dict.home.hero.slide3.subtitle,
      image: "/placeholder.svg?height=800&width=1600&text=Slide+3",
      cta: dict.home.hero.slide3.cta,
    },
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative h-[calc(100vh-68px)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-xl text-white"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">{slides[currentSlide].subtitle}</p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
