import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Zap, Brain, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "The Registry | Salestools Club",
  description:
    "Browse the complete list of sales APIs and tools. Find the right integrations for your sales workflow.",
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const sp = await searchParams
  const q = sp.q ?? ""
  const tools = q ? searchTools(q) : getAllTools()

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
      <div className="mb-20 text-center sm:text-left">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
          The Registry
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          A complete index of verified sales APIs and MCP servers for AI automation.
        </p>
      </div>

      {q && (
        <div className="mb-12 flex items-center gap-3">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Searching for:</span>
          <span className="bg-club-teal text-black px-4 py-1 rounded-full text-sm font-bold">&lsquo;{q}&rsquo;</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group flex flex-col h-full"
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-xl font-black group-hover:bg-white group-hover:text-black transition-all">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-club-teal transition-colors">{tool.name}</h2>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{tool.category}</p>
                </div>
              </div>
              {tool.mcpReady && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-club-teal/10 text-club-teal border border-club-teal/20">
                  <Zap className="h-3.5 w-3.5 fill-club-teal" />
                </div>
              )}
            </div>

            <p className="text-sm leading-relaxed text-gray-400 line-clamp-3 mb-8">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(tool.aiDifficulty)}`}>
                  <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="text-[10px] font-bold text-gray-600 uppercase tracking-widest"
                >
                  {api}
                </span>
              ))}

              <ArrowRight className="ml-auto h-4 w-4 text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-white" />
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
