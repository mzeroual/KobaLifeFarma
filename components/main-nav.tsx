import type React from "react"
import Link from "next/link"
import type { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { T } from "@/components/t"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const lang = "en" // Replace with actual language detection logic

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-base",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
      <div className="ml-auto flex items-center space-x-5">
        <Link href={`/${lang}`} className="hidden items-center space-x-2 md:flex">
          <T path="navigation.home" fallback="Home" />
        </Link>
        <Link href={`/${lang}/about`} className="hidden items-center space-x-2 md:flex">
          <T path="navigation.about" fallback="About" />
        </Link>
        <Link href={`/${lang}/blog`} className="hidden items-center space-x-2 md:flex">
          <T path="navigation.blog" fallback="Blog" />
        </Link>
        {children}
      </div>
    </div>
  )
}
