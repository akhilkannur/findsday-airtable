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
    <div className="flex flex-col min-h-screen bg-black">
      <section className="px-10 md:px-20 py-24 border-b border-[#333333]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#444] mb-6">Tool Directory</div>
        <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">Categories</h1>
        <p className="max-w-2xl text-[18px] text-[#888] leading-relaxed">
          Find the building blocks for every part of your automated sales engine. From prospecting data to outreach APIs.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#333333] border-b border-[#333333]">
        {categories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon)

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-black p-12 transition-all hover:bg-[#0a0a0a] flex flex-col h-full gap-8"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-black text-white group-hover:border-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#444]">CLASS_0{idx + 1}</span>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-4 uppercase">
                  {cat.name}
                </h2>
                <p className="text-[14px] text-[#888] line-clamp-3 leading-relaxed group-hover:text-white transition-colors">
                  {cat.description}
                </p>
              </div>

              <div className="mt-auto pt-10 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all border-t border-dashed border-[#333333]">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  {cat.toolCount} NODES
                </div>
                <div className="text-[10px] font-bold text-white tracking-widest uppercase">Inspect Class -></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
