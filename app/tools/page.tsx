import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, filterTools, getAllCategories } from "@/lib/tools"
import { Brain, ArrowRight, Check } from "lucide-react"
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
        <div className="w-12 h-12 bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[1rem] text-[var(--ink-fade)] leading-relaxed line-clamp-2 mb-6">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--ink-fade)] group-hover:text-black transition-colors">{tool.category}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
           <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; mcp?: string; free?: string }>
}) {
  const sp = await searchParams
  const q = sp.q ?? ""
  const category = sp.category ?? ""
  const mcpOnly = sp.mcp === "true"
  const freeOnly = sp.free === "true"

  const tools = filterTools({
    query: q,
    category: category,
    mcpOnly,
    freeOnly
  })

  const categories = getAllCategories()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-24 border-b border-[var(--ink)]">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            Tool Directory
          </div>
          <h1 className="type-display mb-8">All Tools</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-[var(--ink-fade)] leading-relaxed border-l-2 border-[var(--ink)] pl-6">
            A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
          </p>
        </div>
      </section>

      <div className="border-b border-[var(--ink)]">
        <div className="layout-container">
          <SearchBar />
        </div>
      </div>

      <div className="border-b border-[var(--ink)] bg-[var(--paper-dark)]/20 py-6">
        <div className="layout-container flex flex-wrap items-center gap-x-12 gap-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[var(--ink-fade)]">Category:</span>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/tools" 
                className={`text-[0.85rem] font-serif italic border-b-2 transition-all ${!category ? 'border-black text-black' : 'border-transparent text-[var(--ink-fade)] hover:text-black'}`}
              >
                All
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat.slug}
                  href={`/tools?category=${encodeURIComponent(cat.name)}${q ? `&q=${q}` : ''}${mcpOnly ? '&mcp=true' : ''}${freeOnly ? '&free=true' : ''}`}
                  className={`text-[0.85rem] font-serif italic border-b-2 transition-all ${category === cat.name ? 'border-black text-black' : 'border-transparent text-[var(--ink-fade)] hover:text-black'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-8 border-l border-black/10 pl-12">
            <Link 
              href={`/tools?${q ? `q=${q}&` : ''}${category ? `category=${category}&` : ''}mcp=${!mcpOnly}`}
              className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${mcpOnly ? 'text-black font-bold' : 'text-[var(--ink-fade)] hover:text-black'}`}
            >
              <div className={`w-3 h-3 border border-black flex items-center justify-center ${mcpOnly ? 'bg-black' : ''}`}>
                {mcpOnly && <Check className="w-2 h-2 text-white" />}
              </div>
              MCP Only
            </Link>

            <Link 
              href={`/tools?${q ? `q=${q}&` : ''}${category ? `category=${category}&` : ''}${mcpOnly ? 'mcp=true&' : ''}free=${!freeOnly}`}
              className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${freeOnly ? 'text-black font-bold' : 'text-[var(--ink-fade)] hover:text-black'}`}
            >
              <div className={`w-3 h-3 border border-black flex items-center justify-center ${freeOnly ? 'bg-black' : ''}`}>
                {freeOnly && <Check className="w-2 h-2 text-white" />}
              </div>
              Free Tier
            </Link>
          </div>
        </div>
      </div>

      {(q || category || mcpOnly || freeOnly) && (
        <div className="py-6 border-b border-[var(--ink)] bg-[var(--paper-dark)]/40">
          <div className="layout-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[var(--ink-fade)]">Manifest:</span>
              <span className="circled font-mono text-[0.75rem] font-bold">
                {tools.length} nodes found
              </span>
            </div>
            <Link href="/tools" className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all">Reset All Filters</Link>
          </div>
        </div>
      )}

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

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
