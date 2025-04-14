"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

interface MapComponentProps {
  center?: [number, number]
  zoom?: number
  markerPosition?: [number, number]
  popupText?: string
  dict?: any
}

export function MapComponent({
  center = [33.5731, -7.5898], // Default coordinates for Casablanca
  zoom = 15,
  markerPosition = [33.5731, -7.5898],
  popupText = "KOBALIFE",
  dict,
}: MapComponentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Error handling for map loading
  const errorMessage = dict?.contact?.mapError || "Unable to load the map. Please try again later."

  // Add proper error handling for the map
  useEffect(() => {
    // Add a timeout to detect if the map fails to load
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true)
        setIsLoading(false)
      }
    }, 10000) // 10 seconds timeout

    return () => clearTimeout(timeout)
  }, [isLoading])

  // Convert coordinates to string format for OpenStreetMap
  const lat = markerPosition[0]
  const lon = markerPosition[1]

  // Create OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`

  const handleMapLoad = () => {
    setIsLoading(false)
  }

  const handleMapError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className="rounded-xl overflow-hidden h-96 bg-gray-100 flex flex-col items-center justify-center text-gray-600 p-6">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <p className="text-center">{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden h-96 shadow-md relative">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
        onLoad={handleMapLoad}
        onError={handleMapError}
        title={`Map showing ${popupText} location`}
        className="z-10"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Loading map...</p>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-20">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}//${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white px-3 py-2 rounded-md shadow-md text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View larger map
        </a>
      </div>
    </div>
  )
}

export default MapComponent
