"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryCard from "@/components/category-card"
import { Helmet } from "react-helmet"
import { categoryAPI } from "@/lib/api"

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await categoryAPI.getCategories()
        setCategories(data)
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Failed to load categories. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category: string) => {
    router.push(`/businesses?category=${encodeURIComponent(category)}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Generate schema.org data for categories
  const generateCategorySchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: category,
          url: `https://nybusinessdirectory.com/businesses?category=${encodeURIComponent(category)}`,
        },
      })),
    }
  }

  // Generate breadcrumb schema
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
        name: "Categories",
        item: "https://nybusinessdirectory.com/categories",
      },
    ],
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Business Categories | NY Business Directory</title>
          <meta
            name="description"
            content="Browse businesses by category in New York City. Find restaurants, retail shops, healthcare providers, and more."
          />
          <link rel="canonical" href="https://nybusinessdirectory.com/categories" />
        </Helmet>
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-4">Business Categories</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Browse businesses by category to find exactly what you're looking for in New York City.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Business Categories | NY Business Directory</title>
          <meta
            name="description"
            content="Browse businesses by category in New York City. Find restaurants, retail shops, healthcare providers, and more."
          />
          <link rel="canonical" href="https://nybusinessdirectory.com/categories" />
        </Helmet>
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Link>

        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="text-primary hover:underline">
            Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Business Categories | NY Business Directory</title>
        <meta
          name="description"
          content="Browse businesses by category in New York City. Find restaurants, retail shops, healthcare providers, and more."
        />
        <link rel="canonical" href="https://nybusinessdirectory.com/categories" />
        <script type="application/ld+json">{JSON.stringify(generateCategorySchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
      </Link>

      <h1 className="text-3xl font-bold mb-4">Business Categories</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Browse businesses by category to find exactly what you're looking for in New York City.
      </p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <CategoryCard key={category} category={category} onClick={() => handleCategoryClick(category)} />
        ))}
      </motion.div>
    </main>
  )
}

