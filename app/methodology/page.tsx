import type { Metadata } from "next"
import Link from "next/link"
import { getAllBestHubs, getAllBestHubSlugs } from "@/lib/best"
import { getMcpTools } from "@/lib/tools"

export const metadata: Metadata = {
  title: "How We Verify Tools | Salestools Club",
  description:
    "How Salestools Club verifies and ranks sales APIs and MCP servers. Our freshness pipeline, capability scoring, and ranking methodology — no paid placements, no marketing fluff.",
  alternates: { canonical: "https://salestools.club/methodology" },
  openGraph: {
    title: "How We Verify Tools | Salestools Club",
    description:
      "Independent verification, weekly freshness checks, and a transparent ranking methodology for sales APIs and MCP servers.",
    type: "website",
    url: "https://salestools.club/methodology",
  },
}

export default async function MethodologyPage() {
  const hubCount = getAllBestHubSlugs().length
  const mcpTools = await getMcpTools()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-24 border-b border-ink">
        <div className="layout-container">
          <div className="font-mono text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black">Method</span>
            <span>How we verify &amp; rank</span>
          </div>
          <h1 className="type-display mb-6 text-3xl md:text-5xl lg:text-6xl">
            How We Verify Tools
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-ink-fade leading-relaxed">
            No paid placements. No vendor-written listings. Every tool in this
            directory is checked against real endpoints on a schedule, and our
            best-of guides rank on capability coverage, MCP readiness, and free
            tiers — not on who pays us.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="border border-ink/20 p-6">
              <div className="font-mono text-3xl font-bold mb-3">{hubCount}</div>
              <h2 className="font-semibold mb-1">Best-Of Guides</h2>
              <p className="text-sm text-ink-fade">One ranked guide per sales category, rebuilt from verified data.</p>
            </div>
            <div className="border border-ink/20 p-6">
              <div className="font-mono text-3xl font-bold mb-3">{mcpTools.length}+</div>
              <h2 className="font-semibold mb-1">MCP-Ready Tools</h2>
              <p className="text-sm text-ink-fade">Tools your AI agent can drive today via the Model Context Protocol.</p>
            </div>
            <div className="border border-ink/20 p-6">
              <div className="font-mono text-3xl font-bold mb-3">Weekly</div>
              <h2 className="font-semibold mb-1">Freshness Checks</h2>
              <p className="text-sm text-ink-fade">An automated pipeline re-checks every documented endpoint weekly.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3">1. Endpoint freshness pipeline</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  Every tool with a documented API gets its docs URL checked automatically on a
                  weekly schedule. We follow redirects, fall back to the raw page when servers
                  block automated clients, and flag anything that returns a hard error. Dead or
                  moved links get fixed or removed — we don't keep ghost listings around.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">2. Deep re-check via AI fetch</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  When a URL fails at the HTTP layer, we re-verify through an AI-native fetch
                  service that renders JavaScript. This catches false positives — tools whose
                  docs are protected by bot blockers or built as single-page apps — so a live
                  tool is never marked dead because of a WAF rule.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">3. Capability scoring</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  Each tool lists the sales capabilities it actually exposes. Our ranked guides
                  score tools on how many of a category's core capabilities they cover, with
                  MCP readiness and a free tier as tiebreakers. The list order changes only when
                  the underlying data does.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3">4. No paid placement</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  Tools can't buy their way up a list. Rankings come from the same public data
                  pipeline that powers the rest of the site. The only editorial layer is a small
                  set of hand-picked category leaders per guide — so the top of each list is
                  defensible, and the rest is pure data.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">5. Removal criteria</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  We remove tools when their domain stops resolving, their API docs return
                  errors across multiple checks, or their product is acquired and folded into
                  another platform. Anything borderline gets the AI re-check before we make a
                  call.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">6. What we don't do</h2>
                <p className="text-[0.95rem] text-ink-fade leading-relaxed">
                  We don't rank on vendor claims, we don't scrape "top 10" lists and republish
                  them, and we don't mark a tool MCP-ready unless there's an actual server or a
                  documented API to wire it. Every page is built to answer one question an
                  AI-native operator actually asks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-white/30 py-12 md:py-16">
        <div className="layout-container">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">See the methodology in action</h2>
          <div className="flex flex-wrap gap-2">
            {getAllBestHubs().map((hub) => (
              <Link
                key={hub.slug}
                href={`/best/${hub.slug}`}
                className="border border-ink/20 px-4 py-2 text-[0.9rem] font-medium hover:border-ink transition-colors"
              >
                {hub.keyword} →
              </Link>
            ))}
            <Link
              href="/mcp"
              className="border border-ink/20 px-4 py-2 text-[0.9rem] font-medium hover:border-ink transition-colors"
            >
              MCP Directory →
            </Link>
            <Link
              href="/mcp/what-is-an-mcp-server"
              className="border border-ink/20 px-4 py-2 text-[0.9rem] font-medium hover:border-ink transition-colors"
            >
              What Is an MCP Server? →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}