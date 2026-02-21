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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-4 text-black">
            <span className="bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">Audit_Node</span>
            <div className="w-2 h-2 bg-[var(--lego-green)] rounded-full animate-status-pulse"></div>
            <span className="text-black/40">Technical Scorecard</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 md:gap-24">
            {/* Tool 1 */}
            <div className="flex flex-col items-start gap-8">
              <div className="w-20 h-20 flex items-center justify-center border-[var(--border-width)] border-black bg-white rounded-[var(--radius-md)] text-4xl font-bold text-black shadow-[6px_6px_0_black]">
                {tool1.name.charAt(0)}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-black uppercase">{tool1.name}</h1>
              <p className="text-xl font-medium text-black/60 leading-relaxed max-w-sm">{tool1.oneLiner}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-1 bg-black/10 hidden lg:block"></div>
              <div className="my-8 px-10 py-6 border-[var(--border-width)] border-black bg-[var(--lego-red)] text-white font-black italic tracking-tighter text-4xl shadow-[8px_8px_0px_black] rotate-3 hover:rotate-0 transition-transform">
                VS
              </div>
              <div className="h-20 w-1 bg-black/10 hidden lg:block"></div>
            </div>

            {/* Tool 2 */}
            <div className="flex flex-col items-start lg:items-end gap-8 lg:text-right">
              <div className="w-20 h-20 flex items-center justify-center border-[var(--border-width)] border-black bg-white rounded-[var(--radius-md)] text-4xl font-bold text-black shadow-[6px_6px_0_black]">
                {tool2.name.charAt(0)}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-black uppercase">{tool2.name}</h1>
              <p className="text-xl font-medium text-black/60 leading-relaxed max-w-sm">{tool2.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-24">
        <div className="layout-container">
          <div className="mb-20">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 border-b-2 border-black/5 pb-4 inline-block">Spec Comparison Matrix</h2>
          </div>

          <div className="brick bg-white overflow-hidden">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-[var(--lego-offwhite)] border-b-[var(--border-width)] border-black text-[10px] font-bold uppercase tracking-widest p-10 text-black/40">
              <div>Attribute</div>
              <div className="text-black">{tool1.name}</div>
              <div className="text-black">{tool2.name}</div>
            </div>
            
            {specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1.5fr_1fr_1fr] p-10 border-b-[var(--border-width)] border-black/5 hover:bg-[var(--lego-yellow)] transition-colors group">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{spec.label}</div>
                <div className="text-[14px] font-bold uppercase text-black">{spec.val1}</div>
                <div className="text-[14px] font-bold uppercase text-black">{spec.val2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Readiness Section */}
      <section className="py-24 bg-[var(--lego-offwhite)] border-y-[var(--border-width)] border-black">
        <div className="layout-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tool 1 AI */}
            <div className="brick p-16 space-y-12 bg-white">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lego-blue)]">AI_CAPABILITIES: {tool1.name}</div>
              <div className="space-y-6">
                {tool1.aiCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-4 group">
                    <div className="w-2.5 h-2.5 bg-[var(--lego-blue)] border-2 border-black rounded-full"></div>
                    <span className="text-[14px] font-bold uppercase text-black/70 group-hover:text-black transition-colors">{cap}</span>
                  </div>
                ))}
              </div>
              <Link href={`/tools/${tool1.slug}`} className="brick brick-btn bg-[var(--lego-blue)] text-white hover:scale-105 transition-all w-full text-center">
                BOOT NODE ->
              </Link>
            </div>

            {/* Tool 2 AI */}
            <div className="brick p-16 space-y-12 bg-white">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lego-red)]">AI_CAPABILITIES: {tool2.name}</div>
              <div className="space-y-6">
                {tool2.aiCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-4 group">
                    <div className="w-2.5 h-2.5 bg-[var(--lego-red)] border-2 border-black rounded-full"></div>
                    <span className="text-[14px] font-bold uppercase text-black/70 group-hover:text-black transition-colors">{cap}</span>
                  </div>
                ))}
              </div>
              <Link href={`/tools/${tool2.slug}`} className="brick brick-btn bg-[var(--lego-red)] text-white hover:scale-105 transition-all w-full text-center">
                BOOT NODE ->
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-32 text-center">
        <div className="layout-container">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-black mb-12 italic">System selection required.</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link href="/tools" className="brick brick-btn bg-white text-black min-w-[240px]">Back to Registry</Link>
            <Link href="/submit" className="brick brick-btn bg-black text-white min-w-[240px]">Add New Module</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
