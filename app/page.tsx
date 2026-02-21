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

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-accent-blue" /> : <Cpu className="h-6 w-6 text-accent-blue" />
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group border-r border-b border-[#333333] hover:bg-[#0a0a0a] transition-colors p-8 flex flex-col gap-5 h-full"
    >
      <div className="card-top flex justify-between items-start">
        <div className="avatar w-12 h-12 bg-[#111] border border-[#333333] flex items-center justify-center font-bold text-xl text-white">
          {tool.name.charAt(0)}
        </div>
        <div className="text-xl opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 text-[#888]">↗</div>
      </div>
      
      <div className="tool-info">
        {tool.mcpReady && (
          <div className="mcp-badge">MCP READY</div>
        )}
        <h3 className="text-xl font-semibold tracking-[-0.02em] mb-2">{tool.name}</h3>
        <p className="text-[14px] text-[#888] leading-relaxed mb-4 line-clamp-2">
          {tool.oneLiner}
        </p>
        <div className="tags flex flex-wrap gap-2 mt-auto">
          <span className="tag border border-[#333333] px-2 py-1 text-[11px] text-[#888] uppercase">{tool.category}</span>
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
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero grid lg:grid-cols-[1.2fr_0.8fr] border-b border-[#333333] min-h-[600px]">
        <div className="hero-content p-10 md:p-20 flex flex-col justify-center border-r border-[#333333]">
          <h1 className="text-[42px] md:text-[64px] font-bold leading-[0.95] tracking-[-0.04em] mb-8">
            The Lego Blocks <br />
            for your <br />
            AI Sales Agent.
          </h1>
          <p className="text-[18px] text-[#999] leading-relaxed mb-12 max-w-[480px]">
            A curated directory of high-performance APIs, SDKs, and MCP servers designed for the next generation of autonomous sales infrastructure.
          </p>

          <form className="email-capture flex h-14 max-w-[460px] border border-[#333333]">
            <input 
              type="email" 
              placeholder="sales@agent.os" 
              className="flex-grow bg-transparent px-6 text-white text-[16px] outline-none"
              required
            />
            <button type="submit" className="px-8 bg-white text-black font-bold hover:bg-[#ccc] transition-colors">
              GET ACCESS
            </button>
          </form>
        </div>

        <div className="hero-visual bg-[#050505] overflow-hidden flex items-center justify-center min-h-[300px] lg:min-h-full">
          {/* Node network visualization placeholder - matches design code style */}
          <div className="relative w-full h-full opacity-40">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path d="M50 50 L350 350 M50 350 L350 50" stroke="#333" strokeWidth="1" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
              <rect x="195" y="195" width="10" height="10" fill="white">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="45" y="45" width="10" height="10" fill="white" opacity="0.5" />
              <rect x="345" y="345" width="10" height="10" fill="white" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Latest Deployments Header ──────────────── */}
      <div className="directory-header px-10 md:px-20 py-6 border-b border-[#333333] flex justify-between items-center bg-black">
        <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888]">Latest Deployments</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888]">Filter: All Systems</div>
      </div>

      {/* ── Grid ──────────────── */}
      <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#333333] gap-px">
        {exploreTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <div className="border-t border-[#333333] p-12 text-center bg-black">
        <Link href="/tools" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors">
          Initialize Full Registry ->
        </Link>
      </div>
      {/* ── Infinite Crawl ───────────────────────────────── */}
      <section className="border-b border-[#333333] bg-[#050505] py-8 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex gap-12 px-4 items-center">
            {[...allTools, ...allTools].map((tool, idx) => (
              <Link 
                key={`${tool.slug}-${idx}`}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 group opacity-40 hover:opacity-100 transition-opacity"
              >
                <div className="h-5 w-5 flex items-center justify-center border border-[#333333] bg-black font-bold text-[7px] text-white">
                  {tool.name.charAt(0)}
                </div>
                <span className="text-[9px] font-bold uppercase text-white tracking-widest">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Access ───────────────────────────────── */}
      <section className="px-10 md:px-20 py-24 bg-black border-b border-[#333333]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888] mb-6">Deployment Protocol</div>
            <h2 className="text-3xl font-bold tracking-tight uppercase mb-8">Plug into your terminal</h2>
            <p className="text-[16px] text-[#888] leading-relaxed">
              Enable your AI agents to search this registry directly. One command installs the Salestools Club protocol into Gemini CLI or Claude Code.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex-grow max-w-2xl">
            <div className="bg-[#050505] p-10 border border-[#333333] shadow-[8px_8px_0px_#111] group relative">
              <div className="absolute -top-3 -left-3 bg-white text-black text-[9px] font-black px-2 py-1 uppercase tracking-widest">Execute</div>
              <code className="text-white text-sm font-mono break-all leading-loose opacity-80">
                gemini skills install https://salestools.club/salestools.skill
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories (Tool Index) ───────────────────────────── */}
      <section className="px-10 md:px-20 py-32 bg-black relative overflow-hidden">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888] mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              Infrastructure Classes
            </div>
            <h2 className="text-[42px] font-bold tracking-tight leading-none text-white">Browse by Category.</h2>
            <p className="mt-8 text-[18px] text-[#888] leading-relaxed max-w-xl">
              Every category is vetted for builder-first compatibility. Vetted APIs, verified MCPs, zero fluff.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#333333] gap-px border border-[#333333]">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-black p-12 transition-all hover:bg-[#0a0a0a]"
            >
              <div className="mb-12 flex items-center justify-between">
                <div className="text-[10px] font-mono text-[#444] group-hover:text-white transition-colors">CLASS_0{idx + 1}</div>
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-4">
                {cat.name}
              </h3>
              <p className="text-[14px] text-[#888] line-clamp-2 leading-relaxed group-hover:text-white transition-colors">
                {cat.description}
              </p>
              <div className="mt-16 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{cat.toolCount} Items</div>
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
