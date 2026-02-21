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
    <div className="flex flex-col bg-black min-h-screen">
      {/* Header */}
      <section className="px-10 md:px-20 py-24 border-b border-[#333333] relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-4 text-white">
            <span>Audit_Node</span>
            <div className="w-1 h-1 bg-white rounded-full animate-status-pulse"></div>
            <span className="text-[#444]">Technical Scorecard</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 md:gap-24">
            {/* Tool 1 */}
            <div className="space-y-8">
              <div className="w-20 h-20 flex items-center justify-center border border-[#333333] bg-black text-4xl font-bold text-white">
                {tool1.name.charAt(0)}
              </div>
              <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] text-white uppercase">{tool1.name}</h1>
              <p className="text-[18px] text-[#888] leading-relaxed max-w-sm">{tool1.oneLiner}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-px bg-[#333333] hidden lg:block"></div>
              <div className="my-8 px-8 py-4 border border-[#333333] bg-black text-white font-black italic tracking-tighter text-3xl shadow-[8px_8px_0px_#111]">
                VS
              </div>
              <div className="h-20 w-px bg-[#333333] hidden lg:block"></div>
            </div>

            {/* Tool 2 */}
            <div className="space-y-8 lg:text-right flex flex-col lg:items-end">
              <div className="w-20 h-20 flex items-center justify-center border border-[#333333] bg-black text-4xl font-bold text-white">
                {tool2.name.charAt(0)}
              </div>
              <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] text-white uppercase">{tool2.name}</h1>
              <p className="text-[18px] text-[#888] leading-relaxed max-w-sm">{tool2.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="px-10 md:px-20 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444] border-b border-[#333333] pb-4 inline-block">Spec Comparison Matrix</h2>
          </div>

          <div className="grid grid-cols-1 border border-[#333333] bg-[#050505]">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#333333] text-[10px] font-bold uppercase tracking-widest p-8 text-[#444]">
              <div>Attribute</div>
              <div className="text-white">{tool1.name}</div>
              <div className="text-white">{tool2.name}</div>
            </div>
            
            {specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1fr_1fr_1fr] p-8 border-b border-[#333333] hover:bg-white hover:text-black transition-colors group">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{spec.label}</div>
                <div className="text-[13px] font-bold uppercase">{spec.val1}</div>
                <div className="text-[13px] font-bold uppercase">{spec.val2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Readiness Section */}
      <section className="px-10 md:px-20 py-24 bg-black">
        <div className="grid lg:grid-cols-2 bg-[#333333] gap-px border border-[#333333]">
          {/* Tool 1 AI */}
          <div className="p-16 space-y-12 bg-black">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">AI_CAPABILITIES: {tool1.name}</div>
            <div className="space-y-6">
              {tool1.aiCapabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 bg-[#444] group-hover:bg-white rounded-full"></div>
                  <span className="text-[13px] font-bold uppercase text-[#888] group-hover:text-white transition-colors">{cap}</span>
                </div>
              ))}
            </div>
            <Link href={`/tools/${tool1.slug}`} className="inline-flex px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ccc] transition-all w-full justify-center">
              BOOT NODE ->
            </Link>
          </div>

          {/* Tool 2 AI */}
          <div className="p-16 space-y-12 bg-black">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">AI_CAPABILITIES: {tool2.name}</div>
            <div className="space-y-6">
              {tool2.aiCapabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 bg-[#444] group-hover:bg-white rounded-full"></div>
                  <span className="text-[13px] font-bold uppercase text-[#888] group-hover:text-white transition-colors">{cap}</span>
                </div>
              ))}
            </div>
            <Link href={`/tools/${tool2.slug}`} className="inline-flex px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ccc] transition-all w-full justify-center">
              BOOT NODE ->
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="px-10 md:px-20 py-32 border-t border-[#333333] text-center bg-[#050505]">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-12 italic">System selection required.</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/tools" className="px-12 py-5 border border-[#333333] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Back to Registry</Link>
          <Link href="/submit" className="px-12 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ccc] transition-all">Add New Module</Link>
        </div>
      </section>
    </div>
  )
}
