// app/api/directory/route.ts - Quick Fix Version
import { NextResponse } from "next/server"
import { base } from "@/lib/airtableClient"

export async function GET(request: Request) {
  try {
    console.log("[v0] Directory API called - Quick Fix Version")

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const selectOptions: any = {
      maxRecords: 100,
      sort: [
        { field: "Featured", direction: "desc" },
        { field: "Name", direction: "asc" },
      ],
    }

    if (category && category !== "All") {
      selectOptions.filterByFormula = `{Category} = '${category}'`
    }

    console.log("[v0] Calling Airtable with options:", selectOptions)

    const records = await base("Directory Tools").select(selectOptions).all()

    console.log(`[v0] SUCCESS - Got ${records.length} records from Airtable`)

    // Transform records to match your expected format
    const tools = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }))

    console.log("[v0] Returning tools to frontend")
    return NextResponse.json(tools)
  } catch (error) {
    console.error("[v0] Direct Airtable error:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch tools",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        debug: {
          hasApiKey: !!process.env.AIRTABLE_API_KEY,
          hasBaseId: !!process.env.AIRTABLE_BASE_ID,
        },
      },
      { status: 500 },
    )
  }
}
