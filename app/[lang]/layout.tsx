import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KOBALIFE - Cosmétique Avancée",
  description: "Où la science rencontre la nature pour des soins de peau exceptionnels",
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Extract the language parameter to avoid sync access warning
  const lang = params.lang || "fr"
  const isRtl = lang === "ar"

  return (
    <html lang={lang} className="scroll-smooth" dir={isRtl ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <Navbar lang={lang} />
        <div className="pt-16">{children}</div>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
