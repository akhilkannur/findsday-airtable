"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Search, Check, LayoutGrid, List } from "lucide-react"

interface CategoryOption {
  slug: string
  name: string
}

export function ApiFilterBar({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") ?? ""
  const category = searchParams.get("category") ?? ""
  const mcpOnly = searchParams.get("mcp") === "true"
  const freeOnly = searchParams.get("free") === "true"
  const officialOnly = searchParams.get("official") === "true"
  const view = searchParams.get("view") === "list" ? "list" : "grid"

  const [search, setSearch] = useState(q)

  useEffect(() => {
    setSearch(q)
  }, [q])

  const buildUrl = useCallback(
    (overrides: Record<string, string | boolean | undefined>) => {
      const next: Record<string, string> = {}
      const current = {
        q,
        category,
        mcp: mcpOnly ? "true" : "",
        free: freeOnly ? "true" : "",
        official: officialOnly ? "true" : "",
        view: view === "list" ? "list" : "",
      }
      for (const [k, v] of Object.entries({ ...current, ...overrides })) {
        const val = typeof v === "boolean" ? (v ? "true" : "") : (v ?? "")
        if (val) next[k] = val
      }
      const qs = new URLSearchParams(next).toString()
      return `/api${qs ? `?${qs}` : ""}`
    },
    [q, category, mcpOnly, freeOnly, officialOnly, view]
  )

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(buildUrl({ q: search.trim() || undefined }))
  }

  function toggleFilter(key: string, current: boolean) {
    router.push(buildUrl({ [key]: !current }))
  }

  return (
    <div className="border-b border-ink/10 bg-white/50 py-4">
      <div className="layout-container flex flex-col gap-4">
        {/* Row 1: Search + Category */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <form onSubmit={handleSearch} className="panel relative flex-1 max-w-full md:max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-fade" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent py-3 pl-9 pr-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] placeholder:text-ink-fade/45 focus:outline-none"
            />
          </form>

          <select
            value={category}
            onChange={(e) => router.push(buildUrl({ category: e.target.value || undefined }))}
            className="panel w-full cursor-pointer bg-white px-3 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-fade focus:outline-none md:w-auto"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Toggles + View */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {[
              { key: "mcp", label: "MCP Only", active: mcpOnly },
              { key: "free", label: "Free Tier", active: freeOnly },
              { key: "official", label: "Official Only", active: officialOnly },
            ].map(({ key, label, active }) => (
              <button
                key={key}
                onClick={() => toggleFilter(key, active)}
                className={`flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${active ? "text-ink font-semibold" : "text-ink-fade hover:text-ink"}`}
              >
                <div
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-ink/15 ${active ? "bg-ink text-paper" : "bg-transparent"}`}
                >
                  {active && <Check className="w-2 h-2 text-white" />}
                </div>
                {label}
              </button>
            ))}
          </div>

          <div className="panel flex items-center p-1 self-start md:self-auto">
            <button
              onClick={() => router.push(buildUrl({ view: undefined }))}
              className={`rounded-md p-1.5 transition-colors ${view === "grid" ? "bg-ink text-paper" : "text-ink-fade hover:text-ink"}`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => router.push(buildUrl({ view: "list" }))}
              className={`rounded-md p-1.5 transition-colors ${view === "list" ? "bg-ink text-paper" : "text-ink-fade hover:text-ink"}`}
              title="List View"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
