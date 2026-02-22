import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, filterTools, getAllCategories } from "@/lib/tools"
import { Brain, ArrowRight, Check, LayoutGrid, List } from "lucide-react"
import { SearchBar } from "@/components/SearchBar"

export const metadata: Metadata = {
  title: "The Tools | Salestools Club",
  description:
    "A simple list of sales APIs and tools for people building with AI.",
  alternates: {
    canonical: "https://salestools.club/tools",
  },
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade group-hover:text-black transition-colors">{tool.category}</span>
        <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </span>
      </div>
    </Link>
  )
}

function ToolRow({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col md:flex-row md:items-center gap-6 p-8 border-b border-ink/10 hover:bg-paper-dark/30 transition-all"
    >
      <div className="w-10 h-10 bg-ink text-paper flex-shrink-0 flex items-center justify-center font-serif font-bold text-lg [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
        {tool.name.charAt(0)}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-1">
          <h3 className="text-xl font-bold uppercase group-hover:underline underline-offset-4">{tool.name}</h3>
          {tool.mcpReady && (
            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 border border-ink bg-ink text-paper">MCP</span>
          )}
        </div>
        <p className="text-[0.9rem] text-ink-fade line-clamp-1">{tool.oneLiner}</p>
      </div>

      <div className="flex items-center gap-6 flex-shrink-0">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{tool.category}</span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full w-16 text-center">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </span>
        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
      </div>
    </Link>
  )
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; mcp?: string; free?: string; official?: string; view?: string }>
}) {
  const sp = await searchParams
  const q = sp.q ?? ""
  const category = sp.category ?? ""
  const mcpOnly = sp.mcp === "true"
  const freeOnly = sp.free === "true"
  const officialOnly = sp.official === "true"
  const view = sp.view === "list" ? "list" : "grid"

  const tools = await filterTools({
    query: q,
    category: category,
    mcpOnly,
    freeOnly,
    officialOnly
  })

  const categories = getAllCategories()
  const baseParams = `${q ? `q=${q}&` : ''}${category ? `category=${category}&` : ''}${mcpOnly ? 'mcp=true&' : ''}${freeOnly ? 'free=true&' : ''}${officialOnly ? 'official=true&' : ''}`

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">All Tools</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
          </p>
        </div>
      </section>

      <div className="border-b border-ink">
        <div className="layout-container">
          <SearchBar />
        </div>
      </div>

      <div className="border-b border-ink bg-paper-dark/20 py-6">
        <div className="layout-container flex flex-wrap items-center justify-between gap-y-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Link 
                href={`/tools?${view === 'list' ? 'view=list' : ''}`}
                className={`font-mono text-[0.7rem] uppercase tracking-widest px-3 py-1.5 border transition-all ${!category ? 'bg-ink text-paper border-ink' : 'border-ink/20 text-ink-fade hover:border-ink hover:text-ink'}`}
              >
                All
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat.slug}
                  href={`/tools?category=${encodeURIComponent(cat.name)}${q ? `&q=${q}` : ''}${mcpOnly ? '&mcp=true' : ''}${freeOnly ? '&free=true' : ''}${officialOnly ? '&official=true' : ''}${view === 'list' ? '&view=list' : ''}`}
                  className={`font-mono text-[0.7rem] uppercase tracking-widest px-3 py-1.5 border transition-all ${category === cat.name ? 'bg-ink text-paper border-ink' : 'border-ink/20 text-ink-fade hover:border-ink hover:text-ink'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Quick Toggles */}
            <div className="flex items-center gap-6 border-l border-ink/20 pl-8">
              <Link 
                href={`/tools?${baseParams}mcp=${!mcpOnly}${view === 'list' ? '&view=list' : ''}`}
                className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${mcpOnly ? 'text-black font-bold' : 'text-ink-fade hover:text-black'}`}
              >
                <div className={`w-3 h-3 border border-black flex items-center justify-center ${mcpOnly ? 'bg-black' : ''}`}>
                  {mcpOnly && <Check className="w-2 h-2 text-white" />}
                </div>
                MCP Only
              </Link>

              <Link 
                href={`/tools?${baseParams}free=${!freeOnly}${view === 'list' ? '&view=list' : ''}`}
                className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${freeOnly ? 'text-black font-bold' : 'text-ink-fade hover:text-black'}`}
              >
                <div className={`w-3 h-3 border border-black flex items-center justify-center ${freeOnly ? 'bg-black' : ''}`}>
                  {freeOnly && <Check className="w-2 h-2 text-white" />}
                </div>
                Free Tier
              </Link>

              <Link 
                href={`/tools?${baseParams}official=${!officialOnly}${view === 'list' ? '&view=list' : ''}`}
                className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${officialOnly ? 'text-black font-bold' : 'text-ink-fade hover:text-black'}`}
              >
                <div className={`w-3 h-3 border border-black flex items-center justify-center ${officialOnly ? 'bg-black' : ''}`}>
                  {officialOnly && <Check className="w-2 h-2 text-white" />}
                </div>
                Official Only
              </Link>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-ink/20 p-1 bg-white/20">
            <Link 
              href={`/tools?${baseParams}view=grid`}
              className={`p-2 transition-all ${view === 'grid' ? 'bg-ink text-paper' : 'text-ink-fade hover:text-ink'}`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </Link>
            <Link 
              href={`/tools?${baseParams}view=list`}
              className={`p-2 transition-all ${view === 'list' ? 'bg-ink text-paper' : 'text-ink-fade hover:text-ink'}`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {(q || category || mcpOnly || freeOnly || officialOnly) && (
        <div className="py-6 border-b border-ink bg-paper-dark/40">
          <div className="layout-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.75rem] font-bold">
                {tools.length} nodes found
              </span>
            </div>
            <Link href="/tools" className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all">Reset All Filters</Link>
          </div>
        </div>
      )}

      <section className="py-20">
        <div className="layout-container">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col border-t border-ink/10">
              {tools.map((tool) => (
                <ToolRow key={tool.slug} tool={tool} />
              ))}
            </div>
          )}

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60">
              <p className="font-serif italic text-2xl mb-8">No tools found matching your criteria.</p>
              <Link href="/tools" className="circled font-mono font-bold">Clear All Filters</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
