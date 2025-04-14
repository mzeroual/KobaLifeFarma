"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Globe } from "lucide-react"
import { ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ]

  // Extract the current language from the URL
  const currentLang = pathname.split("/")[1] || "fr"

  // Fix the language switching logic
  const switchLanguage = (lang: string) => {
    // Get the path without the language prefix
    const pathWithoutLang = pathname.split("/").slice(2).join("/")

    // Navigate to the new language path
    router.push(`/${lang}/${pathWithoutLang}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 text-emerald-700 hover:text-emerald-600 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline text-sm">
          {languages.find((l) => l.code === currentLang)?.name || "Français"}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentLang === lang.code ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
