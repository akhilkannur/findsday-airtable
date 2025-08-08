// app/api/homepage/route.ts
import { base, type ToolRecord, type SponsorRecord, type MakerRecord, type DropRecord, getFeaturedDropAndArchivedDrops } from "@/lib/airtableClient";

export const dynamic = "force-dynamic"; // Ensure this route is dynamic

// Cache duration in seconds
const CACHE_DURATION = 300; // 5 minutes

export async function GET() {
  try {
    console.log("Fetching home page data for API...");

    // Start all requests in parallel for better performance
    const [
      dropsResult,
      sponsorsResult,
      makersResult
    ] = await Promise.allSettled([
      getFeaturedDropAndArchivedDrops(),
      base("Sponsors").select().all(),
      base("Makers").select({ maxRecords: 6 }).firstPage()
    ]);

    let featuredDrop: DropRecord | null = null;
    let featuredTools: ToolRecord[] = [];
    let archivedDrops: DropRecord[] = [];
    let sponsors: SponsorRecord[] = [];
    let makers: MakerRecord[] = [];

    // Handle drops result
    if (dropsResult.status === 'fulfilled') {
      const { featuredDrop: fetchedFeaturedDrop, archivedDrops: fetchedArchivedDrops } = dropsResult.value;
      featuredDrop = fetchedFeaturedDrop;
      archivedDrops = fetchedArchivedDrops;

      // Fetch tools for featured drop if it exists
      if (featuredDrop && featuredDrop.fields.Tools && featuredDrop.fields.Tools.length > 0) {
        console.log(`[DEBUG] Fetching tools for featured drop: ${featuredDrop.id}`);
        try {
          const toolPromises = featuredDrop.fields.Tools.map(toolId => base("Tools").find(toolId));
          const rawTools = await Promise.all(toolPromises);
          featuredTools = rawTools.map(record => ({
            id: record.id,
            fields: record.fields,
          })) as ToolRecord[];
          console.log(`[DEBUG] Fetched ${featuredTools.length} tools for the featured drop.`);
        } catch (error) {
          console.error("❌ Error fetching tools:", error);
        }
      } else {
        console.log("[DEBUG] No featured drop or no tools linked to featured drop.");
      }
    } else {
      console.error("❌ Error fetching drops:", dropsResult.reason);
    }

    // Handle sponsors result
    if (sponsorsResult.status === 'fulfilled') {
      sponsors = sponsorsResult.value.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as SponsorRecord[];
      console.log(`[DEBUG] Fetched ${sponsors.length} sponsors.`);
    } else {
      console.error("❌ Error fetching sponsors:", sponsorsResult.reason);
    }

    // Handle makers result
    if (makersResult.status === 'fulfilled') {
      makers = makersResult.value.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as MakerRecord[];
      console.log(`[DEBUG] Fetched ${makers.length} makers.`);
    } else {
      console.error("❌ Error fetching makers:", makersResult.reason);
    }

    const responseData = {
      success: true,
      data: { featuredDrop, featuredTools, archivedDrops, sponsors, makers },
    };

    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          "Vary": "Accept-Encoding"
        } 
      }
    );
  } catch (error) {
    console.error("❌ Critical error in getHomePageDataForApi:", error);
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
          "Cache-Control": "no-cache, no-store, must-revalidate"
        } 
      }
    );
  }
}
