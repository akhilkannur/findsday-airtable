import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getAllCategories } from "@/lib/tools"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Categories | Salestools Club",
  description:
    "Find sales APIs by category — prospecting, CRM, enrichment, outreach, and more.",
  alternates: {
    canonical: "https://salestools.club/categories",
  },
}

function getCategoryIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] ?? LucideIcons.Layers
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)]">
      <section className="px-8 py-24 border-b border-[var(--ink)]">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            Browse by Type
          </div>
          <h1 className="type-display mb-8">Categories</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-[var(--ink-fade)] leading-relaxed border-l-2 border-[var(--ink)] pl-6">
            Find the building blocks for every part of your automated sales engine. From prospecting data to outreach APIs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon)

              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col h-full gap-8 p-8 border border-[var(--ink)]/15 bg-[var(--paper-dark)]/60 hover:border-[var(--ink)]/30 hover:translate-y-[-4px] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[0.7rem] text-[var(--ink-fade)] group-hover:text-black transition-colors italic uppercase">Type_0{idx + 1}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-[var(--ink)] transition-all underline-offset-8 mb-4">
                      {cat.name}
                    </h2>
                    <p className="text-[1rem] text-[var(--ink-fade)] line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-[var(--ink)]/20">
                    <div className="font-mono text-[0.7rem] uppercase">
                      {cat.toolCount} Tools
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest">Open -></div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
