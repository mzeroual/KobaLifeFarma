"use client"

import { useLanguage } from "@/contexts/language-context"

type TranslationPath = string

export function T({ path, fallback = "" }: { path: TranslationPath; fallback?: string }) {
  const { dict } = useLanguage()

  // Navigate the dictionary object using the path
  const keys = path.split(".")
  let result: any = dict

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key]
    } else {
      return fallback || path
    }
  }

  return result
}
