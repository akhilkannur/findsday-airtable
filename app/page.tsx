import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "Every Sales API and MCP server you need to automate your GTM with Claude Code and agentic tools.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-accent-blue" /> : <Cpu className="h-6 w-6 text-accent-blue" />
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="swiss-card group relative bg-white/40 backdrop-blur-sm border-ink-black/10 hover:border-ink-black transition-all h-full flex flex-col"
    >
      <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start">
        <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors font-bold text-xl shadow-[4px_4px_0px_rgba(18,18,18,0.05)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && (
          <span className="swiss-badge border-accent-orange text-accent-orange flex items-center gap-1">
            <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
            MCP
          </span>
        )}
      </div>
      
      <div className="mt-8 text-2xl font-bold tracking-tight uppercase group-hover:text-accent-orange transition-colors">{tool.name}</div>
      <p className="mt-2 text-sm font-bold leading-relaxed">
        {tool.oneLiner}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <span className="swiss-badge bg-white/50">{tool.category}</span>
      </div>

      <div className="mt-auto pt-8 flex items-center justify-between border-t border-dashed border-ink-black/10">
        <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-40">View Tool</div>
        <div className="text-[0.65rem] font-bold uppercase group-hover:translate-x-1 transition-transform">-></div>
      </div>
    </Link>
  )
}

export default function Home() {
  const allFeatured = getFeaturedTools()
  const exploreTools = allFeatured.slice(0, 12) // Now includes all featured tools
  const allTools = getAllTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col max-w-[100vw] overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black bg-sage-bg/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Removed Tool List element */}
            <h1 className="type-display mb-12 max-w-4xl">
              Every Sales API and MCP server you need to automate your GTM with <span className="relative inline-block">
                <span className="relative z-10 font-bold">Claude Code</span>
                <span className="absolute bottom-1 left-0 w-full h-4 bg-accent-blue/30 -z-0"></span>
              </span> and agentic tools.
            </h1>
            <p className="max-w-2xl text-lg font-bold leading-relaxed">
              Stop digging through messy dev docs. We source the Lego blocks that actually plug into your AI workflow so you can focus on building your sales engine.
            </p>

            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
              <input 
                type="email" 
                placeholder="get new tool updates" 
                className="flex-grow bg-white border border-ink-black px-4 py-3 text-sm font-bold focus:outline-none transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_rgba(18,18,18,0.05)]"
                required
              />
              <button type="submit" className="swiss-btn swiss-btn-primary px-8 py-3 text-sm font-bold whitespace-nowrap shadow-[4px_4px_0px_#121212]">
                Subscribe <span>-></span>
              </button>
            </form>
          </div>

          <div className="hidden lg:flex justify-center items-center relative h-[400px]">
            {/* Hand-drawn style SVG Illustration */}
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-[450px] opacity-80" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.05))' }}>
              {/* Central Node (AI Agent) */}
              <circle cx="200" cy="200" r="45" fill="none" stroke="#121212" strokeWidth="2.5" strokeDasharray="6 3" />
              <circle cx="200" cy="200" r="35" fill="none" stroke="#3B82F6" strokeWidth="2" />
              <path d="M190 190 L210 210 M210 190 L190 210" stroke="#121212" strokeWidth="3" strokeLinecap="round" />
              
              {/* Orbiting nodes with hand-drawn style paths */}
              <g className="animate-pulse">
                <circle cx="80" cy="120" r="15" fill="none" stroke="#121212" strokeWidth="2" />
                <path d="M165 175 L95 130" stroke="#121212" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" fill="none" />
                <path d="M75 115 L85 125 M85 115 L75 125" stroke="#F59E0B" strokeWidth="2" />
              </g>

              <g style={{ animation: 'pulse 3s infinite' }}>
                <rect x="300" y="100" width="30" height="30" fill="none" stroke="#121212" strokeWidth="2" transform="rotate(15 315 115)" />
                <path d="M235 175 L300 125" stroke="#121212" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" fill="none" />
              </g>

              <g style={{ animation: 'pulse 4s infinite' }}>
                <path d="M310 280 L330 300 L310 320" fill="none" stroke="#121212" strokeWidth="2" strokeLinejoin="round" />
                <path d="M235 225 L310 290" stroke="#121212" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" fill="none" />
              </g>

              <g style={{ animation: 'pulse 5s infinite' }}>
                <circle cx="100" cy="300" r="20" fill="none" stroke="#121212" strokeWidth="2" />
                <path d="M90 300 L110 300 M100 290 L100 310" stroke="#3B82F6" strokeWidth="2" />
                <path d="M165 225 L115 285" stroke="#121212" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" fill="none" />
              </g>

              {/* Decorative "sketchy" lines */}
              <path d="M50 50 Q 80 40 100 60" fill="none" stroke="#121212" strokeWidth="1" opacity="0.3" />
              <path d="M350 350 Q 320 360 300 340" fill="none" stroke="#121212" strokeWidth="1" opacity="0.3" />
            </svg>
            
            {/* Abstract floating text labels to match aesthetic */}
            <div className="absolute top-1/4 right-0 border border-ink-black/20 bg-white/80 px-2 py-1 text-[0.5rem] font-black uppercase tracking-widest rotate-6">MCP_READY</div>
            <div className="absolute bottom-1/4 left-0 border border-ink-black/20 bg-white/80 px-2 py-1 text-[0.5rem] font-black uppercase tracking-widest -rotate-3 text-accent-blue">SALES_ENGINE</div>
          </div>
        </div>
      </section>

      {/* ── Explore Tools ──────────────── */}
      <section className="px-6 py-20 md:px-12 bg-sage-bg/10 relative border-b border-ink-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="type-label text-ink-black font-black">Directory</div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">Explore Tools</h2>
            </div>
            {/* Link moved to bottom */}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {exploreTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="text-[0.6rem] font-bold uppercase tracking-[0.2em] border-b-2 border-accent-blue pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors">
              View All Tools ->
            </Link>
          </div>
        </div>
      </section>
      {/* ── Infinite Crawl ───────────────────────────────── */}
      <section className="border-b border-ink-black bg-[#1A1C16] py-8 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex gap-12 px-4 items-center">
            {[...allTools, ...allTools].map((tool, idx) => (
              <Link 
                key={`${tool.slug}-${idx}`}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 group opacity-40 hover:opacity-100 transition-opacity"
              >
                <div className="h-5 w-5 flex items-center justify-center border border-white/20 bg-white/5 font-bold text-[7px] text-white">
                  {tool.name.charAt(0)}
                </div>
                <span className="text-[9px] font-black uppercase text-white tracking-widest">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Access ───────────────────────────────── */}
      <section className="px-6 py-20 md:px-12 bg-white border-y border-ink-black/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="type-label text-accent-orange font-black mb-4">Agent Integration</div>
            <h2 className="text-2xl font-black tracking-tight uppercase mb-6">Plug into your terminal</h2>
            <p className="text-sm font-bold opacity-60 leading-relaxed">
              Enable your AI agents to search this registry directly. One command installs the Salestools Club protocol into Gemini CLI or Claude Code.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex-grow max-w-2xl">
            <div className="bg-[#1A1C16] p-6 border-2 border-ink-black shadow-[6px_6px_0px_#B5C0FF] group relative">
              <div className="absolute -top-3 -left-3 bg-accent-orange text-white text-[0.5rem] font-black px-2 py-1 uppercase tracking-widest">Command</div>
              <code className="text-accent-blue text-xs font-mono break-all leading-loose">
                gemini skills install https://salestools.club/salestools.skill
              </code>
              {/* Removed status div */}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories (Tool Index) ───────────────────────────── */}
      <section className="px-6 py-24 md:px-12 bg-[#1A1C16] relative overflow-hidden border-t border-ink-black/20">
        {/* Abstract Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#B5C0FF 1px, transparent 1px), linear-gradient(90deg, #B5C0FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent-blue/20 bg-accent-blue/5 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse"></div>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-accent-blue">Categories</span>
              </div>
              <h2 className="type-display text-white">Browse by Category.</h2>
              <p className="mt-6 text-lg font-bold text-white/80 leading-relaxed max-w-xl">
                Every category is vetted for builder-first compatibility. Vetted APIs, verified MCPs, zero fluff.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-[#24261F] p-10 transition-all hover:bg-accent-blue/[0.05]"
              >
                <div className="mb-10 flex items-center justify-between">
                  {/* Removed NODE_0x element */}
                  <div className="h-1.5 w-1.5 bg-accent-blue/20 group-hover:bg-accent-orange transition-colors rounded-full"></div>
                </div>
                <h3 className="text-base font-black tracking-tight uppercase text-white group-hover:text-accent-blue transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-4 text-sm font-bold text-white/90 line-clamp-2 leading-relaxed group-hover:text-white transition-colors">
                  {cat.description}
                </p>
                <div className="mt-12 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all">
                  <div className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-accent-blue">{cat.toolCount} Items</div>
                  <ArrowRight className="h-3 w-3 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
