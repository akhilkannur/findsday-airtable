import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolsForComparison, getAllSlugs } from "@/lib/tools"
import { Zap, Check, X, ArrowRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

interface Props {
  params: Promise<{ slugs: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params
  const { tool1, tool2 } = await getToolsForComparison(slugs)

  if (!tool1 || !tool2) {
    return { title: "Comparison Not Found" }
  }

  const pageTitle = `${tool1.name} API vs ${tool2.name} API — Which is better for AI Agents?`
  const pageDescription = `Compare ${tool1.name} and ${tool2.name} for AI-native sales. Find the best API, MCP server, and SDK for your GTM stack.`
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

  if (!tool1 || !tool2) {
    notFound()
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
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30 relative overflow-hidden">
        <div className="layout-container">
          <div className="font-mono text-[0.75rem] uppercase tracking-[0.2em] mb-16 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black italic">Compare</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-status-blink"></div>
            <span>Side-by-Side Comparison</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 md:gap-24">
            {/* Tool 1 */}
            <div className="flex flex-col items-start gap-8">
              <div className="w-20 h-20 flex items-center justify-center bg-ink text-paper [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)] text-4xl font-bold">
                {tool1.name.charAt(0)}
              </div>
              <h1 className="type-display uppercase">{tool1.name}</h1>
              <p className="font-serif italic text-xl text-ink-fade max-w-sm border-l-2 border-black pl-4">{tool1.oneLiner}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-px bg-black opacity-10 hidden lg:block"></div>
              <div className="my-8 px-10 py-6 border-2 border-black bg-paper text-black font-black italic tracking-tighter text-4xl shadow-[6px_6px_0px_rgba(0,0,0,0.1)] rotate-[-2deg] hover:rotate-0 transition-transform">
                VS
              </div>
              <div className="h-20 w-px bg-black opacity-10 hidden lg:block"></div>
            </div>

            {/* Tool 2 */}
            <div className="flex flex-col items-start lg:items-end gap-8 lg:text-right">
              <div className="w-20 h-20 flex items-center justify-center bg-ink text-paper [clip-path:polygon(5%_5%,95%_0%,100%_95%,0%_100%)] text-4xl font-bold">
                {tool2.name.charAt(0)}
              </div>
              <h1 className="type-display uppercase">{tool2.name}</h1>
              <p className="font-serif italic text-xl text-ink-fade max-w-sm lg:border-r-2 border-black lg:pr-4">{tool2.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-12">
        <div className="layout-container">
          <div className="border border-ink/20 bg-white/40 overflow-hidden">
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
      </section>

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
