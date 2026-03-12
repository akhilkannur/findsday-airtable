import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, filterTools, getAllCategories } from "@/lib/tools"
import { ArrowRight } from "lucide-react"
import { ApiFilterBar } from "@/components/ApiFilterBar"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const sp = await searchParams
  const hasFilters = !!(sp.q || sp.category || sp.mcp || sp.free || sp.official || sp.view)

  return {
    title: "Sales APIs | Salestools Club",
    description:
      "A comprehensive database of sales APIs and tools for people building with Claude Code and other agentic tools.",
    ...(!hasFilters && {
      alternates: {
        canonical: "https://salestools.club/api",
      },
    }),
    ...(hasFilters && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      title: "Sales APIs | Salestools Club",
      description: "A comprehensive database of sales APIs and tools for people building with Claude Code and other agentic tools.",
      type: "website",
      url: "https://salestools.club/api",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sales APIs | Salestools Club",
      description: "A comprehensive database of sales APIs and tools for people building with Claude Code and other agentic tools.",
    },
  }
}

export default async function APIPage({
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

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6">Sales APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
          </p>
        </div>
      </section>

      <ApiFilterBar categories={categories.map(c => ({ slug: c.slug, name: c.name }))} />

      {(q || category || mcpOnly || freeOnly || officialOnly) && (
        <div className="py-6 border-b border-ink bg-paper-dark/40">
          <div className="layout-container flex items-center justify-end">
            <Link href="/api" className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all">Reset All Filters</Link>
          </div>
        </div>
      )}

      <section className="py-8 md:py-12">
        <div className="layout-container">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/apis/${tool.slug}`}
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col border-t border-ink/10">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/apis/${tool.slug}`}
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
              ))}
            </div>
          )}

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60">
              <p className="font-serif italic text-2xl mb-8">No tools found matching your criteria.</p>
              <Link href="/api" className="circled font-mono font-bold">Clear All Filters</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
