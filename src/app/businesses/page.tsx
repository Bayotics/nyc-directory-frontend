import type { Metadata } from "next"
import SearchFilters from "@/components/search-filters"
import BusinessList from "@/components/business-list"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Browse All Businesses in New York City",
  description:
    "Search and filter through thousands of businesses in New York City. Find restaurants, retail shops, healthcare providers, and more based on your preferences.",
  keywords: ["NYC businesses", "business listings", "New York businesses", "find businesses", "business directory"],
  alternates: {
    canonical: "/businesses",
  },
}

export default function BusinessesPage() {
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
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-8">All Businesses in New York City</h1>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="hidden md:block">
            <SearchFilters />
          </div>
          <div className="w-full">
            <div className="md:hidden mb-6">
              <SearchFilters />
            </div>
            <BusinessList />
          </div>
        </div>
      </div>
    </>
  )
}

