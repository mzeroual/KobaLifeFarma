type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

// Custom image loader for optimized image loading
export default function imageLoader({ src, width, quality = 75 }: ImageLoaderProps) {
  // Handle placeholder SVGs
  if (src.startsWith("/placeholder.svg")) {
    return src
  }

  // Handle external images
  if (src.startsWith("http")) {
    // For external images, we can use an image optimization service
    // or return the original URL if no optimization is needed
    return src
  }

  // For internal images, use Next.js image optimization
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
