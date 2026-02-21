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
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">
            <Scale className="h-4 w-4" />
            Comparison Registry
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black uppercase">Head-to-Head Technical Audits.</h1>
          <p className="max-w-2xl text-xl font-medium text-black/70 leading-relaxed">
            We compare sales modules based on their <strong>programmability</strong>, <strong>AI-readiness</strong>, and <strong>MCP support</strong>. Choose the right node for your agentic stack.
          </p>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredPairs.map((pair) => {
              const t1 = tools.find(t => t.slug === pair.s1)
              const t2 = tools.find(t => t.slug === pair.s2)
              if (!t1 || !t2) return null

              return (
                <Link 
                  key={`${pair.s1}-vs-${pair.s2}`}
                  href={`/vs/${pair.s1}-vs-${pair.s2}`}
                  className="brick group p-10 bg-white hover:scale-105 transition-all flex flex-col h-full gap-8"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">{pair.label}</div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-black font-black bg-[var(--lego-offwhite)] group-hover:bg-[var(--lego-blue)] group-hover:text-white transition-all rounded-xl text-2xl">{t1.name.charAt(0)}</div>
                    <div className="text-[10px] font-bold italic text-black/20 group-hover:text-black transition-colors uppercase">VS</div>
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-black font-black bg-[var(--lego-offwhite)] group-hover:bg-[var(--lego-red)] group-hover:text-white transition-all rounded-xl text-2xl">{t2.name.charAt(0)}</div>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-black leading-tight">
                    {t1.name} <span className="text-black/20 italic">vs</span> {t2.name}
                  </h3>
                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-black/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black">Run Audit</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Directory of all comparisons */}
      <section className="py-24 bg-[var(--lego-offwhite)] border-t-[var(--border-width)] border-black">
        <div className="layout-container">
          <div className="mb-16">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 border-b-2 border-black/5 pb-4 inline-block">Full Audit Index</h2>
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
                    className="text-[11px] font-bold uppercase tracking-widest text-black/60 hover:text-[var(--lego-blue)] transition-all hover:underline"
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
