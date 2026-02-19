import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools } from "@/lib/tools"
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
      className="swiss-card group relative bg-white/40 backdrop-blur-sm border-ink-black/10 hover:border-ink-black transition-all h-full flex flex-col p-4"
    >
      <div className="absolute -top-1 -right-1 h-2 w-2 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start">
        <div className="h-10 w-10 flex items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors font-bold text-base shadow-[3px_3px_0px_rgba(18,18,18,0.05)]">
          {tool.name.charAt(0)}
        </div>
      </div>
      
      <div className="mt-6 text-lg font-bold tracking-tight uppercase group-hover:text-accent-orange transition-colors line-clamp-1">{tool.name}</div>
      <p className="mt-1 text-xs font-medium opacity-60 line-clamp-2 min-h-[32px] leading-relaxed">
        {tool.oneLiner}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center border border-ink-black px-1.5 py-0.5 rounded-full text-[0.6rem] font-medium uppercase tracking-wider bg-white/50">{tool.category}</span>
        {tool.mcpReady && (
          <span className="inline-flex items-center border border-accent-orange text-accent-orange px-1.5 py-0.5 rounded-full text-[0.6rem] font-medium uppercase tracking-wider flex items-center gap-1">
            <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
            MCP READY
          </span>
        )}
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-ink-black/5 border-dashed">
        <div className="text-[0.55rem] font-bold uppercase tracking-widest opacity-40">Specs</div>
        <div className="text-[0.55rem] font-bold uppercase group-hover:translate-x-1 transition-transform">-></div>
      </div>
    </Link>
  )
}

export default function Home() {
  const featuredTools = getFeaturedTools().slice(0, 15)
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
            <div className="type-label opacity-40">Tool Directory</div>
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
            <div className="type-label opacity-40">Featured Stack</div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">The Authority List</h2>
          </div>
          <Link href="/tools" className="text-[0.65rem] font-bold uppercase tracking-[0.2em] border-b border-ink-black pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors">
            View All ->
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── Infinite Crawl ───────────────────────────────── */}
      <section className="border-y border-dashed border-ink-black bg-white/20 py-12 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-4">
          {[...allTools, ...allTools].map((tool, idx) => (
            <div key={`${tool.slug}-${idx}`} className="inline-block min-w-[250px]">
              <Link 
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 p-3 border border-ink-black/10 bg-white/40 hover:border-ink-black transition-all"
              >
                <div className="h-8 w-8 flex items-center justify-center border border-ink-black bg-white font-bold text-xs">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-tight">{tool.name}</span>
                  <span className="text-[0.6rem] opacity-40 uppercase tracking-widest">{tool.category}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="border-t border-ink-black px-6 py-24 md:px-12 bg-sage-bg">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="type-label mb-6">Tool Directory</div>
            <h2 className="type-display">Find the right tools for every part of your infrastructure.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-ink-black/10 border border-ink-black/10 md:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white/40 p-10 transition-all hover:bg-accent-blue/[0.05]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="text-[0.6rem] font-bold opacity-30 group-hover:text-accent-blue transition-colors">0{idx + 1}</div>
                <div className="h-1 w-1 bg-ink-black/10 group-hover:bg-accent-orange transition-colors rounded-full"></div>
              </div>
              <h3 className="text-lg font-bold tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                {cat.name}
              </h3>
              <p className="mt-3 text-xs font-medium opacity-60 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-10 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all">
                <div className="type-label">{cat.toolCount} Items</div>
                <div className="h-px w-8 bg-ink-black/20 group-hover:w-12 transition-all"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
