import { redirect } from "next/navigation"

// Default home page redirects to the default language
export default function Home() {
  redirect("/fr")
}
