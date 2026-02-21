import Link from "next/link"
import { getAllTools } from "@/lib/tools"
import { ArrowRight, Zap, Scale, Cpu } from "lucide-react"

export const metadata = {
  title: "API Comparisons | Salestools Club",
  description: "Technical head-to-head comparisons of the best sales APIs, SDKs, and MCP servers for AI agents.",
  alternates: {
    canonical: "https://salestools.club/vs",
  },
}

export default function VsIndexPage() {
  const tools = getAllTools()
  
  // High-value featured pairs for SEO
  const featuredPairs = [
    { s1: "apollo", s2: "clay", label: "Best for Enrichment" },
    { s1: "apollo", s2: "zoominfo", label: "Massive Data Head-to-Head" },
    { s1: "hubspot", s2: "salesforce", label: "The CRM Giants" },
    { s1: "instantly", s2: "smartlead", label: "Cold Email Infrastructure" },
    { s1: "firecrawl", s2: "jina-reader", label: "AI Scraping Protocols" },
    { s1: "bland-ai", s2: "vapi", label: "Voice AI Nodes" },
    { s1: "cal-com", s2: "calendly", label: "Scheduling APIs" },
    { s1: "perplexity", s2: "tavily", label: "AI Search Endpoints" },
  ]

  return (
    <div className="flex flex-col bg-black min-h-screen">
      {/* Hero */}
      <section className="px-10 md:px-20 py-24 border-b border-[#333333] bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888] mb-6 flex items-center gap-3">
            <Scale className="h-4 w-4" />
            Comparison Registry
          </div>
          <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">Technical Audits.</h1>
          <p className="max-w-2xl text-[18px] text-[#888] leading-relaxed">
            We compare sales modules based on their <strong>programmability</strong>, <strong>AI-readiness</strong>, and <strong>MCP support</strong>. Choose the right node for your agentic stack.
          </p>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="px-10 md:px-20 py-24 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#333333] gap-px border border-[#333333]">
          {featuredPairs.map((pair) => {
            const t1 = tools.find(t => t.slug === pair.s1)
            const t2 = tools.find(t => t.slug === pair.s2)
            if (!t1 || !t2) return null

            return (
              <Link 
                key={`${pair.s1}-vs-${pair.s2}`}
                href={`/vs/${pair.s1}-vs-${pair.s2}`}
                className="group bg-black p-12 transition-all hover:bg-[#0a0a0a] flex flex-col h-full gap-8"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] group-hover:text-white transition-colors">{pair.label}</div>
                <div className="flex items-center justify-between gap-4">
                  <div className="h-12 w-12 flex items-center justify-center border border-[#333333] font-bold bg-black text-white group-hover:border-white transition-colors">{t1.name.charAt(0)}</div>
                  <div className="text-[10px] font-bold italic text-[#444]">VS</div>
                  <div className="h-12 w-12 flex items-center justify-center border border-[#333333] font-bold bg-black text-white group-hover:border-white transition-colors">{t2.name.charAt(0)}</div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white leading-tight">
                  {t1.name} <span className="text-[#444] italic">vs</span> {t2.name}
                </h3>
                <div className="mt-auto pt-10 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all border-t border-dashed border-[#333333]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Run Audit</span>
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Directory of all comparisons */}
      <section className="px-10 md:px-20 py-24 bg-[#050505] border-t border-[#333333]">
        <div className="mb-16">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444] border-b border-[#333333] pb-4">Full Audit Index</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">
          {tools.filter(t => t.alternativeTo && t.alternativeTo.length > 0).slice(0, 40).map(t => {
              const alt = t.alternativeTo![0]
              const altTool = tools.find(at => at.name.toLowerCase() === alt.toLowerCase())
              if (!altTool) return null
              return (
                <Link 
                  key={`${t.slug}-vs-${altTool.slug}`}
                  href={`/vs/${t.slug}-vs-${altTool.slug}`}
                  className="text-[11px] font-bold uppercase tracking-widest text-[#444] hover:text-white transition-all"
                >
                  {t.name} / {altTool.name}
                </Link>
              )
          })}
        </div>
      </section>
    </div>
  )
}
