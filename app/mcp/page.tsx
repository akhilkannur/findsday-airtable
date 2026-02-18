import Link from "next/link"
import { ArrowRight, Server, ExternalLink } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sales Tools with MCP Servers & Agent Integrations | Findsday",
  description:
    "Browse sales tools with MCP (Model Context Protocol) servers and agent integrations. Connect your sales stack to Claude, Cursor, and AI workflows.",
}

export default function McpPage() {
  const mcpTools = getMcpTools()

  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sales Tools with <span className="text-accent-green">MCP Servers</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Model Context Protocol (MCP) is an open standard that lets AI assistants like Claude interact directly with
            external tools. Instead of copy-pasting data, MCP lets your AI read, search, and update your sales tools
            natively.
          </p>
        </div>

        {/* MCP Tools Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mcpTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-xl border border-gray-800 bg-charcoal-dark p-6 transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-accent-green/5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal-light text-lg font-bold text-accent-green">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-accent-green transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-gray-500">{tool.category}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-accent-green/10 px-2 py-1 text-xs font-medium text-accent-green">
                  <Server className="h-3 w-3" /> MCP
                </span>
              </div>

              <p className="mb-4 text-sm text-gray-400 line-clamp-2">{tool.oneLiner}</p>

              {/* Integrations */}
              <div className="flex flex-wrap gap-2">
                {tool.integrations.map((integration, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md bg-charcoal-light px-2 py-0.5 text-xs text-gray-300"
                  >
                    {integration.platform}
                    {integration.url && (
                      <ExternalLink className="h-3 w-3 text-gray-500" />
                    )}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 mx-auto max-w-3xl text-center">
          <p className="text-gray-400">
            More tools are adding MCP support every week. Know a sales tool with an MCP server?{" "}
            <Link
              href="/submit"
              className="inline-flex items-center gap-1 font-semibold text-accent-green transition-colors hover:text-accent-green/80"
            >
              Submit it <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
