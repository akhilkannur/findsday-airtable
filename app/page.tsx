// app/page.tsx
import Header from "../components/Header"
import { base, type ToolRecord, type SponsorRecord, type MakerRecord } from "@/lib/airtableClient"

// Force this page to be dynamic and fetch data on each request
export const dynamic = "force-dynamic"

// Add this function to fetch data from Airtable
async function getHomePageData() {
  try {
    console.log("Fetching data from Airtable for homepage...")

    // Get the latest drop number first
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 1,
      })
      .firstPage()

    // Ensure latestDropNumber is always a number
    const latestDropNumber = dropsRecords.length > 0 && typeof dropsRecords[0].fields["Drop Number"] === 'number' 
      ? dropsRecords[0].fields["Drop Number"] 
      : 1

    // Fetch tools for the latest drop
    const toolsRecords = await base("Tools")
      .select({
        filterByFormula: `{Drop Number} = ${latestDropNumber}`,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage()

    const tools = toolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[]

    // Fetch sponsors
    const sponsorsRecords = await base("Sponsors")
      .select({
        maxRecords: 2,
      })
      .firstPage()

    const sponsors = sponsorsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[]

    // Fetch featured makers
    const makersRecords = await base("Makers")
      .select({
        maxRecords: 5,
      })
      .firstPage()

    const makers = makersRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[]

    console.log("Successfully fetched data from Airtable:", {
      tools: tools.length,
      sponsors: sponsors.length,
      makers: makers.length,
      latestDropNumber,
    })

    return { tools, sponsors, makers, latestDropNumber }
  } catch (error) {
    console.error("Error fetching data from Airtable:", error)
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 }
  }
}

export default async function Home() {
  const { tools, sponsors, makers, latestDropNumber } = await getHomePageData()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Tobias Style */}
        <section className="py-24 px-4 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <span className="inline-block bg-yellow-400 text-black px-4 py-2 text-sm font-bold tracking-wider uppercase">
                    Weekly Drops
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                  THE BEST<br />
                  NEW TOOLS.<br />
                  <span className="text-yellow-400">EVERY THURSDAY.</span>
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-lg leading-relaxed">
                  Curated digital tools for modern teams. No fluff, just the essentials that matter.
                </p>
                
                {/* Countdown Timer - Tobias Style */}
                <div className="mb-12">
                  <div className="bg-yellow-400 text-black px-8 py-4 inline-block">
                    <div className="text-sm font-bold tracking-wider uppercase mb-1">Next Drop In</div>
                    <div className="text-2xl font-black">3D 14H 22M</div>
                  </div>
                </div>
                
                {/* Newsletter Form - Minimal Tobias Style */}
                <div className="border-2 border-white p-6 max-w-md">
                  <h3 className="text-lg font-bold mb-4 tracking-wider uppercase">Stay Updated</h3>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL ADDRESS"
                      className="w-full bg-transparent border-b-2 border-gray-400 focus:border-yellow-400 py-2 text-white placeholder-gray-400 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 transition-colors tracking-wider uppercase"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Minimal Geometric Illustration */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="aspect-square bg-yellow-400 opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-yellow-400 flex items-center justify-center">
                      <div className="text-4xl font-black text-yellow-400">{latestDropNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section - Square Cards, Tobias Style */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold tracking-wider uppercase">
                  Drop #{latestDropNumber}
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
                THIS WEEK&apos;S<br />SELECTION
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked tools that push boundaries and solve real problems.
              </p>
            </div>
            
            {tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {tools.map((tool, index) => {
                  // Tobias style: strategic use of color
                  const colorClasses = [
                    'bg-black text-white',
                    'bg-white text-black border-2 border-black',
                    'bg-yellow-400 text-black',
                    'bg-white text-black border-2 border-black',
                    'bg-black text-white'
                  ]
                  const cardClass = colorClasses[index % colorClasses.length]
                  
                  return (
                    <div
                      key={tool.id}
                      className={`${cardClass} aspect-square p-6 hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col`}
                    >
                      {/* Tool Image - Square */}
                      <div className="mb-4">
                        {tool.fields.Image && tool.fields.Image[0] ? (
                          <img
                            src={tool.fields.Image[0].url || "/placeholder.svg"}
                            alt={tool.fields.Name || "Tool"}
                            className="w-12 h-12 object-cover"
                          />
                        ) : (
                          <div className={`w-12 h-12 border-2 ${cardClass.includes('bg-black') ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                            <span className="text-xs font-bold">TOOL</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col h-full">
                        <h3 className="text-lg font-black mb-2 leading-tight">
                          {tool.fields.Name || "UNNAMED TOOL"}
                        </h3>
                        
                        <div className="mb-3">
                          <span className={`inline-block px-2 py-1 text-xs font-bold tracking-wider uppercase ${
                            cardClass.includes('bg-black') ? 'bg-white text-black' : 
                            cardClass.includes('bg-yellow-400') ? 'bg-black text-yellow-400' : 'bg-black text-white'
                          }`}>
                            {tool.fields.Category || "OTHER"}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-4 flex-grow opacity-80 leading-tight">
                          {tool.fields.Tagline || "Revolutionary tool for modern workflows"}
                        </p>
                        
                        {/* Maker Quote - Condensed */}
                        {tool.fields["Maker Quote"] && tool.fields["Maker Name"] && (
                          <div className="text-xs opacity-70 mb-4">
                            <p className="italic mb-1">&quot;{tool.fields["Maker Quote"].slice(0, 60)}...&quot;</p>
                            <p className="font-bold">— {tool.fields["Maker Name"]}</p>
                          </div>
                        )}
                        
                        {tool.fields["Website URL"] && (
                          <div className="mt-auto">
                            <a
                              href={tool.fields["Website URL"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold tracking-wider uppercase hover:opacity-70 transition-opacity"
                            >
                              VISIT →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-black mx-auto mb-6 flex items-center justify-center">
                  <span className="text-yellow-400 text-2xl font-black">0</span>
                </div>
                <h3 className="text-2xl font-black text-black mb-2">LOADING TOOLS</h3>
                <p className="text-gray-600">New drop coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Sponsors Section - Square Cards */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
                PARTNERS
              </h2>
            </div>
            
            {sponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {sponsors.map((sponsor, index) => (
                  <div 
                    key={sponsor.id} 
                    className={`aspect-square p-8 hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col ${
                      index % 2 === 0 ? 'bg-black text-white' : 'bg-gray-50 text-black border-2 border-black'
                    }`}
                  >
                    <div className="mb-6">
                      {sponsor.fields.Logo && sponsor.fields.Logo[0] ? (
                        <img
                          src={sponsor.fields.Logo[0].url || "/placeholder.svg"}
                          alt={sponsor.fields.Name || "Sponsor"}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        <div className={`w-16 h-16 border-2 ${index % 2 === 0 ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                          <span className="text-xs font-bold">LOGO</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black mb-4 leading-tight">
                      {sponsor.fields.Name || "SPONSOR NAME"}
                    </h3>
                    
                    <p className="text-sm opacity-80 mb-6 flex-grow leading-relaxed">
                      {sponsor.fields.Blurb || "Strategic partner supporting innovation in digital tools and workflows."}
                    </p>
                    
                    {sponsor.fields["Website URL"] && (
                      <div className="mt-auto">
                        <a
                          href={sponsor.fields["Website URL"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold tracking-wider uppercase hover:opacity-70 transition-opacity"
                        >
                          VISIT PARTNER →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[1, 2].map((item) => (
                  <div key={item} className={`aspect-square p-8 flex flex-col ${
                    item % 2 === 0 ? 'bg-black text-white' : 'bg-gray-50 text-black border-2 border-black'
                  }`}>
                    <div className="mb-6">
                      <div className={`w-16 h-16 border-2 ${item % 2 === 0 ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                        <span className="text-xs font-bold">LOGO</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4">PARTNER {item}</h3>
                    <p className="text-sm opacity-80 flex-grow">Strategic partner supporting innovation.</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Makers Section - Square Cards */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
                THE MAKERS
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Brilliant minds creating the future of digital tools.
              </p>
            </div>
            
            {makers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {makers.map((maker, index) => {
                  const colorClasses = [
                    'bg-yellow-400 text-black',
                    'bg-black text-white',
                    'bg-white text-black border-2 border-black',
                    'bg-black text-white',
                    'bg-white text-black border-2 border-black'
                  ]
                  const cardClass = colorClasses[index % colorClasses.length]
                  
                  return (
                    <div 
                      key={maker.id} 
                      className={`${cardClass} aspect-square p-6 hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col`}
                    >
                      {/* Square Profile Photo */}
                      <div className="mb-4">
                        {maker.fields.Photo && maker.fields.Photo[0] ? (
                          <img
                            src={maker.fields.Photo[0].url || "/placeholder.svg"}
                            alt={maker.fields.Name || "Maker"}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          <div className={`w-16 h-16 border-2 ${cardClass.includes('bg-black') ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                            <span className="text-xs font-bold">MAKER</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-black mb-2 leading-tight">
                        {maker.fields.Name || "MAKER NAME"}
                      </h3>
                      
                      <p className="text-xs opacity-80 mb-4 flex-grow leading-tight">
                        {maker.fields.Bio ? maker.fields.Bio.slice(0, 80) + "..." : "Creative professional building next-generation tools for modern teams."}
                      </p>
                      
                      {maker.fields["Profile Link"] && (
                        <div className="mt-auto">
                          <a
                            href={maker.fields["Profile Link"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold tracking-wider uppercase hover:opacity-70 transition-opacity"
                          >
                            PROFILE →
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((item) => {
                  const colorClasses = [
                    'bg-yellow-400 text-black',
                    'bg-black text-white',
                    'bg-white text-black border-2 border-black',
                    'bg-black text-white',
                    'bg-white text-black border-2 border-black'
                  ]
                  const cardClass = colorClasses[(item-1) % colorClasses.length]
                  
                  return (
                    <div key={item} className={`${cardClass} aspect-square p-6 flex flex-col`}>
                      <div className="mb-4">
                        <div className={`w-16 h-16 border-2 ${cardClass.includes('bg-black') ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                          <span className="text-xs font-bold">MAKER</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-black mb-2">MAKER {item}</h3>
                      <p className="text-xs opacity-80 flex-grow">Creative professional building tools.</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Archive Section - Minimalist */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black text-center text-black mb-16">
              ARCHIVE
            </h2>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black tracking-wider">
                      DROP #{latestDropNumber - item} — {" "}
                      {new Date(Date.now() - item * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).toUpperCase()}
                    </h3>
                    <div className="text-2xl font-black group-hover:rotate-180 transition-transform">
                      ↓
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Tobias Minimal Style */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-black mb-4">FINDSDAY</h3>
              <p className="text-gray-400 text-lg max-w-md">
                Curating the future of digital tools. Every Thursday.
              </p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              {['TWITTER', 'INSTAGRAM', 'LINKEDIN'].map((social) => (
                <a key={social} href="#" className="w-16 h-16 border-2 border-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-colors flex items-center justify-center">
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
