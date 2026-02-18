import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Zap, Brain, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "All Sales APIs & Tools | Findsday",
  description:
    "Browse the complete directory of sales APIs and tools. Find REST, GraphQL, and WebSocket APIs for prospecting, CRM, outreach, enrichment, and more.",
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
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 border-b border-white/10 pb-12">
        <h1 className="font-heading text-6xl font-black italic tracking-tighter text-paper-white sm:text-8xl">
          The Registry
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
          Index of verified high-intent sales infrastructure
        </p>
      </div>

      {q && (
        <p className="mb-12 font-mono text-xs uppercase text-terminal-green">
          Filtering by query: <span className="text-paper-white">&lsquo;{q}&rsquo;</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-px bg-white/10">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group relative flex flex-col bg-banknote-black p-8 transition-all hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 font-heading text-xl font-black italic text-terminal-green transition-colors group-hover:bg-terminal-green group-hover:text-black">
                {tool.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">{tool.name}</h2>
                  {tool.mcpReady && (
                    <Zap className="h-4 w-4 fill-terminal-green text-terminal-green" />
                  )}
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-600">{tool.category}</p>
              </div>
            </div>

            <p className="mt-4 max-w-md font-mono text-[11px] uppercase leading-relaxed text-gray-500 sm:mt-0 sm:px-8">
              {tool.oneLiner}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-0">
              {tool.aiDifficulty && (
                <span className="border border-white/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-gray-400">
                  <Brain className="mr-1 inline h-3 w-3" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="border border-terminal-green/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-terminal-green"
                >
                  {api}
                </span>
              ))}

              <ArrowRight className="h-4 w-4 text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-terminal-green" />
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <p className="mt-24 text-center font-mono text-sm uppercase text-gray-700">
          Search returned 0 results. System reset required.
        </p>
      )}
    </main>
  )
}
