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
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black flex flex-col lg:flex-row gap-20 items-start">
        <div className="max-w-4xl flex-grow">
          <div className="type-label mb-6 opacity-40">Builder Directory</div>
          <h1 className="type-display mb-12">
            You use Claude and Cursor to build. We provide the <span className="border-b border-ink-black pb-1 font-bold">Lego blocks.</span> Every Sales API and MCP server you need to automate your stack.
          </h1>
          <p className="max-w-[600px] text-lg font-medium opacity-60">
            Stop digging through messy dev docs. We find the tools that actually plug into your AI workflow so you can focus on building your sales engine.
          </p>
        </div>

        <div className="w-full lg:w-[360px] border border-ink-black bg-white/20 p-8 shadow-[8px_8px_0px_rgba(18,18,18,0.05)]">
          <div className="type-label mb-6 opacity-40">The Sunday List</div>
          <form className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Your email address..." 
              className="w-full bg-white/60 border border-ink-black px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
              required
            />
            <button type="submit" className="swiss-btn swiss-btn-primary w-full py-4 text-xs">
              Get the tools <span>-></span>
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2 text-center">
              Join 500+ AI-Native Operators.
            </p>
          </form>
        </div>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="swiss-grid-bg px-6 py-12 md:px-12 md:py-16">
        <div className="mb-16 flex items-end justify-between border-b border-ink-black pb-8">
          <div className="type-label opacity-40">Operator Picks</div>
          <Link href="/tools" className="text-xs font-bold uppercase tracking-widest hover:underline">
            Browse All Tools ->
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="swiss-card group"
            >
              <div className="flex justify-between items-start">
                <div className="flex h-10 w-10 items-center justify-center border border-ink-black bg-accent-blue font-bold text-lg">
                  {tool.name.charAt(0)}
                </div>
                <div className="type-label opacity-40">v{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}</div>
              </div>
              
              <div className="mt-4 text-xl font-medium tracking-tight">{tool.name}</div>
              <p className="text-sm font-medium opacity-60 line-clamp-2 min-h-[40px]">
                {tool.oneLiner}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="swiss-badge">{tool.category}</span>
                {tool.mcpReady && <span className="swiss-badge border-accent-orange text-accent-orange">Hot</span>}
              </div>

              <div className="mt-6 swiss-btn swiss-btn-primary group-hover:bg-ink-black group-hover:text-accent-blue">
                View Specs <span>↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="border-t border-ink-black px-6 py-24 md:px-12">
        <div className="mb-20">
          <div className="type-label mb-4 opacity-40">System Nodes</div>
          <h2 className="type-display max-w-2xl">Find the right modules for every part of your sales infrastructure.</h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-ink-black border border-ink-black md:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-sage-bg p-10 transition-all hover:bg-ink-black"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="type-label opacity-40 group-hover:text-sage-bg group-hover:opacity-100">0{idx + 1}</div>
                <div className="type-label font-bold text-accent-orange opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">Select</div>
              </div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-sage-bg">
                {cat.name}
              </h3>
              <p className="mt-4 text-sm font-medium opacity-60 group-hover:text-sage-bg/60 line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-grow bg-ink-black group-hover:bg-sage-bg/20"></div>
                <div className="type-label opacity-40 group-hover:text-sage-bg/40">{cat.toolCount}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
