'use client'

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Phone, Globe, Clock, Calendar, ArrowLeft, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import BusinessMap from "@/components/business-map"
import Image from "next/image"
import { JsonLd } from "@/components/json-ld"
import { businessAPI } from "@/lib/api"
import { useParams } from "next/navigation"

interface BusinessPageProps {
  params: { id: string }
}

// Generate metadata for the business page
// export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
//   const business = await getBusiness(params.id)

//   if (!business) {
//     return {
//       title: "Business Not Found",
//       description: "The business you are looking for could not be found.",
//     }
//   }

//   return {
//     title: `${business.name} | ${business.category} in New York`,
//     description:
//       business.description.length > 160 ? business.description.substring(0, 157) + "..." : business.description,
//     keywords: [business.name, business.category, "New York business", "NYC", business.address],
//     alternates: {
//       canonical: `/business/${params.id}`,
//     },
//     openGraph: {
//       title: `${business.name} | ${business.category} in New York`,
//       description:
//         business.description.length > 160 ? business.description.substring(0, 157) + "..." : business.description,
//       url: `https://nybusinessdirectory.com/business/${params.id}`,
//       type: "website",
//       images: [
//         {
//           url: getBusinessImage(business._id, business.category),
//           width: 800,
//           height: 400,
//           alt: business.name,
//         },
//       ],
//     },
//   }
// }

async function getBusiness(id: string) {
  try {
    return await businessAPI.getBusiness(id)
  } catch (error) {
    console.error("Error fetching business:", error)
    return null
  }
}



// const fetchSingleBusiness = businessAPI.getBusiness(_businessId.id)

// Function to get a consistent but unique image for each business
const getBusinessImage = (businessId: string, category: string) => {
  // Use the business ID to create a deterministic image
  const idSum = businessId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const imageNumber = (idSum % 10) + 1 // Get a number between 1-10

  // Map categories to different image themes
  const categoryThemes: Record<string, string> = {
    Restaurant: "restaurant",
    Retail: "retail",
    Healthcare: "healthcare",
    "Professional Services": "office",
    Technology: "tech",
    Education: "education",
    Entertainment: "entertainment",
    Fitness: "fitness",
  }

  const theme = categoryThemes[category] || "business"

  // Return a placeholder with the theme and number
  return `/placeholder.svg?height=400&width=800&text=${theme}${imageNumber}`
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const _businessId = useParams()
  const parsedId = Array.isArray(_businessId.id) ? _businessId.id[0] : _businessId.id
  console.log(parsedId)
  const business = await getBusiness(parsedId);
  console.log(business)
  if (!business) {
    notFound()
  }

  // Default location to NYC if not provided
  const location = business.location || { lat: 40.7128, lng: -74.006 }

  // Create schema.org data for the business
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: getBusinessImage(business._id, business.category),
    url: `https://nybusinessdirectory.com/business/${business._id}`,
    telephone: business.phone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    openingHours: business.hours || "",
    priceRange: "$$",
    servesCuisine: business.category === "Restaurant" ? "American" : "",
    sameAs: business.website ? [business.website] : [],
  }

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nybusinessdirectory.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Businesses",
        item: "https://nybusinessdirectory.com/businesses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: business.name,
        item: `https://nybusinessdirectory.com/business/${business._id}`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={businessSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 py-8">
        <Link href="/businesses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
        </Link>

        <div className="mb-8">
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6">
            <Image
              src={getBusinessImage(business._id, business.category) || "/placeholder.svg"}
              alt={business.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <Badge className="mb-2 bg-primary text-primary-foreground border-none">{business.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-sm">{business.name}</h1>
              <p className="flex items-center text-white/90">
                <MapPin className="h-4 w-4 mr-1" /> {business.address}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-lg">{business.description}</p>
            </div>

            {business.features && business.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Features & Services</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {business.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="bg-card border rounded-lg overflow-hidden mb-6">
              <div className="h-[300px]">
                <BusinessMap name={business.name} address={business.address} location={location} />
              </div>
              <div className="p-4">
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>{business.phone}</p>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}

                {business.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="whitespace-pre-line">{business.hours}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Listed Since</h3>
                    <p>
                      {new Date(business.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="w-full">
                <Link href={`/contact/${business._id}`}>Contact Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

