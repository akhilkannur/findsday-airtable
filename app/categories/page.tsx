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
  openGraph: {
    title: "Categories | Salestools Club",
    description: "Find sales APIs by category — prospecting, CRM, enrichment, outreach, and more.",
    type: "website",
    url: "https://salestools.club/categories",
    images: [
      {
        url: "https://salestools.club/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Salestools Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories | Salestools Club",
    description: "Find sales APIs by category — prospecting, CRM, enrichment, outreach, and more.",
    images: ["https://salestools.club/opengraph-image"],
  },
}

function getCategoryIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] ?? LucideIcons.Layers
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">Categories</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Find the building blocks for every part of your automated sales engine. From prospecting data to outreach APIs.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon)

              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col h-full gap-6 md:gap-8 p-6 md:p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                  style={{ border: '1px solid rgba(26, 25, 23, 0.15)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 flex items-center justify-center bg-ink text-paper [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8 mb-4">
                      {cat.name}
                    </h2>
                    <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-ink/20">
                    <div className="font-mono text-[0.7rem] uppercase">
                      {cat.toolCount} Tools
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest">Open {'>'}</div>
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
