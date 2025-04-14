"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, Search } from "lucide-react"

import { getDictionary } from "@/lib/dictionary"
import { MobileMenu } from "@/components/mobile-menu"
import { LanguageSwitcher } from "@/components/language-switcher"

interface NavbarProps {
  lang: string
}

export function Navbar({ lang }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [dict, setDict] = useState<any>({
    common: {
      navigation: {
        home: "HOME",
        products: "OUR RANGES",
        about: "ABOUT",
        news: "NEWS",
        contact: "CONTACT",
      },
    },
  }) // Default values to prevent rendering issues
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Load dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await getDictionary(lang)
        setDict(dictionary)
      } catch (error) {
        console.error("Failed to load dictionary:", error)
      }
    }
    loadDictionary()
  }, [lang])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      if (pathname === `/${lang}`) {
        const sections = document.querySelectorAll("section[id]")
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 100
          const sectionHeight = (section as HTMLElement).offsetHeight
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveSection(section.id)
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, lang])

  // Set active section based on pathname
  useEffect(() => {
    if (pathname === `/${lang}`) {
      setActiveSection("home")
    } else if (pathname.includes("/gammes")) {
      setActiveSection("products")
    } else if (pathname.includes("/contact")) {
      setActiveSection("contact")
    }
  }, [pathname, lang])

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 50 ? "bg-emerald-50/95 backdrop-blur-sm shadow-md py-3" : "bg-emerald-50 py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="text-2xl font-bold tracking-tight text-emerald-800">
            KOBALIFE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href={`/${lang}`}
              className={`nav-link relative ${
                activeSection === "home" ? "text-emerald-700 font-medium" : "text-emerald-800"
              }`}
            >
              {dict.common.navigation.home}
              {activeSection === "home" && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600"
                  layoutId="activeSection"
                />
              )}
            </Link>

            {/* Products Dropdown */}
            <div className="relative" ref={megaMenuRef}>
              <button
                className={`nav-link flex items-center ${
                  megaMenuOpen || activeSection === "products" ? "text-emerald-700 font-medium" : "text-emerald-800"
                }`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                onMouseEnter={() => setMegaMenuOpen(true)}
              >
                {dict.common.navigation.products}
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                {activeSection === "products" && !megaMenuOpen && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600"
                    layoutId="activeSection"
                  />
                )}
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[200px] bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden z-50"
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <div className="p-4 space-y-3">
                      <Link
                        href={`/${lang}/gammes/dermo-soins`}
                        className="block py-2 px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        DERMO-SOINS
                      </Link>
                      <Link
                        href={`/${lang}/gammes/neostrata`}
                        className="block py-2 px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        NEOSTRATA
                      </Link>
                      <Link
                        href={`/${lang}/gammes/dermagor`}
                        className="block py-2 px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        DERMAGOR
                      </Link>
                      <Link
                        href={`/${lang}/gammes/floxia`}
                        className="block py-2 px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        FLOXIA
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={`/${lang}#about`}
              className={`nav-link relative ${
                activeSection === "about" ? "text-emerald-700 font-medium" : "text-emerald-800"
              }`}
            >
              {dict.common.navigation.about}
              {activeSection === "about" && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600"
                  layoutId="activeSection"
                />
              )}
            </Link>

            <Link
              href={`/${lang}#news`}
              className={`nav-link relative ${
                activeSection === "news" ? "text-emerald-700 font-medium" : "text-emerald-800"
              }`}
            >
              {dict.common.navigation.news}
              {activeSection === "news" && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600"
                  layoutId="activeSection"
                />
              )}
            </Link>

            <Link
              href={`/${lang}/contact`}
              className={`nav-link relative ${
                activeSection === "contact" ? "text-emerald-700 font-medium" : "text-emerald-800"
              }`}
            >
              {dict.common.navigation.contact}
              {activeSection === "contact" && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600"
                  layoutId="activeSection"
                />
              )}
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <button className="p-2 text-emerald-700 hover:text-emerald-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            <button
              className="p-2 text-emerald-700 hover:text-emerald-600 transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} activeSection={activeSection} lang={lang} dict={dict} />
        )}
      </AnimatePresence>
    </>
  )
}
