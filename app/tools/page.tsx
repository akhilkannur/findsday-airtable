import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Brain, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "The Tools | Salestools Club",
  description:
    "A simple list of sales APIs and tools for people building with AI.",
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
    <div className="flex flex-col bg-sage-bg/30">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full border-l border-dashed border-ink-black/5 pointer-events-none hidden lg:block"></div>
        <div className="type-label mb-6 opacity-40 flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse"></div>
          Node Directory v1.0
        </div>
        <h1 className="type-display mb-8">The Registry</h1>
        <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed">
          A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
        </p>
      </section>

      {q && (
        <div className="px-6 py-10 md:px-12 border-b border-ink-black flex items-center justify-between bg-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="type-label opacity-40 font-bold uppercase tracking-widest">Query_Signal:</span>
            <span className="px-3 py-1 border border-accent-blue bg-accent-blue/10 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-blue">&lsquo;{q}&rsquo;</span>
          </div>
          <Link href="/tools" className="type-label hover:text-accent-orange transition-colors">Terminate Filter</Link>
        </div>
      )}

      <div className="swiss-grid-bg grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-12 min-h-[600px]">
        {tools.map((tool, idx) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="swiss-card group relative bg-white/40 backdrop-blur-sm border-ink-black/10 hover:border-ink-black transition-all h-full flex flex-col"
          >
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start">
              <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors font-bold text-xl shadow-[4px_4px_0px_rgba(18,18,18,0.05)]">
                {tool.name.charAt(0)}
              </div>
              <div className="flex flex-col items-end">
                <div className="text-[0.6rem] font-bold opacity-30">REF._{idx.toString().padStart(3, '0')}</div>
                <div className="type-label opacity-60 mt-1">v{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}</div>
              </div>
            </div>
            
            <div className="mt-8 text-2xl font-bold tracking-tight uppercase group-hover:text-accent-orange transition-colors">{tool.name}</div>
            <p className="mt-2 text-sm font-medium opacity-60 line-clamp-2 min-h-[40px] leading-relaxed">
              {tool.oneLiner}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="swiss-badge bg-white/50">{tool.category}</span>
              {tool.mcpReady && (
                <span className="swiss-badge border-accent-orange text-accent-orange flex items-center gap-1">
                  <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
                  MCP
                </span>
              )}
            </div>

            <div className="mt-auto pt-8 flex items-center justify-between schematic-border-t">
              <div className="flex gap-1">
                {tool.apiType.slice(0, 1).map((api) => (
                  <span key={api} className="text-[0.6rem] font-bold uppercase tracking-[0.15em] opacity-30 group-hover:opacity-100 transition-opacity">{api}</span>
                ))}
              </div>
              <div className="text-[0.65rem] font-bold uppercase group-hover:translate-x-1 transition-transform">-> Specs</div>
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center p-24">
          <p className="text-xl font-bold opacity-40 uppercase tracking-widest">No tools found matching your query.</p>
          <Link href="/tools" className="mt-6 inline-block text-accent-orange font-bold hover:underline">Clear Search</Link>
        </div>
      )}
    </div>
  )
}
