import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KOBALIFE - Cosmétique Avancée",
  description: "Où la science rencontre la nature pour des soins de peau exceptionnels",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
