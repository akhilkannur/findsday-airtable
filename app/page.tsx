// app/page.tsx
import Header from "../components/Header";
import Airtable, { Record, FieldSet } from 'airtable';
import { base, type ToolRecord, type SponsorRecord, type MakerRecord, getLatestDropNumber } from "@/lib/airtableClient";
import Image from "next/image"; // Import Image component

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    console.log("Fetching home page data...");

    // --- Fetch All Tools (temporarily replacing latest drop logic for debugging) ---
    console.log("[DEBUG] Fetching all tools for display on homepage.");
    const allToolsRecords = await base("Tools")
      .select({
        sort: [{ field: "Created At", direction: "desc" }], // Sort by creation date
      })
      .firstPage(); // Fetch only the first page for initial display

    const tools = allToolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[];
    console.log(`[DEBUG] Fetched ${tools.length} tools for homepage display.`);

    const sponsorsRecords = await base("Sponsors").select({ maxRecords: 2 }).firstPage();
    const sponsors = sponsorsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[];
    console.log(`[DEBUG] Fetched ${sponsors.length} sponsors.`);

    const makersRecords = await base("Makers").select({ maxRecords: 5 }).firstPage();
    const makers = makersRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[];
    console.log(`[DEBUG] Fetched ${makers.length} makers.`);

    const latestDropNumber = await getLatestDropNumber(); 

    return { tools, sponsors, makers, latestDropNumber };
  } catch (error) {
    console.error("❌ Error fetching data from Airtable:", error);
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }
}

export default async function Home() {
  const { tools, sponsors, makers, latestDropNumber } = await getHomePageData();

  // Placeholder for abstract graphic in hero section
  const heroGraphicUrl = "/placeholder.svg?height=400&width=400";
  const footerGraphicUrl = "/placeholder.svg?height=40&width=40";


  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-balance">
              The Hottest Tool Drops.<br />
              Every Thursday.
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Deep dives on the tools and workflows used in sales and product work. Insider leaks. Early access to news. Data-backed forecasts on where the industry is going and what&apos;s worth your attention.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>JOIN 100K+ READERS FROM</span>
              <div className="flex space-x-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Company Logo 1" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Company Logo 2" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Company Logo 3" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Company Logo 4" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Company Logo 5" width={20} height={20} />
              </div>
            </div>
            <form className="mt-8 max-w-sm space-y-3">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-transparent border-b border-gray-600 focus:border-accent-pink outline-none py-2 text-white placeholder-gray-500"
              />
              <button className="w-full bg-accent-pink text-charcoal font-bold py-3 uppercase tracking-widest text-sm hover:bg-accent-pink/80 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <Image src={heroGraphicUrl || "/placeholder.svg"} alt="Abstract graphic" width={400} height={400} className="object-contain" />
          </div>
        </div>
      </section>

      {/* NEW RELEASES (ALL TOOLS) */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">New Releases (All Tools)</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          {tools.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.slice(0, 2).map((tool) => ( // Displaying only first 2 tools for "New Releases"
                <div
                  key={tool.id}
                  className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => window.open(`/tool/${tool.id}`, '_blank')}
                >
                  {tool.fields.Image?.[0] ? (
                    <Image
                      src={tool.fields.Image[0].url || "/placeholder.svg?height=450&width=800&query=tool image placeholder"}
                      alt={tool.fields.Name ? `${tool.fields.Name} screenshot or logo` : "Tool image"}
                      width={800}
                      height={450}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-sm font-bold">
                      NO IMAGE
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                      <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">{tool.fields.Category || "TOOL"}</span>
                      <span>{tool.fields["Drop Date"] ? new Date(tool.fields["Drop Date"]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{tool.fields.Name || "Untitled Tool"}</h3>
                    <p className="text-gray-400 text-base line-clamp-3">{tool.fields.Tagline || "No tagline available."}</p>
                    {tool.fields["Maker Quote"] && (
                      <blockquote className="text-sm italic text-gray-500 mt-4">
                        “{tool.fields["Maker Quote"]}”
                      </blockquote>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No tools found. Please add tools in Airtable.</p>
          )}
        </div>
      </section>

      {/* MAKERS (OUR READERS) - Now a card section */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Meet the Makers</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          {makers.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {makers.map((maker) => (
                <div
                  key={maker.id}
                  className="bg-charcoal-dark border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
                >
                  {maker.fields.Photo?.[0] ? (
                    <Image
                      src={maker.fields.Photo[0].url || "/placeholder.svg?height=120&width=120&query=maker profile photo"}
                      alt={maker.fields.Name ? `${maker.fields.Name}'s profile photo` : "Maker photo"}
                      width={120}
                      height={120}
                      className="w-28 h-28 object-cover rounded-full border-4 border-accent-green mb-4 shadow-lg"
                    />
                  ) : (
                    <div className="w-28 h-28 border-4 border-accent-green rounded-full flex items-center justify-center text-accent-green text-3xl font-bold mb-4 bg-gray-900">
                      {maker.fields.Name ? maker.fields.Name.charAt(0).toUpperCase() : "M"}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-1">{maker.fields.Name || "Unknown Maker"}</h3>
                  {maker.fields["Maker Title"] && (
                    <p className="text-base text-gray-400 mb-2">{maker.fields["Maker Title"]}</p>
                  )}
                  {maker.fields["Maker Quote"] && (
                    <blockquote className="text-lg italic text-gray-500 mt-2 line-clamp-3">
                      “{maker.fields["Maker Quote"]}”
                    </blockquote>
                  )}
                  {maker.fields["Profile Link"] && (
                    <a
                      href={maker.fields["Profile Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-pink hover:underline mt-4 text-sm font-semibold"
                    >
                      View Profile →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Makers loading…</p>
          )}

          {/* Testimonials */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg shadow-md hover:border-accent-green transition-colors">
              <p className="text-lg italic text-gray-300">
                “One of the only sales newsletters I open and read every single time 💯”
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">MICHAEL RIDDERING</p>
              <p className="text-xs text-gray-500">FOUNDER @ INFLIGHT</p>
            </div>
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg shadow-md hover:border-accent-green transition-colors">
              <p className="text-lg italic text-gray-300">
                “I always look forward to a Findsday newsletter.”
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">ANDREW HOGAN</p>
              <p className="text-xs text-gray-500">HEAD OF INSIGHTS @ FIGMA</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS (SPONSORS) */}
      <section className="py-24 px-4 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Our Valued Sponsors</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          {sponsors.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.fields["Website URL"] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-charcoal-dark border border-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
                >
                  {sponsor.fields.Logo?.[0] ? (
                    <Image
                      src={sponsor.fields.Logo[0].url || "/placeholder.svg?height=100&width=100&query=sponsor logo"}
                      alt={sponsor.fields.Name ? `${sponsor.fields.Name} logo` : "Sponsor logo"}
                      width={100}
                      height={100}
                      className="w-28 h-28 object-contain flex-shrink-0 p-2 bg-gray-900 rounded-lg border border-gray-700"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-900 flex items-center justify-center text-gray-400 text-sm font-bold rounded-lg flex-shrink-0 border border-gray-700">
                      NO LOGO
                    </div>
                  )}
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{sponsor.fields.Name || "Untitled Sponsor"}</h3>
                    <p className="text-gray-400 text-base line-clamp-3">{sponsor.fields.Blurb || "No blurb available."}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No sponsors found. Please add sponsors in Airtable.</p>
          )}
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="py-24 px-4 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Archive</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((offset) => (
              <div
                key={offset}
                className="border border-gray-800 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:bg-charcoal-dark transition"
              >
                <span className="font-bold tracking-wider text-gray-300">
                  DROP #{latestDropNumber - offset} —{" "}
                  {new Date(Date.now() - offset * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).toUpperCase()}
                </span>
                <span className="text-2xl font-bold text-accent-green">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal-dark text-white py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src={footerGraphicUrl || "/placeholder.svg"} alt="Footer logo" width={40} height={40} />
              <span className="text-2xl font-bold">FINDSDAY</span>
            </div>
            <p className="text-sm text-gray-400">
              Industry intel. Tool breakdowns. Honest takes on what&apos;s working and what&apos;s just hype.
            </p>
            <p className="text-xs text-gray-500">© 2017 - 2025 Findsday. All rights reserved.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent-green transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Community</a></li>
            </ul>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent-green transition-colors">Media Kit</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-4">
            <button className="border border-gray-600 text-gray-400 px-6 py-3 text-sm font-bold uppercase hover:bg-gray-800 hover:text-white transition-colors">
              Read Manifesto →
            </button>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-accent-green transition-colors">X/Twitter</a>
              <a href="#" className="hover:text-accent-green transition-colors">YouTube</a>
              <a href="#" className="hover:text-accent-green transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent-green transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent-green transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
