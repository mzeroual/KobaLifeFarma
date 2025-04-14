import type { Metadata } from "next"
import GammesClientPage from "./GammesClientPage"

export const metadata: Metadata = {
  title: "Nos Gammes | KOBALIFE",
  description: "Découvrez notre sélection de gammes de produits cosmétiques avancés pour tous types de peau.",
}

export default function GammesPage() {
  return <GammesClientPage />
}
