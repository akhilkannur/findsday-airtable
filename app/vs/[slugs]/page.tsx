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
    <div className="flex flex-col bg-sage-bg/30">
      {/* Header */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black relative overflow-hidden bg-white/40">
        <div className="absolute top-0 right-0 w-64 h-full border-l border-dashed border-ink-black/5 pointer-events-none hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="type-label mb-12 flex items-center gap-4 text-accent-orange font-black">
            <span>Comparison Node</span>
            <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
            <span>Technical Scorecard</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 md:gap-24">
            {/* Tool 1 */}
            <div className="space-y-8">
              <div className="flex h-20 w-20 items-center justify-center border border-ink-black bg-white shadow-[6px_6px_0px_rgba(18,18,18,0.1)] text-4xl font-black">
                {tool1.name.charAt(0)}
              </div>
              <h1 className="type-display text-4xl md:text-6xl">{tool1.name}</h1>
              <p className="text-xl font-medium opacity-60 leading-relaxed">{tool1.oneLiner}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-px bg-ink-black/10 hidden lg:block"></div>
              <div className="my-8 px-6 py-3 border-2 border-ink-black bg-[#1A1C16] text-white font-black italic tracking-tighter text-3xl shadow-[6px_6px_0px_#B5C0FF]">
                VS
              </div>
              <div className="h-20 w-px bg-ink-black/10 hidden lg:block"></div>
            </div>

            {/* Tool 2 */}
            <div className="space-y-8 lg:text-right flex flex-col lg:items-end">
              <div className="flex h-20 w-20 items-center justify-center border border-ink-black bg-white shadow-[6px_6px_0px_rgba(18,18,18,0.1)] text-4xl font-black">
                {tool2.name.charAt(0)}
              </div>
              <h1 className="type-display text-4xl md:text-6xl">{tool2.name}</h1>
              <p className="text-xl font-medium opacity-60 leading-relaxed">{tool2.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tight italic border-b-2 border-ink-black inline-block pb-2">Technical Specs Comparison</h2>
          </div>

          <div className="grid grid-cols-1 border border-ink-black divide-y divide-ink-black bg-white shadow-[12px_12px_0px_rgba(18,18,18,0.05)]">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#1A1C16] text-white text-[0.65rem] font-black uppercase tracking-widest p-6">
              <div className="opacity-40">Attribute</div>
              <div>{tool1.name}</div>
              <div>{tool2.name}</div>
            </div>
            
            {specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1fr_1fr_1fr] p-6 hover:bg-accent-blue/5 transition-colors group">
                <div className="text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-40 group-hover:text-accent-orange transition-colors">{spec.label}</div>
                <div className="text-sm font-bold uppercase">{spec.val1}</div>
                <div className="text-sm font-bold uppercase">{spec.val2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Readiness Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 bg-[#1A1C16] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#B5C0FF 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {/* Tool 1 AI */}
          <div className="p-12 space-y-10 bg-[#1A1C16]">
            <div className="type-label text-accent-blue font-black">{tool1.name} — AI Readiness</div>
            <div className="space-y-6">
              {tool1.aiCapabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-4 group">
                  <div className="h-2 w-2 bg-accent-blue rounded-full"></div>
                  <span className="text-sm font-bold uppercase opacity-80 group-hover:opacity-100">{cap}</span>
                </div>
              ))}
            </div>
            {tool1.mcpReady && (
              <div className="p-6 border border-accent-blue/20 bg-accent-blue/5">
                <div className="text-[0.6rem] font-black uppercase tracking-widest text-accent-blue mb-4">Native MCP Found</div>
                <code className="text-[10px] opacity-60">Available for Claude Code & Cursor</code>
              </div>
            )}
            <Link href={`/tools/${tool1.slug}`} className="swiss-btn bg-white text-ink-black inline-flex w-full justify-center">
              Explore {tool1.name} Node ->
            </Link>
          </div>

          {/* Tool 2 AI */}
          <div className="p-12 space-y-10 bg-[#1A1C16]">
            <div className="type-label text-accent-orange font-black">{tool2.name} — AI Readiness</div>
            <div className="space-y-6">
              {tool2.aiCapabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-4 group">
                  <div className="h-2 w-2 bg-accent-orange rounded-full"></div>
                  <span className="text-sm font-bold uppercase opacity-80 group-hover:opacity-100">{cap}</span>
                </div>
              ))}
            </div>
            {tool2.mcpReady && (
              <div className="p-6 border border-accent-orange/20 bg-accent-orange/5">
                <div className="text-[0.6rem] font-black uppercase tracking-widest text-accent-orange mb-4">Native MCP Found</div>
                <code className="text-[10px] opacity-60">Available for Claude Code & Cursor</code>
              </div>
            )}
            <Link href={`/tools/${tool2.slug}`} className="swiss-btn bg-white text-ink-black inline-flex w-full justify-center">
              Explore {tool2.name} Node ->
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-t border-ink-black text-center">
        <h2 className="type-display mb-12">Which Node will you boot?</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/tools" className="swiss-btn px-12 py-6">Back to Registry</Link>
          <Link href="/submit" className="swiss-btn swiss-btn-primary px-12 py-6">Add New Module</Link>
        </div>
      </section>
    </div>
  )
}
