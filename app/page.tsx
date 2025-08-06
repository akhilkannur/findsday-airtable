// app/page.tsx
import Header from "../components/Header";
import { base, type ToolRecord, type SponsorRecord, type MakerRecord } from "@/lib/airtableClient";
export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    console.log("🚀 Starting getHomePageData function");
    console.log("🔑 Environment check:", {
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      apiKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
      baseId: process.env.AIRTABLE_BASE_ID
    });

    // Step 1: Test basic connection
    console.log("🔍 Testing basic Airtable connection...");
    try {
      const testRecords = await base("Drops").select({ maxRecords: 1 }).firstPage();
      console.log("✅ Basic connection successful, test records:", testRecords.length);
    } catch (testError) {
      console.error("❌ Basic connection failed:", testError);
      throw testError;
    }

    // Step 2: Fetch drops
    console.log("📊 Fetching drops...");
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 1,
      })
      .firstPage();
    console.log("📊 Drops found:", dropsRecords.length);
    if (dropsRecords.length > 0) {
      console.log("📊 First drop record:", JSON.stringify(dropsRecords[0].fields, null, 2)); // Log full fields object
    }
    const latestDropNumber =
      dropsRecords.length > 0 && typeof dropsRecords[0].fields["Drop Number"] === "number"
        ? dropsRecords[0].fields["Drop Number"]
        : 1;
    console.log("📊 Latest drop number:", latestDropNumber);

    // Get the ID of the latest Drop record to use for filtering
    const latestDropId = dropsRecords.length > 0 ? dropsRecords[0].id : null;
    console.log("📊 Latest Drop ID:", latestDropId);

    // Step 3: Fetch tools using the Drop record ID
    let toolsRecords = [];
    if (latestDropId) {
        console.log("🛠️ Fetching tools linked to Drop ID:", latestDropId);
        toolsRecords = await base("Tools")
        .select({
            // Filter using the linked record ID
            filterByFormula: `RECORD_ID() = '${latestDropId}'`, // This is incorrect, see below
            sort: [{ field: "Name", direction: "asc" }],
        })
        .firstPage();
    } else {
        console.warn("⚠️ No latest Drop ID found, skipping tool fetch.");
    }

    // --- CORRECTION ---
    // The formula above is wrong for a linked field.
    // If the field in 'Tools' linking to 'Drops' is called 'Drop' (as per your screenshot),
    // the correct formula is:
    console.log("🛠️ Fetching tools linked to Drop ID (Corrected Formula):", latestDropId);
    toolsRecords = await base("Tools")
      .select({
        // Filter using the linked record ID in the 'Drop' field
        filterByFormula: `{Drop} = '${latestDropId}'`,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();
    // --- END CORRECTION ---

    console.log("🛠️ Tools records found (after correction):", toolsRecords.length);
    if (toolsRecords.length > 0) {
      console.log("🛠️ First tool record:", JSON.stringify(toolsRecords[0].fields, null, 2)); // Log full fields object
    } else {
      // If no tools found for latest drop, let's try fetching any tools
      console.log("🔍 No tools for latest drop, checking all tools...");
      const allToolsRecords = await base("Tools").select({ maxRecords: 5 }).firstPage();
      console.log("🛠️ Total tools in database:", allToolsRecords.length);
      if (allToolsRecords.length > 0) {
        console.log("🛠️ Sample tool record:", JSON.stringify(allToolsRecords[0].fields, null, 2)); // Log full fields object
      }
    }
    const tools = toolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[];

    // Step 4: Fetch sponsors with debugging
    console.log("🤝 Fetching sponsors...");
    const sponsorsRecords = await base("Sponsors").select({ maxRecords: 2 }).firstPage();
    console.log("🤝 Sponsors found:", sponsorsRecords.length);
    if (sponsorsRecords.length > 0) {
      console.log("🤝 First sponsor record:", JSON.stringify(sponsorsRecords[0].fields, null, 2)); // Log full fields object
    }
    const sponsors = sponsorsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[];

    // Step 5: Fetch makers with debugging
    console.log("👨‍💻 Fetching makers...");
    const makersRecords = await base("Makers").select({ maxRecords: 5 }).firstPage();
    console.log("👨‍💻 Makers found:", makersRecords.length);
    if (makersRecords.length > 0) {
      console.log("👨‍💻 First maker record:", JSON.stringify(makersRecords[0].fields, null, 2)); // Log full fields object
    }
    const makers = makersRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[];

    console.log("✅ Final results:", {
      tools: tools.length,
      sponsors: sponsors.length,
      makers: makers.length,
      latestDropNumber
    });
    return { tools, sponsors, makers, latestDropNumber };
  } catch (error) {
    console.error("❌ ERROR in getHomePageData:", error);
    // Enhanced error logging
    if (error instanceof Error) {
      console.error("❌ Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    // Check for common Airtable errors
    if (typeof error === 'object' && error !== null) {
      console.error("❌ Error object:", error);
      // Check for authentication errors
      if ('statusCode' in error) {
        console.error("❌ HTTP Status Code:", error.statusCode);
      }
      if ('message' in error && typeof error.message === 'string') {
        if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
          console.error("❌ AUTHENTICATION ERROR: Check your API key");
        } else if (error.message.includes('not found') || error.message.includes('404')) {
          console.error("❌ NOT FOUND ERROR: Check your base ID or table names");
        }
      }
    }
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }
}

export default async function Home() {
  console.log("🏠 Home component rendering...");
  const { tools, sponsors, makers, latestDropNumber } = await getHomePageData();
  return (
    <div className="bg-paper-white text-charcoal">
      <Header />
      {/* Debug Info - Remove in production */}
      <div className="bg-yellow-100 border border-yellow-400 p-4 text-sm text-yellow-800">
        <strong>🐛 Debug Info:</strong> Tools: {tools.length}, Sponsors: {sponsors.length}, Makers: {makers.length}, Drop: {latestDropNumber}
        <br />
        <strong>Environment:</strong> API Key: {process.env.AIRTABLE_API_KEY ? '✅ Set' : '❌ Missing'}, Base ID: {process.env.AIRTABLE_BASE_ID ? '✅ Set' : '❌ Missing'}
        <br />
        <small>Check browser console and server logs for detailed debugging info</small>
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
                    {/* Large thumbnail */}
                    {tool.fields.Image?.[0] ? (
                      <img
                        src={tool.fields.Image[0].url}
                        alt={tool.fields.Name as string || "Tool Image"}
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
              <p className="text-gray-500 mb-2">⚠️ No tools found</p>
              <p className="text-sm text-red-600">
                This could mean:
                <br />• No tools exist for Drop #{latestDropNumber}
                <br />• Airtable connection issues
                <br />• Field name mismatches
              </p>
            </div>
          )}
        </div>
      </section>
      {/* MAKERS */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12">The Makers</h2>
          {makers.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {makers.map((maker, idx) => {
                const cardThemes = ["bg-charcoal text-white", "bg-white text-charcoal border border-gray-200"];
                const theme = cardThemes[idx % 2];
                return (
                  <div
                    key={maker.id}
                    className={`${theme} rounded-lg p-6 flex flex-col aspect-[3/4] hover:scale-[1.02] transition-transform duration-200`}
                  >
                    {maker.fields.Photo?.[0] ? (
                      <img
                        src={maker.fields.Photo[0].url}
                        alt={maker.fields.Name || "Maker Photo"}
                        className="w-20 h-20 object-cover rounded-full mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 border-2 border-current rounded-full mb-4 flex items-center justify-center text-xs font-bold">
                        M
                      </div>
                    )}
                    <h3 className="text-lg font-black">{maker.fields.Name}</h3>
                    <p className="text-sm leading-snug mt-2 opacity-80 flex-grow">
                      {maker.fields.Bio ? maker.fields.Bio.slice(0, 80) + "…" : ""}
                    </p>
                    {maker.fields["Profile Link"] && (
                      <a
                        href={maker.fields["Profile Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-xs font-bold uppercase underline-offset-4"
                      >
                        Profile →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-gray-500 mb-2">⚠️ No makers found</p>
              <p className="text-sm text-red-600">Check your Makers table in Airtable</p>
            </div>
          )}
        </div>
      </section>
      {/* SPONSORS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Partners</h2>
          {sponsors.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sponsors.map((sponsor, idx) => (
                <div
                  key={sponsor.id}
                  className={`rounded-lg p-10 flex flex-col justify-between aspect-[16/9] ${
                    idx % 2 === 0 ? "bg-charcoal text-white" : "bg-gray-100 text-charcoal border border-gray-200"
                  }`}
                >
                  <div>
                    {sponsor.fields.Logo?.[0] ? (
                      <img
                        src={sponsor.fields.Logo[0].url}
                        alt={sponsor.fields.Name || "Sponsor Logo"}
                        className="h-12 object-contain mb-4"
                      />
                    ) : (
                      <div className="h-12 border-b-2 border-current flex items-center font-bold mb-4">LOGO</div>
                    )}
                    <h3 className="text-2xl font-black">{sponsor.fields.Name}</h3>
                    <p className="text-sm mt-2 opacity-80">{sponsor.fields.Blurb}</p>
                  </div>
                  {sponsor.fields["Website URL"] && (
                    <a
                      href={sponsor.fields["Website URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-xs font-bold uppercase underline-offset-4"
                    >
                      Visit Partner →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-gray-500 mb-2">⚠️ No partners found</p>
              <p className="text-sm text-red-600">Check your Sponsors table in Airtable</p>
            </div>
          )}
        </div>
      </section>
      {/* ARCHIVE */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Archive</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((offset) => (
              <div
                key={offset}
                className="border border-gray-300 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:bg-charcoal hover:text-white transition"
              >
                <span className="font-black tracking-wider">
                  DROP #{latestDropNumber - offset} —{" "}
                  {new Date(Date.now() - offset * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).toUpperCase()}
                </span>
                <span className="text-2xl font-black">↓</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-3xl font-black">FINDSDAY</h3>
            <p className="text-sm text-gray-400 mt-1">Curating revenue software. Every Thursday.</p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            {["TW", "IG", "LI"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-12 h-12 border border-gray-500 flex items-center justify-center text-xs font-bold hover:bg-sales-green hover:text-charcoal transition"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
