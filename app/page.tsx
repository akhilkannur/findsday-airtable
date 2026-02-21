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

function ToolCard({ tool, index }: { tool: any, index: number }) {
  const colors = ['header-blue', 'header-red', 'header-yellow', 'header-green']
  const avatarColors = ['var(--lego-blue)', 'var(--lego-red)', '#bba400', 'var(--lego-green)']
  const colorClass = colors[index % colors.length]
  const avatarColor = avatarColors[index % avatarColors.length]

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group"
    >
      <div className={`card-header-studs ${colorClass}`}>
        <div className="stud"></div><div className="stud"></div><div className="stud"></div>
      </div>
      <div className="card-body p-6 flex flex-col gap-4">
        <div className="card-top flex justify-between items-start">
          <div className="avatar w-14 h-14 bg-[#eee] border-2 border-black rounded-xl flex items-center justify-center font-extrabold text-2xl" style={{ color: avatarColor }}>
            {tool.name.charAt(0)}
          </div>
          {tool.mcpReady && (
            <span className="mcp-badge">MCP READY</span>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2 uppercase">{tool.name}</h3>
          <p className="text-[0.95rem] text-[#666] leading-relaxed line-clamp-3 mb-4">
            {tool.oneLiner}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <span className="tag">{tool.category}</span>
        </div>
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
      {/* Decorative Bricks */}
      <div className="absolute top-[15%] left-[5%] w-16 h-16 bg-[var(--lego-red)] border-[var(--border-width)] border-black rounded-full opacity-60 -z-10 shadow-[4px_4px_0_rgba(0,0,0,0.2)]"></div>
      <div className="absolute bottom-[20%] right-[5%] w-24 h-10 bg-[var(--lego-blue)] border-[var(--border-width)] border-black rounded-lg opacity-60 -z-10 shadow-[4px_4px_0_rgba(0,0,0,0.2)] -rotate-12"></div>
      <div className="absolute top-[25%] right-[15%] w-10 h-10 bg-[var(--lego-yellow)] border-[var(--border-width)] border-black rounded opacity-60 -z-10 shadow-[4px_4px_0_rgba(0,0,0,0.2)] rotate-12"></div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className="py-24 md:py-32 text-center relative overflow-hidden">
        <div className="layout-container">
          <h1 className="text-4xl md:text-[4rem] font-bold leading-[1.1] tracking-tight mb-8">
            The <span className="inline-block bg-[var(--lego-blue)] text-white px-4 border-[var(--border-width)] border-black rounded-[var(--radius-md)] shadow-[6px_6px_0_black] rotate-2 mx-2">Lego Blocks</span> <br />
            for your AI Sales Agent.
          </h1>
          <p className="text-xl md:text-2xl text-[#444] leading-relaxed mb-12 max-w-[700px] mx-auto">
            Don't reinvent the wheel. We've curated the best APIs, SDKs, and MCP servers that plug directly into Claude Code and Cursor. Build your GTM machine in hours, not weeks.
          </p>

          <form className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-[500px] mx-auto">
            <input 
              type="email" 
              placeholder="enter your email..." 
              className="flex-grow px-6 py-4 text-lg border-[var(--border-width)] border-black rounded-[var(--radius-md)] outline-none shadow-[inset_3px_3px_0_rgba(0,0,0,0.1)] focus:bg-[#fffbe6] transition-colors"
              required
            />
            <button type="submit" className="brick brick-btn bg-[var(--lego-red)] text-white font-bold hover:scale-105 transition-transform whitespace-nowrap">
              Get the Blueprint
            </button>
          </form>
        </div>
      </header>

      {/* ── Grid Section ──────────────── */}
      <section className="py-20 bg-white/30 border-y-[var(--border-width)] border-black">
        <div className="layout-container">
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="px-4 py-2 border-2 border-black rounded-full font-bold bg-black text-white shadow-[2px_2px_0_black]">Latest Blocks</div>
            <div className="px-4 py-2 border-2 border-black rounded-full font-bold bg-white shadow-[2px_2px_0_black] hover:-translate-y-1 transition-transform cursor-pointer text-sm">All Classes</div>
          </div>

          <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {exploreTools.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} index={idx} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/tools" className="brick brick-btn bg-white text-black hover:scale-105 transition-transform font-bold tracking-widest">
              Explore Full Registry ->
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="py-32 bg-[var(--lego-offwhite)]">
        <div className="layout-container">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-4">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Infrastructure Classes
            </div>
            <h2 className="text-5xl font-bold tracking-tight">Browse by Category.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="brick p-10 bg-white group hover:rotate-1 transition-all"
              >
                <div className="text-[10px] font-mono text-[#888] mb-6">BLOCK_TYPE_0{idx + 1}</div>
                <h3 className="text-xl font-bold uppercase mb-4 group-hover:text-[var(--lego-blue)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[0.95rem] text-[#666] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-10 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all pt-6 border-t-2 border-dashed border-black/10">
                  <span className="text-[10px] font-bold uppercase">{cat.toolCount} Pieces</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
