import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A curated directory of the best sales APIs and MCP servers for people building with Claude Code, Cursor, and other agentic tools.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-accent-blue" /> : <Cpu className="h-6 w-6 text-accent-blue" />
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="swiss-card group relative bg-white/40 backdrop-blur-sm border-ink-black/10 hover:border-ink-black transition-all h-full flex flex-col p-4 min-h-[180px]"
    >
      <div className="absolute -top-1 -right-1 h-2 w-2 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start">
        <div className="h-9 w-9 flex items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors font-bold text-sm shadow-[3px_3px_0px_rgba(18,18,18,0.05)]">
          {tool.name.charAt(0)}
        </div>
      </div>
      
      <div className="mt-4 text-base font-bold tracking-tight uppercase group-hover:text-accent-orange transition-colors line-clamp-1">{tool.name}</div>
      <p className="mt-1 text-[0.7rem] font-medium opacity-60 line-clamp-2 min-h-[28px] leading-snug">
        {tool.oneLiner}
      </p>

      <div className="mt-4 flex flex-wrap gap-1">
        <span className="inline-flex items-center border border-ink-black px-1.5 py-0.5 rounded-full text-[0.55rem] font-medium uppercase tracking-wider bg-white/50">{tool.category}</span>
        {tool.mcpReady && (
          <span className="inline-flex items-center border border-accent-orange text-accent-orange px-1.5 py-0.5 rounded-full text-[0.55rem] font-medium uppercase tracking-wider gap-1">
            <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
            MCP READY
          </span>
        )}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between border-t border-ink-black/5 border-dashed">
        <div className="text-[0.5rem] font-bold uppercase tracking-widest opacity-40">View Node</div>
        <div className="text-[0.5rem] font-bold uppercase group-hover:translate-x-1 transition-transform">-></div>
      </div>
    </Link>
  )
}

export default function Home() {
  const featuredTools = getFeaturedTools().slice(0, 12) // 4 rows of 3
  const allTools = getAllTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black flex flex-col items-start overflow-hidden bg-sage-bg/30">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-dashed border-ink-black/10 -z-10 pointer-events-none hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 border-t border-dashed border-ink-black/10 -z-10 pointer-events-none"></div>

        <div className="max-w-4xl flex-grow relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="type-label opacity-40 text-xs">The Operator's Registry</div>
            <div className="h-px w-8 bg-ink-black/20"></div>
          </div>
          <h1 className="type-display mb-12">
            You use Claude Code, Cursor, and other agentic tools to build. We source the <span className="relative inline-block">
              <span className="relative z-10 font-bold">Lego blocks.</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-accent-blue/30 -z-0"></span>
            </span> Every Sales API and MCP server you need to automate your stack.
          </h1>
          <p className="max-w-[600px] text-lg font-medium opacity-60 leading-relaxed">
            Stop digging through messy dev docs. We find the tools that actually plug into your AI workflow so you can focus on building your sales engine.
          </p>

          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
            <input 
              type="email" 
              placeholder="get new tool updates" 
              className="flex-grow bg-white/80 border border-ink-black px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
              required
            />
            <button type="submit" className="swiss-btn swiss-btn-primary px-8 py-3 text-sm font-bold whitespace-nowrap">
              Subscribe <span>-></span>
            </button>
          </form>
        </div>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="swiss-grid-bg px-6 py-24 md:px-12 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-ink-black/10"></div>
        <div className="mb-16 flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="type-label opacity-40">Top Selection</div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">The Authority List</h2>
          </div>
          <Link href="/tools" className="text-[0.65rem] font-bold uppercase tracking-[0.2em] border-b border-ink-black pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors">
            View All ->
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── Infinite Crawl ───────────────────────────────── */}
      <section className="border-y border-dashed border-ink-black bg-white/40 py-10 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sage-bg to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sage-bg to-transparent z-10"></div>
        <div className="flex animate-marquee whitespace-nowrap gap-4">
          {[...allTools, ...allTools].map((tool, idx) => (
            <div key={`${tool.slug}-${idx}`} className="inline-block">
              <Link 
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 p-2.5 border border-ink-black/10 bg-white/60 hover:border-ink-black transition-all"
              >
                <div className="h-7 w-7 flex items-center justify-center border border-ink-black bg-white font-bold text-[10px]">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] font-bold uppercase tracking-tight">{tool.name}</span>
                  <span className="text-[8px] opacity-40 uppercase tracking-widest">{tool.category}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="border-t border-ink-black px-6 py-24 md:px-12 bg-[#E8EBFF] relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Brain className="h-32 w-32" />
        </div>
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
          <div className="max-w-2xl">
            <div className="type-label mb-6 text-accent-blue font-black">Tool Index</div>
            <h2 className="type-display">Find the right tools for every part of your infrastructure.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white border border-ink-black/10 p-8 transition-all hover:border-ink-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#B5C0FF]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="text-[0.6rem] font-bold opacity-30 group-hover:text-accent-blue transition-colors">0{idx + 1}</div>
                <div className="h-1 w-1 bg-accent-blue/20 group-hover:bg-accent-orange transition-colors rounded-full"></div>
              </div>
              <h3 className="text-base font-bold tracking-tight uppercase group-hover:text-accent-blue transition-colors">
                {cat.name}
              </h3>
              <p className="mt-3 text-[0.7rem] font-medium opacity-60 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-10 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all">
                <div className="text-[0.6rem] font-bold uppercase tracking-widest">{cat.toolCount} Modules</div>
                <div className="h-px w-8 bg-accent-blue/30 group-hover:w-12 transition-all"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
