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
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools, APIs, MCP servers…"
        className="w-full rounded-full border border-white/5 bg-white/5 py-4 pl-14 pr-6 text-lg text-white placeholder-gray-500 transition-all focus:bg-white/10 focus:border-white/10 focus:outline-none shadow-2xl shadow-black/20"
      />
    </form>
  )
}
