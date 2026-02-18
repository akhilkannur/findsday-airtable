import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Server } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools, getAllTools } from "@/lib/tools"
import { SearchBar } from "@/components/SearchBar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Findsday — The modern directory for sales APIs and MCP servers.",
  description:
    "A curated collection of sales APIs, SDKs, and MCP servers. Find the tools to connect your sales stack to Claude and Cursor.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-brand-purple" /> : <Cpu className="h-6 w-6 text-brand-purple" />
}

export default function Home() {
  const featuredTools = getFeaturedTools()
  const categories = getAllCategories()
  const mcpTools = getMcpTools()
  const allTools = getAllTools()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Findsday",
    url: "https://findsday.com",
    description: "The directory of sales APIs and MCP servers for people building with AI.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://findsday.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative bg-ghost-dark text-white">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative px-6 py-32 sm:px-12 sm:py-48 lg:px-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-purple animate-pulse" />
              Build your AI sales stack
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
              Every Sales API.<br />
              <span className="text-gray-500">In one place.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-xl text-gray-400 sm:text-2xl">
              A curated collection of the APIs, SDKs, and MCP servers you need to connect your sales tools to Claude and Cursor.
            </p>

            <div className="mx-auto mt-14 max-w-2xl">
              <SearchBar />
            </div>

            <div className="mt-14 flex items-center justify-center gap-10 font-mono text-[11px] uppercase tracking-widest text-gray-500">
              <div className="flex flex-col items-center">
                <span className="text-white font-bold">{allTools.length}</span>
                <span>Tools</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-white font-bold">{categories.length}</span>
                <span>Categories</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-white font-bold">{mcpTools.length}</span>
                <span>MCP Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Tools ───────────────────────────────── */}
        <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Featured Tools</h2>
                <p className="mt-3 text-lg text-gray-400">The most popular APIs for AI automation</p>
              </div>
              <Link
                href="/tools"
                className="btn-ghost-outline hover:border-white transition-colors"
              >
                View all tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="ghost-card relative group"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex items-center gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-2xl font-black text-white group-hover:bg-white group-hover:text-black transition-all">
                        {tool.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-sm font-medium text-gray-500">{tool.category}</span>
                      </div>
                    </div>
                    {tool.mcpReady && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                        <Zap className="h-4 w-4 fill-brand-purple" />
                      </div>
                    )}
                  </div>

                  <p className="mb-8 text-base text-gray-400 leading-relaxed line-clamp-2">{tool.oneLiner}</p>

                  <div className="flex flex-wrap gap-2">
                    {tool.aiDifficulty && (
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        <Brain className="mr-1.5 inline h-3 w-3" /> {tool.aiDifficulty}
                      </span>
                    )}
                    {tool.apiType.map((type) => (
                      <span
                        key={type}
                        className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-500"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories ───────────────────────────── */}
        <section className="px-6 py-24 sm:px-12 lg:px-24 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Browse Categories</h2>
              <p className="mt-4 text-lg text-gray-400">Find tools for every part of your workflow</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {categories.slice(0, 8).map((cat, idx) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group bg-ghost-card rounded-3xl p-8 border border-white/5 transition-all hover:border-white/20 hover:-translate-y-1"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5">
                      {getCategoryIcon(cat.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-purple transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-gray-500 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-8 font-mono text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    {cat.toolCount} TOOLS
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link href="/categories" className="btn-ghost-outline">
                All categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── MCP CTA ──────────────────────────────── */}
        <section className="px-6 py-24 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white text-black p-12 sm:p-20 flex flex-col items-center text-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-black text-white">
              <Zap className="h-8 w-8 fill-white" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Connect to Claude in seconds.</h2>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl font-medium opacity-70">
              The Model Context Protocol (MCP) lets AI assistants like Claude directly use your sales tools. 
              Find the tools that are already ready to plug and play.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/mcp"
                className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity"
              >
                Browse MCP Servers
              </Link>
              <Link
                href="/submit"
                className="border border-black/10 px-10 py-4 rounded-full text-lg font-bold hover:bg-black/5 transition-colors"
              >
                Submit a Tool
              </Link>
            </div>
          </div>
        </section>

        {/* ── Use with AI Agents CTA ─────────────────────── */}
        <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-white/5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Use Findsday with your agents</h2>
            <p className="mt-6 text-lg text-gray-400">
              Query our database directly from your terminal or download the skill file to let your AI assistant find APIs for you.
            </p>
            <div className="mt-14 flex flex-col items-center gap-10 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-5 bg-ghost-card border border-white/5 rounded-full px-8 py-5 font-mono text-sm">
                <span className="text-brand-purple font-bold">$</span> 
                <span className="text-white">curl findsday.com/api/tools</span>
              </div>
              <a
                href="/findsday-skill.md"
                download
                className="btn-ghost"
              >
                Download Skill File <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
