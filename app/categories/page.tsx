import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getAllCategories } from "@/lib/tools"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Sales API Categories | Findsday",
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
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Browse by Category
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border border-gray-800 bg-charcoal-dark p-6 transition-colors hover:border-gray-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-charcoal-light">
                  <Icon className="h-5 w-5 text-accent-green" />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  {cat.name}
                </h2>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-gray-400">
                {cat.description}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                {cat.toolCount} {cat.toolCount === 1 ? "tool" : "tools"}
              </p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
