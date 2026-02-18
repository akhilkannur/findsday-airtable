import Link from "next/link"
import { ArrowRight, Code, Cpu, Zap, Server } from "lucide-react"
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
  return Icon ? <Icon className="h-6 w-6 text-accent-green" /> : <Cpu className="h-6 w-6 text-accent-green" />
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

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Every Sales API &amp; MCP Server.{" "}
              <span className="text-accent-green">One Directory.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude, Cursor, and any AI workflow.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar />
            </div>

            <p className="mt-6 text-sm text-gray-500">
              {allTools.length}+ Tools · {categories.length} Categories · Growing Daily
            </p>
          </div>
        </section>

        {/* ── Featured Tools ───────────────────────────────── */}
        <section className="border-t border-gray-800 bg-charcoal-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Featured Tools</h2>
              <Link
                href="/tools"
                className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-accent-green"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
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
                    {tool.integrations.length > 0 && (
                      <span className="flex items-center gap-1 rounded-full bg-accent-green/10 px-2 py-1 text-xs font-medium text-accent-green">
                        <Server className="h-3 w-3" /> {tool.integrations[0].platform}
                      </span>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-gray-400 line-clamp-2">{tool.oneLiner}</p>

                  <div className="flex flex-wrap gap-2">
                    {tool.apiType.map((type) => (
                      <span
                        key={type}
                        className="rounded-md bg-charcoal-light px-2 py-0.5 text-xs text-gray-300"
                      >
                        {type}
                      </span>
                    ))}
                    {tool.hasFreeTier && (
                      <span className="rounded-md bg-accent-green/10 px-2 py-0.5 text-xs text-accent-green">
                        Free Tier
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by Category ───────────────────────────── */}
        <section className="border-t border-gray-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Browse by Category</h2>
              <Link
                href="/categories"
                className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-accent-green"
              >
                All categories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group rounded-xl border border-gray-800 bg-charcoal-dark p-5 transition-all hover:border-gray-600"
                >
                  <div className="mb-3 flex items-center gap-3">
                    {getCategoryIcon(cat.icon)}
                    <h3 className="font-semibold text-white group-hover:text-accent-green transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-gray-400 line-clamp-2">{cat.description}</p>
                  <span className="text-xs text-gray-500">{cat.toolCount} tool{cat.toolCount !== 1 ? "s" : ""}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MCP Servers CTA ──────────────────────────────── */}
        <section className="border-t border-gray-800 bg-charcoal-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-green/10 px-4 py-1.5 text-sm font-medium text-accent-green">
              <Zap className="h-4 w-4" /> MCP Ready
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Tools with MCP Servers</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              MCP (Model Context Protocol) lets AI assistants like Claude directly interact with sales tools.
              Browse the {mcpTools.length} tools that already ship MCP servers.
            </p>
            <Link
              href="/mcp"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-green px-6 py-3 font-semibold text-charcoal-dark transition-colors hover:bg-accent-green/80"
            >
              Browse MCP Servers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── Use with AI Agents CTA ─────────────────────── */}
        <section className="border-t border-gray-800 bg-charcoal-dark px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-pink/10 px-4 py-1.5 text-sm font-medium text-accent-pink">
              <Code className="h-4 w-4" /> For AI Tinkerers
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Use Findsday from Claude Code or any AI agent</h2>
            <p className="mt-4 text-gray-400">
              Query our API directly from your terminal or download the skill file to let your AI assistant find sales APIs for you.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <code className="rounded-lg bg-charcoal-light px-4 py-3 text-sm text-accent-green border border-gray-800">
                curl findsday.com/api/tools?category=CRM
              </code>
              <a
                href="/findsday-skill.md"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-accent-pink px-6 py-3 font-semibold text-charcoal-dark transition-colors hover:bg-accent-pink/80"
              >
                Download Skill File <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Submit CTA ───────────────────────────────────── */}
        <section className="border-t border-gray-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Know a sales API we&apos;re missing?</h2>
            <p className="mt-4 text-gray-400">
              Help us build the most complete directory of sales APIs and MCP servers. Submit a tool and we&apos;ll review it.
            </p>
            <Link
              href="/submit"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:border-accent-pink hover:text-accent-pink"
            >
              Submit a Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
