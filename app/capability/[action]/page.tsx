import { getToolsByCapability, getAllCapabilities, getAllCategories, CANONICAL_CAPABILITIES, getTopCapabilities } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { ProgrammaticFilterBar } from "@/components/ProgrammaticFilterBar"
import { ToolLogo } from "@/components/ToolLogo"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { generateSeoTitle, generateSeoDescription, formatAcronyms } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const capabilities = getAllCapabilities()
  return capabilities.map((cap) => ({
    action: cap.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ action: string }> }): Promise<Metadata> {
  const { action } = await params
  
  // Check if it's a canonical capability
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

  return {
    title: generateSeoTitle(actionDisplay, "capability"),
    description: generateSeoDescription(actionDisplay, "capability", tools.length),
    alternates: {
      canonical: `https://salestools.club/capability/${action}`,
    },
  }
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

  // Consolidation Map: Capability Slug -> Category Slug
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

  // Strict check for canonical capabilities
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
  const topFeatures = getTopCapabilities(tools, 8)

  const faqItems = [
    {
      question: `What are the core ${actionDisplay} AI features to look for?`,
      answer: `When evaluating ${actionDisplay} tools for AI automation, look for ${topFeatures.slice(0, 3).join(', ')}. These features ensure your AI agents can perform ${actionDisplay.toLowerCase()} tasks with high precision and minimal manual intervention.`
    },
    {
      question: `How do I automate ${actionDisplay} with Claude or Gemini?`,
      answer: `You can connect these tools to your AI agent using their APIs or MCP servers. Simply provide the agent with the "Starter Prompt" shown above, and it will use the tool's capabilities to perform the ${actionDisplay.toLowerCase()} task for you.`
    },
    {
      question: `Are these ${actionDisplay} tools compatible with my CRM?`,
      answer: "Most tools listed here integrate natively with major CRMs like HubSpot, Salesforce, and Pipedrive. You can also use automation platforms like Zapier or Make to sync data between these tools and your existing sales stack."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "Capabilities", url: "https://salestools.club/api" },
        { name: actionDisplay, url: `https://salestools.club/capability/${action}` },
      ]} />

      <nav className="layout-container py-4 md:py-6 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.7rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline transition-all">Home</Link>
        <span className="opacity-30">/</span>
        <span className="opacity-30 uppercase">Capabilities</span>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">{actionDisplay}</span>
      </nav>

      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <p className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 md:mb-4">Commercial Intent Analysis</p>
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">Top {actionDisplay} AI Features</h1>
          <p className="max-w-2xl font-serif italic text-xl md:text-2xl text-ink leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Compare verified {actionDisplay.toLowerCase()} APIs and MCP configurations. Build your agentic sales stack by connecting these high-intent tools directly to your AI operator.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-20">
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">Feature Comparison Matrix</div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>
            
            <div className="prose prose-ink max-w-none font-serif text-lg md:text-xl text-ink-fade leading-relaxed space-y-8">
              <p>
                For founders and sales operators building with AI, <strong>{actionDisplay}</strong> has moved beyond manual dashboards. The goal now is "Chat-to-Action"—where your AI agent doesn't just find data, but actually performs the work for you. To build a stack that actually works, you need tools that prioritize AI-ready data over pretty charts.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                {topFeatures.map((feat) => (
                  <div key={feat} className="p-4 bg-paper border border-ink/10 font-mono text-[0.7rem] md:text-[0.75rem] uppercase flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    {feat}
                  </div>
                ))}
              </div>

              <p>
                The secret to <strong>{actionDisplay.toLowerCase()}</strong> automation is how fast your agent (like Claude or Gemini) can "read" the tool. We prioritize tools with verified MCP servers and clean APIs because they allow your AI to work 10x faster, skipping the messy CSV exports and manual data cleaning.
              </p>
            </div>
          </div>

          <div className="p-8 bg-paper border border-ink space-y-8">
            <h3 className="font-mono text-[0.8rem] uppercase font-bold tracking-widest">Technical Status</h3>
            <div className="space-y-6">
              <div className="group">
                <div className="font-mono text-[0.65rem] uppercase text-ink-fade italic mb-1">Tools Verified</div>
                <div className="font-mono font-bold text-xl">{tools.length}</div>
              </div>
              <div className="group">
                <div className="font-mono text-[0.65rem] uppercase text-ink-fade italic mb-1">MCP Support</div>
                <div className="font-mono font-bold text-xl">{tools.filter(t => t.mcpReady).length} Official</div>
              </div>
              <div className="group">
                <div className="font-mono text-[0.65rem] uppercase text-ink-fade italic mb-1">Primary Format</div>
                <div className="font-mono font-bold text-xl">JSON / REST API</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <h2 className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">Verified {actionDisplay} Tools</h2>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <ProgrammaticFilterBar 
            categories={categories.map(c => ({ slug: c.slug, name: c.name }))} 
            baseUrl={`/capability/${action}`}
          />

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tools.map((t) => (
                <div key={t.slug} className="tool-card flex flex-col h-full bg-paper">
                  <Link href={t.isOpenSource ? `/open-source-sales-tools/${t.slug}` : `/apis/${t.slug}`} className="group block mb-4 md:mb-6">
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <ToolLogo name={t.name} websiteUrl={t.websiteUrl} />
                      {t.mcpReady && (
                        <div className="tag-mcp">MCP READY</div>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:underline">{t.name}</h3>
                    <p className="text-[0.9rem] md:text-[1rem] text-ink-fade leading-relaxed line-clamp-2">
                      {t.oneLiner}
                    </p>
                  </Link>

                  {t.starterPrompt && (
                    <div className="mb-4 md:mb-6 p-3 md:p-4 bg-paper-dark/50 border border-ink/5 rounded font-mono text-[0.7rem] md:text-[0.75rem] italic text-ink-fade">
                      "{t.starterPrompt}"
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 items-center pt-4 border-t border-ink/5">
                    <span className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                    <Link href={t.isOpenSource ? `/open-source-sales-tools/${t.slug}` : `/apis/${t.slug}`} className="ml-auto font-mono text-[0.65rem] md:text-[0.7rem] uppercase underline hover:no-underline transition-all">View API Docs</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center border-2 border-dashed border-ink/10">
              <p className="font-serif italic text-lg md:text-xl text-ink-fade">No tools found in this category for {actionDisplay.toLowerCase()}.</p>
              <Link href={`/capability/${action}`} className="mt-4 inline-block font-mono text-[0.7rem] uppercase underline">Clear Category Filter</Link>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={faqItems} title={`${actionDisplay} Technical FAQ`} />
    </div>
  )
}
