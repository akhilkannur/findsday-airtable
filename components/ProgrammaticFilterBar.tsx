"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

interface CategoryOption {
  slug: string
  name: string
}

export function ProgrammaticFilterBar({ categories, baseUrl }: { categories: CategoryOption[], baseUrl: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentCategory = searchParams.get("category") ?? ""

  function handleCategoryChange(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("category", slug)
    } else {
      params.delete("category")
    }
    
    startTransition(() => {
      router.push(`${baseUrl}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className="border-b border-ink/10 py-6 mb-8">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/40">Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("")}
            className={`px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest border transition-all ${
              currentCategory === "" 
                ? "bg-ink text-paper border-ink" 
                : "bg-transparent border-ink/20 text-ink-fade hover:border-ink hover:text-ink"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest border transition-all ${
                currentCategory === cat.slug 
                  ? "bg-ink text-paper border-ink" 
                  : "bg-transparent border-ink/20 text-ink-fade hover:border-ink hover:text-ink"
              } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
