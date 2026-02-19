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

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl text-center mb-32">
        <div className="mb-10 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-club-teal/10 text-club-teal border border-club-teal/20 shadow-2xl shadow-club-teal/5">
          <Zap className="h-10 w-10 fill-club-teal" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
          MCP Servers
        </h1>
        <p className="mt-8 text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          The fastest way to give your AI "hands". Plug these servers into Claude and start updating your CRM via chat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {mcpTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group relative flex flex-col h-full"
          >
            <div className="mb-10 flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-2xl font-black text-white group-hover:bg-club-teal group-hover:text-black transition-all duration-500 shadow-inner">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-club-teal transition-colors tracking-tight">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">{tool.category}</span>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-club-teal text-black shadow-lg shadow-club-teal/30">
                <Zap className="h-4 w-4 fill-black" />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-400 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-3">
              {tool.aiDifficulty && (
                <span className="badge-club">
                  <Brain className="h-3.5 w-3.5" /> {tool.aiDifficulty}
                </span>
              )}
              <span className="badge-club">
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
