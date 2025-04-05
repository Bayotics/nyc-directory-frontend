import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Get all unique categories
    const categories = await businessesCollection.distinct("category")

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

