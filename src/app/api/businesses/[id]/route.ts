import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Find the business by ID
    const business = await businessesCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!business) {
      return NextResponse.json({ message: "Business not found" }, { status: 404 })
    }

    return NextResponse.json(business)
  } catch (error) {
    console.error("Error fetching business:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Update the business
    const result = await businessesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: "after" },
    )

    if (!result) {
      return NextResponse.json({ message: "Business not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating business:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Connect to the database
    const { db } = await connectToDatabase()

    // Get the businesses collection
    const businessesCollection = db.collection("businesses")

    // Delete the business
    const result = await businessesCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Business deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting business:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

