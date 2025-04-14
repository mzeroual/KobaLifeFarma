import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of supported locales
const locales = ["en", "fr", "ar"]
const defaultLocale = "fr"

// Simplified language detection without external dependencies
function getLocale(request: NextRequest): string {
  // Check for Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")

  if (acceptLanguage) {
    // Simple parsing of Accept-Language header
    // Format is typically: en-US,en;q=0.9,fr;q=0.8
    const parsedLocales = acceptLanguage
      .split(",")
      .map((item) => item.split(";")[0].trim().split("-")[0]) // Get primary language tag
      .filter(Boolean)

    // Find the first locale that is supported
    const matchedLocale = parsedLocales.find((locale) => locales.includes(locale))
    if (matchedLocale) {
      return matchedLocale
    }
  }

  // Fallback to default locale
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Enhanced check for malformed URLs
  if (pathname.includes("undefined") || pathname.includes("null")) {
    console.warn(`Redirecting from malformed URL: ${pathname}`)
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|images|favicon.ico).*)",
  ],
}
