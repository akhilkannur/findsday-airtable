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
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mb-24 text-center sm:text-left">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
          Categories
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-3xl leading-relaxed">
          Find the right tools for every part of your sales workflow. Explore prospecting, CRM, enrichment, and outreach APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-club-card rounded-3xl p-12 border border-white/10 transition-all hover:border-club-teal/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-club-teal/5 flex flex-col h-full"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-club-teal/10 transition-colors">
                  <Icon className="h-7 w-7 text-club-teal" />
                </div>
                <span className="font-mono text-[10px] font-bold text-gray-700 tracking-[0.3em]">0{idx + 1}</span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-club-teal transition-colors tracking-tight">
                {cat.name}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-gray-500 line-clamp-3">
                {cat.description}
              </p>

              <div className="mt-10 pt-10 border-t border-white/5 font-mono text-[11px] font-bold text-club-teal uppercase tracking-[0.2em]">
                {cat.toolCount} TOOLS
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
