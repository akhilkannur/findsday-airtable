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
  return Icon ? <Icon className="h-6 w-6 text-enjin-teal" /> : <Cpu className="h-6 w-6 text-enjin-teal" />
}

export default function Home() {
  const featuredTools = getFeaturedTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black max-w-4xl">
        <div className="type-label mb-6 opacity-40">System Overview</div>
        <h1 className="type-display mb-12">
          According to our latest index, sales teams waste approximately <span className="border-b border-ink-black pb-1">20 hours</span> per week on manual data entry, contributing to 0.4% efficiency loss globally.
        </h1>
        <p className="max-w-[600px] text-lg font-medium opacity-60">
          Optimized tools reduce friction. Select a module below to begin integration.
        </p>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="swiss-grid-bg px-6 py-12 md:px-12 md:py-16">
        <div className="mb-16 flex items-end justify-between border-b border-ink-black pb-8">
          <div className="type-label opacity-40">Featured Modules</div>
          <Link href="/tools" className="text-xs font-bold uppercase tracking-widest hover:underline">
            View All ->
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
