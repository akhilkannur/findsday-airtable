import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getCategoryBySlug,
  getToolsByCategory,
  getAllCategorySlugs,
  getAllCategories,
} from "@/lib/tools"
import { ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: "Category Not Found | Salestools Club" }
  }

  return {
    title: `Best ${category.name} APIs & SDKs (2026) | Salestools Club`,
    description: `Discover the best ${category.name} APIs and tools for AI agents. Curated list of ${category.toolCount} ${category.name.toLowerCase()} solutions for automated GTM.`,
    alternates: {
      canonical: `https://salestools.club/categories/${slug}`,
    },
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(category.name)

  return (
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black bg-white/40">
        <Link
          href="/categories"
          className="type-label mb-12 inline-block opacity-40 hover:opacity-100 hover:underline"
        >
          &lt;- All Categories
        </Link>

        <div className="type-label mb-6 text-accent-blue font-black tracking-[0.2em]">Class: {category.name}</div>
        <h1 className="type-display mb-8">
          The Best {category.name} APIs for AI Builders.
        </h1>
        <p className="mt-8 text-2xl font-medium opacity-60 max-w-3xl leading-relaxed">
          {category.description} These {tools.length} modules have been vetted for their ability to integrate with AI-native sales stacks.
        </p>
      </section>

      <div className="swiss-grid-bg grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-12">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="swiss-card group h-full"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-all duration-500 text-2xl font-black">
                {tool.name.charAt(0)}
              </div>
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              {tool.name}
            </h2>

            <p className="mt-4 text-sm font-medium opacity-60 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 border-t border-ink-black/10 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className="swiss-badge opacity-40">
                  {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span key={api} className="swiss-badge">{api}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center p-24">
          <p className="text-xl font-bold opacity-40 uppercase tracking-widest">No tools found in this category.</p>
        </div>
      )}

      {/* Related Categories */}
      <section className="px-6 py-24 md:px-12 md:py-32 bg-[#1A1C16] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <h2 className="text-3xl font-black uppercase tracking-tight italic">Other Infrastructure Classes</h2>
            <Link href="/categories" className="type-label text-accent-blue hover:text-white transition-colors">View All Categories -></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {getAllCategories().filter(c => c.slug !== slug).slice(0, 4).map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="group bg-[#1A1C16] p-10 hover:bg-white/5 transition-all"
              >
                <div className="type-label mb-6 text-accent-blue/40 group-hover:text-accent-blue transition-colors">0{cat.toolCount} Items</div>
                <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-accent-orange transition-colors">{cat.name}</h3>
                <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
