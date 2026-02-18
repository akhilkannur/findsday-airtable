import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getAllCategories } from "@/lib/tools"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Infrastructure Segments | Findsday Registry",
  description:
    "Browse sales infrastructure segments — prospecting, CRM, enrichment, outreach, scheduling, and more.",
}

function getCategoryIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] ?? LucideIcons.Layers
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 border-b border-white/10 pb-12">
        <h1 className="font-heading text-6xl font-black italic tracking-tighter text-paper-white sm:text-8xl">
          Segments
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
          Classification of sales infrastructure by operational output
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-banknote-black p-10 transition-all hover:bg-white/5"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 text-terminal-green transition-colors group-hover:bg-terminal-green group-hover:text-black">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-[10px] font-bold text-gray-700">0{idx + 1}</span>
              </div>

              <h2 className="font-heading text-2xl font-black italic tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">
                {cat.name}
              </h2>

              <p className="mt-4 font-mono text-[10px] uppercase leading-loose tracking-widest text-gray-600 line-clamp-3">
                {cat.description}
              </p>

              <div className="mt-8 font-mono text-[9px] font-bold text-terminal-green">
                {cat.toolCount} TOOLS_REGISTERED
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
