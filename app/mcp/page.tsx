import Link from "next/link"
import { ArrowRight, Zap, Brain } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sales Tools with MCP Servers | Findsday",
  description:
    "Browse sales tools with MCP (Model Context Protocol) servers. Connect your sales stack to Claude, Cursor, and AI workflows.",
}

export default function McpPage() {
  const mcpTools = getMcpTools()

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "AI-Native": return "text-accent-pink bg-accent-pink/10 border-accent-pink/20"
      case "Beginner-Friendly": return "text-terminal-green bg-terminal-green/10 border-terminal-green/20"
      case "Technical": return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "Complex": return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 border-b border-white/10 pb-16 pt-12 text-center">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center border border-terminal-green bg-terminal-green/10 text-terminal-green">
            <Zap className="h-8 w-8 fill-terminal-green" />
          </div>
          <h1 className="font-heading text-6xl font-black italic tracking-tighter text-paper-white sm:text-8xl">
            MCP <span className="text-terminal-green">Servers</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 leading-relaxed">
            The Model Context Protocol (MCP) lets AI assistants like Claude directly use your sales tools. 
            No more manual exports or complicated API integrations.
          </p>
        </div>

        {/* MCP Tools Grid */}
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {mcpTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="brutalist-card group relative flex flex-col bg-banknote-black"
            >
              <div className="scanline" />
              <div className="mb-10 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 font-heading text-xl font-black italic text-terminal-green transition-colors group-hover:bg-terminal-green group-hover:text-black">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-xs font-medium text-gray-500">{tool.category}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 border border-accent-pink/30 bg-accent-pink/10 px-2 py-1 text-[9px] font-bold text-accent-pink uppercase tracking-tighter">
                  <Zap className="h-3 w-3 fill-accent-pink" /> MCP READY
                </span>
              </div>

              <p className="mb-10 text-sm text-gray-400 line-clamp-2">
                {tool.oneLiner}
              </p>

              {/* AI Details */}
              <div className="mt-auto flex flex-wrap gap-2">
                {tool.aiDifficulty && (
                  <span className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${getDifficultyColor(tool.aiDifficulty)}`}>
                    <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                  </span>
                )}
                <span className="border border-white/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-gray-400">
                  {tool.apiType[0]} INFRA
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 border-t border-white/10 pt-16 text-center">
          <p className="text-sm text-gray-500">
            More tools are adding MCP support every week. Know a tool we're missing?
          </p>
          <Link
            href="/submit"
            className="mt-8 btn-brutalist border-terminal-green bg-terminal-green text-black hover:bg-black hover:text-terminal-green"
          >
            Submit a tool <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
