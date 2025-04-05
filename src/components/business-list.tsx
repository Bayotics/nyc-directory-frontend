"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

// Add import for the CSS file at the top of the file
import "./business-card-gradient.css"

// Add these imports at the top of the file
import {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Briefcase,
  Cpu,
  GraduationCap,
  Film,
  Dumbbell,
  Building,
  type LucideIcon,
} from "lucide-react"

// Update the fetch call in useEffect to use the API helper
import { businessAPI } from "@/lib/api"

interface Business {
  _id: string
  name: string
  category: string
  address: string
  phone: string
  website?: string
  hours?: string
  description: string
  dateAdded: string
}

// Add this function before the BusinessList component
const getCategoryIcon = (category: string): LucideIcon => {
  const categoryMap: Record<string, LucideIcon> = {
    Restaurant: Utensils,
    Restaurants: Utensils,
    Cafe: Utensils,
    Retail: ShoppingBag,
    Shopping: ShoppingBag,
    Healthcare: Stethoscope,
    Health: Stethoscope,
    "Professional Services": Briefcase,
    Services: Briefcase,
    Technology: Cpu,
    Tech: Cpu,
    Education: GraduationCap,
    School: GraduationCap,
    Entertainment: Film,
    Fitness: Dumbbell,
    Gym: Dumbbell,
  }

  // Try to find an exact match
  if (categoryMap[category]) {
    return categoryMap[category]
  }

  // Try to find a partial match
  for (const [key, value] of Object.entries(categoryMap)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }

  // Default icon
  return Building
}

// Add this function before the BusinessList component
const getCategoryClass = (category: string): string => {
  const categoryClasses: Record<string, string> = {
    Restaurant: "restaurant",
    Restaurants: "restaurant",
    Cafe: "restaurant",
    Retail: "retail",
    Shopping: "retail",
    Healthcare: "healthcare",
    Health: "healthcare",
    "Professional Services": "professional",
    Services: "professional",
    Technology: "tech",
    Tech: "tech",
    Education: "education",
    School: "education",
    Entertainment: "entertainment",
    Fitness: "fitness",
    Gym: "fitness",
  }

  // Try to find an exact match
  if (categoryClasses[category]) {
    return categoryClasses[category]
  }

  // Try to find a partial match
  for (const [key, value] of Object.entries(categoryClasses)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }

  // Default class
  return "default"
}

export default function BusinessList() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const category = searchParams.get("category")
  const sortBy = searchParams.get("sortBy")

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate schema.org data for the business list
  const generateBusinessListSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: businesses.map((business, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LocalBusiness",
          name: business.name,
          description: business.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address,
            addressLocality: "New York",
            addressRegion: "NY",
            addressCountry: "US",
          },
          telephone: business.phone,
          url: `https://nybusinessdirectory.com/business/${business._id}`,
        },
      })),
    }
  }

  // Generate title and description based on search parameters
  const getPageTitle = () => {
    if (category && category !== "all_categories") {
      return `${category} Businesses in New York City | NY Business Directory`
    } else if (search) {
      return `${search} - Search Results | NY Business Directory`
    } else {
      return "All Businesses in New York City | NY Business Directory"
    }
  }

  const getPageDescription = () => {
    if (category && category !== "all_categories") {
      return `Find the best ${category.toLowerCase()} businesses in New York City. Browse our directory of local ${category.toLowerCase()} establishments.`
    } else if (search) {
      return `Search results for "${search}" in our New York City business directory. Find local businesses matching your search criteria.`
    } else {
      return "Browse all businesses in New York City. Find restaurants, retail shops, professional services, and more in our comprehensive directory."
    }
  }

  // Replace the fetch call in the useEffect with:
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)

        // Build query parameters
        const params: Record<string, string> = {}
        if (search) params.search = search
        if (category && category !== "all_categories") params.category = category
        if (sortBy) params.sortBy = sortBy

        const data = await businessAPI.getBusinesses(params)
        setBusinesses(data)
      } catch (err) {
        setError("Error loading businesses. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [search, category, sortBy])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="w-full h-48" />
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <script type="application/ld+json">{JSON.stringify(generateBusinessListSchema())}</script>
      </Head>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => {
          const Icon = getCategoryIcon(business.category)
          const categoryClass = getCategoryClass(business.category)

          return (
            <Card key={business._id} className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
              <div className={`relative w-full h-48 overflow-hidden business-card-gradient ${categoryClass}`}>
                <div className="absolute inset-0 flex items-center justify-center card-content">
                  <Icon className="h-16 w-16 text-white/90" aria-hidden="true" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 card-content">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">{business.name}</h3>
                </div>
                <div className="absolute top-2 right-2 card-content">
                  <Badge variant="outline" className="bg-white/80 text-foreground">
                    {business.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="line-clamp-1">{business.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-grow">
                {business.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                    <p className="text-sm">{business.phone}</p>
                  </div>
                )}
                <p className="text-sm line-clamp-2 mt-2">{business.description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/business/${business._id}`}
                  className="w-full"
                  aria-label={`View details for ${business.name}`}
                >
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
        {businesses.length === 0 && (
          <div className="col-span-full text-center p-8">
            <p className="text-muted-foreground">No businesses found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </>
  )
}

