// app/api/homepage/route.ts
import { base, type ToolRecord, type SponsorRecord, type MakerRecord, type DropRecord, getFeaturedDropAndArchivedDrops } from "@/lib/airtableClient";

export const dynamic = "force-dynamic"; // Ensure this route is dynamic

export async function GET() {
  try {
    console.log("Fetching home page data for API...");

    let featuredDrop: DropRecord | null = null;
    let featuredTools: ToolRecord[] = [];
    let archivedDrops: DropRecord[] = [];
    let sponsors: SponsorRecord[] = [];
    let makers: MakerRecord[] = [];

    try {
      const { featuredDrop: fetchedFeaturedDrop, archivedDrops: fetchedArchivedDrops } = await getFeaturedDropAndArchivedDrops();
      featuredDrop = fetchedFeaturedDrop;
      archivedDrops = fetchedArchivedDrops;

      if (featuredDrop && featuredDrop.fields.Tools && featuredDrop.fields.Tools.length > 0) {
        console.log(`[DEBUG] Fetching tools for featured drop: ${featuredDrop.id}`);
        const toolPromises = featuredDrop.fields.Tools.map(toolId => base("Tools").find(toolId));
        const rawTools = await Promise.all(toolPromises);
        featuredTools = rawTools.map(record => ({
          id: record.id,
          fields: record.fields,
        })) as ToolRecord[];
        console.log(`[DEBUG] Fetched ${featuredTools.length} tools for the featured drop.`);
      } else {
        console.log("[DEBUG] No featured drop or no tools linked to featured drop.");
      }
    } catch (error) {
      console.error("❌ Error fetching drops or featured tools:", error);
    }

    try {
      // Fetch ALL sponsors now, not just maxRecords: 3
      const sponsorsRecords = await base("Sponsors").select().all();
      sponsors = sponsorsRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as SponsorRecord[];
      console.log(`[DEBUG] Fetched ${sponsors.length} sponsors.`);
    } catch (error) {
      console.error("❌ Error fetching sponsors:", error);
    }

    try {
      const makersRecords = await base("Makers").select({ maxRecords: 6 }).firstPage();
      makers = makersRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as MakerRecord[];
      console.log(`[DEBUG] Fetched ${makers.length} makers.`);
    } catch (error) {
      console.error("❌ Error fetching makers:", error);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: { featuredDrop, featuredTools, archivedDrops, sponsors, makers },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Critical error in getHomePageDataForApi:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error fetching homepage data",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
