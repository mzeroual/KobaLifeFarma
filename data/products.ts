import type { Product } from "@/types/product"

export const products: Product[] = [
  // DERMO-SOINS Products
  {
    id: "ds-serum-hydratant",
    slug: "serum-hydratant",
    name: "Sérum Hydratant",
    shortDescription: "Hydratation intense pour tous types de peau",
    description:
      "Ce sérum hydratant avancé pénètre profondément dans la peau pour offrir une hydratation durable. Sa formule légère et non grasse est enrichie en acide hyaluronique et en vitamines essentielles pour restaurer l'équilibre hydrique de la peau.",
    benefits: [
      "Hydratation intense et durable",
      "Texture légère et non grasse",
      "Restaure l'éclat naturel de la peau",
      "Convient à tous les types de peau",
    ],
    ingredients:
      "Aqua, Glycerin, Sodium Hyaluronate, Panthenol, Niacinamide, Tocopherol, Xanthan Gum, Citric Acid, Phenoxyethanol, Ethylhexylglycerin.",
    usage:
      "Appliquer matin et soir sur une peau propre et sèche. Faire pénétrer par de légers massages circulaires. Suivre avec votre crème hydratante habituelle.",
    image: "/placeholder.svg?height=500&width=500&text=Sérum+Hydratant",
    gallery: [
      "/placeholder.svg?height=800&width=800&text=Sérum+Hydratant+1",
      "/placeholder.svg?height=800&width=800&text=Sérum+Hydratant+2",
      "/placeholder.svg?height=800&width=800&text=Sérum+Hydratant+3",
    ],
    category: "Visage",
    brand: "dermo-soins",
    skinType: ["Tous types de peau", "Peau déshydratée"],
    skinConcerns: ["Déshydratation", "Teint terne"],
    isNew: true,
    isFeatured: true,
    relatedProducts: ["ds-creme-hydratante", "ds-masque-hydratant"],
  },
  {
    id: "ds-creme-hydratante",
    slug: "creme-hydratante",
    name: "Crème Hydratante",
    shortDescription: "Hydratation quotidienne pour peaux normales à sèches",
    description:
      "Cette crème hydratante riche nourrit intensément la peau tout au long de la journée. Sa formule enrichie en céramides et en beurre de karité renforce la barrière cutanée et prévient la déshydratation.",
    benefits: [
      "Hydratation intense 24h",
      "Renforce la barrière cutanée",
      "Texture riche et confortable",
      "Non comédogène",
    ],
    ingredients:
      "Aqua, Butyrospermum Parkii Butter, Glycerin, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.",
    usage:
      "Appliquer matin et soir sur le visage et le cou après le sérum. Masser délicatement jusqu'à absorption complète.",
    image: "/placeholder.svg?height=500&width=500&text=Crème+Hydratante",
    gallery: [
      "/placeholder.svg?height=800&width=800&text=Crème+Hydratante+1",
      "/placeholder.svg?height=800&width=800&text=Crème+Hydratante+2",
    ],
    category: "Visage",
    brand: "dermo-soins",
    skinType: ["Peau normale", "Peau sèche"],
    skinConcerns: ["Déshydratation", "Inconfort"],
    isFeatured: true,
    relatedProducts: ["ds-serum-hydratant", "ds-masque-hydratant"],
  },

  // NEOSTRATA Products
  {
    id: "neo-creme-anti-age",
    slug: "creme-anti-age",
    name: "Crème Anti-âge",
    shortDescription: "Formule avancée contre les signes du vieillissement",
    description:
      "Cette crème anti-âge avancée combat efficacement les signes visibles du vieillissement. Sa formule enrichie en acide glycolique et en peptides stimule le renouvellement cellulaire et favorise la production de collagène pour une peau plus ferme et plus jeune.",
    benefits: [
      "Réduit visiblement les rides et ridules",
      "Améliore la fermeté et l'élasticité de la peau",
      "Uniformise le teint",
      "Texture riche non grasse",
    ],
    ingredients:
      "Aqua, Glycolic Acid, Glycerin, Argireline Peptide, Matrixyl 3000, Sodium Hyaluronate, Tocopherol, Dimethicone, Cetearyl Alcohol, Ceteareth-20, Glyceryl Stearate, PEG-100 Stearate, Phenoxyethanol, Ethylhexylglycerin.",
    usage:
      "Appliquer le soir sur une peau propre et sèche. Éviter le contour des yeux. L'utilisation d'une protection solaire est recommandée pendant la journée.",
    image: "/placeholder.svg?height=500&width=500&text=Crème+Anti-âge",
    gallery: [
      "/placeholder.svg?height=800&width=800&text=Crème+Anti-âge+1",
      "/placeholder.svg?height=800&width=800&text=Crème+Anti-âge+2",
    ],
    category: "Anti-âge",
    brand: "neostrata",
    skinType: ["Tous types de peau", "Peau mature"],
    skinConcerns: ["Rides", "Perte de fermeté", "Teint irrégulier"],
    isNew: true,
    isFeatured: true,
    relatedProducts: ["neo-serum-anti-age", "neo-contour-yeux"],
  },

  // DERMAGOR Products
  {
    id: "derm-huile-reparatrice",
    slug: "huile-reparatrice",
    name: "Huile Réparatrice",
    shortDescription: "Réparation cellulaire nocturne",
    description:
      "Cette huile réparatrice agit pendant la nuit pour régénérer intensément la peau. Sa formule riche en huiles végétales précieuses et en vitamines nourrit la peau en profondeur et accélère son processus naturel de réparation.",
    benefits: [
      "Répare et régénère la peau pendant la nuit",
      "Nourrit intensément",
      "Améliore l'élasticité cutanée",
      "Apaise les irritations",
    ],
    ingredients:
      "Squalane, Rosa Canina Fruit Oil, Borago Officinalis Seed Oil, Oenothera Biennis Oil, Tocopherol, Lavandula Angustifolia Oil, Pelargonium Graveolens Oil, Rosmarinus Officinalis Leaf Extract.",
    usage:
      "Appliquer quelques gouttes le soir sur une peau propre et sèche. Masser délicatement jusqu'à absorption complète. Peut être utilisée seule ou avant votre soin de nuit habituel.",
    image: "/placeholder.svg?height=500&width=500&text=Huile+Réparatrice",
    gallery: [
      "/placeholder.svg?height=800&width=800&text=Huile+Réparatrice+1",
      "/placeholder.svg?height=800&width=800&text=Huile+Réparatrice+2",
    ],
    category: "Soins",
    brand: "dermagor",
    skinType: ["Peau sèche", "Peau sensible", "Peau mature"],
    skinConcerns: ["Sécheresse", "Irritation", "Manque d'éclat"],
    isFeatured: true,
    relatedProducts: ["derm-baume-reparateur", "derm-serum-apaisant"],
  },

  // FLOXIA Products
  {
    id: "flox-gel-nettoyant",
    slug: "gel-nettoyant",
    name: "Gel Nettoyant Doux",
    shortDescription: "Nettoyage en douceur pour peaux sensibles",
    description:
      "Ce gel nettoyant doux élimine efficacement les impuretés et le maquillage tout en respectant l'équilibre naturel de la peau. Sa formule sans savon, enrichie en extraits apaisants, nettoie en douceur sans dessécher.",
    benefits: [
      "Nettoie en douceur",
      "Respecte le pH de la peau",
      "Apaise les irritations",
      "Sans savon et sans parfum",
    ],
    ingredients:
      "Aqua, Glycerin, Coco-Glucoside, Sodium Cocoamphoacetate, Panthenol, Allantoin, Aloe Barbadensis Leaf Juice, Chamomilla Recutita Flower Extract, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    usage: "Appliquer matin et soir sur le visage humide. Masser délicatement puis rincer abondamment à l'eau tiède.",
    image: "/placeholder.svg?height=500&width=500&text=Gel+Nettoyant+Doux",
    gallery: [
      "/placeholder.svg?height=800&width=800&text=Gel+Nettoyant+Doux+1",
      "/placeholder.svg?height=800&width=800&text=Gel+Nettoyant+Doux+2",
    ],
    category: "Nettoyants",
    brand: "floxia",
    skinType: ["Tous types de peau", "Peau sensible"],
    skinConcerns: ["Sensibilité", "Impuretés"],
    isNew: true,
    relatedProducts: ["flox-eau-micellaire", "flox-lotion-tonique"],
  },
]

export const getProductsByBrand = (brandSlug: string): Product[] => {
  if (!brandSlug) {
    console.warn(`Invalid brandSlug: ${brandSlug}`)
    return []
  }
  return products.filter((product) => product.brand === brandSlug)
}

export const getProductBySlug = (brandSlug: string, productSlug: string): Product | undefined => {
  if (!brandSlug || !productSlug) {
    console.warn(`Invalid parameters: brandSlug=${brandSlug}, productSlug=${productSlug}`)
    return undefined
  }
  return products.find((product) => product.brand === brandSlug && product.slug === productSlug)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.isFeatured)
}

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew)
}

export const getRelatedProducts = (productId: string): Product[] => {
  if (!productId) {
    console.warn(`Invalid productId: ${productId}`)
    return []
  }

  const product = products.find((p) => p.id === productId)
  if (!product || !product.relatedProducts) return []

  return products.filter((p) => product.relatedProducts?.includes(p.id))
}
