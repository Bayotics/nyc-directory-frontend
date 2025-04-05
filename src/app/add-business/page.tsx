"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { businessAPI } from "@/lib/api"

export default function AddBusinessPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    website: "",
    hours: "",
    description: "",
  })

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([
    "Restaurant",
    "Retail",
    "Healthcare",
    "Professional Services",
    "Technology",
    "Education",
    "Entertainment",
    "Fitness",
    "Other",
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await businessAPI.createBusiness(formData)

      toast({
        title: "Business Added",
        description: "Your business has been successfully added to our directory.",
      })

      router.push("/")
    } catch (error) {
      console.error("Error adding business:", error)
      toast({
        title: "Error",
        description: "There was a problem adding your business. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Your Business</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Fill out the form below to add your business to our directory.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" name="address" required value={formData.address} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="Mon-Fri: 9am-5pm&#10;Sat: 10am-3pm&#10;Sun: Closed"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your business..."
                  className="min-h-[150px]"
                />
              </div>
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Business...
                  </>
                ) : (
                  "Add Business"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

