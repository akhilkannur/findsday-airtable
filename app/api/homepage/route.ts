import {
  base,
  type ToolRecord,
  type SponsorRecord,
  type MakerRecord,
  type DropRecord,
  getFeaturedDropAndArchivedDrops,
} from "@/lib/airtableClient"

export const dynamic = "force-dynamic"

const CACHE_DURATION = 600 // 10 minutes

export async function GET() {
  try {
    console.log("[v0] Fetching home page data for API...")

    const [dropsResult, sponsorsResult, makersResult] = await Promise.allSettled([
      getFeaturedDropAndArchivedDrops(),
      base("Sponsors")
        .select({
          fields: ["Name", "Logo", "Website URL", "Blurb"], // Only fetch needed fields
        })
        .all(),
      base("Makers")
        .select({
          maxRecords: 6,
          fields: ["Name", "Photo", "Maker Title", "Bio", "Profile Link"], // Only fetch needed fields
        })
        .firstPage(),
    ])

    let featuredDrop: DropRecord | null = null
    let featuredTools: ToolRecord[] = []
    let archivedDrops: DropRecord[] = []
    let sponsors: SponsorRecord[] = []
    let makers: MakerRecord[] = []

    // Handle drops result
    if (dropsResult.status === "fulfilled") {
      const { featuredDrop: fetchedFeaturedDrop, archivedDrops: fetchedArchivedDrops } = dropsResult.value
      featuredDrop = fetchedFeaturedDrop
      archivedDrops = fetchedArchivedDrops

      if (featuredDrop && featuredDrop.fields.Tools && featuredDrop.fields.Tools.length > 0) {
        console.log(`[v0] Batch fetching ${featuredDrop.fields.Tools.length} tools for featured drop`)
        try {
          const toolsQuery = base("Tools").select({
            filterByFormula: `OR(${featuredDrop.fields.Tools.map((id) => `RECORD_ID()="${id}"`).join(",")})`,
            fields: ["Name", "Image", "Category", "Tagline", "Description", "Website URL"],
          })

          const rawTools = await toolsQuery.all()
          featuredTools = rawTools.map((record) => ({
            id: record.id,
            fields: record.fields,
          })) as ToolRecord[]

          console.log(`[v0] Successfully batch fetched ${featuredTools.length} tools`)
        } catch (error) {
          console.error("[v0] Error batch fetching tools:", error)
          try {
            const toolPromises = featuredDrop.fields.Tools.slice(0, 6).map((toolId) => base("Tools").find(toolId))
            const rawTools = await Promise.all(toolPromises)
            featuredTools = rawTools.map((record) => ({
              id: record.id,
              fields: record.fields,
            })) as ToolRecord[]
            console.log(`[v0] Fallback: fetched ${featuredTools.length} tools individually`)
          } catch (fallbackError) {
            console.error("[v0] Fallback tool fetching also failed:", fallbackError)
          }
        }
      } else {
        console.log("[v0] No featured drop or no tools linked to featured drop.")
      }
    } else {
      console.error("[v0] Error fetching drops:", dropsResult.reason)
    }

    // Handle sponsors result
    if (sponsorsResult.status === "fulfilled") {
      sponsors = sponsorsResult.value.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as SponsorRecord[]
      console.log(`[v0] Fetched ${sponsors.length} sponsors.`)
    } else {
      console.error("[v0] Error fetching sponsors:", sponsorsResult.reason)
    }

    // Handle makers result
    if (makersResult.status === "fulfilled") {
      makers = makersResult.value.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as MakerRecord[]
      console.log(`[v0] Fetched ${makers.length} makers.`)
    } else {
      console.error("[v0] Error fetching makers:", makersResult.reason)
    }

    const responseData = {
      success: true,
      data: { featuredDrop, featuredTools, archivedDrops, sponsors, makers },
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        Vary: "Accept-Encoding",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    })
  } catch (error) {
    console.error("[v0] Critical error in homepage API:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error fetching homepage data",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )
  }
}
