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
    <div className="flex flex-col min-h-screen">
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">Tool Directory</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black uppercase">Categories</h1>
          <p className="max-w-2xl text-xl font-medium text-black/70 leading-relaxed">
            Find the building blocks for every part of your automated sales engine. From prospecting data to outreach APIs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon)

              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="brick group p-10 bg-white hover:-rotate-1 transition-all flex flex-col h-full gap-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-black bg-[var(--lego-offwhite)] text-black group-hover:bg-[var(--lego-blue)] group-hover:text-white transition-colors rounded-xl">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-black/20 group-hover:text-black transition-colors uppercase">Class_0{idx + 1}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-black mb-4 uppercase">
                      {cat.name}
                    </h2>
                    <p className="text-[0.95rem] text-[#666] line-clamp-3 leading-relaxed group-hover:text-black transition-colors">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t-2 border-dashed border-black/10">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                      {cat.toolCount} Pieces
                    </div>
                    <div className="text-[10px] font-bold text-black tracking-widest uppercase">Inspect -></div>
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
