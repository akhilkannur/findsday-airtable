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
    <form onSubmit={handleSubmit} className="relative w-full group py-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
        <Search className="h-5 w-5 text-black opacity-40 group-focus-within:opacity-100 transition-all" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools..."
        className="w-full bg-transparent border-b-2 border-ink py-4 pl-12 pr-10 text-[1.2rem] font-serif italic text-black placeholder-black/20 transition-all focus:outline-none focus:bg-white/40"
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-black">Press Enter</span>
        <div className="w-1.5 h-1.5 bg-black rounded-full animate-status-blink"></div>
      </div>
    </form>
  )
}
