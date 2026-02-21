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
    <form onSubmit={handleSubmit} className="relative w-full group py-6">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
        <Search className="h-5 w-5 text-black opacity-40 group-focus-within:opacity-100 transition-all" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SEARCH_REGISTRY_..."
        className="w-full bg-[var(--lego-offwhite)] border-[var(--border-width)] border-black rounded-[var(--radius-md)] py-5 pl-16 pr-10 text-[14px] font-bold uppercase tracking-[0.1em] text-black placeholder-black/20 transition-all focus:bg-white focus:outline-none shadow-[inset_3px_3px_0_rgba(0,0,0,0.05)]"
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-widest text-black">Execute [Enter]</span>
        <div className="w-2 h-2 bg-[var(--lego-green)] border border-black rounded-full animate-status-pulse"></div>
      </div>
    </form>
  )
}
