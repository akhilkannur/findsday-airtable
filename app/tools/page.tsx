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
      <section className="px-10 md:px-20 py-24 border-b border-[#333333] relative overflow-hidden bg-black">
        <div className="type-label mb-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-status-pulse"></div>
          Node Registry
        </div>
        <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">All Tools</h1>
        <p className="max-w-2xl text-[18px] text-[#888] leading-relaxed">
          A comprehensive database of sales APIs and MCP servers. These are the building blocks for the next generation of AI-native sales systems.
        </p>
      </section>

      <SearchBar />

      {q && (
        <div className="px-10 md:px-20 py-8 border-b border-[#333333] flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#444]">Filter Active:</span>
            <span className="px-3 py-1 border border-white text-[10px] font-bold uppercase tracking-[0.1em] text-white">SYSTEM_QUERY: &lsquo;{q}&rsquo;</span>
          </div>
          <Link href="/tools" className="text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white transition-colors underline underline-offset-4">Reset System</Link>
        </div>
      )}

      <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#333333] gap-px border-b border-[#333333]">
        {tools.map((tool, idx) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-black p-10 flex flex-col gap-6 transition-all hover:bg-[#0a0a0a]"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-black font-bold text-xl text-white group-hover:border-white transition-colors">
                {tool.name.charAt(0)}
              </div>
              <div className="text-xl opacity-0 group-hover:opacity-100 transition-all text-[#444]">↗</div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3">{tool.name}</h3>
              <p className="text-[14px] text-[#888] leading-relaxed line-clamp-2">
                {tool.oneLiner}
              </p>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#444]">{tool.category}</span>
              {tool.mcpReady && (
                <div className="w-1 h-1 bg-white rounded-full"></div>
              )}
              {tool.mcpReady && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">MCP</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center p-24">
          <p className="text-[11px] font-bold text-[#444] uppercase tracking-widest">No tools found matching your query.</p>
          <Link href="/tools" className="mt-6 inline-block text-white font-bold hover:underline uppercase text-[10px] tracking-widest">Clear Search</Link>
        </div>
      )}
    </div>
  )
}
