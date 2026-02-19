import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A curated directory of the best sales APIs and MCP servers for people building with Claude Code, Cursor, and other agentic tools.",
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
      <p className="mt-2 text-sm font-medium opacity-60 line-clamp-2 min-h-[40px] leading-relaxed">
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
  const featuredTools = getFeaturedTools().slice(0, 12)
  const allTools = getAllTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col max-w-[100vw] overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black bg-sage-bg/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="type-label opacity-40 text-[0.6rem]">Vetted Registry</div>
            <div className="h-px w-8 bg-ink-black/20"></div>
          </div>
          <h1 className="type-display mb-12">
            You use Claude Code, Cursor, and other agentic tools to build. We source the <span className="relative inline-block">
              <span className="relative z-10 font-bold">Lego blocks.</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-accent-blue/30 -z-0"></span>
            </span> Every Sales API and MCP server you need to automate your stack.
          </h1>
          <p className="max-w-2xl text-lg font-medium opacity-60 leading-relaxed">
            Stop digging through messy dev docs. We find the tools that actually plug into your AI workflow so you can focus on building your sales engine.
          </p>

          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
            <input 
              type="email" 
              placeholder="get new tool updates" 
              className="flex-grow bg-white border border-ink-black px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_rgba(18,18,18,0.05)]"
              required
            />
            <button type="submit" className="swiss-btn swiss-btn-primary px-8 py-3 text-sm font-bold whitespace-nowrap shadow-[4px_4px_0px_#121212]">
              Subscribe <span>-></span>
            </button>
          </form>
        </div>
      </section>

      {/* ── Featured Tools (The Authority List) ──────────────── */}
      <section className="px-6 py-24 md:px-12 bg-white/50 relative border-b border-ink-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="type-label opacity-40">Featured Tools</div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">The Authority List</h2>
            </div>
            <Link href="/tools" className="text-[0.6rem] font-bold uppercase tracking-[0.2em] border-b-2 border-accent-blue pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors">
              View All Tools ->
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
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
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-accent-blue">Browse Categories</span>
              </div>
              <h2 className="type-display text-white">Tool Categories</h2>
              <p className="mt-6 text-lg font-medium text-white/30 leading-relaxed max-w-xl">
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
                  <div className="text-[0.6rem] font-bold opacity-20 group-hover:text-accent-blue transition-colors font-mono tracking-tighter">0{idx + 1}</div>
                  <div className="h-1.5 w-1.5 bg-accent-blue/20 group-hover:bg-accent-orange transition-colors rounded-full"></div>
                </div>
                <h3 className="text-base font-black tracking-tight uppercase text-white group-hover:text-accent-blue transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-4 text-sm font-medium text-white/60 line-clamp-2 leading-relaxed group-hover:text-white/90 transition-colors">
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
