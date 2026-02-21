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
    <form onSubmit={handleSubmit} className="relative w-full group border-b border-[#333333]">
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
        <Search className="h-4 w-4 text-white opacity-20 group-focus-within:opacity-100 transition-all" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SEARCH_REGISTRY_..."
        className="w-full bg-black py-10 pl-20 pr-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white placeholder-white/10 transition-all focus:outline-none"
      />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
        <span className="text-[9px] font-bold uppercase tracking-widest">Execute [Enter]</span>
        <div className="w-1 h-1 bg-white rounded-full animate-status-pulse"></div>
      </div>
    </form>
  )
}
