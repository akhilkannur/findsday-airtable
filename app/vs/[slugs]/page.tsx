import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolsForComparison, getAllSlugs } from "@/lib/tools"
import { Zap, Check, X, ArrowRight } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { FaqSection } from "@/components/FaqSection"
import { generateSeoTitle, generateSeoDescription } from "@/lib/seo"

interface Props {
  params: Promise<{ slugs: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params
  const { tool1, tool2 } = await getToolsForComparison(slugs)

  if (!tool1 || !tool2) {
    return { 
      title: "Comparison Not Found | Salestools Club",
      robots: { index: false, follow: true },
    }
  }

  const subject = `${tool1.name} vs ${tool2.name}`
  const pageTitle = generateSeoTitle(subject, "vs")
  const pageDescription = generateSeoDescription(subject, "vs")
  const pageUrl = `https://salestools.club/vs/${slugs}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: pageTitle,
      description: pageDescription,
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slugs } = await params
  const { tool1, tool2 } = await getToolsForComparison(slugs)

  if (!tool1 && !tool2) {
    // Both tools missing, go to /vs permanently
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect("/vs")
  }

  if (!tool1 || !tool2) {
    // One tool missing, go to the one that exists permanently
    const existingTool = tool1 || tool2
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect(`/apis/${existingTool!.slug}`)
  }

  const specs = [
    { label: "API Type", val1: (tool1.apiType || []).join(", "), val2: (tool2.apiType || []).join(", ") },
    { label: "MCP Ready", val1: tool1.mcpReady ? "YES" : "NO", val2: tool2.mcpReady ? "YES" : "NO" },
    { label: "Free Tier", val1: tool1.hasFreeTier ? "YES" : "NO", val2: tool2.hasFreeTier ? "YES" : "NO" },
    { label: "SDKs", val1: (tool1.sdkLanguages || []).join(", ") || "None", val2: (tool2.sdkLanguages || []).join(", ") || "None" },
    { label: "Webhooks", val1: tool1.hasWebhooks ? "YES" : "NO", val2: tool2.hasWebhooks ? "YES" : "NO" },
    { label: "Capabilities", val1: (tool1.aiCapabilities || []).join(", ") || "—", val2: (tool2.aiCapabilities || []).join(", ") || "—" },
  ]

  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${tool1.name} vs ${tool2.name}`,
    "description": `Compare ${tool1.name} and ${tool2.name} APIs for AI sales agents.`,
    "numberOfItems": 2,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": tool1.name,
        "url": `https://salestools.club/apis/${tool1.slug}`,
        "description": tool1.oneLiner,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tool2.name,
        "url": `https://salestools.club/apis/${tool2.slug}`,
        "description": tool2.oneLiner,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Comparisons", url: "https://salestools.club/vs" },
        { name: `${tool1.name} vs ${tool2.name}`, url: `https://salestools.club/vs/${slugs}` },
      ]} />
      {/* Header */}
      <section className="px-4 py-12 md:px-8 md:py-24 border-b border-ink bg-paper-dark/30 relative overflow-hidden">
        <div className="layout-container">
          <div className="font-mono text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] mb-8 md:mb-16 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black italic">Compare</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-status-blink"></div>
            <span>Side-by-Side Comparison</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start lg:items-center gap-8 md:gap-24">
            {/* Tool 1 */}
            <div className="flex flex-col items-start gap-4 md:gap-8">
              <ToolLogo name={tool1.name} websiteUrl={tool1.websiteUrl} size="lg" />
              <h1 className="type-display uppercase text-3xl md:text-4xl lg:text-5xl">{tool1.name}</h1>
              <p className="font-serif italic text-lg md:text-xl text-ink-fade max-w-sm border-l-2 border-black pl-4">{tool1.oneLiner}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center py-4 lg:py-0">
              <div className="h-12 lg:h-20 w-px bg-black opacity-10 hidden md:block"></div>
              <div className="my-4 lg:my-8 px-8 py-4 lg:px-10 lg:py-6 border-2 border-black bg-paper text-black font-black italic tracking-tighter text-2xl lg:text-4xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)] lg:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] rotate-[-2deg] hover:rotate-0 transition-transform">
                VS
              </div>
              <div className="h-12 lg:h-20 w-px bg-black opacity-10 hidden md:block"></div>
            </div>

            {/* Tool 2 */}
            <div className="flex flex-col items-start lg:items-end gap-4 md:gap-8 lg:text-right">
              <ToolLogo name={tool2.name} websiteUrl={tool2.websiteUrl} size="lg" />
              <h1 className="type-display uppercase text-3xl md:text-4xl lg:text-5xl">{tool2.name}</h1>
              <p className="font-serif italic text-lg md:text-xl text-ink-fade max-w-sm lg:border-r-2 border-black lg:pr-4">{tool2.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="border border-ink/20 bg-white/40">
            {/* Mobile: stacked cards */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-px bg-paper-dark/50 border-b border-ink/20 text-[0.65rem] font-mono font-bold uppercase tracking-widest px-4 py-4 text-ink-fade">
                <div className="text-black">{tool1.name}</div>
                <div className="text-black">{tool2.name}</div>
              </div>
              {specs.map((spec) => (
                <div key={spec.label} className="px-4 py-4 border-b border-ink/10">
                  <div className="font-mono text-[0.65rem] uppercase tracking-widest font-bold text-ink/70 mb-2">{spec.label}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={spec.label === "Capabilities" ? "font-serif text-sm leading-relaxed" : "font-serif text-sm font-bold uppercase"}>{spec.val1}</div>
                    <div className={spec.label === "Capabilities" ? "font-serif text-sm leading-relaxed" : "font-serif text-sm font-bold uppercase"}>{spec.val2}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: 3-column grid */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-6 bg-paper-dark/50 border-b border-ink/20 text-[0.7rem] font-mono font-bold uppercase tracking-widest px-8 py-6 text-ink-fade">
                <div></div>
                <div className="text-black">{tool1.name}</div>
                <div className="text-black">{tool2.name}</div>
              </div>
              {specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[1.2fr_1fr_1fr] gap-6 px-8 py-6 border-b border-ink/10 hover:bg-[var(--highlight)] transition-colors group">
                  <div className="font-mono text-[0.85rem] uppercase tracking-widest font-bold text-ink/70">{spec.label}</div>
                  <div className={spec.label === "Capabilities" ? "font-serif text-[0.95rem] leading-relaxed pr-4" : "font-serif text-[1.2rem] font-bold uppercase"}>{spec.val1}</div>
                  <div className={spec.label === "Capabilities" ? "font-serif text-[0.95rem] leading-relaxed" : "font-serif text-[1.2rem] font-bold uppercase"}>{spec.val2}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Analysis */}
      <section className="py-12 md:py-20 border-t border-ink/10">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">API & MCP Analysis</h2>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>
          <div className="prose prose-ink max-w-none font-serif text-lg md:text-xl text-ink-fade leading-relaxed space-y-6">
            <p>
              For AI-native operators choosing between <strong>{tool1.name}</strong> and <strong>{tool2.name}</strong>, the decision comes down to API accessibility and how easily your agent can interface with each tool.
            </p>
            {tool1.mcpReady || tool2.mcpReady ? (
              <p>
                {tool1.mcpReady && tool2.mcpReady
                  ? `Both ${tool1.name} and ${tool2.name} support MCP (Model Context Protocol), meaning you can connect either directly to Claude, Cursor, or other AI agents without writing custom integration code.`
                  : tool1.mcpReady
                  ? `${tool1.name} has the edge here with an official MCP server, letting you connect it directly to Claude or Cursor. ${tool2.name} requires a REST API integration, which means your agent needs the API docs to build the connection.`
                  : `${tool2.name} has the edge here with an official MCP server, letting you connect it directly to Claude or Cursor. ${tool1.name} requires a REST API integration, which means your agent needs the API docs to build the connection.`}
              </p>
            ) : (
              <p>
                Neither tool currently offers an official MCP server, so you&apos;ll need to use their REST APIs directly. Provide the API documentation to your AI agent and let it build the integration for you.
              </p>
            )}
            {(tool1.starterPrompt || tool2.starterPrompt) && (
              <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool1.starterPrompt && (
                  <div className="p-4 md:p-6 bg-paper-dark/50 border border-ink/10">
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-fade mb-3">{tool1.name} Starter Prompt</div>
                    <p className="font-mono text-[0.75rem] italic text-ink-fade leading-relaxed">&quot;{tool1.starterPrompt}&quot;</p>
                  </div>
                )}
                {tool2.starterPrompt && (
                  <div className="p-4 md:p-6 bg-paper-dark/50 border border-ink/10">
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-fade mb-3">{tool2.name} Starter Prompt</div>
                    <p className="font-mono text-[0.75rem] italic text-ink-fade leading-relaxed">&quot;{tool2.starterPrompt}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <FaqSection 
        items={[
          {
            question: `Which has a better API for AI agents — ${tool1.name} or ${tool2.name}?`,
            answer: `${tool1.mcpReady ? tool1.name + ' offers an MCP server for direct AI agent integration.' : tool1.name + ' provides a ' + (tool1.apiType || []).join('/') + ' API.'} ${tool2.mcpReady ? tool2.name + ' also offers an MCP server.' : tool2.name + ' provides a ' + (tool2.apiType || []).join('/') + ' API.'} Check the comparison table above for a full breakdown of SDKs, webhooks, and capabilities.`
          },
          {
            question: `Can I connect ${tool1.name} or ${tool2.name} to Claude or Cursor?`,
            answer: `${tool1.mcpReady && tool2.mcpReady ? 'Yes, both tools have MCP servers that work with Claude, Cursor, and other AI coding agents.' : tool1.mcpReady ? `${tool1.name} has an official MCP server for direct connection. For ${tool2.name}, you can use the REST API docs with your AI agent.` : tool2.mcpReady ? `${tool2.name} has an official MCP server for direct connection. For ${tool1.name}, you can use the REST API docs with your AI agent.` : `Neither has an official MCP server yet, but both have REST APIs. Paste the API docs into your agent and ask it to build the integration.`}`
          },
          {
            question: `${tool1.name} vs ${tool2.name} — which is better for sales automation?`,
            answer: `It depends on your stack. ${tool1.name} is "${tool1.oneLiner}" while ${tool2.name} is "${tool2.oneLiner}". Compare their API capabilities, MCP support, and pricing above to find the right fit for your workflow.`
          },
        ]} 
        title={`${tool1.name} vs ${tool2.name} FAQ`} 
      />

      {/* Footer Call to Action */}
      <section className="py-32 text-center">
        <div className="layout-container">
          <h2 className="font-serif italic text-3xl mb-12">Ready to pick your tool?</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            <Link href={`/apis/${tool1.slug}`} className="font-mono font-bold uppercase underline hover:line-through">View {tool1.name}</Link>
            <Link href={`/apis/${tool2.slug}`} className="font-mono font-bold uppercase underline hover:line-through">View {tool2.name}</Link>
            <Link href="/api" className="circled font-mono font-bold uppercase px-8 py-3">Browse All Tools</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
