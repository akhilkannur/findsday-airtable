// app/working-page.tsx - This will be our Airtable-connected version once the static version works
import Header from "../components/Header";
import Airtable, { Record, FieldSet } from 'airtable';
import { base, type ToolRecord, type SponsorRecord, type MakerRecord, getLatestDropNumber } from "@/lib/airtableClient";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    console.log("Fetching home page data...");

    let tools: ToolRecord[] = [];
    let sponsors: SponsorRecord[] = [];
    let makers: MakerRecord[] = [];
    let latestDropNumber = 1;

    try {
      console.log("[DEBUG] Fetching all tools for display on homepage.");
      const allToolsRecords = await base("Tools")
        .select({
          sort: [{ field: "Created At", direction: "desc" }],
        })
        .firstPage();

      tools = allToolsRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as ToolRecord[];
      console.log(`[DEBUG] Fetched ${tools.length} tools for homepage display.`);
    } catch (error) {
      console.error("❌ Error fetching tools:", error);
    }

    try {
      const sponsorsRecords = await base("Sponsors").select({ maxRecords: 2 }).firstPage();
      sponsors = sponsorsRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as SponsorRecord[];
      console.log(`[DEBUG] Fetched ${sponsors.length} sponsors.`);
    } catch (error) {
      console.error("❌ Error fetching sponsors:", error);
    }

    try {
      const makersRecords = await base("Makers").select({ maxRecords: 5 }).firstPage();
      makers = makersRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as MakerRecord[];
      console.log(`[DEBUG] Fetched ${makers.length} makers.`);
    } catch (error) {
      console.error("❌ Error fetching makers:", error);
    }

    try {
      latestDropNumber = await getLatestDropNumber();
    } catch (error) {
      console.error("❌ Error fetching latest drop number:", error);
      latestDropNumber = 1;
    }

    return { tools, sponsors, makers, latestDropNumber };
  } catch (error) {
    console.error("❌ Critical error in getHomePageData:", error);
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }
}

export default async function WorkingPage() {
  let pageData;
  try {
    pageData = await getHomePageData();
  } catch (error) {
    console.error("❌ Failed to load page data:", error);
    pageData = { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }

  const { tools, sponsors, makers, latestDropNumber } = pageData;

  const heroGraphicUrl = "/placeholder.svg?height=400&width=400";
  const footerGraphicUrl = "/placeholder.svg?height=40&width=40";

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Airtable Data Test</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Tools ({tools.length})</h2>
              {tools.length > 0 ? (
                <div className="grid gap-4">
                  {tools.map((tool) => (
                    <div key={tool.id} className="bg-charcoal-dark p-4 rounded border border-gray-800">
                      <h3 className="font-bold">{tool.fields.Name || "Unnamed Tool"}</h3>
                      <p className="text-gray-400">{tool.fields.Tagline || "No tagline"}</p>
                      <p className="text-sm text-gray-500">Category: {tool.fields.Category || "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No tools found</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Makers ({makers.length})</h2>
              {makers.length > 0 ? (
                <div className="grid gap-4">
                  {makers.map((maker) => (
                    <div key={maker.id} className="bg-charcoal-dark p-4 rounded border border-gray-800">
                      <h3 className="font-bold">{maker.fields.Name || "Unnamed Maker"}</h3>
                      <p className="text-gray-400">{maker.fields["Maker Title"] || "No title"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No makers found</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Sponsors ({sponsors.length})</h2>
              {sponsors.length > 0 ? (
                <div className="grid gap-4">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="bg-charcoal-dark p-4 rounded border border-gray-800">
                      <h3 className="font-bold">{sponsor.fields.Name || "Unnamed Sponsor"}</h3>
                      <p className="text-gray-400">{sponsor.fields.Blurb || "No blurb"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No sponsors found</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Latest Drop Number: {latestDropNumber}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
