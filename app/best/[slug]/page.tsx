import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getBestHubBySlug,
  getAllBestHubSlugs,
  getRankedToolsForHub,
  getAllBestHubs,
  type RankedTool,
} from "@/lib/best"
import { getToolHref } from "@/lib/tools"
import { Zap, BadgeCheck, ArrowRight } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

export async function generateStaticParams() {
  return getAllBestHubSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const hub = getBestHubBySlug(slug)

  if (!hub) {
    return { title: "Best of Not Found | Salestools Club" }
  }

  const pageUrl = `https://salestools.club/best/${hub.slug}`
  const pageTitle = `${hub.keyword}: Ranked & Compared | Salestools Club`

  return {
    title: pageTitle,
    description: hub.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description: hub.summary,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: `${pageUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: pageTitle,
      description: hub.summary,
      images: [`${pageUrl}/opengraph-image`],
    },
  }
}

function Badge({ label, icon }: { label: string; icon?: "mcp" | "free" }) {
  return (
    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full inline-flex items-center gap-1 whitespace-nowrap">
      {icon === "mcp" && <Zap className="w-3 h-3" />}
      {icon === "free" && <BadgeCheck className="w-3 h-3" />}
      {label}
    </span>
  )
}

function ToolRow({ tool, rank, totalCaps }: { tool: RankedTool; rank: number; totalCaps: number }) {
  const href = getToolHref(tool)
  return (
    <Link
      href={href}
      className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-start border-b border-dashed border-black/10 py-5 group"
    >
      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-mono font-bold text-sm md:text-base border border-ink/20 rounded-full shrink-0">
        {rank}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
          <h2 className="text-lg md:text-xl font-semibold group-hover:underline underline-offset-4">
            {tool.name}
          </h2>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2 mb-2">
          {tool.oneLiner}
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge label={tool.mcpReady ? "MCP Ready" : "API Only"} icon={tool.mcpReady ? "mcp" : undefined} />
          <Badge label={tool.hasFreeTier ? "Free Tier" : "Paid"} icon={tool.hasFreeTier ? "free" : undefined} />
          {tool.capabilityMatches.slice(0, 3).map((cap) => (
            <span
              key={cap}
              className="hidden md:inline font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-black text-paper rounded-full"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-end gap-1.5">
        <span className="font-mono text-[9px] text-ink-fade uppercase tracking-widest">Coverage</span>
        <span className="font-mono text-sm font-bold">
          {tool.capabilityMatches.length}/{totalCaps}
        </span>
      </div>
    </Link>
  )
}

export default async function BestHubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const hub = getBestHubBySlug(slug)

  if (!hub) {
    notFound()
  }

  const tools = await getRankedToolsForHub(hub)
  const totalCapabilities = hub.capabilities.length

  // Cross-link to sibling hubs + a vs page between the top two anchors
  const siblingHubs = getAllBestHubs().filter((h) => h.slug !== hub.slug).slice(0, 6)
  const vsPair = (() => {
    const [a, b] = hub.anchorTools.slice(0, 2)
    if (!a || !b) return null
    const aTool = tools.find((t) => t.slug === a)
    const bTool = tools.find((t) => t.slug === b)
    if (!aTool || !bTool) return null
    return { a: aTool, b: bTool }
  })()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${hub.keyword} — Ranked`,
    "description": hub.summary,
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": tool.name,
      "url": `https://salestools.club${getToolHref(tool)}`,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <BreadcrumbJsonLd
        items={[
          { name: "Best Sales Tools", href: "/best" },
          { name: hub.keyword, href: `/best/${hub.slug}` },
        ]}
      />

      <section className="px-4 py-10 md:px-8 md:py-16 border-b border-ink">
        <div className="layout-container">
          <div className="font-mono text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black">Best</span>
            <Link href="/best" className="hover:underline">All Guides</Link>
          </div>
          <h1 className="type-display mb-5 text-3xl md:text-5xl">{hub.keyword}</h1>
          <p className="text-lg text-ink-fade max-w-2xl leading-relaxed mb-6">{hub.intro}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge label={`${tools.length} Tools`} />
            <Badge label={`${totalCapabilities} Capabilities`} />
            <Badge label="Verified Fresh" />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="max-w-2xl mb-10 prose-sm">
            <p className="text-[0.95rem] text-ink-fade leading-relaxed">{hub.body}</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-2">The Ranked List</h2>
          <p className="text-[0.9rem] text-ink-fade mb-6">
            Ranked by capability coverage across {totalCapabilities} core capabilities, with
            MCP readiness and free-tier support as tiebreakers. Built from our verified
            directory of {tools.length} tools.
          </p>

          <div className="border-t border-ink/20">
            {tools.map((tool, i) => (
              <ToolRow key={tool.slug} tool={tool} rank={i + 1} totalCaps={totalCapabilities} />
            ))}
          </div>

          {hub.related && hub.related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-ink/20">
              <h2 className="text-xl font-semibold mb-4">Related Best-Of Guides</h2>
              <div className="flex flex-wrap gap-2">
                {hub.related.map((slug) => {
                  const related = getBestHubBySlug(slug)
                  if (!related) return null
                  return (
                    <Link
                      key={slug}
                      href={`/best/${slug}`}
                      className="border border-ink/20 px-4 py-2 text-[0.9rem] font-medium hover:border-ink transition-colors"
                    >
                      {related.keyword} →
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {(vsPair || siblingHubs.length > 0) && (
            <div className="mt-8 pt-8 border-t border-ink/20 flex flex-wrap items-center gap-x-8 gap-y-3">
              {vsPair && (
                <Link
                  href={`/vs/${[vsPair.a.slug, vsPair.b.slug].sort().join("-vs-")}`}
                  className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {vsPair.a.name} vs {vsPair.b.name}
                </Link>
              )}
              {siblingHubs.map((h) => (
                <Link
                  key={h.slug}
                  href={`/best/${h.slug}`}
                  className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {h.keyword}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}