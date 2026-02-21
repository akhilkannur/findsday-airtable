import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "Every Sales API and MCP server you need to automate your GTM with Claude Code and agentic tools.",
  alternates: {
    canonical: "https://salestools.club",
  },
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[1rem] text-[var(--ink-fade)] leading-relaxed line-clamp-3 mb-6">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--ink-fade)]">{tool.category}</span>
      </div>
    </Link>
  )
}

export default function Home() {
  const allFeatured = getFeaturedTools()
  const exploreTools = allFeatured.slice(0, 12)
  const allTools = getAllTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero relative">
        <div className="layout-container">
          <svg className="connections-layer absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 1400 600" preserveAspectRatio="none">
            <path className="connector-line fill-none stroke-[var(--ink)] stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_0.5s]" d="M 400,120 Q 600,180 750,140" />
            <path className="connector-line fill-none stroke-[var(--ink)] stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_1s]" d="M 850,150 Q 800,300 350,450" />
          </svg>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
          `}} />

          <div className="relative z-10">
            <h1 className="type-display mb-12">
              The <span className="circled">Lego Blocks</span> <br />
              for your <span className="circled">AI Sales Agent.</span>
            </h1>
            
            <div className="font-serif italic text-2xl text-[var(--ink-fade)] max-w-2xl pl-6 border-l-2 border-[var(--ink)] mb-16 leading-relaxed">
              Don't reinvent the wheel. We've curated the best APIs, SDKs, and MCP servers that plug directly into Claude Code and Cursor. Build your GTM machine in hours, not weeks.
            </div>

            <form className="flex gap-6 max-w-lg items-end">
              <div className="flex-grow">
                <input 
                  type="email" 
                  placeholder="enter your email..." 
                  className="w-full bg-transparent border-b-2 border-[var(--ink)] font-mono text-lg py-2 focus:outline-none placeholder:italic placeholder:text-[var(--ink-fade)]"
                  required
                />
              </div>
              <button type="submit" className="circled accent font-mono font-bold uppercase text-[1rem] hover:rotate-[-2deg] transition-transform">
                Get the Blueprint
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Directory Header ──────────────── */}
      <section className="py-20 border-t border-[var(--ink)]">
        <div className="layout-container">
          <div className="flex justify-between items-end mb-12 pb-4 border-b border-[var(--ink)]">
            <span className="font-mono text-[0.9rem] uppercase tracking-widest text-[var(--ink-fade)]">Recently Added</span>
            <div className="font-mono text-[0.9rem] uppercase tracking-widest text-[var(--ink-fade)]">Browse All</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {exploreTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link href="/tools" className="font-serif italic text-2xl border-b border-black hover:opacity-60 transition-opacity pb-1">
              Browse All Tools ->
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="py-32 bg-[var(--paper-dark)] border-y border-[var(--ink)]">
        <div className="layout-container">
          <div className="mb-20">
            <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
              Explore by Type
            </div>
            <h2 className="font-serif text-5xl leading-tight">Categories</h2>
            <p className="mt-8 text-xl font-medium text-[var(--ink-fade)] leading-relaxed max-w-xl">
              We vet every tool to make sure it actually works with AI agents. No fluff, just the building blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col h-full gap-6 hover:translate-y-[-4px] transition-transform"
              >
                <div className="font-mono text-[0.75rem] text-[var(--ink-fade)] group-hover:text-[var(--ink)] transition-colors italic uppercase">Collection_0{idx + 1}</div>
                <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-[var(--ink)] transition-all underline-offset-8">
                  {cat.name}
                </h3>
                <p className="text-[1rem] text-[var(--ink-fade)] line-clamp-3 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-auto font-mono text-[0.7rem] uppercase text-[var(--ink-fade)]">
                  {cat.toolCount} Tools
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
