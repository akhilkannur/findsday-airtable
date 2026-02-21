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
    <div className="flex flex-col bg-sage-bg/30 min-h-screen">
      {/* Hero */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="type-label mb-6 text-accent-orange font-black flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Comparison Registry
          </div>
          <h1 className="type-display mb-8">Head-to-Head Technical Audits.</h1>
          <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed">
            We compare sales modules based on their <strong>programmability</strong>, <strong>AI-readiness</strong>, and <strong>MCP support</strong>. Choose the right node for your agentic stack.
          </p>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="px-6 py-20 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPairs.map((pair) => {
              const t1 = tools.find(t => t.slug === pair.s1)
              const t2 = tools.find(t => t.slug === pair.s2)
              if (!t1 || !t2) return null

              return (
                <Link 
                  key={`${pair.s1}-vs-${pair.s2}`}
                  href={`/vs/${pair.s1}-vs-${pair.s2}`}
                  className="group swiss-card bg-white border-ink-black hover:bg-accent-blue/5 transition-all flex flex-col h-full"
                >
                  <div className="type-label text-[0.6rem] mb-8 opacity-40 group-hover:text-accent-orange transition-colors">{pair.label}</div>
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="h-10 w-10 flex items-center justify-center border border-ink-black font-black bg-white">{t1.name.charAt(0)}</div>
                    <div className="text-xs font-black italic opacity-20">VS</div>
                    <div className="h-10 w-10 flex items-center justify-center border border-ink-black font-black bg-white">{t2.name.charAt(0)}</div>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight leading-tight">
                    {t1.name} <br/><span className="text-accent-blue italic">vs</span><br/> {t2.name}
                  </h3>
                  <div className="mt-auto pt-8 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all">
                    <span className="text-[0.6rem] font-black uppercase tracking-widest">Run Audit</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Directory of all comparisons - Simple Links for SEO crawling */}
      <section className="px-6 py-24 md:px-12 bg-[#1A1C16] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight italic border-b border-white/10 pb-4">All Comparisons</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">
            {/* Generate a selection of other pairings */}
            {tools.filter(t => t.alternativeTo && t.alternativeTo.length > 0).slice(0, 40).map(t => {
                const alt = t.alternativeTo![0]
                const altTool = tools.find(at => at.name.toLowerCase() === alt.toLowerCase())
                if (!altTool) return null
                return (
                  <Link 
                    key={`${t.slug}-vs-${altTool.slug}`}
                    href={`/vs/${t.slug}-vs-${altTool.slug}`}
                    className="text-[0.65rem] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent-blue transition-all"
                  >
                    {t.name} vs {altTool.name}
                  </Link>
                )
            })}
          </div>
          <div className="mt-20 p-12 border border-dashed border-white/10 text-center">
            <p className="type-label opacity-40">More comparisons added daily as nodes are indexed.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
