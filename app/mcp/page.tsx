import Link from "next/link"
import { ArrowRight, Zap, Brain, Check } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Servers | Salestools Club",
  description:
    "Find sales tools with MCP (Model Context Protocol) support for Claude Code and Gemini CLI.",
  alternates: {
    canonical: "https://salestools.club/mcp",
  },
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
        <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)]">
          <Zap className="w-4 h-4 fill-current" />
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>
        <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4 italic">#{tool.category.toLowerCase().replace(/\s+/g, '_')}</div>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-dashed border-black/10 pt-4">
        <div className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </div>
        <div className="font-mono text-[0.7rem] uppercase underline group-hover:line-through transition-all">
          Configure Node ↗
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

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-ink-fade mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            Automation Layer
          </div>
          <h1 className="type-display mb-8 uppercase">MCP Servers</h1>
          <p className="max-w-3xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            The fastest way to give your AI "hands". Plug these servers into Claude Code or Gemini CLI to update your CRM and search leads via chat.
          </p>
        </div>
      </section>

      <div className="border-b border-ink bg-paper-dark/20 py-6">
        <div className="layout-container flex items-center">
          <div className="flex items-center gap-6">
            <Link 
              href={`/mcp?official=${!officialOnly}`}
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

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
              Know a protocol module we're missing?
            </p>
            <Link
              href="/submit"
              className="circled accent font-mono font-bold px-12 py-4 text-[1rem] uppercase hover:rotate-[-1deg] transition-transform"
            >
              Submit Module <span>-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
