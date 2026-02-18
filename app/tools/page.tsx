import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"

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
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        All Sales APIs & Tools
      </h1>

      {q && (
        <p className="mt-4 text-gray-400">
          Showing results for{" "}
          <span className="font-semibold text-white">&lsquo;{q}&rsquo;</span>
        </p>
      )}

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-xl border border-gray-800 bg-charcoal-dark p-6 transition-colors hover:border-gray-600"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-charcoal-light text-lg font-bold text-white">
                {tool.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                <p className="text-sm text-gray-500">{tool.category}</p>
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-gray-400">
              {tool.oneLiner}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="rounded-full border border-gray-700 px-2.5 py-0.5 text-xs text-gray-300"
                >
                  {api}
                </span>
              ))}

              {tool.integrations.length > 0 && (
                <span className="rounded-full bg-accent-pink/10 px-2.5 py-0.5 text-xs text-accent-pink">
                  {tool.integrations[0].platform}
                </span>
              )}

              {tool.hasFreeTier && (
                <span className="rounded-full bg-accent-green/10 px-2.5 py-0.5 text-xs text-accent-green">
                  Free tier
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          No tools found. Try a different search term.
        </p>
      )}
    </main>
  )
}
