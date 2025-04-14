"use client"

import { createContext, useContext, type ReactNode } from "react"

type LanguageContextType = {
  dict: any
  lang: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  dict,
  lang,
}: {
  children: ReactNode
  dict: any
  lang: string
}) {
  return <LanguageContext.Provider value={{ dict, lang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
