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
      <div className="border-b border-ink/10 bg-white/50 py-4">
        <div className="layout-container flex items-center gap-4">
          <div className="panel relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-fade" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search monitored tools..."
              className="w-full bg-transparent py-3 pl-9 pr-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] placeholder:text-ink-fade/45 focus:outline-none"
            />
          </div>
          <span className="font-mono text-[0.68rem] text-ink-fade uppercase tracking-[0.16em]">
            {filtered.length} tools
          </span>
        </div>
      </div>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="layout-container">
          {filtered.length === 0 ? (
            <p className="text-lg text-ink-fade">No tools match your search.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {filtered.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white p-4 transition-colors hover:border-ink/20"
                >
                  <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
                  <span className="text-sm font-medium leading-tight">{tool.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
