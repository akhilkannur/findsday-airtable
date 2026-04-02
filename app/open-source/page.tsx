import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getOpenSourceTools } from "@/lib/tools"
import { ToolLogo } from "@/components/ToolLogo"
import { GitHubStars } from "@/components/GitHubStars"

export const metadata: Metadata = {
  title: "Open Source Sales Tools | Salestools Club",
  description:
    "Open source sales tools and APIs you can self-host, fork, and inspect. Build your sales stack on transparent foundations.",
  alternates: {
    canonical: "https://salestools.club/open-source",
  },
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
        {tool.mcpReady && <div className="tag-mcp">MCP READY</div>}
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3 mb-4">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade group-hover:text-black transition-colors">
          {tool.category}
        </span>
        {tool.githubUrl && <GitHubStars githubUrl={tool.githubUrl} />}
      </div>
    </Link>
  )
}

export default async function OpenSourcePage() {
  const tools = await getOpenSourceTools()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">Open Source</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Sales tools you can self-host, fork, and inspect. Build your AI sales stack on transparent, open-source foundations.
          </p>

          <div className="mt-6 md:mt-10" />
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          {tools.length < 5 && (
            <div className="mb-8 md:mb-12 p-6 md:p-8 border border-dashed border-ink/30 bg-paper-dark/20">
              <p className="font-serif italic text-base md:text-lg text-ink-fade">
                We&apos;re still building out this collection.{" "}
                <Link
                  href="/submit"
                  className="underline hover:line-through transition-all text-ink"
                >
                  Submit an open-source tool
                </Link>{" "}
                if we&apos;re missing something.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-20 md:py-32 opacity-60 font-serif italic text-xl md:text-2xl">
              No open-source tools indexed yet.
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-24 bg-paper-dark/50 border-t border-ink">
        <div className="layout-container">
          <div className="flex flex-wrap gap-4 md:gap-6 pt-8 border-t border-dashed border-ink/20">
            <Link
              href="/api"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              All Tools
            </Link>
            <Link
              href="/mcp"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              MCP Servers
            </Link>
            <Link
              href="/submit"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
