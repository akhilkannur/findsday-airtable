import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolsForComparison, getAllSlugs } from "@/lib/tools"
import { Zap, Check, X, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ slugs: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params
  const { tool1, tool2 } = getToolsForComparison(slugs)

  if (!tool1 || !tool2) {
    return { title: "Comparison Not Found" }
  }

  return {
    title: `${tool1.name} API vs ${tool2.name} API — Which is better for AI Agents?`,
    description: `Compare ${tool1.name} and ${tool2.name} for AI-native sales. Find the best API, MCP server, and SDK for your GTM stack.`,
    alternates: {
      canonical: `https://salestools.club/vs/${slugs}`,
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slugs } = await params
  const { tool1, tool2 } = getToolsForComparison(slugs)

  if (!tool1 || !tool2) {
    notFound()
  }

  const specs = [
    { label: "API Type", val1: tool1.apiType.join(", "), val2: tool2.apiType.join(", ") },
    { label: "MCP Ready", val1: tool1.mcpReady ? "YES" : "NO", val2: tool2.mcpReady ? "YES" : "NO" },
    { label: "Free Tier", val1: tool1.hasFreeTier ? "YES" : "NO", val2: tool2.hasFreeTier ? "YES" : "NO" },
    { label: "AI Difficulty", val1: tool1.aiDifficulty, val2: tool2.aiDifficulty },
    { label: "SDKs", val1: tool1.sdkLanguages.join(", ") || "None", val2: tool2.sdkLanguages.join(", ") || "None" },
    { label: "Webhooks", val1: tool1.hasWebhooks ? "YES" : "NO", val2: tool2.hasWebhooks ? "YES" : "NO" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      {/* Header */}
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30 relative overflow-hidden">
        <div className="layout-container">
          <div className="font-mono text-[0.75rem] uppercase tracking-[0.2em] mb-16 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black italic">Audit_Node</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-status-blink"></div>
            <span>Technical Scorecard</span>
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
      <section className="py-24">
        <div className="layout-container">
          <div className="mb-20">
            <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-ink-fade border-b border-black/10 pb-4 inline-block italic">Spec Comparison Matrix</h2>
          </div>

          <div className="border border-ink/20 bg-white/40 overflow-hidden">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-paper-dark/50 border-b border-ink/20 text-[0.7rem] font-mono font-bold uppercase tracking-widest p-10 text-ink-fade">
              <div>Attribute</div>
              <div className="text-black">{tool1.name}</div>
              <div className="text-black">{tool2.name}</div>
            </div>
            
            {specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1.5fr_1fr_1fr] p-10 border-b border-ink/10 hover:bg-[var(--highlight)] transition-colors group">
                <div className="font-mono text-[0.7rem] uppercase tracking-widest opacity-40 group-hover:opacity-100 italic">{spec.label}</div>
                <div className="font-serif text-[1.2rem] font-bold uppercase">{spec.val1}</div>
                <div className="font-serif text-[1.2rem] font-bold uppercase">{spec.val2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Readiness Section */}
      <section className="py-24 bg-paper-dark/20 border-y border-ink/10">
        <div className="layout-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tool 1 AI */}
            <div className="p-16 space-y-12 bg-white/40 border border-transparent hover:border-black/10 transition-all">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade">AI_CAPABILITIES: {tool1.name}</div>
              <div className="space-y-6">
                {tool1.aiCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 bg-black rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-serif italic text-xl text-ink-fade group-hover:text-black transition-colors">{cap}</span>
                  </div>
                ))}
              </div>
              <Link href={`/tools/${tool1.slug}`} className="font-mono font-bold uppercase text-[0.8rem] underline hover:line-through transition-all inline-block">
                BOOT NODE ->
              </Link>
            </div>

            {/* Tool 2 AI */}
            <div className="p-16 space-y-12 bg-white/40 border border-transparent hover:border-black/10 transition-all">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade">AI_CAPABILITIES: {tool2.name}</div>
              <div className="space-y-6">
                {tool2.aiCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 bg-black rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-serif italic text-xl text-ink-fade group-hover:text-black transition-colors">{cap}</span>
                  </div>
                ))}
              </div>
              <Link href={`/tools/${tool2.slug}`} className="font-mono font-bold uppercase text-[0.8rem] underline hover:line-through transition-all inline-block">
                BOOT NODE ->
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-32 text-center">
        <div className="layout-container">
          <h2 className="font-serif italic text-3xl mb-12">Select your primary infrastructure node.</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            <Link href="/tools" className="font-mono font-bold uppercase underline hover:line-through">Back to Registry</Link>
            <Link href="/submit" className="circled font-mono font-bold uppercase px-8 py-3">Add New Module</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
