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

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-[var(--ink-fade)] leading-relaxed line-clamp-3 mb-4">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[var(--ink-fade)] group-hover:text-black transition-colors">{tool.aiDifficulty}</span>
        <div className="ml-auto flex gap-1">
          {tool.apiType.map((api: string) => (
            <span key={api} className="font-mono text-[9px] font-bold uppercase tracking-widest text-white bg-black px-1.5 py-0.5">{api}</span>
          ))}
        </div>
      </div>
    </Link>
  )
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
    <div className="flex flex-col min-h-screen bg-[var(--paper)]">
      <section className="px-8 py-24 border-b border-[var(--ink)] bg-[var(--paper-dark)]/30">
        <div className="layout-container">
          <Link
            href="/categories"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Taxonomy Index
          </Link>

          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-[var(--ink-fade)] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-status-blink"></span>
            Class Manifest: {category.name}
          </div>
          <h1 className="type-display mb-8">
            Best {category.name} APIs.
          </h1>
          <p className="max-w-2xl font-serif italic text-2xl text-[var(--ink-fade)] leading-relaxed border-l-2 border-[var(--ink)] pl-6">
            {category.description} These {tools.length} modules have been vetted for their ability to integrate with AI-native sales stacks.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60 font-serif italic text-2xl">
              No manifests indexed in this class.
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-24 bg-[var(--paper-dark)]/50 border-t border-[var(--ink)]">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <h2 className="font-serif italic text-3xl">Cross-referenced Categories</h2>
            <Link href="/categories" className="font-mono text-[0.75rem] uppercase underline hover:line-through">All Categories -></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {getAllCategories().filter(c => c.slug !== slug).slice(0, 4).map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="group flex flex-col gap-6 p-8 border border-transparent hover:border-[var(--ink)]/10 transition-all bg-[var(--paper)]"
              >
                <div className="font-mono text-[0.75rem] text-[var(--ink-fade)] italic uppercase">INDEX_0{cat.toolCount}</div>
                <h3 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-[var(--ink)] transition-all underline-offset-8">{cat.name}</h3>
                <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
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
