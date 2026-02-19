import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Zap, Brain, ArrowRight } from "lucide-react"

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
    <main className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-24">
      <div className="mb-32 text-center">
        <h1 className="text-gradient text-6xl font-extrabold sm:text-8xl italic font-heading">
          The Tools
        </h1>
        <p className="mt-8 text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
          The best sales APIs and MCP servers for your AI stack. Discover tools that plug your sales workflow into Claude and Cursor.
        </p>
      </div>

      {q && (
        <div className="mb-20 flex items-center justify-center gap-4">
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Searching:</span>
          <span className="badge-club border-enjin-teal/30 text-enjin-teal bg-enjin-teal/5 text-xs px-6 py-2">&lsquo;{q}&rsquo;</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group flex flex-col h-full"
          >
            <div className="mb-12 flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-black text-2xl font-black group-hover:bg-enjin-teal transition-all duration-500">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-enjin-teal transition-colors tracking-tight">{tool.name}</h2>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mt-1">{tool.category}</p>
                </div>
              </div>
              {tool.mcpReady && (
                <div className="badge-club border-enjin-teal/20 text-enjin-teal bg-enjin-teal/5">
                  <Zap className="h-3 w-3 fill-enjin-teal" /> MCP
                </div>
              )}
            </div>

            <p className="text-lg leading-relaxed text-gray-500 line-clamp-3 mb-12 font-medium">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-10 border-t border-white/[0.05] flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className="badge-club">
                  <Brain className="h-3.5 w-3.5" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span key={api} className="badge-club">{api}</span>
              ))}

              <ArrowRight className="ml-auto h-5 w-5 text-gray-800 transition-all group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center">
          <p className="text-xl font-bold text-gray-500">No tools found.</p>
          <Link href="/tools" className="mt-6 inline-block text-club-teal font-bold hover:underline">Clear search</Link>
        </div>
      )}
    </main>
  )
}
