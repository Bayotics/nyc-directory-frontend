"use client"

import { useState, useCallback } from "react"
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api"
import { Skeleton } from "@/components/ui/skeleton"

interface BusinessMapProps {
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
}

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
}

export default function BusinessMap({ name, address, location }: BusinessMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAJd6S7IwhsNjUpsoFhZvZ5z_6oBhL9pz4",
    // Add any additional libraries you need
    // libraries: ['places']
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <div className="bg-muted rounded-lg p-4 text-center h-full flex items-center justify-center">
        <p>Error loading maps. Please try again later.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-lg" />
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        <Marker
          position={location}
          onClick={() => setInfoWindowOpen(true)}
          animation={window.google.maps.Animation.DROP}
          icon={{
            url: "/placeholder.svg?height=40&width=40&text=📍",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40),
          }}
        >
          {infoWindowOpen && (
            <InfoWindow position={location} onCloseClick={() => setInfoWindowOpen(false)}>
              <div className="p-1">
                <h3 className="font-bold text-sm">{name}</h3>
                <p className="text-xs">{address}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  )
}

