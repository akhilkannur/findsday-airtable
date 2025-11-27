// app/api/directory/route.ts
import { NextResponse } from "next/server"
import { getDirectoryTools } from "@/lib/airtableClient"

export const dynamic = "force-dynamic" // Ensure this route is not statically cached

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true"

    const tools = await getDirectoryTools({
      category: category === "All" ? undefined : category,
      featured,
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error("[API] Error fetching directory tools:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch tools",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
