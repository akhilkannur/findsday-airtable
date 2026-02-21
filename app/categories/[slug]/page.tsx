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
    <div className="flex flex-col min-h-screen bg-black">
      <section className="px-10 md:px-20 py-24 border-b border-[#333333] bg-[#050505]">
        <Link
          href="/categories"
          className="text-[10px] font-bold uppercase tracking-widest text-[#444] hover:text-white mb-12 inline-block transition-colors"
        >
          &lt;- Back to System Index
        </Link>

        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888] mb-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          Class: {category.name}
        </div>
        <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">
          Best {category.name} APIs.
        </h1>
        <p className="max-w-2xl text-[18px] text-[#888] leading-relaxed">
          {category.description} These {tools.length} modules have been vetted for their ability to integrate with AI-native sales stacks.
        </p>
      </section>

      <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#333333] gap-px border-b border-[#333333]">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-black p-10 flex flex-col gap-6 transition-all hover:bg-[#0a0a0a]"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-black font-bold text-xl text-white group-hover:border-white transition-colors">
                {tool.name.charAt(0)}
              </div>
              <div className="text-xl opacity-0 group-hover:opacity-100 transition-all text-[#444]">↗</div>
            </div>

            <div className="flex-grow">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3 uppercase">
                {tool.name}
              </h2>
              <p className="text-[14px] text-[#888] line-clamp-3 leading-relaxed">
                {tool.oneLiner}
              </p>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap items-center gap-3 border-t border-dashed border-[#333333]">
              {tool.aiDifficulty && (
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">
                  {tool.aiDifficulty}
                </span>
              )}
              {tool.apiType.map((api) => (
                <span key={api} className="text-[9px] font-bold uppercase tracking-widest text-white border border-[#333333] px-1.5 py-0.5">{api}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center p-24">
          <p className="text-[11px] font-bold text-[#444] uppercase tracking-widest">No nodes indexed in this class.</p>
        </div>
      )}

      {/* Related Categories */}
      <section className="px-10 md:px-20 py-24 bg-black border-t border-[#333333]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white italic">Alternative Classes</h2>
          <Link href="/categories" className="text-[10px] font-bold uppercase tracking-widest text-[#444] hover:text-white transition-colors">All Categories -></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#333333]">
          {getAllCategories().filter(c => c.slug !== slug).slice(0, 4).map(cat => (
            <Link 
              key={cat.slug} 
              href={`/categories/${cat.slug}`}
              className="group bg-black p-10 hover:bg-[#0a0a0a] transition-all flex flex-col gap-6"
            >
              <div className="text-[10px] font-mono text-[#444] group-hover:text-white">NODE_0{cat.toolCount}</div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">{cat.name}</h3>
              <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
