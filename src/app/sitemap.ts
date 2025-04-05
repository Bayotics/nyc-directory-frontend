import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Try to fetch dynamic data, but don't fail the build if it doesn't work
  let businessPages = []
  let categoryPages = []

  try {
    // Use relative URL for API calls during build
    const businessesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/businesses`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (businessesResponse.ok) {
      const businesses = await businessesResponse.json()

      businessPages = businesses.map((business: any) => ({
        url: `https://nybusinessdirectory.com/business/${business._id}`,
        lastModified: new Date(business.dateAdded || new Date()),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    }

    const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json()

      categoryPages = categories.map((category: string) => ({
        url: `https://nybusinessdirectory.com/businesses?category=${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error)
    // Continue with just the static pages
  }

  // Combine all entries
  return [...staticPages, ...businessPages, ...categoryPages]
}

