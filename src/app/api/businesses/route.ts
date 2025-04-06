import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sortBy")
    const limit = searchParams.get("limit")

    // Build query
    const query: any = {}

    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ]
      const categoryExactMatch = {
        category: new RegExp(`^${search}$`, "i"),
      }

      // Add this as a separate condition to the $or array
      query.$or.push(categoryExactMatch)
    }

    // Add category filter if provided
    if (category && category !== "all_categories") {
      query.category = category
    }

    // Build sort options
    let sortOptions: any = {}
    if (sortBy === "oldest") {
      sortOptions = { dateAdded: 1 }
    } else if (sortBy === "name_asc") {
      sortOptions = { name: 1 }
    } else if (sortBy === "name_desc") {
      sortOptions = { name: -1 }
    } else {
      // Default to newest first
      sortOptions = { dateAdded: -1 }
    }

    // Apply limit if provided, otherwise default to 100
    const limitValue = limit ? Number.parseInt(limit) : 100

    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Find businesses matching the query
    const businesses = await businessesCollection.find(query).sort(sortOptions).limit(limitValue).toArray()

    return NextResponse.json(businesses)
  } catch (error) {
    console.error("Error fetching businesses:", error)

    // During build time, return empty array instead of error
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
      return NextResponse.json([])
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate random coordinates near NYC for demo purposes
    const randomLat = 40.7128 + (Math.random() - 0.5) * 0.1 // Random lat near NYC
    const randomLng = -74.006 + (Math.random() - 0.5) * 0.1 // Random lng near NYC

    const businessData = {
      ...body,
      location: {
        lat: randomLat,
        lng: randomLng,
      },
      dateAdded: new Date(),
    }

    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Insert the new business
    const result = await businessesCollection.insertOne(businessData)

    return NextResponse.json({ ...businessData, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating business:", error)
    return NextResponse.json({ message: "Error creating business" }, { status: 400 })
  }
}

