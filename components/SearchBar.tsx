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
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/tools")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
        <Search className="h-4 w-4 text-ink-black opacity-30 group-focus-within:opacity-100 group-focus-within:text-accent-orange transition-all" />
        <div className="h-4 w-px bg-ink-black/10 group-focus-within:bg-accent-orange/20 transition-all"></div>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SEARCH_NODES_..."
        className="w-full bg-white/40 backdrop-blur-md border border-ink-black/10 py-5 pl-16 pr-10 text-sm font-bold uppercase tracking-widest text-ink-black placeholder-ink-black/20 transition-all focus:bg-white focus:border-ink-black focus:outline-none shadow-[8px_8px_0px_rgba(18,18,18,0.05)] focus:shadow-[12px_12px_0px_rgba(18,18,18,0.08)]"
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
        <span className="text-[0.6rem] font-bold uppercase tracking-tighter">Enter to Push</span>
        <div className="h-1 w-1 bg-accent-orange rounded-full animate-pulse"></div>
      </div>
    </form>
  )
}
