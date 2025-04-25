import { getDictionary } from "@/lib/dictionary"
import { HomePage } from "./HomePage"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"

export default async function Home({ params }: { params: { lang: string } }) {
  // Await params to properly access its properties
  const resolvedParams = await params
  const lang = resolvedParams.lang || "fr"
  const dict = await getDictionary(lang)

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage dict={dict} lang={lang} />
    </Suspense>
  )
}
