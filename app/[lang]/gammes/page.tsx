import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import GammesClientPage from "./GammesClientPage"

interface GammesPageProps {
  params: { lang: string }
}

export async function generateMetadata({ params }: GammesPageProps): Promise<Metadata> {
  // Await params to properly access its properties
  const resolvedParams = await params
  const lang = resolvedParams.lang || "fr"
  const dict = await getDictionary(lang)

  return {
    title: `${dict.common.navigation.products} | KOBALIFE`,
    description: dict.home.brands.subtitle,
  }
}

export default async function GammesPage({ params }: GammesPageProps) {
  // Await params to properly access its properties
  const resolvedParams = await params
  const lang = resolvedParams.lang || "fr"
  const dict = await getDictionary(lang)

  return <GammesClientPage dict={dict} lang={lang} />
}
