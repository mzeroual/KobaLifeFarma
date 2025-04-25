import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of supported locales
const locales = ["en", "fr", "ar"]
const defaultLocale = "fr"

// Optimized language detection without external dependencies
function getLocale(request: NextRequest): string {
  // Check for Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")

  if (acceptLanguage) {
    // Efficient parsing of Accept-Language header
    const parsedLocales = acceptLanguage
      .split(",")
      .map((item) => {
        const [lang, priority] = item.split(";")
        return {
          lang: lang.trim().split("-")[0], // Get primary language tag
          priority: priority ? Number.parseFloat(priority.split("=")[1] || "1") : 1,
        }
      })
      .sort((a, b) => b.priority - a.priority) // Sort by priority
      .map((item) => item.lang)

    // Find the first locale that is supported
    const matchedLocale = parsedLocales.find((locale) => locales.includes(locale))
    if (matchedLocale) {
      return matchedLocale
    }
  }

  // Check for locale in cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
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

  // Set locale cookie for future requests
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|images|favicon.ico).*)",
  ],
}
