import { type NextRequest, NextResponse } from "next/server"

// Cache control constants
const CACHE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const STALE_WHILE_REVALIDATE = 60 * 60 * 24 * 7 // 7 days

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = searchParams.get("width") || "300"
  const height = searchParams.get("height") || "300"
  const text = searchParams.get("text") || "Placeholder"

  // Calculate font size based on dimensions
  const fontSize = Math.min(Math.floor(Number.parseInt(width) / 10), Math.floor(Number.parseInt(height) / 10))

  // Generate optimized SVG
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text 
        x="50%" 
        y="50%" 
        font  height="100%" fill="#f0f0f0"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="#888">${text}</text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
    },
  })
}
