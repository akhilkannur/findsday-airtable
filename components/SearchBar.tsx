"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/api?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/api")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel relative w-full group px-4 py-3">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
        <Search className="h-5 w-5 text-ink-fade transition-colors group-focus-within:text-ink" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools..."
        className="w-full bg-transparent py-2 pl-12 pr-10 text-[1rem] font-medium text-ink placeholder:text-ink-fade/45 focus:outline-none"
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-fade">Press Enter</span>
        <div className="h-1.5 w-1.5 rounded-full bg-ink animate-status-blink"></div>
      </div>
    </form>
  )
}
