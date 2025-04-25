import type { Dictionary } from "@/types/dictionary"

// Implement dictionary caching for better performance
const dictionaryCache: Record<string, Promise<Dictionary>> = {}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Check if we have a cached version first
  if (!dictionaryCache[locale]) {
    // Cache the promise to avoid multiple imports of the same dictionary
    dictionaryCache[locale] = dictionaries[locale]?.() ?? dictionaries.fr()
  }

  try {
    return await dictionaryCache[locale]
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error)
    // Fallback to French if the requested locale isn't available
    if (locale !== "fr") {
      return getDictionary("fr")
    }
    // If French fails too, return a minimal dictionary to prevent UI errors
    return {
      common: {
        navigation: {
          home: "Home",
          products: "Products",
          about: "About",
          news: "News",
          contact: "Contact",
        },
        buttons: {
          discover: "Discover",
          learnMore: "Learn more",
          readMore: "Read more",
          seeAll: "See all",
          send: "Send",
        },
      },
      // Minimal implementation of other required sections
      home: {
        hero: {
          slide1: { title: "", subtitle: "", cta: "" },
          slide2: { title: "", subtitle: "", cta: "" },
          slide3: { title: "", subtitle: "", cta: "" },
        },
        products: { title: "", subtitle: "", cta: "" },
        brands: { title: "", subtitle: "" },
        about: { title: "", paragraph1: "", paragraph2: "", cta: "" },
        news: { title: "", subtitle: "", cta: "" },
      },
      products: {
        notFound: "Not found",
        brandNotFoundDesc: "",
        productNotFound: "",
        productNotFoundDesc: "",
        about: "",
        discover: "",
        innovativeSelection: "",
        benefits: "",
        usage: "",
        ingredients: "",
        askAdvice: "",
        relatedProducts: "",
        backTo: "",
        image: "",
        categories: { face: "", body: "", antiAge: "", specific: "" },
      },
      contact: {
        title: "",
        subtitle: "",
        info: { title: "", email: "", phone: "", address: "" },
        form: { title: "", name: "", email: "", subject: "", message: "", consent: "", submit: "" },
        faq: { title: "" },
        findUs: "",
        mapError: "",
      },
      footer: {
        about: "",
        links: "",
        newsletter: { title: "", text: "", placeholder: "", button: "" },
        copyright: "",
        terms: "",
        privacy: "",
        cookies: "",
      },
    }
  }
}
