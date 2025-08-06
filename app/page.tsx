// app/page.tsx - Diagnostic version
import Header from "../components/Header";
import { base, type ToolRecord, type SponsorRecord, type MakerRecord } from "@/lib/airtableClient";

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    console.log("🚀 Starting diagnostic getHomePageData function");

    // Step 1: Check what's actually in the Drops table
    console.log("📊 Checking ALL drops in database...");
    const allDropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 10, // Get more drops to see what exists
      })
      .firstPage();
    
    console.log("📊 All drops found:", allDropsRecords.length);
    allDropsRecords.forEach((drop, index) => {
      console.log(`📊 Drop ${index + 1}:`, drop.fields);
    });

    const latestDropNumber =
      allDropsRecords.length > 0 && typeof allDropsRecords[0].fields["Drop Number"] === "number"
        ? allDropsRecords[0].fields["Drop Number"]
        : 1;

    console.log("📊 Latest drop number determined:", latestDropNumber);

    // Step 2: Check what's actually in the Tools table (without filter first)
    console.log("🛠️ Checking ALL tools in database...");
    const allToolsRecords = await base("Tools")
      .select({
        maxRecords: 10, // Get first 10 tools to see what exists
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();
    
    console.log("🛠️ All tools found:", allToolsRecords.length);
    allToolsRecords.forEach((tool, index) => {
      console.log(`🛠️ Tool ${index + 1}:`, {
        name: tool.fields.Name,
        dropNumber: tool.fields["Drop Number"],
        category: tool.fields.Category,
        allFields: Object.keys(tool.fields)
      });
    });

    // Step 3: Now try to filter tools by the latest drop number
    console.log(`🛠️ Filtering tools for drop number: ${latestDropNumber}`);
    const toolsRecords = await base("Tools")
      .select({
        filterByFormula: `{Drop Number} = ${latestDropNumber}`,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();
    
    console.log("🛠️ Filtered tools found:", toolsRecords.length);
    
    const tools = toolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[];

    // Step 4: Check sponsors
    console.log("🤝 Checking sponsors...");
    const sponsorsRecords = await base("Sponsors").select({ maxRecords: 10 }).firstPage();
    console.log("🤝 Sponsors found:", sponsorsRecords.length);
    sponsorsRecords.forEach((sponsor, index) => {
      console.log(`🤝 Sponsor ${index + 1}:`, {
        name: sponsor.fields.Name,
        allFields: Object.keys(sponsor.fields)
      });
    });
    
    const sponsors = sponsorsRecords.slice(0, 2).map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[];

    // Step 5: Check makers
    console.log("👨‍💻 Checking makers...");
    const makersRecords = await base("Makers").select({ maxRecords: 10 }).firstPage();
    console.log("👨‍💻 Makers found:", makersRecords.length);
    makersRecords.forEach((maker, index) => {
      console.log(`👨‍💻 Maker ${index + 1}:`, {
        name: maker.fields.Name,
        allFields: Object.keys(maker.fields)
      });
    });
    
    const makers = makersRecords.slice(0, 5).map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[];

    console.log("✅ Final diagnostic results:", {
      allDropsCount: allDropsRecords.length,
      allToolsCount: allToolsRecords.length,
      filteredToolsCount: tools.length,
      sponsorsCount: sponsors.length,
      makersCount: makers.length,
      latestDropNumber
    });

    return { tools, sponsors, makers, latestDropNumber, allDropsRecords, allToolsRecords };
  } catch (error) {
    console.error("❌ ERROR in getHomePageData:", error);
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1, allDropsRecords: [], allToolsRecords: [] };
  }
}

export default async function Home() {
  console.log("🏠 Home component rendering...");
  const { tools, sponsors, makers, latestDropNumber, allDropsRecords, allToolsRecords } = await getHomePageData();

  return (
    <div className="bg-paper-white text-charcoal">
      <Header />

      {/* Enhanced Debug Info */}
      <div className="bg-blue-100 border border-blue-400 p-4 text-sm text-blue-800 space-y-2">
        <div><strong>🐛 Diagnostic Info:</strong></div>
        <div>Tools: {tools.length}, Sponsors: {sponsors.length}, Makers: {makers.length}, Drop: {latestDropNumber}</div>
        <div>Total Drops in DB: {allDropsRecords.length}, Total Tools in DB: {allToolsRecords.length}</div>
        <div>Environment: API Key: {process.env.AIRTABLE_API_KEY ? '✅ Set' : '❌ Missing'}, Base ID: {process.env.AIRTABLE_BASE_ID ? '✅ Set' : '❌ Missing'}</div>
        
        {allDropsRecords.length > 0 && (
          <div>
            <strong>Available Drops:</strong>
            {allDropsRecords.map((drop, i) => (
              <span key={i} className="ml-2 bg-blue-200 px-2 py-1 rounded text-xs">
                #{drop.fields["Drop Number"]}
              </span>
            ))}
          </div>
        )}
        
        {allToolsRecords.length > 0 && (
          <div>
            <strong>Sample Tools:</strong>
            {allToolsRecords.slice(0, 3).map((tool, i) => (
              <div key={i} className="ml-4 text-xs">
                • {tool.fields.Name} (Drop: {tool.fields["Drop Number"] || 'Not set'})
              </div>
            ))}
          </div>
        )}
        
        <div className="text-xs">Check browser console for detailed field information</div>
      </div>

      {/* HERO */}
      <section className="py-32 px-4 bg-charcoal text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-sales-green text-charcoal px-3 py-1 text-xs font-bold tracking-widest uppercase">
              Weekly Pipeline Multipliers
            </span>
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              Five Fresh Sales Tools.<br />
              <span className="text-sales-green">Curated Every&nbsp;Thursday.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              No fluff—just the software that actually moves revenue, tested and annotated by the makers themselves.
            </p>
            <form className="mt-8 max-w-sm space-y-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-transparent border-b border-gray-500 focus:border-sales-green outline-none py-2"
              />
              <button className="w-full bg-sales-green text-charcoal font-bold py-3 uppercase tracking-widest text-sm">
                Get the Drop
              </button>
            </form>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-64 h-64 border-4 border-sales-green flex items-center justify-center">
              <span className="text-8xl font-black text-sales-green">{latestDropNumber}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-sales-green">Drop #{latestDropNumber}</span>
            <h2 className="text-5xl font-black mt-2">This Week's Selection</h2>
          </div>

          {tools.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => {
                const cardThemes = [
                  "bg-charcoal text-white",
                  "bg-gray-100 text-charcoal border border-gray-200",
                  "bg-sales-green text-charcoal",
                ];
                const theme = cardThemes[index % cardThemes.length];
                return (
                  <div
                    key={tool.id}
                    className={`${theme} rounded-lg p-6 flex flex-col hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}
                    onClick={() => window.open(`/tool/${tool.id}`, '_blank')}
                  >
                    {tool.fields.Image?.[0] ? (
                      <img
                        src={tool.fields.Image[0].url}
                        alt={tool.fields.Name as string}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-sm font-bold">
                        NO IMAGE
                      </div>
                    )}

                    <h3 className="text-2xl font-black mb-2">{tool.fields.Name}</h3>
                    <span className="text-xs font-bold uppercase mb-2">{tool.fields.Category}</span>
                    <p className="text-sm flex-grow opacity-90">{tool.fields.Tagline}</p>
                    {tool.fields["Maker Quote"] && (
                      <blockquote className="text-xs italic opacity-80 mt-2">
                        "{tool.fields["Maker Quote"]}"
                      </blockquote>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-gray-500 mb-2">⚠️ No tools found for Drop #{latestDropNumber}</p>
              {allToolsRecords.length > 0 ? (
                <div className="text-sm text-red-600">
                  <p>Found {allToolsRecords.length} total tools in database, but none match Drop #{latestDropNumber}</p>
                  <p className="mt-2">Available drop numbers in tools: {
                    [...new Set(allToolsRecords.map(t => t.fields["Drop Number"]).filter(Boolean))]
                    .map(n => `#${n}`).join(', ') || 'None set'
                  }</p>
                </div>
              ) : (
                <p className="text-sm text-red-600">No tools found in database at all</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* MAKERS - Simplified for diagnostic */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12">The Makers</h2>
          {makers.length ? (
            <p className="text-center">Found {makers.length} makers</p>
          ) : (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-gray-500 mb-2">⚠️ No makers found</p>
            </div>
          )}
        </div>
      </section>

      {/* SPONSORS - Simplified for diagnostic */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Partners</h2>
          {sponsors.length ? (
            <p className="text-center">Found {sponsors.length} sponsors</p>
          ) : (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-gray-500 mb-2">⚠️ No partners found</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-black">FINDSDAY</h3>
          <p className="text-sm text-gray-400 mt-1">Diagnostic Mode</p>
        </div>
      </footer>
    </div>
  );
}
