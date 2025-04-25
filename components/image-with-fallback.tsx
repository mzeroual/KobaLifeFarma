"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string
}

export function ImageWithFallback({ src, alt, fallbackSrc = "/placeholder.svg", ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-md" aria-hidden="true" />}
      <Image
        {...rest}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
        className={`${rest.className || ""} ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
      />
    </>
  )
}
