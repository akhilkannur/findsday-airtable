"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"

export function MonitoringFilterBar({ tools }: { tools: { slug: string; name: string }[] }) {
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? tools.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : tools

  return (
    <>
      <div className="border-b border-ink bg-paper-dark/20 py-4">
        <div className="layout-container flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-fade" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search monitored tools..."
              className="w-full bg-transparent border border-ink/20 py-2 pl-9 pr-3 font-mono text-[0.75rem] placeholder-ink-fade/50 focus:outline-none focus:border-ink transition-all"
            />
          </div>
          <span className="font-mono text-[0.7rem] text-ink-fade uppercase tracking-widest">
            {filtered.length} tools
          </span>
        </div>
      </div>

      <section className="px-8 py-16">
        <div className="layout-container">
          {filtered.length === 0 ? (
            <p className="text-ink-fade font-serif italic text-lg">No tools match your search.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex items-center gap-3 p-4 bg-paper-dark/40 border border-ink/10 hover:border-ink/30 transition-colors"
                >
                  <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
                  <span className="font-medium text-sm">{tool.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
