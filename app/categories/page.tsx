import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getAllCategories } from "@/lib/tools"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Browse Categories | Findsday",
  description:
    "Browse sales API categories — prospecting, CRM, enrichment, outreach, scheduling, and more.",
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
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Categories
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Find the right tools for every stage of your sales workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-ghost-card rounded-3xl p-10 border border-white/5 transition-all hover:border-white/20 hover:-translate-y-1"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-brand-purple">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-[10px] font-bold text-gray-700">0{idx + 1}</span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-brand-purple transition-colors">
                {cat.name}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
                {cat.description}
              </p>

              <div className="mt-10 font-mono text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                {cat.toolCount} TOOLS
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
