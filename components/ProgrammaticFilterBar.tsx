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
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/40">Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("")}
            className={`rounded-md border px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
              currentCategory === "" 
                ? "border-ink bg-ink text-paper" 
                : "border-ink/10 bg-white text-ink-fade hover:border-ink/20 hover:text-ink"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`rounded-md border px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                currentCategory === cat.slug 
                  ? "border-ink bg-ink text-paper" 
                  : "border-ink/10 bg-white text-ink-fade hover:border-ink/20 hover:text-ink"
              } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
