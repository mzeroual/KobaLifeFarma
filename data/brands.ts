import type { Brand } from "@/types/product"

export const brands: Brand[] = [
  {
    id: "dermo-soins",
    slug: "dermo-soins",
    name: "DERMO-SOINS",
    description: "Soins dermatologiques avancés pour tous types de peau",
    image: "/placeholder.svg?height=300&width=300&text=DERMO-SOINS",
    heroImage: "/placeholder.svg?height=800&width=1600&text=DERMO-SOINS",
    tagline: "Soins dermatologiques avancés",
    longDescription:
      "DERMO-SOINS propose une gamme complète de produits dermatologiques développés avec les dernières avancées scientifiques. Nos formules combinent des actifs puissants et des ingrédients naturels pour offrir des résultats visibles tout en respectant l'équilibre naturel de la peau.",
  },
  {
    id: "neostrata",
    slug: "neostrata",
    name: "NEOSTRATA",
    description: "Solutions anti-âge scientifiquement prouvées",
    image: "/placeholder.svg?height=300&width=300&text=NEOSTRATA",
    heroImage: "/placeholder.svg?height=800&width=1600&text=NEOSTRATA",
    tagline: "La science au service de votre peau",
    longDescription:
      "NEOSTRATA est à l'avant-garde de la recherche dermatologique avec des formules brevetées qui ciblent les signes visibles du vieillissement. Nos produits contiennent des acides alpha-hydroxy et des antioxydants puissants pour une peau visiblement plus jeune et éclatante.",
  },
  {
    id: "dermagor",
    slug: "dermagor",
    name: "DERMAGOR",
    description: "Soins naturels pour peaux sensibles",
    image: "/placeholder.svg?height=300&width=300&text=DERMAGOR",
    heroImage: "/placeholder.svg?height=800&width=1600&text=DERMAGOR",
    tagline: "Le pouvoir de la nature pour les peaux sensibles",
    longDescription:
      "DERMAGOR s'engage à créer des produits doux et efficaces pour les peaux les plus sensibles. Nos formules sont enrichies en extraits botaniques apaisants et en minéraux essentiels pour nourrir et protéger votre peau tout en respectant son équilibre naturel.",
  },
  {
    id: "floxia",
    slug: "floxia",
    name: "FLOXIA",
    description: "Soins hydratants et réparateurs",
    image: "/placeholder.svg?height=300&width=300&text=FLOXIA",
    heroImage: "/placeholder.svg?height=800&width=1600&text=FLOXIA",
    tagline: "Hydratation intense et réparation cutanée",
    longDescription:
      "FLOXIA se spécialise dans les soins hydratants et réparateurs pour tous types de peau. Nos formules innovantes contiennent des complexes hydratants de pointe et des actifs régénérants pour restaurer la barrière cutanée et offrir une hydratation durable.",
  },
]

export const getBrandBySlug = (slug: string): Brand | undefined => {
  if (!slug) {
    console.warn(`Invalid brand slug: ${slug}`)
    return undefined
  }
  return brands.find((brand) => brand.slug === slug)
}

export const getAllBrands = (): Brand[] => {
  return brands
}
