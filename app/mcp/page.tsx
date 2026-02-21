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

export default function McpPage() {
  const mcpTools = getMcpTools()

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <section className="px-10 md:px-20 py-24 border-b border-[#333333]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#444] mb-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-status-pulse"></div>
          Protocol Layer
        </div>
        <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">MCP Servers</h1>
        <p className="max-w-3xl text-[18px] text-[#888] leading-relaxed">
          The fastest way to give your AI "hands". Plug these servers into Claude Desktop or Cursor to update your CRM and search leads via chat.
        </p>
      </section>

      <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#333333] gap-px border-b border-[#333333]">
        {mcpTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-black p-10 flex flex-col gap-6 transition-all hover:bg-[#0a0a0a]"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-black font-bold text-xl text-white group-hover:border-white transition-colors">
                {tool.name.charAt(0)}
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-[#333333] bg-white text-black">
                <Zap className="w-4 h-4 fill-black" />
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-2 uppercase">
                {tool.name}
              </h3>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#444] mb-4">{tool.category}</div>

              <p className="text-[14px] text-[#888] line-clamp-3 leading-relaxed">
                {tool.oneLiner}
              </p>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 border-t border-dashed border-[#333333]">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white border border-[#333333] px-1.5 py-0.5">{tool.apiType[0]} INFRA</span>
              {tool.aiDifficulty && (
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">{tool.aiDifficulty}</span>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between px-6 py-3 border border-[#333333] text-[10px] font-bold uppercase tracking-widest text-white group-hover:bg-white group-hover:text-black transition-all">
              Configure Node <span>↗</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-10 md:mx-20 my-24 border border-dashed border-[#333333] p-16 text-center">
        <p className="text-[16px] font-medium text-[#888] mb-10">
          Know a protocol module we're missing?
        </p>
        <Link
          href="/submit"
          className="inline-flex px-12 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#ccc] transition-colors"
        >
          Submit Module <span>-&gt;</span>
        </Link>
      </div>
    </div>
  )
}
