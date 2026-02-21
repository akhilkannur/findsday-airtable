import Link from "next/link"
import { ArrowRight, Zap, Brain } from "lucide-react"
import { getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Servers | Salestools Club",
  description:
    "Find sales tools with MCP (Model Context Protocol) support for Claude and Cursor.",
  alternates: {
    canonical: "https://salestools.club/mcp",
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
      <div className="card-body p-6 flex flex-col gap-4 text-left">
        <div className="card-top flex justify-between items-start">
          <div className="avatar w-12 h-12 bg-[#eee] border-2 border-black rounded-xl flex items-center justify-center font-extrabold text-xl text-black">
            {tool.name.charAt(0)}
          </div>
          <div className="w-8 h-8 bg-[var(--lego-red)] border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0_black]">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-1 uppercase text-black">{tool.name}</h3>
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4">{tool.category}</div>
          <p className="text-[0.85rem] text-[#666] line-clamp-3 leading-relaxed">
            {tool.oneLiner}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-black/10 pt-4">
          <div className="flex gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-black px-1.5 py-0.5 rounded-sm">{tool.apiType[0]} INFRA</span>
          </div>
          <div className="brick brick-btn bg-white text-black py-1 px-3 text-[9px] group-hover:bg-[var(--lego-yellow)] transition-colors">
            Configure Node ↗
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function McpPage() {
  const mcpTools = getMcpTools()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">
            <span className="w-2 h-2 bg-[var(--lego-green)] rounded-full animate-status-pulse"></span>
            Automation Layer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black uppercase">MCP Servers</h1>
          <p className="max-w-3xl text-xl font-medium text-black/70 leading-relaxed">
            The fastest way to give your AI "hands". Plug these servers into Claude Desktop or Cursor to update your CRM and search leads via chat.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mcpTools.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="layout-container">
          <div className="brick bg-white p-16 text-center border-[var(--border-width)] border-black">
            <p className="text-xl font-bold text-black mb-10">
              Know a protocol module we're missing?
            </p>
            <Link
              href="/submit"
              className="brick brick-btn bg-[var(--lego-red)] text-white font-bold px-12 py-4 text-sm"
            >
              Submit Module <span>-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
