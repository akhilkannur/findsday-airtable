import { getToolsByAlternativeTo, getAllTools, getToolHref } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { ArrowRight, Check, X, ExternalLink, Zap, Wallet, Cpu, Shield } from "lucide-react"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const tools = await getAllTools()
  const topTools = ["hubspot", "salesforce", "apollo", "zoominfo", "pipedrive", "lusha", "clearbit", "hunter"]
  return topTools.map((tool) => ({
    tool: tool,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params
  const toolDisplay = tool.charAt(0).toUpperCase() + tool.slice(1)

  return {
    title: `Best ${toolDisplay} Alternatives for AI Agents | Salestools Club`,
    description: `Compare the top alternatives to ${toolDisplay} for autonomous sales workflows. Find AI-native tools with better APIs and MCP support.`,
    alternates: {
      canonical: `https://salestools.club/alternative-to/${tool}`,
    },
    openGraph: {
      title: `Best ${toolDisplay} Alternatives for AI Agents | Salestools Club`,
      description: `Compare the top alternatives to ${toolDisplay} for autonomous sales workflows.`,
      type: "website",
      url: `https://salestools.club/alternative-to/${tool}`,
      images: [{ url: "https://salestools.club/opengraph-image", width: 1200, height: 630, alt: `Best ${toolDisplay} Alternatives` }],
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
          {tools.map((t) => (
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

export default async function AlternativeToPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params
  const alternatives = await getToolsByAlternativeTo(tool)

  if (alternatives.length === 0) {
    notFound()
  }

  const toolDisplay = tool.charAt(0).toUpperCase() + tool.slice(1)

  const mcpCount = alternatives.filter(a => a.mcpReady).length
  const freeCount = alternatives.filter(a => a.hasFreeTier).length
  const webhookCount = alternatives.filter(a => a.hasWebhooks).length
  const apiTypes = [...new Set(alternatives.flatMap(a => a.apiType))].join(", ")
  const mcpNames = alternatives.filter(a => a.mcpReady).map(a => a.name).slice(0, 5)

  const faqItems = [
    {
      question: `How many of these alternatives have MCP support?`,
      answer: `${mcpCount} out of ${alternatives.length} tools offer MCP server support: ${mcpNames.join(", ")}${mcpCount > 5 ? `, and ${mcpCount - 5} more` : ""}. MCP lets your AI agent connect with zero configuration — just paste the config into Claude Desktop or Cursor.`
    },
    {
      question: `Which alternatives have a free tier?`,
      answer: `${freeCount} out of ${alternatives.length} tools offer a free tier: ${alternatives.filter(a => a.hasFreeTier).map(a => a.name).slice(0, 8).join(", ")}${freeCount > 8 ? `, and ${freeCount - 8} more` : ""}. Free tiers are useful for prototyping agentic workflows before committing to a paid plan.`
    },
    {
      question: `What API types do these alternatives support?`,
      answer: `The alternatives use ${apiTypes} APIs. REST is the most common format across all tools, making them compatible with standard HTTP clients and AI agent frameworks.`
    },
    {
      question: `How many support webhooks for real-time events?`,
      answer: `${webhookCount} out of ${alternatives.length} tools support webhooks. Webhooks let your AI agent react to events (new lead, updated contact, deal stage change) without polling — critical for building responsive automation.`
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <BreadcrumbJsonLd items={[
        { name: "Alternatives", url: "https://salestools.club/api" },
        { name: toolDisplay, url: `https://salestools.club/alternative-to/${tool}` },
      ]} />

      {/* Hero */}
      <section className="px-4 md:px-8 py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <Link href="/api" className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline transition-colors hover:text-ink mb-8 md:mb-12 inline-block">
            &lt;- Back to Directory
          </Link>
          <p className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.16em] text-ink-fade mb-3 md:mb-4">Alternatives</p>
          <h1 className="type-display mb-6 text-3xl md:text-5xl lg:text-7xl">
            Best {toolDisplay} <span className="circled">Alternatives</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-ink-fade leading-relaxed border-l border-ink/10 pl-4 md:pl-6">
            {alternatives.length} tools positioned as {toolDisplay} alternatives, ranked by API quality and AI-agent readiness.
          </p>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.16em] font-bold text-ink mb-2">Comparison Matrix</h2>
          <p className="text-sm text-ink-fade mb-8">Side-by-side spec comparison. Click tool names for full details.</p>
          <ComparisonTable tools={alternatives} />
          <p className="mt-4 text-xs text-ink-fade font-mono">Last updated from tool data. Pricing URLs link to official pages.</p>
        </div>
      </section>

      {/* Quick Picks */}
      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.16em] font-bold text-ink mb-8">Quick Picks</h2>
          <QuickPicks tools={alternatives} />
        </div>
      </section>

      {/* Full List */}
      <section className="py-12 md:py-20">
        <div className="layout-container">
          <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.16em] font-bold text-ink mb-8">All {alternatives.length} Alternatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {alternatives.map((t) => (
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
        </div>
      </section>

      <FaqSection items={faqItems} title={`${toolDisplay} Alternatives FAQ`} />
    </div>
  )
}
