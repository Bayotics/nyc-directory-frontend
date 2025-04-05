import type { MetadataRoute } from "next"
import { businessAPI, categoryAPI } from "@/lib/api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all businesses from the API
  const businesses = await businessAPI.getBusinesses()

  // Fetch all categories from the API
  const categories = await categoryAPI.getCategories()

  // Create sitemap entries for static pages
  const staticPages = [
    {
      url: "https://nybusinessdirectory.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://nybusinessdirectory.com/businesses",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://nybusinessdirectory.com/categories",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://nybusinessdirectory.com/add-business",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://nybusinessdirectory.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Create sitemap entries for each business
  const businessPages = businesses.map((business: any) => ({
    url: `https://nybusinessdirectory.com/business/${business._id}`,
    lastModified: new Date(business.dateAdded || new Date()),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Create sitemap entries for each category
  const categoryPages = categories.map((category: string) => ({
    url: `https://nybusinessdirectory.com/businesses?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Combine all entries
  return [...staticPages, ...businessPages, ...categoryPages]
}

