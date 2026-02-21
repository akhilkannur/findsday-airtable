import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Brain, ArrowRight } from "lucide-react"
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
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--ink-fade)] group-hover:text-black transition-colors">#{tool.category.toLowerCase().replace(/\s+/g, '_')}</span>
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
  searchParams: Promise<{ q?: string }>
}) {
  const sp = await searchParams
  const q = sp.q ?? ""
  const tools = q ? searchTools(q) : getAllTools()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-24 border-b border-[var(--ink)]">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            Comprehensive Registry
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

      {q && (
        <div className="py-8 border-b border-[var(--ink)] bg-[var(--paper-dark)]">
          <div className="layout-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[var(--ink-fade)]">Filter Active:</span>
              <span className="circled font-mono text-[0.75rem] font-bold">QUERY: &lsquo;{q}&rsquo;</span>
            </div>
            <Link href="/tools" className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all">Reset System</Link>
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
              <p className="font-serif italic text-2xl mb-8">No nodes indexed in this manifest.</p>
              <Link href="/tools" className="circled font-mono font-bold">Clear Search</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
