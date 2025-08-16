// app/page.tsx - Full homepage with Airtable integration
import Header from "../components/Header"
import type { ToolRecord, SponsorRecord, MakerRecord, DropRecord } from "@/lib/airtableClient"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, ArrowRight } from "lucide-react"
import { generateToolUrl, generateDropUrl } from "@/lib/urlUtils"
import { base, getFeaturedDropAndArchivedDrops } from "@/lib/airtableClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Findsday - The Hottest Sales Tool Drops Every Thursday",
  description:
    "Deep dives on the tools and workflows used in sales and product work. Insider leaks. Early access to news. Data-backed forecasts on where the industry is going.",
  keywords: "sales tools, CRM, lead generation, sales software, productivity tools, findsday",
  openGraph: {
    title: "Findsday - The Hottest Sales Tool Drops Every Thursday",
    description:
      "Deep dives on the tools and workflows used in sales and product work. Join 100K+ readers from Salesforce, HubSpot, Stripe, and more.",
    type: "website",
    url: "https://findsday-airtable.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Findsday - The Hottest Sales Tool Drops Every Thursday",
    description: "Deep dives on the tools and workflows used in sales and product work. Join 100K+ readers.",
  },
}

export const revalidate = 300 // 5 minutes

async function getHomePageData() {
  try {
    console.log("[v0] Fetching home page data server-side...")

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
          fields: ["Name", "Photo", "Bio", "Profile Link"], // Only fetch needed fields
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
        console.log(`[v0] Fetching ${featuredDrop.fields.Tools.length} tools for featured drop`)
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

          console.log(`[v0] Successfully fetched ${featuredTools.length} tools`)
        } catch (error) {
          console.error("[v0] Error fetching tools:", error)
        }
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
    } else {
      console.error("[v0] Error fetching sponsors:", sponsorsResult.reason)
    }

    if (makersResult.status === "fulfilled") {
      console.log("[v0] Makers query successful, raw result:", makersResult.value.length, "records")
      makers = makersResult.value.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as MakerRecord[]
      console.log("[v0] Processed makers data:", makers.length, "makers")
      console.log("[v0] First maker sample:", makers[0]?.fields || "No makers found")
    } else {
      console.error("[v0] Error fetching makers - Status:", makersResult.status)
      console.error("[v0] Error fetching makers - Reason:", makersResult.reason)
      console.error("[v0] This suggests the Makers table might not exist or has permission issues")
    }

    return { featuredDrop, featuredTools, archivedDrops, sponsors, makers }
  } catch (error) {
    console.error("[v0] Critical error in getHomePageData:", error)
    throw error
  }
}

export default async function Home() {
  const pageData = await getHomePageData()
  const { featuredDrop, featuredTools, archivedDrops, sponsors, makers } = pageData

  const firstSponsor = sponsors.length > 0 ? sponsors[0] : null
  const remainingSponsors = sponsors.slice(1)

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
              The Hottest Tool Drops.
              <br />
              Every Thursday.
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-gray-400">
              Deep dives on the tools and workflows used in sales and product work. Insider leaks. Early access to news.
              Data-backed forecasts on where the industry is going and what&apos;s worth your attention.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
              <span className="whitespace-nowrap">JOIN 100K+ READERS FROM</span>
              <div className="flex space-x-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Salesforce" width={20} height={20} priority />
                <Image src="/placeholder.svg?height=20&width=20" alt="HubSpot" width={20} height={20} priority />
                <Image src="/placeholder.svg?height=20&width=20" alt="Stripe" width={20} height={20} priority />
                <Image src="/placeholder.svg?height=20&width=20" alt="Notion" width={20} height={20} priority />
                <Image src="/placeholder.svg?height=20&width=20" alt="Figma" width={20} height={20} priority />
              </div>
            </div>
            <form className="mt-6 sm:mt-8 max-w-sm space-y-3">
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
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Abstract tech graphic"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* FEATURED DROP */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {featuredDrop
                ? `Drop #${featuredDrop.fields["Drop Number"]} - ${new Date(featuredDrop.fields["Drop Date"] || "").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                : "No Featured Drop This Week"}
            </h2>
            {featuredDrop && (
              <Link
                href={generateDropUrl(featuredDrop.fields["Drop Number"] || 0, featuredDrop.id)}
                className="text-gray-400 hover:text-accent-green transition-colors"
              >
                View All Tools →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredTools.length > 0 ? (
              featuredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={generateToolUrl(tool.fields.Name || "", tool.id)}
                  className="relative bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-end p-4 sm:p-6 pb-6 sm:pb-8 min-h-[250px] sm:min-h-[300px] hover:shadow-lg hover:border-accent-pink transition-all duration-200 group"
                  style={{
                    backgroundImage:
                      tool.fields.Image && tool.fields.Image[0] ? `url(${tool.fields.Image[0].url})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {tool.fields.Image && tool.fields.Image[0] && (
                    <link rel="preload" as="image" href={tool.fields.Image[0].url} />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/80 to-transparent rounded-xl"></div>

                  <div className="relative z-10 flex flex-col h-full justify-end">
                    <span className="bg-gray-800 text-accent-green text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">
                      {tool.fields.Category || "Tool"}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                      {tool.fields.Name || "Unnamed Tool"}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base line-clamp-2 mb-4">
                      {tool.fields.Tagline || tool.fields.Description || "No description available"}
                    </p>
                    {tool.fields["Website URL"] && (
                      <div className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold group-hover:border-accent-pink group-hover:text-accent-pink transition-colors">
                        Visit Website <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No tools available for this drop yet.</p>
                <Link href="/admin" className="text-accent-green hover:text-accent-pink transition-colors">
                  Add some tools to get started →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Explore Our Complete Sales Tools Directory
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 mb-8">
            Beyond our weekly drops, discover hundreds of carefully curated sales tools. From CRM systems to lead
            generation, find everything you need to supercharge your sales workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/sales-tools/directory"
              className="bg-accent-green text-charcoal font-bold py-4 px-8 rounded-lg hover:bg-accent-green/80 transition-colors text-lg"
            >
              Browse Directory →
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>500+ tools</span>
              <span>•</span>
              <span>10+ categories</span>
              <span>•</span>
              <span>Expert reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST SPONSOR (between tools and makers) */}
      {firstSponsor && (
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-light border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">
              Featured Sponsor
            </h2>
            <a
              key={firstSponsor.id}
              href={firstSponsor.fields["Website URL"] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-charcoal-dark border border-gray-800 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 relative flex-shrink-0">
                {firstSponsor.fields.Logo && firstSponsor.fields.Logo[0] ? (
                  <Image
                    src={firstSponsor.fields.Logo[0].url || "/placeholder.svg"}
                    alt={`${firstSponsor.fields.Name} logo`}
                    fill
                    className="object-contain p-2 bg-gray-900 rounded-lg border border-gray-700"
                    loading="lazy"
                    sizes="(max-width: 640px) 80px, 112px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Logo</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {firstSponsor.fields.Name || "Sponsor"}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
                  {firstSponsor.fields.Blurb || "Supporting the Findsday community"}
                </p>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* MAKERS */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Meet the Makers</h2>
            <Link href="/admin" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {makers.length > 0 ? (
              makers.map((maker) => (
                <Link
                  key={maker.id}
                  href={maker.fields["Profile Link"] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-charcoal-dark border border-gray-800 rounded-lg p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200 group"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 relative mb-4">
                    {maker.fields.Photo && maker.fields.Photo[0] ? (
                      <Image
                        src={maker.fields.Photo[0].url || "/placeholder.svg"}
                        alt={`${maker.fields.Name}'s profile photo`}
                        fill
                        className="object-cover rounded-full border-4 border-accent-green shadow-lg"
                        loading="lazy"
                        sizes="(max-width: 640px) 80px, 112px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 rounded-full border-4 border-accent-green flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                    {maker.fields.Name || "Unknown Maker"}
                  </h3>
                  {maker.fields.Bio && (
                    <p className="text-sm sm:text-lg italic text-gray-500 mt-2 line-clamp-3">{maker.fields.Bio}</p>
                  )}
                  {maker.fields["Profile Link"] && (
                    <div className="inline-flex items-center mt-4 text-accent-pink hover:text-accent-green transition-colors text-xs sm:text-sm font-semibold">
                      View Profile <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No makers featured yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SPONSORS (Remaining) */}
      {remainingSponsors.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">More Valued Sponsors</h2>
              <Link href="/admin" className="text-gray-400 hover:text-accent-green transition-colors">
                Manage →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {remainingSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.fields["Website URL"] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-charcoal-dark border border-gray-800 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 relative flex-shrink-0">
                    {sponsor.fields.Logo && sponsor.fields.Logo[0] ? (
                      <Image
                        src={sponsor.fields.Logo[0].url || "/placeholder.svg"}
                        alt={`${sponsor.fields.Name} logo`}
                        fill
                        className="object-contain p-2 bg-gray-900 rounded-lg border border-gray-700"
                        loading="lazy"
                        sizes="(max-width: 640px) 80px, 112px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Logo</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {sponsor.fields.Name || "Sponsor"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
                      {sponsor.fields.Blurb || "Supporting the Findsday community"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ARCHIVE */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Archive</h2>
            <Link href="/admin/tools" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {archivedDrops.length > 0 ? (
              archivedDrops.map((drop) => (
                <Link
                  key={drop.id}
                  href={generateDropUrl(drop.fields["Drop Number"] || 0, drop.id)}
                  className="flex items-center gap-4 bg-charcoal-dark border border-gray-800 rounded-lg p-4 hover:shadow-lg hover:border-accent-pink transition-all duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg sm:text-xl text-gray-400 flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Drop #{drop.fields["Drop Number"]}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {drop.fields["Drop Date"]
                        ? new Date(drop.fields["Drop Date"]).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                    {drop.fields["Short Description"] && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">{drop.fields["Short Description"]}</p>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-accent-green flex-shrink-0" />
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No archived drops found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal-dark text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Findsday logo"
                width={32}
                height={32}
                className="sm:w-10 sm:h-10"
                loading="lazy"
              />
              <span className="text-xl sm:text-2xl font-bold">FINDSDAY</span>
            </div>
            <p className="text-sm text-gray-400">
              Industry intel. Tool breakdowns. Honest takes on what&apos;s working and what&apos;s just hype.
            </p>
            <p className="text-xs text-gray-500">© 2017 - 2025 Findsday. All rights reserved.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent-green transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-green transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-green transition-colors">
                  Community
                </a>
              </li>
              <li>
                <Link href="/sales-tools/directory" className="hover:text-accent-green transition-colors">
                  Directory
                </Link>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="hover:text-accent-green transition-colors">
                  Admin
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent-green transition-colors">
                  Media Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-green transition-colors">
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-4">
            <button className="border border-gray-600 text-gray-400 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase hover:bg-gray-800 hover:text-white transition-colors">
              Read Manifesto →
            </button>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-accent-green transition-colors">
                X/Twitter
              </a>
              <a href="#" className="hover:text-accent-green transition-colors">
                YouTube
              </a>
              <a href="#" className="hover:text-accent-green transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-accent-green transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-accent-green transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Performance Monitor - only in development */}
    </div>
  )
}
