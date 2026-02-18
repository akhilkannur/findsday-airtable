import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools, getAllTools } from "@/lib/tools"
import { SearchBar } from "@/components/SearchBar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Findsday — Sales APIs & MCP Servers for AI Tinkerers",
  description:
    "Every sales API and MCP server in one directory. Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude, Cursor, Gemini CLI, and any AI workflow.",
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
    description: "The directory of sales APIs and MCP servers for AI tinkerers.",
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
            <div className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-terminal-green">
              <span className="inline-block h-2 w-2 animate-pulse bg-terminal-green" />
              Real-time Sales Infrastructure Registry
            </div>
            <h1 className="font-heading text-5xl font-black italic leading-[0.9] tracking-tighter sm:text-7xl lg:text-9xl text-paper-white">
              Every Sales API.<br />
              <span className="text-terminal-green">One Ledger.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl font-mono text-sm uppercase tracking-wider text-gray-500 sm:text-base">
              Connecting high-intent sales infrastructure to autonomous agents and AI-native operators.
            </p>

            <div className="mx-auto mt-12 max-w-xl">
              <SearchBar />
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-gray-600">
              <div className="flex flex-col items-center">
                <span className="text-paper-white font-bold">{allTools.length}+</span>
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
                <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl">Featured Registry</h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">Verified high-performance sales APIs</p>
              </div>
              <Link
                href="/tools"
                className="btn-brutalist"
              >
                View Full Registry <ArrowRight className="h-4 w-4" />
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
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-600">{tool.category}</span>
                      </div>
                    </div>
                    {tool.mcpReady && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-terminal-green/20 text-terminal-green border border-terminal-green/30">
                        <Zap className="h-3.5 w-3.5 fill-terminal-green" />
                      </div>
                    )}
                  </div>

                  <p className="mb-8 font-mono text-xs uppercase leading-relaxed text-gray-500 line-clamp-2">{tool.oneLiner}</p>

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
                        FREE_ACCESS
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
            <div className="mb-16 border-b border-white/10 pb-8">
              <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl text-center">Infrastructure Segments</h2>
              <p className="mt-2 text-center font-mono text-xs uppercase tracking-widest text-gray-500">Categorized by operational output</p>
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
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-gray-600 line-clamp-3">
                    {cat.description}
                  </p>
                  <div className="mt-6 font-mono text-[9px] font-bold text-terminal-green">
                    {cat.toolCount} TOOLS_REGISTERED
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
              <Zap className="h-4 w-4 fill-terminal-green" /> MCP_ENABLED_ACCESS
            </div>
            <h2 className="font-heading text-5xl font-black italic tracking-tighter sm:text-6xl text-paper-white">Zero-Config AI Connectivity</h2>
            <p className="mx-auto mt-8 max-w-xl font-mono text-xs uppercase leading-loose tracking-widest text-gray-500">
              The Model Context Protocol (MCP) is the new standard for autonomous operations. 
              We've cataloged {mcpTools.length} tools that are ready for immediate agent deployment.
            </p>
            <Link
              href="/mcp"
              className="mt-12 btn-brutalist bg-terminal-green text-black hover:bg-black hover:text-terminal-green"
            >
              Access MCP Ledger <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── Use with AI Agents CTA ─────────────────────── */}
        <section className="border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl font-black italic tracking-tighter sm:text-5xl">Human-to-Agent Translation</h2>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              Download skill files or query our registry via terminal to equip your agents with sales capabilities.
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
                Download Agent Skill File <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Submit CTA ───────────────────────────────────── */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-black italic tracking-tighter text-paper-white">Add to the Registry</h2>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              Contribute to the most comprehensive ledger of AI-ready sales infrastructure.
            </p>
            <Link
              href="/submit"
              className="mt-10 btn-brutalist border-white text-white hover:bg-white hover:text-black"
            >
              Submit API Entry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
