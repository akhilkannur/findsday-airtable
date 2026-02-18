import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools, getAllTools } from "@/lib/tools"
import { SearchBar } from "@/components/SearchBar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Findsday — Every Sales API & MCP Server in one place.",
  description:
    "A simple directory of sales APIs and MCP servers. Find the tools to plug your sales stack into Claude, Cursor, and any AI workflow.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-terminal-green" /> : <Cpu className="h-6 w-6 text-terminal-green" />
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

      <main className="relative overflow-hidden">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-terminal-green">
              <span className="inline-block h-2 w-2 animate-pulse bg-terminal-green" />
              Build your AI sales stack
            </div>
            <h1 className="font-heading text-5xl font-black italic leading-[1.1] tracking-tighter sm:text-7xl lg:text-9xl text-paper-white">
              Every Sales API.<br />
              <span className="text-terminal-green">In one place.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 sm:text-xl">
              A simple list of the APIs, SDKs, and MCP servers you need to connect your sales tools to Claude and Cursor.
            </p>

            <div className="mx-auto mt-12 max-w-xl">
              <SearchBar />
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 font-mono text-xs uppercase tracking-widest text-gray-500">
              <div className="flex flex-col items-center">
                <span className="text-paper-white font-bold">{allTools.length}</span>
                <span>Tools</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-paper-white font-bold">{categories.length}</span>
                <span>Categories</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-paper-white font-bold">{mcpTools.length}</span>
                <span>MCP Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Tools ───────────────────────────────── */}
        <section className="border-y border-white/10 bg-black/50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
              <div>
                <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl">Featured Tools</h2>
                <p className="mt-2 text-sm text-gray-400">The most popular APIs for AI automation</p>
              </div>
              <Link
                href="/tools"
                className="btn-brutalist"
              >
                View All Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="brutalist-card relative group bg-banknote-black border-none"
                >
                  <div className="scanline" />
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 font-heading text-xl font-black italic text-terminal-green">
                        {tool.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs font-medium text-gray-500">{tool.category}</span>
                      </div>
                    </div>
                    {tool.mcpReady && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-terminal-green/20 text-terminal-green border border-terminal-green/30">
                        <Zap className="h-3.5 w-3.5 fill-terminal-green" />
                      </div>
                    )}
                  </div>

                  <p className="mb-8 text-sm text-gray-400 line-clamp-2">{tool.oneLiner}</p>

                  <div className="flex flex-wrap gap-2">
                    {tool.aiDifficulty && (
                      <span className="border border-white/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-gray-400">
                        <Brain className="mr-1 inline h-3 w-3" /> {tool.aiDifficulty}
                      </span>
                    )}
                    {tool.apiType.map((type) => (
                      <span
                        key={type}
                        className="border border-terminal-green/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-terminal-green"
                      >
                        {type}
                      </span>
                    ))}
                    {tool.hasFreeTier && (
                      <span className="bg-terminal-green/10 border border-terminal-green/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-terminal-green">
                        FREE TIER
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by Category ───────────────────────────── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 border-b border-white/10 pb-8 text-center">
              <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl">Browse Categories</h2>
              <p className="mt-2 text-sm text-gray-400">Find tools for every part of your workflow</p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat, idx) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group bg-banknote-black p-8 transition-all hover:bg-white/5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    {getCategoryIcon(cat.icon)}
                    <span className="font-mono text-[10px] font-bold text-gray-700">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-3">
                    {cat.description}
                  </p>
                  <div className="mt-6 font-mono text-[9px] font-bold text-terminal-green">
                    {cat.toolCount} TOOLS
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MCP Servers CTA ──────────────────────────────── */}
        <section className="border-y border-white/10 bg-terminal-green/5 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 border border-terminal-green px-4 py-1 font-mono text-[10px] font-black uppercase text-terminal-green">
              <Zap className="h-4 w-4 fill-terminal-green" /> MCP Ready
            </div>
            <h2 className="font-heading text-5xl font-black italic tracking-tighter sm:text-6xl text-paper-white">Connect to Claude in seconds.</h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-gray-400">
              The Model Context Protocol (MCP) lets AI assistants like Claude directly use your sales tools. 
              Find the tools that are already ready to plug and play.
            </p>
            <Link
              href="/mcp"
              className="mt-12 btn-brutalist bg-terminal-green text-black hover:bg-black hover:text-terminal-green"
            >
              Browse MCP Servers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── Use with AI Agents CTA ─────────────────────── */}
        <section className="border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl">Use Findsday with your agents</h2>
            <p className="mt-6 text-sm text-gray-400">
              Query our database directly from your terminal or download the skill file to let your AI assistant find APIs for you.
            </p>
            <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-4 border border-white/10 bg-black/50 px-6 py-4 font-mono text-xs text-terminal-green">
                <span className="text-gray-700">$</span> curl findsday.com/api/tools
              </div>
              <a
                href="/findsday-skill.md"
                download
                className="btn-brutalist border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-black"
              >
                Download Skill File <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Submit CTA ───────────────────────────────────── */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-black italic tracking-tighter text-paper-white">Add a tool</h2>
            <p className="mt-6 text-sm text-gray-400">
              Help us build the most complete list of sales APIs and MCP servers.
            </p>
            <Link
              href="/submit"
              className="mt-10 btn-brutalist border-white text-white hover:bg-white hover:text-black"
            >
              Submit a Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
