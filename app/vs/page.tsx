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
    <div className="flex flex-col min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="px-8 py-24 border-b border-[var(--ink)] bg-[var(--paper-dark)]/30">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
            <Scale className="h-4 w-4" />
            Comparison Registry
          </div>
          <h1 className="type-display mb-8 uppercase">Technical Audits.</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-[var(--ink-fade)] leading-relaxed border-l-2 border-[var(--ink)] pl-6">
            We compare sales modules based on their <strong>programmability</strong>, <strong>AI-readiness</strong>, and <strong>MCP support</strong>. Choose the right node for your agentic stack.
          </p>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredPairs.map((pair) => {
              const t1 = tools.find(t => t.slug === pair.s1)
              const t2 = tools.find(t => t.slug === pair.s2)
              if (!t1 || !t2) return null

              return (
                <Link 
                  key={`${pair.s1}-vs-${pair.s2}`}
                  href={`/vs/${pair.s1}-vs-${pair.s2}`}
                  className="group flex flex-col h-full gap-8 p-8 border border-transparent hover:border-black/10 transition-all bg-white/40"
                >
                  <div className="font-mono text-[0.7rem] uppercase text-[var(--ink-fade)] group-hover:text-black transition-colors italic">{pair.label}</div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)] text-xl font-bold">{t1.name.charAt(0)}</div>
                    <div className="font-mono text-[0.7rem] font-bold text-black/20 group-hover:text-black transition-colors">VS</div>
                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] [clip-path:polygon(5%_5%,95%_0%,100%_95%,0%_100%)] text-xl font-bold">{t2.name.charAt(0)}</div>
                  </div>
                  <h3 className="text-xl font-bold uppercase leading-tight group-hover:underline decoration-black decoration-2 underline-offset-8 transition-all">
                    {t1.name} <br/><span className="opacity-20 italic">vs</span><br/> {t2.name}
                  </h3>
                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-black/10">
                    <span className="font-mono text-[0.7rem] uppercase tracking-widest">Run Audit</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Directory of all comparisons */}
      <section className="py-24 bg-[var(--paper-dark)]/50 border-t border-[var(--ink)]">
        <div className="layout-container">
          <div className="mb-16">
            <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] border-b border-black/10 pb-4 inline-block italic">Full Cross-Reference Index</h2>
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
                    className="font-serif text-[1.1rem] text-[var(--ink-fade)] hover:text-black transition-all italic hover:underline"
                  >
                    {t.name} vs {altTool.name}
                  </Link>
                )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
