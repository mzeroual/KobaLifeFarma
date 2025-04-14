// Fix the dictionary loading pattern to be more consistent
import type { Dictionary } from "@/types/dictionary"

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Default to French if the requested locale isn't available
  return dictionaries[locale]?.() ?? dictionaries.fr()
}
