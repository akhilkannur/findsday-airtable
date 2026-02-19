import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getAllCategories } from "@/lib/tools"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Categories | Salestools Club",
  description:
    "Find sales APIs by category — prospecting, CRM, enrichment, outreach, and more.",
}

function getCategoryIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] ?? LucideIcons.Layers
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <div className="type-label mb-6 opacity-40">Tool Directory</div>
        <h1 className="type-display mb-8">Categories</h1>
        <p className="max-w-2xl text-xl font-medium opacity-60">
          Find the building blocks for every part of your automated sales engine. From prospecting data to outreach APIs.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-ink-black/10 border-b border-ink-black/10">
        {categories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-sage-bg p-12 transition-all hover:bg-ink-black flex flex-col h-full"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="type-label opacity-40 group-hover:text-sage-bg">0{idx + 1}</span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight group-hover:text-sage-bg">
                {cat.name}
              </h2>

              <p className="mt-5 text-sm font-medium opacity-60 group-hover:text-sage-bg/60 line-clamp-3">
                {cat.description}
              </p>

              <div className="mt-auto pt-10 flex items-center justify-between">
                <div className="type-label opacity-40 group-hover:text-sage-bg/40">
                  {cat.toolCount} TOOLS
                </div>
                <div className="type-label font-bold text-accent-orange opacity-0 group-hover:opacity-100 tracking-widest">Select -></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
