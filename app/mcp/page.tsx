import Link from "next/link"
import { ArrowRight, Zap, Brain } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Servers | Salestools Club",
  description:
    "Find sales tools with MCP (Model Context Protocol) support for Claude and Cursor.",
  alternates: {
    canonical: "https://salestools.club/mcp",
  },
}

export default function McpPage() {
  const mcpTools = getMcpTools()

  return (
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <div className="type-label mb-6 opacity-40">Automation Layer</div>
        <h1 className="type-display mb-8">MCP Servers</h1>
        <p className="max-w-3xl text-xl font-medium opacity-60">
          The fastest way to give your AI "hands". Plug these servers into Claude Desktop or Cursor to update your CRM and search leads via chat.
        </p>
      </section>

      <div className="swiss-grid-bg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-12">
        {mcpTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="swiss-card group relative flex flex-col h-full"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors text-xl font-bold">
                {tool.name.charAt(0)}
              </div>
              <div className="flex h-8 w-8 items-center justify-center border border-ink-black bg-accent-orange text-white">
                <Zap className="h-4 w-4 fill-white" />
              </div>
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight">
              {tool.name}
            </h3>
            <div className="type-label opacity-40 mt-1">{tool.category}</div>

            <p className="mt-4 text-sm font-medium opacity-60 line-clamp-3">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 flex items-center gap-2">
              <span className="swiss-badge">{tool.apiType[0]} INFRA</span>
              {tool.aiDifficulty && (
                <span className="swiss-badge opacity-40">{tool.aiDifficulty}</span>
              )}
            </div>

            <div className="mt-6 swiss-btn group-hover:bg-ink-black group-hover:text-sage-bg">
              Configure Node <span>↗</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-6 mb-24 md:mx-12 border border-dashed border-ink-black p-12 text-center">
        <p className="text-lg font-medium opacity-60">
          Know a protocol module we're missing?
        </p>
        <Link
          href="/submit"
          className="mt-8 swiss-btn swiss-btn-primary inline-flex min-w-[240px]"
        >
          Submit Module <span>-&gt;</span>
        </Link>
      </div>
    </div>
  )
}
