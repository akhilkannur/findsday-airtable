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
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <div className="type-label mb-6 opacity-40">Module Directory</div>
        <h1 className="type-display mb-8">The Tools</h1>
        <p className="max-w-2xl text-xl font-medium opacity-60">
          The best sales APIs and MCP servers for your AI stack. Discover tools that plug your sales workflow into Claude and Cursor.
        </p>
      </section>

      {q && (
        <div className="px-6 py-10 md:px-12 border-b border-ink-black flex items-center gap-4">
          <span className="type-label opacity-40">Filter:</span>
          <span className="swiss-badge border-accent-blue bg-accent-blue/10">&lsquo;{q}&rsquo;</span>
          <Link href="/tools" className="type-label hover:underline text-accent-orange">Clear</Link>
        </div>
      )}

      <div className="swiss-grid-bg grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-12">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="swiss-card group h-full"
          >
            <div className="flex justify-between items-start">
              <div className="flex h-10 w-10 items-center justify-center border border-ink-black bg-white font-bold text-lg group-hover:bg-accent-blue">
                {tool.name.charAt(0)}
              </div>
              <div className="type-label opacity-40">v{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}</div>
            </div>
            
            <div className="mt-4 text-xl font-medium tracking-tight">{tool.name}</div>
            <p className="text-sm font-medium opacity-60 line-clamp-3 min-h-[60px]">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-6 flex flex-wrap gap-2">
              <span className="swiss-badge">{tool.category}</span>
              {tool.apiType.map((api) => (
                <span key={api} className="swiss-badge opacity-40">{api}</span>
              ))}
            </div>

            <div className="mt-6 swiss-btn group-hover:bg-ink-black group-hover:text-sage-bg">
              View Specs <span>↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

      {tools.length === 0 && (
        <div className="mt-32 text-center">
          <p className="text-xl font-bold text-gray-500">No tools found.</p>
          <Link href="/tools" className="mt-6 inline-block text-club-teal font-bold hover:underline">Clear search</Link>
        </div>
      )}
    </main>
  )
}
