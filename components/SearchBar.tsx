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
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools, APIs, MCP servers…"
        className="w-full rounded-lg border border-gray-700 bg-charcoal-light py-3 pl-12 pr-4 text-white placeholder-gray-500 transition-colors focus:border-accent-green focus:outline-none"
      />
    </form>
  )
}
