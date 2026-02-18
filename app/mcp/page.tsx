import Link from "next/link"
import { ArrowRight, Zap, Brain } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Servers | Salestools Club",
  description:
    "Find sales tools with MCP (Model Context Protocol) support for Claude and Cursor.",
}

export default function McpPage() {
  const mcpTools = getMcpTools()

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "AI-Native": return "text-club-teal"
      case "Beginner-Friendly": return "text-green-400"
      case "Technical": return "text-blue-400"
      case "Complex": return "text-orange-400"
      default: return "text-gray-500"
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl text-center mb-32">
        <div className="mb-10 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-club-teal/10 text-club-teal border border-club-teal/20">
          <Zap className="h-10 w-10 fill-club-teal" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
          MCP Servers
        </h1>
        <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          The fastest way to give your AI "hands". Plug these servers into Claude and start updating your CRM via chat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mcpTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group relative flex flex-col h-full"
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-xl font-black group-hover:bg-white group-hover:text-black transition-all">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-club-teal transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{tool.category}</span>
                </div>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-club-teal text-black shadow-lg shadow-club-teal/20">
                <Zap className="h-3.5 w-3.5 fill-black" />
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-3">
              {tool.aiDifficulty && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(tool.aiDifficulty)}`}>
                  <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                </span>
              )}
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                {tool.apiType[0]} INFRA
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-32 rounded-3xl bg-white/[0.02] border border-white/5 p-12 text-center">
        <p className="text-lg text-gray-400 font-medium">
          More tools are adding MCP support every week. Know a tool we're missing?
        </p>
        <Link
          href="/submit"
          className="mt-8 btn-club"
        >
          Submit a tool <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
