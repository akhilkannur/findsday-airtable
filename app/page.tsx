// app/page.tsx
import Header from "../components/Header";
import Airtable, { Record, FieldSet } from 'airtable';
import { base, type ToolRecord, type SponsorRecord, type MakerRecord } from "@/lib/airtableClient";
import Image from "next/image"; // Import Image component

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    console.log("Fetching home page data...");

    // --- Fetch Latest Drop Record ---
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 1,
      })
      .firstPage();

    let latestDropNumber = 1;
    let latestDropRecordId = null;

    if (dropsRecords.length > 0) {
      const potentialDropNumber = dropsRecords[0].fields["Drop Number"];
      if (typeof potentialDropNumber === "number" && !isNaN(potentialDropNumber)) {
        latestDropNumber = potentialDropNumber;
        latestDropRecordId = dropsRecords[0].id;
        console.log(`Latest Drop found: Drop Number ${latestDropNumber}, Record ID: ${latestDropRecordId}`);
      } else {
        console.warn("Latest drop record found, but 'Drop Number' field is not a valid number.");
      }
    } else {
      console.warn("No 'Drops' records found in Airtable. Defaulting to Drop Number 1.");
    }

    // --- Fetch Tools linked to the Latest Drop Record ---
    let toolsRecords: Airtable.Record<FieldSet>[] = [];
    if (latestDropRecordId) {
      console.log(`Attempting to fetch tools for Drop Record ID: ${latestDropRecordId}`);
      const fetchedToolsRecords = await base("Tools")
        .select({
          filterByFormula: `{Drop} = '${latestDropRecordId}'`, // Ensure 'Drop' is the linked record field name
          sort: [{ field: "Name", direction: "asc" }],
        })
        .firstPage();
      toolsRecords = [...fetchedToolsRecords];
      console.log(`Fetched ${toolsRecords.length} tools for Drop Record ID: ${latestDropRecordId}`);
      if (toolsRecords.length === 0) {
        console.log("No tools found linked to the latest drop. Check Airtable 'Tools' table 'Drop' field links.");
      }
    } else {
      console.log("No latest drop record ID available, skipping tool fetch.");
    }

    const tools = toolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[];

    const sponsorsRecords = await base("Sponsors").select({ maxRecords: 2 }).firstPage();
    const sponsors = sponsorsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[];
    console.log(`Fetched ${sponsors.length} sponsors.`);

    const makersRecords = await base("Makers").select({ maxRecords: 5 }).firstPage();
    const makers = makersRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[];
    console.log(`Fetched ${makers.length} makers.`);

    return { tools, sponsors, makers, latestDropNumber };
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }
}

export default async function Home() {
  const { tools, sponsors, makers, latestDropNumber } = await getHomePageData();

  // Placeholder for abstract graphic in hero section
  const heroGraphicUrl = "/placeholder.svg?height=400&width=400";
  const newReleaseGraphicUrl = "/placeholder.svg?height=300&width=500";
  const articleGraphic1Url = "/placeholder.svg?height=200&width=300";
  const articleGraphic2Url = "/placeholder.svg?height=200&width=300";
  const articleGraphic3Url = "/placeholder.svg?height=200&width=300";
  const articleGraphic4Url = "/placeholder.svg?height=200&width=300";
  const footerGraphicUrl = "/placeholder.svg?height=200&width=200";


  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-balance">
              The Strongest Signal<br />
              in Design Tools
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Deep dives on the tools and workflows used in design work. Insider leaks. Early access to news. Data-backed forecasts on where design is going and what&apos;s worth your attention.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>JOIN 100K+ READERS FROM</span>
              <div className="flex space-x-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Icon 1" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Icon 2" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Icon 3" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Icon 4" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Icon 5" width={20} height={20} />
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

      {/* NEW RELEASES (TOOLS) */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">New Releases</h2>
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
                      src={tool.fields.Image[0].url || "/placeholder.svg"}
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
                      <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">TOOLS</span>
                      <span>{tool.fields["Drop Date"] ? new Date(tool.fields["Drop Date"]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{tool.fields.Name}</h3>
                    <p className="text-gray-400 text-base line-clamp-3">{tool.fields.Tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No tools found for this drop. Please ensure tools are linked to the latest drop in Airtable.</p>
          )}
        </div>
      </section>

      {/* ARTICLES (Placeholder) */}
      <section className="py-24 px-4 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Articles</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Article Card 1 */}
            <div className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <Image src={articleGraphic1Url || "/placeholder.svg"} alt="Article graphic" width={800} height={450} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                  <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">RESEARCH</span>
                  <span>APR 30, 2025</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You Can&apos;t Prompt This</h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  Exploring the limits of AI prompting and the unique human element in creative work.
                </p>
              </div>
            </div>
            {/* Placeholder Article Card 2 */}
            <div className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <Image src={articleGraphic2Url || "/placeholder.svg"} alt="Article graphic" width={800} height={450} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                  <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">BRANDING</span>
                  <span>APR 11, 2025</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Brand as product&apos;s secret weapon</h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  How strong branding can elevate a product beyond its features and functionalities.
                </p>
              </div>
            </div>
            {/* Placeholder Article Card 3 */}
            <div className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <Image src={articleGraphic3Url || "/placeholder.svg"} alt="Article graphic" width={800} height={450} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                  <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">COMMUNICATION</span>
                  <span>MAY 5, 2022</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ideas from Developers on Handling UX Feedback</h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  Bridging the gap between development and user experience through effective communication.
                </p>
              </div>
            </div>
            {/* Placeholder Article Card 4 */}
            <div className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <Image src={articleGraphic4Url || "/placeholder.svg"} alt="Article graphic" width={800} height={450} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                  <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">RESEARCH</span>
                  <span>MAR 8, 2022</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Translating User Research Into Design</h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  Practical steps to effectively integrate user research findings into the design process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAKERS (OUR READERS) */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Our Readers</h2>
            <a href="#" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </a>
          </div>
          {makers.length ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 justify-items-center">
              {makers.map((maker) => (
                <div key={maker.id} className="flex flex-col items-center text-center">
                  {maker.fields.Photo?.[0] ? (
                    <Image
                      src={maker.fields.Photo[0].url || "/placeholder.svg"}
                      alt={maker.fields.Name ? `${maker.fields.Name}'s profile photo` : "Maker photo"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-full border-2 border-gray-700"
                    />
                  ) : (
                    <div className="w-20 h-20 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                      M
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{maker.fields.Name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Makers loading…</p>
          )}

          {/* Testimonials */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg">
              <p className="text-lg italic text-gray-300">
                “One of the only design newsletters I open and read every single time 💯”
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">MICHAEL RIDDERING</p>
              <p className="text-xs text-gray-500">FOUNDER @ INFLIGHT</p>
            </div>
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg">
              <p className="text-lg italic text-gray-300">
                “I always look forward to a UX Tools newsletter.”
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">ANDREW HOGAN</p>
              <p className="text-xs text-gray-500">HEAD OF INSIGHTS @ FIGMA</p>
            </div>
          </div>
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
              <span className="text-2xl font-bold">UX TOOLS</span>
            </div>
            <p className="text-sm text-gray-400">
              Industry intel. Tool breakdowns. Honest takes on what&apos;s working and what&apos;s just hype.
            </p>
            <p className="text-xs text-gray-500">© 2017 - 2025 UX Tools. All rights reserved.</p>
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
