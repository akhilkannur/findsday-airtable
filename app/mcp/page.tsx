import Link from "next/link"
import { ArrowRight, Zap, Brain, Check } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ official?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const hasFilters = !!(sp.official && sp.official === "true")

  return {
    title: "MCP Servers | Salestools Club",
    description:
      "Find sales tools with MCP (Model Context Protocol) support for Claude Code and Gemini CLI.",
    alternates: {
      canonical: "https://salestools.club/mcp",
    },
    ...(hasFilters && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      title: "MCP Servers | Salestools Club",
      description: "Find sales tools with MCP (Model Context Protocol) support for Claude Code and Gemini CLI.",
      type: "website",
      url: "https://salestools.club/mcp",
    },
    twitter: {
      card: "summary_large_image",
      title: "MCP Servers | Salestools Club",
      description: "Find sales tools with MCP (Model Context Protocol) support for Claude Code and Gemini CLI.",
    },
  }
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)]">
          <Zap className="w-4 h-4 fill-current" />
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>
        <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4 italic">{tool.category}</div>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-dashed border-black/10 pt-4">
        <div className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </div>
        <div className="font-mono text-[0.7rem] uppercase underline group-hover:line-through transition-all">
          View Tool ↗
        </div>
      </div>
    </Link>
  )
}

export default async function McpPage({
  searchParams,
}: {
  searchParams: Promise<{ official?: string }>
}) {
  const sp = await searchParams
  const officialOnly = sp.official === "true"
  const allMcpTools = await getMcpTools()
  const mcpTools = officialOnly
    ? allMcpTools.filter((t) =>
        t.integrations.some((i) => i.label?.toLowerCase().includes("official"))
      )
    : allMcpTools

  const mcpJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "MCP Servers for Sales",
    "description": "Sales tools with MCP (Model Context Protocol) support for Claude Code and Gemini CLI.",
    "numberOfItems": mcpTools.length,
    "itemListElement": mcpTools.slice(0, 50).map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": tool.name,
      "url": `https://salestools.club/apis/${tool.slug}`,
      "description": tool.oneLiner,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mcpJsonLd) }} />
      <section className="px-6 md:px-8 py-10 md:py-14 border-b border-ink">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-ink-fade mb-4 md:mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            MCP Directory
          </div>
          <h1 className="type-display mb-4 md:mb-6 uppercase">MCP Servers</h1>
          <p className="max-w-3xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            The fastest way to give your AI "hands". Plug these servers into Claude Code or Gemini CLI to update your CRM and search leads via chat.
          </p>
        </div>
      </section>

      <div className="border-b border-ink bg-paper-dark/20 py-4 md:py-6">
        <div className="layout-container flex items-center">
          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href={officialOnly ? "/mcp" : "/mcp?official=true"}
              className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${officialOnly ? 'text-black font-bold' : 'text-ink-fade hover:text-black'}`}
            >
              <div className={`w-3 h-3 border border-black flex items-center justify-center ${officialOnly ? 'bg-black' : ''}`}>
                {officialOnly && <Check className="w-2 h-2 text-white" />}
              </div>
              Official Only
            </Link>
          </div>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {mcpTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="layout-container">
          <div className="p-16 text-center border-2 border-dashed border-ink/20 bg-white/20">
            <p className="font-serif italic text-2xl mb-10 text-ink-fade">
              Know an MCP server we're missing?
            </p>
            <Link
              href="/submit"
              className="circled accent font-mono font-bold px-12 py-4 text-[1rem] uppercase hover:rotate-[-1deg] transition-transform"
            >
              Submit a Tool <span>-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
