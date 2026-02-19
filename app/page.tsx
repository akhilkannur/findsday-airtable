import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A simple list of the best sales APIs and MCP servers for people building with AI.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-accent-blue" /> : <Cpu className="h-6 w-6 text-accent-blue" />
}

export default function Home() {
  const featuredTools = getFeaturedTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black flex flex-col lg:flex-row gap-20 items-start overflow-hidden bg-sage-bg/30">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-dashed border-ink-black/10 -z-10 pointer-events-none hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 border-t border-dashed border-ink-black/10 -z-10 pointer-events-none"></div>

        <div className="max-w-4xl flex-grow relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="type-label opacity-40">Builder Directory</div>
            <div className="h-px w-8 bg-ink-black/20"></div>
            <div className="text-[0.6rem] font-bold tracking-[0.2em] opacity-30 uppercase">Node_Main.01</div>
          </div>
          <h1 className="type-display mb-12">
            You use Claude and Cursor to build. We provide the <span className="relative inline-block">
              <span className="relative z-10 font-bold">Lego blocks.</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-accent-blue/30 -z-0"></span>
            </span> Every Sales API and MCP server you need to automate your stack.
          </h1>
          <p className="max-w-[600px] text-lg font-medium opacity-60 leading-relaxed">
            Stop digging through messy dev docs. We find the tools that actually plug into your AI workflow so you can focus on building your sales engine.
          </p>

          <div className="mt-16 flex flex-wrap gap-8 items-center border-t border-ink-black/10 pt-8">
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30 mb-1">Total_Nodes</span>
              <span className="text-xl font-bold tracking-tight">200+</span>
            </div>
            <div className="h-8 w-px bg-ink-black/10"></div>
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30 mb-1">Mcp_Ready</span>
              <span className="text-xl font-bold tracking-tight">45</span>
            </div>
            <div className="h-8 w-px bg-ink-black/10"></div>
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30 mb-1">Last_Update</span>
              <span className="text-xl font-bold tracking-tight">Feb_26</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[380px] border border-ink-black bg-white/40 backdrop-blur-md p-10 shadow-[12px_12px_0px_rgba(18,18,18,0.08)] relative group overflow-hidden">
          <div className="absolute -top-12 -right-12 h-24 w-24 border border-dashed border-ink-black/10 rounded-full transition-transform duration-1000 group-hover:scale-150"></div>
          <div className="relative">
            <div className="type-label mb-8 flex items-center justify-between">
              <span>The Sunday List</span>
              <span className="text-[0.6rem] opacity-30">#003-N</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-tight mb-8 opacity-60">
              Get the new APIs & MCP servers delivered every Sunday morning.
            </p>
            <form className="flex flex-col gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40">Email_Address</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse"></span>
                </div>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white/80 border border-ink-black px-4 py-4 text-sm font-medium focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 focus:ring-1 focus:ring-accent-blue"
                  required
                />
              </div>
              <button type="submit" className="swiss-btn swiss-btn-primary w-full py-5 text-[0.7rem] font-bold group">
                Establish Connection <span className="transition-transform group-hover:translate-x-1">-></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="swiss-grid-bg px-6 py-24 md:px-12 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-ink-black/10"></div>
        <div className="mb-20 flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="type-label opacity-40">Featured Nodes</div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">The Top Registry</h2>
          </div>
          <Link href="/tools" className="text-[0.65rem] font-bold uppercase tracking-[0.2em] border-b border-ink-black pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors">
            Browse All ->
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool, idx) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="swiss-card group relative bg-white/40 backdrop-blur-sm border-ink-black/20 hover:border-ink-black transition-all"
            >
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start">
                <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors font-bold text-xl">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-[0.6rem] font-bold opacity-30">REF._{idx.toString().padStart(3, '0')}</div>
                  <div className="type-label opacity-60 mt-1">v{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}</div>
                </div>
              </div>
              
              <div className="mt-8 text-2xl font-bold tracking-tight uppercase group-hover:text-accent-orange transition-colors">{tool.name}</div>
              <p className="mt-2 text-sm font-medium opacity-60 line-clamp-2 min-h-[40px] leading-relaxed">
                {tool.oneLiner}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="swiss-badge bg-white/50 group-hover:bg-accent-blue/10 transition-colors">{tool.category}</span>
                {tool.mcpReady && (
                  <span className="swiss-badge border-accent-orange text-accent-orange flex items-center gap-1">
                    <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
                    MCP_ACTIVE
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 schematic-border-t">
                <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-40">Access Protocol</div>
                <div className="text-[0.65rem] font-bold uppercase group-hover:translate-x-1 transition-transform">-> Specs</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="border-t border-ink-black px-6 py-24 md:px-12 bg-ink-black">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="type-label mb-6 text-white/40">System Architecture</div>
            <h2 className="type-display text-white">Find the right modules for every part of your infrastructure.</h2>
          </div>
          <div className="flex items-center gap-4 text-white/40 text-[0.6rem] font-mono uppercase tracking-[0.2em] mb-4">
            <span className="animate-pulse">Scanning Nodes...</span>
            <div className="h-2 w-20 bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-accent-blue animate-[ping_3s_infinite]"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-ink-black p-12 transition-all hover:bg-accent-blue/[0.03]"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="text-[0.65rem] font-bold text-white/30 group-hover:text-accent-blue transition-colors">0{idx + 1}</div>
                <div className="h-1.5 w-1.5 bg-white/10 group-hover:bg-accent-orange transition-colors rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white uppercase group-hover:translate-x-2 transition-transform">
                {cat.name}
              </h3>
              <p className="mt-4 text-sm font-medium text-white/40 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-12 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all">
                <div className="type-label text-white group-hover:text-accent-blue">{cat.toolCount} Items</div>
                <div className="h-px w-12 bg-white/20 group-hover:w-16 transition-all"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
