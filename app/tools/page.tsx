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
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mb-24 text-center sm:text-left">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
          The Tools
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-3xl leading-relaxed">
          The best sales APIs and MCP servers for your AI stack. Discover tools that plug your sales workflow into Claude and Cursor.
        </p>
      </div>

      {q && (
        <div className="mb-16 flex items-center gap-4">
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.3em]">Searching for:</span>
          <span className="badge-club border-club-teal/30 text-club-teal bg-club-teal/5 text-xs px-5 py-2">&lsquo;{q}&rsquo;</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group flex flex-col h-full"
          >
            <div className="mb-10 flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-2xl font-black text-white group-hover:bg-club-teal group-hover:text-black transition-all duration-500 shadow-inner">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-club-teal transition-colors tracking-tight">{tool.name}</h2>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">{tool.category}</p>
                </div>
              </div>
              {tool.mcpReady && (
                <div className="badge-club border-club-teal/20 text-club-teal bg-club-teal/5">
                  <Zap className="h-3 w-3 fill-club-teal" /> MCP
                </div>
              )}
            </div>

            <p className="text-lg leading-relaxed text-gray-400 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className="badge-club">
                  <Brain className="h-3.5 w-3.5" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span key={api} className="badge-club">{api}</span>
              ))}

              <ArrowRight className="ml-auto h-5 w-5 text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-white" />
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
