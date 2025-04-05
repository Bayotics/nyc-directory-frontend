import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      status: "ok",
      message: "Connected to MongoDB",
      collections: collections.map((c) => c.name),
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json({ status: "error", message: "Failed to connect to database" }, { status: 500 })
  }
}

