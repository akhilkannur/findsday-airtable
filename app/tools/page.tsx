import type { Metadata } from "next"
import Link from "next/link"
import { getAllTools, searchTools } from "@/lib/tools"
import { Brain, ArrowRight } from "lucide-react"
import { SearchBar } from "@/components/SearchBar"

export const metadata: Metadata = {
  title: "The Tools | Salestools Club",
  description:
    "A simple list of sales APIs and tools for people building with AI.",
  alternates: {
    canonical: "https://salestools.club/tools",
  },
}

function ToolCard({ tool, index }: { tool: any, index: number }) {
  const colors = ['header-blue', 'header-red', 'header-yellow', 'header-green']
  const colorClass = colors[index % colors.length]

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
          <div className="avatar w-14 h-14 bg-[#eee] border-2 border-black rounded-xl flex items-center justify-center font-extrabold text-2xl text-black">
            {tool.name.charAt(0)}
          </div>
          {tool.mcpReady && (
            <span className="mcp-badge">MCP READY</span>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2 uppercase text-black">{tool.name}</h3>
          <p className="text-[0.95rem] text-[#666] leading-relaxed line-clamp-2">
            {tool.oneLiner}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 items-center">
          <span className="tag">{tool.category}</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
             <ArrowRight className="h-5 w-5 text-black" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const sp = await searchParams
  const q = sp.q ?? ""
  const tools = q ? searchTools(q) : getAllTools()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">
            <span className="w-2 h-2 bg-[var(--lego-green)] rounded-full animate-status-pulse"></span>
            Node Registry
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black">All Tools</h1>
          <p className="max-w-2xl text-xl font-medium text-black/70 leading-relaxed">
            A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
          </p>
        </div>
      </section>

      <div className="bg-white border-b-[var(--border-width)] border-black">
        <div className="layout-container">
          <SearchBar />
        </div>
      </div>

      {q && (
        <div className="py-8 border-b-[var(--border-width)] border-black bg-[var(--lego-offwhite)]">
          <div className="layout-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444]">Filter Active:</span>
              <span className="px-3 py-1 bg-[var(--lego-blue)] text-white border-2 border-black rounded-md text-[10px] font-bold uppercase tracking-[0.1em]">SYSTEM_QUERY: &lsquo;{q}&rsquo;</span>
            </div>
            <Link href="/tools" className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-[var(--lego-red)] transition-colors underline underline-offset-4">Reset System</Link>
          </div>
        </div>
      )}

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} index={idx} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-32 brick bg-white">
              <p className="text-xl font-bold text-black uppercase tracking-widest">No nodes indexed in this class.</p>
              <Link href="/tools" className="mt-8 brick brick-btn brick-red">Clear Search</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
