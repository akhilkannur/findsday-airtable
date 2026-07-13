import { getToolsByCapability, getAllCapabilities, getAllCategories, CANONICAL_CAPABILITIES, getToolHref } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { ProgrammaticFilterBar } from "@/components/ProgrammaticFilterBar"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { generateSeoTitle, generateSeoDescription, formatAcronyms, generateSeoKeywords } from "@/lib/seo"
import { ArrowRight, Check, X, ExternalLink, Zap, Wallet, Cpu } from "lucide-react"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const capabilities = getAllCapabilities()
  return capabilities.map((cap) => ({
    action: cap.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ action: string }> }): Promise<Metadata> {
  const { action } = await params
  
  const isCanonical = CANONICAL_CAPABILITIES.some(
    (cap) => cap.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === action
  )

  if (!isCanonical) {
    return {
      title: "Capability Not Found | Salestools Club",
      robots: { index: false, follow: false },
    }
  }

  const tools = await getToolsByCapability(action)
  const actionDisplay = formatAcronyms(action)
  const pageKeywords = generateSeoKeywords(actionDisplay, "capability")

  return {
    title: generateSeoTitle(actionDisplay, "capability"),
    description: generateSeoDescription(actionDisplay, "capability", tools.length),
    keywords: pageKeywords,
    alternates: {
      canonical: `https://salestools.club/capability/${action}`,
    },
    openGraph: {
      title: generateSeoTitle(actionDisplay, "capability"),
      description: generateSeoDescription(actionDisplay, "capability", tools.length),
      type: "website",
      url: `https://salestools.club/capability/${action}`,
      images: [{ url: "https://salestools.club/opengraph-image", width: 1200, height: 630, alt: `${actionDisplay} APIs` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@salestoolsclub",
      title: generateSeoTitle(actionDisplay, "capability"),
      description: generateSeoDescription(actionDisplay, "capability", tools.length),
      images: ["https://salestools.club/opengraph-image"],
    },
  }
}

function ComparisonTable({ tools }: { tools: any[] }) {
  return (
    <div className="overflow-x-auto border border-ink">
      <table className="w-full text-left font-mono text-[0.7rem] md:text-[0.75rem]">
        <thead>
          <tr className="bg-ink text-paper uppercase tracking-[0.16em]">
            <th className="p-3 border-r border-paper/20">Tool</th>
            <th className="p-3 border-r border-paper/20">MCP</th>
            <th className="p-3 border-r border-paper/20">Free Tier</th>
            <th className="p-3 border-r border-paper/20">API</th>
            <th className="p-3 border-r border-paper/20">Auth</th>
            <th className="p-3">Pricing</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink">
          {tools.slice(0, 20).map((t) => (
            <tr key={t.slug} className="hover:bg-paper-dark/20 transition-colors">
              <td className="p-3 border-r border-ink font-bold group">
                <Link href={getToolHref(t)} className="hover:underline underline-offset-4 flex items-center gap-2">
                  {t.name} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </td>
              <td className="p-3 border-r border-ink">
                {t.mcpReady ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-ink-fade/40" />}
              </td>
              <td className="p-3 border-r border-ink">
                {t.hasFreeTier ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-ink-fade/40" />}
              </td>
              <td className="p-3 border-r border-ink">
                <span className="font-mono text-[0.65rem]">{t.apiType.join(", ")}</span>
              </td>
              <td className="p-3 border-r border-ink">
                <span className="font-mono text-[0.65rem]">{t.authMethod.join(", ")}</span>
              </td>
              <td className="p-3">
                {t.pricingUrl ? (
                  <a href={t.pricingUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink transition-colors inline-flex items-center gap-1">
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                ) : <span className="text-ink-fade/50">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tools.length > 20 && (
        <p className="p-3 font-mono text-[0.65rem] text-ink-fade border-t border-ink">
          Showing 20 of {tools.length} tools. Use the filter below to narrow down.
        </p>
      )}
    </div>
  )
}

function QuickPicks({ tools }: { tools: any[] }) {
  const mcpTools = tools.filter(t => t.mcpReady)
  const freeTools = tools.filter(t => t.hasFreeTier)
  const webhookTools = tools.filter(t => t.hasWebhooks)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mcpTools.length > 0 && (
        <div className="p-6 border border-ink bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-5 w-5" />
            <h3 className="font-mono text-[0.7rem] uppercase font-bold tracking-[0.16em]">Best MCP Ready</h3>
          </div>
          <Link href={getToolHref(mcpTools[0])} className="text-xl font-bold hover:underline block mb-2">{mcpTools[0].name}</Link>
          <p className="text-sm text-ink-fade">{mcpTools[0].oneLiner}</p>
        </div>
      )}
      {freeTools.length > 0 && (
        <div className="p-6 border border-ink bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-5 w-5" />
            <h3 className="font-mono text-[0.7rem] uppercase font-bold tracking-[0.16em]">Best Free Tier</h3>
          </div>
          <Link href={getToolHref(freeTools[0])} className="text-xl font-bold hover:underline block mb-2">{freeTools[0].name}</Link>
          <p className="text-sm text-ink-fade">{freeTools[0].oneLiner}</p>
        </div>
      )}
      {webhookTools.length > 0 && (
        <div className="p-6 border border-ink bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="h-5 w-5" />
            <h3 className="font-mono text-[0.7rem] uppercase font-bold tracking-[0.16em]">Best Webhooks</h3>
          </div>
          <Link href={getToolHref(webhookTools[0])} className="text-xl font-bold hover:underline block mb-2">{webhookTools[0].name}</Link>
          <p className="text-sm text-ink-fade">{webhookTools[0].oneLiner}</p>
        </div>
      )}
    </div>
  )
}

export default async function CapabilityPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ action: string }>,
  searchParams: Promise<{ category?: string }>
}) {
  const { action } = await params
  const { category: categorySlug } = await searchParams

  const CONSOLIDATION_MAP: Record<string, string> = {
    "crm-automation": "crm-and-revops",
    "ai-voice-dialers": "phone-and-dialers",
    "revenue-intelligence": "revenue-intelligence",
    "sales-enablement": "sales-enablement",
    "meeting-scheduling": "closing-and-scheduling",
    "cpq-closing": "closing-and-scheduling",
  }

  if (CONSOLIDATION_MAP[action]) {
    permanentRedirect(`/categories/${CONSOLIDATION_MAP[action]}`)
  }

  const isCanonical = CANONICAL_CAPABILITIES.some(
    (cap) => cap.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === action
  )

  if (!isCanonical) {
    permanentRedirect("/api")
  }
  
  let tools = await getToolsByCapability(action)
  const categories = getAllCategories()

  if (categorySlug) {
    const resolvedCategory = categories.find(c => c.slug === categorySlug)
    if (resolvedCategory) {
      tools = tools.filter(t => t.category === resolvedCategory.name)
    }
  }
  
  if (tools.length === 0 && !categorySlug) {
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect("/api")
  }

  const actionDisplay = formatAcronyms(action)
  const mcpCount = tools.filter(t => t.mcpReady).length
  const freeCount = tools.filter(t => t.hasFreeTier).length
  const webhookCount = tools.filter(t => t.hasWebhooks).length
  const apiTypes = [...new Set(tools.flatMap(t => t.apiType))].join(", ")
  const mcpNames = tools.filter(t => t.mcpReady).map(t => t.name).slice(0, 5)
  const freeNames = tools.filter(t => t.hasFreeTier).map(t => t.name).slice(0, 5)

  const faqItems = [
    {
      question: `How many tools support ${actionDisplay}?`,
      answer: `We track ${tools.length} tools with ${actionDisplay} capabilities. ${mcpCount} of them offer MCP server support for zero-config AI agent integration.`
    },
    {
      question: `Which ${actionDisplay} tools have MCP support?`,
      answer: `${mcpCount > 0 ? `${mcpNames.join(", ")}${mcpCount > 5 ? `, and ${mcpCount - 5} more` : ""}` : "None of the listed tools currently offer MCP support."} MCP lets your AI agent connect without writing custom integration code — just paste the config.`
    },
    {
      question: `Are there free ${actionDisplay} tools to prototype with?`,
      answer: `${freeCount > 0 ? `Yes — ${freeCount} tools offer a free tier: ${freeNames.join(", ")}${freeCount > 5 ? `, and ${freeCount - 5} more` : ""}` : "No tools in this category currently offer a free tier."} Free tiers are useful for testing agentic workflows before committing to a paid plan.`
    },
    {
      question: `What API types do these tools use?`,
      answer: `The tools use ${apiTypes}. REST is the most common, making them compatible with standard HTTP clients and AI agent frameworks like Claude Code and Gemini CLI.`
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <BreadcrumbJsonLd items={[
        { name: "Capabilities", url: "https://salestools.club/api" },
        { name: actionDisplay, url: `https://salestools.club/capability/${action}` },
      ]} />

      <nav className="layout-container py-4 md:py-6 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.7rem] font-mono uppercase tracking-[0.16em] text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline transition-all">Home</Link>
        <span className="opacity-30">/</span>
        <span className="opacity-30 uppercase">Capabilities</span>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">{actionDisplay}</span>
      </nav>

      <section className="px-4 md:px-8 py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-6 text-3xl md:text-5xl lg:text-7xl">
            {actionDisplay} <span className="circled">APIs</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-ink-fade leading-relaxed border-l border-ink/10 pl-4 md:pl-6">
            {tools.length} verified tools with {actionDisplay.toLowerCase()} capabilities. Compare MCP support, pricing, and API specs side-by-side.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.16em] font-bold text-ink mb-2">Spec Comparison</h2>
          <p className="text-sm text-ink-fade mb-8">MCP readiness, free tiers, API types, and auth methods for all {actionDisplay} tools.</p>
          <ComparisonTable tools={tools} />
          <p className="mt-4 text-xs text-ink-fade font-mono">Data from tool definitions. Pricing links go to official pages.</p>
        </div>
      </section>

      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.16em] font-bold text-ink mb-8">Quick Picks</h2>
          <QuickPicks tools={tools} />
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">All {tools.length} Tools</h2>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <ProgrammaticFilterBar 
            categories={categories.map(c => ({ slug: c.slug, name: c.name }))} 
            baseUrl={`/capability/${action}`}
          />

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tools.map((t) => (
                <Link key={t.slug} href={getToolHref(t)} className="tool-card group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xl md:text-2xl font-bold">{t.name}</span>
                    {t.mcpReady && <div className="tag-mcp">MCP</div>}
                  </div>
                  <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {t.oneLiner}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-ink/5">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                    <span className="ml-auto font-mono text-[9px] font-bold uppercase px-2 py-0.5 border border-ink/20 rounded-full">
                      {t.hasFreeTier ? "Free" : "Paid"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center border-2 border-dashed border-ink/10">
              <p className="text-lg md:text-xl text-ink-fade">No tools found in this category for {actionDisplay.toLowerCase()}.</p>
              <Link href={`/capability/${action}`} className="mt-4 inline-block font-mono text-[0.7rem] uppercase underline">Clear Category Filter</Link>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={faqItems} title={`${actionDisplay} FAQ`} />
    </div>
  )
}
