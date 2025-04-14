"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { BrandCard } from "@/components/brand-card"
import { DNABackground } from "@/components/dna-background"
import { HeroSlider } from "@/components/hero-slider"
import { ProductCarousel } from "@/components/product-carousel"
import { NewsCarousel } from "@/components/news-carousel"
import { getFeaturedProducts } from "@/data/products"
import { getAllBrands } from "@/data/brands"

interface HomePageProps {
  dict: any
  lang: string
}

export function HomePage({ dict, lang }: HomePageProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get featured products and brands
  const featuredProducts = getFeaturedProducts()
  const brands = getAllBrands()

  // Sample news items
  const newsItems = [
    {
      id: 1,
      title: "Lancement de notre nouvelle gamme anti-âge",
      excerpt:
        "Découvrez notre nouvelle gamme de produits anti-âge formulée avec des ingrédients innovants pour des résultats visibles.",
      date: "12 Mars 2023",
      image: "/placeholder.svg?height=300&width=500&text=Actualité+1",
      link: `/${lang}/news/1`,
    },
    {
      id: 2,
      title: "KOBALIFE s'engage pour l'environnement",
      excerpt:
        "Notre entreprise adopte de nouveaux emballages écologiques et biodégradables pour réduire notre impact environnemental.",
      date: "5 Avril 2023",
      image: "/placeholder.svg?height=300&width=500&text=Actualité+2",
      link: `/${lang}/news/2`,
    },
    {
      id: 3,
      title: "Conseils pour une routine beauté d'été",
      excerpt: "Nos experts partagent leurs conseils pour adapter votre routine de soins pendant la saison estivale.",
      date: "18 Mai 2023",
      image: "/placeholder.svg?height=300&width=500&text=Actualité+3",
      link: `/${lang}/news/3`,
    },
    {
      id: 4,
      title: "Ouverture de notre nouvelle boutique",
      excerpt:
        "KOBALIFE ouvre ses portes à Casablanca. Venez découvrir nos produits et bénéficier de conseils personnalisés.",
      date: "30 Juin 2023",
      image: "/placeholder.svg?height=300&width=500&text=Actualité+4",
      link: `/${lang}/news/4`,
    },
    {
      id: 5,
      title: "Collaboration avec des dermatologues renommés",
      excerpt:
        "KOBALIFE s'associe à des experts pour développer des formules encore plus efficaces et adaptées à tous les types de peau.",
      date: "15 Juillet 2023",
      image: "/placeholder.svg?height=300&width=500&text=Actualité+5",
      link: `/${lang}/news/5`,
    },
  ]

  return (
    <div className="relative min-h-screen">
      {/* DNA Background Animation */}
      <DNABackground />

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-16 pb-16 md:pt-24 md:pb-24">
          <HeroSlider
            lang={lang}
            dict={dict}
            slides={[
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
            ]}
          />
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 md:py-24 bg-emerald-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                {dict.home?.products?.title || "Our featured products"}
              </h2>
              <p className="text-lg text-emerald-800 max-w-2xl mx-auto">
                {dict.home?.products?.subtitle ||
                  "Discover our selection of advanced cosmetic products for all skin types."}
              </p>
            </motion.div>

            <ProductCarousel products={featuredProducts} lang={lang} />

            <div className="text-center mt-12">
              <Link href={`/${lang}/gammes`}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">{dict.home.products.cta}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section id="brands" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">{dict.home.brands.title}</h2>
              <p className="text-lg text-emerald-800 max-w-2xl mx-auto">{dict.home.brands.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {brands.map((brand, index) => (
                <BrandCard key={brand.id} brand={brand} index={index} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-emerald-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-100 rounded-full opacity-70"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600&text=À+propos+de+KOBALIFE"
                    alt={dict.home.about.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">{dict.home.about.title}</h2>
                <p className="text-lg text-emerald-800 mb-6">{dict.home.about.paragraph1}</p>
                <p className="text-lg text-emerald-800 mb-8">{dict.home.about.paragraph2}</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">{dict.home.about.cta}</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">{dict.home.news.title}</h2>
              <p className="text-lg text-emerald-800 max-w-2xl mx-auto">{dict.home.news.subtitle}</p>
            </motion.div>

            <NewsCarousel
              newsItems={newsItems.map((item) => ({
                ...item,
                link: item.link || `/${lang}/news`,
              }))}
            />

            <div className="text-center mt-12">
              <Link href={`/${lang}/news`}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">{dict.home.news.cta}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
