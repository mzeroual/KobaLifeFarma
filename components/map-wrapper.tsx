"use client"

import dynamic from "next/dynamic"

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(() => import("./map-component").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl overflow-hidden h-96 bg-gray-200 flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
})

interface MapWrapperProps {
  center: [number, number]
  markerPosition: [number, number]
  popupText: string
  dict: any
}

export default function MapWrapper({ center, markerPosition, popupText, dict }: MapWrapperProps) {
  return <MapComponent center={center} markerPosition={markerPosition} popupText={popupText} dict={dict} />
}
