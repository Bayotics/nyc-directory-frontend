"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest")
  const [categories, setCategories] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    // Update search term when URL parameter changes
    const searchFromUrl = searchParams.get("search")
    if (searchFromUrl && searchFromUrl !== searchTerm) {
      setSearchTerm(searchFromUrl)
    }

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/categories`)
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (category) params.set("category", category)
    if (sortBy) params.set("sortBy", sortBy)

    router.push(`/businesses?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategory("")
    setSortBy("newest")
    router.push("/businesses")
  }

  const FilterForm = () => (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-mobile">Search</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-mobile"
            type="search"
            placeholder="Business name or keyword"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            key="search-input-mobile"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Rest of the form remains the same */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_categories">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button type="submit">Apply Filters</Button>
        {(searchTerm || category || sortBy !== "newest") && (
          <Button type="button" variant="outline" onClick={clearFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" /> Clear Filters
          </Button>
        )}
      </div>
    </form>
  )

  // Mobile view with sheet
  if (isMobile) {
    return (
      <div className="mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </span>
              {(searchTerm || category || sortBy !== "newest") && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">Active</span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Search & Filters</SheetTitle>
              <SheetDescription>Narrow down your search results</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <FilterForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  // Desktop view
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterForm />
      </CardContent>
    </Card>
  )
}

