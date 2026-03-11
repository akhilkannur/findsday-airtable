import { getToolsByAlternativeTo, getAllTools } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const tools = await getAllTools()
  // Generate pages for top tools
  const topTools = ["hubspot", "salesforce", "apollo", "zoominfo", "pipedrive", "lusha", "clearbit", "hunter"]
  return topTools.map((tool) => ({
    tool: tool,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params
  const toolDisplay = tool.charAt(0).toUpperCase() + tool.slice(1)
  
  return {
    title: `Best ${toolDisplay} Alternatives for AI Agents | Salestools Club`,
    description: `Compare the top alternatives to ${toolDisplay} for autonomous sales workflows. Find AI-native tools with better APIs and MCP support.`,
    alternates: {
      canonical: `https://salestools.club/alternative-to/${tool}`,
    },
  }
}

export default async function AlternativeToPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params
  const tools = await getToolsByAlternativeTo(tool)
  
  if (tools.length === 0) {
    notFound()
  }

  const toolDisplay = tool.charAt(0).toUpperCase() + tool.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Competitor Comparison</p>
          <h1 className="type-display mb-4 md:mb-6">Best {toolDisplay} Alternatives</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Looking for a different option than {toolDisplay}? These tools provide APIs and MCP servers built for AI-native workflows.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/apis/${t.slug}`}
                className="tool-card group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                    {t.name.charAt(0)}
                  </div>
                  {t.mcpReady && (
                    <div className="tag-mcp">MCP READY</div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
                  <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
                    {t.oneLiner}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                  <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
                    {t.hasFreeTier ? "Free" : "Paid"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
