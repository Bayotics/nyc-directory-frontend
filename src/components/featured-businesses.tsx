"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { businessAPI, categoryAPI } from "@/lib/api"

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

export default function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedBusinesses = async () => {
      try {
        // First, fetch all available categories
        const allCategories = await categoryAPI.getCategories()

        // Define the starting letters in the specified order
        const startingLetters = ["a", "c", "e", "r", "t", "u", "s", "d", "b", "f", "h", "g"]

        // Find categories that start with each letter
        const selectedCategories: string[] = []

        startingLetters.forEach((letter) => {
          // Find the first category that starts with this letter (case insensitive)
          const matchingCategory = allCategories.find((category: string) =>
            category.toLowerCase().startsWith(letter.toLowerCase()),
          )

          if (matchingCategory) {
            selectedCategories.push(matchingCategory)
          }
        })

        // If we couldn't find all 12 categories, log a warning
        if (selectedCategories.length < startingLetters.length) {
          console.warn(`Could only find ${selectedCategories.length} of ${startingLetters.length} requested categories`)
        }

        // For each selected category, fetch one business
        const featuredBusinesses: Business[] = []
        const businessesPerCategory = 1

        // Create an array of promises to fetch businesses from all categories in parallel
        const categoryPromises = selectedCategories.map((category) =>
          businessAPI.getBusinesses({ category, limit: businessesPerCategory.toString() }),
        )

        // Wait for all category requests to complete
        const categoryResults = await Promise.all(categoryPromises)
        console.log(categoryResults)

        // Flatten the array of arrays into a single array of businesses
        categoryResults.forEach((categoryBusinesses) => {
          featuredBusinesses.push(...categoryBusinesses.slice(0, businessesPerCategory))
        })

        setBusinesses(featuredBusinesses)
      } catch (err) {
        setError("Error loading featured businesses. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBusinesses()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
  }

  // Function to get the appropriate image for each business card
  const getBusinessImage = (index: number, businessId: string, category: string) => {
    // For the first 10 businesses, use the provided images
    if (index < 10) {
      return `/images/business${index + 1}${index === 0 || index === 7 ? ".png" : ".jpeg"}`
    }

    // For any additional businesses, use the placeholder logic
    const idSum = businessId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const imageNumber = (idSum % 10) + 1

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
    return `/placeholder.svg?height=300&width=500&text=${theme}${imageNumber}`
  }

  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, i) => (
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
    <motion.div
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {businesses.map((business, index) => (
        <motion.div key={business._id} variants={item}>
          <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={getBusinessImage(index, business._id, business.category) || "/placeholder.svg"}
                alt={business.name}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute bottom-0 right-0 bg-background/80 backdrop-blur-sm px-3 py-1 m-2 rounded-md">
                <Badge variant="outline">{business.category}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1">{business.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="line-clamp-1">{business.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex-grow">
              {business.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <p className="text-sm">{business.phone}</p>
                </div>
              )}
              <p className="text-sm line-clamp-2 mt-2">{business.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/business/${business._id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}

      {businesses.length === 0 && (
        <div className="col-span-full text-center p-8">
          <p className="text-muted-foreground">No businesses found.</p>
        </div>
      )}
    </motion.div>
  )
}

