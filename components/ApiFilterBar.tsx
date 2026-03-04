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
    <div className="border-b border-ink bg-paper-dark/20 py-4">
      <div className="layout-container flex flex-col gap-3">
        {/* Row 1: Search + Category */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-fade" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent border border-ink/20 py-2 pl-9 pr-3 font-mono text-[0.75rem] placeholder-ink-fade/50 focus:outline-none focus:border-ink transition-all"
            />
          </form>

          <select
            value={category}
            onChange={(e) => router.push(buildUrl({ category: e.target.value || undefined }))}
            className="bg-transparent border border-ink/20 py-2 px-3 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade focus:outline-none focus:border-ink cursor-pointer transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Toggles + View */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {[
              { key: "mcp", label: "MCP Only", active: mcpOnly },
              { key: "free", label: "Free Tier", active: freeOnly },
              { key: "official", label: "Official Only", active: officialOnly },
            ].map(({ key, label, active }) => (
              <button
                key={key}
                onClick={() => toggleFilter(key, active)}
                className={`flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest transition-all ${active ? "text-black font-bold" : "text-ink-fade hover:text-black"}`}
              >
                <div
                  className={`w-3 h-3 border border-black flex items-center justify-center ${active ? "bg-black" : ""}`}
                >
                  {active && <Check className="w-2 h-2 text-white" />}
                </div>
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center border border-ink/20 p-0.5">
            <button
              onClick={() => router.push(buildUrl({ view: undefined }))}
              className={`p-1.5 transition-all ${view === "grid" ? "bg-ink text-paper" : "text-ink-fade hover:text-ink"}`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => router.push(buildUrl({ view: "list" }))}
              className={`p-1.5 transition-all ${view === "list" ? "bg-ink text-paper" : "text-ink-fade hover:text-ink"}`}
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
